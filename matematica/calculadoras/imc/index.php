<?php include_once('../../../asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once("$path/components/links.php") ?>
    <link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
    <title>Índice de Massa Corporal - 4People</title>
    <?php include_once("$path/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Índice de Massa Corporal - 4People">
    <meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="https://4people.now.sh/matematica/calculadoras/imc/">
    <meta property="og:title" content="Índice de Massa Corporal - 4People">
    <meta name="twitter:title" content="Índice de Massa Corporal - 4People">
    <meta property="og:url" content="https://4people.now.sh/matematica/calculadoras/imc/">
    <meta name="twitter:url" content="https://4people.now.sh/matematica/calculadoras/imc/">
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
                        <?php include_once("$path/components/matematica/calcular_areas.php") ?>
                    </li>

                    <li>
                        <?php include_once("$path/components/matematica/datas_e_horas.php") ?>
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
                <h1 class="flow-text mt-2">Índice de Massa Corporal</h1>

                <label>Calculadora de Índice de Massa Corporal OnLine para calcular o IMD e o seu peso ideal.</label>
                <div class="divider"></div>

                <div class="row mb-0">
                    <div class="col s12">
                        <p class="mb-0">Sexo:</p>
                    </div>

                    <div class="col s6 m3 l2">
                        <p>
                            <label>
                                <input class="with-gap" name="sex" type="radio" checked />
                                <span>Homem</span>
                            </label>
                        </p>
                    </div>

                    <div class="col s6 m3 l2">
                        <p>
                            <label>
                                <input class="with-gap" name="sex" type="radio" />
                                <span>Mulher</span>
                            </label>
                        </p>
                    </div>
                </div>

                <div class="row mb-0">
                    <div class="col s12 m6">
                        <div class="row mb-0">
                            <div class="col s12">
                                <p class="mb-0">Peso:</p>
                            </div>

                            <div class="col s12">
                                <div class="input-field">
                                    <input id="weight" type="number" placeholder="Digite aqui seu peso." min="1" step="any">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="row mb-0">
                            <div class="col s12">
                                <p class="mb-0">Altura:</p>
                            </div>
                            <div class="col s12">
                                <div class="input-field">
                                    <input id="height" type="number" placeholder="Digite aqui sua altura." min="1" step="any">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button title="Calcular IMC" class="btn waves-effect waves-dark white black-text btn-center" onclick="calculate()">
                    Calcular IMC
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

    <script src="<?= $return ?>/algorithms/BMI.js"></script>
    <script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
    <script src="<?= $return ?>/src/js/main.js"></script>
</body>

</html> 