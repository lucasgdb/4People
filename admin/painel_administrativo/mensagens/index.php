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
	<link rel="stylesheet" href="src/css/index.css">
	<link rel="stylesheet" href="src/css/quill.snow.css">
	<link rel="stylesheet" href="src/css/katex.min.css">
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
			<h4><i class="material-icons left" style="top:8px">remove_red_eye</i>Ler Mensagem</h4>
			<h6 id="messageSubject" style="color:#676767"></h6>
			<div class="divider"></div>
			<p id="messageContent" class="mb-0 grey-text text-darken-4" style="text-indent:6px"></p>

			<div class="left-div indigo darken-4" style="border-radius:0"></div>
		</div>

		<div class="divider"></div>

		<div class="modal-footer">
			<a id="linkMasAsRead" title="Marcar como lida" class="btn waves-effect waves-light indigo darken-4 z-depth-0"><i class="material-icons left">remove_red_eye</i>Marcar como lida</a>
			<a title="Fechar" class="modal-close btn waves-effect waves-light indigo darken-4 z-depth-0"><i class="material-icons left">close</i>Fechar</a>
			<button title="Responder Mensagem" class="modal-close btn waves-effect waves-light teal darken-2 z-depth-0 modal-trigger" data-target="replyEmail"><i class="material-icons left">reply</i>Responder</button>
		</div>
	</div>

	<div id="replyEmail" class="modal modal-fixed-footer">
		<form action="src/send_email.php" method="POST">
			<div class="modal-content" style="padding-bottom:0;padding-left:34px">
				<h4 class="mb-0"><i class="material-icons left" style="top:8px">send</i>Responder Mensagem</h4>

				<h6 id="messageSubjectTitle" style="color:#676767"></h6>
				<input id="messageID" name="message_id" type="hidden">
				<input id="messageNameReply" name="message_name" type="hidden">
				<input id="messageEmailReply" name="message_email" type="hidden">
				<input id="messageSubjectReply" name="message_subject" type="hidden">
				<input id="messageReplied" name="message_replied" type="hidden">
				<input id="messageReply" name="message_content" class="hide" type="text" required>

				<div class="standalone-container">
					<div id="toolbar-container">
						<span class="ql-formats">
							<button class="ql-bold"></button>
							<button class="ql-italic"></button>
							<button class="ql-underline"></button>
							<button class="ql-strike"></button>
						</span>

						<span class="ql-formats">
							<select class="ql-color"></select>
							<select class="ql-background"></select>
						</span>

						<span class="ql-formats">
							<button class="ql-script" value="sub"></button>
							<button class="ql-script" value="super"></button>
						</span>

						<span class="ql-formats">
							<button class="ql-header" value="1"></button>
							<button class="ql-header" value="2"></button>
							<button class="ql-blockquote"></button>
						</span>

						<span class="ql-formats">
							<button class="ql-list" value="ordered"></button>
							<button class="ql-list" value="bullet"></button>
						</span>

						<span class="ql-formats">
							<button class="ql-direction" value="rtl"></button>
							<select class="ql-align"></select>
							<button class="ql-link"></button>
						</span>

						<span class="ql-formats">
							<button class="ql-clean"></button>
						</span>
					</div>

					<div id="snow-container"></div>
				</div>
			</div>

			<div class="modal-footer">
				<button title="Voltar" class="modal-close btn waves-effect waves-light indigo darken-4 z-depth-0 modal-trigger" data-target="readMessage"><i class="material-icons left">arrow_back</i>Voltar</button>
				<button title="Responder Mensagem" id="sendMessage" class="btn waves-effect waves-light teal darken-2 z-depth-0">
					<i class="material-icons right">send</i>Responder
					<input class="hide" type="submit" value="">
				</button>
			</div>
		</form>

		<div class="left-div indigo darken-4" style="border-radius:0"></div>
	</div>

	<div id="removeMessage" class="modal">
		<div class="modal-content left-div-margin">
			<h4><i class="material-icons left" style="top:7px">delete</i>Remover Mensagem</h4>
			<p class="mb-0">Você tem certeza que deseja remover a mensagem de <span id="messageName"></span> &lt;<span id="messageEmail"></span>&gt;?</p>

			<div class="left-div indigo darken-4" style="border-radius:0"></div>
		</div>

		<div class="divider"></div>

		<div class="modal-footer">
			<button title="Cancelar" class="modal-close btn waves-effect waves-light indigo darken-4 z-depth-0"><i class="material-icons left">close</i>Cancelar</button>
			<a id="linkRemoveMessage" title="Remover Mensagem" class="modal-close btn waves-effect waves-light red accent-4 z-depth-0"><i class="material-icons left">delete</i>Remover</a>
		</div>
	</div>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script src="src/js/katex.min.js"></script>
	<script src="src/js/highlight.min.js"></script>
	<script src="src/js/quill.min.js"></script>
	<script>
		M.Modal.init(document.querySelectorAll('.modal'))

		Quill.register(Quill.import('attributors/style/direction'), true)
		Quill.register(Quill.import('attributors/style/align'), true)
		Quill.register(Quill.import('attributors/style/size'), true)

		const emailReply = new Quill('#snow-container', {
			modules: {
				formula: true,
				syntax: true,
				toolbar: '#toolbar-container'
			},
			placeholder: 'Escrever mensagem...',
			theme: 'snow'
		})

		const linkMarkAsRead = document.querySelector('#linkMasAsRead')
		const linkRemoveMessage = document.querySelector('#linkRemoveMessage')
		const lblMessageSubject = document.querySelector('#messageSubject')
		const lblMessageSubjectTitle = document.querySelector('#messageSubjectTitle')
		const lblMessageSubjectReply = document.querySelector('#messageSubjectReply')
		const lblMessageReplied = document.querySelector('#messageReplied')
		const lblMessageContent = document.querySelector('#messageContent')
		const lblMessageReply = document.querySelector('#messageReply')
		const lblQuillContent = document.querySelector('.ql-editor')
		const lblMessageName = document.querySelector('#messageName')
		const lblMessageEmail = document.querySelector('#messageEmail')
		const lblMessageID = document.querySelector('#messageID')
		const lblMessageNameReply = document.querySelector('#messageNameReply')
		const lblMessageEmailReply = document.querySelector('#messageEmailReply')
		const btnSendMessage = document.querySelector('#sendMessage')

		btnSendMessage.addEventListener('click', () => {
			if (lblQuillContent.innerText.replace(/\n/g, '') === '') lblMessageReply.value = ''
			else lblMessageReply.value = lblQuillContent.innerHTML
		})

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
