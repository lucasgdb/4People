<?php
try {
	include_once('../../../../assets/connection.php');

	$admin_id = filter_input(INPUT_GET, 'admin_id', FILTER_DEFAULT);

	$sql = $database->prepare('DELETE FROM admins WHERE admin_id=:admin_id');
	$sql->bindValue(':admin_id', $admin_id);
	$sql->execute();

	header('Location: ../');
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
