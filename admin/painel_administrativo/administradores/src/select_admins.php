<?php
try {
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once("$assets/php/Connection.php");

	$sql = $database->prepare('SELECT admin_id, admin_name, admin_nickname, admin_email FROM admins');
	$sql->execute();

	foreach ($sql as $key) : extract($key) ?>
		<tr>
			<td><?= $admin_name ?></td>
			<td><?= $admin_nickname ?></td>
			<td><?= $admin_email ?></td>
			<td>
				<a class="btn waves-effect waves-light green darken-3 z-depth-0" title="Editar Administrador" href="atualizar_dados/?admin_id=<?= $admin_id ?>"><i class="material-icons" style="font-size:22px">edit</i></a>
				<button class="btn waves-effect waves-light red accent-4 z-depth-0 modal-trigger" onclick="changeLink('src/delete_admin.php?admin_id=<?= $admin_id ?>', '<?= $admin_name ?>')" style="cursor:pointer" title="Remover Administrador" data-target="removeAdmin"><i class="material-icons" style="font-size:24px">delete</i></button>
			</td>
		</tr>
	<?php endforeach ?>
<?php
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
