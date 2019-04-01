<?php include_once('../../../asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once("$path/components/links.php") ?>
    <link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
    <title>Meu IP - 4People</title>
    <?php include_once("$path/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Meu IP - 4People">
    <meta name="description" content="Meu IP OnLine para ver informações do seu IP. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="https://4people.now.sh/computacao/rede_e_internet/meu_ip/">
    <meta property="og:title" content="Meu IP - 4People">
    <meta name="twitter:title" content="Meu IP - 4People">
    <meta property="og:url" content="https://4people.now.sh/computacao/rede_e_internet/meu_ip/">
    <meta name="twitter:url" content="https://4people.now.sh/computacao/rede_e_internet/meu_ip/">
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

                    <li class="active">
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
                <h1 class="flow-text mt-2">Meu IP</h1>

                <label>Veja seu IP e mais informações aqui.</label>
                <div class="divider"></div>

                <div class="row mt-0">
                    <div class="col s12">
                        <p class="mt-0">Meu IP: <span id="ip"></span></p>
                        <p class="mt-0">Cidade: <span id="city"></span></p>
                        <p class="mt-0">Região: <span id="region"></span></p>
                        <p class="mt-0">Código da região: <span id="regionCode"></span></p>
                        <p class="mt-0">País: <span id="country"></span></p>
                        <p class="mt-0">Código do país: <span id="countryCode"></span></p>
                        <p class="mt-0">Bandeira: <span id="flag"></span></p>
                        <p class="mt-0">Continente: <span id="continent"></span></p>
                        <p class="mt-0">Código do continente: <span id="continentCode"></span></p>
                        <p class="mt-0">Latitude: <span id="latitude"></span></p>
                        <p class="mt-0">Longitude: <span id="longitude"></span></p>
                        <p class="mt-0">Organização: <span id="organization"></span></p>
                        <p class="mt-0">Código de chamada: <span id="callingCode"></span></p>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <?php include_once("$path/components/footer.php") ?>

    <script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
    <script src="<?= $return ?>/src/js/main.js"></script>
</body>

</html> 