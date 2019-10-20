<?php
$root = '../../../..';
include_once("$root/assets/assets.php")
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Área do Setor Circular - 4People</title>
	<?php include_once("$assets/components/MetaTags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Área do Setor Circular - 4People">
	<meta name="description" content="Calcular área do Setor Circular. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="Área do Setor Circular - 4People">
	<meta name="twitter:title" content="Área do Setor Circular - 4People">
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
				<h1 class="mont-serrat" style="font-size:30px;margin:5px 0 5px 0"><i class="material-icons left" style="top:5px"><?= $icon_section ?></i><?= $name_tool ?></h1>

				<label><?= $description_tool ?></label>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Raio:</p>
							<div class="input-field col s12">
								<input id="radius" type="number" placeholder="Digite aqui o Raio." min="0" value="10" step="any">
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Ângulo:</p>
							<div class="input-field col s12">
								<input id="angle" type="number" placeholder="Digite aqui o Ângulo." min="0" value="5" step="any">
							</div>
						</div>
					</div>

					<div class="col s12 m6">
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

					<div class="col s12 m6">
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
				<button title="Calcular Área" class="btn btn-center waves-effect waves-light red-color z-depth-2" onclick="calculate()">
					Calcular área
				</button>
				<div class="divider mt-2"></div>

				<textarea class="mt-2" id="result" placeholder="Resultado" spellcheck="false" readonly></textarea>
				<button title="Copiar Área" class="btn waves-effect waves-light dark-grey mt-1 z-depth-0" onclick="copyResult()">
					Copiar
				</button>
				<button title="Limpar" class="btn waves-effect waves-light dark-grey mt-1 z-depth-0" onclick="clearInput()">
					Limpar
				</button>

				<div class="top-div dark-grey"></div>
			</div>

			<?php include_once("$assets/components/MoreTools.php") ?>
		</div>
	</main>

	<?php
	include_once("$assets/components/Footer.php");
	include_once("$assets/components/ServiceWorker.php")
	?>

	<script src="<?= $assets ?>/algorithms/areas_calculator/circularSectorArea.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
