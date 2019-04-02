<?php include_once('../../../assets/asset.php') ?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once("$path/components/links.php") ?>
    <link rel="stylesheet" href="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.css">
    <title>Gerador de CPF - 4People</title>
    <?php include_once("$path/components/metas.php") ?>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <meta name="title" content="Gerador de CPF - 4People">
    <meta name="description" content="Gerador de CPF OnLine para gerar CPFs verdadeiros. 4People é um site feito para ajudar estudantes, professores, programadores e pessoas em suas atividades diárias.">
    <meta name="application-name" content="4People">
    <meta name="msapplication-starturl" content="./computacao/geradores/gerador_de_cpf/">
    <meta property="og:title" content="Gerador de CPF - 4People">
    <meta name="twitter:title" content="Gerador de CPF - 4People">
    <meta property="og:url" content="./computacao/geradores/gerador_de_cpf/">
    <meta name="twitter:url" content="./computacao/geradores/gerador_de_cpf/">
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
                <h1 class="flow-text mt-2">Gerador de CPF</h1>

                <label>Gerador de CPF OnLine que gera CPFs verdadeiros para Programadores testarem seus Softwares em desenvolvimento.</label>
                <div class="divider"></div>

                <div class="row mb-0">
                    <div class="col s12 m6">
                        <div class="row mb-0">
                            <div class="col s12">
                                <p class="mb-0">Gerar com pontuação:</p>
                            </div>

                            <div class="col s12 m3">
                                <p>
                                    <label>
                                        <input class="with-gap" name="punctuation" type="radio" checked>
                                        <span>Sim</span>
                                    </label>
                                </p>
                            </div>

                            <div class="col s12 m3">
                                <p>
                                    <label>
                                        <input class="with-gap" name="punctuation" type="radio">
                                        <span>Não</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="row mb-0">
                            <div class="col s12">
                                <p class="mb-0 ml-0">Estado:</p>
                            </div>
                            <div class="input-field col s12">
                                <select>
                                    <option value="-1" selected>Aleatório</option>
                                    <option value="2">Acre</option>
                                    <option value="4">Alagoas</option>
                                    <option value="2">Amazonas</option>
                                    <option value="2">Amapá</option>
                                    <option value="5">Bahia</option>
                                    <option value="3">Ceará</option>
                                    <option value="1">Distrito Federal</option>
                                    <option value="7">Espírito Santo</option>
                                    <option value="1">Goiás</option>
                                    <option value="3">Maranhão</option>
                                    <option value="6">Minas Gerais</option>
                                    <option value="1">Mato Grosso do Sul</option>
                                    <option value="1">Mato Grosso</option>
                                    <option value="4">Pará</option>
                                    <option value="4">Paraíba</option>
                                    <option value="4">Pernambuco</option>
                                    <option value="3">Piauí</option>
                                    <option value="9">Paraná</option>
                                    <option value="7">Rio de Janeiro</option>
                                    <option value="4">Rio Grande do Norte</option>
                                    <option value="0">Rio Grande do Sul</option>
                                    <option value="2">Rondônia</option>
                                    <option value="2">Roraima</option>
                                    <option value="9">Santa Catarina</option>
                                    <option value="5">Sergipe</option>
                                    <option value="8">São Paulo</option>
                                    <option value="1">Tocantins</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <button title="Gerar CPF" class="btn btn-center mt-2 waves-effect waves-dark black-text white" onclick="generate()">
                    Gerar CPF
                </button>
                <div class="divider mt-2"></div>

                <textarea class="mt-2" id="result" placeholder="Resultado" spellcheck="false" readonly></textarea>
                <button title="Copiar" class="btn waves-effect waves-dark black-text white" onclick="copyResult()">
                    Copiar
                </button>
            </div>
        </div>
    </main>

    <?php include_once("$path/components/footer.php") ?>

    <script src="<?= "$return/algorithms/CPFGenerator.js" ?>"></script>
    <script src="<?= pathinfo($_SERVER['PHP_SELF'])['dirname'] ?>/src/index.js"></script>
    <script src="<?= "$return/src/js/main.js" ?>"></script>
</body>

</html> 