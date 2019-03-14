<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/links.php") ?>
    <link rel="stylesheet" href="src/index.css">
    <title>Conversores - 4People</title>
    <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Conversores - 4People">
    <meta name="description" content="Conversores OnLine. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="https://4people.now.sh/matematica/calculadoras/conversores/">
    <meta property="og:title" content="Conversores - 4People">
    <meta name="twitter:title" content="Conversores - 4People">
    <meta property="og:url" content="https://4people.now.sh/matematica/calculadoras/conversores/">
    <meta name="twitter:url" content="https://4people.now.sh/matematica/calculadoras/conversores/">
</head>

<body>
    <?php
    include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/noscript.php");
    include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/spinner.php");
    include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/header.php")
    ?>

    <ul id="slide-out" class="sidenav sidenav-fixed collapsible hide">
        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/logo.php") ?>

        <li>
            <div class="collapsible-header"><i class="material-icons">computer</i>Computação</div>
            <div class="collapsible-body">
                <ul class="collapsible padding-headers">
                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/computacao/geradores.php") ?>
                    </li>

                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/computacao/validadores.php") ?>
                    </li>

                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/computacao/funcoes_string.php") ?>
                    </li>

                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/computacao/rede_e_internet.php") ?>
                    </li>

                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/computacao/codif_decodif.php") ?>
                    </li>

                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/computacao/tabelas_e_padroes.php") ?>
                    </li>
                </ul>
            </div>
        </li>

        <li class="active">
            <div class="collapsible-header"><i class="material-icons">functions</i>Matemática</div>
            <div class="collapsible-body">
                <ul class="collapsible padding-headers">
                    <li class="active">
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/matematica/calculadoras.php") ?>
                    </li>

                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/matematica/calcular_areas.php") ?>
                    </li>

                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/matematica/datas_e_horas.php") ?>
                    </li>
                </ul>
            </div>
        </li>

        <li>
            <div class="collapsible-header"><i class="material-icons">build</i>Outras Ferramentas</div>
            <div class="collapsible-body">
                <ul class="collapsible padding-headers">
                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/outras_ferramentas/dia_a_dia.php") ?>
                    </li>

                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/outras_ferramentas/jogos.php") ?>
                    </li>
                </ul>
            </div>
        </li>
    </ul>

    <main class="grey lighten-5 hide">
        <div class="container">
            <div class="card-panel">
                <h1 class="flow-text mt-2">Conversores</h1>

                <label>Conversor de Armazenamento de Dados, Comprimento, Consumo de Combustível, Energia Mecânica, Frequência, Massa, Pressão, Temperatura, Tempo, Transmissão de Dados, Velocidade, Volume, Área e Ângulo.</label>
                <div class="divider"></div>

                <div class="row mb-0">
                    <div class="input-field col s12">
                        <select class="normalScroll" id="ddConvertType">
                            <option value="0" disabled>Armazenamento de Dados</option>
                            <option value="1" disabled>Comprimento</option>
                            <option value="2" disabled>Consumo de Combustível</option>
                            <option value="3" disabled>Energia Mecânica</option>
                            <option value="4" disabled>Frequência</option>
                            <option value="5" disabled>Massa</option>
                            <option value="6" disabled>Pressão</option>
                            <option value="7" selected>Temperatura</option>
                            <option value="8" disabled>Tempo</option>
                            <option value="9" disabled>Transmissão de Dados</option>
                            <option value="10" disabled>Velocidade</option>
                            <option value="11" disabled>Volume</option>
                            <option value="12" disabled>Área</option>
                            <option value="13" disabled>Ângulo</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-0" style="position:relative">
                    <div class="input-field col s5">
                        <input type="number" id="txtFirst" placeholder="Temperatura" step="any" value="0">
                    </div>

                    <span class="equal">
                        =
                    </span>

                    <div class="input-field inline col s5 offset-s2">
                        <input type="number" id="txtSecond" placeholder="Temperatura" step="any" value="0">
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

    <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/footer.php") ?>

    <script src="/algoritmos/temperatureConversion.js"></script>
    <script src="src/index.js"></script>
    <script src="/src/js/main.js"></script>
</body>

</html> 