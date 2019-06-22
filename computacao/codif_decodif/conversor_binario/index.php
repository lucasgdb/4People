<?php include_once('../../../assets/assets.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= "$assets/src/css/materialize.min.css" ?>">
	<link rel="stylesheet" href="<?= "$assets/src/css/main.css" ?>">
	<link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
	<title>Conversor Binário - 4People</title>
	<?php include_once("$assets/components/metas.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Conversor de Código Binário - 4People">
	<meta name="description" content="Conversor Binário. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./computacao/codif_decodif/conversor_binario/">
	<meta property="og:title" content="Conversor Binário - 4People">
	<meta name="twitter:title" content="Conversor Binário - 4People">
	<meta property="og:url" content="./computacao/codif_decodif/conversor_binario/">
	<meta name="twitter:url" content="./computacao/codif_decodif/conversor_binario/">
</head>

<body class="grey lighten-3">
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php")
	?>

	<ul id="slide-out" class="sidenav sidenav-fixed collapsible">
		<?php include_once("$assets/components/logo.php") ?>

		<li class="active">
			<div class="collapsible-header"><i class="material-icons">computer</i>Computação</div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<li>
						<?php include_once("$assets/components/computacao/geradores.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/computacao/validadores.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/computacao/funcoes_string.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/computacao/rede_e_internet.php") ?>
					</li>

					<li class="active">
						<?php include_once("$assets/components/computacao/codif_decodif.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/computacao/tabelas_e_padroes.php") ?>
					</li>
				</ul>
			</div>
		</li>

		<li>
			<div class="collapsible-header"><i class="material-icons">functions</i>Matemática</div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<li>
						<?php include_once("$assets/components/matematica/calculadoras.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/matematica/calculo_de_areas.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/matematica/calculo_de_datas.php") ?>
					</li>
				</ul>
			</div>
		</li>

		<li>
			<div class="collapsible-header"><i class="material-icons">build</i>Outras Ferramentas</div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<li>
						<?php include_once("$assets/components/outras_ferramentas/dia_a_dia.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/outras_ferramentas/jogos.php") ?>
					</li>
				</ul>
			</div>
		</li>
	</ul>

	<main>
		<div class="container">
			<div class="card-panel left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">computer</i>Conversor Binário</h1>

				<label>Tradutor Online de Código Binário. Basta digitar o código binário ou texto abaixo e clicar no botão para converter.</label>
				<div class="divider"></div>

				<textarea class="mt-2" id="text" placeholder="Digite aqui o texto" spellcheck="false"></textarea>

				<button title="Converter texto para Binário" class="btn waves-effect waves-light indigo darken-4" onclick="convertToBinary()">
					Converter para Binário
				</button>
				<button title="Copiar texto" class="btn waves-effect waves-light indigo darken-4 right" onclick="copyResult(txtText)">
					Copiar
				</button>

				<textarea class="mt-2" id="binary" placeholder="Digite aqui o código binário" spellcheck="false"></textarea>

				<button title="Converter Código Binário para texto" class="btn waves-effect waves-light indigo darken-4" onclick="convertToText()">
					Converter para Texto
				</button>
				<button title="Copiar Código Binário" class="btn waves-effect waves-light indigo darken-4 right" onclick="copyResult(txtBinaryCode)">
					Copiar
				</button>

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

	<script src="<?= "$assets/algorithms/binaryConverter.js" ?>"></script>
	<script src="<?= "$assets/src/js/materialize.min.js" ?>"></script>
	<script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
	<script src="<?= "$assets/src/js/main.js" ?>"></script>
</body>

</html>
