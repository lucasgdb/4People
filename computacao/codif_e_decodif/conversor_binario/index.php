<?php include_once('../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
   <link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Binário, Octal e Hexadecimal - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Conversor de Código Binário - 4People">
	<meta name="description" content="Conversor Binário. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./computacao/codif_decodif/conversor_binario/">
	<meta property="og:title" content="Conversor Binário - 4People">
	<meta name="twitter:title" content="Conversor Binário - 4People">
	<meta property="og:url" content="./computacao/codif_decodif/conversor_binario/">
	<meta name="twitter:url" content="./computacao/codif_decodif/conversor_binario/">
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">textsms</i>Conversor Binário</h1>

				<label><?= $description ?></label>
				<div class="divider"></div>

				<textarea class="mt-2" id="text" placeholder="Digite aqui o texto" spellcheck="false"></textarea>

				<button title="Converter texto para Binário" class="btn waves-effect waves-light indigo darken-4 mt-1" onclick="convertToBinary()">
					Converter para Binário
				</button>
				<button title="Limpar Validação" class="btn waves-effect waves-light indigo darken-4 ml-2 mt-1 z-depth-0 right" onclick="clearInput(txtText)">
					Limpar
				</button>
				<button title="Copiar Texto" class="btn waves-effect waves-light indigo darken-4 mt-1 z-depth-0 right" onclick="copyResult(txtText)">
					Copiar
				</button>

				<textarea class="mt-2" id="binary" placeholder="Digite aqui o código binário" spellcheck="false"></textarea>

				<button title="Converter Código Binário para texto" class="btn waves-effect waves-light indigo darken-4 mt-1" onclick="convertToText()">
					Converter para Texto
				</button>
				<button title="Limpar Validação" class="btn waves-effect waves-light indigo darken-4 ml-2 mt-1 z-depth-0 right" onclick="clearInput(txtBinaryCode)">
					Limpar
				</button>
				<button title="Copiar Código Binário" class="btn waves-effect waves-light indigo darken-4 mt-1 z-depth-0 right" onclick="copyResult(txtBinaryCode)">
					Copiar
				</button>

				<div class="left-div indigo darken-4"></div>
			</div>

			<div class="card-panel left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">trending_up</i>Veja também:</h1>
				<div class="divider"></div>

				<ul class="collection with-header mb-0">
					<li class="collection-item">
						<div>Base 64 - Codificador & Decodificador<a href="#" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
					</li>
					<li class="collection-item">
						<div>MD5 - Codificador<a href="#" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
					</li>
				</ul>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= $assets ?>/algorithms/encoders_decoders/binaryConverter.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
