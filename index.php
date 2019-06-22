<?php include_once('assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/index.css">
	<title>4People - Ferramentas Online</title>
	<?php include_once("$assets/components/metas.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="4People - Ferramentas Online">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./">
	<meta property="og:title" content="4People - Ferramentas Online">
	<meta name="twitter:title" content="4People - Ferramentas Online">
	<meta property="og:url" content="./">
	<meta name="twitter:url" content="./">
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">home</i>4People - Página Inicial</h1>
				<label>Ferramentas Online para estudantes e professores.</label>

				<div class="divider" style="margin-bottom:5px"></div>

				<div class="slider">
					<ul class="slides">
						<li class="grey lighten-2">
							<img alt=".">
							<div class="caption center-align">
								<h3 class="dark grey-text text-darken-4">FEITO PARA TODOS!</h3>
								<h5 class="light grey-text text-darken-4">Possuímos ferramentas para Programadores, professores, estudantes e usuários comuns.</h5>
							</div>
						</li>

						<li class="grey lighten-2">
							<div class="caption left-align">
								<h3 class="dark grey-text text-darken-4">MAIS RÁPIDO!</h3>
								<h5 class="light grey-text text-darken-4">Nossas Ferramentas foram todas escritas em JavaScript, para maior velocidade e segurança.</h5>
							</div>
						</li>

						<li class="grey lighten-2">
							<div class="caption right-align">
								<h3 class="dark grey-text text-darken-4">CÓDIGO ABERTO!</h3>
								<h5 class="light grey-text text-darken-4">O Projeto 4People é de Código Aberto para qualquer um estudar os algoritmos e até mesmo melhorá-los.</h5>
							</div>
						</li>

						<li class="grey lighten-2">
							<div class="caption center-align">
								<h3 class="dark grey-text text-darken-4">O MELHOR!</h3>
								<h5 class="light grey-text text-darken-4">O 4People possui as melhores ferramentas atualizadas. Tá sentindo falta de alguma? Por favor, nos envie um <a href="./contato/">e-mail</a>.</h5>
							</div>
						</li>
					</ul>
				</div>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
