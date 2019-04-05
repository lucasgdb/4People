<?php include_once('../../../assets/asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once("$path/components/links.php") ?>
    <link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
    <title>Diferença entre Datas - 4People</title>
    <?php include_once("$path/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Diferença entre Datas - 4People">
    <meta name="description" content="Diferença entre Datas. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="./matematica/calculo_de_datas/diferenca_entre_datas/">
    <meta property="og:title" content="Diferença entre Datas - 4People">
    <meta name="twitter:title" content="Diferença entre Datas - 4People">
    <meta property="og:url" content="./matematica/calculo_de_datas/diferenca_entre_datas/">
    <meta name="twitter:url" content="./matematica/calculo_de_datas/diferenca_entre_datas/">
</head>

<body>
    <?php include_once("$path/components/topComponents.php") ?>

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

                    <li class="active">
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
                <h1 class="flow-text mt-2">Diferença entre Datas</h1>

                <label>Calcular Diferença entre Datas. Possui um leque de recursos disponíveis, como calcular idades, tempo, etc.</label>
                <div class="divider"></div>

                <div class="row">
                    <div class="col s12 m6">
                        <div class="row mb-0">
                            <p class="mb-0 col s12">Data inicial:</p>
                            <div class="input-field col s12">
                                <input id="beginDate" type="text" placeholder="Data inicial" class="datepicker">
                            </div>

                            <p class="mb-0 col s12">Horário inicial:</p>
                            <div class="input-field col s12">
                                <input id="beginTime" type="text" placeholder="Horário atual" class="timepicker">
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="row mb-0">
                            <p class="mb-0 col s12">Data final:</p>
                            <div class="input-field col s12">
                                <input id="endDate" type="text" placeholder="Data final" class="datepicker">
                            </div>

                            <p class="mb-0 col s12">Horário final:</p>
                            <div class="input-field col s12">
                                <input id="endTime" type="text" placeholder="Horário atual" class="timepicker">
                            </div>
                        </div>
                    </div>

                </div>

                <button title="Calcular a Diferença Entre Datas" class="btn btn-center waves-effect white black-text z-depth-2" onclick="calculate()">
                    Calcular diferença
                </button>

                <div class="divider mt-2"></div>

                <ul class="collection mb-0">
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

    <?php include_once("$path/components/footer.php") ?>

    <script src="<?= "$return/algorithms/differenceBetweenDates.js" ?>"></script>
    <script src="<?= "$return/src/js/materialize.min.js" ?>"></script>
    <script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
    <script src="<?= "$return/src/js/main.js" ?>"></script>
</body>

</html>