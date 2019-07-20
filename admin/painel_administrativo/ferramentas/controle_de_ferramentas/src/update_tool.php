<?php
try {
	session_start();
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once('../../../../../assets/php/Connection.php');

	$tool_id = filter_input(INPUT_POST, 'tool_id', FILTER_DEFAULT);
	$tool_name = trim(filter_input(INPUT_POST, 'tool_name', FILTER_DEFAULT));
	$tool_path = trim(filter_input(INPUT_POST, 'tool_path', FILTER_DEFAULT));
	$tool_active = filter_input(INPUT_POST, 'tool_active', FILTER_DEFAULT);
	$section_id = filter_input(INPUT_POST, 'section_id', FILTER_DEFAULT);

	$sql = $database->prepare('UPDATE tools SET tool_name=:tool_name, tool_path=:tool_path, tool_active=:tool_active, section_id=:section_id WHERE tool_id=:tool_id');

	$sql->bindValue(':tool_name', $tool_name);
	$sql->bindValue(':tool_path', $tool_path);
	$sql->bindValue(':tool_active', $tool_active);
	$sql->bindValue(':section_id', $section_id);
	$sql->bindValue(':tool_id', $tool_id);

	$sql->execute();
	header('Location: ../');
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
