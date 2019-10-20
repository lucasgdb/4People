<?php
$root = '../../../..';
include_once("$root/assets/assets.php");

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
	<title>Seções de Ferramentas - 4People</title>
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">folder</i>Adicionar uma Seção de Ferramentas</h1>
				<label>Adicionar uma novo Seção de Ferramentas no 4People</label>

				<div class="divider"></div>

				<form id="formInsert" style="margin-top:15px" method="POST">
					<div class="row mb-0">
						<div class="input-field col s12 m6">
							<i class="material-icons prefix">format_size</i>
							<input id="section_name" title="Preencha este campo com o nome." placeholder="Nome de Seção" class="validate" type="text" name="section_name" oninvalid="this.setCustomValidity('Preencha este campo com o nome.')" oninput="setCustomValidity('')" required>
							<label class="active" for="section_name">Nome *</label>
							<span class="helper-text" data-error="Seção de Ferramenta inválida." data-success="Seção de Ferramenta válida.">Ex: Geradores</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">folder</i>
							<input id="section_path" title="Preencha este campo com o caminho." placeholder="Caminho da Seção" class="validate" type="text" name="section_path" oninvalid="this.setCustomValidity('Preencha este campo com o caminho.')" oninput="setCustomValidity('')" required>
							<label class="active" for="section_path">Path *</label>
							<span class="helper-text" data-error="Caminho de Seção inválido." data-success="Caminho de Seção válido.">Ex: geradores</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">insert_emoticon</i>
							<input id="section_icon" title="Preencha este campo com o ícone." placeholder="Ícone de Seção" class="validate" type="text" name="section_icon" oninvalid="this.setCustomValidity('Preencha este campo com o ícone.')" oninput="setCustomValidity('')" required>
							<label class="active" for="section_icon">Ícone *</label>
							<span class="helper-text" data-error="Ícone de Seção inválido." data-success="Ícone de Seção válido.">Ex: autorenew</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">folder</i>
							<select name="type_id">
								<?php
								$sql = $database->prepare('SELECT type_id, type_name FROM types');
								$sql->execute();

								foreach ($sql as $data) : extract($data) ?>
									<option value="<?= $type_id ?>"><?= $type_name ?></option>
								<?php endforeach ?>
							</select>
							<label>Tipo *</label>
							<span class="helper-text">Caminho da Seção</span>
						</div>

						<div class="col s12">
							<div class="divider"></div>
							<button title="Inserir Seção no 4People" class="btn waves-effect waves-light red-color mt-2 z-depth-0"><i class="material-icons left">folder</i>Inserir</button>
						</div>
					</div>
				</form>

				<div class="top-div dark-grey"></div>
			</div>

			<div class="card-panel top-div-margin" style="padding-bottom:10px">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">filter_list</i>Filtrar Tipos</h1>
				<label>Filtro de Tipos de Ferramentas do 4People</label>

				<div class="divider"></div>

				<form id="formFilter" method="GET">
					<div style="margin-top:15px" class="row mb-0">
						<div class="input-field col s12">
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

						<div class="col s12">
							<div class="divider"></div>
							<button title="Filtrar Seções de Ferramentas do 4People" class="btn waves-effect waves-light btn-green mt-2 z-depth-0"><i class="material-icons left">filter_list</i>Filtrar</button>

							<button onclick="selectSections()" type="button" title="Limpar Filtro" class="btn dark-grey mt-2 waves-effect waves-light right z-depth-0"><i class="material-icons left">format_clear</i>Limpar</button>
						</div>
					</div>
				</form>

				<div class="top-div dark-grey"></div>
			</div>

			<div class="card-panel left-div-margin" style="padding-bottom:10px">
				<h2 class="flow-text" style="margin: 0 0 5px"><i class="material-icons left">format_list_bulleted</i>Lista de Seções do 4People</h2>
				<label>Lista de Seções do 4People</label>
				<div class="divider"></div>

				<table class="centered highlight responsive-table">
					<thead>
						<tr>
							<th>Nome</th>
							<th>Ícone</th>
							<th>Caminho</th>
							<th>Operações</th>
						</tr>
					</thead>

					<tbody id="sections"></tbody>
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
		const sections = document.querySelector('#sections')
		const updates = document.querySelector('#updates')
		const deletes = document.querySelector('#deletes')
		const inputs = form.querySelectorAll('input:not(.select-dropdown)')
		const btnSubmit = form.querySelector('button')
		let isFiltered

		form.onsubmit = async e => {
			e.preventDefault()
			btnSubmit.disabled = true

			const data = await (await fetch('src/insert_section.php', {
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

				if (isFiltered) selectSectionsByFilter()
				else selectSections()
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

			selectSectionsByFilter()
		}

		const selectSections = async () => {
			isFiltered = false

			let sectionsHTML = '',
				updatesHTML = '',
				deletesHTML = ''

			const data = await (await fetch('src/select_sections.php')).json()
			const types = await (await fetch('src/select_types.php')).json()

			for (const i in data) {
				updatesHTML += (
					`<div id="updateSection${i}" class="modal">
						<form onsubmit="updateSection(document.querySelector('#updateSection${i} form')); return false" method="POST">
							<div class="modal-content left-div-margin" style="padding-bottom:5px">
								<h4 class="mb-1"><i class="material-icons left" style="top:7px">edit</i>Editar dados</h4>
								<div class="divider"></div>

								<div class="row mt-2 mb-0">
									<input type="hidden" value="${i}" name="section_id">
									<div class="input-field col s12 m6">
										<i class="material-icons prefix">format_size</i>
										<input value="${data[i][0]}" id="section_name" title="Preencha este campo com o nome." placeholder="Tipo de Seção" class="validate" type="text" name="section_name" oninvalid="this.setCustomValidity('Preencha este campo com o nome.')" oninput="setCustomValidity('')" required>
										<label class="active" for="section_name">Nome *</label>
										<span class="helper-text" data-error="Seção de Ferramenta inválida." data-success="Seção de Ferramenta válida.">Ex: Geradores</span>
									</div>

									<div class="input-field col s12 m6">
										<i class="material-icons prefix">folder</i>
										<input value="${data[i][1]}" id="section_path" title="Preencha este campo com o caminho." placeholder="Caminho da Seção" class="validate" type="text" name="section_path" oninvalid="this.setCustomValidity('Preencha este campo com o caminho.')" oninput="setCustomValidity('')" required>
										<label class="active" for="section_path">Path *</label>
										<span class="helper-text" data-error="Caminho de Seção inválido." data-success="Caminho de Seção válido.">Ex: geradores</span>
									</div>

									<div class="input-field col s12 m6">
										<i class="material-icons prefix">${data[i][2]}</i>
										<input value="${data[i][2]}" id="section_icon" title="Preencha este campo com o ícone." placeholder="Ícone de Seção" class="validate" type="text" name="section_icon" oninvalid="this.setCustomValidity('Preencha este campo com o ícone.')" oninput="setCustomValidity('')" required>
										<label class="active" for="section_icon">Ícone *</label>
										<span class="helper-text" data-error="Ícone de Seção inválido." data-success="Ícone de Seção válido.">Ex: autorenew</span>
									</div>

									<div class="input-field col s12 m6">
										<i class="material-icons prefix">folder</i>
										<select name="type_id">
											${types.map(type => `<option value="${type[0]}" ${type[0] === data[i][4] ? 'selected' : ''}>${type[1]}</option>`).join('')}
										</select>
										<label>Tipo *</label>
										<span class="helper-text">Caminho da Seção</span>
									</div>
								</div>
								
								<div class="left-div dark-grey" style="border-radius:0"></div>
							</div>

							<div class="divider"></div>

							<div class="modal-footer">
								<button type="button" class="modal-close btn waves-effect waves-light dark-grey z-depth-0" title="Cancelar"><i class="material-icons left">close</i>Cancelar</button>
								<button class="modal-close btn waves-effect waves-light green darken-3 z-depth-0" title="Salvar"><i class="material-icons left">save</i>Salvar</button>
							</div>
						</form>
					</div>`
				)

				deletesHTML += (
					`<div id="removeSection${i}" class="modal">
						<div class="modal-content left-div-margin">
							<h4><i class="material-icons left" style="top:7px">delete</i>Remover Seção</h4>
							<p class="mb-0">Você tem certeza que deseja remover ${data[i][0]} do 4People?</p>

							<div class="left-div dark-grey" style="border-radius:0"></div>
						</div>

						<div class="divider"></div>

						<div class="modal-footer">
							<button title="Cancelar" class="modal-close btn waves-effect waves-light dark-grey z-depth-0"><i class="material-icons left">close</i>Cancelar</button>
							<a onclick="deleteSection(${i}, '${data[i][0]}')" title="Remover ${data[i][0]}" class="modal-close btn waves-effect waves-light red-color z-depth-0"><i class="material-icons left">delete</i>Remover</a>
						</div>
					</div>`
				)

				sectionsHTML += (
					`<tr>
						<td>${data[i][0]}</td>
						<td><i title="${data[i][2]}" class="material-icons" style="top:4px">${data[i][2]}</i></td>
						<td>
							<button data-clipboard-text="<?= $_SERVER['HTTP_HOST'] ?>/pages/${data[i][3]}/${data[i][1]}/" title="Copiar caminho da página" class="btn waves-effect waves-light dark-grey z-depth-0 copy"><i class="material-icons" style="cursor:pointer">content_copy</i></button>
							<a href="<?= $root ?>/pages/${data[i][3]}/${data[i][1]}/" title="Ir até a página" class="btn waves-effect waves-light dark-grey z-depth-0"><i class="material-icons">insert_link</i></a>
						</td>
						<td>
							<button class="btn waves-effect waves-light green darken-3 z-depth-0 modal-trigger" title="Editar informações de ${data[i][0]}" data-target="updateSection${i}"><i class="material-icons">edit</i></button>
							<button class="btn waves-effect waves-light red-color z-depth-0 modal-trigger" style="cursor:pointer" title="Remover ${data[i][0]}" data-target="removeSection${i}"><i class="material-icons">delete</i></button>
						</td>
					</tr>`
				)
			}

			sections.innerHTML = sectionsHTML
			updates.innerHTML = updatesHTML
			deletes.innerHTML = deletesHTML
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

		const selectSectionsByFilter = async () => {
			let sectionsHTML = '',
				updatesHTML = '',
				deletesHTML = ''

			const type_id = new FormData(formFilter).get('type_id')
			const data = await (await fetch(`src/select_sections.php?type_id=${type_id}`)).json()
			const types = await (await fetch('src/select_types.php')).json()

			for (const i in data) {
				updatesHTML += (
					`<div id="updateSection${i}" class="modal">
						<form onsubmit="updateSection(document.querySelector('#updateSection${i} form')); return false" method="POST">
							<div class="modal-content left-div-margin" style="padding-bottom:5px">
								<h4 class="mb-1"><i class="material-icons left" style="top:7px">edit</i>Editar dados</h4>
								<div class="divider"></div>

								<div class="row mt-2 mb-0">
									<input type="hidden" value="${i}" name="section_id">
									<div class="input-field col s12 m6">
										<i class="material-icons prefix">format_size</i>
										<input value="${data[i][0]}" id="section_name" title="Preencha este campo com o nome." placeholder="Tipo de Seção" class="validate" type="text" name="section_name" oninvalid="this.setCustomValidity('Preencha este campo com o nome.')" oninput="setCustomValidity('')" required>
										<label class="active" for="section_name">Nome *</label>
										<span class="helper-text" data-error="Seção de Ferramenta inválida." data-success="Seção de Ferramenta válida.">Ex: Geradores</span>
									</div>

									<div class="input-field col s12 m6">
										<i class="material-icons prefix">folder</i>
										<input value="${data[i][1]}" id="section_path" title="Preencha este campo com o caminho." placeholder="Caminho da Seção" class="validate" type="text" name="section_path" oninvalid="this.setCustomValidity('Preencha este campo com o caminho.')" oninput="setCustomValidity('')" required>
										<label class="active" for="section_path">Path *</label>
										<span class="helper-text" data-error="Caminho de Seção inválido." data-success="Caminho de Seção válido.">Ex: geradores</span>
									</div>

									<div class="input-field col s12 m6">
										<i class="material-icons prefix">${data[i][2]}</i>
										<input value="${data[i][2]}" id="section_icon" title="Preencha este campo com o ícone." placeholder="Ícone de Seção" class="validate" type="text" name="section_icon" oninvalid="this.setCustomValidity('Preencha este campo com o ícone.')" oninput="setCustomValidity('')" required>
										<label class="active" for="section_icon">Ícone *</label>
										<span class="helper-text" data-error="Ícone de Seção inválido." data-success="Ícone de Seção válido.">Ex: autorenew</span>
									</div>

									<div class="input-field col s12 m6">
										<i class="material-icons prefix">folder</i>
										<select name="type_id">
											${types.map(type => `<option value="${type[0]}" ${type[0] === data[i][4] ? 'selected' : ''}>${type[1]}</option>`).join('')}													
										</select>
										<label>Tipo *</label>
										<span class="helper-text">Caminho da Seção</span>
									</div>
								</div>
								
								<div class="left-div dark-grey" style="border-radius:0"></div>
							</div>

							<div class="divider"></div>

							<div class="modal-footer">
								<button type="button" class="modal-close btn waves-effect waves-light dark-grey z-depth-0" title="Cancelar"><i class="material-icons left">close</i>Cancelar</button>
								<button class="modal-close btn waves-effect waves-light green darken-3 z-depth-0" title="Salvar"><i class="material-icons left">save</i>Salvar</button>
							</div>
						</form>
					</div>`
				)

				deletesHTML += (
					`<div id="removeSection${i}" class="modal">
						<div class="modal-content left-div-margin">
							<h4><i class="material-icons left" style="top:7px">delete</i>Remover Seção</h4>
							<p class="mb-0">Você tem certeza que deseja remover ${data[i][0]} do 4People?</p>

							<div class="left-div dark-grey" style="border-radius:0"></div>
						</div>

						<div class="divider"></div>

						<div class="modal-footer">
							<button title="Cancelar" class="modal-close btn waves-effect waves-light dark-grey z-depth-0"><i class="material-icons left">close</i>Cancelar</button>
							<a onclick="deleteSection(${i}, '${data[i][0]}')" title="Remover ${data[i][0]}" class="modal-close btn waves-effect waves-light red-color z-depth-0"><i class="material-icons left">delete</i>Remover</a>
						</div>
					</div>`
				)

				sectionsHTML += (
					`<tr>
						<td>${data[i][0]}</td>
						<td><i title="${data[i][2]}" class="material-icons" style="top:4px">${data[i][2]}</i></td>
						<td>
							<button data-clipboard-text="<?= $_SERVER['HTTP_HOST'] ?>/pages/${data[i][3]}/${data[i][1]}/" title="Copiar caminho da página" class="btn waves-effect waves-light dark-grey z-depth-0 copy"><i class="material-icons" style="cursor:pointer">content_copy</i></button>
							<a href="<?= $root ?>/pages/${data[i][3]}/${data[i][1]}/" title="Ir até a página" class="btn waves-effect waves-light dark-grey z-depth-0"><i class="material-icons">insert_link</i></a>
						</td>
						<td>
							<button class="btn waves-effect waves-light green darken-3 z-depth-0 modal-trigger" title="Editar informações de ${data[i][0]}" data-target="updateSection${i}"><i class="material-icons">edit</i></button>
							<button class="btn waves-effect waves-light red-color z-depth-0 modal-trigger" style="cursor:pointer" title="Remover ${data[i][0]}" data-target="removeSection${i}"><i class="material-icons">delete</i></button>
						</td>
					</tr>`
				)
			}

			sections.innerHTML = sectionsHTML
			updates.innerHTML = updatesHTML
			deletes.innerHTML = deletesHTML

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

		const updateSection = async formUpdate => {
			const data = await (await fetch('src/update_section.php', {
				method: 'POST',
				body: new FormData(formUpdate)
			})).json()

			if (data.status === '1') {
				M.toast({
					html: 'Os dados foram atualizados com sucesso.',
					classes: 'green'
				})

				if (isFiltered) selectSectionsByFilter()
				else selectSections()
			} else {
				M.toast({
					html: 'Houve um erro ao atualizar os dados.',
					classes: 'red accent-4'
				})
			}
		}

		const deleteSection = async (id, name) => {
			const result = await (await fetch(`src/delete_section.php?section_id=${id}`)).json()

			if (result.status === '1') {
				M.toast({
					html: `${name} removido(a).`,
					classes: 'green'
				})

				if (isFiltered) selectSectionsByFilter()
				else selectSections()
			} else {
				M.toast({
					html: `Não foi possível remover ${name}.`,
					classes: 'red accent-4'
				})
			}
		}

		selectSections()
	</script>
</body>

</html>
