<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once('components/links.php') ?>
    <link rel="stylesheet" href="src/css/index.css">
    <title>4People - Ferramentas OnLine</title>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <?php include_once('components/metas.php') ?>
</head>

<body>
    <header>
        <nav class="indigo lighten-5">
            <a href="#" id="menu" data-target="slide-out" class="sidenav-trigger show-on-large black-text"><i class="material-icons">menu</i></a>
            <div class="nav-wrapper">
                <a href="/" class="brand-logo right hide-on-large-only grey-text text-darken-4">4People</a>
                <ul id="nav-mobile" class="left hide-on-med-and-down">
                    <li title="Início" class="active waves-effect"><a class="grey-text text-darken-4" href="/"><i class="material-icons left">home</i>Início</a></li>
                    <li title="Computação" class="waves-effect"><a class="grey-text text-darken-4" href="/computacao/"><i class="material-icons left">computer</i>Computação</a></li>
                    <li title="Matemática" class="waves-effect"><a class="grey-text text-darken-4" href="/matematica/"><i class="material-icons left">functions</i>Matemática</a></li>
                    <li title="Outras Ferramentas" class="waves-effect"><a class="grey-text text-darken-4" href="/outras_ferramentas/"><i class="material-icons left">settings</i>Outras Ferramentas</a></li>
                </ul>
            </div>
        </nav>

        <ul id="slide-out" class="sidenav sidenav-fixed collapsible">
            <?php
            include_once('components/logo.php');
            $active = 'class="active"';
            include_once('components/computacao.php');
            include_once('components/matematica.php');
            include_once('components/outras_ferramentas.php')
            ?>
            <div class="divider"></div>
        </ul>
    </header>

    <main>
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

    <?php include_once('components/footer.php') ?>

    <script src="src/js/index.js"></script>
    <script src="/src/js/scripts.js"></script>
</body>

</html> 