<?php include_once('../asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once("$path/components/links.php") ?>
    <link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
    <title>Fale conosco - 4People</title>
    <?php include_once("$path/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Contato - 4People">
    <meta name="description" content="4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="https://4people.now.sh/contato/">
    <meta property="og:title" content="Contato - 4People">
    <meta name="twitter:title" content="Contato - 4People">
    <meta property="og:url" content="https://4people.now.sh/contato/">
    <meta name="twitter:url" content="https://4people.now.sh/contato/">
</head>

<body>
    <?php
    session_start();

    if (isset($_SESSION['msg'])) {
        $msg = $_SESSION['msg']['type'];
        if ($msg === 'error') {
            echo '<script>M.toast({html:"Não foi possível enviar o e-mail.",classes:"red accent-4"})</script>';
        } else if ($msg === 'success') {
            echo '<script>M.toast({html:"E-mail enviado com sucesso! Aguarde retorno.",classes:"green"})</script>';
        }
    }

    unset($_SESSION['msg']);
    include_once("$path/components/noscript.php");
    include_once("$path/components/spinner.php");
    include_once("$path/components/header.php")
    ?>

    <ul id="slide-out" class="sidenav sidenav-fixed collapsible hide">
        <?php include_once("$path/components/logo.php") ?>

        <li>
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

    <main class="grey lighten-5 hide">
        <div class="container">
            <div class="card-panel">
                <h1 class="flow-text mt-2">Fale conosco</h1>

                <label>Alguma dúvida? Algum bug? Deseja alguma ferramenta nova? Por favor, nos contate e deixe-nos sabendo de qualquer coisa.</label>
                <div class="divider"></div>

                <h5>Dados</h5>

                <form class="mt-2" action="mail.php" method="post">
                    <div class="row">
                        <div class="input-field col s12 m6">
                            <input placeholder="Ex: Lucas" oninvalid="this.setCustomValidity('Por favor, preencha esse campo com seu nome.')" oninput="setCustomValidity('')" name="firstName" id="firstName" type="text" class="validate" required>
                            <label for="firstName">Nome</label>
                        </div>

                        <div class="input-field col s12 m6">
                            <input placeholder="Ex: Bittencourt" oninvalid="this.setCustomValidity('Por favor, preencha esse campo com seu sobrenome.')" oninput="setCustomValidity('')" name="lastName" id="lastName" type="text" class="validate" required>
                            <label for="lastName">Sobrenome</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <input placeholder="Ex: lucasnaja0@gmail.com" oninvalid="this.setCustomValidity('Por favor, preencha esse campo com seu e-mail.')" oninput="setCustomValidity('')" name="email" id="email" type="email" class="validate" required>
                            <label for="email">E-mail</label>
                        </div>
                    </div>

                    <div class="divider"></div>

                    <h5>Informações</h5>
                    <textarea name="subject" placeholder="Mensagem" oninvalid="this.setCustomValidity('Por favor, preencha esse campo.')" oninput="setCustomValidity('')" spellcheck="false" required></textarea>

                    <button title="Enviar" class="btn waves-effect waves-dark white black-text" type="submit">
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    </main>

    <?php include_once("$path/components/footer.php") ?>

    <script src="<?= $return ?>/src/js/main.js"></script>
</body>

</html> 