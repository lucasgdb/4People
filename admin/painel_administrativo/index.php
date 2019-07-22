<?php
include_once('../../assets/assets.php');

if (!isset($_SESSION['logged'])) {
	header('HTTP/1.0 404 Not Found');
	exit();
}
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/chart.min.css">
	<title>4People - Ferramentas Online</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="4People - Ferramentas Online">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./">
	<meta property="og:title" content="4People - Ferramentas Online">
	<meta name="twitter:title" content="4People - Ferramentas Online">
	<meta property="og:url" content="./">
	<meta name="twitter:url" content="./">
</head>

<body class="grey lighten-3">
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php");
	include_once("$assets/components/admin_components/sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel z-depth-2 top-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">verified_user</i>Painel Administrativo</h1>
				<label>Painel Administrativo do 4People</label>

				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="card z-depth-2">
							<div class="card-content left-div-margin" style="padding-bottom:4px">
								<div class="row mb-0">
									<div class="col s12 center-align">
										<p>Administradores</p>
										<div class="divider"></div>
										<a href="administradores/">
											<i class="material-icons large" style="color:#212121">supervisor_account</i>
										</a>
									</div>
								</div>

								<div class="left-div indigo darken-4"></div>
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="card z-depth-2">
							<div class="card-content left-div-margin" style="padding-bottom:4px">
								<div class="row mb-0">
									<div class="col s12 center-align">
										<p>Banimentos</p>
										<div class="divider"></div>
										<a href="#">
											<i class="material-icons large" style="color:#212121">block</i>
										</a>
									</div>
								</div>

								<div class="left-div indigo darken-4"></div>
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="card z-depth-2">
							<div class="card-content left-div-margin" style="padding-bottom:4px">
								<div class="row mb-0">
									<div class="col s12 center-align">
										<p>Ferramentas</p>
										<div class="divider"></div>
										<a href="ferramentas/tipos_de_ferramentas/">
											<i class="material-icons large" style="color:#212121">build</i>
										</a>
									</div>
								</div>

								<div class="left-div indigo darken-4"></div>
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="card z-depth-2">
							<div class="card-content left-div-margin" style="padding-bottom:4px">
								<div class="row mb-0">
									<div class="col s12 center-align">
										<p>Mensagens</p>
										<div class="divider"></div>
										<a href="#">
											<i class="material-icons large" style="color:#212121">question_answer</i>
										</a>
									</div>
								</div>

								<div class="left-div indigo darken-4"></div>
							</div>
						</div>
					</div>
				</div>

				<div class="divider mt-2"></div>

				<div class="row mt-2">
					<div class="col s12 m6">
						<canvas id="status" width="3" height="2">Esse browser não suporta Canvas.</canvas>
					</div>

					<div class="col s12 m6">
						<canvas id="tools" width="3" height="2">Esse browser não suporta Canvas.</canvas>
					</div>
				</div>

				<div class="top-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script src="src/chart.min.js"></script>
	<script>
		new Chart(document.querySelector('#status').getContext('2d'), {
			type: 'pie',
			data: {
				datasets: [{
					data: [1, 3, 2],
					backgroundColor: [
						'#f44336',
						'#009688',
						'#2196f3'
					]
				}],

				labels: [
					'Administradores',
					'Usuários banidos',
					'Mensagens'
				]
			}
		})

		new Chart(document.querySelector('#tools').getContext('2d'), {
			type: 'pie',
			data: {
				datasets: [{
					data: [10, 20, 30],
					backgroundColor: [
						'#2196f3',
						'#009688',
						'#f44336'
					]
				}],

				labels: [
					'Gerador de CPF',
					'Gerdor de Senha',
					'Diferença entre Datas'
				]
			}
		})
	</script>
</body>

</html>
