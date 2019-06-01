<?php include_once('../../../assets/asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <link rel="stylesheet" href="<?= "$return/src/css/materialize.min.css" ?>">
    <link rel="stylesheet" href="<?= "$return/src/css/main.css" ?>">
    <link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
    <title>Equação do 2° Grau - 4People</title>
    <?php include_once("$path/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Equação do 2° Grau - 4People">
    <meta name="description" content="Calcular a equação do 2° grau (Bhaskara). 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="./matematica/calculo_de_areas/equacao_2_grau/">
    <meta property="og:title" content="Equação do 2° Grau - 4People">
    <meta name="twitter:title" content="Equação do 2° Grau - 4People">
    <meta property="og:url" content="./matematica/calculo_de_areas/equacao_2_grau/">
    <meta name="twitter:url" content="./matematica/calculo_de_areas/equacao_2_grau/">
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
                    <li class="active">
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
                <h1 class="flow-text mt-2">Equação do 2° Grau</h1>

                <label>Cálculo da Equção do 2° Grau (Bhaskara) Online. &Delta; = B² - 4 * A * C, X = (-B +- √&Delta;) / 2 * A</label>
                <div class="divider"></div>

                <div class="row">
                    <div class="col s12 m6 l4">
                        <div class="row mb-0">
                            <p class="mb-0 col s12">Valor A:</p>

                            <div class="input-field col s12">
                                <input id="valueA" type="number" placeholder="Digite aqui o valor do A." step="any">
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6 l4">
                        <div class="row mb-0">
                            <p class="mb-0 col s12">Valor B:</p>

                            <div class="input-field col s12">
                                <input id="valueB" type="number" placeholder="Digite aqui o valor do B." step="any">
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6 l4">
                        <div class="row mb-0">
                            <p class="mb-0 col s12">Valor C:</p>

                            <div class="input-field col s12">
                                <input id="valueC" type="number" placeholder="Digite aqui o valor do C." step="any">
                            </div>
                        </div>
                    </div>
                </div>

                <button title="Calcular o Bhaskara" class="btn btn-center waves-effect white black-text z-depth-2" onclick="calculate()">
                    Calcular Bhaskara
                </button>

                <div class="divider mt-2"></div>

                <textarea class="mt-2" id="result" placeholder="Resultado" spellcheck="false" readonly></textarea>
                <button title="Copiar" class="btn waves-effect waves-dark white black-text" onclick="copyResult()">
                    Copiar
                </button>
            </div>
        </div>
    </main>

    <?php include_once("$path/components/footer.php") ?>

    <script src="<?= "$return/algorithms/bhaskara.js" ?>"></script>
    <script src="<?= "$return/src/js/materialize.min.js" ?>"></script>
    <script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
    <script src="<?= "$return/src/js/main.js" ?>"></script>
</body>

</html>
