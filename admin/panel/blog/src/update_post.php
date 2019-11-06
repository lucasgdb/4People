<?php
try {
	session_start();
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	$assets = '../../../../assets';
	include_once("$assets/src/php/Connection.php");

	$post_id = filter_input(INPUT_POST, 'post_id', FILTER_DEFAULT);
	$post_title = trim(filter_input(INPUT_POST, 'post_title', FILTER_DEFAULT));
	$post_description = trim(filter_input(INPUT_POST, 'post_description', FILTER_DEFAULT));
	$post_content = trim(filter_input(INPUT_POST, 'post_content', FILTER_DEFAULT));
	$post_status = filter_input(INPUT_POST, 'post_status', FILTER_DEFAULT);
	$post_image = $_FILES['post_image'];
	$post_image_text = filter_input(INPUT_POST, 'post_image_text', FILTER_DEFAULT);
	$ext = strtolower(pathinfo($post_image['name'], PATHINFO_EXTENSION));

	$sql = $database->prepare('SELECT post_title, post_image FROM posts WHERE post_id = :post_id LIMIT 1');
	$sql->bindValue(':post_id', $post_id);
	$sql->execute();

	$data = $sql->fetch();
	$current_post_title = $data['post_title'];
	$current_post_image = $data['post_image'];

	if ($current_post_title !== $post_title) {
		$ext = pathinfo($post_image_text, PATHINFO_EXTENSION);
		$long_name = "$post_title.$ext";
	} else if ($ext) {
		$long_name = "$post_title.$ext";
	} else {
		$long_name = $current_post_image;
	}

	$sql = $database->prepare('UPDATE posts SET post_title = :post_title, post_description = :post_description, post_content = :post_content, post_status = :post_status, post_image = :post_image WHERE post_id = :post_id');

	$sql->bindValue(':post_id', $post_id);
	$sql->bindValue(':post_title', $post_title);
	$sql->bindValue(':post_description', $post_description);
	$sql->bindValue(':post_content', $post_content);
	$sql->bindValue(':post_image', $long_name);
	$sql->bindValue(':post_status', $post_status);

	if ($sql->execute()) {
		echo '{"status":"1"}';

		if ($current_post_title !== $post_title) {
			rename("$assets/images/blog_images/$current_post_image", "$assets/images/blog_images/$long_name");
		} else if ($ext) {
			unlink("$assets/images/blog_images/$current_post_image");
			move_uploaded_file($post_image['tmp_name'], "$assets/images/blog_images/$long_name");
		}

		$sql = $database->prepare('INSERT INTO admin_logs VALUES (NULL, :log_action, CURRENT_TIMESTAMP, :admin_id)');
		$sql->bindValue(':log_action', 'update.post');
		$sql->bindValue(':admin_id', $_SESSION['logged']['id']);
		$sql->execute();
	} else echo '{"status":"0"}';
} catch (PDOException $e) {
	echo '{"status":"0"}';
}
