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
	<title>Controle de Administradores - 4People</title>
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
			<div class="card-panel z-depth-2 top-div-margin" style="padding-bottom:10px">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">person_add</i>Adicionar um Administrador</h1>
				<label>Adicionar um novo Administrador ao 4People</label>

				<div class="divider"></div>

				<form style="margin-top:15px" method="POST" enctype="multipart/form-data">
					<div class="row mb-0">
						<div class="input-field col s12 m6">
							<i class="material-icons prefix">person</i>
							<input id="admin_name" minlength="4" title="Preencha este campo com o nome." placeholder="Login de Administrador" class="validate" type="text" name="admin_name" oninvalid="this.setCustomValidity('Preencha este campo com o nome.')" oninput="setCustomValidity('')" required>
							<label class="active" for="admin_name">Nome *</label>
							<span class="helper-text" data-error="Nome de Administrador inválido." data-success="Nome de Administrador válido.">Ex: Lucas Bittencourt</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">account_circle</i>
							<input id="admin_nickname" minlength="8" title="Preencha este campo com o login." placeholder="Login de Administrador" class="validate" type="text" name="admin_nickname" oninvalid="this.setCustomValidity('Preencha este campo com o login.')" oninput="setCustomValidity('')" required>
							<label class="active" for="admin_nickname">Login *</label>
							<span class="helper-text" data-error="Login de Administrador inválido. Tamanho mínimo: 8" data-success="Login de Administrador válido.">Ex: lucasnaja</span>
						</div>

						<div class="input-field col s12">
							<i class="material-icons prefix">mail</i>
							<input id="admin_email" title="Preencha este campo com o e-mail." placeholder="E-mail do Administrador" class="validate" type="email" name="admin_email" oninvalid="if (this.value === '') this.setCustomValidity('Preencha este campo com o e-mail.'); else this.setCustomValidity('Este e-mail não é válido.')" oninput="setCustomValidity('')" required>
							<label class="active" for="admin_email">E-mail *</label>
							<span class="helper-text" data-error="E-mail inválido." data-success="E-mail válido.">Ex: lucasnaja0@gmail.com</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">https</i>
							<input id="admin_password" style="width:calc(100% - 4.5rem)" minlength="6" title="Preencha este campo com a senha." placeholder="Senha do Administrador" class="validate" type="password" name="admin_password" oninvalid="this.setCustomValidity('Preencha este campo com a senha.')" oninput="setCustomValidity('')" required>
							<i id="visibility" onclick="switchVisibility()" class="material-icons prefix" style="cursor:pointer">visibility</i>
							<label class="active" for="admin_password">Senha *</label>
							<span class="helper-text" data-error="Senha inválida. Tamanho mínimo: 6" data-success="Senha válida.">Aguardando...</span>
						</div>

						<div class="file-field input-field col s12 m6">
							<i class="material-icons prefix">image</i>
							<input type="file" name="admin_image" accept=".png, .jpg, .jpeg, .svg, .gif">
							<input style="width:calc(100% - 3rem)" placeholder="Selecionar imagem" type="text" class="file-path">
							<label class="active">Imagem</label>
							<span class="helper-text">.png, .jpg, .jpeg, .svg, .gif</span>
						</div>

						<div class="col s12">
							<div class="divider"></div>
							<button title="Inserir um Administrador no 4People" class="btn waves-effect waves-light indigo darken-4 mt-2 z-depth-0">
								<i class="material-icons left">person_add</i>Inserir
								<input class="hide" type="submit" value="">
							</button>
						</div>
					</div>
				</form>

				<div class="top-div indigo darken-4"></div>
			</div>

			<div class="card-panel z-depth-2 top-div-margin" style="padding-bottom:10px">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">search</i>Pesquisar um Administrador</h1>
				<label>Pesquisar um Administrador do 4People</label>
				<div class="divider"></div>

				<div class="row mb-0" style="margin-top:15px">
					<div class="input-field col s12">
						<i class="material-icons prefix">textsms</i>
						<input title="Preencha este campo com o nome." placeholder="Nome do Administrador" type="text" id="admin_name_search" class="autocomplete" oninvalid="this.setCustomValidity('Preencha este campo com o nome.')" oninput="setCustomValidity('')" required>
						<label for="admin_name_search">Pesquisar</label>
						<span class="helper-text" data-error="Nome inválido." data-success="Nome válido.">Digite o Nome do Administrador para começar a filtrar.</span>
					</div>
				</div>

				<div class="top-div indigo darken-4"></div>
			</div>

			<div class="card-panel left-div-margin" style="padding-bottom:10px">
				<h2 class="flow-text" style="margin: 0 0 5px"><i class="material-icons left">format_list_bulleted</i>Lista de Administradores</h2>
				<label>Lista de Administradores registrados</label>
				<div class="divider"></div>

				<table class="centered highlight responsive-table">
					<thead>
						<tr>
							<th>Imagem</th>
							<th>Nome</th>
							<th>Login</th>
							<th>E-mail</th>
							<th>Operações</th>
						</tr>
					</thead>

					<tbody id="admins">

					</tbody>
				</table>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<div id="modals"></div>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<?php
	$sql = $database->prepare('SELECT admin_name, admin_image FROM admins');
	$sql->execute()
	?>
	<script>
		const form = document.querySelector('form')
		const admins = document.querySelector('#admins')
		const modals = document.querySelector('#modals')
		const inputs = form.querySelectorAll('input')
		const btnSubmit = form.querySelector('button')
		const admin_name_search = document.querySelector('#admin_name_search')
		const txtPassword = document.querySelector('input[name=admin_password]')
		const txtPasswordIcon = document.querySelector('#visibility')

		const switchVisibility = () => {
			if (txtPassword.type === 'password') {
				txtPassword.type = 'text'
				txtPasswordIcon.innerText = 'visibility_off'
			} else {
				txtPassword.type = 'password'
				txtPasswordIcon.innerText = 'visibility_on'
			}
		}

		const createAutoComplete = data => {
			const filteredData = {}

			for (const i in data) filteredData[data[i][0]] = `<?= $assets ?>/images/${data[i][3] ? `admin_images/${data[i][3]}` : 'logo.png'}`

			M.Autocomplete.init(document.querySelectorAll('.autocomplete'), {
				data: filteredData,
				onAutocomplete: async () => showAdmins(await selectAdmins(admin_name_search.value))
			})
		}

		form.onsubmit = async e => {
			e.preventDefault()
			btnSubmit.disabled = true
			const data = new FormData(form)

			const result = await (await fetch('src/insert_admin.php', {
				method: 'POST',
				body: data
			})).json()

			if (result.status === '1') {
				M.toast({
					html: `${inputs[0].value.trim()} adicionado(a) na Administração.`,
					classes: 'green'
				})

				for (let i = 0; i < inputs.length; i++) {
					inputs[i].value = ''
					inputs[i].classList.remove('valid')
				}

				const data = await selectAdmins()

				createAutoComplete(data)
				showAdmins(data)
			} else {
				M.toast({
					html: `Erro ao adicionar ${inputs[0].value.trim()} na Administração.`,
					classes: 'red accent-4'
				})
			}

			btnSubmit.disabled = false
		}

		const selectAdmins = async (name = '') => await (await fetch(`src/select_admins.php?admin_name=${name}`)).json()

		const showAdmins = data => {
			let adminsHTML = '',
				modalsHTML = ''

			for (const i in data) {
				modalsHTML +=
					`<div id="removeAdmin${i}" class="modal">
						<div class="modal-content left-div-margin">
							<h4><i class="material-icons left" style="top:7px">delete</i>Remover Administrador</h4>
							<p class="mb-0">Você tem certeza que deseja remover ${data[i][0]} da Administração?</p>

							<div class="left-div indigo darken-4" style="border-radius:0"></div>
						</div>

						<div class="divider"></div>

						<div class="modal-footer">
							<button title="Cancelar" class="modal-close btn waves-effect waves-light indigo darken-4 z-depth-0"><i class="material-icons left">close</i>Cancelar</button>
							<button onclick="deleteAdmin(${i})" title="Remover Administrador" class="modal-close btn waves-effect waves-light red accent-4 z-depth-0"><i class="material-icons left">delete</i>Remover</button>
						</div>
					</div>`

				adminsHTML +=
					`<tr>
						<td><img title="${data[i][0]}" class="circle" width="40" style="margin-bottom:-5px" src="${data[i][3] ? `<?= $assets ?>/images/admin_images/${data[i][3]}` : '<?= $assets ?>/images/logo.png' }" alt="${data[i][0]}"></td>
						<td>${data[i][0]}</td>
						<td>${data[i][1]}</td>
						<td>${data[i][2]}</td>
						<td>
							<a class="btn waves-effect waves-light green darken-3 z-depth-0" title="Editar Administrador" href="atualizar_dados/?admin_id=${i}"><i class="material-icons" style="font-size:22px">edit</i></a>
							<button class="btn waves-effect waves-light red accent-4 z-depth-0 modal-trigger" style="cursor:pointer" title="Remover Administrador" data-target="removeAdmin${i}"><i class="material-icons" style="font-size:23px">delete</i></button>
						</td>
					</tr>`
			}

			admins.innerHTML = adminsHTML
			modals.innerHTML = modalsHTML
			M.Modal.init(document.querySelectorAll('.modal'))
		}

		const deleteAdmin = async id => {
			const result = await (await fetch(`src/delete_admin.php?admin_id=${id}`)).json()

			if (result.status === '1') {
				if (result.result === '0') {
					M.toast({
						html: `${result.admin_name} removido(a) da Administração.`,
						classes: 'green'
					})

					const data = await selectAdmins()
					createAutoComplete(data)
					showAdmins(data)
				} else location = '<?= $root ?>/'
			} else {
				M.toast({
					html: `Falha ao remover ${result.admin_name} da Administração.`,
					classes: 'red accent-4'
				})
			}
		}

		admin_name_search.oninput = async e => showAdmins(await selectAdmins(e.target.value))

		window.addEventListener('DOMContentLoaded', async () => {
			const data = await selectAdmins()

			createAutoComplete(data)
			showAdmins(data)
		})
	</script>
</body>

</html>
