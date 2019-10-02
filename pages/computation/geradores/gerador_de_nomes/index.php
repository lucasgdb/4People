<?php include_once('../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Gerador de Nomes - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Gerador de Nomes - 4People">
	<meta name="description" content="Gerador de Nomes  Online para gerar nomes aleatórios. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./computacao/geradores/gerador_de_nomes/">
	<meta property="og:title" content="Gerador de Nomes - 4People">
	<meta name="twitter:title" content="Gerador de Nomes - 4People">
	<meta property="og:url" content="./computacao/geradores/gerador_de_nomes/">
	<meta name="twitter:url" content="./computacao/geradores/gerador_de_nomes/">
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
			<div class="card-panel left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">autorenew</i>Gerador de Nomes</h1>

				<label><?= $description ?></label>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="input-field col s12">
						<select class="center" id="selectNames">
							<option value="1" selected>Nome + Sobrenome</option>
							<option value="2">Apenas o nome</option>
							<option value="3">Nome + Sobrenome + Sobrenome</option>
						</select>
					</div>
					<div class="input-field col s12">
						<select class="center" id="selectSex">
							<option value="1" selected>Masculino</option>
							<option value="2">Feminino</option>
							<option value="3">Masculino e Feminino</option>
						</select>
					</div>
					<div class="col s12">
						<div class="input-field">
							<input id="blocksAmount" type="number" class="" placeholder="Digite o número de Nomes" step="1">
						</div>
					</div>
				</div>

				<div class="divider mb-2"></div>
				<button title="Gerar Nomes" class="btn btn-center waves-effect waves-dark indigo darken-4 white-text" onclick="generate()">
					Gerar Nomes
				</button>
				<div class="divider mt-2"></div>

				<div class="row mb-0" id="card-container"></div>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php
	include_once("$assets/components/footer.php");
	include_once("$assets/components/service_worker.php")
	?>

	<script src="<?= $assets ?>/algorithms/generators/nameGenerator.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/clipboard.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
