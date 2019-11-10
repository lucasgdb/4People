<?php
$root = '../../../..';
include_once("$root/assets/assets.php")
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="src/index.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<title>Gerador de RG - 4People</title>
	<?php include_once("$assets/components/MetaTags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Gerador de RG - 4People">
	<meta name="description" content="Gerador de RG Online para gerar RGs verdadeiros. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="Gerador de RG - 4People">
	<meta name="twitter:title" content="Gerador de RG - 4People">
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
				<h1 class="mont-serrat dark-grey-text" style="font-size:30px;margin:0 0 5px"><i class="material-icons left" style="top:5px"><?= $icon_section ?></i><?= $name_tool ?></h1>

				<label class="dark-grey-text"><?= $description_tool ?></label>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Gerar com pontuação:</p>

							<div class="col s12">
								<p>
									<label>
										<input class="with-gap" name="punctuation" type="radio" checked>
										<span>Sim</span>
									</label>

									<label class="ml-4">
										<input class="with-gap" name="punctuation" type="radio">
										<span>Não</span>
									</label>
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="divider mb-2"></div>
				<button title="Gerar RG" class="btn btn-center waves-effect waves-light red-color z-depth-2" onclick="generate()">
					Gerar RG
				</button>
				<div class="divider mt-2"></div>

				<textarea class="mt-2" id="result" placeholder="Resultado" spellcheck="false" readonly></textarea>
				<button title="Copiar RG" class="btn waves-effect waves-light dark-grey mt-1 z-depth-0" onclick="copyResult()">
					<i class="material-icons left">content_copy</i>Copiar
				</button>
				<button title="Limpar RG" class="btn waves-effect waves-light dark-grey mt-1 z-depth-0" onclick="clearInput()">
					<i class="material-icons left">clear</i>Limpar
				</button>

				<div class="top-div dark-grey"></div>
			</div>

			<?php include_once("$assets/components/MoreTools.php") ?>
		</div>
	</main>

	<div id="agreeModal" class="modal">
		<div class="modal-content left-div-margin">
			<h4><i class="material-icons left red-color-text" style="top:7px">warning</i>IMPORTANTE</h4>

			<blockquote style="border-left-color:#a62023">
				Nosso gerador online de RG tem como intenção ajudar estudantes, programadores, analistas e testadores a gerar RGs válidos. Normalmente necessários parar testar seus softwares em desenvolvimento.
				A má utilização dos dados aqui gerados é de total responsabilidade do usuário.
				Os números são gerados de forma aleatória, respeitando as regras de criação de cada documento.
			</blockquote>

			<div class="left-div dark-grey"></div>
		</div>

		<div class="modal-footer">
			<div class="divider"></div>

			<a class="btn waves-effect waves-light red-color" title="Não concordar" href="../"><i class="material-icons left">thumb_down</i>Não concordo</a>
			<button class="btn waves-effect modal-close waves-light green darken-3" title="Concordar"><i class="material-icons left">thumb_up</i>Concordo</button>
		</div>
	</div>

	<?php
	include_once("$assets/components/FixedActionButton.php");
	include_once("$assets/components/Footer.php");
	include_once("$assets/components/ServiceWorker.php")
	?>

	<script src="<?= $assets ?>/algorithms/generators/RGGenerator.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
