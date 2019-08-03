<?php
header('Access-Control-Allow-Origin: localhost');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json; charset=UTF-8');

$assets = '../../../assets';
include_once("$assets/php/Connection.php");
include_once("$assets/php/IP.php");

$ip = get_ip_address();
$sql = $database->prepare('SELECT banned_amount FROM banneds WHERE banned_ip = :banned_ip');

$sql->bindValue(':banned_ip', $ip);
$sql->execute();

if ($sql->rowCount()) {
	$banned_amount = $sql->fetchColumn();

	if ($banned_amount > 3) {
		$sql = $database->prepare('SELECT banned_begin, banned_end, banned_amount FROM banneds WHERE banned_ip = :banned_ip AND banned_begin <= :current_time AND banned_end > :current_time LIMIT 1');

		$sql->bindValue(':banned_ip', $ip);
		$sql->bindValue(':current_time', date('Y-m-d H:i:s'));

		$sql->execute();

		if ($sql->rowCount()) {
			extract($sql->fetch());

			$banned_begin = new DateTime($banned_begin);
			$banned_end = new DateTime($banned_end);
			$current_time = new DateTime();

			$time = $current_time->diff($banned_end)->format('%I:%S');

			echo json_encode(['banned_status' => '1', 'banned_amount' => $banned_amount, 'banned_time' => $time]);
		} else {
			$sql = $database->prepare('DELETE FROM banneds WHERE banned_ip = :banned_ip');

			$sql->bindValue(':banned_ip', $ip);
			$sql->execute();
			unset($banned_amount);

			echo '{"banned_status":"0"}';
		}
	} else echo json_encode(['banned_status' => '1', 'banned_amount' => $banned_amount]);
} else echo '{"banned_status":"0"}';
