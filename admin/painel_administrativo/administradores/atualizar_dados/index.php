<?php
include_once('../../../../assets/assets.php');

if (!isset($_SESSION['logged'])) header("Location: $root")
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Painel de Login</title>
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">person</i>Controle de Administradores - Atualizar dados</h1>
				<label>Painel de Login Administrativo. Área restrita a usuários!</label>

				<div class="divider" style="margin-bottom:5px"></div>

				<?php
				include_once("$assets/connection.php");
				$admin_id = filter_input(INPUT_GET, 'admin_id', FILTER_DEFAULT);

				$sql = $database->prepare('SELECT * FROM admins WHERE admin_id=:admin_id');
				$sql->bindValue(':admin_id', $admin_id);
				$sql->execute();

				$data = $sql->fetchAll();
				extract($data[0]);
				?>

				<form style="margin-top:15px" action="../src/update_admin.php" method="post" enctype="multipart/form-data">
					<div class="row mb-0">
						<input type="hidden" value="<?= $admin_id ?>" name="admin_id">
						<div class="input-field col s12 m6">
							<i class="material-icons prefix">person</i>
							<input value="<?= $admin_name ?>" minlength="4" title="Preencha este campo com o nome." placeholder="Login de Administrador" class="validate" type="text" name="admin_name" oninvalid="this.setCustomValidity('Preencha este campo com o nome.')" oninput="setCustomValidity('')" required>
							<label>Nome</label>
							<span class="helper-text" data-error="Nome de Administrador inválido." data-success="Nome de Administrador válido.">Ex: Lucas Bittencourt</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">account_circle</i>
							<input value="<?= $admin_nickname ?>" minlength="8" title="Preencha este campo com o login." placeholder="Login de Administrador" class="validate" type="text" name="admin_nickname" oninvalid="this.setCustomValidity('Preencha este campo com o login.')" oninput="setCustomValidity('')" required>
							<label>Login</label>
							<span class="helper-text" data-error="Login de Administrador inválido. Tamanho mínimo: 8" data-success="Login de Administrador válido.">Ex: lucasnaja</span>
						</div>

						<div class="input-field col s12">
							<i class="material-icons prefix">mail</i>
							<input value="<?= $admin_email ?>" title="Preencha este campo com o e-mail." placeholder="E-mail do Administrador" class="validate" type="email" name="admin_email" oninvalid="if (this.value === '') this.setCustomValidity('Preencha este campo com o e-mail.'); else this.setCustomValidity('Este e-mail não é válido.')" oninput="setCustomValidity('')" required>
							<label>E-mail</label>
							<span class="helper-text" data-error="E-mail inválido." data-success="E-mail válido.">Ex: lucasnaja0@gmail.com</span>
						</div>

						<div class="input-field col s12">
							<i class="material-icons prefix">more</i>
							<input minlength="6" title="Preencha este campo com a senha." placeholder="Senha do Administrador" class="validate" type="password" name="admin_password" oninvalid="this.setCustomValidity('Preencha este campo com a senha.')" oninput="setCustomValidity('')">
							<label>Senha</label>
							<span class="helper-text" data-error="Senha inválida. Tamanho mínimo: 6" data-success="Senha válida.">Aguardando...</span>
						</div>

						<div class="file-field input-field col s12">
							<i class="material-icons prefix">cloud_upload</i>
							<input type="file" name="admin_image" accept=".png, .jpg, .jpeg, .svg, .gif">
							<input value="<?= $admin_image ?>" name="admin_image_text" style="width:calc(100% - 6rem)" placeholder="Selecionar imagem" type="text" class="file-path">
							<i class="material-icons prefix red-text" style="cursor:pointer" onclick="admin_image_text.value = ''">close</i>
							<label>Imagem</label>
						</div>

						<div class="col s12" style="margin-top:5px">
							<div class="divider"></div>
							<a href="../" class="btn indigo darken-4 mt-2"><i class="material-icons left">arrow_back</i>Voltar</a>
							<input class="btn indigo darken-4 mt-2 right" title="Atualizar dados" type="submit" value="Atualizar">
						</div>
					</div>
				</form>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<script>
		const admin_image_text = document.querySelector('[name="admin_image_text"]')
	</script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
</body>

</html>
