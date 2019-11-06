<?php
$root = '../../../..';
include_once("$root/assets/assets.php")
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Conversor de Temperatura - 4People</title>
	<?php include_once("$assets/components/MetaTags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Conversor de Temperatura - 4People">
	<meta name="description" content="Conversor de Temperatura Online. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="Conversor de Temperatura - 4People">
	<meta name="twitter:title" content="Conversor de Temperatura - 4People">
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
				<h1 class="mont-serrat dark-grey-text" style="font-size:30px;margin:0 0 5px"><i class="material-icons left" style="top:5px"><?= $icon_section ?></i><?= $name_tool ?></h1>

				<label class="dark-grey-text"><?= $description_tool ?></label>
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
							<i class="material-icons left">content_copy</i>Copiar
						</button>
						<button title="Copiar" class="btn waves-effect right waves-light dark-grey z-depth-0" onclick="copyResult(txtSecond)">
							<i class="material-icons left">content_copy</i>Copiar
						</button>
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

	<script src="<?= $assets ?>/algorithms/calculators/temperatureConversor.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
