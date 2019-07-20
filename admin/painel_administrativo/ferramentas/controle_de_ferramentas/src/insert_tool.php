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
	$section_id = filter_input(INPUT_POST, 'section_id', FILTER_DEFAULT);

	$sql = $database->prepare('INSERT INTO tools VALUES (DEFAULT, :tool_name, :tool_path, "0", DEFAULT, :section_id)');

	$sql->bindValue(':tool_name', $tool_name);
	$sql->bindValue(':tool_path', $tool_path);
	$sql->bindValue(':section_id', $section_id);

	$sql->execute();
	header('Location: ../');
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
