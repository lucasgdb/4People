<?php include_once('../../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/material-icons.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/bars.css">
	<link rel="stylesheet" href="src/index.css">
	<title>Gerador de Senha - 4People</title>
	<?php include_once("$assets/components/meta_tags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Gerador de Senha - 4People">
	<meta name="description" content="Gerador de Senha Online para gerar senhas personalizadas e fortes. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./computacao/geradores/gerador_de_senha/">
	<meta property="og:title" content="Gerador de Senha - 4People">
	<meta name="twitter:title" content="Gerador de Senha - 4People">
	<meta property="og:url" content="./computacao/geradores/gerador_de_senha/">
	<meta name="twitter:url" content="./computacao/geradores/gerador_de_senha/">
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">autorenew</i>Gerador de Senha</h1>

				<label><?= $description ?></label>
				<div class="divider"></div>

				<div class="row mb-0">
					<p class="mb-0 col s12">Primeiro caractere</p>
					<div class="col s6 m3">
						<p>
							<label>
								<input class="with-gap" name="firstCharacter" type="radio" checked>
								<span>Número</span>
							</label>
						</p>
					</div>

					<div class="col s6 m3">
						<p>
							<label>
								<input class="with-gap" name="firstCharacter" type="radio">
								<span>Maiúsculo</span>
							</label>
						</p>
					</div>

					<div class="col s6 m3">
						<p>
							<label>
								<input class="with-gap" name="firstCharacter" type="radio">
								<span>Minúsculo</span>
							</label>
						</p>
					</div>

					<div class="col s6 m3">
						<p>
							<label>
								<input class="with-gap" name="firstCharacter" type="radio">
								<span>Especial</span>
							</label>
						</p>
					</div>
				</div>

				<div class="divider"></div>

				<div class="row mb-0">
					<p class="mb-0 col s12">Outros caracteres</p>
					<div class="col s6 m3">
						<p>
							<label>
								<input type="checkbox" checked>
								<span>Números</span>
							</label>
						</p>
					</div>

					<div class="col s6 m3">
						<p>
							<label>
								<input type="checkbox" checked>
								<span>Maiúsculos</span>
							</label>
						</p>
					</div>

					<div class="col s6 m3">
						<p>
							<label>
								<input type="checkbox" checked>
								<span>Minúsculos</span>
							</label>
						</p>
					</div>

					<div class="col s6 m3">
						<p>
							<label>
								<input type="checkbox">
								<span>Especiais</span>
							</label>
						</p>
					</div>
				</div>

				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Tamanho:</p>

							<div class="col s12">
								<div class="input-field">
									<input placeholder="Tamanho da senha" id="length" type="number" min="6" value="12">
								</div>
							</div>
						</div>
					</div>

					<div class="col s12 m6">
						<div class="row mb-0">
							<p class="mb-0 col s12">Caracteres adicionais:</p>

							<div class="input-field col s12">
								<input placeholder="E.g: ^<>:,.~´`'." id="additionalChars" type="text">
							</div>
						</div>
					</div>
				</div>

				<div class="divider"></div>

				<div class="row mb-0">
					<div class="col s12 m6">
						<p>
							<label>
								<input id="equalChars" type="checkbox" class="filled-in" checked>
								<span>Excluir Caracteres iguais (AA, ll, 22)</span>
							</label>
						</p>
					</div>

					<div class="col s12 m6">
						<p>
							<label>
								<input id="similarChars" type="checkbox" class="filled-in" checked>
								<span>Excluir Caracteres similares (lL, lj, O0)</span>
							</label>
						</p>
					</div>

					<div class="col s12 m6 l12">
						<p>
							<label>
								<input id="strength" type="checkbox" class="filled-in" checked>
								<span>Mostrar Força de Senha</span>
							</label>
						</p>
					</div>
				</div>

				<div class="divider mb-2"></div>
				<button title="Gerar Senha" class="btn btn-center waves-effect waves-light indigo darken-4 z-depth-2" onclick="generate()">
					Gerar senha
				</button>
				<div class="divider mt-2"></div>

				<p class="mb-2">Força de senha: <span id="passwordLength"></span></p>
				<textarea id="result" placeholder="Resultado" spellcheck="false" readonly></textarea>
				<button title="Copiar Senha" class="btn waves-effect waves-light indigo darken-4 mt-1 z-depth-0" onclick="copyResult()">
					Copiar
				</button>
				<button title="Salvar Senha" class="btn waves-effect waves-light indigo darken-4 mt-1 z-depth-0" onclick="savePassword()">
					Salvar
				</button>
				<button title="Limpar Senha" class="btn waves-effect waves-light indigo darken-4 mt-1 z-depth-0" onclick="clearInput()">
					Limpar
				</button>

				<div class="left-div indigo darken-4"></div>
			</div>

			<div class="card-panel left-div-margin">
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">trending_up</i>Veja também:</h1>
				<div class="divider"></div>

				<ul class="collection with-header mb-0">
					<li class="collection-item">
						<div>Gerador de Meta Tags<a href="<?= $root ?>/computacao/geradores/gerador_de_meta_tags/" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
					</li>
					<li class="collection-item">
						<div>Gerador de CPF<a href="<?= $root ?>/computacao/geradores/gerador_de_cpf/" class="secondary-content"><i class="material-icons indigo-text text-darken-4">send</i></a></div>
					</li>
				</ul>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= $assets ?>/algorithms/generators/passwordGenerator.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/fileSaver.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
