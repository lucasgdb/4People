<?php
try {
	session_start();
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once('../../../../../assets/php/Connection.php');

	$type_id = filter_input(INPUT_GET, 'type_id', FILTER_DEFAULT);

	$sql = $database->prepare('DELETE FROM types WHERE type_id = :type_id');
	$sql->bindValue(':type_id', $type_id);
	
	$sql->execute();
	header('Location: ../');
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
