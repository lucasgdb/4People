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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">edit</i>Tipo de Ferramentas - Atualizar Dados</h1>
				<label>Atualizar Dados de um Tipo de Ferramenta do 4People</label>

				<div class="divider"></div>

				<?php
				include_once("$assets/php/Connection.php");
				$type_id = filter_input(INPUT_GET, 'type_id', FILTER_DEFAULT);

				$sql = $database->prepare('SELECT * FROM types WHERE type_id = :type_id LIMIT 1');
				$sql->bindValue(':type_id', $type_id);
				$sql->execute();

				extract($sql->fetch());
				?>

				<form style="margin-top:15px" action="../src/update_type.php" method="post">
					<div class="row mb-0">
						<input type="hidden" value="<?= $type_id ?>" name="type_id">
						<div class="input-field col s12 m6">
							<i class="material-icons prefix">format_size</i>
							<input value="<?= $type_name ?>" id="type_name" title="Preencha este campo com o nome." placeholder="Tipo de Ferramenta" class="validate" type="text" name="type_name" oninvalid="this.setCustomValidity('Preencha este campo com o nome.')" oninput="setCustomValidity('')" required>
							<label class="active" for="type_name">Nome *</label>
							<span class="helper-text" data-error="Tipo de Ferramenta inválido." data-success="Tipo de Ferramenta válida.">Ex: Computação</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">folder</i>
							<input value="<?= $type_path ?>" id="type_path" title="Preencha este campo com o caminho." placeholder="Caminho da Ferramenta" class="validate" type="text" name="type_path" oninvalid="this.setCustomValidity('Preencha este campo com o caminho.')" oninput="setCustomValidity('')" required>
							<label class="active" for="type_path">Path *</label>
							<span class="helper-text" data-error="Caminho de Ferramenta inválido." data-success="Caminho de Ferramenta válido.">Ex: computacao</span>
						</div>

						<div class="input-field col s12">
							<i class="material-icons prefix"><?= $type_icon ?></i>
							<input value="<?= $type_icon ?>" id="type_icon" title="Preencha este campo com o ícone." placeholder="Ícone de Ferramenta" class="validate" type="text" name="type_icon" oninvalid="this.setCustomValidity('Preencha este campo com o ícone.')" oninput="setCustomValidity('')" required>
							<label class="active" for="type_icon">Ícone *</label>
							<span class="helper-text" data-error="Ícone de Ferramenta inválido." data-success="Ícone de Ferramenta válido.">Ex: computer</span>
						</div>

						<div class="col s12">
							<div class="divider"></div>
							<a href="../" class="btn waves-effect waves-light red accent-4 mt-2 z-depth-0" title="Cancelar"><i class="material-icons left">close</i>Cancelar</a>
							<button title="Salvar" class="btn waves-effect waves-light green darken-3 mt-2 right z-depth-0">
								<i class="material-icons left">save</i>Salvar
								<input style="display:none" type="submit" value="">
							</button>
						</div>
					</div>
				</form>

				<div class="left-div indigo darken-3" style="border-radius:0"></div>
			</div>
		</div>
	</main>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
</body>

</html>
