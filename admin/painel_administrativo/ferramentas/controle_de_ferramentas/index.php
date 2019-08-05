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

				<form id="formInsert" style="margin-top:15px" method="POST">
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

				<form id="formFilter" method="GET">
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

							<button title="Filtrar Ferramentas do 4People" class="btn waves-effect waves-light indigo darken-4 mt-2 z-depth-0"><i class="material-icons left">filter_list</i>Filtrar</button>
							<button onclick="selectTools()" type="button" title="Limpar Filtro" class="btn indigo darken-4 mt-2 waves-effect waves-light right z-depth-0"><i class="material-icons left">format_clear</i>Limpar</button>
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
							<th>Nome da Ferramenta</th>
							<th>Status</th>
							<th>Visitas</th>
							<th>Caminho</th>
							<th>Operações</th>
						</tr>
					</thead>

					<tbody id="tools"></tbody>
				</table>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<div id="modals"></div>

	<?php include_once("$assets/components/service_worker.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/clipboard.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script>
		M.FormSelect.init(document.querySelectorAll('select'))
		const form = document.querySelector('#formInsert')
		const formFilter = document.querySelector('#formFilter')
		const tools = document.querySelector('#tools')
		const modals = document.querySelector('#modals')
		const inputs = form.querySelectorAll('input:not(.select-dropdown)')
		const btnSubmit = form.querySelector('button')

		form.onsubmit = async e => {
			e.preventDefault()
			btnSubmit.disabled = true

			const data = await (await fetch('src/insert_tool.php', {
				method: 'POST',
				body: new FormData(form)
			})).json()

			if (data.status === '1') {
				M.toast({
					html: `${inputs[0].value.trim()} adicionado(a).`,
					classes: 'green'
				})

				for (let i = 0; i < inputs.length; i++) {
					inputs[i].value = ''
					inputs[i].classList.remove('valid')
				}

				selectTools()
			} else {
				M.toast({
					html: `Erro ao adicionar ${inputs[0].value.trim()}.`,
					classes: 'red accent-4'
				})
			}

			btnSubmit.disabled = false
		}

		formFilter.onsubmit = async e => {
			e.preventDefault()
			let toolsHTML = ''

			const newForm = new FormData(formFilter)
			const type_id_get = newForm.get('type_id')
			const section_id_get = newForm.get('section_id')
			const tool_status_get = newForm.get('tool_status')
			const data = await (await fetch(`src/select_tools.php?type_id=${type_id_get}&section_id=${section_id_get}&tool_status=${tool_status_get}`)).json()

			for (const i in data) {
				toolsHTML +=
					`<tr>
						<td>${i}</td>
						<td>${data[i][3] ? 'Ativado' : 'Desativado'}</td>
						<td>${data[i][2]}</td>
						<td>
							<button data-clipboard-text="<?= $_SERVER['HTTP_HOST'] ?>/${data[i][4]}/${data[i][5]}/${data[i][1]}/" title="Copiar caminho da página" class="btn waves-effect waves-light teal darken-2 z-depth-0 copy"><i class="material-icons" style="cursor:pointer">content_copy</i></button>
							<a href="<?= $root ?>/${data[i][4]}/${data[i][5]}/${data[i][1]}/" title="Ir até a página" class="btn waves-effect waves-light indigo darken-4 z-depth-0" ${data[i][3] ? '' : 'disabled'}><i class="material-icons">insert_link</i></a>
						</td>
						<td>
							<a class="btn waves-effect waves-light green darken-3 z-depth-0" title="Editar Ferramenta" href="atualizar_dados/?tool_id=${data[i][0]}"><i class="material-icons">edit</i></a>
							<button class="btn waves-effect waves-light red accent-4 z-depth-0 modal-trigger" style="cursor:pointer" title="Remover Ferramenta" data-target="removeTool${data[i][0]}"><i class="material-icons">delete</i></button>
						</td>
					</tr>`
			}

			tools.innerHTML = toolsHTML

			const btnsCopy = document.querySelectorAll('.copy')
			new ClipboardJS(btnsCopy).on('success', () => {
				M.toast({
					html: 'Caminho copiado com sucesso.',
					classes: 'green'
				})
			})
		}

		const selectTools = async () => {
			let toolsHTML = '',
				modalsHTML = ''

			const data = await (await fetch('src/select_tools.php')).json()

			for (const i in data) {
				modalsHTML +=
					`<div id="removeTool${data[i][0]}" class="modal">
						<div class="modal-content left-div-margin">
							<h4><i class="material-icons left" style="top:7px">delete</i>Remover Ferramenta</h4>
							<p class="mb-0">Você tem certeza que deseja remover ${i} do 4People?</p>

							<div class="left-div indigo darken-4" style="border-radius:0"></div>
						</div>

						<div class="divider"></div>

						<div class="modal-footer">
							<button title="Cancelar" class="modal-close btn waves-effect waves-light indigo darken-4 z-depth-0"><i class="material-icons left">close</i>Cancelar</button>
							<a onclick="deleteTool(${data[i][0]}, '${i}')" title="Remover ${i}" class="modal-close btn waves-effect waves-light red accent-4 z-depth-0"><i class="material-icons left">delete</i>Remover</a>
						</div>
					</div>`

				toolsHTML +=
					`<tr>
						<td>${i}</td>
						<td>${data[i][3] ? 'Ativado' : 'Desativado'}</td>
						<td>${data[i][2]}</td>
						<td>
							<button data-clipboard-text="<?= $_SERVER['HTTP_HOST'] ?>/${data[i][4]}/${data[i][5]}/${data[i][1]}/" title="Copiar caminho da página" class="btn waves-effect waves-light teal darken-2 z-depth-0 copy"><i class="material-icons" style="cursor:pointer">content_copy</i></button>
							<a href="<?= $root ?>/${data[i][4]}/${data[i][5]}/${data[i][1]}/" title="Ir até a página" class="btn waves-effect waves-light indigo darken-4 z-depth-0" ${data[i][3] ? '' : 'disabled'}><i class="material-icons">insert_link</i></a>
						</td>
						<td>
							<a class="btn waves-effect waves-light green darken-3 z-depth-0" title="Editar Ferramenta" href="atualizar_dados/?tool_id=${data[i][0]}"><i class="material-icons">edit</i></a>
							<button class="btn waves-effect waves-light red accent-4 z-depth-0 modal-trigger" style="cursor:pointer" title="Remover Ferramenta" data-target="removeTool${data[i][0]}"><i class="material-icons">delete</i></button>
						</td>
					</tr>`
			}

			tools.innerHTML = toolsHTML
			modals.innerHTML = modalsHTML
			M.Modal.init(document.querySelectorAll('.modal'))

			const btnsCopy = document.querySelectorAll('.copy')
			new ClipboardJS(btnsCopy).on('success', () => {
				M.toast({
					html: 'Caminho copiado com sucesso.',
					classes: 'green'
				})
			})
		}

		const deleteTool = async (id, name) => {
			const result = await (await fetch(`src/delete_tool.php?tool_id=${id}`)).json()

			if (result.status === '1') {
				M.toast({
					html: `${name} removido(a).`,
					classes: 'green'
				})

				selectTools()
			} else {
				M.toast({
					html: `Não foi possível remover ${name}.`,
					classes: 'red accent-4'
				})
			}
		}

		selectTools()
	</script>
</body>

</html>
