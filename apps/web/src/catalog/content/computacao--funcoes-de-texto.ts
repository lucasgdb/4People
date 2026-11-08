import type { SectionContent } from './types.ts'

const UPDATED_AT = '2026-11-08'

export const content: SectionContent = {
	intro: [
		'As funções de texto resolvem tarefas repetitivas de quem escreve, revisa ou programa: contar caracteres e palavras, trocar maiúsculas por minúsculas, colocar listas em ordem alfabética, descobrir quais palavras se repetem, limpar acentos e quebras de linha, escrever números por extenso e converter texto em HTML. Todas trabalham com o português do Brasil em mente: acentos, cedilha e a ordem do dicionário são tratados corretamente.',
		'Para conferir limites de tamanho (bio, título, descrição de anúncio), use o contador de caracteres. Para nomes de variáveis, arquivos e URLs, o conversor de maiúsculas e minúsculas gera camelCase, snake_case e kebab-case sem acentos. Texto copiado de PDF com quebras no meio das frases se resolve com a limpeza de texto; listas de nomes ou produtos, com a ordem alfabética; e cheques, contratos e recibos, com o número por extenso. As letras diferentes servem para redes sociais, e as informações de caractere ajudam a descobrir o código Unicode de um símbolo ou emoji.',
		'O texto é processado no próprio navegador e não é enviado a servidor algum. Vale lembrar que as letras estilizadas são símbolos Unicode, e não uma fonte: podem aparecer como quadrados em aparelhos antigos e são mal lidas por leitores de tela.',
	],
	tools: {
		'contador-de-caracteres': {
			title: 'Contador de caracteres e palavras',
			metaDescription:
				'Conte caracteres com e sem espaços, palavras, linhas, espaços, vogais, consoantes e números de um texto, com a contagem atualizada enquanto digita.',
			answer:
				'O contador de caracteres mostra, enquanto você digita ou cola um texto, oito números: caracteres, caracteres sem espaços, palavras, linhas, espaços, vogais, consoantes e números. Cada caractere é contado por ponto de código Unicode, então letras acentuadas e a maioria dos emojis valem 1. O total inclui espaços e quebras de linha; “sem espaços” desconta todo espaço em branco, inclusive tabulações e quebras. Palavras são sequências separadas por espaço ou quebra de linha, e linhas são contadas pelas quebras de linha. Em “espaços” entra só a barra de espaço. Vogais incluem as acentuadas (á, ã, ê, ô, ü…), consoantes incluem ç, y, k e w, e números são os dígitos de 0 a 9.',
			faq: [
				{
					question: 'Espaço conta como caractere?',
					answer:
						'Sim. Na contagem total de caracteres, espaços e quebras de linha entram como caracteres, como fazem a maioria dos formulários e redes sociais. O contador mostra também o total sem espaços, que desconta espaços, tabulações e quebras de linha.',
				},
				{
					question: 'Emojis contam como um caractere?',
					answer:
						'Um emoji simples, como 😀, conta como um caractere, porque a contagem é por ponto de código Unicode. Emojis compostos, como os com tom de pele ou famílias, são formados por vários pontos de código e contam como dois ou mais. Algumas plataformas contam de outro jeito, então o limite delas pode diferir em textos com muitos emojis.',
				},
				{
					question: 'Como as palavras são contadas?',
					answer:
						'No contador de caracteres, cada sequência separada por espaços, tabulações ou quebras de linha conta como uma palavra. Assim, “guarda-chuva” é uma palavra só, e números como 2026 também contam como palavra.',
				},
				{
					question: 'Letras acentuadas contam como vogais?',
					answer:
						'Sim. O contador de caracteres considera vogais o a, e, i, o, u e as formas acentuadas do português (á, à, â, ã, é, ê, í, ó, ô, õ, ú, ü), em maiúscula ou minúscula. O ç conta como consoante.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'maiusculas-e-minusculas': {
			title: 'Converter maiúsculas e minúsculas e camelCase',
			metaDescription:
				'Converta texto em MAIÚSCULAS, minúsculas, Título, frase, camelCase, PascalCase, snake_case, kebab-case ou CONSTANT_CASE, tudo de uma vez.',
			answer:
				'O conversor de maiúsculas e minúsculas mostra o mesmo texto em nove formatos ao mesmo tempo, atualizados enquanto você digita: MAIÚSCULAS, minúsculas, Título (inicial maiúscula em cada palavra), frase (inicial maiúscula no começo e depois de ponto, exclamação ou interrogação), camelCase, PascalCase, snake_case, kebab-case e CONSTANT_CASE. As conversões usam as regras do português, então ç e letras acentuadas mudam de caixa corretamente. Nos cinco formatos de código, o texto é quebrado em palavras nos espaços, na pontuação e nas mudanças de caixa (getHTTPResponse vira get_http_response), e os acentos são removidos: “nome do usuário” vira nomeDoUsuario, nome_do_usuario e nome-do-usuario.',
			faq: [
				{
					question: 'Quando usar snake_case, camelCase ou kebab-case?',
					answer:
						'camelCase é o padrão para variáveis e funções em JavaScript e Java; PascalCase para classes e componentes; snake_case para variáveis em Python e colunas de banco de dados; kebab-case para URLs, nomes de arquivo e classes CSS; e CONSTANT_CASE para constantes e variáveis de ambiente.',
				},
				{
					question: 'O que acontece com os acentos na conversão?',
					answer:
						'Em MAIÚSCULAS, minúsculas, Título e frase os acentos são mantidos. Nos formatos de identificador (camelCase, PascalCase, snake_case, kebab-case e CONSTANT_CASE) eles são removidos, e “ação” vira “acao”, para o resultado funcionar em código e URLs.',
				},
				{
					question: 'Por que o formato Título deixa “De” e “Da” com maiúscula?',
					answer:
						'O formato Título do conversor põe inicial maiúscula em todas as palavras, sem exceção para preposições e artigos, porque cada manual de estilo define uma lista diferente. Se precisar de “de”, “da” e “e” em minúscula, ajuste essas palavras à mão depois de copiar.',
				},
				{
					question: 'O formato frase mantém nomes próprios com maiúscula?',
					answer:
						'Não. O formato frase converte tudo para minúscula e põe maiúscula só na primeira letra do texto e depois de ponto, exclamação ou interrogação. Nomes próprios e siglas no meio da frase precisam ser corrigidos à mão.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'letras-diferentes': {
			title: 'Letras diferentes para copiar e colar',
			metaDescription:
				'Transforme seu texto em letras diferentes para Instagram, WhatsApp e nicks: negrito, itálico, cursiva, gótica, contorno e mais 12 estilos Unicode.',
			answer:
				'A ferramenta de letras diferentes reescreve o texto em 17 estilos de uma vez: negrito, itálico, negrito itálico, cursiva, cursiva negrito, gótica, contorno, sem serifa (normal, negrito e itálico), máquina de escrever, largura total, em círculos, versalete, riscado, sublinhado e de cabeça para baixo. Cada letra é trocada pelo símbolo equivalente dos alfabetos matemáticos e de outros blocos do Unicode, por isso o estilo continua ao colar em Instagram, WhatsApp, X ou num nick de jogo. Os acentos e a cedilha são mantidos como sinais combinantes sobre a letra estilizada. Números só mudam nos estilos que têm dígitos próprios (negrito, contorno, sem serifa, sem serifa negrito, máquina de escrever e largura total), e a pontuação fica como foi digitada.',
			faq: [
				{
					question: 'Os acentos e o ç funcionam nas letras diferentes?',
					answer:
						'Sim. Os alfabetos estilizados do Unicode não têm letras acentuadas prontas, então a ferramenta estiliza a letra base e coloca o acento ou a cedilha por cima como um sinal combinante: “ação” sai com o til e a cedilha no estilo escolhido. Em fontes antigas, o acento pode aparecer um pouco deslocado.',
				},
				{
					question: 'Por que algumas letras diferentes aparecem como quadrados?',
					answer:
						'Os quadrados aparecem quando o aparelho ou o aplicativo não tem uma fonte com aquele símbolo Unicode. Isso é mais comum em celulares e sistemas antigos; o texto continua lá e aparece normalmente em quem tem as fontes.',
				},
				{
					question: 'Leitores de tela leem essas letras?',
					answer:
						'Mal. Muitos leitores de tela leem cada letra estilizada pelo nome técnico do símbolo, como “negrito matemático A”, ou a pulam. Evite letras diferentes em textos importantes, nomes de usuário que precisam ser encontrados na busca e mensagens longas.',
				},
				{
					question: 'Como funciona o texto de cabeça para baixo?',
					answer:
						'O estilo de cabeça para baixo passa o texto para minúsculas, troca cada letra por um símbolo parecido com ela invertida (a vira ɐ, e vira ǝ, por exemplo) e inverte a ordem dos caracteres, para a frase ser lida girando a tela. Letras sem equivalente ficam como estão.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'ordem-alfabetica': {
			title: 'Colocar em ordem alfabética (listas e linhas)',
			metaDescription:
				'Coloque listas em ordem alfabética de A a Z ou de Z a A, respeitando acentos e números (2 antes de 10), e remova duplicadas ou embaralhe linhas.',
			answer:
				'A ferramenta de ordem alfabética ordena um texto linha por linha seguindo o alfabeto do português: letras acentuadas ficam junto da letra base (Árvore perto de abacate), e não no fim da lista, como acontece na ordem por código de caractere. Há quatro ordens: A → Z, Z → A, por tamanho (das linhas mais curtas para as mais longas, com empate resolvido em ordem alfabética) e embaralhar. A ordem natural, ligada por padrão, lê números inteiros, e “item 2” vem antes de “item 10”. “Ignorar maiúsculas e acentos” faz “Ação” e “acao” contarem como iguais, o que importa ao remover duplicadas, quando só a primeira ocorrência é mantida. As opções de tirar espaços das pontas e remover linhas vazias limpam a lista antes de ordenar.',
			faq: [
				{
					question: 'Por que “item 10” vinha antes de “item 2”?',
					answer:
						'Na ordem de texto pura, a comparação é feita caractere por caractere, e o “1” de “10” vem antes do “2”. A ordem natural da ferramenta de ordem alfabética lê o número inteiro, então “item 2” fica antes de “item 10”.',
				},
				{
					question: 'Como remover linhas repetidas de uma lista?',
					answer:
						'Na ferramenta de ordem alfabética, marque “Remover duplicadas”: só a primeira ocorrência de cada linha é mantida. Com “Ignorar maiúsculas e acentos” marcado, “Ação”, “ação” e “acao” contam como a mesma linha; desmarcado, as três são mantidas.',
				},
				{
					question: 'Como as palavras com acento são ordenadas?',
					answer:
						'Na ordem alfabética em português, o acento não muda a posição da palavra: “árvore” fica entre “abacate” e “banana”, como no dicionário. Com “Ignorar maiúsculas e acentos” desmarcado, linhas que diferem só no acento ou na caixa ficam lado a lado, com a forma sem acento e em minúscula primeiro.',
				},
				{
					question: 'O embaralhamento das linhas é aleatório de verdade?',
					answer:
						'A opção embaralhar usa o algoritmo de Fisher–Yates, em que todas as ordens possíveis têm a mesma chance, com o gerador aleatório do navegador. Serve para sorteios informais e para variar a ordem de listas, mas não para usos que exijam aleatoriedade criptográfica.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'frequencia-de-palavras': {
			title: 'Frequência de palavras: contar repetições',
			metaDescription:
				'Descubra quantas vezes cada palavra aparece em um texto e a porcentagem de cada uma, ignorando se quiser palavras comuns como “de”, “a” e “que”.',
			answer:
				'A ferramenta de frequência de palavras conta quantas vezes cada palavra aparece em um texto e mostra a porcentagem de cada uma sobre o total de palavras contadas, da mais para a menos frequente (empates em ordem alfabética). O texto é passado para minúsculas, então “Brasil” e “brasil” somam juntas. Uma palavra é uma sequência de letras ou números, que pode ter hífen ou apóstrofo no meio: “guarda-chuva” e “d’água” contam como uma palavra. A opção “Ignorar palavras comuns”, ligada por padrão, descarta artigos, preposições, conjunções e pronomes frequentes (de, a, o, que, para, com…), e o tamanho mínimo descarta palavras curtas. A tabela mostra as 100 palavras mais frequentes.',
			faq: [
				{
					question: 'Para que serve contar a frequência de palavras?',
					answer:
						'Contar a frequência de palavras ajuda a revisar repetições num texto, a encontrar os termos principais de um conteúdo (útil em SEO) e a analisar respostas abertas de pesquisas ou comentários em busca dos temas mais citados.',
				},
				{
					question: 'Maiúsculas contam como palavras diferentes?',
					answer:
						'Não. Na contagem de frequência de palavras, o texto é convertido para minúsculas antes, então “Brasil”, “BRASIL” e “brasil” são contadas como a mesma palavra. Palavras que diferem só no acento, como “avó” e “avô”, continuam separadas.',
				},
				{
					question: 'Quais palavras comuns são ignoradas?',
					answer:
						'Com “Ignorar palavras comuns” marcado, a frequência de palavras descarta artigos (o, a, um, uma), preposições e contrações (de, do, da, em, no, por, para, com), conjunções (e, ou, mas, que, se) e pronomes e verbos muito frequentes (eu, ele, isso, é, são, foi, ter). Essas palavras dominariam a lista sem dizer nada sobre o assunto.',
				},
				{
					question: 'A porcentagem é calculada sobre o quê?',
					answer:
						'A porcentagem de cada palavra é a contagem dela dividida pelo total de palavras que entraram na conta, depois de aplicar o filtro de palavras comuns e o tamanho mínimo. Por isso ela muda quando você altera essas opções.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'texto-para-html': {
			title: 'Texto para HTML e decodificar entidades',
			metaDescription:
				'Converta texto em HTML seguro, com <p>, <br> e links, ou decodifique entidades HTML como &ccedil; e &#65; de volta para texto puro.',
			answer:
				'A ferramenta de texto para HTML trabalha nos dois sentidos. De texto para HTML, troca &, <, >, aspas e apóstrofo pelas entidades &amp;, &lt;, &gt;, &quot; e &#39;. Com a opção “Parágrafos”, cada bloco separado por uma linha em branco vira um <p>, e quebras simples viram <br>; sem ela, todas as quebras viram <br>. A opção de links transforma endereços que começam com http:// ou https:// em <a href>, deixando de fora a pontuação final. De HTML para texto, transforma <br> em quebra de linha e o fim de </p> em linha em branco, remove as demais tags e decodifica entidades numéricas (&#231; e &#xE7;) e as nomeadas mais usadas em português, como &ccedil;, &atilde; e &nbsp;.',
			faq: [
				{
					question: 'Por que escapar o texto antes de colar no HTML?',
					answer:
						'Num documento HTML, um < solto é lido como início de uma tag e um & como início de uma entidade, o que pode quebrar a página ou abrir brecha para injeção de código. Escapados como &lt; e &amp;, esses caracteres aparecem na tela como texto comum.',
				},
				{
					question: 'Quais entidades HTML são decodificadas?',
					answer:
						'Na conversão de HTML para texto, todas as entidades numéricas, decimais (&#65;) e hexadecimais (&#x41;), são decodificadas, além das nomeadas mais comuns em português: vogais acentuadas, &ccedil;, &atilde;, &otilde;, &nbsp;, &amp;, &lt;, &gt;, &quot;, &copy;, &reg;, &deg;, &euro;, &ndash;, &mdash; e &hellip;. Entidades nomeadas fora dessa lista ficam como estão.',
				},
				{
					question: 'Preciso escapar acentos e ç no HTML?',
					answer:
						'Não, se a página declara a codificação UTF-8, o padrão atual. Nesse caso, “ação” pode ir direto no HTML. Por isso a conversão de texto para HTML só escapa os cinco caracteres com significado especial (&, <, >, aspas e apóstrofo) e mantém os acentos.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'informacoes-de-caractere': {
			title: 'Código Unicode de caracteres e emojis',
			metaDescription:
				'Veja o código Unicode (U+…), o tipo, os bytes UTF-8 e as formas de escrever em HTML e JavaScript de cada caractere ou emoji que você digitar.',
			answer:
				'A ferramenta de informações de caractere mostra uma linha para cada caractere digitado ou colado, atualizada enquanto você digita: o código Unicode no formato U+XXXX, o tipo (letra maiúscula ou minúscula, dígito, emoji, pontuação, símbolo, espaço, marca combinante…), os bytes em UTF-8 em hexadecimal e as formas de escrevê-lo em HTML (&#xE7; para ç) e em JavaScript (\\u00E7, ou \\u{1F600} para caracteres acima de U+FFFF, como a maioria dos emojis). Cada linha corresponde a um ponto de código, então um emoji com tom de pele aparece em duas linhas e um acento digitado como sinal combinante aparece separado da letra. São analisados até os primeiros 200 caracteres.',
			faq: [
				{
					question: 'Por que um emoji ocupa 4 bytes?',
					answer:
						'Em UTF-8, caracteres acima de U+FFFF, fora do plano básico do Unicode, como a maioria dos emojis, usam 4 bytes; letras acentuadas do português usam 2 e as letras sem acento, 1. Em JavaScript, esses mesmos emojis ocupam duas unidades de código (um par substituto), e por isso "😀".length dá 2.',
				},
				{
					question: 'Como escrever um caractere especial no HTML?',
					answer:
						'Para escrever um caractere especial no HTML, use a referência numérica hexadecimal &#x seguida do código Unicode e de ponto e vírgula, como &#xE7; para ç ou &#x1F600; para 😀. Ela funciona em qualquer página, independentemente da codificação do arquivo.',
				},
				{
					question: 'O que é o código U+ de um caractere?',
					answer:
						'O código U+ é o ponto de código Unicode do caractere, escrito em hexadecimal com pelo menos quatro dígitos: U+0041 é a letra A, U+00E7 é o ç e U+1F600 é o emoji 😀. Ele identifica o caractere em qualquer sistema, fonte ou linguagem de programação.',
				},
				{
					question: 'Por que um emoji aparece em mais de uma linha?',
					answer:
						'Muitos emojis são sequências de vários pontos de código Unicode: o tom de pele é um modificador separado, e emojis de família ou profissão juntam vários emojis com um caractere invisível chamado ZWJ. A ferramenta mostra cada ponto de código numa linha própria.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'numero-por-extenso': {
			title: 'Número por extenso e valor em reais',
			metaDescription:
				'Escreva números e valores em reais por extenso para cheques, contratos e recibos, seguindo o uso brasileiro, com centavos e até quatrilhões.',
			answer:
				'A ferramenta de número por extenso escreve um número ou um valor em reais por extenso, seguindo o uso brasileiro. Em reais, separa reais e centavos (“mil duzentos e cinquenta reais e trinta centavos”), usa “real” e “centavo” no singular quando o valor é 1 e coloca “de reais” depois de milhão, bilhão ou outra escala redonda (“dois milhões de reais”). Centavos além da segunda casa são desconsiderados. Em número, as casas decimais são lidas depois da palavra “vírgula” (“doze vírgula cinco”), mantendo os zeros iniciais. A regra do “e” segue o português: “mil” sem “um”, “mil e duzentos”, mas “mil duzentos e cinquenta”. O número pode ser negativo e ir até quatrilhões, digitado como 1.234,56 ou 1234.56.',
			howTo: {
				title: 'Como escrever um valor em reais por extenso',
				steps: [
					'Separe a parte inteira (reais) dos centavos.',
					'Divida os reais em grupos de três dígitos a partir da direita (milhões, milhares, centenas) e escreva cada grupo seguido da escala: mil, milhão, bilhão.',
					'Use “e” entre centenas, dezenas e unidades dentro do grupo, e antes do último grupo só quando ele for menor que cem ou uma centena redonda (mil e duzentos, mas mil duzentos e cinquenta).',
					'Escreva “reais” no fim; se o valor terminar em milhão ou bilhão redondo, use “de reais”.',
					'Se houver centavos, acrescente “e” e os centavos por extenso, seguidos de “centavos”.',
				],
				example:
					'R$ 1.250,00 fica “mil duzentos e cinquenta reais”: sem “um” antes de mil e sem “e” entre mil e duzentos, porque 250 não é centena redonda. R$ 2.000.000,50 fica “dois milhões de reais e cinquenta centavos”. R$ 1.200,00 fica “mil e duzentos reais”.',
			},
			faq: [
				{
					question: 'Como escrever R$ 1.250,00 por extenso?',
					answer:
						'R$ 1.250,00 por extenso é “mil duzentos e cinquenta reais”. Não se usa “um mil”, e não há “e” entre “mil” e “duzentos”, porque o último grupo (250) não é uma centena redonda.',
				},
				{
					question: 'Como fica 1 milhão de reais por extenso?',
					answer:
						'R$ 1.000.000,00 por extenso é “um milhão de reais”. Com centavos, R$ 2.000.000,50 fica “dois milhões de reais e cinquenta centavos”. O “de” só aparece quando o valor termina em milhão ou bilhão redondo: R$ 1.000.100,00 é “um milhão e cem reais”.',
				},
				{
					question: 'Quando usar “e” entre os milhares?',
					answer:
						'No número por extenso em português, o “e” aparece antes do último grupo de três dígitos quando ele é menor que cem ou é uma centena redonda: “mil e cinco”, “mil e duzentos”, “dois mil e trezentos”. Nos demais casos não há “e” entre os grupos: “mil duzentos e trinta”.',
				},
				{
					question: 'Como se escreve um número decimal por extenso?',
					answer:
						'No modo número, a parte inteira é escrita normalmente e as casas decimais são lidas como um número inteiro depois de “vírgula”: 1.234,56 vira “mil duzentos e trinta e quatro vírgula cinquenta e seis”. Zeros iniciais são lidos um a um, e 1,05 vira “um vírgula zero cinco”.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'limpar-texto': {
			title: 'Remover acentos, quebras de linha e espaços',
			metaDescription:
				'Limpe um texto em uma passada: remova acentos, troque ou apague quebras de linha, junte espaços repetidos e apague linhas vazias e espaços nas pontas.',
			answer:
				'A ferramenta de limpar texto aplica várias limpezas de uma vez. “Remover acentos” tira acentos, til, trema e cedilha (ação vira acao, ç vira c). Em “Quebras de linha”, você pode manter, trocar por espaço ou remover; quebras seguidas contam como uma só, e “Remover” junta as linhas sem espaço entre elas. “Juntar espaços repetidos” troca sequências de espaços e tabulações por um único espaço. “Tirar espaços das pontas” limpa o começo e o fim de cada linha e do texto inteiro, e “Remover linhas vazias” apaga as linhas em branco. A ordem é: acentos, pontas, linhas vazias, quebras de linha e, por último, espaços repetidos. Por padrão, remover acentos, juntar espaços e tirar das pontas vêm marcados.',
			faq: [
				{
					question: 'Para que remover acentos de um texto?',
					answer:
						'Remover acentos é útil para criar nomes de arquivo, URLs, logins, e-mails e identificadores, e para preencher sistemas antigos ou bancos que não aceitam caracteres acentuados. Também ajuda a comparar listas em que a mesma palavra aparece com e sem acento.',
				},
				{
					question: 'Como transformar um texto quebrado do PDF em um parágrafo?',
					answer:
						'Texto copiado de PDF costuma vir com uma quebra de linha no fim de cada linha. Na ferramenta de limpar texto, escolha “Trocar por espaço” em “Quebras de linha” e mantenha “Juntar espaços repetidos” marcado: as linhas viram um parágrafo contínuo, sem espaços duplos.',
				},
				{
					question: 'Qual a diferença entre remover e trocar quebras de linha por espaço?',
					answer:
						'Ao trocar quebras de linha por espaço, “fim da linha” e “começo da outra” ficam separadas por um espaço. Ao remover as quebras, as linhas são coladas sem espaço, o que serve para juntar códigos, números ou chaves partidos em várias linhas, mas emenda palavras de um texto comum.',
				},
				{
					question: 'A limpeza de texto remove o ç?',
					answer:
						'Com “Remover acentos” marcado, sim: a cedilha é tratada como acento, e “coração” vira “coracao”. O mesmo vale para til, trema e acentos de outras línguas, como em “ñ”. Com a opção desmarcada, o texto mantém todos os acentos.',
				},
			],
			updatedAt: UPDATED_AT,
		},
	},
}
