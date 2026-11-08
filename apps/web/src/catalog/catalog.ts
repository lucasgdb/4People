import type { IconName } from '@/components/icon'

export type Tool = {
	slug: string
	name: string
	description: string
	/** Optional formula/explanation rendered under the tool header. */
	formula?: string
}

export type Section = {
	slug: string
	name: string
	icon: IconName
	tools: readonly Tool[]
}

export type Category = {
	slug: string
	name: string
	description: string
	icon: IconName
	sections: readonly Section[]
}

export const CATEGORIES = [
	{
		slug: 'computacao',
		name: 'Computação',
		description: 'Geradores, validadores e utilitários para quem desenvolve software.',
		icon: 'computer',
		sections: [
			{
				slug: 'geradores',
				name: 'Geradores',
				icon: 'refresh',
				tools: [
					{
						slug: 'gerador-de-cpf',
						name: 'Gerador de CPF',
						description: 'Gere CPFs válidos para testar seus sistemas em desenvolvimento.',
					},
					{
						slug: 'gerador-de-cnpj',
						name: 'Gerador de CNPJ',
						description: 'Gere CNPJs válidos para testar seus sistemas em desenvolvimento.',
					},
					{
						slug: 'gerador-de-rg',
						name: 'Gerador de RG',
						description: 'Gere RGs (padrão SSP‑SP) válidos para testar seus sistemas.',
					},
					{
						slug: 'gerador-de-senha',
						name: 'Gerador de Senha',
						description: 'Gere senhas fortes e personalizadas.',
					},
					{
						slug: 'gerador-de-nomes',
						name: 'Gerador de Nomes',
						description: 'Gere nomes aleatórios para preencher dados de teste.',
					},
					{
						slug: 'gerador-de-uuid',
						name: 'Gerador de UUID',
						description: 'Gere UUIDs v4 (aleatórios) ou v7 (ordenados por tempo) em lote.',
					},
					{
						slug: 'gerador-de-hash',
						name: 'Gerador de Hash',
						description:
							'Calcule o hash MD5, SHA-1, SHA-256, SHA-384, SHA-512 ou CRC32 de um texto.',
					},
					{
						slug: 'gerador-de-cnh',
						name: 'Gerador de CNH',
						description: 'Gere números de CNH válidos para testar seus sistemas.',
					},
					{
						slug: 'gerador-de-pis',
						name: 'Gerador de PIS/PASEP',
						description: 'Gere números de PIS/PASEP/NIS válidos para testes.',
					},
					{
						slug: 'gerador-de-renavam',
						name: 'Gerador de RENAVAM',
						description: 'Gere códigos RENAVAM válidos para testes.',
					},
					{
						slug: 'gerador-de-titulo-de-eleitor',
						name: 'Gerador de Título de Eleitor',
						description: 'Gere títulos de eleitor válidos, escolhendo o estado de emissão.',
					},
					{
						slug: 'gerador-de-cartao-de-credito',
						name: 'Gerador de Cartão de Crédito',
						description:
							'Gere cartões de teste válidos (Luhn) de Visa, Mastercard, Elo, Amex e mais, com validade e CVV.',
					},
					{
						slug: 'gerador-de-cep',
						name: 'Gerador de CEP',
						description: 'Gere CEPs na faixa dos Correios de cada estado para testar formulários.',
					},
					{
						slug: 'gerador-de-telefone',
						name: 'Gerador de Telefone',
						description: 'Gere números de celular ou fixo com DDD real do estado que quiser.',
					},
					{
						slug: 'gerador-de-placas',
						name: 'Gerador de Placas',
						description: 'Gere placas no padrão Mercosul ou antigo e converta entre os dois.',
					},
					{
						slug: 'gerador-de-pessoas',
						name: 'Gerador de Pessoas',
						description:
							'Gere pessoas fictícias completas e coerentes (CPF, RG, endereço, e-mail) em lote, com JSON e CSV.',
					},
				],
			},
			{
				slug: 'validadores',
				name: 'Validadores',
				icon: 'check',
				tools: [
					{
						slug: 'validador-de-cpf',
						name: 'Validador de CPF',
						description: 'Verifique se um CPF é válido e descubra a região fiscal de origem.',
					},
					{
						slug: 'validador-de-cnpj',
						name: 'Validador de CNPJ',
						description: 'Verifique se um CNPJ é válido.',
					},
					{
						slug: 'validador-de-rg',
						name: 'Validador de RG',
						description: 'Verifique se um RG (padrão SSP‑SP) é válido.',
					},
					{
						slug: 'validador-de-cnh',
						name: 'Validador de CNH',
						description: 'Verifique se um número de CNH é válido.',
					},
					{
						slug: 'validador-de-pis',
						name: 'Validador de PIS/PASEP',
						description: 'Verifique se um PIS/PASEP/NIS é válido.',
					},
					{
						slug: 'validador-de-renavam',
						name: 'Validador de RENAVAM',
						description: 'Verifique se um código RENAVAM é válido.',
					},
					{
						slug: 'validador-de-titulo-de-eleitor',
						name: 'Validador de Título de Eleitor',
						description:
							'Verifique se um título de eleitor é válido e descubra o estado de emissão.',
					},
					{
						slug: 'validador-de-cartao-de-credito',
						name: 'Validador de Cartão de Crédito',
						description:
							'Verifique pelo algoritmo de Luhn se um número de cartão é válido e qual a bandeira.',
					},
				],
			},
			{
				slug: 'funcoes-de-texto',
				name: 'Funções de Texto',
				icon: 'text',
				tools: [
					{
						slug: 'contador-de-caracteres',
						name: 'Contador de Caracteres',
						description:
							'Conte caracteres, palavras, espaços, vogais, consoantes, números e linhas.',
					},
					{
						slug: 'maiusculas-e-minusculas',
						name: 'Conversor de Maiúsculas e Minúsculas',
						description:
							'Converta texto para MAIÚSCULAS, minúsculas, Título, camelCase, snake_case, kebab-case e mais.',
					},
					{
						slug: 'letras-diferentes',
						name: 'Letras Diferentes',
						description:
							'Escreva com letras diferentes (𝐧𝐞𝐠𝐫𝐢𝐭𝐨, 𝓬𝓾𝓻𝓼𝓲𝓿𝓪, 𝕔𝕠𝕟𝕥𝕠𝕣𝕟𝕠) para Instagram, WhatsApp e nicks.',
					},
					{
						slug: 'ordem-alfabetica',
						name: 'Ordem Alfabética',
						description: 'Coloque linhas em ordem alfabética, remova duplicadas ou embaralhe.',
					},
					{
						slug: 'frequencia-de-palavras',
						name: 'Frequência de Palavras',
						description: 'Descubra quais palavras mais se repetem em um texto.',
					},
					{
						slug: 'texto-para-html',
						name: 'Texto para HTML',
						description: 'Converta texto em HTML seguro e decodifique entidades HTML.',
					},
					{
						slug: 'informacoes-de-caractere',
						name: 'Informações de Caractere',
						description:
							'Veja o código Unicode, os bytes UTF-8 e os escapes HTML e JavaScript de cada caractere.',
					},
					{
						slug: 'numero-por-extenso',
						name: 'Número por Extenso',
						description:
							'Escreva números e valores em reais por extenso, para cheques e contratos.',
					},
					{
						slug: 'limpar-texto',
						name: 'Remover Acentos e Quebras de Linha',
						description: 'Remova acentos, quebras de linha e espaços extras de um texto.',
					},
				],
			},
			{
				slug: 'codificadores-e-formatos',
				name: 'Codificadores e Formatos',
				icon: 'binary',
				tools: [
					{
						slug: 'conversor-de-binario',
						name: 'Código Binário',
						description: 'Converta texto em código binário e vice-versa.',
					},
					{
						slug: 'formatador-de-json',
						name: 'Formatador de JSON',
						description: 'Formate, valide e minifique JSON, com a linha exata de cada erro.',
					},
					{
						slug: 'base64',
						name: 'Base64',
						description:
							'Codifique e decodifique texto em Base64, inclusive no formato seguro para URL.',
					},
					{
						slug: 'codificador-de-url',
						name: 'Codificador de URL',
						description:
							'Codifique e decodifique textos e endereços para usar em URLs (percent-encoding).',
					},
					{
						slug: 'decodificador-de-jwt',
						name: 'Decodificador de JWT',
						description:
							'Decodifique um JSON Web Token, veja as claims e verifique a assinatura (HS, RS, PS e ES).',
					},
					{
						slug: 'gerador-de-jwt',
						name: 'Gerador de JWT',
						description:
							'Monte e assine um JWT com HS256, RS256, PS256, ES256 e outros, direto no navegador.',
					},
					{
						slug: 'conversor-de-bases-numericas',
						name: 'Conversor de Bases Numéricas',
						description:
							'Converta números entre binário, octal, decimal, hexadecimal e qualquer base de 2 a 36.',
					},
				],
			},
			{
				slug: 'conversores',
				name: 'Conversores',
				icon: 'convert',
				tools: [
					{
						slug: 'json-para-yaml',
						name: 'JSON para YAML',
						description:
							'Converta JSON em YAML enquanto digita e veja a linha e a coluna de cada erro.',
					},
					{
						slug: 'yaml-para-json',
						name: 'YAML para JSON',
						description:
							'Converta YAML em JSON, inclusive arquivos com vários documentos, com erros na linha exata.',
					},
					{
						slug: 'xml-para-json',
						name: 'XML para JSON',
						description: 'Converta XML em JSON mantendo atributos com prefixo e tipos de valor.',
					},
					{
						slug: 'json-para-xml',
						name: 'JSON para XML',
						description:
							'Gere XML a partir de JSON, com elemento raiz, atributos e indentação à escolha.',
					},
					{
						slug: 'ini-para-json',
						name: 'INI para JSON',
						description:
							'Converta arquivos INI em JSON: seções, subseções, comentários e chaves repetidas.',
					},
					{
						slug: 'ini-para-yaml',
						name: 'INI para YAML',
						description:
							'Converta arquivos INI em YAML: seções, subseções, comentários e chaves repetidas.',
					},
					{
						slug: 'csv-para-sql',
						name: 'CSV para SQL',
						description: 'Gere CREATE TABLE com tipos inferidos e INSERTs a partir de um CSV.',
					},
					{
						slug: 'imagem-para-data-uri',
						name: 'Imagem para Data URI',
						description:
							'Transforme uma imagem ou arquivo em data URI Base64 para CSS, HTML ou Markdown.',
					},
					{
						slug: 'data-uri-para-imagem',
						name: 'Data URI para Imagem',
						description: 'Valide um data URI, veja a imagem, o tipo e o tamanho e baixe o arquivo.',
					},
				],
			},
			{
				slug: 'desenvolvimento',
				name: 'Desenvolvimento',
				icon: 'terminal',
				tools: [
					{
						slug: 'testador-de-regex',
						name: 'Testador de Regex',
						description:
							'Teste expressões regulares com destaque das correspondências, grupos e substituição.',
					},
					{
						slug: 'comparador-de-textos',
						name: 'Comparador de Textos',
						description:
							'Compare dois textos por linha, palavra ou caractere e veja o que entrou e saiu.',
					},
					{
						slug: 'avaliador-de-jsonpath',
						name: 'Avaliador de JSONPath',
						description:
							'Rode expressões JSONPath em um JSON e veja cada resultado com seu caminho.',
					},
					{
						slug: 'testador-de-xpath',
						name: 'Testador de XPath',
						description:
							'Avalie expressões XPath em XML ou HTML e veja os nós, textos e números encontrados.',
					},
					{
						slug: 'conversor-de-timestamp',
						name: 'Conversor de Timestamp',
						description:
							'Converta timestamp Unix em data (UTC, local, ISO 8601, RFC 2822) e data em timestamp.',
					},
					{
						slug: 'descritor-de-cron',
						name: 'Descritor de Cron',
						description: 'Entenda uma expressão cron em português e veja as próximas 10 execuções.',
					},
					{
						slug: 'separador-de-url',
						name: 'Separador de URL',
						description:
							'Separe uma URL em protocolo, host, porta, caminho, parâmetros e fragmento, e edite a query.',
					},
					{
						slug: 'testador-de-api-rest',
						name: 'Testador de API REST',
						description:
							'Envie requisições HTTP pelo navegador e veja status, tempo, cabeçalhos e corpo.',
					},
					{
						slug: 'gerador-de-json',
						name: 'Gerador de JSON',
						description:
							'Gere JSON com dados fictícios a partir de um modelo com marcadores como {{nome}} e {{cpf}}.',
					},
					{
						slug: 'codificador-de-html',
						name: 'Codificador de HTML',
						description:
							'Codifique e decodifique entidades HTML nomeadas, decimais ou hexadecimais.',
					},
					{
						slug: 'escape-de-string',
						name: 'Escape de String',
						description:
							'Escape textos para JavaScript, JSON, Java, C#, Python, SQL, shell e regex, ou desfaça o escape.',
					},
					{
						slug: 'visualizador-de-svg',
						name: 'Visualizador de SVG',
						description:
							'Veja um SVG com segurança, confira o tamanho, minifique e baixe em SVG ou PNG.',
					},
				],
			},
			{
				slug: 'rede-e-internet',
				name: 'Rede e Internet',
				icon: 'wifi',
				tools: [
					{ slug: 'meu-ip', name: 'Meu IP', description: 'Descubra o seu endereço IP público.' },
					{
						slug: 'buscar-cep',
						name: 'Buscar CEP',
						description: 'Consulte rua, bairro, cidade e estado a partir de um CEP.',
					},
				],
			},
			{
				slug: 'infraestrutura',
				name: 'Infraestrutura',
				icon: 'server',
				tools: [
					{
						slug: 'calculadora-de-sub-rede-ipv4',
						name: 'Calculadora de Sub-rede IPv4',
						description:
							'Rede, broadcast, faixa de hosts, máscara, wildcard e binário de um IPv4, e a divisão em sub-redes.',
					},
					{
						slug: 'calculadora-de-sub-rede-ipv6',
						name: 'Calculadora de Sub-rede IPv6',
						description:
							'Rede, faixa, total exato de endereços, tipo, DNS reverso e sub-redes de um prefixo IPv6.',
					},
					{
						slug: 'calculadora-de-sla',
						name: 'Calculadora de SLA',
						description:
							'Converta disponibilidade em tempo fora do ar por dia, mês e ano, e calcule SLAs compostos.',
					},
					{
						slug: 'calculadora-de-tempo-de-download',
						name: 'Calculadora de Tempo de Download',
						description:
							'Quanto tempo leva para baixar um arquivo na sua velocidade e em velocidades comuns.',
					},
					{
						slug: 'conversor-de-unidades-de-dados',
						name: 'Conversor de Unidades de Dados',
						description:
							'Bits, bytes, MB, GB, MiB, GiB e taxas como Mbps e MB/s, todos de uma vez.',
					},
				],
			},
			{
				slug: 'tabelas-e-padroes',
				name: 'Tabelas e Padrões',
				icon: 'table',
				tools: [
					{
						slug: 'eventos-de-teclado',
						name: 'Eventos de Teclado',
						description: 'Pressione uma tecla e veja key, code, keyCode e location do evento.',
					},
					{
						slug: 'tabela-ascii',
						name: 'Tabela ASCII',
						description:
							'Tabela ASCII e Latin-1 (0 a 255) em decimal, hexadecimal, octal, binário e HTML.',
					},
					{
						slug: 'conversor-de-cores',
						name: 'Conversor de Cores',
						description:
							'Converta cores entre HEX, RGB, HSL, OKLCH e CMYK e confira o contraste (WCAG).',
					},
				],
			},
			{
				slug: 'utilitarios',
				name: 'Utilitários',
				icon: 'wrench',
				tools: [
					{
						slug: 'gerador-de-numeros-aleatorios',
						name: 'Gerador de Números Aleatórios',
						description:
							'Sorteie números aleatórios, com ou sem repetição, para rifas, sorteios e testes.',
					},
					{
						slug: 'gerador-de-lorem-ipsum',
						name: 'Gerador de Lorem Ipsum',
						description: 'Gere texto Lorem Ipsum em parágrafos, frases ou palavras.',
					},
					{
						slug: 'gerador-de-qr-code',
						name: 'Gerador de QR Code',
						description: 'Crie QR Codes de links e textos, com cores e download em SVG ou PNG.',
					},
					{
						slug: 'consulta-de-bancos',
						name: 'Consulta de Bancos',
						description:
							'Encontre o código (COMPE) e o ISPB de qualquer banco para TED, PIX e boletos.',
					},
					{
						slug: 'cotacao-de-moedas',
						name: 'Cotação de Moedas',
						description:
							'Dólar, euro, bitcoin e outras moedas em tempo real, com conversor entre qualquer par.',
					},
					{
						slug: 'dolar-hoje',
						name: 'Dólar Hoje',
						description:
							'Cotação do dólar comercial e turismo agora, com a variação do dia e conversor para reais.',
					},
				],
			},
		],
	},
	{
		slug: 'matematica',
		name: 'Matemática',
		description: 'Calculadoras de áreas, datas e operações para estudantes e professores.',
		icon: 'sigma',
		sections: [
			{
				slug: 'calculo-de-areas',
				name: 'Cálculo de Áreas',
				icon: 'shapes',
				tools: [
					{
						slug: 'area-do-circulo',
						name: 'Área do Círculo',
						description: 'Calcule a área do círculo pelo raio ou pelo diâmetro.',
						formula: 'A = π · r²  ou  A = π · d² / 4',
					},
					{
						slug: 'area-do-quadrado',
						name: 'Área do Quadrado',
						description: 'Calcule a área do quadrado a partir do lado.',
						formula: 'A = L²',
					},
					{
						slug: 'area-do-retangulo',
						name: 'Área do Retângulo',
						description: 'Calcule a área do retângulo a partir da base e altura.',
						formula: 'A = b · h',
					},
					{
						slug: 'area-do-triangulo',
						name: 'Área do Triângulo',
						description: 'Calcule a área do triângulo a partir da base e altura.',
						formula: 'A = b · h / 2',
					},
					{
						slug: 'area-do-pentagono',
						name: 'Área do Pentágono',
						description: 'Calcule a área do pentágono regular a partir do lado.',
						formula: 'A = 5 · L² / (4 · tan 36°)',
					},
					{
						slug: 'area-do-hexagono',
						name: 'Área do Hexágono',
						description: 'Calcule a área do hexágono regular a partir do lado.',
						formula: 'A = 6 · L² / (4 · tan 30°)',
					},
					{
						slug: 'area-do-poligono-regular',
						name: 'Área do Polígono Regular',
						description: 'Calcule a área de qualquer polígono regular.',
						formula: 'A = n · L² / (4 · tan(π / n))',
					},
					{
						slug: 'area-do-losango',
						name: 'Área do Losango',
						description: 'Calcule a área do losango a partir das diagonais.',
						formula: 'A = D · d / 2',
					},
					{
						slug: 'area-do-trapezio',
						name: 'Área do Trapézio',
						description: 'Calcule a área do trapézio a partir das bases e altura.',
						formula: 'A = (B + b) · h / 2',
					},
					{
						slug: 'area-do-paralelogramo',
						name: 'Área do Paralelogramo',
						description: 'Calcule a área do paralelogramo a partir da base e altura.',
						formula: 'A = b · h',
					},
					{
						slug: 'area-da-elipse',
						name: 'Área da Elipse',
						description: 'Calcule a área da elipse a partir dos semieixos.',
						formula: 'A = π · a · b',
					},
					{
						slug: 'area-da-coroa-circular',
						name: 'Área da Coroa Circular',
						description: 'Calcule a área da coroa circular a partir dos raios.',
						formula: 'A = π · (R² − r²)',
					},
					{
						slug: 'area-do-setor-circular',
						name: 'Área do Setor Circular',
						description: 'Calcule a área do setor circular a partir do raio e ângulo.',
						formula: 'A = π · r² · θ / 360°',
					},
				],
			},
			{
				slug: 'calculo-de-datas',
				name: 'Cálculo de Datas',
				icon: 'calendar',
				tools: [
					{
						slug: 'diferenca-entre-datas',
						name: 'Diferença entre Datas',
						description: 'Calcule o intervalo entre duas datas em anos, meses, dias, horas e mais.',
					},
					{
						slug: 'somar-em-data',
						name: 'Somar em Data',
						description: 'Some dias, semanas, meses ou anos a uma data.',
					},
					{
						slug: 'subtrair-em-data',
						name: 'Subtrair em Data',
						description: 'Subtraia dias, semanas, meses ou anos de uma data.',
					},
				],
			},
			{
				slug: 'calculadoras',
				name: 'Calculadoras',
				icon: 'calculator',
				tools: [
					{
						slug: 'porcentagem',
						name: 'Porcentagem',
						description:
							'Porcentagem de um valor, variação, acréscimo, desconto, margem, markup e pontos percentuais.',
					},
					{
						slug: 'calculadora-de-imc',
						name: 'Índice de Massa Corporal',
						description: 'Calcule o IMC e o peso ideal.',
						formula: 'IMC = peso / altura²',
					},
					{
						slug: 'equacao-do-segundo-grau',
						name: 'Equação do 2º Grau',
						description: 'Resolva equações do 2º grau com a fórmula de Bhaskara.',
						formula: 'Δ = b² − 4ac,  x = (−b ± √Δ) / 2a',
					},
					{
						slug: 'fatorar-numero',
						name: 'Fatorar Número',
						description: 'Decomponha um número em fatores primos.',
					},
					{
						slug: 'maximo-divisor-comum',
						name: 'Máximo Divisor Comum',
						description: 'Encontre o MDC entre vários números.',
					},
					{
						slug: 'minimo-multiplo-comum',
						name: 'Mínimo Múltiplo Comum',
						description: 'Encontre o MMC entre vários números.',
					},
					{
						slug: 'numeros-primos',
						name: 'Números Primos',
						description: 'Descubra quais números de uma lista são primos.',
					},
					{
						slug: 'numeros-amigaveis',
						name: 'Números Amigáveis',
						description:
							'Verifique se dois números são amigáveis (cada um é a soma dos divisores próprios do outro).',
					},
					{
						slug: 'fibonacci',
						name: 'Fibonacci',
						description: 'Gere a sequência de Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13…',
					},
					{
						slug: 'conversor-de-temperatura',
						name: 'Conversor de Temperatura',
						description: 'Converta entre Celsius, Fahrenheit e Kelvin.',
					},
					{
						slug: 'conversor-de-unidades',
						name: 'Conversor de Unidades',
						description:
							'Comprimento, massa, volume, área, velocidade, tempo, energia, pressão e mais, como no Google.',
					},
					{
						slug: 'divisao-e-resto',
						name: 'Divisão e Resto',
						description: 'Veja o quociente, o quociente inteiro e o resto de uma divisão.',
					},
					{
						slug: 'regra-de-tres',
						name: 'Regra de Três',
						description: 'Resolva regras de três simples, diretas e inversas.',
						formula: 'a está para b assim como c está para x',
					},
					{
						slug: 'juros-compostos',
						name: 'Juros Compostos',
						description:
							'Simule juros compostos com aporte mensal, taxa ao mês ou ao ano e evolução mês a mês.',
						formula: 'M = C · (1 + i)ⁿ',
					},
					{
						slug: 'media-mediana-e-moda',
						name: 'Média, Mediana e Moda',
						description:
							'Calcule média, média ponderada, mediana, moda, amplitude e desvio padrão de uma lista.',
					},
					{
						slug: 'arranjo-e-combinacao',
						name: 'Arranjo e Combinação',
						description: 'Calcule arranjos, combinações e permutações com números exatos.',
						formula: 'A(n,k) = n!/(n−k)!   C(n,k) = n!/(k!(n−k)!)',
					},
					{
						slug: 'numeros-romanos',
						name: 'Números Romanos',
						description:
							'Converta números para algarismos romanos e de volta, sem limite: acima de 3.999, com barras.',
					},
				],
			},
		],
	},
] as const satisfies readonly Category[]

export type CategorySlug = (typeof CATEGORIES)[number]['slug']

export type ToolEntry = Tool & {
	id: `${string}/${string}/${string}`
	href: string
	category: Pick<Category, 'slug' | 'name'>
	section: Pick<Section, 'slug' | 'name' | 'icon'>
}

export const TOOLS: ToolEntry[] = CATEGORIES.flatMap((category) =>
	category.sections.flatMap((section) =>
		section.tools.map((tool) => ({
			...tool,
			id: `${category.slug}/${section.slug}/${tool.slug}` as const,
			href: `/${category.slug}/${section.slug}/${tool.slug}`,
			category: { slug: category.slug, name: category.name },
			section: { slug: section.slug, name: section.name, icon: section.icon },
		})),
	),
)

export const getCategory = (slug: string): Category | undefined =>
	CATEGORIES.find((category) => category.slug === slug)

export const getSection = (categorySlug: string, sectionSlug: string): Section | undefined =>
	getCategory(categorySlug)?.sections.find((section) => section.slug === sectionSlug)

export const getTool = (categorySlug: string, sectionSlug: string, toolSlug: string) =>
	TOOLS.find((tool) => tool.id === `${categorySlug}/${sectionSlug}/${toolSlug}`)

export const toolsIn = (categorySlug: string, sectionSlug?: string) =>
	TOOLS.filter(
		(tool) =>
			tool.category.slug === categorySlug && (!sectionSlug || tool.section.slug === sectionSlug),
	)

/** Tools that complete each other: every generator points to its validator (or lookup) and back. */
export const COMPANION_TOOL: Record<string, string> = {
	'gerador-de-cpf': 'validador-de-cpf',
	'validador-de-cpf': 'gerador-de-cpf',
	'gerador-de-cnpj': 'validador-de-cnpj',
	'validador-de-cnpj': 'gerador-de-cnpj',
	'gerador-de-rg': 'validador-de-rg',
	'validador-de-rg': 'gerador-de-rg',
	'gerador-de-cnh': 'validador-de-cnh',
	'validador-de-cnh': 'gerador-de-cnh',
	'gerador-de-pis': 'validador-de-pis',
	'validador-de-pis': 'gerador-de-pis',
	'gerador-de-renavam': 'validador-de-renavam',
	'validador-de-renavam': 'gerador-de-renavam',
	'gerador-de-titulo-de-eleitor': 'validador-de-titulo-de-eleitor',
	'validador-de-titulo-de-eleitor': 'gerador-de-titulo-de-eleitor',
	'gerador-de-cartao-de-credito': 'validador-de-cartao-de-credito',
	'validador-de-cartao-de-credito': 'gerador-de-cartao-de-credito',
	'gerador-de-cep': 'buscar-cep',
	'buscar-cep': 'gerador-de-cep',
}

export const companionOf = (slug: string) => {
	const companionSlug = COMPANION_TOOL[slug]
	return companionSlug ? TOOLS.find((tool) => tool.slug === companionSlug) : undefined
}

/** The most used tools: suggested when the search opens and listed first on the home page. */
export const POPULAR_TOOLS: ToolEntry[] = [
	'gerador-de-cpf',
	'gerador-de-senha',
	'gerador-de-pessoas',
	'gerador-de-cnpj',
	'porcentagem',
	'diferenca-entre-datas',
	'gerador-de-qr-code',
	'formatador-de-json',
	'buscar-cep',
].flatMap((slug) => TOOLS.filter((tool) => tool.slug === slug))
