<?php
try {
	header('Access-Control-Allow-Origin: localhost');
	header("Access-Control-Allow-Methods: GET");
	header('Content-Type: application/json; charset=UTF-8');

	session_start();
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once("../../../../../assets/php/Connection.php");

	$type_id_get = filter_input(INPUT_GET, 'type_id', FILTER_DEFAULT);
	$condition = '';
	if (isset($type_id_get) && $type_id_get !== '-1') $condition = "AND types.type_id = :type_id";

	$sql = $database->prepare(
		"SELECT sections.*, types.type_path FROM sections
		INNER JOIN types ON types.type_id = sections.type_id
		$condition
		ORDER BY types.type_id"
	);

	if (isset($type_id_get) && $type_id_get !== '-1') $sql->bindValue(':type_id', $type_id_get);

	$sql->execute();

	foreach ($sql as $key) {
		extract($key);
		$data[$section_id] = [$section_name, $section_path, $section_icon, $type_path];
	}

	if ($sql->rowCount()) echo json_encode($data);
	else echo '{}';
} catch (PDOException $e) {
	echo '{}';
}
