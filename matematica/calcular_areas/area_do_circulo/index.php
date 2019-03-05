<!DOCTYPE html>
<?php $path = '../../..' ?>
<html lang="pt-br">

<head>
    <?php include_once("$path/componentes/links.php") ?>
    <link rel="stylesheet" href="src/css/index.css">
    <title>Área do Círculo - 4People</title>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <?php include_once("$path/componentes/metas.php") ?>
    <meta name="title" content="4People - Ferramentas OnLine">
    <meta name="description" content="Calcular área do círculo. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="https://4people.now.sh/matematica/calcular_areas/area_do_circulo/">
    <meta property="og:title" content="Área do Círculo - 4People">
    <meta name="twitter:title" content="Área do Círculo - 4People">
    <meta property="og:url" content="https://4people.now.sh/matematica/calcular_areas/area_do_circulo/">
    <meta name="twitter:url" content="https://4people.now.sh/matematica/calcular_areas/area_do_circulo/">
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
                        <li>
                            <?php include_once("$path/componentes/matematica/calculadoras.php") ?>
                        </li>

                        <li class="active">
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
                <h1 class="flow-text mt-2">Calcular Área do Círculo</h1>

                <label>R = Raio, D = Diâmetro (2 * R), PI = 3.141592653589793... (Math.PI.toFixed(48))</label>
                <div class="divider"></div>

                <div class="row">
                    <div class="col s12 m6">
                        <p>
                            <label>
                                <input class="with-gap" name="formula" type="radio" checked />
                                <span>Fórmula do Raio (PI * R²)</span>
                            </label>
                        </p>
                    </div>
                    <div class="col s12 m6">
                        <p>
                            <label>
                                <input class="with-gap" name="formula" type="radio" />
                                <span>Fórmula do Diâmetro (PI * D² / 4)</span>
                            </label>
                        </p>
                    </div>
                </div>

                <div class="row">
                    <div class="col s12">
                        <span id="formulasName">Raio</span>:<br class="hide-on-med-and-up">
                        <div class="input-field inline">
                            <input id="number" type="number" placeholder="Digite aqui o raio." min="0" value="1">
                        </div>
                    </div>

                    <div class="col s12">
                        Medida:<br class="hide-on-med-and-up">
                        <div class="input-field inline">
                            <select id="medida">
                                <option value="km">Kilômetros</option>
                                <option value="hm">Hectômetros</option>
                                <option value="dam">Decâmetros</option>
                                <option value="m" selected>Metros</option>
                                <option value="dm">Decímetros</option>
                                <option value="cm">Centímetros</option>
                                <option value="mm">Milímetros</option>
                            </select>
                        </div>
                    </div>

                    <div class="col s12">
                        Casas decimais:<br class="hide-on-med-and-up">
                        <div class="input-field inline">
                            <select id="decimal">
                                <option value="0">Nenhuma</option>
                                <option value="1">1</option>
                                <option value="2" selected>2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="48">48</option>
                                <option value="-1">Automática</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button title="Calcular Área" class="btn btn-center waves-effect white black-text z-depth-2" onclick="calculate()">Calcular área</button>

                <div class="divider mt-2"></div>

                <input type="text" id="result" placeholder="Resultado">
                <button title="Copiar" class="btn waves-effect waves-dark white black-text" onclick="copyResult()">Copiar</button>
            </div>
        </div>
    </main>

    <?php include_once("$path/componentes/footer.php") ?>

    <script src="/algoritmos/circle_area.js"></script>
    <script src="src/js/index.js"></script>
    <script src="/src/js/main.js"></script>
</body>

</html> 