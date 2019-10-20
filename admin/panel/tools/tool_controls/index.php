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
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Controle de Ferramentas - 4People</title>
	<?php include_once("$assets/components/admin_components/MetaTags.php") ?>
</head>

<body>
	<?php
	include_once("$assets/components/NoScript.php");
	include_once("$assets/components/Spinner.php");
	include_once("$assets/components/Header.php");
	include_once("$assets/components/admin_components/Sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel top-div-margin" style="padding-bottom:10px">
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
							<button title="Inserir uma Ferramenta no 4People" class="btn waves-effect waves-light red-color mt-2 z-depth-0"><i class="material-icons left">build</i>Inserir</button>
						</div>
					</div>
				</form>

				<div class="top-div dark-grey"></div>
			</div>

			<div class="card-panel top-div-margin" style="padding-bottom:10px">
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

							<button title="Filtrar Ferramentas do 4People" class="btn waves-effect waves-light btn-green mt-2 z-depth-0"><i class="material-icons left">filter_list</i>Filtrar</button>
							<button onclick="selectTools()" type="button" title="Limpar Filtro" class="btn dark-grey mt-2 waves-effect waves-light right z-depth-0"><i class="material-icons left">format_clear</i>Limpar</button>
						</div>
					</div>
				</form>

				<div class="top-div dark-grey"></div>
			</div>

			<div class="card-panel left-div-margin" style="padding-bottom:10px">
				<h2 class="flow-text" style="margin: 0 0 5px"><i class="material-icons left">format_list_bulleted</i>Lista de Ferramentas <span id="amount"></span></h2>
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

				<div class="left-div dark-grey"></div>
			</div>
		</div>
	</main>

	<div id="updates"></div>
	<div id="deletes"></div>

	<?php include_once("$assets/components/Footer.php") ?>
	<?php include_once("$assets/components/ServiceWorker.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/clipboard.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script>
		M.FormSelect.init(document.querySelectorAll('select'))
		const form = document.querySelector('#formInsert')
		const formFilter = document.querySelector('#formFilter')
		const tools = document.querySelector('#tools')
		const updates = document.querySelector('#updates')
		const deletes = document.querySelector('#deletes')
		const inputs = form.querySelectorAll('input:not(.select-dropdown)')
		const btnSubmit = form.querySelector('button')
		const lblAmount = document.querySelector('#amount')
		let isFiltered

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

				for (let i = 0; i < inputs.length; i += 1) {
					inputs[i].value = ''
					inputs[i].classList.remove('valid')
				}

				if (isFiltered) selectToolsByFilter()
				else selectTools()
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

			isFiltered = true
			selectToolsByFilter()
		}

		const selectTools = async () => {
			isFiltered = false

			let toolsHTML = '',
				updatesHTML = '',
				deletesHTML = '',
				amount = 0

			const data = await (await fetch('src/select_tools.php')).json()
			const sections = await (await fetch('src/select_sections.php')).json()

			for (const i in data) {
				amount += 1

				updatesHTML += (
					`<div id="updateTool${data[i][0]}" class="modal modal-fixed-footer">
						<form onsubmit="updateTool(document.querySelector('#updateTool${data[i][0]} form')); return false" method="POST">
							<div class="modal-content left-div-margin" style="padding-bottom:5px">
								<h4 class="mb-1"><i class="material-icons left" style="top:7px">edit</i>Editar dados</h4>
								<div class="divider"></div>

								<div class="row mt-2 mb-0">
									<input type="hidden" value="${data[i][0]}" name="tool_id">
									<div class="input-field col s12 m6">
										<i class="material-icons prefix">format_size</i>
										<input value="${i}" id="tool_name" title="Preencha este campo com o nome." placeholder="Nomoe de Ferramenta" class="validate" type="text" name="tool_name" oninvalid="this.setCustomValidity('Preencha este campo com o nome.')" oninput="setCustomValidity('')" required>
										<label class="active" for="tool_name">Nome *</label>
										<span class="helper-text" data-error="Ferramenta inválida." data-success="Ferramenta válida.">Ex: Gerador de CPF</span>
									</div>

									<div class="input-field col s12 m6">
										<i class="material-icons prefix">folder</i>
										<input value="${data[i][1]}" id="tool_path" title="Preencha este campo com o caminho." placeholder="Caminho da Seção" class="validate" type="text" name="tool_path" oninvalid="this.setCustomValidity('Preencha este campo com o caminho.')" oninput="setCustomValidity('')" required>
										<label class="active" for="tool_path">Path *</label>
										<span class="helper-text" data-error="Caminho de Ferramenta inválido." data-success="Caminho de Ferramenta válido.">Ex: gerador_de_cpf</span>
									</div>

									<div class="input-field col s12 m6">
										<i class="material-icons prefix">folder</i>
										<select name="section_id">
											${sections.map(section => `<option value="${section[0]}" ${section[0] === data[i][8] ? 'selected' : ''}>${section[1]}</option>`).join('')}
										</select>
										<label>Seção *</label>
										<span class="helper-text">Seção da Ferramenta</span>
									</div>

									<div class="input-field col s12 m6">
										<i class="material-icons prefix">${data[i][5] === '1' ? 'check' : 'close'}</i>
										<select name="tool_status">
											<option value="0">Desativado</option>
											<option value="1" ${data[i][5] === '1' ? 'selected' : ''}>Ativado</option>
										</select>
										<label>Status *</label>
										<span class="helper-text">Status da Ferramenta</span>
									</div>

									<div class="input-field col s12 m6">
										<i class="material-icons prefix">description</i>
										<input value="${data[i][2]}" id="tool_description" title="Preencha este campo com a descrição." placeholder="Descrição da Ferramenta" class="validate" type="text" name="tool_description" oninvalid="this.setCustomValidity('Preencha este campo com o caminho.')" oninput="setCustomValidity('')">
										<label class="active" for="tool_description">Descrição</label>
										<span class="helper-text">Ex: Gerador de CPF Online para Programadores testarem seus Softwares em desenvolvimento.</span>
									</div>

									<div class="input-field col s12 m6">
										<i class="material-icons prefix">link</i>
										<input value="${data[i][3]}" id="tool_link" title="Preencha este campo com o link do repositório." placeholder="Link da Ferramenta no GitHub" class="validate" type="text" name="tool_link" oninvalid="this.setCustomValidity('Preencha este campo com o link do repositório.')" oninput="setCustomValidity('')">
										<label class="active" for="tool_link">Link</label>
										<span class="helper-text">Ex: https://github.com/lucasnaja/4People</span>
									</div>
								</div>
							</div>

							<div class="divider"></div>

							<div class="modal-footer">
								<button type="button" class="modal-close btn waves-effect waves-light dark-grey z-depth-0" title="Cancelar"><i class="material-icons left">close</i>Cancelar</button>
								<button class="modal-close btn waves-effect waves-light green darken-3 z-depth-0" title="Salvar"><i class="material-icons left">save</i>Salvar</button>
							</div>
						</form>

						<div class="left-div dark-grey" style="border-radius:0"></div>
					</div>`
				)

				deletesHTML += (
					`<div id="removeTool${data[i][0]}" class="modal">
						<div class="modal-content left-div-margin">
							<h4><i class="material-icons left" style="top:7px">delete</i>Remover Ferramenta</h4>
							<p class="mb-0">Você tem certeza que deseja remover ${i} do 4People?</p>

							<div class="left-div dark-grey" style="border-radius:0"></div>
						</div>

						<div class="divider"></div>

						<div class="modal-footer">
							<button title="Cancelar" class="modal-close btn waves-effect waves-light dark-grey z-depth-0"><i class="material-icons left">close</i>Cancelar</button>
							<a onclick="deleteTool(${data[i][0]}, '${i}')" title="Remover ${i}" class="modal-close btn waves-effect waves-light red-color z-depth-0"><i class="material-icons left">delete</i>Remover</a>
						</div>
					</div>`
				)

				toolsHTML += (
					`<tr>
						<td>${i}</td>
						<td>${data[i][5] === '1' ? '<i title="Ativado" class="material-icons btn-green-text">done</i>' : '<i title="Desativado" class="material-icons red-color-text">clear</i>'}</td>
						<td>${data[i][4]}</td>
						<td>
							<button data-clipboard-text="<?= $_SERVER['HTTP_HOST'] ?>/pages/${data[i][6]}/${data[i][7]}/${data[i][1]}/" title="Copiar caminho da página" class="btn waves-effect waves-light dark-grey z-depth-0 copy"><i class="material-icons" style="cursor:pointer">content_copy</i></button>
							<a href="<?= $root ?>/pages/${data[i][6]}/${data[i][7]}/${data[i][1]}/" title="Ir até a página" class="btn waves-effect waves-light dark-grey z-depth-0" ${data[i][5] === '1' ? '' : 'disabled'}><i class="material-icons">insert_link</i></a>
						</td>
						<td>
							<button class="btn waves-effect waves-light green darken-3 z-depth-0 modal-trigger" title="Editar Ferramenta" data-target="updateTool${data[i][0]}"><i class="material-icons">edit</i></button>
							<button class="btn waves-effect waves-light red-color z-depth-0 modal-trigger" style="cursor:pointer" title="Remover Ferramenta" data-target="removeTool${data[i][0]}"><i class="material-icons">delete</i></button>
						</td>
					</tr>`
				)
			}

			tools.innerHTML = toolsHTML
			updates.innerHTML = updatesHTML
			deletes.innerHTML = deletesHTML
			lblAmount.innerHTML = `(${amount})`
			M.Modal.init(document.querySelectorAll('.modal'))
			M.FormSelect.init(document.querySelectorAll('select'))

			const btnsCopy = document.querySelectorAll('.copy')
			new ClipboardJS(btnsCopy).on('success', () => {
				M.toast({
					html: 'Caminho copiado com sucesso.',
					classes: 'green'
				})
			})
		}

		const selectToolsByFilter = async () => {
			let toolsHTML = '',
				updatesHTML = '',
				deletesHTML = '',
				amount = 0

			const newForm = new FormData(formFilter)
			const type_id_get = newForm.get('type_id')
			const section_id_get = newForm.get('section_id')
			const tool_status_get = newForm.get('tool_status')
			const data = await (await fetch(`src/select_tools.php?type_id=${type_id_get}&section_id=${section_id_get}&tool_status=${tool_status_get}`)).json()
			const sections = await (await fetch('src/select_sections.php')).json()

			for (const i in data) {
				amount += 1

				updatesHTML += (
					`<div id="updateTool${data[i][0]}" class="modal modal-fixed-footer">
						<form onsubmit="updateTool(document.querySelector('#updateTool${data[i][0]} form')); return false" method="POST">
							<div class="modal-content left-div-margin" style="padding-bottom:5px">
								<h4 class="mb-1"><i class="material-icons left" style="top:7px">edit</i>Editar dados</h4>
								<div class="divider"></div>

								<div class="row mt-2 mb-0">
									<input type="hidden" value="${data[i][0]}" name="tool_id">
									<div class="input-field col s12 m6">
										<i class="material-icons prefix">format_size</i>
										<input value="${i}" id="tool_name" title="Preencha este campo com o nome." placeholder="Nomoe de Ferramenta" class="validate" type="text" name="tool_name" oninvalid="this.setCustomValidity('Preencha este campo com o nome.')" oninput="setCustomValidity('')" required>
										<label class="active" for="tool_name">Nome *</label>
										<span class="helper-text" data-error="Ferramenta inválida." data-success="Ferramenta válida.">Ex: Gerador de CPF</span>
									</div>

									<div class="input-field col s12 m6">
										<i class="material-icons prefix">folder</i>
										<input value="${data[i][1]}" id="tool_path" title="Preencha este campo com o caminho." placeholder="Caminho da Seção" class="validate" type="text" name="tool_path" oninvalid="this.setCustomValidity('Preencha este campo com o caminho.')" oninput="setCustomValidity('')" required>
										<label class="active" for="tool_path">Path *</label>
										<span class="helper-text" data-error="Caminho de Ferramenta inválido." data-success="Caminho de Ferramenta válido.">Ex: gerador_de_cpf</span>
									</div>

									<div class="input-field col s12 m6">
										<i class="material-icons prefix">folder</i>
										<select name="section_id">
											${sections.map(section => `<option value="${section[0]}" ${section[0] === data[i][8] ? 'selected' : ''}>${section[1]}</option>`).join('')}
										</select>
										<label>Seção *</label>
										<span class="helper-text">Seção da Ferramenta</span>
									</div>

									<div class="input-field col s12 m6">
										<i class="material-icons prefix">${data[i][5] === '1' ? 'check' : 'close'}</i>
										<select name="tool_status">
											<option value="0">Desativado</option>
											<option value="1" ${data[i][5] === '1' ? 'selected' : ''}>Ativado</option>
										</select>
										<label>Status *</label>
										<span class="helper-text">Status da Ferramenta</span>
									</div>

									<div class="input-field col s12 m6">
										<i class="material-icons prefix">description</i>
										<input value="${data[i][2]}" id="tool_description" title="Preencha este campo com a descrição." placeholder="Descrição da Ferramenta" class="validate" type="text" name="tool_description" oninvalid="this.setCustomValidity('Preencha este campo com o caminho.')" oninput="setCustomValidity('')">
										<label class="active" for="tool_description">Descrição</label>
										<span class="helper-text">Ex: Gerador de CPF Online para Programadores testarem seus Softwares em desenvolvimento.</span>
									</div>

									<div class="input-field col s12 m6">
										<i class="material-icons prefix">link</i>
										<input value="${data[i][3]}" id="tool_link" title="Preencha este campo com o link do repositório." placeholder="Link da Ferramenta no GitHub" class="validate" type="text" name="tool_link" oninvalid="this.setCustomValidity('Preencha este campo com o link do repositório.')" oninput="setCustomValidity('')">
										<label class="active" for="tool_link">Link</label>
										<span class="helper-text">Ex: https://github.com/lucasnaja/4People</span>
									</div>
								</div>
							</div>

							<div class="divider"></div>

							<div class="modal-footer">
								<button type="button" class="modal-close btn waves-effect waves-light dark-grey z-depth-0" title="Cancelar"><i class="material-icons left">close</i>Cancelar</button>
								<button class="modal-close btn waves-effect waves-light red-color z-depth-0" title="Salvar"><i class="material-icons left">save</i>Salvar</button>
							</div>
						</form>

						<div class="left-div dark-grey" style="border-radius:0"></div>
					</div>`
				)

				deletesHTML += (
					`<div id="removeTool${data[i][0]}" class="modal">
						<div class="modal-content left-div-margin">
							<h4><i class="material-icons left" style="top:7px">delete</i>Remover Ferramenta</h4>
							<p class="mb-0">Você tem certeza que deseja remover ${i} do 4People?</p>

							<div class="left-div dark-grey" style="border-radius:0"></div>
						</div>

						<div class="divider"></div>

						<div class="modal-footer">
							<button title="Cancelar" class="modal-close btn waves-effect waves-light dark-grey z-depth-0"><i class="material-icons left">close</i>Cancelar</button>
							<a onclick="deleteTool(${data[i][0]}, '${i}')" title="Remover ${i}" class="modal-close btn waves-effect waves-light red-color z-depth-0"><i class="material-icons left">delete</i>Remover</a>
						</div>
					</div>`
				)

				toolsHTML += (
					`<tr>
						<td>${i}</td>
						<td>${data[i][5] === '1' ? '<i title="Ativado" class="material-icons btn-green-text">done</i>' : '<i title="Desativado" class="material-icons red-color-text">clear</i>'}</td>
						<td>${data[i][4]}</td>
						<td>
							<button data-clipboard-text="<?= $_SERVER['HTTP_HOST'] ?>/${data[i][6]}/${data[i][7]}/${data[i][1]}/" title="Copiar caminho da página" class="btn waves-effect waves-light dark-grey z-depth-0 copy"><i class="material-icons" style="cursor:pointer">content_copy</i></button>
							<a href="<?= $root ?>/${data[i][6]}/${data[i][7]}/${data[i][1]}/" title="Ir até a página" class="btn waves-effect waves-light dark-grey z-depth-0" ${data[i][5] === '1' ? '' : 'disabled'}><i class="material-icons">insert_link</i></a>
						</td>
						<td>
							<button class="btn waves-effect waves-light green darken-3 z-depth-0 modal-trigger" title="Editar Ferramenta" data-target="updateTool${data[i][0]}"><i class="material-icons">edit</i></button>
							<button class="btn waves-effect waves-light red-color z-depth-0 modal-trigger" style="cursor:pointer" title="Remover Ferramenta" data-target="removeTool${data[i][0]}"><i class="material-icons">delete</i></button>
						</td>
					</tr>`
				)
			}

			tools.innerHTML = toolsHTML
			updates.innerHTML = updatesHTML
			deletes.innerHTML = deletesHTML
			lblAmount.innerHTML = `(${amount})`
			M.Modal.init(document.querySelectorAll('.modal'))
			M.FormSelect.init(document.querySelectorAll('select'))

			const btnsCopy = document.querySelectorAll('.copy')
			new ClipboardJS(btnsCopy).on('success', () => {
				M.toast({
					html: 'Caminho copiado com sucesso.',
					classes: 'green'
				})
			})
		}

		const updateTool = async formUpdate => {
			const data = await (await fetch('src/update_tool.php', {
				method: 'POST',
				body: new FormData(formUpdate)
			})).json()

			if (data.status === '1') {
				M.toast({
					html: 'Os dados foram atualizados com sucesso.',
					classes: 'green'
				})

				if (isFiltered) selectToolsByFilter()
				else selectTools()
			} else {
				M.toast({
					html: 'Houve um erro ao atualizar os dados.',
					classes: 'red accent-4'
				})
			}
		}

		const deleteTool = async (id, name) => {
			const result = await (await fetch(`src/delete_tool.php?tool_id=${id}`)).json()

			if (result.status === '1') {
				M.toast({
					html: `${name} removido(a).`,
					classes: 'green'
				})

				if (isFiltered) selectToolsByFilter()
				else selectTools()
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
