const VOWELS = /[aeiouáàâãéêíóôõúü]/i
const CONSONANTS = /[bcçdfghjklmnpqrstvwxyz]/i

export function countCharacters(text: string) {
	const chars = [...text]
	let withoutSpaces = 0
	let spaces = 0
	let vowels = 0
	let consonants = 0
	let numbers = 0
	// One pass over the text instead of one filter per metric (matters on long pastes).
	for (const char of chars) {
		if (!/\s/.test(char)) withoutSpaces += 1
		if (char === ' ') spaces += 1
		else if (VOWELS.test(char)) vowels += 1
		else if (CONSONANTS.test(char)) consonants += 1
		else if (char >= '0' && char <= '9') numbers += 1
	}
	return {
		characters: chars.length,
		withoutSpaces,
		words: text.split(/\s+/).filter(Boolean).length,
		spaces,
		vowels,
		consonants,
		numbers,
		lines: text.length === 0 ? 0 : text.split('\n').length,
	}
}

/* ------------------------------ Conversor de caixa ---------------------------- */

export const CASES = {
	upper: 'MAIÚSCULAS',
	lower: 'minúsculas',
	title: 'Título Com Iniciais',
	sentence: 'Frase com inicial maiúscula',
	camel: 'camelCase',
	pascal: 'PascalCase',
	snake: 'snake_case',
	kebab: 'kebab-case',
	constant: 'CONSTANT_CASE',
} as const

export type CaseKind = keyof typeof CASES

/** Words of an identifier or sentence: splits on spaces, punctuation and camelCase humps. */
const words = (text: string) =>
	text
		.replace(/([\p{Ll}\d])(\p{Lu})/gu, '$1 $2')
		.replace(/(\p{Lu})(\p{Lu}\p{Ll})/gu, '$1 $2')
		.split(/[^\p{L}\p{N}]+/u)
		.filter(Boolean)

const capitalize = (word: string) =>
	word.charAt(0).toLocaleUpperCase('pt-BR') + word.slice(1).toLocaleLowerCase('pt-BR')
/** Identifiers drop accents ("ação" → "acao") so they work in code and URLs. */
const plain = (word: string) => word.normalize('NFD').replace(/\p{Diacritic}/gu, '')

export function convertCase(text: string, kind: CaseKind): string {
	switch (kind) {
		case 'upper':
			return text.toLocaleUpperCase('pt-BR')
		case 'lower':
			return text.toLocaleLowerCase('pt-BR')
		case 'title':
			return text
				.toLocaleLowerCase('pt-BR')
				.replace(/(^|\s)(\p{L})/gu, (_, space, letter) => space + letter.toLocaleUpperCase('pt-BR'))
		case 'sentence':
			return text
				.toLocaleLowerCase('pt-BR')
				.replace(
					/(^\s*|[.!?]\s+)(\p{L})/gu,
					(_, before, letter) => before + letter.toLocaleUpperCase('pt-BR'),
				)
		case 'camel':
			return words(text)
				.map((word, index) => (index === 0 ? plain(word).toLowerCase() : capitalize(plain(word))))
				.join('')
		case 'pascal':
			return words(text)
				.map((word) => capitalize(plain(word)))
				.join('')
		case 'snake':
			return words(text)
				.map((word) => plain(word).toLowerCase())
				.join('_')
		case 'kebab':
			return words(text)
				.map((word) => plain(word).toLowerCase())
				.join('-')
		case 'constant':
			return words(text)
				.map((word) => plain(word).toUpperCase())
				.join('_')
	}
}

/* -------------------------------- Ordenar linhas ------------------------------- */

export type SortOrder = 'asc' | 'desc' | 'length' | 'shuffle'

export type SortOptions = {
	order: SortOrder
	/** Ignore case and accents ("é" sorts with "e"). */
	ignoreCase: boolean
	/** "item 2" before "item 10". */
	natural: boolean
	unique: boolean
	removeEmpty: boolean
	trim: boolean
}

export function sortLines(text: string, options: SortOptions, random = Math.random): string[] {
	let lines = text.split(/\r?\n/)
	if (options.trim) lines = lines.map((line) => line.trim())
	if (options.removeEmpty) lines = lines.filter((line) => line.trim() !== '')
	const collator = new Intl.Collator('pt-BR', {
		sensitivity: options.ignoreCase ? 'base' : 'variant',
		numeric: options.natural,
	})
	if (options.unique) {
		const kept: string[] = []
		for (const line of lines) {
			if (!kept.some((other) => collator.compare(other, line) === 0)) kept.push(line)
		}
		lines = kept
	}
	switch (options.order) {
		case 'asc':
			return lines.sort(collator.compare)
		case 'desc':
			return lines.sort((a, b) => collator.compare(b, a))
		case 'length':
			return lines.sort((a, b) => a.length - b.length || collator.compare(a, b))
		case 'shuffle':
			for (let i = lines.length - 1; i > 0; i -= 1) {
				const j = Math.floor(random() * (i + 1))
				;[lines[i], lines[j]] = [lines[j] as string, lines[i] as string]
			}
			return lines
	}
}

/* ----------------------------- Frequência de palavras ----------------------------- */

/** Most frequent Portuguese function words, skipped on request. */
export const STOPWORDS_PT = new Set(
	'a o as os um uma uns umas de do da dos das no na nos nas em ao aos à às por pelo pela pelos pelas para pra com sem sob sobre e ou mas que se como mais menos muito já não sim é são foi ser ter há eu tu ele ela nós vós eles elas me te lhe nos vos seu sua seus suas meu minha teu tua isso isto aquilo esse essa este esta aquele aquela entre até quando onde também só'.split(
		' ',
	),
)

export type WordCount = { word: string; count: number; share: number }

export function wordFrequency(
	text: string,
	{ ignoreStopwords = false, minLength = 1 } = {},
): { total: number; words: WordCount[] } {
	const tokens = (
		text.toLocaleLowerCase('pt-BR').match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []
	).filter((word) => word.length >= minLength && !(ignoreStopwords && STOPWORDS_PT.has(word)))
	const counts = new Map<string, number>()
	for (const word of tokens) counts.set(word, (counts.get(word) ?? 0) + 1)
	const collator = new Intl.Collator('pt-BR')
	const words = [...counts]
		.map(([word, count]) => ({ word, count, share: tokens.length ? count / tokens.length : 0 }))
		.sort((a, b) => b.count - a.count || collator.compare(a.word, b.word))
	return { total: tokens.length, words }
}

/* --------------------------------- Texto ⇄ HTML -------------------------------- */

const ESCAPES: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
}
export const escapeHtml = (text: string) =>
	text.replace(/[&<>"']/g, (char) => ESCAPES[char] ?? char)

/** Plain text → HTML: escapes special characters; blank lines make paragraphs, single breaks <br>. */
export function textToHtml(text: string, { paragraphs = true, links = false } = {}): string {
	const linkify = (html: string) =>
		links
			? html.replace(/\bhttps?:\/\/[^\s<]+[^\s<.,;:!?)]/g, (url) => `<a href="${url}">${url}</a>`)
			: html
	const block = (part: string) => linkify(escapeHtml(part)).replace(/\r?\n/g, '<br>\n')
	if (!paragraphs) return block(text)
	return text
		.split(/(?:\r?\n){2,}/)
		.map((part) => part.trim())
		.filter(Boolean)
		.map((part) => `<p>${block(part)}</p>`)
		.join('\n')
}

const NAMED: Record<string, string> = {
	amp: '&',
	lt: '<',
	gt: '>',
	quot: '"',
	apos: "'",
	nbsp: ' ',
	copy: '©',
	reg: '®',
	trade: '™',
	hellip: '…',
	ndash: '–',
	mdash: '—',
	laquo: '«',
	raquo: '»',
	ordf: 'ª',
	ordm: 'º',
	deg: '°',
	euro: '€',
	aacute: 'á',
	eacute: 'é',
	iacute: 'í',
	oacute: 'ó',
	uacute: 'ú',
	Aacute: 'Á',
	Eacute: 'É',
	Iacute: 'Í',
	Oacute: 'Ó',
	Uacute: 'Ú',
	agrave: 'à',
	Agrave: 'À',
	acirc: 'â',
	ecirc: 'ê',
	ocirc: 'ô',
	Acirc: 'Â',
	Ecirc: 'Ê',
	Ocirc: 'Ô',
	atilde: 'ã',
	otilde: 'õ',
	Atilde: 'Ã',
	Otilde: 'Õ',
	ccedil: 'ç',
	Ccedil: 'Ç',
	uuml: 'ü',
	Uuml: 'Ü',
}

/** HTML → plain text: decodes entities (named and numeric) and turns <br>/<p> back into line breaks. */
export function htmlToText(html: string): string {
	return html
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<\/p>\s*/gi, '\n\n')
		.replace(/<[^>]+>/g, '')
		.replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
			String.fromCodePoint(Number.parseInt(hex, 16)),
		)
		.replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(Number(dec)))
		.replace(/&([a-z]+);/gi, (entity, name: string) => NAMED[name] ?? entity)
		.trim()
}

/* --------------------------- Informações de caractere --------------------------- */

export type CharInfo = {
	char: string
	codePoint: string
	decimal: number
	utf8: string
	utf16: string
	html: string
	js: string
	css: string
	kind: string
}

const kindOf = (char: string) =>
	/\p{Lu}/u.test(char)
		? 'Letra maiúscula'
		: /\p{Ll}/u.test(char)
			? 'Letra minúscula'
			: /\p{L}/u.test(char)
				? 'Letra'
				: /\p{Nd}/u.test(char)
					? 'Dígito'
					: /\p{N}/u.test(char)
						? 'Número'
						: /\p{Extended_Pictographic}/u.test(char)
							? 'Emoji'
							: /\p{P}/u.test(char)
								? 'Pontuação'
								: /\p{S}/u.test(char)
									? 'Símbolo'
									: /\p{Zs}/u.test(char)
										? 'Espaço'
										: /\p{Cc}/u.test(char)
											? 'Controle'
											: /\p{M}/u.test(char)
												? 'Marca combinante'
												: 'Outro'

/** One row per code point, with every escape a developer may need. */
export function charInfo(text: string, limit = 200): CharInfo[] {
	return [...text].slice(0, limit).map((char) => {
		const code = char.codePointAt(0) ?? 0
		const hex = code.toString(16).toUpperCase()
		return {
			char,
			codePoint: `U+${hex.padStart(4, '0')}`,
			decimal: code,
			utf8: [...new TextEncoder().encode(char)]
				.map((b) => b.toString(16).toUpperCase().padStart(2, '0'))
				.join(' '),
			utf16: [...Array(char.length).keys()]
				.map((i) => char.charCodeAt(i).toString(16).toUpperCase().padStart(4, '0'))
				.join(' '),
			html: `&#x${hex};`,
			js: code > 0xffff ? `\\u{${hex}}` : `\\u${hex.padStart(4, '0')}`,
			css: `\\${hex}`,
			kind: kindOf(char),
		}
	})
}

/* --------------------------------- Limpar texto --------------------------------- */

export type CleanOptions = {
	removeAccents: boolean
	lineBreaks: 'keep' | 'space' | 'remove'
	collapseSpaces: boolean
	trimLines: boolean
	removeEmptyLines: boolean
}

export function cleanText(text: string, options: CleanOptions): string {
	let out = text.replace(/\r\n/g, '\n')
	if (options.removeAccents)
		out = out
			.normalize('NFD')
			.replace(/\p{Diacritic}/gu, '')
			.normalize('NFC')
	if (options.trimLines)
		out = out
			.split('\n')
			.map((line) => line.trim())
			.join('\n')
	if (options.removeEmptyLines)
		out = out
			.split('\n')
			.filter((line) => line.trim() !== '')
			.join('\n')
	if (options.lineBreaks === 'space') out = out.replace(/\n+/g, ' ')
	if (options.lineBreaks === 'remove') out = out.replace(/\n+/g, '')
	if (options.collapseSpaces) out = out.replace(/[ \t ]{2,}/g, ' ')
	return options.trimLines ? out.trim() : out
}
