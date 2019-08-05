<?php
header('Access-Control-Allow-Origin: localhost');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json; charset=UTF-8');

$begin = filter_input(INPUT_GET, 'begin', FILTER_DEFAULT);
$end = filter_input(INPUT_GET, 'end', FILTER_DEFAULT);

$now = new DateTime($begin);
$tomorrow = new DateTime($end);

$difference = $now->diff($tomorrow)->format('%y ano(s), %m mês(es), %d dia(s), %h hora(s) e %i minuto(s)');

echo "{\"difference\":\"$difference\"}";
