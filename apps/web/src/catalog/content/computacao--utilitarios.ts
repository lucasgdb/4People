import type { SectionContent } from './types.ts'

const UPDATED_AT = '2026-11-08'

export const content: SectionContent = {
	intro: [
		'Esta seção junta utilitários do dia a dia que não se encaixam em uma única área: sortear números para rifas e sorteios, gerar texto Lorem Ipsum para preencher layouts, criar QR Codes de links e textos, consultar o código de um banco para transferências e boletos e acompanhar a cotação do dólar, do euro e de outras moedas, com um conversor entre qualquer par.',
		'O gerador de números aleatórios usa o gerador criptográfico do navegador e serve tanto para sorteios com amigos quanto para escolher amostras de teste. O Lorem Ipsum e o gerador de QR Code também funcionam inteiramente no navegador: nada do que você digita é enviado para um servidor. Para um QR Code de PIX, de Wi-Fi ou com logo, a página indica o gerador completo, que é um projeto separado.',
		'A consulta de bancos e a cotação de moedas dependem de serviços públicos externos, consultados direto do seu navegador: a BrasilAPI, que publica a lista de instituições do Banco Central, e a AwesomeAPI, que fornece as cotações. Se um desses serviços estiver fora do ar ou bloqueado na sua rede, a ferramenta avisa e permite tentar de novo. As cotações são de referência e não incluem o spread nem o IOF cobrados por bancos e casas de câmbio, por isso não substituem a cotação oferecida na hora de fechar uma operação.',
	],
	tools: {
		'gerador-de-numeros-aleatorios': {
			title: 'Gerador de números aleatórios para sorteio',
			metaDescription:
				'Sorteie números aleatórios em qualquer intervalo, com ou sem repetição, para rifas, sorteios e Mega-Sena. Usa o gerador criptográfico do navegador.',
			answer:
				'O gerador de números aleatórios sorteia números inteiros entre um mínimo e um máximo, de −1 bilhão a 1 bilhão, em quantidades de 1 a 10.000. Os números vêm do crypto.getRandomValues, o gerador criptográfico do navegador, com rejeição de valores que causariam viés: cada número do intervalo tem exatamente a mesma chance. Com "Sem repetir números", o sorteio funciona como tirar bolinhas de uma urna (por embaralhamento de Fisher–Yates ou, em intervalos muito grandes, descartando repetidos) e nenhum número sai duas vezes. "Em ordem crescente" só reorganiza a exibição. A página já abre com um sorteio de 6 números de 1 a 60, e mudar o intervalo, a quantidade ou a repetição faz um novo sorteio.',
			faq: [
				{
					question: 'Como sortear números da Mega-Sena?',
					answer:
						'Use o intervalo de 1 a 60, quantidade 6 e marque "Sem repetir números". Essa já é a configuração com que a página abre. Para a Lotofácil, use de 1 a 25 e quantidade 15.',
				},
				{
					question: 'O sorteio é realmente aleatório?',
					answer:
						'Sim. Os números vêm do crypto.getRandomValues, o gerador criptográfico do navegador, e não do Math.random. Valores que favoreceriam alguns números são descartados, então todos os números do intervalo têm a mesma chance.',
				},
				{
					question: 'Como fazer um sorteio de rifa?',
					answer:
						'Coloque de 1 até o último número vendido, quantidade igual ao número de prêmios e marque "Sem repetir números". Para mais transparência, compartilhe a tela ou grave o sorteio.',
				},
				{
					question: 'Qual a diferença entre sortear com e sem repetição?',
					answer:
						'Com repetição, cada número é sorteado de forma independente, como jogar um dado várias vezes, e o mesmo valor pode aparecer mais de uma vez. Sem repetição, cada número sai no máximo uma vez, como bolinhas que não voltam para a urna.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'gerador-de-lorem-ipsum': {
			title: 'Gerador de Lorem Ipsum (texto de preenchimento)',
			metaDescription:
				'Gere texto Lorem Ipsum em parágrafos, frases ou palavras para preencher layouts, protótipos e sites. Escolha a quantidade e copie com um clique.',
			answer:
				'O gerador de Lorem Ipsum cria texto fictício em latim para preencher layouts, protótipos e modelos. Escolha a unidade (parágrafos, frases ou palavras) e a quantidade, de 1 a 1.000. Cada frase tem de 6 a 15 palavras sorteadas de um vocabulário em latim, com vírgula nas mais longas, e cada parágrafo tem de 4 a 7 frases, o que imita a variação de um texto real. A opção "Começar com Lorem ipsum dolor sit amet" coloca a abertura tradicional no início. Qualquer mudança nos campos gera um texto novo, e o botão "Gerar novo texto" sorteia outra versão com as mesmas opções.',
			faq: [
				{
					question: 'O que significa Lorem Ipsum?',
					answer:
						'É um trecho embaralhado do tratado De finibus bonorum et malorum, de Cícero, escrito em 45 a.C. As palavras foram cortadas e misturadas, então o texto não tem sentido, nem em latim.',
				},
				{
					question: 'Por que usar texto em latim e não em português?',
					answer:
						'Porque ninguém para para ler: o olhar avalia o desenho da página, os tamanhos e o espaçamento, não o conteúdo. Um texto em português chamaria a atenção para o que está escrito.',
				},
				{
					question: 'Quantas palavras tem um parágrafo de Lorem Ipsum?',
					answer:
						'Neste gerador, um parágrafo tem de 4 a 7 frases de 6 a 15 palavras, ou seja, entre 24 e 105 palavras, com cerca de 58 em média. Para um número exato, escolha a unidade Palavras.',
				},
				{
					question: 'Quando não usar Lorem Ipsum?',
					answer:
						'Quando o tamanho e o tom do texto importam para o projeto, como em botões, menus e mensagens de erro. Nesses casos, um rascunho do texto real revela problemas de espaço que o latim esconde.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'gerador-de-qr-code': {
			title: 'Gerador de QR Code grátis para link e texto',
			metaDescription:
				'Crie um QR Code de link ou texto no navegador, escolha cores e nível de correção de erros e baixe em SVG para impressão ou em PNG de 1024 pixels.',
			answer:
				'O gerador de QR Code transforma um link ou texto de até 2.000 caracteres em QR Code, no próprio navegador. Você escolhe o nível de correção de erros, que define quanto do código pode estar sujo ou coberto e ainda ser lido: baixa (7%), média (15%), alta (25%) ou máxima (30%). Também escolhe a cor dos módulos e do fundo; a ferramenta avisa quando o contraste fica abaixo de 4:1 ou quando as cores estão invertidas, casos em que câmeras podem falhar. O download sai em SVG, vetorial e ideal para impressão, ou em PNG de 1.024 × 1.024 pixels. Para QR Code de PIX, Wi-Fi, WhatsApp ou com logo e moldura, a página leva ao gerador completo.',
			faq: [
				{
					question: 'Qual nível de correção de erros escolher no QR Code?',
					answer:
						'A média (15%) atende a maioria dos casos. Use alta ou máxima se o código for impresso em superfícies que sujam ou se for colocar um logo por cima. Mais correção deixa o desenho mais denso.',
				},
				{
					question: 'O QR Code gerado expira?',
					answer:
						'Não. Ele guarda o próprio conteúdo, sem redirecionar por nenhum servidor, e funciona enquanto o link de destino existir. QR Codes que expiram são os "dinâmicos" de serviços que passam o acesso por um endereço intermediário.',
				},
				{
					question: 'Qual o tamanho mínimo para imprimir um QR Code?',
					answer:
						'Uma regra prática é cerca de 2 × 2 cm para leitura a um palmo de distância, e o tamanho deve aumentar proporcionalmente à distância de leitura. Links longos geram códigos mais densos, que pedem impressão maior.',
				},
				{
					question: 'Posso usar cores no QR Code?',
					answer:
						'Sim, desde que os módulos sejam bem mais escuros que o fundo. Contraste baixo ou cores invertidas, com módulos claros sobre fundo escuro, fazem alguns leitores falharem; a ferramenta avisa nesses casos.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'consulta-de-bancos': {
			title: 'Código do banco: lista COMPE e ISPB',
			metaDescription:
				'Encontre o código do banco (COMPE) e o ISPB de qualquer instituição do Brasil para TED, PIX e boletos. Busque por número, nome oficial ou nome popular.',
			answer:
				'A consulta de bancos lista o código de compensação (COMPE, com três dígitos) e o ISPB de cada instituição financeira do Brasil que tem código, com o nome curto e a razão social. A lista vem da BrasilAPI, que publica os dados do Banco Central, e é baixada uma vez e guardada por um dia. A busca acontece no navegador e aceita o código ("1" ou "001"), o começo do ISPB ou qualquer parte do nome, sem diferenciar acentos e maiúsculas. Bancos conhecidos por outro nome, como Nubank (Nu Pagamentos) e C6 Bank, aparecem também pelo nome popular. Cada código pode ser copiado com um clique.',
			faq: [
				{
					question: 'Qual o código do banco Itaú?',
					answer:
						'O Itaú Unibanco usa o código 341. Outros códigos muito procurados: Banco do Brasil 001, Santander 033, Inter 077, Caixa 104, Bradesco 237 e Nubank 260.',
				},
				{
					question: 'Para que serve o ISPB?',
					answer:
						'O ISPB é o identificador de 8 dígitos da instituição no Sistema de Pagamentos Brasileiro. Ele é usado nas transferências entre instituições, inclusive no PIX, e existe mesmo para instituições que não têm código COMPE.',
				},
				{
					question: 'Qual a diferença entre código COMPE e ISPB?',
					answer:
						'O COMPE é o número de três dígitos usado em TED e boletos, como 341 do Itaú. O ISPB tem 8 dígitos e identifica a instituição no sistema de pagamentos. No PIX, o que vale é o ISPB, mas os aplicativos mostram o nome do banco.',
				},
				{
					question: 'Qual o código do Nubank?',
					answer:
						'O Nubank usa o código 260, registrado como Nu Pagamentos S.A. É esse número que se informa no campo "banco" de uma TED ou de um cadastro de conta.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'dolar-hoje': {
			title: 'Dólar hoje: cotação comercial e turismo',
			metaDescription:
				'Cotação do dólar hoje em reais: dólar comercial e turismo, variação do dia, mínima e máxima, horário da atualização e conversor de dólar para real.',
			answer:
				'A página Dólar Hoje mostra quanto vale 1 dólar americano em reais agora, no câmbio comercial e no turismo, com a variação desde o fechamento anterior, a mínima e a máxima do dia e o horário da última atualização. Os valores vêm da AwesomeAPI e já chegam prontos na página, renovados a cada 5 minutos; depois de aberta, a cotação continua se atualizando a cada minuto no navegador. O dólar comercial é a referência usada entre bancos e empresas; o turismo, usado na compra de dinheiro em espécie e em cartões pré-pagos, costuma ser mais caro. Logo abaixo, o conversor transforma qualquer valor de dólares em reais (ou o contrário) com a cotação mais recente.',
			faq: [
				{
					question: 'Qual a diferença entre dólar comercial e dólar turismo?',
					answer:
						'O dólar comercial é a cotação usada em operações entre bancos, empresas e no comércio exterior. O dólar turismo é o preço para quem compra moeda em espécie ou carrega cartão pré-pago, e costuma ser mais alto porque inclui custos de transporte, seguro e a margem das casas de câmbio.',
				},
				{
					question: 'Por que o dólar não muda no fim de semana?',
					answer:
						'O dólar comercial só é negociado em dias úteis. Fora do horário do mercado, a página mostra a última cotação antes do fechamento e avisa que o mercado está fechado; o valor volta a se mover na abertura do próximo dia útil.',
				},
				{
					question: 'O valor desta página é o que vou pagar no banco?',
					answer:
						'Não exatamente. A cotação mostrada é a de referência. Bancos, corretoras e casas de câmbio cobram uma margem (spread) e, em compras internacionais, há IOF, então o valor final que você paga pelo dólar é maior que o desta página.',
				},
				{
					question: 'Como converter dólar em real?',
					answer:
						'Para converter dólar em real, multiplique o valor em dólares pela cotação do dia: com o dólar a R$ 5,50, US$ 100 valem R$ 550,00. O conversor desta página faz essa conta com a cotação mais recente, nos dois sentidos.',
				},
			],
			howTo: {
				title: 'Como converter dólares em reais',
				steps: [
					'Veja a cotação do dia: quanto vale 1 dólar em reais (comercial ou turismo).',
					'Multiplique o valor em dólares pela cotação para ter o valor em reais.',
					'Para o caminho inverso, divida o valor em reais pela cotação.',
					'Some a margem do banco e o IOF se for comprar a moeda de verdade.',
				],
				example:
					'Com o dólar comercial a R$ 5,50, US$ 250 valem 250 × 5,50 = R$ 1.375,00, e R$ 1.000 compram 1.000 ÷ 5,50 ≈ US$ 181,82.',
			},
			updatedAt: '2026-11-08',
		},
		'cotacao-de-moedas': {
			title: 'Cotação do dólar hoje e conversor de moedas',
			metaDescription:
				'Cotação do dólar hoje, comercial e turismo, além de euro, libra, peso e bitcoin em reais, atualizada a cada minuto, com conversor entre qualquer moeda.',
			answer:
				'A cotação de moedas mostra quanto valem em reais o dólar comercial, o dólar turismo, o euro, a libra, o peso argentino e outras moedas, além de bitcoin e ethereum, com a variação do dia. Os preços vêm da AwesomeAPI: a página já abre com as cotações e o horário da última atualização, e o navegador as consulta de novo a cada minuto. O valor exibido é o de compra (bid), a referência usada pela maioria dos sites. O conversor funciona nos dois sentidos: digite em qualquer lado e o outro acompanha. Quando um dos lados é o real, ele mostra também a mínima e a máxima do dia. Pares sem o real, como dólar para euro, são cruzados pelo real: o dólar em reais dividido pelo euro em reais. Fora do horário do mercado, a ferramenta mostra a última cotação e avisa que ele está fechado.',
			faq: [
				{
					question: 'Por que o banco cobra mais caro que esta cotação?',
					answer:
						'Esta é a cotação comercial de referência, usada entre instituições. Bancos e casas de câmbio somam o spread (a margem deles) e, em compras no exterior e na compra de moeda em espécie, o IOF. Para dinheiro em espécie, o dólar turismo é a referência mais próxima.',
				},
				{
					question: 'Qual a diferença entre dólar comercial e dólar turismo?',
					answer:
						'O dólar comercial é negociado entre bancos e empresas em grandes volumes, em operações de comércio exterior e investimentos. O dólar turismo é o preço para pessoas físicas comprarem moeda em espécie ou cartão pré-pago e costuma ser mais alto, por causa dos custos de transporte, armazenagem e margem.',
				},
				{
					question: 'Por que a cotação não muda no fim de semana?',
					answer:
						'O mercado de câmbio só funciona em dias úteis. Fora do horário, a ferramenta mostra a última cotação antes do fechamento e avisa que o mercado está fechado. Criptomoedas, como bitcoin e ethereum, são negociadas o tempo todo e seguem mudando.',
				},
				{
					question: 'O que é a variação do dia na cotação?',
					answer:
						'É quanto a cotação subiu ou caiu desde o fechamento anterior, em porcentagem. Num par cruzado, como euro para dólar, ela é calculada a partir da variação de cada moeda contra o real: (1 + variação da origem) ÷ (1 + variação do destino) − 1.',
				},
				{
					question: 'Qual é a cotação oficial do dólar?',
					answer:
						'A referência oficial no Brasil é a PTAX, calculada pelo Banco Central a partir de consultas a instituições ao longo do dia e usada em contratos e na declaração de impostos. A cotação desta página é a de mercado em tempo quase real, que oscila ao longo do dia e pode diferir um pouco da PTAX.',
				},
			],
			howTo: {
				title: 'Como converter dólar em real e entre outras moedas',
				steps: [
					'Veja a cotação da moeda em reais: é o valor de 1 unidade da moeda.',
					'Para converter em reais, multiplique o valor pela cotação.',
					'Para converter de reais para a moeda, divida pelo valor da cotação.',
					'Para um par sem o real, divida a cotação da origem em reais pela cotação do destino em reais.',
					'Para estimar o custo final, acrescente o spread e o IOF informados pelo seu banco ou casa de câmbio.',
				],
				example:
					'Supondo o dólar a R$ 5,40 e o euro a R$ 6,20: US$ 100 valem R$ 540,00; R$ 1.000 compram US$ 185,19; e 1 dólar vale 5,40 ÷ 6,20 = 0,8710 euro. Se o dólar subiu 0,5% no dia e o euro 0,2%, o par dólar/euro variou cerca de 0,30%.',
			},
			updatedAt: UPDATED_AT,
		},
	},
}
