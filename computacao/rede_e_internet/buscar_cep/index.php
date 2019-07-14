<?php include_once('../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
   <link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Buscar CEP - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Buscar CEP - 4People">
	<meta name="description" content="Buscar CEP Online para ver informações do seu CEP. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./computacao/rede_e_internet/buscar_cep/">
	<meta property="og:title" content="Buscar CEP - 4People">
	<meta name="twitter:title" content="Buscar CEP - 4People">
	<meta property="og:url" content="./computacao/rede_e_internet/buscar_cep/">
	<meta name="twitter:url" content="./computacao/rede_e_internet/buscar_cep/">
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">wifi</i>Buscar CEP</h1>

				<label>Busque informações de seu CEP, como Rua, Cidade, Bairro e Estado aqui.</label>
				<div class="divider"></div>

				<div class="row mb-0">
					<p class="mb-0 col s12">Digite seu CEP:</p>

					<div class="input-field col s12">
						<input id="cep" placeholder="Digite seu CEP aqui." type="text" maxlength="10">
					</div>
				</div>

				<div class="divider mb-2"></div>
				<button title="Buscar CEP" class="btn btn-center waves-effect waves-light indigo darken-4 z-depth-2" onclick="search()">
					Buscar CEP
				</button>
				<div class="divider mt-2"></div>

				<textarea id="result" placeholder="Resultado" spellcheck="false" readonly></textarea>
				<button title="Copiar Resultado" class="btn waves-effect waves-light indigo darken-4 mt-1 z-depth-0" onclick="copyResult()">
					Copiar
				</button>
				<button title="Limpar Resultado" class="btn waves-effect waves-light indigo darken-4 mt-1 z-depth-0" onclick="clearInput()">
					Limpar
				</button>

				<div class="left-div indigo darken-4"></div>
			</div>

			<div class="card-panel left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">trending_up</i>Veja também:</h1>
				<div class="divider"></div>

				<ul class="collection with-header mb-0">
					<li class="collection-item">
						<div>Meu IP<a href="<?= $root ?>/computacao/rede_e_internet/meu_ip/" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
					</li>
					<li class="collection-item">
						<div>Meu Navegador<a href="<?= $root ?>/computacao/rede_e_internet/meu_navegador/" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
					</li>
				</ul>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/cep.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
