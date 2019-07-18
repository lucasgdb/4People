<?php
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
	if (is_dir($p . '/assets')) {
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
