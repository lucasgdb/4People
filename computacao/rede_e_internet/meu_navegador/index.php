<?php include_once('../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<title>Meu Navegador - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Meu Navegador - 4People">
	<meta name="description" content="Meu Navegador Online para ver seu navegador. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./computacao/rede_e_internet/meu_navegador/">
	<meta property="og:title" content="Meu Navegador - 4People">
	<meta name="twitter:title" content="Meu Navegador - 4People">
	<meta property="og:url" content="./computacao/rede_e_internet/meu_navegador/">
	<meta name="twitter:url" content="./computacao/rede_e_internet/meu_navegador/">
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">wifi</i>Meu Navegador</h1>

				<label>Veja seu Navegador aqui.</label>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12">
						<p class="mb-0" style="font-size:20px">Navegador: <span id="browser"></span></p>
						<div class="divider mt-0"></div>
						<p class="mb-0">Linguagem: <span id="language"></span></p>
					</div>
				</div>

				<div class="left-div indigo darken-4"></div>
			</div>

			<div class="card-panel left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">trending_up</i>Veja também:</h1>
				<div class="divider"></div>

				<ul class="collection with-header mb-0">
					<li class="collection-item">
						<div>Gerador de Senhas<a href="<?= $root ?>/" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
					</li>
					<li class="collection-item">
						<div>Gerador de Cartão de Crédito<a href="<?= $root ?>/" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
					</li>
				</ul>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= $assets ?>/algorithms/myWebBrowser.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
