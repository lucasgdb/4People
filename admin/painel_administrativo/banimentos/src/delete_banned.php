<?php
try {
	session_start();
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once('../../../../assets/php/Connection.php');

	$banned_ip = filter_input(INPUT_GET, 'banned_ip', FILTER_DEFAULT);

	$sql = $database->prepare('DELETE FROM banneds WHERE banned_ip = :banned_ip');
	$sql->bindValue(':banned_ip', $banned_ip);
	
	$sql->execute();
	header('Location: ../');
} catch (PDOException $e) {
	"Um erro ocorreu! Erro: {$e->getMessage()}";
}
