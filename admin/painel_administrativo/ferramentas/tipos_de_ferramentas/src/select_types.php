<?php
try {
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once("$assets/php/Connection.php");

	$sql = $database->prepare('SELECT * FROM types');
	$sql->execute();

	foreach ($sql as $key) : extract($key) ?>
		<tr>
			<td><?= $type_name ?></td>
			<td><?= $type_path ?></td>
			<td><i title="<?= $type_icon ?>" class="material-icons" style="top:4px"><?= $type_icon ?></i></td>
			<td>
				<a title="Editar Tipo" href="atualizar_dados/?type_id=<?= $type_id ?>"><i class="material-icons green-text">edit</i></a>
				<i onclick="changeLink('src/delete_type.php?type_id=<?= $type_id ?>', '<?= $type_name ?>')" class="material-icons red-text modal-trigger" style="cursor:pointer" title="Remover Tipo" data-target="removeType">clear</i>
			</td>
		</tr>
	<?php endforeach ?>
<?php
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
