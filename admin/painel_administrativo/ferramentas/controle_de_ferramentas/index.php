<?php
include_once('../../../../assets/assets.php');

if (!isset($_SESSION['logged'])) {
	header('HTTP/1.0 404 Not Found');
	exit();
}
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Controle de Ferramentas - 4People</title>
	<?php include_once("$assets/components/admin_components/meta_tags.php") ?>
</head>

<body class="grey lighten-4">
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php");
	include_once("$assets/components/admin_components/sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel z-depth-2 top-div-margin" style="padding-bottom:10px">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">build</i>Adicionar uma Ferramenta</h1>
				<label>Adicionar uma nova Ferramenta no 4People</label>

				<div class="divider"></div>

				<form style="margin-top:15px" action="src/insert_tool.php" method="POST">
					<div class="row mb-0">
						<div class="input-field col s12 m6">
							<i class="material-icons prefix">format_size</i>
							<input id="tool_name" title="Preencha este campo com o nome." placeholder="Nome de Ferramenta" class="validate" type="text" name="tool_name" oninvalid="this.setCustomValidity('Preencha este campo com o nome.')" oninput="setCustomValidity('')" required>
							<label class="active" for="tool_name">Nome *</label>
							<span class="helper-text" data-error="Ferramenta inválida." data-success="Ferramenta válida.">Ex: Gerador de CPF</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">folder</i>
							<input id="tool_path" title="Preencha este campo com o caminho." placeholder="Caminho da Ferramenta" class="validate" type="text" name="tool_path" oninvalid="this.setCustomValidity('Preencha este campo com o caminho.')" oninput="setCustomValidity('')" required>
							<label class="active" for="tool_path">Path *</label>
							<span class="helper-text" data-error="Caminho de Ferramenta inválido." data-success="Caminho de Ferramenta válido.">Ex: gerador_de_cpf</span>
						</div>


						<div class="input-field col s12 m6">
							<i class="material-icons prefix">folder</i>
							<select name="section_id">
								<?php
								$sql = $database->prepare('SELECT section_id, section_name FROM sections ORDER BY section_id');
								$sql->execute();

								foreach ($sql as $data) : extract($data) ?>
									<option value="<?= $section_id ?>"><?= $section_name ?></option>
								<?php endforeach ?>
							</select>
							<label>Seção *</label>
							<span class="helper-text">Seção da Ferramenta</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">check</i>
							<select name="tool_status">
								<option value="0">Desativado</option>
								<option value="1" selected>Ativado</option>
							</select>
							<label>Status *</label>
							<span class="helper-text">Status da Ferramenta</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">description</i>
							<input id="tool_description" title="Preencha este campo com a descrição." placeholder="Descrição da Ferramenta" class="validate" type="text" name="tool_description" oninvalid="this.setCustomValidity('Preencha este campo com o caminho.')" oninput="setCustomValidity('')">
							<label class="active" for="tool_description">Descrição</label>
							<span class="helper-text">Ex: Gerador de CPF Online para Programadores testarem seus Softwares em desenvolvimento.</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">link</i>
							<input id="tool_link" title="Preencha este campo com o caminho." placeholder="Link da Ferramenta no GitHub" class="validate" type="text" name="tool_link" oninvalid="this.setCustomValidity('Preencha este campo com o caminho.')" oninput="setCustomValidity('')">
							<label class="active" for="tool_link">Link</label>
							<span class="helper-text">Ex: https://github.com/lucasnaja/4People</span>
						</div>

						<div class="col s12">
							<div class="divider"></div>
							<button title="Inserir uma Ferramenta no 4People" class="btn waves-effect waves-light indigo darken-4 mt-2 z-depth-0">
								<i class="material-icons left">build</i>Inserir
								<input class="hide" type="submit" value="">
							</button>
						</div>
					</div>
				</form>

				<div class="top-div indigo darken-4"></div>
			</div>

			<div class="card-panel z-depth-2 top-div-margin" style="padding-bottom:10px">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">filter_list</i>Filtrar Ferramentas</h1>
				<label>Filtro de Ferramentas do 4People</label>

				<div class="divider"></div>

				<form action="." method="get">
					<div style="margin-top:15px" class="row mb-0">
						<div class="input-field col s12 m6">
							<i class="material-icons prefix">folder</i>
							<select name="type_id">
								<option value="-1">Selecione um Tipo</option>
								<?php
								$sql = $database->prepare('SELECT type_id, type_name FROM types ORDER BY type_id');
								$sql->execute();

								$type_id_get = filter_input(INPUT_GET, 'type_id', FILTER_DEFAULT);

								foreach ($sql as $data) : extract($data) ?>
									<option value="<?= $type_id ?>" <?= $type_id_get === $type_id ? 'selected' : '' ?>><?= $type_name ?></option>
								<?php endforeach ?>
							</select>
							<label>Tipos</label>
							<span class="helper-text">Tipo da Ferramenta</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">folder</i>
							<select name="section_id">
								<option value="-1">Selecione uma Seção</option>
								<?php
								$sql = $database->prepare('SELECT section_id, section_name FROM sections ORDER BY section_id');
								$sql->execute();

								$section_id_get = filter_input(INPUT_GET, 'section_id', FILTER_DEFAULT);

								foreach ($sql as $data) : extract($data) ?>
									<option value="<?= $section_id ?>" <?= $section_id_get === $section_id ? 'selected' : '' ?>><?= $section_name ?></option>
								<?php endforeach ?>
							</select>
							<label>Seções</label>
							<span class="helper-text">Seção da Ferramenta</span>
						</div>

						<div class="input-field col s12">
							<?php $tool_status_get = filter_input(INPUT_GET, 'tool_status', FILTER_DEFAULT) ?>
							<i class="material-icons prefix"><?= isset($tool_status_get) && $tool_status_get === '1' ? 'check' : 'close' ?></i>

							<select name="tool_status">
								<option value="-1">Selecione uma opção</option>
								<option value="0" <?= isset($tool_status_get) && $tool_status_get === '0' ? 'selected' : '' ?>>Desativado</option>
								<option value="1" <?= isset($tool_status_get) && $tool_status_get === '1' ? 'selected' : '' ?>>Ativado</option>
							</select>
							<label>Status</label>
							<span class="helper-text">Status da Ferramenta</span>
						</div>

						<div class="col s12">
							<div class="divider"></div>
							<button title="Filtrar Ferramentas do 4People" class="btn waves-effect waves-light indigo darken-4 mt-2 z-depth-0">
								<i class="material-icons left">filter_list</i>Filtrar
								<input class="hide" title="Filtrar Ferramentas" type="submit">
							</button>

							<a title="Limpar Filtro" href="." class="btn indigo darken-4 mt-2 waves-effect waves-light right z-depth-0"><i class="material-icons left">format_clear</i>Limpar</a>
						</div>
					</div>
				</form>

				<div class="top-div indigo darken-4"></div>
			</div>

			<div class="card-panel left-div-margin" style="padding-bottom:10px">
				<h2 class="flow-text" style="margin: 0 0 5px"><i class="material-icons left">format_list_bulleted</i>Lista de Ferramentas</h2>
				<label>Lista de Ferramentas do 4People</label>
				<div class="divider"></div>

				<table class="centered highlight responsive-table">
					<thead>
						<tr>
							<th>Nome</th>
							<th>Status</th>
							<th>Visitas</th>
							<th>Caminho</th>
							<th>Operações</th>
						</tr>
					</thead>

					<tbody>
						<?php include_once('src/select_tools.php') ?>
					</tbody>
				</table>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<div id="removeTool" class="modal">
		<div class="modal-content left-div-margin">
			<h4><i class="material-icons left" style="top:7px">delete</i>Remover Ferramenta</h4>
			<p class="mb-0">Você tem certeza que deseja remover <span id="tool"></span>?</p>

			<div class="left-div indigo darken-4" style="border-radius:0"></div>
		</div>

		<div class="divider"></div>

		<div class="modal-footer">
			<button title="Cancelar" class="modal-close btn waves-effect waves-light indigo darken-4 z-depth-0"><i class="material-icons left">close</i>Cancelar</button>
			<a id="linkRemoveTool" title="Remover Ferramenta" class="modal-close btn waves-effect waves-light red accent-4 z-depth-0"><i class="material-icons left">delete</i>Remover</a>
		</div>
	</div>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/clipboard.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script>
		M.FormSelect.init(document.querySelectorAll('select'))
		M.Modal.init(document.querySelectorAll('.modal'))

		const linkRemoveTool = document.querySelector('#linkRemoveTool')
		const lblTool = document.querySelector('#tool')
		const btnsCopy = document.querySelectorAll('.copy')

		new ClipboardJS(btnsCopy).on('success', () => {
			M.toast({
				html: 'Caminho copiado com sucesso.',
				classes: 'green'
			})
		})

		const changeLink = (link, tool) => {
			linkRemoveTool.href = link
			lblTool.innerHTML = tool
		}
	</script>
</body>

</html>
