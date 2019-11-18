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
						<div class="card z-depth-1">
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

						<div class="card z-depth-1">
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

				<div class="divider mt-2"></div>
				<canvas id="tool_names" class="mt-2" width="3" height="1">Esse browser não suporta Canvas.</canvas>
				<div class="divider mt-2"></div>
				<canvas id="tools" class="mt-2" width="3" height="1">Esse browser não suporta Canvas.</canvas>
				<div class="divider mt-2"></div>
				<canvas id="post_visits" class="mt-2" width="3" height="1">Esse browser não suporta Canvas.</canvas>
				<div class="divider mt-2"></div>
				<canvas id="posts" class="mt-2" width="3" height="1">Esse browser não suporta Canvas.</canvas>
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
	$sql = $database->prepare('SELECT months.month_id, tool_visits.tool_visit_visits FROM months INNER JOIN months_years ON months_years.month_id = months.month_id INNER JOIN years ON years.year_id = months_years.year_id INNER JOIN tool_visits ON tool_visits.month_year_id = months_years.month_year_id WHERE year_number = :year_number LIMIT 12');
	$sql->bindValue(':year_number', date('Y'));
	$sql->execute();

	if ($sql->rowCount()) {
		foreach ($sql as $visits) {
			extract($visits);

			$data_tool[$month_id] = $tool_visit_visits;
		}
	} else $data_tool[] = null;

	$sql = $database->prepare('SELECT months.month_id, post_visits.post_visit_visits FROM months INNER JOIN months_years ON months_years.month_id = months.month_id INNER JOIN years ON years.year_id = months_years.year_id INNER JOIN post_visits ON post_visits.month_year_id = months_years.month_year_id WHERE year_number = :year_number LIMIT 12');
	$sql->bindValue(':year_number', date('Y'));
	$sql->execute();

	if ($sql->rowCount()) {
		foreach ($sql as $visits) {
			extract($visits);

			$data_post[$month_id] = $post_visit_visits;
		}
	} else $data_post[] = null;

	$sql = $database->prepare('SELECT tool_name, tool_visits FROM tools ORDER BY tool_visits DESC LIMIT 10');
	$sql->execute();

	if ($sql->rowCount()) {
		foreach ($sql as $tools) {
			extract($tools);

			$data_tool_names[] = [$tool_visits, $tool_name];
		}
	} else $data_tool_names[] = null;

	$sql = $database->prepare('SELECT post_title, post_visits FROM posts ORDER BY post_visits DESC LIMIT 10');
	$sql->execute();

	if ($sql->rowCount()) {
		foreach ($sql as $posts) {
			extract($posts);

			$data_post_visits[] = [$post_visits, $post_title];
		}
	} else $data_post_visits[] = null
	?>

	<script>
		M.Tooltip.init(document.querySelectorAll('.tooltiped'))

		document.addEventListener('DOMContentLoaded', () => {
			const encoded_tools = <?= json_encode($data_tool) ?>;
			let data = []

			for (let i = 1; i <= 12; i++) {
				if (encoded_tools[i] === undefined) data.push(0)
				else data.push(encoded_tools[i])
			}

			new Chart(document.querySelector('#tools'), {
				type: 'bar',
				data: {
					datasets: [{
						minBarLength: 2,
						data,
						backgroundColor: ['#a62023', '#1b1a25', '#a62023', '#1b1a25', '#a62023', '#1b1a25', '#a62023', '#1b1a25', '#a62023', '#1b1a25', '#a62023', '#1b1a25'],
					}],
					labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
				},
				options: {
					legend: {
						display: false
					},
					tooltips: {
						callbacks: {
							label: ttItem => ` ${ttItem.yLabel} visitas`,
						}
					},
					title: {
						display: true,
						text: 'Visitas nas Ferramentas do 4People em <?= date('Y') ?>'
					}
				}
			})

			const encoded_posts = <?= json_encode($data_post) ?>;
			data = []

			for (let i = 1; i <= 12; i++) {
				if (encoded_posts[i] === undefined) data.push(0)
				else data.push(encoded_posts[i])
			}

			new Chart(document.querySelector('#posts'), {
				type: 'bar',
				data: {
					datasets: [{
						minBarLength: 2,
						data,
						backgroundColor: ['#a62023', '#1b1a25', '#a62023', '#1b1a25', '#a62023', '#1b1a25', '#a62023', '#1b1a25', '#a62023', '#1b1a25', '#a62023', '#1b1a25'],
					}],
					labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
				},
				options: {
					legend: {
						display: false
					},
					tooltips: {
						callbacks: {
							label: ttItem => ` ${ttItem.yLabel} visitas`,
						}
					},
					title: {
						display: true,
						text: 'Visitas no Blog do 4People em <?= date('Y') ?>'
					}
				}
			})

			const encoded_tool_names = <?= json_encode($data_tool_names) ?>;
			data = []
			let labels = []

			for (let i = encoded_tool_names.length - 1; i >= 0; i--) {
				data.push(encoded_tool_names[i][0])
				labels.push(`${encoded_tool_names[i][1].split(' ')[0]}...`)
			}

			new Chart(document.querySelector('#tool_names'), {
				type: 'bar',
				data: {
					datasets: [{
						minBarLength: 2,
						data,
						backgroundColor: ['#a62023', '#1b1a25', '#a62023', '#1b1a25', '#a62023', '#1b1a25', '#a62023', '#1b1a25', '#a62023', '#1b1a25', '#a62023', '#1b1a25'],
					}],
					labels,
				},
				options: {
					legend: {
						display: false
					},
					tooltips: {
						callbacks: {
							label: ttItem => ` ${ttItem.yLabel} visitas`,
							title: label => encoded_tool_names[encoded_tool_names.length - 1 - label[0].index][1]
						}
					},
					title: {
						display: true,
						text: `As ${encoded_tool_names.length} Ferramentas mais populares do 4People.`
					}
				}
			})

			const encoded_post_visits = <?= json_encode($data_post_visits) ?>;
			data = []
			labels = []

			for (let i = encoded_post_visits.length - 1; i >= 0; i--) {
				data.push(encoded_post_visits[i][0])
				labels.push(encoded_post_visits[i][1])
			}

			new Chart(document.querySelector('#post_visits'), {
				type: 'bar',
				data: {
					datasets: [{
						minBarLength: 2,
						data,
						backgroundColor: ['#a62023', '#1b1a25', '#a62023', '#1b1a25', '#a62023', '#1b1a25', '#a62023', '#1b1a25', '#a62023', '#1b1a25', '#a62023', '#1b1a25'],
					}],
					labels,
				},
				options: {
					legend: {
						display: false
					},
					tooltips: {
						callbacks: {
							label: ttItem => ` ${ttItem.yLabel} visitas`,
						}
					},
					title: {
						display: true,
						text: `As ${encoded_post_visits.length} postagens mais populares do 4People.`
					}
				}
			})
		})
	</script>
</body>

</html>
