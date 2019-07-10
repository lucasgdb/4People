<?php
try {
	include_once('../../../assets/connection.php');

	$user_password = filter_input(INPUT_POST, 'user_password', FILTER_DEFAULT);
	$user_password_again = filter_input(INPUT_POST, 'user_password_again', FILTER_DEFAULT);

	if ($user_password === $user_password_again) {
		$user_name = filter_input(INPUT_POST, 'user_name', FILTER_DEFAULT);
		$user_email = filter_input(INPUT_POST, 'user_email', FILTER_DEFAULT);

		$sql = $database->prepare('INSERT INTO users VALUES (DEFAULT, :user_name, :user_email, :user_password, NULL, DEFAULT)');

		$sql->bindValue(':user_name', $user_name);
		$sql->bindValue(':user_email', $user_email);
		$sql->bindValue(':user_password', MD5($user_password));

		if ($sql->execute()) header('location: ../../login/');
		else header('location: ../');
	} else header('Location: ../');
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
