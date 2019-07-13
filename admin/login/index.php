<?php
include_once('../../assets/assets.php');

if (isset($_SESSION['logged'])) header("Location: $root")
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">person</i>Painel Administrativo - Login</h1>
				<label>Painel de Login Administrativo. Área restrita a usuários!</label>

				<div class="divider" style="margin-bottom:5px"></div>

				<form style="margin-top:15px" action="src/login.php" method="post">
					<div class="row mb-0">
						<div class="input-field col s12">
							<i class="material-icons prefix">account_circle</i>
							<input minlength="4" title="Preencha este campo com seu Login." placeholder="Login de Administrador" class="validate" type="text" name="admin_nickname" oninvalid="this.setCustomValidity('Preencha este campo com seu Login.')" oninput="setCustomValidity('')" required>
							<label>Login</label>
							<span class="helper-text" data-error="Login inválido." data-success="Login válido.">Aguardando...</span>
						</div>

						<div class="input-field col s12">
							<i class="material-icons prefix">https</i>
							<input minlength="6" title="Preencha este campo com sua senha." placeholder="Senha de Administrador" class="validate" type="password" name="admin_password" oninvalid="this.setCustomValidity('Preencha este campo com sua senha.')" oninput="setCustomValidity('')" required>
							<label>Senha</label>
							<span class="helper-text" data-error="Senha inválida." data-success="Senha válida.">Aguardando...</span>
						</div>

						<div class="col s12" style="margin-top:5px">
							<a title="Voltar ao 4People" class="btn indigo darken-4" href="../../"><i class="material-icons left">arrow_back</i>Voltar</a>
							<?php
							include_once('../../assets/connection.php');
							include_once('../painel_administrativo/src/IP.php');

							$ip = get_ip_address();
							$sql = $database->prepare('SELECT banned_amount, banned_datetime FROM banneds WHERE banned_ip=:banned_ip');

							$sql->bindValue(":banned_ip", $ip);
							$sql->execute();

							if ($sql->rowCount()) {
								$data = $sql->fetchAll()[0];
								$count = $data['banned_amount'];

								if ($count > 3) {
									$banned_datetime = new DateTime($data['banned_datetime']);
									$now = new DateTime();

									$minutes = 30 - $now->diff($banned_datetime)->format('%i');

									if ($minutes === 0) $seconds = 60 - $now->diff($banned_datetime)->format('%s');
									else if ($minutes < 0) {
										$sql = $database->prepare('DELETE FROM banneds WHERE banned_ip=:banned_ip');

										$sql->bindValue(':banned_ip', $ip);
										$sql->execute();
										unset($count);
									}
								}
							}
							?>
							<?php if (isset($count)) : ?>
								<?php if ($count > 3) : ?>
									<span class="btn-flat red-text">Você foi bloqueado de fazer login por <?= isset($seconds) ? "$seconds segundo" . ($seconds > 1 ? 's' : '') : "$minutes minuto" . ($minutes > 1 ? 's' : '') ?>.</span>
								<?php else : ?>
									<span class="btn-flat">Número de tentativas falhas: <?= $count ?>/3</span>
								<?php endif ?>
							<?php endif ?>
							<input title="Logar no 4People" class="btn indigo darken-4 right" type="submit" value="Entrar">
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
