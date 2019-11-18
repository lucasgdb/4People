<?php
try {
	header('Access-Control-Allow-Origin: localhost');
	header('Access-Control-Allow-Methods: POST');
	header('Content-Type: application/json; charset=UTF-8');

	session_start();
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once('../../../../../assets/src/php/Connection.php');

	$tool_name = trim(filter_input(INPUT_POST, 'tool_name', FILTER_DEFAULT));
	$tool_path = strtolower(trim(filter_input(INPUT_POST, 'tool_path', FILTER_DEFAULT)));
	$tool_description = trim(filter_input(INPUT_POST, 'tool_description', FILTER_DEFAULT));
	$tool_link = trim(filter_input(INPUT_POST, 'tool_link', FILTER_DEFAULT));
	$tool_status = filter_input(INPUT_POST, 'tool_status', FILTER_DEFAULT);
	$section_id = filter_input(INPUT_POST, 'section_id', FILTER_DEFAULT);

	$sql = $database->prepare('INSERT INTO tools VALUES (DEFAULT, :tool_name, :tool_path, :tool_description, :tool_link, DEFAULT, :tool_status, :section_id)');

	$sql->bindValue(':tool_name', $tool_name);
	$sql->bindValue(':tool_path', $tool_path);
	$sql->bindValue(':tool_description', $tool_description);
	$sql->bindValue(':tool_link', $tool_link);
	$sql->bindValue(':tool_status', $tool_status);
	$sql->bindValue(':section_id', $section_id);

	if ($sql->execute()) {
		echo '{"status":"1"}';

		$sql = $database->prepare('INSERT INTO admin_logs VALUES (NULL, "insert.tool", CURRENT_TIMESTAMP, :admin_id)');
		$sql->bindValue(':admin_id', $_SESSION['logged']['id']);
		$sql->execute();
	} else echo '{"status":"0"}';
} catch (PDOException $e) {
	echo '{"status":"0"}';
}
