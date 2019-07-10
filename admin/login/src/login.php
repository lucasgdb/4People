<?php
try {
	include_once('../../../assets/connection.php');

	$user_email = filter_input(INPUT_POST, 'user_email', FILTER_DEFAULT);
	$user_password = filter_input(INPUT_POST, 'user_password', FILTER_DEFAULT);

	$sql = $database->prepare("SELECT user_name, user_email, user_image, user_level FROM users WHERE user_email=:user_email and user_password=:user_password");

	$sql->bindValue(":user_email", $user_email);
	$sql->bindValue(":user_password", MD5($user_password));

	$sql->execute();

	$data = $sql->fetchAll();

	if ($sql->rowCount()) {
		session_start();
		$_SESSION['logged']['email'] = $user_email;
		$_SESSION['logged']['name'] = $data[0]['user_name'];
		$_SESSION['logged']['level'] = $data[0]['user_level'];
		header('Location: ../../../');
	} else {
		header('Location: ../');
	}
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
