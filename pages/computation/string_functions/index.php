<?php include_once('../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
   <link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<title>Funções String - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Funções String - 4People">
	<meta name="description" content="Funções String. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./computacao/funcoes_string/">
	<meta property="og:title" content="Funções String - 4People">
	<meta name="twitter:title" content="Funções String - 4People">
	<meta property="og:url" content="./computacao/funcoes_string/">
	<meta name="twitter:url" content="./computacao/funcoes_string/">
</head>

<body>
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php");
	include_once("$assets/components/sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">format_color_text</i>Funções String</h1>

				<label>Ferramentas de Funções String do 4People</label>
				<div class="divider"></div>
			</div>
		</div>
	</main>

	<?php
   include_once("$assets/components/footer.php");
   include_once("$assets/components/service_worker.php")
   ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>