<?php
try {
	header('Access-Control-Allow-Origin: localhost');
	header('Access-Control-Allow-Methods: GET');
	header('Content-Type: application/json; charset=UTF-8');

	session_start();
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once('../../../assets/php/Connection.php');

	$sql = $database->prepare('SELECT tool_name, tool_visits FROM tools WHERE tool_status = "1" ORDER BY tool_visits DESC LIMIT 10');
	$sql->execute();

	if ($sql->rowCount()) {
		foreach ($sql as $key) {
			extract($key);
			$data[] = [$tool_visits, $tool_name];
		}

		echo json_encode($data);
	} else echo '{}';
} catch (Exception $ex) {
	echo '{}';
}
