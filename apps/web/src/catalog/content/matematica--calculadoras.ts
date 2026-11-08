import type { SectionContent } from './types.ts'

const UPDATED_AT = '2026-11-08'

export const content: SectionContent = {
	intro: [
		'Esta seção reúne calculadoras para contas do dia a dia, da escola e do trabalho: porcentagem, regra de três, juros compostos, IMC, equação do 2º grau, MDC e MMC, fatoração, números primos, divisão com resto, estatística básica, análise combinatória e conversores de unidades, de temperatura e de números romanos. Todas fazem a conta no próprio navegador e mostram a fórmula ou os passos usados, para que você possa conferir o resultado ou repetir a conta à mão.',
		'Para escolher a ferramenta, comece pela pergunta. Quanto é X% de um valor, quanto custa com desconto, qual foi o aumento ou qual é a margem de lucro: use a calculadora de porcentagem. Se você conhece três valores de uma proporção e quer o quarto, use a regra de três. Para dinheiro aplicado ao longo do tempo, com ou sem depósitos mensais, use juros compostos. MDC, MMC, fatoração e números primos ajudam com frações e problemas de divisibilidade, enquanto arranjo e combinação contam possibilidades, como apostas de loteria e senhas.',
		'Os conversores servem para trocar de unidade sem decorar fatores: comprimento, massa, volume, velocidade, energia, pressão e outras grandezas, além de Celsius, Fahrenheit e Kelvin. A calculadora de IMC dá uma referência de peso para adultos, e a simulação de juros não desconta impostos nem inflação. Por isso, esses resultados servem como estimativa e não substituem a orientação de um profissional de saúde ou de finanças.',
	],
	tools: {
		porcentagem: {
			title: 'Calculadora de porcentagem',
			metaDescription:
				'Calculadora de porcentagem: X% de um valor, aumento, desconto, variação, margem, markup e pontos percentuais, com a conta mostrada passo a passo.',
			answer:
				'A calculadora de porcentagem reúne dez contas que respondem enquanto você digita: X% de um valor (X ÷ 100 × valor), que porcentagem uma parte é do total (parte ÷ total × 100), o total a partir de uma parte (parte ÷ X × 100), variação percentual ((final − inicial) ÷ inicial × 100), acréscimo (valor × (1 + X/100)), desconto (valor × (1 − X/100)), o valor antes de um aumento ou desconto (final ÷ (1 + X/100)), variações sucessivas, margem e markup, e diferença em pontos percentuais. Cada resultado vem com a conta escrita com os seus números. Nas variações sucessivas, os fatores de cada variação são multiplicados, e não os percentuais somados. A margem divide o lucro pelo preço de venda; o markup divide o lucro pelo custo.',
			faq: [
				{
					question: 'Quanto é 15% de 200?',
					answer:
						'15% de 200 é 30. Para chegar a esse valor, transforme o percentual em decimal (15 ÷ 100 = 0,15) e multiplique pelo valor: 0,15 × 200 = 30. A mesma conta vale para qualquer porcentagem de qualquer número.',
				},
				{
					question: 'Como calcular quantos por cento um valor representa de outro?',
					answer:
						'Para saber quantos por cento uma parte representa de um total, divida a parte pelo total e multiplique por 100. Por exemplo, 30 de um total de 200 representam 30 ÷ 200 × 100 = 15%.',
				},
				{
					question: 'Como calcular um desconto em porcentagem?',
					answer:
						'Para aplicar um desconto percentual, multiplique o valor por (1 − desconto ÷ 100). Um produto de R$ 200 com 10% de desconto sai por 200 × 0,90 = R$ 180, uma economia de R$ 20.',
				},
				{
					question: 'Por que +10% e depois −10% não volta ao valor inicial?',
					answer:
						'Um aumento de 10% seguido de uma queda de 10% não volta ao valor inicial porque o segundo percentual incide sobre o valor já alterado: 1,10 × 0,90 = 0,99, uma queda total de 1%. Por isso a calculadora de variações sucessivas multiplica os fatores em vez de somar os percentuais.',
				},
				{
					question: 'Qual a diferença entre margem e markup?',
					answer:
						'Margem e markup medem o mesmo lucro sobre bases diferentes: a margem é o lucro dividido pelo preço de venda, e o markup é o lucro dividido pelo custo. Com custo de R$ 80 e venda a R$ 100, o lucro é R$ 20, a margem é 20% e o markup é 25%.',
				},
				{
					question: 'Qual a diferença entre porcentagem e pontos percentuais?',
					answer:
						'Pontos percentuais são a diferença simples entre duas taxas; a variação percentual compara essa diferença com a taxa inicial. Se uma taxa passa de 10% para 12%, ela subiu 2 pontos percentuais, o que corresponde a um aumento de 20% na taxa, porque 2 é 20% de 10.',
				},
			],
			howTo: {
				title: 'Como calcular porcentagem',
				steps: [
					'Transforme a porcentagem em número decimal dividindo por 100: 15% vira 0,15.',
					'Para saber X% de um valor, multiplique esse decimal pelo valor.',
					'Para saber que porcentagem uma parte representa do total, divida a parte pelo total e multiplique por 100.',
					'Para aplicar um aumento ou um desconto, multiplique o valor por (1 + X/100) ou por (1 − X/100).',
					'Para a variação entre dois valores, subtraia o inicial do final, divida pelo inicial e multiplique por 100.',
				],
				example:
					'15% de 200: 15 ÷ 100 × 200 = 30. Variação de 50 para 75: (75 − 50) ÷ 50 × 100 = +50%. R$ 200 com 10% de desconto: 200 × 0,90 = R$ 180. Valor que, depois de um aumento de 10%, ficou em 220: 220 ÷ 1,10 = 200.',
			},
			updatedAt: UPDATED_AT,
		},
		'calculadora-de-imc': {
			title: 'Calculadora de IMC (Índice de Massa Corporal)',
			metaDescription:
				'Calculadora de IMC: informe peso e altura e veja seu Índice de Massa Corporal, a faixa de classificação da OMS para adultos e uma estimativa de peso ideal.',
			answer:
				'A calculadora de IMC divide o peso, em quilos, pela altura, em metros, elevada ao quadrado: IMC = peso ÷ altura². O resultado aparece com duas casas decimais e uma classificação: menos de 17, muito abaixo do peso; de 17 a menos de 18,5, abaixo do peso; de 18,5 a menos de 25, peso normal; de 25 a menos de 30, acima do peso; de 30 a menos de 35, obesidade grau I; de 35 a menos de 40, obesidade grau II; 40 ou mais, obesidade grau III. Os limites de 18,5, 25, 30, 35 e 40 seguem a classificação da OMS para adultos. A calculadora também estima um peso ideal pela altura e pelo sexo: 72,7 × altura − 58 para homens e 62,1 × altura − 44,7 para mulheres.',
			faq: [
				{
					question: 'Qual é o IMC normal?',
					answer:
						'Para adultos, a OMS considera normal o IMC de 18,5 a 24,9. Abaixo de 18,5 indica baixo peso; de 25 a 29,9, sobrepeso; e a partir de 30, obesidade, dividida em grau I (30 a 34,9), grau II (35 a 39,9) e grau III (40 ou mais).',
				},
				{
					question: 'Como calcular o IMC?',
					answer:
						'O IMC é o peso em quilos dividido pela altura em metros ao quadrado. Uma pessoa com 70 kg e 1,75 m tem IMC de 70 ÷ (1,75 × 1,75) = 70 ÷ 3,0625 ≈ 22,86, dentro da faixa de peso normal.',
				},
				{
					question: 'O IMC serve para todo mundo?',
					answer:
						'O IMC não serve igualmente para todos: ele não diferencia músculo de gordura, então pode superestimar o peso de atletas, e as faixas para adultos não valem para crianças, adolescentes e gestantes, que são avaliados com outros critérios. É uma referência de triagem, não um diagnóstico; a avaliação individual deve ser feita por um profissional de saúde.',
				},
				{
					question: 'O IMC é diferente para homens e mulheres?',
					answer:
						'Não. Para adultos, o IMC é calculado só com peso e altura, e as faixas de classificação são as mesmas para homens e mulheres. Nesta calculadora, o sexo informado altera apenas a estimativa de peso ideal.',
				},
				{
					question: 'Como é calculado o peso ideal?',
					answer:
						'O peso ideal mostrado pela calculadora de IMC é uma estimativa feita só com a altura e o sexo: 72,7 × altura − 58 para homens e 62,1 × altura − 44,7 para mulheres. Para 1,75 m, isso dá cerca de 69,2 kg para homens e 64 kg para mulheres. A fórmula não considera idade nem composição corporal.',
				},
			],
			howTo: {
				title: 'Como calcular o IMC',
				steps: [
					'Anote o peso em quilos e a altura em metros (1,75 m, e não 175 cm).',
					'Multiplique a altura por ela mesma para obter a altura ao quadrado.',
					'Divida o peso pela altura ao quadrado.',
					'Compare o resultado com as faixas da OMS para adultos: de 18,5 a 24,9 é peso normal, de 25 a 29,9 é sobrepeso e a partir de 30 é obesidade.',
				],
				example:
					'Peso de 70 kg e altura de 1,75 m: 1,75 × 1,75 = 3,0625; 70 ÷ 3,0625 = 22,86. O IMC de 22,86 fica na faixa de peso normal.',
				source: {
					label: 'Organização Mundial da Saúde (OMS): Obesity and overweight',
					url: 'https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight',
				},
			},
			updatedAt: UPDATED_AT,
		},
		'equacao-do-segundo-grau': {
			title: 'Equação do 2º grau: calculadora de Bhaskara',
			metaDescription:
				'Resolva equações do 2º grau ax² + bx + c = 0 pela fórmula de Bhaskara: informe a, b e c e veja o delta (Δ) e as raízes reais x₁ e x₂ na hora.',
			answer:
				'A calculadora resolve equações do 2º grau na forma ax² + bx + c = 0 pela fórmula de Bhaskara. Você informa os coeficientes a, b e c; o coeficiente a não pode ser zero, porque sem o termo x² a equação deixa de ser do 2º grau. Primeiro ela calcula o discriminante Δ = b² − 4ac e, a partir dele, as raízes x = (−b ± √Δ) ÷ 2a. Se Δ for positivo, mostra duas raízes reais diferentes, x₁ e x₂. Se Δ for zero, mostra uma raiz dupla (x₁ = x₂). Se Δ for negativo, informa que não existem raízes reais, já que não há raiz quadrada real de número negativo. Coeficientes negativos, decimais e iguais a zero (em b e c) são aceitos.',
			faq: [
				{
					question: 'Quais as raízes de x² − 3x + 2 = 0?',
					answer:
						'As raízes de x² − 3x + 2 = 0 são 2 e 1. Com a = 1, b = −3 e c = 2, o delta é Δ = (−3)² − 4 × 1 × 2 = 9 − 8 = 1, e x = (3 ± 1) ÷ 2, ou seja, x₁ = 2 e x₂ = 1.',
				},
				{
					question: 'O que significa delta igual a zero?',
					answer:
						'Quando o delta (Δ) de uma equação do 2º grau é igual a zero, ela tem duas raízes reais iguais, x = −b ÷ 2a, e a parábola toca o eixo x em um único ponto. Em x² − 4x + 4 = 0, por exemplo, Δ = 16 − 16 = 0 e a raiz dupla é x = 2.',
				},
				{
					question: 'O que acontece quando o delta é negativo?',
					answer:
						'Quando o delta é negativo, a equação do 2º grau não tem raízes reais, e a parábola não cruza o eixo x. As duas soluções existem apenas no conjunto dos números complexos, que esta calculadora não exibe. Em x² + 2x + 5 = 0, por exemplo, Δ = 4 − 20 = −16.',
				},
				{
					question: 'Como resolver uma equação do 2º grau incompleta?',
					answer:
						'Uma equação do 2º grau incompleta tem b = 0 ou c = 0, e a fórmula de Bhaskara continua valendo: basta usar zero no coeficiente que falta. Em x² − 9 = 0, Δ = 0 − 4 × 1 × (−9) = 36 e as raízes são 3 e −3. Também dá para isolar x diretamente: x² = 9, então x = ±3.',
				},
			],
			howTo: {
				title: 'Como resolver equação do 2º grau com Bhaskara',
				steps: [
					'Escreva a equação na forma ax² + bx + c = 0 e identifique a, b e c, com os sinais.',
					'Calcule o delta: Δ = b² − 4 × a × c.',
					'Se Δ for negativo, a equação não tem raízes reais e a conta termina aqui.',
					'Calcule x₁ = (−b + √Δ) ÷ 2a e x₂ = (−b − √Δ) ÷ 2a.',
					'Confira substituindo cada raiz na equação original: o resultado deve ser zero.',
				],
				example:
					'x² − 5x + 6 = 0: a = 1, b = −5 e c = 6. Δ = (−5)² − 4 × 1 × 6 = 25 − 24 = 1. x₁ = (5 + 1) ÷ 2 = 3 e x₂ = (5 − 1) ÷ 2 = 2.',
			},
			updatedAt: UPDATED_AT,
		},
		'fatorar-numero': {
			title: 'Calculadora de fatoração em números primos',
			metaDescription:
				'Fatore qualquer número inteiro em fatores primos e veja o resultado com potências, como 360 = 2³ × 3² × 5, e a lista completa de fatores repetidos.',
			answer:
				'A calculadora decompõe um número inteiro positivo em fatores primos. Ela divide o número por 2 enquanto a divisão for exata, depois tenta 3, 4, 5 e assim por diante, só até a raiz quadrada do que sobrou; se ao final restar um valor maior que 1, ele também é primo e entra na lista. O resultado aparece de duas formas: com potências (360 = 2³ × 3² × 5) e com todos os fatores repetidos (2 × 2 × 2 × 3 × 3 × 5). Quando o único fator é o próprio número, a calculadora indica que ele é primo. São aceitos números de 1 até 9.007.199.254.740.991 (2⁵³ − 1).',
			faq: [
				{
					question: 'Como fatorar 360?',
					answer:
						'A fatoração de 360 é 2³ × 3² × 5. Dividindo 360 por 2 três vezes chega-se a 45; dividindo 45 por 3 duas vezes chega-se a 5, que é primo. Assim, 360 = 2 × 2 × 2 × 3 × 3 × 5.',
				},
				{
					question: 'Para que serve a fatoração em números primos?',
					answer:
						'A fatoração em números primos serve para calcular o MDC e o MMC, simplificar frações e raízes, encontrar todos os divisores de um número e verificar se ele é primo.',
				},
				{
					question: 'Todo número tem uma única fatoração em primos?',
					answer:
						'Sim. Pelo teorema fundamental da aritmética, todo número inteiro maior que 1 pode ser escrito como produto de números primos de uma única maneira, sem contar a ordem dos fatores. 60 é sempre 2² × 3 × 5, seja qual for o caminho da conta.',
				},
				{
					question: 'Qual a diferença entre número primo e número composto?',
					answer:
						'Um número primo é maior que 1 e só é divisível por 1 e por ele mesmo, como 7 e 13. Um número composto tem outros divisores e pode ser fatorado em primos menores, como 12 = 2² × 3. O número 1 não é primo nem composto.',
				},
			],
			howTo: {
				title: 'Como fatorar um número em primos',
				steps: [
					'Divida o número pelo menor primo que o divide exatamente, começando pelo 2.',
					'Repita a divisão com o quociente enquanto ela for exata; depois passe para o próximo primo (3, 5, 7, 11…).',
					'Pare quando o quociente for 1, ou quando o quadrado do próximo primo passar do quociente: nesse caso, o quociente é primo.',
					'Escreva o número como o produto dos divisores usados e agrupe os repetidos em potências.',
				],
				example:
					'360 ÷ 2 = 180; 180 ÷ 2 = 90; 90 ÷ 2 = 45; 45 ÷ 3 = 15; 15 ÷ 3 = 5; 5 é primo. Logo, 360 = 2 × 2 × 2 × 3 × 3 × 5 = 2³ × 3² × 5.',
			},
			updatedAt: UPDATED_AT,
		},
		'maximo-divisor-comum': {
			title: 'Calculadora de MDC (Máximo Divisor Comum)',
			metaDescription:
				'Calcule o MDC (Máximo Divisor Comum) de dois ou mais números pelo algoritmo de Euclides. Útil para simplificar frações e dividir em partes iguais.',
			answer:
				'A calculadora encontra o Máximo Divisor Comum (MDC) de dois ou mais números inteiros positivos, separados por vírgula, espaço ou ponto e vírgula. O MDC é o maior número que divide todos eles sem deixar resto. A conta usa o algoritmo de Euclides: para dois números, troca-se o par (a, b) por (b, resto de a ÷ b) até o resto ser zero, e o último divisor é o MDC. Para mais de dois números, o mesmo passo é aplicado em sequência: MDC(a, b, c) = MDC(MDC(a, b), c). Quando o resultado é 1, os números são primos entre si. Cada número pode ir até 1 bilhão.',
			faq: [
				{
					question: 'Qual o MDC de 12, 18 e 24?',
					answer:
						'O MDC de 12, 18 e 24 é 6: 6 divide os três números sem deixar resto, e nenhum número maior faz isso. Pelo algoritmo de Euclides, MDC(12, 18) = 6 e, em seguida, MDC(6, 24) = 6.',
				},
				{
					question: 'Como funciona o algoritmo de Euclides?',
					answer:
						'No algoritmo de Euclides para o MDC, divide-se o maior número pelo menor e repete-se a divisão usando o divisor e o resto, até o resto ser zero; o último divisor usado é o MDC. Para 48 e 36: 48 ÷ 36 deixa resto 12, e 36 ÷ 12 deixa resto 0, então o MDC é 12.',
				},
				{
					question: 'Como calcular o MDC por fatoração?',
					answer:
						'Para calcular o MDC por fatoração, decomponha cada número em fatores primos e multiplique apenas os fatores comuns a todos, cada um com o menor expoente. Como 12 = 2² × 3 e 18 = 2 × 3², o MDC de 12 e 18 é 2 × 3 = 6.',
				},
				{
					question: 'Para que serve o MDC?',
					answer:
						'O MDC serve para simplificar frações até a forma irredutível (18/24 dividido por MDC 6 vira 3/4) e para dividir quantidades em partes iguais do maior tamanho possível, como cortar barras de 12 m e 18 m em pedaços iguais de 6 m sem sobra.',
				},
			],
			howTo: {
				title: 'Como calcular o MDC pelo algoritmo de Euclides',
				steps: [
					'Divida o maior número pelo menor e anote o resto.',
					'Troque os números: o divisor passa a ser o dividendo, e o resto passa a ser o divisor.',
					'Repita até a divisão dar resto zero. O último divisor usado é o MDC.',
					'Com mais de dois números, calcule o MDC do resultado com o próximo número, e assim por diante.',
				],
				example:
					'MDC(48, 36): 48 ÷ 36 = 1, resto 12; 36 ÷ 12 = 3, resto 0. O MDC de 48 e 36 é 12. Para incluir o 30: 30 ÷ 12 = 2, resto 6; 12 ÷ 6 = 2, resto 0, então MDC(48, 36, 30) = 6.',
			},
			updatedAt: UPDATED_AT,
		},
		'minimo-multiplo-comum': {
			title: 'Calculadora de MMC (Mínimo Múltiplo Comum)',
			metaDescription:
				'Calcule o MMC (Mínimo Múltiplo Comum) de dois ou mais números pela relação com o MDC. Útil para somar frações e achar quando eventos se repetem juntos.',
			answer:
				'A calculadora encontra o Mínimo Múltiplo Comum (MMC) de dois ou mais números inteiros positivos, separados por vírgula, espaço ou ponto e vírgula. O MMC é o menor número positivo que é múltiplo de todos eles. A conta usa a relação entre MMC e MDC: MMC(a, b) = a × b ÷ MDC(a, b), com o MDC calculado pelo algoritmo de Euclides. Para mais de dois números, o resultado é acumulado em sequência: MMC(a, b, c) = MMC(MMC(a, b), c). Cada número pode ir até 1.000.000.',
			faq: [
				{
					question: 'Qual o MMC de 4, 6 e 10?',
					answer:
						'O MMC de 4, 6 e 10 é 60, o menor número divisível pelos três. Primeiro, MMC(4, 6) = 4 × 6 ÷ 2 = 12; depois, MMC(12, 10) = 12 × 10 ÷ 2 = 60.',
				},
				{
					question: 'Para que serve o MMC?',
					answer:
						'O MMC serve para somar e subtrair frações com denominadores diferentes, usando-o como denominador comum, e para descobrir quando eventos periódicos coincidem: ônibus que passam a cada 12 e a cada 18 minutos voltam a sair juntos a cada 36 minutos.',
				},
				{
					question: 'Como calcular o MMC por fatoração?',
					answer:
						'Para calcular o MMC por fatoração, decomponha cada número em primos e multiplique todos os fatores que aparecem, comuns e não comuns, cada um com o maior expoente. Como 12 = 2² × 3 e 18 = 2 × 3², o MMC de 12 e 18 é 2² × 3² = 36.',
				},
				{
					question: 'Qual a relação entre MDC e MMC?',
					answer:
						'Para dois números inteiros positivos, o produto do MDC pelo MMC é igual ao produto dos números: MDC(a, b) × MMC(a, b) = a × b. Com 12 e 18, 6 × 36 = 216 = 12 × 18. Essa igualdade não vale diretamente para três ou mais números.',
				},
			],
			howTo: {
				title: 'Como calcular o MMC',
				steps: [
					'Calcule o MDC dos dois primeiros números.',
					'Multiplique os dois números e divida o produto pelo MDC.',
					'Com mais números, repita a conta usando o resultado e o próximo número da lista.',
					'Para conferir, verifique se o resultado é divisível por todos os números.',
				],
				example:
					'MMC(12, 18): o MDC é 6, então 12 × 18 ÷ 6 = 216 ÷ 6 = 36. Para MMC(4, 6, 10): MMC(4, 6) = 24 ÷ 2 = 12 e MMC(12, 10) = 120 ÷ 2 = 60.',
			},
			updatedAt: UPDATED_AT,
		},
		'numeros-primos': {
			title: 'Calculadora de números primos',
			metaDescription:
				'Descubra se um número é primo ou verifique uma lista inteira de uma vez: a calculadora marca os números primos e conta quantos há, até 1 trilhão.',
			answer:
				'A calculadora recebe uma lista de números inteiros, separados por vírgula, espaço ou ponto e vírgula, marca quais são primos e informa quantos são. Um número primo é maior que 1 e tem exatamente dois divisores: 1 e ele mesmo. Para cada número, a verificação descarta 0, 1 e os pares diferentes de 2, e depois testa os divisores ímpares de 3 até a raiz quadrada do número; se nenhum divide exatamente, ele é primo. Basta ir até a raiz porque, se n = a × b, um dos dois fatores é no máximo √n. São aceitos números de 0 até 1 trilhão (1.000.000.000.000).',
			faq: [
				{
					question: 'O número 1 é primo?',
					answer:
						'Não, o número 1 não é primo. Por definição, um número primo tem exatamente dois divisores positivos distintos, e o 1 tem apenas um. Ele também não é composto.',
				},
				{
					question: 'O 2 é primo?',
					answer:
						'Sim, o 2 é primo, e é o único número primo par: todos os outros números pares são divisíveis por 2 e, por isso, têm mais de dois divisores.',
				},
				{
					question: 'Como saber se um número é primo?',
					answer:
						'Para saber se um número é primo, tente dividi-lo pelos números de 2 até a raiz quadrada dele. Se nenhuma divisão for exata, ele é primo. Para 97, cuja raiz é cerca de 9,85, basta testar 2, 3, 5 e 7: nenhum divide 97, então 97 é primo.',
				},
				{
					question: 'Quais são os números primos até 100?',
					answer:
						'Os números primos até 100 são 25: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89 e 97.',
				},
			],
			howTo: {
				title: 'Como saber se um número é primo',
				steps: [
					'Se o número for menor que 2, ele não é primo.',
					'Se for par, só é primo se for o próprio 2.',
					'Calcule a raiz quadrada do número.',
					'Teste a divisão pelos ímpares de 3 até essa raiz. Se alguma for exata, o número não é primo.',
					'Se nenhuma divisão for exata, o número é primo.',
				],
				example:
					'97: a raiz quadrada é cerca de 9,85; 97 não é divisível por 3, 5, 7 nem 9, então é primo. 91: a raiz é cerca de 9,54 e 91 ÷ 7 = 13, então 91 não é primo.',
			},
			updatedAt: UPDATED_AT,
		},
		'numeros-amigaveis': {
			title: 'Calculadora de números amigáveis',
			metaDescription:
				'Verifique se dois números são amigáveis: a calculadora soma os divisores próprios de cada um e mostra se um é igual à soma do outro, como 220 e 284.',
			answer:
				'A calculadora verifica se dois números inteiros positivos formam um par de números amigáveis. Dois números diferentes são amigáveis quando a soma dos divisores próprios de um (todos os seus divisores positivos, exceto ele mesmo) é igual ao outro, e vice-versa. Para somar os divisores, a calculadora testa os candidatos de 2 até a raiz quadrada do número e, a cada divisor d encontrado, soma também o par n ÷ d, além do 1. O resultado mostra as duas somas e se o par é amigável. Se os dois números forem iguais, a resposta é não, mesmo para um número perfeito como 6, porque o par exige dois números distintos. São aceitos valores de 1 até 1 trilhão.',
			faq: [
				{
					question: 'Por que 220 e 284 são amigáveis?',
					answer:
						'220 e 284 são amigáveis porque os divisores próprios de 220 (1, 2, 4, 5, 10, 11, 20, 22, 44, 55 e 110) somam 284, e os divisores próprios de 284 (1, 2, 4, 71 e 142) somam 220.',
				},
				{
					question: 'O que são divisores próprios?',
					answer:
						'Os divisores próprios de um número são todos os seus divisores positivos, exceto ele mesmo. Os divisores próprios de 6 são 1, 2 e 3, e os de 10 são 1, 2 e 5.',
				},
				{
					question: 'Quais são os pares de números amigáveis conhecidos?',
					answer:
						'Os menores pares de números amigáveis são 220 e 284, 1.184 e 1.210, 2.620 e 2.924, 5.020 e 5.564, e 6.232 e 6.368. Há milhões de pares conhecidos, mas não se sabe se existem infinitos.',
				},
				{
					question: 'Qual a diferença entre número perfeito e números amigáveis?',
					answer:
						'Um número perfeito é igual à soma dos próprios divisores próprios, como 6 = 1 + 2 + 3 e 28 = 1 + 2 + 4 + 7 + 14. Números amigáveis formam um par de números diferentes em que a soma dos divisores próprios de cada um dá o outro.',
				},
			],
			howTo: {
				title: 'Como verificar se dois números são amigáveis',
				steps: [
					'Liste os divisores próprios do primeiro número: todos os divisores, menos ele mesmo.',
					'Some esses divisores.',
					'Faça o mesmo com o segundo número.',
					'Os números são amigáveis se cada soma for igual ao outro número e os dois forem diferentes.',
				],
				example:
					'220: 1 + 2 + 4 + 5 + 10 + 11 + 20 + 22 + 44 + 55 + 110 = 284. 284: 1 + 2 + 4 + 71 + 142 = 220. Como cada soma dá o outro número, 220 e 284 são amigáveis.',
			},
			updatedAt: UPDATED_AT,
		},
		fibonacci: {
			title: 'Sequência de Fibonacci: gerador de termos',
			metaDescription:
				'Gere a sequência de Fibonacci com até 5.000 termos exatos, sem arredondamento: 0, 1, 1, 2, 3, 5, 8, 13… e veja o último termo em destaque para copiar.',
			answer:
				'A calculadora gera os primeiros termos da sequência de Fibonacci, de 1 até 5.000 termos. A sequência começa com 0 e 1, e cada termo seguinte é a soma dos dois anteriores: F(n) = F(n − 1) + F(n − 2). Assim: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34… O resultado mostra o último termo pedido em destaque e a sequência completa, pronta para copiar. Os termos são calculados com inteiros de precisão arbitrária (BigInt), então mesmo números com centenas de dígitos saem exatos, sem arredondamento nem notação científica. A contagem começa no 0: o 1º termo é 0, o 2º é 1 e o 10º é 34.',
			faq: [
				{
					question: 'Qual o 10º termo da sequência de Fibonacci?',
					answer:
						'Começando a contagem pelo 0, o 10º termo da sequência de Fibonacci é 34: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34. Em textos que começam a sequência pelo 1, o 10º termo é 55.',
				},
				{
					question: 'Os números grandes de Fibonacci perdem precisão?',
					answer:
						'Não. Nesta calculadora, os termos de Fibonacci são calculados com BigInt, um tipo de inteiro sem limite de tamanho, então mesmo números com centenas de dígitos saem exatos. O 100º termo, por exemplo, é 218922995834555169026.',
				},
				{
					question: 'Qual a relação entre Fibonacci e a proporção áurea?',
					answer:
						'A razão entre dois termos consecutivos da sequência de Fibonacci se aproxima da proporção áurea, φ ≈ 1,618, à medida que os termos crescem: 34 ÷ 21 ≈ 1,619 e 89 ÷ 55 ≈ 1,618.',
				},
			],
			howTo: {
				title: 'Como calcular a sequência de Fibonacci',
				steps: [
					'Escreva os dois primeiros termos: 0 e 1.',
					'Some os dois últimos termos para obter o próximo.',
					'Repita até chegar à quantidade de termos desejada.',
				],
				example:
					'0 e 1; 0 + 1 = 1; 1 + 1 = 2; 1 + 2 = 3; 2 + 3 = 5; 3 + 5 = 8; 5 + 8 = 13; 8 + 13 = 21; 13 + 21 = 34. Os dez primeiros termos são 0, 1, 1, 2, 3, 5, 8, 13, 21 e 34.',
			},
			updatedAt: UPDATED_AT,
		},
		'conversor-de-temperatura': {
			title: 'Conversor de temperatura (°C, °F e K)',
			metaDescription:
				'Converta temperaturas entre graus Celsius, Fahrenheit e Kelvin com as fórmulas oficiais e escolha quantas casas decimais quer ver no resultado.',
			answer:
				'O conversor transforma uma temperatura em graus Celsius, Fahrenheit ou Kelvin nas outras duas escalas. A conta passa sempre por Celsius: de Fahrenheit para Celsius, °C = (°F − 32) ÷ 1,8; de Kelvin para Celsius, °C = K − 273,15; e de Celsius para as outras, °F = °C × 1,8 + 32 e K = °C + 273,15. O fator 1,8 é o mesmo que 9/5. Você escolhe quantas casas decimais quer no resultado, de 0 a 10, e valores negativos são aceitos. O conversor não bloqueia valores abaixo do zero absoluto (−273,15 °C), então confira se a temperatura informada faz sentido físico.',
			faq: [
				{
					question: 'Quanto é 100 °C em Fahrenheit?',
					answer:
						'100 °C equivalem a 212 °F, pela conta 100 × 1,8 + 32 = 212. É a temperatura de ebulição da água ao nível do mar.',
				},
				{
					question: 'Como converter Fahrenheit para Celsius?',
					answer:
						'Para converter Fahrenheit para Celsius, subtraia 32 e divida por 1,8. Por exemplo, 98,6 °F correspondem a (98,6 − 32) ÷ 1,8 = 37 °C.',
				},
				{
					question: 'Existe temperatura negativa em Kelvin?',
					answer:
						'Não existe temperatura negativa na escala Kelvin. O 0 K é o zero absoluto, igual a −273,15 °C e −459,67 °F, a menor temperatura possível.',
				},
				{
					question: 'Em que temperatura Celsius e Fahrenheit são iguais?',
					answer:
						'As escalas Celsius e Fahrenheit marcam o mesmo número em −40: −40 × 1,8 + 32 = −40, então −40 °C é igual a −40 °F.',
				},
			],
			howTo: {
				title: 'Como converter Celsius para Fahrenheit e Kelvin',
				steps: [
					'Para Fahrenheit, multiplique a temperatura em Celsius por 1,8 e some 32.',
					'Para Kelvin, some 273,15 à temperatura em Celsius.',
					'Para voltar de Fahrenheit a Celsius, subtraia 32 e divida por 1,8.',
					'Para voltar de Kelvin a Celsius, subtraia 273,15.',
				],
				example:
					'36,5 °C em Fahrenheit: 36,5 × 1,8 = 65,7; 65,7 + 32 = 97,7 °F. Em Kelvin: 36,5 + 273,15 = 309,65 K.',
				source: {
					label: 'BIPM: Sistema Internacional de Unidades (SI)',
					url: 'https://www.bipm.org/en/measurement-units',
				},
			},
			updatedAt: UPDATED_AT,
		},
		'conversor-de-unidades': {
			title: 'Conversor de unidades de medida',
			metaDescription:
				'Conversor de unidades de medida: comprimento, massa, área, volume, velocidade, energia, pressão e mais, com a fórmula e o valor em todas as unidades.',
			answer:
				'O conversor de unidades transforma valores em 15 grandezas: comprimento, massa, temperatura, área, volume, velocidade, tempo, armazenamento de dados, taxa de transferência, energia, potência, pressão, frequência, consumo de combustível e ângulo. Escolha a grandeza e as duas unidades e digite em qualquer um dos lados: o outro acompanha. Cada unidade tem um fator em relação a uma unidade base (metro, quilograma, litro…), e a conversão é valor × fator de origem ÷ fator de destino; temperatura e litros por 100 km usam fórmulas próprias. Abaixo aparece a regra, como "multiplique o valor por 2,54", e uma lista com o valor em todas as unidades da grandeza. Os fatores seguem as definições oficiais, como 1 polegada = 2,54 cm e 1 libra = 0,45359237 kg.',
			faq: [
				{
					question: 'Como converter quilômetros por litro para litros por 100 km?',
					answer:
						'Para converter km/L em L/100 km, divida 100 pelo valor: 12,5 km/L equivalem a 100 ÷ 12,5 = 8 L/100 km. As duas medidas são inversas, então quanto maior o km/L, menor o L/100 km.',
				},
				{
					question: 'Qual a diferença entre GB e GiB?',
					answer:
						'GB (gigabyte) usa potências de 10: 1 GB = 1.000.000.000 bytes. GiB (gibibyte) usa potências de 2: 1 GiB = 1.073.741.824 bytes. Fabricantes de disco usam GB, e muitos sistemas operacionais mostram GiB, por isso um disco de 1 TB aparece com cerca de 931 GiB.',
				},
				{
					question: 'Quantos centímetros tem uma polegada?',
					answer:
						'Uma polegada tem exatamente 2,54 cm, pela definição internacional adotada em 1959. Para converter polegadas em centímetros, multiplique por 2,54: uma tela de 10 polegadas mede 25,4 cm na diagonal.',
				},
				{
					question: 'Qual a diferença entre Mbps e MB/s?',
					answer:
						'Mbps (megabits por segundo) mede a velocidade em bits, e MB/s (megabytes por segundo) mede em bytes; um byte tem 8 bits. Por isso, uma internet de 100 Mbps transfere no máximo 100 ÷ 8 = 12,5 MB/s.',
				},
				{
					question: 'Quanto mede um alqueire?',
					answer:
						'O tamanho do alqueire depende da região. O alqueire paulista tem 24.200 m² (2,42 hectares) e o mineiro tem 48.400 m² (4,84 hectares). O conversor traz os dois.',
				},
				{
					question: 'Qual a diferença entre cv e hp?',
					answer:
						'O cavalo-vapor (cv) vale 735,49875 W, e o horsepower mecânico (hp) vale cerca de 745,7 W. Por isso 1 cv equivale a aproximadamente 0,986 hp, e as duas unidades não devem ser tratadas como iguais.',
				},
			],
			howTo: {
				title: 'Como converter unidades de medida',
				steps: [
					'Descubra o fator de conversão: quanto uma unidade de origem vale na unidade de destino (1 pé = 0,3048 m).',
					'Multiplique o valor por esse fator. Se o fator estiver no sentido contrário (1 milha = 1,609344 km), divida.',
					'Para áreas e volumes, use o fator ao quadrado ou ao cubo: 1 m = 100 cm, então 1 m² = 10.000 cm².',
					'Para temperatura e consumo em L/100 km, use as fórmulas próprias em vez de um fator fixo.',
				],
				example:
					'10 polegadas em centímetros: 10 × 2,54 = 25,4 cm. 5 pés em metros: 5 × 0,3048 = 1,524 m. 100 km/h em milhas por hora: 100 ÷ 1,609344 ≈ 62,14 mph.',
				source: {
					label: 'BIPM: Sistema Internacional de Unidades (SI)',
					url: 'https://www.bipm.org/en/measurement-units',
				},
			},
			updatedAt: UPDATED_AT,
		},
		'divisao-e-resto': {
			title: 'Calculadora de divisão com resto',
			metaDescription:
				'Calculadora de divisão com resto: veja o quociente exato, o quociente inteiro e o resto (módulo) de qualquer divisão, inclusive com números negativos.',
			answer:
				'A calculadora divide um número (dividendo) por outro (divisor) e mostra três resultados: o quociente exato, com casas decimais; o quociente inteiro, que é a parte inteira do quociente, sem arredondar; e o resto, também chamado de módulo. A relação entre eles é dividendo = divisor × quociente inteiro + resto. O quociente inteiro é truncado em direção ao zero, então o resto fica com o mesmo sinal do dividendo, como no operador % de JavaScript, C e Java. Valores negativos e decimais são aceitos; o divisor não pode ser zero.',
			faq: [
				{
					question: 'Quanto é 17 dividido por 5?',
					answer:
						'17 dividido por 5 dá quociente exato 3,4, quociente inteiro 3 e resto 2, porque 5 × 3 = 15 e 17 − 15 = 2.',
				},
				{
					question: 'O que é o resto de uma divisão?',
					answer:
						'O resto de uma divisão é o que sobra quando o dividendo não é um múltiplo exato do divisor. Ele é sempre menor que o divisor em valor absoluto, e um resto zero significa que a divisão é exata: 20 ÷ 5 tem resto 0, e 22 ÷ 5 tem resto 2.',
				},
				{
					question: 'Qual o resto de −7 dividido por 3?',
					answer:
						'Nesta calculadora, o resto de −7 dividido por 3 é −1, porque o quociente inteiro é truncado para −2 e o resto acompanha o sinal do dividendo: −7 = 3 × (−2) − 1.',
				},
				{
					question: 'Por que algumas calculadoras dão resto 2 para −7 ÷ 3?',
					answer:
						'Na divisão euclidiana, usada em muitos livros de matemática e no operador % do Python, o resto nunca é negativo: −7 = 3 × (−3) + 2, com resto 2. Já JavaScript, C e Java truncam o quociente em direção ao zero e dão resto −1. Esta calculadora segue a segunda convenção.',
				},
			],
			howTo: {
				title: 'Como fazer divisão com resto',
				steps: [
					'Divida o dividendo pelo divisor e fique só com a parte inteira do resultado: esse é o quociente inteiro.',
					'Multiplique o quociente inteiro pelo divisor.',
					'Subtraia esse produto do dividendo: o que sobra é o resto.',
					'Confira: divisor × quociente inteiro + resto deve ser igual ao dividendo.',
				],
				example:
					'17 ÷ 5 = 3,4, então o quociente inteiro é 3. 3 × 5 = 15 e 17 − 15 = 2, então o resto é 2. Conferindo: 5 × 3 + 2 = 17.',
			},
			updatedAt: UPDATED_AT,
		},
		'regra-de-tres': {
			title: 'Calculadora de regra de três simples',
			metaDescription:
				'Calculadora de regra de três simples, direta ou inversa: informe três valores da proporção e veja o valor de x com a conta montada passo a passo.',
			answer:
				'A calculadora resolve a regra de três simples: dados três valores de uma proporção, em que a está para b assim como c está para x, ela encontra x. Na proporção direta, as duas grandezas aumentam ou diminuem juntas, e x = b × c ÷ a. Na inversa, quando uma grandeza aumenta a outra diminui na mesma proporção, como velocidade e tempo de viagem, e x = a × b ÷ c. Escolha o tipo, preencha a e b com os valores conhecidos de uma situação e c com o valor da nova situação. O resultado vem com até seis casas decimais e a conta escrita com os seus números. Decimais e negativos são aceitos; a não pode ser zero na direta, nem c na inversa.',
			faq: [
				{
					question: 'Como saber se a regra de três é direta ou inversa?',
					answer:
						'Para saber se a regra de três é direta ou inversa, pergunte se, ao dobrar uma grandeza, a outra dobra (direta) ou cai pela metade (inversa). Mais quilos de um produto custam mais, então é direta; mais pedreiros terminam a obra em menos dias, então é inversa.',
				},
				{
					question: 'Qual um exemplo de regra de três direta?',
					answer:
						'Um exemplo de regra de três direta: se 2 kg de um produto custam R$ 10, 6 kg custam 10 × 6 ÷ 2 = R$ 30, porque o preço cresce na mesma proporção que o peso.',
				},
				{
					question: 'Qual um exemplo de regra de três inversa?',
					answer:
						'Um exemplo de regra de três inversa: se 4 pedreiros fazem um muro em 12 dias, 6 pedreiros fazem o mesmo muro em 4 × 12 ÷ 6 = 8 dias, já que mais trabalhadores precisam de menos tempo.',
				},
				{
					question: 'O que é regra de três composta?',
					answer:
						'A regra de três composta envolve três ou mais grandezas ao mesmo tempo, como operários, horas por dia e dias de trabalho. Esta calculadora resolve a regra de três simples, mas uma composta pode ser resolvida em etapas, variando uma grandeza de cada vez.',
				},
			],
			howTo: {
				title: 'Como fazer regra de três',
				steps: [
					'Monte duas linhas com as grandezas em colunas: na primeira, a situação conhecida (a e b); na segunda, o valor novo (c) e o x.',
					'Decida se a proporção é direta (as grandezas crescem juntas) ou inversa (uma cresce e a outra diminui).',
					'Na direta, multiplique em cruz e isole o x: x = b × c ÷ a.',
					'Na inversa, multiplique os valores da primeira linha e divida pelo valor conhecido da segunda: x = a × b ÷ c.',
				],
				example:
					'Direta: 2 kg custam R$ 10; 6 kg custam x = 10 × 6 ÷ 2 = R$ 30. Inversa: 4 pedreiros levam 12 dias; 6 pedreiros levam x = 4 × 12 ÷ 6 = 8 dias.',
			},
			updatedAt: UPDATED_AT,
		},
		'juros-compostos': {
			title: 'Calculadora de juros compostos com aportes',
			metaDescription:
				'Simule juros compostos com valor inicial, aporte mensal e taxa ao mês ou ao ano. Veja saldo final, total investido, juros e a evolução ano a ano.',
			answer:
				'A calculadora de juros compostos simula, mês a mês, quanto um valor inicial rende com aportes mensais opcionais. Você informa o valor inicial, o aporte mensal, a taxa de juros (ao mês ou ao ano) e o período (em meses ou anos). Uma taxa anual é convertida na taxa mensal equivalente, (1 + i)^(1/12) − 1, e não dividida por 12: 10% ao ano equivalem a cerca de 0,7974% ao mês. A cada mês, o saldo é multiplicado por (1 + taxa mensal) e o aporte entra no fim do mês. O resultado mostra o saldo final, o total investido, o total em juros, a taxa mensal equivalente e uma tabela com a evolução ano a ano. Os valores não descontam impostos, taxas nem inflação.',
			faq: [
				{
					question: 'Qual a fórmula dos juros compostos?',
					answer:
						'Sem aportes, a fórmula dos juros compostos é M = C × (1 + i)ⁿ, em que M é o montante, C o capital inicial, i a taxa por período (em decimal) e n o número de períodos. Com aportes mensais, a conta é feita mês a mês: saldo × (1 + i) + aporte.',
				},
				{
					question: '1% ao mês é o mesmo que 12% ao ano?',
					answer:
						'Não. Nos juros compostos, 1% ao mês por 12 meses dá 1,01¹² − 1 ≈ 12,68% ao ano, porque os juros de cada mês também rendem. No sentido inverso, 12% ao ano equivalem a cerca de 0,9489% ao mês.',
				},
				{
					question: 'Qual a diferença entre juros simples e juros compostos?',
					answer:
						'Nos juros simples, os juros incidem só sobre o capital inicial; nos compostos, incidem sobre o saldo acumulado. R$ 1.000 a 1% ao mês por 12 meses viram R$ 1.120,00 com juros simples e cerca de R$ 1.126,83 com juros compostos, e a diferença cresce com o tempo.',
				},
				{
					question: 'O aporte no início ou no fim do mês muda o resultado?',
					answer:
						'Sim. Um aporte feito no início do mês rende juros por um mês a mais do que um aporte feito no fim, então o saldo final fica um pouco maior. Esta calculadora de juros compostos considera todos os aportes no fim de cada mês.',
				},
				{
					question: 'A simulação de juros compostos desconta Imposto de Renda?',
					answer:
						'Não. A simulação mostra o rendimento bruto, sem Imposto de Renda, taxas de administração nem inflação. Em aplicações de renda fixa tributadas, o IR segue uma tabela regressiva de 22,5% a 15% sobre o rendimento, conforme o prazo.',
				},
			],
			howTo: {
				title: 'Como calcular juros compostos',
				steps: [
					'Converta a taxa para decimal: 1% vira 0,01.',
					'Use a taxa no mesmo período dos depósitos. Para passar de anual a mensal, calcule (1 + taxa anual)^(1/12) − 1.',
					'Sem aportes, calcule o montante com M = C × (1 + i)ⁿ.',
					'Com aportes mensais no fim de cada mês, repita para cada mês: novo saldo = saldo × (1 + i) + aporte.',
					'Os juros são o montante final menos tudo o que foi investido.',
				],
				example:
					'R$ 1.000 a 1% ao mês por 12 meses: 1.000 × 1,01¹² ≈ R$ 1.126,83. Com R$ 1.000 iniciais, R$ 200 por mês, 10% ao ano e 5 anos: taxa mensal de 0,7974%, total investido de R$ 13.000,00, juros de R$ 3.922,76 e saldo final de R$ 16.922,76.',
				source: {
					label: 'Banco Central do Brasil: Calculadora do Cidadão',
					url: 'https://www.bcb.gov.br/meubc/calculadoradocidadao',
				},
			},
			updatedAt: UPDATED_AT,
		},
		'media-mediana-e-moda': {
			title: 'Calculadora de média, mediana e moda',
			metaDescription:
				'Calcule média, média ponderada, mediana, moda, amplitude e desvio padrão de uma lista de números de uma só vez, com valores decimais e pesos opcionais.',
			answer:
				'A calculadora recebe uma lista de números e mostra média aritmética, mediana, moda, mínimo, máximo, amplitude, quantidade, soma e desvio padrão populacional e amostral. Se você informar um peso para cada valor, ela calcula também a média ponderada: soma de valor × peso dividida pela soma dos pesos. A mediana é o valor do meio da lista ordenada, ou a média dos dois do meio quando a quantidade é par. A moda é o valor que mais se repete; em caso de empate, todos aparecem, e se nenhum se repetir a lista não tem moda. O desvio padrão populacional divide a soma dos quadrados dos desvios por n, e o amostral, por n − 1. Separe os valores por vírgula ou espaço; para usar vírgula decimal (6,5), separe por ponto e vírgula ou quebra de linha.',
			faq: [
				{
					question: 'Qual a diferença entre média e mediana?',
					answer:
						'A média soma todos os valores e divide pela quantidade; a mediana é o valor do meio da lista ordenada. A mediana sofre menos com valores extremos: em salários de R$ 2.000, R$ 2.500 e R$ 30.000, a média é R$ 11.500, mas a mediana é R$ 2.500.',
				},
				{
					question: 'O que acontece quando nenhum valor se repete na moda?',
					answer:
						'Quando nenhum valor se repete, a lista não tem moda (é amodal). Quando dois ou mais valores empatam na maior frequência, todos eles são modas, e a lista é bimodal ou multimodal.',
				},
				{
					question: 'Como calcular a média ponderada?',
					answer:
						'Para calcular a média ponderada, multiplique cada valor pelo seu peso, some os produtos e divida pela soma dos pesos. Notas 7 com peso 2 e 9 com peso 3 dão (7 × 2 + 9 × 3) ÷ (2 + 3) = 41 ÷ 5 = 8,2.',
				},
				{
					question: 'Quando usar desvio padrão populacional ou amostral?',
					answer:
						'Use o desvio padrão populacional quando a lista contém todos os elementos do grupo estudado, e o amostral quando ela é uma amostra de um grupo maior. O amostral divide por n − 1 em vez de n, o que corrige a tendência de a amostra subestimar a variação real.',
				},
			],
			howTo: {
				title: 'Como calcular média, mediana e moda',
				steps: [
					'Média: some todos os valores e divida pela quantidade de valores.',
					'Mediana: ordene os valores e pegue o do meio; se a quantidade for par, faça a média dos dois do meio.',
					'Moda: conte quantas vezes cada valor aparece e fique com o mais frequente.',
					'Amplitude: subtraia o menor valor do maior.',
				],
				example:
					'Para 2, 3, 3, 5, 7 e 10: média = 30 ÷ 6 = 5; mediana = (3 + 5) ÷ 2 = 4; moda = 3; amplitude = 10 − 2 = 8.',
			},
			updatedAt: UPDATED_AT,
		},
		'arranjo-e-combinacao': {
			title: 'Calculadora de arranjo, combinação e permutação',
			metaDescription:
				'Calcule arranjo, combinação, permutação e arranjo com repetição com números inteiros exatos. Informe n e k e veja as quatro contagens de uma vez.',
			answer:
				'A calculadora de análise combinatória recebe n, o total de elementos, e k, quantos são escolhidos, e mostra quatro contagens: a combinação simples C(n, k) = n! ÷ (k! × (n − k)!), quando a ordem não importa; o arranjo simples A(n, k) = n! ÷ (n − k)!, quando a ordem importa; o arranjo com repetição nᵏ, quando o mesmo elemento pode aparecer mais de uma vez; e a permutação n!, que conta todas as ordenações dos n elementos. Os resultados são inteiros exatos, calculados com BigInt, sem arredondamento nem notação científica, mesmo com centenas de dígitos. n e k vão de 0 a 1.000, e k não pode ser maior que n.',
			faq: [
				{
					question: 'Quantos jogos possíveis tem a Mega-Sena?',
					answer:
						'A Mega-Sena tem 50.063.860 jogos possíveis de 6 números: é a combinação C(60, 6), porque a ordem dos números sorteados não importa.',
				},
				{
					question: 'Quando usar arranjo ou combinação?',
					answer:
						'Use arranjo quando a ordem dos elementos muda o resultado, como num pódio ou numa senha, e combinação quando não muda, como numa comissão ou numa aposta de loteria. Por isso o arranjo é sempre maior ou igual à combinação: A(n, k) = C(n, k) × k!.',
				},
				{
					question: 'Quantas senhas de 4 dígitos existem?',
					answer:
						'Existem 10.000 senhas de 4 dígitos (de 0000 a 9999), pelo arranjo com repetição 10⁴. Sem repetir dígitos, são A(10, 4) = 10 × 9 × 8 × 7 = 5.040 senhas.',
				},
				{
					question: 'Quanto vale 0 fatorial?',
					answer:
						'0! vale 1 por definição. Assim as fórmulas de combinação e arranjo continuam valendo nos extremos: C(n, 0) = 1 e C(n, n) = 1, já que só há uma forma de não escolher nada ou de escolher tudo.',
				},
			],
			howTo: {
				title: 'Como calcular arranjo e combinação',
				steps: [
					'Defina n (total de elementos) e k (quantos serão escolhidos).',
					'Arranjo simples: multiplique k fatores decrescentes a partir de n, n × (n − 1) × … × (n − k + 1).',
					'Combinação simples: divida o arranjo por k!.',
					'Arranjo com repetição: eleve n à potência k.',
					'Permutação: multiplique todos os inteiros de 1 até n (n!).',
				],
				example:
					'Com n = 5 e k = 3: A(5, 3) = 5 × 4 × 3 = 60; C(5, 3) = 60 ÷ 3! = 60 ÷ 6 = 10; arranjo com repetição 5³ = 125; permutação 5! = 120.',
			},
			updatedAt: UPDATED_AT,
		},
		'numeros-romanos': {
			title: 'Conversor de números romanos',
			metaDescription:
				'Converta números para algarismos romanos e romanos para números, com a regra da subtração e barras para valores acima de 3.999, sem limite superior.',
			answer:
				'O conversor transforma números inteiros positivos em algarismos romanos e algarismos romanos em números. Ele usa os símbolos I (1), V (5), X (10), L (50), C (100), D (500) e M (1.000), somados da esquerda para a direita, e a regra da subtração: um símbolo menor antes de um maior é subtraído, nos pares IV (4), IX (9), XL (40), XC (90), CD (400) e CM (900). Até 3.999 a escrita é a padrão. Acima disso, uma barra sobre os símbolos multiplica o valor por 1.000, e cada barra a mais multiplica por mais 1.000, sem limite superior. Na leitura, só a forma padrão é aceita: escritas como IIII, IC ou VV são recusadas. Para digitar barras, use parênteses: (IV) vale 4.000.',
			faq: [
				{
					question: 'Como se escreve 2026 em números romanos?',
					answer: '2026 em números romanos é MMXXVI: MM (2.000) + XX (20) + VI (6).',
				},
				{
					question: 'Como se escrevem números romanos acima de 3.999?',
					answer:
						'Sem símbolos extras, o maior número romano é MMMCMXCIX (3.999). Acima disso usa-se a barra superior (vinculum): o número é dividido em milhares e o restante, n = q × 1.000 + r; q ganha uma barra (× 1.000) e r vem depois, sem barra. Assim, 4.000 é IV com barra, 1.000.000 é M com barra e 1.000.000.000 é M com duas barras. Para digitar, use parênteses, cada par valendo uma barra: (IV) é 4.000. Não existe um padrão histórico único para números tão grandes; esta é a convenção usada aqui.',
				},
				{
					question: 'Existe zero em números romanos?',
					answer:
						'Não existe zero nos números romanos, nem números negativos ou casas decimais. Por isso o conversor aceita apenas inteiros a partir de 1.',
				},
				{
					question: 'Por que 4 é IV e não IIII em romanos?',
					answer:
						'Na escrita padrão dos números romanos, um mesmo símbolo não se repete mais de três vezes seguidas, e 4 é escrito pela subtração IV (5 − 1). A forma IIII aparece em alguns relógios, mas não é a forma padrão, e o conversor a recusa.',
				},
			],
			howTo: {
				title: 'Como converter números para romanos',
				steps: [
					'Use a tabela de valores, do maior para o menor: M 1.000, CM 900, D 500, CD 400, C 100, XC 90, L 50, XL 40, X 10, IX 9, V 5, IV 4, I 1.',
					'Pegue o maior valor da tabela que cabe no número, escreva o símbolo e subtraia o valor.',
					'Repita com o que sobrou até chegar a zero.',
					'Para ler um número romano, some os valores da esquerda para a direita, subtraindo o símbolo que vem antes de outro maior.',
				],
				example:
					'1987 = 1.000 (M) + 900 (CM) + 50 (L) + 30 (XXX) + 7 (VII) = MCMLXXXVII. No sentido inverso, MCMXCIV = 1.000 + 900 + 90 + 4 = 1994.',
			},
			updatedAt: UPDATED_AT,
		},
	},
}
