<?php
try {
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once("$assets/php/Connection.php");

	$sql = $database->prepare(
		'SELECT
			message_id, message_name, message_email, message_subject, message_content, message_read
			FROM messages
			ORDER BY message_read, message_time'
	);
	$sql->execute();

	foreach ($sql as $key) : extract($key) ?>
		<tr>
			<td><?= $message_name ?></td>
			<td><?= $message_email ?></td>
			<td><?= $message_subject ?></td>
			<td>
				<button class="btn waves-effect waves-light <?= $message_read === '1' ? 'grey darken-1' : 'green darken-3' ?> modal-trigger z-depth-0" onclick="changeMessage('src/update_message.php?message_id=<?= $message_id ?>', '<?= $message_id ?>', '<?= $message_name ?>', '<?= $message_email ?>', '<?= $message_subject ?>', '<?= preg_replace('/[^[:alnum:]áãâàéẽêèíĩîìóôõòúûũù]/', ' ', $message_content) ?>', <?= $message_read === '1' ?>)" style="cursor:pointer" title="Ler Mensagem" data-target="readMessage"><i class="material-icons" style="font-size:23px">remove_red_eye</i></button>
				<button class="btn waves-effect waves-light red accent-4 modal-trigger z-depth-0" onclick="changeLink('src/delete_message.php?message_id=<?= $message_id ?>', '<?= $message_name ?>', '<?= $message_email ?>')" style="cursor:pointer" title="Remover Mensagem" data-target="removeMessage"><i class="material-icons" style="font-size:23px">delete</i></button>
			</td>
		</tr>
	<?php endforeach ?>
<?php
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
