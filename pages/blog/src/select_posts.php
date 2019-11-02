<?php
try {
	header('Access-Control-Allow-Origin: localhost');
	header('Access-Control-Allow-Methods: GET');
	header('Content-Type: application/json; charset=UTF-8');

	include_once('../../../assets/php/Connection.php');

	$offset = isset($_GET['offset']) ? ($_GET['offset'] - 1) * 6 : 1;

	$sql = $database->prepare("SELECT * FROM posts WHERE post_status = \"1\" ORDER BY post_createdAt DESC LIMIT 6 OFFSET $offset");
	$sql->execute();

	if ($sql->rowCount()) {
		foreach ($sql as $key) {
			extract($key);
			$data["@$post_id"] = [$post_title, $post_image, $post_createdAt];
		}

		echo json_encode($data);
	} else echo '{}';
} catch (PDOException $e) {
	echo '{}';
}
