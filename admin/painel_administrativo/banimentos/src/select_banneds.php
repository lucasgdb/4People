<?php
try {
	if (!isset($_SESSION['logged'])) {
		header('HTTP/1.0 404 Not Found');
		exit();
	}

	include_once("$assets/php/Connection.php");

	$sql = $database->prepare('SELECT banned_ip, banned_begin, banned_end FROM banneds WHERE banned_amount = "4"');
	$sql->execute();

	foreach ($sql as $key) : extract($key) ?>
		<tr>
			<td><?= $banned_ip ?></td>
			<td><?= $banned_begin ?></td>
			<td><?= $banned_end ?></td>
			<td>
				<i onclick="changeLink('src/delete_banned.php?banned_ip=<?= $banned_ip ?>', '<?= $banned_ip ?>')" class="material-icons red-text modal-trigger" style="cursor:pointer" title="Remover Banimento" data-target="removeBanned">clear</i>
			</td>
		</tr>
	<?php endforeach ?>
<?php
} catch (PDOException $e) {
	echo 'Um erro ocorreu! Erro: ' . $e->getMessage();
}
