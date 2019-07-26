<?php
include_once('../../../assets/assets.php');

if (!isset($_SESSION['logged'])) {
	header('HTTP/1.0 404 Not Found');
	exit();
}
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Mensagens - 4People</title>
	<?php include_once("$assets/components/admin_components/meta_tags.php") ?>
</head>

<body class="grey lighten-4">
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php");
	include_once("$assets/components/admin_components/sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel left-div-margin" style="padding-bottom:10px">
				<h2 class="flow-text" style="margin: 0 0 5px"><i class="material-icons left">format_list_bulleted</i>Lista de Mensagens</h2>
				<label>Lista de Mensagens do 4People</label>
				<div class="divider"></div>

				<table class="centered highlight responsive-table">
					<thead>
						<tr>
							<th>Nome</th>
							<th>E-mail</th>
							<th>Título</th>
							<th>Operações</th>
						</tr>
					</thead>

					<tbody>
						<?php include_once('src/select_messages.php') ?>
					</tbody>
				</table>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<div id="readMessage" class="modal">
		<div class="modal-content left-div-margin">
			<h4>Ler Mensagem</h4>
			<h6 id="messageSubject"></h6>
			<div class="divider"></div>
			<p id="messageContent" class="mb-0">
				Mensagem aleatório do 4People
			</p>

			<div class="left-div indigo darken-4" style="border-radius:0"></div>
		</div>

		<div class="divider"></div>

		<div class="modal-footer">
			<a id="linkMasAsRead" title="Marcar como lida" class="btn waves-effect waves-light indigo darken-4 z-depth-0"><i class="material-icons left">remove_red_eye</i>Marcar como lida</a>
			<button title="Responder Mensagem" class="modal-close btn waves-effect waves-light teal z-depth-0 modal-trigger" data-target="replyEmail"><i class="material-icons left">reply</i>Responder</button>
			<a title="Fechar" class="modal-close btn waves-effect waves-light indigo darken-4 z-depth-0"><i class="material-icons left">close</i>Fechar</a>
		</div>
	</div>

	<div id="replyEmail" class="modal">
		<form action="src/send_email.php" method="POST">
			<div class="modal-content left-div-margin" style="padding-bottom:10px">
				<h4>Responder Mensagem</h4>

				<h6 id="messageSubjectTitle"></h6>
				<input id="messageID" name="message_id" type="hidden">
				<input id="messageNameReply" name="message_name" type="hidden">
				<input id="messageEmailReply" name="message_email" type="hidden">
				<input id="messageSubjectReply" name="message_subject" type="hidden">
				<input id="messageReplied" name="message_replied" type="hidden">
				<textarea placeholder="Mensagem" name="message_content" oninvalid="this.setCustomValidity('Preencha este campo com a mensagem.')" oninput="setCustomValidity('')" spellcheck="false" required></textarea>

				<div class="left-div indigo darken-4" style="border-radius:0"></div>
			</div>

			<div class="divider"></div>

			<div class="modal-footer">
				<button title="Voltar" class="modal-close btn waves-effect waves-light indigo darken-4 z-depth-0 modal-trigger" data-target="readMessage"><i class="material-icons left">arrow_back</i>Voltar</button>
				<button title="Responder Mensagem" class="btn waves-effect waves-light tea z-depth-0">
					<i class="material-icons right">send</i>Responder
					<input style="display:none" type="submit" value="">
				</button>
			</div>
		</form>
	</div>

	<div id="removeMessage" class="modal">
		<div class="modal-content left-div-margin">
			<h4>Remover Mensagem</h4>
			<p class="mb-0">Você tem certeza que deseja remover a mensagem de <span id="messageName"></span> &lt;<span id="messageEmail"></span>&gt;?</p>

			<div class="left-div indigo darken-4" style="border-radius:0"></div>
		</div>

		<div class="divider"></div>

		<div class="modal-footer">
			<button title="Cancelar" class="modal-close waves-effect waves-light btn indigo darken-4 z-depth-0"><i class="material-icons left red-text" style="font-size:27px">close</i>Não</button>
			<a id="linkRemoveMessage" title="Remover Mensagem" class="modal-close btn waves-effect waves-light indigo darken-4 z-depth-0"><i class="material-icons left green-text" style="font-size:27px">check</i>Sim</a>
		</div>
	</div>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script>
		const linkMarkAsRead = document.querySelector('#linkMasAsRead')
		const linkRemoveMessage = document.querySelector('#linkRemoveMessage')
		const lblMessageSubject = document.querySelector('#messageSubject')
		const lblMessageSubjectTitle = document.querySelector('#messageSubjectTitle')
		const lblMessageSubjectReply = document.querySelector('#messageSubjectReply')
		const lblMessageReplied = document.querySelector('#messageReplied')
		const lblMessageContent = document.querySelector('#messageContent')
		const lblMessageName = document.querySelector('#messageName')
		const lblMessageEmail = document.querySelector('#messageEmail')
		const lblMessageID = document.querySelector('#messageID')
		const lblMessageNameReply = document.querySelector('#messageNameReply')
		const lblMessageEmailReply = document.querySelector('#messageEmailReply')

		const changeLink = (link, name, email) => {
			linkRemoveMessage.href = link
			lblMessageName.innerHTML = name
			lblMessageEmail.innerHTML = email
		}

		const changeMessage = (link, id, name, email, subject, content, isRead) => {
			if (!isRead) {
				linkMarkAsRead.classList.remove('hide')
				linkMarkAsRead.href = link
			} else linkMarkAsRead.classList.add('hide')

			lblMessageSubject.innerHTML = `Título: ${subject} - ${name} &lt;${email}&gt;`
			lblMessageSubjectTitle.innerHTML = `Título: ${subject} - ${name} &lt;${email}&gt;`
			lblMessageID.value = id
			lblMessageNameReply.value = name
			lblMessageEmailReply.value = email
			lblMessageSubjectReply.value = subject
			lblMessageReplied.value = content
			lblMessageContent.innerHTML = content
		}

		M.Modal.init(document.querySelectorAll('.modal'))
	</script>
	<?php
	if (isset($_SESSION['msg'])) {
		$msg = $_SESSION['msg']['type'];

		unset($_SESSION['msg']);

		if ($msg === 'error') : ?>
			<script>
				M.toast({
					html: "Não foi possível enviar o e-mail.",
					classes: "red accent-4"
				})
			</script>
		<?php elseif ($msg === 'success') : ?>
			<script>
				M.toast({
					html: "E-mail enviado com sucesso.",
					classes: "green"
				})
			</script>
		<?php endif ?>
	<?php } ?>
</body>

</html>
