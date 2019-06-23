<?php include_once('../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
	<title>Números Amigáveis - 4People</title>
	<?php include_once("$assets/components/metas.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Números Amigáveis - 4People">
	<meta name="description" content="Calculadora de Números Amigáveis. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./matematica/calculadoras/numeros_amigaveis/">
	<meta property="og:title" content="Números Amigáveis - 4People">
	<meta name="twitter:title" content="Números Amigáveis - 4People">
	<meta property="og:url" content="./matematica/calculadoras/numeros_amigaveis/">
	<meta name="twitter:url" content="./matematica/calculadoras/numeros_amigaveis/">
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">exposure</i>Números Amigáveis</h1>

				<label>Números amigáveis são pares de números onde um deles é a soma dos divisores do outro. Por exemplo, os divisores de 220 são 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 e 110, cuja soma é 284. Por outro lado, os divisores de 284 são 1, 2, 4, 71 e 142 e a soma deles é 220.</label>
				<div class="divider"></div>

				<div class="row">
					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Número 1:</p>

							<div class="input-field col s12">
								<input id="number1" type="text" placeholder="Digite aqui o primeiro número.">
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Número 2:</p>

							<div class="input-field col s12">
								<input id="number2" type="text" placeholder="Digite aqui o segundo número.">
							</div>
						</div>
					</div>
				</div>

				<div class="divider mb-2"></div>
				<button title="Calcular Números Amigáveis" class="btn btn-center waves-effect waves-light indigo darken-4 z-depth-2" onclick="calculate()">
					Calcular
				</button>
				<div class="divider mt-2"></div>

				<textarea class="mt-2" id="result" placeholder="Resultado" spellcheck="false" readonly></textarea>
				<button title="Copiar Resultado" class="btn waves-effect waves-light indigo darken-4" onclick="copyResult()">
					Copiar
				</button>
				<button title="Limpar Resultado" class="btn waves-effect waves-light indigo darken-4" onclick="clearInput()">
					Limpar
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

	<script src="<?= $assets ?>/algorithms/friendlyNumbers.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
