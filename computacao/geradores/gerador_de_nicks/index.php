<?php include_once('../../../assets/asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= "$return/src/css/materialize.min.css" ?>">
	<link rel="stylesheet" href="<?= "$return/src/css/main.css" ?>">
	<link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
	<title>Gerador de Nicks - 4People</title>
	<?php include_once("$path/components/metas.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Gerador de Nicks - 4People">
	<meta name="description" content="Gerador de Nicks OnLine para gerar nicks aleatórios. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./computacao/geradores/gerador_de_nicks/">
	<meta property="og:title" content="Gerador de Nicks - 4People">
	<meta name="twitter:title" content="Gerador de Nicks - 4People">
	<meta property="og:url" content="./computacao/geradores/gerador_de_nicks/">
	<meta name="twitter:url" content="./computacao/geradores/gerador_de_nicks/">
</head>

<body>
	<?php
	include_once("$path/components/noscript.php");
	include_once("$path/components/spinner.php");
	include_once("$path/components/header.php")
	?>

	<ul id="slide-out" class="sidenav sidenav-fixed collapsible">
		<?php include_once("$path/components/logo.php") ?>

		<li class="active">
			<div class="collapsible-header"><i class="material-icons">computer</i>Computação</div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<li class="active">
						<?php include_once("$path/components/computacao/geradores.php") ?>
					</li>

					<li>
						<?php include_once("$path/components/computacao/validadores.php") ?>
					</li>

					<li>
						<?php include_once("$path/components/computacao/funcoes_string.php") ?>
					</li>

					<li>
						<?php include_once("$path/components/computacao/rede_e_internet.php") ?>
					</li>

					<li>
						<?php include_once("$path/components/computacao/codif_decodif.php") ?>
					</li>

					<li>
						<?php include_once("$path/components/computacao/tabelas_e_padroes.php") ?>
					</li>
				</ul>
			</div>
		</li>

		<li>
			<div class="collapsible-header"><i class="material-icons">functions</i>Matemática</div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<li>
						<?php include_once("$path/components/matematica/calculadoras.php") ?>
					</li>

					<li>
						<?php include_once("$path/components/matematica/calculo_de_areas.php") ?>
					</li>

					<li>
						<?php include_once("$path/components/matematica/calculo_de_datas.php") ?>
					</li>
				</ul>
			</div>
		</li>

		<li>
			<div class="collapsible-header"><i class="material-icons">build</i>Outras Ferramentas</div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<li>
						<?php include_once("$path/components/outras_ferramentas/dia_a_dia.php") ?>
					</li>

					<li>
						<?php include_once("$path/components/outras_ferramentas/jogos.php") ?>
					</li>
				</ul>
			</div>
		</li>
	</ul>

	<main class="grey lighten-5">
		<div class="container">
			<div class="card-panel">
				<h1 class="flow-text mt-2">Gerador de Nicks</h1>

				<label>Gerador de Nicks OnLine para gerar diversos tipos de nicks aleatórios.</label>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="input-field col s12">
						<select>
							<option value="1" onclick="generate()" selected>Apartir do seu nome</option>
							<option value="2" onclick="generate()">Aleatório</option>
							<option value="3" onclick="generate()">Nome + Adjetivo</option>
							<option value="4" onclick="generate()">Antes do seu nome</option>
							<option value="5" onclick="generate()">Depois do seu nome</option>
						</select>
					</div>

					<p class="mb-0 col s12">Digite seu nome:</p>
					<div class="col s12 areaText">
						<div class="input-field">
							<input id="name" type="text" placeholder="Digite aqui o seu nome" step="any">
						</div>
					</div>
				</div>

				<button title="Gerar Nicks" class="btn btn-center waves-effect waves-dark black-text white" style="margin-top:10px;" onclick="generate()">Gerar Nicks</button>
				<div class="divider mt-2"></div>

				<div class="row mt-2 mb-0" id="areaResult">
					<div class="card col s5 left"><i class="material-icons right copycontent">content_copy</i>
						<p id="result"></p>
					</div>
					<div class="card col s5 left"><i class="material-icons right copycontent">content_copy</i>
						<p id="result"></p>
					</div>
					<div class="card col s5 left"><i class="material-icons right copycontent">content_copy</i>
						<p id="result"></p>
					</div>
					<div class="card col s5 left"><i class="material-icons right copycontent">content_copy</i>
						<p id="result"></p>
					</div>
					<div class="card col s5 left"><i class="material-icons right copycontent">content_copy</i>
						<p id="result"></p>
					</div>
					<div class="card col s5 left"><i class="material-icons right copycontent">content_copy</i>
						<p id="result"></p>
					</div>
					<div class="card col s5 left"><i class="material-icons right copycontent">content_copy</i>
						<p id="result"></p>
					</div>
					<div class="card col s5 left"><i class="material-icons right copycontent">content_copy</i>
						<p id="result"></p>
					</div>
					<div class="card col s5 left"><i class="material-icons right copycontent">content_copy</i>
						<p id="result"></p>
					</div>
					<div class="card col s5 left"><i class="material-icons right copycontent">content_copy</i>
						<p id="result"></p>
					</div>
					<div class="card col s5 left"><i class="material-icons right copycontent">content_copy</i>
						<p id="result"></p>
					</div>
					<div class="card col s5 left"><i class="material-icons right copycontent">content_copy</i>
						<p id="result"></p>
					</div>
				</div>
			</div>
		</div>
	</main>

	<?php include_once("$path/components/footer.php") ?>

	<script src="<?= "$return/algorithms/nickGenerator.js" ?>"></script>
	<script src="<?= "$return/src/js/materialize.min.js" ?>"></script>
	<script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
	<script src="<?= "$return/src/js/main.js" ?>"></script>
</body>

</html>