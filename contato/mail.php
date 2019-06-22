<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once('src/Exception.php');
require_once('src/PHPMailer.php');
require_once('src/SMTP.php');

$firstName = filter_input(INPUT_POST, 'firstName', FILTER_DEFAULT);
$lastName = filter_input(INPUT_POST, 'lastName', FILTER_DEFAULT);
$email = filter_input(INPUT_POST, 'email', FILTER_DEFAULT);
$message = filter_input(INPUT_POST, 'subject', FILTER_DEFAULT);

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
	$mail->setFrom("$email", '4People');
	$mail->addAddress("4people.onlinetools@gmail.com", "$firstName $lastName");

	// Content
	$mail->isHTML(true);
	$mail->Subject = '4People - Contato';
	$mail->Body = "Nome: $firstName $lastName<br>E-mail: $email<br>Mensagem: $message";
	$mail->AltBody = 'Mensagem recebida do 4People';

	session_start();

	if ($mail->send()) $_SESSION['msg']['type'] = 'success';
	else $_SESSION['msg']['type'] = 'error';

	header('Location: ./');
} catch (Exception $e) {
	$_SESSION['msg']['type'] = 'error';
	echo $e->getMessage();
}
