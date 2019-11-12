<?php
$root = '../..';
include_once("$root/assets/assets.php")
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="src/index.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<title>Blog - 4People</title>
	<?php include_once("$assets/components/MetaTags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Blog - 4People">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="Blog - 4People">
	<meta name="twitter:title" content="Blog - 4People">
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
				<h1 class="mont-serrat dark-grey-text" style="font-size:30px;margin:-5px 0 10px"><i class="material-icons left" style="top:5.5px">comment</i>4People - Blog</h1>
				<label class="dark-grey-text">Blog de conteúdos e notícias do 4People.</label>

				<div class="divider"></div>

				<?php
				$page = isset($_GET['page']) ? (filter_input(INPUT_GET, 'page', FILTER_DEFAULT) - 1) * 6 : 0;

				$sql = $database->prepare('SELECT post_id, post_title, post_image, post_createdAt FROM posts WHERE post_status = "1" ORDER BY post_createdAt DESC LIMIT 6 OFFSET :page');
				$sql->bindValue(':page', (int) $page, PDO::PARAM_INT);
				$sql->execute();

				if ($sql->rowCount()) : ?>
					<div class="row mt-1 mb-0">
						<?php foreach ($sql as $post) : extract($post) ?>
							<div class="col s12 m6">
								<div class="card">
									<a title="<?= $post_title ?>" href="./post/?post_id=<?= $post_id ?>" style="height:250px;background-size:cover;background-image: url('<?= $assets ?>/images/blog_images/<?= $post_image ?>')" class="card-image waves-effect waves-block waves-light"></a>

									<div class="card-content">
										<span class="card-title grey-text text-darken-4"><a href="./post/?post_id=<?= $post_id ?>"><?= $post_title ?></a></span>
										<p><a href="./post/?post_id=<?= $post_id ?>">Clique aqui</a> para ver mais informações.</p>
										<p class="mt-2 mb-0">Postado: <span class="date-format"><?= $post_createdAt ?></span></p>
									</div>
								</div>
							</div>
						<?php endforeach ?>
					</div>

					<div class="divider"></div>

					<ul class="pagination center mt-2 mb-2">
						<?php
							$total = $database->prepare('SELECT COUNT(post_id) FROM posts WHERE post_status = "1" LIMIT 1');
							$total->execute();

							$amount = (int) ceil($total->fetchColumn() / 6);
							$selected = (int) $page;

							if ($selected > $amount) $selected = $amount;
							else if ($selected < 1) $selected = 1;
							?>
						<?php for ($i = 0; $i < $amount + 2; $i++) : ?>
							<li class="<?= ($i === 0 && $selected === 1) || ($i === $amount + 1 && $selected === $amount) ? 'disabled' : ($i === $selected ? 'active red-color waves-effect waves-light' : 'waves-effect') ?>">
								<a href="<?= $i === 0 ? ($selected === 1 ? '#' : '?page=' . ($selected - 1)) : ($i < $amount + 1 ? "?page=$i" : ($selected === $amount ? '#' : '?page=' . ($selected + 1))) ?>">
									<?= ($i === 0 || $i === $amount + 1) ? ('<i class="material-icons">' . ($i === 0 ? 'chevron_left' : 'chevron_right') . '</i>') : $i ?>
								</a>
							</li>
						<?php endfor ?>
					</ul>
				<?php else : ?>
					<p class="mont-serrat red-color-text">Não há posts publicados aqui!</p>
				<?php endif ?>

				<div class="divider"></div>

				<div class="top-div dark-grey"></div>
			</div>
		</div>
	</main>

	<?php
	include_once("$assets/components/FixedActionButton.php");
	include_once("$assets/components/Footer.php");
	include_once("$assets/components/ServiceWorker.php")
	?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script src="src/index.js"></script>
</body>

</html>
