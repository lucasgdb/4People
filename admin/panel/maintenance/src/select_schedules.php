<?php
try {
	header('Access-Control-Allow-Origin: localhost');
	header('Access-Control-Allow-Methods: GET');
	header('Content-Type: application/json; charset=UTF-8');

	session_start();
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once('../../../../assets/src/php/Connection.php');

	$current_date = date('Y-m-d H:i:s');
	$sql = $database->prepare('DELETE FROM maintenances WHERE :current_date > maintenance_end');
	$sql->bindValue(':current_date', $current_date);
	$sql->execute();

	$sql = $database->prepare('SELECT * FROM maintenances ORDER BY maintenance_begin AND maintenance_end');
	$sql->execute();

	if ($sql->rowCount()) {
		foreach ($sql as $key) {
			extract($key);
			$data[$maintenance_id] = [$maintenance_name, $maintenance_begin ? $maintenance_begin : 'Não mencionado', $maintenance_end ? $maintenance_end : 'Não mencionado'];
		}

		echo json_encode($data);
	} else echo '{}';
} catch (PDOException $e) {
	echo '{}';
}
