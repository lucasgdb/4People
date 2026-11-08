import { CATEGORIES, TOOLS } from './catalog.ts'

/**
 * The site used English URLs (/computation/generators/cpf-generator) until the routes moved to
 * Portuguese (/computacao/geradores/gerador-de-cpf). Each old segment maps to its new slug, so
 * links and search results pointing at the old pages get a permanent redirect (308).
 */
const OLD_SLUG: Record<string, string> = {
	computation: 'computacao',
	math: 'matematica',
	generators: 'geradores',
	validators: 'validadores',
	'string-functions': 'funcoes-de-texto',
	'network-internet': 'rede-e-internet',
	'encoder-decoder': 'codificadores-e-formatos',
	'tables-patterns': 'tabelas-e-padroes',
	utilities: 'utilitarios',
	'area-calculation': 'calculo-de-areas',
	'date-calculation': 'calculo-de-datas',
	calculators: 'calculadoras',
	'cpf-generator': 'gerador-de-cpf',
	'cnpj-generator': 'gerador-de-cnpj',
	'rg-generator': 'gerador-de-rg',
	'password-generator': 'gerador-de-senha',
	'name-generator': 'gerador-de-nomes',
	'uuid-generator': 'gerador-de-uuid',
	'hash-generator': 'gerador-de-hash',
	'cnh-generator': 'gerador-de-cnh',
	'pis-generator': 'gerador-de-pis',
	'renavam-generator': 'gerador-de-renavam',
	'voter-id-generator': 'gerador-de-titulo-de-eleitor',
	'card-generator': 'gerador-de-cartao-de-credito',
	'plate-generator': 'gerador-de-placas',
	'people-generator': 'gerador-de-pessoas',
	'cpf-validator': 'validador-de-cpf',
	'cnpj-validator': 'validador-de-cnpj',
	'rg-validator': 'validador-de-rg',
	'cnh-validator': 'validador-de-cnh',
	'pis-validator': 'validador-de-pis',
	'renavam-validator': 'validador-de-renavam',
	'voter-id-validator': 'validador-de-titulo-de-eleitor',
	'card-validator': 'validador-de-cartao-de-credito',
	'characters-count': 'contador-de-caracteres',
	'case-converter': 'maiusculas-e-minusculas',
	'fancy-letters': 'letras-diferentes',
	'sort-lines': 'ordem-alfabetica',
	'word-frequency': 'frequencia-de-palavras',
	'text-to-html': 'texto-para-html',
	'character-info': 'informacoes-de-caractere',
	'number-to-words': 'numero-por-extenso',
	'clean-text': 'limpar-texto',
	'my-ip': 'meu-ip',
	'search-cep': 'buscar-cep',
	'binary-converter': 'conversor-de-binario',
	'json-formatter': 'formatador-de-json',
	'url-encoder': 'codificador-de-url',
	'jwt-decoder': 'decodificador-de-jwt',
	'number-base-converter': 'conversor-de-bases-numericas',
	'keycode-event': 'eventos-de-teclado',
	'ascii-table': 'tabela-ascii',
	'color-converter': 'conversor-de-cores',
	'random-numbers': 'gerador-de-numeros-aleatorios',
	'lorem-ipsum': 'gerador-de-lorem-ipsum',
	'qr-code-generator': 'gerador-de-qr-code',
	'bank-lookup': 'consulta-de-bancos',
	'circle-area': 'area-do-circulo',
	'square-area': 'area-do-quadrado',
	'rectangle-area': 'area-do-retangulo',
	'triangle-area': 'area-do-triangulo',
	'pentagon-area': 'area-do-pentagono',
	'hexagon-area': 'area-do-hexagono',
	'regular-polygon-area': 'area-do-poligono-regular',
	'diamond-area': 'area-do-losango',
	'trapeze-area': 'area-do-trapezio',
	'parallelogram-area': 'area-do-paralelogramo',
	'ellipse-area': 'area-da-elipse',
	'circular-crown-area': 'area-da-coroa-circular',
	'circular-sector-area': 'area-do-setor-circular',
	'difference-between-dates': 'diferenca-entre-datas',
	'add-in-date': 'somar-em-data',
	'subtract-in-date': 'subtrair-em-data',
	percentage: 'porcentagem',
	bmi: 'calculadora-de-imc',
	bhaskara: 'equacao-do-segundo-grau',
	'factorize-number': 'fatorar-numero',
	gcd: 'maximo-divisor-comum',
	lcm: 'minimo-multiplo-comum',
	'prime-numbers': 'numeros-primos',
	'friendly-numbers': 'numeros-amigaveis',
	'temperature-converter': 'conversor-de-temperatura',
	'division-rest': 'divisao-e-resto',
	'rule-of-three': 'regra-de-tres',
	'compound-interest': 'juros-compostos',
	statistics: 'media-mediana-e-moda',
	combinatorics: 'arranjo-e-combinacao',
	'roman-numerals': 'numeros-romanos',
}

const NEW_TO_OLD = new Map(Object.entries(OLD_SLUG).map(([old, current]) => [current, old]))
const old = (slug: string) => NEW_TO_OLD.get(slug) ?? slug

export function legacyRedirects() {
	const pairs: Array<[string, string]> = []
	for (const category of CATEGORIES) {
		pairs.push([`/${old(category.slug)}`, `/${category.slug}`])
		for (const section of category.sections)
			pairs.push([
				`/${old(category.slug)}/${old(section.slug)}`,
				`/${category.slug}/${section.slug}`,
			])
	}
	for (const tool of TOOLS)
		pairs.push([
			`/${old(tool.category.slug)}/${old(tool.section.slug)}/${old(tool.slug)}`,
			tool.href,
		])
	return pairs
		.filter(([source, destination]) => source !== destination)
		.map(([source, destination]) => ({ source, destination, permanent: true }))
}
