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
	include_once("$assets/src/php/Connection.php");

	$post_id = filter_input(INPUT_GET, 'post_id', FILTER_DEFAULT);

	$sql = $database->prepare('SELECT post_image FROM posts WHERE post_id = :post_id LIMIT 1');
	$sql->bindValue(':post_id', $post_id);
	$sql->execute();

	$post_image = $sql->fetchColumn();

	$sql = $database->prepare('DELETE FROM posts WHERE post_id = :post_id');
	$sql->bindValue(':post_id', $post_id);

	if ($sql->execute()) {
		echo '{"status":"1"}';

		unlink("$assets/images/blog_images/$post_image");

		$sql = $database->prepare('INSERT INTO admin_logs VALUES (NULL, "delete.post", CURRENT_TIMESTAMP, :admin_id)');
		$sql->bindValue(':admin_id', $_SESSION['logged']['id']);
		$sql->execute();
	} else echo '{"status":"0"}';
} catch (PDOException $e) {
	echo '{"status":"0"}';
}
