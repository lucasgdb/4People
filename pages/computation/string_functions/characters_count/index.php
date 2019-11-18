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
	<title>Contador de Caracteres - 4People</title>
	<?php include_once("$assets/components/MetaTags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Contador de Caracteres - 4People">
	<meta name="description" content="Contador de Caracteres. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="Contador de Caracteres - 4People">
	<meta name="twitter:title" content="Contador de Caracteres - 4People">
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

				<textarea class="mt-2" id="text" placeholder="Digite aqui o texto" oninput="countChars()" spellcheck="false"></textarea>

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

	<script src="<?= $assets ?>/algorithms/string_functions/charactersCount.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
