<?php
try {
	include_once('../../assets//php/Connection.php');

	$message_name = trim(filter_input(INPUT_POST, 'message_name', FILTER_DEFAULT));
	$message_email = trim(filter_input(INPUT_POST, 'message_email', FILTER_DEFAULT));
	$message_subject = trim(filter_input(INPUT_POST, 'message_subject', FILTER_DEFAULT));
	$message_content = trim(filter_input(INPUT_POST, 'message_content', FILTER_DEFAULT));

	$sql = $database->prepare('INSERT INTO messages VALUES(DEFAULT, :message_name, :message_email, :message_subject, :message_content, :message_time, DEFAULT)');

	$sql->bindValue(':message_name', $message_name);
	$sql->bindValue(':message_email', $message_email);
	$sql->bindValue(':message_subject', $message_subject);
	$sql->bindValue(':message_time', date('Y-m-d H:i:s'));
	$sql->bindValue(':message_content', $message_content);

	if ($sql->execute()) echo '{"result":"1"}';
	else echo '{"result":"0"}';
} catch (Exception $e) {
	echo '{"result":"0"}';
}
