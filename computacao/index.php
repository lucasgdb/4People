<?php include_once('../asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once("$path/components/links.php") ?>
    <link rel="stylesheet" href="<?= "$return/src/css/cards.css" ?>">
    <title>Computação - 4People</title>
    <?php include_once("$path/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="4People - Ferramentas OnLine">
    <meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="./computacao/">
    <meta property="og:title" content="Computação - 4People">
    <meta name="twitter:title" content="Computação - 4People">
    <meta property="og:url" content="./computacao/">
    <meta name="twitter:url" content="./computacao/">
</head>

<body>
    <?php
    include_once("$path/components/noscript.php");
    include_once("$path/components/spinner.php");
    include_once("$path/components/header.php")
    ?>

    <ul id="slide-out" class="sidenav sidenav-fixed collapsible">
        <?php include_once("$path/components/logo.php") ?>

        <li class="active">
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

        <li>
            <div class="collapsible-header"><i class="material-icons">functions</i>Matemática</div>
            <div class="collapsible-body">
                <ul class="collapsible padding-headers">
                    <li>
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
                <h1 class="flow-text mt-2">Principais Ferramentas</h1>

                <div class="row mb-0">
                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Gerador de CPF<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Gerador de CPF OnLine que gera CPFs verdadeiros para Programadores testarem seus Softwares em desenvolvimento.
                                </p>
                            </div>

                            <div class="card-action grey lighten-1">
                                <a class="black-text" href="./geradores/gerador_de_cpf/">Ferramenta &raquo;</a>
                                <a class="black-text" href="./geradores/">Geradores &raquo;</a>
                            </div>

                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/CPFGenerator.js" target="_blank">Clique aqui</a> para ir direto ao código fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Validador de CPF<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Validador de CPF OnLine que valida CPFs para Programadores testarem seus Softwares em desenvolvimento.
                                </p>
                            </div>

                            <div class="card-action grey lighten-1">
                                <a class="black-text" href="./validadores/validador_de_cpf/">Ferramenta &raquo;</a>
                                <a class="black-text" href="./validadores/">Validadores &raquo;</a>
                            </div>

                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/CPFValidator.js" target="_blank">Clique aqui</a> para ir direto ao código fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-0">
                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Contador de Caracteres<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Contador de Caracteres OnLine para contar os caracteres de um texto em vários níveis diferentes.
                                </p>
                            </div>

                            <div class="card-action grey lighten-1">
                                <a class="black-text" href="./funcoes_string/contador_de_caracteres/">Ferramenta &raquo;</a>
                                <a class="black-text" href="./funcoes_string/">Funções String &raquo;</a>
                            </div>

                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/charactersCount.js" target="_blank">Clique aqui</a> para ir direto ao código fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Meu IP<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Veja seu IP, localização, provedora, longitude, latitude, e muito mais.
                                </p>
                            </div>
                            <div class="card-action grey lighten-1">
                                <a class="black-text" href="./rede_e_internet/meu_ip/">Ferramenta &raquo;</a>
                                <a class="black-text" href="./rede_e_internet/">Rede e Internet &raquo;</a>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/computacao/rede_e_internet/meu_ip/src/index.js" target="_blank">Clique aqui</a> para ir direto ao código fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-0">
                    <div class="col s12 m6">
                        <div class="card sticky-action">
                            <div class="card-content grey lighten-2">
                                <span class="card-title activator no-select">Conversor de Código Binário<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Codificador e Decodificador de Código Binário OnLine para converter código binário em texto e vice-versa.
                                </p>
                            </div>
                            <div class="card-action grey lighten-1">
                                <a class="black-text" href="./codif_decodif/conversor_binario/">Ferramenta &raquo;</a>
                                <a class="black-text" href="./codif_decodif/">Codificadores & Decodificadores &raquo;</a>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4 no-select">Código Fonte<i class="material-icons right">close</i></span>
                                <p><a href="https://github.com/LucasNaja/4People/blob/master/assets/algorithms/binaryConverter.js" target="_blank">Clique aqui</a> para ir direto ao código fonte no GitHub.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <?php include_once("$path/components/footer.php") ?>

    <script src="<?= "$return/src/js/main.js" ?>"></script>
</body>

</html> 