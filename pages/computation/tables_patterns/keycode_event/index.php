<?php
$root = '../../../..';
include_once("$root/assets/src/php/Main.php")
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="src/index.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<title>Código de Eventos das Teclas - 4People</title>
	<?php include_once("$assets/components/MetaTags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Código de Eventos das Teclas - 4People">
	<meta name="description" content="Código de Eventos das Teclas para descobrir cada keyCode do teclado. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="Código de Eventos das Teclas - 4People">
	<meta property="og:title" content="Código de Eventos das Teclas - 4People">
	<meta name="twitter:title" content="Código de Eventos das Teclas - 4People">
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
				<h1 class="mont-serrat dark-grey-text" style="font-size:30px;margin:-5px 0 10px"><i class="material-icons left" style="top:5px"><?= $icon_section ?></i><?= $name_tool ?></h1>

				<label class="dark-grey-text"><?= $description_tool ?></label>
				<div class="divider"></div>

				<div class="row mb-0">
					<h5 class="mt-0 col s12 center-align">Pressione qualquer tecla.</h5>

					<h5 id="digit" class="center-align large-text">116</h5>

					<div class="col s12 m6">
						<div class="card hoverable">
							<div class="card-action grey lighten-3">
								<p class="center-align flow-text mt-0 mb-0">event.key</p>
							</div>

							<div class="divider"></div>

							<div class="card-content">
								<p id="key" class="flow-text center-align">F5</p>
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="card hoverable">
							<div class="card-action grey lighten-3">
								<p class="center-align flow-text mt-0 mb-0">event.location</p>
							</div>

							<div class="divider"></div>

							<div class="card-content">
								<p id="location" class="flow-text center-align">0 (General keys)</p>
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="card hoverable">
							<div class="card-action grey lighten-3">
								<p class="center-align flow-text mt-0 mb-0">event.which</p>
							</div>

							<div class="divider"></div>

							<div class="card-content">
								<p id="which" class="flow-text center-align">116</p>
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="card hoverable">
							<div class="card-action grey lighten-3">
								<p class="center-align flow-text mt-0 mb-0">event.code</p>
							</div>

							<div class="divider"></div>

							<div class="card-content">
								<p id="code" class="flow-text center-align">F5</p>
							</div>
						</div>
					</div>
				</div>

				<div class="top-div dark-grey"></div>
			</div>

			<?php include_once("$assets/components/MoreTools.php") ?>
		</div>
	</main>

	<?php
	include_once("$assets/components/FixedActionButton.php");
	include_once("$assets/components/Footer.php");
	include_once("$assets/components/ServiceWorker.php")
	?>

	<script src="<?= $assets ?>/algorithms/tables_and_patterns/jsEventKeyCodes.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
