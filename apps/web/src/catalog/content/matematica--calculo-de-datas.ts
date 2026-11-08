import type { SectionContent } from './types.ts'

const UPDATED_AT = '2026-11-08'

export const content: SectionContent = {
	intro: [
		'Estas ferramentas resolvem as contas de calendário mais comuns: quanto tempo passou entre duas datas, que dia será daqui a um certo número de dias, semanas, meses ou anos, e que dia foi um tempo atrás. As contas usam o calendário gregoriano completo, então meses de 28, 29, 30 e 31 dias e anos bissextos entram automaticamente, sem você precisar contar no dedo.',
		'Use a diferença entre datas para saber uma idade exata, o tempo de serviço, quantos dias faltam para um evento ou quanto durou um contrato. Ela mostra o intervalo em anos, meses e dias de calendário e também os totais em semanas, dias, horas, minutos e segundos. Para descobrir uma data final, como o vencimento de um prazo em dias corridos ou a data de uma revisão daqui a seis meses, use somar em data. Para voltar no tempo, como saber o dia de 90 dias atrás, use subtrair em data.',
		'Todas as contas são em dias corridos: fins de semana e feriados contam como qualquer outro dia. Para prazos em dias úteis, é preciso descontar esses dias à parte. Ao somar ou subtrair meses e anos a partir do fim do mês, a data pode passar para o mês seguinte quando o dia não existe no mês de destino; as páginas de cada ferramenta explicam esse caso.',
	],
	tools: {
		'diferenca-entre-datas': {
			title: 'Calcular diferença entre datas',
			metaDescription:
				'Calcule a diferença entre duas datas e horários em anos, meses e dias, ou no total de semanas, dias, horas e minutos. Considera anos bissextos.',
			answer:
				'A calculadora mostra o intervalo entre duas datas, cada uma com horário. O resultado principal vem em anos, meses e dias de calendário, contados mês a mês a partir da data inicial; quando o dia não existe no mês de chegada, usa-se o último dia desse mês. Abaixo aparecem os totais em semanas, dias, horas, minutos, segundos e milissegundos, sempre em unidades completas. Os totais de meses e anos usam médias de 30,4375 e 365,25 dias. A ordem das datas não importa: o resultado é sempre positivo. Anos bissextos e meses de tamanhos diferentes são considerados. Use para calcular idade, tempo de empresa, duração de contratos ou quantos dias faltam para uma data.',
			faq: [
				{
					question: 'Como são contados os meses?',
					answer:
						'Mês a mês no calendário: de 31 de janeiro de 2026 a 1º de março de 2027 dá 1 ano, 1 mês e 1 dia. Quando o dia não existe no mês de destino, usa-se o último dia desse mês, então de 31 de janeiro a 29 de fevereiro de 2024 dá exatamente 1 mês.',
				},
				{
					question: 'Dá para calcular a idade de alguém?',
					answer:
						'Sim. Use a data de nascimento como inicial e hoje como final; o resultado em anos, meses e dias é a idade exata. Quem nasceu em 15 de março de 1990 tem, em 8 de novembro de 2026, 36 anos, 7 meses e 24 dias.',
				},
				{
					question: 'O dia inicial entra na contagem?',
					answer:
						'Não. A calculadora mede o tempo decorrido entre os dois momentos: de 1º a 2 de um mês, no mesmo horário, é 1 dia. Se você precisa contar os dois extremos, como em algumas diárias, some 1 ao total de dias.',
				},
				{
					question: 'Por que o total de meses é diferente do mês do resultado principal?',
					answer:
						'O resultado principal conta meses do calendário. O total em meses divide o tempo decorrido por um mês médio de 30,4375 dias e descarta a fração, então os dois podem diferir em períodos longos.',
				},
				{
					question: 'Para que serve o horário?',
					answer:
						'Para intervalos mais precisos, como a duração de um plantão ou de uma viagem. Se só as datas importam, deixe o mesmo horário nos dois campos.',
				},
			],
			howTo: {
				title: 'Como calcular a diferença entre duas datas',
				steps: [
					'Informe a data e o horário iniciais.',
					'Informe a data e o horário finais; a ordem pode ser invertida sem mudar o resultado.',
					'Clique em Calcular diferença.',
					'Leia o intervalo em anos, meses e dias e, abaixo, os totais em semanas, dias, horas, minutos e segundos.',
				],
				example:
					'De 08/11/2026 às 00:00 até 25/12/2026 às 00:00: 0 anos, 1 mês e 17 dias, ou 47 dias, 6 semanas completas e 1.128 horas.',
			},
			updatedAt: UPDATED_AT,
		},
		'somar-em-data': {
			title: 'Somar dias a uma data (e meses ou anos)',
			metaDescription:
				'Some dias, semanas, meses ou anos a uma data e veja o dia resultante por extenso, com o dia da semana. Útil para prazos em dias corridos e vencimentos.',
			answer:
				'A calculadora adiciona dias, semanas, meses ou anos a uma data e mostra o dia resultante por extenso, com o dia da semana, e também no formato dd/mm/aaaa. A data inicial vem preenchida com hoje. A quantidade deve ser um número inteiro de 0 a 100.000. Dias e semanas são contados em dias corridos, incluindo fins de semana e feriados; uma semana vale 7 dias. Meses e anos avançam no calendário mantendo o número do dia. Quando esse dia não existe no mês de chegada, o excesso passa para o mês seguinte: 31 de janeiro de 2026 mais 1 mês dá 3 de março. Use para calcular vencimentos, prazos, datas de retorno e previsões.',
			faq: [
				{
					question: 'Quanto dá 31 de janeiro mais um mês?',
					answer:
						'O resultado passa para março, porque fevereiro não tem dia 31: em 2026 dá 3 de março; em 2028, ano bissexto, dá 2 de março. É o mesmo comportamento das datas em JavaScript.',
				},
				{
					question: 'Como calcular um prazo em dias corridos?',
					answer:
						'Informe a data inicial, a quantidade de dias e a unidade Dias; fins de semana e feriados são contados normalmente. Prazos em dias úteis exigem descontar esses dias à parte.',
				},
				{
					question: 'O dia inicial conta como dia 1?',
					answer:
						'Não. Somar 1 dia a 8 de novembro dá 9 de novembro. Se o seu prazo conta o próprio dia de início, some um dia a menos.',
				},
				{
					question: 'Somar 30 dias é o mesmo que somar 1 mês?',
					answer:
						'Nem sempre. 30 dias são sempre 30 dias, enquanto 1 mês leva ao mesmo dia do mês seguinte, que pode estar a 28, 29, 30 ou 31 dias. De 31 de janeiro de 2026, 30 dias dão 2 de março, e 1 mês dá 3 de março.',
				},
			],
			howTo: {
				title: 'Como somar dias, meses ou anos a uma data',
				steps: [
					'Escolha a data inicial; o campo já vem com a data de hoje.',
					'Digite a quantidade a adicionar, um número inteiro.',
					'Escolha a unidade: Dias, Semanas, Meses ou Anos.',
					'Clique em Somar para ver a data resultante por extenso.',
				],
				example:
					'08/11/2026 mais 90 dias dá sábado, 6 de fevereiro de 2027. A mesma data mais 6 semanas dá domingo, 20 de dezembro de 2026.',
			},
			updatedAt: UPDATED_AT,
		},
		'subtrair-em-data': {
			title: 'Subtrair dias de uma data (dias atrás)',
			metaDescription:
				'Subtraia dias, semanas, meses ou anos de uma data e descubra que dia foi, com o dia da semana. Responde perguntas como "que dia foi 90 dias atrás?".',
			answer:
				'A calculadora volta dias, semanas, meses ou anos a partir de uma data e mostra o dia resultante por extenso, com o dia da semana, e também no formato dd/mm/aaaa. A data inicial vem preenchida com hoje, o que facilita perguntas como "que dia foi 90 dias atrás?". A quantidade deve ser um número inteiro de 0 a 100.000. Dias e semanas são contados em dias corridos. Meses e anos recuam no calendário mantendo o número do dia; quando ele não existe no mês de chegada, o excesso passa para o mês seguinte, então 31 de março menos 1 mês dá 3 de março em anos comuns. Use para conferir prazos retroativos, carências e datas de início.',
			faq: [
				{
					question: 'Como saber a data de 90 dias atrás?',
					answer:
						'Deixe a data de hoje, informe 90 e a unidade Dias. A partir de 8 de novembro de 2026, o resultado é segunda-feira, 10 de agosto de 2026.',
				},
				{
					question: 'Subtrair um ano de 29 de fevereiro dá o quê?',
					answer:
						'Como o ano anterior não tem 29 de fevereiro, o resultado passa para 1º de março. De 29/02/2024, um ano atrás dá 01/03/2023.',
				},
				{
					question: 'Quanto dá 31 de março menos um mês?',
					answer:
						'Fevereiro não tem dia 31, então o resultado avança para março: 3 de março em anos comuns e 2 de março em anos bissextos. Se precisar do último dia de fevereiro, subtraia em dias.',
				},
				{
					question: 'Feriados e fins de semana são descontados?',
					answer: 'Não. A conta é em dias corridos; todos os dias do calendário contam igualmente.',
				},
			],
			howTo: {
				title: 'Como subtrair dias, meses ou anos de uma data',
				steps: [
					'Escolha a data de partida; o campo já vem com a data de hoje.',
					'Digite a quantidade a subtrair, um número inteiro.',
					'Escolha a unidade: Dias, Semanas, Meses ou Anos.',
					'Clique em Subtrair para ver a data resultante por extenso.',
				],
				example:
					'08/11/2026 menos 90 dias dá segunda-feira, 10 de agosto de 2026. A mesma data menos 6 meses dá sexta-feira, 8 de maio de 2026.',
			},
			updatedAt: UPDATED_AT,
		},
	},
}
