import type { SectionContent } from './types.ts'

const UPDATED_AT = '2026-11-08'

export const content: SectionContent = {
	intro: [
		'Esta seção reúne ferramentas para o dia a dia de quem programa: testar expressões regulares, comparar duas versões de um texto, consultar JSON com JSONPath e XML ou HTML com XPath, converter timestamps Unix, entender expressões cron, desmontar URLs, enviar requisições para uma API REST, gerar JSON de teste, codificar entidades HTML, escapar strings para várias linguagens e inspecionar arquivos SVG.',
		'Para depurar um padrão de busca ou de substituição, use o testador de regex. Para saber o que mudou entre dois arquivos de configuração ou dois trechos de código, o comparador de textos. Quando a dúvida é sobre datas, o conversor de timestamp e o descritor de cron mostram os horários no seu fuso. Para montar dados de teste, o gerador de JSON cria registros fictícios com CPF, CNPJ, nomes e datas, e o escape de string prepara esses valores para colar no código.',
		'Quase tudo roda no próprio navegador, sem enviar o seu conteúdo para um servidor. A exceção é o testador de API REST, que faz a requisição de verdade, direto do seu navegador para o endereço informado. Por isso ele depende das regras de CORS da API: uma chamada que funciona no curl pode ser bloqueada no navegador. Nos testadores de regex e de XPath, o motor é o do JavaScript e o do navegador, então o comportamento pode diferir de outras linguagens, como PCRE, Python ou Java.',
	],
	tools: {
		'testador-de-regex': {
			title: 'Testador de regex online (JavaScript)',
			metaDescription:
				'Teste expressões regulares do JavaScript com destaque das correspondências, grupos de captura nomeados, flags g, i, m, s, u e y e prévia da substituição.',
			answer:
				'O testador de regex compila a expressão com o RegExp do JavaScript e a executa sobre o texto de teste enquanto você digita. Cada correspondência aparece destacada no texto e listada com a posição, o trecho encontrado e o valor de cada grupo de captura, inclusive os nomeados com (?<nome>…). As flags g (global), i (ignorar maiúsculas), m (multilinha), s (o ponto casa quebra de linha), u (Unicode) e y (sticky) são caixas de seleção. Com g, a lista mostra até 1.000 correspondências; sem g, só a primeira. O campo de substituição mostra o texto final usando $&, $1 e $<nome>. Se a expressão tiver erro de sintaxe, o motivo informado pelo motor aparece com uma dica de correção.',
			faq: [
				{
					question: 'Por que a regex só encontra a primeira ocorrência?',
					answer:
						'Sem a flag g (global), o JavaScript para na primeira correspondência, tanto na busca quanto na substituição. Marque g para listar e substituir todas as ocorrências do texto.',
				},
				{
					question: 'Como usar um grupo nomeado na substituição?',
					answer:
						'Crie o grupo com (?<nome>…) na expressão e escreva $<nome> no texto de substituição. Grupos sem nome são referenciados pela ordem: $1, $2 e assim por diante. $& insere o trecho inteiro encontrado.',
				},
				{
					question: 'Preciso escrever as barras / no começo e no fim da regex?',
					answer:
						'Não. As barras são a sintaxe de literal do JavaScript (/abc/g). No testador, escreva só o padrão e marque as flags nas caixas de seleção.',
				},
				{
					question: 'Uma regex que funciona aqui funciona em Python ou Java?',
					answer:
						'Na maioria dos casos simples, sim, mas os motores têm diferenças. O JavaScript não tem, por exemplo, grupos possessivos nem a sintaxe (?P<nome>…) do Python. Teste no motor da linguagem final quando usar recursos avançados.',
				},
				{
					question: 'Para que serve a flag m (multilinha)?',
					answer:
						'Com a flag m, os âncoras ^ e $ passam a valer no início e no fim de cada linha, e não só no início e no fim do texto inteiro. É útil para validar ou capturar linha por linha.',
				},
			],
			howTo: {
				title: 'Como testar uma expressão regular',
				steps: [
					'Escreva o padrão no campo da expressão, sem as barras do JavaScript.',
					'Marque as flags necessárias; para encontrar todas as ocorrências, deixe g marcada.',
					'Cole o texto de teste e confira os trechos destacados e a lista de grupos.',
					'Se quiser transformar o texto, preencha a substituição usando $1, $<nome> ou $&.',
				],
				example:
					'O padrão (?<dia>\\d{2})/(?<mes>\\d{2})/(?<ano>\\d{4}) com a flag g encontra 05/03/2025 e 12/03/2025 em "Pedido feito em 05/03/2025 e entregue em 12/03/2025". Com a substituição $<ano>-$<mes>-$<dia>, o texto vira "Pedido feito em 2025-03-05 e entregue em 2025-03-12".',
				source: { label: 'Especificação ECMAScript (RegExp)', url: 'https://tc39.es/ecma262/' },
			},
			updatedAt: UPDATED_AT,
		},
		'comparador-de-textos': {
			title: 'Comparar textos online: diff de duas versões',
			metaDescription:
				'Compare dois textos e veja o que foi adicionado e removido por linha, palavra ou caractere, lado a lado ou unificado. Tudo roda no seu navegador.',
			answer:
				'O comparador de textos calcula as diferenças entre um texto original e um modificado com a biblioteca jsdiff, que usa o algoritmo de Myers para achar o menor conjunto de inserções e remoções. Você escolhe a unidade de comparação (linhas, palavras ou caracteres) e a visualização: lado a lado, com as duas versões em colunas, ou unificada, como num diff do Git. Um resumo conta quantas linhas, palavras ou caracteres entraram e saíram. As opções "Ignorar espaços" e "Ignorar maiúsculas e minúsculas" evitam marcar como diferença o que é só formatação. Os textos não saem do navegador.',
			faq: [
				{
					question: 'Como identificar o que mudou sem depender das cores?',
					answer:
						'Linhas removidas levam o sinal − e as adicionadas o sinal +. Nas comparações por palavra ou caractere, o texto removido aparece riscado e o adicionado sublinhado, então a diferença continua visível sem cor.',
				},
				{
					question: 'Qual modo de comparação escolher: linhas, palavras ou caracteres?',
					answer:
						'Use linhas para código, listas e arquivos de configuração. Use palavras para textos corridos, como contratos e artigos. Use caracteres para achar uma letra, um número ou uma pontuação trocada.',
				},
				{
					question: 'O que faz a opção "Ignorar espaços"?',
					answer:
						'Ela desconsidera espaços extras e espaços no fim das linhas. Assim, uma linha reindentada ou com um espaço sobrando não aparece como alterada, e o diff mostra só as mudanças de conteúdo.',
				},
				{
					question: 'O texto que eu colo é enviado para algum servidor?',
					answer:
						'Não. A comparação é feita no navegador, com a biblioteca carregada na própria página. Dá para comparar trechos de contratos ou de código interno sem que eles saiam do seu computador.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'avaliador-de-jsonpath': {
			title: 'Testar JSONPath online com exemplos',
			metaDescription:
				'Avalie expressões JSONPath em qualquer JSON e veja cada resultado com o caminho exato. Suporta busca recursiva, curingas, fatias de arrays e filtros.',
			answer:
				'O avaliador de JSONPath executa uma expressão como $.loja.livros[*].autor sobre o JSON colado e lista cada resultado com o valor e o caminho exato onde ele foi encontrado. A avaliação usa a biblioteca jsonpath-plus em modo seguro, que interpreta os filtros sem executar código arbitrário. A sintaxe aceita a raiz $, o acesso por ponto ou colchetes, a busca recursiva (..), o curinga *, índices negativos, fatias como [0:2] e filtros como [?(@.preco < 35)]. Há exemplos prontos para clicar. Se o JSON for inválido, a ferramenta aponta o erro antes de avaliar a expressão.',
			faq: [
				{
					question: 'Qual a diferença entre $.a e $..a no JSONPath?',
					answer:
						'$.a pega apenas a chave a que está na raiz do documento. $..a faz uma busca recursiva e retorna a chave a em qualquer nível, por mais aninhada que esteja.',
				},
				{
					question: 'Como filtrar itens de uma lista com JSONPath?',
					answer:
						'Use um filtro em que @ representa cada item da lista: $.livros[?(@.preco < 35)] retorna os livros com preço menor que 35, e $.livros[?(@.isbn)] retorna os que têm a chave isbn.',
				},
				{
					question: 'Como pegar o último item de um array?',
					answer:
						'Use a fatia [-1:], como em $.loja.livros[-1:]. Índices negativos contam a partir do fim, então [-2:] retorna os dois últimos.',
				},
				{
					question: 'Por que minha expressão não retorna nada?',
					answer:
						'Os nomes das chaves diferenciam maiúsculas de minúsculas, e os índices começam em 0. Confira também se a expressão começa com $ e se o caminho segue a estrutura real do JSON.',
				},
			],
			howTo: {
				title: 'Como montar uma expressão JSONPath',
				steps: [
					'Comece pela raiz: $ representa o documento inteiro.',
					"Desça pelas chaves com ponto ($.loja.livros) ou colchetes ($['loja']).",
					'Use [*] para todos os itens de uma lista, [0] para o primeiro e [-1:] para o último.',
					'Filtre itens com [?(@.campo operador valor)], em que @ é o item atual.',
					'Use .. para procurar uma chave em qualquer nível.',
				],
				example:
					'No JSON de exemplo da página, $.loja.livros[?(@.preco < 35)].titulo retorna "Dom Casmurro" (29,9) e "A Hora da Estrela" (34,5), e $..preco retorna os quatro preços: 29,9, 34,5, 42 e 899.',
				source: { label: 'RFC 9535 (JSONPath)', url: 'https://www.rfc-editor.org/rfc/rfc9535' },
			},
			updatedAt: UPDATED_AT,
		},
		'testador-de-xpath': {
			title: 'Testador de XPath online para XML e HTML',
			metaDescription:
				'Teste expressões XPath em XML ou HTML com o motor do navegador e veja nós, atributos, textos, números e booleanos encontrados, com exemplos prontos.',
			answer:
				'O testador de XPath interpreta o conteúdo como XML ou como HTML, conforme a opção escolhida, e avalia a expressão com o document.evaluate do navegador, que implementa o XPath 1.0. Se o resultado for um conjunto de nós, cada elemento, atributo ou texto aparece com o nome e o conteúdo. Funções como count(), sum(), string() e boolean() devolvem um número, um texto ou um valor verdadeiro ou falso. Prefixos de namespace declarados no elemento raiz (xmlns:x="…") podem ser usados na expressão. No modo HTML, as tags ficam em minúsculas e o documento ganha html, head e body. Erros de sintaxe no documento ou na expressão aparecem explicados.',
			faq: [
				{
					question: 'Por que minha expressão XPath não encontra nada em um XML com xmlns?',
					answer:
						'Com um namespace padrão (xmlns="…"), os elementos não podem ser escritos sem prefixo no XPath 1.0. Use local-name(), como em //*[local-name()="item"], ou declare um prefixo no elemento raiz e use-o na expressão.',
				},
				{
					question: 'Como pegar o valor de um atributo com XPath?',
					answer:
						'Use @ seguido do nome do atributo, como //livro/@id. Para receber só o texto do primeiro atributo encontrado, use string(//livro[1]/@id).',
				},
				{
					question: 'Qual a diferença entre / e // no XPath?',
					answer:
						'Uma barra (/) seleciona filhos diretos a partir do ponto atual. Duas barras (//) procuram em qualquer profundidade: //titulo encontra todos os elementos titulo do documento.',
				},
				{
					question: 'Como filtrar elementos por valor no XPath?',
					answer:
						'Use um predicado entre colchetes: //livro[@ano > 1900] seleciona livros com o atributo ano maior que 1900, e //livro[autor="Machado de Assis"] compara o texto de um elemento filho.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'conversor-de-timestamp': {
			title: 'Converter timestamp Unix em data e hora',
			metaDescription:
				'Converta timestamp Unix em data (UTC, horário local, ISO 8601 e RFC 2822) e data em timestamp. Detecta segundos e milissegundos automaticamente.',
			answer:
				'O conversor de timestamp transforma um horário Unix em data e mostra o resultado em UTC, no seu fuso horário, em ISO 8601 (UTC e com o deslocamento local), em RFC 2822 e em tempo relativo, como "há 3 dias". No modo Detectar, a unidade é deduzida pelo tamanho do número: até 11 dígitos são segundos, até 14 são milissegundos e números maiores são lidos como micro ou nanossegundos. Você também pode fixar segundos ou milissegundos. No sentido contrário, escolha data e hora, diga se estão no seu fuso ou em UTC, e receba o timestamp em segundos e em milissegundos. Datas inexistentes, como 31/02, são recusadas.',
			faq: [
				{
					question: 'Como saber se o timestamp está em segundos ou milissegundos?',
					answer:
						'Timestamps atuais em segundos têm 10 dígitos (ex.: 1700000000) e em milissegundos têm 13 (ex.: 1700000000000). O JavaScript e o Java costumam usar milissegundos; PHP, Python e bancos de dados, segundos.',
				},
				{
					question: 'O que é o timestamp Unix?',
					answer:
						'É a quantidade de segundos passados desde 1º de janeiro de 1970, à meia-noite em UTC, sem contar segundos bissextos. Como não depende de fuso horário, é muito usado para guardar datas em sistemas e bancos de dados.',
				},
				{
					question: 'Por que a data convertida aparece com 3 horas de diferença?',
					answer:
						'O timestamp representa um instante em UTC. No horário de Brasília (UTC−3), o mesmo instante aparece 3 horas antes. A ferramenta mostra as duas versões lado a lado para evitar essa confusão.',
				},
				{
					question: 'O que é o problema do ano 2038?',
					answer:
						'Sistemas que guardam o timestamp em um inteiro de 32 bits com sinal só contam até 2.147.483.647, que corresponde a 19 de janeiro de 2038 às 03:14:07 UTC. Depois disso o número estoura. Sistemas com 64 bits não têm esse limite.',
				},
			],
			howTo: {
				title: 'Como converter um timestamp Unix em data',
				steps: [
					'Confira quantos dígitos o número tem: 10 indicam segundos e 13 indicam milissegundos.',
					'Se estiver em milissegundos, divida por 1.000 para obter os segundos.',
					'Some esses segundos a 01/01/1970 00:00:00 UTC.',
					'Ajuste para o seu fuso: no horário de Brasília, subtraia 3 horas.',
				],
				example:
					'1700000000 tem 10 dígitos, então está em segundos. Ele corresponde a 14/11/2023 às 22:13:20 UTC (2023-11-14T22:13:20.000Z em ISO 8601 e Tue, 14 Nov 2023 22:13:20 +0000 em RFC 2822), ou 19:13:20 no horário de Brasília.',
			},
			updatedAt: UPDATED_AT,
		},
		'descritor-de-cron': {
			title: 'Expressão cron em português: entenda e teste',
			metaDescription:
				'Traduza uma expressão cron para o português, veja o significado de cada campo e as próximas 10 execuções no seu fuso. Aceita segundos e @daily.',
			answer:
				'O descritor de cron traduz uma expressão como 30 8 * * 1-5 para o português ("Às 08:30, de segunda-feira a sexta-feira") com a biblioteca cronstrue, explica cada campo separadamente e calcula as próximas 10 execuções com a cron-parser, no fuso horário do seu navegador. Aceita o formato de 5 campos (minuto, hora, dia do mês, mês e dia da semana), o de 6 campos com os segundos no início e atalhos como @hourly, @daily, @weekly, @monthly e @yearly. Também entende listas (1,15), intervalos (1-5), passos (*/15), nomes em inglês como MON e JAN, L para o último dia e 5#2 para a segunda sexta-feira do mês.',
			faq: [
				{
					question: 'Qual a ordem dos campos do cron?',
					answer:
						'Minuto (0–59), hora (0–23), dia do mês (1–31), mês (1–12) e dia da semana (0–7, em que 0 e 7 são domingo). No formato de 6 campos, usado por algumas bibliotecas, o primeiro campo são os segundos.',
				},
				{
					question: 'O que significa */15 no cron?',
					answer:
						'A barra indica um passo: */15 no campo de minutos quer dizer a cada 15 minutos, ou seja, nos minutos 0, 15, 30 e 45 de cada hora. 5/15 começaria no minuto 5: 5, 20, 35 e 50.',
				},
				{
					question: 'Como agendar um cron só em dias úteis?',
					answer:
						'Use 1-5 no campo de dia da semana. Por exemplo, 0 9 * * 1-5 executa às 9h de segunda a sexta. O cron não conhece feriados; para pulá-los, a verificação precisa ficar no próprio script.',
				},
				{
					question: 'O que acontece se eu preencher o dia do mês e o dia da semana?',
					answer:
						'No cron tradicional, quando os dois campos têm valores, a tarefa roda se qualquer um deles bater. 0 0 13 * 5 executa todo dia 13 e também toda sexta-feira, não só nas sextas-feiras 13.',
				},
				{
					question: 'Em qual fuso horário o cron executa?',
					answer:
						'No fuso configurado no servidor ou no serviço que agenda a tarefa, que muitas vezes é UTC. A lista de próximas execuções usa o fuso do seu navegador, então confira o fuso do servidor antes de agendar.',
				},
			],
			howTo: {
				title: 'Como ler uma expressão cron',
				steps: [
					'Separe a expressão pelos espaços: são 5 campos (ou 6, com os segundos primeiro).',
					'Leia na ordem minuto, hora, dia do mês, mês e dia da semana.',
					'Interprete * como "qualquer valor", a-b como intervalo, a,b como lista e */n como "a cada n".',
					'Junte os campos: a tarefa roda quando todos batem ao mesmo tempo (dia do mês e dia da semana, quando ambos têm valor, funcionam como "ou").',
				],
				example:
					'*/15 9-18 * * 1-5 significa: a cada 15 minutos, das 9h às 18h, de segunda a sexta. A primeira execução é às 09:00 e a última do dia às 18:45. Partindo de domingo, 08/11/2026, a próxima execução é segunda, 09/11/2026, às 09:00.',
				source: {
					label: 'POSIX: especificação do crontab',
					url: 'https://pubs.opengroup.org/onlinepubs/9799919799/utilities/crontab.html',
				},
			},
			updatedAt: UPDATED_AT,
		},
		'separador-de-url': {
			title: 'Separar URL em partes e editar parâmetros',
			metaDescription:
				'Separe uma URL em protocolo, host, porta, caminho, query e fragmento, com valores decodificados. Edite os parâmetros e copie a URL montada de novo.',
			answer:
				'O separador de URL lê o endereço com o parser URL do navegador, o mesmo que os sites usam, e mostra cada parte: protocolo, usuário, senha, host, porta, caminho, parâmetros da query e fragmento (o que vem depois do #). Os valores aparecem decodificados, então %C3%A3 vira ã e + vira espaço nos parâmetros. Quando a URL não escreve a porta, a ferramenta indica a padrão do protocolo, como 443 no https. Os parâmetros ficam numa tabela editável: altere nomes e valores, adicione ou remova linhas e a URL é montada de novo, já codificada e pronta para copiar. Parâmetros com o nome vazio são descartados.',
			faq: [
				{
					question: 'Por que a porta aparece como padrão?',
					answer:
						'Quando a URL não escreve a porta, o navegador usa a do protocolo: 443 para https, 80 para http, 21 para ftp. Só aparece uma porta explícita quando ela está escrita no endereço, como em :8080.',
				},
				{
					question: 'Os valores com acentos e espaços são codificados de novo?',
					answer:
						'Sim. Na tabela você edita o valor legível e, ao montar a URL, os caracteres especiais voltam a ser codificados: espaço vira +, ã vira %C3%A3 e & vira %26.',
				},
				{
					question: 'Qual a diferença entre query string e fragmento?',
					answer:
						'A query string vem depois do ? e é enviada ao servidor, geralmente como pares chave=valor separados por &. O fragmento vem depois do # e fica só no navegador, sendo usado para rolar até uma seção ou por aplicações de página única.',
				},
				{
					question: 'Por que a URL é recusada sem o https://?',
					answer:
						'Sem o protocolo, exemplo.com/caminho é só um texto, não uma URL completa. Inclua https:// ou http:// no começo para que o endereço possa ser separado em partes.',
				},
			],
			howTo: {
				title: 'Como identificar as partes de uma URL',
				steps: [
					'O protocolo vai até ://, como https.',
					'Se houver @, o que vem antes dele é usuário e senha (usuario:senha).',
					'Em seguida vêm o host e, depois de dois-pontos, a porta.',
					'O caminho começa na primeira / depois do host e vai até ? ou #.',
					'Depois do ? estão os parâmetros (chave=valor, separados por &) e depois do # está o fragmento.',
				],
				example:
					'Em https://user:senha@exemplo.com.br:8080/busca/caf%C3%A9?q=p%C3%A3o+de+queijo&page=2#resultados: protocolo https, usuário user, senha senha, host exemplo.com.br, porta 8080, caminho /busca/café, parâmetros q = pão de queijo e page = 2, e fragmento resultados.',
				source: {
					label: 'RFC 3986 (sintaxe de URI)',
					url: 'https://www.rfc-editor.org/rfc/rfc3986',
				},
			},
			updatedAt: UPDATED_AT,
		},
		'testador-de-api-rest': {
			title: 'Testar API REST online pelo navegador',
			metaDescription:
				'Envie requisições GET, POST, PUT, PATCH e DELETE pelo navegador e veja status, tempo, tamanho, cabeçalhos e corpo formatado. Gera o comando curl.',
			answer:
				'O testador de API REST envia a requisição com fetch() direto do seu navegador para o endereço informado. Você escolhe o método (GET, POST, PUT, PATCH, DELETE, HEAD ou OPTIONS), adiciona cabeçalhos e define o corpo como JSON, texto ou formulário (uma linha chave=valor por campo). O Content-Type correspondente é preenchido se você não informar outro, e um JSON inválido é apontado antes do envio. A resposta mostra o código de status, o tempo, o tamanho, os cabeçalhos expostos e o corpo, formatado quando é JSON. A requisição é cancelada depois de 30 segundos. O botão "Copiar como curl" gera o comando equivalente para rodar no terminal.',
			faq: [
				{
					question: 'Por que aparece erro de CORS ao testar a API?',
					answer:
						'O navegador só entrega a resposta se a API permitir chamadas de outros sites, com o cabeçalho Access-Control-Allow-Origin. Se ela não permitir, a chamada falha no navegador mesmo funcionando no curl ou no Postman. Use "Copiar como curl" para testar no terminal.',
				},
				{
					question: 'Meus tokens de API passam por algum servidor intermediário?',
					answer:
						'Não. A requisição sai do seu navegador direto para a API informada, sem proxy, então o token só é visto pela própria API. Mesmo assim, prefira tokens de teste ou com permissões limitadas.',
				},
				{
					question: 'Por que alguns cabeçalhos não são enviados?',
					answer:
						'A especificação Fetch proíbe que páginas definam cabeçalhos como Cookie, Host, Origin, Referer e Content-Length, além dos que começam com Sec- e Proxy-. O navegador os ignora, e a ferramenta avisa quais foram descartados.',
				},
				{
					question: 'Por que uma API http não funciona aqui?',
					answer:
						'Uma página https não pode chamar um endereço http: o navegador bloqueia por ser conteúdo misto. Use a versão https da API ou rode o comando curl gerado no terminal.',
				},
				{
					question: 'Posso enviar corpo em uma requisição GET?',
					answer:
						'Não. O fetch() do navegador não aceita corpo em GET nem em HEAD. Para enviar dados, use POST, PUT ou PATCH, ou passe os valores como parâmetros na URL.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'gerador-de-json': {
			title: 'Gerador de JSON com dados fictícios',
			metaDescription:
				'Gere JSON com dados fictícios brasileiros a partir de um modelo: nome, e-mail, CPF, CNPJ, CEP, datas e números. De 1 a 100 itens, pronto para testes.',
			answer:
				'O gerador de JSON preenche um modelo com dados fictícios. Escreva o JSON e troque os valores por marcadores como {{nome}}, {{email}}, {{cpf}}, {{cnpj}}, {{telefone}}, {{cep}}, {{uuid}}, {{inteiro(1, 100)}}, {{decimal(0, 10, 2)}}, {{data}} ou {{dataHora}}, ou monte o modelo por uma lista de campos. Escolha de 1 a 100 itens: com 1 sai um objeto, com mais sai uma lista. Nomes, endereços e empresas vêm da biblioteca Faker em português do Brasil; números, datas, UUIDs e documentos são sorteados com o gerador criptográfico do navegador. Um marcador sozinho no valor mantém o tipo (número ou booleano), e ["{{repetir(3)}}", {…}] cria listas aninhadas.',
			faq: [
				{
					question: 'Como gerar uma lista dentro do objeto?',
					answer:
						'Use uma lista cujo primeiro item é {{repetir(n)}} e o segundo é o modelo: ["{{repetir(3)}}", { "id": "{{indice}}" }] gera três itens numerados de 1 a 3. {{repetir(2, 5)}} sorteia a quantidade entre 2 e 5.',
				},
				{
					question: 'Os CPFs e CNPJs gerados são válidos?',
					answer:
						'Têm dígitos verificadores corretos e passam em validadores, mas são fictícios: servem para testes e não pertencem a pessoas ou empresas reais. Não use em cadastros verdadeiros.',
				},
				{
					question: 'O número sai como texto ou como número no JSON?',
					answer:
						'Um marcador sozinho no valor, como "{{inteiro(1, 10)}}", vira número, e {{booleano}} vira true ou false. Dentro de um texto maior, como "Pedido {{inteiro(1, 10)}}", o valor é inserido como texto.',
				},
				{
					question: 'Quais datas o gerador de JSON usa?',
					answer:
						'{{data}} gera uma data entre 2000 e 2030 no formato AAAA-MM-DD, e {{dataHora}} gera data e hora em ISO 8601, em UTC, como 2024-05-17T13:45:00.000Z.',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'codificador-de-html': {
			title: 'Codificar e decodificar entidades HTML',
			metaDescription:
				'Converta caracteres em entidades HTML nomeadas (&eacute;), decimais (&#233;) ou hexadecimais (&#xE9;) e decodifique de volta. Resultado na hora.',
			answer:
				'O codificador de HTML troca caracteres por entidades e faz o caminho inverso. No modo codificar, você escolhe o formato: nomeado (&eacute;), decimal (&#233;) ou hexadecimal (&#xE9;). Também escolhe o alcance: só os cinco caracteres especiais (& < > " \') ou tudo o que está fora do ASCII imprimível, incluindo acentos, emojis e caracteres de controle. No formato nomeado, a ferramenta usa o conjunto de entidades do HTML 4 e recorre ao código decimal quando o caractere não tem nome. No modo decodificar, entidades nomeadas, decimais e hexadecimais viram texto, e as desconhecidas ficam como estão. O resultado atualiza enquanto você digita.',
			faq: [
				{
					question: 'Qual a diferença para a ferramenta Texto para HTML?',
					answer:
						'O Texto para HTML transforma um texto em HTML, criando parágrafos e links. O codificador só converte caracteres em entidades e de volta, sem criar nenhuma tag.',
				},
				{
					question: 'Preciso codificar acentos em HTML?',
					answer:
						'Em páginas salvas em UTF-8, não: basta codificar & < > e as aspas. Codificar tudo fora do ASCII ajuda quando o texto vai para um sistema antigo ou de codificação desconhecida, como alguns e-mails.',
				},
				{
					question: 'Por que codificar < e > em HTML?',
					answer:
						'Porque o navegador interpreta < como início de uma tag. Para exibir um trecho de código ou texto digitado por um usuário, < vira &lt; e > vira &gt;, o que também evita a injeção de HTML na página.',
				},
				{
					question: 'Qual a diferença entre &#233; e &#xE9;?',
					answer:
						'Nenhuma no resultado: as duas representam o caractere é. A primeira escreve o código Unicode em decimal (233) e a segunda em hexadecimal (E9).',
				},
			],
			updatedAt: UPDATED_AT,
		},
		'escape-de-string': {
			title: 'Escape de string para JS, JSON, SQL e mais',
			metaDescription:
				'Escape textos para JavaScript, JSON, Java, C#, Python, SQL, shell e regex, ou desfaça o escape de \\n, \\t e \\uXXXX. Pronto para colar no código.',
			answer:
				"O escape de string prepara um texto para ficar dentro das aspas de uma linguagem. Em JavaScript, Java, C# e Python, escapa barra invertida, aspas e quebras de linha (\\n, \\t) e transforma caracteres de controle em \\xHH ou \\uXXXX. Em JSON, o resultado é o mesmo do JSON.stringify. Em SQL, as aspas simples são dobradas. No shell POSIX, o texto inteiro vai entre aspas simples, com cada aspa simples interna virando '\\''. Em expressões regulares, os metacaracteres . * + ? ^ $ { } ( ) | [ ] \\ / recebem uma barra para serem lidos literalmente. O modo inverso interpreta as sequências de cada linguagem e aponta escapes inválidos com a posição.",
			faq: [
				{
					question: 'Como escapar aspas simples no SQL?',
					answer:
						"Dobre a aspa: O'Brien vira O''Brien dentro de 'O''Brien'. Para valores digitados por usuários, prefira consultas parametrizadas em vez de montar o SQL com texto, o que evita injeção de SQL.",
				},
				{
					question: 'Como colocar aspas simples num comando de shell?',
					answer:
						"Dentro de aspas simples nada é interpretado, nem a barra invertida. Feche as aspas, insira \\' e reabra: it's vira 'it'\\''s'.",
				},
				{
					question: 'Como escapar caracteres especiais em uma regex?',
					answer:
						'Coloque uma barra invertida antes de cada metacaractere. Para procurar o texto literal 1.5 (R$), a expressão fica 1\\.5 \\(R\\$\\), porque ponto, parênteses e cifrão têm significado especial.',
				},
				{
					question: 'Qual a diferença entre escapar para JavaScript e para JSON?',
					answer:
						"O JSON só aceita aspas duplas e um conjunto menor de escapes, sem \\x nem \\v. O resultado em JSON funciona em JavaScript, mas o contrário nem sempre: \\' é válido em JavaScript e inválido em JSON.",
				},
			],
			updatedAt: UPDATED_AT,
		},
		'visualizador-de-svg': {
			title: 'Visualizar SVG online e converter em PNG',
			metaDescription:
				'Abra ou cole um SVG e veja o desenho sem executar scripts. Confira width, height, viewBox e bytes, minifique e baixe em SVG ou PNG em 1×, 2× e 4×.',
			answer:
				'O visualizador de SVG mostra o desenho a partir do código colado ou de um arquivo .svg de até 10 MB. A prévia usa uma tag <img>, que nunca executa scripts do arquivo. A ferramenta lê a tag raiz e informa width, height, viewBox, o tamanho desenhado em pixels (calculado pelos atributos, pela proporção do viewBox ou pelo padrão de 300 × 150) e o tamanho do arquivo em bytes. A opção Minificar remove declaração XML, comentários, metadados, dados de editores como Inkscape e espaços entre tags, sem mexer nos caminhos. Se faltar o xmlns, ele é adicionado. O download sai em SVG ou em PNG nas escalas 1×, 2× e 4×.',
			faq: [
				{
					question: 'É seguro abrir um SVG desconhecido aqui?',
					answer:
						'Sim. A prévia usa uma tag <img>, que nunca executa scripts do SVG. A ferramenta ainda avisa quando o arquivo contém <script> ou atributos de evento como onload, para você saber o que ele traz.',
				},
				{
					question: 'Por que meu SVG não aparece?',
					answer:
						'Geralmente falta xmlns="http://www.w3.org/2000/svg" na tag <svg>, o que a ferramenta corrige sozinha, ou o XML está mal formado, com tags sem fechar ou atributos sem aspas.',
				},
				{
					question: 'Como converter SVG em PNG com boa resolução?',
					answer:
						'Escolha a escala do PNG: 2× e 4× multiplicam a largura e a altura do desenho. Um SVG de 300 × 150 px sai com 1.200 × 600 px em 4×, o suficiente para telas de alta densidade.',
				},
				{
					question: 'Para que serve o viewBox de um SVG?',
					answer:
						'O viewBox define o sistema de coordenadas do desenho (x, y, largura e altura). Com ele, o SVG pode ser ampliado ou reduzido sem distorcer, e width e height passam a definir só o tamanho exibido.',
				},
			],
			updatedAt: UPDATED_AT,
		},
	},
}
