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

	include_once('../../../../assets/php/Connection.php');

	$sql = $database->prepare('SELECT * FROM login_logs');
	$sql->execute();

	if ($sql->rowCount()) {
		foreach ($sql as $key) {
			extract($key);
			$data[$log_id] = [$log_ip, $log_name, $log_password, $log_createdAt];
		}

		echo json_encode($data);
	} else echo '{}';
} catch (PDOException $e) {
	echo '{}';
}
