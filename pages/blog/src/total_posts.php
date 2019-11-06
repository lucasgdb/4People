<?php
try {
	header('Access-Control-Allow-Origin: localhost');
	header('Access-Control-Allow-Methods: GET');
	header('Content-Type: application/json; charset=UTF-8');

	include_once('../../../assets/src/php/Connection.php');

	$sql = $database->prepare('SELECT COUNT(post_id) AS total FROM posts WHERE post_status = "1"');
	$sql->execute();

	$total = $sql->fetchColumn();

	echo "{\"total\":\"$total\"}";
} catch (PDOException $e) {
	echo '{"total":0}';
}
