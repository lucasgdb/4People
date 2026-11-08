import type { SectionContent } from './types.ts'

export const content: SectionContent = {
	intro: [
		'Estes conversores passam dados de um formato de arquivo para outro sem perder a estrutura: JSON para YAML e de volta, XML para JSON e de volta, arquivos INI para JSON ou YAML, planilhas em CSV para comandos SQL e imagens para data URI e de volta. São as conversões que aparecem ao migrar configurações entre ferramentas, importar dados num banco ou embutir um ícone direto no CSS.',
		'JSON e YAML representam os mesmos tipos de dados, então a conversão entre eles é direta; só os comentários do YAML se perdem, porque o JSON não tem onde guardá-los. Com XML é diferente: atributos, texto misturado com elementos e elementos repetidos não têm equivalente exato em JSON, por isso os conversores usam convenções, como o prefixo @_ para atributos e a chave #text para o texto. O INI não tem uma especificação única, e o conversor segue as regras mais comuns, como seções [nome], comentários com ; ou # e chaves repetidas virando listas.',
		'O CSV para SQL infere o tipo de cada coluna olhando todos os valores, então confira o CREATE TABLE antes de rodar em produção. Os erros de sintaxe aparecem com linha e coluna, e todo o processamento acontece no navegador, sem enviar arquivos.',
	],
	tools: {
		'json-para-yaml': {
			title: 'Conversor de JSON para YAML',
			metaDescription:
				'Converta JSON em YAML enquanto digita, com indentação de 2 ou 4 espaços. Erros de sintaxe aparecem com linha e coluna. Nada é enviado ao servidor.',
			answer:
				'O conversor lê o JSON a cada alteração e o reescreve em YAML com 2 ou 4 espaços de indentação. Objetos viram pares chave: valor, listas viram itens começados por hífen e números, booleanos e null mantêm o tipo. Textos longos ficam em uma linha só, e um objeto repetido é escrito por inteiro, sem âncoras do YAML. Textos que seriam lidos como outro tipo, como "true", "123" ou "x: y", saem entre aspas para continuarem sendo texto. Se o JSON for inválido, a ferramenta mostra a linha e a coluna do primeiro erro e destaca o trecho. A conversão usa a biblioteca js-yaml e roda inteira no navegador.',
			faq: [
				{
					question: 'Por que alguns textos aparecem entre aspas no YAML?',
					answer:
						'Textos que o YAML leria como outro tipo, como "true", "123" ou "null", ou que têm caracteres especiais, como "x: y", ficam entre aspas para continuarem sendo texto quando o arquivo for lido de volta.',
				},
				{
					question: 'Qual a diferença entre JSON e YAML?',
					answer:
						'Os dois representam os mesmos dados: objetos, listas, textos, números e booleanos. O JSON usa chaves, colchetes e aspas; o YAML usa indentação e hífens, aceita comentários e é mais fácil de ler e editar à mão, por isso é comum em arquivos de configuração.',
				},
				{
					question: 'Todo JSON válido também é YAML válido?',
					answer:
						'Na prática, sim: o YAML 1.2 foi pensado para aceitar JSON. Mesmo assim, converter deixa o arquivo no estilo usual do YAML, sem chaves e aspas desnecessárias.',
				},
				{
					question: 'O JSON que eu colo é enviado para algum servidor?',
					answer:
						'Não. A conversão acontece inteira no navegador e o conteúdo não sai da sua máquina.',
				},
			],
			updatedAt: '2026-11-08',
		},
		'yaml-para-json': {
			title: 'Conversor de YAML para JSON',
			metaDescription:
				'Converta YAML em JSON com 2 ou 4 espaços, tab ou minificado. Arquivos com vários documentos viram uma lista, e erros mostram linha e coluna.',
			answer:
				'O conversor lê o YAML com a biblioteca js-yaml e gera JSON indentado com 2 ou 4 espaços, com tab ou minificado em uma linha. Indentação vira aninhamento de objetos, itens com hífen viram listas, e valores como 42, true e null viram número, booleano e null do JSON. Um arquivo com vários documentos separados por --- vira uma lista JSON, na mesma ordem; com um documento só, o resultado é o próprio objeto. Âncoras e referências (&nome e *nome) são resolvidas e copiadas, e comentários são descartados. Erros de sintaxe, como indentação inconsistente, aparecem com a linha e a coluna.',
			faq: [
				{
					question: 'O que acontece com vários documentos separados por ---?',
					answer:
						'Cada documento vira um item de uma lista JSON, na mesma ordem em que aparece no arquivo. Com um documento só, o resultado é o próprio objeto, sem lista em volta.',
				},
				{
					question: 'Os comentários do YAML vão para o JSON?',
					answer:
						'Não. O JSON não tem comentários, então as linhas e trechos iniciados por # são descartados na conversão.',
				},
				{
					question: 'Por que meu YAML dá erro de indentação?',
					answer:
						'O YAML usa a indentação para saber o que está dentro do quê, então itens do mesmo nível precisam começar na mesma coluna. Tabs não são permitidos para indentar; use espaços.',
				},
				{
					question: 'Por que “no” ou “yes” viraram texto e não booleano?',
					answer:
						'O conversor segue o YAML 1.2, em que só true e false são booleanos. No YAML 1.1, antigo, yes, no, on e off também eram, o que causava erros como o código de país NO virar false.',
				},
			],
			updatedAt: '2026-11-08',
		},
		'xml-para-json': {
			title: 'Conversor de XML para JSON',
			metaDescription:
				'Converta XML em JSON mantendo atributos com prefixo, elementos repetidos como listas e números e booleanos com tipo. Valida o XML e mostra o erro.',
			answer:
				'O conversor valida o XML e o transforma em JSON com a biblioteca fast-xml-parser. Cada elemento vira uma chave, e elementos irmãos com o mesmo nome viram uma lista. Os atributos podem ser mantidos como chaves com um prefixo (por padrão @_) ou descartados. Quando um elemento tem texto e também atributos, o texto vai para a chave do nó de texto (por padrão #text). Com “Converter números e booleanos” marcado, valores como "1938" e "true" viram 1938 e true; desmarcado, tudo fica como texto. A declaração <?xml?> e as instruções de processamento são ignoradas, os espaços nas pontas dos textos são removidos e o JSON sai com 2 ou 4 espaços ou minificado.',
			faq: [
				{
					question: 'Como os atributos aparecem no JSON?',
					answer:
						'Como chaves com o prefixo escolhido, ao lado dos elementos filhos. Por exemplo, id="1" vira "@_id": 1. Desmarque “Manter atributos” para descartá-los.',
				},
				{
					question: 'Quando aparece a chave #text?',
					answer:
						'Quando um elemento tem texto e também atributos ou filhos. O texto fica na chave do nó de texto, cujo nome pode ser trocado; um elemento só com texto vira o próprio valor.',
				},
				{
					question: 'Por que um elemento às vezes vira lista e às vezes não?',
					answer:
						'O XML não diz se um elemento é uma lista. Ele só vira lista no JSON quando aparece repetido: dois <autor> viram uma lista, mas um <autor> sozinho vira um valor simples. Quem lê o JSON precisa tratar os dois casos.',
				},
				{
					question: 'Por que um CEP ou código com zero à esquerda mudou?',
					answer:
						'Com “Converter números e booleanos” ativado, valores que parecem número podem virar número e perder zeros à esquerda. Desmarque a opção para manter todos os valores como texto.',
				},
			],
			howTo: {
				title: 'Como o XML é mapeado para JSON',
				steps: [
					'O elemento raiz vira a chave de fora do objeto JSON.',
					'Cada elemento filho vira uma chave dentro do objeto do pai; filhos com o mesmo nome viram uma lista.',
					'Cada atributo vira uma chave com o prefixo @_ no objeto do próprio elemento.',
					'O texto de um elemento sem atributos vira o valor da chave; com atributos, vai para a chave #text.',
				],
				example:
					'<livro id="1"><titulo lang="pt">Vidas</titulo><autor>A</autor><autor>B</autor><ano>1938</ano></livro> vira {"livro": {"titulo": {"#text": "Vidas", "@_lang": "pt"}, "autor": ["A", "B"], "ano": 1938, "@_id": 1}}.',
			},
			updatedAt: '2026-11-08',
		},
		'json-para-xml': {
			title: 'Conversor de JSON para XML',
			metaDescription:
				'Gere XML a partir de JSON: chaves viram elementos, listas repetem o elemento e chaves com prefixo viram atributos. Escolha raiz e indentação.',
			answer:
				'O conversor gera XML a partir de JSON com a biblioteca fast-xml-parser. Cada chave vira um elemento, e uma lista repete o mesmo elemento uma vez por item. Chaves que começam com o prefixo de atributo (por padrão @_) viram atributos do elemento, e a chave de texto (por padrão #text) vira o conteúdo dele. Tudo fica dentro do elemento raiz informado; se o JSON for uma lista, cada item vira um <item>. Nomes que não são válidos em XML são ajustados: caracteres inválidos viram _, e nomes que começam com número ou com “xml” ganham _ na frente. Você escolhe indentação (2, 4, tab ou minificado) e se inclui a declaração <?xml?>.',
			faq: [
				{
					question: 'O que acontece com chaves que não são nomes válidos em XML?',
					answer:
						'Caracteres inválidos, como espaços e símbolos, viram “_”, e nomes que começam com número ganham um “_” na frente. Por exemplo, a chave “1º lugar” vira o elemento <_1__lugar>.',
				},
				{
					question: 'Preciso de um elemento raiz?',
					answer:
						'Um documento XML só pode ter um elemento raiz. Deixe o campo vazio apenas se o JSON já for um objeto com uma única chave; caso contrário, informe um nome como root.',
				},
				{
					question: 'Como gerar atributos em vez de elementos?',
					answer:
						'Comece o nome da chave com o prefixo de atributo, por padrão @_. Assim {"pessoa": {"@_id": 1}} vira <pessoa id="1">. Com o prefixo vazio, nenhuma chave vira atributo.',
				},
				{
					question: 'Como um array do JSON aparece no XML?',
					answer:
						'O XML não tem listas. Cada item do array vira um elemento repetido com o nome da chave: {"tel": ["1", "2"]} vira <tel>1</tel><tel>2</tel>.',
				},
			],
			howTo: {
				title: 'Como o JSON é mapeado para XML',
				steps: [
					'Escolha o nome do elemento raiz, que vai envolver todo o conteúdo.',
					'Cada chave do objeto vira um elemento com o mesmo nome, e o valor vira o conteúdo dele.',
					'Cada item de uma lista vira um elemento repetido com o nome da chave.',
					'Chaves com o prefixo @_ viram atributos do elemento em que estão.',
				],
				example:
					'{"pessoa": {"@_id": 1, "nome": "Ana", "tel": ["1", "2"]}} com raiz root vira <root><pessoa id="1"><nome>Ana</nome><tel>1</tel><tel>2</tel></pessoa></root>, precedido da declaração <?xml version="1.0" encoding="UTF-8"?>.',
			},
			updatedAt: '2026-11-08',
		},
		'ini-para-json': {
			title: 'Conversor de INI para JSON',
			metaDescription:
				'Converta arquivos INI em JSON: seções viram objetos, subseções [pai.filho] viram objetos aninhados e chaves repetidas viram listas. Ignora comentários.',
			answer:
				'O conversor lê arquivos INI linha a linha e gera JSON. Cada seção [nome] vira um objeto, e [pai.filho] vira um objeto dentro de outro. Pares chave = valor e chave: valor são aceitos. Linhas que começam com ; ou # são comentários, assim como um ; ou # depois de um espaço no fim da linha. Valores entre aspas duplas aceitam \\n, \\t e \\r; entre aspas simples, ficam exatamente como estão. Chaves repetidas na mesma seção, ou terminadas em [], viram listas. Uma linha só com o nome da chave vira true. Com “Converter números e booleanos”, 5432 vira número e true, yes ou on viram true. Erros indicam a linha.',
			faq: [
				{
					question: 'Como colocar ; ou # dentro de um valor?',
					answer:
						'Coloque o valor entre aspas, por exemplo senha = "abc;123". Sem aspas, um ; ou # depois de um espaço inicia um comentário e o resto da linha é ignorado.',
				},
				{
					question: 'O que acontece com uma chave repetida na mesma seção?',
					answer:
						'Todos os valores são mantidos, em ordem, numa lista, em vez de o último sobrescrever os anteriores. Uma chave terminada em [], como path[] = /usr, vira lista mesmo com um valor só.',
				},
				{
					question: 'Por que um número grande ficou como texto?',
					answer:
						'Inteiros maiores que 2^53 (cerca de 9 quatrilhões) perderiam dígitos como número em JavaScript, então ficam como texto para não mudar de valor.',
				},
				{
					question: 'Como desligar a conversão de tipos?',
					answer:
						'Desmarque “Converter números e booleanos”. Assim todos os valores ficam como texto, o que é útil para códigos com zero à esquerda ou senhas que parecem números.',
				},
			],
			howTo: {
				title: 'Como um arquivo INI vira JSON',
				steps: [
					'Chaves antes da primeira seção ficam no objeto principal.',
					'Cada [seção] abre um objeto; [pai.filho] abre um objeto dentro de pai.',
					'Cada chave = valor vira uma propriedade do objeto da seção aberta, e repetições viram lista.',
					'Comentários e linhas em branco são descartados.',
				],
				example:
					'[db] host = localhost, port = 5432 e, em [db.replica], host = r1 e host = r2 (uma chave por linha) viram {"db": {"host": "localhost", "port": 5432, "replica": {"host": ["r1", "r2"]}}}.',
			},
			updatedAt: '2026-11-08',
		},
		'ini-para-yaml': {
			title: 'Conversor de INI para YAML',
			metaDescription:
				'Converta arquivos INI em YAML: seções, subseções [pai.filho], valores entre aspas e chaves repetidas como listas, com indentação de 2 ou 4 espaços.',
			answer:
				'O conversor lê o arquivo INI e gera YAML com 2 ou 4 espaços de indentação. Cada [seção] vira um bloco, e [pai.filho] vira um bloco dentro de outro. Aceita chave = valor e chave: valor, comentários com ; ou # (no início da linha ou depois de um espaço) e valores entre aspas para incluir esses caracteres. Chaves repetidas ou terminadas em [] viram listas com hífen, e uma linha só com o nome da chave vira true. Com “Converter números e booleanos”, 5432 vira número e true, yes e on viram true; sem a opção, tudo fica como texto. Se uma linha não puder ser lida, o erro mostra o número dela.',
			faq: [
				{
					question: 'Uma chave sem valor é aceita?',
					answer:
						'Sim. Uma linha só com o nome da chave, como skip-networking, vira true, como nos arquivos de configuração do MySQL. Se a linha tiver espaços e nenhum = ou :, ela é tratada como erro.',
				},
				{
					question: 'Os comentários do INI vão para o YAML?',
					answer:
						'Não. Os comentários são ignorados na leitura e o YAML gerado tem só os dados, embora o YAML aceite comentários com #.',
				},
				{
					question: 'Por que migrar configuração de INI para YAML?',
					answer:
						'O INI só tem dois níveis (seção e chave) e não tem tipos nem listas padronizados. O YAML permite aninhamento sem limite, listas e tipos, e é o formato usado por Docker Compose, Kubernetes e muitas ferramentas de CI.',
				},
			],
			updatedAt: '2026-11-08',
		},
		'csv-para-sql': {
			title: 'Conversor de CSV para SQL (INSERT)',
			metaDescription:
				'Gere CREATE TABLE com tipos inferidos e INSERTs em lote a partir de um CSV, para MySQL, PostgreSQL, SQLite ou SQL Server. Detecta o separador.',
			answer:
				'O conversor lê o CSV no padrão RFC 4180 (campos entre aspas, "" para aspas dentro do texto e quebras de linha dentro de aspas) e detecta o separador entre vírgula, ponto e vírgula, tab e barra vertical. Com a primeira linha como cabeçalho, ela dá os nomes das colunas. O tipo de cada coluna é inferido de todos os valores: inteiros, decimais com ponto, true/false, datas AAAA-MM-DD ou DD/MM/AAAA, data e hora ou texto. Depois gera o CREATE TABLE (opcional) e INSERTs com várias linhas cada. Nomes e valores seguem o dialeto escolhido: MySQL, PostgreSQL, SQLite ou SQL Server. Células vazias viram NULL.',
			faq: [
				{
					question: 'Como os tipos das colunas são escolhidos?',
					answer:
						'Pelo conteúdo de todas as linhas: só inteiros vira INTEGER (ou BIGINT acima de 2.147.483.647), números com ponto vira DECIMAL, true/false vira BOOLEAN, datas AAAA-MM-DD ou DD/MM/AAAA viram DATE, data e hora vira DATETIME ou TIMESTAMP e o resto vira VARCHAR com o maior tamanho encontrado.',
				},
				{
					question: 'Para que serve “Linhas por INSERT”?',
					answer:
						'Agrupa várias linhas em um único INSERT, o que costuma ser bem mais rápido de importar que um comando por linha. No SQL Server o limite é de 1.000 linhas por comando, e a ferramenta respeita isso.',
				},
				{
					question: 'Valores com vírgula decimal, como 10,50, viram número?',
					answer:
						'Não. Só números com ponto decimal são reconhecidos como DECIMAL; 10,50 vira texto. Troque a vírgula por ponto no CSV antes, se a coluna for numérica.',
				},
				{
					question: 'O que acontece com datas no formato brasileiro?',
					answer:
						'Uma coluna só com datas DD/MM/AAAA válidas vira DATE, e cada valor é gravado como AAAA-MM-DD, o formato que os bancos aceitam. Datas impossíveis, como 30/02, fazem a coluna virar texto.',
				},
				{
					question: 'E se uma linha tiver colunas a mais ou a menos?',
					answer:
						'A ferramenta avisa quais linhas estão diferentes. Colunas que faltam viram NULL e as que sobram são ignoradas.',
				},
			],
			howTo: {
				title: 'Como transformar um CSV em INSERT',
				steps: [
					'Use a primeira linha do CSV como lista de colunas.',
					'Olhe todos os valores de cada coluna para escolher o tipo: inteiro, decimal, booleano, data ou texto.',
					'Escreva o CREATE TABLE com uma coluna por campo e NOT NULL onde nenhum valor está vazio.',
					"Para cada linha, escreva os valores entre parênteses: textos entre aspas simples (com '' para aspas internas), números sem aspas e células vazias como NULL.",
					'Agrupe as linhas em INSERT INTO tabela (colunas) VALUES (...), (...);',
				],
				example:
					'id;nome;ativo;nascimento com as linhas 1;Ana;true;31/12/1990 e 2;Bruno;false; gera, no PostgreSQL, CREATE TABLE "clientes" ("id" INTEGER NOT NULL, "nome" VARCHAR(5) NOT NULL, "ativo" BOOLEAN NOT NULL, "nascimento" DATE) e INSERT INTO "clientes" (...) VALUES (1, \'Ana\', TRUE, \'1990-12-31\'), (2, \'Bruno\', FALSE, NULL);',
				source: {
					label: 'RFC 4180: Common Format and MIME Type for CSV Files',
					url: 'https://www.rfc-editor.org/rfc/rfc4180',
				},
			},
			updatedAt: '2026-11-08',
		},
		'imagem-para-data-uri': {
			title: 'Converter imagem para Base64 (data URI)',
			metaDescription:
				'Transforme uma imagem ou arquivo em data URI Base64 com prévia, dimensões e código pronto para CSS, HTML <img> e Markdown. Sem enviar o arquivo.',
			answer:
				'A ferramenta lê o arquivo escolhido ou arrastado no próprio navegador e gera o data URI no formato data:tipo;base64,conteúdo. O tipo MIME vem do arquivo (image/png, image/svg+xml e assim por diante). Para imagens, mostra a prévia e as dimensões. O resultado vem pronto em quatro formas: o data URI puro, uma regra CSS background-image, uma tag HTML <img> com largura, altura e texto alternativo, e a sintaxe de imagem do Markdown. A ferramenta também compara o tamanho do arquivo com o do data URI, que fica cerca de 33% maior por causa do Base64, e avisa quando o arquivo passa de 100 KB.',
			faq: [
				{
					question: 'Quando vale a pena usar data URI?',
					answer:
						'Para ícones e imagens pequenas, de poucos KB, que você quer embutir no HTML, CSS ou e-mail sem uma requisição extra. Para imagens grandes, um arquivo comum é melhor porque o navegador guarda em cache separado.',
				},
				{
					question: 'Por que o data URI fica maior que a imagem?',
					answer:
						'O Base64 representa cada 3 bytes com 4 caracteres, então o texto fica cerca de 33% maior que o arquivo. A compressão gzip do servidor reduz parte dessa diferença.',
				},
				{
					question: 'Como usar o data URI no CSS?',
					answer:
						'Coloque-o dentro de url(), por exemplo background-image: url("data:image/png;base64,…");. A ferramenta já entrega essa linha pronta para copiar.',
				},
				{
					question: 'Meu arquivo é enviado para algum servidor?',
					answer: 'Não. O arquivo é lido pelo próprio navegador e nada é enviado.',
				},
			],
			updatedAt: '2026-11-08',
		},
		'data-uri-para-imagem': {
			title: 'Converter Base64 (data URI) em imagem',
			metaDescription:
				'Cole um data URI e veja a imagem, o tipo MIME, o tamanho e as dimensões, e baixe o arquivo com a extensão certa. Aceita Base64 e url() do CSS.',
			answer:
				'A ferramenta lê um data URI no formato data:tipo;parâmetros;base64,dados, valida cada parte e decodifica os dados para bytes. Ela mostra o tipo MIME, o tamanho do arquivo, a codificação usada, as dimensões e a prévia quando é imagem, e permite baixar o arquivo com a extensão do tipo (png, jpg, svg, pdf e outras). Aceita dados em Base64, inclusive no alfabeto seguro para URL e sem =, ou texto com percent-encoding, como data:,Ol%C3%A1. Quebras de linha e espaços no Base64 são ignorados, e também é possível colar o url("data:…") copiado direto do CSS. Sem tipo informado, vale text/plain.',
			faq: [
				{
					question: 'Por que meu data URI é inválido?',
					answer:
						'Ele precisa começar com data:, ter uma vírgula antes dos dados e, se tiver ;base64, conter só letras, números, +, / e = no final. Um erro comum é copiar o texto cortado, sem o fim do Base64.',
				},
				{
					question: 'Como transformar um texto Base64 sem data: em imagem?',
					answer:
						'Acrescente o cabeçalho na frente, com o tipo da imagem: data:image/png;base64, seguido do texto. Se não souber o tipo, Base64 de PNG costuma começar com iVBOR e de JPEG com /9j/.',
				},
				{
					question: 'Funciona com arquivos que não são imagens?',
					answer:
						'Sim. Qualquer tipo é decodificado e pode ser baixado, como PDF, fontes ou JSON; a prévia aparece apenas para imagens.',
				},
			],
			howTo: {
				title: 'Como ler um data URI',
				steps: [
					'Confirme que o texto começa com data:.',
					'Leia o que vem antes da vírgula: o tipo MIME, parâmetros opcionais como charset e, por último, ;base64 se os dados estiverem em Base64.',
					'Pegue tudo depois da vírgula e decodifique o Base64 ou o percent-encoding para obter os bytes.',
					'Salve os bytes com a extensão correspondente ao tipo.',
				],
				example:
					'data:text/plain;base64,T2k= tem tipo text/plain, está em Base64, e os dados T2k= decodificam para os 2 bytes do texto “Oi”.',
				source: {
					label: 'RFC 2397: The "data" URL scheme',
					url: 'https://www.rfc-editor.org/rfc/rfc2397',
				},
			},
			updatedAt: '2026-11-08',
		},
	},
}
