<?php
try {
	session_start();
	if (!isset($_SESSION['logged'])) {
		header("HTTP/1.0 404 Not Found");
		exit();
	}
	include_once('../../../../assets/connection.php');

	$admin_id = filter_input(INPUT_GET, 'admin_id', FILTER_DEFAULT);

	$sql = $database->prepare('SELECT admin_image FROM admins WHERE admin_id=:admin_id');
	$sql->bindValue(':admin_id', $admin_id);
	$sql->execute();

	$admin_image = $sql->fetchColumn();
	if ($admin_image) {
		unlink("../../../../assets/images/admin_images/$admin_image");

		if ($admin_id === $_SESSION['logged']['id']) {
			unset($_SESSION['logged']);
			header('Location: ../../../login/');
		} else header('Location: ../');
	} else header('Location: ../');

	$sql = $database->prepare('DELETE FROM admins WHERE admin_id=:admin_id');
	$sql->bindValue(':admin_id', $admin_id);
	$sql->execute();
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
