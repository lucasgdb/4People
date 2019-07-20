<?php
try {
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once("$assets/php/Connection.php");

	$sql = $database->prepare(
		'SELECT s.*, t.type_name FROM sections s
		INNER JOIN types t ON t.type_id = s.type_id
		ORDER BY t.type_id'
	);
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
