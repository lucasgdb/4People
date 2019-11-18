<?php
$login_page = true;
$root = '../..';
include_once("$root/assets/src/php/Main.php");

if (isset($_SESSION['logged'])) {
	header("Location: $root/");
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
	<title>Painel de Login</title>
	<?php include_once("$assets/components/admin_components/MetaTags.php") ?>
</head>

<body style="background-color:#eeeeee">
	<?php
	include_once("$assets/components/NoScript.php");
	?>

	<main>
		<div class="container">
			<div class="card-panel z-depth-3 left-div-margin" style="padding-bottom:10px">
				<?php
				$sql = $database->prepare('SELECT admin_id FROM admins LIMIT 1');
				$sql->execute();

				if ($sql->rowCount()) : ?>
					<h1 class="flow-text dark-grey-text" style="margin:-2px 0 10px"><i class="material-icons left">verified_user</i>Painel Administrativo - Login</h1>
					<label class="dark-grey-text">Painel de Login Administrativo. Área restrita!</label>

					<div class="divider"></div>

					<form style="margin-top:15px" name="formLogin" method="POST">
						<div class="row mb-0">
							<div class="input-field col s12">
								<i class="material-icons prefix">account_circle</i>
								<input id="admin_nickname" minlength="4" title="Preencha este campo com seu Login." placeholder="Login de Administrador" class="validate" type="text" name="admin_nickname" oninvalid="this.setCustomValidity('Preencha este campo com seu Login.')" oninput="setCustomValidity('')" required>
								<label class="active" for="admin_nickname">Login</label>
								<span class="helper-text" data-error="Login inválido." data-success="Login válido.">Aguardando...</span>
							</div>

							<div class="input-field col s12">
								<i class="material-icons prefix">https</i>
								<input id="admin_password" style="width:calc(100% - 4.5rem)" minlength="6" title="Preencha este campo com sua senha." placeholder="Senha de Administrador" class="validate" type="password" name="admin_password" oninvalid="this.setCustomValidity('Preencha este campo com sua senha.')" oninput="setCustomValidity('')" required>
								<label class="active" for="admin_password">Senha</label>
								<i id="visibility" onclick="switchVisibility()" class="material-icons prefix" style="cursor:pointer">visibility</i>
								<span class="helper-text" data-error="Senha inválida." data-success="Senha válida.">Aguardando...</span>
							</div>

							<div class="col s12" style="margin-top:5px">
								<div class="divider"></div>
								<a title="Voltar ao 4People" class="btn dark-grey mt-2 z-depth-0" href="../../"><i class="material-icons left">arrow_back</i>Voltar</a>

								<span id="bannedStatus"></span>

								<button title="Logar no 4People" class="btn red-color mt-2 z-depth-0 right"><i class="material-icons right">arrow_forward</i>Entrar</button>

								<p class="right mr-2 mb-0">
									<label>
										<input type="checkbox" id="remember" />
										<span>Lembrar usuário</span>
									</label>
								</p>
							</div>
						</div>
					</form>
				<?php else : ?>
					<h1 class="flow-text dark-grey-text" style="margin:0 0 5px"><i class="material-icons left">person_add</i>Adicionar um Administrador</h1>
					<label class="dark-grey-text">Adicionar um novo Administrador ao 4People</label>

					<div class="divider"></div>

					<form style="margin-top:15px" name="formInsert" method="POST" enctype="multipart/form-data">
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

							<div class="input-field col s12 m6">
								<i class="material-icons prefix">mail</i>
								<input id="admin_email" title="Preencha este campo com o e-mail." placeholder="E-mail do Administrador" class="validate" type="email" name="admin_email" oninvalid="if (this.value === '') this.setCustomValidity('Preencha este campo com o e-mail.'); else this.setCustomValidity('Este e-mail não é válido.')" oninput="setCustomValidity('')" required>
								<label class="active" for="admin_email">E-mail *</label>
								<span class="helper-text" data-error="E-mail inválido." data-success="E-mail válido.">Ex: lucasnaja0@gmail.com</span>
							</div>

							<div class="input-field col s12 m6">
								<i class="material-icons prefix">https</i>
								<input id="admin_password" style="width:calc(100% - 4.5rem)" minlength="6" title="Preencha este campo com a senha." placeholder="Senha do Administrador" class="validate" type="password" name="admin_password" oninvalid="this.setCustomValidity('Preencha este campo com a senha.')" oninput="setCustomValidity('')" required>
								<label class="active" for="admin_password">Senha *</label>
								<i id="visibility" onclick="switchVisibility()" class="material-icons prefix" style="cursor:pointer">visibility</i>
								<span class="helper-text" data-error="Senha inválida. Tamanho mínimo: 6" data-success="Senha válida.">Aguardando...</span>
							</div>

							<div class="file-field input-field col s12">
								<i class="material-icons prefix">image</i>
								<input type="file" name="admin_image" accept=".png, .jpg, .jpeg, .svg, .gif">
								<input style="width:calc(100% - 3rem)" placeholder="Selecionar imagem" type="text" class="file-path">
								<label class="active">Imagem</label>
								<span class="helper-text">.png, .jpg, .jpeg, .svg, .gif</span>
							</div>

							<div class="col s12">
								<div class="divider"></div>
								<button title="Inserir um Administrador no 4People" class="btn waves-effect waves-light red-color mt-2 z-depth-0"><i class="material-icons left">person_add</i>Inserir</button>
							</div>
						</div>
					</form>
				<?php endif ?>

				<div class="left-div dark-grey" style="border-radius:0"></div>
			</div>
		</div>
	</main>

	<?php
	include_once("$assets/components/Footer.php");
	include_once("$assets/components/ServiceWorker.php")
	?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
</body>

</html>
