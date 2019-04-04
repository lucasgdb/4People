<?php include_once('../../../assets/asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once("$path/components/links.php") ?>
    <link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
    <title>Conversor Binário - 4People</title>
    <?php include_once("$path/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Conversor de Código Binário - 4People">
    <meta name="description" content="Conversor Binário. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="./computacao/codif_decodif/conversor_binario/">
    <meta property="og:title" content="Conversor Binário - 4People">
    <meta name="twitter:title" content="Conversor Binário - 4People">
    <meta property="og:url" content="./computacao/codif_decodif/conversor_binario/">
    <meta name="twitter:url" content="./computacao/codif_decodif/conversor_binario/">
</head>

<body>
    <?php include_once("$path/components/topComponents.php") ?>

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

                    <li class="active">
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
                        <?php include_once("$path/components/matematica/calculo_de_areas.php") ?>
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
                <h1 class="flow-text mt-2">Conversor Binário</h1>

                <label>Tradutor OnLine de Código Binário. Basta digitar o código binário ou texto abaixo e clicar no botão para converter.</label>
                <div class="divider"></div>

                <textarea class="mt-2" id="text" placeholder="Digite aqui o texto" spellcheck="false"></textarea>

                <button title="Converter texto para Binário" class="btn waves-effect waves-dark white black-text" onclick="convertToBinary()">
                    Converter para Binário
                </button>
                <button title="Copiar texto" class="btn waves-effect waves-dark white black-text right" onclick="copyResult(txtText)">
                    Copiar
                </button>

                <textarea class="mt-2" id="binary" placeholder="Digite aqui o código binário" spellcheck="false"></textarea>

                <button title="Converter Código Binário para texto" class="btn waves-effect waves-dark white black-text" onclick="convertToText()">
                    Converter para Texto
                </button>
                <button title="Copiar Código Binário" class="btn waves-effect waves-dark white black-text right" onclick="copyResult(txtBinaryCode)">
                    Copiar
                </button>
            </div>
        </div>
    </main>

    <?php include_once("$path/components/footer.php") ?>

    <script src="<?= "$return/algorithms/binaryConverter.js" ?>"></script>
    <script src="<?= "$return/src/js/materialize.min.js" ?>"></script>
    <script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
    <script src="<?= "$return/src/js/main.js" ?>"></script>
</body>

</html> 