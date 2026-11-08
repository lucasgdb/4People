import type { SectionContent } from './types.ts'

export const content: SectionContent = {
	intro: [
		'Codificar é escrever a mesma informação de outro jeito, sem mudar o conteúdo. Aqui estão as conversões que aparecem todo dia em programação: texto em código binário, texto em Base64, caracteres especiais em percent-encoding para URLs, números entre bases (binário, octal, decimal, hexadecimal) e a leitura e montagem de JSON Web Tokens. O formatador de JSON entra no grupo porque também só reorganiza o texto: indenta, minifica e aponta onde está o erro de sintaxe.',
		'Use o conversor binário para ver os bytes de um texto e o de bases numéricas para converter um número; são coisas diferentes, já que “65” como texto vira dois bytes, enquanto o número 65 é 1000001 em binário. Base64 serve para transportar bytes em lugares que só aceitam texto, como JSON, e-mail ou data URIs; o codificador de URL serve para colocar acentos, espaços e símbolos dentro de um endereço sem quebrá-lo. Para tokens de autenticação, o decodificador mostra o que um JWT carrega e confere a assinatura, e o gerador cria tokens de teste.',
		'Um cuidado vale para todas: codificação não é criptografia. Base64, percent-encoding e o payload de um JWT podem ser lidos por qualquer pessoa, sem chave. Os textos são tratados como UTF-8, então acentos e emojis ocupam mais de um byte, e todo o processamento acontece no navegador.',
	],
	tools: {
		'conversor-de-binario': {
			title: 'Conversor de texto para binário',
			metaDescription:
				'Converta texto em código binário e binário em texto. Cada caractere vira bytes UTF-8 de 8 bits, com acentos e emojis. Veja como converter à mão.',
			answer:
				'O conversor transforma texto em código binário e código binário de volta em texto. Na ida, o texto é codificado em UTF-8 e cada byte é escrito como um grupo de 8 bits, com zeros à esquerda, separado do próximo por espaço. Letras e sinais do ASCII ocupam um byte; acentos como á e ç ocupam dois; emojis, quatro. Na volta, a ferramenta aceita grupos de 0 e 1 com até 8 bits separados por espaços ou quebras de linha, transforma cada grupo em um byte e decodifica o resultado como UTF-8. Se aparecer qualquer outro caractere, ou um grupo com mais de 8 bits, ela avisa em vez de adivinhar.',
			faq: [
				{
					question: 'Como a letra A fica em binário?',
					answer:
						'A letra A maiúscula tem código 65 na tabela ASCII, que em binário de 8 bits é 01000001. A letra a minúscula tem código 97, ou 01100001.',
				},
				{
					question: 'Por que uma letra acentuada vira dois grupos de 8 bits?',
					answer:
						'Em UTF-8, só os 128 caracteres do ASCII cabem em um byte. Letras acentuadas ocupam dois bytes: o á, por exemplo, vira 11000011 10100001. Emojis ocupam quatro bytes.',
				},
				{
					question: 'Quantos bits tem um caractere?',
					answer:
						'Depende da codificação. Em UTF-8, um caractere ocupa de 1 a 4 bytes, ou seja, de 8 a 32 bits. Letras sem acento, números e pontuação comum usam 8 bits.',
				},
				{
					question: 'Preciso separar os bytes por espaço para converter binário em texto?',
					answer:
						'Sim. Cada grupo separado por espaço ou quebra de linha é lido como um byte. Uma sequência longa sem espaços, com mais de 8 dígitos, é recusada porque não dá para saber onde cada byte começa.',
				},
			],
			howTo: {
				title: 'Como converter texto em binário à mão',
				steps: [
					'Encontre o código de cada caractere na tabela ASCII ou Unicode. Para letras sem acento, o código ASCII basta.',
					'Converta o código decimal para binário dividindo por 2 repetidamente e lendo os restos de baixo para cima.',
					'Complete com zeros à esquerda até ter 8 dígitos.',
					'Para caracteres fora do ASCII, use os bytes UTF-8 do caractere em vez do código: cada byte vira um grupo de 8 bits.',
					'Escreva os grupos na ordem do texto, separados por espaço.',
				],
				example:
					'“Oi”: O tem código 79 = 1001111, que com 8 dígitos fica 01001111; i tem código 105 = 01101001. Resultado: 01001111 01101001. Já “Olá!” vira 01001111 01101100 11000011 10100001 00100001, porque o á ocupa dois bytes.',
				source: {
					label: 'RFC 3629: UTF-8, a transformation format of ISO 10646',
					url: 'https://www.rfc-editor.org/rfc/rfc3629',
				},
			},
			updatedAt: '2026-11-08',
		},
		'formatador-de-json': {
			title: 'Formatador e validador de JSON',
			metaDescription:
				'Formate JSON com 2 ou 4 espaços, minifique em uma linha e valide a sintaxe com a linha e a coluna exatas do erro. Tudo no navegador, sem envio.',
			answer:
				'O formatador lê o texto com o JSON.parse do navegador, que segue a especificação do JSON à risca, e o reescreve com indentação de 2 ou 4 espaços ou minificado em uma linha só. Se o JSON for válido, a ferramenta mostra o resultado e o tamanho antes e depois em bytes, útil para ver quanto a minificação economiza. Se houver erro de sintaxe, ela informa a linha e a coluna onde a leitura falhou, que costuma ser o caractere logo depois do problema. A ordem das chaves e os valores são mantidos; só os espaços e as quebras de linha mudam.',
			faq: [
				{
					question: 'Por que meu JSON é inválido?',
					answer:
						'Os erros mais comuns são vírgula sobrando depois do último item, aspas simples no lugar de aspas duplas, chaves de objeto sem aspas e comentários. O JSON exige aspas duplas em todas as chaves e textos e não aceita comentários nem vírgula final.',
				},
				{
					question: 'Qual a diferença entre formatar e minificar JSON?',
					answer:
						'Formatar adiciona quebras de linha e indentação para facilitar a leitura. Minificar remove todos os espaços desnecessários e deixa o JSON em uma linha, o que reduz o tamanho para enviar pela rede. Os dados são os mesmos nos dois casos.',
				},
				{
					question: 'Devo indentar JSON com 2 ou 4 espaços?',
					answer:
						'Tanto faz para a validade do arquivo. Dois espaços é o padrão mais comum em projetos JavaScript e em arquivos como package.json; quatro espaços aparecem mais em projetos Python e Java. Siga o padrão do projeto.',
				},
				{
					question: 'O JSON que eu colo é enviado para algum lugar?',
					answer:
						'Não. A validação e a formatação usam o JSON.parse do próprio navegador, então o conteúdo não sai da sua máquina.',
				},
			],
			updatedAt: '2026-11-08',
		},
		base64: {
			title: 'Codificar e decodificar Base64',
			metaDescription:
				'Codifique texto em Base64 e decodifique de volta, com suporte a acentos (UTF-8) e ao formato Base64URL usado em JWT e URLs. Veja como funciona.',
			answer:
				'A ferramenta codifica texto em Base64 e decodifica Base64 de volta para texto. Primeiro o texto vira bytes UTF-8, então acentos e emojis funcionam. Depois os bytes são agrupados de 3 em 3 (24 bits), divididos em 4 blocos de 6 bits, e cada bloco vira um dos 64 caracteres A–Z, a–z, 0–9, + e /. Quando sobram 1 ou 2 bytes no fim, o resultado é completado com =. A opção “Seguro para URL” gera Base64URL: troca + por -, / por _ e remove o =. Na decodificação, os dois formatos são aceitos, com ou sem =, e espaços e quebras de linha são ignorados.',
			faq: [
				{
					question: 'Base64 é criptografia?',
					answer:
						'Não. Base64 é só uma forma de representar bytes usando 64 caracteres seguros para texto. Qualquer pessoa decodifica sem chave, então não use Base64 para esconder senhas ou dados sensíveis.',
				},
				{
					question: 'O que é Base64URL?',
					answer:
						'É a variante do Base64 usada em JWTs e em URLs: troca + por -, / por _ e dispensa o preenchimento com =, porque esses caracteres têm significado especial em endereços.',
				},
				{
					question: 'Por que o Base64 fica maior que o texto original?',
					answer:
						'Cada 3 bytes viram 4 caracteres, então o resultado fica cerca de 33% maior. Em troca, ele usa só caracteres que passam sem problemas por e-mail, JSON e HTML.',
				},
				{
					question: 'Para que serve o = no final do Base64?',
					answer:
						'É preenchimento. Quando o número de bytes não é múltiplo de 3, o último grupo fica incompleto e recebe um ou dois = para o total de caracteres ser múltiplo de 4.',
				},
			],
			howTo: {
				title: 'Como funciona a codificação Base64',
				steps: [
					'Converta o texto em bytes (UTF-8) e escreva cada byte em binário de 8 bits.',
					'Junte os bits e corte em blocos de 6 bits. Se o último bloco ficar curto, complete com zeros à direita.',
					'Converta cada bloco para um número de 0 a 63 e troque pelo caractere da tabela: 0–25 são A–Z, 26–51 são a–z, 52–61 são 0–9, 62 é + e 63 é /.',
					'Se o total de caracteres não for múltiplo de 4, complete com =.',
				],
				example:
					'“Oi” são os bytes 01001111 01101001. Em blocos de 6 bits: 010011 110110 100100 (os dois últimos zeros são de preenchimento), ou 19, 54 e 36, que viram T, 2 e k. Com o = final, o resultado é T2k=. Já “Olá” vira T2zDoQ==.',
				source: {
					label: 'RFC 4648: The Base16, Base32, and Base64 Data Encodings',
					url: 'https://www.rfc-editor.org/rfc/rfc4648',
				},
			},
			updatedAt: '2026-11-08',
		},
		'codificador-de-url': {
			title: 'Codificador e decodificador de URL',
			metaDescription:
				'Codifique e decodifique textos para URL com percent-encoding: espaços, acentos e símbolos viram %20, %C3%A7 e afins. Para parâmetros ou URL completa.',
			answer:
				"O codificador aplica percent-encoding: cada caractere que não pode aparecer em uma URL vira os bytes UTF-8 dele escritos como %XX em hexadecimal. O espaço vira %20 e o ç vira %C3%A7. Há dois modos. “Parte da URL” usa a regra do encodeURIComponent e codifica também & = ? / : #, para usar no valor de um parâmetro. “URL completa” usa o encodeURI e preserva esses caracteres, para não quebrar um endereço inteiro. Letras sem acento, números e - _ . ! ~ * ' ( ) nunca são codificados. Na decodificação, as sequências %XX voltam a ser texto e o + é lido como espaço, como nos formulários.",
			faq: [
				{
					question: 'Qual a diferença entre encodeURI e encodeURIComponent?',
					answer:
						'encodeURIComponent codifica também &, =, ?, / e #, então serve para o valor de um parâmetro de busca. encodeURI mantém esses caracteres para não quebrar a estrutura de um endereço completo.',
				},
				{
					question: 'Por que o espaço vira %20 e às vezes +?',
					answer:
						'Na URL, o espaço é codificado como %20. Em formulários HTML enviados por GET ou POST (application/x-www-form-urlencoded), ele vira +. Ao decodificar, os dois são lidos como espaço.',
				},
				{
					question: 'Por que o + virou espaço ao decodificar?',
					answer:
						'Em formulários e query strings, o + representa espaço. Para que um + apareça literalmente no valor decodificado, ele precisa estar codificado como %2B.',
				},
				{
					question: 'Por que um acento vira dois códigos com %?',
					answer:
						'O percent-encoding codifica bytes, e em UTF-8 uma letra acentuada ocupa dois bytes. O ã, por exemplo, vira %C3%A3.',
				},
			],
			howTo: {
				title: 'Como codificar um texto para URL',
				steps: [
					'Decida se o texto é um valor de parâmetro (codifique tudo que é reservado) ou uma URL completa (mantenha : / ? & = #).',
					"Mantenha como estão letras sem acento, números e os caracteres - _ . ! ~ * ' ( ).",
					'Para cada outro caractere, pegue os bytes UTF-8 dele.',
					'Escreva cada byte como % seguido de dois dígitos hexadecimais maiúsculos.',
				],
				example:
					'“ação & reação” como valor de parâmetro vira a%C3%A7%C3%A3o%20%26%20rea%C3%A7%C3%A3o: o ç vira %C3%A7, o ã vira %C3%A3, o espaço vira %20 e o & vira %26.',
				source: {
					label: 'RFC 3986: Uniform Resource Identifier (URI), seção 2.1',
					url: 'https://www.rfc-editor.org/rfc/rfc3986',
				},
			},
			updatedAt: '2026-11-08',
		},
		'decodificador-de-jwt': {
			title: 'Decodificador de JWT com verificação',
			metaDescription:
				'Decodifique um JWT, veja header, payload e claims com datas legíveis e verifique a assinatura HS256, RS256, PS256 ou ES256, tudo no navegador.',
			answer:
				'O decodificador separa o token nas três partes divididas por ponto (header, payload e assinatura), decodifica o Base64URL das duas primeiras e mostra o JSON de cada uma, com uma cor por parte. As claims registradas (iss, sub, aud, exp, nbf, iat e jti) aparecem explicadas, e as datas em segundos Unix viram datas legíveis com o tempo relativo. O status diz se o token está expirado, ainda não é válido (nbf no futuro) ou dentro do prazo. A assinatura é verificada com a Web Crypto do navegador, usando o algoritmo do campo alg: HS256/384/512 com o segredo, e RS, PS e ES (256/384/512) com a chave pública em PEM, JWK ou JWKS.',
			faq: [
				{
					question: 'Como verificar a assinatura de um JWT?',
					answer:
						'Cole o token e informe o segredo (para HS256, HS384 e HS512) ou a chave pública em PEM (BEGIN PUBLIC KEY) ou JWK (para RS, PS e ES). O resultado diz se a assinatura é válida ou inválida. Sem a chave, o token pode ser lido, mas não verificado.',
				},
				{
					question: 'Dá para ler um JWT sem a chave?',
					answer:
						'Sim. O header e o payload são só JSON em Base64URL, sem criptografia. A chave serve apenas para conferir se a assinatura é autêntica, ou seja, se o conteúdo não foi alterado.',
				},
				{
					question: 'O que significam exp, iat e nbf?',
					answer:
						'São datas em segundos desde 1º de janeiro de 1970 (UTC). exp é quando o token expira, iat é quando ele foi emitido e nbf é a partir de quando ele pode ser aceito.',
				},
				{
					question: 'É seguro colar um JWT e a chave aqui?',
					answer:
						'A decodificação e a verificação acontecem só no navegador e nada é enviado. Mesmo assim, um token de produção dá acesso a uma conta enquanto vale, então prefira testar com tokens expirados ou de desenvolvimento.',
				},
				{
					question: 'O que significa “Segredo em Base64”?',
					answer:
						'Alguns sistemas geram o segredo HMAC como bytes aleatórios e o guardam em Base64. Marque a opção para que o texto seja decodificado antes da verificação; deixe desmarcada se o segredo for um texto comum.',
				},
			],
			howTo: {
				title: 'Como decodificar um JWT à mão',
				steps: [
					'Divida o token nos dois pontos: a primeira parte é o header, a segunda o payload e a terceira a assinatura.',
					'Troque - por + e _ por / no header e no payload e complete com = até o tamanho ser múltiplo de 4.',
					'Decodifique o Base64 de cada parte e leia o JSON resultante.',
					'Converta exp, iat e nbf de segundos Unix para data e compare exp com o horário atual.',
				],
				example:
					'O header eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 decodifica para {"alg":"HS256","typ":"JWT"}, e o payload eyJzdWIiOiIxMjMiLCJub21lIjoiQW5hIiwiaWF0IjoxNzAwMDAwMDAwfQ para {"sub":"123","nome":"Ana","iat":1700000000}. O iat 1700000000 corresponde a 14/11/2023 às 22:13:20 UTC.',
				source: {
					label: 'RFC 7519: JSON Web Token (JWT)',
					url: 'https://www.rfc-editor.org/rfc/rfc7519',
				},
			},
			updatedAt: '2026-11-08',
		},
		'gerador-de-jwt': {
			title: 'Gerador de JWT (HS256, RS256, ES256)',
			metaDescription:
				'Gere e assine um JWT a partir de header e payload em JSON com HS256, RS256, PS256, ES256 e variantes. Gera chaves de teste e não envia nada.',
			answer:
				'O gerador monta o token a partir do header e do payload em JSON e o assina no navegador com a Web Crypto. Header e payload são codificados em Base64URL, unidos por ponto, e essa sequência é assinada com o algoritmo escolhido; a assinatura em Base64URL vira a terceira parte. HS256, HS384 e HS512 usam um segredo compartilhado (texto ou Base64), e a ferramenta pode sortear um com o tamanho do hash. RS, PS e ES (256/384/512) usam uma chave privada PKCS#8 em PEM ou um JWK privado; o botão “Gerar par de chaves” cria uma RSA de 2048 bits ou EC na curva certa. O campo alg do header sempre acompanha o algoritmo escolhido.',
			faq: [
				{
					question: 'Como adicionar a data de expiração?',
					answer:
						'Use os botões “iat = agora” e “exp = daqui a 1 hora” ou “1 dia”: eles gravam o horário Unix em segundos no payload. Também dá para editar os números à mão.',
				},
				{
					question: 'Qual a diferença entre HS256 e RS256?',
					answer:
						'HS256 usa HMAC com um segredo compartilhado: quem verifica precisa do mesmo segredo que assinou. RS256 usa RSA com par de chaves: assina com a chave privada e qualquer serviço verifica com a chave pública, sem poder emitir tokens.',
				},
				{
					question: 'Qual o tamanho mínimo do segredo para HS256?',
					answer:
						'A especificação JWA pede uma chave pelo menos do tamanho do hash: 32 bytes para HS256, 48 para HS384 e 64 para HS512. Segredos curtos podem ser descobertos por força bruta.',
				},
				{
					question: 'Não tenho uma chave RSA ou EC. Como testar?',
					answer:
						'Clique em “Gerar par de chaves”: o navegador cria uma chave privada (PKCS#8) para assinar e mostra a chave pública (SPKI) para verificar no decodificador. Use essas chaves só para testes.',
				},
			],
			howTo: {
				title: 'Como um JWT é assinado',
				steps: [
					'Escreva o header em JSON com o algoritmo, por exemplo {"alg":"HS256","typ":"JWT"}, e codifique em Base64URL.',
					'Escreva o payload em JSON com as claims e codifique em Base64URL.',
					'Una as duas partes com um ponto: essa é a entrada da assinatura.',
					'Assine essa entrada com o algoritmo (HMAC-SHA256 com o segredo, no caso do HS256) e codifique o resultado em Base64URL.',
					'Junte header, payload e assinatura separados por ponto.',
				],
				example:
					'Com header {"alg":"HS256","typ":"JWT"}, payload {"sub":"123","nome":"Ana","iat":1700000000} e segredo “segredo”, o token fica eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJub21lIjoiQW5hIiwiaWF0IjoxNzAwMDAwMDAwfQ.mmUeNs73qAjeQXjp96wTHs4JpdcuqktxPjFNMGoQHpQ.',
				source: {
					label: 'RFC 7515: JSON Web Signature (JWS)',
					url: 'https://www.rfc-editor.org/rfc/rfc7515',
				},
			},
			updatedAt: '2026-11-08',
		},
		'conversor-de-bases-numericas': {
			title: 'Conversor de bases: binário, decimal e hexa',
			metaDescription:
				'Converta números inteiros entre binário, octal, decimal, hexadecimal e qualquer base de 2 a 36, com resultado exato mesmo para números enormes.',
			answer:
				'O conversor recebe um número inteiro escrito em binário (base 2), octal (8), decimal (10) ou hexadecimal (16) e mostra o mesmo valor em todas essas bases de uma vez, mais uma base extra à sua escolha entre 2 e 36. Acima da base 10, os dígitos continuam com as letras A a Z, então a base 16 usa 0–9 e A–F e a base 36 usa todas as letras. O cálculo usa BigInt, por isso números com dezenas de dígitos saem exatos, sem arredondamento. Números negativos são aceitos, e espaços e sublinhados usados para separar dígitos são ignorados. Números com vírgula ou ponto decimal não são convertidos.',
			faq: [
				{
					question: 'Quanto é 255 em hexadecimal?',
					answer:
						'255 em decimal é FF em hexadecimal, 11111111 em binário e 377 em octal. É o maior valor que cabe em um byte.',
				},
				{
					question: 'Posso colar 0x, 0b ou 0o na frente?',
					answer:
						'Sim, desde que a base de origem seja a do prefixo: 0x em hexadecimal, 0b em binário e 0o em octal. Em hexadecimal, 0b10 é lido como o número B10, porque b é um dígito válido nessa base.',
				},
				{
					question: 'Por que o hexadecimal é tão usado em computação?',
					answer:
						'Porque cada dígito hexadecimal corresponde a exatamente 4 bits, então um byte sempre cabe em dois dígitos. Isso deixa endereços de memória, cores e hashes muito mais curtos que em binário.',
				},
				{
					question: 'Como converter binário para decimal?',
					answer:
						'Multiplique cada dígito pela potência de 2 da sua posição, contando da direita a partir de 0, e some. 1011 em binário é 1×8 + 0×4 + 1×2 + 1×1 = 11.',
				},
			],
			howTo: {
				title: 'Como converter decimal para outra base',
				steps: [
					'Divida o número pela base de destino e anote o resto.',
					'Divida o quociente pela base de novo e anote o novo resto.',
					'Repita até o quociente chegar a zero.',
					'Leia os restos de baixo para cima. Em bases acima de 10, restos de 10 a 35 viram as letras A a Z.',
				],
				example:
					'255 para hexadecimal: 255 ÷ 16 = 15, resto 15 (F); 15 ÷ 16 = 0, resto 15 (F). Resultado: FF. 255 para binário dá 11111111, para octal 377 e para a base 36, 73.',
			},
			updatedAt: '2026-11-08',
		},
	},
}
