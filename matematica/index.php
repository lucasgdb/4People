<?php include_once('../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
	<link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
	<link rel="stylesheet" href="<?= $assets ?>/src/css/cards.css">
	<title>Matemática - 4People</title>
	<?php include_once("$assets/components/metas.php") ?>
	<meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
	<meta name="title" content="4People - Ferramentas Online">
	<meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
	<meta name="application-name" content="4People">
	<meta name="msapplication-starturl" content="./matematica/">
	<meta property="og:title" content="Matemática - 4People">
	<meta name="twitter:title" content="Matemática - 4People">
	<meta property="og:url" content="./matematica/">
	<meta name="twitter:url" content="./matematica/">
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
				<h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">functions</i>Principais Ferramentas</h1>

				<label>Principais Ferramentas de Matemática do 4People</label>
				<div class="divider mb-2"></div>

				<div class="row mb-0">
					<div class="col s12 l6">
						<div class="card sticky-action z-depth-2">
							<div class="card-content grey lighten-5">
								<span class="card-title activator no-select">Fatorar Número<i class="material-icons right">more_vert</i></span>
								<p>
									Calculadora para Fatorar Números Online.
								</p>
							</div>

							<div class="card-action indigo darken-4">
								<a class="white-text no-break" href="./calculadoras/fatorar_numero/">Ferramenta &raquo;</a>
								<a class="white-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal grey lighten-5">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/lucasnaja/4People/blob/master/assets/algorithms/factorization.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card sticky-action z-depth-2">
							<div class="card-content grey lighten-5">
								<span class="card-title activator no-select">Máximo Divisor Comum<i class="material-icons right">more_vert</i></span>
								<p>
									Calculadora Online para encontrar o Máximo Divisor Comum entre vários números.
								</p>
							</div>

							<div class="card-action indigo darken-4">
								<a class="white-text no-break" href="./calculadoras/mdc/">Ferramenta &raquo;</a>
								<a class="white-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/lucasnaja/4People/blob/master/assets/algorithms/GCD.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-0">
					<div class="col s12 l6">
						<div class="card sticky-action z-depth-2">
							<div class="card-content grey lighten-5">
								<span class="card-title activator no-select">Mínimo Múltiplo Comum<i class="material-icons right">more_vert</i></span>
								<p>
									Calculadora Online para encontrar o Mínimo Múltiplo Comum entre vários números.
								</p>
							</div>

							<div class="card-action indigo darken-4">
								<a class="white-text no-break" href="./calculadoras/mmc/">Ferramenta &raquo;</a>
								<a class="white-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/lucasnaja/4People/blob/master/assets/algorithms/LCM.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card sticky-action z-depth-2">
							<div class="card-content grey lighten-5">
								<span class="card-title activator no-select">Índice de Massa Corporal<i class="material-icons right">more_vert</i></span>
								<p>
									Calculadora de Índice de Massa Corporal Online para calcular o IMC e o seu peso ideal.
								</p>
							</div>

							<div class="card-action indigo darken-4">
								<a class="white-text no-break" href="./calculadoras/imc/">Ferramenta &raquo;</a>
								<a class="white-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/lucasnaja/4People/blob/master/assets/algorithms/BMI.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-0">
					<div class="col s12 l6">
						<div class="card sticky-action z-depth-2">
							<div class="card-content grey lighten-5">
								<span class="card-title activator no-select">Porcentagem<i class="material-icons right">more_vert</i></span>
								<p>
									Calculadora de Porcentagem Online com vários métodos para encontrar a porcentagem, como aumentos, descontos, proporções, etc.
								</p>
							</div>

							<div class="card-action indigo darken-4">
								<a class="white-text no-break" href="./calculadoras/porcentagem/">Ferramenta &raquo;</a>
								<a class="white-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/lucasnaja/4People/blob/master/assets/algorithms/percentage.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card sticky-action z-depth-2">
							<div class="card-content grey lighten-5">
								<span class="card-title activator no-select">Equação do 2° Grau<i class="material-icons right">more_vert</i></span>
								<p>
									Cálculo da Equção do 2° Grau (Bhaskara) Online.
								</p>
							</div>

							<div class="card-action indigo darken-4">
								<a class="white-text no-break" href="./calculadoras/equacao_2_grau/">Ferramenta &raquo;</a>
								<a class="white-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/lucasnaja/4People/blob/master/assets/algorithms/bhaskara.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-0">
					<div class="col s12 l6">
						<div class="card sticky-action z-depth-2">
							<div class="card-content grey lighten-5">
								<span class="card-title activator no-select">Fibonacci<i class="material-icons right">more_vert</i></span>
								<p>
									Calculadora para calcular a Sequência de Fibonacci. Ex: 0, 1, 1, 2, 3, 5, 8, 13, etc...
								</p>
							</div>

							<div class="card-action indigo darken-4">
								<a class="white-text no-break" href="./calculadoras/fibonacci/">Ferramenta &raquo;</a>
								<a class="white-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/lucasnaja/4People/blob/master/assets/algorithms/fibonacci.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card sticky-action z-depth-2">
							<div class="card-content grey lighten-5">
								<span class="card-title activator no-select">Conversor de Temperatura<i class="material-icons right">more_vert</i></span>
								<p>
									Conversor de Temperatura Online para calcular Graus Celsius, Fahrenheit e Kelvin.
								</p>
							</div>

							<div class="card-action indigo darken-4">
								<a class="white-text no-break" href="./calculadoras/conversor_de_temperatura/">Ferramenta &raquo;</a>
								<a class="white-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/lucasnaja/4People/blob/master/assets/algorithms/temperatureConvertor.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-0">
					<div class="col s12 l6">
						<div class="card sticky-action z-depth-2">
							<div class="card-content grey lighten-5">
								<span class="card-title activator no-select">Divisão e Resto<i class="material-icons right">more_vert</i></span>
								<p>
									Calculadora de Divisão Online que mostra o resultado da divisão entre dois números e o resto (módulo) entre eles.
								</p>
							</div>

							<div class="card-action indigo darken-4">
								<a class="white-text no-break" href="./calculadoras/divisao_e_resto/">Ferramenta &raquo;</a>
								<a class="white-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/lucasnaja/4People/blob/master/assets/algorithms/divisionAndRest.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card sticky-action z-depth-2">
							<div class="card-content grey lighten-5">
								<span class="card-title activator no-select">Área do Círculo<i class="material-icons right">more_vert</i></span>
								<p>
									Calculador de Área do Círculo Online.
								</p>
							</div>

							<div class="card-action indigo darken-4">
								<a class="white-text no-break" href="./calculo_de_areas/area_do_circulo/">Ferramenta &raquo;</a>
								<a class="white-text no-break" href="./calculo_de_areas/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/lucasnaja/4People/blob/master/assets/algorithms/circleArea.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>
				</div>

				<div class="row mb-0">
					<div class="col s12 l6">
						<div class="card sticky-action z-depth-2">
							<div class="card-content grey lighten-5">
								<span class="card-title activator no-select">Área do Quadrado<i class="material-icons right">more_vert</i></span>
								<p>
									Calculador de Área do Quadrado Online.
								</p>
							</div>

							<div class="card-action indigo darken-4">
								<a class="white-text no-break" href="./calculo_de_areas/area_do_quadrado/">Ferramenta &raquo;</a>
								<a class="white-text no-break" href="./calculo_de_areas/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/lucasnaja/4People/blob/master/assets/algorithms/squareArea.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>

					<div class="col s12 l6">
						<div class="card sticky-action z-depth-2">
							<div class="card-content grey lighten-5">
								<span class="card-title activator no-select">Diferença entre Datas<i class="material-icons right">more_vert</i></span>
								<p>
									Calcular Diferença entre Datas. Possui um leque de recursos disponíveis, como calcular idades, tempo, etc.
								</p>
							</div>

							<div class="card-action indigo darken-4">
								<a class="white-text no-break" href="./calculo_de_datas/diferenca_entre_datas/">Ferramenta &raquo;</a>
								<a class="white-text no-break" href="./calculo_de_datas/">Mais Ferramentas &raquo;</a>
							</div>

							<div class="card-reveal">
								<span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
								<p><a href="https://github.com/lucasnaja/4People/blob/master/assets/algorithms/passwordGenerator.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
							</div>
						</div>
					</div>
				</div>

				<div class="left-div indigo darken-4"></div>
			</div>
		</div>
	</main>

	<?php include_once("$assets/components/footer.php") ?>

	<script src="<?= $assets ?>/src/js/materialize.min.js"></script>
	<script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
