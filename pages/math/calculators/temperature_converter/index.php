<?php include_once('../../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Conversor de Temperatura - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Conversor de Temperatura - 4People">
	<meta name="description" content="Conversor de Temperatura Online. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./matematica/calculadoras/conversor_de_temperatura/">
	<meta property="og:title" content="Conversor de Temperatura - 4People">
	<meta name="twitter:title" content="Conversor de Temperatura - 4People">
	<meta property="og:url" content="./matematica/calculadoras/conversor_de_temperatura/">
	<meta name="twitter:url" content="./matematica/calculadoras/conversor_de_temperatura/">
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">exposure</i>Conversor de Temperatura</h1>

				<label><?= $description ?></label>
				<div class="divider"></div>

				<div class="row mb-0">
					<p class="mb-0 col s12">Casas decimais:</p>
					<div class="input-field col s12">
						<select id="decimal">
							<option value="0">Nenhuma</option>
							<option value="1">1</option>
							<option value="2" selected>2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="20">20</option>
							<option value="30">30</option>
							<option value="48">48</option>
							<option value="-1">Automática</option>
						</select>
					</div>
				</div>

				<div class="row mb-0" style="position:relative">
					<div class="input-field col s5">
						<input type="number" id="txtFirst" placeholder="Temperatura" step="any" value="0">
					</div>

					<span class="equal">
						=
					</span>

					<div class="input-field inline col s5 offset-s2">
						<input type="number" id="txtSecond" placeholder="Temperatura" step="any" value="32">
					</div>
				</div>

				<div class="row mb-0">
					<div class="input-field col s6 m5">
						<select class="normalScroll" id="ddFirst">
							<option value="0" selected>Graus Celsius</option>
							<option value="1">Graus Fahrenheit</option>
							<option value="2">Graus Kelvin</option>
						</select>
					</div>

					<div class="input-field col s6 m5 offset-m2">
						<select class="normalScroll" id="ddSecond">
							<option value="0">Graus Celsius</option>
							<option value="1" selected>Graus Fahrenheit</option>
							<option value="2">Graus Kelvin</option>
						</select>
					</div>

					<div class="col s12">
						<button title="Copiar" class="btn waves-effect left waves-light dark-grey z-depth-0" onclick="copyResult(txtFirst)">
							Copiar
						</button>
						<button title="Copiar" class="btn waves-effect right waves-light dark-grey z-depth-0" onclick="copyResult(txtSecond)">
							Copiar
						</button>
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

	<script src="<?= $assets ?>/algorithms/calculators/temperatureConversor.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
