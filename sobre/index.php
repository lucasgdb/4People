<?php include_once('../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Sobre - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Sobre - 4People">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./sobre/">
	<meta property="og:title" content="Sobre - 4People">
	<meta name="twitter:title" content="Sobre - 4People">
	<meta property="og:url" content="./sobre/">
	<meta name="twitter:url" content="./sobre/">
</head>

<body class="grey lighten-3">
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php");
	include_once("$assets/components/sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel z-depth-2 top-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">info_outline</i>Sobre o 4People</h1>

				<label>4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.</label>
				<div class="divider mb-0"></div>

				<h2 class="flow-text mt-2 mb-2">Criadores</h2>
				<div class="divider"></div>
				<div class="row mt-2 mb-2">
					<div class="col s12 m8 offset-m2">
						<div class="col s3">
							<img title="Lucas Bittencourt" class="responsive-img circle materialboxed" src="../assets/images/lucas_bittencourt.jpg" alt="Lucas Bittencourt">
						</div>

						<div class="col s3">
							<img title="Jairo Arcy" class="responsive-img circle materialboxed" src="../assets/images/jairo_arcy.jpeg" alt="Jairo Arcy">
						</div>

						<div class="col s3">
							<img title="Renan de Mattos" class="responsive-img circle materialboxed" src="../assets/images/renan_mattos.jpg" alt="Renan de Mattos">
						</div>

						<div class="col s3">
							<img title="Suzany Silva" class="responsive-img circle materialboxed" src="../assets/images/suzany_silva.jpg" alt="Suzany Silva">
						</div>
					</div>
				</div>

				<div class="divider mb-0"></div>
				<h2 class="flow-text mt-2 mb-2">Informações</h2>
				<div class="divider"></div>
				<p style="text-indent:20px">
					<strong>4People</strong> é um projeto de TCC da Escola Técnica (Etec) Alfredo de Barros Santos de Guaratinguetá, no curso de Desenvolvimento de Sistemas.
					O 4People foi feito por 2 Programadores e 2 Analistas.
					Na criação foi utilizado HTML, CSS, JavaScript e PHP como linguagens.
					O Editor de Texto que utilizamos foi o Visual Studio Code, da Microsoft.
					O Projeto é de Código Aberto (<a class="linkHover" href="https://github.com/lucasnaja/4People/blob/master/LICENSE" target="_blank" rel="noopener noreferrer nofollow">GPL-3.0</a>) e você pode contribuir com ele no <a class="linkHover" href="https://github.com/lucasnaja/4People" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>!
				</p>

				<div class="divider"></div>
				<h2 class="flow-text mt-2 mb-2">Sobre nós</h2>
				<div class="divider"></div>

				<ul class="browser-default mb-0">
					<li>
						<span style="font-size:18px">Lucas Bittencourt</span>
						<ul class="browser-default">
							<li><a class="linkHover" href="https://github.com/lucasnaja" target="_blank">GitHub »</a></li>
							<li><a class="linkHover" href="https://www.facebook.com/Lucas.Naja0" target="_blank">Facebook »</a></li>
							<li><a class="linkHover" href="https://dev.to/lucasnaja" target="_blank">Dev Community »</a></li>
							<li><a class="linkHover" href="https://www.linkedin.com/in/lucas-bittencourt/" target="_blank">LinkedIn »</a></li>
						</ul>
					</li>
					<li>
						<span style="font-size:18px">Jairo Arcy</span>
						<ul class="browser-default">
							<li><a class="linkHover" href="https://github.com/Jairo-Arcy" target="_blank">GitHub »</a></li>
							<li><a class="linkHover" href="https://www.facebook.com/jairo.arcy" target="_blank">Facebook »</a></li>
						</ul>
					</li>
					<li>
						<span style="font-size:18px">Renan de Mattos</span>
						<ul class="browser-default">
							<li><a class="linkHover" href="https://www.facebook.com/reenan.mattos" target="_blank">Facebook »</a></li>
						</ul>
					</li>
					<li>
						<span style="font-size:18px">Suzany Silva</span>
						<ul class="browser-default">
							<li><a class="linkHover" href="https://www.facebook.com/suzany.castrodasilva" target="_blank">Facebook »</a></li>
						</ul>
					</li>
				</ul>

				<div class="top-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script>
		M.Materialbox.init(document.querySelectorAll('.materialboxed'))
	</script>
</body>

</html>
