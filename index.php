<?php include_once('assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/index.css">
	<title>4People - Ferramentas Online</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="4People - Ferramentas Online">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./">
	<meta property="og:title" content="4People - Ferramentas Online">
	<meta name="twitter:title" content="4People - Ferramentas Online">
	<meta property="og:url" content="./">
	<meta name="twitter:url" content="./">
</head>

<body class="grey lighten-4">
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php");
	include_once("$assets/components/sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel z-depth-2 top-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">home</i>4People - Página Inicial</h1>
				<label>Ferramentas Online para estudantes e professores.</label>

				<div class="divider" style="margin-bottom:5px"></div>

				<div class="slider">
					<ul class="slides">
						<li class="grey lighten-3">
							<img alt=".">
							<div class="caption left-align">
								<h3 class="dark grey-text text-darken-4"><i style="top:9px" class="material-icons left small">favorite</i> FEITO PARA TODOS!</h3>
								<h5 class="light grey-text text-darken-4">Possuímos ferramentas para Programadores, professores, estudantes e usuários comuns.</h5>
							</div>
						</li>

						<li class="grey lighten-3">
							<div class="caption left-align">
								<h3 class="dark grey-text text-darken-4"><i style="top:10px" class="material-icons left small">fast_forward</i> MAIS RÁPIDO!</h3>
								<h5 class="light grey-text text-darken-4">Nossas Ferramentas foram todas escritas em JavaScript, para maior velocidade e segurança.</h5>
							</div>
						</li>

						<li class="grey lighten-3">
							<div class="caption right-align">
								<h3 class="dark grey-text text-darken-4">CÓDIGO ABERTO! <i style="top:10px" class="material-icons right small">code</i></h3>
								<h5 class="light grey-text text-darken-4">O Projeto 4People é de Código Aberto para qualquer um estudar os algoritmos e até mesmo melhorá-los.</h5>
							</div>
						</li>

						<li class="grey lighten-3">
							<div class="caption right-align">
								<h3 class="dark grey-text text-darken-4"><i style="top:10px" class="material-icons right small">free_breakfast</i>O MAIS ATUALIZADO!</h3>
								<h5 class="light grey-text text-darken-4">O 4People possui as melhores ferramentas atualizadas. Tá sentindo falta de alguma? Por favor, nos envie uma <a href="./contato/">mensagem</a>.</h5>
							</div>
						</li>
					</ul>
				</div>

				<div class="divider mt-2 mb-2"></div>

				<div class="row mb-0">
					<div class="col s12">
						<div class="card indigo z-depth-2">
							<div class="card-content white-text">
								<?php
								$sql = $database->prepare(
									'SELECT tools.tool_name, tools.tool_path, sections.section_path, types.type_path FROM tools
									INNER JOIN sections ON sections.section_id = tools.section_id
									INNER JOIN types ON types.type_id = sections.type_id
									WHERE tool_active = "1"
									ORDER BY tool_visits DESC, tool_id
									LIMIT 3'
								);

								$sql->execute()
								?>
								<span class="card-title"><i class="material-icons left">trending_up</i>As 3 Ferramentas mais populares</span>
								<ul class="collection with-header mb-0">
									<?php foreach ($sql as $data) : extract($data) ?>
										<li class="collection-item indigo">
											<div style="font-size:16px"><?= $tool_name ?><a title="Usar <?= $tool_name ?>" href="<?= $root ?>/<?= $type_path ?>/<?= $section_path ?>/<?= $tool_path ?>/" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
										</li>
									<?php endforeach ?>
								</ul>
							</div>

							<div class="top-div indigo darken-4"></div>
						</div>
					</div>
				</div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="card teal z-depth-2">
							<div class="card-content white-text">
								<span class="card-title"><i class="material-icons left">group</i>Visitas</span>
								<p style="font-size:16px">Usuários que já visitaram: <span id="totalVisits">10245</span></p>
							</div>

							<div class="top-div teal darken-4"></div>
						</div>

						<div class="card red z-depth-2">
							<div class="card-content white-text">
								<span class="card-title"><i class="material-icons left">group</i>Pessoas ajudadas</span>
								<?php
								$sql = $database->prepare('SELECT SUM(tool_visits) FROM tools WHERE tool_active = "1" LIMIT 1');
								$sql->execute();

								$total_visits = $sql->fetchColumn()
								?>
								<p style="font-size:16px">Nossas Ferramentas foram usadas <span id="toolVisits"><?= $total_visits ?></span> vezes</p>
							</div>

							<div class="top-div red darken-4"></div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="card blue z-depth-2">
							<div class="card-content white-text">
								<span class="card-title"><i class="material-icons left">public</i>Usuários Online</span>
								<p style="font-size:16px">Usuários Online no 4People: 1</p>
							</div>

							<div class="top-div blue darken-4"></div>
						</div>

						<div class="card green z-depth-2">
							<div class="card-content white-text">
								<span class="card-title"><i class="material-icons left">build</i>Ferramentas</span>
								<?php
								include_once("$assets/php/Connection.php");
								$sql = $database->query('SELECT COUNT(tool_id) FROM tools');
								$sql->execute();

								$count = $sql->fetchColumn()
								?>
								<p style="font-size:16px">Quantidade de Ferramentas: <?= $count ?></p>
							</div>

							<div class="top-div green darken-4"></div>
						</div>
					</div>
				</div>

				<div class="top-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<div id="agreements" class="modal">
		<div class="modal-content">
			<h4>Termos de uso</h4>
			<div class="divider"></div>
			<p>
				O 4People tem como intenção ajudar estudantes, Programadores, analistas, etc. no seu dia a dia.
				Normalmente necessários parar testar seus softwares em desenvolvimento.
				A má utilização das Ferramentas é de total responsabilidade do usuário.
				Os algoritmos são públicos e de código aberto, não contendo acesso a dados de pessoas reais.
			</p>

			<p class="mb-0">
				<label>
					<input type="checkbox">
					<span>Eu li e aceito os termos de uso</span>
				</label>
			</p>
		</div>

		<div class="divider"></div>

		<div class="modal-footer">
			<a href="#" class="modal-close waves-effect btn-flat" disabled>Aceito</a>
		</div>

		<div class="left-div indigo darken-4" style="border-radius:0 !important"></div>
	</div>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
	<script>
		const lblTotalVisits = document.querySelector('#totalVisits')
		const lblToolVisits = document.querySelector('#toolVisits')

		const formatter = Intl.NumberFormat('pt-BR')

		const formatNumbers = elements => {
			for (let i = 0; i < elements.length; i++) {
				const number = elements[i].textContent
				elements[i].textContent = formatter.format(number)
			}
		}

		formatNumbers([lblTotalVisits, lblToolVisits])
	</script>
</body>

</html>
