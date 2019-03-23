<?php
include_once('../../../asset.php');
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once("$path/componentes/links.php") ?>
    <link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
    <title>Diferença entre Datas - 4People</title>
    <?php include_once("$path/componentes/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Diferença entre Datas - 4People">
    <meta name="description" content="Diferença entre Datas. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="https://4people.now.sh/matematica/datas_e_horas/diferenca_entre_datas/">
    <meta property="og:title" content="Diferença entre Datas - 4People">
    <meta name="twitter:title" content="Diferença entre Datas - 4People">
    <meta property="og:url" content="https://4people.now.sh/matematica/datas_e_horas/diferenca_entre_datas/">
    <meta name="twitter:url" content="https://4people.now.sh/matematica/datas_e_horas/diferenca_entre_datas/">
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
                    <li>
                        <?php include_once("$path/componentes/matematica/calculadoras.php") ?>
                    </li>

                    <li>
                        <?php include_once("$path/componentes/matematica/calcular_areas.php") ?>
                    </li>

                    <li class="active">
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
                <h1 class="flow-text mt-2">Diferença entre Datas</h1>

                <label>Calcular diferença entre duas datas, com um leque de recursos disponíveis.</label>
                <div class="divider"></div>

                <div class="row mt-2">
                    <div class="col s12 m6">
                        Data inicial:<br class="hide-on-large-only">
                        <div class="input-field inline">
                            <input id="beginDate" type="text" placeholder="Data inicial" class="datepicker">
                        </div>
                    </div>

                    <div class="col s12 m6">
                        Horário:<br class="hide-on-large-only">
                        <div class="input-field inline">
                            <input id="beginTime" type="text" placeholder="Horário atual" class="timepicker">
                        </div>
                    </div>

                    <div class="col s12 m6">
                        Data final:<br class="hide-on-large-only">
                        <div class="input-field inline">
                            <input id="endDate" type="text" placeholder="Data final" class="datepicker">
                        </div>
                    </div>

                    <div class="col s12 m6">
                        Horário:<br class="hide-on-large-only">
                        <div class="input-field inline">
                            <input id="endTime" type="text" placeholder="Horário atual" class="timepicker">
                        </div>
                    </div>
                </div>

                <button title="Calcular a diferença entre datas" class="btn btn-center waves-effect white black-text z-depth-2" onclick="calculate()">
                    Calcular diferença
                </button>

                <div class="divider mt-2"></div>

                <ul class="collection">
                    <li class="collection-item">Tempo decorrido: <span id="totalTime">0 anos, 0 meses e 0 dias</span></li>
                    <li class="collection-item">Milissegundos: <span id="milliSecs">0</span></li>
                    <li class="collection-item">Segundos: <span id="secs">0</span></li>
                    <li class="collection-item">Minutos: <span id="mins">0</span></li>
                    <li class="collection-item">Horas: <span id="hours">0</span></li>
                    <li class="collection-item">Dias: <span id="days">0</span></li>
                    <li class="collection-item">Meses: <span id="months">0</span></li>
                    <li class="collection-item">Anos: <span id="years">0</span></li>
                </ul>
            </div>
        </div>
    </main>

    <?php include_once("$path/componentes/footer.php") ?>

    <script src="<?= $return ?>/algoritmos/differenceBetweenDates.js"></script>
    <script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
    <script src="<?= $return ?>/src/js/main.js"></script>
</body>

</html> 