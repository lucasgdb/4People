<?php include_once('../../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Gerador de Nicks - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Gerador de Nicks - 4People">
	<meta name="description" content="Gerador de Nicks Online para gerar nicks aleatórios. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="Gerador de Nicks - 4People">
	<meta name="twitter:title" content="Gerador de Nicks - 4People">
</head>

<body class="grey lighten-3">
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php");
	include_once("$assets/components/sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel top-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">autorenew</i>Gerador de Nicks</h1>

				<label><?= $description ?></label>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="input-field col s12">
						<select class="center" id="selectNick">
							<option value="1" selected>Apartir do seu nome</option>
							<option value="2">Aleatório</option>
							<option value="3">Nome + Adjetivo</option>
							<option value="4">Antes do seu nome</option>
							<option value="5">Depois do seu nome</option>
						</select>
					</div>

					<p id="typeName" class="mb-0 col s12">Digite seu nome:</p>
					<div class="col s12">
						<div class="input-field">
							<input id="name" type="text" placeholder="Digite aqui o seu nome" step="any" class="">
							<input id="blocksAmount" type="number" class="hide" placeholder="Digite o número de Nicks" value="20" step="1">
						</div>
					</div>
				</div>

				<div class="divider mb-2"></div>
				<button title="Gerar Nicks" class="btn btn-center waves-effect waves-dark btn-green" onclick="generate()">
					Gerar Nicks
				</button>
				<div class="divider mt-2"></div>

				<div class="row mb-0" id="card-container"></div>

				<div class="top-div dark-grey"></div>
			</div>

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
								<div><?= $tool_name ?><a href="../<?= $tool_path ?>/" class="secondary-content"><i class="material-icons red-color-text">send</i></a></div>
							</li>
						<?php endforeach ?>
					</ul>

					<div class="left-div dark-grey"></div>
				</div>
			<?php endif ?>
		</div>
	</main>

	<?php
	include_once("$assets/components/footer.php");
	include_once("$assets/components/service_worker.php")
	?>

	<script src="<?= $assets ?>/algorithms/generators/nickGenerator.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/clipboard.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
