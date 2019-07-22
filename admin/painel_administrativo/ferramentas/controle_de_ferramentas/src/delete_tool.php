<?php
try {
	session_start();
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once('../../../../../assets/php/Connection.php');

	$tool_id = filter_input(INPUT_GET, 'tool_id', FILTER_DEFAULT);

	$sql = $database->prepare('DELETE FROM tools WHERE tool_id = :tool_id');
	$sql->bindValue(':tool_id', $tool_id);

	$sql->execute();
	header('Location: ../');
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
