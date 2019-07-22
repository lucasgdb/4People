<?php
try {
	session_start();
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once('../../../../../assets/php/Connection.php');

	$section_id = filter_input(INPUT_GET, 'section_id', FILTER_DEFAULT);

	$sql = $database->prepare('DELETE FROM sections WHERE section_id = :section_id');
	$sql->bindValue(':section_id', $section_id);
	
	$sql->execute();
	header('Location: ../');
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
