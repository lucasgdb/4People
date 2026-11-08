import type { SectionContent } from './types.ts'

const UPDATED_AT = '2026-11-08'

export const content: SectionContent = {
	intro: [
		'Os validadores conferem se um número de documento brasileiro está bem formado: CPF, CNPJ (numérico e alfanumérico), RG no padrão de São Paulo, CNH, PIS/PASEP, RENAVAM e título de eleitor, além de números de cartão de crédito. Quase todos esses documentos terminam em um ou dois dígitos verificadores, calculados a partir dos outros números por uma regra fixa, em geral o módulo 11. Basta um dígito trocado na digitação para a conta não fechar, e é isso que a validação detecta.',
		'Use o validador correspondente ao documento que você tem em mãos: CPF para pessoas físicas, CNPJ para empresas, RENAVAM para veículos, PIS para o cadastro do trabalhador, título de eleitor para descobrir também a UF de emissão. Para cartões, o teste é o algoritmo de Luhn, que confere o número e identifica a bandeira. Todos aceitam o número com ou sem pontuação, e a conta é feita no próprio navegador, sem enviar nada a servidor algum.',
		'Um cuidado importante: número válido não quer dizer documento existente ou regular. A validação é só matemática; ela não consulta Receita Federal, Detran, TSE, Caixa nem banco. Para saber se um CPF está ativo, se uma empresa está aberta ou se uma CNH está suspensa, é preciso consultar o órgão responsável.',
	],
	tools: {
		'validador-de-cpf': {
			title: 'Validador de CPF com região fiscal',
			metaDescription:
				'Valide um CPF pelos dígitos verificadores (módulo 11) e veja a região fiscal de emissão. Aceita com ou sem pontuação e funciona no navegador.',
			answer:
				'O validador de CPF confere se os dois últimos dígitos do número batem com os nove primeiros. O primeiro dígito verificador vem da soma dos nove dígitos multiplicados por 10, 9, 8 … 2; o segundo, da soma dos dez primeiros multiplicados por 11, 10 … 2. Em ambos, divide-se a soma por 11: resto 0 ou 1 dá dígito 0, e qualquer outro resto dá 11 menos o resto. A ferramenta também rejeita sequências com todos os dígitos iguais, como 111.111.111-11, que passam na conta mas não são emitidas. Quando o CPF é válido, ela mostra a região fiscal indicada pelo nono dígito (8 é São Paulo, 7 é Rio de Janeiro ou Espírito Santo, por exemplo). Você pode digitar ou colar o número com ou sem pontos e traço.',
			howTo: {
				title: 'Como validar um CPF manualmente',
				steps: [
					'Separe os nove primeiros dígitos do CPF e multiplique cada um, da esquerda para a direita, por 10, 9, 8, 7, 6, 5, 4, 3 e 2.',
					'Some os resultados e calcule o resto da divisão por 11. Se o resto for 0 ou 1, o primeiro dígito verificador é 0; senão, é 11 menos o resto.',
					'Acrescente esse dígito aos nove primeiros e multiplique os dez dígitos por 11, 10, 9 … 2.',
					'Some, calcule o resto da divisão por 11 e aplique a mesma regra para obter o segundo dígito.',
					'Compare os dois dígitos calculados com os dois últimos do CPF: se forem iguais, o número é válido.',
				],
				example:
					'CPF 529.982.247-25: 5×10 + 2×9 + 9×8 + 9×7 + 8×6 + 2×5 + 2×4 + 4×3 + 7×2 = 295; 295 ÷ 11 deixa resto 9, então o primeiro dígito é 11 − 9 = 2. Com 5299822472 e pesos de 11 a 2, a soma é 347, resto 6, e o segundo dígito é 11 − 6 = 5. Os dígitos calculados (25) batem com os do número, que é válido; o nono dígito, 7, indica Rio de Janeiro ou Espírito Santo.',
			},
			faq: [
				{
					question: 'CPF válido significa que ele existe?',
					answer:
						'Não. A validação do CPF é matemática: confirma apenas que os dígitos verificadores batem com o resto do número. Para saber se um CPF existe e está regular, é preciso consultar a situação cadastral na Receita Federal.',
				},
				{
					question: 'Como é calculado o dígito verificador do CPF?',
					answer:
						'O primeiro dígito verificador do CPF vem dos nove primeiros dígitos multiplicados por 10, 9, 8 … 2 e somados; o resto da divisão por 11 define o dígito: resto 0 ou 1 vira 0, senão é 11 menos o resto. O segundo dígito repete a conta com os dez primeiros dígitos e pesos de 11 a 2.',
				},
				{
					question: 'O que o nono dígito do CPF indica?',
					answer:
						'O nono dígito do CPF indica a região fiscal onde ele foi emitido: 0 Rio Grande do Sul; 1 DF, GO, MT, MS e TO; 2 PA, AM, AC, AP, RO e RR; 3 CE, MA e PI; 4 PE, RN, PB e AL; 5 BA e SE; 6 Minas Gerais; 7 RJ e ES; 8 São Paulo; 9 PR e SC. Ele mostra onde o CPF foi inscrito, não onde a pessoa mora hoje.',
				},
				{
					question: 'Por que 111.111.111-11 aparece como inválido?',
					answer:
						'CPFs com todos os dígitos iguais, como 111.111.111-11 ou 000.000.000-00, passam no cálculo dos dígitos verificadores, mas não são emitidos pela Receita Federal. Por isso o validador os recusa, como fazem a maioria dos sistemas.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'validador-de-cnpj': {
			title: 'Validador de CNPJ (numérico e alfanumérico)',
			metaDescription:
				'Valide CNPJ numérico ou alfanumérico (com letras, o novo formato de 2026) pelos dígitos verificadores do módulo 11, com ou sem pontuação.',
			answer:
				'O validador de CNPJ confere os dois dígitos verificadores de um CNPJ de 14 posições, tanto no formato numérico quanto no alfanumérico adotado pela Receita Federal em julho de 2026. As 12 primeiras posições podem ser dígitos ou letras de A a Z; os 2 dígitos verificadores são sempre numéricos. Cada caractere vale o seu código ASCII menos 48, o que mantém os dígitos com o próprio valor (0 a 9) e faz A valer 17, B 18 e assim até Z, 42. O primeiro dígito usa os pesos 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2; o segundo, 6 seguido da mesma sequência. Resto da divisão por 11 igual a 0 ou 1 dá 0; senão, o dígito é 11 menos o resto. Pontuação e letras minúsculas são aceitas, e sequências de um único caractere repetido são recusadas.',
			howTo: {
				title: 'Como validar um CNPJ manualmente',
				steps: [
					'Converta as 12 primeiras posições em números: dígitos valem eles mesmos e letras valem o código ASCII menos 48 (A = 17, B = 18 … Z = 42).',
					'Multiplique esses 12 valores, da esquerda para a direita, por 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 e some.',
					'Calcule o resto da divisão por 11: resto 0 ou 1 dá primeiro dígito 0; senão, o dígito é 11 menos o resto.',
					'Acrescente o primeiro dígito e multiplique os 13 valores por 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2; some e aplique a mesma regra para obter o segundo dígito.',
					'Compare os dois dígitos calculados com os dois últimos do CNPJ.',
				],
				example:
					'CNPJ numérico 11.222.333/0001-81: a soma ponderada dos 12 primeiros dígitos é 102, resto 3, primeiro dígito 11 − 3 = 8; com o 8 incluído, a segunda soma é 120, resto 10, segundo dígito 11 − 10 = 1. CNPJ alfanumérico 12.ABC.345/01DE-35: os valores são 1, 2, 17, 18, 19, 3, 4, 5, 0, 1, 20 e 21; a primeira soma é 459, resto 8, dígito 3; a segunda soma é 424, resto 6, dígito 5. Os dois números são válidos.',
			},
			faq: [
				{
					question: 'O que é o CNPJ alfanumérico?',
					answer:
						'O CNPJ alfanumérico é o novo formato que a Receita Federal passou a emitir em julho de 2026: as 12 primeiras posições (raiz e ordem do estabelecimento) podem conter letras de A a Z além de dígitos, e os 2 dígitos verificadores continuam numéricos. Os CNPJs já existentes, só com números, continuam válidos e não mudam.',
				},
				{
					question: 'Como as letras entram no cálculo do dígito verificador do CNPJ?',
					answer:
						'No CNPJ alfanumérico, cada caractere vale o seu código ASCII menos 48: os dígitos 0 a 9 continuam valendo 0 a 9, e as letras vão de A = 17 até Z = 42. Depois disso a conta é a mesma do CNPJ numérico, com os pesos de 2 a 9 e o módulo 11.',
				},
				{
					question: 'Quais pesos são usados no cálculo do CNPJ?',
					answer:
						'No CNPJ, o primeiro dígito verificador usa os pesos 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 sobre as 12 primeiras posições; o segundo usa 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 sobre as 13 primeiras. Resto da divisão por 11 menor que 2 dá dígito 0; senão, o dígito é 11 menos o resto.',
				},
				{
					question: 'O validador de CNPJ consulta a Receita Federal?',
					answer:
						'Não. A validação do CNPJ acontece no navegador e é apenas matemática: mostra se os dígitos verificadores estão corretos, mas não informa se a empresa existe, está ativa ou qual é a razão social. Esses dados ficam no comprovante de inscrição emitido pela Receita Federal.',
				},
				{
					question: 'O que significa o 0001 no CNPJ?',
					answer:
						'No CNPJ, as oito primeiras posições formam a raiz, que identifica a empresa, e as quatro seguintes indicam o estabelecimento: 0001 costuma ser a matriz, e 0002, 0003 e assim por diante, as filiais. Os dois últimos dígitos são os verificadores.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'validador-de-rg': {
			title: 'Validador de RG de São Paulo (SSP-SP)',
			metaDescription:
				'Valide um RG emitido pela SSP de São Paulo conferindo o dígito verificador, inclusive quando ele é X. Aceita o número com ou sem pontuação.',
			answer:
				'O validador de RG confere o dígito verificador de RGs no padrão da SSP de São Paulo: oito dígitos seguidos de um verificador, que pode ser um número de 0 a 9 ou a letra X. Os oito dígitos são multiplicados, da esquerda para a direita, pelos pesos 2, 3, 4, 5, 6, 7, 8 e 9, e a soma é dividida por 11. Resto 0 dá dígito 0, resto 1 dá X (porque 11 − 1 = 10 não cabe em um dígito) e qualquer outro resto dá 11 menos o resto. Pontos, traço e espaços são ignorados, e o X pode ser digitado em minúscula. RGs de outros estados usam regras próprias ou não têm dígito verificador, então só o padrão paulista é conferido.',
			howTo: {
				title: 'Como validar um RG de São Paulo manualmente',
				steps: [
					'Separe os oito primeiros dígitos do RG.',
					'Multiplique cada dígito, da esquerda para a direita, por 2, 3, 4, 5, 6, 7, 8 e 9, e some os resultados.',
					'Calcule o resto da divisão da soma por 11.',
					'Resto 0 dá dígito 0; resto 1 dá X; nos demais casos, o dígito é 11 menos o resto.',
					'Compare com o último caractere do RG.',
				],
				example:
					'RG 24.678.131-2: 2×2 + 4×3 + 6×4 + 7×5 + 8×6 + 1×7 + 3×8 + 1×9 = 163; 163 ÷ 11 deixa resto 9, e 11 − 9 = 2, igual ao último dígito. Já no RG 10.071.271-X a soma dá resto 1, por isso o verificador é X.',
			},
			faq: [
				{
					question: 'Por que meu RG de outro estado aparece como inválido?',
					answer:
						'Cada estado define o formato do próprio RG, e muitos usam outra regra de dígito verificador ou nem têm verificador. O validador de RG só cobre o padrão da SSP de São Paulo, com oito dígitos mais um verificador de 0 a 9 ou X.',
				},
				{
					question: 'O que significa o X no final do RG?',
					answer:
						'No RG de São Paulo, o X aparece quando o cálculo do dígito verificador resulta em 10, que não cabe em um único algarismo. Isso acontece quando a soma ponderada dos oito dígitos deixa resto 1 na divisão por 11.',
				},
				{
					question: 'Preciso digitar a pontuação do RG?',
					answer:
						'Não. Ao validar o RG, pontos, traços e espaços são ignorados, e o X final é aceito tanto maiúsculo quanto minúsculo.',
				},
				{
					question: 'O RG vai deixar de existir com a nova carteira de identidade?',
					answer:
						'A nova Carteira de Identidade Nacional usa o número do CPF como identificador único, mas os RGs estaduais continuam válidos durante a transição. O número antigo do RG ainda aparece em cadastros e pode ser validado normalmente.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'validador-de-cnh': {
			title: 'Validador de CNH pelo número de registro',
			metaDescription:
				'Valide o número de registro da CNH (11 dígitos) conferindo os dois dígitos verificadores pelo módulo 11. Rápido e sem enviar dados.',
			answer:
				'O validador de CNH confere os dois dígitos verificadores do número de registro da carteira de motorista, que tem 11 dígitos: nove de base e dois verificadores. O primeiro verificador é o resto da divisão por 11 da soma dos nove dígitos multiplicados por 9, 8, 7 … 1; se esse resto for 10, o dígito vira 0 e o segundo verificador sofre um desconto de 2. O segundo verificador é o resto da divisão por 11 da soma dos mesmos nove dígitos multiplicados por 1, 2, 3 … 9, menos o desconto, e vira 0 quando o resto é 10. Diferente do CPF, aqui o dígito é o próprio resto, e não 11 menos o resto. Sequências com todos os dígitos iguais são recusadas.',
			howTo: {
				title: 'Como validar o número da CNH manualmente',
				steps: [
					'Separe os nove primeiros dígitos do número de registro.',
					'Multiplique-os por 9, 8, 7, 6, 5, 4, 3, 2 e 1, some e calcule o resto da divisão por 11. Esse resto é o primeiro dígito; se for 10, use 0 e anote um desconto de 2.',
					'Multiplique os mesmos nove dígitos por 1, 2, 3, 4, 5, 6, 7, 8 e 9, some e calcule o resto da divisão por 11.',
					'Se o resto for 10, o segundo dígito é 0; senão, é o resto menos o desconto (0 ou 2).',
					'Compare os dois dígitos calculados com os dois últimos do número.',
				],
				example:
					'CNH 617278655-35: 6×9 + 1×8 + 7×7 + 2×6 + 7×5 + 8×4 + 6×3 + 5×2 + 5×1 = 223, resto 3, então o primeiro dígito é 3, sem desconto. Com pesos de 1 a 9 a soma é 247, resto 5, e o segundo dígito é 5. O número 61727865535 é válido.',
			},
			faq: [
				{
					question: 'CNH válida quer dizer que está ativa?',
					answer:
						'Não. A validação da CNH é matemática e só confirma que os dígitos verificadores do número de registro estão corretos. Para saber se a habilitação está regular, vencida ou suspensa, consulte o Detran do seu estado ou a Carteira Digital de Trânsito.',
				},
				{
					question: 'Onde fica o número de registro na CNH?',
					answer:
						'O número de registro da CNH fica no campo “Nº Registro” e tem 11 dígitos. Não confunda com o número do espelho do documento, impresso no verso, nem com o código de segurança ou o número do formulário RENACH.',
				},
				{
					question: 'O número da CNH é igual ao CPF?',
					answer:
						'Não. A CNH traz o CPF do motorista impresso, mas o número de registro é outro, com 11 dígitos e regra própria de dígitos verificadores. Por isso o CPF não passa no validador de CNH e vice-versa.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'validador-de-pis': {
			title: 'Validador de PIS/PASEP, NIS e NIT',
			metaDescription:
				'Valide um número de PIS, PASEP, NIS ou NIT pelo dígito verificador (módulo 11). Digite ou cole o número, com ou sem pontos e traço.',
			answer:
				'O validador de PIS/PASEP confere o dígito verificador do número de 11 dígitos usado pelo PIS, pelo PASEP, pelo NIS e pelo NIT, que seguem a mesma numeração. Os dez primeiros dígitos são multiplicados, da esquerda para a direita, por 3, 2, 9, 8, 7, 6, 5, 4, 3 e 2; a soma é dividida por 11. Se o resto for 0 ou 1, o dígito verificador é 0; senão, é 11 menos o resto. O resultado é comparado com o último dígito. Sequências com todos os dígitos iguais são recusadas. A pontuação (000.00000.00-0) entra sozinha enquanto você digita, e números colados com ou sem pontos e traço são aceitos.',
			howTo: {
				title: 'Como validar um PIS manualmente',
				steps: [
					'Separe os dez primeiros dígitos do PIS.',
					'Multiplique cada um por 3, 2, 9, 8, 7, 6, 5, 4, 3 e 2, na ordem, e some.',
					'Calcule o resto da divisão da soma por 11.',
					'Resto 0 ou 1 dá dígito 0; senão, o dígito é 11 menos o resto. Compare com o último dígito.',
				],
				example:
					'PIS 471.18372.04-8: 4×3 + 7×2 + 1×9 + 1×8 + 8×7 + 3×6 + 7×5 + 2×4 + 0×3 + 4×2 = 168; 168 ÷ 11 deixa resto 3, e 11 − 3 = 8, igual ao último dígito. O número é válido.',
			},
			faq: [
				{
					question: 'PIS, PASEP, NIS e NIT são o mesmo número?',
					answer:
						'Na prática, sim. PIS (trabalhadores da iniciativa privada), PASEP (servidores públicos), NIS (programas sociais) e NIT (contribuintes do INSS) usam a mesma numeração de 11 dígitos e a mesma regra de dígito verificador, então o validador de PIS serve para todos.',
				},
				{
					question: 'Onde encontro meu número do PIS?',
					answer:
						'O número do PIS aparece na Carteira de Trabalho Digital, no extrato do FGTS, no cartão Cidadão da Caixa e no aplicativo Meu INSS. Para quem tem a nova carteira de trabalho, o CPF também passou a identificar o trabalhador.',
				},
				{
					question: 'Preciso digitar os pontos e o traço do PIS?',
					answer:
						'Não. No validador de PIS a pontuação entra sozinha enquanto você digita, e números colados com ou sem pontos e traço são aceitos.',
				},
				{
					question: 'O validador de PIS consulta a Caixa?',
					answer:
						'Não. A validação do PIS é feita no navegador e confere só a matemática do número; ela não informa se há saldo, abono salarial ou vínculo empregatício.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'validador-de-renavam': {
			title: 'Validador de RENAVAM: confira o código',
			metaDescription:
				'Valide o código RENAVAM do veículo, de 11 ou 9 dígitos, pelo dígito verificador do módulo 11. Útil antes de pagar IPVA, multas ou licenciamento.',
			answer:
				'O validador de RENAVAM confere o dígito verificador do código do veículo. O código atual tem 11 dígitos: dez de base e um verificador. Códigos antigos, de 9 dígitos, recebem zeros à esquerda até chegar a 11 antes da conta. Os dez primeiros dígitos são multiplicados por 3, 2, 9, 8, 7, 6, 5, 4, 3 e 2 e somados; a soma é multiplicada por 10 e dividida por 11, e o resto é o dígito verificador, com 10 virando 0. Isso equivale a fazer 11 menos o resto da soma por 11, tratando 10 e 11 como 0. Sequências com todos os dígitos iguais são recusadas.',
			howTo: {
				title: 'Como validar um RENAVAM manualmente',
				steps: [
					'Se o código tiver 9 dígitos, complete com zeros à esquerda até ter 11.',
					'Multiplique os dez primeiros dígitos por 3, 2, 9, 8, 7, 6, 5, 4, 3 e 2 e some.',
					'Multiplique a soma por 10 e calcule o resto da divisão por 11. Se o resto for 10, o dígito é 0.',
					'Compare o resultado com o último dígito do RENAVAM.',
				],
				example:
					'RENAVAM 40188822797: 4×3 + 0×2 + 1×9 + 8×8 + 8×7 + 8×6 + 2×5 + 2×4 + 7×3 + 9×2 = 246; 246 × 10 = 2.460, e 2.460 ÷ 11 deixa resto 7, igual ao último dígito. O código é válido.',
			},
			faq: [
				{
					question: 'Onde encontro o RENAVAM?',
					answer:
						'O código RENAVAM fica no documento do veículo (CRLV, inclusive o digital), no campo “Código RENAVAM”. Ele também aparece em boletos de IPVA e licenciamento.',
				},
				{
					question: 'RENAVAM de 9 dígitos ainda vale?',
					answer:
						'Sim. Os RENAVAMs antigos tinham 9 dígitos e passaram a ser escritos com 11, acrescentando zeros à esquerda; o número em si não mudou. O validador de RENAVAM aceita os dois formatos e completa os zeros antes de calcular.',
				},
				{
					question: 'Um RENAVAM válido mostra os dados do carro?',
					answer:
						'Não. O validador de RENAVAM só confere o dígito verificador do código; placa, proprietário, débitos e situação do veículo ficam no Detran do estado ou na Carteira Digital de Trânsito.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'validador-de-titulo-de-eleitor': {
			title: 'Validador de título de eleitor e UF',
			metaDescription:
				'Valide um título de eleitor de 12 dígitos pelos dígitos verificadores e descubra o estado de emissão pelo código da UF no próprio número.',
			answer:
				'O validador de título de eleitor confere os dois dígitos verificadores do número de 12 dígitos e mostra o estado de emissão. Os oito primeiros dígitos são o número sequencial, o 9º e o 10º formam o código da UF (01 a 28) e os dois últimos são os verificadores. O primeiro verificador é o resto da divisão por 11 da soma dos oito dígitos multiplicados por 2, 3, 4 … 9. O segundo usa o código da UF e o primeiro verificador: dezena da UF × 7 + unidade × 8 + primeiro dígito × 9, resto da divisão por 11. Nos dois casos, resto 10 vira 0; em títulos de São Paulo (01) e Minas Gerais (02), resto 0 vira 1.',
			howTo: {
				title: 'Como validar um título de eleitor manualmente',
				steps: [
					'Separe os oito primeiros dígitos, o código da UF (9º e 10º dígitos) e os dois verificadores.',
					'Multiplique os oito primeiros dígitos por 2, 3, 4, 5, 6, 7, 8 e 9, some e calcule o resto da divisão por 11. Esse resto é o primeiro dígito (10 vira 0; em SP e MG, 0 vira 1).',
					'Calcule dezena da UF × 7 + unidade da UF × 8 + primeiro dígito × 9 e o resto da divisão por 11, com as mesmas exceções.',
					'Compare os dois dígitos calculados com os dois últimos do título.',
				],
				example:
					'Título 5464 0310 0175: 5×2 + 4×3 + 6×4 + 4×5 + 0×6 + 3×7 + 1×8 + 0×9 = 95, resto 7, primeiro dígito 7. A UF é 01 (São Paulo): 0×7 + 1×8 + 7×9 = 71, resto 5, segundo dígito 5. Os dígitos calculados (75) batem, e o título é de SP.',
			},
			faq: [
				{
					question: 'Como saber o estado pelo número do título de eleitor?',
					answer:
						'No título de eleitor, o 9º e o 10º dígitos são o código da UF: 01 SP, 02 MG, 03 RJ, 04 RS, 05 BA, 06 PR, 07 CE, 08 PE, 09 SC, 10 GO e assim por diante até 27 TO; o código 28 é usado para eleitores no exterior.',
				},
				{
					question: 'Por que SP e MG têm regra diferente no título de eleitor?',
					answer:
						'No cálculo dos dígitos verificadores do título de eleitor, quando o resto da divisão por 11 é 0, títulos emitidos em São Paulo (01) e Minas Gerais (02) usam o dígito 1, enquanto os demais estados usam 0. O validador aplica essa exceção automaticamente.',
				},
				{
					question: 'Título de eleitor válido significa que está regular?',
					answer:
						'Não. A validação do título de eleitor é só matemática. Para saber se o título está regular, cancelado ou com pendências, e para consultar o local de votação, use os serviços do TSE ou o aplicativo e-Título.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'validador-de-cartao-de-credito': {
			title: 'Validador de cartão de crédito e bandeira',
			metaDescription:
				'Confira se um número de cartão de crédito passa no algoritmo de Luhn, identifique a bandeira (Visa, Mastercard, Elo, Amex…) e o tamanho esperado.',
			answer:
				'O validador de cartão de crédito confere o número pelo algoritmo de Luhn (módulo 10), identifica a bandeira pelos primeiros dígitos e checa se o tamanho combina com ela. No Luhn, da direita para a esquerda, dobra-se um dígito sim, outro não, a partir do penúltimo; quando o dobro passa de 9, subtrai-se 9. O número é válido se a soma de todos os dígitos terminar em 0. As bandeiras reconhecidas são Visa, Mastercard, Elo, American Express, Hipercard, Diners Club, Discover e JCB. O tamanho esperado é 16 dígitos na maioria delas (Visa também aceita 13), 15 no American Express e 14 no Diners. Números de bandeira desconhecida são aceitos com 13 a 19 dígitos se passarem no Luhn.',
			howTo: {
				title: 'Como aplicar o algoritmo de Luhn',
				steps: [
					'Escreva o número do cartão e comece pelo último dígito, à direita.',
					'Mantenha o último dígito e dobre o penúltimo; siga alternando (mantém, dobra) até o primeiro dígito.',
					'Quando um dígito dobrado passar de 9, subtraia 9 (por exemplo, 8 × 2 = 16 vira 7).',
					'Some todos os dígitos, dobrados ou não.',
					'Se a soma terminar em 0 (for múltipla de 10), o número passa no Luhn.',
				],
				example:
					'Cartão 4111 1111 1111 1111: os oito dígitos dobrados são o 4 (vira 8) e sete dígitos 1 (viram 2 cada, total 14); os oito mantidos são todos 1 (total 8). A soma é 8 + 14 + 8 = 30, múltipla de 10, então o número passa no Luhn. Como começa com 4 e tem 16 dígitos, é reconhecido como Visa.',
			},
			faq: [
				{
					question: 'Como funciona o algoritmo de Luhn?',
					answer:
						'O algoritmo de Luhn dobra, da direita para a esquerda, um dígito sim, outro não, começando pelo penúltimo; dobros acima de 9 perdem 9. Somando tudo, o número é válido quando o total é múltiplo de 10. Ele detecta qualquer erro em um único dígito e a maioria das trocas de dois dígitos vizinhos.',
				},
				{
					question: 'Como saber a bandeira pelo número do cartão?',
					answer:
						'A bandeira do cartão é definida pelos primeiros dígitos, o BIN: Visa começa com 4; Mastercard com 51 a 55 ou 2221 a 2720; American Express com 34 ou 37; Diners com 300 a 305, 36 ou 38; Elo e Hipercard têm faixas próprias, como 636368 e 606282. O validador testa as faixas mais específicas primeiro, porque algumas Elo começam com 4.',
				},
				{
					question: 'O validador verifica se o cartão tem limite ou existe?',
					answer:
						'Não. O validador de cartão de crédito só confere o formato do número, no navegador; nenhum dado é enviado para banco ou operadora. Um número válido no Luhn pode não pertencer a nenhuma conta, e só uma autorização da operadora diz se o cartão está ativo.',
				},
				{
					question: 'É seguro digitar o número do meu cartão aqui?',
					answer:
						'O validador de cartão roda inteiramente no navegador e não envia o número a servidor algum. Mesmo assim, a regra geral vale: nunca informe junto o código de segurança (CVV) e a data de validade fora do site da loja ou do banco.',
				},
			],
			updatedAt: UPDATED_AT,
		},
	},
}
