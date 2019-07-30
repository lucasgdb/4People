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

	if (isset($tool_status_get) && $tool_status_get !== '-1') {
		$condition .= $condition === '' ? 'WHERE ' : ' AND ';
		$condition .= "tools.tool_status = :tool_status_get";
	}

	$sql = $database->prepare(
		"SELECT tools.*, types.type_path, sections.section_path FROM tools
		INNER JOIN sections ON sections.section_id = tools.section_id
		INNER JOIN types ON types.type_id = sections.type_id
		$condition
		ORDER BY tools.tool_visits DESC"
	);

	if (isset($type_id_get) && $type_id_get !== '-1') $sql->bindValue(':type_id_get', $type_id_get);
	if (isset($section_id_get) && $section_id_get !== '-1') $sql->bindValue(':section_id_get', $section_id_get);
	if (isset($tool_status_get) && $tool_status_get !== '-1') $sql->bindValue(':tool_status_get', $tool_status_get);

	$sql->execute();

	foreach ($sql as $key) : extract($key) ?>
		<tr>
			<td><?= $tool_name ?></td>
			<td><?= $tool_status ? 'Ativado' : 'Desativado' ?></td>
			<td><?= $tool_visits ?></td>
			<td>
				<button data-clipboard-text="<?= "{$_SERVER['HTTP_HOST']}/$type_path/$section_path/$tool_path/" ?>" title="Copiar caminho da página" class="btn waves-effect waves-light teal darken-2 z-depth-0 copy"><i class="material-icons" style="cursor:pointer">content_copy</i></button>
				<a href="<?= "$root/$type_path/$section_path/$tool_path/" ?>" title="Ir até a página" class="btn waves-effect waves-light indigo darken-4 z-depth-0" <?= !$tool_status ? 'disabled' : '' ?>><i class="material-icons">insert_link</i></a>
			</td>
			<td>
				<a class="btn waves-effect waves-light green darken-3 z-depth-0" title="Editar Ferramenta" href="atualizar_dados/?tool_id=<?= $tool_id ?>"><i class="material-icons" style="font-size:22px">edit</i></a>
				<button class="btn waves-effect waves-light red accent-4 z-depth-0 modal-trigger" onclick="changeLink('src/delete_tool.php?tool_id=<?= $tool_id ?>', '<?= $tool_name ?>')" style="cursor:pointer" title="Remover Ferramenta" data-target="removeTool"><i class="material-icons" style="font-size:23px">delete</i></button>
			</td>
		</tr>
	<?php endforeach ?>
<?php
} catch (PDOException $e) {
	"Um erro ocorreu! Erro: {$e->getMessage()}";
}
