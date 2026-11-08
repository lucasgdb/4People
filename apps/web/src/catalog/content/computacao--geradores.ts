import type { SectionContent } from './types.ts'

export const content: SectionContent = {
	intro: [
		'Os geradores desta seção criam dados fictícios que passam nas mesmas regras de validação dos dados reais. Há geradores de documentos brasileiros (CPF, CNPJ, RG, CNH, PIS/PASEP, RENAVAM e título de eleitor), de números de cartão de crédito, de placas de veículo, de CEPs, de telefones com DDD, de nomes e de pessoas completas, além de ferramentas de uso técnico: senhas, UUIDs e hashes. Tudo é calculado no navegador; documentos, senhas, cartões e UUIDs são sorteados com o gerador criptográfico da Web Crypto API.',
		'Para testar um formulário que valida um campo específico, use o gerador daquele documento: ele calcula os dígitos verificadores pela regra oficial, então o número passa na mesma conta que o seu sistema faz. Para popular um banco de dados ou montar fixtures, o gerador de pessoas entrega registros inteiros e coerentes, com CPF do estado escolhido, idade compatível com a data de nascimento e exportação em JSON ou CSV. Para checkouts, o gerador de cartão de crédito cria números que passam no algoritmo de Luhn. Senha, UUID e hash atendem outras necessidades: proteger contas, criar identificadores únicos e conferir a integridade de textos.',
		'Os documentos, cartões e placas gerados aqui são válidos apenas na matemática dos dígitos verificadores. Eles não são consultados nem registrados em nenhum órgão, não pertencem a ninguém de propósito e não servem para cadastro real, compra, emissão de nota fiscal ou qualquer identificação. Use-os só em ambientes de desenvolvimento e teste.',
	],
	tools: {
		'gerador-de-cpf': {
			title: 'Gerador de CPF válido para testes',
			metaDescription:
				'Gere CPFs válidos para testar sistemas, com ou sem pontuação e com o estado de emissão que quiser. Dígitos verificadores calculados pelo módulo 11.',
			answer:
				'O gerador de CPF cria números matematicamente válidos para testar cadastros e sistemas em desenvolvimento. Ele sorteia os nove primeiros dígitos e calcula os dois dígitos verificadores pelo módulo 11: o primeiro usa os pesos 10 a 2 sobre os nove dígitos, o segundo usa os pesos 11 a 2 sobre os dez primeiros. Se o resto da divisão por 11 for 0 ou 1, o dígito é 0; nos outros casos, é 11 menos o resto. O nono dígito indica a região fiscal de emissão, por isso você pode escolher o estado e o gerador fixa esse dígito. Dá para gerar de 1 a 20 CPFs por vez, com pontos e hífen (000.000.000-00) ou só números.',
			faq: [
				{
					question: 'O CPF gerado é de uma pessoa real?',
					answer:
						'Não de propósito. O CPF gerado só passa na conta dos dígitos verificadores; ele não é consultado nem registrado na Receita Federal e pode até coincidir com um número existente por acaso. Use apenas em testes de software, nunca para se identificar ou fazer cadastros reais.',
				},
				{
					question: 'Como o estado de emissão aparece no CPF?',
					answer:
						'O nono dígito do CPF indica a região fiscal onde ele foi emitido: 8 é São Paulo, 7 é Rio de Janeiro e Espírito Santo, 6 é Minas Gerais, 0 é Rio Grande do Sul, e assim por diante. Ao escolher um estado, o gerador fixa esse dígito e calcula os verificadores a partir dele.',
				},
				{
					question: 'Por que um CPF com todos os dígitos iguais é inválido?',
					answer:
						'CPFs como 111.111.111-11 passam na conta do módulo 11, mas a Receita Federal não os emite, e os validadores costumam recusá-los. Com nove dígitos sorteados, a chance de o gerador produzir um desses números é desprezível.',
				},
				{
					question: 'Qual a diferença entre gerar com ou sem pontuação?',
					answer:
						'O número do CPF é o mesmo; muda só a forma de escrever. Com pontuação ele aparece como 000.000.000-00, que é como se lê em documentos; só números (00000000000) é o formato que muitos bancos de dados e APIs esperam.',
				},
			],
			howTo: {
				title: 'Como calcular os dígitos verificadores do CPF',
				steps: [
					'Multiplique os nove primeiros dígitos pelos pesos 10, 9, 8, 7, 6, 5, 4, 3 e 2 e some os resultados.',
					'Divida a soma por 11. Se o resto for 0 ou 1, o primeiro dígito verificador é 0; se não, é 11 menos o resto.',
					'Junte o primeiro verificador aos nove dígitos e multiplique os dez pelos pesos 11, 10, 9, 8, 7, 6, 5, 4, 3 e 2.',
					'Divida essa nova soma por 11 e aplique a mesma regra para obter o segundo dígito verificador.',
				],
				example:
					'Para 123.456.789: 1×10 + 2×9 + 3×8 + 4×7 + 5×6 + 6×5 + 7×4 + 8×3 + 9×2 = 210; 210 ÷ 11 deixa resto 1, então o primeiro dígito é 0. Com os pesos 11 a 2 sobre 1234567890, a soma é 255, que deixa resto 2; o segundo dígito é 11 − 2 = 9. O CPF completo é 123.456.789-09.',
			},
			updatedAt: '2026-11-08',
		},
		'gerador-de-cnpj': {
			title: 'Gerador de CNPJ válido numérico e alfanumérico',
			metaDescription:
				'Gere CNPJs válidos para testes no formato numérico ou no novo CNPJ alfanumérico, com ou sem pontuação. Dígitos verificadores pelo módulo 11.',
			answer:
				'O gerador de CNPJ cria números válidos para testar sistemas. No formato numérico, que é o padrão, ele sorteia os oito dígitos da raiz, usa 0001 como número do estabelecimento (a matriz) e calcula os dois dígitos verificadores pelo módulo 11, com os pesos 5 a 2 e 9 a 2 no primeiro e 6 a 2 e 9 a 2 no segundo. No formato alfanumérico, adotado pela Receita Federal a partir de julho de 2026, a raiz pode ter letras de A a Z e números; os dois verificadores continuam numéricos. Cada caractere vale o seu código ASCII menos 48 (0 a 9 valem 0 a 9, A vale 17, Z vale 42), e a conta segue a mesma. Gera de 1 a 20 por vez, com ou sem pontuação.',
			faq: [
				{
					question: 'O que é o CNPJ alfanumérico?',
					answer:
						'É o novo formato do CNPJ, que a Receita Federal passou a atribuir a partir de julho de 2026 para não esgotar os números disponíveis. Os 12 primeiros caracteres podem ser letras ou números, e os dois últimos, os dígitos verificadores, continuam sendo números. Os CNPJs numéricos que já existem não mudam.',
				},
				{
					question: 'Como validar um CNPJ com letras?',
					answer:
						'Substitua cada caractere pelo código ASCII menos 48: os números mantêm o próprio valor e as letras vão de A = 17 a Z = 42. Depois aplique a mesma regra do CNPJ numérico, com os pesos 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 para o primeiro verificador e 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 para o segundo.',
				},
				{
					question: 'Por que todo CNPJ gerado tem 0001 antes dos dígitos verificadores?',
					answer:
						'Os quatro caracteres depois da barra identificam o estabelecimento da empresa, e 0001 é a matriz. O gerador fixa 0001 porque é o caso mais comum em cadastros de teste; filiais usam 0002, 0003 e assim por diante.',
				},
				{
					question: 'Posso usar o CNPJ gerado para emitir nota fiscal?',
					answer:
						'Não. O CNPJ gerado é válido só matematicamente, não está registrado na Receita Federal e não pertence a nenhuma empresa de propósito. Ele serve para testar formulários, máscaras e regras de validação, nunca para emitir documentos fiscais.',
				},
				{
					question: 'Meu sistema precisa aceitar o CNPJ alfanumérico?',
					answer:
						'Sim, se ele recebe CNPJs de empresas abertas a partir de julho de 2026. Campos guardados como número inteiro, máscaras que só aceitam dígitos e validações que removem tudo o que não é número precisam ser ajustados; gerar CNPJs alfanuméricos de teste ajuda a encontrar esses pontos.',
				},
			],
			howTo: {
				title: 'Como calcular os dígitos verificadores do CNPJ',
				steps: [
					'Converta cada um dos 12 primeiros caracteres em valor: números valem o próprio dígito e letras valem o código ASCII menos 48 (A = 17, B = 18 … Z = 42).',
					'Multiplique os 12 valores pelos pesos 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 e some os resultados.',
					'Divida a soma por 11. Se o resto for 0 ou 1, o primeiro dígito verificador é 0; se não, é 11 menos o resto.',
					'Acrescente o primeiro verificador e multiplique os 13 valores pelos pesos 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2.',
					'Aplique a mesma regra do resto à nova soma para obter o segundo dígito verificador.',
				],
				example:
					'Numérico: para 11.222.333/0001, a soma com os pesos 5 a 2 e 9 a 2 é 102, resto 3, então o primeiro dígito é 8; a segunda soma é 120, resto 10, então o segundo é 1. Resultado: 11.222.333/0001-81. Alfanumérico: em 12.ABC.345/01DE, A, B, C, D e E valem 17, 18, 19, 20 e 21; a primeira soma é 459, resto 8, dígito 3; a segunda é 424, resto 6, dígito 5. Resultado: 12.ABC.345/01DE-35.',
			},
			updatedAt: '2026-11-08',
		},
		'gerador-de-rg': {
			title: 'Gerador de RG válido no padrão SSP-SP',
			metaDescription:
				'Gere números de RG válidos no padrão da SSP de São Paulo para testar sistemas, com ou sem pontuação. Dígito verificador de 0 a 9 ou X.',
			answer:
				'O gerador de RG cria números no padrão da Secretaria de Segurança Pública de São Paulo (SSP-SP), o formato mais usado em sistemas de teste. Ele sorteia oito dígitos e calcula um dígito verificador: multiplica os dígitos pelos pesos 2, 3, 4, 5, 6, 7, 8 e 9, soma e divide por 11. Se o resto for 0, o verificador é 0; se for 1, é a letra X; nos outros casos, é 11 menos o resto. Dá para gerar de 1 a 20 RGs por vez, no formato 00.000.000-0 ou só com os caracteres, sem pontos e hífen.',
			faq: [
				{
					question: 'O RG gerado vale para qualquer estado?',
					answer:
						'Não. O RG não tem um padrão nacional: cada secretaria de segurança estadual define o formato e a regra do dígito. O gerador segue o padrão da SSP-SP, que outros validadores costumam usar como referência, mas um RG de outro estado pode ter outro tamanho ou não ter dígito verificador.',
				},
				{
					question: 'Por que alguns RGs terminam em X?',
					answer:
						'No RG de São Paulo, quando o resto da divisão da soma ponderada por 11 é 1, o dígito verificador seria 10, que não cabe em uma posição. Nesse caso a SSP-SP usa a letra X no lugar do dígito.',
				},
				{
					question: 'O RG gerado pertence a alguém?',
					answer:
						'Não de propósito. O RG gerado só passa na conta do dígito verificador e não é consultado em nenhuma base da SSP. Ele serve para preencher formulários e testar validações em desenvolvimento.',
				},
				{
					question: 'O RG vai ser substituído pela nova carteira de identidade?',
					answer:
						'Sim. A nova Carteira de Identidade Nacional usa o número do CPF como identificador único, e o número antigo do RG deixa de ser emitido aos poucos. Mesmo assim, muitos sistemas ainda guardam o RG, por isso gerar números de teste continua útil.',
				},
			],
			howTo: {
				title: 'Como calcular o dígito do RG de São Paulo',
				steps: [
					'Multiplique os oito dígitos do RG pelos pesos 2, 3, 4, 5, 6, 7, 8 e 9, da esquerda para a direita.',
					'Some os oito produtos.',
					'Divida a soma por 11 e veja o resto.',
					'Se o resto for 0, o dígito é 0; se for 1, o dígito é X; nos outros casos, o dígito é 11 menos o resto.',
				],
				example:
					'Para 24.678.135: 2×2 + 4×3 + 6×4 + 7×5 + 8×6 + 1×7 + 3×8 + 5×9 = 199. 199 ÷ 11 dá 18 com resto 1, então o dígito é X e o RG completo é 24.678.135-X.',
			},
			updatedAt: '2026-11-08',
		},
		'gerador-de-senha': {
			title: 'Gerador de senha forte e aleatória',
			metaDescription:
				'Gere senhas fortes e aleatórias, frases fáceis de lembrar ou PINs, com a entropia em bits e o tempo estimado para quebrar. Nada sai do navegador.',
			answer:
				'O gerador de senha cria senhas de três tipos, todas sorteadas pela Web Crypto API no seu navegador. A aleatória tem de 4 a 128 caracteres (16 por padrão) e usa os tipos que você ligar: minúsculas, maiúsculas, números e símbolos; também pode evitar caracteres iguais ou parecidos lado a lado. A fácil de lembrar junta de 2 a 10 palavras inventadas de três sílabas, com separador, inicial maiúscula e um número opcional. O PIN tem de 4 a 12 dígitos e pode evitar sequências óbvias como 1234. A força vem da entropia: o logaritmo na base 2 do número de combinações possíveis. O tempo para quebrar considera 10 bilhões de tentativas por segundo.',
			faq: [
				{
					question: 'Qual o tamanho ideal de uma senha?',
					answer:
						'Para uma senha aleatória com letras maiúsculas, minúsculas e números, 12 caracteres já somam cerca de 71 bits de entropia; para e-mail, banco e gerenciador de senhas, prefira 16 ou mais. Cada caractere a mais multiplica o número de combinações pelo tamanho do conjunto de caracteres.',
				},
				{
					question: 'Senha com palavras é segura?',
					answer:
						'Pode ser, se as palavras forem sorteadas e não escolhidas por você. Uma senha de quatro palavras inventadas de três sílabas com um número de dois dígitos tem cerca de 84 bits de entropia, um pouco mais que uma senha aleatória de 13 caracteres com letras, números e símbolos, e é bem mais fácil de digitar.',
				},
				{
					question: 'Para que serve evitar caracteres parecidos?',
					answer:
						'A opção impede que pares fáceis de confundir apareçam lado a lado, como l e I, O e 0 ou g e q. Isso ajuda quando a senha precisa ser lida em voz alta ou copiada à mão, e reduz muito pouco a entropia.',
				},
				{
					question: 'O site guarda a senha gerada?',
					answer:
						'Não. A senha é sorteada no seu navegador com a Web Crypto API e não é enviada a nenhum servidor. Mesmo assim, guarde-a em um gerenciador de senhas e não reutilize a mesma senha em mais de um serviço.',
				},
			],
			howTo: {
				title: 'Como calcular a entropia de uma senha',
				steps: [
					'Conte quantos caracteres diferentes podem aparecer: 26 minúsculas, 26 maiúsculas, 10 números e os símbolos usados.',
					'Calcule o logaritmo na base 2 desse total: são os bits de cada caractere.',
					'Multiplique pelos caracteres da senha para ter a entropia total em bits.',
					'Para o tempo médio de quebra, calcule 2 elevado à entropia, divida por 2 e pelo número de tentativas por segundo do atacante.',
				],
				example:
					'Com minúsculas, maiúsculas, números e os 14 símbolos do gerador, são 76 caracteres possíveis; log₂ 76 ≈ 6,25 bits por caractere. Uma senha de 16 caracteres tem 16 × 6,25 ≈ 100 bits. A 10 bilhões de tentativas por segundo, testar metade das combinações levaria mais que a idade do universo.',
			},
			updatedAt: '2026-11-08',
		},
		'gerador-de-nomes': {
			title: 'Gerador de nomes brasileiros aleatórios',
			metaDescription:
				'Gere até 500 nomes brasileiros aleatórios de uma vez: só o primeiro nome, com sobrenome ou com dois sobrenomes, por sexo. Copie ou salve em .txt.',
			answer:
				'O gerador de nomes cria nomes brasileiros aleatórios para preencher dados de teste, protótipos e exemplos. Você escolhe o tipo de nome (apenas o primeiro nome, nome e sobrenome, ou nome com dois sobrenomes diferentes), o sexo (masculino, feminino ou ambos) e a quantidade, de 1 a 500. Os primeiros nomes e sobrenomes são sorteados da base em português do Brasil da biblioteca Faker, que reúne nomes comuns no país, e combinados de forma independente. A lista pode ser copiada inteira, nome a nome, ou salva em um arquivo de texto com um nome por linha.',
			faq: [
				{
					question: 'Os nomes gerados pertencem a pessoas reais?',
					answer:
						'Não de propósito. Cada nome é uma combinação aleatória de primeiro nome e sobrenomes comuns no Brasil. Como são nomes frequentes, alguma combinação pode coincidir com a de uma pessoa real, mas sem nenhum outro dado ligado a ela.',
				},
				{
					question: 'Quantos nomes posso gerar de uma vez?',
					answer:
						'O gerador de nomes cria de 1 a 500 nomes por vez. A lista pode ser copiada de uma vez ou salva em um arquivo .txt, com um nome por linha, pronto para importar em planilhas ou scripts.',
				},
				{
					question: 'Os nomes podem se repetir na mesma lista?',
					answer:
						'Podem. Cada nome é sorteado de forma independente, então em listas grandes, principalmente só com o primeiro nome, é normal aparecerem repetições. Com nome e dois sobrenomes as repetições ficam bem mais raras.',
				},
				{
					question: 'Para que serve um gerador de nomes aleatórios?',
					answer:
						'Para preencher bancos de dados de teste, telas de protótipo e planilhas de exemplo sem expor dados de clientes, o que também ajuda a cumprir a LGPD. Também é usado para escolher nomes de personagens ou testar campos de formulário com acentos.',
				},
			],
			updatedAt: '2026-11-08',
		},
		'gerador-de-uuid': {
			title: 'Gerador de UUID v4 e v7 online',
			metaDescription:
				'Gere até 1.000 UUIDs v4 aleatórios ou v7 ordenados por tempo, com ou sem hífens e em maiúsculas. Segue a RFC 9562 e usa a Web Crypto API.',
			answer:
				'O gerador de UUID cria identificadores únicos de 128 bits, escritos como 32 dígitos hexadecimais em cinco grupos. A versão 4 tem 122 bits aleatórios e nenhuma ordem. A versão 7, definida na RFC 9562, começa com o horário Unix em milissegundos (48 bits), seguido de um contador de 12 bits e de bits aleatórios; por isso os IDs saem em ordem de criação, mesmo dentro do mesmo milissegundo, o que mantém índices de banco de dados mais compactos. Os bits aleatórios vêm da Web Crypto API. Você gera de 1 a 1.000 por vez e pode tirar os hífens ou passar para maiúsculas sem gerar de novo.',
			faq: [
				{
					question: 'Qual a diferença entre UUID v4 e v7?',
					answer:
						'O UUID v4 é totalmente aleatório e não tem ordem. O UUID v7 guarda o momento da criação nos primeiros 48 bits e completa com um contador e bits aleatórios, então dois UUIDs v7 podem ser ordenados pela data em que foram gerados. Para chaves primárias de banco de dados, o v7 costuma ser a melhor escolha.',
				},
				{
					question: 'Dois UUIDs podem se repetir?',
					answer:
						'Na prática, não. Um UUID v4 tem 122 bits aleatórios: seria preciso gerar cerca de 2,7 quintilhões deles para ter 50% de chance de uma única repetição. No UUID v7, IDs criados no mesmo milissegundo ainda se diferenciam pelo contador e pelos bits aleatórios.',
				},
				{
					question: 'UUID e GUID são a mesma coisa?',
					answer:
						'Sim. GUID é o nome que a Microsoft usa para o mesmo identificador de 128 bits. A Microsoft costuma escrever o GUID em maiúsculas e entre chaves, mas o valor é igual ao de um UUID.',
				},
				{
					question: 'Dá para saber quando um UUID v7 foi criado?',
					answer:
						'Sim. Os 12 primeiros dígitos hexadecimais de um UUID v7 são o horário Unix em milissegundos. Convertendo esse número para decimal e depois para data, você descobre o momento da criação, por isso não use UUID v7 quando o horário precisar ficar oculto.',
				},
			],
			howTo: {
				title: 'Como identificar a versão de um UUID',
				steps: [
					'Escreva o UUID no formato com hífens: 8-4-4-4-12 dígitos hexadecimais.',
					'Olhe o primeiro dígito do terceiro grupo (o 13º dígito): ele é a versão, como 4 ou 7.',
					'Confira o primeiro dígito do quarto grupo: 8, 9, a ou b indicam a variante da RFC 9562.',
					'Se a versão for 7, junte os dois primeiros grupos e converta de hexadecimal para decimal: é o horário Unix em milissegundos.',
				],
				example:
					'Em 01a1bb07-9a00-722b-a9d3-d742bbd207de, o 13º dígito é 7, então é um UUID v7, e o quarto grupo começa com a. Os 12 primeiros dígitos, 01a1bb079a00, valem 1.794.139.200.000 em decimal, que é 8 de novembro de 2026 às 12:00 UTC.',
				source: { label: 'RFC 9562 (IETF)', url: 'https://www.rfc-editor.org/rfc/rfc9562' },
			},
			updatedAt: '2026-11-08',
		},
		'gerador-de-hash': {
			title: 'Gerador de hash MD5, SHA-256 e SHA-512',
			metaDescription:
				'Calcule de uma vez o hash MD5, SHA-1, SHA-256, SHA-384, SHA-512 e CRC32 de um texto em UTF-8, em hexadecimal. Tudo no navegador, sem enviar nada.',
			answer:
				'O gerador de hash calcula de uma vez o MD5, o SHA-1, o SHA-256, o SHA-384, o SHA-512 e o CRC32 de um texto. O texto é convertido em bytes UTF-8 antes do cálculo, e cada resultado aparece em hexadecimal, com um botão para copiar. Os quatro SHA usam a Web Crypto API do navegador; o MD5 segue a RFC 1321 e o CRC32 usa o polinômio IEEE, o mesmo de ZIP e PNG. Uma função de hash é determinística: o mesmo texto sempre gera o mesmo resultado, e qualquer mudança, até um espaço ou uma quebra de linha, muda o hash por completo. Não dá para recuperar o texto a partir do hash.',
			faq: [
				{
					question: 'Posso guardar senhas com SHA-256?',
					answer:
						'Não diretamente. O SHA-256 é rápido demais, o que facilita ataques de força bruta contra senhas vazadas. Para guardar senhas, use algoritmos lentos e com sal, como Argon2, bcrypt ou scrypt; o SHA-256 serve para verificar integridade de arquivos e mensagens e para assinaturas.',
				},
				{
					question: 'Por que o MD5 aparece como “só para checksum”?',
					answer:
						'O MD5 tem colisões conhecidas: é possível criar dois conteúdos diferentes com o mesmo hash MD5. Por isso ele não serve para segurança. Ele continua útil para conferir se um texto ou arquivo não mudou por acidente, assim como o CRC32; para segurança, use SHA-256 ou superior.',
				},
				{
					question: 'Por que o hash do mesmo texto saiu diferente em outro programa?',
					answer:
						'Quase sempre o texto não é exatamente o mesmo: um espaço ou quebra de linha no final, uma quebra de linha do Windows (CRLF) em vez de LF, ou outra codificação de caracteres, como Latin-1 em vez de UTF-8. Qualquer byte diferente muda o hash inteiro.',
				},
				{
					question: 'Dá para descobrir o texto original a partir do hash?',
					answer:
						'Não por cálculo: as funções de hash são de mão única. O que existe são tabelas com hashes de textos comuns, por isso hashes de senhas curtas ou palavras conhecidas podem ser encontrados por busca. Textos longos e aleatórios não podem ser recuperados dessa forma.',
				},
			],
			howTo: {
				title: 'Como conferir se um texto não foi alterado',
				steps: [
					'Calcule o hash SHA-256 do texto original e guarde o resultado.',
					'Quando receber o texto de novo, calcule o SHA-256 dele da mesma forma, com a mesma codificação.',
					'Compare os dois resultados: se forem iguais, o texto é o mesmo; se qualquer caractere for diferente, o texto mudou.',
				],
				example:
					'O texto abc tem SHA-256 ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad, MD5 900150983cd24fb0d6963f7d28e17f72 e CRC32 352441c2. Trocar para Abc muda os três resultados por completo.',
			},
			updatedAt: '2026-11-08',
		},
		'gerador-de-cnh': {
			title: 'Gerador de CNH válida para testes',
			metaDescription:
				'Gere números de registro de CNH válidos para testar sistemas: 11 dígitos com os dois verificadores calculados pela regra do Detran, de 1 a 20 por vez.',
			answer:
				'O gerador de CNH cria números de registro da Carteira Nacional de Habilitação com 11 dígitos, válidos para testes. Ele sorteia 9 dígitos e calcula 2 dígitos verificadores pelo módulo 11. O primeiro usa os pesos 9 a 1 sobre os nove dígitos; se o resto der 10 ou mais, o dígito vira 0 e o segundo ganha um desconto de 2. O segundo usa os pesos 1 a 9 e, do resto, subtrai esse desconto; resto 10 ou mais vira 0. Bases em que o segundo dígito daria negativo são descartadas, como acontece na numeração real, assim como bases com todos os dígitos iguais. O número da CNH não tem pontuação, e dá para gerar de 1 a 20 por vez.',
			faq: [
				{
					question: 'A CNH gerada pertence a alguém?',
					answer:
						'Não de propósito. O número de CNH gerado só passa na conta dos dígitos verificadores e não é consultado no Renach nem em nenhum Detran. Use apenas para testar sistemas, nunca como documento.',
				},
				{
					question: 'A CNH tem pontuação?',
					answer:
						'Não. O número de registro da CNH é escrito com os 11 dígitos seguidos, sem pontos nem hífen, por isso o gerador não oferece a opção de pontuação.',
				},
				{
					question: 'Número de registro e número do espelho da CNH são a mesma coisa?',
					answer:
						'Não. O número de registro, com 11 dígitos, identifica o condutor e acompanha todas as vias da habilitação; é esse que o gerador cria. O número do espelho identifica o papel impresso de cada via e muda a cada nova emissão.',
				},
			],
			howTo: {
				title: 'Como calcular os dígitos verificadores da CNH',
				steps: [
					'Multiplique os nove dígitos pelos pesos 9, 8, 7, 6, 5, 4, 3, 2 e 1 e some. O resto da divisão por 11 é o primeiro dígito; se for 10, o dígito vira 0 e anote um desconto de 2.',
					'Multiplique os mesmos nove dígitos pelos pesos 1, 2, 3, 4, 5, 6, 7, 8 e 9 e some.',
					'Divida por 11. Se o resto for 10, o segundo dígito é 0; se não, é o resto menos o desconto (0 ou 2).',
					'Se o segundo dígito der negativo, a base não gera uma CNH válida.',
				],
				example:
					'Para 234567891: com os pesos 9 a 1 a soma é 201, resto 3, então o primeiro dígito é 3, sem desconto. Com os pesos 1 a 9 a soma é 249, resto 7, então o segundo é 7. A CNH completa é 23456789137.',
			},
			updatedAt: '2026-11-08',
		},
		'gerador-de-pis': {
			title: 'Gerador de PIS/PASEP e NIS válido',
			metaDescription:
				'Gere números de PIS, PASEP, NIS ou NIT válidos para testar sistemas, com ou sem pontuação. Dígito verificador calculado pelo módulo 11.',
			answer:
				'O gerador de PIS/PASEP cria números de 11 dígitos válidos para testes. Ele sorteia 10 dígitos e calcula o dígito verificador pelo módulo 11: multiplica os dez dígitos pelos pesos 3, 2, 9, 8, 7, 6, 5, 4, 3 e 2, soma e divide por 11. Se o resto for 0 ou 1, o dígito é 0; nos outros casos, é 11 menos o resto. O mesmo formato e a mesma regra valem para NIS e NIT, então o número gerado serve para testar qualquer um desses campos. Dá para gerar de 1 a 20 por vez, com pontuação (000.00000.00-0) ou só números.',
			faq: [
				{
					question: 'PIS, PASEP, NIS e NIT são a mesma coisa?',
					answer:
						'Têm o mesmo formato de 11 dígitos e a mesma regra de dígito verificador. O PIS é de quem trabalha no setor privado e o PASEP, no setor público; NIS é o nome usado pela Caixa em programas sociais, e NIT é o nome usado pelo INSS.',
				},
				{
					question: 'Posso usar o PIS gerado para algum benefício?',
					answer:
						'Não. O número de PIS gerado é fictício: só passa na validação matemática e não está registrado na Caixa, no Banco do Brasil nem no INSS. Ele serve para testar folhas de pagamento, eSocial e cadastros em ambiente de desenvolvimento.',
				},
				{
					question: 'Onde encontro o meu número de PIS verdadeiro?',
					answer:
						'O número do PIS aparece na Carteira de Trabalho Digital, no aplicativo Meu INSS, no FGTS e nos extratos de benefícios sociais. Hoje o CPF também é aceito como identificador em muitos desses serviços.',
				},
			],
			howTo: {
				title: 'Como calcular o dígito verificador do PIS',
				steps: [
					'Multiplique os dez primeiros dígitos pelos pesos 3, 2, 9, 8, 7, 6, 5, 4, 3 e 2.',
					'Some os dez produtos e divida por 11.',
					'Se o resto for 0 ou 1, o dígito verificador é 0; nos outros casos, é 11 menos o resto.',
				],
				example:
					'Para 120.34567.89: 1×3 + 2×2 + 0×9 + 3×8 + 4×7 + 5×6 + 6×5 + 7×4 + 8×3 + 9×2 = 189. 189 ÷ 11 deixa resto 2, então o dígito é 11 − 2 = 9 e o PIS completo é 120.34567.89-9.',
			},
			updatedAt: '2026-11-08',
		},
		'gerador-de-renavam': {
			title: 'Gerador de RENAVAM válido para testes',
			metaDescription:
				'Gere códigos RENAVAM de 11 dígitos válidos para testar sistemas de veículos e despachantes, com o dígito verificador calculado pelo módulo 11.',
			answer:
				'O gerador de RENAVAM cria códigos de 11 dígitos válidos para testar sistemas de veículos, multas e despachantes. Ele sorteia 10 dígitos e calcula o dígito verificador: multiplica os dez dígitos pelos pesos 3, 2, 9, 8, 7, 6, 5, 4, 3 e 2, soma, multiplica a soma por 10 e tira o resto da divisão por 11. Se esse resto for 10, o dígito é 0; nos outros casos, é o próprio resto. O RENAVAM é escrito sem pontuação, e o gerador cria de 1 a 20 códigos por vez.',
			faq: [
				{
					question: 'O RENAVAM gerado é de um veículo real?',
					answer:
						'Não de propósito. O código RENAVAM gerado só passa na conta do dígito verificador e não aparece em nenhuma consulta do Detran ou da Senatran. Use apenas para testar sistemas.',
				},
				{
					question: 'O RENAVAM tem 9 ou 11 dígitos?',
					answer:
						'Hoje o RENAVAM tem 11 dígitos. Códigos antigos, de 9 dígitos, continuam válidos e são completados com zeros à esquerda: 639724361 vira 00639724361, e o dígito verificador não muda.',
				},
				{
					question: 'Onde fica o RENAVAM no documento do veículo?',
					answer:
						'O código RENAVAM aparece no Certificado de Registro e Licenciamento de Veículo (CRLV), inclusive na versão digital do aplicativo Carteira Digital de Trânsito. Ele identifica o veículo e não muda quando o carro troca de dono ou de placa.',
				},
			],
			howTo: {
				title: 'Como calcular o dígito verificador do RENAVAM',
				steps: [
					'Complete o código com zeros à esquerda até ter 10 dígitos antes do verificador.',
					'Multiplique os dez dígitos pelos pesos 3, 2, 9, 8, 7, 6, 5, 4, 3 e 2 e some.',
					'Multiplique a soma por 10 e divida por 11.',
					'O resto é o dígito verificador; se o resto for 10, o dígito é 0.',
				],
				example:
					'Para 0063972436: 0×3 + 0×2 + 6×9 + 3×8 + 9×7 + 7×6 + 2×5 + 4×4 + 3×3 + 6×2 = 230. 230 × 10 = 2.300, e 2.300 ÷ 11 deixa resto 1. O RENAVAM completo é 00639724361.',
			},
			updatedAt: '2026-11-08',
		},
		'gerador-de-titulo-de-eleitor': {
			title: 'Gerador de título de eleitor válido',
			metaDescription:
				'Gere números de título de eleitor válidos para testes, escolhendo o estado de emissão. Dígitos verificadores pelo módulo 11, com a regra de SP e MG.',
			answer:
				'O gerador de título de eleitor cria números de 12 dígitos válidos para testes. Os 8 primeiros dígitos são sorteados, os 2 seguintes são o código do estado (01 é SP, 02 é MG, 03 é RJ… 28 é exterior) e os 2 últimos são dígitos verificadores. O primeiro verificador multiplica os oito dígitos pelos pesos 2 a 9; o segundo multiplica os dois dígitos do estado por 7 e 8 e o primeiro verificador por 9. Nos dois, o dígito é o resto da divisão por 11, e resto 10 vira 0. Em SP e MG, resto 0 vira 1. Você escolhe o estado ou deixa sortear, e gera de 1 a 20 por vez, com ou sem espaços.',
			faq: [
				{
					question: 'Qual a regra especial de SP e MG no título de eleitor?',
					answer:
						'Nos títulos de eleitor emitidos em São Paulo (código 01) e Minas Gerais (código 02), quando o resto da divisão por 11 é 0, o dígito verificador vira 1, e não 0. Nos outros estados, resto 0 dá dígito 0.',
				},
				{
					question: 'Como saber o estado de um título de eleitor?',
					answer:
						'O 9º e o 10º dígitos do título de eleitor são o código da unidade da federação onde ele foi emitido: 01 é São Paulo, 02 é Minas Gerais, 03 é Rio de Janeiro, 04 é Rio Grande do Sul, e assim até 27, Tocantins. O código 28 indica título emitido no exterior.',
				},
				{
					question: 'O título de eleitor gerado vale para votar?',
					answer:
						'Não. O número de título gerado é fictício: só passa na conta dos dígitos verificadores e não está no cadastro da Justiça Eleitoral. Serve apenas para testar sistemas.',
				},
			],
			howTo: {
				title: 'Como calcular os dígitos do título de eleitor',
				steps: [
					'Multiplique os oito primeiros dígitos pelos pesos 2, 3, 4, 5, 6, 7, 8 e 9, some e divida por 11; o resto é o primeiro dígito verificador.',
					'Multiplique o 9º dígito por 7, o 10º por 8 e o primeiro verificador por 9, some e divida por 11; o resto é o segundo dígito verificador.',
					'Se algum resto for 10, o dígito é 0.',
					'Em títulos de SP (01) e MG (02), se algum resto for 0, o dígito é 1.',
				],
				example:
					'Para 10234567 emitido em SP (01): 1×2 + 0×3 + 2×4 + 3×5 + 4×6 + 5×7 + 6×8 + 7×9 = 195, resto 8, primeiro dígito 8. Depois 0×7 + 1×8 + 8×9 = 80, resto 3, segundo dígito 3. O título completo é 1023 4567 0183.',
			},
			updatedAt: '2026-11-08',
		},
		'gerador-de-cartao-de-credito': {
			title: 'Gerador de cartão de crédito para testes',
			metaDescription:
				'Gere números de cartão de crédito válidos no algoritmo de Luhn para testar checkouts: Visa, Mastercard, Elo, Amex e mais, com validade, CVV e titular.',
			answer:
				'O gerador de cartão de crédito cria números de teste com o prefixo e o tamanho de cada bandeira (Visa, Mastercard, Elo, American Express, Hipercard, Diners, Discover e JCB), ou a partir de um BIN que você informa, e fecha cada número com o dígito verificador do algoritmo de Luhn. Gera de 1 a 50 cartões de uma vez, com validade futura (1 a 5 anos), vencida (1 a 3 anos atrás) ou escolhida, CVV aleatório ou fixo (4 dígitos no Amex) e, se quiser, nome do titular no estilo impresso no cartão. A lista pode ser exportada em texto, no formato número|mês|ano|cvv, em CSV ou em JSON.',
			faq: [
				{
					question: 'Dá para comprar com o cartão de crédito gerado?',
					answer:
						'Não. O número de cartão gerado só passa na verificação de formato do algoritmo de Luhn; não está ligado a nenhuma conta nem banco e é recusado em qualquer pagamento real. Ele serve para testar formulários e gateways em modo de teste.',
				},
				{
					question: 'Para que serve gerar um cartão vencido?',
					answer:
						'Para testar se o formulário ou checkout recusa cartões com validade passada antes de chamar o gateway. Escolhendo “Vencida” em Validade, o gerador cria cartões que expiraram entre 1 e 3 anos atrás.',
				},
				{
					question: 'Qual a diferença para os cartões de teste da Stripe?',
					answer:
						'Os números gerados aqui só passam na verificação de formato. Os cartões de teste da Stripe, listados na página, como 4242 4242 4242 4242, são reconhecidos pelo modo de teste dela e simulam resultados: aprovado, recusado, saldo insuficiente, cartão vencido ou autenticação 3D Secure.',
				},
				{
					question: 'Como a bandeira do cartão é definida?',
					answer:
						'A bandeira de um cartão é definida pelos primeiros dígitos, o BIN ou IIN: 4 é Visa, 51 a 55 e 2221 a 2720 são Mastercard, 34 e 37 são American Express, e faixas como 636368 e 438935 são Elo. O tamanho também varia: 16 dígitos na maioria, 15 no Amex e 14 no Diners.',
				},
			],
			howTo: {
				title: 'Como calcular o dígito do cartão (Luhn)',
				steps: [
					'Pegue o número sem o último dígito e, começando pelo dígito mais à direita, dobre um sim, um não.',
					'Se algum dígito dobrado passar de 9, subtraia 9 dele.',
					'Some todos os dígitos, dobrados e não dobrados.',
					'O dígito verificador é o que falta para a soma chegar ao próximo múltiplo de 10.',
				],
				example:
					'Para 4242 4242 4242 424, os oito dígitos 4 ficam nas posições dobradas e viram 8, somando 64; os sete dígitos 2 somam 14. O total é 78, e faltam 2 para chegar a 80, então o número completo é 4242 4242 4242 4242.',
			},
			updatedAt: '2026-11-08',
		},
		'gerador-de-cep': {
			title: 'Gerador de CEP aleatório por estado',
			metaDescription:
				'Gere CEPs aleatórios na faixa dos Correios de cada estado, com ou sem hífen, de 1 a 20 por vez. Ideal para testar formulários de endereço.',
			answer:
				'O gerador de CEP cria Códigos de Endereçamento Postal aleatórios dentro da faixa que os Correios reservam para cada estado: de 01000-000 a 19999-999 é São Paulo, de 20000-000 a 28999-999 é Rio de Janeiro, de 90000-000 a 99999-999 é Rio Grande do Sul, e assim por diante. Você escolhe o estado (ou deixa qualquer um), o formato com hífen (00000-000) ou só números (00000000) e a quantidade, de 1 a 20. Os três últimos dígitos ficam entre 000 e 899, a parte usada para ruas; os sufixos acima disso são reservados para caixas postais, grandes clientes e unidades dos Correios.',
			faq: [
				{
					question: 'O CEP gerado existe?',
					answer:
						'Pode existir ou não. O gerador sorteia um número dentro da faixa do estado, mas não consulta a base dos Correios, então o CEP tem o formato e a região certos e pode não corresponder a uma rua real. Para descobrir o endereço de um CEP, use uma ferramenta de busca de CEP.',
				},
				{
					question: 'Como saber o estado pelo CEP?',
					answer:
						'O primeiro dígito do CEP indica a região postal (0 e 1 são São Paulo, 2 é Rio de Janeiro e Espírito Santo, 3 é Minas Gerais, 9 é Rio Grande do Sul), e os dígitos seguintes estreitam até o estado, a cidade e o bairro. Cada estado tem uma ou duas faixas contínuas; Amazonas, Distrito Federal e Goiás têm duas.',
				},
				{
					question: 'Para que serve um gerador de CEP?',
					answer:
						'Para testar formulários de endereço, máscaras de entrada, validações de formato e regras que dependem do estado, como cálculo de frete ou de imposto, sem usar o endereço de uma pessoa real.',
				},
			],
			howTo: {
				title: 'Como o CEP é formado',
				steps: [
					'O 1º dígito é a região postal, que agrupa um ou mais estados.',
					'O 2º dígito é a sub-região e o 3º, o setor.',
					'O 4º dígito é o subsetor e o 5º, o divisor de subsetor; os cinco juntos formam o prefixo.',
					'Os três dígitos depois do hífen são o sufixo, que identifica a rua, o lado da rua ou um destino especial.',
				],
				example:
					'No CEP 01310-100, o 0 indica a região de São Paulo capital e o prefixo 01310 aponta para a região da Avenida Paulista; o sufixo 100 identifica um trecho da via.',
			},
			updatedAt: '2026-11-08',
		},
		'gerador-de-telefone': {
			title: 'Gerador de telefone com DDD (celular e fixo)',
			metaDescription:
				'Gere números de telefone brasileiros com DDD real de cada estado: celular com 9 dígitos ou fixo com 8, com máscara ou só números.',
			answer:
				'O gerador de telefone cria números brasileiros fictícios com um DDD real do estado escolhido, sorteado entre os códigos de área definidos pela Anatel (São Paulo tem do 11 ao 19, Minas Gerais tem 31 a 38, e assim por diante). O celular tem 9 dígitos e começa com 9, seguido de um dígito de 6 a 9, no formato (11) 98765-4321; o fixo tem 8 dígitos e começa com 2 a 5, no formato (11) 3456-7890. Você escolhe o tipo (celular, fixo ou os dois), o estado, o formato com máscara ou só números e a quantidade, de 1 a 20.',
			faq: [
				{
					question: 'O telefone gerado é de alguém?',
					answer:
						'Pode ser. O DDD e o formato são reais, e os dígitos são sorteados sem consultar nenhuma operadora, então o número pode coincidir com uma linha em uso. Use os telefones gerados só em ambientes de teste e nunca para ligar ou enviar mensagens.',
				},
				{
					question: 'Qual a diferença entre o número de celular e o de telefone fixo?',
					answer:
						'No Brasil, o celular tem 9 dígitos depois do DDD e sempre começa com 9, que foi acrescentado entre 2012 e 2016. O telefone fixo tem 8 dígitos e começa com 2, 3, 4 ou 5. Os dígitos 6 a 9 no início de um número de 8 dígitos eram usados por celulares antes do nono dígito.',
				},
				{
					question: 'Como escrever o telefone no formato internacional?',
					answer:
						'Coloque +55, o código do Brasil, antes do DDD e tire o zero e a operadora, se houver: (11) 98765-4321 vira +55 11 98765-4321, ou +5511987654321 no formato E.164, que é o que APIs como as do WhatsApp esperam.',
				},
			],
			updatedAt: '2026-11-08',
		},
		'gerador-de-placas': {
			title: 'Gerador de placas Mercosul e conversor',
			metaDescription:
				'Gere placas de carro no padrão Mercosul (ABC1D23) ou antigo (ABC-1234) e converta uma placa entre os dois formatos pela regra oficial de troca.',
			answer:
				'O gerador de placas cria placas de veículo aleatórias no padrão Mercosul (ABC1D23) ou no antigo (ABC-1234) e converte uma placa entre os dois formatos. Na geração, são sorteadas três letras e quatro números; no padrão Mercosul, o segundo número é escrito como letra, então o quinto caractere vai de A a J. Na conversão, que segue a regra usada pelos Detrans, o segundo número da placa antiga vira uma letra (0 = A, 1 = B … 9 = J), e o caminho inverso troca a letra de volta pelo número. Placas Mercosul com o quinto caractere depois de J não têm equivalente antiga, e a ferramenta avisa nesse caso.',
			faq: [
				{
					question: 'Como converter uma placa antiga para Mercosul?',
					answer:
						'Para converter uma placa antiga para o padrão Mercosul, troque o segundo número pela letra correspondente: 0 vira A, 1 vira B, 2 vira C e assim até 9, que vira J. Assim, ABC-1234 passa a ser ABC1C34, e as letras e os outros números ficam iguais.',
				},
				{
					question: 'Toda placa Mercosul tem uma placa antiga equivalente?',
					answer:
						'Não. Só as placas Mercosul convertidas, com o quinto caractere entre A e J, têm equivalente no formato antigo. Placas emitidas já no padrão Mercosul podem usar letras depois de J nessa posição, que não correspondem a nenhum número.',
				},
				{
					question: 'A placa gerada pertence a um veículo?',
					answer:
						'Pode coincidir com uma placa real, porque as combinações são limitadas e muitas já foram emitidas. O gerador não consulta nenhuma base de veículos; use as placas apenas para testes e exemplos, nunca para identificar um carro.',
				},
			],
			howTo: {
				title: 'Como converter placa antiga para Mercosul',
				steps: [
					'Escreva a placa antiga sem o hífen: três letras e quatro números.',
					'Localize o segundo número, que é o quinto caractere da placa.',
					'Troque esse número pela letra de mesma posição no alfabeto, contando a partir de zero: 0 = A, 1 = B … 9 = J.',
					'Mantenha as três letras e os outros três números como estão.',
				],
				example:
					'A placa ABC-1234 tem 2 como segundo número. 2 corresponde a C, então a placa Mercosul é ABC1C34. No sentido inverso, ABC1C34 volta a ser ABC-1234.',
			},
			updatedAt: '2026-11-08',
		},
		'gerador-de-pessoas': {
			title: 'Gerador de pessoas fictícias com CPF',
			metaDescription:
				'Gere até 100 pessoas fictícias com nome, CPF, RG, nascimento, e-mail, celular e endereço, coerentes entre si. Exporte em JSON ou CSV para testes.',
			answer:
				'O gerador de pessoas cria registros fictícios completos e coerentes entre si para testes e protótipos. Cada pessoa tem nome com dois sobrenomes, sexo, data de nascimento e idade, CPF, RG, e-mail, celular, CEP, endereço com número e bairro, cidade, estado e os nomes da mãe e do pai. O CPF corresponde ao estado sorteado ou escolhido, o celular usa um DDD e o CEP fica na faixa dos Correios desse estado, a idade bate com a data de nascimento, o e-mail é formado pelo nome e os pais compartilham o sobrenome de família. Você define a quantidade (1 a 100), o estado e a faixa de idade, e exporta o resultado em JSON ou CSV.',
			faq: [
				{
					question: 'Os dados gerados são de pessoas reais?',
					answer:
						'Não de propósito. Nomes, documentos e endereços do gerador de pessoas são combinações aleatórias; CPF e RG passam apenas na validação matemática dos dígitos verificadores. Use os dados somente em testes, nunca para cadastros reais.',
				},
				{
					question: 'O CEP da pessoa gerada corresponde à cidade?',
					answer:
						'Corresponde ao estado, mas não necessariamente à cidade. No gerador de pessoas, o CEP é sorteado dentro da faixa dos Correios do estado da pessoa, e rua, bairro e cidade são sorteados à parte, então o endereço é plausível, mas não existe. Para um endereço real a partir do CEP, use uma ferramenta de busca de CEP.',
				},
				{
					question: 'Em que formato posso exportar as pessoas geradas?',
					answer:
						'As pessoas geradas podem ser copiadas ou baixadas em JSON, pronto para fixtures e mocks de API, ou em CSV com cabeçalho, que abre em planilhas e pode ser importado em bancos de dados.',
				},
				{
					question: 'Usar dados fictícios ajuda a cumprir a LGPD?',
					answer:
						'Ajuda. Usar pessoas fictícias em ambientes de desenvolvimento, homologação e demonstração evita copiar dados pessoais de clientes reais para lugares com menos controle, que é um dos cuidados recomendados pela Lei Geral de Proteção de Dados.',
				},
			],
			updatedAt: '2026-11-08',
		},
	},
}
