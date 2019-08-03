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

<body class="grey lighten-4">
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

					<tbody id="banneds"></tbody>
				</table>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<div id="modals"></div>

	<?php include_once("$assets/components/service_worker.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script>
		M.Modal.init(document.querySelectorAll('.modal'))
		const banneds = document.querySelector('#banneds')
		const modals = document.querySelector('#modals')

		const selectBanneds = async () => {
			let bannedsHTML = '',
				modalsHTML = ''

			const data = await (await fetch('src/select_banneds.php')).json()

			for (const i in data) {
				modalsHTML +=
					`<div id="removeBanned${i}" class="modal">
						<div class="modal-content left-div-margin">
							<h4><i class="material-icons left" style="top:7px">delete</i>Remover Banimento</h4>
							<p class="mb-0">Você tem certeza que deseja desbanir ${i}?</p>

							<div class="left-div indigo darken-4" style="border-radius:0"></div>
						</div>

						<div class="divider"></div>

						<div class="modal-footer">
							<button title="Cancelar" class="modal-close btn waves-effect waves-light indigo darken-4 z-depth-0"><i class="material-icons left">close</i>Cancelar</button>
							<a onclick="deleteBanned(${i})" title="Remover Banimento" class="modal-close btn waves-effect waves-light red accent-4 z-depth-0"><i class="material-icons left">delete</i>Remover</a>
						</div>
					</div>`

				bannedsHTML +=
					`<tr>
						<td>${i}</td>
						<td>${data[i][0]}</td>
						<td>${data[i][1]}</td>
						<td>
							<button class="btn waves-effect waves-light red accent-4 z-depth-0 modal-trigger" style="cursor:pointer" title="Remover Banimento" data-target="removeBanned${i}"><i class="material-icons" style="font-size:23px">delete</i></button>
						</td>
					</tr>`
			}

			banneds.innerHTML = bannedsHTML
			modals.innerHTML = modalsHTML
			M.Modal.init(document.querySelectorAll('.modal'))
		}

		const deleteBanned = async ip => {
			const data = await (await fetch(`src/delete_banned.php?banned_ip=${ip}`)).json()

			if (data.status === '1') {
				M.toast({
					html: `O IP: ${ip} foi desbanido.`,
					classes: 'green'
				})

				selectBanneds()
			} else {
				M.toast({
					html: `Não foi possível desbanir o IP: ${ip}.`,
					classes: 'red accent-4'
				})
			}
		}

		selectBanneds()
	</script>
</body>

</html>
