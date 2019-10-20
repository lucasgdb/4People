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
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="src/css/index.css">
	<link rel="stylesheet" href="src/css/quill.snow.css">
	<link rel="stylesheet" href="src/css/katex.min.css">
	<link rel="stylesheet" href="src/css/monokai-sublime.min.css">
	<title>Mensagens - 4People</title>
	<?php include_once("$assets/components/admin_components/MetaTags.php") ?>
</head>

<body>
	<?php
	include_once("$assets/components/NoScript.php");
	include_once("$assets/components/Spinner.php");
	include_once("$assets/components/Header.php");
	include_once("$assets/components/admin_components/Sidenav.php")
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

					<tbody id="messages"></tbody>
				</table>

				<div class="left-div dark-grey"></div>
			</div>
		</div>
	</main>

	<div id="readMessage" class="modal">
		<div class="modal-content left-div-margin">
			<h4><i class="material-icons left" style="top:8px">remove_red_eye</i>Ler Mensagem</h4>
			<h6 id="messageSubject" style="color:#676767"></h6>
			<div class="divider"></div>
			<blockquote id="messageContent" class="mb-0 grey-text text-darken-4" style="border-left-color:#A62023"></blockquote>

			<div class="left-div dark-grey" style="border-radius:0"></div>
		</div>

		<div class="divider"></div>

		<div class="modal-footer">
			<button id="markAsUnread" title="Desmarcar como lida" class="modal-close btn waves-effect waves-light red-color z-depth-0"><i class="material-icons left">remove_red_eye</i>Desmarcar como lida</button>
			<button id="markAsRead" title="Marcar como lida" class="modal-close btn waves-effect waves-light dark-grey z-depth-0"><i class="material-icons left">visibility_off</i>Marcar como lida</button>
			<button title="Fechar" class="modal-close btn waves-effect waves-light dark-grey z-depth-0"><i class="material-icons left">close</i>Fechar</button>
			<button title="Responder Mensagem" class="modal-close btn waves-effect waves-light btn-green z-depth-0 modal-trigger" data-target="replyEmail"><i class="material-icons right">arrow_forward</i>Responder</button>
		</div>
	</div>

	<div id="replyEmail" class="modal modal-fixed-footer">
		<form id="formReply" method="POST">
			<div class="modal-content" style="padding-bottom:0;padding-left:34px">
				<h4 class="mb-0"><i class="material-icons left" style="top:8px">reply</i>Responder Mensagem</h4>

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
				<button title="Voltar" class="modal-close btn waves-effect waves-light dark-grey z-depth-0 modal-trigger" data-target="readMessage"><i class="material-icons left">arrow_back</i>Voltar</button>
				<button id="sendMessage" title="Responder Mensagem" id="sendMessage" class="btn waves-effect waves-light btn-green z-depth-0"><i class="material-icons right">send</i>Responder</button>
			</div>
		</form>

		<div class="left-div dark-grey" style="border-radius:0"></div>
	</div>

	<div id="removeMessage" class="modal">
		<div class="modal-content left-div-margin">
			<h4><i class="material-icons left" style="top:7px">delete</i>Remover Mensagem</h4>
			<p class="mb-0">Você tem certeza que deseja remover a mensagem de <span id="messageName"></span> &lt;<span id="messageEmail"></span>&gt;?</p>

			<div class="left-div dark-grey" style="border-radius:0"></div>
		</div>

		<div class="divider"></div>

		<div class="modal-footer">
			<button title="Cancelar" class="modal-close btn waves-effect waves-light dark-grey z-depth-0"><i class="material-icons left">close</i>Cancelar</button>
			<button id="linkRemoveMessage" title="Remover Mensagem" class="modal-close btn waves-effect waves-light red-color z-depth-0"><i class="material-icons left">delete</i>Remover</button>
		</div>
	</div>

	<?php include_once("$assets/components/Footer.php") ?>
	<?php include_once("$assets/components/ServiceWorker.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script src="src/js/katex.min.js"></script>
	<script src="src/js/highlight.min.js"></script>
	<script src="src/js/quill.min.js"></script>
	<script src="src/js/auto-render.min.js" onload="renderMathInElement(document.body)"></script>
	<script src="src/js/index.js"></script>
</body>

</html>
