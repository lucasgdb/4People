<?php include_once('../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
   <link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Sequência de Fibonacci - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Sequência de Fibonacci - 4People">
	<meta name="description" content="Calculadora para calcular a Sequência de Fibonacci. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./matematica/calculadoras/fibonacci/">
	<meta property="og:title" content="Sequência de Fibonacci- 4People">
	<meta name="twitter:title" content="Sequência de Fibonacci - 4People">
	<meta property="og:url" content="./matematica/calculadoras/fibonacci/">
	<meta name="twitter:url" content="./matematica/calculadoras/fibonacci/">
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">exposure</i>Sequência de Fibonacci</h1>

				<label><?= $description ?></label>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Calcular até o número:</p>

							<div class="input-field col s12">
								<input id="number" type="number" placeholder="Digite aqui o número." min="0" step="1" value="5">
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Quantidade de números:</p>

							<div class="col s12">
								<p>
									<label>
										<input class="with-gap" name="type" type="radio" checked />
										<span>Todos</span>
									</label>

									<label class="ml-4">
										<input class="with-gap" name="type" type="radio" />
										<span>Último</span>
									</label>
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="divider mb-2"></div>
				<button title="Fatorar Número" class="btn btn-center waves-effect waves-light indigo darken-4 z-depth-2" onclick="calculate()">
					Calcular Fibonacci
				</button>
				<div class="divider mt-2"></div>

				<textarea class="mt-2" id="result" placeholder="Resultado" spellcheck="false" readonly></textarea>
				<button title="Copiar a Sequência Fibonacci" class="btn waves-effect waves-light indigo darken-4 mt-1 z-depth-0" onclick="copyResult()">
					Copiar
				</button>
				<button title="Limpar a Sequência Fibonacci" class="btn waves-effect waves-light indigo darken-4 mt-1 z-depth-0" onclick="clearInput()">
					Limpar
				</button>

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

	<script src="<?= $assets ?>/algorithms/calculators/fibonacci.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
