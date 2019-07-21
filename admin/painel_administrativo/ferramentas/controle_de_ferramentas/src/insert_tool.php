<?php
try {
	session_start();
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once('../../../../../assets/php/Connection.php');

	$tool_name = trim(filter_input(INPUT_POST, 'tool_name', FILTER_DEFAULT));
	$tool_path = strtolower(trim(filter_input(INPUT_POST, 'tool_path', FILTER_DEFAULT)));
	$tool_description = trim(filter_input(INPUT_POST, 'tool_description', FILTER_DEFAULT));
	$tool_link = trim(filter_input(INPUT_POST, 'tool_link', FILTER_DEFAULT));
	$tool_active = filter_input(INPUT_POST, 'tool_active', FILTER_DEFAULT);
	$section_id = filter_input(INPUT_POST, 'section_id', FILTER_DEFAULT);

	$sql = $database->prepare('INSERT INTO tools VALUES (DEFAULT, :tool_name, :tool_path, :tool_description, :tool_link, DEFAULT, :tool_active, :section_id)');

	$sql->bindValue(':tool_name', $tool_name);
	$sql->bindValue(':tool_path', $tool_path);
	$sql->bindValue(':tool_description', $tool_description);
	$sql->bindValue(':tool_link', $tool_link);
	$sql->bindValue(':tool_active', $tool_active);
	$sql->bindValue(':section_id', $section_id);

	$sql->execute();
	header('Location: ../');
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
