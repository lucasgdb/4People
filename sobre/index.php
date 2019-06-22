<?php include_once('../assets/assets.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= "$assets/src/css/materialize.min.css" ?>">
	<link rel="stylesheet" href="<?= "$assets/src/css/main.css" ?>">
	<link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
	<title>Sobre - 4People</title>
	<?php include_once("$assets/components/metas.php") ?>
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

<body class="grey lighten-3">
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php");
	include_once("$assets/components/sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">info</i>Sobre o 4People</h1>

				<label>4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.</label>
				<div class="divider"></div>

				<h2 class="flow-text mt-2 center-align">Criadores do 4People</h2>
				<div class="row mt-2">
					<div class="col s12 m8 offset-m2">
						<div class="col s3">
							<img title="Lucas Bittencourt" class="responsive-img circle" src="../assets/images/lucas.jpg" alt="Lucas Bittencourt">
						</div>

						<div class="col s3">
							<img title="Jairo Arcy" class="responsive-img circle" src="../assets/images/jairo_arcy.jpg" alt="Jairo Arcy">
						</div>

						<div class="col s3">
							<img title="Renan de Mattos" class="responsive-img circle" src="../assets/images/renan.jpg" alt="Renan de Mattos">
						</div>

						<div class="col s3">
							<img title="Suzany Silva" class="responsive-img circle" src="../assets/images/suzany.jpg" alt="Suzany Silva">
						</div>
					</div>

				</div>

				<h2 class="flow-text">Informações</h2>
				<div class="divider"></div>
				<p>
					<strong>4People</strong> é um projeto de TCC da Escola Técnica (Etec) Alfredo de Barros Santos de Guaratinguetá, no curso de Desenvolvimento de Sistemas.
					O 4People foi feito por 2 programadores e 2 analistas.
					Na criação foi utilizado HTML, CSS, JavaScript e PHP como linguagens.
					O Editor de Texto que utilizamos foi o Visual Studio Code, da Microsoft.
				</p>

				<h2 class="flow-text">Criadores</h2>
				<div class="divider mt-0"></div>
				<ul class="browser-default">
					<li>
						Lucas Bittencourt
						<ul class="browser-default">
							<li><a href="https://github.com/LucasNaja" target="_blank">GitHub</a></li>
							<li><a href="https://www.facebook.com/Lucas.Naja0" target="_blank">Facebook</a></li>
							<li><a href="https://dev.to/lucasnaja" target="_blank">Dev Community</a></li>
							<li><a href="https://www.linkedin.com/in/lucas-bittencourt/" target="_blank">LinkedIn</a></li>
						</ul>
					</li>
					<li>
						Jairo Arcy
						<ul class="browser-default">
							<li><a href="https://github.com/Jairo-Arcy" target="_blank">GitHub</a></li>
							<li><a href="https://www.facebook.com/jairo.arcy" target="_blank">Facebook</a></li>
						</ul>
					</li>
					<li>
						Renan de Mattos
						<ul class="browser-default">
							<li><a href="https://www.facebook.com/reenan.mattos" target="_blank">Facebook</a></li>
						</ul>
					</li>
					<li>
						Suzany Silva
						<ul class="browser-default">
							<li><a href="https://www.facebook.com/suzany.castrodasilva" target="_blank">Facebook</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= "$assets/src/js/materialize.min.js" ?>"></script>
	<script src="<?= "$assets/src/js/main.js" ?>"></script>
</body>

</html>
