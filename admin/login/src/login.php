<?php
try {
	include_once('../../../assets/connection.php');
	include_once('../../painel_administrativo/src/MD5.php');

	$user_nickname = filter_input(INPUT_POST, 'user_nickname', FILTER_DEFAULT);
	$user_password = cript(filter_input(INPUT_POST, 'user_password', FILTER_DEFAULT));

	$sql = $database->prepare("SELECT user_name, user_image FROM users WHERE user_nickname=:user_nickname and user_password=:user_password");

	$sql->bindValue(":user_nickname", $user_nickname);
	$sql->bindValue(":user_password", $user_password);

	if ($sql->execute() && $sql->rowCount()) {
		session_start();

		$data = $sql->fetchAll()[0];
		$_SESSION['logged']['name'] = $data['user_name'];
		$_SESSION['logged']['image'] = $data['user_image'];
		header('Location: ../../painel_administrativo/');
	} else {
		header('Location: ../');
	}
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
