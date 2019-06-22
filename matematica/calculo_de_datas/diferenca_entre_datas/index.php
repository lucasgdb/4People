<?php include_once('../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
	<title>Diferença entre Datas - 4People</title>
	<?php include_once("$assets/components/metas.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Diferença entre Datas - 4People">
	<meta name="description" content="Diferença entre Datas. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./matematica/calculo_de_datas/diferenca_entre_datas/">
	<meta property="og:title" content="Diferença entre Datas - 4People">
	<meta name="twitter:title" content="Diferença entre Datas - 4People">
	<meta property="og:url" content="./matematica/calculo_de_datas/diferenca_entre_datas/">
	<meta name="twitter:url" content="./matematica/calculo_de_datas/diferenca_entre_datas/">
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">timer</i>Diferença entre Datas</h1>

				<label>Calcular Diferença entre Datas. Possui um leque de recursos disponíveis, como calcular idades, tempo, etc.</label>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Data inicial:</p>

							<div class="input-field col s12">
								<input id="beginDate" type="text" placeholder="Data inicial" class="datepicker">
							</div>

							<p class="mb-0 col s12">Horário inicial:</p>
							<div class="input-field col s12">
								<input id="beginTime" type="text" placeholder="Horário atual" class="timepicker">
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Data final:</p>

							<div class="input-field col s12">
								<input id="endDate" type="text" placeholder="Data final" class="datepicker">
							</div>

							<p class="mb-0 col s12">Horário final:</p>
							<div class="input-field col s12">
								<input id="endTime" type="text" placeholder="Horário atual" class="timepicker">
							</div>
						</div>
					</div>
				</div>

				<div class="divider mb-2"></div>
				<button title="Calcular a Diferença entre Datas" class="btn btn-center waves-effect waves-light indigo darken-4 z-depth-2" onclick="calculate()">
					Calcular diferença
				</button>
				<div class="divider mt-2"></div>

				<ul class="collection mb-0">
					<li class="collection-item">Milissegundos: <span id="milliSecs">86.400.000</span></li>
					<li class="collection-item">Segundos: <span id="secs">86.400</span></li>
					<li class="collection-item">Minutos: <span id="mins">1.440</span></li>
					<li class="collection-item">Horas: <span id="hours">24</span></li>
					<li class="collection-item">Dias: <span id="days">1</span></li>
					<li class="collection-item">Meses: <span id="months">0</span></li>
					<li class="collection-item">Anos: <span id="years">0</span></li>
				</ul>

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

	<script src="<?= $assets ?>/algorithms/differenceBetweenDates.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
