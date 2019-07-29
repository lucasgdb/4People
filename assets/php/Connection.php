<?php
try {
	$database = new PDO('mysql:host=172.18.0.2;dbname=4People;charset=utf8', 'root', 'secret', []);
} catch (Exception $ex) { }
