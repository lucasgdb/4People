<?php
header('Access-Control-Allow-Origin: localhost');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=UTF-8');

use PHPMailer\PHPMailer\PHPMailer;

session_start();
$assets = '../../../../assets';
include_once("$assets/src/php/Exception.php");
include_once("$assets/src/php/PHPMailer.php");
include_once("$assets/src/php/SMTP.php");
include_once("$assets/src/php/Connection.php");

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

	$sql = $database->prepare('SELECT admin_name, admin_email FROM admins WHERE admin_id = :admin_id LIMIT 1');
	$sql->bindValue(':admin_id', $_SESSION['logged']['id']);
	$sql->execute();

	extract($sql->fetch());

	$mail->Body =
		"<h1>Equipe 4People</h1>Olá, $message_name. Recebemos sua mensagem!<br>Título: $message_subject.<br><br>Mensagem que você enviou:<br>$message_replied<br><br>Resposta da Administração do 4People: $message_content<br>Administrador: <b>$admin_name</b> ($admin_email)";
	$mail->AltBody = '4People - Resposta da mensagem.';

	if ($mail->send()) {
		include_once("$assets/src/php/Connection.php");

		$sql = $database->prepare('UPDATE messages SET message_read = "1" WHERE message_id = :message_id');
		$sql->bindValue(':message_id', $message_id);
		$sql->execute();

		echo '{"status":"1"}';

		$sql = $database->prepare('INSERT INTO admin_logs VALUES (NULL, "update.message.sent_email", CURRENT_TIMESTAMP, :admin_id)');
		$sql->bindValue(':admin_id', $_SESSION['logged']['id']);
		$sql->execute();
	} else echo '{"status":"0"}';
} catch (Exception $e) {
	echo '{"status":"0"}';
}
