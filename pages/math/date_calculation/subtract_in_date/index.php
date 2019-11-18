<?php
$root = '../../../..';
include_once("$root/assets/src/php/Main.php")
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="src/index.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<title>Subtrair em Data - 4People</title>
	<?php include_once("$assets/components/MetaTags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Subtrair em Data - 4People">
	<meta name="description" content="Subtrair em Data. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="Subtrair em Data - 4People">
	<meta name="twitter:title" content="Subtrair em Data - 4People">
</head>

<body>
	<?php
	include_once("$assets/components/NoScript.php");
	include_once("$assets/components/Spinner.php");
	include_once("$assets/components/Header.php");
	include_once("$assets/components/Sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel top-div-margin">
				<h1 class="mont-serrat dark-grey-text" style="font-size:30px;margin:-5px 0 10px"><i class="material-icons left" style="top:5px"><?= $icon_section ?></i><?= $name_tool ?></h1>

				<label class="dark-grey-text"><?= $description_tool ?></label>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 l4">
						<div class="row mb-0">
							<p class="mb-0 col s12">Selecionar data</p>

							<div class="input-field col s12">
								<i class="material-icons prefix">date_range</i>
								<input id="date" type="text" placeholder="Selecionar data" class="datepicker">
							</div>
						</div>
					</div>

					<div class="col s12 m6 l4">
						<div class="row mb-0">
							<p class="mb-0 col s12">Subtrair:</p>
							<div class="input-field col s12">
								<select id="option">
									<option value="0" selected>Dias</option>
									<option value="1">Semanas</option>
									<option value="2">Meses</option>
									<option value="3">Anos</option>
								</select>
							</div>
						</div>
					</div>

					<div class="col s12 m6 l4">
						<div class="row mb-0">
							<p class="mb-0 col s12">Quantidade:</p>
							<div class="input-field col s12">
								<input id="number" type="number" placeholder="Digite aqui a quantidade que deseja adicionar." min="0" value="1" step="any">
							</div>
						</div>
					</div>
				</div>

				<div class="divider mb-2"></div>
				<button title="Subtrair da Data" class="btn btn-center waves-effect waves-light red-color z-depth-0" onclick="calculate()">
					Subtrair
				</button>
				<div class="divider mt-2"></div>

				<ul class="collection mb-0">
					<li class="collection-item mont-serrat" id="result"></li>
				</ul>

				<div class="top-div dark-grey"></div>
			</div>

			<?php include_once("$assets/components/MoreTools.php") ?>
		</div>
	</main>

	<?php
	include_once("$assets/components/FixedActionButton.php");
	include_once("$assets/components/Footer.php");
	include_once("$assets/components/ServiceWorker.php")
	?>

	<script src="<?= $assets ?>/algorithms/dates_calculator/subtractInDate.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
