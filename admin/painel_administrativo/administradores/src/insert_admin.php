<?php
try {
	include_once('../../../../assets/connection.php');
	include_once('../../src/MD5.php');

	$admin_password = filter_input(INPUT_POST, 'admin_password', FILTER_DEFAULT);
	$admin_password_again = filter_input(INPUT_POST, 'admin_password_again', FILTER_DEFAULT);

	if ($admin_password === $admin_password_again) {
		$admin_name = filter_input(INPUT_POST, 'admin_name', FILTER_DEFAULT);
		$admin_nickname = filter_input(INPUT_POST, 'admin_nickname', FILTER_DEFAULT);
		$admin_email = filter_input(INPUT_POST, 'admin_email', FILTER_DEFAULT);

		$sql = $database->prepare('INSERT INTO admins VALUES (DEFAULT, :admin_name, :admin_nickname, :admin_email, :admin_password, NULL)');

		$sql->bindValue(':admin_name', $admin_name);
		$sql->bindValue(':admin_nickname', $admin_nickname);
		$sql->bindValue(':admin_email', $admin_email);
		$sql->bindValue(':admin_password', cript($admin_password));

		$sql->execute();
	}

	header('Location: ../');
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
