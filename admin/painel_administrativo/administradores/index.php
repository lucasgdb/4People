<?php
include_once('../../../assets/assets.php');

if (!isset($_SESSION['logged'])) {
	header("HTTP/1.0 404 Not Found");
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
	<title>4People - Ferramentas Online</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="4People - Ferramentas Online">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./">
	<meta property="og:title" content="4People - Ferramentas Online">
	<meta name="twitter:title" content="4People - Ferramentas Online">
	<meta property="og:url" content="./">
	<meta name="twitter:url" content="./">
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
			<div class="card-panel z-depth-2 top-div-margin" style="padding-bottom:10px">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">person_add</i>Adicionar um Administrador</h1>
				<label>Adicionar um novo Administrador ao 4People</label>

				<div class="divider" style="margin-bottom:5px"></div>

				<form style="margin-top:15px" action="src/insert_admin.php" method="post" enctype="multipart/form-data">
					<div class="row mb-0">
						<div class="input-field col s12 m6">
							<i class="material-icons prefix">person</i>
							<input id="admin_name" minlength="4" title="Preencha este campo com o nome." placeholder="Login de Administrador" class="validate" type="text" name="admin_name" oninvalid="this.setCustomValidity('Preencha este campo com o nome.')" oninput="setCustomValidity('')" required>
							<label class="active" for="admin_name">Nome</label>
							<span class="helper-text" data-error="Nome de Administrador inválido." data-success="Nome de Administrador válido.">Ex: Lucas Bittencourt</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">account_circle</i>
							<input id="admin_nickname" minlength="8" title="Preencha este campo com o login." placeholder="Login de Administrador" class="validate" type="text" name="admin_nickname" oninvalid="this.setCustomValidity('Preencha este campo com o login.')" oninput="setCustomValidity('')" required>
							<label class="active" for="admin_nickname">Login</label>
							<span class="helper-text" data-error="Login de Administrador inválido. Tamanho mínimo: 8" data-success="Login de Administrador válido.">Ex: lucasnaja</span>
						</div>

						<div class="input-field col s12">
							<i class="material-icons prefix">mail</i>
							<input id="admin_email" title="Preencha este campo com o e-mail." placeholder="E-mail do Administrador" class="validate" type="email" name="admin_email" oninvalid="if (this.value === '') this.setCustomValidity('Preencha este campo com o e-mail.'); else this.setCustomValidity('Este e-mail não é válido.')" oninput="setCustomValidity('')" required>
							<label class="active" for="admin_email">E-mail</label>
							<span class="helper-text" data-error="E-mail inválido." data-success="E-mail válido.">Ex: lucasnaja0@gmail.com</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">more</i>
							<input id="admin_password" minlength="6" title="Preencha este campo com a senha." placeholder="Senha do Administrador" class="validate" type="password" name="admin_password" oninvalid="this.setCustomValidity('Preencha este campo com a senha.')" oninput="setCustomValidity('')" required>
							<label class="active" for="admin_password">Senha</label>
							<span class="helper-text" data-error="Senha inválida. Tamanho mínimo: 6" data-success="Senha válida.">Aguardando...</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">more</i>
							<input id="admin_password_again" minlength="6" title="Preencha novamente este campo com a senha." placeholder="Repitir a senha do Administrador" class="validate" type="password" name="admin_password_again" oninvalid="this.setCustomValidity('Preencha novamente este campo com a senha.')" oninput="setCustomValidity('')" required>
							<label class="active" for="admin_password_again">Repitir senha</label>
							<span class="helper-text" data-error="Senha inválida. Tamanho mínimo: 6" data-success="Senha válida.">Aguardando...</span>
						</div>

						<div class="file-field input-field col s12">
							<i class="material-icons prefix">cloud_upload</i>
							<input type="file" name="admin_image" accept=".png, .jpg, .jpeg, .svg, .gif">
							<input style="width:calc(100% - 3rem)" placeholder="Selecionar imagem" type="text" class="file-path">
							<label class="active">Imagem</label>
							<span class="helper-text">.png, .jpg, .jpeg, .svg, .gif</span>
						</div>

						<div class="col s12">
							<div class="divider"></div>
							<button title="Inserir um Administrador no 4People" class="btn indigo darken-4 mt-2 z-depth-0">
								<i class="material-icons left">person_add</i>Inserir
								<input style="display:none" type="submit" value="">
							</button>
						</div>
					</div>
				</form>

				<div class="top-div indigo darken-4"></div>
			</div>

			<div class="card-panel left-div-margin" style="padding-bottom:10px">
				<h2 class="flow-text" style="margin: 0 0 5px"><i class="material-icons left">format_list_bulleted</i>Lista de Administradores</h2>
				<label>Lista de Administradores registrados</label>
				<div class="divider"></div>

				<table class="centered highlight responsive-table">
					<thead>
						<tr>
							<th>Nome do Administrador</th>
							<th>Login do Administrador</th>
							<th>E-mail do Administrador</th>
							<th>Operações</th>
						</tr>
					</thead>

					<tbody>
						<?php include_once('src/select_admins.php') ?>
					</tbody>
				</table>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>