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
			<td><i title="<?= $type_icon ?>" class="material-icons" style="top:4px"><?= $type_icon ?></i></td>
			<td>
				<button data-clipboard-text="<?= "$type_path/" ?>" title="Copiar caminho do Tipo" class="btn waves-effect waves-light teal darken-2 z-depth-0 copy"><i class="material-icons" style="cursor:pointer">content_copy</i></button>
				<a href="<?= "$root/$type_path/" ?>" title="Ir até ao Tipo" class="btn waves-effect waves-light indigo darken-4 z-depth-0"><i class="material-icons">insert_link</i></a>
			</td>
			<td>
				<a class="btn waves-effect waves-light green darken-3 z-depth-0" title="Editar Tipo" href="atualizar_dados/?type_id=<?= $type_id ?>"><i class="material-icons" style="font-size:22px">edit</i></a>
				<button class="btn waves-effect waves-light red accent-4 z-depth-0 modal-trigger" onclick="changeLink('src/delete_type.php?type_id=<?= $type_id ?>', '<?= $type_name ?>')" style="cursor:pointer" title="Remover Tipo" data-target="removeType"><i class="material-icons" style="font-size:23px">delete</i></button>
			</td>
		</tr>
	<?php endforeach ?>
<?php
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
