<?php
try {
	include_once('../../../assets/connection.php');
	include_once('../../painel_administrativo/src/MD5.php');
	include_once('../../painel_administrativo/src/IP.php');

	$ip = get_ip_address();
	$user_nickname = filter_input(INPUT_POST, 'user_nickname', FILTER_DEFAULT);
	$user_password = cript(filter_input(INPUT_POST, 'user_password', FILTER_DEFAULT));

	$sql = $database->prepare('SELECT user_name, user_image FROM users WHERE user_nickname=:user_nickname and user_password=:user_password');

	$sql->bindValue(":user_nickname", $user_nickname);
	$sql->bindValue(":user_password", $user_password);
	$sql->execute();

	session_start();
	if ($sql->rowCount()) {
		$data = $sql->fetchAll()[0];

		$sql = $database->prepare('SELECT banned_status, banned_datetime FROM banneds WHERE banned_ip=:banned_ip');

		$sql->bindValue(':banned_ip', $ip);
		$sql->execute();

		if ($sql->rowCount()) {
			$banned_data = $sql->fetchAll()[0];
			$banned_status = $banned_data['banned_status'];
			$banned_datetime = $banned_data['banned_datetime'];

			if ($banned_status === '1') {
				$banned_datetime = new DateTime($banned_datetime);
				$now = new DateTime();

				$difference = $now->diff($banned_datetime)->format('%i');

				if ($difference > 29) {
					$sql = $database->prepare('DELETE FROM banneds WHERE banned_ip=:banned_ip');

					$sql->bindValue(':banned_ip', $ip);
					$sql->execute();
				} else {
					header('Location: ../');
					exit();
				}
			}
		}

		$_SESSION['logged']['name'] = $data['user_name'];
		$_SESSION['logged']['image'] = $data['user_image'];
		header('Location: ../../painel_administrativo/');
	} else {
		$sql = $database->prepare('SELECT banned_status, banned_amount FROM banneds WHERE banned_ip=:banned_ip');

		$sql->bindValue(':banned_ip', $ip);
		$sql->execute();

		if ($sql->rowCount()) {
			$data = $sql->fetchAll()[0];
			$banned_status = $data['banned_status'];

			if ($banned_status !== '1') {
				$banned_amount = ++$data['banned_amount'];

				if ($banned_amount > 3) {
					$sql = $database->prepare(
						'UPDATE banneds
						SET banned_status=:banned_status, banned_datetime=:banned_datetime, banned_amount="4"
						WHERE banned_ip=:banned_ip'
					);

					$sql->bindValue(':banned_status', '1');
					$sql->bindValue(':banned_datetime', date("Y-m-d H:i:s"));
					$sql->bindValue(':banned_ip', $ip);

					$sql->execute();
				} else {
					$sql = $database->prepare(
						'UPDATE banneds
						SET banned_amount=:banned_amount
						WHERE banned_ip=:banned_ip'
					);

					$sql->bindValue(':banned_amount', $banned_amount);
					$sql->bindValue(':banned_ip', $ip);

					$sql->execute();
				}
			}
		} else {
			$sql = $database->prepare('INSERT INTO banneds (banned_ip) VALUES(:banned_ip)');

			$sql->bindValue(':banned_ip', $ip);

			$sql->execute();
		}

		header('Location: ../');
	}
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
