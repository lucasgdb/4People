<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/links.php") ?>
    <link rel="stylesheet" href="src/index.css">
    <title>Sobre - 4People</title>
    <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Sobre - 4People">
    <meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="https://4people.now.sh/sobre/">
    <meta property="og:title" content="Sobre - 4People">
    <meta name="twitter:title" content="Sobre - 4People">
    <meta property="og:url" content="https://4people.now.sh/sobre/">
    <meta name="twitter:url" content="https://4people.now.sh/sobre/">
</head>

<body>
    <?php
    include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/noscript.php");
    include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/spinner.php");
    include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/header.php")
    ?>

    <ul id="slide-out" class="sidenav sidenav-fixed collapsible hide">
        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/logo.php") ?>

        <li>
            <div class="collapsible-header"><i class="material-icons">computer</i>Computação</div>
            <div class="collapsible-body">
                <ul class="collapsible padding-headers">
                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/computacao/geradores.php") ?>
                    </li>

                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/computacao/validadores.php") ?>
                    </li>

                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/computacao/funcoes_string.php") ?>
                    </li>

                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/computacao/rede_e_internet.php") ?>
                    </li>

                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/computacao/codif_decodif.php") ?>
                    </li>

                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/computacao/tabelas_e_padroes.php") ?>
                    </li>
                </ul>
            </div>
        </li>

        <li>
            <div class="collapsible-header"><i class="material-icons">functions</i>Matemática</div>
            <div class="collapsible-body">
                <ul class="collapsible padding-headers">
                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/matematica/calculadoras.php") ?>
                    </li>

                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/matematica/calcular_areas.php") ?>
                    </li>

                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/matematica/datas_e_horas.php") ?>
                    </li>
                </ul>
            </div>
        </li>

        <li>
            <div class="collapsible-header"><i class="material-icons">build</i>Outras Ferramentas</div>
            <div class="collapsible-body">
                <ul class="collapsible padding-headers">
                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/outras_ferramentas/dia_a_dia.php") ?>
                    </li>

                    <li>
                        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/outras_ferramentas/jogos.php") ?>
                    </li>
                </ul>
            </div>
        </li>
    </ul>

    <main class="grey lighten-5 hide">
        <div class="container">
            <div class="card-panel">
                <h1 class="flow-text mt-2">Sobre o 4People</h1>

                <label>4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.</label>
                <div class="divider"></div>

                <h2 class="flow-text mb-0">Informações</h2>
                <div class="divider"></div>
                <p>
                    <strong>4People</strong> é um projeto de TCC da Escola Técnica Alfredo de Barros Santos de Guaratinguetá, no curso de Desenvolvimento de Sistemas.
                    O 4People foi feito por 2 programadores e 2 analistas.
                    Na criação foi utilizado HTML, CSS, JavaScript e PHP como linguagens.
                    O Editor de Texto que utilizamos foi o Visual Studio Code, da Microsoft. 
                </p>

                <h2 class="flow-text">Criadores</h2>
                <div class="divider mt-0"></div>
                <ul class="browser-default">
                    <li>
                        Lucas Bittencourt
                        <ul class="browser-default">
                            <li><a href="#" target="_blank">GitHub</a></li>
                            <li><a href="#" target="_blank">Facebook</a></li>
                            <li><a href="#" target="_blank">LinkedIn</a></li>
                        </ul>
                    </li>
                    <li>
                        Jairo Arcy
                        <ul class="browser-default">
                            <li><a href="#" target="_blank">GitHub</a></li>
                            <li><a href="#" target="_blank">Facebook</a></li>
                        </ul>
                    </li>
                    <li>
                        Renan de Mattos
                        <ul class="browser-default">
                            <li><a href="#" target="_blank">Facebook</a></li>
                        </ul>
                    </li>
                    <li>
                        Suzany Silva
                        <ul class="browser-default">
                            <li><a href="#" target="_blank">Facebook</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </main>

    <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/componentes/footer.php") ?>

    <script src="/src/js/main.js"></script>
</body>

</html> 