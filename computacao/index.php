<?php include_once('../assets/assets.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= "$assets/src/css/materialize.min.css" ?>">
	<link rel="stylesheet" href="<?= "$assets/src/css/main.css" ?>">
	<link rel="stylesheet" href="<?= "$assets/src/css/cards.css" ?>">
	<title>Computação - 4People</title>
	<?php include_once("$assets/components/metas.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="4People - Ferramentas Online">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./computacao/">
	<meta property="og:title" content="Computação - 4People">
	<meta name="twitter:title" content="Computação - 4People">
	<meta property="og:url" content="./computacao/">
	<meta name="twitter:url" content="./computacao/">
</head>

<body class="grey lighten-3">
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php")
	?>

	<ul id="slide-out" class="sidenav sidenav-fixed collapsible">
		<?php include_once("$assets/components/logo.php") ?>

		<li class="active">
			<div class="collapsible-header"><i class="material-icons">computer</i>Computação</div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<li>
						<?php include_once("$assets/components/computacao/geradores.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/computacao/validadores.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/computacao/funcoes_string.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/computacao/rede_e_internet.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/computacao/codif_decodif.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/computacao/tabelas_e_padroes.php") ?>
					</li>
				</ul>
			</div>
		</li>

		<li>
			<div class="collapsible-header"><i class="material-icons">functions</i>Matemática</div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<li>
						<?php include_once("$assets/components/matematica/calculadoras.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/matematica/calculo_de_areas.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/matematica/calculo_de_datas.php") ?>
					</li>
				</ul>
			</div>
		</li>

		<li>
			<div class="collapsible-header"><i class="material-icons">build</i>Outras Ferramentas</div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<li>
						<?php include_once("$assets/components/outras_ferramentas/dia_a_dia.php") ?>
					</li>

					<li>
						<?php include_once("$assets/components/outras_ferramentas/jogos.php") ?>
					</li>
				</ul>
			</div>
		</li>
	</ul>

	<main>
		<div class="container">
			<div class="card-panel left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">computer</i>Principais Ferramentas</h1>

				<label>Principais Ferramentas de Computação do 4People</label>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="card sticky-action">
							<div class="card-content grey lighten-2">
								<span class="card-title activator no-select">Gerador de CPF<i class="material-icons right">more_vert</i></span>
								<p>
									Gerador de CPF Online para Programadores testarem seus Softwares em desenvolvimento.
								</p>
							</div>

							<div class="card-action grey lighten-1">
								<a class="black-text no-break" href="./geradores/gerador_de_cpf/">Ferramenta &raquo;</a>
								<a class="black-text no-break" href="./geradores/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/CPFGenerator.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="card sticky-action">
							<div class="card-content grey lighten-2">
								<span class="card-title activator no-select">Gerador de Senha<i class="material-icons right">more_vert</i></span>
								<p>
									Gerador de Senha Online para gerar senhas personalizadas e fortes.
								</p>
							</div>

							<div class="card-action grey lighten-1">
								<a class="black-text no-break" href="./geradores/gerador_de_senha/">Ferramenta &raquo;</a>
								<a class="black-text no-break" href="./geradores/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/passwordGenerator.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="card sticky-action">
							<div class="card-content grey lighten-2">
								<span class="card-title activator no-select">Gerador de Meta Tags<i class="material-icons right">more_vert</i></span>
								<p>
									Gerador de Meta Tags Online, feito para gerar várias das Meta Tags existentes.
								</p>
							</div>

							<div class="card-action grey lighten-1">
								<a class="black-text no-break" href="./geradores/gerador_de_meta_tags/">Ferramenta &raquo;</a>
								<a class="black-text no-break" href="./geradores/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/metaTagsGenerator.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="card sticky-action">
							<div class="card-content grey lighten-2">
								<span class="card-title activator no-select">Validador de CPF<i class="material-icons right">more_vert</i></span>
								<p>
									Validador de CPF Online para Programadores testarem seus Softwares em desenvolvimento.
								</p>
							</div>

							<div class="card-action grey lighten-1">
								<a class="black-text no-break" href="./validadores/validador_de_cpf/">Ferramenta &raquo;</a>
								<a class="black-text no-break" href="./validadores/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/CPFValidator.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="card sticky-action">
							<div class="card-content grey lighten-2">
								<span class="card-title activator no-select">Contador de Caracteres<i class="material-icons right">more_vert</i></span>
								<p>
									Contador de Caracteres Online para contar os caracteres de um texto em vários níveis diferentes.
								</p>
							</div>

							<div class="card-action grey lighten-1">
								<a class="black-text no-break" href="./funcoes_string/contador_de_caracteres/">Ferramenta &raquo;</a>
								<a class="black-text no-break" href="./funcoes_string/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/charactersCount.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="card sticky-action">
							<div class="card-content grey lighten-2">
								<span class="card-title activator no-select">Meu IP<i class="material-icons right">more_vert</i></span>
								<p>
									Veja seu IP, localização, provedora, longitude, latitude, e muito mais.
								</p>
							</div>
							<div class="card-action grey lighten-1">
								<a class="black-text no-break" href="./rede_e_internet/meu_ip/">Ferramenta &raquo;</a>
								<a class="black-text no-break" href="./rede_e_internet/">Mais Ferramentas &raquo;</a>
							</div>
							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/LucasNaja/4People/blob/master/computacao/rede_e_internet/meu_ip/src/index.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="card sticky-action">
							<div class="card-content grey lighten-2">
								<span class="card-title activator no-select">Conversor de Código Binário<i class="material-icons right">more_vert</i></span>
								<p>
									Codificador e Decodificador de Código Binário Online para converter código binário em texto e vice-versa.
								</p>
							</div>
							<div class="card-action grey lighten-1">
								<a class="black-text no-break" href="./codif_decodif/conversor_binario/">Ferramenta &raquo;</a>
								<a class="black-text no-break" href="./codif_decodif/">Mais Ferramentas &raquo;</a>
							</div>
							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/binaryConverter.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>
				</div>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= "$assets/src/js/materialize.min.js" ?>"></script>
	<script src="<?= "$assets/src/js/main.js" ?>"></script>
</body>

</html>
