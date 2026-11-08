import type { SectionContent } from './types.ts'

const UPDATED_AT = '2026-11-08'

export const content: SectionContent = {
	intro: [
		'Estas calculadoras encontram a área de figuras planas a partir das medidas que você já tem: o lado do quadrado, a base e a altura do retângulo ou do triângulo, as diagonais do losango, o raio ou o diâmetro do círculo, os semieixos da elipse e o número de lados de um polígono regular. Cada página mostra a fórmula usada, e o resultado sai com até seis casas decimais.',
		'As calculadoras não trabalham com unidades: elas multiplicam os números que você digita. Por isso, todas as medidas de uma mesma conta precisam estar na mesma unidade, e a área sai nessa unidade ao quadrado. Lados em metros dão metros quadrados (m²); lados em centímetros dão cm². Se uma medida estiver em centímetros e outra em metros, converta antes. Os campos aceitam apenas valores maiores que zero, e números decimais podem ser digitados com vírgula.',
		'Para escolher a ferramenta, pense na forma do objeto. Cômodos, terrenos e paredes costumam ser retângulos. Para telhados de duas águas e cantos em diagonal, use o triângulo ou o trapézio. Peças redondas pedem o círculo, e arruelas ou seções de tubo pedem a coroa circular. Para fatias de pizza ou leques, use o setor circular. Figuras irregulares podem ser divididas em partes conhecidas, calculadas uma a uma e somadas no fim.',
	],
	tools: {
		'area-do-circulo': {
			title: 'Calcular área do círculo (raio ou diâmetro)',
			metaDescription:
				'Calcule a área do círculo pelo raio ou pelo diâmetro com a fórmula A = π·r². Resultado na hora, com até seis casas decimais e exemplo resolvido.',
			answer:
				'A calculadora encontra a área de um círculo a partir do raio ou do diâmetro. No modo "Pelo raio", ela usa A = π·r²: eleva o raio ao quadrado e multiplica por π. No modo "Pelo diâmetro", usa A = π·d²/4, que dá o mesmo resultado sem você precisar dividir o diâmetro por dois. O valor de π é o do JavaScript (3,141592653589793), e a área aparece com até seis casas decimais, na unidade da medida informada ao quadrado. Serve para calcular a superfície de mesas redondas, tampas, canteiros, pizzas ou qualquer peça circular. Se você mediu de borda a borda passando pelo centro, use o modo diâmetro.',
			faq: [
				{
					question: 'Qual a diferença entre raio e diâmetro?',
					answer:
						'O raio vai do centro do círculo até a borda. O diâmetro atravessa o círculo inteiro passando pelo centro, então vale o dobro do raio. Um círculo de 10 cm de diâmetro tem 5 cm de raio.',
				},
				{
					question: 'Qual a área de um círculo de raio 2?',
					answer:
						'A = π · 2² = 4π ≈ 12,566371 unidades de área. Se o raio está em metros, são cerca de 12,57 m².',
				},
				{
					question: 'Qual valor de π a calculadora usa?',
					answer:
						'O Math.PI do JavaScript, 3,141592653589793, com cerca de 15 casas decimais de precisão. Usar 3,14 na mão dá um resultado um pouco menor.',
				},
				{
					question: 'Por que a área não dobra quando o raio dobra?',
					answer:
						'Porque o raio entra elevado ao quadrado. Dobrar o raio multiplica a área por quatro: um círculo de raio 4 tem quatro vezes a área de um de raio 2.',
				},
			],
			howTo: {
				title: 'Como calcular a área do círculo',
				steps: [
					'Meça o raio (do centro até a borda) ou o diâmetro (de borda a borda passando pelo centro).',
					'Escolha "Pelo raio" ou "Pelo diâmetro", conforme a medida que você tem.',
					'Digite o valor; decimais podem ser escritos com vírgula.',
					'Clique em Calcular. A área sai na unidade da medida ao quadrado.',
				],
				example:
					'Uma mesa redonda com 10 dm de diâmetro (raio de 5 dm): A = π · 5² ≈ 78,539816 dm², ou cerca de 0,785 m². Pelo diâmetro, π · 10² / 4 dá o mesmo valor.',
			},
			updatedAt: UPDATED_AT,
		},
		'area-do-quadrado': {
			title: 'Calcular área do quadrado pelo lado',
			metaDescription:
				'Calcule a área do quadrado a partir da medida do lado com a fórmula A = L². Digite o lado e veja o resultado na hora, com exemplo passo a passo.',
			answer:
				'A calculadora encontra a área de um quadrado a partir da medida de um lado. Como os quatro lados do quadrado são iguais, basta multiplicar o lado por ele mesmo: A = L². Um quadrado de 5 m de lado tem 25 m². O resultado sai na unidade do lado ao quadrado e mostra até seis casas decimais. É a conta usada para pisos e azulejos quadrados, lotes, placas e qualquer superfície com lados iguais e cantos retos. Se os lados tiverem medidas diferentes, a figura é um retângulo, e a calculadora de área do retângulo é a certa.',
			faq: [
				{
					question: 'Qual a área de um quadrado de lado 5?',
					answer: 'A = 5² = 5 · 5 = 25 unidades de área. Com o lado em centímetros, são 25 cm².',
				},
				{
					question: 'Se o lado dobrar, o que acontece com a área?',
					answer:
						'A área quadruplica, porque o lado entra elevado ao quadrado. Um quadrado de 2 m tem 4 m²; um de 4 m tem 16 m².',
				},
				{
					question: 'Como saber o lado de um quadrado a partir da área?',
					answer:
						'Tire a raiz quadrada da área. Um quadrado de 49 m² tem lado de 7 m, porque 7 · 7 = 49.',
				},
				{
					question: 'Área e perímetro do quadrado são a mesma coisa?',
					answer:
						'Não. A área (L²) mede a superfície em unidades quadradas; o perímetro (4·L) mede o contorno em unidades de comprimento. Um quadrado de 3 m tem área de 9 m² e perímetro de 12 m.',
				},
			],
			howTo: {
				title: 'Como calcular a área do quadrado',
				steps: [
					'Meça um dos lados do quadrado.',
					'Digite a medida no campo Lado (L), usando vírgula para decimais.',
					'Clique em Calcular para ver a área, na unidade do lado ao quadrado.',
				],
				example: 'Um piso quadrado de 7,5 m de lado: A = 7,5² = 7,5 · 7,5 = 56,25 m².',
			},
			updatedAt: UPDATED_AT,
		},
		'area-do-retangulo': {
			title: 'Calcular área do retângulo (base × altura)',
			metaDescription:
				'Calcule a área do retângulo multiplicando base por altura. Útil para cômodos, terrenos e paredes; mesma unidade nas medidas, resultado em m² ou cm².',
			answer:
				'A calculadora encontra a área de um retângulo multiplicando a base pela altura: A = b·h. A base é um dos lados e a altura é o lado perpendicular a ele; para um cômodo, são a largura e o comprimento. As duas medidas precisam estar na mesma unidade, e a área sai nessa unidade ao quadrado, com até seis casas decimais. É a conta mais comum para saber quantos metros quadrados tem um quarto, um terreno retangular, uma parede ou uma folha, e para calcular quanto piso, tinta ou grama comprar. Em cômodos em L, divida o espaço em dois retângulos e some as áreas.',
			faq: [
				{
					question: 'Qual a área de um retângulo 8 por 3?',
					answer: 'A = 8 · 3 = 24 unidades de área. Com as medidas em metros, são 24 m².',
				},
				{
					question: 'Como calcular os metros quadrados de um cômodo?',
					answer:
						'Meça largura e comprimento em metros e multiplique: um quarto de 3 m por 4 m tem 12 m². Para comprar piso, costuma-se somar uma margem de 10% para cortes e perdas.',
				},
				{
					question: 'Uma medida está em centímetros e outra em metros. E agora?',
					answer:
						'Converta antes de calcular. 250 cm são 2,5 m; então um retângulo de 250 cm por 4 m tem 2,5 · 4 = 10 m².',
				},
				{
					question: 'Como calcular a área de uma parede para pintar?',
					answer:
						'Multiplique a largura pela altura da parede e subtraia a área de portas e janelas, que também são retângulos.',
				},
			],
			howTo: {
				title: 'Como calcular a área do retângulo',
				steps: [
					'Meça a base (largura) e a altura (comprimento) na mesma unidade.',
					'Digite a base no campo Base (b) e a altura no campo Altura (h).',
					'Clique em Calcular para ver a área, na unidade usada ao quadrado.',
				],
				example: 'Um quarto de 4,5 m por 3,2 m: A = 4,5 · 3,2 = 14,4 m².',
			},
			updatedAt: UPDATED_AT,
		},
		'area-do-triangulo': {
			title: 'Calcular área do triângulo (base e altura)',
			metaDescription:
				'Calcule a área do triângulo com a fórmula A = b·h/2: informe a base e a altura e veja o resultado. Explica o que é a altura e os erros mais comuns.',
			answer:
				'A calculadora encontra a área de um triângulo a partir da base e da altura: A = b·h/2. A base pode ser qualquer um dos lados; a altura é a distância em linha reta, formando ângulo de 90°, entre essa base e o vértice oposto. A divisão por dois existe porque todo triângulo ocupa exatamente metade de um paralelogramo com a mesma base e altura. A fórmula vale para qualquer triângulo, seja retângulo, isósceles, equilátero ou escaleno, desde que a altura seja a perpendicular. Use para oitões de telhado, terrenos de esquina, velas e peças cortadas em diagonal. O resultado sai na unidade das medidas ao quadrado.',
			faq: [
				{
					question: 'Qual a área de um triângulo de base 10 e altura 4?',
					answer: 'A = 10 · 4 / 2 = 20 unidades de área.',
				},
				{
					question: 'O que é a altura de um triângulo?',
					answer:
						'É a distância perpendicular entre a base e o vértice oposto, não o comprimento de um dos lados inclinados. No triângulo retângulo, os dois catetos já são base e altura um do outro.',
				},
				{
					question: 'E se eu só souber os três lados?',
					answer:
						'Esta calculadora pede base e altura. Com os três lados, use a fórmula de Heron: A = √(p·(p−a)·(p−b)·(p−c)), em que p é a metade do perímetro.',
				},
				{
					question: 'Como calcular a área de um triângulo retângulo?',
					answer:
						'Multiplique os dois catetos (os lados que formam o ângulo reto) e divida por dois. Com catetos de 3 e 4, a área é 3 · 4 / 2 = 6.',
				},
			],
			howTo: {
				title: 'Como calcular a área do triângulo',
				steps: [
					'Escolha um lado como base e meça o seu comprimento.',
					'Meça a altura: a distância em ângulo reto da base até o vértice oposto.',
					'Digite a base e a altura na mesma unidade.',
					'Clique em Calcular; a calculadora multiplica as duas medidas e divide por dois.',
				],
				example: 'Um oitão de telhado com 12 m de base e 5 m de altura: A = 12 · 5 / 2 = 30 m².',
			},
			updatedAt: UPDATED_AT,
		},
		'area-do-pentagono': {
			title: 'Calcular área do pentágono regular pelo lado',
			metaDescription:
				'Calcule a área do pentágono regular só com a medida do lado, pela fórmula A = 5·L²/(4·tan 36°). Resultado com até seis casas decimais e exemplo.',
			answer:
				'A calculadora encontra a área de um pentágono regular, aquele com cinco lados iguais e cinco ângulos iguais, a partir da medida de um lado. A fórmula é A = 5·L² / (4·tan 36°), o que equivale a cerca de 1,720477·L². Ela vem da divisão do pentágono em cinco triângulos iguais com vértice no centro: 36° é metade do ângulo central de cada um deles (360° / 5 = 72°). Basta informar o lado; o resultado sai na unidade do lado ao quadrado, com até seis casas decimais. Serve para peças, ladrilhos e desenhos com formato pentagonal. Se os lados forem diferentes, a fórmula não se aplica.',
			faq: [
				{
					question: 'Qual a área de um pentágono regular de lado 2?',
					answer: 'A = 5 · 2² / (4 · tan 36°) ≈ 6,88191 unidades de área.',
				},
				{
					question: 'A fórmula vale para pentágonos irregulares?',
					answer:
						'Não. Ela pressupõe os cinco lados e ângulos iguais. Um pentágono irregular precisa ser dividido em triângulos, e as áreas deles somadas.',
				},
				{
					question: 'De onde vem o 36° da fórmula?',
					answer:
						'Ligando o centro aos cinco vértices, o pentágono vira cinco triângulos com ângulo central de 72°. A altura de cada um divide esse ângulo ao meio, e 72° / 2 = 36°.',
				},
				{
					question: 'Como calcular a área usando o apótema?',
					answer:
						'Se você souber o apótema (distância do centro ao meio de um lado), use A = perímetro · apótema / 2. Com lado 2, o apótema é cerca de 1,376 e a área fica 10 · 1,376 / 2 ≈ 6,88.',
				},
			],
			howTo: {
				title: 'Como calcular a área do pentágono regular',
				steps: [
					'Confirme que os cinco lados têm a mesma medida.',
					'Meça um dos lados.',
					'Digite a medida no campo do lado e clique em Calcular.',
				],
				example:
					'Um pentágono regular de 4 cm de lado: A = 5 · 4² / (4 · tan 36°) ≈ 27,527638 cm².',
			},
			updatedAt: UPDATED_AT,
		},
		'area-do-hexagono': {
			title: 'Calcular área do hexágono regular pelo lado',
			metaDescription:
				'Calcule a área do hexágono regular a partir do lado: A = 3√3·L²/2, cerca de 2,598·L². Útil para pisos e ladrilhos sextavados; exemplo resolvido.',
			answer:
				'A calculadora encontra a área de um hexágono regular, com seis lados e seis ângulos iguais, a partir da medida de um lado. Ela usa a fórmula geral dos polígonos regulares com n = 6: A = 6·L² / (4·tan 30°), que é o mesmo que 3√3·L²/2, ou cerca de 2,598076·L². Isso acontece porque o hexágono regular se divide em seis triângulos equiláteros iguais ao lado. Informe o lado e o resultado sai na unidade dele ao quadrado, com até seis casas decimais. É útil para pisos e ladrilhos sextavados, porcas, colmeias e peças de marcenaria. Para hexágonos com lados diferentes, divida a figura em triângulos.',
			faq: [
				{
					question: 'Qual a área de um hexágono regular de lado 2?',
					answer: 'A = 3√3 · 2² / 2 ≈ 10,392305 unidades de área.',
				},
				{
					question: 'Por que o hexágono é formado por triângulos?',
					answer:
						'Ligando o centro aos seis vértices, surgem seis triângulos equiláteros iguais, cada um com área √3·L²/4. Somando os seis, chega-se a 3√3·L²/2.',
				},
				{
					question: 'Quantos ladrilhos sextavados cabem em um metro quadrado?',
					answer:
						'Divida 1 m² pela área de um ladrilho. Um ladrilho de 10 cm de lado tem cerca de 259,81 cm² (0,025981 m²), então cabem aproximadamente 38 por metro quadrado, sem contar o rejunte.',
				},
				{
					question: 'O lado do hexágono regular é igual ao raio?',
					answer:
						'Sim. A distância do centro a qualquer vértice é igual ao lado, porque os triângulos internos são equiláteros.',
				},
			],
			howTo: {
				title: 'Como calcular a área do hexágono regular',
				steps: [
					'Confirme que os seis lados têm a mesma medida.',
					'Meça um dos lados.',
					'Digite o valor e clique em Calcular; a área sai na unidade do lado ao quadrado.',
				],
				example: 'Um hexágono regular de 3 cm de lado: A = 3√3 · 3² / 2 ≈ 23,382686 cm².',
			},
			updatedAt: UPDATED_AT,
		},
		'area-do-poligono-regular': {
			title: 'Calcular área de polígono regular (n lados)',
			metaDescription:
				'Calcule a área de qualquer polígono regular de 3 a 1.000 lados: informe o número de lados e a medida do lado. Fórmula A = n·L²/(4·tan(π/n)).',
			answer:
				'A calculadora encontra a área de qualquer polígono regular, com todos os lados e ângulos iguais, a partir de duas informações: a quantidade de lados (n) e a medida de um lado (L). A fórmula é A = n·L² / (4·tan(π/n)), que soma as áreas dos n triângulos formados ligando o centro aos vértices. O número de lados deve ser um inteiro de 3 a 1.000. Com n = 3 você tem o triângulo equilátero, com n = 4 o quadrado, com n = 8 o octógono, e assim por diante. Use quando a figura tiver uma quantidade de lados sem calculadora própria, como o heptágono, o octógono ou o decágono.',
			faq: [
				{
					question: 'Qual a área de um octógono regular de lado 1?',
					answer: 'A = 8 · 1² / (4 · tan(π/8)) ≈ 4,828427 unidades de área.',
				},
				{
					question: 'A fórmula funciona para o quadrado e o triângulo?',
					answer:
						'Sim. Com n = 4 e lado 3, ela dá 9, igual a 3². Com n = 3 e lado 1, dá cerca de 0,433013, a área do triângulo equilátero (√3/4).',
				},
				{
					question: 'O que acontece quando o número de lados cresce muito?',
					answer:
						'O polígono se aproxima de um círculo. Com 1.000 lados de medida 1, a área é cerca de 79.577,21, muito próxima à do círculo de mesmo perímetro.',
				},
				{
					question: 'Quantos lados tem cada polígono?',
					answer:
						'Triângulo 3, quadrado 4, pentágono 5, hexágono 6, heptágono 7, octógono 8, eneágono 9, decágono 10, dodecágono 12 e icoságono 20.',
				},
			],
			howTo: {
				title: 'Como calcular a área de um polígono regular',
				steps: [
					'Conte os lados do polígono e confirme que todos têm a mesma medida.',
					'Digite a quantidade de lados (de 3 a 1.000) no campo n.',
					'Digite a medida de um lado no campo L.',
					'Clique em Calcular para ver a área, na unidade do lado ao quadrado.',
				],
				example:
					'Uma placa octogonal (n = 8) com 5 cm de lado: A = 8 · 5² / (4 · tan(π/8)) ≈ 120,710678 cm².',
			},
			updatedAt: UPDATED_AT,
		},
		'area-do-losango': {
			title: 'Calcular área do losango pelas diagonais',
			metaDescription:
				'Calcule a área do losango com a fórmula A = D·d/2, a partir da diagonal maior e da diagonal menor. Explica como medir as diagonais e por que dividir.',
			answer:
				'A calculadora encontra a área de um losango a partir das duas diagonais: A = D·d/2. A diagonal maior (D) e a diagonal menor (d) são os segmentos que ligam os vértices opostos e se cruzam no centro, em ângulo reto. A divisão por dois existe porque o losango ocupa exatamente metade do retângulo formado pelas diagonais. As duas medidas devem estar na mesma unidade, e a área sai nessa unidade ao quadrado. A ordem dos campos não altera o resultado, já que a multiplicação é comutativa. Serve para pipas, peças decorativas, ladrilhos em diagonal e problemas escolares de geometria.',
			faq: [
				{
					question: 'Qual a área de um losango com diagonais 6 e 4?',
					answer: 'A = 6 · 4 / 2 = 12 unidades de área.',
				},
				{
					question: 'Por que dividir por dois?',
					answer:
						'As diagonais formam um retângulo que envolve o losango, e o losango ocupa exatamente metade dele: os quatro cantos que sobram são iguais aos quatro triângulos de dentro.',
				},
				{
					question: 'E se eu só souber o lado do losango?',
					answer:
						'Só o lado não basta, porque losangos com o mesmo lado podem ser mais achatados ou mais abertos. Você precisa das diagonais, ou do lado e da altura (A = lado · altura).',
				},
				{
					question: 'Todo quadrado é um losango?',
					answer:
						'Sim. O quadrado é um losango com as diagonais iguais. Com diagonais de 10, a área é 10 · 10 / 2 = 50, a mesma de um quadrado de lado ≈ 7,07.',
				},
			],
			howTo: {
				title: 'Como calcular a área do losango',
				steps: [
					'Meça a diagonal maior, de um vértice ao vértice oposto mais distante.',
					'Meça a diagonal menor, entre os outros dois vértices.',
					'Digite as duas medidas na mesma unidade.',
					'Clique em Calcular; a calculadora multiplica as diagonais e divide por dois.',
				],
				example: 'Uma pipa com diagonais de 10 dm e 8 dm: A = 10 · 8 / 2 = 40 dm², ou 0,4 m².',
			},
			updatedAt: UPDATED_AT,
		},
		'area-do-trapezio': {
			title: 'Calcular área do trapézio (bases e altura)',
			metaDescription:
				'Calcule a área do trapézio com A = (B + b)·h/2: informe base maior, base menor e altura. Útil para terrenos, telhados e cortes; exemplo resolvido.',
			answer:
				'A calculadora encontra a área de um trapézio a partir das duas bases e da altura: A = (B + b)·h/2. As bases são os dois lados paralelos, a maior (B) e a menor (b); a altura é a distância perpendicular entre elas, não o comprimento dos lados inclinados. Na prática, a fórmula tira a média das bases e multiplica pela altura, como se o trapézio fosse um retângulo de largura média. Todas as medidas devem estar na mesma unidade. A conta vale para trapézios retângulos, isósceles e escalenos, e é usada em terrenos com frente e fundo diferentes, águas de telhado e seções de canais.',
			faq: [
				{
					question: 'Qual a área de um trapézio com bases 10 e 6 e altura 4?',
					answer: 'A = (10 + 6) · 4 / 2 = 32 unidades de área.',
				},
				{
					question: 'De onde vem essa fórmula?',
					answer:
						'Duas cópias do mesmo trapézio, uma delas virada, formam um paralelogramo de base B + b e altura h. O trapézio é metade dele, daí a divisão por dois.',
				},
				{
					question: 'Como calcular a área de um terreno com frente e fundo diferentes?',
					answer:
						'Se as laterais forem paralelas entre si e perpendiculares à frente, o terreno é um trapézio: use frente e fundo como bases e a distância entre elas como altura. Com lados irregulares, divida o terreno em triângulos.',
				},
				{
					question: 'Posso usar o lado inclinado como altura?',
					answer:
						'Não. A altura é medida em ângulo reto entre as bases. Usar o lado inclinado dá uma área maior que a real.',
				},
			],
			howTo: {
				title: 'Como calcular a área do trapézio',
				steps: [
					'Identifique os dois lados paralelos: a base maior e a base menor.',
					'Meça a altura, a distância em ângulo reto entre as bases.',
					'Digite as três medidas na mesma unidade.',
					'Clique em Calcular; a calculadora soma as bases, multiplica pela altura e divide por dois.',
				],
				example:
					'Um terreno com frente de 8 m, fundo de 12 m e 5 m de profundidade: A = (12 + 8) · 5 / 2 = 50 m².',
			},
			updatedAt: UPDATED_AT,
		},
		'area-do-paralelogramo': {
			title: 'Calcular área do paralelogramo',
			metaDescription:
				'Calcule a área do paralelogramo multiplicando a base pela altura perpendicular (A = b·h). Veja por que o lado inclinado não serve como altura.',
			answer:
				'A calculadora encontra a área de um paralelogramo multiplicando a base pela altura: A = b·h. A base é um dos lados, e a altura é a distância perpendicular entre essa base e o lado oposto, paralelo a ela. Esse é o ponto que mais causa erro: a altura não é o lado inclinado, que é sempre mais comprido. A fórmula funciona porque, cortando um triângulo de uma ponta e encaixando na outra, o paralelogramo vira um retângulo com a mesma base e altura. As medidas devem estar na mesma unidade, e o resultado sai nessa unidade ao quadrado. Retângulos, quadrados e losangos também são paralelogramos.',
			faq: [
				{
					question: 'Qual a área de um paralelogramo de base 7 e altura 3?',
					answer: 'A = 7 · 3 = 21 unidades de área.',
				},
				{
					question: 'Posso usar o lado inclinado como altura?',
					answer:
						'Não. A altura é a distância perpendicular entre as bases; o lado inclinado é sempre maior que ela, e usá-lo infla a área.',
				},
				{
					question: 'E se eu souber os dois lados e o ângulo entre eles?',
					answer:
						'Calcule a altura como lado inclinado · seno do ângulo, ou direto A = a · b · sen(θ). Com lados 9 e 5 e ângulo de 30°, a altura é 2,5 e a área, 22,5.',
				},
			],
			howTo: {
				title: 'Como calcular a área do paralelogramo',
				steps: [
					'Escolha um lado como base e meça o seu comprimento.',
					'Meça a altura em ângulo reto entre a base e o lado oposto.',
					'Digite a base e a altura na mesma unidade e clique em Calcular.',
				],
				example: 'Um paralelogramo com base de 9 cm e altura de 4 cm: A = 9 · 4 = 36 cm².',
			},
			updatedAt: UPDATED_AT,
		},
		'area-da-elipse': {
			title: 'Calcular área da elipse pelos semieixos',
			metaDescription:
				'Calcule a área da elipse (forma oval) com A = π·a·b a partir do semieixo maior e do menor. Explica como medir os semieixos e traz exemplo resolvido.',
			answer:
				'A calculadora encontra a área de uma elipse, a forma oval, a partir dos dois semieixos: A = π·a·b. O semieixo maior (a) é a metade da maior largura da elipse; o semieixo menor (b) é a metade da menor largura, medida na direção perpendicular. Se você mediu as larguras totais, divida cada uma por dois antes de digitar. Quando os dois semieixos são iguais, a elipse é um círculo e a fórmula vira π·r². A ordem dos campos não muda o resultado. Serve para mesas ovais, espelhos, canteiros, tapetes e seções de tubos achatados.',
			faq: [
				{
					question: 'Qual a área de uma elipse com semieixos 5 e 3?',
					answer: 'A = π · 5 · 3 = 15π ≈ 47,12 unidades de área.',
				},
				{
					question: 'O que são os semieixos?',
					answer:
						'São as metades dos eixos maior e menor, medidas do centro da elipse até a borda. Uma mesa oval de 1,2 m por 0,8 m tem semieixos de 0,6 m e 0,4 m.',
				},
				{
					question: 'Posso digitar o comprimento e a largura totais?',
					answer:
						'Não diretamente. Com as medidas totais, o resultado fica quatro vezes maior. Divida cada uma por dois, ou use A = π · comprimento · largura / 4.',
				},
				{
					question: 'O perímetro da elipse tem fórmula simples como a área?',
					answer:
						'Não. A área é exata com π·a·b, mas o perímetro só tem aproximações, como a de Ramanujan.',
				},
			],
			howTo: {
				title: 'Como calcular a área da elipse',
				steps: [
					'Meça a maior largura da elipse e divida por dois: esse é o semieixo maior (a).',
					'Meça a menor largura, perpendicular à primeira, e divida por dois: esse é o semieixo menor (b).',
					'Digite os dois valores na mesma unidade.',
					'Clique em Calcular; a calculadora multiplica π pelos dois semieixos.',
				],
				example:
					'Um espelho oval de 12 dm por 8 dm tem semieixos de 6 dm e 4 dm: A = π · 6 · 4 ≈ 75,398224 dm².',
			},
			updatedAt: UPDATED_AT,
		},
		'area-da-coroa-circular': {
			title: 'Calcular área da coroa circular (anel)',
			metaDescription:
				'Calcule a área da coroa circular, o anel entre dois círculos, com A = π·(R² − r²). Informe o raio maior e o menor; serve para arruelas e tubos.',
			answer:
				'A calculadora encontra a área de uma coroa circular, a faixa em forma de anel entre dois círculos com o mesmo centro. A fórmula é A = π·(R² − r²): a área do círculo externo menos a área do círculo interno. Informe o raio maior (R) e o raio menor (r) na mesma unidade; o raio menor precisa ser menor que o maior, senão a calculadora mostra um aviso. Se você tem diâmetros, divida cada um por dois. É a conta usada para a seção de um tubo ou cano, arruelas, anéis, bordas de piscinas redondas e calçadas em volta de canteiros circulares.',
			faq: [
				{
					question: 'Qual a área de uma coroa com raios 5 e 3?',
					answer: 'A = π · (25 − 9) = 16π ≈ 50,27 unidades de área.',
				},
				{
					question: 'Onde aparece a coroa circular?',
					answer:
						'Em arruelas, anéis, pistas de corrida circulares, bordas em volta de canteiros e na seção de tubos, onde ela representa a área de material da parede.',
				},
				{
					question: 'Como calcular a área da seção de um tubo?',
					answer:
						'Use o raio externo como R e o raio interno como r. Um tubo de 10 cm de diâmetro externo com parede de 0,5 cm tem R = 5 e r = 4,5, e a seção é π · (25 − 20,25) ≈ 14,92 cm².',
				},
				{
					question: 'Posso subtrair os raios antes de elevar ao quadrado?',
					answer:
						'Não. (R − r)² é diferente de R² − r². Com raios 5 e 3, o certo é 25 − 9 = 16, e não (5 − 3)² = 4.',
				},
			],
			howTo: {
				title: 'Como calcular a área da coroa circular',
				steps: [
					'Meça o raio do círculo externo (R) e o do círculo interno (r), a partir do mesmo centro.',
					'Se tiver diâmetros, divida cada um por dois.',
					'Digite os dois raios na mesma unidade, com o menor no campo r.',
					'Clique em Calcular para ver a área do anel.',
				],
				example:
					'Uma calçada em volta de um canteiro, com raio externo de 10 m e interno de 6 m: A = π · (10² − 6²) = 64π ≈ 201,06193 m².',
			},
			updatedAt: UPDATED_AT,
		},
		'area-do-setor-circular': {
			title: 'Calcular área do setor circular (raio e ângulo)',
			metaDescription:
				'Calcule a área do setor circular, a fatia do círculo, a partir do raio e do ângulo em graus: A = π·r²·θ/360. Inclui conversão de radianos e exemplo.',
			answer:
				'A calculadora encontra a área de um setor circular, a fatia de círculo limitada por dois raios e um arco, a partir do raio e do ângulo central em graus. A fórmula é A = π·r²·θ/360: a área do círculo inteiro multiplicada pela fração que o ângulo representa de uma volta. O ângulo deve ser maior que 0° e no máximo 360°; com 360° o resultado é a área do círculo completo, e com 90° é um quarto dela. Se o ângulo estiver em radianos, converta para graus antes. Serve para fatias de pizza ou bolo, leques, áreas de alcance de irrigadores e gráficos de pizza.',
			faq: [
				{
					question: 'Qual a área de um setor de raio 4 e 90°?',
					answer: 'A = π · 16 · 90 / 360 = 4π ≈ 12,57 unidades de área, um quarto do círculo.',
				},
				{
					question: 'E se o ângulo estiver em radianos?',
					answer:
						'A calculadora pede graus. Converta multiplicando os radianos por 180/π (π/2 rad = 90°) ou calcule direto com A = r²·θ/2, com θ em radianos.',
				},
				{
					question: 'Qual a área de uma fatia de pizza?',
					answer:
						'Uma pizza de 35 cm de diâmetro cortada em 8 fatias tem setores de 45° e raio de 17,5 cm: cada fatia tem π · 17,5² · 45 / 360 ≈ 120,26 cm².',
				},
				{
					question: 'Setor circular e segmento circular são a mesma coisa?',
					answer:
						'Não. O setor é a fatia que vai até o centro; o segmento é só a parte entre a corda e o arco. A área do segmento é a do setor menos a do triângulo formado pelos dois raios e a corda.',
				},
			],
			howTo: {
				title: 'Como calcular a área do setor circular',
				steps: [
					'Meça o raio do círculo, do centro até o arco.',
					'Descubra o ângulo central do setor em graus (uma volta inteira tem 360°).',
					'Digite o raio e o ângulo; o ângulo aceita valores até 360.',
					'Clique em Calcular para ver a área da fatia.',
				],
				example:
					'Um setor com raio de 6 cm e ângulo de 60°: A = π · 6² · 60 / 360 = 6π ≈ 18,849556 cm².',
			},
			updatedAt: UPDATED_AT,
		},
	},
}
