<?php
$root = '../../../..';
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
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Controle de Administradores - Atualizar Dados</title>
	<?php include_once("$assets/components/admin_components/MetaTags.php") ?>
</head>

<body style="background-color:#eeeeee">
	<?php include_once("$assets/components/NoScript.php") ?>

	<main>
		<div class="container">
			<div class="card-panel z-depth-3 left-div-margin" style="padding-bottom:10px">
				<?php
				$admin_id = filter_input(INPUT_GET, 'admin_id', FILTER_DEFAULT);

				$sql = $database->prepare('SELECT admin_id, admin_name, admin_nickname, admin_email, admin_image FROM admins WHERE admin_id = :admin_id LIMIT 1');
				$sql->bindValue(':admin_id', $admin_id);

				$sql->execute();
				extract($sql->fetch());
				?>
				<h1 class="flow-text dark-grey-text" style="margin:0 0 5px"><i class="material-icons left" style="top:2px">edit</i>Editar dados de <?= $admin_name ?></h1>
				<label class="dark-grey-text">Atualizar dados de um Administrador do 4People</label>

				<div class="divider"></div>

				<form onsubmit="updateAdmin(event)" method="POST" enctype="multipart/form-data">
					<div class="row mt-2 mb-0">
						<input type="hidden" value="<?= $admin_id ?>" name="admin_id">
						<div class="input-field col s12 m6">
							<i class="material-icons prefix">person</i>
							<input id="admin_name" value="<?= $admin_name ?>" minlength="4" title="Preencha este campo com o nome." placeholder="Login de Administrador" class="validate valid" type="text" name="admin_name" oninvalid="this.setCustomValidity('Preencha este campo com o nome.')" oninput="setCustomValidity('')" required>
							<label class="active" for="admin_name">Nome *</label>
							<span class="helper-text" data-error="Nome de Administrador inválido." data-success="Nome de Administrador válido.">Ex: Lucas Bittencourt</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">account_circle</i>
							<input id="admin_nickname" value="<?= $admin_nickname ?>" minlength="8" title="Preencha este campo com o login." placeholder="Login de Administrador" class="validate valid" type="text" name="admin_nickname" oninvalid="this.setCustomValidity('Preencha este campo com o login.')" oninput="setCustomValidity('')" required>
							<label class="active" for="admin_nickname">Login *</label>
							<span class="helper-text" data-error="Login de Administrador inválido. Tamanho mínimo: 8" data-success="Login de Administrador válido.">Ex: lucasnaja</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">mail</i>
							<input id="admin_email" value="<?= $admin_email ?>" title="Preencha este campo com o e-mail." placeholder="E-mail do Administrador" class="validate valid" type="email" name="admin_email" oninvalid="if (this.value === '') this.setCustomValidity('Preencha este campo com o e-mail.'); else this.setCustomValidity('Este e-mail não é válido.')" oninput="setCustomValidity('')" required>
							<label class="active" for="admin_email">E-mail *</label>
							<span class="helper-text" data-error="E-mail inválido." data-success="E-mail válido.">Ex: lucasnaja0@gmail.com</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">https</i>
							<input id="admin_password" minlength="6" title="Preencha este campo com a senha." placeholder="Senha do Administrador" class="validate" type="password" name="admin_password" oninvalid="this.setCustomValidity('Preencha este campo com a senha.')" oninput="setCustomValidity('')">
							<label class="active" for="admin_password">Senha</label>
							<span class="helper-text" data-error="Senha inválida. Tamanho mínimo: 6" data-success="Senha válida.">Aguardando...</span>
						</div>

						<div class="file-field input-field col s12">
							<i class="material-icons prefix">image</i>
							<input title="Escolher imagem" type="file" name="admin_image" accept=".png, .jpg, .jpeg, .svg, .gif">
							<input value="<?= $admin_image ?>" name="admin_image_text" style="width:calc(100% - 4.5rem)" placeholder="Selecionar imagem" type="text" class="file-path">
							<i class="material-icons prefix red-text" title="Remover imagem" style="cursor:pointer" onclick="admin_image_text.value = ''">close</i>
							<label class="active">Imagem</label>
							<span class="helper-text">.png, .jpg, .jpeg, .svg, .gif</span>
						</div>

						<div class="col s12">
							<div class="divider"></div>

							<a href="../" class="btn waves-effect waves-light dark-grey z-depth-0 mt-2" title="Voltar"><i class="material-icons left">keyboard_return</i>Voltar</a>
							<button title="Salvar" class="btn waves-effect waves-light red-color mt-2 right z-depth-0"><i class="material-icons left">save</i>Salvar</button>
						</div>
					</div>
				</form>

				<div class="left-div dark-grey"></div>
			</div>
		</div>
	</main>

	<?php
	include_once("$assets/components/Footer.php");
	include_once("$assets/components/ServiceWorker.php")
	?>


	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script>
		const admin_image_text = document.querySelector('[name="admin_image_text"]')
		const formUpdate = document.querySelector('form')

		const updateAdmin = async e => {
			e.preventDefault()

			const data = await (await fetch('../src/update_admin.php', {
				method: 'POST',
				body: new FormData(formUpdate)
			})).json()

			if (data.status === '1') {
				M.toast({
					html: 'Os dados foram atualizados com sucesso.',
					classes: 'green'
				})
			} else {
				M.toast({
					html: 'Houve um erro ao atualizar os dados.',
					classes: 'red accent-4'
				})
			}
		}
	</script>
</body>

</html>
