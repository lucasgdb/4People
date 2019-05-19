<?php include_once('../assets/asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= "$return/src/css/materialize.min.css" ?>">
	<link rel="stylesheet" href="<?= "$return/src/css/main.css" ?>">
	<link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
	<title>Sobre - 4People</title>
	<?php include_once("$path/components/metas.php") ?>
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
	include_once("$path/components/noscript.php");
	include_once("$path/components/spinner.php");
	include_once("$path/components/header.php")
	?>

	<ul id="slide-out" class="sidenav sidenav-fixed collapsible">
		<?php include_once("$path/components/logo.php") ?>

		<li>
			<div class="collapsible-header"><i class="material-icons">computer</i>Computação</div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<li>
						<?php include_once("$path/components/computacao/geradores.php") ?>
					</li>

					<li>
						<?php include_once("$path/components/computacao/validadores.php") ?>
					</li>

					<li>
						<?php include_once("$path/components/computacao/funcoes_string.php") ?>
					</li>

					<li>
						<?php include_once("$path/components/computacao/rede_e_internet.php") ?>
					</li>

					<li>
						<?php include_once("$path/components/computacao/codif_decodif.php") ?>
					</li>

					<li>
						<?php include_once("$path/components/computacao/tabelas_e_padroes.php") ?>
					</li>
				</ul>
			</div>
		</li>

		<li>
			<div class="collapsible-header"><i class="material-icons">functions</i>Matemática</div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<li>
						<?php include_once("$path/components/matematica/calculadoras.php") ?>
					</li>

					<li>
						<?php include_once("$path/components/matematica/calculo_de_areas.php") ?>
					</li>

					<li>
						<?php include_once("$path/components/matematica/calculo_de_datas.php") ?>
					</li>
				</ul>
			</div>
		</li>

		<li>
			<div class="collapsible-header"><i class="material-icons">build</i>Outras Ferramentas</div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<li>
						<?php include_once("$path/components/outras_ferramentas/dia_a_dia.php") ?>
					</li>

					<li>
						<?php include_once("$path/components/outras_ferramentas/jogos.php") ?>
					</li>
				</ul>
			</div>
		</li>
	</ul>

	<main class="grey lighten-5">
		<div class="container">
			<div class="card-panel">
				<h1 class="flow-text mt-2">Sobre o 4People</h1>

				<label>4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.</label>
				<div class="divider"></div>

				<h2 class="flow-text mt-2 center-align">Criadores do 4People</h2>
				<div class="row mt-2">
					<div class="col s12 m8 offset-m2">
						<div class="col s3">
							<img title="Lucas Bittencourt" class="responsive-img circle" src="../assets/images/lucas.jpg" alt="Lucas Bittencourt">
						</div>

						<div class="col s3">
							<img title="Jairo Arcy" class="responsive-img circle" src="../assets/images/jairo.jpg" alt="Jairo Arcy">
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

	<?php include_once("$path/components/footer.php") ?>

	<script src="<?= "$return/src/js/materialize.min.js" ?>"></script>
	<script src="<?= "$return/src/js/main.js" ?>"></script>
</body>

</html>
