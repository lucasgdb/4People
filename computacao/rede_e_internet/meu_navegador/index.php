<?php include_once('../../../assets/asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= "$return/src/css/materialize.min.css" ?>">
	<link rel="stylesheet" href="<?= "$return/src/css/main.css" ?>">
	<title>Meu Navegador - 4People</title>
	<?php include_once("$path/components/metas.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Meu Navegador - 4People">
	<meta name="description" content="Meu Navegador OnLine para ver seu navegador. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./computacao/rede_e_internet/meu_navegador/">
	<meta property="og:title" content="Meu Navegador - 4People">
	<meta name="twitter:title" content="Meu Navegador - 4People">
	<meta property="og:url" content="./computacao/rede_e_internet/meu_navegador/">
	<meta name="twitter:url" content="./computacao/rede_e_internet/meu_navegador/">
</head>

<body>
	<?php
	include_once("$path/components/noscript.php");
	include_once("$path/components/spinner.php");
	include_once("$path/components/header.php")
	?>

	<ul id="slide-out" class="sidenav sidenav-fixed collapsible">
		<?php include_once("$path/components/logo.php") ?>

		<li class="active">
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

					<li class="active">
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
				<h1 class="flow-text mt-2">Meu Navegador</h1>

				<label>Veja seu Navegador aqui.</label>
				<div class="divider"></div>

				<div class="row mt-2 mb-0">
					<div class="col s12">
						<p class="mb-0">Navegador: <span id="browser"></span></p>
						<p class="mb-0">Linguagem: <span id="language"></span></p>
					</div>
				</div>
			</div>
		</div>
	</main>

	<?php include_once("$path/components/footer.php") ?>

	<script src="<?= "$return/algorithms/myWebBrowser.js" ?>"></script>
	<script src="<?= "$return/src/js/materialize.min.js" ?>"></script>
	<script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
	<script src="<?= "$return/src/js/main.js" ?>"></script>
</body>

</html>