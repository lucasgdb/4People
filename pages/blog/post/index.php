<?php
$root = '../../..';
include_once("$root/assets/assets.php")
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="src/index.css">
	<title>4People - Ferramentas Online</title>
	<?php include_once("$assets/components/MetaTags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="4People - Ferramentas Online">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="4People - Ferramentas Online">
	<meta name="twitter:title" content="4People - Ferramentas Online">
</head>

<body>
	<?php
	include_once("$assets/components/NoScript.php");
	include_once("$assets/components/Spinner.php");
	include_once("$assets/components/Header.php");
	include_once("$assets/components/Sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel top-div-margin">
				<h1 class="mont-serrat" id="postTitle" style="font-size:30px;margin:0 0 5px"></h1>
				<label id="postDescription"></label>

				<div class="divider"></div>

				<img class="responsive-img mt-2" style="height:300px" id="postImage">

				<div class="row mb-0">
					<p class="mt-0 mb-0 col s12" id="postContent"></p>
				</div>

				<div class="divider mb-2"></div>
				<a href=".." class="btn waves-effect waves-light red-color">« Voltar</a>

				<div class="top-div dark-grey"></div>
			</div>
		</div>
	</main>

	<?php
	include_once("$assets/components/Footer.php");
	include_once("$assets/components/ServiceWorker.php")
	?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script>
		const postTitle = document.querySelector('#postTitle')
		const postImage = document.querySelector('#postImage')
		const postDescription = document.querySelector('#postDescription')
		const postContent = document.querySelector('#postContent')

		async function getPost() {
			let postHTML = ''
			let post_id = location.search.split('=')[1]
			post_id = post_id === undefined ? '1' : post_id;

			const data = await (await fetch(`src/select_post.php?post_id=${post_id}`)).json()

			if (Object.keys(data).length > 0) {
				postTitle.innerHTML = `<i class="material-icons left" style="top:5.5px">comment</i>${data[0]}`
				postImage.src = `<?= $assets ?>/images/blog_images/${data[1]}`
				postDescription.innerHTML = `${data[2]}. Autor: ${data[6]}. Postado: ${data[5]}. Visitas: ${data[4]}`
				postContent.innerHTML = data[3]

				const getULElements = document.querySelectorAll('#postContent ul')
				for (let i = 0; i < getULElements.length; i += 1) {
					getULElements[i].classList.add('browser-default')
				}
			} else {
				postTitle.innerHTML = 'Post'
				postDescription.innerHTML = 'Descrição'
				postContent.innerHTML = 'Não há post nessa área!'
				postContent.classList.add('mont-serrat', 'red-color-text', 'mb-1')
				postImage.hidden = true
			}
		}

		getPost()
	</script>
</body>

</html>
