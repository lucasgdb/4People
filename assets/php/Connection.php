<?php
try {
	$database = new PDO('mysql:host=127.0.0.1;dbname=4People;charset=utf8', 'root', 'secret', []);
} catch (Exception $ex) { }
