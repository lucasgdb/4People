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

	include_once('../../../../assets/php/Connection.php');

	$page = filter_input(INPUT_GET, 'page', FILTER_DEFAULT);
	$page = isset($page) && $page > 0 ? ($page - 1) * 10 : 0;

	$sql = $database->prepare('SELECT COUNT(log_id) FROM admin_logs LIMIT 1');
	$sql->execute();

	$total = $sql->fetchColumn();

	if ($page > $total) $page = $total - ($total % 10);

	$sql = $database->prepare('SELECT banned_ip, banned_begin, banned_end FROM banneds WHERE banned_amount = "4" LIMIT 10 OFFSET :page');
	$sql->bindValue(':page', (int) $page, PDO::PARAM_INT);
	$sql->execute();

	if ($sql->rowCount()) {
		foreach ($sql as $key) {
			extract($key);
			$data[$banned_ip] = [$banned_begin, $banned_end];
		}

		echo json_encode($data);
	} else echo '{}';
} catch (PDOException $e) {
	echo '{}';
}
