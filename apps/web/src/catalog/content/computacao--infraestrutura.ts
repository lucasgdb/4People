import type { SectionContent } from './types.ts'

const UPDATED_AT = '2026-11-08'

export const content: SectionContent = {
	intro: [
		'Esta seção reúne calculadoras para planejar redes e capacidade: sub-redes IPv4 e IPv6, disponibilidade e tempo fora do ar de um SLA, tempo de download de um arquivo e conversão entre unidades de dados, como MB, GiB, Mbps e MB/s. São contas que aparecem em provas de certificação, em projetos de rede, em contratos de serviço e na escolha de um plano de internet.',
		'Use as calculadoras de sub-rede para descobrir a faixa de endereços de uma rede, conferir se dois IPs estão no mesmo segmento ou dividir um bloco em partes menores. A de IPv4 mostra rede, broadcast, máscara, wildcard e o binário; a de IPv6 calcula com inteiros de 128 bits e mostra as formas compactada e expandida e o DNS reverso. A calculadora de SLA traduz porcentagens como 99,9% em minutos fora do ar por mês e combina serviços em série ou em paralelo. Já a de tempo de download e o conversor de unidades resolvem a confusão entre bits e bytes e entre as bases 1000 e 1024.',
		'Todas as contas são feitas no navegador, sem consultar nenhum serviço externo. Os resultados são teóricos: o tempo de download real depende da rede, do servidor e do Wi-Fi, e a disponibilidade medida por um provedor segue as regras do contrato, como janelas de manutenção e a forma de medir.',
	],
	tools: {
		'calculadora-de-sub-rede-ipv4': {
			title: 'Calculadora de sub-rede IPv4 (CIDR e máscara)',
			metaDescription:
				'Calcule rede, broadcast, primeiro e último host, máscara, wildcard e hosts utilizáveis de um IPv4 com CIDR, e divida a rede em sub-redes iguais.',
			answer:
				'Digite um IPv4 com prefixo (192.168.1.10/24) ou com máscara (192.168.1.10 255.255.255.0) e a calculadora aplica um E bit a bit entre o endereço e a máscara para achar a rede. O broadcast é o último endereço do bloco, e os hosts utilizáveis são o total menos dois (rede e broadcast); /31 e /32 seguem regras próprias. A tela mostra máscara, wildcard, primeiro e último host, a classe histórica e o tipo do endereço (privado RFC 1918, CGNAT, loopback, documentação e outros blocos especiais), além do binário com a divisão entre bits de rede e de host. A divisão cria N sub-redes iguais ou sub-redes com um número mínimo de hosts, listando até 256 linhas.',
			faq: [
				{
					question: 'Quantos hosts cabem em uma rede /24?',
					answer:
						'Uma /24 tem 256 endereços, dos quais 254 são utilizáveis: o primeiro é o endereço de rede e o último é o broadcast. A fórmula geral é 2^(32 − prefixo) − 2.',
				},
				{
					question: 'Como funcionam as redes /31 e /32?',
					answer:
						'Uma /31 é usada em enlaces ponto a ponto (RFC 3021) e os dois endereços são hosts, sem rede nem broadcast. Uma /32 representa um único host. Na divisão por número de hosts, a calculadora planeja até /30, reservando rede e broadcast.',
				},
				{
					question: 'O que é a máscara wildcard?',
					answer:
						'É a máscara invertida bit a bit: 255.255.255.0 vira 0.0.0.255. Ela é usada em ACLs de roteadores e no OSPF para indicar quais bits do endereço podem variar.',
				},
				{
					question: 'Como converter a máscara 255.255.255.192 em CIDR?',
					answer:
						'Conte os bits 1 da máscara. 255 tem 8 bits 1 e 192 (11000000) tem 2, então 8 + 8 + 8 + 2 = 26: a máscara é /26, com 64 endereços e 62 hosts utilizáveis.',
				},
				{
					question: 'Quais são as faixas de IP privado?',
					answer:
						'A RFC 1918 reserva 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16 para redes privadas. A faixa 100.64.0.0/10 é o espaço compartilhado usado por operadoras em CGNAT, e 169.254.0.0/16 é o link-local, atribuído quando não há DHCP.',
				},
			],
			howTo: {
				title: 'Como calcular uma sub-rede IPv4',
				steps: [
					'Converta o prefixo em máscara: /26 tem 26 bits 1, ou 255.255.255.192.',
					'Calcule o tamanho do bloco: 2^(32 − prefixo) endereços; em /26, 64.',
					'Ache a rede: arredonde o último octeto para baixo até o múltiplo do bloco mais próximo.',
					'O broadcast é a rede mais o tamanho do bloco menos 1; os hosts ficam entre os dois.',
					'Para dividir em N sub-redes, some ao prefixo os bits necessários para chegar a N (4 sub-redes = 2 bits).',
				],
				example:
					'192.168.1.130/26: máscara 255.255.255.192, wildcard 0.0.0.63, blocos de 64. 130 está entre 128 e 191, então a rede é 192.168.1.128, o broadcast 192.168.1.191 e os hosts vão de 192.168.1.129 a 192.168.1.190 (62 utilizáveis). Dividir 192.168.1.0/24 em 4 dá quatro /26: .0, .64, .128 e .192.',
				source: { label: 'RFC 4632 (CIDR)', url: 'https://www.rfc-editor.org/rfc/rfc4632' },
			},
			updatedAt: UPDATED_AT,
		},
		'calculadora-de-sub-rede-ipv6': {
			title: 'Calculadora de sub-rede IPv6 e prefixos',
			metaDescription:
				'Calcule rede, primeiro e último endereço, total exato de endereços, tipo e DNS reverso de um prefixo IPv6, e liste as sub-redes /64 de um bloco.',
			answer:
				'Informe um endereço IPv6 e o prefixo, como 2001:db8::1/48, e a calculadora zera os bits de host para achar a rede e liga todos eles para achar o último endereço. O total de endereços, 2^(128 − prefixo), é calculado com inteiros de 128 bits (BigInt), sem arredondamento. A tela mostra o endereço compactado segundo a RFC 5952 e expandido com os 8 grupos, o tipo do endereço pelo registro de uso especial da IANA e os nomes de DNS reverso em ip6.arpa. O campo de divisão recebe um prefixo maior, como /64, e informa quantas sub-redes cabem no bloco, listando as 16 primeiras. Endereços com IPv4 no final (::ffff:192.0.2.1) também são aceitos.',
			faq: [
				{
					question: 'Quantos endereços tem uma rede IPv6 /64?',
					answer:
						'2^64, ou 18.446.744.073.709.551.616 endereços. Uma /48, tamanho comum para um cliente corporativo, comporta 65.536 sub-redes /64; uma /56, comum em conexões residenciais, comporta 256.',
				},
				{
					question: 'Quais tipos de endereço IPv6 a calculadora reconhece?',
					answer:
						'Global unicast (2000::/3), unique local (ULA, fc00::/7), link-local (fe80::/10), multicast (ff00::/8), loopback (::1), não especificado (::), IPv4 mapeado, NAT64, Teredo, 6to4, o bloco de descarte e o de documentação 2001:db8::/32.',
				},
				{
					question: 'Como é calculada a zona reversa de um prefixo IPv6?',
					answer:
						'Cada dígito hexadecimal (nibble) do prefixo vira um rótulo, em ordem inversa, sob ip6.arpa. Como cada nibble tem 4 bits, prefixos que não são múltiplos de 4, como /50, usam a zona do nibble inteiro anterior (/48).',
				},
				{
					question: 'Como abreviar um endereço IPv6?',
					answer:
						'Pela RFC 5952: escreva em minúsculas, tire os zeros à esquerda de cada grupo e troque a maior sequência de dois ou mais grupos zerados por ::, uma única vez. 2001:0db8:0000:0000:0000:0000:0000:0001 vira 2001:db8::1.',
				},
				{
					question: 'Por que a sub-rede padrão do IPv6 é /64?',
					answer:
						'A autoconfiguração de endereços (SLAAC) usa os 64 bits finais como identificador da interface. Por isso, redes locais usam /64, e prefixos maiores que /64 só aparecem em casos específicos, como enlaces ponto a ponto.',
				},
			],
			howTo: {
				title: 'Como calcular um prefixo IPv6',
				steps: [
					'Expanda o endereço para os 8 grupos de 4 dígitos hexadecimais.',
					'Mantenha os primeiros bits indicados pelo prefixo e zere o resto para obter a rede.',
					'Troque os bits restantes por 1 (dígitos f) para obter o último endereço.',
					'O total de endereços é 2^(128 − prefixo); o número de sub-redes de um prefixo maior é 2^(novo − atual).',
				],
				example:
					'2001:db8:abcd:12::1/48 expandido é 2001:0db8:abcd:0012:0000:0000:0000:0001. Os 48 primeiros bits são os 3 primeiros grupos, então a rede é 2001:db8:abcd::/48 e o último endereço 2001:db8:abcd:ffff:ffff:ffff:ffff:ffff. Dividida em /64, ela tem 2^16 = 65.536 sub-redes (2001:db8:abcd::/64, 2001:db8:abcd:1::/64…), e a zona reversa é d.c.b.a.8.b.d.0.1.0.0.2.ip6.arpa.',
				source: {
					label: 'RFC 4291 (endereçamento IPv6)',
					url: 'https://www.rfc-editor.org/rfc/rfc4291',
				},
			},
			updatedAt: UPDATED_AT,
		},
		'calculadora-de-sla': {
			title: 'Calculadora de SLA e tempo fora do ar (uptime)',
			metaDescription:
				'Converta disponibilidade como 99,9% em tempo fora do ar por dia, mês e ano, ou o contrário. Calcule também o SLA composto de serviços em série e paralelo.',
			answer:
				'A calculadora de SLA multiplica a indisponibilidade (100% menos a disponibilidade) pela duração de cada período para obter o tempo fora do ar permitido por dia, semana, mês, trimestre e ano. O ano tem 365,25 dias e o mês é 1/12 disso (30,44 dias). No sentido inverso, informe quanto tempo o serviço ficou fora do ar, em segundos, minutos ou horas, e em qual período, para saber a disponibilidade correspondente. Uma tabela mostra os SLAs mais usados, de 99% a 99,999%. Na parte de SLA composto, digite a disponibilidade de cada serviço: em série, elas se multiplicam; em paralelo, multiplicam-se as chances de falha.',
			faq: [
				{
					question: 'Quanto tempo fora do ar permite um SLA de 99,9%?',
					answer:
						'Cerca de 1 minuto e 26 segundos por dia, 43 minutos e 50 segundos por mês e 8 horas e 46 minutos por ano. É o chamado "três noves".',
				},
				{
					question: 'Como se calcula o SLA de serviços em série?',
					answer:
						'Multiplicando as disponibilidades, porque todos precisam funcionar: dois serviços de 99,9% em série resultam em 99,8001%. Em paralelo, com redundância, a indisponibilidade é que se multiplica: dois de 99% resultam em 99,99%.',
				},
				{
					question: 'Quanto tempo fora do ar permite um SLA de 99,99%?',
					answer:
						'Cerca de 8,6 segundos por dia, 4 minutos e 23 segundos por mês e 52 minutos e 36 segundos por ano. Cada nove a mais divide o tempo permitido por 10.',
				},
				{
					question: 'O que é error budget (orçamento de erros)?',
					answer:
						'É o tempo fora do ar que o SLO permite gastar no período. Com uma meta de 99,9% ao mês, o orçamento é de cerca de 43 minutos: enquanto houver saldo, a equipe pode arriscar mudanças; quando ele acaba, a prioridade passa a ser estabilidade.',
				},
				{
					question: 'Qual a diferença entre SLA, SLO e SLI?',
					answer:
						'O SLI é a métrica medida, como a porcentagem de requisições bem-sucedidas. O SLO é a meta interna para essa métrica. O SLA é o compromisso do contrato com o cliente, geralmente mais folgado que o SLO e com penalidades se não for cumprido.',
				},
			],
			howTo: {
				title: 'Como calcular o tempo fora do ar de um SLA',
				steps: [
					'Subtraia a disponibilidade de 100% para obter a indisponibilidade (99,95% → 0,05%).',
					'Converta em fração: 0,05% = 0,0005.',
					'Multiplique pela duração do período em segundos: um dia tem 86.400 s e um mês médio, 2.629.800 s.',
					'Converta o resultado em horas, minutos e segundos.',
				],
				example:
					'SLA de 99,95%: 0,0005 × 86.400 s = 43,2 s por dia; 0,0005 × 2.629.800 s = 1.314,9 s, ou 21 min 54,9 s por mês; e 4 h 22 min 58,8 s por ano. No sentido inverso, 4 horas fora do ar em um mês correspondem a cerca de 99,45% de disponibilidade.',
			},
			updatedAt: UPDATED_AT,
		},
		'calculadora-de-tempo-de-download': {
			title: 'Calculadora de tempo de download',
			metaDescription:
				'Calcule quanto tempo leva para baixar um arquivo na sua velocidade de internet, com perda por overhead, e compare velocidades de 10 Mbps a 10 Gbps.',
			answer:
				'Informe o tamanho do arquivo (B, kB, MB, GB, TB ou as unidades binárias KiB, MiB, GiB e TiB), a velocidade da conexão (kbps, Mbps, Gbps ou MB/s) e a perda por overhead. A calculadora converte o tamanho em bits, multiplica a velocidade por (1 − overhead) para obter a taxa efetiva e divide um pelo outro. O resultado aparece em horas, minutos e segundos (h:mm:ss), junto com a taxa efetiva. O overhead padrão é 10%; use 0 para o máximo teórico. Uma tabela mostra o mesmo arquivo em velocidades comuns, de 10 Mbps a 10 Gbps, com a mesma perda.',
			faq: [
				{
					question: 'Por que 100 Mbps não baixam 100 MB por segundo?',
					answer:
						'Velocidades de internet são medidas em bits por segundo e arquivos em bytes, e 1 byte tem 8 bits. 100 Mbps equivalem a 12,5 MB/s no máximo teórico, e um pouco menos na prática.',
				},
				{
					question: 'O que é o overhead no download?',
					answer:
						'É a parte da conexão gasta com cabeçalhos de protocolo (TCP/IP, TLS), retransmissões e interferência do Wi-Fi, que não carrega dados do arquivo. Cerca de 10% é uma estimativa comum; use 0 para o máximo teórico.',
				},
				{
					question: 'Quanto tempo leva para baixar 1 GB em 100 Mbps?',
					answer:
						'Sem perdas, 1 GB (8.000 megabits) em 100 Mbps leva 80 segundos. Com 10% de overhead, a taxa efetiva cai para 90 Mbps e o download leva cerca de 1 minuto e 29 segundos.',
				},
				{
					question: 'Por que o download real demora mais que o calculado?',
					answer:
						'A conta supõe que a conexão fica cheia o tempo todo. Na prática, o limite pode estar no servidor, no Wi-Fi, no disco ou em outros aparelhos usando a mesma internet. Testes de velocidade medem só o seu trecho da rede.',
				},
			],
			howTo: {
				title: 'Como calcular o tempo de download',
				steps: [
					'Converta o tamanho do arquivo em bits: multiplique os bytes por 8 (1 GB = 8.000.000.000 bits).',
					'Desconte o overhead da velocidade: 100 Mbps com 10% de perda viram 90 Mbps efetivos.',
					'Divida os bits pela velocidade efetiva em bits por segundo.',
					'Converta os segundos em horas, minutos e segundos.',
				],
				example:
					'Um arquivo de 4,7 GB tem 37.600.000.000 bits. Em 100 Mbps com 10% de overhead (90.000.000 bits/s), o download leva 417,8 s, ou 0:06:58. Sem overhead, leva 0:06:16.',
			},
			updatedAt: UPDATED_AT,
		},
		'conversor-de-unidades-de-dados': {
			title: 'Converter MB, GB, GiB, Mbps e MB/s',
			metaDescription:
				'Converta bits, bytes, KB, MB, GB, TB e as unidades binárias KiB, MiB e GiB, além de taxas como Mbps, MB/s e MiB/s, todas de uma vez e sem confusão.',
			answer:
				'Digite um valor e escolha a unidade de origem para vê-lo convertido em todas as outras de uma vez. O conversor transforma tudo em bits e divide pelo tamanho de cada unidade. Ele separa três sistemas: bits (kbit, Mbit, Gbit, Tbit), bytes decimais do SI, em base 1000 (kB, MB, GB, TB, PB), e bytes binários da IEC, em base 1024 (KiB, MiB, GiB, TiB, PiB). No modo taxa de transferência, faz o mesmo com velocidades: bps, kbps, Mbps, Gbps e Tbps, B/s, kB/s, MB/s, GB/s e as binárias KiB/s, MiB/s e GiB/s. Valores muito grandes ou pequenos aparecem em notação científica.',
			faq: [
				{
					question: 'Qual a diferença entre GB e GiB?',
					answer:
						'1 GB tem 1.000.000.000 bytes (base 1000) e 1 GiB tem 1.073.741.824 bytes (base 1024). O Windows calcula em GiB mas mostra a sigla GB, por isso um disco de 1 TB aparece com cerca de 931 GB.',
				},
				{
					question: 'Como converter Mbps em MB/s?',
					answer:
						'Divida por 8, porque 1 byte tem 8 bits: 100 Mbps = 12,5 MB/s e 500 Mbps = 62,5 MB/s. Para o caminho inverso, de MB/s para Mbps, multiplique por 8.',
				},
				{
					question: 'Quantos MB tem 1 GB?',
					answer:
						'No padrão decimal do SI, 1 GB tem 1.000 MB. No padrão binário, 1 GiB tem 1.024 MiB. Fabricantes de discos e operadoras usam a base 1000; sistemas operacionais e memória RAM costumam usar a base 1024.',
				},
				{
					question: 'Por que meu pendrive de 64 GB mostra menos espaço?',
					answer:
						'Porque 64 GB são 64 bilhões de bytes, que o sistema exibe em base 1024 como cerca de 59,6 GiB. Uma pequena parte ainda vai para o sistema de arquivos.',
				},
			],
			howTo: {
				title: 'Como converter unidades de dados',
				steps: [
					'Veja se a unidade é de bits (b minúsculo) ou de bytes (B maiúsculo): 1 byte = 8 bits.',
					'Nas unidades decimais (kB, MB, GB), cada degrau multiplica por 1.000.',
					'Nas unidades binárias (KiB, MiB, GiB), cada degrau multiplica por 1.024.',
					'Para trocar de sistema, passe pelo número de bytes e divida pelo tamanho da unidade de destino.',
				],
				example:
					'1 TB = 1.000.000.000.000 bytes. Dividindo por 1.073.741.824 (bytes de 1 GiB), dá 931,32 GiB. Em taxas, 500 Mbps ÷ 8 = 62,5 MB/s, ou cerca de 59,6 MiB/s.',
				source: {
					label: 'NIST: prefixos binários',
					url: 'https://physics.nist.gov/cuu/Units/binary.html',
				},
			},
			updatedAt: UPDATED_AT,
		},
	},
}
