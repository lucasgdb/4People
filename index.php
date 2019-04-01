<?php include_once('asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once("$path/components/links.php") ?>
    <link rel="stylesheet" href="<?= $return ?>/src/css/index.css">
    <title>4People - Ferramentas OnLine</title>
    <?php include_once("$path/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="4People - Ferramentas OnLine">
    <meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="./">
    <meta property="og:title" content="4People - Ferramentas OnLine">
    <meta name="twitter:title" content="4People - Ferramentas OnLine">
    <meta property="og:url" content="./">
    <meta name="twitter:url" content="./">
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

        <li class="active">
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

        <li class="active">
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
                <div class="slider">
                    <ul class="slides">
                        <li class="grey lighten-1">
                            <img>
                            <div class="caption center-align">
                                <h3 class="dark grey-text text-darken-4">FEITO PARA TODOS!</h3>
                                <h5 class="light grey-text text-darken-4">Possuímos ferramentas para Programadores, professores, estudantes e usuários comuns.</h5>
                            </div>
                        </li>

                        <li class="grey lighten-1">
                            <div class="caption left-align">
                                <h3 class="dark grey-text text-darken-4">MAIS RÁPIDO!</h3>
                                <h5 class="light grey-text text-darken-4">Nossas ferramentas foram todas escritas em JavaScript, para maior velocidade e segurança.</h5>
                            </div>
                        </li>

                        <li class="grey lighten-1">
                            <div class="caption right-align">
                                <h3 class="dark grey-text text-darken-4">MAIS ACESSÍVEL!</h3>
                                <h5 class="light grey-text text-darken-4">Nosso site que permite que qualquer um acesse-o offline e tem suporte a PWA.</h5>
                            </div>
                        </li>

                        <li class="grey lighten-1">
                            <div class="caption center-align">
                                <h3 class="dark grey-text text-darken-4">O MELHOR!</h3>
                                <h5 class="light grey-text text-darken-4">O 4People possui as melhores ferramentas atualizadas. Tá sentindo falta de alguma? Por favor, nos envie um <a href="./contato/">e-mail</a>.</h5>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </main>

    <?php include_once("$path/components/footer.php") ?>

    <!-- <script type='text/javascript'>
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('./service-worker.js')
                .then(() => console.log('worker registered!'))
        }
    </script> -->
    <script src="<?= $return ?>/src/js/index.js"></script>
    <script src="<?= $return ?>/src/js/main.js"></script>
</body>

</html> 