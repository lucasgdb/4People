<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php include_once('../components/links.php') ?>
    <title>Matemática - 4People</title>
    <meta name="keywords" content="4people,4devs,pessoas,online,ferramentas,desenvolvedores,computacao,matematica,geradores,validadores,faker">
    <?php include_once('../components/metas.php') ?>
</head>

<body>
    <?php include_once('../components/spinner.php') ?>

    <header class="hide">
        <nav class="grey lighten-3">
            <a href="#" id="menu" data-target="slide-out" class="sidenav-trigger show-on-large black-text"><i class="material-icons">menu</i></a>
            <div class="nav-wrapper">
                <a href="/" class="brand-logo right hide-on-large-only grey-text text-darken-4">4People</a>
                <ul id="nav-mobile" class="left hide-on-med-and-down">
                    <li title="Início" class="waves-effect"><a class="grey-text text-darken-4" href="/"><i class="material-icons left">home</i>Início</a></li>
                    <li title="Computação" class="waves-effect"><a class="grey-text text-darken-4" href="/computacao/"><i class="material-icons left">computer</i>Computação</a></li>
                    <li title="Matemática" class="active waves-effect"><a class="grey-text text-darken-4" href="/matematica/"><i class="material-icons left">functions</i>Matemática</a></li>
                    <li title="Outras Ferramentas" class="waves-effect"><a class="grey-text text-darken-4" href="/outras_ferramentas/"><i class="material-icons left">settings</i>Outras Ferramentas</a></li>
                </ul>
            </div>
        </nav>

        <ul id="slide-out" class="sidenav sidenav-fixed collapsible">
            <?php
            include_once('../components/logo.php');
            ?>

            <li>
                <div class="collapsible-header"><i class="material-icons">computer</i>Computação</div>
                <div class="collapsible-body">
                    <ul class="collapsible padding-headers">
                        <li>
                            <div class="collapsible-header"><i class="material-icons">autorenew</i>Geradores</div>
                            <div class="collapsible-body">
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_certidoes/">Gerador de Certidões</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_cnh/">Gerador de CNH</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_conta_bancaria/">Gerador de Conta Bancária</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_cpf/">Gerador de CPF</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_nicks/">Gerador de Nicks</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_nomes/">Gerador de Nomes</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_numeros/">Gerador de Números</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_pis_pasep/">Gerador de PIS/PASEP</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_renavam/">Gerador de RENAVAM</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_veiculos/">Gerador de Veículos</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_placa_de_veiculo/">Gerador de Placa de Veículos</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_cnpj/">Gerador de CNPJ</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_cep/">Gerador de CEP</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_rg/">Gerador de RG</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_inscricao_estadual/">Gerador de Inscrição Estadual</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_titulo_de_eleitor/">Gerador de Título de Eleitor</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_cartao_de_credito/">Gerador de Cartão de Crédito</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_pessoas/">Gerador de Pessoas</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_empresas/">Gerador de Empresas</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_imagem/">Gerador de Imagem</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_lorem_ipsum/">Gerador de Lorem Ipsum</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_senha/">Gerador de Senha</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/geradores/gerador_de_meta_tags/">Gerador de Meta Tags</a>
                            </div>
                        </li>

                        <li>
                            <div class="collapsible-header"><i class="material-icons">check</i>Validadores</div>
                            <div class="collapsible-body">
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/validadores/validador_de_cartao_de_credito/">Validador de Cartão de Crédito</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/validadores/validador_de_conta_bancaria/">Validador de Conta Bancária</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/validadores/validador_de_certidoes/">Validador de Certidões</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/validadores/validador_de_cnh/">Validador de CNH</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/validadores/validador_de_cnpj/">Validador de CNPJ</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/validadores/validador_de_cpf/">Validador de CPF</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/validadores/validador_de_pis_pasep/">Validador de PIS/PASEP</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/validadores/validador_de_renavam/">Validador de RENAVAM</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/validadores/validador_de_rg/">Validador de RG</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/validadores/validador_de_titulo_de_eleitor/">Validador de Título de Eleitor</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/validadores/validador_de_inscricao_estadual/">Validador de Inscrição Estadual</a>
                            </div>
                        </li>

                        <li>
                            <div class="collapsible-header"><i class="material-icons">content_cut</i>Funções String</div>
                            <div class="collapsible-body">
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/funcoes_string/colocar_em_ordem_alfabetica/">Colocar em Ordem Alfabética</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/funcoes_string/contador_de_caracteres/">Contador de Caracteres</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/funcoes_string/contador_de_palavras/">Contador de Palavras</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/funcoes_string/converter_text_para_html/">Converter Texto para HTML</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/funcoes_string/cortar_textos">Cortar Textos</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/funcoes_string/dividir_string/">Dividir String</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/funcoes_string/informacoes_de_caracteres/">Informações de Caracteres</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/funcoes_string/inverter_texto/">Inverter Texto</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/funcoes_string/letras_personalizadas/">Letras Personalizadas</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/funcoes_string/maiusculas_e_minusculas/">Maiúsculas e Minúsculas</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/funcoes_string/numero_por_extenso/">Número por Extenso</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/funcoes_string/remover_acentos_do_texto/">Remover Acentos do Texto</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/funcoes_string/remover_ou_trocar/">Remover ou Trocar \n</a>
                            </div>
                        </li>

                        <li>
                            <div class="collapsible-header"><i class="material-icons">wifi</i>Rede e Internet</div>
                            <div class="collapsible-body">
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/rede_e_internet/meu_ip/">Meu IP</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/rede_e_internet/meu_navegador/">Meu Navegador</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/rede_e_internet/meu_so/">Meu Sistema Operacional</a>
                            </div>
                        </li>

                        <li>
                            <div class="collapsible-header"><i class="material-icons">textsms</i>Encoders e Decoders</div>
                            <div class="collapsible-body">
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/encoders_e_decoders/base64_encode_decode/">Base64 Encode/Decode</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/encoders_e_decoders/calcular_crc32/">Calcular CRC32</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/encoders_e_decoders/codificar_md5/">Codificar MD5</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/encoders_e_decoders/codificar_sha1/">Codificar SHA1</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/encoders_e_decoders/gerador_de_qrcode/">Gerador de QRCode</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/encoders_e_decoders/tradutor_de_codigo_binario/">Tradutor de Código Binário</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/encoders_e_decoders/url_encode_decode/">URL Encode/Decode</a>
                            </div>
                        </li>

                        <li>
                            <div class="collapsible-header"><i class="material-icons">colorize</i>Tabelas e Padrões</div>
                            <div class="collapsible-body">
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/tabelas_e_padroes/color_picker/">Color Picker</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/computacao/tabelas_e_padroes/tabela_ascii/">Tabela ASCII</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>

            <li class="active">
                <div class="collapsible-header"><i class="material-icons">functions</i>Matemática</div>
                <div class="collapsible-body">
                    <ul class="collapsible padding-headers">
                        <li>
                            <div class="collapsible-header"><i class="material-icons">plus_one</i>Calculadoras</div>
                            <div class="collapsible-body">
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calculadoras/converter_numero_romano/">Converter Número Romano</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calculadoras/fatorar_numero/">Fatorar Número</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calculadoras/maximo_divisor_comum/">Máximo Divisor Comum</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calculadoras/minimo_multiplo_comum/">Mínimo Múltiplo Comum</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calculadoras/porcentagem/">Porcentagem</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calculadoras/regra_de_3_simples/">Regra de 3 Simples</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calculadoras/resto_da_divisao/">Resto da Divisão</a>
                            </div>
                        </li>

                        <li>
                            <div class="collapsible-header"><i class="material-icons">explore</i>Calcular Áreas</div>
                            <div class="collapsible-body">
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calcular_areas/area_do_circulo/">Área do Círculo</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calcular_areas/area_do_quadrado/">Área do Quadrado</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calcular_areas/area_do_retangulo/">Área do Retângulo</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calcular_areas/area_do_triangulo/">Área do Triângulo</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calcular_areas/area_do_pentagono/">Área do Pentágono</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calcular_areas/area_do_hexagono/">Área do Hexágono</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calcular_areas/area_do_poligono_regular/">Área do Polígono Regular</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calcular_areas/area_do_losango/">Área do Losango</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calcular_areas/area_do_trapezio/">Área do Trapézio</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calcular_areas/area_do_paralelogramo/">Área do Paralelogramo</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calcular_areas/area_da_elipse/">Área da Elipse</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calcular_areas/area_da_coroa_circular/">Área da Coroa Circular</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/calcular_areas/area_do_setor_circular/">Área do Setor Circular</a>
                            </div>
                        </li>

                        <li>
                            <div class="collapsible-header"><i class="material-icons">timer</i>Datas e Horas</div>
                            <div class="collapsible-body">
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/datas_e_horas/diferenca_entre_dias/">Diferença entre Datas</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/datas_e_horas/somar_dias_em_datas/">Somar Dias em Datas</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/matematica/datas_e_horas/subtrair_dias_em_datas/">Subtrair Dias em Datas</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>

            <li>
                <div class="collapsible-header"><i class="material-icons">build</i>Outras Ferramentas</div>
                <div class="collapsible-body">
                    <ul class="collapsible padding-headers">
                        <li>
                            <div class="collapsible-header"><i class="material-icons">today</i>Dia a dia</div>
                            <div class="collapsible-body">
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/outras_ferramentas/dia_a_dia/progresso_do_ano/">Progresso do Ano</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/outras_ferramentas/dia_a_dia/sorteador_de_pessoas/">Sorteador de Pessoas</a>
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/outras_ferramentas/dia_a_dia/sorteador_de_numeros/">Sorteador de Números</a>
                            </div>
                        </li>

                        <li>
                            <div class="collapsible-header"><i class="material-icons">videogame_asset</i>Jogos</div>
                            <div class="collapsible-body">
                                <a class="btn waves-effect white black-text z-depth-2 hoverable" href="/outras_ferramentas/jogos/gerador_de_decks/">Gerador de Deck</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </header>

    <main class="hide">
        <div class="container">
            <div class="card-panel">
                <h2>Ferramentas</h2>
            </div>
        </div>
    </main>

    <?php include_once('../components/footer.php') ?>

    <script src="/src/js/main.js"></script>
</body>

</html> 