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

	$p = pathinfo($_SERVER['SCRIPT_FILENAME'])['dirname'];
	$assets = '';
	$root = '.';

	do {
		if (is_dir($p . '/assets/')) {
			$assets .= 'assets';
			if ($root[strlen($root) - 1] === '/') $root = substr($root, 0, -1);

			break;
		} else {
			$assets .= '../';
			if ($root === '.') $root = '';

			$root .= '../';
			$p = explode('/', $p);
			unset($p[count($p) - 1]);
			$p = implode('/', $p);
		}
	} while (true);

	include_once("php/Connection.php");

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
