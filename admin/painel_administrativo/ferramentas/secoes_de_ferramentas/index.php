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
	<title>Seções de Ferramentas - 4People</title>
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
							<button title="Inserir Seção no 4People" class="btn waves-effect waves-light indigo darken-4 mt-2 z-depth-0"><i class="material-icons left">folder</i>Inserir</button>
						</div>
					</div>
				</form>

				<div class="top-div indigo darken-4"></div>
			</div>

			<div class="card-panel z-depth-2 top-div-margin" style="padding-bottom:10px">
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
							<button title="Filtrar Seções de Ferramentas do 4People" class="btn waves-effect waves-light indigo darken-4 mt-2 z-depth-0"><i class="material-icons left">filter_list</i>Filtrar</button>

							<button onclick="selectSections()" type="button" title="Limpar Filtro" class="btn indigo darken-4 mt-2 waves-effect waves-light right z-depth-0"><i class="material-icons left">format_clear</i>Limpar</button>
						</div>
					</div>
				</form>

				<div class="top-div indigo darken-4"></div>
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

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<div id="modals"></div>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/clipboard.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script>
		M.FormSelect.init(document.querySelectorAll('select'))
		const form = document.querySelector('#formInsert')
		const formFilter = document.querySelector('#formFilter')
		const sections = document.querySelector('#sections')
		const modals = document.querySelector('#modals')
		const inputs = form.querySelectorAll('input')
		const btnSubmit = form.querySelector('button')

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

				for (let i = 0; i < inputs.length - 1; i++) {
					inputs[i].value = ''
					inputs[i].classList.remove('valid')
				}

				selectSections()
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

			let sectionsHTML = ''

			const type_id = new FormData(formFilter).get('type_id')
			const data = await (await fetch(`src/select_sections.php?type_id=${type_id}`)).json()

			for (const i in data) {
				sectionsHTML +=
					`<tr>
						<td>${data[i][0]}</td>
						<td><i title="${data[i][2]}" class="material-icons" style="top:4px">${data[i][2]}</i></td>
						<td>
							<button data-clipboard-text="<?= $_SERVER['HTTP_HOST'] ?>/${data[i][3]}/${data[i][1]}/" title="Copiar caminho da página" class="btn waves-effect waves-light teal darken-2 z-depth-0 copy"><i class="material-icons" style="cursor:pointer">content_copy</i></button>
							<a href="<?= $root ?>/${data[i][3]}/${data[i][1]}/"" title="Ir até a página" class="btn waves-effect waves-light indigo darken-4 z-depth-0"><i class="material-icons">insert_link</i></a>
						</td>
						<td>
							<a class="btn waves-effect waves-light green darken-3 z-depth-0" title="Editar informações de ${data[i][0]}" href="atualizar_dados/?section_id=${i}"><i class="material-icons" style="font-size:22px">edit</i></a>
							<button class="btn waves-effect waves-light red accent-4 z-depth-0 modal-trigger" style="cursor:pointer" title="Remover ${data[i][0]}" data-target="removeSection${i}"><i class="material-icons" style="font-size:23px">delete</i></button>
						</td>
					</tr>`
			}

			sections.innerHTML = sectionsHTML

			const btnsCopy = document.querySelectorAll('.copy')
			new ClipboardJS(btnsCopy).on('success', () => {
				M.toast({
					html: 'Caminho copiado com sucesso.',
					classes: 'green'
				})
			})
		}

		const selectSections = async () => {
			let sectionsHTML = '',
				modalsHTML = ''

			const data = await (await fetch('src/select_sections.php')).json()

			for (const i in data) {
				modalsHTML +=
					`<div id="removeSection${i}" class="modal">
						<div class="modal-content left-div-margin">
							<h4><i class="material-icons left" style="top:7px">delete</i>Remover Seção</h4>
							<p class="mb-0">Você tem certeza que deseja remover ${data[i][0]}?</p>

							<div class="left-div indigo darken-4" style="border-radius:0"></div>
						</div>

						<div class="divider"></div>

						<div class="modal-footer">
							<button title="Cancelar" class="modal-close btn waves-effect waves-light indigo darken-4 z-depth-0"><i class="material-icons left">close</i>Cancelar</button>
							<a onclick="deleteSection(${i}, '${data[i][0]}')" title="Remover ${data[i][0]}" class="modal-close btn waves-effect waves-light red accent-4 z-depth-0"><i class="material-icons left">delete</i>Remover</a>
						</div>
					</div>`

				sectionsHTML +=
					`<tr>
						<td>${data[i][0]}</td>
						<td><i title="${data[i][2]}" class="material-icons" style="top:4px">${data[i][2]}</i></td>
						<td>
							<button data-clipboard-text="<?= $_SERVER['HTTP_HOST'] ?>/${data[i][3]}/${data[i][1]}/" title="Copiar caminho da página" class="btn waves-effect waves-light teal darken-2 z-depth-0 copy"><i class="material-icons" style="cursor:pointer">content_copy</i></button>
							<a href="<?= $root ?>/${data[i][3]}/${data[i][1]}/"" title="Ir até a página" class="btn waves-effect waves-light indigo darken-4 z-depth-0"><i class="material-icons">insert_link</i></a>
						</td>
						<td>
							<a class="btn waves-effect waves-light green darken-3 z-depth-0" title="Editar informações de ${data[i][0]}" href="atualizar_dados/?section_id=${i}"><i class="material-icons" style="font-size:22px">edit</i></a>
							<button class="btn waves-effect waves-light red accent-4 z-depth-0 modal-trigger" style="cursor:pointer" title="Remover ${data[i][0]}" data-target="removeSection${i}"><i class="material-icons" style="font-size:23px">delete</i></button>
						</td>
					</tr>`
			}

			sections.innerHTML = sectionsHTML
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

		const deleteSection = async (id, name) => {
			const result = await (await fetch(`src/delete_section.php?section_id=${id}`)).json()

			if (result.status === '1') {
				M.toast({
					html: `${name} removido(a).`,
					classes: 'green'
				})

				selectSections()
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
