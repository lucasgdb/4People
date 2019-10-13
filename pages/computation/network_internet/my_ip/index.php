<?php include_once('../../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<title>Meu IP - 4People</title>
	<?php include_once("$assets/components/MetaTags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Meu IP - 4People">
	<meta name="description" content="Meu IP Online para ver informações do seu IP. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="Meu IP - 4People">
	<meta name="twitter:title" content="Meu IP - 4People">
</head>

<body>
	<?php
	include_once("$assets/components/NoScript.php");
	include_once("$assets/components/Spinner.php");
	include_once("$assets/components/Header.php");
	include_once("$assets/components/Sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel top-div-margin">
				<h1 class="mont-serrat" style="font-size:30px;margin:5px 0 5px 0"><i class="material-icons left" style="top:5px"><?= $icon_section ?></i><?= $name_tool ?></h1>

				<label><?= $description_tool ?></label>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12">
						<p class="mb-0" style="font-size:20px">Meu IP: <span id="ip"></span></p>
						<div class="divider"></div>
						<!-- <p class="mt-0">Cidade: <span id="city"></span></p> -->
						<p class="mb-0">Região: <span id="region"></span></p>
						<p class="mb-0">Código da região: <span id="regionCode"></span></p>
						<p class="mb-0">País: <span id="country"></span></p>
						<p class="mb-0">Código do país: <span id="countryCode"></span></p>
						<p class="mb-0">Bandeira: <span id="flag"></span></p>
						<p class="mb-0">Moeda: <span id="symbol"></span></p>
						<p class="mb-0">Língua: <span id="language"></span></p>
						<p class="mb-0">Continente: <span id="continent"></span></p>
						<p class="mb-0">Código do continente: <span id="continentCode"></span></p>
						<p class="mb-0">Latitude: <span id="latitude"></span></p>
						<p class="mb-0">Longitude: <span id="longitude"></span></p>
						<p class="mb-0">Código de chamada: <span id="callingCode"></span></p>
					</div>
				</div>

				<div class="top-div dark-grey"></div>
			</div>

			<?php include_once("$assets/components/MoreTools.php") ?>
		</div>
	</main>

	<?php
	include_once("$assets/components/Footer.php");
	include_once("$assets/components/ServiceWorker.php")
	?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
