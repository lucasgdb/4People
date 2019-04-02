<?php include_once('../../../asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once("$path/components/links.php") ?>
    <link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
    <title>Gerador de Senha - 4People</title>
    <?php include_once("$path/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Gerador de Senha - 4People">
    <meta name="description" content="Gerador de Senha OnLine para gerar senhas personalizadas e fortes. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="./computacao/geradores/gerador_de_senha/">
    <meta property="og:title" content="Gerador de Senha - 4People">
    <meta name="twitter:title" content="Gerador de Senha - 4People">
    <meta property="og:url" content="./computacao/geradores/gerador_de_senha/">
    <meta name="twitter:url" content="./computacao/geradores/gerador_de_senha/">
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
                    <li class="active">
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
                <h1 class="flow-text mt-2">Gerador de Senha</h1>

                <label>Gerador de Senha OnLine para gerar senhas personalizadas e fortes.</label>
                <div class="divider"></div>

                <div class="row">
                    <p class="mb-0">Primeiro caractere</p>
                    <div class="col s6 m3">
                        <p>
                            <label>
                                <input class="with-gap" name="firstCharacter" type="radio" checked>
                                <span>Número</span>
                            </label>
                        </p>
                    </div>

                    <div class="col s6 m3">
                        <p>
                            <label>
                                <input class="with-gap" name="firstCharacter" type="radio">
                                <span>Maiúsculo</span>
                            </label>
                        </p>
                    </div>

                    <div class="col s6 m3">
                        <p>
                            <label>
                                <input class="with-gap" name="firstCharacter" type="radio">
                                <span>Minúsculo</span>
                            </label>
                        </p>
                    </div>

                    <div class="col s6 m3">
                        <p>
                            <label>
                                <input class="with-gap" name="firstCharacter" type="radio">
                                <span>Especial</span>
                            </label>
                        </p>
                    </div>
                </div>

                <div class="row">
                    <p class="mb-0">Outros caracteres</p>
                    <div class="col s6 m3">
                        <p>
                            <label>
                                <input type="checkbox" checked>
                                <span>Números</span>
                            </label>
                        </p>
                    </div>

                    <div class="col s6 m3">
                        <p>
                            <label>
                                <input type="checkbox" checked>
                                <span>Maiúsculos</span>
                            </label>
                        </p>
                    </div>

                    <div class="col s6 m3">
                        <p>
                            <label>
                                <input type="checkbox" checked>
                                <span>Minúsculos</span>
                            </label>
                        </p>
                    </div>

                    <div class="col s6 m3">
                        <p>
                            <label>
                                <input type="checkbox">
                                <span>Especiais</span>
                            </label>
                        </p>
                    </div>
                </div>

                <div class="row">
                    <div class="col s12">
                        Caracteres adicionais:
                        <div class="input-field inline">
                            <input placeholder="E.g: ^<>:,.~´`'." id="additionalChars" type="text">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col s12">
                        Tamanho:
                        <div class="input-field inline">
                            <input placeholder="Tamanho da senha" id="length" type="number" min="6" value="12">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col s12 m4 l6">
                        <p>
                            <label>
                                <input id="equalChars" type="checkbox" class="filled-in" checked>
                                <span>Excluir caracteres iguais (AA, ll, 22)</span>
                            </label>
                        </p>
                    </div>

                    <div class="col s12 m4 l6">
                        <p>
                            <label>
                                <input id="similarChars" type="checkbox" class="filled-in" checked>
                                <span>Excluir caracteres similares (lL, lj, O0)</span>
                            </label>
                        </p>
                    </div>

                    <div class="col s12 m4 l12">
                        <p>
                            <label>
                                <input id="strength" type="checkbox" class="filled-in" checked>
                                <span>Força de Senha</span>
                            </label>
                        </p>
                    </div>
                </div>

                <button title="Gerar Senha" class="btn btn-center waves-effect waves-dark black-text white" onclick="generate()">
                    Gerar senha
                </button>
                <div class="divider mt-2"></div>

                <p class="mb-0">Força de senha: <span id="passwordLength"></span></p>
                <textarea class="mt-2" id="result" placeholder="Resultado" spellcheck="false"></textarea>
                <button title="Copiar" class="btn waves-effect waves-dark black-text white" onclick="copyResult()">
                    Copiar
                </button>
            </div>
        </div>
    </main>

    <?php include_once("$path/components/footer.php") ?>

    <script src="<?= "$return/algorithms/passwordGenerator.js" ?>"></script>
    <script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
    <script src="<?= "$return/src/js/main.js" ?>"></script>
</body>

</html> 