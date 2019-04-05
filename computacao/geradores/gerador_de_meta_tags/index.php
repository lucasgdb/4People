<?php include_once('../../../assets/asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once("$path/components/links.php") ?>
    <link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
    <title>Gerador de Meta Tags - 4People</title>
    <?php include_once("$path/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Gerador de Meta Tags - 4People">
    <meta name="description" content="Gerar Meta Tags OnLine. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="./computacao/geradores/gerador_de_meta_tags/">
    <meta property="og:title" content="Gerador de Meta Tags - 4People">
    <meta name="twitter:title" content="Gerador de Meta Tags - 4People">
    <meta property="og:url" content="./computacao/geradores/gerador_de_meta_tags/">
    <meta name="twitter:url" content="./computacao/geradores/gerador_de_meta_tags/">
</head>

<body>
    <?php include_once("$path/components/topComponents.php") ?>

    <ul id="slide-out" class="sidenav sidenav-fixed collapsible">
        <?php include_once("$path/components/logo.php") ?>

        <li class="active">
            <div class="collapsible-header"><i class="material-icons">computer</i>Computação</div>
            <div class="collapsible-body">
                <ul class="collapsible padding-headers">
                    <li class="active">
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

        <li>
            <div class="collapsible-header"><i class="material-icons">functions</i>Matemática</div>
            <div class="collapsible-body">
                <ul class="collapsible padding-headers">
                    <li>
                        <?php include_once("$path/components/matematica/calculadoras.php") ?>
                    </li>

                    <li>
                        <?php include_once("$path/components/matematica/calculo_de_areas.php") ?>
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
                <h1 class="flow-text mt-2">Gerador de Meta Tags</h1>

                <label>Gerador de Meta Tags OnLine, feito para gerar várias das Meta Tags existentes.</label>
                <div class="divider"></div>

                <h5>Informações</h5>

                <div class="row mt-2">
                    <div class="col s12 m6">
                        <div class="row mb-0">
                            <p class="mb-0 col s12">Nome do site:</p>

                            <div class="input-field col s12">
                                <input id="siteName" type="text" placeholder="Ex: 4People">
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="row mb-0">
                            <p class="mb-0 col s12">Autor do site:</p>

                            <div class="input-field col s12">
                                <input id="author" type="text" placeholder="Ex: Lucas Bittencourt">
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="row mb-0">
                            <p class="mb-0 col s12">Copyright:</p>

                            <div class="input-field col s12">
                                <input id="copyright" type="text" placeholder="Ex: © 4People - 2019">
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="row mb-0">
                            <p class="mb-0 col s12">Linguagens do site:</p>

                            <div class="input-field col s12">
                                <input id="languages" type="text" placeholder="Ex: pt-br, en-US, fr">
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="row mb-0">
                            <p class="mb-0 col s12">IDE ou Editor de Texto utilizado:</p>

                            <div class="input-field col s12">
                                <input id="generator" type="text" placeholder="Ex: Microsoft Visual Studio Code">
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="row mb-0">
                            <p class="mb-0 col s12">Classificação:</p>

                            <div class="input-field col s12">
                                <select id="rating">
                                    <option value="general" selected>Todas as idades</option>
                                    <option value="14 years">Censura 14 anos</option>
                                    <option value="mature">A partir de 18 anos</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <p class="mb-0 col s12">Título do site. Caracteres usados: <span id="titleCount">0</span>. Recomendado: 63-90</p>
                    <div class="input-field col s12">
                        <input oninput="countCharacters(event, titleCount)" id="title" type="text" placeholder="Ex: 4People - Ferramentas OnLine">
                    </div>

                    <p class="mb-0 col s12">Descrição do site: Caracteres usados: <span id="descCount">0</span>. Recomendado: 160-300</p>
                    <div class="input-field col s12">
                        <input oninput="countCharacters(event, descCount)" id="description" type="text" placeholder="Ex. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
                    </div>

                    <p class="mb-0 col s12">Palavras-chave do site: Caracteres usados: <span id="keywordCount">0</span>. Recomendado: 160-200</p>
                    <div class="input-field col s12">

                        <input oninput="countCharacters(event, keywordCount)" id="keywords" type="text" placeholder="Ex: 4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
                    </div>
                </div>

                <div class="divider"></div>

                <h5>Viewport</h5>

                <div class="row">
                    <div class="col s12 m4">
                        <div class="row mb-0">
                            <p class="mb-0 col s12">Escala inicial:</p>

                            <div class="input-field col s12">
                                <input id="initialScale" type="number" placeholder="1.0" min="0.0" max="2.0" step="0.1" value="1.0">
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m4">
                        <div class="row mb-0">
                            <p class="mb-0 col s12">Escala mínima:</p>
                            <div class="input-field col s12">
                                <input id="minimumScale" type="number" placeholder="0.0" min="0.0" max="2.0" step="0.1" value="0.0">
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m4">
                        <div class="row mb-0">
                            <p class="mb-0 col s12">Escala máxima:</p>
                            <div class="input-field col s12">
                                <input id="maximumScale" type="number" placeholder="2.0" min="0.0" max="2.0" step="0.1" value="2.0">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col s12 m6">
                        <div class="row mb-0">
                            <p class="mb-0 col s12">Escalável:</p>
                            <div class="col s4 m3">
                                <p>
                                    <label>
                                        <input class="with-gap" name="scalable" type="radio" checked>
                                        <span>Sim</span>
                                    </label>
                                </p>
                            </div>

                            <div class="col s4 m3">
                                <p>
                                    <label>
                                        <input class="with-gap" name="scalable" type="radio">
                                        <span>Não</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="row mb-0">
                            <p class="mb-0 col s12">Encolher para caber:</p>
                            <div class="col s4 m3">
                                <p>
                                    <label>
                                        <input class="with-gap" name="shrinkToFit" type="radio" checked>
                                        <span>Sim</span>
                                    </label>
                                </p>
                            </div>

                            <div class="col s4 m3">
                                <p>
                                    <label>
                                        <input class="with-gap" name="shrinkToFit" type="radio">
                                        <span>Não</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <button title="Gerar Meta Tags" class="btn btn-center waves-effect white black-text z-depth-2" onclick="generate()">
                    Gerar Meta Tags
                </button>

                <div class="divider mt-2"></div>

                <textarea class="mt-2" id="result" placeholder="Resultado" spellcheck="false"></textarea>
                <button title="Copiar" class="btn waves-effect waves-dark white black-text" onclick="copyResult()">
                    Copiar
                </button>
            </div>
        </div>
    </main>

    <?php include_once("$path/components/footer.php") ?>

    <script src="<?= "$return/algorithms/metaTagsGenerator.js" ?>"></script>
    <script src="<?= "$return/src/js/materialize.min.js" ?>"></script>
    <script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
    <script src="<?= "$return/src/js/main.js" ?>"></script>
</body>

</html>