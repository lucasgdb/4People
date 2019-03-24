<?php include_once('../../../asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once("$path/componentes/links.php") ?>
    <link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
    <title>Porcentagem - 4People</title>
    <?php include_once("$path/componentes/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Porcentagem - 4People">
    <meta name="description" content="Calculadora OnLine para encontrar a porcentagem. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="https://4people.now.sh/matematica/calculadoras/porcentagem/">
    <meta property="og:title" content="Porcentagem - 4People">
    <meta name="twitter:title" content="Porcentagem - 4People">
    <meta property="og:url" content="https://4people.now.sh/matematica/calculadoras/porcentagem/">
    <meta name="twitter:url" content="https://4people.now.sh/matematica/calculadoras/porcentagem/">
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
                <h1 class="flow-text mt-2">Porcentagem</h1>

                <label>Calculadora de Porcentagem OnLine com vários métodos para encontrar a porcentagem, como aumentos, descontos, proporções, etc.</label>
                <div class="divider"></div>

                <div class="row mb-0">
                    <div class="col s12">
                        Quanto é
                        <div class="input-field mt-2 mb-0 inline lesser">
                            <input id="firstNumber" type="number" placeholder="Ex: 50" step="any">
                        </div>
                        % de
                        <div class="input-field mt-2 mb-0 inline lesser">
                            <input id="secondNumber" type="number" placeholder="Ex: 100" step="any">
                        </div>
                        ?
                        <div class="input-field mt-2 mb-0 inline">
                            <textarea id="firstResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
                        </div>
                    </div>

                    <div class="col s12">
                        <button title="Calcular" class="btn waves-effect waves-dark white black-text" onclick="calculateFirst()">
                            Calcular
                        </button>

                        <button title="Copiar" class="btn waves-effect waves-dark white black-text" onclick="copyResult(txtFirstResult)">
                            Copiar
                        </button>
                    </div>
                </div>

                <div class="divider mt-2"></div>

                <div class="row mb-0">
                    <div class="col s12">
                        O valor
                        <div class="input-field mt-2 mb-0 inline lesser">
                            <input id="thirdNumber" type="number" placeholder="Ex: 50">
                        </div>
                        é qual porcentagem de
                        <div class="input-field mt-2 mb-0 inline lesser">
                            <input id="fourthNumber" type="number" placeholder="Ex: 100">
                        </div>
                        ?
                        <div class="input-field mt-2 mb-0 inline">
                            <textarea id="secondResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
                        </div>
                    </div>

                    <div class="col s12">
                        <button title="Calcular" class="btn waves-effect waves-dark white black-text" onclick="calculateSecond()">
                            Calcular
                        </button>

                        <button title="Copiar" class="btn waves-effect waves-dark white black-text" onclick="copyResult(txtSecondResult)">
                            Copiar
                        </button>
                    </div>
                </div>

                <div class="divider mt-2"></div>

                <div class="row mb-0">
                    <div class="col s12">
                        O valor
                        <div class="input-field mt-2 mb-0 inline lesser">
                            <input id="fifthNumber" type="number" placeholder="Ex: 50">
                        </div>
                        aumentou para
                        <div class="input-field mt-2 mb-0 inline lesser">
                            <input id="sixthNumber" type="number" placeholder="Ex: 100">
                        </div>
                        . Qual foi seu aumento percentual?
                        <div class="input-field mt-2 mb-0 inline">
                            <textarea id="thirdResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
                        </div>
                    </div>

                    <div class="col s12">
                        <button title="Calcular" class="btn waves-effect waves-dark white black-text" onclick="calculateThird()">
                            Calcular
                        </button>

                        <button title="Copiar" class="btn waves-effect waves-dark white black-text" onclick="copyResult(txtThirdResult)">
                            Copiar
                        </button>
                    </div>
                </div>

                <div class="divider mt-2"></div>

                <div class="row mb-0">
                    <div class="col s12">
                        O valor
                        <div class="input-field mt-2 mb-0 inline lesser">
                            <input id="seventhNumber" type="number" placeholder="Ex: 50">
                        </div>
                        diminuiu para
                        <div class="input-field mt-2 mb-0 inline lesser">
                            <input id="eighthNumber" type="number" placeholder="Ex: 100">
                        </div>
                        . Qual foi sua diminuição porcentual?
                        <div class="input-field mt-2 mb-0 inline">
                            <textarea id="fourthResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
                        </div>
                    </div>

                    <div class="col s12">
                        <button title="Calcular" class="btn waves-effect waves-dark white black-text" onclick="calculateFourth()">
                            Calcular
                        </button>

                        <button title="Copiar" class="btn waves-effect waves-dark white black-text" onclick="copyResult(txtFourthResult)">
                            Copiar
                        </button>
                    </div>
                </div>

                <div class="divider mt-2"></div>

                <div class="row mb-0">
                    <div class="col s12">
                        O valor
                        <div class="input-field mt-2 mb-0 inline lesser">
                            <input id="ninethNumber" type="number" placeholder="Ex: 50">
                        </div>
                        sobre o valor
                        <div class="input-field mt-2 mb-0 inline lesser">
                            <input id="tenthNumber" type="number" placeholder="Ex: 100">
                        </div>
                        são quantos %?
                        <div class="input-field mt-2 mb-0 inline">
                            <textarea id="fifthResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
                        </div>
                    </div>

                    <div class="col s12">
                        <button title="Calcular" class="btn waves-effect waves-dark white black-text" onclick="calculateFifth()">
                            Calcular
                        </button>

                        <button title="Copiar" class="btn waves-effect waves-dark white black-text" onclick="copyResult(txtFifthResult)">
                            Copiar
                        </button>
                    </div>
                </div>

                <div class="divider mt-2"></div>

                <div class="row mb-0">
                    <div class="col s12">
                        O valor
                        <div class="input-field mt-2 mb-0 inline lesser">
                            <input id="eleventhNumber" type="number" placeholder="Ex: 50">
                        </div>
                        mais
                        <div class="input-field mt-2 mb-0 inline lesser">
                            <input id="twelfthNumber" type="number" placeholder="Ex: 100">
                        </div>
                        % dá que resultado?
                        <div class="input-field mt-2 mb-0 inline">
                            <textarea id="sixthResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
                        </div>
                    </div>

                    <div class="col s12">
                        <button title="Calcular" class="btn waves-effect waves-dark white black-text" onclick="calculateSixth()">
                            Calcular
                        </button>

                        <button title="Copiar" class="btn waves-effect waves-dark white black-text" onclick="copyResult(txtSixthResult)">
                            Copiar
                        </button>
                    </div>
                </div>

                <div class="divider mt-2"></div>

                <div class="row mb-0">
                    <div class="col s12">
                        O valor
                        <div class="input-field mt-2 mb-0 inline lesser">
                            <input id="thirteenthNumber" type="number" placeholder="Ex: 50">
                        </div>
                        menos
                        <div class="input-field mt-2 mb-0 inline lesser">
                            <input id="fourteenthNumber" type="number" placeholder="Ex: 100">
                        </div>
                        % dá que resultado?
                        <div class="input-field mt-2 mb-0 inline">
                            <textarea id="seventhResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
                        </div>
                    </div>

                    <div class="col s12">
                        <button title="Calcular" class="btn waves-effect waves-dark white black-text" onclick="calculateSeventh()">
                            Calcular
                        </button>

                        <button title="Copiar" class="btn waves-effect waves-dark white black-text" onclick="copyResult(txtSeventhResult)">
                            Copiar
                        </button>
                    </div>
                </div>

                <div class="divider mt-2"></div>

                <div class="row mb-0">
                    <div class="col s12">
                        O valor X aumentou em
                        <div class="input-field mt-2 mb-0 inline lesser">
                            <input id="fifteenthNumber" type="number" placeholder="Ex: 50">
                        </div>
                        % para
                        <div class="input-field mt-2 mb-0 inline lesser">
                            <input id="sixteenthNumber" type="number" placeholder="Ex: 100">
                        </div>
                        . Qual o valor X?
                        <div class="input-field mt-2 mb-0 inline">
                            <textarea id="eighthResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
                        </div>
                    </div>

                    <div class="col s12">
                        <button title="Calcular" class="btn waves-effect waves-dark white black-text" onclick="calculateEighth()">
                            Calcular
                        </button>

                        <button title="Copiar" class="btn waves-effect waves-dark white black-text" onclick="copyResult(txtEighthResult)">
                            Copiar
                        </button>
                    </div>
                </div>

                <div class="divider mt-2"></div>

                <div class="row mb-0">
                    <div class="col s12">
                        O valor X diminuiu em
                        <div class="input-field mb-0 inline lesser">
                            <input id="seventeenthNumber" type="number" placeholder="Ex: 50">
                        </div>
                        % para
                        <div class="input-field mb-0 inline lesser">
                            <input id="eighteenthNumber" type="number" placeholder="Ex: 100">
                        </div>
                        . Qual o valor X?
                        <div class="input-field mb-0 inline">
                            <textarea id="ninethResult" placeholder="Resultado" spellcheck="false" readonly></textarea>
                        </div>
                    </div>

                    <div class="col s12">
                        <button title="Calcular" class="btn waves-effect waves-dark white black-text" onclick="calculateNineth()">
                            Calcular
                        </button>

                        <button title="Copiar" class="btn waves-effect waves-dark white black-text" onclick="copyResult(txtNinethResult)">
                            Copiar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <?php include_once("$path/componentes/footer.php") ?>

    <script src="<?= $return ?>/algoritmos/porcentagem.js"></script>
    <script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
    <script src="<?= $return ?>/src/js/main.js"></script>
</body>

</html> 