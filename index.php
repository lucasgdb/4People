<!DOCTYPE html>
<html lang="pt-br">

<head>
    <!-- Links -->
    <link rel="stylesheet" href="src/css/materialize.min.css">
    <link rel="stylesheet" href="src/css/style.css">
    <!-- Information -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no">
    <meta name="title" content="4People - Ferramentas OnLine">
    <meta name="description" content="4People é site com ferramentas online para as pessoas.">
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,faker">
    <meta name="author" content="Lucas Naja">
    <title>4People - Ferramentas OnLine</title>
    <!-- PWA -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="application-name" content="4People">
    <meta name="apple-mobile-web-app-title" content="4People">
    <meta name="theme-color" content="#343e51">
    <meta name="msapplication-navbutton-color" content="#343e51">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="msapplication-starturl" content="https://4people.now.sh/">
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://4people.now.sh/">
    <meta property="og:title" content="4People - Ferramentas OnLine">
    <meta property="og:description" content="4People é site com ferramentas online para as pessoas.">
    <meta property="og:image" content="https://4people.now.sh/images/4people.png">
    <meta property="og:image:alt" content="Print da página inicial do 4People.">
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://4people.now.sh/">
    <meta name="twitter:title" content="4People - Ferramentas OnLine">
    <meta name="twitter:description" content="4People é site com ferramentas online para as pessoas.">
    <meta name="twitter:image" content="https://4people.now.sh/images/4people.png">
    <meta name="twitter:image:alt" content="Print da página inicial do 4People.">
    <meta name="twitter:creator" content="@LucasNaja0">
    <meta name="twitter:site" content="@LucasNaja0">
    <!-- Robots -->
    <meta name="robots" content="index,follow,noodp">
    <meta name="robots" content="noydir">
    <meta name="slurp" content="noydir">
</head>

<body>
    <nav class="blue accent-4">
        <a href="#" id="menu" data-target="slide-out" class="sidenav-trigger show-on-large"><i class="material-icons">menu</i></a>
        <div class="nav-wrapper">
            <a href="./" class="brand-logo right">4People</a>
            <ul id="nav-mobile" class="left hide-on-med-and-down">
                <li class="active"><a href="sass.html">Início</a></li>
                <li><a href="badges.html">Computação</a></li>
                <li><a href="collapsible.html">Matemática</a></li>
                <li><a href="collapsible.html">Outras Ferramentas</a></li>
            </ul>
        </div>
    </nav>

    <ul id="slide-out" class="sidenav sidenav-fixed collapsible">
        <?php
        include_once('components/computacao.php');
        include_once('components/matematica.php');
        include_once('components/outras_ferramentas.php')
        ?>
    </ul>

    <main>
        <div class="container">
            <div class="card-panel">
                <h2>Ferramentas</h2>
            </div>
        </div>
    </main>

    <?php include_once('components/footer.php') ?>

    <script src="src/js/materialize.min.js"></script>
    <script src="src/js/script.js"></script>
</body>

</html> 