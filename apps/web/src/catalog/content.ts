/**
 * Editorial content for answer engines (AEO/GEO) and people: a direct answer of what each tool does
 * and how it computes, plus real questions. Rendered on the tool page, in FAQPage JSON-LD and in
 * /llms-full.txt, so every claim here must match what the code in src/lib/algorithms actually does.
 */

import { TOOLS } from './catalog.ts'

export type Faq = { question: string; answer: string }
export type ToolContent = { answer: string; faq: Faq[] }

export const TOOL_CONTENT: Record<string, ToolContent> = {
	/* ------------------------------ Geradores ------------------------------ */
	'gerador-de-cpf': {
		answer:
			'O gerador de CPF cria números de CPF matematicamente válidos para testar cadastros e sistemas em desenvolvimento. Os nove primeiros dígitos são sorteados e os dois dígitos verificadores são calculados pelo módulo 11, como a Receita Federal define. O nono dígito indica a região fiscal, por isso dá para escolher o estado.',
		faq: [
			{
				question: 'O CPF gerado é de uma pessoa real?',
				answer:
					'Não. O número só passa na validação matemática dos dígitos verificadores; ele não é consultado nem registrado na Receita Federal. Use apenas para testes de software.',
			},
			{
				question: 'Como funciona a escolha do estado?',
				answer:
					'O nono dígito do CPF indica a região fiscal onde ele foi emitido. Ao escolher, por exemplo, São Paulo, o gerador fixa esse dígito em 8 e calcula os verificadores a partir dele.',
			},
		],
	},
	'gerador-de-cnpj': {
		answer:
			'O gerador de CNPJ cria números de CNPJ válidos para testes. Ele sorteia os oito dígitos da raiz, usa 0001 como filial (matriz) e calcula os dois dígitos verificadores com os pesos 5 a 2 e 9 a 2 do módulo 11.',
		faq: [
			{
				question: 'Por que todo CNPJ gerado termina em 0001 antes dos verificadores?',
				answer:
					'Os quatro dígitos depois da barra identificam o estabelecimento. 0001 é a matriz, que é o caso mais comum em cadastros de teste.',
			},
			{
				question: 'Posso usar o CNPJ gerado para emitir nota fiscal?',
				answer:
					'Não. O número é válido apenas matematicamente e não pertence a nenhuma empresa. Serve para testar formulários e regras de validação.',
			},
		],
	},
	'gerador-de-rg': {
		answer:
			'O gerador de RG cria números no padrão da SSP de São Paulo: oito dígitos sorteados e um dígito verificador calculado com os pesos 2 a 9 e módulo 11, em que o resto 1 vira a letra X.',
		faq: [
			{
				question: 'O RG gerado vale para qualquer estado?',
				answer:
					'Não. Cada secretaria de segurança tem a própria regra; o gerador segue o padrão de São Paulo, o mais usado em sistemas de teste.',
			},
			{
				question: 'Por que alguns RGs terminam em X?',
				answer:
					'Quando o cálculo do dígito verificador resulta em 10, o padrão da SSP-SP usa a letra X no lugar desse dígito.',
			},
		],
	},
	'gerador-de-senha': {
		answer:
			'O gerador de senha monta senhas aleatórias com o tamanho e os tipos de caractere que você escolher. Os sorteios usam a Web Crypto API do navegador, que é criptograficamente segura, e a senha nunca sai da sua máquina.',
		faq: [
			{
				question: 'Qual o tamanho ideal de uma senha?',
				answer:
					'Pelo menos 12 caracteres misturando maiúsculas, minúsculas e números; 16 ou mais para contas importantes. Cada caractere a mais multiplica o número de combinações possíveis.',
			},
			{
				question: 'Para que serve evitar caracteres parecidos?',
				answer:
					'Evita sequências fáceis de confundir ao ler ou digitar, como l e I ou O e 0, o que ajuda quando a senha precisa ser copiada à mão.',
			},
		],
	},
	'gerador-de-nomes': {
		answer:
			'O gerador de nomes cria nomes brasileiros aleatórios, só o primeiro nome, nome e sobrenome ou nome com dois sobrenomes, filtrando por sexo. Os nomes vêm da base pt_BR da biblioteca Faker.',
		faq: [
			{
				question: 'Os nomes pertencem a pessoas reais?',
				answer:
					'São combinações aleatórias de nomes e sobrenomes comuns no Brasil, sem ligação com nenhuma pessoa. Servem para preencher dados de teste.',
			},
			{
				question: 'Quantos nomes posso gerar de uma vez?',
				answer: 'Até 500 por vez, que podem ser copiados ou salvos em um arquivo de texto.',
			},
		],
	},

	/* ----------------------------- Validadores ----------------------------- */
	'validador-de-cpf': {
		answer:
			'O validador de CPF confere se um número é válido recalculando os dois dígitos verificadores pelo módulo 11. Também rejeita sequências repetidas como 111.111.111-11 e mostra a região fiscal indicada pelo nono dígito.',
		faq: [
			{
				question: 'CPF válido significa que ele existe?',
				answer:
					'Não. A validação é matemática: confirma que os dígitos verificadores batem. Para saber se o CPF está ativo, só consultando a Receita Federal.',
			},
			{
				question: 'Como é calculado o dígito verificador do CPF?',
				answer:
					'Multiplica-se os nove primeiros dígitos por 10, 9, 8 … 2 e soma-se. O resto da divisão por 11 define o dígito: resto menor que 2 vira 0, senão é 11 menos o resto. O segundo dígito repete a conta com os dez primeiros e pesos de 11 a 2.',
			},
		],
	},
	'validador-de-cnpj': {
		answer:
			'O validador de CNPJ confere os dois dígitos verificadores de um CNPJ de 14 dígitos com os pesos oficiais do módulo 11 e rejeita sequências repetidas. Aceita o número com ou sem pontuação.',
		faq: [
			{
				question: 'Quais pesos são usados no cálculo do CNPJ?',
				answer:
					'Para o primeiro dígito, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2; para o segundo, 6 seguido da mesma sequência. Resto menor que 2 vira 0, senão o dígito é 11 menos o resto.',
			},
			{
				question: 'O validador consulta a Receita Federal?',
				answer:
					'Não. A verificação acontece no seu navegador e é só matemática; ela não informa se a empresa está ativa.',
			},
		],
	},
	'validador-de-rg': {
		answer:
			'O validador de RG confere o dígito verificador de RGs no padrão da SSP-SP: oito dígitos multiplicados pelos pesos 2 a 9, resto da divisão por 11, com X quando o resultado é 10.',
		faq: [
			{
				question: 'Por que meu RG de outro estado aparece como inválido?',
				answer:
					'Cada estado usa uma regra própria, e alguns nem têm dígito verificador. O validador só cobre o padrão de São Paulo.',
			},
			{
				question: 'Preciso digitar a pontuação?',
				answer:
					'Não. Pontos, traços e espaços são ignorados; X maiúsculo ou minúsculo é aceito no último dígito.',
			},
		],
	},

	/* ---------------------------- Funções de texto ------------------------- */
	'contador-de-caracteres': {
		answer:
			'O contador de caracteres conta, enquanto você digita, caracteres, caracteres sem espaços, palavras, linhas, espaços, vogais, consoantes e números de um texto. Letras acentuadas contam como vogais.',
		faq: [
			{
				question: 'Emojis contam como um caractere?',
				answer:
					'Sim. A contagem é por ponto de código Unicode, então um emoji simples conta como um caractere, e não como dois.',
			},
			{
				question: 'Como as palavras são contadas?',
				answer:
					'Cada sequência de caracteres separada por espaços ou quebras de linha conta como uma palavra.',
			},
		],
	},

	/* ---------------------------- Rede e internet -------------------------- */
	'meu-ip': {
		answer:
			'A ferramenta Meu IP mostra o endereço IP público com que você navega, consultando o serviço ipify direto do seu navegador. É o endereço que os sites veem quando você os acessa.',
		faq: [
			{
				question: 'Qual a diferença entre IP público e IP local?',
				answer:
					'O IP local (como 192.168.0.10) identifica o aparelho dentro da sua rede. O IP público é o da sua conexão com a internet, compartilhado por todos os aparelhos da casa.',
			},
			{
				question: 'Meu IP muda?',
				answer:
					'Na maioria das conexões residenciais, sim: a operadora pode trocar o IP público ao reiniciar o modem ou de tempos em tempos.',
			},
		],
	},
	'buscar-cep': {
		answer:
			'A busca de CEP retorna rua, bairro, cidade e estado de um CEP brasileiro consultando a BrasilAPI, que reúne dados dos Correios e de outras bases públicas.',
		faq: [
			{
				question: 'Por que alguns CEPs não têm rua?',
				answer:
					'CEPs gerais de municípios pequenos cobrem a cidade inteira e não indicam um logradouro. Nesses casos só a cidade e o estado aparecem.',
			},
			{
				question: 'Preciso digitar o traço do CEP?',
				answer: 'Não. Basta informar os 8 dígitos; qualquer pontuação é ignorada.',
			},
		],
	},

	/* ------------------------------ Codificadores -------------------------- */
	'conversor-de-binario': {
		answer:
			'O conversor de código binário transforma texto em binário e binário em texto. Cada caractere vira um ou mais bytes UTF-8, escritos como grupos de 8 bits separados por espaço, então acentos e emojis também funcionam.',
		faq: [
			{
				question: 'Como a letra A fica em binário?',
				answer: 'A letra A tem código 65, que em binário é 01000001.',
			},
			{
				question: 'Por que uma letra acentuada vira dois grupos?',
				answer:
					'Em UTF-8, caracteres fora do ASCII ocupam mais de um byte. O á, por exemplo, vira 11000011 10100001.',
			},
		],
	},

	/* ---------------------------- Tabelas e padrões ------------------------ */
	'eventos-de-teclado': {
		answer:
			'A ferramenta de eventos de teclado mostra, ao pressionar uma tecla, os valores de event.key, event.code, event.keyCode e event.location do JavaScript, úteis para programar atalhos.',
		faq: [
			{
				question: 'Devo usar key, code ou keyCode?',
				answer:
					'Prefira event.key para o caractere digitado e event.code para a posição física da tecla. event.keyCode está obsoleto, mas ainda aparece em código legado.',
			},
			{
				question: 'O que significa event.location?',
				answer:
					'Indica onde está a tecla: 0 para teclas comuns, 1 e 2 para modificadores à esquerda e à direita, 3 para o teclado numérico.',
			},
		],
	},

	/* ------------------------------ Cálculo de áreas ----------------------- */
	'area-do-circulo': {
		answer:
			'A área do círculo é π vezes o raio ao quadrado (A = π·r²). Se você tiver o diâmetro, a área é π·d²/4. A calculadora aceita qualquer uma das duas medidas.',
		faq: [
			{
				question: 'Qual a área de um círculo de raio 2?',
				answer: 'A = π · 2² = 4π ≈ 12,57 unidades de área.',
			},
			{
				question: 'Qual valor de π a calculadora usa?',
				answer:
					'O Math.PI do JavaScript, 3,141592653589793, com precisão de cerca de 15 casas decimais.',
			},
		],
	},
	'area-do-quadrado': {
		answer: 'A área do quadrado é o lado multiplicado por ele mesmo (A = L²).',
		faq: [
			{
				question: 'Qual a área de um quadrado de lado 5?',
				answer: 'A = 5² = 25 unidades de área.',
			},
			{
				question: 'Se o lado dobrar, o que acontece com a área?',
				answer: 'A área quadruplica, porque o lado entra elevado ao quadrado.',
			},
		],
	},
	'area-do-retangulo': {
		answer: 'A área do retângulo é a base vezes a altura (A = b·h).',
		faq: [
			{
				question: 'Qual a área de um retângulo 8 por 3?',
				answer: 'A = 8 · 3 = 24 unidades de área.',
			},
			{
				question: 'Como calcular a área de um cômodo?',
				answer:
					'Meça largura e comprimento em metros e multiplique: um quarto de 3 m por 4 m tem 12 m².',
			},
		],
	},
	'area-do-triangulo': {
		answer: 'A área do triângulo é a base vezes a altura dividido por dois (A = b·h/2).',
		faq: [
			{
				question: 'Qual a área de um triângulo de base 10 e altura 4?',
				answer: 'A = 10 · 4 / 2 = 20 unidades de área.',
			},
			{
				question: 'O que é a altura de um triângulo?',
				answer:
					'É a distância perpendicular entre a base e o vértice oposto, não o comprimento de um dos lados inclinados.',
			},
		],
	},
	'area-do-pentagono': {
		answer: 'A área do pentágono regular é 5·L² / (4·tan 36°), que dá aproximadamente 1,7205·L².',
		faq: [
			{
				question: 'Qual a área de um pentágono regular de lado 2?',
				answer: 'A ≈ 1,7205 · 2² ≈ 6,88 unidades de área.',
			},
			{
				question: 'A fórmula vale para pentágonos irregulares?',
				answer:
					'Não. Ela pressupõe os cinco lados e ângulos iguais; um pentágono irregular precisa ser dividido em triângulos.',
			},
		],
	},
	'area-do-hexagono': {
		answer: 'A área do hexágono regular é 6·L² / (4·tan 30°), ou seja 3√3·L²/2 ≈ 2,598·L².',
		faq: [
			{
				question: 'Qual a área de um hexágono regular de lado 2?',
				answer: 'A ≈ 2,598 · 2² ≈ 10,39 unidades de área.',
			},
			{
				question: 'Por que o hexágono é formado por triângulos?',
				answer:
					'Um hexágono regular se divide em seis triângulos equiláteros iguais, cada um com área √3·L²/4.',
			},
		],
	},
	'area-do-poligono-regular': {
		answer:
			'A área de um polígono regular de n lados com lado L é n·L² / (4·tan(π/n)). A fórmula vale para qualquer polígono com lados e ângulos iguais, do triângulo ao polígono de mil lados.',
		faq: [
			{
				question: 'Qual a área de um octógono regular de lado 1?',
				answer: 'A = 8 · 1² / (4 · tan(π/8)) ≈ 4,83 unidades de área.',
			},
			{
				question: 'O que acontece quando o número de lados cresce muito?',
				answer:
					'O polígono se aproxima de um círculo, e a área tende à do círculo que passa pelos seus vértices.',
			},
		],
	},
	'area-do-losango': {
		answer: 'A área do losango é o produto das diagonais dividido por dois (A = D·d/2).',
		faq: [
			{
				question: 'Qual a área de um losango com diagonais 6 e 4?',
				answer: 'A = 6 · 4 / 2 = 12 unidades de área.',
			},
			{
				question: 'Por que dividir por dois?',
				answer:
					'As diagonais formam um retângulo que envolve o losango, e o losango ocupa exatamente metade dele.',
			},
		],
	},
	'area-do-trapezio': {
		answer:
			'A área do trapézio é a soma das bases vezes a altura dividido por dois (A = (B + b)·h/2).',
		faq: [
			{
				question: 'Qual a área de um trapézio com bases 10 e 6 e altura 4?',
				answer: 'A = (10 + 6) · 4 / 2 = 32 unidades de área.',
			},
			{
				question: 'De onde vem essa fórmula?',
				answer:
					'É a média das duas bases multiplicada pela altura, como se o trapézio virasse um retângulo de largura média.',
			},
		],
	},
	'area-do-paralelogramo': {
		answer:
			'A área do paralelogramo é a base vezes a altura (A = b·h), em que a altura é perpendicular à base.',
		faq: [
			{
				question: 'Qual a área de um paralelogramo de base 7 e altura 3?',
				answer: 'A = 7 · 3 = 21 unidades de área.',
			},
			{
				question: 'Posso usar o lado inclinado como altura?',
				answer:
					'Não. A altura é a distância perpendicular entre as bases; o lado inclinado é sempre maior que ela.',
			},
		],
	},
	'area-da-elipse': {
		answer: 'A área da elipse é π vezes o semieixo maior vezes o semieixo menor (A = π·a·b).',
		faq: [
			{
				question: 'Qual a área de uma elipse com semieixos 5 e 3?',
				answer: 'A = π · 5 · 3 = 15π ≈ 47,12 unidades de área.',
			},
			{
				question: 'O que são os semieixos?',
				answer: 'São as metades dos eixos maior e menor, medidas do centro da elipse até a borda.',
			},
		],
	},
	'area-da-coroa-circular': {
		answer:
			'A área da coroa circular é π vezes a diferença entre os quadrados dos raios (A = π·(R² − r²)).',
		faq: [
			{
				question: 'Qual a área de uma coroa com raios 5 e 3?',
				answer: 'A = π · (25 − 9) = 16π ≈ 50,27 unidades de área.',
			},
			{
				question: 'Onde aparece a coroa circular?',
				answer: 'Em arruelas, anéis, pistas de corrida circulares e seções de tubos, por exemplo.',
			},
		],
	},
	'area-do-setor-circular': {
		answer: 'A área do setor circular é π·r²·θ/360, em que θ é o ângulo do setor em graus.',
		faq: [
			{
				question: 'Qual a área de um setor de raio 4 e 90°?',
				answer: 'A = π · 16 · 90 / 360 = 4π ≈ 12,57 unidades de área.',
			},
			{
				question: 'E se o ângulo estiver em radianos?',
				answer:
					'Use A = r²·θ/2 com θ em radianos, ou converta multiplicando os radianos por 180/π.',
			},
		],
	},

	/* ------------------------------ Cálculo de datas ----------------------- */
	'diferenca-entre-datas': {
		answer:
			'A calculadora de diferença entre datas mostra o intervalo entre duas datas e horários em anos, meses e dias de calendário, e também o total em semanas, dias, horas, minutos, segundos e milissegundos.',
		faq: [
			{
				question: 'Como são contados os meses?',
				answer:
					'Mês a mês no calendário: de 31 de janeiro a 1º de março do ano seguinte dá 1 ano, 1 mês e 1 dia. Quando o dia não existe no mês de destino, usa-se o último dia desse mês.',
			},
			{
				question: 'Dá para calcular a idade de alguém?',
				answer:
					'Sim. Use a data de nascimento como inicial e hoje como final; o resultado em anos, meses e dias é a idade exata.',
			},
		],
	},
	'somar-em-data': {
		answer:
			'A calculadora de somar em data adiciona dias, semanas, meses ou anos a uma data e mostra o dia resultante por extenso.',
		faq: [
			{
				question: 'Quanto dá 31 de janeiro mais um mês?',
				answer:
					'O resultado transborda para março (2 ou 3 de março, conforme o ano), porque fevereiro não tem dia 31. É o mesmo comportamento das datas em JavaScript.',
			},
			{
				question: 'Como calcular um prazo em dias corridos?',
				answer:
					'Informe a data inicial e some a quantidade de dias; fins de semana e feriados são contados normalmente.',
			},
		],
	},
	'subtrair-em-data': {
		answer:
			'A calculadora de subtrair em data volta dias, semanas, meses ou anos a partir de uma data e mostra o dia resultante por extenso.',
		faq: [
			{
				question: 'Como saber a data de 90 dias atrás?',
				answer:
					'Escolha a data de hoje, informe 90 e a unidade Dias; o resultado é a data exata 90 dias antes.',
			},
			{
				question: 'Subtrair um ano de 29 de fevereiro dá o quê?',
				answer: 'Como o ano anterior não tem 29 de fevereiro, o resultado é 1º de março.',
			},
		],
	},

	/* -------------------------------- Calculadoras ------------------------- */
	porcentagem: {
		answer:
			'São dez calculadoras de porcentagem que respondem enquanto você digita: quanto é X% de um valor, que porcentagem um valor é de outro, o total a partir de uma parte, variação percentual, acréscimo, desconto, o valor antes de um aumento ou desconto, variações sucessivas, margem e markup, e diferença em pontos percentuais. Cada resultado mostra a conta feita com os seus números.',
		faq: [
			{ question: 'Quanto é 15% de 200?', answer: '15 ÷ 100 × 200 = 30.' },
			{
				question: 'Por que +10% e depois −10% não volta ao valor inicial?',
				answer:
					'Porque o segundo percentual incide sobre o valor já alterado: 1,10 × 0,90 = 0,99, uma queda total de 1%. A calculadora de variações sucessivas multiplica os fatores em vez de somar os percentuais.',
			},
			{
				question: 'Qual a diferença entre margem e markup?',
				answer:
					'A margem é o lucro dividido pelo preço de venda; o markup é o lucro dividido pelo custo. Com custo 80 e venda 100, a margem é 20% e o markup é 25%.',
			},
		],
	},
	'calculadora-de-imc': {
		answer:
			'O Índice de Massa Corporal (IMC) é o peso em quilos dividido pela altura em metros ao quadrado. A calculadora mostra o IMC, a faixa de classificação e uma estimativa de peso ideal.',
		faq: [
			{
				question: 'Qual é o IMC normal?',
				answer:
					'Entre 18,5 e 24,9. Abaixo disso é abaixo do peso; de 25 a 29,9, sobrepeso; a partir de 30, obesidade.',
			},
			{
				question: 'O IMC serve para todo mundo?',
				answer:
					'Não. Ele não diferencia músculo de gordura e não vale para crianças, gestantes e atletas. É uma referência geral, não um diagnóstico.',
			},
		],
	},
	'equacao-do-segundo-grau': {
		answer:
			'A fórmula de Bhaskara resolve equações do 2º grau ax² + bx + c = 0. Primeiro calcula-se Δ = b² − 4ac; depois x = (−b ± √Δ) / 2a. Se Δ for negativo, não há raízes reais.',
		faq: [
			{
				question: 'Quais as raízes de x² − 3x + 2 = 0?',
				answer: 'Δ = 9 − 8 = 1, então x = (3 ± 1) / 2, ou seja x₁ = 2 e x₂ = 1.',
			},
			{
				question: 'O que significa Δ igual a zero?',
				answer:
					'Que a equação tem duas raízes reais iguais: a parábola toca o eixo x em um único ponto.',
			},
		],
	},
	'fatorar-numero': {
		answer:
			'A fatoração decompõe um número inteiro em fatores primos, mostrando cada fator e a forma com potências, como 360 = 2³ × 3² × 5.',
		faq: [
			{ question: 'Como fatorar 360?', answer: '360 = 2 × 2 × 2 × 3 × 3 × 5 = 2³ × 3² × 5.' },
			{
				question: 'Para que serve a fatoração?',
				answer:
					'Para calcular MDC e MMC, simplificar frações e raízes, e verificar se um número é primo.',
			},
		],
	},
	'maximo-divisor-comum': {
		answer:
			'O Máximo Divisor Comum (MDC) é o maior número que divide todos os números informados sem deixar resto. A calculadora usa o algoritmo de Euclides, que funciona para qualquer quantidade de números.',
		faq: [
			{ question: 'Qual o MDC de 12, 18 e 24?', answer: 'MDC(12, 18, 24) = 6.' },
			{
				question: 'Como funciona o algoritmo de Euclides?',
				answer:
					'Divide-se o maior pelo menor e repete-se com o divisor e o resto até o resto ser zero; o último divisor é o MDC.',
			},
		],
	},
	'minimo-multiplo-comum': {
		answer:
			'O Mínimo Múltiplo Comum (MMC) é o menor número que é múltiplo de todos os números informados. A calculadora usa a relação MMC(a, b) = a·b / MDC(a, b) aplicada em sequência.',
		faq: [
			{ question: 'Qual o MMC de 4, 6 e 10?', answer: 'MMC(4, 6, 10) = 60.' },
			{
				question: 'Para que serve o MMC?',
				answer:
					'Para somar frações com denominadores diferentes e para descobrir quando eventos periódicos coincidem.',
			},
		],
	},
	'numeros-primos': {
		answer:
			'A calculadora de números primos verifica quais números de uma lista são primos, isto é, maiores que 1 e divisíveis apenas por 1 e por eles mesmos, testando divisores até a raiz quadrada de cada número.',
		faq: [
			{
				question: 'O número 1 é primo?',
				answer: 'Não. Por definição, um primo tem exatamente dois divisores, e o 1 tem apenas um.',
			},
			{ question: 'O 2 é primo?', answer: 'Sim, e é o único número primo par.' },
		],
	},
	'numeros-amigaveis': {
		answer:
			'Dois números são amigáveis quando a soma dos divisores próprios de um é igual ao outro, e vice-versa. O par mais famoso é 220 e 284.',
		faq: [
			{
				question: 'Por que 220 e 284 são amigáveis?',
				answer: 'Os divisores próprios de 220 somam 284, e os divisores próprios de 284 somam 220.',
			},
			{
				question: 'O que são divisores próprios?',
				answer:
					'Todos os divisores positivos de um número, exceto ele mesmo. Os de 6 são 1, 2 e 3.',
			},
		],
	},
	fibonacci: {
		answer:
			'A sequência de Fibonacci começa com 0 e 1, e cada termo seguinte é a soma dos dois anteriores: 0, 1, 1, 2, 3, 5, 8, 13… A calculadora gera até 5.000 termos com precisão inteira.',
		faq: [
			{ question: 'Qual o 10º termo de Fibonacci?', answer: 'Começando em 0, o 10º termo é 34.' },
			{
				question: 'Os números grandes perdem precisão?',
				answer:
					'Não. Os termos são calculados com BigInt, então mesmo números com centenas de dígitos saem exatos.',
			},
		],
	},
	'conversor-de-temperatura': {
		answer:
			'O conversor de temperatura converte entre graus Celsius, Fahrenheit e Kelvin: °F = °C × 1,8 + 32 e K = °C + 273,15.',
		faq: [
			{
				question: 'Quanto é 100 °C em Fahrenheit?',
				answer: '100 × 1,8 + 32 = 212 °F, o ponto de ebulição da água ao nível do mar.',
			},
			{
				question: 'Existe temperatura negativa em Kelvin?',
				answer: 'Não. 0 K é o zero absoluto, igual a −273,15 °C.',
			},
		],
	},
	'divisao-e-resto': {
		answer:
			'A calculadora de divisão mostra o quociente exato, o quociente inteiro e o resto (módulo) entre dois números. O resto segue o sinal do dividendo, como o operador % das linguagens de programação.',
		faq: [
			{
				question: 'Quanto é 17 dividido por 5?',
				answer: 'O quociente é 3,4; o quociente inteiro é 3 e o resto é 2.',
			},
			{
				question: 'Qual o resto de −7 por 3?',
				answer:
					'O resultado é −1, porque o resto acompanha o sinal do dividendo (−7 = 3 × −2 − 1).',
			},
		],
	},
	/* ----------------------------- Novas ferramentas ---------------------------- */
	'gerador-de-uuid': {
		answer:
			'O gerador de UUID cria identificadores únicos de 128 bits. A versão 4 é totalmente aleatória; a versão 7 começa com o horário em milissegundos, então os IDs saem em ordem de criação, o que deixa índices de banco de dados mais compactos. Os bits aleatórios vêm da Web Crypto API.',
		faq: [
			{
				question: 'Qual a diferença entre UUID v4 e v7?',
				answer:
					'O v4 tem 122 bits aleatórios e nenhuma ordem. O v7 guarda o momento da criação nos primeiros 48 bits e completa com bits aleatórios, então dois UUIDs v7 podem ser ordenados pela data em que foram gerados.',
			},
			{
				question: 'Dois UUIDs podem se repetir?',
				answer:
					'Na prática, não. Com 122 bits aleatórios, seria preciso gerar bilhões de UUIDs por segundo durante décadas para ter uma chance relevante de colisão.',
			},
		],
	},
	'gerador-de-hash': {
		answer:
			'O gerador de hash calcula de uma vez o MD5, o SHA-1, o SHA-256, o SHA-384, o SHA-512 e o CRC32 de um texto em UTF-8, em hexadecimal. Os SHA usam a Web Crypto API do navegador. O mesmo texto sempre gera o mesmo hash, e qualquer alteração muda o resultado por completo.',
		faq: [
			{
				question: 'Posso guardar senhas com SHA-256?',
				answer:
					'Não diretamente. Para senhas use algoritmos lentos e com sal, como Argon2, bcrypt ou scrypt. SHA serve para verificar integridade de arquivos e mensagens.',
			},
			{
				question: 'Por que o MD5 está marcado como “só para checksum”?',
				answer:
					'O MD5 tem colisões conhecidas e não serve para segurança. Ele continua útil para conferir se um arquivo ou texto não mudou, por isso aparece junto com o CRC32; para segurança, use SHA-256 ou superior.',
			},
		],
	},
	'maiusculas-e-minusculas': {
		answer:
			'O conversor de maiúsculas e minúsculas transforma um texto em MAIÚSCULAS, minúsculas, Título, frase, camelCase, PascalCase, snake_case, kebab-case ou CONSTANT_CASE. Nos formatos de código, os acentos são removidos e palavras em camelCase são separadas automaticamente.',
		faq: [
			{
				question: 'Quando usar snake_case ou camelCase?',
				answer:
					'camelCase é o padrão para variáveis em JavaScript e Java; snake_case em Python e em bancos de dados; kebab-case em URLs e classes CSS; CONSTANT_CASE para constantes.',
			},
			{
				question: 'O que acontece com os acentos?',
				answer:
					'Em MAIÚSCULAS, minúsculas, Título e frase eles são mantidos. Nos formatos de identificador (camelCase, snake_case etc.) são removidos, porque “ação” vira “acao” para funcionar em código e URLs.',
			},
		],
	},
	'formatador-de-json': {
		answer:
			'O formatador de JSON valida o texto e o reescreve indentado com 2 ou 4 espaços, ou minificado em uma linha. Se houver erro de sintaxe, ele mostra a linha e a coluna onde o problema começa.',
		faq: [
			{
				question: 'Por que meu JSON é inválido?',
				answer:
					'Os erros mais comuns são vírgula sobrando no último item, aspas simples no lugar de aspas duplas e chaves de objeto sem aspas. JSON exige aspas duplas em todas as chaves e textos.',
			},
			{
				question: 'O JSON que eu colo é enviado para algum lugar?',
				answer:
					'Não. A validação e a formatação usam o JSON.parse do seu navegador; nada sai da sua máquina.',
			},
		],
	},
	base64: {
		answer:
			'A ferramenta de Base64 codifica texto em Base64 e decodifica de volta. O texto é tratado como UTF-8, então acentos e emojis funcionam, e há a opção do alfabeto seguro para URL (Base64URL), que troca + e / por - e _ e remove o =.',
		faq: [
			{
				question: 'Base64 é criptografia?',
				answer:
					'Não. É só uma forma de representar bytes com 64 caracteres seguros para texto; qualquer pessoa decodifica sem chave.',
			},
			{
				question: 'O que é Base64URL?',
				answer:
					'É a variante usada em JWTs e URLs: troca + por -, / por _ e dispensa o preenchimento com =. A decodificação aceita os dois formatos.',
			},
		],
	},
	'codificador-de-url': {
		answer:
			'O codificador de URL aplica percent-encoding: troca espaços, acentos e caracteres reservados por sequências como %20. O modo “parte da URL” codifica tudo, para usar em parâmetros; o modo “URL completa” preserva :, /, ? e &.',
		faq: [
			{
				question: 'Qual a diferença entre encodeURI e encodeURIComponent?',
				answer:
					'encodeURIComponent codifica também &, =, ? e /, então serve para o valor de um parâmetro. encodeURI mantém esses caracteres para não quebrar um endereço completo.',
			},
			{
				question: 'Por que o + virou espaço ao decodificar?',
				answer:
					'Em formulários e query strings, o + representa espaço. Para um + literal, ele precisa estar codificado como %2B.',
			},
		],
	},
	'decodificador-de-jwt': {
		answer:
			'O decodificador de JWT separa o token em header, payload e assinatura (cada parte com uma cor), mostra o JSON de cada uma e explica as claims registradas (iss, sub, aud, exp, nbf, iat, jti) com datas legíveis e se o token está expirado. Ele também verifica a assinatura com a Web Crypto do navegador: HS256/384/512 com o segredo e RS, PS e ES (256/384/512) com a chave pública em PEM ou JWK.',
		faq: [
			{
				question: 'Como verificar a assinatura de um JWT?',
				answer:
					'Cole o token e, no campo que aparece, informe o segredo (para HS256, HS384 e HS512) ou a chave pública em PEM (BEGIN PUBLIC KEY) ou JWK (para RS, PS e ES). O resultado diz se a assinatura é válida, inválida ou não verificada.',
			},
			{
				question: 'É seguro colar um JWT e a chave aqui?',
				answer:
					'A decodificação e a verificação acontecem só no seu navegador; nada é enviado. Mesmo assim, tokens de produção dão acesso a contas enquanto valem, então prefira testar com tokens expirados ou de desenvolvimento.',
			},
			{
				question: 'O que significa "Segredo em Base64"?',
				answer:
					'Alguns sistemas geram o segredo HMAC como bytes aleatórios e o guardam em Base64. Marque a opção para que o texto seja decodificado antes de verificar; deixe desmarcada se o segredo for um texto comum.',
			},
		],
	},
	'conversor-de-bases-numericas': {
		answer:
			'O conversor de bases numéricas converte um número inteiro entre binário (base 2), octal (8), decimal (10), hexadecimal (16) e qualquer base de 2 a 36, mostrando todas de uma vez. Os cálculos usam BigInt, então números enormes saem exatos.',
		faq: [
			{
				question: 'Quanto é 255 em hexadecimal?',
				answer: '255 em decimal é FF em hexadecimal e 11111111 em binário.',
			},
			{
				question: 'Posso colar 0x, 0b ou 0o na frente?',
				answer:
					'Sim. Os prefixos 0x, 0b e 0o são ignorados, assim como espaços e sublinhados usados para separar dígitos.',
			},
		],
	},
	'regra-de-tres': {
		answer:
			'A regra de três encontra o quarto valor de uma proporção. Na direta, as grandezas crescem juntas: x = b·c / a. Na inversa, uma cresce enquanto a outra diminui, como velocidade e tempo: x = a·b / c.',
		faq: [
			{
				question: 'Como saber se a regra de três é direta ou inversa?',
				answer:
					'Pergunte se, ao dobrar uma grandeza, a outra dobra (direta) ou cai pela metade (inversa). Mais quilos custam mais (direta); mais pedreiros terminam em menos dias (inversa).',
			},
			{
				question: 'Exemplo de regra de três direta?',
				answer: 'Se 2 kg custam R$ 10, 6 kg custam 10 · 6 / 2 = R$ 30.',
			},
		],
	},
	'conversor-de-unidades': {
		answer:
			'O conversor de unidades transforma valores de 15 grandezas: comprimento, massa, temperatura, área, volume, velocidade, tempo, armazenamento e taxa de dados, energia, potência, pressão, frequência, consumo de combustível e ângulo. Digite em qualquer um dos lados e o outro acompanha; a fórmula aparece embaixo e a lista mostra o valor em todas as unidades. Os fatores seguem as definições oficiais, como 1 polegada = 2,54 cm e 1 libra = 0,45359237 kg.',
		faq: [
			{
				question: 'Como converter quilômetros por litro para litros por 100 km?',
				answer:
					'Divida 100 pelo valor: 12,5 km/L equivalem a 8 L/100 km. As duas medidas são inversas, então quanto maior o km/L, menor o L/100 km.',
			},
			{
				question: 'Qual a diferença entre GB e GiB?',
				answer:
					'GB (gigabyte) usa potências de 10: 1 GB = 1.000.000.000 bytes. GiB (gibibyte) usa potências de 2: 1 GiB = 1.073.741.824 bytes. Fabricantes de disco usam GB; muitos sistemas operacionais mostram GiB.',
			},
			{
				question: 'Quanto mede um alqueire?',
				answer:
					'Depende da região. O alqueire paulista tem 24.200 m² (2,42 hectares) e o mineiro, 48.400 m² (4,84 hectares). O conversor traz os dois.',
			},
		],
	},
	'juros-compostos': {
		answer:
			'A calculadora de juros compostos mostra quanto um valor rende com aportes mensais, mês a mês. Uma taxa anual é convertida na taxa mensal equivalente, (1 + i)^(1/12) − 1, e os aportes entram no fim de cada mês. Os valores não descontam impostos nem inflação.',
		faq: [
			{
				question: 'Qual a fórmula dos juros compostos?',
				answer:
					'Sem aportes, M = C · (1 + i)ⁿ, em que C é o capital, i a taxa por período e n o número de períodos.',
			},
			{
				question: '1% ao mês é o mesmo que 12% ao ano?',
				answer:
					'Não. 1% ao mês composto por 12 meses dá cerca de 12,68% ao ano; 12% ao ano equivalem a cerca de 0,949% ao mês.',
			},
		],
	},
	'media-mediana-e-moda': {
		answer:
			'A calculadora de estatística recebe uma lista de números e mostra média, mediana, moda, mínimo, máximo, amplitude e desvio padrão populacional e amostral. Com pesos, calcula também a média ponderada.',
		faq: [
			{
				question: 'Qual a diferença entre média e mediana?',
				answer:
					'A média soma tudo e divide pela quantidade; a mediana é o valor do meio da lista ordenada. A mediana sofre menos com valores extremos, como um salário muito alto.',
			},
			{
				question: 'E se nenhum valor se repetir?',
				answer:
					'Então a lista não tem moda (é amodal). Quando dois ou mais valores empatam na maior frequência, todos são modas.',
			},
		],
	},
	'arranjo-e-combinacao': {
		answer:
			'A calculadora de análise combinatória calcula, para n elementos tomados k a k, o arranjo simples A(n,k) = n!/(n−k)! (a ordem importa), a combinação simples C(n,k) = n!/(k!(n−k)!) (a ordem não importa), a permutação n! e o arranjo com repetição nᵏ, com números inteiros exatos.',
		faq: [
			{
				question: 'Quantos jogos possíveis tem a Mega-Sena?',
				answer: 'São C(60, 6) = 50.063.860 combinações de 6 números entre 60.',
			},
			{
				question: 'Quando usar arranjo ou combinação?',
				answer:
					'Use arranjo quando a ordem muda o resultado (pódio, senha) e combinação quando não muda (comissão, aposta de loteria).',
			},
		],
	},
	'numeros-romanos': {
		answer:
			'O conversor de números romanos transforma qualquer número inteiro positivo em algarismos romanos e algarismos romanos em números, usando I, V, X, L, C, D e M e a regra da subtração (IV, IX, XL, XC, CD, CM). Até 3.999 a escrita é a padrão; acima disso, uma barra sobre os símbolos multiplica o valor por 1.000, e cada barra a mais multiplica por mais 1.000. Formas mal escritas, como IIII, são recusadas.',
		faq: [
			{
				question: 'Como se escreve 2026 em romanos?',
				answer: '2026 é MMXXVI: MM (2000) + XX (20) + VI (6).',
			},
			{
				question: 'Como se escrevem números acima de 3.999?',
				answer:
					'Sem símbolos extras, o maior número é MMMCMXCIX (3.999). Acima disso usamos a barra superior (vinculum): o número é dividido em milhares e o restante, n = q × 1.000 + r; q ganha uma barra (× 1.000) e r vem depois, sem barra. Assim, 4.000 é IV com barra, 1.000.000 é M com barra e 1.000.000.000 é M com duas barras. Para digitar, use parênteses, cada par valendo uma barra: (IV) é 4.000. Não existe um padrão histórico único para números tão grandes; esta é a convenção usada aqui.',
			},
		],
	},
	/* ------------------------- Inspiradas no 4Devs (mais rápidas) -------------------- */
	'gerador-de-cnh': {
		answer:
			'O gerador de CNH cria números de 11 dígitos válidos para testes: 9 dígitos sorteados e 2 dígitos verificadores calculados pelo módulo 11, com o desconto que o primeiro dígito aplica ao segundo. Bases que resultariam em dígito negativo são descartadas, como no número real.',
		faq: [
			{
				question: 'A CNH gerada pertence a alguém?',
				answer:
					'Não. Ela só passa na conta dos dígitos verificadores e não existe no Detran. Use apenas para testar sistemas.',
			},
			{
				question: 'A CNH tem pontuação?',
				answer: 'Não. O número de registro da CNH é escrito com os 11 dígitos seguidos.',
			},
		],
	},
	'validador-de-cnh': {
		answer:
			'O validador de CNH confere os 2 dígitos verificadores dos 11 dígitos do número de registro: o primeiro usa pesos de 9 a 1 e o segundo pesos de 1 a 9, ambos pelo módulo 11, e rejeita sequências repetidas.',
		faq: [
			{
				question: 'CNH válida quer dizer que está ativa?',
				answer:
					'Não. A validação é matemática; para saber se a habilitação está regular, só consultando o Detran.',
			},
			{
				question: 'Onde fica o número de registro na CNH?',
				answer:
					'No campo “Nº Registro”, com 11 dígitos. Não confunda com o número do espelho ou o código de segurança.',
			},
		],
	},
	'gerador-de-pis': {
		answer:
			'O gerador de PIS/PASEP cria números de 11 dígitos válidos para testes: 10 dígitos sorteados e um dígito verificador calculado com os pesos 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 e módulo 11. O mesmo número serve como NIS e NIT.',
		faq: [
			{
				question: 'PIS, PASEP, NIS e NIT são a mesma coisa?',
				answer:
					'Têm o mesmo formato e a mesma regra de dígito. PIS é de quem trabalha no setor privado, PASEP no público, e NIS/NIT são os nomes usados pela Caixa e pelo INSS.',
			},
			{
				question: 'Posso usar o número gerado para algum benefício?',
				answer: 'Não. Ele é fictício e só passa na validação matemática.',
			},
		],
	},
	'validador-de-pis': {
		answer:
			'O validador de PIS/PASEP confere o dígito verificador: multiplica os 10 primeiros dígitos por 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, soma e calcula o resto da divisão por 11; resto menor que 2 dá dígito 0, senão o dígito é 11 menos o resto.',
		faq: [
			{
				question: 'Preciso digitar os pontos e o traço?',
				answer:
					'Não. A pontuação entra sozinha enquanto você digita, e números colados com ou sem pontuação são aceitos.',
			},
			{
				question: 'O validador consulta a Caixa?',
				answer: 'Não. A verificação é feita no seu navegador e só confere a matemática do número.',
			},
		],
	},
	'gerador-de-renavam': {
		answer:
			'O gerador de RENAVAM cria códigos de 11 dígitos válidos para testes: 10 dígitos sorteados e um dígito verificador calculado com os pesos 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, multiplicando a soma por 10 e tirando o resto por 11.',
		faq: [
			{
				question: 'O RENAVAM gerado é de um veículo real?',
				answer: 'Não. O código é fictício e não aparece em nenhuma consulta do Detran.',
			},
			{
				question: 'O RENAVAM tem 9 ou 11 dígitos?',
				answer:
					'Desde 2013 são 11. Números antigos de 9 dígitos são completados com zeros à esquerda.',
			},
		],
	},
	'validador-de-renavam': {
		answer:
			'O validador de RENAVAM confere o dígito verificador do código de 11 dígitos (números antigos de 9 dígitos recebem zeros à esquerda). O cálculo usa os pesos 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 e o módulo 11.',
		faq: [
			{
				question: 'Onde encontro o RENAVAM?',
				answer: 'No documento do veículo (CRLV), no campo “Código RENAVAM”.',
			},
			{
				question: 'Um RENAVAM válido mostra os dados do carro?',
				answer: 'Não. A ferramenta só confere o número; dados do veículo ficam no Detran.',
			},
		],
	},
	'gerador-de-titulo-de-eleitor': {
		answer:
			'O gerador de título de eleitor cria números de 12 dígitos válidos para testes: 8 dígitos sequenciais, 2 dígitos do código do estado (01 é SP, 02 é MG… 28 é exterior) e 2 dígitos verificadores pelo módulo 11, com a regra especial de SP e MG.',
		faq: [
			{
				question: 'Qual a regra especial de SP e MG?',
				answer:
					'Nos títulos emitidos em São Paulo (01) e Minas Gerais (02), quando o resto do cálculo é 0 o dígito verificador vira 1, e não 0.',
			},
			{
				question: 'O título gerado vale para votar?',
				answer: 'Não. O número é fictício e não está no cadastro da Justiça Eleitoral.',
			},
		],
	},
	'validador-de-titulo-de-eleitor': {
		answer:
			'O validador de título de eleitor confere os dois dígitos verificadores e mostra o estado de emissão, lido nos dígitos 9 e 10. O primeiro dígito usa pesos de 2 a 9 nos 8 primeiros números; o segundo usa o código do estado e o primeiro dígito.',
		faq: [
			{
				question: 'Como saber o estado pelo número do título?',
				answer:
					'O 9º e o 10º dígitos são o código da UF: 01 SP, 02 MG, 03 RJ, 04 RS, 05 BA e assim por diante até 28, que é exterior.',
			},
			{
				question: 'Título válido significa que está regular?',
				answer: 'Não. Para saber a situação eleitoral, consulte o site do TSE.',
			},
		],
	},
	'gerador-de-cartao-de-credito': {
		answer:
			'O gerador de cartão de crédito cria números de teste com o prefixo e o tamanho de cada bandeira (Visa, Mastercard, Elo, American Express, Hipercard, Diners, Discover e JCB), ou a partir de um BIN que você informa, e fecha cada número com o dígito verificador do algoritmo de Luhn. Gera até 50 de uma vez, com validade futura, vencida ou escolhida, CVV aleatório ou fixo e nome do titular, e exporta em texto, número|mês|ano|cvv, CSV ou JSON.',
		faq: [
			{
				question: 'Para que serve um cartão vencido?',
				answer:
					'Para testar se o seu formulário ou checkout recusa cartões com validade passada antes de chamar o gateway. Escolha "Vencida" em Validade: o cartão expira entre 1 e 3 anos atrás.',
			},
			{
				question: 'Qual a diferença para os cartões de teste da Stripe?',
				answer:
					'Os números gerados aqui só passam na verificação de formato. Os cartões de teste da Stripe, listados na página, são reconhecidos pelo modo de teste dela e simulam resultados: aprovado, recusado, saldo insuficiente, cartão vencido ou 3D Secure.',
			},
			{
				question: 'Dá para comprar com esse cartão?',
				answer:
					'Não. O número só passa na verificação de formato; não está ligado a nenhuma conta e é recusado em qualquer pagamento real. Serve para testar formulários e gateways em modo de teste.',
			},
			{
				question: 'Como a bandeira é definida?',
				answer:
					'Pelos primeiros dígitos (BIN): 4 é Visa, 51 a 55 e 2221 a 2720 são Mastercard, 34 e 37 são Amex, faixas como 636368 e 438935 são Elo.',
			},
		],
	},
	'validador-de-cartao-de-credito': {
		answer:
			'O validador de cartão confere o número pelo algoritmo de Luhn (módulo 10), identifica a bandeira pelos primeiros dígitos e checa o tamanho esperado: 16 dígitos na maioria das bandeiras, 15 no American Express e 14 no Diners.',
		faq: [
			{
				question: 'Como funciona o algoritmo de Luhn?',
				answer:
					'Da direita para a esquerda, dobra-se um dígito sim, outro não (subtraindo 9 quando passa de 9) e soma-se tudo. O número é válido quando a soma termina em 0.',
			},
			{
				question: 'O validador verifica se o cartão tem limite?',
				answer:
					'Não. Ele só confere o formato, no seu navegador; nenhum dado é enviado para banco ou operadora.',
			},
		],
	},
	'gerador-de-placas': {
		answer:
			'O gerador de placas cria placas no padrão Mercosul (ABC1D23) ou no antigo (ABC-1234) e converte entre os dois: na conversão oficial, o segundo número da placa antiga vira uma letra, de 0 = A até 9 = J.',
		faq: [
			{
				question: 'Como converter uma placa antiga para Mercosul?',
				answer:
					'Troque o 2º número pela letra correspondente: 0 vira A, 1 vira B… 9 vira J. ABC-1234 passa a ser ABC1C34.',
			},
			{
				question: 'Toda placa Mercosul tem uma antiga equivalente?',
				answer:
					'Só as convertidas. Placas novas podem ter no 5º caractere letras depois de J, que não têm número correspondente.',
			},
		],
	},
	'gerador-de-pessoas': {
		answer:
			'O gerador de pessoas cria pessoas fictícias completas e coerentes entre si: o CPF corresponde ao estado escolhido, a idade bate com a data de nascimento e o e-mail é formado pelo nome. Gera até 100 pessoas de uma vez, com exportação em JSON e CSV.',
		faq: [
			{
				question: 'Os dados são de pessoas reais?',
				answer:
					'Não. Nomes, documentos e endereços são combinações aleatórias; CPF e RG passam apenas na validação matemática. Use somente para testes.',
			},
			{
				question: 'O CEP corresponde à cidade?',
				answer:
					'Não necessariamente: CEP, rua e cidade são sorteados separadamente. Para endereços reais, use a busca de CEP.',
			},
		],
	},
	'letras-diferentes': {
		answer:
			'A ferramenta de letras diferentes reescreve o texto em alfabetos Unicode (negrito, itálico, cursiva, gótica, contorno, círculos, versalete, de cabeça para baixo e outros). Como são caracteres, e não fontes, o estilo continua ao colar em Instagram, WhatsApp, X ou num nick.',
		faq: [
			{
				question: 'Os acentos e o ç funcionam?',
				answer:
					'Sim. Esses alfabetos do Unicode não têm letras acentuadas prontas, então a ferramenta estiliza a letra base e coloca o acento por cima como um sinal combinante: “ação” sai com o til e a cedilha no estilo escolhido. Em fontes antigas, o acento pode aparecer um pouco deslocado.',
			},
			{
				question: 'Leitores de tela leem essas letras?',
				answer:
					'Mal. Muitos leem cada símbolo pelo nome técnico; evite usar em textos importantes ou longos.',
			},
		],
	},
	'ordem-alfabetica': {
		answer:
			'A ferramenta de ordem alfabética ordena linhas como um dicionário brasileiro: ignora maiúsculas e acentos se você quiser (Árvore fica junto de abacate), usa ordem natural para números (item 2 antes de item 10) e também remove duplicadas, ordena por tamanho ou embaralha.',
		faq: [
			{
				question: 'Por que “item 10” vinha antes de “item 2”?',
				answer:
					'Na ordem de texto pura, compara-se caractere por caractere e “1” vem antes de “2”. A ordem natural lê os números inteiros, então 2 vem antes de 10.',
			},
			{
				question: 'Como remover linhas repetidas?',
				answer:
					'Marque “Remover duplicadas”. Com “Ignorar maiúsculas e acentos”, “Ação” e “acao” contam como a mesma linha.',
			},
		],
	},
	'frequencia-de-palavras': {
		answer:
			'A ferramenta de frequência de palavras conta quantas vezes cada palavra aparece em um texto e mostra a porcentagem de cada uma, das mais para as menos frequentes. Pode ignorar palavras comuns como “de”, “a” e “que” e palavras curtas.',
		faq: [
			{
				question: 'Para que serve contar a frequência de palavras?',
				answer:
					'Para revisar repetições num texto, encontrar os termos principais de um conteúdo (SEO) ou analisar respostas abertas de pesquisa.',
			},
			{
				question: 'Maiúsculas contam como palavras diferentes?',
				answer: 'Não. “Brasil” e “brasil” são contadas juntas.',
			},
		],
	},
	'texto-para-html': {
		answer:
			'A ferramenta de texto para HTML troca &, <, >, aspas e apóstrofo pelas entidades HTML, transforma linhas em branco em parágrafos <p> e quebras simples em <br>, e pode converter URLs em links. No sentido inverso, decodifica entidades como &amp;ccedil; de volta para texto.',
		faq: [
			{
				question: 'Por que escapar o texto antes de colar no HTML?',
				answer:
					'Um < solto é lido como o início de uma tag e pode quebrar a página ou abrir brecha para injeção de código. Escapado, ele aparece como texto.',
			},
			{
				question: 'Quais entidades são decodificadas?',
				answer:
					'Todas as numéricas (&#65; e &#x41;) e as nomeadas mais comuns em português, como &aacute;, &ccedil;, &atilde;, &nbsp; e &amp;.',
			},
		],
	},
	'informacoes-de-caractere': {
		answer:
			'A ferramenta de informações de caractere mostra, para cada caractere digitado, o código Unicode (U+…), o tipo (letra, dígito, emoji…), os bytes em UTF-8 e as formas de escrevê-lo em HTML e em JavaScript.',
		faq: [
			{
				question: 'Por que um emoji ocupa 4 bytes?',
				answer:
					'Em UTF-8, caracteres fora do plano básico do Unicode, como a maioria dos emojis, usam 4 bytes; em JavaScript eles ocupam duas unidades (um par substituto).',
			},
			{
				question: 'Como escrever um caractere especial no HTML?',
				answer:
					'Use a forma da coluna HTML, como &#xE7; para ç; ela funciona em qualquer página, independente da codificação do arquivo.',
			},
		],
	},
	'numero-por-extenso': {
		answer:
			'A ferramenta de número por extenso escreve números e valores em reais por extenso, seguindo o uso brasileiro: “mil” sem “um”, o “e” entre os grupos (mil e duzentos, mil duzentos e cinquenta) e “de reais” depois de milhão e bilhão redondos.',
		faq: [
			{
				question: 'Como escrever R$ 1.250,00 por extenso?',
				answer: 'Mil duzentos e cinquenta reais.',
			},
			{
				question: 'Como fica 1 milhão de reais por extenso?',
				answer:
					'Um milhão de reais. Com centavos, por exemplo R$ 2.000.000,50: dois milhões de reais e cinquenta centavos.',
			},
		],
	},
	'limpar-texto': {
		answer:
			'A ferramenta de limpar texto remove acentos (ação vira acao), troca ou remove quebras de linha, junta espaços repetidos, tira espaços das pontas e apaga linhas vazias, tudo em uma passada e no seu navegador.',
		faq: [
			{
				question: 'Para que remover acentos?',
				answer:
					'Para gerar nomes de arquivo, URLs, logins ou buscas que não aceitam caracteres acentuados.',
			},
			{
				question: 'Como transformar um texto quebrado do PDF em um parágrafo?',
				answer:
					'Em “Quebras de linha”, escolha “Trocar por espaço” e mantenha “Juntar espaços repetidos” marcado.',
			},
		],
	},
	'tabela-ascii': {
		answer:
			'A tabela ASCII lista os 128 caracteres ASCII (0 a 127) e a extensão Latin-1 (128 a 255), que inclui á, ç, ã e os demais acentos do português, com o código em decimal, hexadecimal, octal e binário e a entidade HTML de cada um.',
		faq: [
			{
				question: 'Qual o código ASCII da letra A?',
				answer: '65 em decimal, 41 em hexadecimal e 01000001 em binário. A letra a minúscula é 97.',
			},
			{
				question: 'O ç faz parte do ASCII?',
				answer:
					'Não. O ASCII vai só até 127; o ç (231) vem da extensão Latin-1, também usada no começo do Unicode.',
			},
		],
	},
	'conversor-de-cores': {
		answer:
			'O conversor de cores lê uma cor em HEX, RGB ou HSL e mostra a mesma cor em HEX, RGB, HSL, OKLCH e CMYK, além do contraste (WCAG) de texto branco e preto sobre ela, com o nível AA ou AAA atingido.',
		faq: [
			{
				question: 'Qual contraste é recomendado para texto?',
				answer:
					'Pelo WCAG, pelo menos 4,5:1 para texto normal (nível AA) e 7:1 para o nível AAA. Texto grande precisa de 3:1.',
			},
			{
				question: 'O CMYK é exato para impressão?',
				answer:
					'Não. É uma conversão matemática aproximada; a cor impressa depende do perfil de cor da gráfica.',
			},
		],
	},
	'gerador-de-numeros-aleatorios': {
		answer:
			'O gerador de números aleatórios sorteia números inteiros em um intervalo, com ou sem repetição, usando o gerador criptográfico do navegador. Sem repetição, cada número tem a mesma chance e nenhum sai duas vezes, como num sorteio de rifa.',
		faq: [
			{
				question: 'Como sortear números da Mega-Sena?',
				answer: 'Use de 1 a 60, quantidade 6 e marque “Sem repetir números”.',
			},
			{
				question: 'O sorteio é realmente aleatório?',
				answer:
					'Sim. Os números vêm do crypto.getRandomValues, o gerador criptográfico do navegador, e não do Math.random.',
			},
		],
	},
	'gerador-de-lorem-ipsum': {
		answer:
			'O gerador de Lorem Ipsum cria texto fictício em latim em parágrafos, frases ou palavras, para preencher layouts e protótipos. Pode começar com o tradicional “Lorem ipsum dolor sit amet”.',
		faq: [
			{
				question: 'O que significa Lorem Ipsum?',
				answer:
					'É um trecho embaralhado de um texto de Cícero, do século I a.C., usado como texto de preenchimento desde o século XVI.',
			},
			{
				question: 'Por que usar texto em latim e não em português?',
				answer: 'Porque ninguém para para ler: o olhar avalia o desenho da página, não o conteúdo.',
			},
		],
	},
	'gerador-de-qr-code': {
		answer:
			'O gerador de QR Code transforma um link ou texto em QR Code no próprio navegador, com o nível de correção de erros e as cores que você escolher, e baixa em SVG (vetor, para impressão) ou PNG. Para QR Code de PIX, Wi-Fi, WhatsApp ou com logo e moldura, a página leva ao gerador completo.',
		faq: [
			{
				question: 'Qual nível de correção de erros escolher?',
				answer:
					'Média (15%) atende a maioria dos casos. Use alta ou máxima se o código for impresso em superfícies que sujam ou se for colocar um logo por cima.',
			},
			{
				question: 'O QR Code expira?',
				answer:
					'Não. Ele guarda o conteúdo em si, sem passar por nenhum servidor; funciona enquanto o link de destino existir.',
			},
		],
	},
	'cotacao-de-moedas': {
		answer:
			'A cotação de moedas mostra o dólar, o euro, a libra, o bitcoin e outras moedas em reais, quase em tempo real, e converte valores entre qualquer par. Os preços vêm da AwesomeAPI, consultada direto do seu navegador e atualizada a cada minuto. Pares sem o real, como dólar para euro, são cruzados pelo real: o valor do dólar em reais dividido pelo do euro em reais.',
		faq: [
			{
				question: 'Por que o banco cobra mais caro que esta cotação?',
				answer:
					'Esta é a cotação comercial de referência, usada entre instituições. Bancos e casas de câmbio somam o spread (a margem deles) e, em compras no exterior, o IOF. Para dinheiro em espécie, o dólar turismo é a referência mais próxima.',
			},
			{
				question: 'Por que a cotação não muda no fim de semana?',
				answer:
					'O mercado de câmbio só funciona em dias úteis. Fora do horário, a ferramenta mostra a última cotação antes do fechamento e avisa que o mercado está fechado. Criptomoedas, como bitcoin e ethereum, são negociadas o tempo todo e seguem mudando.',
			},
			{
				question: 'O que é a variação do dia?',
				answer:
					'É quanto a cotação subiu ou caiu desde o fechamento anterior, em porcentagem. Num par cruzado, como euro para dólar, ela é calculada a partir da variação de cada moeda contra o real.',
			},
		],
	},
	'consulta-de-bancos': {
		answer:
			'A consulta de bancos lista o código de compensação (COMPE) e o ISPB das instituições financeiras do Brasil, com busca por número ou nome. A lista vem da BrasilAPI, que reúne os dados do Banco Central.',
		faq: [
			{ question: 'Qual o código do banco Itaú?', answer: 'O Itaú Unibanco usa o código 341.' },
			{
				question: 'Para que serve o ISPB?',
				answer:
					'É o identificador do banco no Sistema de Pagamentos Brasileiro, usado em transferências PIX entre instituições.',
			},
		],
	},
	'gerador-de-jwt': {
		answer:
			'O gerador de JWT monta o token a partir do header e do payload em JSON e o assina no navegador com a Web Crypto: HS256, HS384 e HS512 com um segredo (texto ou Base64), e RS, PS e ES (256/384/512) com uma chave privada PKCS#8 em PEM ou JWK. O campo alg do header acompanha o algoritmo escolhido e o token sai colorido por parte.',
		faq: [
			{
				question: 'Como adicionar a data de expiração?',
				answer:
					'Use os botões "iat = agora" e "exp = daqui a 1 hora" ou "1 dia": eles gravam o horário Unix em segundos no payload. Você também pode editar os números à mão.',
			},
			{
				question: 'Não tenho uma chave RSA ou EC. Como testar?',
				answer:
					'Clique em "Gerar par de chaves": o navegador cria uma chave privada (PKCS#8) para assinar e mostra a chave pública (SPKI) para verificar no decodificador. São chaves só para testes.',
			},
		],
	},
	'testador-de-regex': {
		answer:
			'O testador de regex roda a expressão regular do JavaScript sobre o seu texto enquanto você digita, destaca cada correspondência e lista a posição, o trecho e os grupos de captura, inclusive os nomeados. As flags g, i, m, s, u e y são caixas de seleção e há uma prévia da substituição com $1, $<nome> e $&.',
		faq: [
			{
				question: 'Por que só aparece uma correspondência?',
				answer:
					'Sem a flag g (global) o JavaScript para na primeira ocorrência. Marque g para listar todas e para substituir todas.',
			},
			{
				question: 'Como uso um grupo nomeado na substituição?',
				answer:
					'Crie o grupo com (?<nome>…) e use $<nome> no campo de substituição; grupos numerados usam $1, $2 e assim por diante.',
			},
		],
	},
	'comparador-de-textos': {
		answer:
			'O comparador de textos mostra as diferenças entre um texto original e um modificado por linhas, palavras ou caracteres, lado a lado ou em visualização unificada, com a contagem do que foi adicionado e removido. Pode ignorar espaços e diferenças entre maiúsculas e minúsculas, e tudo roda no navegador.',
		faq: [
			{
				question: 'Como identificar o que mudou sem depender das cores?',
				answer:
					'Linhas removidas levam o sinal − e as adicionadas o sinal +. Nas comparações por palavra ou caractere, o texto removido aparece riscado e o adicionado sublinhado.',
			},
			{
				question: 'Qual modo de comparação escolher?',
				answer:
					'Use linhas para código e listas, palavras para textos corridos e caracteres para achar uma letra ou pontuação trocada.',
			},
		],
	},
	'avaliador-de-jsonpath': {
		answer:
			'O avaliador de JSONPath executa uma expressão como $.loja.livros[*].autor sobre o seu JSON e lista cada resultado com o caminho exato onde foi encontrado. Suporta busca recursiva (..), curingas, fatias de arrays e filtros como [?(@.preco < 35)], com exemplos prontos para clicar.',
		faq: [
			{
				question: 'Qual a diferença entre $.a e $..a?',
				answer:
					'$.a pega só a chave a na raiz; $..a procura a chave a em qualquer nível do documento.',
			},
			{
				question: 'Como filtrar itens de uma lista?',
				answer:
					'Use um filtro com @ representando cada item, por exemplo $.livros[?(@.preco < 35)] ou $.livros[?(@.isbn)] para os que têm a chave isbn.',
			},
		],
	},
	'testador-de-xpath': {
		answer:
			'O testador de XPath avalia a expressão sobre um XML ou HTML com o próprio motor do navegador e mostra o resultado: a lista de nós (elementos, atributos ou textos) ou um número, texto ou booleano, para funções como count(), sum() e boolean(). Erros no documento ou na expressão aparecem com a explicação.',
		faq: [
			{
				question: 'Por que minha expressão não encontra nada em um XML com xmlns?',
				answer:
					'Com um namespace padrão, os elementos não têm prefixo no XPath 1.0. Use local-name(), por exemplo //*[local-name()="item"], ou declare um prefixo no elemento raiz e use-o na expressão.',
			},
			{
				question: 'Como pegar o valor de um atributo?',
				answer:
					'Use @ seguido do nome, por exemplo //livro/@id, ou string(//livro[1]/@id) para receber só o texto.',
			},
		],
	},
	'conversor-de-timestamp': {
		answer:
			'O conversor de timestamp transforma um horário Unix em data e mostra o resultado em UTC, no seu fuso, em ISO 8601, em RFC 2822 e em tempo relativo (como "há 3 dias"). Ele detecta se o número está em segundos ou milissegundos e também converte uma data e hora em timestamp.',
		faq: [
			{
				question: 'Como saber se o timestamp está em segundos ou milissegundos?',
				answer:
					'Timestamps atuais em segundos têm 10 dígitos (ex.: 1700000000) e em milissegundos têm 13. O modo Detectar decide pelo tamanho; você pode escolher a unidade se preferir.',
			},
			{
				question: 'O que é o timestamp Unix?',
				answer:
					'É a quantidade de segundos desde 1º de janeiro de 1970 à meia-noite em UTC. Por não depender de fuso horário, é usado por sistemas e bancos de dados para guardar datas.',
			},
		],
	},
	'descritor-de-cron': {
		answer:
			'O descritor de cron traduz uma expressão como 30 8 * * 1-5 para português ("Às 08:30, de segunda-feira a sexta-feira"), explica cada campo separadamente e lista as próximas 10 execuções no seu fuso horário. Aceita 5 campos, 6 com segundos e atalhos como @daily.',
		faq: [
			{
				question: 'Qual a ordem dos campos do cron?',
				answer:
					'Minuto (0–59), hora (0–23), dia do mês (1–31), mês (1–12) e dia da semana (0–7, em que 0 e 7 são domingo). Com 6 campos, o primeiro são os segundos.',
			},
			{
				question: 'O que significa */15?',
				answer:
					'A barra indica intervalo: */15 no campo de minutos quer dizer a cada 15 minutos (0, 15, 30 e 45).',
			},
		],
	},
	'separador-de-url': {
		answer:
			'O separador de URL divide um endereço em protocolo, usuário, senha, host, porta, caminho, parâmetros da query e fragmento, com os valores já decodificados. Os parâmetros ficam numa tabela editável: altere, adicione ou remova e a URL é montada de novo, pronta para copiar.',
		faq: [
			{
				question: 'Por que a porta aparece como padrão?',
				answer:
					'Quando a URL não escreve a porta, o navegador usa a do protocolo: 443 para https e 80 para http.',
			},
			{
				question: 'Os valores com acentos e espaços são codificados de novo?',
				answer:
					'Sim. Na tabela você edita o valor legível e, ao montar a URL, caracteres especiais voltam a ser codificados (espaço vira +, ã vira %C3%A3).',
			},
		],
	},
	'testador-de-api-rest': {
		answer:
			'O testador de API REST envia a requisição com fetch() direto do seu navegador, com método, cabeçalhos e corpo em JSON, texto ou formulário, e mostra status, tempo, tamanho, cabeçalhos e o corpo formatado. Ele também gera o comando curl equivalente.',
		faq: [
			{
				question: 'Por que aparece erro de CORS?',
				answer:
					'O navegador só entrega a resposta se a API permitir chamadas de outros sites com o cabeçalho Access-Control-Allow-Origin. Se a API não permitir, a chamada falha aqui mesmo funcionando no curl ou no Postman. Use “Copiar como curl” para testar no terminal.',
			},
			{
				question: 'Meus tokens passam por algum servidor do 4People?',
				answer:
					'Não. A requisição sai do seu navegador direto para a API informada; nada passa por um servidor intermediário.',
			},
			{
				question: 'Por que alguns cabeçalhos não são enviados?',
				answer:
					'O navegador proíbe definir cabeçalhos como Cookie, Host, Origin e Content-Length em fetch(). A ferramenta avisa quais foram ignorados.',
			},
		],
	},
	'gerador-de-json': {
		answer:
			'O gerador de JSON preenche um modelo com dados fictícios: troque os valores por marcadores como {{nome}}, {{email}}, {{cpf}}, {{inteiro(1, 100)}} ou {{data}} e gere de 1 a 100 itens. Também dá para montar o modelo por uma lista de campos.',
		faq: [
			{
				question: 'Como gerar uma lista dentro do objeto?',
				answer:
					'Use uma lista cujo primeiro item é {{repetir(n)}} e o segundo é o modelo: ["{{repetir(3)}}", { "id": "{{indice}}" }] gera três itens. {{repetir(2, 5)}} sorteia a quantidade.',
			},
			{
				question: 'Os CPFs e CNPJs gerados são válidos?',
				answer:
					'Sim, têm dígitos verificadores corretos, mas são fictícios: servem para testes, não pertencem a pessoas ou empresas reais.',
			},
			{
				question: 'O número sai como texto ou como número?',
				answer:
					'Um marcador sozinho no valor, como "{{inteiro(1, 10)}}", vira número (ou true/false no caso de {{booleano}}). Dentro de um texto maior, ele é inserido como texto.',
			},
		],
	},
	'codificador-de-html': {
		answer:
			'O codificador de HTML troca caracteres por entidades nomeadas (&eacute;), decimais (&#233;) ou hexadecimais (&#xE9;), só os especiais & < > " \' ou tudo fora do ASCII, e faz o caminho inverso. O resultado atualiza enquanto você digita.',
		faq: [
			{
				question: 'Qual a diferença para o Texto para HTML?',
				answer:
					'O Texto para HTML transforma um texto em HTML com parágrafos e links. O codificador só converte caracteres em entidades e de volta, sem criar tags.',
			},
			{
				question: 'Quando preciso codificar acentos?',
				answer:
					'Em páginas UTF-8 não precisa: basta codificar & < > e as aspas. Codificar tudo fora do ASCII ajuda quando o texto vai para um sistema antigo ou de codificação desconhecida.',
			},
		],
	},
	'escape-de-string': {
		answer:
			'O escape de string prepara um texto para ficar dentro das aspas em JavaScript, JSON, Java, C#, Python ou SQL, ou como palavra entre aspas simples no shell, e escapa os caracteres especiais de expressões regulares. O caminho inverso interpreta \\n, \\t, \\uXXXX e afins.',
		faq: [
			{
				question: 'Como escapar aspas simples no SQL?',
				answer:
					"Dobre a aspa: O'Brien vira O''Brien. Para valores vindos de usuários, prefira consultas parametrizadas em vez de montar o SQL com texto.",
			},
			{
				question: 'Como colocar aspas simples num comando de shell?',
				answer:
					"Dentro de aspas simples nada é interpretado, nem a barra. Feche, insira \\' e reabra: it's vira 'it'\\''s'.",
			},
		],
	},
	'visualizador-de-svg': {
		answer:
			'O visualizador de SVG mostra o desenho como imagem, sem executar scripts, e informa width, height, viewBox e tamanho em bytes. Ele minifica o código e baixa em SVG ou em PNG nas escalas 1×, 2× e 4×.',
		faq: [
			{
				question: 'É seguro abrir um SVG desconhecido aqui?',
				answer:
					'Sim. A prévia usa uma tag <img>, que nunca executa scripts do SVG, e a ferramenta avisa quando o arquivo contém <script> ou atributos como onload.',
			},
			{
				question: 'Por que meu SVG não aparece?',
				answer:
					'Geralmente falta xmlns="http://www.w3.org/2000/svg" (a ferramenta adiciona sozinha) ou o XML está mal formado, com tags sem fechar ou atributos sem aspas.',
			},
		],
	},
	'json-para-yaml': {
		answer:
			'O conversor lê o JSON com o JSON.parse do navegador e o reescreve em YAML com 2 ou 4 espaços de indentação, a cada tecla. Se o JSON for inválido, ele mostra a linha e a coluna do erro e destaca o trecho.',
		faq: [
			{
				question: 'Por que alguns textos aparecem entre aspas no YAML?',
				answer:
					'Textos que seriam lidos como outro tipo ou que têm caracteres especiais, como "x: y", "true" ou "123", ficam entre aspas para continuarem sendo texto quando o YAML for lido de volta.',
			},
			{
				question: 'O JSON que eu colo é enviado para algum servidor?',
				answer: 'Não. A conversão acontece inteira no seu navegador; nada sai da sua máquina.',
			},
		],
	},
	'yaml-para-json': {
		answer:
			'O conversor lê o YAML com a biblioteca js-yaml e gera JSON com 2 ou 4 espaços, tab ou minificado. Um arquivo com vários documentos separados por --- vira uma lista JSON, e erros de sintaxe aparecem com linha e coluna.',
		faq: [
			{
				question: 'O que acontece com vários documentos separados por ---?',
				answer:
					'Cada documento vira um item de uma lista JSON, na mesma ordem. Com um documento só, o resultado é o próprio objeto.',
			},
			{
				question: 'Os comentários do YAML vão para o JSON?',
				answer:
					'Não. JSON não tem comentários, então as linhas iniciadas por # são descartadas na conversão.',
			},
		],
	},
	'xml-para-json': {
		answer:
			'O conversor valida o XML e o transforma em JSON com a biblioteca fast-xml-parser. Atributos podem ser mantidos com um prefixo (por padrão @_), elementos repetidos viram listas e números e booleanos podem ser convertidos.',
		faq: [
			{
				question: 'Como os atributos aparecem no JSON?',
				answer:
					'Como chaves com o prefixo escolhido ao lado dos elementos filhos, por exemplo id="1" vira "@_id": 1. Desmarque "Manter atributos" para descartá-los.',
			},
			{
				question: 'Quando aparece a chave #text?',
				answer:
					'Quando um elemento tem texto e também atributos ou filhos: o texto fica na chave do nó de texto, cujo nome você pode trocar.',
			},
		],
	},
	'json-para-xml': {
		answer:
			'O conversor gera XML a partir de JSON: cada chave vira um elemento, listas repetem o elemento e chaves com o prefixo de atributo (por padrão @_) viram atributos. Você escolhe o elemento raiz, a indentação e se inclui a declaração <?xml?>.',
		faq: [
			{
				question: 'O que acontece com chaves que não são nomes válidos em XML?',
				answer:
					'Caracteres inválidos viram "_" e nomes que começam com número ganham um "_" na frente, por exemplo "1º lugar" vira "_1__lugar".',
			},
			{
				question: 'Preciso de um elemento raiz?',
				answer:
					'XML só pode ter uma raiz. Deixe o campo vazio apenas se o JSON já for um objeto com uma única chave; caso contrário, informe um nome como root.',
			},
		],
	},
	'ini-para-json': {
		answer:
			'O conversor lê arquivos INI com seções [nome] e subseções [pai.filho], pares chave = valor ou chave: valor e comentários com ; ou #, e gera JSON. Chaves repetidas ou terminadas em [] viram listas, e números e booleanos podem ser convertidos.',
		faq: [
			{
				question: 'Como colocar ; ou # dentro de um valor?',
				answer:
					'Coloque o valor entre aspas, por exemplo senha = "abc;123". Sem aspas, um ; ou # depois de um espaço inicia um comentário.',
			},
			{
				question: 'O que acontece com uma chave repetida na mesma seção?',
				answer:
					'Todos os valores são mantidos, em ordem, numa lista, em vez de o último sobrescrever os anteriores.',
			},
		],
	},
	'ini-para-yaml': {
		answer:
			'O conversor lê arquivos INI com seções, subseções [pai.filho], comentários com ; ou # e valores entre aspas, e gera YAML com 2 ou 4 espaços. Chaves repetidas viram listas e erros mostram a linha do problema.',
		faq: [
			{
				question: 'Uma chave sem valor é aceita?',
				answer:
					'Sim. Uma linha só com o nome da chave, como skip-networking, vira true, como nos arquivos de configuração do MySQL.',
			},
			{
				question: 'Os comentários do INI vão para o YAML?',
				answer: 'Não. Os comentários são ignorados na leitura e o YAML gerado tem só os dados.',
			},
		],
	},
	'csv-para-sql': {
		answer:
			'O conversor lê o CSV (separador detectado entre vírgula, ponto e vírgula, tab e barra vertical, com aspas no padrão RFC 4180) e gera um CREATE TABLE com tipos inferidos e INSERTs em lotes. Os nomes e valores são escritos no formato do MySQL, PostgreSQL, SQLite ou SQL Server.',
		faq: [
			{
				question: 'Como os tipos das colunas são escolhidos?',
				answer:
					'Pelo conteúdo de todas as linhas: só inteiros vira INTEGER (ou BIGINT), números com ponto vira DECIMAL, true/false vira BOOLEAN, datas AAAA-MM-DD ou DD/MM/AAAA viram DATE e o resto vira VARCHAR com o maior tamanho encontrado. Células vazias viram NULL.',
			},
			{
				question: 'Para que serve "Linhas por INSERT"?',
				answer:
					'Agrupa várias linhas em um único INSERT, o que é bem mais rápido de importar. No SQL Server o limite é de 1.000 linhas por comando, e a ferramenta respeita isso.',
			},
		],
	},
	'imagem-para-data-uri': {
		answer:
			'A ferramenta lê o arquivo no navegador e gera o data URI em Base64 (data:tipo;base64,…), com prévia, dimensões e os trechos prontos para CSS, HTML <img> e Markdown. O Base64 deixa o conteúdo cerca de 33% maior que o arquivo original.',
		faq: [
			{
				question: 'Quando vale a pena usar data URI?',
				answer:
					'Para ícones e imagens pequenas (poucos KB) que você quer embutir no HTML, CSS ou e-mail sem uma requisição extra. Para imagens grandes, um arquivo comum é melhor porque fica em cache separado.',
			},
			{
				question: 'Meu arquivo é enviado para algum servidor?',
				answer: 'Não. O arquivo é lido pelo próprio navegador e nada é enviado.',
			},
		],
	},
	'data-uri-para-imagem': {
		answer:
			'A ferramenta valida o data URI, mostra o tipo MIME, o tamanho, as dimensões e a prévia da imagem e permite baixar o arquivo com a extensão certa. Aceita dados em Base64 ou texto codificado para URL e também url("data:…") copiado do CSS.',
		faq: [
			{
				question: 'Por que meu data URI é inválido?',
				answer:
					'Ele precisa começar com data:, ter uma vírgula antes dos dados e, se tiver ;base64, conter só letras, números, +, / e = no final. Quebras de linha e espaços são ignorados.',
			},
			{
				question: 'Funciona com arquivos que não são imagens?',
				answer:
					'Sim. Qualquer tipo é decodificado e pode ser baixado; a prévia aparece apenas para imagens.',
			},
		],
	},
	'calculadora-de-sub-rede-ipv4': {
		answer:
			'Digite um IPv4 com prefixo (192.168.1.10/24) ou com máscara e veja na hora o endereço de rede, o broadcast, o primeiro e o último host, a quantidade de hosts utilizáveis, a máscara, a wildcard e a visão em binário. A ferramenta também indica a classe e se o endereço é privado, público ou de uso especial, e divide a rede em N sub-redes ou por número de hosts.',
		faq: [
			{
				question: 'Quantos hosts cabem em uma /24?',
				answer:
					'Uma /24 tem 256 endereços, dos quais 254 são utilizáveis: o primeiro é o endereço de rede e o último é o broadcast.',
			},
			{
				question: 'Como funcionam as redes /31 e /32?',
				answer:
					'Uma /31 é usada em enlaces ponto a ponto (RFC 3021) e os dois endereços são hosts. Uma /32 representa um único host. Na divisão por hosts, a ferramenta planeja até /30, reservando rede e broadcast.',
			},
			{
				question: 'O que é a máscara wildcard?',
				answer:
					'É a máscara invertida (255.255.255.0 vira 0.0.0.255), usada em ACLs de roteadores e no OSPF para indicar quais bits podem variar.',
			},
		],
	},
	'calculadora-de-sub-rede-ipv6': {
		answer:
			'Informe um endereço IPv6 e o prefixo (2001:db8::1/48) para ver a rede, o primeiro e o último endereço, o total exato de endereços (calculado com inteiros de 128 bits), as formas compactada e expandida, o tipo do endereço e os nomes de DNS reverso em ip6.arpa. Também lista as primeiras sub-redes ao dividir o prefixo em um prefixo maior, como /64.',
		faq: [
			{
				question: 'Quantos endereços tem uma /64?',
				answer:
					'2^64, ou 18.446.744.073.709.551.616 endereços. Uma /48 comporta 65.536 sub-redes /64.',
			},
			{
				question: 'Quais tipos de endereço a ferramenta reconhece?',
				answer:
					'Global unicast, unique local (ULA, fc00::/7), link-local (fe80::/10), multicast (ff00::/8), loopback, não especificado, IPv4 mapeado, NAT64, Teredo, 6to4 e o bloco de documentação 2001:db8::/32.',
			},
			{
				question: 'Como é calculada a zona reversa?',
				answer:
					'Cada dígito hexadecimal (nibble) do prefixo vira um rótulo, em ordem inversa, sob ip6.arpa. Prefixos que não são múltiplos de 4 usam a zona do nibble inteiro anterior.',
			},
		],
	},
	'calculadora-de-sla': {
		answer:
			'Digite a disponibilidade (como 99,95%) para ver o tempo fora do ar permitido por dia, semana, mês, trimestre e ano, ou informe o tempo fora do ar para obter a disponibilidade. A página traz uma tabela com os SLAs mais comuns e calcula o SLA composto de serviços em série ou em paralelo. O cálculo usa ano de 365,25 dias e mês de 1/12 do ano.',
		faq: [
			{
				question: 'Quanto tempo fora do ar permite um SLA de 99,9%?',
				answer:
					'Cerca de 1 minuto e 26 segundos por dia, 43 minutos e 50 segundos por mês e 8 horas e 46 minutos por ano.',
			},
			{
				question: 'Como se calcula o SLA de serviços em série?',
				answer:
					'Multiplicando as disponibilidades: dois serviços de 99,9% em série resultam em 99,8001%. Em paralelo (redundantes), a indisponibilidade é que se multiplica: dois de 99% resultam em 99,99%.',
			},
		],
	},
	'calculadora-de-tempo-de-download': {
		answer:
			'Informe o tamanho do arquivo (em B, kB, MB, GB, TB ou nas unidades binárias KiB, MiB, GiB, TiB) e a velocidade da conexão para ver o tempo de download em h:mm:ss, já descontada a perda por overhead. Uma tabela mostra o mesmo arquivo em velocidades comuns, de 10 Mbps a 10 Gbps.',
		faq: [
			{
				question: 'Por que 100 Mbps não baixam 100 MB por segundo?',
				answer:
					'Velocidades de internet são medidas em bits e arquivos em bytes, e 1 byte tem 8 bits: 100 Mbps equivalem a 12,5 MB/s no máximo teórico.',
			},
			{
				question: 'O que é o overhead?',
				answer:
					'É a parte da conexão gasta com cabeçalhos de protocolo, retransmissões e Wi-Fi. Cerca de 10% é uma estimativa comum; use 0 para o máximo teórico.',
			},
		],
	},
	'conversor-de-unidades-de-dados': {
		answer:
			'Digite um valor e uma unidade para vê-lo convertido em todas as outras de uma vez: bits, bytes decimais do SI (kB, MB, GB, TB, PB, base 1000) e bytes binários da IEC (KiB, MiB, GiB, TiB, PiB, base 1024). Também converte taxas de transferência, como Mbps, MB/s e MiB/s.',
		faq: [
			{
				question: 'Qual a diferença entre GB e GiB?',
				answer:
					'1 GB tem 1.000.000.000 bytes (base 1000) e 1 GiB tem 1.073.741.824 bytes (base 1024). O Windows mostra GiB com o nome GB, por isso um disco de 1 TB aparece com cerca de 931 GB.',
			},
			{
				question: 'Como converter Mbps em MB/s?',
				answer: 'Divida por 8, porque 1 byte tem 8 bits: 100 Mbps = 12,5 MB/s.',
			},
		],
	},
}

/** Site-wide questions shown on the home page (and in its FAQPage JSON-LD). */
export const SITE_FAQ: Faq[] = [
	{
		question: 'Os documentos gerados são reais?',
		answer:
			'Não. CPFs, CNPJs e RGs gerados passam apenas na validação matemática dos dígitos verificadores. Não pertencem a ninguém e servem só para testar software.',
	},
	{
		question: 'O que eu digito sai do meu navegador?',
		answer:
			'Não. Todos os cálculos rodam no seu navegador. As únicas consultas externas são a busca de CEP, que pergunta à BrasilAPI, e o Meu IP, que pergunta ao ipify.',
	},
	{
		question: 'Preciso criar conta ou pagar?',
		answer: `Não. Todas as ${TOOLS.length} ferramentas são gratuitas e funcionam sem cadastro.`,
	},
	{
		question: 'Funciona no celular?',
		answer:
			'Sim. Todas as ferramentas foram feitas para funcionar no celular, com campos e botões do tamanho do polegar.',
	},
	{
		question: 'Posso ver como cada cálculo é feito?',
		answer:
			'Sim. Cada ferramenta explica a fórmula na própria página, e o código-fonte completo está aberto no GitHub sob a licença GPL-3.0.',
	},
	{
		question: 'Quem faz o 4People?',
		answer:
			'Lucas Bittencourt, que criou o projeto em 2019 com colegas da Etec de Guaratinguetá. Hoje ele é mantido como código aberto.',
	},
]
