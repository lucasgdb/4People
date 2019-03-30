<?php include_once('../../../asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once("$path/components/links.php") ?>
    <link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
    <title>Conversor de Temperatura - 4People</title>
    <?php include_once("$path/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Conversor de Temperatura - 4People">
    <meta name="description" content="Conversor de Temperatura OnLine. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="https://4people.now.sh/matematica/calculadoras/conversor_de_temperatura/">
    <meta property="og:title" content="Conversor de Temperatura - 4People">
    <meta name="twitter:title" content="Conversor de Temperatura - 4People">
    <meta property="og:url" content="https://4people.now.sh/matematica/calculadoras/conversor_de_temperatura/">
    <meta name="twitter:url" content="https://4people.now.sh/matematica/calculadoras/conversor_de_temperatura/">
</head>

<body>
    <?php
    include_once("$path/components/noscript.php");
    include_once("$path/components/spinner.php");
    include_once("$path/components/header.php")
    ?>

    <ul id="slide-out" class="sidenav sidenav-fixed collapsible hide">
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

    <main class="grey lighten-5 hide">
        <div class="container">
            <div class="card-panel">
                <h1 class="flow-text mt-2">Conversor de Temperatura</h1>

                <label>Conversor de Temperatura OnLine para calcular Graus Celsius, Fahrenheit e Kelvin.</label>
                <div class="divider"></div>

                <div class="row mb-0" style="position:relative">
                    <div class="input-field col s5">
                        <input type="number" id="txtFirst" placeholder="Temperatura" step="any" value="0">
                    </div>

                    <span class="equal">
                        =
                    </span>

                    <div class="input-field inline col s5 offset-s2">
                        <input type="number" id="txtSecond" placeholder="Temperatura" step="any" value="32">
                    </div>
                </div>

                <div class="row mb-0">
                    <div class="input-field col s6 m5">
                        <select class="normalScroll" id="ddFirst">
                            <option value="0" selected>Graus Celsius</option>
                            <option value="1">Graus Fahrenheit</option>
                            <option value="2">Graus Kelvin</option>
                        </select>
                    </div>


                    <div class="input-field col s6 m5 offset-m2">
                        <select class="normalScroll" id="ddSecond">
                            <option value="0">Graus Celsius</option>
                            <option value="1" selected>Graus Fahrenheit</option>
                            <option value="2">Graus Kelvin</option>
                        </select>
                    </div>

                    <div class="col s12">
                        <button title="Copiar" class="btn waves-effect left waves-dark white black-text" onclick="copyResult(txtFirst)">
                            Copiar
                        </button>
                        <button title="Copiar" class="btn waves-effect right waves-dark white black-text" onclick="copyResult(txtSecond)">
                            Copiar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <?php include_once("$path/components/footer.php") ?>

    <script src="<?= $return ?>/algorithms/temperatureConverter.js"></script>
    <script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
    <script src="<?= $return ?>/src/js/main.js"></script>
</body>

</html> 