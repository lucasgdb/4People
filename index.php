<?php
$assets = 'assets';
$root = '.';
$url = $_SERVER['REQUEST_URI'];

if ($url[strlen($url) - 1] !== '/') header("location: $url/")
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="assets/src/css/materialize.min.css">
	<link rel="stylesheet" href="assets/src/css/main.css">
	<link rel="stylesheet" href="assets/src/css/index.css">
	<title>4People - Ferramentas Online</title>
	<?php include_once("assets/components/meta_tags.php") ?>
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

<body class="grey lighten-3">
	<?php
	include_once("assets/components/noscript.php");
	include_once("assets/components/spinner.php");
	include_once("assets/components/header.php");
	include_once("assets/components/sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel z-depth-2 top-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">home</i>4People - Página Inicial</h1>
				<label>Ferramentas Online para estudantes e professores.</label>

				<div class="divider" style="margin-bottom:5px"></div>

				<div class="slider">
					<ul class="slides">
						<li class="grey lighten-2">
							<img alt=".">
							<div class="caption center-align">
								<h3 class="dark grey-text text-darken-4">FEITO PARA TODOS!</h3>
								<h5 class="light grey-text text-darken-4">Possuímos ferramentas para Programadores, professores, estudantes e usuários comuns.</h5>
							</div>
						</li>

						<li class="grey lighten-2">
							<div class="caption left-align">
								<h3 class="dark grey-text text-darken-4">MAIS RÁPIDO!</h3>
								<h5 class="light grey-text text-darken-4">Nossas Ferramentas foram todas escritas em JavaScript, para maior velocidade e segurança.</h5>
							</div>
						</li>

						<li class="grey lighten-2">
							<div class="caption right-align">
								<h3 class="dark grey-text text-darken-4">CÓDIGO ABERTO!</h3>
								<h5 class="light grey-text text-darken-4">O Projeto 4People é de Código Aberto para qualquer um estudar os algoritmos e até mesmo melhorá-los.</h5>
							</div>
						</li>

						<li class="grey lighten-2">
							<div class="caption center-align">
								<h3 class="dark grey-text text-darken-4">O MAIS ATUALIZADO!</h3>
								<h5 class="light grey-text text-darken-4">O 4People possui as melhores ferramentas atualizadas. Tá sentindo falta de alguma? Por favor, nos envie um <a href="./contato/">e-mail</a>.</h5>
							</div>
						</li>
					</ul>
				</div>

				<div class="divider mt-2 mb-2"></div>

				<div class="row mb-0">
					<div class="col s12">
						<div class="card indigo z-depth-2">
							<div class="card-content white-text">
								<span class="card-title"><i class="material-icons left">trending_up</i>As 3 Ferramentas mais populares</span>
								<ul class="collection with-header mb-0">
									<li class="collection-item indigo">
										<div style="font-size:16px">Diferença entre Datas<a href="<?= $root ?>/matematica/calculo_de_datas/diferenca_entre_datas/" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
									</li>

									<li class="collection-item indigo">
										<div style="font-size:16px">Gerador de Senha<a href="<?= $root ?>/computacao/geradores/gerador_de_senha/" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
									</li>

									<li class="collection-item indigo">
										<div style="font-size:16px">Equação do 2° Grau<a href="<?= $root ?>/matematica/calculadoras/equacao_2_grau/" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
									</li>
								</ul>
							</div>

							<div class="top-div indigo darken-4"></div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card green z-depth-2">
							<div class="card-content white-text">
								<span class="card-title"><i class="material-icons left">accessibility</i>Usuários registrados</span>
								<p style="font-size:16px">Usuários que se registraram: 605</p>
							</div>

							<div class="top-div green darken-4"></div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card blue z-depth-2">
							<div class="card-content white-text">
								<span class="card-title"><i class="material-icons left">public</i>Usuários Online</span>
								<p style="font-size:16px">Usuários Online no 4People: 1</p>
							</div>

							<div class="top-div blue darken-4"></div>
						</div>
					</div>
				</div>

				<div class="row mb-0">
					<div class="col s12 l6">
						<div class="card teal z-depth-2">
							<div class="card-content white-text">
								<span class="card-title"><i class="material-icons left">group</i>Visitas</span>
								<p style="font-size:16px">Usuários que já visitaram: 1245</p>
							</div>

							<div class="top-div teal darken-4"></div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card red z-depth-2">
							<div class="card-content white-text">
								<span class="card-title"><i class="material-icons left">build</i>Ferramentas</span>
								<p style="font-size:16px">Quantidade de Ferramentas: 115</p>
							</div>

							<div class="top-div red darken-4"></div>
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
				Os algoritmos são públicos e de código aberto, não contendo acesso a dados existentes e de pessoas reais.
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

	<?php include_once("assets/components/footer.php") ?>

	<script src="assets/src/js/materialize.min.js"></script>
	<script src="assets/src/js/index.js"></script>
	<script src="assets/src/js/main.js"></script>
</body>

</html>
