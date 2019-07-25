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
	<title>Banimentos - 4People</title>
	<?php include_once("$assets/components/admin_components/meta_tags.php") ?>
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

					<tbody>
						<?php include_once('src/select_banneds.php') ?>
					</tbody>
				</table>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<div id="removeBanned" class="modal">
		<div class="modal-content left-div-margin">
			<h4>Remover Banimento</h4>
			<p class="mb-0">Você tem certeza que deseja desbanir <span id="banned"></span>?</p>

			<div class="left-div indigo darken-4" style="border-radius:0"></div>
		</div>

		<div class="divider"></div>

		<div class="modal-footer">
			<button title="Cancelar" class="modal-close waves-effect waves-light btn-flat indigo darken-4 white-text"><i class="material-icons left red-text" style="font-size:30px">close</i>Não</button>
			<a id="linkRemoveBanned" title="Remover Banimento" class="modal-close waves-effect waves-light btn-flat indigo darken-4 white-text"><i class="material-icons left green-text" style="font-size:30px">check</i>Sim</a>
		</div>
	</div>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script>
		const linkRemoveBanned = document.querySelector('#linkRemoveBanned')
		const lblBanned = document.querySelector('#banned')

		const changeLink = (link, ip) => {
			linkRemoveBanned.href = link
			lblBanned.innerHTML = ip
		}

		M.Modal.init(document.querySelectorAll('.modal'))
	</script>
</body>

</html>
