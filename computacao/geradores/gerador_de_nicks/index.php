<?php include_once('../../../assets/assets.php') ?>
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
	<meta name="msapplication-starturl" content="./computacao/geradores/gerador_de_nicks/">
	<meta property="og:title" content="Gerador de Nicks - 4People">
	<meta name="twitter:title" content="Gerador de Nicks - 4People">
	<meta property="og:url" content="./computacao/geradores/gerador_de_nicks/">
	<meta name="twitter:url" content="./computacao/geradores/gerador_de_nicks/">
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">autorenew</i>Gerador de Nicks</h1>

				<label>Gerador de Nicks Online para gerar diversos tipos de nicks aleatórios.</label>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="input-field col s12">
						<select class="center" id="selectNick">
							<option value="1" selected>Apartir do seu nome</option>
							<option value="2" >Aleatório</option>
							<option value="3" >Nome + Adjetivo</option>
							<option value="4" >Antes do seu nome</option>
							<option value="5" >Depois do seu nome</option>
						</select>
					</div>

					<p class="mb-0 col s12 text-input">Digite seu nome:</p>
					<div class="col s12 areaText">
						<div class="input-field">
							<input id="name" type="text" placeholder="Digite aqui o seu nome" step="any" class="">
							<input id="blockNumber" type="number" class="hide" placeholder="Digite o numero de nicks" step="any">
						</div>
					</div>
				</div>

				<button title="Gerar Nicks" class="btn btn-center waves-effect waves-dark indigo darken-4 white-text" style="margin-top:10px;" onclick="generate()">
					Gerar Nicks
				</button>

				<div class="divider mt-2"></div>


					<div class="row mb-0 card-blocks center">		
					</div> 

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>
	<script src="<?= $assets ?>/algorithms/generators/nickGenerator.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/clipboard.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
