<?php
try {
	include_once('../../../../assets/connection.php');
	include_once('../../src/MD5.php');

	$admin_id = filter_input(INPUT_POST, 'admin_id', FILTER_DEFAULT);
	$admin_name = filter_input(INPUT_POST, 'admin_name', FILTER_DEFAULT);
	$admin_nickname = filter_input(INPUT_POST, 'admin_nickname', FILTER_DEFAULT);
	$admin_email = filter_input(INPUT_POST, 'admin_email', FILTER_DEFAULT);
	$admin_password = filter_input(INPUT_POST, 'admin_password', FILTER_DEFAULT);

	$oldData = $database->prepare("SELECT admin_password FROM admins");
	$oldData->execute();

	$current_password = $oldData->fetchAll()[0]['admin_password'];

	$sql = $database->prepare(
		'UPDATE admins
		SET admin_name=:admin_name, admin_nickname=:admin_nickname, admin_email=:admin_email, admin_password=:admin_password
		WHERE admin_id=:admin_id'
	);

	$sql->bindValue(':admin_name', $admin_name);
	$sql->bindValue(':admin_nickname', $admin_nickname);
	$sql->bindValue(':admin_email', $admin_email);
	$sql->bindValue(':admin_password', $admin_password === '' ? $current_password : cript($admin_password));
	$sql->bindValue(':admin_id', $admin_id);

	session_start();
	if ($sql->execute() && $_SESSION['logged']['id'] === $admin_id) {
		$_SESSION['logged']['name'] = $admin_name;
	}

	header('Location: ../');
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
