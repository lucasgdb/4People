<?php include_once('../assets/assets.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= "$assets/src/css/materialize.min.css" ?>">
	<link rel="stylesheet" href="<?= "$assets/src/css/main.css" ?>">
	<title>Outras Ferramentas - 4People</title>
	<?php include_once("$assets/components/metas.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="4People - Ferramentas Online">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./outras_ferramentas/">
	<meta property="og:title" content="Outras Ferramentas - 4People">
	<meta name="twitter:title" content="Outras Ferramentas - 4People">
	<meta property="og:url" content="./outras_ferramentas/">
	<meta name="twitter:url" content="./outras_ferramentas/">
</head>

<body class="grey lighten-3">
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php")
	?>

	<ul id="slide-out" class="sidenav sidenav-fixed collapsible">
		<?php include_once("$assets/components/logo.php") ?>

		<li>
			<div class="collapsible-header"><i class="material-icons">computer</i>Computação</div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<li>
						<?php include_once("$assets/components/computacao/geradores.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/computacao/validadores.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/computacao/funcoes_string.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/computacao/rede_e_internet.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/computacao/codif_decodif.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/computacao/tabelas_e_padroes.php") ?>
					</li>
				</ul>
			</div>
		</li>

		<li>
			<div class="collapsible-header"><i class="material-icons">functions</i>Matemática</div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<li>
						<?php include_once("$assets/components/matematica/calculadoras.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/matematica/calculo_de_areas.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/matematica/calculo_de_datas.php") ?>
					</li>
				</ul>
			</div>
		</li>

		<li class="active">
			<div class="collapsible-header"><i class="material-icons">build</i>Outras Ferramentas</div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<li>
						<?php include_once("$assets/components/outras_ferramentas/dia_a_dia.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/outras_ferramentas/jogos.php") ?>
					</li>
				</ul>
			</div>
		</li>
	</ul>

	<main>
		<div class="container">
			<div class="card-panel left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">build</i>Principais Ferramentas</h1>

				<label>Principais Ferramentas para usos do dia-a-dia do 4People</label>
				<div class="divider"></div>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= "$assets/src/js/materialize.min.js" ?>"></script>
	<script src="<?= "$assets/src/js/main.js" ?>"></script>
</body>

</html>
