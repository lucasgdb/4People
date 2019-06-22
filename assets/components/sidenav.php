<?php $link = $_SERVER['REQUEST_URI'] ?>
<ul id="slide-out" class="sidenav sidenav-fixed collapsible grey lighten-5" style="padding-left:9px">
	<li style="position:relative">
		<div class="user-view mb-0" style="border-bottom:1px solid #e0e0e0">
			<div class="background grey lighten-4"></div>
			<img class="circle" src="<?= $assets ?>/images/logo.png" alt="Logo">
			<span class="name black-text">4People - Ferramentas Online</span>
			<a href="https://github.com/LucasNaja/4People" target="_blank" rel="noopener noreferrer nofollow"><span class="email">Projeto de TCC »</span></a>
		</div>
	</li>

	<li class="<?= strpos($link, 'computacao') !== false ? 'active' : '' ?>">
		<div class="collapsible-header"><i class="material-icons left">computer</i>Computação<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
		<div class="collapsible-body">
			<ul class="collapsible padding-headers">
				<li>
					<div style="position:relative" class="collapsible-header" title="Geradores"><i class="material-icons">autorenew</i>Geradores<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
					<div class="collapsible-body">
						<ul>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_certidoes/" title="Gerador de Certidões"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Certidões</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_cnh/" title="Gerador de CNH"><i class="material-icons left">keyboard_arrow_right</i>Gerador de CNH</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_conta_bancaria/" title="Gerador de Conta Bancária"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Conta Bancária</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_cpf/" title="Gerador de CPF"><i class="material-icons left">keyboard_arrow_right</i>Gerador de CPF</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_nicks/" title="Gerador de Nicks"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Nicks</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_nomes/" title="Gerador de Nomes"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Nomes</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_numeros/" title="Gerador de Números"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Números</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_pis_pasep/" title="Gerador de PIS/PASEP"><i class="material-icons left">keyboard_arrow_right</i>Gerador de PIS/PASEP</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_renavam/" title="Gerador de RENAVAM"><i class="material-icons left">keyboard_arrow_right</i>Gerador de RENAVAM</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_veiculos/" title="Gerador de Veículos"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Veículos</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_placa_de_veiculo/" title="Gerador de Placa de Veículos"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Placa de Veículos</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_cnpj/" title="Gerador de CNPJ"><i class="material-icons left">keyboard_arrow_right</i>Gerador de CNPJ</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_cep/" title="Gerador de CEP"><i class="material-icons left">keyboard_arrow_right</i>Gerador de CEP</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_rg/" title="Gerador de RG"><i class="material-icons left">keyboard_arrow_right</i>Gerador de RG</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_inscricao_estadual/" title="Gerador de Inscrição Estadual"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Inscrição Estadual</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_titulo_de_eleitor/" title="Gerador de Título de Eleitor"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Título de Eleitor</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_cartao_de_credito/" title="Gerador de Cartão de Crédito"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Cartão de Crédito</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_pessoa/" title="Gerador de Pessoa"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Pessoa</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_empresas/" title="Gerador de Empresas"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Empresas</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_imagem/" title="Gerador de Imagem"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Imagem</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_lorem_ipsum/" title="Gerador de Lorem Ipsum"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Lorem Ipsum</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_senha/" title="Gerador de Senha"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Senha</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/geradores/gerador_de_meta_tags/" title="Gerador de Meta Tags"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Meta Tags</a></li>
						</ul>
					</div>
				</li>

				<li>
					<div style="position:relative" class="collapsible-header" title="Validadores"><i class="material-icons">check</i>Validadores<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
					<div class="collapsible-body">
						<ul>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/validadores/validador_de_cartao_de_credito/" title="Validador de Cartão de Crédito"><i class="material-icons left">keyboard_arrow_right</i>Validador de Cartão de Crédito</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/validadores/validador_de_conta_bancaria/" title="Validador de Conta Bancária"><i class="material-icons left">keyboard_arrow_right</i>Validador de Conta Bancária</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/validadores/validador_de_certidoes/" title="Validador de Certidões"><i class="material-icons left">keyboard_arrow_right</i>Validador de Certidões</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/validadores/validador_de_cnh/" title="Validador de CNH"><i class="material-icons left">keyboard_arrow_right</i>Validador de CNH</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/validadores/validador_de_cnpj/" title="Validador de CNPJ"><i class="material-icons left">keyboard_arrow_right</i>Validador de CNPJ</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/validadores/validador_de_cpf/" title="Validador de CPF"><i class="material-icons left">keyboard_arrow_right</i>Validador de CPF</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/validadores/validador_de_pis_pasep/" title="Validador de PIS/PASEP"><i class="material-icons left">keyboard_arrow_right</i>Validador de PIS/PASEP</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/validadores/validador_de_renavam/" title="Validador de RENAVAM"><i class="material-icons left">keyboard_arrow_right</i>Validador de RENAVAM</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/validadores/validador_de_rg/" title="Validador de RG"><i class="material-icons left">keyboard_arrow_right</i>Validador de RG</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/validadores/validador_de_titulo_de_eleitor/" title="Validador de Título de Eleitor"><i class="material-icons left">keyboard_arrow_right</i>Validador de Título de Eleitor</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/validadores/validador_de_inscricao_estadual/" title="Validador de Inscrição Estadual"><i class="material-icons left">keyboard_arrow_right</i>Validador de Inscrição Estadual</a></li>
						</ul>
					</div>
				</li>

				<li>
					<div style="position:relative" class="collapsible-header" title="Funções String"><i class="material-icons">format_color_text</i>Funções String<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
					<div class="collapsible-body">
						<ul>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/funcoes_string/colocar_em_ordem_alfabetica/" title="Colocar em Ordem Alfabética"><i class="material-icons left">keyboard_arrow_right</i>Colocar em Ordem Alfabética</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/funcoes_string/contador_de_caracteres/" title="Contador de Caracteres"><i class="material-icons left">keyboard_arrow_right</i>Contador de Caracteres</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/funcoes_string/contador_de_palavras/" title="Contador de Palavras"><i class="material-icons left">keyboard_arrow_right</i>Contador de Palavras</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/funcoes_string/converter_text_para_html/" title="Converter Texto para HTML"><i class="material-icons left">keyboard_arrow_right</i>Converter Texto para HTML</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/funcoes_string/cortar_textos/" title="Cortar Textos"><i class="material-icons left">keyboard_arrow_right</i>Cortar Textos</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/funcoes_string/dividir_string/" title="Dividir String"><i class="material-icons left">keyboard_arrow_right</i>Dividir String</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/funcoes_string/informacoes_de_caracteres/" title="Informações de Caracteres"><i class="material-icons left">keyboard_arrow_right</i>Informações de Caracteres</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/funcoes_string/inverter_texto/" title="Inverter Texto"><i class="material-icons left">keyboard_arrow_right</i>Inverter Texto</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/funcoes_string/letras_personalizadas/" title="Letras Personalizadas"><i class="material-icons left">keyboard_arrow_right</i>Letras Personalizadas</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/funcoes_string/maiusculas_e_minusculas/" title="Maiúsculas e Minúsculas"><i class="material-icons left">keyboard_arrow_right</i>Maiúsculas e Minúsculas</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/funcoes_string/numero_por_extenso/" title="Número por Extenso"><i class="material-icons left">keyboard_arrow_right</i>Número por Extenso</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/funcoes_string/remover_acentos_do_texto/" title="Remover Acentos do Texto"><i class="material-icons left">keyboard_arrow_right</i>Remover Acentos do Texto</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/funcoes_string/remover_ou_trocar/" title="Remover ou Trocar \n"><i class="material-icons left">keyboard_arrow_right</i>Remover ou Trocar \n</a></li>
						</ul>
					</div>
				</li>

				<li>
					<div style="position:relative" class="collapsible-header" title="Rede e Internet"><i class="material-icons">wifi</i>Rede e Internet<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
					<div class="collapsible-body">
						<ul>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/rede_e_internet/meu_ip/" title="Meu IP"><i class="material-icons left">keyboard_arrow_right</i>Meu IP</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/rede_e_internet/meu_navegador/" title="Meu Navegador"><i class="material-icons left">keyboard_arrow_right</i>Meu Navegador</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/rede_e_internet/meu_so/" title="Meu Sistema Operacional"><i class="material-icons left">keyboard_arrow_right</i>Meu Sistema Operacional</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/rede_e_internet/buscar_cep/" title="Buscar CEP"><i class="material-icons left">keyboard_arrow_right</i>Buscar CEP</a></li>
						</ul>
					</div>
				</li>

				<li>
					<div style="position:relative" class="collapsible-header" title="Codificadores e Decodificadores"><i class="material-icons">textsms</i>Codific. e Decodif.<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
					<div class="collapsible-body">
						<ul>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/codif_decodif/base64_codif_decodif/" title="Base64 - Codificador e Decodificador"><i class="material-icons left">keyboard_arrow_right</i>Base64 - Codif. e Decodif.</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/codif_decodif/codificar_md5/" title="MD5 - Codificador"><i class="material-icons left">keyboard_arrow_right</i>MD5 - Codificador</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/codif_decodif/codificar_sha1/" title="SHA1 - Codificador"><i class="material-icons left">keyboard_arrow_right</i>SHA1 - Codificador</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/codif_decodif/calcular_crc32/" title="Calcular CRC32"><i class="material-icons left">keyboard_arrow_right</i>Calcular CRC32</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/codif_decodif/gerador_de_qrcode/" title="Gerador de QRCode"><i class="material-icons left">keyboard_arrow_right</i>Gerador de QRCode</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/codif_decodif/conversor_binario/" title="Binário - Codificador e Decodificador"><i class="material-icons left">keyboard_arrow_right</i>Binário - Codif. e Decodif.</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/codif_decodif/url_codif_decodif/" title="URL - Codificador e Decodificador"><i class="material-icons left">keyboard_arrow_right</i>URL - Codif. e Decodif.</a></li>
						</ul>
					</div>
				</li>

				<li>
					<div style="position:relative" class="collapsible-header" title="Tabelas e Padrões"><i class="material-icons">colorize</i>Tabelas e Padrões<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
					<div class="collapsible-body">
						<ul>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/tabelas_e_padroes/color_picker/" title="Color Picker"><i class="material-icons left">keyboard_arrow_right</i>Color Picker</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/tabelas_e_padroes/tabela_ascii/" title="Tabela ASCII"><i class="material-icons left">keyboard_arrow_right</i>Tabela ASCII</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/computacao/tabelas_e_padroes/codigo_de_eventos_das_teclas/" title="Código de Eventos das Teclas"><i class="material-icons left">keyboard_arrow_right</i>Código de Eventos das Teclas</a></li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</li>

	<li class="<?= strpos($link, 'matematica') !== false ? 'active' : '' ?>">
		<div class="collapsible-header"><i class="material-icons left">functions</i>Matemática<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
		<div class="collapsible-body">
			<ul class="collapsible padding-headers">
				<li>
					<div style="position:relative" class="collapsible-header" title="Calculadoras"><i class="material-icons">exposure</i>Calculadoras<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
					<div class="collapsible-body">
						<ul>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/traduzir_numeros_romanos/" title="Traduzir Números Romanos"><i class="material-icons left">keyboard_arrow_right</i>Traduzir Números Romanos</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/fatorar_numero/" title="Fatorar Número"><i class="material-icons left">keyboard_arrow_right</i>Fatorar Número</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/mdc/" title="Máximo Divisor Comum"><i class="material-icons left">keyboard_arrow_right</i>Máximo Divisor Comum</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/mmc/" title="Mínimo Múltiplo Comum"><i class="material-icons left">keyboard_arrow_right</i>Mínimo Múltiplo Comum</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/imc/" title="Índice de Massa Corporal"><i class="material-icons left">keyboard_arrow_right</i>Índice de Massa Corporal</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/porcentagem/" title="Porcentagem"><i class="material-icons left">keyboard_arrow_right</i>Porcentagem</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/regra_de_3_simples/" title="Regra de 3 Simples"><i class="material-icons left">keyboard_arrow_right</i>Regra de 3 Simples</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/equacao_2_grau/" title="Equação do 2° Grau"><i class="material-icons left">keyboard_arrow_right</i>Equação do 2° Grau</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/combinacao/" title="Combinação"><i class="material-icons left">keyboard_arrow_right</i>Combinação</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/arranjo/" title="Arranjo"><i class="material-icons left">keyboard_arrow_right</i>Arranjo</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/numeros_primos/" title="Números Primos"><i class="material-icons left">keyboard_arrow_right</i>Números Primos</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/numeros_amigaveis/" title="Números Amigáveis"><i class="material-icons left">keyboard_arrow_right</i>Números Amigáveis</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/numeros_triangulares/" title="Números Triangulares"><i class="material-icons left">keyboard_arrow_right</i>Números Triangulares</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/fibonacci/" title="Fibonacci"><i class="material-icons left">keyboard_arrow_right</i>Fibonacci</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/conversor_de_temperatura/" title="Conversor de Temperatura"><i class="material-icons left">keyboard_arrow_right</i>Conversor de Temperatura</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/juros_simples_e_compostos/" title="Juros Simples e Compostos"><i class="material-icons left">keyboard_arrow_right</i>Juros Simples e Compostos</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculadoras/divisao_e_resto/" title="Divisão e Resto"><i class="material-icons left">keyboard_arrow_right</i>Divisão e Resto</a></li>
						</ul>
					</div>
				</li>

				<li>
					<div style="position:relative" class="collapsible-header" title="Cálculo de Áreas"><i class="material-icons">compare</i>Cálculo de Áreas<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
					<div class="collapsible-body">
						<ul>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculo_de_areas/area_do_circulo/" title="Área do Círculo"><i class="material-icons left">keyboard_arrow_right</i>Área do Círculo</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculo_de_areas/area_do_quadrado/" title="Área do Quadrado"><i class="material-icons left">keyboard_arrow_right</i>Área do Quadrado</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculo_de_areas/area_do_retangulo/" title="Área do Retângulo"><i class="material-icons left">keyboard_arrow_right</i>Área do Retângulo</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculo_de_areas/area_do_triangulo/" title="Área do Triângulo"><i class="material-icons left">keyboard_arrow_right</i>Área do Triângulo</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculo_de_areas/area_do_pentagono/" title="Área do Pentágono"><i class="material-icons left">keyboard_arrow_right</i>Área do Pentágono</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculo_de_areas/area_do_hexagono/" title="Área do Hexágono"><i class="material-icons left">keyboard_arrow_right</i>Área do Hexágono</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculo_de_areas/area_do_poligono_regular/" title="Área do Polígono Regular"><i class="material-icons left">keyboard_arrow_right</i>Área do Polígono Regular</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculo_de_areas/area_do_losango/" title="Área do Losango"><i class="material-icons left">keyboard_arrow_right</i>Área do Losango</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculo_de_areas/area_do_trapezio/" title="Área do Trapézio"><i class="material-icons left">keyboard_arrow_right</i>Área do Trapézio</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculo_de_areas/area_do_paralelogramo/" title="Área do Paralelogramo"><i class="material-icons left">keyboard_arrow_right</i>Área do Paralelogramo</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculo_de_areas/area_da_elipse/" title="Área da Elipse"><i class="material-icons left">keyboard_arrow_right</i>Área da Elipse</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculo_de_areas/area_da_coroa_circular/" title="Área da Coroa Circular"><i class="material-icons left">keyboard_arrow_right</i>Área da Coroa Circular</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculo_de_areas/area_do_setor_circular/" title="Área do Setor Circular"><i class="material-icons left">keyboard_arrow_right</i>Área do Setor Circular</a></li>
						</ul>
					</div>
				</li>

				<li>
					<div style="position:relative" class="collapsible-header" title="Cálculo de Datas"><i class="material-icons">timer</i>Cálculo de Datas<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
					<div class="collapsible-body">
						<ul>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculo_de_datas/diferenca_entre_datas/" title="Diferença entre Datas"><i class="material-icons left">keyboard_arrow_right</i>Diferença entre Datas</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculo_de_datas/somar_dias_em_datas/" title="Somar Dias em Datas"><i class="material-icons left">keyboard_arrow_right</i>Somar Dias em Datas</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/matematica/calculo_de_datas/subtrair_dias_em_datas/" title="Subtrair Dias em Datas"><i class="material-icons left">keyboard_arrow_right</i>Subtrair Dias em Datas</a></li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</li>

	<li class="<?= strpos($link, 'outras_ferramentas') !== false ? 'active' : '' ?>">
		<div class="collapsible-header"><i class="material-icons left">build</i>Outras Ferramentas<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
		<div class="collapsible-body">
			<ul class="collapsible padding-headers">
				<li>
					<div style="position:relative" class="collapsible-header" title="Dia a Dia"><i class="material-icons">today</i>Dia a dia<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
					<div class="collapsible-body">
						<ul>
							<li><a class="waves-effect" href="<?= $root ?>/outras_ferramentas/dia_a_dia/progresso_do_ano/" title="Progresso do Ano"><i class="material-icons left">keyboard_arrow_right</i>Progresso do Ano</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/outras_ferramentas/dia_a_dia/sorteador_de_pessoas/" title="Sorteador de Pessoas"><i class="material-icons left">keyboard_arrow_right</i>Sorteador de Pessoas</a></li>
							<li><a class="waves-effect" href="<?= $root ?>/outras_ferramentas/dia_a_dia/sorteador_de_numeros/" title="Sorteador de Números"><i class="material-icons left">keyboard_arrow_right</i>Sorteador de Números</a></li>
						</ul>
					</div>
				</li>

				<li>
					<div style="position:relative" class="collapsible-header" title="Jogos"><i class="material-icons">videogame_asset</i>Jogos<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
					<div class="collapsible-body">
						<ul>
							<li><a class="waves-effect" href="<?= $root ?>/outras_ferramentas/jogos/gerador_de_decks/" title="Gerador de Decks"><i class="material-icons left">keyboard_arrow_right</i>Gerador de Deck</a></li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</li>

	<li class="<?= strpos($link, 'sobre') !== false || strpos($link, 'contato') !== false ? 'active' : '' ?>">
		<div class="collapsible-header"><i class="material-icons left">info</i>Outras Páginas<i class="material-icons" style="position:absolute;right:0">arrow_drop_down</i></div>
		<div class="collapsible-body">
			<ul class="collapsible padding-headers">
				<li>
					<ul>
						<li><a class="waves-effect" href="<?= $root ?>/sobre/" title="Sobre o 4People"><i class="material-icons left">keyboard_arrow_right</i>Sobre</a></li>
						<li><a class="waves-effect" href="<?= $root ?>/contato/" title="Fale Conosco"><i class="material-icons left">keyboard_arrow_right</i>Fale Conosco</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</li>

	<div class="left-div indigo darken-4" style="border-radius:0"></div>
</ul>
