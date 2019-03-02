<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once('../components/links.php') ?>
    <title>Computação - 4People</title>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <?php include_once('../components/metas.php') ?>
</head>

<body>
    <?php include_once('../components/spinner.php') ?>

    <header>
        <nav class="indigo lighten-5">
            <a href="#" id="menu" data-target="slide-out" class="sidenav-trigger show-on-large black-text"><i class="material-icons">menu</i></a>
            <div class="nav-wrapper">
                <a href="/" class="brand-logo right hide-on-large-only grey-text text-darken-4">4People</a>
                <ul id="nav-mobile" class="left hide-on-med-and-down">
                    <li title="Início" class="waves-effect"><a class="grey-text text-darken-4" href="/"><i class="material-icons left">home</i>Início</a></li>
                    <li title="Computação" class="active waves-effect"><a class="grey-text text-darken-4" href="/computacao/"><i class="material-icons left">computer</i>Computação</a></li>
                    <li title="Matemática" class="waves-effect"><a class="grey-text text-darken-4" href="/matematica/"><i class="material-icons left">functions</i>Matemática</a></li>
                    <li title="Outras Ferramentas" class="waves-effect"><a class="grey-text text-darken-4" href="/outras_ferramentas/"><i class="material-icons left">settings</i>Outras Ferramentas</a></li>
                </ul>
            </div>
        </nav>

        <ul id="slide-out" class="sidenav sidenav-fixed collapsible">
            <?php
            include_once('../components/logo.php');
            $active = 'class="active"';
            include_once('../components/computacao.php');
            unset($active);
            include_once('../components/matematica.php');
            include_once('../components/outras_ferramentas.php')
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

    <script src="/src/js/scripts.js"></script>
</body>

</html> 