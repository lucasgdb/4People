<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$assets = '../../assets/';
include_once("$assets/php/Exception.php");
include_once("$assets/php/PHPMailer.php");
include_once("$assets/php/SMTP.php");

$name = filter_input(INPUT_POST, 'name', FILTER_DEFAULT);
$email = filter_input(INPUT_POST, 'email', FILTER_DEFAULT);
$message = filter_input(INPUT_POST, 'subject', FILTER_DEFAULT);

$mail = new PHPMailer(true);

try {
	// Server settings
	include_once("$assets/php/PHP_Mailer_configs.php");

	// Recipients
	$mail->setFrom($email, '4People');
	$mail->addAddress("4people.onlinetools@gmail.com", $name);

	// Content
	$mail->isHTML(true);
	$mail->Subject = '4People - Contato';
	$mail->Body = "Nome: $name<br>E-mail: $email<br>Mensagem: $message";
	$mail->AltBody = 'Mensagem recebida do 4People';

	session_start();

	if ($mail->send()) $_SESSION['msg']['type'] = 'success';
	else $_SESSION['msg']['type'] = 'error';

	header('Location: ../');
} catch (Exception $e) {
	$_SESSION['msg']['type'] = 'error';
	header('Location: ../');
}
