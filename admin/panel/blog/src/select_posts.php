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

	$sql = $database->prepare('SELECT posts.post_id, posts.post_title, posts.post_description, posts.post_image, posts.post_content, posts.post_status, posts.post_visits, admins.admin_name FROM posts INNER JOIN admins ON admins.admin_id = posts.admin_id');
	$sql->execute();

	if ($sql->rowCount()) {
		foreach ($sql as $key) {
			extract($key);
			$data[$post_id] = [$post_title, $post_status, $post_visits, $admin_name, $post_description, $post_image, $post_content];
		}

		echo json_encode($data);
	} else echo '{}';
} catch (PDOException $e) {
	echo '{}';
}
