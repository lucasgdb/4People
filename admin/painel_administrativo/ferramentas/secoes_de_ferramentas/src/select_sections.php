<?php
try {
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once("$assets/php/Connection.php");

	$condition = '';

	if (isset($type_id_get) && $type_id_get !== '-1') $condition = "AND types.type_id = :type_id_get";

	$sql = $database->prepare(
		"SELECT sections.*, types.type_path FROM sections
		INNER JOIN types ON types.type_id = sections.type_id
		$condition
		ORDER BY types.type_id"
	);

	if (isset($type_id_get) && $type_id_get !== '-1') $sql->bindValue(':type_id_get', $type_id_get);

	$sql->execute();

	foreach ($sql as $key) : extract($key) ?>
		<tr>
			<td><?= $section_name ?></td>
			<td><i title="<?= $section_icon ?>" class="material-icons" style="top:4px"><?= $section_icon ?></i></td>
			<td>
				<button data-clipboard-text="<?= "$type_path/$section_path/" ?>" title="Copiar caminho da Seção" class="btn waves-effect waves-light teal darken-2 z-depth-0 copy"><i class="material-icons" style="cursor:pointer">content_copy</i></button>
				<a href="<?= "$root/$type_path/$section_path/" ?>" title="Ir até à Seção" class="btn waves-effect waves-light indigo darken-4 z-depth-0"><i class="material-icons">insert_link</i></a>
			</td>
			<td>
				<a class="btn waves-effect waves-light green darken-3 z-depth-0" title="Editar Seção" href="atualizar_dados/?section_id=<?= $section_id ?>"><i class="material-icons" style="font-size:22px">edit</i></a>
				<button class="btn waves-effect waves-light red accent-4 z-depth-0 modal-trigger" onclick="changeLink('src/delete_section.php?section_id=<?= $section_id ?>', '<?= $section_name ?>')" style="cursor:pointer" title="Remover Seção" data-target="removeSection"><i class="material-icons" style="font-size:23px">delete</i></button>
			</td>
		</tr>
	<?php endforeach ?>
<?php
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
