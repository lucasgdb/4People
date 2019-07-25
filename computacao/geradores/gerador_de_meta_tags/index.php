<?php include_once('../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Gerador de Meta Tags - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Gerador de Meta Tags - 4People">
	<meta name="description" content="Gerar Meta Tags Online. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./computacao/geradores/gerador_de_meta_tags/">
	<meta property="og:title" content="Gerador de Meta Tags - 4People">
	<meta name="twitter:title" content="Gerador de Meta Tags - 4People">
	<meta property="og:url" content="./computacao/geradores/gerador_de_meta_tags/">
	<meta name="twitter:url" content="./computacao/geradores/gerador_de_meta_tags/">
</head>

<body class="grey lighten-3">
	<?php
	include_once("$assets/components/noscript.php");
	include_once("$assets/components/spinner.php");
	include_once("$assets/components/header.php");
	include_once("$assets/components/sidenav.php")
	?>

	<main>
		<div class="container">
			<div class="card-panel left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">autorenew</i>Gerador de Meta Tags</h1>

				<label><?= $description ?></label>
				<div class="divider"></div>

				<h5>Informações</h5>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Nome do site:</p>

							<div class="input-field col s12">
								<input id="siteName" type="text" placeholder="Ex: 4People">
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Autor do site:</p>

							<div class="input-field col s12">
								<input id="author" type="text" placeholder="Ex: Lucas Bittencourt">
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Copyright:</p>

							<div class="input-field col s12">
								<input id="copyright" type="text" placeholder="Ex: © 4People - 2019">
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Linguagens do site:</p>

							<div class="input-field col s12">
								<input id="languages" type="text" placeholder="Ex: pt-br, en-US, fr">
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">IDE ou Editor de Texto utilizado:</p>

							<div class="input-field col s12">
								<input id="generator" type="text" placeholder="Ex: Microsoft Visual Studio Code">
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Classificação:</p>

							<div class="input-field col s12">
								<select id="rating">
									<option value="general" selected>Todas as idades</option>
									<option value="14 years">Censura 14 anos</option>
									<option value="mature">A partir de 18 anos</option>
								</select>
							</div>
						</div>
					</div>

					<p class="mb-0 col s12">Título do site. Caracteres usados: <span id="titleCount">0</span>. Recomendado: 63-90</p>
					<div class="input-field col s12">
						<input oninput="countCharacters(event, titleCount)" id="title" type="text" placeholder="Ex: 4People - Ferramentas Online">
					</div>

					<p class="mb-0 col s12">Descrição do site: Caracteres usados: <span id="descCount">0</span>. Recomendado: 160-300</p>
					<div class="input-field col s12">
						<input oninput="countCharacters(event, descCount)" id="description" type="text" placeholder="Ex. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
					</div>

					<p class="mb-0 col s12">Palavras-chave do site: Caracteres usados: <span id="keywordCount">0</span>. Recomendado: 160-200</p>
					<div class="input-field col s12">

						<input oninput="countCharacters(event, keywordCount)" id="keywords" type="text" placeholder="Ex: 4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
					</div>
				</div>

				<h5>Viewport</h5>
				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m4">
						<div class="row mb-0">
							<p class="mb-0 col s12">Escala inicial:</p>

							<div class="input-field col s12">
								<input id="initialScale" type="number" placeholder="1.0" min="0.0" max="2.0" step="0.1" value="1.0">
							</div>
						</div>
					</div>

					<div class="col s12 m4">
						<div class="row mb-0">
							<p class="mb-0 col s12">Escala mínima:</p>
							<div class="input-field col s12">
								<input id="minimumScale" type="number" placeholder="0.0" min="0.0" max="2.0" step="0.1" value="0.0">
							</div>
						</div>
					</div>

					<div class="col s12 m4">
						<div class="row mb-0">
							<p class="mb-0 col s12">Escala máxima:</p>
							<div class="input-field col s12">
								<input id="maximumScale" type="number" placeholder="2.0" min="0.0" max="2.0" step="0.1" value="2.0">
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Escalável:</p>

							<div class="col s12">
								<p>
									<label>
										<input class="with-gap" name="scalable" type="radio" checked>
										<span>Sim</span>
									</label>

									<label class="ml-4">
										<input class="with-gap" name="scalable" type="radio">
										<span>Não</span>
									</label>
								</p>
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Encolher para caber:</p>

							<div class="col s12">
								<p>
									<label>
										<input class="with-gap" name="shrinkToFit" type="radio" checked>
										<span>Sim</span>
									</label>

									<label class="ml-4">
										<input class="with-gap" name="shrinkToFit" type="radio">
										<span>Não</span>
									</label>
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="divider mb-2"></div>
				<button title="Gerar Meta Tags" class="btn btn-center waves-effect waves-light indigo darken-4 z-depth-2" onclick="generate()">
					Gerar Meta Tags
				</button>
				<div class="divider mt-2"></div>

				<textarea class="mt-2" id="result" placeholder="Resultado" spellcheck="false" readonly></textarea>
				<button title="Copiar Meta Tags" class="btn waves-effect waves-light indigo darken-4 mt-1 z-depth-0" onclick="copyResult()">
					Copiar
				</button>
				<button title="Salvar Meta Tags" class="btn waves-effect waves-light indigo darken-4 mt-1 z-depth-0" onclick="saveMetaTags()">
					Salvar
				</button>
				<button title="Limpar Meta Tags" class="btn waves-effect waves-light indigo darken-4 mt-1 z-depth-0" onclick="clearInput()">
					Limpar
				</button>

				<div class="left-div indigo darken-4"></div>
			</div>

			<div class="card-panel left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">trending_up</i>Veja também:</h1>
				<div class="divider"></div>

				<ul class="collection with-header mb-0">
					<li class="collection-item">
						<div>Gerador de Senhas<a href="<?= $root ?>/" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
					</li>
					<li class="collection-item">
						<div>Gerador de Cartão de Crédito<a href="<?= $root ?>/" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
					</li>
				</ul>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= $assets ?>/algorithms/generators/metaTagsGenerator.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/fileSaver.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
