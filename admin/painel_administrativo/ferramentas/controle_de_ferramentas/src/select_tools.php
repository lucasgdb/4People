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

	include_once('../../../../../assets/php/Connection.php');

	$type_id_get = filter_input(INPUT_GET, 'type_id', FILTER_DEFAULT);
	$section_id_get = filter_input(INPUT_GET, 'section_id', FILTER_DEFAULT);
	$tool_status_get = filter_input(INPUT_GET, 'tool_status', FILTER_DEFAULT);

	$condition = '';
	if (isset($type_id_get) && $type_id_get !== '-1') $condition = "WHERE types.type_id = :type_id";

	if (isset($section_id_get) && $section_id_get !== '-1') {
		$condition .= $condition === '' ? 'WHERE ' : ' AND ';
		$condition .= "sections.section_id = :section_id";
	}

	if (isset($tool_status_get) && $tool_status_get !== '-1') {
		$condition .= $condition === '' ? 'WHERE ' : ' AND ';
		$condition .= "tools.tool_status = :tool_status";
	}

	$sql = $database->prepare(
		"SELECT tools.*, types.type_path, sections.section_id, sections.section_path FROM tools
		INNER JOIN sections ON sections.section_id = tools.section_id
		INNER JOIN types ON types.type_id = sections.type_id
		$condition
		ORDER BY tools.tool_visits DESC"
	);

	if (isset($type_id_get) && $type_id_get !== '-1') $sql->bindValue(':type_id', $type_id_get);
	if (isset($section_id_get) && $section_id_get !== '-1') $sql->bindValue(':section_id', $section_id_get);
	if (isset($tool_status_get) && $tool_status_get !== '-1') $sql->bindValue(':tool_status', $tool_status_get);

	$sql->execute();

	if ($sql->rowCount()) {
		foreach ($sql as $key) {
			extract($key);
			$data[$tool_name] = [$tool_id, $tool_path, $tool_description, $tool_link, $tool_visits, $tool_status, $type_path, $section_path, $section_id];
		}

		echo json_encode($data);
	} else echo '{}';
} catch (PDOException $e) {
	echo '{}';
}
