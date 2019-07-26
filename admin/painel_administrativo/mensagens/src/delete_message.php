<?php
try {
	session_start();
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once('../../../../assets/php/Connection.php');

	$message_id = filter_input(INPUT_GET, 'message_id', FILTER_DEFAULT);

	$sql = $database->prepare('DELETE FROM messages WHERE message_id = :message_id');
	$sql->bindValue(':message_id', $message_id);
	
	$sql->execute();
	header('Location: ../');
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
