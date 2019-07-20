<?php
try {
	session_start();
	if (!isset($_SESSION['logged'])) {
		header("HTTP/1.0 404 Not Found");
		exit();
	}

	include_once("../../../../../assets/php/Connection.php");

	$section_name = trim(filter_input(INPUT_POST, 'section_name', FILTER_DEFAULT));
	$section_path = strtolower(trim(filter_input(INPUT_POST, 'section_path', FILTER_DEFAULT)));
	$section_icon = trim(filter_input(INPUT_POST, 'section_icon', FILTER_DEFAULT));
	$type_id = filter_input(INPUT_POST, 'type_id', FILTER_DEFAULT);

	$sql = $database->prepare('INSERT INTO sections VALUES (DEFAULT, :section_name, :section_path, :section_icon, :type_id)');

	$sql->bindValue(':section_name', $section_name);
	$sql->bindValue(':section_path', $section_path);
	$sql->bindValue(':section_icon', $section_icon);
	$sql->bindValue(':type_id', $type_id);

	$sql->execute();
	header('Location: ../');
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
