<?php
try {
	session_start();
	$url = $_SERVER['REQUEST_URI'];

	$pos = strpos($url, '?');

	if (strpos($url, '?') === false && $url[strlen($url) - 1] !== '/') {
		header("Location: $url/");
		exit();
	} else if ($pos && $url[$pos - 1] !== '/') {
		$url = preg_replace('/[?]/', '/?', $url, 1);
		header("Location: $url");
		exit();
	}

	$assets = "$root/assets";

	include_once("$assets/php/Connection.php");

	$current_time = date('Y-m-d H:i:s');

	$sql = $database->prepare(
		'SELECT * FROM maintenances WHERE
		(:current_time >= maintenance_begin AND :current_time <= maintenance_end) OR
		(maintenance_begin IS NULL AND :current_time <= maintenance_end) OR
		(:current_time >= maintenance_begin AND maintenance_end IS NULL) OR
		(maintenance_begin IS NULL AND maintenance_end IS NULL)'
	);

	$sql->bindValue(':current_time', $current_time);
	$sql->execute();

	if ($sql->rowCount() > 0) {
		if (!isset($login_page) && !isset($_SESSION['logged'])) {
			header("Location: $root/pages/maintenance/");
		}
	}
} catch (Exception $ex) { }
