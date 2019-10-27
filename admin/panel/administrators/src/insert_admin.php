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

	$assets = '../../../../assets';
	include_once("$assets/php/Connection.php");
	include_once("$assets/php/MD5.php");

	$admin_name = trim(filter_input(INPUT_POST, 'admin_name', FILTER_DEFAULT));
	$admin_nickname = strtolower(trim(filter_input(INPUT_POST, 'admin_nickname', FILTER_DEFAULT)));
	$admin_email = trim(filter_input(INPUT_POST, 'admin_email', FILTER_DEFAULT));
	$admin_password = trim(filter_input(INPUT_POST, 'admin_password', FILTER_DEFAULT));
	$admin_image = $_FILES['admin_image'];
	$ext = strtolower(pathinfo($_FILES['admin_image']['name'], PATHINFO_EXTENSION));

	$long_name = "$admin_nickname.$ext";

	if ($ext) {
		move_uploaded_file($_FILES['admin_image']['tmp_name'], "$assets/images/admin_images/$long_name");
	} else $no_image = '';

	$sql = $database->prepare('INSERT INTO admins VALUES (DEFAULT, :admin_name, :admin_nickname, :admin_email, :admin_password, :admin_image)');

	$sql->bindValue(':admin_name', $admin_name);
	$sql->bindValue(':admin_nickname', $admin_nickname);
	$sql->bindValue(':admin_email', $admin_email);
	$sql->bindValue(':admin_password', cript($admin_password));
	$sql->bindValue(':admin_image', isset($no_image) ? NULL : $long_name);

	if ($sql->execute()) {
		echo '{"status":"1"}';

		$sql = $database->prepare('INSERT INTO admin_logs VALUES (NULL, :log_action, CURRENT_TIMESTAMP, :admin_id)');
		$sql->bindValue(':log_action', 'insert.administrator');
		$sql->bindValue(':admin_id', $_SESSION['logged']['id']);
		$sql->execute();
	} else echo '{"status":"0"}';
} catch (PDOException $e) {
	echo '{"status":"0"}';
}
