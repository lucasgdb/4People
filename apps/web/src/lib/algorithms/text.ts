/* ----------------------------- Character count ----------------------------- */

const VOWELS = /[aeiouáàâãéêíóôõúü]/i
const CONSONANTS = /[bcçdfghjklmnpqrstvwxyz]/i

export function countCharacters(text: string) {
	const chars = [...text]
	let withoutSpaces = 0
	let spaces = 0
	let vowels = 0
	let consonants = 0
	let numbers = 0
	// A single pass instead of one filter per metric: it matters on long pastes.
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

/* ------------------------------ Case converter ------------------------------ */

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

const LOCALE = 'pt-BR'

/** Words of an identifier or sentence: splits on spaces, punctuation and camelCase humps. */
const splitWords = (text: string) =>
	text
		.replace(/([\p{Ll}\d])(\p{Lu})/gu, '$1 $2')
		.replace(/(\p{Lu})(\p{Lu}\p{Ll})/gu, '$1 $2')
		.split(/[^\p{L}\p{N}]+/u)
		.filter(Boolean)

const capitalize = (word: string) =>
	word.charAt(0).toLocaleUpperCase(LOCALE) + word.slice(1).toLocaleLowerCase(LOCALE)

/** Identifiers drop accents ("ação" → "acao") so they work in code and URLs. */
const stripAccents = (word: string) => word.normalize('NFD').replace(/\p{Diacritic}/gu, '')

const upperCaseLetter = (prefix: string, letter: string) =>
	prefix + letter.toLocaleUpperCase(LOCALE)

export function convertCase(text: string, kind: CaseKind): string {
	const identifierWords = () => splitWords(text).map(stripAccents)
	switch (kind) {
		case 'upper':
			return text.toLocaleUpperCase(LOCALE)
		case 'lower':
			return text.toLocaleLowerCase(LOCALE)
		case 'title':
			return text
				.toLocaleLowerCase(LOCALE)
				.replace(/(^|\s)(\p{L})/gu, (_match, space, letter) => upperCaseLetter(space, letter))
		case 'sentence':
			return text
				.toLocaleLowerCase(LOCALE)
				.replace(/(^\s*|[.!?]\s+)(\p{L})/gu, (_match, before, letter) =>
					upperCaseLetter(before, letter),
				)
		case 'camel':
			return identifierWords()
				.map((word, index) => (index === 0 ? word.toLowerCase() : capitalize(word)))
				.join('')
		case 'pascal':
			return identifierWords().map(capitalize).join('')
		case 'snake':
			return identifierWords()
				.map((word) => word.toLowerCase())
				.join('_')
		case 'kebab':
			return identifierWords()
				.map((word) => word.toLowerCase())
				.join('-')
		case 'constant':
			return identifierWords()
				.map((word) => word.toUpperCase())
				.join('_')
	}
}

/* ------------------------------- Sort lines ------------------------------- */

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

/** Keeps the first of the lines the collator considers equal. */
function removeDuplicates(lines: readonly string[], collator: Intl.Collator): string[] {
	const kept: string[] = []
	for (const line of lines) {
		const isDuplicate = kept.some((keptLine) => collator.compare(keptLine, line) === 0)
		if (!isDuplicate) kept.push(line)
	}
	return kept
}

/** Fisher–Yates shuffle. */
function shuffleInPlace(lines: string[], random: () => number): string[] {
	for (let index = lines.length - 1; index > 0; index -= 1) {
		const swapIndex = Math.floor(random() * (index + 1))
		;[lines[index], lines[swapIndex]] = [lines[swapIndex] as string, lines[index] as string]
	}
	return lines
}

export function sortLines(text: string, options: SortOptions, random = Math.random): string[] {
	let lines = text.split(/\r?\n/)
	if (options.trim) lines = lines.map((line) => line.trim())
	if (options.removeEmpty) lines = lines.filter((line) => line.trim() !== '')
	const collator = new Intl.Collator(LOCALE, {
		sensitivity: options.ignoreCase ? 'base' : 'variant',
		numeric: options.natural,
	})
	if (options.unique) lines = removeDuplicates(lines, collator)

	switch (options.order) {
		case 'asc':
			return lines.sort(collator.compare)
		case 'desc':
			return lines.sort((a, b) => collator.compare(b, a))
		case 'length':
			return lines.sort((a, b) => a.length - b.length || collator.compare(a, b))
		case 'shuffle':
			return shuffleInPlace(lines, random)
	}
}

/* ------------------------------ Word frequency ------------------------------ */

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
	const allWords = text.toLocaleLowerCase(LOCALE).match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []
	const countedWords = allWords.filter(
		(word) => word.length >= minLength && !(ignoreStopwords && STOPWORDS_PT.has(word)),
	)
	const total = countedWords.length

	const counts = new Map<string, number>()
	for (const word of countedWords) counts.set(word, (counts.get(word) ?? 0) + 1)

	const collator = new Intl.Collator(LOCALE)
	const words = [...counts]
		.map(([word, count]) => ({ word, count, share: total ? count / total : 0 }))
		.sort((a, b) => b.count - a.count || collator.compare(a.word, b.word))
	return { total, words }
}

/* ------------------------------- Text ⇄ HTML ------------------------------- */

const HTML_ESCAPES: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
}

export const escapeHtml = (text: string) =>
	text.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char)

/** URLs become links; trailing punctuation is left out of the link. */
const linkify = (html: string) =>
	html.replace(/\bhttps?:\/\/[^\s<]+[^\s<.,;:!?)]/g, (url) => `<a href="${url}">${url}</a>`)

/** Plain text → HTML: escapes special characters; blank lines make paragraphs, single breaks <br>. */
export function textToHtml(text: string, { paragraphs = true, links = false } = {}): string {
	const toHtmlBlock = (block: string) => {
		const escaped = escapeHtml(block)
		const withLinks = links ? linkify(escaped) : escaped
		return withLinks.replace(/\r?\n/g, '<br>\n')
	}
	if (!paragraphs) return toHtmlBlock(text)
	return text
		.split(/(?:\r?\n){2,}/)
		.map((paragraph) => paragraph.trim())
		.filter(Boolean)
		.map((paragraph) => `<p>${toHtmlBlock(paragraph)}</p>`)
		.join('\n')
}

const NAMED_ENTITIES: Record<string, string> = {
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
		.replace(/&#x([0-9a-f]+);/gi, (_match, hex: string) =>
			String.fromCodePoint(Number.parseInt(hex, 16)),
		)
		.replace(/&#(\d+);/g, (_match, decimal: string) => String.fromCodePoint(Number(decimal)))
		.replace(/&([a-z]+);/gi, (entity, name: string) => NAMED_ENTITIES[name] ?? entity)
		.trim()
}

/* ---------------------------- Character details ---------------------------- */

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

/** Checked in order: the first matching Unicode category names the character. */
const CHARACTER_KINDS: ReadonlyArray<[RegExp, string]> = [
	[/\p{Lu}/u, 'Letra maiúscula'],
	[/\p{Ll}/u, 'Letra minúscula'],
	[/\p{L}/u, 'Letra'],
	[/\p{Nd}/u, 'Dígito'],
	[/\p{N}/u, 'Número'],
	[/\p{Extended_Pictographic}/u, 'Emoji'],
	[/\p{P}/u, 'Pontuação'],
	[/\p{S}/u, 'Símbolo'],
	[/\p{Zs}/u, 'Espaço'],
	[/\p{Cc}/u, 'Controle'],
	[/\p{M}/u, 'Marca combinante'],
]

const kindOf = (char: string) =>
	CHARACTER_KINDS.find(([category]) => category.test(char))?.[1] ?? 'Outro'

const toHex = (value: number, minDigits: number) =>
	value.toString(16).toUpperCase().padStart(minDigits, '0')

const utf8Bytes = (char: string) =>
	[...new TextEncoder().encode(char)].map((byte) => toHex(byte, 2)).join(' ')

const utf16CodeUnits = (char: string) =>
	[...Array(char.length).keys()].map((index) => toHex(char.charCodeAt(index), 4)).join(' ')

/** One row per code point, with every escape a developer may need. */
export function charInfo(text: string, limit = 200): CharInfo[] {
	return [...text].slice(0, limit).map((char) => {
		const codePoint = char.codePointAt(0) ?? 0
		const hex = toHex(codePoint, 0)
		return {
			char,
			codePoint: `U+${hex.padStart(4, '0')}`,
			decimal: codePoint,
			utf8: utf8Bytes(char),
			utf16: utf16CodeUnits(char),
			html: `&#x${hex};`,
			js: codePoint > 0xffff ? `\\u{${hex}}` : `\\u${hex.padStart(4, '0')}`,
			css: `\\${hex}`,
			kind: kindOf(char),
		}
	})
}

/* ------------------------------- Clean text ------------------------------- */

export type CleanOptions = {
	removeAccents: boolean
	lineBreaks: 'keep' | 'space' | 'remove'
	collapseSpaces: boolean
	trimLines: boolean
	removeEmptyLines: boolean
}

const mapLines = (text: string, transform: (lines: string[]) => string[]) =>
	transform(text.split('\n')).join('\n')

export function cleanText(text: string, options: CleanOptions): string {
	let cleaned = text.replace(/\r\n/g, '\n')
	if (options.removeAccents) {
		cleaned = cleaned
			.normalize('NFD')
			.replace(/\p{Diacritic}/gu, '')
			.normalize('NFC')
	}
	if (options.trimLines) {
		cleaned = mapLines(cleaned, (lines) => lines.map((line) => line.trim()))
	}
	if (options.removeEmptyLines) {
		cleaned = mapLines(cleaned, (lines) => lines.filter((line) => line.trim() !== ''))
	}
	if (options.lineBreaks === 'space') cleaned = cleaned.replace(/\n+/g, ' ')
	if (options.lineBreaks === 'remove') cleaned = cleaned.replace(/\n+/g, '')
	if (options.collapseSpaces) cleaned = cleaned.replace(/[ \t ]{2,}/g, ' ')
	return options.trimLines ? cleaned.trim() : cleaned
}
