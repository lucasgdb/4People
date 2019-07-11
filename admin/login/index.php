<?php
include_once('../../assets/assets.php');
session_start();

if ($_SESSION['logged']) header('location: ../../')
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>4People - Fazer Login</title>
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

<body style="background:#242b38">
	<?php include_once("$assets/components/noscript.php") ?>

	<main>
		<div class="container">
			<div class="card-panel z-depth-2 left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">person</i>4People - Login Administrativo</h1>
				<label>Painel de Login Administrativo</label>

				<div class="divider" style="margin-bottom:5px"></div>

				<form style="margin-top:15px" action="src/login.php" method="post">
					<div class="row mb-0">
						<div class="input-field col s12">
							<i class="material-icons prefix">account_circle</i>
							<input minlength="8" title="Preencha este campo com seu Login." placeholder="Login de Usuário" class="validate" type="text" name="user_nickname" oninvalid="this.setCustomValidity('Preencha este campo com seu Login.')" oninput="setCustomValidity('')" required>
							<label>Login</label>
							<span class="helper-text" data-error="Login inválido." data-success="Login válido.">Aguardando...</span>
						</div>

						<div class="input-field col s12">
							<i class="material-icons prefix">more</i>
							<input minlength="6" title="Preencha este campo com sua senha." placeholder="Senha de Usuário" class="validate" type="password" name="user_password" oninvalid="this.setCustomValidity('Preencha este campo com sua senha.')" oninput="setCustomValidity('')" required>
							<label>Senha</label>
							<span class="helper-text" data-error="Senha inválida." data-success="Senha válida.">Aguardando...</span>
						</div>

						<div class="col s12" style="margin-top:5px">
							<a title="Voltar ao 4People" class="btn indigo darken-4" href="../../"><i class="material-icons left">arrow_back</i>Voltar</a>
							<input title="Logar no 4People" class="btn indigo darken-4 right" title="Logar" type="submit" value="Entrar">
						</div>
					</div>
				</form>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
</body>

</html>
