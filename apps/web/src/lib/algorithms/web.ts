// Pure helpers for the web developer tools: HTML entities, string escaping, SVG, the REST tester
// and the fake JSON generator. No DOM APIs, so everything runs under node:test.
import type { Faker } from '@faker-js/faker'
import { generateCNPJ, generateCPF } from './documents.ts'
import { generateLorem } from './lorem.ts'
import { randomInt } from './random.ts'

/* =================================== HTML entities =================================== */

// HTML 4 named entities: the set every browser and parser knows.

/** Names for U+00A0 to U+00FF, in code point order. */
const LATIN1_ENTITY_NAMES =
	'nbsp iexcl cent pound curren yen brvbar sect uml copy ordf laquo not shy reg macr deg plusmn sup2 sup3 acute micro para middot cedil sup1 ordm raquo frac14 frac12 frac34 iquest Agrave Aacute Acirc Atilde Auml Aring AElig Ccedil Egrave Eacute Ecirc Euml Igrave Iacute Icirc Iuml ETH Ntilde Ograve Oacute Ocirc Otilde Ouml times Oslash Ugrave Uacute Ucirc Uuml Yacute THORN szlig agrave aacute acirc atilde auml aring aelig ccedil egrave eacute ecirc euml igrave iacute icirc iuml eth ntilde ograve oacute ocirc otilde ouml divide oslash ugrave uacute ucirc uuml yacute thorn yuml'.split(
		' ',
	)
/** Names from U+0391 on. `_` holds the place of U+03A2, which has no character. */
const GREEK_UPPERCASE_ENTITY_NAMES =
	'Alpha Beta Gamma Delta Epsilon Zeta Eta Theta Iota Kappa Lambda Mu Nu Xi Omicron Pi Rho _ Sigma Tau Upsilon Phi Chi Psi Omega'.split(
		' ',
	)
/** Names from U+03B1 on. */
const GREEK_LOWERCASE_ENTITY_NAMES =
	'alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigmaf sigma tau upsilon phi chi psi omega'.split(
		' ',
	)
/** `name:codePoint` pairs for the scattered rest. */
const OTHER_ENTITIES =
	'quot:34 amp:38 apos:39 lt:60 gt:62 OElig:338 oelig:339 Scaron:352 scaron:353 Yuml:376 fnof:402 circ:710 tilde:732 thetasym:977 upsih:978 piv:982 ensp:8194 emsp:8195 thinsp:8201 zwnj:8204 zwj:8205 lrm:8206 rlm:8207 ndash:8211 mdash:8212 lsquo:8216 rsquo:8217 sbquo:8218 ldquo:8220 rdquo:8221 bdquo:8222 dagger:8224 Dagger:8225 bull:8226 hellip:8230 permil:8240 prime:8242 Prime:8243 lsaquo:8249 rsaquo:8250 oline:8254 frasl:8260 euro:8364 image:8465 weierp:8472 real:8476 trade:8482 alefsym:8501 larr:8592 uarr:8593 rarr:8594 darr:8595 harr:8596 crarr:8629 lArr:8656 uArr:8657 rArr:8658 dArr:8659 hArr:8660 forall:8704 part:8706 exist:8707 empty:8709 nabla:8711 isin:8712 notin:8713 ni:8715 prod:8719 sum:8721 minus:8722 lowast:8727 radic:8730 prop:8733 infin:8734 ang:8736 and:8743 or:8744 cap:8745 cup:8746 int:8747 there4:8756 sim:8764 cong:8773 asymp:8776 ne:8800 equiv:8801 le:8804 ge:8805 sub:8834 sup:8835 nsub:8836 sube:8838 supe:8839 oplus:8853 otimes:8855 perp:8869 sdot:8901 lceil:8968 rceil:8969 lfloor:8970 rfloor:8971 lang:9001 rang:9002 loz:9674 spades:9824 clubs:9827 hearts:9829 diams:9830'.split(
		' ',
	)

type EntityEntry = [name: string, codePoint: number]

function consecutiveEntities(names: readonly string[], firstCodePoint: number): EntityEntry[] {
	return names
		.map((name, offset): EntityEntry => [name, firstCodePoint + offset])
		.filter(([name]) => name !== '_')
}

function parseEntityPair(pair: string): EntityEntry {
	const [name = '', codePoint = '0'] = pair.split(':')
	return [name, Number(codePoint)]
}

/** HTML 4 named entities, name → code point. */
export const HTML_ENTITIES: ReadonlyMap<string, number> = new Map<string, number>([
	...consecutiveEntities(LATIN1_ENTITY_NAMES, 0xa0),
	...consecutiveEntities(GREEK_UPPERCASE_ENTITY_NAMES, 0x391),
	...consecutiveEntities(GREEK_LOWERCASE_ENTITY_NAMES, 0x3b1),
	...OTHER_ENTITIES.map(parseEntityPair),
])

/** Code point → entity name, for encoding. `'` is left out because `&apos;` is not HTML 4. */
const ENTITY_NAME_BY_CODE_POINT = new Map<number, string>(
	[...HTML_ENTITIES]
		.filter(([name]) => name !== 'apos')
		.map(([name, codePoint]) => [codePoint, name]),
)

export type HtmlEntityFormat = 'named' | 'decimal' | 'hex'
/** `special`: only & < > " '. `nonAscii`: those plus every character outside printable ASCII. */
export type HtmlEncodeScope = 'special' | 'nonAscii'

/** & < > " ' */
const HTML_SPECIAL_CODE_POINTS = new Set([38, 60, 62, 34, 39])

function entityFor(codePoint: number, format: HtmlEntityFormat): string {
	if (format === 'hex') return `&#x${codePoint.toString(16).toUpperCase()};`
	if (format === 'named') {
		const name = ENTITY_NAME_BY_CODE_POINT.get(codePoint)
		if (name) return `&${name};`
	}
	return `&#${codePoint};`
}

/** Control characters other than tab, line feed and carriage return. */
const isInvisibleControl = (codePoint: number) =>
	codePoint < 32 && codePoint !== 9 && codePoint !== 10 && codePoint !== 13

function shouldEncode(codePoint: number, scope: HtmlEncodeScope): boolean {
	if (HTML_SPECIAL_CODE_POINTS.has(codePoint)) return true
	if (scope === 'special') return false
	return codePoint > 126 || isInvisibleControl(codePoint)
}

/** Encodes text as HTML entities. Named entities fall back to decimal when a character has none. */
export function encodeHtmlEntities(
	text: string,
	{
		format = 'named',
		scope = 'special',
	}: { format?: HtmlEntityFormat; scope?: HtmlEncodeScope } = {},
): string {
	let encoded = ''
	for (const char of text) {
		const codePoint = char.codePointAt(0) ?? 0
		encoded += shouldEncode(codePoint, scope) ? entityFor(codePoint, format) : char
	}
	return encoded
}

const isValidCodePoint = (codePoint: number) =>
	Number.isInteger(codePoint) &&
	codePoint > 0 &&
	codePoint <= 0x10ffff &&
	!(codePoint >= 0xd800 && codePoint <= 0xdfff)

function parseNumericReference(reference: string): number {
	const isHex = reference[1] === 'x' || reference[1] === 'X'
	return isHex ? Number.parseInt(reference.slice(2), 16) : Number.parseInt(reference.slice(1), 10)
}

/** Decodes named (HTML 4 set), decimal and hex entities. Unknown or invalid ones are kept as typed. */
export function decodeHtmlEntities(text: string): string {
	return text.replace(
		/&(#[xX][0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g,
		(entity, reference: string) => {
			const codePoint = reference.startsWith('#')
				? parseNumericReference(reference)
				: HTML_ENTITIES.get(reference)
			if (codePoint === undefined || !isValidCodePoint(codePoint)) return entity
			return String.fromCodePoint(codePoint)
		},
	)
}

/* =================================== string escaping =================================== */

export type EscapeLanguage = 'js' | 'json' | 'java' | 'python' | 'sql' | 'shell' | 'regex'

type CLikeLanguage = 'js' | 'json' | 'java' | 'python'

const toHex = (codePoint: number, width: number) =>
	codePoint.toString(16).toUpperCase().padStart(width, '0')

const JS_ESCAPES: Record<string, string> = {
	'\\': '\\\\',
	"'": "\\'",
	'"': '\\"',
	'\n': '\\n',
	'\r': '\\r',
	'\t': '\\t',
	'\b': '\\b',
	'\f': '\\f',
	'\v': '\\v',
	' ': '\\u2028',
	' ': '\\u2029',
}
const JAVA_ESCAPES: Record<string, string> = {
	'\\': '\\\\',
	"'": "\\'",
	'"': '\\"',
	'\n': '\\n',
	'\r': '\\r',
	'\t': '\\t',
	'\b': '\\b',
	'\f': '\\f',
}
const PYTHON_ESCAPES: Record<string, string> = {
	'\\': '\\\\',
	"'": "\\'",
	'"': '\\"',
	'\n': '\\n',
	'\r': '\\r',
	'\t': '\\t',
}

const isControl = (codePoint: number) => codePoint < 32 || codePoint === 127

function escapeChar(
	char: string,
	escapes: Record<string, string>,
	escapeControl: (codePoint: number) => string,
): string {
	const escaped = escapes[char]
	if (escaped !== undefined) return escaped
	const codePoint = char.codePointAt(0) ?? 0
	return isControl(codePoint) ? escapeControl(codePoint) : char
}

function escapeWith(
	text: string,
	escapes: Record<string, string>,
	escapeControl: (codePoint: number) => string,
): string {
	let escaped = ''
	for (const char of text) escaped += escapeChar(char, escapes, escapeControl)
	return escaped
}

/**
 * Escapes text for a string literal of the language. For every language but the shell, the result
 * goes between the quotes; for the shell it is the whole quoted word (`'it'\''s'`).
 */
export function escapeString(text: string, language: EscapeLanguage): string {
	switch (language) {
		case 'json':
			return JSON.stringify(text).slice(1, -1)
		case 'js':
			return escapeWith(text, JS_ESCAPES, (codePoint) => `\\x${toHex(codePoint, 2)}`)
		case 'java':
			return escapeWith(text, JAVA_ESCAPES, (codePoint) => `\\u${toHex(codePoint, 4)}`)
		case 'python':
			return escapeWith(text, PYTHON_ESCAPES, (codePoint) => `\\x${toHex(codePoint, 2)}`)
		case 'sql':
			return text.replaceAll("'", "''")
		case 'shell':
			return `'${text.replaceAll("'", `'\\''`)}'`
		case 'regex':
			return text.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')
	}
}

const SIMPLE_UNESCAPES: Record<string, string> = {
	n: '\n',
	r: '\r',
	t: '\t',
	b: '\b',
	f: '\f',
	v: '\v',
	'\\': '\\',
	"'": "'",
	'"': '"',
	'/': '/',
}

/** The single-letter escapes each C-like language accepts. */
const SIMPLE_ESCAPES_BY_LANGUAGE: Record<CLikeLanguage, string> = {
	json: 'nrtbf\\"/',
	js: 'nrtbfv\\\'"',
	java: 'nrtbfv\\\'"',
	python: 'nrtbfv\\\'"',
}

/** A decoded escape sequence and the index right after it. */
type DecodedEscape = { value: string; end: number }

function invalidEscape(sequence: string, backslashIndex: number): never {
	throw new Error(`Escape inválido "${sequence}" na posição ${backslashIndex + 1}.`)
}

function readHexDigits(text: string, start: number, minDigits: number, maxDigits: number) {
	let end = start
	while (end < text.length && end - start < maxDigits && /[0-9a-fA-F]/.test(text[end] ?? '')) {
		end += 1
	}
	if (end - start < minDigits) return null
	return { codePoint: Number.parseInt(text.slice(start, end), 16), end }
}

/** JavaScript's `\u{1F600}`. */
function decodeBracedUnicode(text: string, start: number): DecodedEscape {
	const digitsStart = start + 3
	const close = text.indexOf('}', digitsStart)
	if (close < 0) invalidEscape(text.slice(start, digitsStart), start)
	const digits = text.slice(digitsStart, close)
	const codePoint = Number.parseInt(digits, 16)
	if (!/^[0-9a-fA-F]+$/.test(digits) || !isValidCodePoint(codePoint)) {
		invalidEscape(text.slice(start, close + 1), start)
	}
	return { value: String.fromCodePoint(codePoint), end: close + 1 }
}

/** `\uXXXX`, or `\u{…}` in JavaScript. */
function decodeUnicodeEscape(text: string, start: number, language: CLikeLanguage): DecodedEscape {
	if (language === 'js' && text[start + 2] === '{') return decodeBracedUnicode(text, start)
	const hex = readHexDigits(text, start + 2, 4, 4)
	if (!hex) invalidEscape(text.slice(start, start + 6), start)
	return { value: String.fromCharCode(hex.codePoint), end: hex.end }
}

/** `\x`: C# reads 1 to 4 hex digits, JavaScript and Python exactly 2. */
function decodeHexEscape(text: string, start: number, language: CLikeLanguage): DecodedEscape {
	const hex =
		language === 'java'
			? readHexDigits(text, start + 2, 1, 4)
			: readHexDigits(text, start + 2, 2, 2)
	if (!hex) invalidEscape(text.slice(start, start + 4), start)
	return { value: String.fromCharCode(hex.codePoint), end: hex.end }
}

/** `\UXXXXXXXX` (Python and C#). */
function decodeLongUnicodeEscape(text: string, start: number): DecodedEscape {
	const hex = readHexDigits(text, start + 2, 8, 8)
	if (!hex || !isValidCodePoint(hex.codePoint)) invalidEscape(text.slice(start, start + 10), start)
	return { value: String.fromCodePoint(hex.codePoint), end: hex.end }
}

/** Python's `\ooo`: up to three octal digits. */
function decodeOctalEscape(text: string, start: number): DecodedEscape {
	const digitsStart = start + 1
	let end = digitsStart
	while (end < text.length && end - digitsStart < 3 && /[0-7]/.test(text[end] ?? '')) end += 1
	return { value: String.fromCharCode(Number.parseInt(text.slice(digitsStart, end), 8)), end }
}

/** Decodes the escape sequence whose backslash is at `start`. */
function decodeEscape(text: string, start: number, language: CLikeLanguage): DecodedEscape {
	const letter = text[start + 1]
	if (letter === undefined) invalidEscape('\\', start)

	if (SIMPLE_ESCAPES_BY_LANGUAGE[language].includes(letter)) {
		return { value: SIMPLE_UNESCAPES[letter] ?? letter, end: start + 2 }
	}
	if (letter === 'u') return decodeUnicodeEscape(text, start, language)
	if (letter === 'x' && language !== 'json') return decodeHexEscape(text, start, language)
	if (letter === 'U' && (language === 'python' || language === 'java')) {
		return decodeLongUnicodeEscape(text, start)
	}
	if (language === 'python' && /[0-7]/.test(letter)) return decodeOctalEscape(text, start)

	const isNul = letter === '0' && !/\d/.test(text[start + 2] ?? '')
	if (isNul) return { value: '\0', end: start + 2 }

	const isLineContinuation = letter === '\n' && (language === 'js' || language === 'python')
	if (isLineContinuation) return { value: '', end: start + 2 }

	if (language === 'json' || language === 'java') invalidEscape(`\\${letter}`, start)
	// Python keeps unknown escapes as typed; JavaScript drops the backslash.
	return { value: language === 'python' ? `\\${letter}` : letter, end: start + 2 }
}

function unescapeCLike(text: string, language: CLikeLanguage): string {
	let unescaped = ''
	let index = 0
	while (index < text.length) {
		const char = text[index] as string
		if (char === '\\') {
			const decoded = decodeEscape(text, index, language)
			unescaped += decoded.value
			index = decoded.end
		} else {
			unescaped += char
			index += 1
		}
	}
	return unescaped
}

/** A shell word piece and the index right after it. */
type ShellPiece = { value: string; end: number }

/** '…': everything up to the closing quote is literal. */
function readSingleQuoted(text: string, openIndex: number): ShellPiece {
	const close = text.indexOf("'", openIndex + 1)
	if (close < 0) throw new Error("Aspas simples sem fechamento. Feche com '.")
	return { value: text.slice(openIndex + 1, close), end: close + 1 }
}

/** "…": only \\ \" \$ \` and an escaped line break are special. */
function readDoubleQuoted(text: string, openIndex: number): ShellPiece {
	let value = ''
	let index = openIndex + 1
	while (index < text.length) {
		const char = text[index] as string
		if (char === '"') return { value, end: index + 1 }
		const next = text[index + 1] ?? ''
		if (char === '\\' && /[\\"$`\n]/.test(next)) {
			if (next !== '\n') value += next
			index += 2
		} else {
			value += char
			index += 1
		}
	}
	throw new Error('Aspas duplas sem fechamento. Feche com ".')
}

/** Outside quotes, `\x` is `x` and an escaped line break disappears. */
function readBackslash(text: string, backslashIndex: number): ShellPiece {
	const next = text[backslashIndex + 1]
	if (next === undefined) throw new Error('Barra invertida solta no final.')
	return { value: next === '\n' ? '' : next, end: backslashIndex + 2 }
}

function readShellPiece(text: string, index: number): ShellPiece {
	const char = text[index] as string
	if (char === "'") return readSingleQuoted(text, index)
	if (char === '"') return readDoubleQuoted(text, index)
	if (char === '\\') return readBackslash(text, index)
	return { value: char, end: index + 1 }
}

/** Reads a POSIX shell word. */
function unescapeShell(text: string): string {
	let unescaped = ''
	let index = 0
	while (index < text.length) {
		const piece = readShellPiece(text, index)
		unescaped += piece.value
		index = piece.end
	}
	return unescaped
}

/** Reverses `escapeString`. Throws an Error with a Portuguese message on an invalid sequence. */
export function unescapeString(text: string, language: EscapeLanguage): string {
	switch (language) {
		case 'sql':
			return text.replaceAll("''", "'")
		case 'shell':
			return unescapeShell(text)
		case 'regex':
			return text.replace(/\\([.*+?^${}()|[\]\\/-])/g, '$1')
		default:
			return unescapeCLike(text, language)
	}
}

/* ===================================== SVG ===================================== */

export const byteLength = (text: string) => new TextEncoder().encode(text).length

function findRootSvgTag(svg: string) {
	const match = /<svg\b([^>]*)>/i.exec(svg)
	if (!match) return null
	return { tag: match[0], attributes: match[1] ?? '', index: match.index }
}

function replaceRootSvgTag(svg: string, root: { tag: string; index: number }, newTag: string) {
	return svg.slice(0, root.index) + newTag + svg.slice(root.index + root.tag.length)
}

/** Attribute name (lowercased) → value. */
function readAttributes(attributes: string): Record<string, string> {
	const result: Record<string, string> = {}
	for (const match of attributes.matchAll(/([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
		const [, name = '', doubleQuoted, singleQuoted] = match
		result[name.toLowerCase()] = doubleQuoted ?? singleQuoted ?? ''
	}
	return result
}

const PIXELS_PER_UNIT: Record<string, number> = {
	'': 1,
	px: 1,
	pt: 4 / 3,
	pc: 16,
	mm: 96 / 25.4,
	cm: 96 / 2.54,
	in: 96,
}

/** An SVG length in CSS pixels ("10mm" → 37.8); null for %, em or anything unparseable. */
export function svgLengthToPx(value: string | undefined): number | null {
	const match = /^\s*([\d.]+(?:e[-+]?\d+)?)\s*([a-z]*)\s*$/i.exec(value ?? '')
	if (!match) return null
	const [, amountText, unit = ''] = match
	const pixelsPerUnit = PIXELS_PER_UNIT[unit.toLowerCase()]
	const amount = Number(amountText)
	if (pixelsPerUnit === undefined || !Number.isFinite(amount) || amount <= 0) return null
	return amount * pixelsPerUnit
}

export type SvgInfo = {
	width: string | null
	height: string | null
	viewBox: string | null
	/** Rendered size in px: width/height, else the viewBox, else the browser default 300×150. */
	pixelWidth: number
	pixelHeight: number
	bytes: number
	/** Scripts or on* handlers: they never run in the preview (<img>), but are worth knowing about. */
	hasScript: boolean
}

const DEFAULT_SVG_WIDTH = 300
const DEFAULT_SVG_HEIGHT = 150

/** The viewBox width and height, or nulls when it is missing, malformed or not positive. */
function viewBoxSize(viewBox: string | undefined) {
	const numbers = (viewBox ?? '')
		.trim()
		.split(/[\s,]+/)
		.map(Number)
	const [, , width = 0, height = 0] = numbers
	const isFourNumbers = numbers.length === 4
	return {
		width: isFourNumbers && width > 0 ? width : null,
		height: isFourNumbers && height > 0 ? height : null,
	}
}

/** Reads the root <svg> tag. Throws when there is none. */
export function svgInfo(svg: string): SvgInfo {
	const root = findRootSvgTag(svg)
	if (!root) throw new Error('Não encontrei a tag <svg>. Cole o código completo do arquivo .svg.')
	const attributes = readAttributes(root.attributes)
	const viewBox = viewBoxSize(attributes.viewbox)
	let width = svgLengthToPx(attributes.width)
	let height = svgLengthToPx(attributes.height)
	// With only one dimension set, the other follows the viewBox aspect ratio.
	if (width && !height) {
		height =
			viewBox.width && viewBox.height
				? (width * viewBox.height) / viewBox.width
				: DEFAULT_SVG_HEIGHT
	}
	if (height && !width) {
		width =
			viewBox.width && viewBox.height
				? (height * viewBox.width) / viewBox.height
				: DEFAULT_SVG_WIDTH
	}
	return {
		width: attributes.width ?? null,
		height: attributes.height ?? null,
		viewBox: attributes.viewbox ?? null,
		pixelWidth: width ?? viewBox.width ?? DEFAULT_SVG_WIDTH,
		pixelHeight: height ?? viewBox.height ?? DEFAULT_SVG_HEIGHT,
		bytes: byteLength(svg),
		hasScript: /<script\b/i.test(svg) || /\son[a-z]+\s*=/i.test(svg),
	}
}

/** Sets width/height on the root <svg> (some browsers can't draw a size-less SVG onto a canvas). */
export function withSvgSize(svg: string, width: number, height: number): string {
	const root = findRootSvgTag(svg)
	if (!root) return svg
	const otherAttributes = root.attributes
		.replace(/\s(width|height)\s*=\s*(?:"[^"]*"|'[^']*')/gi, '')
		.replace(/\s*\/?$/, '')
	const isSelfClosing = /\/\s*$/.test(root.attributes)
	const newTag = `<svg${otherAttributes} width="${width}" height="${height}"${isSelfClosing ? '/' : ''}>`
	return replaceRootSvgTag(svg, root, newTag)
}

/**
 * Basic, safe minification: drops the XML prolog, DOCTYPE, comments, <metadata>, editor-only
 * elements (Inkscape/Sodipodi) and whitespace between tags. Paths and attributes are untouched.
 */
export function minifySvg(svg: string): string {
	return svg
		.replace(/<\?xml[\s\S]*?\?>/gi, '')
		.replace(/<!DOCTYPE[^>[]*(\[[\s\S]*?\])?\s*>/gi, '')
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/<metadata\b[\s\S]*?<\/metadata>/gi, '')
		.replace(/<(sodipodi|inkscape):[\w-]+\b[^>]*\/>/gi, '')
		.replace(/<(sodipodi|inkscape):([\w-]+)\b[^>]*>[\s\S]*?<\/\1:\2>/gi, '')
		.replace(/>\s+</g, '><')
		.replace(/<[^>]+>/g, (tag) => tag.replace(/\s+/g, ' ').replace(/\s+(\/?)>$/, '$1>'))
		.trim()
}

/**
 * Adds xmlns to the root <svg> when missing: inline SVG copied from HTML works in the page but not as
 * a standalone image. Returns the input unchanged when the namespace is already there.
 */
export function ensureSvgNamespace(svg: string): string {
	const root = findRootSvgTag(svg)
	if (!root || /\sxmlns\s*=/.test(root.attributes)) return svg
	const tagAfterName = root.tag.slice('<svg'.length)
	return replaceRootSvgTag(svg, root, `<svg xmlns="http://www.w3.org/2000/svg"${tagAfterName}`)
}

/** A data: URL for <img src>: the SVG renders as an image, so its scripts never run. */
export const svgDataUrl = (svg: string) =>
	`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

/* ================================== REST tester ================================== */

/** "1,5 KB", "2,3 MB": binary steps (1024), pt-BR decimals. */
export function formatBytes(bytes: number): string {
	const units = ['B', 'KB', 'MB', 'GB']
	let value = bytes
	let unitIndex = 0
	while (value >= 1024 && unitIndex < units.length - 1) {
		value /= 1024
		unitIndex += 1
	}
	const isWholeBytes = unitIndex === 0
	const fractionDigits = !isWholeBytes && value < 10 ? 1 : 0
	const formatted = new Intl.NumberFormat('pt-BR', {
		maximumFractionDigits: fractionDigits,
	}).format(value)
	return `${formatted} ${units[unitIndex]}`
}

export type StatusClass = '1xx' | '2xx' | '3xx' | '4xx' | '5xx' | 'falha'

/** "2xx", "4xx"…; "falha" when there was no HTTP status. */
export const statusClass = (status: number): StatusClass =>
	status >= 100 && status < 600 ? (`${Math.floor(status / 100)}xx` as StatusClass) : 'falha'

export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'] as const
export type HttpMethod = (typeof HTTP_METHODS)[number]
export type BodyType = 'none' | 'json' | 'text' | 'form'
export type KeyValue = { key: string; value: string }

/** Headers the browser sets itself and silently drops from fetch() (Fetch spec "forbidden"). */
const FORBIDDEN_HEADERS = new Set([
	'accept-charset',
	'accept-encoding',
	'access-control-request-headers',
	'access-control-request-method',
	'connection',
	'content-length',
	'cookie',
	'cookie2',
	'date',
	'dnt',
	'expect',
	'host',
	'keep-alive',
	'origin',
	'referer',
	'te',
	'trailer',
	'transfer-encoding',
	'upgrade',
	'via',
])

export type BuiltRequest = {
	url: string
	method: HttpMethod
	headers: [string, string][]
	body: string | undefined
	/** Headers the browser will ignore, to warn about. */
	ignoredHeaders: string[]
}

type Header = [name: string, value: string]

/** Adds https:// when the scheme is missing and checks that the result is an http(s) URL. */
function parseRequestUrl(url: string): URL {
	let target = url.trim()
	if (!target) throw new Error('Informe a URL da API.')
	if (!/^[a-z][a-z\d+.-]*:\/\//i.test(target)) target = `https://${target}`
	let parsed: URL
	try {
		parsed = new URL(target)
	} catch {
		throw new Error('URL inválida. Use o endereço completo, como https://api.exemplo.com/usuarios.')
	}
	if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
		throw new Error('Use uma URL http:// ou https://.')
	}
	return parsed
}

function isForbiddenHeader(name: string): boolean {
	const lowercase = name.toLowerCase()
	return (
		FORBIDDEN_HEADERS.has(lowercase) ||
		lowercase.startsWith('sec-') ||
		lowercase.startsWith('proxy-')
	)
}

/** Drops empty rows and separates the headers fetch() will send from the ones it ignores. */
function splitHeaders(rows: readonly KeyValue[]) {
	const sent: Header[] = []
	const ignored: string[] = []
	for (const { key, value } of rows) {
		const name = key.trim()
		if (!name) continue
		if (!/^[!#$%&'*+.^_`|~\w-]+$/.test(name)) {
			throw new Error(`Nome de cabeçalho inválido: "${name}". Use só letras, números e hífens.`)
		}
		if (isForbiddenHeader(name)) ignored.push(name)
		else sent.push([name, value])
	}
	return { sent, ignored }
}

/** One `key=value` pair per line, URL-encoded. */
function encodeFormBody(body: string): string {
	const params = new URLSearchParams()
	for (const line of body.split('\n')) {
		if (!line.trim()) continue
		const equalsIndex = line.indexOf('=')
		if (equalsIndex < 0) params.append(line.trim(), '')
		else params.append(line.slice(0, equalsIndex).trim(), line.slice(equalsIndex + 1).trim())
	}
	return params.toString()
}

/** The body to send and its default Content-Type. */
function encodeBody(bodyType: Exclude<BodyType, 'none'>, body: string) {
	switch (bodyType) {
		case 'json':
			try {
				JSON.parse(body)
			} catch (error) {
				throw new Error(`O corpo não é um JSON válido: ${(error as Error).message}`)
			}
			return { payload: body, contentType: 'application/json' }
		case 'form':
			return { payload: encodeFormBody(body), contentType: 'application/x-www-form-urlencoded' }
		case 'text':
			return { payload: body, contentType: 'text/plain;charset=UTF-8' }
	}
}

/** Validates the form of the REST tester and builds what fetch() needs. Throws with a fix hint. */
export function buildRequest({
	method,
	url,
	headers,
	bodyType,
	body,
}: {
	method: HttpMethod
	url: string
	headers: readonly KeyValue[]
	bodyType: BodyType
	body: string
}): BuiltRequest {
	const parsedUrl = parseRequestUrl(url)
	const { sent, ignored } = splitHeaders(headers)

	const hasBody = bodyType !== 'none' && body.trim() !== ''
	if (!hasBody)
		return { url: parsedUrl.href, method, headers: sent, body: undefined, ignoredHeaders: ignored }

	if (method === 'GET' || method === 'HEAD') {
		throw new Error(
			`${method} não aceita corpo. Escolha POST, PUT ou PATCH, ou deixe o corpo vazio.`,
		)
	}
	const { payload, contentType } = encodeBody(bodyType, body)
	const hasContentType = sent.some(([name]) => name.toLowerCase() === 'content-type')
	if (!hasContentType) sent.push(['Content-Type', contentType])
	return { url: parsedUrl.href, method, headers: sent, body: payload, ignoredHeaders: ignored }
}

/** The same request as a curl command (POSIX shell quoting). */
export function toCurl(request: Pick<BuiltRequest, 'url' | 'method' | 'headers' | 'body'>): string {
	const quote = (text: string) => escapeString(text, 'shell')
	const lines = [`curl -X ${request.method} ${quote(request.url)}`]
	for (const [name, value] of request.headers) lines.push(`  -H ${quote(`${name}: ${value}`)}`)
	if (request.body !== undefined) lines.push(`  --data-raw ${quote(request.body)}`)
	return lines.join(' \\\n')
}

/**
 * Splits a shell command into words the way bash does for what curl commands use: single quotes,
 * double quotes (with \" \\ \$ \` escapes), ANSI-C $'…' quotes (Chrome's "Copy as cURL (bash)"),
 * backslash escapes and `\` line continuations. Cmd's `^` continuations are joined too.
 */
function shellWords(command: string): string[] {
	const text = command.replace(/\\\r?\n/g, ' ').replace(/\^\r?\n/g, ' ')
	const words: string[] = []
	let word = ''
	let inWord = false
	let i = 0
	const ANSI: Record<string, string> = { n: '\n', t: '\t', r: '\r', '0': '\0', e: '\x1b' }
	while (i < text.length) {
		const char = text[i] as string
		if (/\s/.test(char)) {
			if (inWord) words.push(word)
			word = ''
			inWord = false
			i++
		} else if (char === "'") {
			const end = text.indexOf("'", i + 1)
			if (end < 0) throw new Error('Aspas simples sem fechamento no comando curl.')
			word += text.slice(i + 1, end)
			inWord = true
			i = end + 1
		} else if (char === '$' && text[i + 1] === "'") {
			i += 2
			while (i < text.length && text[i] !== "'") {
				if (text[i] === '\\' && i + 1 < text.length) {
					const next = text[i + 1] as string
					if (next === 'x' || next === 'u') {
						const size = next === 'x' ? 2 : 4
						const hex = text.slice(i + 2, i + 2 + size)
						word += String.fromCodePoint(Number.parseInt(hex, 16))
						i += 2 + size
					} else {
						word += ANSI[next] ?? next
						i += 2
					}
				} else word += text[i++]
			}
			if (i >= text.length) throw new Error("Aspas $'…' sem fechamento no comando curl.")
			inWord = true
			i++
		} else if (char === '"') {
			i++
			while (i < text.length && text[i] !== '"') {
				if (text[i] === '\\' && /["\\$`]/.test(text[i + 1] ?? '')) i++
				word += text[i++]
			}
			if (i >= text.length) throw new Error('Aspas duplas sem fechamento no comando curl.')
			inWord = true
			i++
		} else if (char === '\\' && i + 1 < text.length) {
			word += text[i + 1]
			inWord = true
			i += 2
		} else {
			word += char
			inWord = true
			i++
		}
	}
	if (inWord) words.push(word)
	return words
}

/** curl options that take a value but don't change the request the tester sends. */
const CURL_IGNORED_WITH_VALUE = new Set([
	'-o',
	'--output',
	'-m',
	'--max-time',
	'--connect-timeout',
	'-w',
	'--write-out',
	'--retry',
	'-x',
	'--proxy',
	'--cacert',
	'--capath',
	'-E',
	'--cert',
	'--key',
	'--resolve',
	'--limit-rate',
	'-c',
	'--cookie-jar',
	'--max-redirs',
	'-r',
	'--range',
	'--interface',
	'-T',
	'--upload-file',
])
const CURL_DATA = new Set(['-d', '--data', '--data-raw', '--data-binary', '--data-ascii'])

export type ParsedCurl = {
	method: HttpMethod
	url: string
	headers: KeyValue[]
	bodyType: BodyType
	body: string
}

const isCurlCommand = (text: string) => /^\s*curl(?:\.exe)?\s/i.test(text)

/**
 * Reads a curl command (as copied from DevTools, Postman or docs) into the tester's fields:
 * method, URL, headers and body. Returns null when the text is not a curl command; throws with a
 * Portuguese message when it is one but can't be read.
 */
export function parseCurl(command: string): ParsedCurl | null {
	if (!isCurlCommand(command)) return null
	const words = shellWords(command.trim()).slice(1)
	let method: string | undefined
	let url: string | undefined
	let json = false
	let toQuery = false
	const headers: KeyValue[] = []
	const data: string[] = []
	const addHeader = (line: string) => {
		const colon = line.indexOf(':')
		if (colon <= 0) return
		const key = line.slice(0, colon).trim()
		// "Name;" sends an empty header, "Name:" removes one; both are rare, keep the name with no value.
		headers.push({ key, value: line.slice(colon + 1).trim() })
	}

	for (let i = 0; i < words.length; i++) {
		const word = words[i] as string
		const value = () => {
			const next = words[++i]
			if (next === undefined) throw new Error(`A opção ${word} do curl está sem valor.`)
			return next
		}
		// --name=value
		const longWithValue = /^(--[a-z-]+)=(.*)$/s.exec(word)
		const [flag, inline] = longWithValue
			? [longWithValue[1] as string, longWithValue[2]]
			: [word, undefined]
		const take = () => inline ?? value()

		if (flag === '-X' || flag === '--request') method = take()
		else if (/^-X./.test(flag)) method = flag.slice(2)
		else if (flag === '-H' || flag === '--header') addHeader(take())
		else if (/^-H./.test(flag)) addHeader(flag.slice(2))
		else if (CURL_DATA.has(flag)) data.push(take())
		else if (flag === '--data-urlencode') {
			const raw = take()
			const equals = raw.indexOf('=')
			data.push(
				equals < 0
					? encodeURIComponent(raw)
					: `${raw.slice(0, equals)}=${encodeURIComponent(raw.slice(equals + 1))}`,
			)
		} else if (flag === '--json') {
			data.push(take())
			json = true
		} else if (flag === '-u' || flag === '--user') {
			headers.push({ key: 'Authorization', value: `Basic ${btoa(take())}` })
		} else if (flag === '-A' || flag === '--user-agent')
			headers.push({ key: 'User-Agent', value: take() })
		else if (flag === '-e' || flag === '--referer') headers.push({ key: 'Referer', value: take() })
		else if (flag === '-b' || flag === '--cookie') headers.push({ key: 'Cookie', value: take() })
		else if (flag === '--url') url = take()
		else if (flag === '-G' || flag === '--get') toQuery = true
		else if (flag === '-I' || flag === '--head') method = 'HEAD'
		else if (CURL_IGNORED_WITH_VALUE.has(flag)) take()
		else if (flag.startsWith('-')) {
			// Switches with no value (--compressed, -sSL, -k, -v…) don't change the request.
		} else if (url === undefined) url = word
	}

	if (!url) throw new Error('O comando curl não tem URL.')
	if (!/^[a-z][a-z\d+.-]*:\/\//i.test(url)) url = `https://${url}`

	if (json) {
		const has = (name: string) => headers.some((h) => h.key.toLowerCase() === name)
		if (!has('content-type')) headers.push({ key: 'Content-Type', value: 'application/json' })
		if (!has('accept')) headers.push({ key: 'Accept', value: 'application/json' })
	}

	let body = data.join('&')
	if (toQuery && body) {
		url += (url.includes('?') ? '&' : '?') + body
		body = ''
	}
	const upper = (method ?? (body ? 'POST' : 'GET')).toUpperCase()
	if (!(HTTP_METHODS as readonly string[]).includes(upper)) {
		throw new Error(`O método ${upper} do curl não é aceito aqui. Use ${HTTP_METHODS.join(', ')}.`)
	}

	const contentType = headers.find((h) => h.key.toLowerCase() === 'content-type')?.value ?? ''
	let bodyType: BodyType = 'none'
	if (body) {
		const looksJson = (() => {
			try {
				JSON.parse(body)
				return true
			} catch {
				return false
			}
		})()
		if (json || contentType.includes('json') || (looksJson && !contentType)) {
			bodyType = 'json'
			if (looksJson) body = JSON.stringify(JSON.parse(body), null, 2)
		} else if (
			contentType.includes('x-www-form-urlencoded') ||
			(!contentType && /^[^\s=&]+=[^&]*(?:&[^\s=&]+=[^&]*)*$/.test(body))
		) {
			// The tester takes form fields one per line, decoded.
			bodyType = 'form'
			body = [...new URLSearchParams(body)].map(([key, value]) => `${key}=${value}`).join('\n')
		} else bodyType = 'text'
	}
	return { method: upper as HttpMethod, url, headers, bodyType, body }
}

export type JsonToken = {
	text: string
	kind: 'key' | 'string' | 'number' | 'literal' | 'punctuation' | 'space'
}

/** Splits JSON text (already valid, usually pretty-printed) into coloured tokens. */
export function jsonTokens(json: string): JsonToken[] {
	const tokens: JsonToken[] = []
	const pattern =
		/("(?:\\.|[^"\\])*")(\s*:)?|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|(true|false|null)|([{}[\],:])|(\s+)/g
	let last = 0
	for (const match of json.matchAll(pattern)) {
		const index = match.index ?? 0
		if (index > last) tokens.push({ text: json.slice(last, index), kind: 'punctuation' })
		if (match[1] !== undefined) {
			tokens.push({ text: match[1], kind: match[2] ? 'key' : 'string' })
			if (match[2]) tokens.push({ text: match[2], kind: 'punctuation' })
		} else if (match[3] !== undefined) tokens.push({ text: match[3], kind: 'number' })
		else if (match[4] !== undefined) tokens.push({ text: match[4], kind: 'literal' })
		else if (match[5] !== undefined) tokens.push({ text: match[5], kind: 'punctuation' })
		else tokens.push({ text: match[0], kind: 'space' })
		last = index + match[0].length
	}
	if (last < json.length) tokens.push({ text: json.slice(last), kind: 'punctuation' })
	return tokens
}

/** Pretty-prints JSON bodies (by content type or shape); anything else is returned as is. */
export function prettyBody(text: string, contentType: string): { text: string; json: boolean } {
	const trimmed = text.trim()
	if (contentType.includes('json') || /^[[{]/.test(trimmed)) {
		try {
			return { text: JSON.stringify(JSON.parse(trimmed), null, 2), json: true }
		} catch {}
	}
	return { text, json: false }
}

/**
 * Explains a failed fetch. The browser hides the reason of a TypeError on purpose; the usual
 * causes are CORS, mixed content (https page → http API), DNS or the server being down.
 */
export function explainFetchError(error: unknown, url: string, pageProtocol: string): string {
	const name = (error as { name?: string } | null)?.name
	if (name === 'AbortError' || name === 'TimeoutError')
		return 'A requisição demorou demais e foi cancelada. Verifique se a API está no ar.'
	if (name === 'TypeError') {
		if (pageProtocol === 'https:' && url.startsWith('http:'))
			return 'Esta página usa https e a API usa http: o navegador bloqueia (conteúdo misto). Use a versão https da API.'
		return 'O navegador não conseguiu ler a resposta. O motivo mais comum é CORS: a API não permite chamadas vindas de outros sites (falta o cabeçalho Access-Control-Allow-Origin). Também pode ser endereço errado, API fora do ar ou certificado inválido. Para APIs sem CORS, use curl ou Postman.'
	}
	return (error as Error)?.message || 'Erro desconhecido ao enviar a requisição.'
}

/* ================================ JSON generator ================================ */

export type GeneratorContext = { index: number }
export type Generator = (args: number[], context: GeneratorContext) => unknown
export type Generators = Record<string, Generator>

export type PlaceholderDoc = { syntax: string; description: string; example: string }

const padTwoDigits = (value: number) => String(value).padStart(2, '0')
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const randomBetween = (min: number, max: number) => min + randomInt(max - min + 1)
/** A random number in [0, 1) from the crypto-backed randomInt. */
const randomFraction = (precision: number) => randomInt(precision) / precision

/** Between 2000-01-01 and 2030-12-31, UTC. */
function randomDate(): Date {
	const start = Date.UTC(2000, 0, 1)
	const end = Date.UTC(2030, 11, 31)
	return new Date(start + Math.floor(randomFraction(1_000_000) * (end - start)))
}

function randomUuidV4(): string {
	const bytes = new Uint8Array(16)
	crypto.getRandomValues(bytes)
	// RFC 9562: version 4 in the high nibble of byte 6, variant 10xx in byte 8.
	bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x40
	bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80
	const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('')
	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

/** Reads `(min, max)` integer arguments, falling back to `defaults`. */
function integerRangeArgs(
	name: string,
	args: number[],
	defaults: [number, number],
): [number, number] {
	const min = args[0] ?? defaults[0]
	const max = args[1] ?? defaults[1]
	if (!Number.isInteger(min) || !Number.isInteger(max))
		throw new Error(`{{${name}}} aceita só números inteiros.`)
	if (min > max) throw new Error(`Em {{${name}(${min}, ${max})}} o mínimo é maior que o máximo.`)
	return [min, max]
}

/** Generators that don't need faker (numbers, dates, IDs, documents, lorem). */
export const BASE_GENERATORS: Generators = {
	inteiro: (args) => {
		const [min, max] = integerRangeArgs('inteiro', args, [0, 1000])
		return randomBetween(min, max)
	},
	decimal: (args) => {
		const min = args[0] ?? 0
		const max = args[1] ?? 1000
		const decimalPlaces = clamp(Math.trunc(args[2] ?? 2), 0, 10)
		if (min > max) throw new Error(`Em {{decimal(${min}, ${max})}} o mínimo é maior que o máximo.`)
		const value = min + randomFraction(1_000_000_000) * (max - min)
		return Number(value.toFixed(decimalPlaces))
	},
	booleano: () => randomInt(2) === 1,
	uuid: () => randomUuidV4(),
	cpf: () => generateCPF(),
	cnpj: () => generateCNPJ(),
	data: () => {
		const date = randomDate()
		return `${date.getUTCFullYear()}-${padTwoDigits(date.getUTCMonth() + 1)}-${padTwoDigits(date.getUTCDate())}`
	},
	dataHora: () => randomDate().toISOString(),
	lorem: (args) => {
		const wordCount = clamp(Math.trunc(args[0] ?? 5), 1, 500)
		return generateLorem(wordCount, 'words', false)
	},
	indice: (_, context) => context.index,
	cor: () => `#${randomInt(0x1000000).toString(16).padStart(6, '0')}`,
}

/** Generators backed by faker (pt_BR). The tool imports faker on demand and passes it here. */
export function fakerGenerators(faker: Faker): Generators {
	return {
		nome: () => faker.person.fullName(),
		primeiroNome: () => faker.person.firstName(),
		sobrenome: () => faker.person.lastName(),
		email: () => faker.internet.email().toLowerCase(),
		usuario: () => faker.internet.username(),
		senha: () => faker.internet.password({ length: 12 }),
		telefone: () =>
			`(${randomBetween(11, 99)}) 9${faker.string.numeric(4)}-${faker.string.numeric(4)}`,
		cep: () => faker.location.zipCode('#####-###'),
		rua: () => faker.location.street(),
		numero: () => randomBetween(1, 3000),
		cidade: () => faker.location.city(),
		estado: () => faker.location.state(),
		uf: () => faker.location.state({ abbreviated: true }),
		empresa: () => faker.company.name(),
		cargo: () => faker.person.jobTitle(),
		produto: () => faker.commerce.productName(),
		preco: () => Number(faker.commerce.price({ min: 1, max: 1000 })),
		url: () => faker.internet.url(),
		ip: () => faker.internet.ipv4(),
		avatar: () => faker.image.avatar(),
	}
}

export const PLACEHOLDERS: readonly PlaceholderDoc[] = [
	{ syntax: '{{nome}}', description: 'Nome completo', example: 'Ana Souza' },
	{ syntax: '{{primeiroNome}}', description: 'Primeiro nome', example: 'Ana' },
	{ syntax: '{{sobrenome}}', description: 'Sobrenome', example: 'Souza' },
	{ syntax: '{{email}}', description: 'E-mail', example: 'ana.souza@gmail.com' },
	{ syntax: '{{usuario}}', description: 'Nome de usuário', example: 'ana_souza12' },
	{ syntax: '{{senha}}', description: 'Senha de 12 caracteres', example: 'k3P9xQ2mZ8aB' },
	{ syntax: '{{telefone}}', description: 'Celular com DDD', example: '(11) 91234-5678' },
	{ syntax: '{{cpf}}', description: 'CPF válido, com pontuação', example: '529.982.247-25' },
	{ syntax: '{{cnpj}}', description: 'CNPJ válido, com pontuação', example: '11.222.333/0001-81' },
	{ syntax: '{{cep}}', description: 'CEP', example: '01310-100' },
	{ syntax: '{{rua}}', description: 'Logradouro', example: 'Rua das Flores' },
	{ syntax: '{{numero}}', description: 'Número de endereço', example: '1234' },
	{ syntax: '{{cidade}}', description: 'Cidade', example: 'Campinas' },
	{ syntax: '{{estado}} / {{uf}}', description: 'Estado ou sigla', example: 'São Paulo / SP' },
	{ syntax: '{{empresa}}', description: 'Nome de empresa', example: 'Silva e Filhos' },
	{ syntax: '{{cargo}}', description: 'Cargo', example: 'Analista' },
	{ syntax: '{{produto}}', description: 'Nome de produto', example: 'Cadeira de madeira' },
	{ syntax: '{{preco}}', description: 'Preço (número)', example: '199.9' },
	{
		syntax: '{{url}} / {{ip}}',
		description: 'URL e endereço IPv4',
		example: 'https://exemplo.com',
	},
	{ syntax: '{{avatar}}', description: 'URL de imagem de avatar', example: 'https://…/avatar.jpg' },
	{ syntax: '{{uuid}}', description: 'UUID v4', example: '3f2b…-4c1d-…' },
	{ syntax: '{{inteiro(1, 100)}}', description: 'Inteiro entre mínimo e máximo', example: '42' },
	{ syntax: '{{decimal(0, 10, 2)}}', description: 'Decimal com N casas', example: '7.35' },
	{ syntax: '{{booleano}}', description: 'true ou false', example: 'true' },
	{ syntax: '{{data}}', description: 'Data (AAAA-MM-DD)', example: '2024-05-17' },
	{
		syntax: '{{dataHora}}',
		description: 'Data e hora ISO 8601 (UTC)',
		example: '2024-05-17T13:45:00.000Z',
	},
	{ syntax: '{{lorem(5)}}', description: 'N palavras de lorem ipsum', example: 'dolor sit amet…' },
	{ syntax: '{{cor}}', description: 'Cor HEX', example: '#3fa2c8' },
	{ syntax: '{{indice}}', description: 'Posição do item, a partir de 1', example: '1' },
	{
		syntax: '["{{repetir(3)}}", { … }]',
		description: 'Lista com 3 cópias do modelo (ou repetir(2, 5) para uma quantidade sorteada)',
		example: '[{…}, {…}, {…}]',
	},
]

const PLACEHOLDER = /\{\{\s*([a-zA-Z]+)\s*(?:\(([^)]*)\))?\s*\}\}/g
const WHOLE_STRING_PLACEHOLDER = /^\{\{\s*([a-zA-Z]+)\s*(?:\(([^)]*)\))?\s*\}\}$/
const REPEAT_PLACEHOLDER = /^\{\{\s*repetir\s*\(([^)]*)\)\s*\}\}$/

/** Upper bound on generated values, so a typo like repetir(100000) can't freeze the tab. */
export const MAX_GENERATED_VALUES = 200_000

const MAX_REPEAT = 1000

/** How many more values may be generated; shared by every item of one run. */
type Budget = { left: number }

function parseArgs(name: string, argsText: string | undefined): number[] {
	if (argsText === undefined || !argsText.trim()) return []
	return argsText.split(',').map((part) => {
		const value = Number(part.trim())
		if (part.trim() === '' || !Number.isFinite(value)) {
			throw new Error(
				`Argumento inválido em {{${name}(${argsText})}}. Use números separados por vírgula.`,
			)
		}
		return value
	})
}

/** `repetir(n)` is exactly n; `repetir(min, max)` is a random count in that range. */
function repeatCount(argsText: string | undefined): number {
	const args = parseArgs('repetir', argsText)
	const exactCount = args[0] ?? 1
	const [min, max] = integerRangeArgs('repetir', args, [exactCount, exactCount])
	const count = args.length >= 2 ? randomBetween(min, max) : min
	if (count < 0 || count > MAX_REPEAT) throw new Error('repetir aceita de 0 a 1.000 itens.')
	return count
}

/**
 * Fills a template: strings that are exactly one placeholder become the typed value (number,
 * boolean), placeholders inside longer strings are interpolated, and `["{{repetir(n)}}", item]`
 * becomes a list of n items. Throws on unknown placeholders.
 */
export function renderTemplate(
	template: unknown,
	generators: Generators,
	index = 1,
	budget: Budget = { left: MAX_GENERATED_VALUES },
): unknown {
	const runGenerator = (name: string, argsText: string | undefined, context: GeneratorContext) => {
		if (name === 'repetir') {
			throw new Error(
				'Use {{repetir(n)}} como primeiro item de uma lista: ["{{repetir(3)}}", { … }].',
			)
		}
		const generator = generators[name]
		if (!generator) {
			throw new Error(`Marcador desconhecido: {{${name}}}. Veja a lista de marcadores disponíveis.`)
		}
		budget.left -= 1
		if (budget.left < 0) {
			throw new Error('Resultado grande demais. Diminua a quantidade ou os valores de repetir.')
		}
		return generator(parseArgs(name, argsText), context)
	}

	const fillString = (text: string, context: GeneratorContext): unknown => {
		const whole = WHOLE_STRING_PLACEHOLDER.exec(text)
		if (whole) return runGenerator(whole[1] ?? '', whole[2], context)
		return text.replace(PLACEHOLDER, (_, name: string, argsText: string | undefined) =>
			String(runGenerator(name, argsText, context)),
		)
	}

	const fillArray = (items: unknown[], context: GeneratorContext): unknown[] => {
		const [first, itemTemplate] = items
		const repeat = typeof first === 'string' ? REPEAT_PLACEHOLDER.exec(first) : null
		if (!repeat) return items.map((item) => fill(item, context))
		if (items.length !== 2) {
			throw new Error(
				'Depois de {{repetir(n)}} coloque um único modelo: ["{{repetir(3)}}", { … }].',
			)
		}
		return Array.from({ length: repeatCount(repeat[1]) }, (_, position) =>
			fill(itemTemplate, { index: position + 1 }),
		)
	}

	const fill = (node: unknown, context: GeneratorContext): unknown => {
		if (typeof node === 'string') return fillString(node, context)
		if (Array.isArray(node)) return fillArray(node, context)
		if (node && typeof node === 'object') {
			return Object.fromEntries(
				Object.entries(node).map(([key, value]) => [key, fill(value, context)]),
			)
		}
		return node
	}

	return fill(template, { index })
}

/** `amount` filled copies of a JSON template: one object when amount is 1, else an array. */
export function generateJson(templateText: string, amount: number, generators: Generators): string {
	let template: unknown
	try {
		template = JSON.parse(templateText)
	} catch (error) {
		throw new Error(`O modelo não é um JSON válido: ${(error as Error).message}`)
	}
	const budget: Budget = { left: MAX_GENERATED_VALUES }
	const items = Array.from({ length: amount }, (_, position) =>
		renderTemplate(template, generators, position + 1, budget),
	)
	return JSON.stringify(amount === 1 ? items[0] : items, null, 2)
}

/** Placeholders offered by the field builder: no arguments to fill in, output type unchanged. */
export const FIELD_TYPES = [
	{ value: 'nome', label: 'Nome completo' },
	{ value: 'primeiroNome', label: 'Primeiro nome' },
	{ value: 'email', label: 'E-mail' },
	{ value: 'telefone', label: 'Telefone' },
	{ value: 'cpf', label: 'CPF' },
	{ value: 'cnpj', label: 'CNPJ' },
	{ value: 'cep', label: 'CEP' },
	{ value: 'rua', label: 'Rua' },
	{ value: 'cidade', label: 'Cidade' },
	{ value: 'uf', label: 'UF' },
	{ value: 'empresa', label: 'Empresa' },
	{ value: 'cargo', label: 'Cargo' },
	{ value: 'produto', label: 'Produto' },
	{ value: 'preco', label: 'Preço' },
	{ value: 'uuid', label: 'UUID' },
	{ value: 'inteiro(1, 100)', label: 'Inteiro (1 a 100)' },
	{ value: 'decimal(0, 1000, 2)', label: 'Decimal' },
	{ value: 'booleano', label: 'Booleano' },
	{ value: 'data', label: 'Data' },
	{ value: 'dataHora', label: 'Data e hora' },
	{ value: 'lorem(8)', label: 'Texto (lorem)' },
	{ value: 'url', label: 'URL' },
	{ value: 'indice', label: 'Índice' },
] as const

export type FieldType = (typeof FIELD_TYPES)[number]['value']

/** Builds the JSON template of the field builder: { name: "{{type}}" }. Throws on empty/duplicate names. */
export function templateFromFields(fields: readonly { name: string; type: string }[]): string {
	const template: Record<string, string> = {}
	for (const field of fields) {
		const name = field.name.trim()
		if (!name) throw new Error('Dê um nome a todos os campos.')
		if (name in template)
			throw new Error(`O campo "${name}" aparece duas vezes. Use nomes diferentes.`)
		template[name] = `{{${field.type}}}`
	}
	if (!Object.keys(template).length) throw new Error('Adicione pelo menos um campo.')
	return JSON.stringify(template, null, 2)
}
