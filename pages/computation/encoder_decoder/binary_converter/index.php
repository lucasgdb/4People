<?php include_once('../../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Binário, Octal e Hexadecimal - 4People</title>
	<?php include_once("$assets/components/MetaTags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Conversor de Código Binário - 4People">
	<meta name="description" content="Conversor Binário. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="Conversor Binário - 4People">
	<meta name="twitter:title" content="Conversor Binário - 4People">
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

				<textarea class="mt-2" id="text" placeholder="Digite aqui o texto" spellcheck="false"></textarea>

				<button title="Converter texto para Binário" class="btn waves-effect waves-light red-color mt-1" onclick="convertToBinary()">
					Converter para Binário
				</button>
				<button title="Limpar Validação" class="btn waves-effect waves-light dark-grey ml-2 mt-1 z-depth-0 right" onclick="clearInput(txtText)">
					Limpar
				</button>
				<button title="Copiar Texto" class="btn waves-effect waves-light dark-grey mt-1 z-depth-0 right" onclick="copyResult(txtText)">
					Copiar
				</button>

				<textarea class="mt-2" id="binary" placeholder="Digite aqui o código binário" spellcheck="false"></textarea>

				<button title="Converter Código Binário para texto" class="btn waves-effect waves-light red-color mt-1" onclick="convertToText()">
					Converter para Texto
				</button>
				<button title="Limpar Validação" class="btn waves-effect waves-light dark-grey ml-2 mt-1 z-depth-0 right" onclick="clearInput(txtBinaryCode)">
					Limpar
				</button>
				<button title="Copiar Código Binário" class="btn waves-effect waves-light dark-grey mt-1 z-depth-0 right" onclick="copyResult(txtBinaryCode)">
					Copiar
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

	<script src="<?= $assets ?>/algorithms/encoders_decoders/binaryConverter.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
