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

	$assets = '../../../../assets';
	include_once("$assets/php/Connection.php");

	$admin_id = filter_input(INPUT_GET, 'admin_id', FILTER_DEFAULT);

	$sql = $database->prepare('SELECT admin_name, admin_image FROM admins WHERE admin_id = :admin_id LIMIT 1');
	$sql->bindValue(':admin_id', $admin_id);
	$sql->execute();

	extract($sql->fetch());
	if ($admin_image && file_exists("$assets/images/admin_images/$admin_image")) unlink("../../../../assets/images/admin_images/$admin_image");

	if ($admin_id === $_SESSION['logged']['id']) {
		unset($_SESSION['logged']);
		$result = '1';
	} else $result = '0';

	$sql = $database->prepare('DELETE FROM admins WHERE admin_id = :admin_id');
	$sql->bindValue(':admin_id', $admin_id);

	if ($sql->execute()) {
		echo json_encode(['result' => $result, 'admin_name' => $admin_name, 'status' => '1']);

		$sql = $database->prepare('INSERT INTO admin_logs VALUES (NULL, :log_action, CURRENT_TIMESTAMP, :admin_id)');
		$sql->bindValue(':log_action', 'delete.administrator');
		$sql->bindValue(':admin_id', $_SESSION['logged']['id']);
		$sql->execute();
	} else echo json_encode(['status' => '0', 'admin_name' => $admin_name]);
} catch (PDOException $e) {
	echo json_encode(['status' => '0', 'admin_name' => 'Administrador']);
}
