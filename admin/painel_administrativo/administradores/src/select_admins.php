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

	include_once('../../../../assets/php/Connection.php');

	$admin_name = filter_input(INPUT_GET, 'admin_name', FILTER_DEFAULT);

	$condition = '';
	if (isset($admin_name)) $condition = 'WHERE admin_name LIKE :admin_name';

	$sql = $database->prepare("SELECT admin_id, admin_name, admin_nickname, admin_email, admin_image FROM admins $condition");

	if (isset($admin_name)) $sql->bindValue(':admin_name', "%$admin_name%");
	$sql->execute();

	if ($sql->rowCount()) {
		foreach ($sql as $key) {
			extract($key);
			$data[$admin_id] = [$admin_name, $admin_nickname, $admin_email, $admin_image];
		}

		echo json_encode($data);
	} else echo '{}';
} catch (PDOException $e) {
	echo '{}';
}
