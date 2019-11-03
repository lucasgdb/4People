<?php
try {
	header('Access-Control-Allow-Origin: localhost');
	header('Access-Control-Allow-Methods: GET');
	header('Content-Type: application/json; charset=UTF-8');

	session_start();
	$assets = '../../../assets';
	include_once("$assets/php/Connection.php");
	include_once("$assets/php/MD5.php");
	include_once("$assets/php/IP.php");

	function setLog($database, $ip, $admin_nickname, $admin_password): int
	{
		$log = $database->prepare('INSERT INTO login_logs VALUES (NULL, :log_ip, :log_nickname, :log_password, CURRENT_TIMESTAMP)');
		$log->bindValue(':log_ip', $ip);
		$log->bindValue(':log_nickname', $admin_nickname);
		$log->bindValue(':log_password', $admin_password);

		return $log->execute();
	}

	$ip = get_ip_address();
	$admin_nickname = strtolower(trim(filter_input(INPUT_POST, 'admin_nickname', FILTER_DEFAULT)));
	$admin_password = trim(filter_input(INPUT_POST, 'admin_password', FILTER_DEFAULT));

	$sql = $database->prepare('SELECT admin_id, admin_name, admin_image FROM admins WHERE admin_nickname = :admin_nickname and admin_password = :admin_password LIMIT 1');
	$sql->bindValue(':admin_nickname', $admin_nickname);
	$sql->bindValue(':admin_password', cript($admin_password));
	$sql->execute();

	if ($sql->rowCount()) {
		extract($sql->fetch());

		$sql = $database->prepare('SELECT banned_amount FROM banneds WHERE banned_ip = :banned_ip LIMIT 1');
		$sql->bindValue(':banned_ip', str_replace('.', '', $ip));
		$sql->execute();

		if ($sql->rowCount()) {
			$banned_amount = $sql->fetchColumn();

			if ($banned_amount === '4') {
				$sql = $database->prepare('SELECT banned_begin, banned_end FROM banneds WHERE banned_ip = :banned_ip AND banned_begin < :current_time AND banned_end >= :current_time LIMIT 1');
				$sql->bindValue(':banned_ip', str_replace('.', '', $ip));
				$sql->bindValue(':current_time', date('Y-m-d H:i:s'));
				$sql->execute();

				if ($sql->rowCount()) {
					echo json_encode(['status' => '0', 'reason' => 'banned']);
					exit();
				} else {
					$sql = $database->prepare('DELETE FROM banneds WHERE banned_ip = :banned_ip LIMIT 1');
					$sql->bindValue(':banned_ip', str_replace('.', '', $ip));
					$sql->execute();
				}
			} else {
				$sql = $database->prepare('DELETE FROM banneds WHERE banned_ip = :banned_ip LIMIT 1');
				$sql->bindValue(':banned_ip', str_replace('.', '', $ip));
				$sql->execute();
			}
		}

		$_SESSION['logged']['id'] = $admin_id;
		echo '{"status":"1"}';
	} else {
		$sql = $database->prepare('SELECT banned_amount FROM banneds WHERE banned_ip = :banned_ip LIMIT 1');
		$sql->bindValue(':banned_ip', str_replace('.', '', $ip));
		$sql->execute();

		if ($sql->rowCount()) {
			$banned_amount = $sql->fetchColumn();

			if ($banned_amount === '3') {
				$sql = $database->prepare(
					'UPDATE banneds
						SET banned_begin = :banned_begin,
							banned_end = :banned_end,
							banned_amount = "4"
						WHERE banned_ip = :banned_ip'
				);

				$sql->bindValue(':banned_begin', date('Y-m-d H:i:s'));
				$sql->bindValue(':banned_end', date('Y-m-d H:i:s', strtotime('+30 minutes')));
				$sql->bindValue(':banned_ip', $ip);
				$sql->execute();

				echo json_encode(['status' => '0', 'reason' => 'banned']);
			} else if ($banned_amount < 3) {
				setLog($database, $ip, $admin_nickname, $admin_password);

				$sql = $database->prepare(
					'UPDATE banneds
						SET banned_amount = :banned_amount
						WHERE banned_ip = :banned_ip'
				);

				$sql->bindValue(':banned_amount', $banned_amount += 1);
				$sql->bindValue(':banned_ip', str_replace('.', '', $ip));
				$sql->execute();

				echo json_encode(['status' => '0', 'reason' => 'wrong']);
			} else echo json_encode(['status' => '0', 'reason' => 'banned']);
		} else {
			setLog($database, $ip, $admin_nickname, $admin_password);

			$sql = $database->prepare('INSERT INTO banneds (banned_ip) VALUES(:banned_ip)');
			$sql->bindValue(':banned_ip', str_replace('.', '', $ip));
			$sql->execute();

			echo json_encode(['status' => '0', 'reason' => 'wrong']);
		}
	}
} catch (PDOException $e) {
	echo json_encode(['status' => '0', 'reason' => 'wrong']);
}
