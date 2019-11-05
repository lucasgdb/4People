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
	<title>Área do Círculo - 4People</title>
	<?php include_once("$assets/components/MetaTags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Área do Círculo - 4People">
	<meta name="description" content="Calcular área do círculo. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="Área do Círculo - 4People">
	<meta name="twitter:title" content="Área do Círculo - 4People">
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
				<h1 class="mont-serrat" style="font-size:30px;margin:0 0 5px"><i class="material-icons left" style="top:5px"><?= $icon_section ?></i><?= $name_tool ?></h1>

				<label><?= $description_tool ?></label>
				<div class="divider"></div>

				<div class="row mb-0">
					<p class="mb-0 col s12">Fórmulas:</p>

					<div class="col s12">
						<p>
							<label>
								<input class="with-gap" name="formula" type="radio" checked />
								<span>Fórmula do Raio (PI * R²)</span>
							</label>

							<label class="ml-4">
								<input class="with-gap" name="formula" type="radio" />
								<span>Fórmula do Diâmetro (PI * D² / 4)</span>
							</label>
						</p>
					</div>
				</div>

				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m6 l4">
						<div class="row mb-0">
							<p class="mb-0 col s12" id="formulasName">Raio:</p>
							<div class="input-field col s12">
								<input id="number" type="number" placeholder="Digite aqui o Raio." min="0" value="1" step="any">
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
				<button title="Calcular Área" class="btn btn-center waves-effect waves-light red-color z-depth-2" onclick="calculate()">
					Calcular área
				</button>
				<div class="divider mt-2"></div>

				<textarea class="mt-2" id="result" placeholder="Resultado" spellcheck="false" readonly></textarea>
				<button title="Copiar Área" class="btn waves-effect waves-light dark-grey mt-1 z-depth-0" onclick="copyResult()">
					<i class="material-icons left">content_copy</i>Copiar
				</button>
				<button title="Limpar" class="btn waves-effect waves-light dark-grey mt-1 z-depth-0" onclick="clearInput()">
					<i class="material-icons left">clear</i>Limpar
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

	<script src="<?= $assets ?>/algorithms/areas_calculator/circleArea.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
