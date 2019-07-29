<?php
session_start();

use PHPMailer\PHPMailer\PHPMailer;

$assets = '../../../../assets';
include_once("$assets/php/Exception.php");
include_once("$assets/php/PHPMailer.php");
include_once("$assets/php/SMTP.php");

$mail = new PHPMailer(true);

try {
	// Server settings
	include_once("$assets/php/PHP_Mailer_configs.php");

	$message_id = filter_input(INPUT_POST, 'message_id', FILTER_DEFAULT);
	$message_name = filter_input(INPUT_POST, 'message_name', FILTER_DEFAULT);
	$message_email = filter_input(INPUT_POST, 'message_email', FILTER_DEFAULT);
	$message_subject = filter_input(INPUT_POST, 'message_subject', FILTER_DEFAULT);
	$message_content = trim(filter_input(INPUT_POST, 'message_content', FILTER_DEFAULT));
	$message_replied = filter_input(INPUT_POST, 'message_replied', FILTER_DEFAULT);

	// Recipients
	$mail->setFrom('4people.onlinetools@gmail.com', '4People');
	$mail->addAddress($message_email, $message_name);

	// Content
	$mail->isHTML(true);
	$mail->Subject = '4People - Resposta da mensagem';
	$mail->Body =
		"<h1>Equipe 4People</h1>Olá, $message_name. Recebemos sua mensagem!<br>Título: $message_subject.<br>Mensagem:<p>$message_replied</p>Resposta: $message_content<br>Administrador: <b>" . $_SESSION['logged']['name'] . '</b>';
	$mail->AltBody = '4People - Resposta da mensagem.';

	if ($mail->send()) {
		include_once("$assets/php/Connection.php");

		$sql = $database->prepare('UPDATE messages SET message_read = "1" WHERE message_id = :message_id');
		$sql->bindValue(':message_id', $message_id);
		$sql->execute();

		$_SESSION['msg']['type'] = 'success';
	} else $_SESSION['msg']['type'] = 'error';

	header('Location: ../');
} catch (Exception $e) {
	"Um erro ocorreu! Erro: {$e->getMessage()}";
}
