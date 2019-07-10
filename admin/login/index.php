<?php
include_once('../../assets/assets.php');
session_start();

if ($_SESSION['Logged']) header('location: ../../')
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
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
	include_once("$assets/components/sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel z-depth-2 top-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">person</i>4People - Página de Login</h1>
				<label>Faça login e receba muitas vantagens!</label>

				<div class="divider" style="margin-bottom:5px"></div>

				<form style="margin-top:15px" action="src/login.php" method="post">
					<div class="row mb-0">
						<div class="input-field col s12">
							<label>E-mail</label>
							<input placeholder="E-mail do Usuário" class="validate" type="email" name="user_email" oninvalid="this.setCustomValidity('Preencha esse campo com seu e-mail.')" oninput="setCustomValidity('')" required>
						</div>

						<div class="input-field col s12">
							<label>Senha</label>
							<input placeholder="Senha do Usuário" class="validate" type="password" name="user_password" oninvalid="this.setCustomValidity('Preencha esse campo com sua senha.')" oninput="setCustomValidity('')" required>
						</div>

						<div class="col s12">
							<input class="btn indigo darken-4" title="Logar" type="submit" value="Logar">
						</div>
					</div>
				</form>

				<div class="top-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
