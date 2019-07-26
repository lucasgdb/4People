<?php

use PHPMailer\PHPMailer\PHPMailer;

include_once("$assets/php/Exception.php");
include_once("$assets/php/PHPMailer.php");
include_once("$assets/php/SMTP.php");

$mail = new PHPMailer(true);

try {
	// Server settings
	include_once("$assets/php/PHP_Mailer_configs.php");

	// Recipients
	$mail->setFrom('4people.onlinetools@gmail.com', '4People');
	$mail->addAddress('4people.onlinetools@gmail.com', '4People');

	// Content
	$mail->isHTML(true);
	$mail->Subject = '4People - Login gerado';
	$mail->Body = "Login: $admin_nickname<br>Senha: $admin_password";
	$mail->AltBody = 'Novo login de Administrador gerado.';
} catch (Exception $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
