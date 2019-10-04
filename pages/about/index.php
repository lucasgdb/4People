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
	<meta name="msapplication-starturl" content="./sobre/">
	<meta property="og:title" content="Sobre - 4People">
	<meta name="twitter:title" content="Sobre - 4People">
	<meta property="og:url" content="./sobre/">
	<meta name="twitter:url" content="./sobre/">
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
				<h1 class="mont-serrat" style="font-size:30px;margin:20px 0 5px 0"><img src="<?= $assets ?>/images/icon.png" width="25" style="margin-right:10px" alt="Logo">Sobre</h1>

				<label>4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.</label>
				<div class="divider"></div>

				<h5 class="center-align mt-2" style="position:relative"><i class="material-icons" style="position:absolute;left:0">info</i>Sobre o 4People</h5>
				<div class="divider"></div>
				<p>
					4People é um projeto de TCC que visa criar ferramentas para pessoas usarem no cotidiano e Programadores testarem seus Softwares. O 4People disponibiliza Ferramentas de Computação (Geradores, Validadores, Codificadores e Decodificadores, etc.) e Matemáticas (Calculadoras, Calculadoras de Área e Calculadoras de Datas).
					O 4People um projeto de Código aberto, para que estudantes de TI possam utilizá-lo para estudos e até mesmo reutilização de códigos.
				</p>
				<div class="divider"></div>

				<h5 class="center-align mt-2" style="position:relative"><i class="material-icons" style="position:absolute;left:0">computer</i>Tecnologias usadas</h5>
				<div class="divider"></div>
				<p>
					<ul>
						<li><img src="<?= $assets ?>/images/html5.svg" width="25" style="margin-right:5px;top:7px" alt="HTML5">HTML5</li>
						<li><img src="<?= $assets ?>/images/css3.png" style="margin-right:5px;top:7px" alt="CSS3">CSS3</li>
						<li><img src="<?= $assets ?>/images/javascript.png" style="margin-right:5px;top:7px" alt="JavaScript">JavaScript</li>
						<li style="margin-top:7px"><img src="<?= $assets ?>/images/php.png" style="margin-right:5px;top:3px" alt="PHP">PHP</li>
						<li style="margin-top:5px"><img src="<?= $assets ?>/images/materialize.png" style="margin-right:5px" alt="Materialize">Materialize</li>
						<li style="margin-top:-5px"><img src="<?= $assets ?>/images/docker.png" style="margin-right:5px;top:6px" alt="Docker">Docker</li>
					</ul>
				</p>
				<div class="divider"></div>

				<h5 class="center-align mt-2" style="position:relative"><i class="material-icons" style="position:absolute;left:0">group</i>Equipe</h5>
				<div class="divider"></div>
				<div class="container">
					<div class="row mb-0">
						<a href="https://github.com/lucasnaja" target="_blank" class="col s12 m4 mt-2">
							<img title="Lucas Bittencourt" class="circle responsive-img" src="<?= $assets ?>/images/lucas_bittencourt.jpg" alt="">
						</a>

						<div class="col s12 m4 mt-2">
							<img title="Suzany Silva" class="circle responsive-img" src="<?= $assets ?>/images/suzany_silva.jpg" alt="">
						</div>

						<div class="col s12 m4 mt-2">
							<img title="Renan Mattos" class="circle responsive-img" src="<?= $assets ?>/images/renan_mattos.jpg" alt="">
						</div>
					</div>
				</div>

				<div class="divider"></div>

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
