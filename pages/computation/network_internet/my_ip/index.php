<?php include_once('../../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<title>Meu IP - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Meu IP - 4People">
	<meta name="description" content="Meu IP Online para ver informações do seu IP. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./computacao/rede_e_internet/meu_ip/">
	<meta property="og:title" content="Meu IP - 4People">
	<meta name="twitter:title" content="Meu IP - 4People">
	<meta property="og:url" content="./computacao/rede_e_internet/meu_ip/">
	<meta name="twitter:url" content="./computacao/rede_e_internet/meu_ip/">
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
			<div class="card-panel top-div-margin">
				<h1 class="mont-serrat" style="font-size:30px;margin:5px 0 5px 0"><i class="material-icons left red-color-text" style="top:5px"><?= $icon_section ?></i><?= $name_tool ?></h1>

				<label><?= $description_tool ?></label>
				<div class="divider" style="margin-top:10px"></div>

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

			<div class="card-panel left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">trending_up</i>Veja também:</h1>
				<div class="divider"></div>

				<ul class="collection with-header mb-0">
					<li class="collection-item">
						<div>Gerador de Senhas<a href="<?= $root ?>/" class="secondary-content"><i class="material-icons red-color-text">send</i></a></div>
					</li>
					<li class="collection-item">
						<div>Gerador de Cartão de Crédito<a href="<?= $root ?>/" class="secondary-content"><i class="material-icons red-color-text">send</i></a></div>
					</li>
				</ul>

				<div class="left-div dark-grey"></div>
			</div>
		</div>
	</main>

	<?php
	include_once("$assets/components/footer.php");
	include_once("$assets/components/service_worker.php")
	?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
