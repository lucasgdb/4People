// Pure helpers for the "Desenvolvimento" tools: HTML entities, string escaping, SVG, the REST
// tester and the fake JSON generator. No DOM APIs here, so everything runs under node:test.
import type { Faker } from '@faker-js/faker'
import { generateCNPJ, generateCPF } from './documents.ts'
import { generateLorem } from './lorem.ts'
import { randomInt } from './random.ts'

/* =================================== HTML entities =================================== */

/** HTML 4 named entities (the set every browser and parser knows), name → code point. */
const LATIN1 =
	'nbsp iexcl cent pound curren yen brvbar sect uml copy ordf laquo not shy reg macr deg plusmn sup2 sup3 acute micro para middot cedil sup1 ordm raquo frac14 frac12 frac34 iquest Agrave Aacute Acirc Atilde Auml Aring AElig Ccedil Egrave Eacute Ecirc Euml Igrave Iacute Icirc Iuml ETH Ntilde Ograve Oacute Ocirc Otilde Ouml times Oslash Ugrave Uacute Ucirc Uuml Yacute THORN szlig agrave aacute acirc atilde auml aring aelig ccedil egrave eacute ecirc euml igrave iacute icirc iuml eth ntilde ograve oacute ocirc otilde ouml divide oslash ugrave uacute ucirc uuml yacute thorn yuml'.split(
		' ',
	)
const GREEK_UPPER =
	'Alpha Beta Gamma Delta Epsilon Zeta Eta Theta Iota Kappa Lambda Mu Nu Xi Omicron Pi Rho _ Sigma Tau Upsilon Phi Chi Psi Omega'.split(
		' ',
	)
const GREEK_LOWER =
	'alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigmaf sigma tau upsilon phi chi psi omega'.split(
		' ',
	)
const OTHER_ENTITIES =
	'quot:34 amp:38 apos:39 lt:60 gt:62 OElig:338 oelig:339 Scaron:352 scaron:353 Yuml:376 fnof:402 circ:710 tilde:732 thetasym:977 upsih:978 piv:982 ensp:8194 emsp:8195 thinsp:8201 zwnj:8204 zwj:8205 lrm:8206 rlm:8207 ndash:8211 mdash:8212 lsquo:8216 rsquo:8217 sbquo:8218 ldquo:8220 rdquo:8221 bdquo:8222 dagger:8224 Dagger:8225 bull:8226 hellip:8230 permil:8240 prime:8242 Prime:8243 lsaquo:8249 rsaquo:8250 oline:8254 frasl:8260 euro:8364 image:8465 weierp:8472 real:8476 trade:8482 alefsym:8501 larr:8592 uarr:8593 rarr:8594 darr:8595 harr:8596 crarr:8629 lArr:8656 uArr:8657 rArr:8658 dArr:8659 hArr:8660 forall:8704 part:8706 exist:8707 empty:8709 nabla:8711 isin:8712 notin:8713 ni:8715 prod:8719 sum:8721 minus:8722 lowast:8727 radic:8730 prop:8733 infin:8734 ang:8736 and:8743 or:8744 cap:8745 cup:8746 int:8747 there4:8756 sim:8764 cong:8773 asymp:8776 ne:8800 equiv:8801 le:8804 ge:8805 sub:8834 sup:8835 nsub:8836 sube:8838 supe:8839 oplus:8853 otimes:8855 perp:8869 sdot:8901 lceil:8968 rceil:8969 lfloor:8970 rfloor:8971 lang:9001 rang:9002 loz:9674 spades:9824 clubs:9827 hearts:9829 diams:9830'.split(
		' ',
	)

export const HTML_ENTITIES: ReadonlyMap<string, number> = new Map<string, number>([
	...LATIN1.map((name, i) => [name, 160 + i] as [string, number]),
	...GREEK_UPPER.filter((name) => name !== '_').map(
		(name) => [name, 913 + GREEK_UPPER.indexOf(name)] as [string, number],
	),
	...GREEK_LOWER.map((name, i) => [name, 945 + i] as [string, number]),
	...OTHER_ENTITIES.map((pair) => {
		const [name = '', code = '0'] = pair.split(':')
		return [name, Number(code)] as [string, number]
	}),
])

/** code point → entity name, for encoding. `'` uses `&#39;`: `&apos;` is not HTML 4. */
const ENTITY_BY_CODE = new Map<number, string>(
	[...HTML_ENTITIES].filter(([name]) => name !== 'apos').map(([name, code]) => [code, name]),
)

export type HtmlEntityFormat = 'named' | 'decimal' | 'hex'
/** `special`: only & < > " '. `nonAscii`: those plus every character outside printable ASCII. */
export type HtmlEncodeScope = 'special' | 'nonAscii'

const HTML_SPECIAL = new Set([38, 60, 62, 34, 39])

function entityFor(code: number, format: HtmlEntityFormat): string {
	if (format === 'named') {
		const name = ENTITY_BY_CODE.get(code)
		if (name) return `&${name};`
		return `&#${code};`
	}
	return format === 'hex' ? `&#x${code.toString(16).toUpperCase()};` : `&#${code};`
}

/** Encodes text as HTML entities. Named entities fall back to decimal when a character has none. */
export function encodeHtmlEntities(
	text: string,
	{
		format = 'named',
		scope = 'special',
	}: { format?: HtmlEntityFormat; scope?: HtmlEncodeScope } = {},
): string {
	let out = ''
	for (const char of text) {
		const code = char.codePointAt(0) ?? 0
		const isControl = code < 32 && code !== 9 && code !== 10 && code !== 13
		const encode = HTML_SPECIAL.has(code) || (scope === 'nonAscii' && (code > 126 || isControl))
		out += encode ? entityFor(code, format) : char
	}
	return out
}

const validCodePoint = (code: number) =>
	Number.isInteger(code) && code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff)

/** Decodes named (HTML 4 set), decimal and hex entities. Unknown or invalid ones are kept as typed. */
export function decodeHtmlEntities(text: string): string {
	return text.replace(
		/&(#[xX][0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g,
		(entity, body: string) => {
			if (body.startsWith('#')) {
				const code =
					body[1] === 'x' || body[1] === 'X'
						? Number.parseInt(body.slice(2), 16)
						: Number.parseInt(body.slice(1), 10)
				return validCodePoint(code) ? String.fromCodePoint(code) : entity
			}
			const code = HTML_ENTITIES.get(body)
			return code === undefined ? entity : String.fromCodePoint(code)
		},
	)
}

/* =================================== string escaping =================================== */

export type EscapeLanguage = 'js' | 'json' | 'java' | 'python' | 'sql' | 'shell' | 'regex'

const hex = (code: number, width: number) => code.toString(16).toUpperCase().padStart(width, '0')

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

const isControl = (code: number) => code < 32 || code === 127

function escapeWith(
	text: string,
	table: Record<string, string>,
	control: (code: number) => string,
): string {
	let out = ''
	for (const char of text) {
		const mapped = table[char]
		if (mapped !== undefined) out += mapped
		else {
			const code = char.codePointAt(0) ?? 0
			out += isControl(code) ? control(code) : char
		}
	}
	return out
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
			return escapeWith(text, JS_ESCAPES, (code) => `\\x${hex(code, 2)}`)
		case 'java':
			return escapeWith(text, JAVA_ESCAPES, (code) => `\\u${hex(code, 4)}`)
		case 'python':
			return escapeWith(text, PYTHON_ESCAPES, (code) => `\\x${hex(code, 2)}`)
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

/** Which simple escapes each C-like language accepts (anything else is handled below). */
const SIMPLE_BY_LANGUAGE: Record<'js' | 'json' | 'java' | 'python', string> = {
	json: 'nrtbf\\"/',
	js: 'nrtbfv\\\'"',
	java: 'nrtbfv\\\'"',
	python: 'nrtbfv\\\'"',
}

function readHex(text: string, start: number, min: number, max: number) {
	let end = start
	while (end < text.length && end - start < max && /[0-9a-fA-F]/.test(text[end] ?? '')) end += 1
	if (end - start < min) return null
	return { code: Number.parseInt(text.slice(start, end), 16), end }
}

function unescapeCLike(text: string, language: 'js' | 'json' | 'java' | 'python'): string {
	const simple = SIMPLE_BY_LANGUAGE[language]
	const strict = language === 'json' || language === 'java'
	let out = ''
	let i = 0
	const fail = (what: string): never => {
		throw new Error(`Escape inválido "${what}" na posição ${i + 1}.`)
	}
	while (i < text.length) {
		const char = text[i] as string
		if (char !== '\\') {
			out += char
			i += 1
			continue
		}
		const next = text[i + 1]
		if (next === undefined) fail('\\')
		const n = next as string
		if (simple.includes(n)) {
			out += SIMPLE_UNESCAPES[n] ?? n
			i += 2
			continue
		}
		if (n === 'u') {
			// \u{1F600} (JavaScript only) or \uXXXX
			if (language === 'js' && text[i + 2] === '{') {
				const close = text.indexOf('}', i + 3)
				const code = Number.parseInt(text.slice(i + 3, close), 16)
				if (close < 0 || !/^[0-9a-fA-F]+$/.test(text.slice(i + 3, close)) || !validCodePoint(code))
					fail(text.slice(i, close < 0 ? i + 3 : close + 1))
				out += String.fromCodePoint(code)
				i = close + 1
				continue
			}
			const read = readHex(text, i + 2, 4, 4)
			if (!read) fail(text.slice(i, i + 6))
			out += String.fromCharCode((read as { code: number }).code)
			i = (read as { end: number }).end
			continue
		}
		if (n === 'x' && language !== 'json') {
			// C# reads 1–4 hex digits after \x; JavaScript and Python exactly 2.
			const read = language === 'java' ? readHex(text, i + 2, 1, 4) : readHex(text, i + 2, 2, 2)
			if (!read) fail(text.slice(i, i + 4))
			out += String.fromCharCode((read as { code: number }).code)
			i = (read as { end: number }).end
			continue
		}
		if (n === 'U' && (language === 'python' || language === 'java')) {
			const read = readHex(text, i + 2, 8, 8)
			if (!read || !validCodePoint(read.code)) fail(text.slice(i, i + 10))
			out += String.fromCodePoint((read as { code: number }).code)
			i = (read as { end: number }).end
			continue
		}
		if (/[0-7]/.test(n) && language === 'python') {
			let end = i + 1
			while (end < text.length && end - (i + 1) < 3 && /[0-7]/.test(text[end] ?? '')) end += 1
			out += String.fromCharCode(Number.parseInt(text.slice(i + 1, end), 8))
			i = end
			continue
		}
		if (n === '0' && !/\d/.test(text[i + 2] ?? '')) {
			// \0 (NUL) in JavaScript and C#
			out += '\0'
			i += 2
			continue
		}
		if (n === '\n' && (language === 'js' || language === 'python')) {
			// Line continuation: the backslash and the line break disappear.
			i += 2
			continue
		}
		if (strict) fail(`\\${n}`)
		// Python keeps unknown escapes as typed; JavaScript drops the backslash.
		out += language === 'python' ? `\\${n}` : n
		i += 2
	}
	return out
}

/** Reads a POSIX shell word: '…' is literal, "…" honours \\ \" \$ \`, and \x outside quotes is x. */
function unescapeShell(text: string): string {
	let out = ''
	let i = 0
	while (i < text.length) {
		const char = text[i] as string
		if (char === "'") {
			const close = text.indexOf("'", i + 1)
			if (close < 0) throw new Error("Aspas simples sem fechamento. Feche com '.")
			out += text.slice(i + 1, close)
			i = close + 1
		} else if (char === '"') {
			i += 1
			let closed = false
			while (i < text.length) {
				const c = text[i] as string
				if (c === '"') {
					closed = true
					i += 1
					break
				}
				if (c === '\\' && /[\\"$`\n]/.test(text[i + 1] ?? '')) {
					if (text[i + 1] !== '\n') out += text[i + 1]
					i += 2
				} else {
					out += c
					i += 1
				}
			}
			if (!closed) throw new Error('Aspas duplas sem fechamento. Feche com ".')
		} else if (char === '\\') {
			const next = text[i + 1]
			if (next === undefined) throw new Error('Barra invertida solta no final.')
			if (next !== '\n') out += next
			i += 2
		} else {
			out += char
			i += 1
		}
	}
	return out
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

function rootSvgTag(svg: string) {
	const match = /<svg\b([^>]*)>/i.exec(svg)
	return match ? { tag: match[0], attrs: match[1] ?? '', index: match.index } : null
}

function readAttributes(attrs: string): Record<string, string> {
	const result: Record<string, string> = {}
	for (const match of attrs.matchAll(/([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
		result[(match[1] ?? '').toLowerCase()] = match[2] ?? match[3] ?? ''
	}
	return result
}

const UNIT_PX: Record<string, number> = {
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
	const factor = UNIT_PX[(match[2] ?? '').toLowerCase()]
	const number = Number(match[1])
	return factor === undefined || !Number.isFinite(number) || number <= 0 ? null : number * factor
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

/** Reads the root <svg> tag. Throws when there is none. */
export function svgInfo(svg: string): SvgInfo {
	const root = rootSvgTag(svg)
	if (!root) throw new Error('Não encontrei a tag <svg>. Cole o código completo do arquivo .svg.')
	const attrs = readAttributes(root.attrs)
	const box = (attrs.viewbox ?? '')
		.trim()
		.split(/[\s,]+/)
		.map(Number)
	const boxW = box.length === 4 && (box[2] ?? 0) > 0 ? (box[2] as number) : null
	const boxH = box.length === 4 && (box[3] ?? 0) > 0 ? (box[3] as number) : null
	let w = svgLengthToPx(attrs.width)
	let h = svgLengthToPx(attrs.height)
	if (w && !h) h = boxW && boxH ? (w * boxH) / boxW : 150
	if (h && !w) w = boxW && boxH ? (h * boxW) / boxH : 300
	return {
		width: attrs.width ?? null,
		height: attrs.height ?? null,
		viewBox: attrs.viewbox ?? null,
		pixelWidth: w ?? boxW ?? 300,
		pixelHeight: h ?? boxH ?? 150,
		bytes: byteLength(svg),
		hasScript: /<script\b/i.test(svg) || /\son[a-z]+\s*=/i.test(svg),
	}
}

/** Sets width/height on the root <svg> (some browsers can't draw a size-less SVG onto a canvas). */
export function withSvgSize(svg: string, width: number, height: number): string {
	const root = rootSvgTag(svg)
	if (!root) return svg
	const attrs = root.attrs
		.replace(/\s(width|height)\s*=\s*(?:"[^"]*"|'[^']*')/gi, '')
		.replace(/\s*\/?$/, '')
	const selfClosing = /\/\s*$/.test(root.attrs)
	const tag = `<svg${attrs} width="${width}" height="${height}"${selfClosing ? '/' : ''}>`
	return svg.slice(0, root.index) + tag + svg.slice(root.index + root.tag.length)
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
	const root = rootSvgTag(svg)
	if (!root || /\sxmlns\s*=/.test(root.attrs)) return svg
	const tag = `<svg xmlns="http://www.w3.org/2000/svg"${root.tag.slice(4)}`
	return svg.slice(0, root.index) + tag + svg.slice(root.index + root.tag.length)
}

/** A data: URL for <img src>: the SVG renders as an image, so its scripts never run. */
export const svgDataUrl = (svg: string) =>
	`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

/* ================================== REST tester ================================== */

/** "1,5 KB", "2,3 MB": binary steps (1024), pt-BR decimals. */
export function formatBytes(bytes: number): string {
	const units = ['B', 'KB', 'MB', 'GB']
	let value = bytes
	let unit = 0
	while (value >= 1024 && unit < units.length - 1) {
		value /= 1024
		unit += 1
	}
	const digits = unit === 0 ? 0 : value < 10 ? 1 : 0
	return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: digits }).format(value)} ${units[unit]}`
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
	let target = url.trim()
	if (!target) throw new Error('Informe a URL da API.')
	if (!/^[a-z][a-z\d+.-]*:\/\//i.test(target)) target = `https://${target}`
	let parsed: URL
	try {
		parsed = new URL(target)
	} catch {
		throw new Error('URL inválida. Use o endereço completo, como https://api.exemplo.com/usuarios.')
	}
	if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:')
		throw new Error('Use uma URL http:// ou https://.')

	const list: [string, string][] = []
	const ignoredHeaders: string[] = []
	for (const { key, value } of headers) {
		const name = key.trim()
		if (!name) continue
		if (!/^[!#$%&'*+.^_`|~\w-]+$/.test(name))
			throw new Error(`Nome de cabeçalho inválido: "${name}". Use só letras, números e hífens.`)
		const lower = name.toLowerCase()
		if (FORBIDDEN_HEADERS.has(lower) || lower.startsWith('sec-') || lower.startsWith('proxy-'))
			ignoredHeaders.push(name)
		else list.push([name, value])
	}
	const hasContentType = list.some(([name]) => name.toLowerCase() === 'content-type')

	let payload: string | undefined
	if (bodyType !== 'none' && body.trim()) {
		if (method === 'GET' || method === 'HEAD')
			throw new Error(
				`${method} não aceita corpo. Escolha POST, PUT ou PATCH, ou deixe o corpo vazio.`,
			)
		if (bodyType === 'json') {
			try {
				JSON.parse(body)
			} catch (error) {
				throw new Error(`O corpo não é um JSON válido: ${(error as Error).message}`)
			}
			payload = body
			if (!hasContentType) list.push(['Content-Type', 'application/json'])
		} else if (bodyType === 'form') {
			const params = new URLSearchParams()
			for (const line of body.split('\n')) {
				if (!line.trim()) continue
				const eq = line.indexOf('=')
				params.append(
					(eq < 0 ? line : line.slice(0, eq)).trim(),
					eq < 0 ? '' : line.slice(eq + 1).trim(),
				)
			}
			payload = params.toString()
			if (!hasContentType) list.push(['Content-Type', 'application/x-www-form-urlencoded'])
		} else {
			payload = body
			if (!hasContentType) list.push(['Content-Type', 'text/plain;charset=UTF-8'])
		}
	}
	return { url: parsed.href, method, headers: list, body: payload, ignoredHeaders }
}

/** The same request as a curl command (POSIX shell quoting). */
export function toCurl(request: Pick<BuiltRequest, 'url' | 'method' | 'headers' | 'body'>): string {
	const q = (text: string) => escapeString(text, 'shell')
	const parts = [`curl -X ${request.method} ${q(request.url)}`]
	for (const [name, value] of request.headers) parts.push(`  -H ${q(`${name}: ${value}`)}`)
	if (request.body !== undefined) parts.push(`  --data-raw ${q(request.body)}`)
	return parts.join(' \\\n')
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

const pad = (n: number) => String(n).padStart(2, '0')
const between = (min: number, max: number) => min + randomInt(max - min + 1)

function randomDate(): Date {
	// Between 2000-01-01 and 2030-12-31, UTC.
	const start = Date.UTC(2000, 0, 1)
	const end = Date.UTC(2030, 11, 31)
	return new Date(start + Math.floor((randomInt(1_000_000) / 1_000_000) * (end - start)))
}

const uuid = () => {
	const bytes = new Uint8Array(16)
	crypto.getRandomValues(bytes)
	bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x40
	bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80
	const h = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
	return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
}

function intArgs(name: string, args: number[], defaults: [number, number]): [number, number] {
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
		const [min, max] = intArgs('inteiro', args, [0, 1000])
		return between(min, max)
	},
	decimal: (args) => {
		const min = args[0] ?? 0
		const max = args[1] ?? 1000
		const places = Math.min(Math.max(Math.trunc(args[2] ?? 2), 0), 10)
		if (min > max) throw new Error(`Em {{decimal(${min}, ${max})}} o mínimo é maior que o máximo.`)
		const value = min + (randomInt(1_000_000_000) / 1_000_000_000) * (max - min)
		return Number(value.toFixed(places))
	},
	booleano: () => randomInt(2) === 1,
	uuid: () => uuid(),
	cpf: () => generateCPF(),
	cnpj: () => generateCNPJ(),
	data: () => {
		const d = randomDate()
		return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`
	},
	dataHora: () => randomDate().toISOString(),
	lorem: (args) => {
		const words = Math.min(Math.max(Math.trunc(args[0] ?? 5), 1), 500)
		return generateLorem(words, 'words', false)
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
		telefone: () => `(${between(11, 99)}) 9${faker.string.numeric(4)}-${faker.string.numeric(4)}`,
		cep: () => faker.location.zipCode('#####-###'),
		rua: () => faker.location.street(),
		numero: () => between(1, 3000),
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
const SINGLE_PLACEHOLDER = /^\{\{\s*([a-zA-Z]+)\s*(?:\(([^)]*)\))?\s*\}\}$/

/** Upper bound on generated values, so a typo like repetir(100000) can't freeze the tab. */
export const MAX_GENERATED_VALUES = 200_000

function parseArgs(name: string, raw: string | undefined): number[] {
	if (raw === undefined || !raw.trim()) return []
	return raw.split(',').map((part) => {
		const value = Number(part.trim())
		if (part.trim() === '' || !Number.isFinite(value))
			throw new Error(
				`Argumento inválido em {{${name}(${raw})}}. Use números separados por vírgula.`,
			)
		return value
	})
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
	budget = { left: MAX_GENERATED_VALUES },
): unknown {
	const call = (name: string, rawArgs: string | undefined, context: GeneratorContext) => {
		if (name === 'repetir')
			throw new Error(
				'Use {{repetir(n)}} como primeiro item de uma lista: ["{{repetir(3)}}", { … }].',
			)
		const generator = generators[name]
		if (!generator)
			throw new Error(`Marcador desconhecido: {{${name}}}. Veja a lista de marcadores disponíveis.`)
		budget.left -= 1
		if (budget.left < 0)
			throw new Error('Resultado grande demais. Diminua a quantidade ou os valores de repetir.')
		return generator(parseArgs(name, rawArgs), context)
	}
	const walk = (node: unknown, context: GeneratorContext): unknown => {
		if (typeof node === 'string') {
			const single = SINGLE_PLACEHOLDER.exec(node)
			if (single) return call(single[1] ?? '', single[2], context)
			return node.replace(PLACEHOLDER, (_, name: string, args: string | undefined) =>
				String(call(name, args, context)),
			)
		}
		if (Array.isArray(node)) {
			const first = node[0]
			const repeat =
				typeof first === 'string' ? /^\{\{\s*repetir\s*\(([^)]*)\)\s*\}\}$/.exec(first) : null
			if (repeat) {
				if (node.length !== 2)
					throw new Error(
						'Depois de {{repetir(n)}} coloque um único modelo: ["{{repetir(3)}}", { … }].',
					)
				const args = parseArgs('repetir', repeat[1])
				const [min, max] = intArgs('repetir', args, [args[0] ?? 1, args[0] ?? 1])
				const count = args.length >= 2 ? between(min, max) : min
				if (count < 0 || count > 1000) throw new Error('repetir aceita de 0 a 1.000 itens.')
				return Array.from({ length: count }, (_, i) => walk(node[1], { index: i + 1 }))
			}
			return node.map((item) => walk(item, context))
		}
		if (node && typeof node === 'object') {
			return Object.fromEntries(
				Object.entries(node as Record<string, unknown>).map(([key, value]) => [
					key,
					walk(value, context),
				]),
			)
		}
		return node
	}
	return walk(template, { index })
}

/** `amount` filled copies of a JSON template: one object when amount is 1, else an array. */
export function generateJson(templateText: string, amount: number, generators: Generators): string {
	let template: unknown
	try {
		template = JSON.parse(templateText)
	} catch (error) {
		throw new Error(`O modelo não é um JSON válido: ${(error as Error).message}`)
	}
	const budget = { left: MAX_GENERATED_VALUES }
	const items = Array.from({ length: amount }, (_, i) =>
		renderTemplate(template, generators, i + 1, budget),
	)
	return JSON.stringify(amount === 1 ? items[0] : items, null, 2)
}

/** Placeholders names that don't change the output type and need no arguments (field builder). */
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
