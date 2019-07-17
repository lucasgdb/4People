<?php
try {
	if (!isset($_SESSION['logged'])) {
		header("HTTP/1.0 404 Not Found");
		exit();
	}

	include_once("$assets/php/connection.php");

	$sql = $database->prepare("SELECT * FROM admins");
	$sql->execute();

	foreach ($sql as $key) : extract($key) ?>
		<tr>
			<td><?= $admin_name ?></td>
			<td><?= $admin_nickname ?></td>
			<td><?= $admin_email ?></td>
			<td>
				<a title="Editar Administrador" href="atualizar_dados/?admin_id=<?= $admin_id ?>"><i class="material-icons green-text">edit</i></a>
				<i onclick="changeLink('src/delete_admin.php?admin_id=<?= $admin_id ?>', '<?= $admin_name ?>')" class="material-icons red-text modal-trigger" style="cursor:pointer" title="Remover Administrador" data-target="removeAdmin">clear</i>
			</td>
		</tr>
	<?php endforeach ?>
<?php
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
