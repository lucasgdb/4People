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
	<title>Porcentagem - 4People</title>
	<?php include_once("$assets/components/MetaTags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Porcentagem - 4People">
	<meta name="description" content="Calculadora Online para encontrar a porcentagem. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="Porcentagem - 4People">
	<meta name="twitter:title" content="Porcentagem - 4People">
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
					<div class="col s12">
						Quanto é
						<div class="input-field mt-2 mb-0 inline lesser">
							<input id="firstNumber" type="number" placeholder="Ex: 50" step="any">
						</div>
						% de
						<div class="input-field mt-2 mb-0 inline lesser">
							<input id="secondNumber" type="number" placeholder="Ex: 100" step="any">
						</div>
						?
						<div class="input-field mt-2 mb-0 inline">
							<textarea id="firstResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
						</div>
					</div>

					<div class="col s12">
						<button title="Calcular" class="btn waves-effect waves-light red-color z-depth-0" onclick="calculateFirst()">
							Calcular
						</button>

						<button title="Copiar" class="btn waves-effect waves-light dark-grey z-depth-0" onclick="copyResult(txtFirstResult)">
							Copiar
						</button>
					</div>
				</div>

				<div class="divider mt-2"></div>

				<div class="row mb-0">
					<div class="col s12">
						O valor
						<div class="input-field mt-2 mb-0 inline lesser">
							<input id="thirdNumber" type="number" placeholder="Ex: 50" step="any">
						</div>
						é qual porcentagem de
						<div class="input-field mt-2 mb-0 inline lesser">
							<input id="fourthNumber" type="number" placeholder="Ex: 100" step="any">
						</div>
						?
						<div class="input-field mt-2 mb-0 inline">
							<textarea id="secondResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
						</div>
					</div>

					<div class="col s12">
						<button title="Calcular" class="btn waves-effect waves-light red-color z-depth-0" onclick="calculateSecond()">
							Calcular
						</button>

						<button title="Copiar" class="btn waves-effect waves-light dark-grey z-depth-0" onclick="copyResult(txtSecondResult)">
							Copiar
						</button>
					</div>
				</div>

				<div class="divider mt-2"></div>

				<div class="row mb-0">
					<div class="col s12">
						O valor
						<div class="input-field mt-2 mb-0 inline lesser">
							<input id="fifthNumber" type="number" placeholder="Ex: 50" step="any">
						</div>
						aumentou para
						<div class="input-field mt-2 mb-0 inline lesser">
							<input id="sixthNumber" type="number" placeholder="Ex: 100" step="any">
						</div>
						. Qual foi seu aumento percentual?
						<div class="input-field mt-2 mb-0 inline">
							<textarea id="thirdResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
						</div>
					</div>

					<div class="col s12">
						<button title="Calcular" class="btn waves-effect waves-light red-color z-depth-0" onclick="calculateThird()">
							Calcular
						</button>

						<button title="Copiar" class="btn waves-effect waves-light dark-grey z-depth-0" onclick="copyResult(txtThirdResult)">
							Copiar
						</button>
					</div>
				</div>

				<div class="divider mt-2"></div>

				<div class="row mb-0">
					<div class="col s12">
						O valor
						<div class="input-field mt-2 mb-0 inline lesser">
							<input id="seventhNumber" type="number" placeholder="Ex: 50" step="any">
						</div>
						diminuiu para
						<div class="input-field mt-2 mb-0 inline lesser">
							<input id="eighthNumber" type="number" placeholder="Ex: 100" step="any">
						</div>
						. Qual foi sua diminuição porcentual?
						<div class="input-field mt-2 mb-0 inline">
							<textarea id="fourthResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
						</div>
					</div>

					<div class="col s12">
						<button title="Calcular" class="btn waves-effect waves-light red-color z-depth-0" onclick="calculateFourth()">
							Calcular
						</button>

						<button title="Copiar" class="btn waves-effect waves-light dark-grey z-depth-0" onclick="copyResult(txtFourthResult)">
							Copiar
						</button>
					</div>
				</div>

				<div class="divider mt-2"></div>

				<div class="row mb-0">
					<div class="col s12">
						O valor
						<div class="input-field mt-2 mb-0 inline lesser">
							<input id="ninthNumber" type="number" placeholder="Ex: 50" step="any">
						</div>
						sobre o valor
						<div class="input-field mt-2 mb-0 inline lesser">
							<input id="tenthNumber" type="number" placeholder="Ex: 100" step="any">
						</div>
						são quantos %?
						<div class="input-field mt-2 mb-0 inline">
							<textarea id="fifthResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
						</div>
					</div>

					<div class="col s12">
						<button title="Calcular" class="btn waves-effect waves-light red-color z-depth-0" onclick="calculateFifth()">
							Calcular
						</button>

						<button title="Copiar" class="btn waves-effect waves-light dark-grey z-depth-0" onclick="copyResult(txtFifthResult)">
							Copiar
						</button>
					</div>
				</div>

				<div class="divider mt-2"></div>

				<div class="row mb-0">
					<div class="col s12">
						O valor
						<div class="input-field mt-2 mb-0 inline lesser">
							<input id="eleventhNumber" type="number" placeholder="Ex: 50" step="any">
						</div>
						mais
						<div class="input-field mt-2 mb-0 inline lesser">
							<input id="twelfthNumber" type="number" placeholder="Ex: 100" step="any">
						</div>
						% dá que resultado?
						<div class="input-field mt-2 mb-0 inline">
							<textarea id="sixthResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
						</div>
					</div>

					<div class="col s12">
						<button title="Calcular" class="btn waves-effect waves-light red-color z-depth-0" onclick="calculateSixth()">
							Calcular
						</button>

						<button title="Copiar" class="btn waves-effect waves-light dark-grey z-depth-0" onclick="copyResult(txtSixthResult)">
							Copiar
						</button>
					</div>
				</div>

				<div class="divider mt-2"></div>

				<div class="row mb-0">
					<div class="col s12">
						O valor
						<div class="input-field mt-2 mb-0 inline lesser">
							<input id="thirteenthNumber" type="number" placeholder="Ex: 50" step="any">
						</div>
						menos
						<div class="input-field mt-2 mb-0 inline lesser">
							<input id="fourteenthNumber" type="number" placeholder="Ex: 100" step="any">
						</div>
						% dá que resultado?
						<div class="input-field mt-2 mb-0 inline">
							<textarea id="seventhResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
						</div>
					</div>

					<div class="col s12">
						<button title="Calcular" class="btn waves-effect waves-light red-color z-depth-0" onclick="calculateSeventh()">
							Calcular
						</button>

						<button title="Copiar" class="btn waves-effect waves-light dark-grey z-depth-0" onclick="copyResult(txtSeventhResult)">
							Copiar
						</button>
					</div>
				</div>

				<div class="divider mt-2"></div>

				<div class="row mb-0">
					<div class="col s12">
						O valor X aumentou em
						<div class="input-field mt-2 mb-0 inline lesser">
							<input id="fifteenthNumber" type="number" placeholder="Ex: 50" step="any">
						</div>
						% para
						<div class="input-field mt-2 mb-0 inline lesser">
							<input id="sixteenthNumber" type="number" placeholder="Ex: 100" step="any">
						</div>
						. Qual o valor X?
						<div class="input-field mt-2 mb-0 inline">
							<textarea id="eighthResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
						</div>
					</div>

					<div class="col s12">
						<button title="Calcular" class="btn waves-effect waves-light red-color z-depth-0" onclick="calculateEighth()">
							Calcular
						</button>

						<button title="Copiar" class="btn waves-effect waves-light dark-grey z-depth-0" onclick="copyResult(txtEighthResult)">
							Copiar
						</button>
					</div>
				</div>

				<div class="divider mt-2"></div>

				<div class="row mb-0">
					<div class="col s12">
						O valor X diminuiu em
						<div class="input-field mb-0 inline lesser">
							<input id="seventeenthNumber" type="number" placeholder="Ex: 50" step="any">
						</div>
						% para
						<div class="input-field mb-0 inline lesser">
							<input id="eighteenthNumber" type="number" placeholder="Ex: 100" step="any">
						</div>
						. Qual o valor X?
						<div class="input-field mb-0 inline">
							<textarea id="ninthResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
						</div>
					</div>

					<div class="col s12">
						<button title="Calcular" class="btn waves-effect waves-light red-color z-depth-0" onclick="calculateNinth()">
							Calcular
						</button>

						<button title="Copiar" class="btn waves-effect waves-light dark-grey z-depth-0" onclick="copyResult(txtNinthResult)">
							Copiar
						</button>
					</div>
				</div>

				<div class="top-div dark-grey"></div>
			</div>

			<?php include_once("$assets/components/MoreTools.php") ?>
		</div>
	</main>

	<?php
	include_once("$assets/components/Footer.php");
	include_once("$assets/components/ServiceWorker.php")
	?>

	<script src="<?= $assets ?>/algorithms/calculators/percentage.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
