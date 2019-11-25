<?php
$root = '.';
include_once("$root/assets/src/php/Main.php")
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
				<h1 class="mont-serrat dark-grey-text" style="font-size:30px;margin:-5px 0 10px"><i class="material-icons left" style="top:5.5px">home</i>4People - Página Inicial</h1>
				<label class="dark-grey-text">Ferramentas Online para estudantes, professores e Desenvolvedores.</label>

				<div class="divider"></div>

				<div class="slider mt-2">
					<ul class="slides z-depth-2">
						<li class="grey lighten-3">
							<img src="<?= $assets ?>/images/bg01.jpg" alt="bg01">
							<div class="caption left-align">
								<h3 class="dark"><i style="top:9px" class="material-icons red-color-text left small">favorite</i> FEITO PARA TODOS!</h3>
								<h5 class="light">As Ferramentas são para Programadores, professores, estudantes e usuários comuns.</h5>
							</div>
						</li>

						<li class="grey lighten-3">
							<img src="<?= $assets ?>/images/bg01.jpg" alt="bg01">
							<div class="caption left-align">
								<h3 class="dark"><i style="top:10px" class="material-icons red-color-text left small">comment</i> BLOG ATUALIZADO!</h3>
								<h5 class="light">Possuímos um blog totalmente atualizado com notícias, tutoriais e atualizações do mundo da Tecnologia.</h5>
							</div>
						</li>

						<li class="grey lighten-3">
							<img src="<?= $assets ?>/images/bg01.jpg" alt="bg01">
							<div class="caption left-align">
								<h3 class="dark"><i style="top:10px" class="material-icons red-color-text left small">fast_forward</i> MAIS RÁPIDO!</h3>
								<h5 class="light">As Ferramentas foram todas escritas em JavaScript, para maior velocidade e segurança.</h5>
							</div>
						</li>

						<li class="grey lighten-3">
							<img src="<?= $assets ?>/images/bg01.jpg" alt="bg01">
							<div class="caption left-align">
								<h3 class="dark">CÓDIGO ABERTO! <i style="top:10px" class="material-icons red-color-text left small">code</i></h3>
								<h5 class="light">O 4People é de Código Aberto e livre para qualquer um estudar/melhorar.</h5>
							</div>
						</li>

						<li class="grey lighten-3">
							<img src="<?= $assets ?>/images/bg01.jpg" alt="bg01">
							<div class="caption left-align">
								<h3 class="dark"><i style="top:10px" class="material-icons red-color-text left small">free_breakfast</i>O MAIS ATUALIZADO!</h3>
								<h5 class="light">Tá sentindo falta de alguma Ferramenta ou encontrou algum erro? Por favor, <a href="./pages/contact/">fale conosco</a>.</h5>
							</div>
						</li>
					</ul>
				</div>

				<div class="divider mt-2 mb-2"></div>

				<div class="row mb-0">
					<div class="col s12">
						<div class="card grey lighten-5">
							<div class="card-content">
								<?php
								$sql = $database->prepare(
									'SELECT tools.tool_name, tools.tool_path, sections.section_path, types.type_path FROM tools
									INNER JOIN sections ON sections.section_id = tools.section_id
									INNER JOIN types ON types.type_id = sections.type_id
									WHERE tool_status = "1"
									ORDER BY tool_visits DESC, tool_id
									LIMIT 3'
								);

								$sql->execute()
								?>
								<span class="card-title"><i class="material-icons left red-color-text">trending_up</i>As <?= $sql->rowCount() ?> Ferramentas mais populares</span>
								<ul class="collection with-header mb-0">
									<?php foreach ($sql as $data) : extract($data) ?>
										<li class="collection-item grey lighten-5">
											<div style="font-size:16px"><?= $tool_name ?><a title="Ver <?= $tool_name ?>" href="<?= $root ?>/pages/<?= $type_path ?>/<?= $section_path ?>/<?= $tool_path ?>/" class="secondary-content"><i class="material-icons red-color-text">send</i></a></div>
										</li>
									<?php endforeach ?>
								</ul>
							</div>

							<div class="top-div dark-grey"></div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card grey lighten-5">
							<div class="card-content">
								<span class="card-title"><i class="material-icons left red-color-text">build</i>Ferramentas</span>
								<?php
								$sql = $database->query('SELECT COUNT(tool_id) FROM tools');
								$sql->execute();
								?>
								<p style="font-size:16px">Quantidade de Ferramentas: <span class="number"><?= $sql->fetchColumn() ?></span></p>
							</div>

							<div class="top-div dark-grey"></div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card grey lighten-5">
							<div class="card-content">
								<span class="card-title"><i class="material-icons left red-color-text">group</i>Pessoas ajudadas</span>
								<?php
								$sql = $database->prepare('SELECT SUM(tool_visits) FROM tools WHERE tool_status = "1" LIMIT 1');
								$sql->execute();
								?>
								<p style="font-size:16px">Nossas Ferramentas foram usadas <span class="number"><?= $sql->fetchColumn() ?></span> vezes</p>
							</div>

							<div class="top-div dark-grey"></div>
						</div>
					</div>

					<div class="col s12">
						<div class="card grey lighten-5">
							<div class="card-content">
								<?php
								$sql = $database->prepare('SELECT post_id, post_title FROM posts WHERE post_status = "1" ORDER BY post_visits DESC LIMIT 3');
								$sql->execute()
								?>
								<span class="card-title"><i class="material-icons left red-color-text">trending_up</i>As <?= $sql->rowCount() ?> postagens mais populares</span>
								<ul class="collection with-header mb-0">
									<?php foreach ($sql as $data) : extract($data) ?>
										<li class="collection-item grey lighten-5">
											<div style="font-size:16px"><?= $post_title ?><a title="Ver <?= $post_title ?>" href="<?= $root ?>/pages/blog/post/?post_id=<?= $post_id ?>" class="secondary-content"><i class="material-icons red-color-text">send</i></a></div>
										</li>
									<?php endforeach ?>
								</ul>
							</div>

							<div class="top-div dark-grey"></div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card grey lighten-5">
							<div class="card-content">
								<span class="card-title"><i class="material-icons left red-color-text">comment</i>Postagens</span>
								<?php
								$sql = $database->query('SELECT COUNT(post_id) FROM posts LIMIT 1');
								$sql->execute();
								?>
								<p style="font-size:16px">Quantidade de postagens: <span class="number"><?= $sql->fetchColumn() ?></span></p>
							</div>

							<div class="top-div dark-grey"></div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card grey lighten-5">
							<div class="card-content">
								<span class="card-title"><i class="material-icons left red-color-text">group</i>Pessoas entretidas</span>
								<?php
								$sql = $database->prepare('SELECT SUM(post_visits) FROM posts WHERE post_status = "1" LIMIT 1');
								$sql->execute();
								?>
								<p style="font-size:16px">Nossas postagens foram vistas <span class="number"><?= $sql->fetchColumn() ?></span> vezes</p>
							</div>

							<div class="top-div dark-grey"></div>
						</div>
					</div>
				</div>

				<div class="divider"></div>

				<div style="padding:0 20px">
					<h2 class="mont-serrat mt-0 mb-0 center-align"><span style="color:#1b1a25">&lt;/<span class="red-color-text" style="font-size:28px">4People</span>&gt;</span></h2>
					<blockquote class="grey-text text-darken-3 mt-2" style="text-align:justify;border-left-color:#A62023">
						"O 4People é um Sistema Web que traz vários tipos de ferramentas Computacionais para Desenvolvedores de Softwares e estudantes de informática, assim como ferramentas Matemáticas para alunos e professores. 4People também possui um sistema de Blog totalmente otimizado. Além disso, ele é de código aberto, ou seja, qualquer um pode visualizar seu código fonte, e usá-lo para estudos e até mesmo melhorá-lo."
					</blockquote>
				</div>

				<div class="divider mt-2 mb-2"></div>

				<div class="row mb-0">
					<a title="Lucas Bittencourt" href="https://github.com/lucasnaja" target="_blank" class="waves-effect col s12 m6 l4">
						<img class="responsive-img img-thumbnail" src="<?= $assets ?>/images/lucas_bittencourt.jpeg" alt="Lucas Bittencourt">
					</a>

					<div class="col s12 m6 l8">
						<p class="grey-text text-darken-4 mb-0">Nome: Lucas Bittencourt. Função: Desenvolvedor</p>

						<div class="divider mt-2 mb-2"></div>
						<blockquote class="grey-text text-darken-3 mt-0" style="text-align:justify">
							"Lucas Bittencourt, 19, cursando Desenvolvimento de Sistemas na Etec de Guaratinguetá e atuando como Desenvolvedor do 4People.
							Também cursando o curso de Análise e Desenvolvimento de Sistemas na Fatec de Guaratinguetá.
							Amo café <img src="<?= $assets ?>/images/coffee.png" alt="Café" />, distribuições Linux <img height="20" src="<?= $assets ?>/images/linux.png" alt="Linux" />, JavaScript <img src="<?= $assets ?>/images/js.png" alt="JS" /> e desenvolver &lt;/&gt;."
						</blockquote>

						<a title="Dev.to" href="https://dev.to/lucasnaja" target="_blank" rel="noopener noreferrer nofollow">
							<img loading="lady" src="<?= $assets ?>/images/dev.svg" alt="Perfil Dev Community Lucas Bittencourt" height="30" width="30">
						</a>

						<a title="GitHub" href="https://github.com/lucasnaja" target="_blank" rel="noopener noreferrer nofollow">
							<img loading="lady" src="<?= $assets ?>/images/github.ico" alt="Perfil GitHub Lucas Bittencourt" height="30" width="30">
						</a>

						<a title="Facebook" href="https://facebook.com/lucas8bit" target="_blank" rel="noopener noreferrer nofollow">
							<img loading="lady" src="<?= $assets ?>/images/facebook.png" alt="Perfil Facebook Lucas Bittencourt" height="30" width="30">
						</a>

						<a title="Twitter" href="https://twitter.com/lucasnaja0" target="_blank" rel="noopener noreferrer nofollow">
							<img loading="lady" src="<?= $assets ?>/images/twitter.svg" alt="Perfil Facebook Lucas Bittencourt" height="30" width="30">
						</a>

						<a title="YouTube" href="https://youtube.com/c/lucasnaja" target="_blank" rel="noopener noreferrer nofollow">
							<img loading="lady" src="<?= $assets ?>/images/youtube.svg" alt="Perfil Facebook Lucas Bittencourt" height="30" width="30">
						</a>

						<a title="LinkedIn" href="https://linkedin.com/in/lucas-bittencourt" target="_blank" rel="noopener noreferrer nofollow">
							<img loading="lady" src="<?= $assets ?>/images/linkedin.svg" alt="Perfil LinkedIn Lucas Bittencourt" height="30" width="30">
						</a>
					</div>
				</div>

				<div class="divider mt-2 mb-2"></div>

				<div class="row mb-0" style="margin-top:12px">
					<div title="Suzany Silva" class="waves-effect col s12 m6 l4">
						<img class="responsive-img img-thumbnail" src="<?= $assets ?>/images/suzany_silva.jpg" alt="Suzany Silva">
					</div>

					<div class="col s12 m6 l8">
						<p class="grey-text text-darken-4 mb-0">Nome: Suzany Silva. Função: Analista</p>

						<div class="divider mt-2 mb-2"></div>
						<blockquote class="grey-text text-darken-3 mt-0" style="text-align:justify">"Suzany Silva, 17, cursando Desenvolvimento de Sistemas na Etec de Guaratinguetá e atuando como Analista do 4People."</blockquote>

						<a title="Facebook" href="https://facebook.com/suzany.castrodasilva" target="_blank" rel="noopener noreferrer nofollow">
							<img loading="lady" src="<?= $assets ?>/images/facebook.png" alt="Perfil Facebook Suzany" height="30" width="30">
						</a>
					</div>
				</div>

				<div class="divider mt-2 mb-2"></div>

				<div class="row mb-0" style="margin-top:12px">
					<div title="Renan Mattos" class="waves-effect col s12 m6 l4">
						<img class="responsive-img img-thumbnail" src="<?= $assets ?>/images/renan_mattos.jpg" alt="Renan Mattos">
					</div>

					<div class="col s12 m6 l8">
						<p class="grey-text text-darken-4 mb-0">Nome: Renan Mattos. Função: Analista</p>

						<div class="divider mt-2 mb-2"></div>
						<blockquote class="grey-text text-darken-3 mt-0" style="text-align:justify">"Renan Mattos, 22, cursando Desenvolvimento de Sistemas na Etec de Guaratinguetá e atuando como Analista do 4People."</blockquote>

						<a title="Facebook" href="https://www.facebook.com/reenan.mattos" target="_blank" rel="noopener noreferrer nofollow">
							<img loading="lady" src="<?= $assets ?>/images/facebook.png" alt="Perfil Facebook Renan" height="30" width="30">
						</a>
					</div>
				</div>

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
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script>
		const lblNumbers = document.querySelectorAll('.number')
		const formatter = Intl.NumberFormat('pt-BR')

		for (let i = 0; i < lblNumbers.length; i += 1) {
			const number = lblNumbers[i].textContent
			lblNumbers[i].textContent = formatter.format(number)
		}
	</script>
</body>

</html>
