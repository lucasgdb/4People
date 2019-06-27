<?php include_once('../assets/assets.php') ?>
<?php session_start() ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Fale Conosco - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Contato - 4People">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./contato/">
	<meta property="og:title" content="Contato - 4People">
	<meta name="twitter:title" content="Contato - 4People">
	<meta property="og:url" content="./contato/">
	<meta name="twitter:url" content="./contato/">
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
			<div class="card-panel z-depth-2 left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">email</i>Fale Conosco</h1>

				<label>Alguma dúvida? Algum bug? Deseja alguma ferramenta nova? Por favor, nos contate e deixe-nos sabendo de qualquer coisa.</label>
				<div class="divider"></div>

				<h5>Dados</h5>

				<form class="mt-2" action="mail.php" method="post">
					<div class="row mb-0">
						<div class="input-field col s12 m6">
							<input placeholder="Ex: Lucas" oninvalid="this.setCustomValidity('Por favor, preencha esse campo com seu nome.')" oninput="setCustomValidity('')" name="firstName" id="firstName" type="text" class="validate" required>
							<label for="firstName">Nome</label>
						</div>

						<div class="input-field col s12 m6">
							<input placeholder="Ex: Bittencourt" oninvalid="this.setCustomValidity('Por favor, preencha esse campo com seu sobrenome.')" oninput="setCustomValidity('')" name="lastName" id="lastName" type="text" class="validate" required>
							<label for="lastName">Sobrenome</label>
						</div>

						<div class="input-field col s12">
							<input placeholder="Ex: lucasnaja0@gmail.com" oninvalid="this.setCustomValidity('Por favor, preencha esse campo com seu e-mail.')" oninput="setCustomValidity('')" name="email" id="email" type="email" class="validate" required>
							<label for="email">E-mail</label>
						</div>
					</div>

					<div class="divider"></div>

					<h5>Informações</h5>
					<textarea name="subject" placeholder="Mensagem" oninvalid="this.setCustomValidity('Por favor, preencha esse campo.')" oninput="setCustomValidity('')" spellcheck="false" required></textarea>

					<button title="Enviar" class="btn waves-effect waves-light indigo darken-4" type="submit">
						Enviar
					</button>
				</form>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<?php
	if (isset($_SESSION['msg'])) {
		$msg = $_SESSION['msg']['type'];

		unset($_SESSION['msg']);

		if ($msg === 'error') : ?>
			<script>
				M.toast({
					html: "Não foi possível enviar o e-mail.",
					classes: "red accent-4"
				})
			</script>
		<?php elseif ($msg === 'success') : ?>
			<script>
				M.toast({
					html: "E-mail enviado com sucesso! Aguarde retorno.",
					classes: "green"
				})
			</script>
		<?php endif ?>
	<?php } ?>
</body>

</html>
