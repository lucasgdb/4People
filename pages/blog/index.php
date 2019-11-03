<?php
$root = '../..';
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
				<h1 class="mont-serrat" style="font-size:30px;margin:0 0 5px"><i class="material-icons left" style="top:5.5px">comment</i>4People - Blog</h1>
				<label>Blog de conteúdos e notícias do 4People.</label>

				<div class="divider"></div>

				<div id="posts" class="row mt-1 mb-0"></div>

				<ul id="pagination" class="pagination center mt-2 mb-1"></ul>

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
		const posts = document.querySelector('#posts')
		const pagination = document.querySelector('#pagination')

		async function getPosts() {
			let postsHTML = ''
			let page = location.search.split('=')[1]
			page = page === undefined ? '1' : page;

			const total = Number((await (await fetch('src/total_posts.php')).json()).total)

			if (total > 0) {
				const offset = Math.ceil(total / 6)
				const data = await (await fetch(`src/select_posts.php?offset=${page > offset ? offset : page < offset ? 1 : offset}`)).json()

				for (const i in data) {
					postsHTML += (
						`<div class="col s12 m6">
						<div class="card">
							<a href="./post/?post_id=${data[i][0]}" style="height:250px;background-size:cover;background-image: url('<?= $assets ?>/images/blog_images/${data[i][2]}')" class="card-image waves-effect waves-block waves-light"></a>

							<div class="card-content">
								<span class="card-title grey-text text-darken-4"><a href="./post/?post_id=${data[i][0]}">${data[i][1]}</a></span>
								<p><a href="./post/?post_id=${data[i][0]}">Clique aqui</a> para ver mais informações.</p>
								<p class="mt-2 mb-0">${data[i][3]}</p>
							</div>
						</div>
					</div>`
					)
				}

				createPagination(offset, Number(page))
				posts.innerHTML = postsHTML
			} else {
				posts.innerHTML = '<p class="mont-serrat mb-0 red-color-text">Não há posts publicados!</p>'
			}
		}

		function createPagination(amount = 10, selected = 1) {
			let html = ''

			if (selected > amount) selected = amount
			else if (selected < 1) selected = 1

			for (let i = 0; i < amount + 2; i++) {
				html += (
					`<li class="${(i === 0 && selected === 1) || (i === amount + 1 && selected === amount) ? 'disabled' : i === selected ? 'active red-color waves-effect waves-light' : 'waves-effect'}">
						<a href="${i === 0 ? selected === 1 ? '#' : `?page=${selected - 1}` : i < amount + 1 ? `?page=${i}` : selected === amount ? '#' : `?page=${selected + 1}`}">
							${i === 0 || i === amount + 1 ? `<i class="material-icons">${i === 0 ? 'chevron_left' : 'chevron_right'}</i>` : i}
						</a>
					</li>`
				)
			}

			pagination.innerHTML = html
		}

		getPosts()
	</script>
</body>

</html>
