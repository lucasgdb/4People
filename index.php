<?php include_once('assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/index.css">
	<title>4People - Ferramentas Online</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="4People - Ferramentas Online">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="4People - Ferramentas Online">
	<meta name="twitter:title" content="4People - Ferramentas Online">
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
			<div class="card-panel z-depth-2 top-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">home</i>4People - Página Inicial</h1>
				<label>Ferramentas Online para estudantes e professores.</label>

				<div class="divider" style="margin-bottom:5px"></div>

				<div class="slider">
					<ul class="slides">
						<li class="grey lighten-3">
							<img src="<?= $assets ?>/images/bg01.jpg" alt="bg01">
							<div class="caption left-align">
								<h3 class="dark"><i style="top:9px" class="material-icons red-color-text left small">favorite</i> FEITO PARA TODOS!</h3>
								<h5 class="light">As Ferramentas são para Programadores, professores, estudantes e usuários comuns.</h5>
							</div>
						</li>

						<li class="grey lighten-3">
							<img src="<?= $assets ?>/images/bg01.jpg" alt="bg01">
							<div class="caption left-align">
								<h3 class="dark"><i style="top:10px" class="material-icons red-color-text left small">fast_forward</i> MAIS RÁPIDO!</h3>
								<h5 class="light">As Ferramentas foram todas escritas em JavaScript, para maior velocidade e segurança.</h5>
							</div>
						</li>

						<li class="grey lighten-3">
							<img src="<?= $assets ?>/images/bg01.jpg" alt="bg01">
							<div class="caption right-align">
								<h3 class="dark">CÓDIGO ABERTO! <i style="top:10px" class="material-icons red-color-text right small">code</i></h3>
								<h5 class="light">O 4People é de Código Aberto e livre para qualquer um usar/melhorar.</h5>
							</div>
						</li>

						<li class="grey lighten-3">
							<img src="<?= $assets ?>/images/bg01.jpg" alt="bg01">
							<div class="caption right-align">
								<h3 class="dark"><i style="top:10px" class="material-icons red-color-text right small">free_breakfast</i>O MAIS ATUALIZADO!</h3>
								<h5 class="light">Tá sentindo falta de alguma Ferramenta, encontrou algum erro/bug? Por favor, <a href="./pages/contact/">Fale Conosco</a>.</h5>
							</div>
						</li>
					</ul>
				</div>

				<div class="divider mt-2 mb-2"></div>

				<div class="row mb-0">
					<div class="col s12">
						<div class="card grey lighten-5 z-depth-2">
							<div class="card-content">
								<?php
								$sql = $database->prepare(
									'SELECT tools.tool_name, tools.tool_path, sections.section_path, types.type_path FROM tools
									INNER JOIN sections ON sections.section_id = tools.section_id
									INNER JOIN types ON types.type_id = sections.type_id
									WHERE tool_status = "1"
									ORDER BY tool_visits DESC, tool_id
									LIMIT 3'
								);

								$sql->execute()
								?>
								<span class="card-title"><i class="material-icons left red-color-text">trending_up</i>As 3 Ferramentas mais populares</span>
								<ul class="collection with-header mb-0">
									<?php foreach ($sql as $data) : extract($data) ?>
										<li class="collection-item grey lighten-5">
											<div style="font-size:16px"><?= $tool_name ?><a title="Usar <?= $tool_name ?>" href="<?= $root ?>/pages/<?= $type_path ?>/<?= $section_path ?>/<?= $tool_path ?>/" class="secondary-content"><i class="material-icons red-color-text">send</i></a></div>
										</li>
									<?php endforeach ?>
								</ul>
							</div>

							<div class="top-div-mobile dark-grey"></div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card grey lighten-5 z-depth-2">
							<div class="card-content">
								<span class="card-title"><i class="material-icons left red-color-text">group</i>Visitas</span>
								<p style="font-size:16px">Usuários que já visitaram: <span id="totalVisits">1000</span></p>
							</div>

							<div class="top-div-mobile dark-grey"></div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card grey lighten-5 z-depth-2">
							<div class="card-content">
								<span class="card-title"><i class="material-icons left red-color-text">group</i>Pessoas ajudadas</span>
								<?php
								$sql = $database->prepare('SELECT SUM(tool_visits) FROM tools WHERE tool_status = "1" LIMIT 1');
								$sql->execute();

								$total_visits = $sql->fetchColumn()
								?>
								<p style="font-size:16px">Nossas Ferramentas foram usadas <span id="toolVisits"><?= $total_visits ?></span> vezes</p>
							</div>

							<div class="top-div-mobile dark-grey"></div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card grey lighten-5 z-depth-2">
							<div class="card-content">
								<span class="card-title"><i class="material-icons left red-color-text">public</i>Usuários Online</span>
								<p style="font-size:16px">Usuários Online no 4People: 1</p>
							</div>

							<div class="top-div-mobile dark-grey"></div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card grey lighten-5 z-depth-2">
							<div class="card-content">
								<span class="card-title"><i class="material-icons left red-color-text">build</i>Ferramentas</span>
								<?php
								$sql = $database->query('SELECT COUNT(tool_id) FROM tools');
								$sql->execute();
								?>
								<p style="font-size:16px">Quantidade de Ferramentas: <?= $sql->fetchColumn() ?></p>
							</div>

							<div class="top-div-mobile dark-grey"></div>
						</div>
					</div>
				</div>

				<div class="top-div dark-grey"></div>
			</div>
		</div>
	</main>

	<?php
	include_once("$assets/components/footer.php");
	include_once("$assets/components/service_worker.php")
	?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script>
		const lblTotalVisits = document.querySelector('#totalVisits')
		const lblToolVisits = document.querySelector('#toolVisits')

		const formatter = Intl.NumberFormat('pt-BR')

		const formatNumbers = elements => {
			for (let i = 0; i < elements.length; i += 1) {
				const number = elements[i].textContent
				elements[i].textContent = formatter.format(number)
			}
		}

		formatNumbers([lblTotalVisits, lblToolVisits])
	</script>
</body>

</html>
