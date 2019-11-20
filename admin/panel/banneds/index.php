<?php
$root = '../../..';
include_once("$root/assets/src/php/Main.php");

if (!isset($_SESSION['logged'])) {
	include_once("$root/pages/index.html");
	exit();
}
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="src/index.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<title>Controle de Banimentos - 4People</title>
	<?php include_once("$assets/components/admin_components/MetaTags.php") ?>
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
			<div class="card-panel left-div-margin" style="padding-bottom:10px">
				<h2 class="flow-text" style="margin:-5px 0 15px"><i class="material-icons left" style="top:3px">format_list_bulleted</i>Lista de Banidos</h2>
				<div class="divider"></div>

				<table class="centered highlight responsive-table">
					<thead>
						<tr>
							<th>IP</th>
							<th>Horário inicial</th>
							<th>Horário final</th>
							<th>Operação</th>
						</tr>
					</thead>

					<tbody id="banneds"></tbody>
				</table>

				<div class="left-div dark-grey"></div>
			</div>

			<div class="card-panel" style="padding-top:10px">
				<div class="center-align">
					<button title="Anterior" class="btn waves-effect waves-light red-color z-depth-0" onclick="selectBanneds(0)">Anterior</button>
					<button title="Próxima" class="btn waves-effect waves-light red-color z-depth-0" onclick="selectBanneds(1)">Próxima</button>
				</div>

				<div class="left-div dark-grey"></div>
				<div class="right-div dark-grey"></div>
			</div>
		</div>
	</main>

	<div id="modals"></div>

	<?php include_once("$assets/components/FixedActionButton.php");
	include_once("$assets/components/Footer.php") ?>
	<?php include_once("$assets/components/ServiceWorker.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script src="src/index.js"></script>
</body>

</html>
