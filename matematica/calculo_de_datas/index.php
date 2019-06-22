<?php include_once('../../assets/assets.php') ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <link rel="stylesheet" href="<?= $assets ?>/src/css/materialize.min.css">
    <link rel="stylesheet" href="<?= $assets ?>/src/css/main.css">
    <title>Datas e Horas - 4People</title>
    <?php include_once("$assets/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Datas e Horas - 4People">
    <meta name="description" content="Datas e Horas. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="./matematica/calculo_de_datas/">
    <meta property="og:title" content="Datas e Horas - 4People">
    <meta name="twitter:title" content="Datas e Horas - 4People">
    <meta property="og:url" content="./matematica/calculo_de_datas/">
    <meta name="twitter:url" content="./matematica/calculo_de_datas/">
</head>

<body class="grey lighten-3">
    <?php
    include_once("$assets/components/noscript.php");
    include_once("$assets/components/spinner.php");
    include_once("$assets/components/header.php");
	 include_once("$assets/components/sidenav.php")
	 ?>

    <main>
        <div class="container">
            <div class="card-panel">
                <h1 class="flow-text" style="margin:0 0 5px"><i class="material-icons left">timer</i>Cálculo de Datas</h1>

                <label>Ferramentas de Cálculo de Datas do 4People</label>
                <div class="divider"></div>
            </div>
        </div>
    </main>

    <?php include_once("$assets/components/footer.php") ?>

    <script src="<?= $assets ?>/src/js/materialize.min.js"></script>
    <script src="<?= $assets ?>/src/js/main.js"></script>
</body>

</html>
