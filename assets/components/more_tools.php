<?php
$sql = $database->prepare(
	'SELECT tools.tool_name, tools.tool_path FROM tools
		INNER JOIN sections ON sections.section_id = tools.section_id
		WHERE tools.tool_status = "1" AND tools.tool_name != :tool_name AND sections.section_name = :section_name 
		ORDER BY RAND()
		LIMIT 2'
);

$sql->bindValue(':section_name', $name_section);
$sql->bindValue(':tool_name', $name_tool);
$sql->execute();

if ($sql->rowCount() > 0) : ?>
	<div class="card-panel left-div-margin">
		<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">trending_up</i>Veja também:</h1>
		<div class="divider"></div>

		<ul class="collection with-header mb-0">
			<?php foreach ($sql as $data) : extract($data) ?>
				<li class="collection-item">
					<div><?= $tool_name ?><a title="Ver <?= $tool_name ?>" href="../<?= $tool_path ?>/" class="secondary-content"><i class="material-icons red-color-text">send</i></a></div>
				</li>
			<?php endforeach ?>
		</ul>

		<div class="left-div dark-grey"></div>
	</div>
<?php endif ?>