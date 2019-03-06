<!DOCTYPE html>
<?php $path = '../../..' ?>
<html lang="pt-br">

<head>
    <?php include_once("$path/componentes/links.php") ?>
    <link rel="stylesheet" href="src/index.css">
    <title>Gerador de Senha - 4People</title>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <?php include_once("$path/componentes/metas.php") ?>
    <meta name="title" content="Contador de Caracteres - 4People">
    <meta name="description" content="Gerador de Senha. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="https://4people.now.sh/geradores/funcoes_string/gerador_de_senha/">
    <meta property="og:title" content="Gerador de Senha - 4People">
    <meta name="twitter:title" content="Gerador de Senha - 4People">
    <meta property="og:url" content="https://4people.now.sh/computacao/geradores/gerador_de_senha/">
    <meta name="twitter:url" content="https://4people.now.sh/computacao/geradores/gerador_de_senha/">
</head>

<body>
    <?php
    include_once("$path/componentes/noscript.php");
    include_once("$path/componentes/spinner.php")
    ?>

    <header class="hide">
        <?php include_once("$path/componentes/nav.php") ?>

        <ul id="slide-out" class="sidenav sidenav-fixed collapsible">
            <?php include_once("$path/componentes/logo.php") ?>

            <li class="active">
                <div class="collapsible-header"><i class="material-icons">computer</i>Computação</div>
                <div class="collapsible-body">
                    <ul class="collapsible padding-headers">
                        <li class="active">
                            <?php include_once("$path/componentes/computacao/geradores.php") ?>
                        </li>

                        <li>
                            <?php include_once("$path/componentes/computacao/validadores.php") ?>
                        </li>

                        <li>
                            <?php include_once("$path/componentes/computacao/funcoes_string.php") ?>
                        </li>

                        <li>
                            <?php include_once("$path/componentes/computacao/rede_e_internet.php") ?>
                        </li>

                        <li>
                            <?php include_once("$path/componentes/computacao/codif_decodif.php") ?>
                        </li>

                        <li>
                            <?php include_once("$path/componentes/computacao/tabelas_e_padroes.php") ?>
                        </li>
                    </ul>
                </div>
            </li>

            <li>
                <div class="collapsible-header"><i class="material-icons">functions</i>Matemática</div>
                <div class="collapsible-body">
                    <ul class="collapsible padding-headers">
                        <li>
                            <?php include_once("$path/componentes/matematica/calculadoras.php") ?>
                        </li>

                        <li>
                            <?php include_once("$path/componentes/matematica/calcular_areas.php") ?>
                        </li>

                        <li>
                            <?php include_once("$path/componentes/matematica/datas_e_horas.php") ?>
                        </li>
                    </ul>
                </div>
            </li>

            <li>
                <div class="collapsible-header"><i class="material-icons">build</i>Outras Ferramentas</div>
                <div class="collapsible-body">
                    <ul class="collapsible padding-headers">
                        <li>
                            <?php include_once("$path/componentes/outras_ferramentas/dia_a_dia.php") ?>
                        </li>

                        <li>
                            <?php include_once("$path/componentes/outras_ferramentas/jogos.php") ?>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </header>

    <main class="hide">
        <div class="container">
            <div class="card-panel">
                <h1 class="flow-text mt-2">Gerador de senha</h1>

                <label>Gerador de Senha OnLine para gerar senhas personalizadas e fortes</label>
                <div class="divider"></div>

                <div class="row">
                    <p>Primeiro caractere</p>
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
                    <p>Outros caracteres</p>
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
                            <input placeholder="E.g: ^<>:,.~´`'" id="additionalChars" type="text">
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
                    <div class="col s12 m4 l12">
                        <p>
                            <label>
                                <input id="equalChars" type="checkbox" class="filled-in" checked>
                                <span>Excluir caracteres iguais</span>
                            </label>
                        </p>
                    </div>

                    <div class="col s12 m4 l12">
                        <p>
                            <label>
                                <input id="similarChars" type="checkbox" class="filled-in" checked>
                                <span>Excluir caracteres similares</span>
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

                <div class="divider"></div>
                <textarea class="mt-2" id="result" placeholder="Resultado"></textarea>
                <button class="btn waves-effect waves-dark black-text white" onclick="generate()">Gerar senha</button>
                <button class="btn waves-effect waves-dark black-text white" onclick="copyResult()">Copiar</button>

            </div>
        </div>
    </main>

    <?php include_once("$path/componentes/footer.php") ?>

    <script src="/algoritmos/passwordGenerate.js"></script>
    <script src="src/index.js"></script>
    <script src="/src/js/main.js"></script>
</body>

</html> 