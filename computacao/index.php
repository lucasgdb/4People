<?php include_once('../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/cards.css">
	<title>Computação - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="4People - Ferramentas Online">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./computacao/">
	<meta property="og:title" content="Computação - 4People">
	<meta name="twitter:title" content="Computação - 4People">
	<meta property="og:url" content="./computacao/">
	<meta name="twitter:url" content="./computacao/">
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
			<div class="card-panel z-depth-2 left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left"><?= $icon ?></i>Principais Ferramentas</h1>

				<label>Principais Ferramentas de Computação do 4People</label>
				<div class="divider mb-2"></div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<?php
						include_once("$assets/php/Connection.php");
						$sql = $database->prepare(
							'SELECT sections.section_path, sections.section_icon, tools.tool_name, tools.tool_path, tools.tool_description, tools.tool_link
							FROM tools
							INNER JOIN sections ON sections.section_id = tools.section_id
							INNER JOIN types ON types.type_id = sections.type_id
							WHERE tools.tool_active = "1" AND types.type_name = "Computação"
							ORDER BY tools.tool_visits DESC
							LIMIT 10'
						);

						$sql->execute();

						$data = $sql->fetchAll();
						$length = count($data);
						$half = (int) ($length / 2);

						for ($i = 0; $i < $half; $i++) : extract($data[$i]) ?>
							<div class="card sticky-action z-depth-2">
								<div class="card-content grey lighten-5">
									<span class="card-title activator no-select left-div-margin-mobile" style="position:relative">
										<?= $tool_name ?>
										<i class="material-icons right">more_vert</i>

										<div class="left-div-mobile indigo darken-4" style="border-radius:0"></div>
									</span>
									<div class="divider"></div>
									<p class="mt-2">

										<?= $tool_description ?>
									</p>
								</div>

								<div class="card-action indigo darken-4">
									<a class="white-text no-break" href="./<?= $section_path ?>/<?= $tool_path ?>/">Ferramenta &raquo;</a>
									<a class="white-text no-break" href="./<?= $section_path ?>/">Mais Ferramentas &raquo;</a>
								</div>

								<div class="card-reveal indigo">
									<span class="card-title white-text no-select"><i style="top:5px" class="material-icons left">code</i>Código Fonte<i class="material-icons right">close</i></span>
									<div class="divider"></div>
									<p class="white-text"><a class="linkHover bold white-text" href="<?= $tool_link ?>" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
								</div>
							</div>
						<?php endfor ?>
					</div>

					<div class="col s12 m6">
						<?php for ($i = $half; $i < $length; $i++) : extract($data[$i]) ?>
							<div class="card sticky-action z-depth-2">
								<div class="card-content grey lighten-5">
									<span class="card-title activator no-select left-div-margin-mobile" style="position:relative">
										<?= $tool_name ?>
										<i class="material-icons right">more_vert</i>

										<div class="left-div-mobile indigo darken-4" style="border-radius:0"></div>
									</span>
									<div class="divider"></div>
									<p class="mt-2">

										<?= $tool_description ?>
									</p>
								</div>

								<div class="card-action indigo darken-4">
									<a class="white-text no-break" href="./<?= $section_path ?>/<?= $tool_path ?>/">Ferramenta &raquo;</a>
									<a class="white-text no-break" href="./<?= $section_path ?>/">Mais Ferramentas &raquo;</a>
								</div>

								<div class="card-reveal indigo">
									<span class="card-title white-text no-select"><i style="top:5px" class="material-icons left">code</i>Código Fonte<i class="material-icons right">close</i></span>
									<div class="divider"></div>
									<p class="white-text"><a class="linkHover bold white-text" href="<?= $tool_link ?>" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
								</div>
							</div>
						<?php endfor ?>
					</div>
				</div>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
