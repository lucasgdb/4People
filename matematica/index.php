<!DOCTYPE html>
<html lang="pt-br">

<head>
    <!-- Links -->
    <link rel="stylesheet" href="../src/css/materialize.min.css">
    <link rel="stylesheet" href="../src/css/style.css">
    <title>Matemática - 4People</title>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <?php include_once('../components/metas.php') ?>
</head>

<body>
    <header>
        <nav class="blue accent-4">
            <a href="#" id="menu" data-target="slide-out" class="sidenav-trigger show-on-large"><i class="material-icons">menu</i></a>
            <div class="nav-wrapper">
                <a href="/" class="brand-logo right hide-on-large-only">4People</a>
                <ul id="nav-mobile" class="left hide-on-med-and-down">
                    <li><a href="/"><i class="material-icons left">home</i>Início</a></li>
                    <li><a href="/computacao/"><i class="material-icons left">computer</i>Computação</a></li>
                    <li class="active"><a href="/matematica/"><i class="material-icons left">functions</i>Matemática</a></li>
                    <li><a href="/outras_ferramentas/"><i class="material-icons left">settings</i>Outras Ferramentas</a></li>
                </ul>
            </div>
        </nav>

        <ul id="slide-out" class="sidenav sidenav-fixed collapsible">
            <?php
            include_once('../components/computacao.php');
            $active = 'class="active"';
            include_once('../components/matematica.php');
            unset($active);
            include_once('../components/outros_componentes.php')
            ?>
            <div class="divider"></div>
        </ul>
    </header>

    <main>
        <div class="container">
            <div class="card-panel">
                <h2>Ferramentas</h2>
            </div>
        </div>
    </main>

    <?php include_once('../components/footer.php') ?>

    <script src="../src/js/materialize.min.js"></script>
    <script src="../src/js/script.js"></script>
</body>

</html> 