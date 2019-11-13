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
	<title>Gerador de Senha - 4People</title>
	<?php include_once("$assets/components/MetaTags.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="Gerador de Senha - 4People">
	<meta name="description" content="Gerador de Senha Online para gerar senhas personalizadas e fortes. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta property="og:title" content="Gerador de Senha - 4People">
	<meta name="twitter:title" content="Gerador de Senha - 4People">
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
				<h1 class="mont-serrat dark-grey-text" style="font-size:30px;margin:-5px 0 10px"><i class="material-icons left" style="top:5px"><?= $icon_section ?></i><?= $name_tool ?></h1>

				<label class="dark-grey-text"><?= $description_tool ?></label>
				<div class="divider"></div>

				<div class="row mb-0">
					<p class="mb-0 col s12">Primeiro caractere:</p>
					<div class="col s6 m3">
						<p>
							<label class="dark-grey-text">
								<input class="with-gap" name="firstCharacter" type="radio" checked>
								<span>Número</span>
							</label>
						</p>
					</div>

					<div class="col s6 m3">
						<p>
							<label class="dark-grey-text">
								<input class="with-gap" name="firstCharacter" type="radio">
								<span>Maiúsculo</span>
							</label>
						</p>
					</div>

					<div class="col s6 m3">
						<p>
							<label class="dark-grey-text">
								<input class="with-gap" name="firstCharacter" type="radio">
								<span>Minúsculo</span>
							</label>
						</p>
					</div>

					<div class="col s6 m3">
						<p>
							<label class="dark-grey-text">
								<input class="with-gap" name="firstCharacter" type="radio">
								<span>Especial</span>
							</label>
						</p>
					</div>
				</div>

				<div class="divider"></div>

				<div class="row mb-0">
					<p class="mb-0 col s12">Outros caracteres:</p>
					<div class="col s6 m3">
						<p>
							<label class="dark-grey-text">
								<input type="checkbox" checked>
								<span>Números</span>
							</label>
						</p>
					</div>

					<div class="col s6 m3">
						<p>
							<label class="dark-grey-text">
								<input type="checkbox" checked>
								<span>Maiúsculos</span>
							</label>
						</p>
					</div>

					<div class="col s6 m3">
						<p>
							<label class="dark-grey-text">
								<input type="checkbox" checked>
								<span>Minúsculos</span>
							</label>
						</p>
					</div>

					<div class="col s6 m3">
						<p>
							<label class="dark-grey-text">
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
							<label class="dark-grey-text">
								<input id="equalChars" type="checkbox" class="filled-in" checked>
								<span>Excluir Caracteres iguais (AA, ll, 22)</span>
							</label>
						</p>
					</div>

					<div class="col s12 m6">
						<p>
							<label class="dark-grey-text">
								<input id="similarChars" type="checkbox" class="filled-in" checked>
								<span>Excluir Caracteres similares (lL, lj, O0)</span>
							</label>
						</p>
					</div>

					<div class="col s12 m6">
						<p>
							<label class="dark-grey-text">
								<input id="strength" type="checkbox" class="filled-in" checked>
								<span>Mostrar Força de Senha</span>
							</label>
						</p>
					</div>
				</div>

				<div class="divider mb-2"></div>
				<button title="Gerar Senha" class="btn btn-center waves-effect waves-light red-color z-depth-0" onclick="generate()">
					Gerar senha
				</button>
				<div class="divider mt-2 mb-2"></div>

				<p>Força de senha: <span id="passwordLength"></span></p>
				<textarea id="result" placeholder="Resultado" spellcheck="false" readonly></textarea>
				<button title="Copiar Senha" class="btn waves-effect waves-light dark-grey mt-1 z-depth-0" onclick="copyResult()">
					<i class="material-icons left">content_copy</i>Copiar
				</button>
				<button title="Salvar Senha" class="btn waves-effect waves-light dark-grey mt-1 z-depth-0" onclick="savePassword()">
					<i class="material-icons left">save</i>Salvar
				</button>
				<button title="Limpar Senha" class="btn waves-effect waves-light dark-grey mt-1 z-depth-0" onclick="clearInput()">
					<i class="material-icons left">clear</i>Limpar
				</button>

				<div class="top-div dark-grey"></div>
			</div>

			<?php include_once("$assets/components/MoreTools.php") ?>
		</div>
	</main>

	<?php
	include_once("$assets/components/FixedActionButton.php");
	include_once("$assets/components/Footer.php");
	include_once("$assets/components/ServiceWorker.php")
	?>

	<script src="<?= $assets ?>/algorithms/generators/passwordGenerator.js"></script>
	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/fileSaver.min.js"></script>
	<script src="src/index.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
