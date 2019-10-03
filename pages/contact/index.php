<?php include_once('../../assets/assets.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Fale Conosco - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Contato - 4People">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./c/">
	<meta property="og:title" content="Contato - 4People">
	<meta name="twitter:title" content="Contato - 4People">
	<meta property="og:url" content="./contato/">
	<meta name="twitter:url" content="./contato/">
</head>

<body>
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php");
	include_once("$assets/components/sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel z-depth-2 top-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">email</i>Fale Conosco</h1>

				<label>Alguma dúvida? Algum bug? Deseja alguma ferramenta nova? Por favor, nos contate e deixe-nos sabendo de qualquer coisa.</label>
				<div class="divider"></div>

				<h5 class="mt-2 mb-2 center-align" style="position:relative"><i class="material-icons" style="position:absolute;left:0">drafts</i>Dados de contato</h5>
				<div class="divider" style="margin-bottom:15px"></div>

				<form class="mt-2" method="POST">
					<div class="row mb-0">
						<div class="input-field col s12">
							<i class="material-icons prefix">account_circle</i>
							<input title="Preencha este campo com seu nome." maxlength="45" placeholder="Nome para contato" name="message_name" id="message_name" type="text" class="validate" oninvalid="this.setCustomValidity('Preencha este campo com seu nome.')" oninput="setCustomValidity('')" required>
							<label class="active" for="message_name">Nome *</label>
							<span class="helper-text" data-error="Nome inválido." data-success="Nome válido.">Ex: Lucas Bittencourt</span>
						</div>

						<div class="input-field col s12">
							<i class="material-icons prefix">mail</i>
							<input title="Preencha este campo com seu e-mail." maxlength="45" placeholder="E-mail para contato" name="message_email" id="message_email" type="email" class="validate" oninvalid="this.setCustomValidity('Preencha este campo com seu e-mail.')" oninput="setCustomValidity('')" required>
							<label class="active" for="message_email">E-mail *</label>
							<span class="helper-text" data-error="E-mail inválido." data-success="E-mail válido.">Ex: lucasnaja0@gmail.com</span>
						</div>
					</div>

					<div class="divider"></div>
					<h5 class="mt-2 mb-2 center-align" style="position:relative"><i class="material-icons" style="position:absolute;left:0">info</i>Informações</h5>
					<div class="divider" style="margin-bottom:15px"></div>

					<div class="row mb-0">
						<div class="input-field col s12">
							<select name="message_subject">
								<option value="Bug (mal funcionamento)">Bug (mal funcionamento)</option>
								<option value="Erro (erro visual)">Erro (erro visual)</option>
								<option value="Sugestão (visual)">Sugestão (visual)</option>
								<option value="Sugestão (ferramenta)">Sugestão (ferramenta)</option>
								<option value="Outro" selected>Outro</option>
							</select>
							<label>Título *</label>
							<span class="helper-text">Selecionar assunto de mensagem</span>
						</div>

						<div class="col s12">
							<textarea name="message_content" placeholder="Mensagem" oninvalid="this.setCustomValidity('Preencha este campo com a mensagem.')" oninput="setCustomValidity('')" spellcheck="false" required></textarea>
						</div>

						<div class="col s12">
							<div class="divider"></div>
							<button title="Inserir um Administrador no 4People" class="btn waves-effect btn-green z-depth-0"><i class="material-icons right">send</i>Enviar Mensagem</button>
						</div>
					</div>
				</form>

				<div class="top-div dark-grey"></div>
			</div>
		</div>
	</main>

	<?php
	include_once("$assets/components/footer.php");
	include_once("$assets/components/service_worker.php")
	?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script src="src/index.js"></script>
</body>

</html>