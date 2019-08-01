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
	<?php include_once("$assets/components/admin_components/meta_tags.php") ?>
</head>

<body style="background:#2e3748">
	<?php include_once("$assets/components/noscript.php") ?>

	<main>
		<div class="container">
			<div class="card-panel z-depth-3 left-div-margin" style="padding-bottom:10px">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">person</i>Painel Administrativo - Login</h1>
				<label>Painel de Login Administrativo. Área restrita!</label>

				<div class="divider"></div>

				<?php
				include_once("$assets/php/Connection.php");
				$sql = $database->prepare('SELECT COUNT(admin_id) FROM admins LIMIT 1');
				$sql->execute();

				$admin_amount = $sql->fetchColumn();

				if ($admin_amount > 0) : ?>
					<form style="margin-top:15px" action="src/login.php" method="POST">
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
								<i id="visibility" onclick="switchVisibility()" class="material-icons prefix" style="cursor:pointer">visibility</i>
								<label class="active" for="admin_password">Senha</label>
								<span class="helper-text" data-error="Senha inválida." data-success="Senha válida.">Aguardando...</span>
							</div>

							<div class="col s12" style="margin-top:5px">
								<div class="divider"></div>
								<a title="Voltar ao 4People" class="btn indigo darken-3 mt-2 z-depth-0" href="../../"><i class="material-icons left">arrow_back</i>Voltar</a>
								<?php
								include_once("$assets/php/Connection.php");
								include_once("$assets/php/IP.php");

								$ip = get_ip_address();
								$sql = $database->prepare('SELECT banned_amount FROM banneds WHERE banned_ip = :banned_ip');

								$sql->bindValue(':banned_ip', $ip);
								$sql->execute();

								if ($sql->rowCount()) {
									$banned_amount = $sql->fetchColumn();

									if ($banned_amount > 3) {
										$sql = $database->prepare('SELECT banned_begin, banned_end FROM banneds WHERE banned_ip = :banned_ip AND banned_begin <= :current_time AND banned_end >= :current_time LIMIT 1');

										$sql->bindValue(':banned_ip', $ip);
										$sql->bindValue(':current_time', date('Y-m-d H:i:s'));

										$sql->execute();

										if ($sql->rowCount()) {
											extract($sql->fetch());

											$banned_begin = new DateTime($banned_begin);
											$banned_end = new DateTime($banned_end);
											$current_time = new DateTime();

											$time = $current_time->diff($banned_end)->format('%I:%S');
										} else {
											$sql = $database->prepare('DELETE FROM banneds WHERE banned_ip = :banned_ip');

											$sql->bindValue(':banned_ip', $ip);
											$sql->execute();
											unset($banned_amount);
										}
									}
								}
								?>
								<?php if (isset($banned_amount)) : ?>
									<?php if ($banned_amount > 3) : ?>
										<span class="btn-flat mt-2 red-text btn-flat-hover">Você foi bloqueado de logar por <?= $time ?></span>
									<?php else : ?>
										<span class="btn-flat mt-2 btn-flat-hover">Número de tentativas falhas: <?= $banned_amount ?>/3</span>
									<?php endif ?>
								<?php endif ?>

								<button title="Logar no 4People" class="btn indigo darken-3 mt-2 z-depth-0 right">
									<i class="material-icons right">arrow_forward</i>Entrar
									<input class="hide" type="submit" value="">
								</button>
							</div>
						</div>
					</form>
				<?php else : ?>
					<?php
					include_once("$assets/php/MD5.php");
					$sql = $database->prepare('INSERT INTO admins VALUES (DEFAULT, "Administrador", :admin_nickname, :admin_email, :admin_password, NULL)');

					function generateRandomString($len, $specialChars = false): String
					{
						$upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
						$lowerCase = 'abcdefghijklmnopqrstuvwxyz';
						if ($specialChars) $special = '!@#$%&*()[]{}<>';
						$number = '0123456789';

						$allCharacters = $upperCase . $lowerCase . (isset($special) ? $special : '') . $number;
						$string = '';

						for ($i = 0; $i < $len; $i++) {
							$string .= $allCharacters[mt_rand(0, strlen($allCharacters) - 1)];
						}

						return $string;
					}

					$admin_nickname = generateRandomString(18);
					$admin_email = "$admin_nickname@gmail.com";
					$admin_password = generateRandomString(28, true);

					$sql->bindValue(':admin_nickname', $admin_nickname);
					$sql->bindValue(':admin_email', $admin_email);
					$sql->bindValue(':admin_password', cript($admin_password));

					if ($sql->execute()) : ?>
						<?php
						include_once('src/send_email.php');

						if ($mail->send()) : ?>
							<p class="btn-flat mb-0"><a class="linkHover" href=".">Um login foi criado e enviado para o e-mail do 4People.</a></p>
						<?php else : ?>
							<p class="btn-flat mb-0"><a class="linkHover" href=".">Um erro inesperado aconteceu.</a></p>
						<?php endif ?>
					<?php else : ?>
						<p class="btn-flat mb-0"><a class="linkHover" href=".">Um erro inesperado aconteceu.</a></p>
					<?php endif ?>
				<?php endif ?>

				<div class="left-div indigo darken-3" style="border-radius:0"></div>
			</div>
		</div>
	</main>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script>
		const txtPassword = document.querySelector('input[name=admin_password]')
		const txtPasswordIcon = document.querySelector('#visibility')

		const switchVisibility = () => {
			if (txtPassword.type === 'password') {
				txtPassword.type = 'text'
				txtPasswordIcon.innerText = 'visibility_off'
			}
			else 
			{
				txtPassword.type = 'password'
				txtPasswordIcon.innerText = 'visibility_on'
			}
		}
	</script>
</body>

</html>
