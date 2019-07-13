<?php
try {
	include_once("$assets/connection.php");

	$sql = $database->prepare("SELECT * FROM admins");
	$sql->execute();

	foreach ($sql as $key) : extract($key) ?>
		<tr>
			<td><?= $admin_name ?></td>
			<td><?= $admin_nickname ?></td>
			<td><?= $admin_email ?></td>
			<td><a title="Editar Administrador" href="./atualizar_dados/?admin_id=<?= $admin_id ?>"><i class="material-icons green-text">edit</i></a> <a title="Remover Administrador" href="src/delete_admin.php?admin_id=<?= $admin_id ?>"><i class="material-icons red-text">clear</i></a></td>
		</tr>
	<?php endforeach ?>
<?php
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
