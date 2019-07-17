<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once("$assets/php/Exception.php");
require_once("$assets/php/PHPMailer.php");
require_once("$assets/php/SMTP.php");

$mail = new PHPMailer(true);

try {
	// Server settings
	$mail->SMTPDebug = 0;
	$mail->isSMTP();
	$mail->CharSet = 'UTF-8';
	$mail->Encoding = 'base64';
	$mail->Host = 'smtp.gmail.com';
	$mail->SMTPAuth = true;
	$mail->Username = '4people.onlinetools@gmail.com';
	$mail->Password = 'Vs4CJOit2v$LZu@R&0ml';
	$mail->SMTPSecure = 'tls';
	$mail->Port = 587;

	// Recipients
	$mail->setFrom('4people.onlinetools@gmail.com', '4People');
	$mail->addAddress("4people.onlinetools@gmail.com", '4People');

	// Content
	$mail->isHTML(true);
	$mail->Subject = '4People - Login gerado';
	$mail->Body = "Login: $admin_nickname<br>Senha: $admin_password";
	$mail->AltBody = 'Novo login de Administrador gerado.';
} catch (Exception $e) { }
