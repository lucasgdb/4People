<?php
try {
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once("$assets/php/Connection.php");

	$condition = '';

	if (isset($type_id_get) && $type_id_get !== '-1') $condition = "WHERE types.type_id = :type_id_get";

	if (isset($section_id_get) && $section_id_get !== '-1') {
		$condition .= $condition === '' ? 'WHERE ' : ' AND ';
		$condition .= "sections.section_id = :section_id_get";
	}

	if (isset($tool_active_get) && $tool_active_get !== '-1') {
		$condition .= $condition === '' ? 'WHERE ' : ' AND ';
		$condition .= "tools.tool_active = :tool_active_get";
	}

	$sql = $database->prepare(
		"SELECT tools.*, types.type_name, sections.section_name FROM tools
		INNER JOIN sections ON sections.section_id = tools.section_id
		INNER JOIN types ON types.type_id = sections.type_id
		$condition
		ORDER BY types.type_id, sections.section_id, tools.tool_visits DESC"
	);

	if (isset($type_id_get) && $type_id_get !== '-1') $sql->bindValue(':type_id_get', $type_id_get);
	if (isset($section_id_get) && $section_id_get !== '-1') $sql->bindValue(':section_id_get', $section_id_get);
	if (isset($tool_active_get) && $tool_active_get !== '-1') $sql->bindValue(':tool_active_get', $tool_active_get);

	$sql->execute();

	foreach ($sql as $key) : extract($key) ?>
		<tr>
			<td><?= $tool_name ?></td>
			<td><?= $tool_path ?></td>
			<td><?= $type_name ?></td>
			<td><?= $section_name ?></td>
			<td><?= $tool_active ? 'Ativado' : 'Desativado' ?></td>
			<td>
				<a title="Editar Ferramenta" href="atualizar_dados/?tool_id=<?= $tool_id ?>"><i class="material-icons green-text">edit</i></a>
				<i onclick="changeLink('src/delete_tool.php?tool_id=<?= $tool_id ?>', '<?= $tool_name ?>')" class="material-icons red-text modal-trigger" style="cursor:pointer" title="Remover Ferramenta" data-target="removeTool">clear</i>
			</td>
		</tr>
	<?php endforeach ?>
<?php
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
