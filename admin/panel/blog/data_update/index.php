<?php
$root = '../../../..';
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
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/katex.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/quill.snow.css">
	<link rel="stylesheet" href="../src/monokai-sublime.min.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Controle de posts - Atualizar Dados</title>
	<?php include_once("$assets/components/admin_components/MetaTags.php") ?>
</head>

<body style="background-color:#eeeeee">
	<?php include_once("$assets/components/NoScript.php") ?>

	<main>
		<div class="container">
			<div class="card-panel z-depth-3 left-div-margin" style="padding-bottom:10px">
				<?php
				$post_id = filter_input(INPUT_GET, 'post_id', FILTER_DEFAULT);

				$sql = $database->prepare('SELECT * FROM posts WHERE post_id = :post_id LIMIT 1');
				$sql->bindValue(':post_id', $post_id);

				$sql->execute();
				extract($sql->fetch());
				?>
				<h1 class="flow-text dark-grey-text" style="margin:0 0 5px"><i class="material-icons left" style="top:2px">edit</i>Editar dados de "<?= $post_title ?>"</h1>
				<label class="dark-grey-text">Atualizar dados de um post do blog do 4People</label>

				<div class="divider"></div>

				<form onsubmit="updatePost(event)" method="POST" enctype="multipart/form-data">
					<div class="row mt-2 mb-0">
						<input value="<?= $post_id ?>" class="hide" type="hidden" name="post_id">

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">title</i>
							<input value="<?= $post_title ?>" id="post_title" minlength="4" title="Preencha este campo com o título." placeholder="Título do post" class="validate valid" type="text" name="post_title" oninvalid="this.setCustomValidity('Preencha este campo com o título.')" oninput="setCustomValidity('')" required>
							<label class="active" for="post_title">Título *</label>
							<span class="helper-text" data-error="Título de post inválido." data-success="Título de post válido.">Ex: Lançamento</span>
						</div>

						<div class="input-field col s12 m6">
							<i class="material-icons prefix">description</i>
							<input oninvalid="this.setCustomValidity('Por favor, selecione uma imagem.')" oninput="setCustomValidity('')" value="<?= $post_description ?>" id="post_description" minlength="8" title="Preencha este campo com a descrição." placeholder="Descrição do post" class="validate valid" type="text" name="post_description" oninvalid="this.setCustomValidity('Preencha este campo com a descrição.')" oninput="setCustomValidity('')" required>
							<label class="active" for="post_description">Descrição *</label>
							<span class="helper-text" data-error="Descrição de post inválido." data-success="Descrição de post válido.">Ex: Lançamento do 4People</span>
						</div>

						<div class="file-field input-field col s12 m6">
							<i class="material-icons prefix">image</i>
							<input value="<?= $post_image ?>" type="file" name="post_image" accept=".png, .jpg, .jpeg, .svg, .gif">
							<input value="<?= $post_image ?>" name="post_image_text" style="width:calc(100% - 3rem)" placeholder="Selecionar imagem" type="text" class="file-path" required>
							<label class="active">Imagem</label>
							<span class="helper-text">.png, .jpg, .jpeg, .svg, .gif</span>
						</div>

						<div class="file-field input-field col s12 m6">
							<i class="material-icons prefix">visibility</i>

							<select id="post_status" name="post_status">
								<option value="0" <?= $post_status === '0' ? 'selected' : '' ?>>Desativado</option>
								<option value="1" <?= $post_status === '1' ? 'selected' : '' ?>>Ativado</option>
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

						<div class="snow-container" id="snow-container"><?= $post_content ?></div>
					</div>

					<a href="../" class="btn waves-effect waves-light dark-grey z-depth-0 mt-2" title="Voltar"><i class="material-icons left">keyboard_return</i>Voltar</a>
					<button id="btnUpdatePost" class="btn waves-effect waves-light red-color right z-depth-0 mt-2 ml-1" title="Salvar"><i class="material-icons left">save</i>Salvar</button>
					<a href="<?= $root ?>/pages/blog/post/?post_id=<?= $post_id ?>" class="btn waves-effect waves-light dark-grey z-depth-0 right mt-2" title="Ir até o post"><i class="material-icons left">link</i>Ver post</a>
				</form>

				<div class="left-div dark-grey"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/ServiceWorker.php") ?>

	<script src="<?= $assets ?>/src/js/katex.min.js"></script>
	<script src="<?= $assets ?>/src/js/highlight.min.js"></script>
	<script src="<?= $assets ?>/src/js/quill.min.js"></script>
	<script src="<?= $assets ?>/src/js/auto-render.min.js" onload="renderMathInElement(document.body)"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script>
		M.FormSelect.init(document.querySelectorAll('select'))

		const formUpdate = document.querySelector('form')

		const quill = new Quill('#snow-container', {
			modules: {
				formula: true,
				syntax: true,
				toolbar: '#toolbar-container'
			},
			placeholder: 'Escrever conteúdo...',
			theme: 'snow'
		})

		quill.root.setAttribute('spellcheck', false)

		let lblQuillContent
		const btnUpdatePost = document.querySelector('#btnUpdatePost')
		const postContent = document.querySelector('#postContent')

		btnUpdatePost.addEventListener('click', () => {
			if (lblQuillContent.innerText.replace(/\n/g, '') === '') postContent.innerHTML = ''
			else postContent.innerHTML = lblQuillContent.innerHTML
		})

		window.addEventListener('DOMContentLoaded', () => {
			lblQuillContent = document.querySelector('.ql-editor')
		})

		const updatePost = async e => {
			e.preventDefault()

			const data = await (await fetch('../src/update_post.php', {
				method: 'POST',
				body: new FormData(formUpdate)
			})).json()

			if (data.status === '1') {
				M.toast({
					html: 'Os dados foram atualizados com sucesso.',
					classes: 'green'
				})
			} else {
				M.toast({
					html: 'Houve um erro ao atualizar os dados.',
					classes: 'red accent-4'
				})
			}
		}
	</script>
</body>

</html>