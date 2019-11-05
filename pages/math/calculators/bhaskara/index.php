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
	<title>Equação do 2° Grau - 4People</title>
	<?php include_once("$assets/components/MetaTags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Equação do 2° Grau - 4People">
	<meta name="description" content="Calcular a equação do 2° grau (Bhaskara). 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="Equação do 2° Grau - 4People">
	<meta name="twitter:title" content="Equação do 2° Grau - 4People">
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
				<h1 class="mont-serrat" style="font-size:30px;margin:0 0 5px"><i class="material-icons left" style="top:5px"><?= $icon_section ?></i><?= $name_tool ?></h1>

				<label><?= $description_tool ?></label>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m6 l4">
						<div class="row mb-0">
							<p class="mb-0 col s12">Valor A:</p>

							<div class="input-field col s12">
								<input id="valueA" type="number" placeholder="Digite aqui o valor do A." step="any">
							</div>
						</div>
					</div>

					<div class="col s12 m6 l4">
						<div class="row mb-0">
							<p class="mb-0 col s12">Valor B:</p>

							<div class="input-field col s12">
								<input id="valueB" type="number" placeholder="Digite aqui o valor do B." step="any">
							</div>
						</div>
					</div>

					<div class="col s12 m6 l4">
						<div class="row mb-0">
							<p class="mb-0 col s12">Valor C:</p>

							<div class="input-field col s12">
								<input id="valueC" type="number" placeholder="Digite aqui o valor do C." step="any">
							</div>
						</div>
					</div>
				</div>

				<div class="divider mb-2"></div>
				<button title="Calcular o Bhaskara" class="btn btn-center waves-effect waves-light red-color z-depth-2" onclick="calculate()">
					Calcular Bhaskara
				</button>
				<div class="divider mt-2"></div>

				<textarea class="mt-2" id="result" placeholder="Resultado" spellcheck="false" readonly></textarea>
				<button title="Copiar Resultado" class="btn waves-effect waves-light dark-grey mt-1 z-depth-0" onclick="copyResult()">
					<i class="material-icons left">content_copy</i>Copiar
				</button>
				<button title="Limpar Resultado" class="btn waves-effect waves-light dark-grey mt-1 z-depth-0" onclick="clearInput()">
					<i class="material-icons left">clear</i>Limpar
				</button>

				<div class="top-div dark-grey"></div>
			</div>

			<?php include_once("$assets/components/MoreTools.php") ?>
		</div>
	</main>

	<?php
	include_once("$assets/components/Footer.php");
	include_once("$assets/components/ServiceWorker.php")
	?>

	<script src="<?= $assets ?>/algorithms/calculators/bhaskara.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
