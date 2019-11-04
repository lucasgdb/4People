<?php
$root = '../../..';
include_once("$root/assets/assets.php");

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
	<link rel="stylesheet" href="<?= $assets ?>/src/css/katex.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/quill.snow.css">
	<link rel="stylesheet" href="src/monokai-sublime.min.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Controle de Blog - 4People</title>
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
			<div class="card-panel top-div-margin">
				<h1 class="mont-serrat" style="font-size:30px;margin:0 0 5px"><i class="material-icons left" style="top:5px">comment</i>Publicar um post</h1>
				<label>Publicar um post no Blog do 4People.</label>
				<div class="divider"></div>

				<form id="formInsertPost" method="POST" enctype="multipart/form-data">
					<div class="row mt-2 mb-0">
						<div class="input-field col s12 m6">
							<i class="material-icons prefix">title</i>
							<input id="post_title" minlength="4" title="Preencha este campo com o título." placeholder="Título do post" class="validate" type="text" name="post_title" oninvalid="this.setCustomValidity('Preencha este campo com o título.')" oninput="setCustomValidity('')" required>
							<label class="active" for="post_title">Título *</label>
							<span class="helper-text" data-error="Título de post inválido." data-success="Título de post válido.">Ex: Lançamento</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">description</i>
							<input id="post_description" minlength="8" title="Preencha este campo com a descrição." placeholder="Descrição do post" class="validate" type="text" name="post_description" oninvalid="this.setCustomValidity('Preencha este campo com a descrição.')" oninput="setCustomValidity('')" required>
							<label class="active" for="post_description">Descrição *</label>
							<span class="helper-text" data-error="Descrição de post inválido." data-success="Descrição de post válido.">Ex: Lançamento do 4People</span>
						</div>

						<div class="file-field input-field col s12 m6">
							<i class="material-icons prefix">image</i>
							<input type="file" name="post_image" accept=".png, .jpg, .jpeg, .svg, .gif" required>
							<input style="width:calc(100% - 3rem)" placeholder="Selecionar imagem" type="text" class="file-path" required>
							<label class="active">Imagem</label>
							<span class="helper-text">.png, .jpg, .jpeg, .svg, .gif</span>
						</div>

						<div class="file-field input-field col s12 m6">
							<i class="material-icons prefix">visibility</i>

							<select id="post_status" name="post_status">
								<option value="0">Desativado</option>
								<option value="1" selected>Ativado</option>
							</select>

							<label>Status</label>
							<span class="helper-text">Status do post</span>
						</div>
					</div>

					<textarea id="postContent" name="post_content" class="hide" spellcheck="false"></textarea>

					<div class="standalone-container">
						<div id="toolbar-container">
							<span class="ql-formats">
								<select class="ql-font browser-default"></select>
							</span>

							<span class="ql-formats">
								<button class="ql-bold"></button>
								<button class="ql-italic"></button>
								<button class="ql-underline"></button>
								<button class="ql-strike"></button>
							</span>

							<span class="ql-formats">
								<select class="ql-color browser-default"></select>
								<select class="ql-background browser-default"></select>
								<button class="ql-script" value="sub"></button>
								<button class="ql-script" value="super"></button>
							</span>

							<span class="ql-formats">
								<button class="ql-header" value="1"></button>
								<button class="ql-header" value="2"></button>
								<button class="ql-blockquote"></button>
								<button class="ql-code-block"></button>
							</span>

							<span class="ql-formats">
								<button class="ql-list" value="ordered"></button>
								<button class="ql-list" value="bullet"></button>
								<button class="ql-indent" value="-1"></button>
								<button class="ql-indent" value="+1"></button>
							</span>

							<span class="ql-formats">
								<button class="ql-direction" value="rtl"></button>
								<select class="ql-align browser-default"></select>
								<button class="ql-link"></button>
								<button class="ql-formula"></button>
							</span>

							<span class="ql-formats">
								<button class="ql-clean"></button>
							</span>
						</div>

						<div name="post_content" class="snow-container" id="snow-container"></div>
					</div>

					<button id="btnInsertPost" title="Inserir post no Blog 4People" class="btn mt-2 waves-effect waves-light red-color z-depth-0"><i class="material-icons left">comment</i>Inserir</button>
				</form>

				<div class="top-div dark-grey"></div>
			</div>

			<div class="card-panel left-div-margin" style="padding-bottom:10px">
				<h2 class="flow-text" style="margin:-5px 0 15px"><i class="material-icons left" style="top:3px">format_list_bulleted</i>Lista de posts <span id="amount"></span></h2>
				<div class="divider"></div>

				<table class="centered highlight responsive-table">
					<thead>
						<tr>
							<th>Título</th>
							<th>Status</th>
							<th>Visitas</th>
							<th>Autor</th>
							<th>Ver post</th>
							<th>Operações</th>
						</tr>
					</thead>

					<tbody id="posts"></tbody>
				</table>

				<div class="left-div dark-grey"></div>
			</div>
		</div>
	</main>

	<div id="deletes"></div>

	<?php include_once("$assets/components/Footer.php") ?>
	<?php include_once("$assets/components/ServiceWorker.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script src="<?= $assets ?>/src/js/katex.min.js"></script>
	<script src="<?= $assets ?>/src/js/highlight.min.js"></script>
	<script src="<?= $assets ?>/src/js/quill.min.js"></script>
	<script src="<?= $assets ?>/src/js/auto-render.min.js" onload="renderMathInElement(document.body)"></script>
	<script src="src/index.js"></script>
	<script>
		M.Modal.init(document.querySelectorAll('.modal'))
		const formInsertPost = document.querySelector('#formInsertPost')
		const formFilter = document.querySelector('#formFilter')
		const posts = document.querySelector('#posts')
		const deletes = document.querySelector('#deletes')
		const inputs = formInsertPost.querySelectorAll('input:not(.select-dropdown)')
		const btnSubmit = formInsertPost.querySelector('button')
		const lblAmount = document.querySelector('#amount')

		formInsertPost.onsubmit = async e => {
			e.preventDefault()
			btnSubmit.disabled = true

			const data = await (await fetch('src/insert_post.php', {
				method: 'POST',
				body: new FormData(formInsertPost)
			})).json()

			if (data.status === '1') {
				M.toast({
					html: `${inputs[0].value.trim()} adicionado(a).`,
					classes: 'green'
				})

				for (let i = 0; i < inputs.length; i += 1) {
					inputs[i].value = ''
					inputs[i].classList.remove('valid')
				}

				lblQuillContent.innerHTML = ''
				postContent.value = ''

				selectPosts()
			} else {
				M.toast({
					html: `Erro ao adicionar ${inputs[0].value.trim()}.`,
					classes: 'red accent-4'
				})
			}

			btnSubmit.disabled = false
		}

		const selectPosts = async () => {
			let postsHTML = '',
				deletesHTML = '',
				amount = 0

			const data = await (await fetch('src/select_posts.php')).json()

			for (const i in data) {
				amount += 1

				deletesHTML += (
					`<div id="removePost${i}" class="modal">
						<div class="modal-content left-div-margin">
								<h4 class="flow-text" style="font-size:30px;margin:-5px 0 15px"><i class="material-icons left" style="top:7px">delete</i>Remover post</h4>
								<div class="divider"></div>
							<p class="mb-0">Você tem certeza que deseja remover "${data[i][0]}" do 4People?</p>

							<div class="left-div dark-grey" style="border-radius:0"></div>
						</div>

						<div class="divider"></div>

						<div class="modal-footer">
							<button title="Cancelar" class="modal-close btn waves-effect waves-light dark-grey z-depth-0"><i class="material-icons left">close</i>Cancelar</button>
							<a onclick="deleteTool(${i}, '${data[i][0]}')" title="Remover ${data[i][0]}" class="modal-close btn waves-effect waves-light red-color z-depth-0"><i class="material-icons left">delete</i>Remover</a>
						</div>
					</div>`
				)

				postsHTML += (
					`<tr>
						<td>${data[i][0]}</td>
						<td>${data[i][1] === '1' ? '<i title="Ativado" class="material-icons btn-green-text">done</i>' : '<i title="Desativado" class="material-icons red-color-text">clear</i>'}</td>
						<td>${data[i][2]}</td>
						<td>${data[i][3]}</td>
						<td><a href="<?= $root ?>/pages/blog/post/?post_id=${i}" title="Ir até ao post" class="btn waves-effect waves-light dark-grey z-depth-0"><i class="material-icons">link</i></a></td>
						<td>
							<a href="./data_update/?post_id=${i}" class="btn waves-effect waves-light green darken-3 z-depth-0" title="Editar post"><i class="material-icons">edit</i></a>
							<button class="btn waves-effect waves-light red-color z-depth-0 modal-trigger" style="cursor:pointer" title="Remover post" data-target="removePost${i}"><i class="material-icons">delete</i></button>
						</td>
					</tr>`
				)
			}

			posts.innerHTML = postsHTML
			deletes.innerHTML = deletesHTML
			lblAmount.innerHTML = `[${amount}]`
			M.Modal.init(document.querySelectorAll('.modal'))
			M.FormSelect.init(document.querySelectorAll('select'))
		}

		const deleteTool = async (id, title) => {
			const result = await (await fetch(`src/delete_post.php?post_id=${id}`)).json()

			if (result.status === '1') {
				M.toast({
					html: `${title} removido(a).`,
					classes: 'green'
				})

				selectPosts()
			} else {
				M.toast({
					html: `Não foi possível remover ${title}.`,
					classes: 'red accent-4'
				})
			}
		}

		selectPosts()
	</script>
</body>

</html>
