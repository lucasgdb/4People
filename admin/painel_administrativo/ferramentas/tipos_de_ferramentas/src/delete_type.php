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

	include_once('../../../../../assets/php/Connection.php');

	$type_id = filter_input(INPUT_GET, 'type_id', FILTER_DEFAULT);

	$sql = $database->prepare('DELETE FROM types WHERE type_id = :type_id');
	$sql->bindValue(':type_id', $type_id);

	if ($sql->execute()) echo '{"status":"1"}';
	else echo '{"status":"0"}';
} catch (PDOException $e) {
	echo '{"status":"0"}';
}
