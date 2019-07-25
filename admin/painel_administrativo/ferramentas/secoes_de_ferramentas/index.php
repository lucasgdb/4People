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

<body class="grey lighten-3">
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

				<form style="margin-top:15px" action="src/insert_section.php" method="post">
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
							<button title="Inserir Seção no 4People" class="btn indigo darken-4 mt-2 z-depth-0">
								<i class="material-icons left">folder</i>Inserir
								<input style="display:none" type="submit" value="">
							</button>
						</div>
					</div>
				</form>

				<div class="top-div indigo darken-4"></div>
			</div>

			<div class="card-panel z-depth-2 top-div-margin" style="padding-bottom:10px">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">filter_list</i>Filtrar Tipos</h1>
				<label>Filtro de Tipos de Ferramentas do 4People</label>

				<div class="divider"></div>

				<form action="." method="get">
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
							<button title="Filtrar Seções de Ferramentas do 4People" class="btn indigo darken-4 mt-2 z-depth-0">
								<i class="material-icons left">filter_list</i>Filtrar
								<input style="display:none" title="Filtrar Ferramentas" type="submit">
							</button>

							<a title="Limpar Filtro" href="." class="btn indigo darken-4 mt-2 waves-effect waves-light right z-depth-0"><i class="material-icons left">format_clear</i>Limpar</a>
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
							<th>Caminho</th>
							<th>Ícone</th>
							<th>Tipo</th>
							<th>Operações</th>
						</tr>
					</thead>

					<tbody>
						<?php include_once('src/select_sections.php') ?>
					</tbody>
				</table>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<div id="removeSection" class="modal">
		<div class="modal-content left-div-margin">
			<h4>Remover Seção</h4>
			<p class="mb-0">Você tem certeza que deseja remover <span id="section"></span>?</p>

			<div class="left-div indigo darken-4" style="border-radius:0"></div>
		</div>

		<div class="divider"></div>

		<div class="modal-footer">
			<button title="Cancelar" class="modal-close waves-effect waves-light btn-flat indigo darken-4 white-text"><i class="material-icons left red-text" style="font-size:30px">close</i>Não</button>
			<a id="linkRemoveSection" title="Remover Seção" class="modal-close waves-effect waves-light btn-flat indigo darken-4 white-text"><i class="material-icons left green-text" style="font-size:30px">check</i>Sim</a>
		</div>
	</div>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script>
		M.FormSelect.init(document.querySelectorAll('select'))
		const linkRemoveSection = document.querySelector('#linkRemoveSection')
		const lblSection = document.querySelector('#section')

		const changeLink = (link, section) => {
			linkRemoveSection.href = link
			lblSection.innerHTML = section
		}

		M.Modal.init(document.querySelectorAll('.modal'))
	</script>
</body>

</html>
