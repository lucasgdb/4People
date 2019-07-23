<?php
include_once('../../assets/assets.php');

if (!isset($_SESSION['logged'])) {
	header('HTTP/1.0 404 Not Found');
	exit();
}

$admin_panel = true
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
			<div class="card-panel z-depth-2 left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">verified_user</i>Painel Administrativo</h1>
				<label>Painel Administrativo do 4People</label>

				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="card z-depth-2">
							<div class="card-content left-div-margin-mobile" style="padding-bottom:4px">
								<div class="row mb-0">
									<div class="col s12 center-align">
										<p>Administradores</p>
										<div class="divider"></div>
										<a class="tooltiped" data-tooltip="Administradores" href="administradores/">
											<i class="material-icons large" style="color:#212121">supervisor_account</i>
										</a>
									</div>
								</div>

								<div class="left-div-mobile indigo darken-4"></div>
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="card z-depth-2">
							<div class="card-content left-div-margin-mobile" style="padding-bottom:4px">
								<div class="row mb-0">
									<div class="col s12 center-align">
										<p>Banimentos</p>
										<div class="divider"></div>
										<a class="tooltiped" data-tooltip="Banimentos" href="#">
											<i class="material-icons large" style="color:#212121">close</i>
										</a>
									</div>
								</div>

								<div class="left-div-mobile indigo darken-4"></div>
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="card z-depth-2">
							<div class="card-content left-div-margin-mobile" style="padding-bottom:4px">
								<div class="row mb-0">
									<div class="col s12 center-align">
										<p>Ferramentas</p>
										<div class="divider mb-2"></div>
										<a class="tooltiped" data-tooltip="<?= $sections_count ? 'Controle de Ferramentas' : ($types_count ? 'Seções de Ferramentas' : 'Tipos de Ferramentas') ?>" href="<?= $sections_count ? 'ferramentas/controle_de_ferramentas/' : ($types_count ? 'ferramentas/secoes_de_ferramentas/' : 'ferramentas/tipos_de_ferramentas/') ?>">
											<i class="material-icons large" style="color:#212121">build</i>
										</a>
									</div>
								</div>

								<div class="left-div-mobile indigo darken-4"></div>
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="card z-depth-2">
							<div class="card-content left-div-margin-mobile" style="padding-bottom:4px">
								<div class="row mb-0">
									<div class="col s12 center-align">
										<p>Mensagens</p>
										<div class="divider mb-2"></div>
										<a class="tooltiped" data-tooltip="Mensagens" href="#">
											<i class="material-icons large" style="color:#212121">question_answer</i>
										</a>
									</div>
								</div>

								<div class="left-div-mobile indigo darken-4"></div>
							</div>
						</div>
					</div>
				</div>

				<div class="divider mt-2"></div>

				<div class="card z-depth-1" style="padding:8px 0">
					<canvas class="mt-2 mb-2" id="tools" width="3" height="1">Esse browser não suporta Canvas.</canvas>
				</div>
				<div class="card mb-2 z-depth-1" style="padding:8px 0">
					<canvas id="status" width="3" height="1">Esse browser não suporta Canvas.</canvas>
				</div>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script src="src/chart.min.js"></script>
	<?php
	$sql = $database->prepare('SELECT tool_name, tool_visits FROM tools WHERE tool_active = "1" ORDER BY tool_visits DESC LIMIT 3');

	$sql->execute()
	?>
	<script>
		M.Tooltip.init(document.querySelectorAll('.tooltiped'))
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

		const data = []
		const labels = []

		<?php foreach ($sql as $data) : extract($data) ?>
			data.push('<?= $tool_visits ?>')
			labels.push('<?= $tool_name ?>')
		<?php endforeach ?>

		new Chart(document.querySelector('#tools').getContext('2d'), {
			type: 'pie',
			data: {
				datasets: [{
					data,
					backgroundColor: [
						'#2196f3',
						'#009688',
						'#f44336'
					]
				}],
				labels
			}
		})
	</script>

</body>

</html>
