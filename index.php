<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once('componentes/links.php') ?>
    <link rel="stylesheet" href="src/css/index.css">
    <title>4People - Ferramentas OnLine</title>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <?php include_once('componentes/metas.php') ?>
    <meta name="title" content="4People - Ferramentas OnLine">
    <meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="https://4people.now.sh/">
    <meta property="og:title" content="4People - Ferramentas OnLine">
    <meta name="twitter:title" content="4People - Ferramentas OnLine">
    <meta property="og:url" content="https://4people.now.sh/">
    <meta name="twitter:url" content="https://4people.now.sh/">
</head>

<body>
    <?php
    include_once('componentes/noscript.php');
    include_once('componentes/spinner.php')
    ?>

    <header class="hide">
        <?php include_once('componentes/nav.php') ?>

        <ul id="slide-out" class="sidenav sidenav-fixed collapsible">
            <?php include_once('componentes/logo.php') ?>

            <li class="active">
                <div class="collapsible-header"><i class="material-icons">computer</i>Computação</div>
                <div class="collapsible-body">
                    <ul class="collapsible padding-headers">
                        <li>
                            <?php include_once('componentes/computacao/geradores.php') ?>
                        </li>

                        <li>
                            <?php include_once('componentes/computacao/validadores.php') ?>
                        </li>

                        <li>
                            <?php include_once('componentes/computacao/funcoes_string.php') ?>
                        </li>

                        <li>
                            <?php include_once('componentes/computacao/rede_e_internet.php') ?>
                        </li>

                        <li>
                            <?php include_once('componentes/computacao/codif_decodif.php') ?>
                        </li>

                        <li>
                            <?php include_once('componentes/computacao/tabelas_e_padroes.php') ?>
                        </li>
                    </ul>
                </div>
            </li>

            <li class="active">
                <div class="collapsible-header"><i class="material-icons">functions</i>Matemática</div>
                <div class="collapsible-body">
                    <ul class="collapsible padding-headers">
                        <li>
                            <?php include_once('componentes/matematica/calculadoras.php') ?>
                        </li>

                        <li>
                            <?php include_once('componentes/matematica/calcular_areas.php') ?>
                        </li>

                        <li>
                            <?php include_once('componentes/matematica/datas_e_horas.php') ?>
                        </li>
                    </ul>
                </div>
            </li>

            <li class="active">
                <div class="collapsible-header"><i class="material-icons">build</i>Outras Ferramentas</div>
                <div class="collapsible-body">
                    <ul class="collapsible padding-headers">
                        <li>
                            <?php include_once('componentes/outras_ferramentas/dia_a_dia.php') ?>
                        </li>

                        <li>
                            <?php include_once('componentes/outras_ferramentas/jogos.php') ?>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </header>

    <main class="hide">
        <div class="container">
            <div class="card-panel">
                <div class="slider">
                    <ul class="slides">
                        <li>
                            <img src="images/img1.jpg">
                            <div class="caption center-align">
                                <h3 class="dark black-text">This is our big Tagline!</h3>
                                <h5 class="light black-text">Here's our small slogan.</h5>
                            </div>
                        </li>
                        <li>
                            <img src="images/img2.jpg">
                            <div class="caption left-align">
                                <h3 class="dark black-text">Left Aligned Caption</h3>
                                <h5 class="light black-text">Here's our small slogan.</h5>
                            </div>
                        </li>
                        <li>
                            <img src="images/img3.jpg">
                            <div class="caption right-align">
                                <h3 class="dark black-text">Right Aligned Caption</h3>
                                <h5 class="light black-text">Here's our small slogan.</h5>
                            </div>
                        </li>
                        <li>
                            <img src="images/img4.jpg">
                            <div class="caption center-align">
                                <h3 class="dark black-text">This is our big Tagline!</h3>
                                <h5 class="light black-text">Here's our small slogan.</h5>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </main>

    <?php include_once('componentes/footer.php') ?>

    <script src="src/js/index.js"></script>
    <script src="/src/js/main.js"></script>
</body>

</html> 