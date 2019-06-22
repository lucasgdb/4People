<?php include_once('../../../assets/assets.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= "$assets/src/css/materialize.min.css" ?>">
	<link rel="stylesheet" href="<?= "$assets/src/css/main.css" ?>">
	<link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
	<title>Área do Quadrado - 4People</title>
	<?php include_once("$assets/components/metas.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Área do Quadrado - 4People">
	<meta name="description" content="Calcular área do Quadrado. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./matematica/calculo_de_areas/area_do_quadrado/">
	<meta property="og:title" content="Área do Quadrado - 4People">
	<meta name="twitter:title" content="Área do Quadrado - 4People">
	<meta property="og:url" content="./matematica/calculo_de_areas/area_do_quadrado/">
	<meta name="twitter:url" content="./matematica/calculo_de_areas/area_do_quadrado/">
</head>

<body class="grey lighten-3">
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php")
	?>

	<ul id="slide-out" class="sidenav sidenav-fixed collapsible">
		<?php include_once("$assets/components/logo.php") ?>

		<li>
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

		<li class="active">
			<div class="collapsible-header"><i class="material-icons">functions</i>Matemática</div>
			<div class="collapsible-body">
				<ul class="collapsible padding-headers">
					<li>
						<?php include_once("$assets/components/matematica/calculadoras.php") ?>
					</li>

					<li class="active">
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">functions</i>Área do Quadrado</h1>

				<label>Calculador de Área do Quadrado Online. Área do Quadrado: Lado * Lado ou L²</label>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m6 l4">
						<div class="row mb-0">
							<p class="mb-0 col s12">Lado:</p>
							<div class="input-field col s12">
								<input id="side" type="number" placeholder="Digite aqui o raio." min="0" value="10" step="any">
							</div>
						</div>
					</div>

					<div class="col s12 m6 l4">
						<div class="row mb-0">
							<p class="mb-0 col s12">Medida:</p>
							<div class="input-field col s12">
								<select id="measure">
									<option value="km">Kilômetros</option>
									<option value="hm">Hectômetros</option>
									<option value="dam">Decâmetros</option>
									<option value="m" selected>Metros</option>
									<option value="dm">Decímetros</option>
									<option value="cm">Centímetros</option>
									<option value="mm">Milímetros</option>
								</select>
							</div>
						</div>
					</div>

					<div class="col s12 m6 l4">
						<div class="row mb-0">
							<p class="mb-0 col s12">Casas decimais:</p>
							<div class="input-field col s12">
								<select id="decimal">
									<option value="0">Nenhuma</option>
									<option value="1">1</option>
									<option value="2" selected>2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									<option value="8">8</option>
									<option value="9">9</option>
									<option value="10">10</option>
									<option value="15">15</option>
									<option value="20">20</option>
									<option value="30">30</option>
									<option value="48">48</option>
									<option value="-1">Automática</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				<div class="divider mb-2"></div>
				<button title="Calcular Área" class="btn btn-center waves-effect waves-light indigo darken-4 z-depth-2" onclick="calculate()">
					Calcular área
				</button>
				<div class="divider mt-2"></div>

				<textarea class="mt-2" id="result" placeholder="Resultado" spellcheck="false" readonly></textarea>
				<button title="Copiar Área" class="btn waves-effect waves-light indigo darken-4" onclick="copyResult()">
					Copiar
				</button>

				<div class="left-div indigo darken-4"></div>
			</div>

			<div class="card-panel left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">trending_up</i>Veja também:</h1>
				<div class="divider"></div>

				<ul class="collection with-header mb-0">
					<li class="collection-item">
						<div>Gerador de Senhas<a href="#!" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
					</li>
					<li class="collection-item">
						<div>Gerador de Cartão de Crédito<a href="#!" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
					</li>
				</ul>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= "$assets/algorithms/squareArea.js" ?>"></script>
	<script src="<?= "$assets/src/js/materialize.min.js" ?>"></script>
	<script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
	<script src="<?= "$assets/src/js/main.js" ?>"></script>
</body>

</html>
