<?php include_once('../../../asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once("$path/components/links.php") ?>
    <link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
    <title>Máximo Divisor Comum - 4People</title>
    <?php include_once("$path/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Máximo Divisor Comum - 4People">
    <meta name="description" content="Calculadora para encontrar o Máximo Divisor Comum OnLine. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="./matematica/calculadoras/mdc/">
    <meta property="og:title" content="Máximo Divisor Comum - 4People">
    <meta name="twitter:title" content="Máximo Divisor Comum - 4People">
    <meta property="og:url" content="./matematica/calculadoras/mdc/">
    <meta name="twitter:url" content="./matematica/calculadoras/mdc/">
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
                <h1 class="flow-text mt-2">Máximo Divisor Comum</h1>

                <label>Calculadora para encontrar o Máximo Divisor Comum OnLine.</label>
                <div class="divider"></div>

                <div class="row mt-2 mb-0">
                    <div class="col s12">
                        Números:
                        <div class="input-field">
                            <input id="numbers" type="text" placeholder="Ex: 10, 12, 28, 52, 78, 102, 1080, 123, 987, etc.">
                        </div>
                    </div>
                </div>

                <button title="Encontrar o Máximo Divisor Comum" class="btn waves-effect waves-dark white black-text btn-center" onclick="calculate()">
                    Encontrar MDC
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

    <script src="<?= "$return/algorithms/GCD.js" ?>"></script>
    <script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
    <script src="<?= "$return/src/js/main.js" ?>"></script>
</body>

</html> 