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
	<title>Tipos de Ferramentas - Atualizar Dados</title>
	<?php include_once("$assets/components/admin_components/meta_tags.php") ?>
</head>

<body style="background:#2e3748">
	<?php include_once("$assets/components/noscript.php") ?>

	<main>
		<div class="container">
			<div class="card-panel z-depth-3 left-div-margin" style="padding-bottom:10px">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">edit</i>Seção de Ferramentas - Atualizar Dados</h1>
				<label>Atualizar Dados de uma Seção do 4People</label>

				<div class="divider"></div>

				<?php
				include_once("$assets/php/Connection.php");
				$section_id = filter_input(INPUT_GET, 'section_id', FILTER_DEFAULT);

				$sql = $database->prepare('SELECT * FROM sections WHERE section_id = :section_id LIMIT 1');
				$sql->bindValue(':section_id', $section_id);
				$sql->execute();

				extract($sql->fetch());
				$t_id = $type_id
				?>

				<form style="margin-top:15px" action="../src/update_section.php" method="POST">
					<div class="row mb-0">
						<input type="hidden" value="<?= $section_id ?>" name="section_id">
						<div class="input-field col s12 m6">
							<i class="material-icons prefix">format_size</i>
							<input value="<?= $section_name ?>" id="section_name" title="Preencha este campo com o nome." placeholder="Tipo de Seção" class="validate" type="text" name="section_name" oninvalid="this.setCustomValidity('Preencha este campo com o nome.')" oninput="setCustomValidity('')" required>
							<label class="active" for="section_name">Nome *</label>
							<span class="helper-text" data-error="Seção de Ferramenta inválida." data-success="Seção de Ferramenta válida.">Ex: Geradores</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">folder</i>
							<input value="<?= $section_path ?>" id="section_path" title="Preencha este campo com o caminho." placeholder="Caminho da Seção" class="validate" type="text" name="section_path" oninvalid="this.setCustomValidity('Preencha este campo com o caminho.')" oninput="setCustomValidity('')" required>
							<label class="active" for="section_path">Path *</label>
							<span class="helper-text" data-error="Caminho de Seção inválido." data-success="Caminho de Seção válido.">Ex: geradores</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix"><?= $section_icon ?></i>
							<input value="<?= $section_icon ?>" id="section_icon" title="Preencha este campo com o ícone." placeholder="Ícone de Seção" class="validate" type="text" name="section_icon" oninvalid="this.setCustomValidity('Preencha este campo com o ícone.')" oninput="setCustomValidity('')" required>
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
									<option value="<?= $type_id ?>" <?= $t_id === $type_id ? 'selected' : '' ?>><?= $type_name ?></option>
								<?php endforeach ?>
							</select>
							<label>Tipo *</label>
							<span class="helper-text">Caminho da Seção</span>
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
