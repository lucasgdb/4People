<?php
$begin = $_POST['begin'];
$end = $_POST['end'];

$now = new DateTime($begin);
$tomorrow = new DateTime($end);

$difference = $now->diff($tomorrow)->format('%y ano(s), %m mês(es), %d dia(s), %h hora(s) e %i minuto(s)');

echo json_encode(['difference' => $difference]);
