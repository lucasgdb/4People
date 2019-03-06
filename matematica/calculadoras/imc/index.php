<!DOCTYPE html>
<?php $path = '../../..' ?>
<html lang="pt-br">

<head>
    <?php include_once("$path/componentes/links.php") ?>
    <link rel="stylesheet" href="src/index.css">
    <title>Índice de Massa Corporal - 4People</title>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <?php include_once("$path/componentes/metas.php") ?>
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
    include_once("$path/componentes/noscript.php");
    include_once("$path/componentes/spinner.php")
    ?>

    <header class="hide">
        <?php include_once("$path/componentes/nav.php") ?>

        <ul id="slide-out" class="sidenav sidenav-fixed collapsible">
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
    </header>

    <main class="hide">
        <div class="container">
            <div class="card-panel">
                <h1 class="flow-text mt-2">Calcular Índice de Massa Corporal</h1>

                <label>Calculadora de IMC OnLine</label>
                <div class="divider"></div>

                <div class="row mt-2">
                    <div class="col s12">
                        Peso:<br class="hide-on-med-and-up">
                        <div class="input-field inline">
                            <input id="weight" type="number" placeholder="Digite aqui seu peso." min="1" step="any">
                        </div>
                    </div>

                    <div class="col s12">
                        Altura:<br class="hide-on-med-and-up">
                        <div class="input-field inline">
                            <input id="height" type="number" placeholder="Digite aqui sua altura." min="1" step="any">
                        </div>
                    </div>
                </div>

                <button title="Calcular IMC" class="btn waves-effect waves-dark white black-text btn-center" onclick="calculate()">
                    Calcular IMC
                </button>

                <div class="divider mt-2"></div>

                <textarea class="mt-2" id="result" placeholder="Resultado"></textarea>
                <button title="Copiar" class="btn waves-effect waves-dark white black-text" onclick="copyResult()">
                    Copiar
                </button>
            </div>
        </div>
    </main>

    <?php include_once("$path/componentes/footer.php") ?>

    <script src="/algoritmos/bmi.js"></script>
    <script src="src/index.js"></script>
    <script src="/src/js/main.js"></script>
</body>

</html> 