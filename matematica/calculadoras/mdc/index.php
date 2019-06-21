<?php include_once('../../../assets/assets.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <link rel="stylesheet" href="<?= "$assets/src/css/materialize.min.css" ?>">
    <link rel="stylesheet" href="<?= "$assets/src/css/main.css" ?>">
    <link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
    <title>Máximo Divisor Comum - 4People</title>
    <?php include_once("$assets/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Máximo Divisor Comum - 4People">
    <meta name="description" content="Calculadora para encontrar o Máximo Divisor Comum Online. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="./matematica/calculadoras/mdc/">
    <meta property="og:title" content="Máximo Divisor Comum - 4People">
    <meta name="twitter:title" content="Máximo Divisor Comum - 4People">
    <meta property="og:url" content="./matematica/calculadoras/mdc/">
    <meta name="twitter:url" content="./matematica/calculadoras/mdc/">
</head>

<body class="grey lighten-3">
    <?php
    include_once("$assets/components/noscript.php");
    include_once("$assets/components/spinner.php");
    include_once("$assets/components/header.php")
    ?>

    <ul id="slide-out" class="sidenav sidenav-fixed collapsible">
        <?php include_once("$assets/components/logo.php") ?>

        <li>
            <div class="collapsible-header"><i class="material-icons">computer</i>Computação</div>
            <div class="collapsible-body">
                <ul class="collapsible padding-headers">
                    <li>
                        <?php include_once("$assets/components/computacao/geradores.php") ?>
                    </li>

                    <li>
                        <?php include_once("$assets/components/computacao/validadores.php") ?>
                    </li>

                    <li>
                        <?php include_once("$assets/components/computacao/funcoes_string.php") ?>
                    </li>

                    <li>
                        <?php include_once("$assets/components/computacao/rede_e_internet.php") ?>
                    </li>

                    <li>
                        <?php include_once("$assets/components/computacao/codif_decodif.php") ?>
                    </li>

                    <li>
                        <?php include_once("$assets/components/computacao/tabelas_e_padroes.php") ?>
                    </li>
                </ul>
            </div>
        </li>

        <li class="active">
            <div class="collapsible-header"><i class="material-icons">functions</i>Matemática</div>
            <div class="collapsible-body">
                <ul class="collapsible padding-headers">
                    <li class="active">
                        <?php include_once("$assets/components/matematica/calculadoras.php") ?>
                    </li>

                    <li>
                        <?php include_once("$assets/components/matematica/calculo_de_areas.php") ?>
                    </li>

                    <li>
                        <?php include_once("$assets/components/matematica/calculo_de_datas.php") ?>
                    </li>
                </ul>
            </div>
        </li>

        <li>
            <div class="collapsible-header"><i class="material-icons">build</i>Outras Ferramentas</div>
            <div class="collapsible-body">
                <ul class="collapsible padding-headers">
                    <li>
                        <?php include_once("$assets/components/outras_ferramentas/dia_a_dia.php") ?>
                    </li>

                    <li>
                        <?php include_once("$assets/components/outras_ferramentas/jogos.php") ?>
                    </li>
                </ul>
            </div>
        </li>
    </ul>

    <main>
        <div class="container">
            <div class="card-panel left-div-margin">
                <h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">functions</i>Máximo Divisor Comum</h1>

                <label>Calculadora Online para encontrar o Máximo Divisor Comum entre vários números.</label>
                <div class="divider"></div>

                <div class="row m-0">
                    <p class="mb-0 col s12">Números:</p>
                    <div class="input-field col s12">
                        <input id="numbers" type="text" placeholder="Ex: 10, 12, 28, 52, 78, 102, 1080, 123, 987, etc.">
                    </div>
                </div>

					 <div class="divider mb-2"></div>
                <button title="Encontrar o Máximo Divisor Comum" class="btn waves-effect waves-light indigo darken-4 btn-center z-depth-2" onclick="calculate()">
                    Encontrar MDC
                </button>
                <div class="divider mt-2"></div>

                <textarea class="mt-2" id="result" placeholder="Resultado" spellcheck="false" readonly></textarea>
                <button title="Copiar MDC" class="btn waves-effect waves-light indigo darken-4" onclick="copyResult()">
                    Copiar
					 </button>
					 
					 <div class="left-div indigo darken-4"></div>
            </div>
        </div>
    </main>

    <?php include_once("$assets/components/footer.php") ?>

    <script src="<?= "$assets/algorithms/GCD.js" ?>"></script>
    <script src="<?= "$assets/src/js/materialize.min.js" ?>"></script>
    <script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
    <script src="<?= "$assets/src/js/main.js" ?>"></script>
</body>

</html>
