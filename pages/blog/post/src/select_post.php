<?php
try {
	header('Access-Control-Allow-Origin: localhost');
	header('Access-Control-Allow-Methods: GET');
	header('Content-Type: application/json; charset=UTF-8');

	session_start();
	include_once('../../../../assets/src/php/Connection.php');

	$post_id = filter_input(INPUT_GET, 'post_id', FILTER_DEFAULT);
	$post_id = $post_id < 1 ? 1 : $post_id;

	$sql = $database->prepare('SELECT COUNT(post_id) FROM posts WHERE post_status = "1" LIMIT 1');
	$sql->execute();

	$total = $sql->fetchColumn();

	$sql = $database->prepare(
		'SELECT posts.post_title, posts.post_image, posts.post_description, posts.post_content, posts.post_visits, posts.post_createdAt, admins.admin_name FROM posts
			INNER JOIN admins ON admins.admin_id = posts.admin_id
			WHERE post_status = "1" AND post_id = :post_id
			LIMIT 1'
	);

	$sql->bindValue(':post_id', $post_id);

	if ($sql->execute() && $sql->rowCount()) {
		echo json_encode($sql->fetch());

		if (!isset($_SESSION['logged'])) {
			$sql = $database->prepare('SELECT post_visits FROM posts WHERE post_status = "1" AND post_id = :post_id LIMIT 1');
			$sql->bindValue(':post_id', $post_id);
			$sql->execute();

			$visits = $sql->fetchColumn();

			$sql = $database->prepare('UPDATE posts SET post_visits = :post_visits WHERE post_id = :post_id');
			$sql->bindValue(':post_visits', ++$visits);
			$sql->bindValue(':post_id', $post_id);
			$sql->execute();
		}
	} else echo '{}';
} catch (PDOException $e) {
	echo '{}';
}
