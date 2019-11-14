<?php
$root = '../..';
include_once("$root/assets/src/php/Main.php");

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
	<link rel="stylesheet" href="src/chart.min.css">
	<title>Painel Administrativo - 4People</title>
	<?php include_once("$assets/components/admin_components/MetaTags.php") ?>
	<style>
		.mb-3 {
			margin-bottom: 14px
		}
	</style>
</head>

<body>
	<?php
	include_once("$assets/components/NoScript.php");
	include_once("$assets/components/Spinner.php");
	include_once("$assets/components/Header.php");
	include_once("$assets/components/admin_components/Sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel left-div-margin">
				<h1 class="mont-serrat dark-grey-text" style="font-size:30px;margin:-5px 0 10px"><i class="material-icons left" style="top:5px">verified_user</i>Painel Administrativo</h1>
				<label class="dark-grey-text">Painel Administrativo do 4People</label>

				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="card z-depth-1">
							<div class="card-content left-div-margin-mobile" style="padding-top:4px;padding-bottom:4px">
								<div class="center-align">
									<h6 class="mont-serrat mb-3">Administradores</h6>
									<div class="divider"></div>
									<a class="tooltiped" data-tooltip="Administradores" href="administrators/">
										<i class="material-icons large" style="color:#212121">supervisor_account</i>
									</a>
								</div>

								<div class="left-div-mobile dark-grey"></div>
							</div>
						</div>

						<div class="card z-depth-1">
							<div class="card-content left-div-margin-mobile" style="padding-top:4px;padding-bottom:4px">
								<div class="center-align">
									<?php
									$sql = $database->prepare('SELECT COUNT(message_id) FROM messages WHERE message_read = "0"');
									$sql->execute()
									?>
									<h6 class="mont-serrat mb-3" style="position:relative">Mensagens<span class="new badge btn-green" style="position:absolute;right:0" data-badge-caption="<?= $sql->fetchColumn() ?>"></span> </h6>
									<div class="divider mb-2"></div>
									<a class="tooltiped" data-tooltip="Mensagens" href="messages/">
										<i class="material-icons large" style="color:#212121">question_answer</i>
									</a>
								</div>

								<div class="left-div-mobile dark-grey"></div>
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="card z-depth-2">
							<div class="card-content left-div-margin-mobile" style="padding-top:4px;padding-bottom:4px">
								<div class="row mb-0">
									<div class="col s12 center-align">
										<?php
										$sql = $database->prepare('SELECT COUNT(banned_ip) FROM banneds WHERE banned_amount = "4"');
										$sql->execute();

										$banned_count = $sql->fetchColumn()
										?>
										<h6 class="mont-serrat mb-3" style="position:relative">Banimentos<span class="new red badge" style="position:absolute;right:0" data-badge-caption=""><?= $banned_count ?></span></h6>
										<div class="divider"></div>
										<a class="tooltiped" data-tooltip="Banimentos" href="banneds/">
											<i class="material-icons large" style="color:#212121">close</i>
										</a>
									</div>
								</div>

								<div class="left-div-mobile dark-grey"></div>
							</div>
						</div>

						<div class="card z-depth-2">
							<div class="card-content left-div-margin-mobile" style="padding-top:4px;padding-bottom:4px">
								<div class="row mb-0">
									<div class="col s12 center-align">
										<?php
										$sql = $database->prepare('SELECT COUNT(tool_id) FROM tools');
										$sql->execute();

										$tools_count = $sql->fetchColumn()
										?>
										<h6 class="mont-serrat mb-3" style="position:relative">Ferramentas<span class="new indigo badge" style="position:absolute;right:0" data-badge-caption=""><?= $tools_count ?></span></h6>
										<div class="divider mb-2"></div>
										<a class="tooltiped" data-tooltip="<?= $sections_count ? 'Controle de Ferramentas' : ($types_count ? 'Seções de Ferramentas' : 'Tipos de Ferramentas') ?>" href="<?= $sections_count ? 'tools/tool_controls/' : ($types_count ? 'tools/sections/' : 'tools/tool_types/') ?>">
											<i class="material-icons large" style="color:#212121">build</i>
										</a>
									</div>
								</div>

								<div class="left-div-mobile dark-grey"></div>
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

				<div class="left-div dark-grey"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/FixedActionButton.php");
	include_once("$assets/components/Footer.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script src="src/chart.min.js"></script>

	<?php
	$data = $database->prepare('SELECT tool_visits FROM tools WHERE tool_status = "1" ORDER BY tool_visits DESC LIMIT 10');
	$data->execute();

	foreach ($data as $tool_visits) {
		extract($tool_visits);

		$visits[] = (int) $tool_visits;
	}

	$labels = $database->prepare('SELECT tool_name FROM tools WHERE tool_status = "1" ORDER BY tool_visits DESC LIMIT 10');
	$labels->execute();

	foreach ($labels as $tool_names) {
		extract($tool_names);

		$names[] = $tool_name;
	}
	?>

	<script>
		M.Tooltip.init(document.querySelectorAll('.tooltiped'))

		const data = <?= json_encode($visits) ?>;
		const labels = <?= json_encode($names) ?>;

		document.addEventListener('DOMContentLoaded', () => {
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

			new Chart(document.querySelector('#tools').getContext('2d'), {
				type: 'pie',
				data: {
					datasets: [{
						data: data.slice(0, 3),
						backgroundColor: [
							'#009688',
							'#f44336',
							'#2196f3'
						]
					}],
					labels: labels.slice(0, 3)
				}
			})
		})
	</script>
</body>

</html>
