<?php
$root = '../../..';
include_once("$root/assets/assets.php")
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="src/xcode.css">
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
				<?php
				include_once("$assets/php/Connection.php");

				$post_id = filter_input(INPUT_GET, 'post_id', FILTER_DEFAULT);

				$sql = $database->prepare('SELECT COUNT(post_id) FROM posts WHERE post_status = "1" LIMIT 1');
				$sql->execute();

				$total = $sql->fetchColumn();

				$sql = $database->prepare(
					'SELECT posts.post_title, posts.post_image, posts.post_description, posts.post_content, posts.post_visits, posts.post_createdAt, admins.admin_name FROM posts
						INNER JOIN admins ON admins.admin_id = posts.admin_id
						WHERE post_status = "1" AND post_id = :post_id
						LIMIT 1'
				);

				$sql->bindValue(':post_id', $post_id);

				if ($sql->execute() && $sql->rowCount()) : extract($sql->fetch()) ?>
					<h1 class="mont-serrat" style="font-size:30px;margin:0 0 5px"><?= $post_title ?></h1>
					<label><?= $post_description ?></label>

					<div class="divider"></div>

					<div class="center-align">
						<div class="waves-effect waves-light">
							<img class="responsive-img mt-2" style="height:300px" src="<?= $assets ?>/images/blog_images/<?= $post_image ?>" />
						</div>
					</div>

					<div class="row mb-0">
						<p class="mt-0 mb-0 col s12"><?= $post_content ?></p>
					</div>

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
					<h1 class="mont-serrat" style="font-size:30px;margin:0 0 5px">Postagem</h1>
					<label>Erro ao encontrar o post.</label>

					<div class="divider"></div>

					<div class="row mb-0">
						<p class="mont-serrat mt-2 mb-2 red-color-text col s12">Não foi encontrado nenhum post de ID "<?= $post_id ?>"</p>
					</div>
				<?php endif ?>

				<div class="divider mb-2"></div>
				<a title="Voltar ao Blog" href=".." class="btn waves-effect waves-light red-color z-depth-0">« Voltar</a>
				<?php if (isset($_SESSION['logged'])) : ?>
					<a title="Ir para página de Controle de posts do Blog" href="<?= $root ?>/admin/panel/blog/" class="btn waves-effect waves-light btn-green z-depth-0">Editar »</a>
				<?php endif ?>

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
</body>

</html>
