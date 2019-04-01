<?php include_once('../asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once("$path/components/links.php") ?>
    <title>Computação - 4People</title>
    <?php include_once("$path/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="4People - Ferramentas OnLine">
    <meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="./computacao/">
    <meta property="og:title" content="4Computação - 4People">
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
                        <?php include_once("$path/components/matematica/datas_e_horas.php") ?>
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
                        <div class="card grey darken-2">
                            <div class="card-content white-text">
                                <span class="card-title activator">Gerador de CPF<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Gerador de CPF OnLine que gera CPFs verdadeiros para Programadores testarem seus Softwares em desenvolvimento.
                                </p>
                            </div>
                            <div class="card-action">
                                <a class="light-blue-text" href="./geradores/gerador_de_cpf/">Gerador de CPF</a>
                                <a class="light-blue-text" href="./geradores/">Geradores</a>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                                <p>Here is some more information about this product that is only revealed once clicked on.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="card sticky-action grey darken-2">
                            <div class="card-content white-text">
                                <span class="card-title activator">Gerador de CC<i class="material-icons right">more_vert</i></span>
                                <p>
                                    Gerador de Cartão de Crédito OnLine que gera Cartões de Créditos válidos para Desenvolvedores testarem seus Softwares em desenvolvimento.
                                </p>
                            </div>
                            <div class="card-action">
                                <a class="light-blue-text" href="./geradores/gerador_de_cartao_de_credito/">Gerador de CC</a>
                                <a class="light-blue-text" href="./geradores/">Geradores</a>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                                <p>Here is some more information about this product that is only revealed once clicked on.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <?php include_once("$path/components/footer.php") ?>

    <script src="<?= $return ?>/src/js/main.js"></script>
</body>

</html> 