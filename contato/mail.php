<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader

require_once('src/Exception.php');
require_once('src/PHPMailer.php');
require_once('src/SMTP.php');

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$message = $_POST['subject'];

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = 0;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = '4people.onlinetools@gmail.com';
    $mail->Password = 'Vs4CJOit2v$LZu@R&0ml';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    //Recipients
    $mail->setFrom("$email", '4People');
    $mail->addAddress("4people.onlinetools@gmail.com", "$firstName $lastName");

    //Content
    $mail->isHTML(true);
    $mail->Subject = '4People - Contato';
    $mail->Body    = "Nome: $firstName $lastName<br>E-mail: $email<br>Mensagem: $message";
    $mail->AltBody = 'Mensagem recebida do 4People';

    if ($mail->send()) {
        header('Location: ./?msg=success');
    } else {
        header('Location: ./?msg=error');
    }
} catch (Exception $e) {
    header('Location: index.php?msg=error');
}
