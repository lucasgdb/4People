<?php
include_once('../../../../../assets/assets.php');

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
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Controle de Ferramentas - Atualizar Dados</title>
	<?php include_once("$assets/components/admin_components/meta_tags.php") ?>
</head>

<body style="background:#2e3748">
	<?php include_once("$assets/components/noscript.php") ?>

	<main>
		<div class="container">
			<div class="card-panel z-depth-3 left-div-margin" style="padding-bottom:10px">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">edit</i>Tipos de Ferramentas - Atualizar Dados</h1>
				<label>Atualizar Dados de um Tipo de Ferramenta do 4People</label>

				<div class="divider"></div>

				<?php
				include_once("$assets/php/Connection.php");
				$tool_id = filter_input(INPUT_GET, 'tool_id', FILTER_DEFAULT);

				$sql = $database->prepare('SELECT tool_id, tool_name, tool_path, tool_description, tool_link, tool_status, section_id FROM tools WHERE tool_id = :tool_id LIMIT 1');
				$sql->bindValue(':tool_id', $tool_id);
				$sql->execute();

				extract($sql->fetch());
				$s_id = $section_id
				?>

				<form style="margin-top:15px" action="../src/update_tool.php" method="POST">
					<div class="row mb-0">
						<input type="hidden" value="<?= $tool_id ?>" name="tool_id">
						<div class="input-field col s12 m6">
							<i class="material-icons prefix">format_size</i>
							<input value="<?= $tool_name ?>" id="tool_name" title="Preencha este campo com o nome." placeholder="Nomoe de Ferramenta" class="validate" type="text" name="tool_name" oninvalid="this.setCustomValidity('Preencha este campo com o nome.')" oninput="setCustomValidity('')" required>
							<label class="active" for="tool_name">Nome *</label>
							<span class="helper-text" data-error="Ferramenta inválida." data-success="Ferramenta válida.">Ex: Gerador de CPF</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">folder</i>
							<input value="<?= $tool_path ?>" id="tool_path" title="Preencha este campo com o caminho." placeholder="Caminho da Seção" class="validate" type="text" name="tool_path" oninvalid="this.setCustomValidity('Preencha este campo com o caminho.')" oninput="setCustomValidity('')" required>
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
									<option value="<?= $section_id ?>" <?= $s_id === $section_id ? 'selected' : '' ?>><?= $section_name ?></option>
								<?php endforeach ?>
							</select>
							<label>Seção *</label>
							<span class="helper-text">Seção da Ferramenta</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix"><?= $tool_status ? 'check' : 'close' ?></i>
							<select name="tool_status">
								<option value="0">Desativado</option>
								<option value="1" <?= $tool_status ? 'selected' : '' ?>>Ativado</option>
							</select>
							<label>Status *</label>
							<span class="helper-text">Status da Ferramenta</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">description</i>
							<input value="<?= $tool_description ?>" id="tool_description" title="Preencha este campo com a descrição." placeholder="Descrição da Ferramenta" class="validate" type="text" name="tool_description" oninvalid="this.setCustomValidity('Preencha este campo com o caminho.')" oninput="setCustomValidity('')">
							<label class="active" for="tool_description">Descrição</label>
							<span class="helper-text">Ex: Gerador de CPF Online para Programadores testarem seus Softwares em desenvolvimento.</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">link</i>
							<input value="<?= $tool_link ?>" id="tool_link" title="Preencha este campo com o link do repositório." placeholder="Link da Ferramenta no GitHub" class="validate" type="text" name="tool_link" oninvalid="this.setCustomValidity('Preencha este campo com o link do repositório.')" oninput="setCustomValidity('')">
							<label class="active" for="tool_link">Link</label>
							<span class="helper-text">Ex: https://github.com/lucasnaja/4People</span>
						</div>

						<div class="col s12">
							<div class="divider"></div>
							<a href="../" class="btn waves-effect waves-light red accent-4 mt-2 z-depth-0" title="Cancelar"><i class="material-icons left">close</i>Cancelar</a>
							<button title="Salvar" class="btn waves-effect waves-light green darken-3 mt-2 right z-depth-0">
								<i class="material-icons left">save</i>Salvar
								<input class="hide" type="submit" value="">
							</button>
						</div>
					</div>
				</form>

				<div class="left-div indigo darken-3" style="border-radius:0"></div>
			</div>
		</div>
	</main>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script>
		M.FormSelect.init(document.querySelectorAll('select'))
	</script>
</body>

</html>
