<?php
try {
	header('Access-Control-Allow-Origin: localhost');
	header('Access-Control-Allow-Methods: POST');
	header('Content-Type: application/json; charset=UTF-8');

	session_start();
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once('../../../../assets/php/Connection.php');

	$maintenance_name = filter_input(INPUT_POST, 'maintenance_name', FILTER_DEFAULT);
	$maintenance_begin_date = filter_input(INPUT_POST, 'maintenance_begin_date', FILTER_DEFAULT);
	$maintenance_end_date = filter_input(INPUT_POST, 'maintenance_end_date', FILTER_DEFAULT);
	$maintenance_begin_time = filter_input(INPUT_POST, 'maintenance_begin_time', FILTER_DEFAULT);
	$maintenance_end_time = filter_input(INPUT_POST, 'maintenance_end_time', FILTER_DEFAULT);
	$maintenance_begin = NULL;
	$maintenance_end = NULL;

	if ($maintenance_begin_date !== '') {
		if ($maintenance_begin_time === '') $maintenance_begin_time = date('H:i:s');

		$maintenance_begin = date('Y-m-d H:i:s', strtotime("$maintenance_begin_date $maintenance_begin_time"));
	}

	if ($maintenance_end_date !== '') {
		if ($maintenance_end_time === '') $maintenance_end_time = date('H:i:s');

		$maintenance_end = date('Y-m-d H:i:s', strtotime("$maintenance_end_date $maintenance_end_time"));
	}

	$sql = $database->prepare('INSERT INTO maintenances VALUES (DEFAULT, :maintenance_name, :maintenance_begin, :maintenance_end)');

	$sql->bindValue(':maintenance_name', $maintenance_name);
	$sql->bindValue(':maintenance_begin', $maintenance_begin);
	$sql->bindValue(':maintenance_end', $maintenance_end);

	if ($sql->execute()) {
		echo '{"status":"1"}';

		$sql = $database->prepare('INSERT INTO admin_logs VALUES (NULL, :log_action, CURRENT_TIMESTAMP, :admin_id)');
		$sql->bindValue(':log_action', 'insert.schedule');
		$sql->bindValue(':admin_id', $_SESSION['logged']['id']);
		$sql->execute();
	} else echo '{"status":"0"}';
} catch (PDOException $e) {
	echo "Um erro ocorreu! Erro: {$e->getMessage()}";
}
