<?php
$root = '../../..';
include_once("$root/assets/assets.php");

if (!isset($_SESSION['logged'])) {
	header('HTTP/1.0 404 Not Found');
	exit();
}
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="src/index.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<title>Manutenção - 4People</title>
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
			<div class="card-panel top-div-margin" style="padding-bottom:10px">
				<h1 class="mont-serrat dark-grey-text" style="font-size:30px;margin:0 0 5px"><i class="material-icons left" style="top:5px">access_time</i>Agendar manutenção</h1>
				<label class="dark-grey-text">Agendar uma manutenção no 4People</label>

				<div class="divider"></div>

				<form id="formInsert" class="mt-2" method="POST">
					<div class="row mb-0">
						<div class="input-field col s12">
							<i class="material-icons prefix">format_size</i>
							<input id="maintenance_name" title="Preencha este campo com o nome." placeholder="Nome da manutenção" class="validate" type="text" name="maintenance_name" oninvalid="this.setCustomValidity('Preencha este campo com o nome.')" oninput="setCustomValidity('')" required>
							<label class="active" for="maintenance_name">Nome *</label>
						</div>

						<div class="col s12 m6 mb-0">
							<div class="row mb-0">
								<div class="input-field col s12">
									<i class="material-icons prefix">date_range</i>
									<input name="maintenance_begin_date" id="maintenance_begin_date" type="text" placeholder="Data inicial" class="datepicker">
									<label class="active" for="maintenance_begin_date">Data inicial</label>
								</div>

								<div class="input-field col s12">
									<i class="material-icons prefix">access_time</i>
									<input name="maintenance_begin_time" id="maintenance_begin_time" type="text" placeholder="Horário atual" class="timepicker">
									<label class="active" for="maintenance_begin_time">Horário inicial</label>
								</div>
							</div>
						</div>

						<div class="col s12 m6 mb-0">
							<div class="row mb-0">
								<div class="input-field col s12">
									<i class="material-icons prefix">date_range</i>
									<input name="maintenance_end_date" id="maintenance_end_date" type="text" placeholder="Data final" class="datepicker">
									<label class="active" for="maintenance_end_date">Data final</label>
								</div>

								<div class="input-field col s12">
									<i class="material-icons prefix">access_time</i>
									<input name="maintenance_end_time" id="maintenance_end_time" type="text" placeholder="Horário atual" class="timepicker">
									<label class="active" for="maintenance_end_time">Horário final</label>
								</div>
							</div>
						</div>

						<div class="col s12">
							<div class="divider"></div>
							<button title="Agendar manutenção no 4People" class="btn waves-effect waves-light red-color mt-2 z-depth-0"><i class="material-icons left">folder</i>Inserir</button>
						</div>
					</div>
				</form>

				<div class="top-div dark-grey"></div>
			</div>

			<div class="card-panel left-div-margin" style="padding-bottom:10px">
				<h2 class="flow-text" style="margin:-5px 0 15px"><i class="material-icons left" style="top:3px">format_list_bulleted</i>Manutenções agendadas</h2>
				<div class="divider"></div>

				<table class="centered highlight responsive-table">
					<thead>
						<tr>
							<th>Nome</th>
							<th>Data inicial</th>
							<th>Data final</th>
							<th>Operações</th>
						</tr>
					</thead>

					<tbody id="schedules"></tbody>
				</table>

				<div class="left-div dark-grey"></div>
			</div>
		</div>
	</main>

	<div id="updates"></div>
	<div id="deletes"></div>

	<?php include_once("$assets/components/FixedActionButton.php");
	include_once("$assets/components/Footer.php") ?>
	<?php include_once("$assets/components/ServiceWorker.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/clipboard.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script>
		const form = document.querySelector('#formInsert')
		const schedules = document.querySelector('#schedules')
		const updates = document.querySelector('#updates')
		const deletes = document.querySelector('#deletes')
		const maintenanceName = form.querySelector('#maintenance_name')
		const btnSubmit = form.querySelector('button')

		form.onsubmit = async e => {
			e.preventDefault()
			btnSubmit.disabled = true

			const data = await (await fetch('src/insert_schedule.php', {
				method: 'POST',
				body: new FormData(form)
			})).json()

			if (data.status === '1') {
				M.toast({
					html: `${maintenanceName.value.trim()} adicionado(a).`,
					classes: 'green'
				})

				maintenanceName.value = ''
				maintenanceName.classList.remove('valid')

				selectSchedules()
			} else {
				M.toast({
					html: `Erro ao adicionar ${maintenanceName.value.trim()}.`,
					classes: 'red accent-4'
				})
			}

			btnSubmit.disabled = false
		}

		const selectSchedules = async () => {
			let schedulesHTML = '',
				updatesHTML = '',
				deletesHTML = ''

			const data = await (await fetch('src/select_schedules.php')).json()

			for (const i in data) {
				const maintenance_begin = new Date(data[i][1])
				const maintenance_end = new Date(data[i][2])

				updatesHTML += (
					`<div id="updateSchedule${i}" class="modal">
						<form onsubmit="updateSchedule(document.querySelector('#updateSchedule${i} form')); return false" method="POST">
							<div class="modal-content left-div-margin" style="padding-bottom:5px">
								<h4 class="flow-text" style="font-size:30px;margin:-5px 0 15px"><i class="material-icons left" style="top:7px">edit</i>Editar dados</h4>
								<div class="divider"></div>

								<div class="row mt-2 mb-0">
									<input type="hidden" value="${i}" name="maintenance_id">
									<div class="input-field col s12">
										<i class="material-icons prefix">format_size</i>
										<input value="${data[i][0]}" id="maintenance_name" title="Preencha este campo com o nome." placeholder="Nome da manutenção" class="validate valid" type="text" name="maintenance_name" oninvalid="this.setCustomValidity('Preencha este campo com o nome.')" oninput="setCustomValidity('')" required>
										<label class="active" for="maintenance_name">Nome *</label>
									</div>

									<div class="col s12 m6 mb-0">
										<div class="row mb-0">
											<div class="input-field col s12">
												<i class="material-icons prefix">date_range</i>
												<input value="${maintenance_begin.getTime() ? maintenance_begin.toLocaleDateString() : ''}" name="maintenance_begin_date" id="maintenance_begin_date" type="text" placeholder="Data inicial">
												<label class="active" for="maintenance_begin_date">Data inicial</label>
											</div>

											<div class="input-field col s12">
												<i class="material-icons prefix">date_range</i>
												<input value="${maintenance_end.getTime() ? maintenance_end.toLocaleDateString() : ''}" name="maintenance_end_date" id="maintenance_end_date" type="text" placeholder="Data final">
												<label class="active" for="maintenance_end_date">Data final</label>
											</div>
										</div>
									</div>

									<div class="col s12 m6 mb-0">
										<div class="row mb-0">
											<div class="input-field col s12">
												<i class="material-icons prefix">access_time</i>
												<input value="${maintenance_begin.getTime() ? maintenance_begin.toLocaleTimeString() : ''}" name="maintenance_begin_time" id="maintenance_begin_time" type="text" placeholder="Horário atual">
												<label class="active" for="maintenance_begin_time">Horário inicial</label>
											</div>

											<div class="input-field col s12">
												<i class="material-icons prefix">access_time</i>
												<input value="${maintenance_end.getTime() ? maintenance_end.toLocaleTimeString() : ''}" name="maintenance_end_time" id="maintenance_end_time" type="text" placeholder="Horário atual">
												<label class="active" for="maintenance_end_time">Horário final</label>
											</div>
										</div>
									</div>
								</div>

								<div class="left-div dark-grey" style="border-radius:0"></div>
							</div>

							<div class="divider"></div>

							<div class="modal-footer">
								<button type="button" class="modal-close btn waves-effect waves-light dark-grey z-depth-0" title="Cancelar"><i class="material-icons left">close</i>Cancelar</button>
								<button class="modal-close btn waves-effect waves-light green darken-3 z-depth-0" title="Salvar"><i class="material-icons left">save</i>Salvar</button>
							</div>
						</form>
					</div>`
				)

				deletesHTML += (
					`<div id="removeSchedule${i}" class="modal">
						<div class="modal-content left-div-margin">
							<h4 class="flow-text" style="font-size:30px;margin:-5px 0 15px"><i class="material-icons left" style="top:7px">delete</i>Remover Agendamento</h4>
							<div class="divider"></div>
							<p class="mb-0">Você tem certeza que deseja remover "${data[i][0]}" do 4People?</p>

							<div class="left-div dark-grey" style="border-radius:0"></div>
						</div>

						<div class="divider"></div>

						<div class="modal-footer">
							<button title="Cancelar" class="modal-close btn waves-effect waves-light dark-grey z-depth-0"><i class="material-icons left">close</i>Cancelar</button>
							<button onclick="deleteSchedule(${i})" title="Remover ${data[i][0]}" class="modal-close btn waves-effect waves-light red-color z-depth-0"><i class="material-icons left">delete</i>Remover</button>
						</div>
					</div>`
				)

				schedulesHTML += (
					`<tr>
						<td>${data[i][0]}</td>
						<td>${data[i][1]}</td>
						<td>${data[i][2]}</td>
						<td>
							<button class="btn waves-effect waves-light green darken-3 z-depth-0 modal-trigger" title="Editar informações de ${data[i][0]}" data-target="updateSchedule${i}"><i class="material-icons">edit</i></button>
							<button class="btn waves-effect waves-light red-color z-depth-0 modal-trigger" style="cursor:pointer" title="Remover ${data[i][0]}" data-target="removeSchedule${i}"><i class="material-icons">delete</i></button>
						</td>
					</tr>`
				)
			}

			schedules.innerHTML = schedulesHTML
			updates.innerHTML = updatesHTML
			deletes.innerHTML = deletesHTML
			M.Modal.init(document.querySelectorAll('.modal'))
		}

		const updateSchedule = async formUpdate => {
			const data = await (await fetch('src/update_schedule.php', {
				method: 'POST',
				body: new FormData(formUpdate)
			})).json()

			if (data.status === '1') {
				M.toast({
					html: 'Os dados foram atualizados com sucesso.',
					classes: 'green'
				})

				selectSchedules()
			} else {
				M.toast({
					html: 'Houve um erro ao atualizar os dados.',
					classes: 'red accent-4'
				})
			}
		}

		const deleteSchedule = async id => {
			const result = await (await fetch(`src/delete_schedule.php?maintenance_id=${id}`)).json()

			if (result.status === '1') {
				M.toast({
					html: `Manutenção removida.`,
					classes: 'green'
				})

				selectSchedules()
			} else {
				M.toast({
					html: `Não foi possível remover a manutenção.`,
					classes: 'red accent-4'
				})
			}
		}

		M.Datepicker.init(document.querySelectorAll('.datepicker'), {
			format: 'yyyy/mm/dd',
			yearRange: 25,
			i18n: {
				cancel: '',
				clear: 'Limpar',
				done: 'Selecionar'
			},
			months: [
				'Janeiro',
				'Fevereiro',
				'Março',
				'Abril',
				'Maio',
				'Junho',
				'Julho',
				'Agosto',
				'Setembro',
				'Outubro',
				'Novembro',
				'Dezembro'
			],
			monthsShort: [
				'Jan',
				'Fev',
				'Mar',
				'Abr',
				'Mai',
				'Jun',
				'Jul',
				'Ago',
				'Set',
				'Out',
				'Nov',
				'Dez'
			],
			weekdays: [
				'Domingo',
				'Segunda',
				'Terça',
				'Quarta',
				'Quinta',
				'Sexta',
				'Sábado'
			],
			weekdaysShort: [
				'Dom',
				'Seg',
				'Ter',
				'Qua',
				'Qui',
				'Sex',
				'Sáb'
			]
		})

		M.Timepicker.init(document.querySelectorAll('.timepicker'), {
			i18n: {
				cancel: 'Cancelar',
				clear: 'Limpar',
				done: 'Selecionar'
			},
			onOpenEnd: () => {
				document.querySelector('div.modal-overlay').onclick = null
			}
		})

		const beginDate = M.Datepicker.getInstance(document.querySelector('#maintenance_begin_date'))
		const endDate = M.Datepicker.getInstance(document.querySelector('#maintenance_end_date'))
		const beginTime = M.Timepicker.getInstance(document.querySelector('#maintenance_begin_time'))
		const endTime = M.Timepicker.getInstance(document.querySelector('#maintenance_end_time'))

		document.addEventListener('DOMContentLoaded', () => {
			beginDate.cancelBtn.disabled = true
			endDate.cancelBtn.disabled = true

			const date = new Date()
			beginDate.setDate(date)
			beginDate.doneBtn.click()

			date.setDate(date.getDate() + 1)
			endDate.setDate(date)
			endDate.doneBtn.click()
		})

		selectSchedules()
	</script>
</body>

</html>
