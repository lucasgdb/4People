<?php include_once('../../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Diferença entre Datas - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
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

<body>
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php");
	include_once("$assets/components/sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel top-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">timer</i>Diferença entre Datas</h1>

				<label><?= $description ?></label>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Data inicial *</p>

							<div class="input-field col s12">
								<i class="material-icons prefix">access_time</i>
								<input id="beginDate" type="text" placeholder="Data inicial" class="datepicker">
							</div>

							<p class="mb-0 col s12">Horário inicial</p>
							<div class="input-field col s12">
								<input id="beginTime" type="text" placeholder="Horário atual" class="timepicker">
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Data final *</p>

							<div class="input-field col s12">
								<i class="material-icons prefix">access_time</i>
								<input id="endDate" type="text" placeholder="Data final" class="datepicker">
							</div>

							<p class="mb-0 col s12">Horário final</p>
							<div class="input-field col s12">
								<input id="endTime" type="text" placeholder="Horário atual" class="timepicker">
							</div>
						</div>
					</div>
				</div>

				<div class="divider mb-2"></div>
				<button title="Calcular a Diferença entre Datas" class="btn btn-center waves-effect waves-light btn-green z-depth-2" onclick="calculate()">
					Calcular diferença
				</button>
				<div class="divider mt-2"></div>

				<ul class="collection mb-0">
					<li class="collection-item">Diferença: <span id="all">0 ano(s), 0 mês(es), 1 dia(s), 0 hora(s) e 0 minuto(s)</span></li>
					<li class="collection-item">Milissegundos: <span id="milliSecs">86.400.000</span></li>
					<li class="collection-item">Segundos: <span id="secs">86.400</span></li>
					<li class="collection-item">Minutos: <span id="mins">1.440</span></li>
					<li class="collection-item">Horas: <span id="hours">24</span></li>
					<li class="collection-item">Dias: <span id="days">1</span></li>
					<li class="collection-item">Meses: <span id="months">0</span></li>
					<li class="collection-item">Anos: <span id="years">0</span></li>
				</ul>

				<div class="top-div dark-grey"></div>
			</div>

			<div class="card-panel left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">trending_up</i>Veja também:</h1>
				<div class="divider"></div>

				<ul class="collection with-header mb-0">
					<li class="collection-item">
						<div>Somar em Datas<a href="#" class="secondary-content"><i class="material-icons btn-green-text">send</i></a></div>
					</li>
					<li class="collection-item">
						<div>Subtrair em Datas<a href="#" class="secondary-content"><i class="material-icons btn-green-text">send</i></a></div>
					</li>
				</ul>

				<div class="left-div dark-grey"></div>
			</div>
		</div>
	</main>

	<?php
	include_once("$assets/components/footer.php");
	include_once("$assets/components/service_worker.php")
	?>

	<script src="<?= $assets ?>/algorithms/dates_calculator/differenceBetweenDates.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>