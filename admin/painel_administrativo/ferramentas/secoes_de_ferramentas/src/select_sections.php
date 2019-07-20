<?php
try {
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once("$assets/php/Connection.php");

	$condition = '';

	if (isset($type_id_get) && $type_id_get !== '-1') $condition = "AND types.type_id=:type_id_get";

	$sql = $database->prepare(
		"SELECT sections.*, types.type_name FROM sections
		INNER JOIN types ON types.type_id = sections.type_id
		$condition
		ORDER BY types.type_id"
	);

	if (isset($type_id_get) && $type_id_get !== '-1') $sql->bindValue(':type_id_get', $type_id_get);

	$sql->execute();

	foreach ($sql as $key) : extract($key) ?>
		<tr>
			<td><?= $section_name ?></td>
			<td><?= $section_path ?></td>
			<td><i title="<?= $section_icon ?>" class="material-icons" style="top:4px"><?= $section_icon ?></i></td>
			<td><?= $type_name ?></td>
			<td>
				<a title="Editar Seção" href="atualizar_dados/?section_id=<?= $section_id ?>"><i class="material-icons green-text">edit</i></a>
				<i onclick="changeLink('src/delete_section.php?section_id=<?= $section_id ?>', '<?= $section_name ?>')" class="material-icons red-text modal-trigger" style="cursor:pointer" title="Remover Seção" data-target="removeSection">clear</i>
			</td>
		</tr>
	<?php endforeach ?>
<?php
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
