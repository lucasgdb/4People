import type { SectionContent } from './types.ts'

const UPDATED_AT = '2026-11-08'

export const content: SectionContent = {
	intro: [
		'Esta seção tem duas consultas rápidas sobre a sua conexão e sobre endereços no Brasil: descobrir qual é o seu IP público, aquele que os sites enxergam quando você acessa a internet, e encontrar a rua, o bairro, a cidade e o estado a partir de um CEP.',
		'Use o Meu IP para configurar um acesso remoto, liberar o seu endereço no firewall de um servidor ou banco de dados, conferir se uma VPN está funcionando ou informar o IP ao suporte técnico. Use a busca de CEP para preencher um cadastro, conferir um endereço de entrega ou descobrir a qual cidade e bairro um CEP pertence. Para cálculos com endereços IP, como máscara, broadcast e divisão em sub-redes, as calculadoras de sub-rede ficam na seção de infraestrutura.',
		'Diferente da maioria das ferramentas do site, estas duas dependem de serviços públicos externos, consultados direto do seu navegador: o ipify, que devolve o IP de onde partiu a requisição, e a BrasilAPI, que reúne dados de CEP dos Correios e de outras bases. Por isso, precisam de internet, e um bloqueador de anúncios ou uma rede corporativa pode impedir a consulta. As consultas vão do seu navegador direto para esses serviços, sem passar por um servidor do 4People.',
	],
	tools: {
		'meu-ip': {
			title: 'Qual é o meu IP? Veja seu IP público',
			metaDescription:
				'Descubra qual é o seu IP público, o endereço que os sites veem quando você navega. Veja na hora, copie com um clique e confira depois de ligar a VPN.',
			answer:
				'A ferramenta Meu IP mostra o endereço IP público da sua conexão, o mesmo que os sites veem quando você os acessa. Ao abrir a página, o navegador faz uma requisição ao serviço ipify, que responde com o endereço de onde a chamada partiu; a ferramenta indica se ele é IPv4 ou IPv6 e oferece um botão para copiar. Esse IP é o do seu roteador ou da sua operadora, e não o do aparelho dentro da rede de casa. Ele muda ao usar VPN, dados móveis ou outra rede Wi-Fi: depois de trocar, use o botão Atualizar para consultar de novo. Se a consulta falhar, confira a conexão ou desative o bloqueador de anúncios.',
			faq: [
				{
					question: 'Qual a diferença entre IP público e IP local?',
					answer:
						'O IP local, como 192.168.0.10, identifica o aparelho dentro da sua rede e é distribuído pelo roteador. O IP público é o da sua conexão com a internet, compartilhado por todos os aparelhos da casa que saem pelo mesmo roteador.',
				},
				{
					question: 'O meu IP público muda?',
					answer:
						'Na maioria das conexões residenciais, sim. A operadora entrega um IP dinâmico, que pode mudar ao reiniciar o modem ou de tempos em tempos. IP fixo costuma ser vendido à parte, em planos empresariais.',
				},
				{
					question: 'Como saber se a minha VPN está funcionando?',
					answer:
						'Veja o seu IP público com a VPN desligada, ligue a VPN e consulte de novo. Se o endereço mudou para um do provedor da VPN, o tráfego do navegador está passando por ela.',
				},
				{
					question: 'O que é CGNAT e por que ele afeta o meu IP?',
					answer:
						'No CGNAT, a operadora coloca vários clientes atrás do mesmo IP público. Nesse caso, o IP do seu roteador costuma estar na faixa 100.64.0.0/10 e não coincide com o IP público mostrado aqui, o que impede abrir portas para acesso remoto.',
				},
				{
					question: 'Alguém consegue descobrir meu endereço pelo IP?',
					answer:
						'Não com precisão. O IP indica a operadora e, aproximadamente, a cidade ou a região. A ligação entre o IP e o cliente fica com a operadora, que só a revela por ordem judicial.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'buscar-cep': {
			title: 'Buscar CEP: consulte rua, bairro e cidade',
			metaDescription:
				'Consulte um CEP e veja rua, bairro, cidade e estado na hora. Digite os 8 dígitos, com ou sem traço, e copie o endereço pronto para o cadastro.',
			answer:
				'A busca de CEP retorna o logradouro, o bairro, a cidade e o estado de um CEP brasileiro. Digite os 8 dígitos, com ou sem traço: qualquer pontuação é ignorada. A consulta é feita pelo seu navegador na BrasilAPI, um serviço público e gratuito que reúne a base dos Correios e outras fontes de endereço. O resultado aparece em uma lista e pode ser copiado ou baixado em texto. Quando o CEP não existe ou foi digitado errado, a ferramenta avisa que ele não foi encontrado. CEPs gerais de municípios pequenos mostram só a cidade e o estado, sem rua nem bairro.',
			faq: [
				{
					question: 'Por que alguns CEPs não têm rua?',
					answer:
						'Municípios pequenos costumam ter um CEP geral, que vale para a cidade inteira e não indica um logradouro. Nesses casos, a busca mostra só a cidade e o estado.',
				},
				{
					question: 'Preciso digitar o traço do CEP?',
					answer:
						'Não. Basta informar os 8 dígitos; o traço e qualquer outra pontuação são ignorados. 01310-200 e 01310200 dão o mesmo resultado.',
				},
				{
					question: 'Como funciona o número do CEP?',
					answer:
						'O primeiro dígito indica a região do país (0 e 1 são São Paulo, 2 é Rio de Janeiro e Espírito Santo, 9 é Rio Grande do Sul), os seguintes refinam sub-região, setor e subsetor, e os três dígitos depois do traço identificam o logradouro ou a unidade.',
				},
				{
					question: 'Por que o CEP não foi encontrado?',
					answer:
						'Confira se os 8 dígitos estão certos. CEPs muito novos, como os de loteamentos recentes, podem demorar a aparecer nas bases públicas. Nesse caso, consulte o site dos Correios.',
				},
			],
			updatedAt: UPDATED_AT,
		},
	},
}
