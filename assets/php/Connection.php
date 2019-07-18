<?php
try {
	$database = new PDO('mysql:host=127.0.0.1;dbname=4people;charset=utf8', 'root', '', []);
} catch (Exception $ex) { }
