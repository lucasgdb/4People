<?php
try {
	session_start();
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once('../../../../../assets/src/php/Connection.php');

	$tool_id = filter_input(INPUT_POST, 'tool_id', FILTER_DEFAULT);
	$tool_name = trim(filter_input(INPUT_POST, 'tool_name', FILTER_DEFAULT));
	$tool_path = trim(filter_input(INPUT_POST, 'tool_path', FILTER_DEFAULT));
	$tool_description = trim(filter_input(INPUT_POST, 'tool_description', FILTER_DEFAULT));
	$tool_link = trim(filter_input(INPUT_POST, 'tool_link', FILTER_DEFAULT));
	$tool_status = filter_input(INPUT_POST, 'tool_status', FILTER_DEFAULT);
	$section_id = filter_input(INPUT_POST, 'section_id', FILTER_DEFAULT);

	$sql = $database->prepare('UPDATE tools SET tool_name = :tool_name, tool_path = :tool_path, tool_description = :tool_description, tool_link = :tool_link, tool_status = :tool_status, section_id = :section_id WHERE tool_id = :tool_id');

	$sql->bindValue(':tool_name', $tool_name);
	$sql->bindValue(':tool_path', $tool_path);
	$sql->bindValue(':tool_description', $tool_description);
	$sql->bindValue(':tool_link', $tool_link);
	$sql->bindValue(':tool_status', $tool_status);
	$sql->bindValue(':section_id', $section_id);
	$sql->bindValue(':tool_id', $tool_id);

	if ($sql->execute()) {
		echo '{"status":"1"}';

		$sql = $database->prepare('INSERT INTO admin_logs VALUES (NULL, :log_action, CURRENT_TIMESTAMP, :admin_id)');
		$sql->bindValue(':log_action', 'update.tool');
		$sql->bindValue(':admin_id', $_SESSION['logged']['id']);
		$sql->execute();
	} else echo '{"status":"0"}';
} catch (PDOException $e) {
	echo '{"status":"0"}';
}
