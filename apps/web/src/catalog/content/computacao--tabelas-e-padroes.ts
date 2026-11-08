import type { SectionContent } from './types.ts'

export const content: SectionContent = {
	intro: [
		'Esta seção reúne referências que programadores e designers consultam o tempo todo: a tabela ASCII com a extensão Latin-1, os valores que o navegador gera quando uma tecla é pressionada e a conversão de cores entre os formatos usados em CSS e em impressão, com o cálculo de contraste do WCAG. São consultas rápidas, mas os detalhes costumam gerar dúvida, como qual código corresponde a um caractere ou qual propriedade do evento de teclado usar.',
		'Use a tabela ASCII para achar o código decimal, hexadecimal, octal ou binário de um caractere, ou a entidade HTML dele. A página de eventos de teclado serve para programar atalhos: ela mostra exatamente o que o navegador entrega em event.key, event.code, event.keyCode e event.location no seu teclado e no seu sistema. O conversor de cores traduz uma cor entre HEX, RGB, HSL, OKLCH e CMYK e diz se texto branco ou preto sobre ela tem contraste suficiente para leitura.',
		'Dois cuidados: o ASCII vai só até o código 127, e os acentos do português vêm da extensão Latin-1, que não é o mesmo que UTF-8 quando o texto é gravado em bytes. E a conversão para CMYK é matemática e aproximada, já que a cor impressa depende do perfil de cor e do papel usados na gráfica.',
	],
	tools: {
		'eventos-de-teclado': {
			title: 'Eventos de teclado: key, code e keyCode',
			metaDescription:
				'Pressione uma tecla e veja event.key, event.code, event.keyCode e event.location do JavaScript, com os modificadores. Útil para programar atalhos.',
			answer:
				'A ferramenta escuta o evento keydown da página e, a cada tecla pressionada, mostra os valores que o navegador entrega ao JavaScript: event.key (o caractere ou o nome da tecla, como Enter ou ArrowUp), event.code (a posição física da tecla, como KeyA ou Digit1), event.keyCode e event.which (o código numérico antigo) e event.location (0 para teclas comuns, 1 e 2 para modificadores à esquerda e à direita, 3 para o teclado numérico). Também indica se Ctrl, Alt ou Shift estavam pressionados. A página não bloqueia a tecla, então Tab e atalhos do navegador continuam funcionando. Em celulares, há um campo para abrir o teclado virtual.',
			faq: [
				{
					question: 'Devo usar key, code ou keyCode?',
					answer:
						'Use event.key quando importa o caractere digitado, como em um campo de busca, e event.code quando importa a posição física da tecla, como WASD em jogos. event.keyCode está obsoleto, mas ainda aparece em código legado.',
				},
				{
					question: 'Qual a diferença entre event.key e event.code?',
					answer:
						'event.key depende do layout e dos modificadores: a mesma tecla dá "a", "A" ou "q" conforme o Shift e o layout do teclado. event.code indica só a tecla física, como KeyA, e não muda com o layout.',
				},
				{
					question: 'O que significa event.location?',
					answer:
						'Indica onde fica a tecla: 0 para teclas comuns, 1 e 2 para modificadores à esquerda e à direita (como os dois Shift) e 3 para o teclado numérico.',
				},
				{
					question: 'Por que o teclado do celular mostra keyCode 229?',
					answer:
						'Muitos teclados virtuais compõem o texto antes de entregá-lo à página e, nesse caso, o navegador informa keyCode 229 e key "Unidentified" para as letras. Para ler o texto digitado no celular, use o evento input em vez do keydown.',
				},
			],
			updatedAt: '2026-11-08',
		},
		'tabela-ascii': {
			title: 'Tabela ASCII completa (0 a 255)',
			metaDescription:
				'Tabela ASCII de 0 a 127 e extensão Latin-1 até 255, com código decimal, hexadecimal, octal, binário e entidade HTML de cada caractere e busca.',
			answer:
				'A tabela lista os 128 caracteres ASCII (0 a 127) e a extensão Latin-1 (128 a 255), em que ficam á, ç, ã e os demais acentos do português. Cada linha mostra o código em decimal, hexadecimal, octal e binário de 8 bits, o caractere e a entidade HTML numérica, como &#65;. Os caracteres de controle de 0 a 31 e o 127 (DEL) aparecem com a sigla e o nome em português, como LF (nova linha) e CR (retorno de carro); de 128 a 159 ficam os controles C1, que não têm símbolo visível. A busca filtra pelo código decimal, pelo hexadecimal (com ou sem 0x), pelo próprio caractere ou pela descrição.',
			faq: [
				{
					question: 'Qual o código ASCII da letra A?',
					answer:
						'A letra A maiúscula tem código 65 em decimal, 41 em hexadecimal e 01000001 em binário. A letra a minúscula tem código 97 (61 em hexadecimal).',
				},
				{
					question: 'O ç faz parte do ASCII?',
					answer:
						'Não. O ASCII vai só até 127 e não tem letras acentuadas. O ç tem código 231 na extensão Latin-1 (ISO-8859-1), que também corresponde aos primeiros 256 pontos do Unicode.',
				},
				{
					question: 'Qual a diferença entre ASCII e UTF-8?',
					answer:
						'ASCII define 128 caracteres em 7 bits. UTF-8 codifica todo o Unicode em 1 a 4 bytes e é compatível com o ASCII: os códigos de 0 a 127 são iguais. Já os acentos, que no Latin-1 ocupam um byte, em UTF-8 ocupam dois.',
				},
				{
					question: 'Quais são os códigos de quebra de linha?',
					answer:
						'LF (line feed) é o código 10 e CR (carriage return) é o 13. Linux e macOS usam só LF no fim de cada linha; o Windows usa CR seguido de LF.',
				},
				{
					question: 'Como escrever um caractere pelo código no HTML?',
					answer:
						'Use a entidade numérica &# seguida do código decimal e ponto e vírgula, por exemplo &#231; para ç, ou &#x seguida do hexadecimal, como &#xE7;.',
				},
			],
			howTo: {
				title: 'Como converter um código ASCII para hexadecimal e binário',
				steps: [
					'Encontre o código decimal do caractere na tabela.',
					'Para hexadecimal, divida por 16: o quociente é o primeiro dígito e o resto é o segundo (10 a 15 viram A a F).',
					'Para binário, escreva cada dígito hexadecimal como 4 bits.',
					'Junte os dois grupos de 4 bits para formar o byte de 8 bits.',
				],
				example:
					'A letra A tem código 65. 65 ÷ 16 = 4, resto 1, então em hexadecimal é 41. O 4 é 0100 e o 1 é 0001, então em binário fica 01000001. O ç (231) é E7 em hexadecimal e 11100111 em binário.',
			},
			updatedAt: '2026-11-08',
		},
		'conversor-de-cores': {
			title: 'Conversor de cores HEX, RGB, HSL e CMYK',
			metaDescription:
				'Converta cores entre HEX, RGB, HSL, OKLCH e CMYK e veja o contraste WCAG de texto branco e preto sobre a cor, com o nível AA ou AAA atingido.',
			answer:
				'O conversor lê uma cor escolhida no seletor ou digitada em HEX (#rgb, #rrggbb ou com transparência), rgb()/rgba() ou hsl()/hsla() e mostra a mesma cor em HEX, RGB, HSL, OKLCH e CMYK, em sintaxe pronta para colar no CSS. HSL e OKLCH são calculados pelas fórmulas da especificação CSS Color 4. O CMYK é obtido pela fórmula simples a partir do RGB, sem perfil de cor. Também calcula a razão de contraste do WCAG 2 entre a cor e texto branco e preto, de 1:1 a 21:1, e indica o nível atingido: AAA a partir de 7:1, AA a partir de 4,5:1 e “AA grande” a partir de 3:1, que só vale para texto grande.',
			faq: [
				{
					question: 'Qual contraste é recomendado para texto?',
					answer:
						'Pelo WCAG, pelo menos 4,5:1 para texto normal (nível AA) e 7:1 para o nível AAA. Texto grande, a partir de 18 pt ou 14 pt em negrito, precisa de 3:1 no nível AA.',
				},
				{
					question: 'Como converter HEX para RGB?',
					answer:
						'Separe o código em três pares de dígitos hexadecimais e converta cada par para decimal: #a62023 vira 166 (a6), 32 (20) e 35 (23), ou rgb(166 32 35).',
				},
				{
					question: 'O que é OKLCH e por que usar?',
					answer:
						'OKLCH descreve a cor por luminosidade, croma e matiz em um espaço perceptualmente uniforme: mudar só a luminosidade dá tons que parecem igualmente mais claros ou escuros. Por isso é útil para gerar paletas em CSS.',
				},
				{
					question: 'O CMYK é exato para impressão?',
					answer:
						'Não. É uma conversão matemática aproximada a partir do RGB; a cor impressa depende do perfil de cor, da tinta e do papel usados pela gráfica.',
				},
			],
			howTo: {
				title: 'Como converter HEX para RGB e calcular o contraste',
				steps: [
					'Divida o HEX em três pares (vermelho, verde e azul) e converta cada par de hexadecimal para decimal.',
					'Para o contraste, normalize cada canal para 0–1 e aplique a correção de gama do sRGB.',
					'Calcule a luminância relativa: 0,2126 × R + 0,7152 × G + 0,0722 × B, com os canais já corrigidos.',
					'Divida a luminância maior mais 0,05 pela menor mais 0,05.',
				],
				example:
					'#a62023 vira rgb(166 32 35), hsl(358.7 67.7% 38.8%) e cmyk(0% 81% 79% 35%). O contraste com texto branco é cerca de 7,36:1 (AAA) e com texto preto, 2,85:1, que não atinge nem o mínimo para texto grande.',
				source: {
					label: 'W3C: Web Content Accessibility Guidelines (WCAG) 2.2',
					url: 'https://www.w3.org/TR/WCAG22/',
				},
			},
			updatedAt: '2026-11-08',
		},
	},
}
