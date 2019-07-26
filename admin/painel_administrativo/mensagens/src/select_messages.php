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
				<i onclick="changeMessage('src/update_message.php?message_id=<?= $message_id ?>', '<?= $message_id ?>', '<?= $message_name ?>', '<?= $message_email ?>', '<?= $message_subject ?>', '<?= preg_replace('/[^[:alnum:]áãâàéẽêèíĩîìóôõòúûũù]/', ' ', $message_content) ?>', <?= $message_read === '1' ?>)" class="material-icons <?= $message_read === '1' ? 'grey-text' : 'green-text' ?> text-darken-1 modal-trigger" style="cursor:pointer" title="Ler Mensagem" data-target="readMessage">remove_red_eye</i>
				<i onclick="changeLink('src/delete_message.php?message_id=<?= $message_id ?>', '<?= $message_name ?>', '<?= $message_email ?>')" class="material-icons red-text modal-trigger" style="cursor:pointer" title="Remover Mensagem" data-target="removeMessage">clear</i>
			</td>
		</tr>
	<?php endforeach ?>
<?php
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
