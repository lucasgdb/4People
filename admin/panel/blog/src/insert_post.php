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
	include_once("$assets/src/php/Connection.php");

	$post_title = trim(filter_input(INPUT_POST, 'post_title', FILTER_DEFAULT));
	$post_description = trim(filter_input(INPUT_POST, 'post_description', FILTER_DEFAULT));
	$post_content = trim(filter_input(INPUT_POST, 'post_content', FILTER_DEFAULT));
	$post_status = filter_input(INPUT_POST, 'post_status', FILTER_DEFAULT);
	$post_image = $_FILES['post_image'];
	$ext = strtolower(pathinfo($post_image['name'], PATHINFO_EXTENSION));

	$long_name = "$post_title.$ext";

	if ($ext) {
		move_uploaded_file($post_image['tmp_name'], "$assets/images/blog_images/$long_name");
	} else $no_image = '';

	$sql = $database->prepare('INSERT INTO posts VALUES (NULL, :post_title, :post_image, :post_description, :post_content, DEFAULT, :post_status, CURRENT_TIMESTAMP, :admin_id)');

	$sql->bindValue(':post_title', $post_title);
	$sql->bindValue(':post_description', $post_description);
	$sql->bindValue(':post_content', $post_content);
	$sql->bindValue(':post_image', $long_name);
	$sql->bindValue(':post_status', $post_status);
	$sql->bindValue(':admin_id', $_SESSION['logged']['id']);

	if ($sql->execute()) {
		echo '{"status":"1"}';

		$sql = $database->prepare('INSERT INTO admin_logs VALUES (NULL, :log_action, CURRENT_TIMESTAMP, :admin_id)');
		$sql->bindValue(':log_action', 'insert.post');
		$sql->bindValue(':admin_id', $_SESSION['logged']['id']);
		$sql->execute();
	} else echo '{"status":"0"}';
} catch (PDOException $e) {
	echo '{"status":"0"}';
}
