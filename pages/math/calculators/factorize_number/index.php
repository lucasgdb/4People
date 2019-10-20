<?php include_once('../../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Fatorar Número - 4People</title>
	<?php include_once("$assets/components/MetaTags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Fatorar Número - 4People">
	<meta name="description" content="Fatoração de Número Online. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="Fatorar Número - 4People">
	<meta name="twitter:title" content="Fatorar Número - 4People">
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
					<p class="mb-0 col s12">Número:</p>

					<div class="input-field col s12">
						<input id="number" type="number" placeholder="Digite aqui o número." min="1" step="1" value="100">
					</div>
				</div>

				<div class="divider mb-2"></div>
				<button title="Fatorar Número" class="btn btn-center waves-effect waves-light red-color z-depth-2" onclick="factorize()">
					Fatorar Número
				</button>
				<div class="divider mt-2"></div>

				<div class="mt-2" id="result" placeholder="Resultado" contenteditable="false"></div>
				<button id="save" title="Copiar Resultado" class="btn waves-effect waves-light dark-grey mt-2 z-depth-0">
					Copiar
				</button>
				<button title="Limpar Fatoração" class="btn waves-effect waves-light dark-grey mt-2 z-depth-0" onclick="clearInput()">
					Limpar
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

	<script src="<?= $assets ?>/algorithms/calculators/factorization.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/clipboard.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
