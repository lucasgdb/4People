<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/cards.css">
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="4People - Ferramentas Online">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
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
				<h1 class="mont-serrat" style="font-size:30px;margin:5px 0 5px 0"><i class="material-icons left" style="top:5px"><?= $icon ?></i>Principais Ferramentas</h1>

				<label>Principais Ferramentas de <?= $name ?> do 4People</label>
				<div class="divider" style="margin-top:10px"></div>

				<div class="row mb-0" style="margin-top:10px">
					<?php
					include_once("$assets/php/Connection.php");
					$sql = $database->prepare(
						'SELECT sections.section_path, sections.section_icon, tools.tool_name, tools.tool_path, tools.tool_description, tools.tool_link
							FROM tools
							INNER JOIN sections ON sections.section_id = tools.section_id
							INNER JOIN types ON types.type_id = sections.type_id
							WHERE tools.tool_status = "1" AND types.type_name = :type_name
							ORDER BY tools.tool_visits DESC'
					);

					$sql->bindValue(':type_name', $name);
					$sql->execute();

					foreach ($sql as $data) : extract($data) ?>
						<div class="col s12 l6">
							<div class="card sticky-action z-depth-2">
								<div class="card-content grey lighten-5">
									<span class="card-title activator mont-serrat no-select left-div-margin-mobile" style="font-size:22px;position:relative">
										<?= $tool_name ?>
										<i class="material-icons right">more_vert</i>

										<div class="left-div-mobile red-color" style="border-radius:0"></div>
									</span>
									<div class="divider"></div>
									<p class="mt-2">

										<?= $tool_description ?>
									</p>
								</div>

								<div class="card-action dark-grey">
									<a class="white-text no-break" href="./<?= $section_path ?>/<?= $tool_path ?>/">Ferramenta &raquo;</a>
									<a class="white-text no-break" href="./<?= $section_path ?>/">Mais Ferramentas &raquo;</a>
								</div>

								<div class="card-reveal">
									<span class="card-title no-select"><i style="top:5px" class="material-icons left">code</i>Código Fonte<i class="material-icons right">close</i></span>
									<div class="divider"></div>
									<p><a class="linkHover bold" href="<?= $tool_link ?>" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
								</div>
							</div>
						</div>
					<?php endforeach ?>
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
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script>
		document.title = '<?= $name ?> - 4People'
	</script>
</body>

</html>
