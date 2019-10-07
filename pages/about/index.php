<?php include_once('../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Sobre - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Sobre - 4People">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="Sobre nós - 4People">
	<meta name="twitter:title" content="Sobre nós - 4People">
</head>

<body>
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php");
	include_once("$assets/components/sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel z-depth-2 top-div-margin">
				<h1 class="mont-serrat" style="font-size:30px;margin:5px 0 5px 0"><img src="<?= $assets ?>/images/icon.png" width="25" style="margin-right:10px" alt="Logo">Sobre nós</h1>

				<label>4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.</label>
				<div class="divider"></div>

				<h4 class="center-align">Equipe</h4>

				<div class="row" style="margin-top:20px">
					<div class="col s12 m6 l4">
						<img title="Lucas Bittencourt" class="responsive-img img-thumbnail" src="<?= $assets ?>/images/lucas_bittencourt.jpg" alt="">
					</div>

					<div class="col s12 m6 l8">
						<p class="grey-text text-darken-4 mb-0">Nome: Lucas Bittencourt. Função: Desenvolvedor</p>

						<div class="divider mb-2"></div>
						<blockquote class="grey-text text-darken-3 mt-0">
							"Lucas Bittencourt, 19, cursando Desenvolvimento de Sistemas na Etec de Guaratinguetá e atuando como Desenvolvedor do 4People.
							Também cursando o curso de Análise e Desenvolvimento de Sistemas na Fatec de Guaratinguetá.
							Amo café <img src="<?= $assets ?>/images/coffee.png" alt="Café" />, distribuições Linux <img height="20" src="<?= $assets ?>/images/linux.png" alt="Linux" />, JavaScript <img src="<?= $assets ?>/images/js.png" alt="JS" /> e desenvolver &lt;/&gt;.
							Um futuro Desenvolvedor fullstack."
						</blockquote>
					</div>
				</div>

				<div class="divider"></div>

				<div class="row" style="margin-top:20px">
					<div class="col s12 m6 l4">
						<img title="Suzany Silva" class="responsive-img img-thumbnail" src="<?= $assets ?>/images/suzany_silva.jpg" alt="">
					</div>

					<div class="col s12 m6 l8">
						<p class="grey-text text-darken-4 mb-0">Nome: Suzany Silva. Função: Analista</p>

						<div class="divider mb-2"></div>
						<blockquote class="grey-text text-darken-3 mt-0">"Suzany Silva, 17, cursando Desenvolvimento de Sistemas na Etec de Guaratinguetá e atuando como Analista do 4People."</blockquote>
					</div>
				</div>

				<div class="divider"></div>

				<div class="row mb-0" style="margin-top:20px">
					<div class="col s12 m6 l4">
						<img title="Renan Mattos" class="responsive-img img-thumbnail" src="<?= $assets ?>/images/renan_mattos.jpg" alt="">
					</div>

					<div class="col s12 m6 l8">
						<p class="grey-text text-darken-4 mb-0">Nome: Renan Mattos. Função: Analista</p>

						<div class="divider mb-2"></div>
						<blockquote class="grey-text text-darken-3 mt-0">"Renan Mattos, 22, cursando Desenvolvimento de Sistemas na Etec de Guaratinguetá e atuando como Analista do 4People."</btn-block>
					</div>
				</div>

				<div class="top-div dark-grey"></div>
			</div>
		</div>
	</main>

	<?php
	include_once("$assets/components/footer.php");
	include_once("$assets/components/service_worker.php")
	?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
