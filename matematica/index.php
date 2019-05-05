<?php include_once('../assets/asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <link rel="stylesheet" href="<?= "$return/src/css/materialize.min.css" ?>">
    <link rel="stylesheet" href="<?= "$return/src/css/main.css" ?>">
    <link rel="stylesheet" href="<?= "$return/src/css/cards.css" ?>">
    <title>Matemática - 4People</title>
    <?php include_once("$path/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="4People - Ferramentas OnLine">
    <meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="./matematica/">
    <meta property="og:title" content="Matemática - 4People">
    <meta name="twitter:title" content="Matemática - 4People">
    <meta property="og:url" content="./matematica/">
    <meta name="twitter:url" content="./matematica/">
</head>

<body>
    <?php
    include_once("$path/components/noscript.php");
    include_once("$path/components/spinner.php");
    include_once("$path/components/header.php")
    ?>

    <ul id="slide-out" class="sidenav sidenav-fixed collapsible">
        <?php include_once("$path/components/logo.php") ?>

        <li>
            <div class="collapsible-header"><i class="material-icons">computer</i>Computação</div>
            <div class="collapsible-body">
                <ul class="collapsible padding-headers">
                    <li>
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

        <li class="active">
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
                <h1 class="flow-text mt-2">Principais Ferramentas</h1>

                <label>Principais Ferramentas de Matemática do 4People</label>
                <div class="divider"></div>

                <div class="row mb-0">
                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Fatorar Número<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Calculadora para Fatorar Números OnLine.
                                </p>
                            </div>

                            <div class="card-action grey lighten-1">
                                <a class="black-text no-break" href="./calculadoras/fatorar_numero/">Ferramenta &raquo;</a>
                                <a class="black-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
                            </div>

                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/factorization.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Máximo Divisor Comum<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Calculadora OnLine para encontrar o Máximo Divisor Comum entre vários números.
                                </p>
                            </div>

                            <div class="card-action grey lighten-1">
                                <a class="black-text no-break" href="./calculadoras/mdc/">Ferramenta &raquo;</a>
                                <a class="black-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
                            </div>

                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/GCD.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-0">
                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Mínimo Múltiplo Comum<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Calculadora OnLine para encontrar o Mínimo Múltiplo Comum entre vários números.
                                </p>
                            </div>

                            <div class="card-action grey lighten-1">
                                <a class="black-text no-break" href="./calculadoras/mmc/">Ferramenta &raquo;</a>
                                <a class="black-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
                            </div>

                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/LCM.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Índice de Massa Corporal<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Calculadora de Índice de Massa Corporal OnLine para calcular o IMC e o seu peso ideal.
                                </p>
                            </div>

                            <div class="card-action grey lighten-1">
                                <a class="black-text no-break" href="./calculadoras/imc/">Ferramenta &raquo;</a>
                                <a class="black-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
                            </div>

                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/BMI.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-0">
                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Porcentagem<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Calculadora de Porcentagem OnLine com vários métodos para encontrar a porcentagem, como aumentos, descontos, proporções, etc.
                                </p>
                            </div>

                            <div class="card-action grey lighten-1">
                                <a class="black-text no-break" href="./calculadoras/porcentagem/">Ferramenta &raquo;</a>
                                <a class="black-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
                            </div>

                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/percentage.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Equação do 2° Grau<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Cálculo da Equção do 2° Grau (Bhaskara) OnLine.
                                </p>
                            </div>

                            <div class="card-action grey lighten-1">
                                <a class="black-text no-break" href="./calculadoras/equacao_2_grau/">Ferramenta &raquo;</a>
                                <a class="black-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
                            </div>

                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/bhaskara.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-0">
                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Fibonacci<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Calculadora para calcular a Sequência de Fibonacci. Ex: 0, 1, 1, 2, 3, 5, 8, 13, etc...
                                </p>
                            </div>

                            <div class="card-action grey lighten-1">
                                <a class="black-text no-break" href="./calculadoras/fibonacci/">Ferramenta &raquo;</a>
                                <a class="black-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
                            </div>

                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/fibonacci.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Conversor de Temperatura<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Conversor de Temperatura OnLine para calcular Graus Celsius, Fahrenheit e Kelvin.
                                </p>
                            </div>

                            <div class="card-action grey lighten-1">
                                <a class="black-text no-break" href="./calculadoras/conversor_de_temperatura/">Ferramenta &raquo;</a>
                                <a class="black-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
                            </div>

                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/temperatureConvertor.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-0">
                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Divisão e Resto<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Calculadora de Divisão OnLine que mostra o resultado da divisão entre dois números e o resto (módulo) entre eles.
                                </p>
                            </div>

                            <div class="card-action grey lighten-1">
                                <a class="black-text no-break" href="./calculadoras/divisao_e_resto/">Ferramenta &raquo;</a>
                                <a class="black-text no-break" href="./calculadoras/">Mais Ferramentas &raquo;</a>
                            </div>

                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/divisionAndRest.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Área do Círculo<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Calculador de Área do Círculo OnLine.
                                </p>
                            </div>

                            <div class="card-action grey lighten-1">
                                <a class="black-text no-break" href="./calculo_de_areas/area_do_circulo/">Ferramenta &raquo;</a>
                                <a class="black-text no-break" href="./calculo_de_areas/">Mais Ferramentas &raquo;</a>
                            </div>

                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/circleArea.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-0">
                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Área do Quadrado<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Calculador de Área do Quadrado OnLine.
                                </p>
                            </div>

                            <div class="card-action grey lighten-1">
                                <a class="black-text no-break" href="./calculo_de_areas/area_do_quadrado/">Ferramenta &raquo;</a>
                                <a class="black-text no-break" href="./calculo_de_areas/">Mais Ferramentas &raquo;</a>
                            </div>

                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/squareArea.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Diferença entre Datas<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Calcular Diferença entre Datas. Possui um leque de recursos disponíveis, como calcular idades, tempo, etc.
                                </p>
                            </div>

                            <div class="card-action grey lighten-1">
                                <a class="black-text no-break" href="./calculo_de_datas/diferenca_entre_datas/">Ferramenta &raquo;</a>
                                <a class="black-text no-break" href="./calculo_de_datas/">Mais Ferramentas &raquo;</a>
                            </div>

                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/passwordGenerator.js" target="_blank">Clique aqui</a> para ir direto ao Código Fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <?php include_once("$path/components/footer.php") ?>

    <script src="<?= "$return/src/js/materialize.min.js" ?>"></script>
    <script src="<?= "$return/src/js/main.js" ?>"></script>
</body>

</html>