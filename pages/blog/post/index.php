<?php
$root = '../../..';
include_once("$root/assets/assets.php");

$post_id = filter_input(INPUT_GET, 'post_id', FILTER_DEFAULT);

$sql = $database->prepare('SELECT COUNT(post_id) FROM posts WHERE post_status = "1" LIMIT 1');
$sql->execute();

$total = $sql->fetchColumn();

$post = $database->prepare(
	'SELECT posts.post_title AS current_post_title, posts.post_image, posts.post_description, posts.post_content, posts.post_visits, posts.post_createdAt, admins.admin_name FROM posts
		INNER JOIN admins ON admins.admin_id = posts.admin_id
		WHERE post_status = "1" AND post_id = :post_id
		LIMIT 1'
);

$post->bindValue(':post_id', $post_id);
$post->execute();

if ($post->rowCount()) extract($post->fetch());
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/katex.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/quill.snow.css">
	<link rel="stylesheet" href="src/xcode.css">
	<link rel="stylesheet" href="src/index.css">
	<title><?= $post->rowCount() ? $current_post_title : 'Erro 404' ?> - Blog do 4People</title>
	<?php include_once("$assets/components/MetaTags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="<?= $post->rowCount() ? $current_post_title : 'Erro 404' ?> - Blog do 4People">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="<?= $post->rowCount() ? $current_post_title : 'Erro 404' ?> - Blog do 4People">
	<meta name="twitter:title" content="<?= $post->rowCount() ? $current_post_title : 'Erro 404' ?> - Blog do 4People">
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
				<?php if ($post->rowCount()) : ?>
					<h1 class="mont-serrat dark-grey-text" style="font-size:30px;margin:-5px 0 10px"><i class="material-icons left" style="top:6px">comment</i><?= $current_post_title ?></h1>
					<label class="dark-grey-text"><?= $post_description ?>. Autor: <?= $admin_name ?>. Visitas: <?= $post_visits ?>. Data: <?= $post_createdAt ?></label>

					<div class="divider"></div>

					<div class="center-align mt-2">
						<div title="<?= $current_post_title ?>" class="waves-effect waves-light">
							<img class="responsive-img" style="height:300px;margin-bottom:-5px" src="<?= $assets ?>/images/blog_images/<?= $post_image ?>" />
						</div>
					</div>

					<div class="divider mt-2"></div>

					<div id="content" class="mt-0 mb-0 ql-editor"><?= $post_content ?></div>

					<?php if (!isset($_SESSION['logged'])) {
							$sql = $database->prepare('SELECT post_visits FROM posts WHERE post_status = "1" AND post_id = :post_id LIMIT 1');
							$sql->bindValue(':post_id', $post_id);
							$sql->execute();

							$visits = $sql->fetchColumn();

							$sql = $database->prepare('UPDATE posts SET post_visits = :post_visits WHERE post_id = :post_id');
							$sql->bindValue(':post_visits', ++$visits);
							$sql->bindValue(':post_id', $post_id);
							$sql->execute();
						} ?>
				<?php else : ?>
					<h1 class="mont-serrat" style="font-size:30px;margin:0 0 5px"><i class="material-icons left" style="top:6px">error</i>Erro 404</h1>
					<label>Erro ao encontrar o post.</label>

					<div class="divider"></div>

					<div class="row mb-0">
						<p class="mont-serrat mt-2 mb-2 red-color-text col s12">Não foi encontrado nenhuma postagem de ID "<?= $post_id ?>"</p>
					</div>
				<?php endif ?>

				<div class="divider mb-2"></div>
				<a title="Voltar ao Blog" href=".." class="btn waves-effect waves-light red-color z-depth-0">« Voltar</a>
				<?php if (isset($_SESSION['logged']) && $post->rowCount()) : ?>
					<a title="Ir para página de Controle de posts do Blog" href="<?= $root ?>/admin/panel/blog/data_update/?post_id=<?= $post_id ?>" class="btn waves-effect waves-light btn-green z-depth-0">Editar »</a>
				<?php endif ?>

				<div class="top-div dark-grey"></div>
			</div>

			<?php
			$sql = $database->prepare('SELECT * FROM posts WHERE post_id != :post_id AND post_status = "1" ORDER BY RAND() LIMIT 2');
			$sql->bindValue(':post_id', $post_id);
			$sql->execute();

			if ($sql->rowCount()) : ?>
				<div class="card-panel left-div-margin">
					<h2 class="flow-text" style="margin:-5px 0 15px"><i class="material-icons left" style="top:3px">trending_up</i>Veja também:</h2>
					<div class="divider"></div>

					<ul class="collection with-header mb-0">
						<?php foreach ($sql as $data) : extract($data) ?>
							<li class="collection-item">
								<div><?= $post_title ?><a title="Ver <?= $current_post_title ?>" href="./?post_id=<?= $post_id ?>" class="secondary-content"><i class="material-icons red-color-text">send</i></a></div>
							</li>
						<?php endforeach ?>
					</ul>

					<div class="left-div dark-grey"></div>
				</div>
			<?php endif ?>
		</div>
	</main>

	<?php
	include_once("$assets/components/FixedActionButton.php");
	include_once("$assets/components/Footer.php");
	include_once("$assets/components/ServiceWorker.php")
	?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script>
		const ULs = document.querySelectorAll('#content ul')

		for (let i = 0; i < ULs.length; i++) ULs[i].classList.add('browser-default')
	</script>
</body>

</html>
