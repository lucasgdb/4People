<?php
include_once('../../../assets/assets.php');

if (!isset($_SESSION['logged'])) {
	header('HTTP/1.0 404 Not Found');
	exit();
}
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
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
				<h2 class="flow-text" style="margin: 0 0 5px"><i class="material-icons left">format_list_bulleted</i>Lista de Banimentos</h2>
				<label>Lista de Banimentos do 4People</label>
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
		</div>
	</main>

	<div id="modals"></div>

	<?php include_once("$assets/components/Footer.php") ?>
	<?php include_once("$assets/components/ServiceWorker.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script src="src/index.js"></script>
</body>

</html>
