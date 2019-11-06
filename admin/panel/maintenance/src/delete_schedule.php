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

	$maintenance_id = filter_input(INPUT_GET, 'maintenance_id', FILTER_DEFAULT);

	$sql = $database->prepare('DELETE FROM maintenances WHERE maintenance_id = :maintenance_id');
	$sql->bindValue(':maintenance_id', $maintenance_id);

	if ($sql->execute()) {
		echo '{"status":"1"}';

		$sql = $database->prepare('INSERT INTO admin_logs VALUES (NULL, :log_action, CURRENT_TIMESTAMP, :admin_id)');
		$sql->bindValue(':log_action', 'delete.schedule');
		$sql->bindValue(':admin_id', $_SESSION['logged']['id']);
		$sql->execute();
	} else echo '{"status":"0"}';
} catch (PDOException $e) {
	echo '{"status":"0"}';
}
