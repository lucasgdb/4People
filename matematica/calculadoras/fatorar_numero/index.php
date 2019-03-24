<?php include_once('../../../asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once("$path/componentes/links.php") ?>
    <link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
    <title>Fatorar Número - 4People</title>
    <?php include_once("$path/componentes/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Fatorar Número - 4People">
    <meta name="description" content="Fatoração de Número OnLine. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="https://4people.now.sh/matematica/calculadoras/fatorar_numero/">
    <meta property="og:title" content="Fatorar Número - 4People">
    <meta name="twitter:title" content="Fatorar Número - 4People">
    <meta property="og:url" content="https://4people.now.sh/matematica/calculadoras/fatorar_numero/">
    <meta name="twitter:url" content="https://4people.now.sh/matematica/calculadoras/fatorar_numero/">
</head>

<body>
    <?php
    include_once("$path/componentes/noscript.php");
    include_once("$path/componentes/spinner.php");
    include_once("$path/componentes/header.php")
    ?>

    <ul id="slide-out" class="sidenav sidenav-fixed collapsible hide">
        <?php include_once("$path/componentes/logo.php") ?>

        <li>
            <div class="collapsible-header"><i class="material-icons">computer</i>Computação</div>
            <div class="collapsible-body">
                <ul class="collapsible padding-headers">
                    <li>
                        <?php include_once("$path/componentes/computacao/geradores.php") ?>
                    </li>

                    <li>
                        <?php include_once("$path/componentes/computacao/validadores.php") ?>
                    </li>

                    <li>
                        <?php include_once("$path/componentes/computacao/funcoes_string.php") ?>
                    </li>

                    <li>
                        <?php include_once("$path/componentes/computacao/rede_e_internet.php") ?>
                    </li>

                    <li>
                        <?php include_once("$path/componentes/computacao/codif_decodif.php") ?>
                    </li>

                    <li>
                        <?php include_once("$path/componentes/computacao/tabelas_e_padroes.php") ?>
                    </li>
                </ul>
            </div>
        </li>

        <li class="active">
            <div class="collapsible-header"><i class="material-icons">functions</i>Matemática</div>
            <div class="collapsible-body">
                <ul class="collapsible padding-headers">
                    <li class="active">
                        <?php include_once("$path/componentes/matematica/calculadoras.php") ?>
                    </li>

                    <li>
                        <?php include_once("$path/componentes/matematica/calcular_areas.php") ?>
                    </li>

                    <li>
                        <?php include_once("$path/componentes/matematica/datas_e_horas.php") ?>
                    </li>
                </ul>
            </div>
        </li>

        <li>
            <div class="collapsible-header"><i class="material-icons">build</i>Outras Ferramentas</div>
            <div class="collapsible-body">
                <ul class="collapsible padding-headers">
                    <li>
                        <?php include_once("$path/componentes/outras_ferramentas/dia_a_dia.php") ?>
                    </li>

                    <li>
                        <?php include_once("$path/componentes/outras_ferramentas/jogos.php") ?>
                    </li>
                </ul>
            </div>
        </li>
    </ul>

    <main class="grey lighten-5 hide">
        <div class="container">
            <div class="card-panel">
                <h1 class="flow-text mt-2">Fatorar Número</h1>

                <label>Calculadora para Fatorar Números OnLine.</label>
                <div class="divider"></div>

                <div class="row mt-2">
                    <div class="col s12">
                        Número:
                        <div class="input-field inline">
                            <input id="number" type="number" placeholder="Digite aqui o número." min="1" step="1" value="10">
                        </div>
                    </div>
                </div>

                <button title="Fatorar Número" class="btn waves-effect waves-dark white black-text btn-center" onclick="factorize()">
                    Fatorar Número
                </button>

                <div class="divider mt-2"></div>

                <textarea class="mt-2" id="result" placeholder="Resultado" spellcheck="false" readonly></textarea>
                <button title="Copiar" class="btn waves-effect waves-dark white black-text" onclick="copyResult()">
                    Copiar
                </button>
            </div>
        </div>
    </main>

    <?php include_once("$path/componentes/footer.php") ?>

    <script src="<?= $return ?>/algoritmos/factorization.js"></script>
    <script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
    <script src="<?= $return ?>/src/js/main.js"></script>
</body>

</html> 