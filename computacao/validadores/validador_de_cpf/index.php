<?php include_once('../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
	<title>Validador de CPF - 4People</title>
	<?php include_once("$assets/components/metas.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Validador de CPF - 4People">
	<meta name="description" content="Validador de CPF Online para validar CPFs. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./computacao/geradores/validador_de_cpf/">
	<meta property="og:title" content="Validador de CPF - 4People">
	<meta name="twitter:title" content="Validador de CPF - 4People">
	<meta property="og:url" content="./computacao/geradores/validador_de_cpf/">
	<meta name="twitter:url" content="./computacao/geradores/validador_de_cpf/">
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">check</i>Validador de CPF</h1>

				<label>Validador de CPF Online para validar CPFs para programadores testarem seus softwares em desenvolvimento.</label>
				<div class="divider"></div>

				<div class="row mb-0">
					<p class="mb-0 col s12">Digite o CPF:</p>

					<div class="input-field col s12">
						<input id="cpf" placeholder="Ex: 627.026.390-54 ou 62702639054" type="text" maxlength="14">
					</div>
				</div>

				<div class="divider mb-2"></div>
				<button title="Validar CPF" class="btn btn-center waves-effect waves-light indigo darken-4 z-depth-2" onclick="validate()">
					Validar CPF
				</button>
				<div class="divider mt-2"></div>

				<p class="mb-0">Origem do CPF: <span id="from">Aguardando...</span></p>
				<textarea id="result" placeholder="Resultado" spellcheck="false" readonly></textarea>
				<button title="Copiar Validação" class="btn waves-effect waves-light indigo darken-4" onclick="copyResult()">
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

	<script src="<?= $assets ?>/algorithms/CPFValidator.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
