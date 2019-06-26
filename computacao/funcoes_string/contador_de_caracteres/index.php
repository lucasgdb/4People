<?php include_once('../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
	<title>Contador de Caracteres - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Contador de Caracteres - 4People">
	<meta name="description" content="Contador de Caracteres. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./computacao/funcoes_string/contador_de_caracteres/">
	<meta property="og:title" content="Contador de Caracteres - 4People">
	<meta name="twitter:title" content="Contador de Caracteres - 4People">
	<meta property="og:url" content="./computacao/funcoes_string/contador_de_caracteres/">
	<meta name="twitter:url" content="./computacao/funcoes_string/contador_de_caracteres/">
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">format_color_text</i>Contador de Caracteres</h1>

				<label>Contador de letras, caracteres sem espaço, palavras, espaços, vogais, consoantes, números e linhas.</label>
				<div class="divider"></div>

				<textarea class="mt-2" id="text" placeholder="Digite aqui o texto" oninput="countChars()"></textarea>

				<ul class="collection mb-0">
					<li class="collection-item">Caracteres: <span id="chars">0</span></li>
					<li class="collection-item">Caracteres sem espaço: <span id="charsWSpaces">0</span></li>
					<li class="collection-item">Palavras: <span id="words">0</span></li>
					<li class="collection-item">Espaços: <span id="spaces">0</span></li>
					<li class="collection-item">Vogais: <span id="vowels">0</span></li>
					<li class="collection-item">Consoantes: <span id="consonants">0</span></li>
					<li class="collection-item">Números: <span id="numbers">0</span></li>
					<li class="collection-item">Linhas: <span id="lines">0</span></li>
				</ul>

				<div class="left-div indigo darken-4"></div>
			</div>

			<div class="card-panel left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">trending_up</i>Veja também:</h1>
				<div class="divider"></div>

				<ul class="collection with-header mb-0">
					<li class="collection-item">
						<div>Gerador de Senhas<a href="#!" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
					</li>
					<li class="collection-item">
						<div>Gerador de Cartão de Crédito<a href="#!" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
					</li>
				</ul>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= $assets ?>/algorithms/charactersCount.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
