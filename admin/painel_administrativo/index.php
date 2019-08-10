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
	<title>Painel Administrativo - 4People</title>
	<?php include_once("$assets/components/admin_components/meta_tags.php") ?>
</head>

<body class="grey lighten-4">
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php");
	include_once("$assets/components/admin_components/sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel z-depth-2 left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">verified_user</i>4People - Painel Administrativo</h1>
				<label>Painel Administrativo do 4People</label>

				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="card z-depth-2">
							<div class="card-content left-div-margin-mobile" style="padding-bottom:4px">
								<div class="row mb-0">
									<div class="col s12 center-align">
										<h6 class="mt-0">Administradores</h6>
										<div class="divider"></div>
										<a class="tooltiped" data-tooltip="Administradores" href="administradores/">
											<i class="material-icons large" style="color:#212121">supervisor_account</i>
										</a>
									</div>
								</div>

								<div class="left-div-mobile indigo darken-4"></div>
							</div>
						</div>

						<div class="card z-depth-2">
							<div class="card-content left-div-margin-mobile" style="padding-bottom:4px">
								<div class="row mb-0">
									<div class="col s12 center-align">
										<?php
										include_once("$assets/php/Connection.php");

										$sql = $database->prepare('SELECT COUNT(message_id) FROM messages WHERE message_read = "0"');
										$sql->execute();

										$count = $sql->fetchColumn()
										?>
										<h6 class="mt-0" style="position:relative">Mensagens<span class="new badge" style="position:absolute;right:0" data-badge-caption="nova<?= $count === '1' ? '' : 's' ?>"><?= $count ?></span></h6>
										<div class="divider mb-2"></div>
										<a class="tooltiped" data-tooltip="Mensagens" href="mensagens/">
											<i class="material-icons large" style="color:#212121">question_answer</i>
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
										<?php
										$sql = $database->prepare('SELECT COUNT(banned_ip) FROM banneds WHERE banned_amount = "4"');
										$sql->execute();

										$banned_count = $sql->fetchColumn()
										?>
										<h6 class="mt-0" style="position:relative">Banimentos<span class="new red badge" style="position:absolute;right:0" data-badge-caption=""><?= $banned_count ?></span></h6>
										<div class="divider"></div>
										<a class="tooltiped" data-tooltip="Banimentos" href="banimentos/">
											<i class="material-icons large" style="color:#212121">close</i>
										</a>
									</div>
								</div>

								<div class="left-div-mobile indigo darken-4"></div>
							</div>
						</div>

						<div class="card z-depth-2">
							<div class="card-content left-div-margin-mobile" style="padding-bottom:4px">
								<div class="row mb-0">
									<div class="col s12 center-align">
										<?php
										$sql = $database->prepare('SELECT COUNT(tool_id) FROM tools');
										$sql->execute();

										$tools_count = $sql->fetchColumn()
										?>
										<h6 class="mt-0" style="position:relative">Ferramentas<span class="new indigo badge" style="position:absolute;right:0" data-badge-caption=""><?= $tools_count ?></span></h6>
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
				</div>

				<div class="divider"></div>

				<div class="card z-depth-2" style="padding:8px 0">
					<canvas class="mt-2 mb-2" id="tools" width="3" height="1">Esse browser não suporta Canvas.</canvas>
				</div>
				<div class="card mb-2 z-depth-2" style="padding:8px 0">
					<canvas id="status" width="3" height="1">Esse browser não suporta Canvas.</canvas>
				</div>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script src="src/chart.min.js"></script>
	<script>
		M.Tooltip.init(document.querySelectorAll('.tooltiped'))

		<?php
		$sql = $database->prepare('SELECT tool_name, tool_visits FROM tools WHERE tool_status = "1" ORDER BY tool_visits DESC LIMIT 10');

		$sql->execute()
		?>

		const data = []
		const labels = []

		<?php foreach ($sql as $data) : extract($data) ?>
			data.push('<?= $tool_visits ?>')
			labels.push('<?= $tool_name ?>')
		<?php endforeach ?>

		new Chart(document.querySelector('#status').getContext('2d'), {
			type: 'pie',
			data: {
				datasets: [{
					label: '# visitas',
					data,
					backgroundColor: [
						'#009688',
						'#f44336',
						'#2196f3',
						'#cddc39',
						'#00bcd4',
						'#ff9800',
						'#795548',
						'#3f51b5',
						'#e91e63',
						'#9c27b0'
					]
				}],
				labels
			}
		})

		<?php
		$sql = $database->prepare('SELECT tool_name, tool_visits FROM tools WHERE tool_status = "1" ORDER BY tool_visits DESC LIMIT 3');
		$sql->execute()
		?>

		const data2 = []
		const labels2 = []

		<?php foreach ($sql as $data) : extract($data) ?>
			data2.push('<?= $tool_visits ?>')
			labels2.push('<?= $tool_name ?>')
		<?php endforeach ?>

		new Chart(document.querySelector('#tools').getContext('2d'), {
			type: 'pie',
			data: {
				datasets: [{
					data: data2,
					backgroundColor: [
						'#009688',
						'#f44336',
						'#2196f3'
					]
				}],
				labels: labels2
			}
		})
	</script>

</body>

</html>
