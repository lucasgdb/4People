/**
 * Format converters: JSON, YAML, XML, INI, CSV → SQL and data URIs.
 * js-yaml and fast-xml-parser are imported lazily so they only load when a converter runs.
 */

/* --------------------------------- Shared --------------------------------- */

export type Conversion =
	| { ok: true; output: string; info?: string; warnings?: string[] }
	| { ok: false; error: string; line?: number; column?: number }

type ConversionOutput = string | { output: string; info?: string; warnings?: string[] }

/** 1-based line and column of a character offset. */
export function lineColumn(text: string, offset: number) {
	const before = text.slice(0, Math.max(0, offset))
	const line = before.split('\n').length
	return { line, column: offset - before.lastIndexOf('\n') }
}

/** An error that knows where in the input it happened. */
export class SourceError extends Error {
	line?: number
	column?: number
	constructor(message: string, line?: number, column?: number) {
		super(message)
		this.line = line
		this.column = column
	}
}

/** " (linha 3, coluna 5)" for error messages, or "" when the line is unknown. */
function describeLocation(line?: number, column?: number): string {
	if (!line) return ''
	if (!column) return ` (linha ${line})`
	return ` (linha ${line}, coluna ${column})`
}

function toFailedConversion(error: unknown): Conversion {
	if (error instanceof SourceError) {
		return { ok: false, error: error.message, line: error.line, column: error.column }
	}
	return { ok: false, error: (error as Error).message || String(error) }
}

/** Runs a synchronous converter, turning a thrown error into a failed Conversion. */
export function runConversion(convert: () => ConversionOutput): Conversion {
	try {
		const output = convert()
		return typeof output === 'string' ? { ok: true, output } : { ok: true, ...output }
	} catch (error) {
		return toFailedConversion(error)
	}
}

async function runAsyncConversion(convert: () => Promise<ConversionOutput>): Promise<Conversion> {
	try {
		const output = await convert()
		return typeof output === 'string' ? { ok: true, output } : { ok: true, ...output }
	} catch (error) {
		return toFailedConversion(error)
	}
}

/** Thrown to unwind the recursive scan at the first syntax error. */
class JsonSyntaxStop {
	readonly offset: number
	constructor(offset: number) {
		this.offset = offset
	}
}

const JSON_LITERAL = /^(true|false|null|-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?)/
const JSON_ESCAPABLE = '"\\/bfnrt'

/**
 * Offset of the first JSON syntax error, or -1 when the text is valid. Browsers word (and sometimes
 * omit) the position differently, so this small scanner finds it the same way everywhere.
 */
export function jsonErrorOffset(text: string): number {
	let position = 0

	const stopHere = (): never => {
		throw new JsonSyntaxStop(position)
	}
	const skipWhitespace = () => {
		while (position < text.length && ' \t\n\r'.includes(text.charAt(position))) position++
	}

	const scanString = () => {
		position++
		while (position < text.length && text[position] !== '"') {
			if (text.charAt(position) < ' ') stopHere()
			if (text[position] === '\\') {
				position++
				if (text[position] === 'u') {
					if (!/^[\da-fA-F]{4}$/.test(text.slice(position + 1, position + 5))) stopHere()
					position += 4
				} else if (!JSON_ESCAPABLE.includes(text[position] ?? 'x')) {
					stopHere()
				}
			}
			position++
		}
		if (position >= text.length) stopHere()
		position++
	}

	/** Scans the comma-separated items up to `closing`, which must follow the opening bracket. */
	const scanItems = (closing: string, scanItem: () => void) => {
		position++
		skipWhitespace()
		if (text[position] === closing) {
			position++
			return
		}
		for (;;) {
			scanItem()
			skipWhitespace()
			if (text[position] === closing) {
				position++
				return
			}
			if (text[position] !== ',') stopHere()
			position++
		}
	}

	const scanObjectEntry = () => {
		skipWhitespace()
		if (text[position] !== '"') stopHere()
		scanString()
		skipWhitespace()
		if (text[position] !== ':') stopHere()
		position++
		scanValue()
	}

	const scanLiteral = () => {
		const literal = JSON_LITERAL.exec(text.slice(position))
		if (!literal) stopHere()
		position += literal?.[0].length ?? 0
	}

	const scanValue = (): void => {
		skipWhitespace()
		const char = text[position]
		if (char === '{') scanItems('}', scanObjectEntry)
		else if (char === '[') scanItems(']', scanValue)
		else if (char === '"') scanString()
		else scanLiteral()
	}

	try {
		scanValue()
		skipWhitespace()
		return position < text.length ? position : -1
	} catch (error) {
		return error instanceof JsonSyntaxStop ? error.offset : position
	}
}

/** JSON.parse with a Portuguese error that points at the line and column. */
export function parseJson(input: string): unknown {
	try {
		return JSON.parse(input)
	} catch {
		const offset = jsonErrorOffset(input)
		const { line, column } = lineColumn(input, offset === -1 ? input.length : offset)
		throw new SourceError(
			`JSON inválido${describeLocation(line, column)}. Confira aspas duplas, vírgulas e chaves.`,
			line,
			column,
		)
	}
}

export type Indent = '2' | '4' | 'tab' | '0'

const indentUnit = (indent: Indent) => (indent === 'tab' ? '\t' : ' '.repeat(Number(indent)))

const stringifyJson = (value: unknown, indent: Indent) =>
	JSON.stringify(value, null, indent === '0' ? undefined : indentUnit(indent)) ?? 'null'

/* ---------------------------------- YAML ---------------------------------- */

async function dumpYaml(value: unknown, indent: number) {
	const yaml = await import('js-yaml')
	// lineWidth -1 keeps long strings on one line; noRefs repeats shared objects instead of anchors.
	return yaml.dump(value, { indent, lineWidth: -1, noRefs: true })
}

type YamlException = Error & { mark?: { line: number; column: number }; reason?: string }

/** js-yaml marks are 0-based, and its message repeats the position as a "(line:column)" suffix. */
function toYamlSourceError(error: unknown): SourceError {
	const exception = error as YamlException
	const line = exception.mark ? exception.mark.line + 1 : undefined
	const column = exception.mark ? exception.mark.column + 1 : undefined
	const firstMessageLine = exception.message.split('\n')[0] ?? ''
	const reason = (exception.reason ?? firstMessageLine).replace(/\s*\(\d+:\d+\)$/, '')
	return new SourceError(`YAML inválido${describeLocation(line, column)}: ${reason}.`, line, column)
}

export function jsonToYaml(input: string, indent: 2 | 4 = 2): Promise<Conversion> {
	return runAsyncConversion(() => dumpYaml(parseJson(input), indent))
}

/** Parses YAML; several documents (separated by ---) become an array. */
export async function parseYaml(input: string): Promise<{ value: unknown; documentCount: number }> {
	const yaml = await import('js-yaml')
	let documents: unknown[]
	try {
		documents = yaml.loadAll(input)
	} catch (error) {
		throw toYamlSourceError(error)
	}
	const value = documents.length === 1 ? documents[0] : documents
	return { value, documentCount: documents.length }
}

export function yamlToJson(input: string, indent: Indent = '2'): Promise<Conversion> {
	return runAsyncConversion(async () => {
		const { value, documentCount } = await parseYaml(input)
		return {
			output: stringifyJson(value ?? null, indent),
			info: documentCount > 1 ? `${documentCount} documentos YAML viraram uma lista.` : undefined,
		}
	})
}

/* ----------------------------------- XML ---------------------------------- */

const DEFAULT_TEXT_NODE_NAME = '#text'

export type XmlReadOptions = {
	/** Key prefix for attributes, e.g. "@_". */
	attributePrefix: string
	keepAttributes: boolean
	textNodeName: string
	/** Turn "42" and "true" into numbers and booleans. */
	parseValues: boolean
}

export const XML_READ_DEFAULTS: XmlReadOptions = {
	attributePrefix: '@_',
	keepAttributes: true,
	textNodeName: DEFAULT_TEXT_NODE_NAME,
	parseValues: true,
}

export async function parseXml(input: string, options: XmlReadOptions = XML_READ_DEFAULTS) {
	const { XMLParser, XMLValidator } = await import('fast-xml-parser')
	const validation = XMLValidator.validate(input)
	if (validation !== true) {
		const { msg, line, col } = validation.err
		throw new SourceError(`XML inválido${describeLocation(line, col)}: ${msg}`, line, col)
	}
	const parser = new XMLParser({
		ignoreAttributes: !options.keepAttributes,
		attributeNamePrefix: options.attributePrefix,
		textNodeName: options.textNodeName || DEFAULT_TEXT_NODE_NAME,
		parseTagValue: options.parseValues,
		parseAttributeValue: options.parseValues,
		ignoreDeclaration: true,
		ignorePiTags: true,
		trimValues: true,
	})
	return parser.parse(input) as unknown
}

export function xmlToJson(
	input: string,
	options: XmlReadOptions,
	indent: Indent = '2',
): Promise<Conversion> {
	return runAsyncConversion(async () => stringifyJson(await parseXml(input, options), indent))
}

export type XmlWriteOptions = {
	rootName: string
	/** Keys with this prefix become attributes; an empty prefix writes no attributes. */
	attributePrefix: string
	textNodeName: string
	indent: Indent
	declaration: boolean
}

export const XML_WRITE_DEFAULTS: XmlWriteOptions = {
	rootName: 'root',
	attributePrefix: '@_',
	textNodeName: DEFAULT_TEXT_NODE_NAME,
	indent: '2',
	declaration: true,
}

const VALID_XML_NAME = /^[A-Za-z_][\w.-]*$/
const XML_DECLARATION = '<?xml version="1.0" encoding="UTF-8"?>'

/** Makes a JSON key a valid XML element name: invalid characters become "_", digits get a "_" prefix. */
export function xmlName(key: string): string {
	let name = key.replace(/[^\w.-]/g, '_')
	if (!/^[A-Za-z_]/.test(name)) name = `_${name}`
	// Names starting with "xml" are reserved by the XML spec.
	if (/^xml/i.test(name)) name = `_${name}`
	return name
}

/** Renames keys so they are valid XML names, leaving attribute and text keys alone. */
function sanitizeKeysForXml(
	value: unknown,
	attributePrefix: string,
	textNodeName: string,
): unknown {
	if (Array.isArray(value)) {
		return value.map((item) => sanitizeKeysForXml(item, attributePrefix, textNodeName))
	}
	if (!value || typeof value !== 'object') return value

	const renamed: Record<string, unknown> = {}
	for (const [key, child] of Object.entries(value)) {
		const isAttribute = attributePrefix !== '' && key.startsWith(attributePrefix)
		const keepKey = key === textNodeName || isAttribute
		renamed[keepKey ? key : xmlName(key)] = sanitizeKeysForXml(child, attributePrefix, textNodeName)
	}
	return renamed
}

/** True for an object with exactly one key whose value is not an array: it can be the root itself. */
function hasSingleRootKey(value: unknown): boolean {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return false
	const children = Object.values(value)
	return children.length === 1 && !Array.isArray(children[0])
}

/** Wraps the value in the root element; a top-level array becomes repeated <item> elements. */
function wrapInRoot(value: unknown, rootName: string): unknown {
	if (rootName) {
		if (!VALID_XML_NAME.test(rootName)) {
			throw new Error(
				'Nome do elemento raiz inválido: use letras, números, "_", "-" ou "." e comece com letra.',
			)
		}
		return { [rootName]: Array.isArray(value) ? { item: value } : value }
	}
	if (hasSingleRootKey(value)) return value
	throw new Error(
		'Sem elemento raiz o JSON precisa ser um objeto com uma única chave. Informe um nome de raiz.',
	)
}

/** Builds XML from a JS value; arrays repeat the element. */
export async function buildXml(value: unknown, options: XmlWriteOptions): Promise<string> {
	const { XMLBuilder } = await import('fast-xml-parser')
	const textNodeName = options.textNodeName || DEFAULT_TEXT_NODE_NAME
	const tree = sanitizeKeysForXml(
		wrapInRoot(value, options.rootName.trim()),
		options.attributePrefix,
		textNodeName,
	)
	const minified = options.indent === '0'
	const builder = new XMLBuilder({
		ignoreAttributes: options.attributePrefix === '',
		attributeNamePrefix: options.attributePrefix,
		textNodeName,
		format: !minified,
		indentBy: indentUnit(options.indent),
		suppressEmptyNode: true,
	})
	const xml = (builder.build(tree) as string).trim()
	if (!options.declaration) return xml
	return `${XML_DECLARATION}${minified ? '' : '\n'}${xml}`
}

export function jsonToXml(input: string, options: XmlWriteOptions): Promise<Conversion> {
	return runAsyncConversion(() => buildXml(parseJson(input), options))
}

/* ----------------------------------- INI ---------------------------------- */

export type IniValue = string | number | boolean | null | IniValue[] | { [key: string]: IniValue }
export type IniObject = { [key: string]: IniValue }

const JSON_NUMBER = /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/
const TRUE_WORDS = ['true', 'yes', 'on']
const FALSE_WORDS = ['false', 'no', 'off']
const ESCAPED_CHARACTERS: Record<string, string> = { n: '\n', t: '\t', r: '\r' }

/** "true" → true, "42" → 42, "null" → null; anything else stays text. */
export function inferScalar(text: string): string | number | boolean | null {
	const lower = text.toLowerCase()
	if (TRUE_WORDS.includes(lower)) return true
	if (FALSE_WORDS.includes(lower)) return false
	if (lower === 'null') return null
	if (JSON_NUMBER.test(text)) {
		const number = Number(text)
		// Integers beyond 2^53 would lose digits, so they stay as text.
		if (Number.isSafeInteger(number) || !Number.isInteger(number)) return number
	}
	return text
}

const stripTrailingComment = (text: string) => text.replace(/\s+[;#].*$/, '')
const stripMatchingQuotes = (text: string) => text.replace(/^(["'])(.*)\1$/, '$2')

/** Body of a quoted value; double quotes understand \n, \t, \r and \<char> escapes. */
function unquoteIniValue(quotedText: string, lineNumber: number): string {
	const quote = quotedText.charAt(0)
	const closingIndex = quotedText.lastIndexOf(quote)
	if (closingIndex <= 0) {
		throw new SourceError(`Aspas sem fechamento${describeLocation(lineNumber)}.`, lineNumber)
	}
	const afterQuotes = quotedText.slice(closingIndex + 1).trim()
	if (afterQuotes && !/^[;#]/.test(afterQuotes)) {
		throw new SourceError(
			`Texto depois das aspas${describeLocation(lineNumber)}: "${afterQuotes}".`,
			lineNumber,
		)
	}
	const body = quotedText.slice(1, closingIndex)
	if (quote === "'") return body
	return body.replace(/\\(.)/g, (_, char: string) => ESCAPED_CHARACTERS[char] ?? char)
}

function parseIniValue(rawValue: string, lineNumber: number, inferTypes: boolean): IniValue {
	const text = rawValue.trim()
	if (text.startsWith('"') || text.startsWith("'")) return unquoteIniValue(text, lineNumber)
	const bare = stripTrailingComment(text).trim()
	return inferTypes ? inferScalar(bare) : bare
}

const isPlainObject = (value: unknown): value is IniObject =>
	typeof value === 'object' && value !== null && !Array.isArray(value)

/** Sets a key; a repeated key (or `key[]`) collects every value in an array instead of overwriting. */
function assignIniKey(
	section: IniObject,
	key: string,
	value: IniValue,
	lineNumber: number,
	asArray: boolean,
) {
	const current = section[key]
	if (isPlainObject(current)) {
		throw new SourceError(
			`A chave "${key}" já é uma seção${describeLocation(lineNumber)}.`,
			lineNumber,
		)
	}
	if (current === undefined) {
		section[key] = asArray ? [value] : value
		return
	}
	section[key] = Array.isArray(current) ? [...current, value] : [current, value]
}

/** Resolves a "[a.b]" header to its (possibly nested) section, creating missing levels. */
function openSection(root: IniObject, headerLine: string, lineNumber: number): IniObject {
	const match = /^\[([^\]]*)\]\s*([;#].*)?$/.exec(headerLine)
	if (!match) {
		throw new SourceError(`Seção sem "]" de fechamento${describeLocation(lineNumber)}.`, lineNumber)
	}
	const path = (match[1] ?? '').split('.').map((part) => stripMatchingQuotes(part.trim()))
	if (path.some((part) => part === '')) {
		throw new SourceError(`Nome de seção vazio${describeLocation(lineNumber)}.`, lineNumber)
	}
	let section = root
	for (const part of path) {
		const existing = section[part]
		if (existing === undefined) {
			section[part] = {}
		} else if (!isPlainObject(existing)) {
			throw new SourceError(
				`A seção "${part}" já foi usada como chave${describeLocation(lineNumber)}.`,
				lineNumber,
			)
		}
		section = section[part] as IniObject
	}
	return section
}

/** Index of the first "=" or ":", or -1 when the line has neither. */
function separatorIndex(line: string): number {
	const indexes = [line.indexOf('='), line.indexOf(':')].filter((index) => index !== -1)
	return indexes.length > 0 ? Math.min(...indexes) : -1
}

/** A line without "=" or ":" is a flag key set to true. */
function assignFlag(section: IniObject, line: string, lineNumber: number) {
	const key = stripTrailingComment(line)
	if (/\s/.test(key)) {
		throw new SourceError(
			`Linha sem "=" ou ":"${describeLocation(lineNumber)}. Use chave = valor.`,
			lineNumber,
		)
	}
	assignIniKey(section, key, true, lineNumber, false)
}

function assignKeyValue(
	section: IniObject,
	line: string,
	separator: number,
	lineNumber: number,
	inferTypes: boolean,
) {
	let key = line.slice(0, separator).trim()
	if (!key) {
		throw new SourceError(
			`Chave vazia antes do "${line[separator]}"${describeLocation(lineNumber)}.`,
			lineNumber,
		)
	}
	const asArray = key.endsWith('[]')
	if (asArray) key = key.slice(0, -2).trim()
	const value = parseIniValue(line.slice(separator + 1), lineNumber, inferTypes)
	assignIniKey(section, stripMatchingQuotes(key), value, lineNumber, asArray)
}

/**
 * Parses INI: [section] and [a.b] nested sections, key=value and key: value, ; and # comments
 * (whole line or after a space), quoted values, `key[]` and repeated keys become arrays, a bare
 * key is a flag (true).
 */
export function parseIni(text: string, { inferTypes = true } = {}): IniObject {
	const root: IniObject = {}
	let section = root
	const lines = text.split(/\r?\n/)
	for (const [index, rawLine] of lines.entries()) {
		const lineNumber = index + 1
		const line = rawLine.trim()
		if (!line || line.startsWith(';') || line.startsWith('#')) continue

		if (line.startsWith('[')) {
			section = openSection(root, line, lineNumber)
			continue
		}
		const separator = separatorIndex(line)
		if (separator === -1) assignFlag(section, line, lineNumber)
		else assignKeyValue(section, line, separator, lineNumber, inferTypes)
	}
	return root
}

export function convertIni(
	input: string,
	format: 'json' | 'yaml',
	options: { inferTypes: boolean; indent: Indent },
): Promise<Conversion> {
	return runAsyncConversion(() => {
		const value = parseIni(input, { inferTypes: options.inferTypes })
		if (format === 'json') return Promise.resolve(stringifyJson(value, options.indent))
		return dumpYaml(value, options.indent === '4' ? 4 : 2)
	})
}

/* -------------------------------- CSV → SQL ------------------------------- */

export const CSV_DELIMITERS = [',', ';', '\t', '|'] as const
export type CsvDelimiter = (typeof CSV_DELIMITERS)[number]

const isBlankRow = (cells: string[]) => cells.length === 1 && (cells[0] ?? '').trim() === ''

/** RFC 4180 parser: quoted fields with "" escapes and line breaks inside quotes. */
export function parseCsv(text: string, delimiter: string): string[][] {
	const csv = text.replace(/^﻿/, '')
	const rows: string[][] = []
	let row: string[] = []
	let field = ''
	let insideQuotes = false

	const endField = () => {
		row.push(field)
		field = ''
	}
	const endRow = () => {
		endField()
		rows.push(row)
		row = []
	}

	for (let index = 0; index < csv.length; index++) {
		const char = csv[index]
		const nextChar = csv[index + 1]
		if (insideQuotes) {
			if (char !== '"') {
				field += char
			} else if (nextChar === '"') {
				field += '"'
				index++
			} else {
				insideQuotes = false
			}
		} else if (char === '"' && field === '') {
			insideQuotes = true
		} else if (char === delimiter) {
			endField()
		} else if (char === '\n' || char === '\r') {
			if (char === '\r' && nextChar === '\n') index++
			endRow()
		} else {
			field += char
		}
	}

	if (insideQuotes) {
		const { line } = lineColumn(csv, csv.length)
		throw new SourceError(`Aspas sem fechamento no CSV (até a linha ${line}).`, line)
	}
	if (field !== '' || row.length > 0) endRow()
	return rows.filter((cells) => !isBlankRow(cells))
}

/** Picks the delimiter that splits the first lines into the same (largest) number of columns. */
export function detectDelimiter(text: string): CsvDelimiter {
	const sample = text.split(/\r?\n/).filter(Boolean).slice(0, 10).join('\n')
	let bestDelimiter: CsvDelimiter = ','
	let bestScore = 0
	for (const delimiter of CSV_DELIMITERS) {
		let rows: string[][]
		try {
			rows = parseCsv(sample, delimiter)
		} catch {
			continue
		}
		const firstRowColumns = rows[0]?.length ?? 0
		if (firstRowColumns < 2) continue
		const matchingRows = rows.filter((row) => row.length === firstRowColumns).length
		const score = firstRowColumns * (matchingRows / rows.length)
		if (score > bestScore) {
			bestScore = score
			bestDelimiter = delimiter
		}
	}
	return bestDelimiter
}

export type SqlDialect = 'mysql' | 'postgresql' | 'sqlite' | 'sqlserver'
export type ColumnKind = 'integer' | 'bigint' | 'decimal' | 'boolean' | 'date' | 'datetime' | 'text'
export type ColumnType = {
	kind: ColumnKind
	/** Longest text (VARCHAR length). */
	length: number
	precision: number
	scale: number
	nullable: boolean
}

const INTEGER_PATTERN = /^[+-]?\d+$/
const DECIMAL_PATTERN = /^[+-]?(\d+\.\d*|\.\d+|\d+)$/
const BOOLEAN_PATTERN = /^(true|false)$/i
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const BR_DATE_PATTERN = /^(\d{2})\/(\d{2})\/(\d{4})$/
const DATETIME_PATTERN = /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/
const INT32_MAX = 2147483647
const MAX_DECIMAL_PRECISION = 38
const MAX_VARCHAR_LENGTH = 4000

/** "31/12/2023" → "2023-12-31"; any other text is returned unchanged. */
function toIsoDate(text: string): string {
	const brazilian = BR_DATE_PATTERN.exec(text)
	return brazilian ? `${brazilian[3]}-${brazilian[2]}-${brazilian[1]}` : text
}

/** Rejects dates that match the pattern but don't exist, like 2023-02-30. */
function isRealDate(text: string): boolean {
	const isoDay = toIsoDate(text).slice(0, 10)
	const date = new Date(`${isoDay}T00:00:00Z`)
	return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === isoDay
}

const isDate = (value: string) =>
	(ISO_DATE_PATTERN.test(value) || BR_DATE_PATTERN.test(value)) && isRealDate(value)
const isDatetime = (value: string) => DATETIME_PATTERN.test(value) && isRealDate(value)

function decimalPrecision(values: readonly string[]) {
	let integerDigits = 1
	let scale = 0
	for (const value of values) {
		const [integerPart = '', fractionPart = ''] = value.replace(/^[+-]/, '').split('.')
		integerDigits = Math.max(integerDigits, integerPart.replace(/^0+(?=\d)/, '').length)
		scale = Math.max(scale, fractionPart.length)
	}
	return { precision: Math.min(MAX_DECIMAL_PRECISION, integerDigits + scale), scale }
}

/** Infers the narrowest SQL type that fits every non-empty value of a column. */
export function inferColumnType(values: readonly string[]): ColumnType {
	const filled = values.map((value) => value.trim()).filter((value) => value !== '')
	const nullable = filled.length < values.length
	const length = Math.max(1, ...values.map((value) => [...value].length))
	const base = { length, precision: 0, scale: 0, nullable }

	if (filled.length === 0) return { ...base, kind: 'text' }
	if (filled.every((value) => INTEGER_PATTERN.test(value))) {
		const exceedsInt32 = filled.some((value) => Math.abs(Number(value)) > INT32_MAX)
		return { ...base, kind: exceedsInt32 ? 'bigint' : 'integer' }
	}
	if (filled.every((value) => DECIMAL_PATTERN.test(value))) {
		return { ...base, kind: 'decimal', ...decimalPrecision(filled) }
	}
	if (filled.every((value) => BOOLEAN_PATTERN.test(value))) return { ...base, kind: 'boolean' }
	if (filled.every(isDate)) return { ...base, kind: 'date' }
	if (filled.every(isDatetime)) return { ...base, kind: 'datetime' }
	return { ...base, kind: 'text' }
}

export function quoteIdentifier(name: string, dialect: SqlDialect) {
	if (dialect === 'mysql') return `\`${name.replace(/`/g, '``')}\``
	if (dialect === 'sqlserver') return `[${name.replace(/]/g, ']]')}]`
	return `"${name.replace(/"/g, '""')}"`
}

const BOOLEAN_TYPE: Record<SqlDialect, string> = {
	mysql: 'BOOLEAN',
	postgresql: 'BOOLEAN',
	sqlite: 'INTEGER',
	sqlserver: 'BIT',
}

const DATETIME_TYPE: Record<SqlDialect, string> = {
	mysql: 'DATETIME',
	postgresql: 'TIMESTAMP',
	sqlite: 'TEXT',
	sqlserver: 'DATETIME2',
}

function textType(length: number, dialect: SqlDialect): string {
	if (dialect === 'sqlite') return 'TEXT'
	if (length > MAX_VARCHAR_LENGTH) return dialect === 'sqlserver' ? 'NVARCHAR(MAX)' : 'TEXT'
	return dialect === 'sqlserver' ? `NVARCHAR(${length})` : `VARCHAR(${length})`
}

export function sqlType(type: ColumnType, dialect: SqlDialect): string {
	switch (type.kind) {
		case 'integer':
			return 'INTEGER'
		case 'bigint':
			return dialect === 'sqlite' ? 'INTEGER' : 'BIGINT'
		case 'decimal':
			return `DECIMAL(${Math.max(type.precision, 1)}, ${type.scale})`
		case 'boolean':
			return BOOLEAN_TYPE[dialect]
		case 'date':
			return dialect === 'sqlite' ? 'TEXT' : 'DATE'
		case 'datetime':
			return DATETIME_TYPE[dialect]
		default:
			return textType(type.length, dialect)
	}
}

/** SQL Server and SQLite have no boolean literals, so they store 1 and 0. */
function booleanLiteral(value: string, dialect: SqlDialect): string {
	const isTrue = value.toLowerCase() === 'true'
	if (dialect === 'sqlserver' || dialect === 'sqlite') return isTrue ? '1' : '0'
	return isTrue ? 'TRUE' : 'FALSE'
}

function textLiteral(text: string, dialect: SqlDialect): string {
	let escaped = text.replace(/'/g, "''")
	// MySQL also treats backslash as an escape character inside strings.
	if (dialect === 'mysql') escaped = escaped.replace(/\\/g, '\\\\')
	const unicodePrefix = dialect === 'sqlserver' ? 'N' : ''
	return `${unicodePrefix}'${escaped}'`
}

/** One value as an SQL literal of its column's type. Text keeps its spaces; other types are trimmed. */
export function sqlLiteral(raw: string, type: ColumnType, dialect: SqlDialect): string {
	const value = raw.trim()
	if (raw === '' || (value === '' && type.kind !== 'text')) return 'NULL'
	switch (type.kind) {
		case 'integer':
		case 'bigint':
			return String(BigInt(value))
		case 'decimal':
			return value.replace(/^\+/, '').replace(/^(-?)\./, '$10.')
		case 'boolean':
			return booleanLiteral(value, dialect)
		case 'date':
			return `'${toIsoDate(value)}'`
		case 'datetime':
			return `'${value.replace('T', ' ')}'`
		default:
			return textLiteral(raw, dialect)
	}
}

/** Column names from the header: trimmed, unique, never empty. */
export function columnNames(header: readonly string[] | null, count: number): string[] {
	const timesSeen = new Map<string, number>()
	return Array.from({ length: count }, (_, index) => {
		const name = (header?.[index] ?? '').trim() || `coluna_${index + 1}`
		const key = name.toLowerCase()
		const previousCount = timesSeen.get(key) ?? 0
		timesSeen.set(key, previousCount + 1)
		return previousCount > 0 ? `${name}_${previousCount + 1}` : name
	})
}

export type CsvToSqlOptions = {
	tableName: string
	dialect: SqlDialect
	delimiter: 'auto' | CsvDelimiter
	header: boolean
	batchSize: number
	createTable: boolean
}

export type CsvToSqlResult = {
	sql: string
	delimiter: CsvDelimiter
	columns: { name: string; type: string }[]
	rows: number
	warnings: string[]
}

/** SQL Server rejects more than 1000 rows in one VALUES list. */
const SQL_SERVER_MAX_ROWS_PER_INSERT = 1000

function raggedRowsWarning(lineNumbers: number[], columnCount: number): string {
	const single = lineNumbers.length === 1
	const shownLines = lineNumbers.slice(0, 5).join(', ')
	const ellipsis = lineNumbers.length > 5 ? '…' : ''
	return `${single ? 'A linha' : 'As linhas'} ${shownLines}${ellipsis} ${single ? 'tem' : 'têm'} um número diferente de colunas (${columnCount}); faltas viram NULL e sobras foram ignoradas.`
}

function createTableStatement(
	table: string,
	names: string[],
	types: ColumnType[],
	dialect: SqlDialect,
): string {
	const quotedNames = names.map((name) => quoteIdentifier(name, dialect))
	const width = Math.max(...quotedNames.map((name) => name.length))
	const definitions = quotedNames.map((quotedName, index) => {
		const type = types[index] as ColumnType
		const notNull = type.nullable ? '' : ' NOT NULL'
		return `  ${quotedName.padEnd(width)} ${sqlType(type, dialect)}${notNull}`
	})
	return `CREATE TABLE ${table} (\n${definitions.join(',\n')}\n);`
}

function insertStatements(
	table: string,
	names: string[],
	types: ColumnType[],
	rows: string[][],
	options: CsvToSqlOptions,
): string[] {
	const { dialect } = options
	const columnList = names.map((name) => quoteIdentifier(name, dialect)).join(', ')
	const maxRows =
		dialect === 'sqlserver' ? SQL_SERVER_MAX_ROWS_PER_INSERT : Number.POSITIVE_INFINITY
	const rowsPerInsert = Math.max(1, Math.min(Math.floor(options.batchSize) || 1, maxRows))
	const toTuple = (row: string[]) => {
		const literals = row.map((value, index) =>
			sqlLiteral(value, types[index] as ColumnType, dialect),
		)
		return `  (${literals.join(', ')})`
	}

	const statements: string[] = []
	for (let start = 0; start < rows.length; start += rowsPerInsert) {
		const tuples = rows.slice(start, start + rowsPerInsert).map(toTuple)
		statements.push(`INSERT INTO ${table} (${columnList}) VALUES\n${tuples.join(',\n')};`)
	}
	return statements
}

export function csvToSql(text: string, options: CsvToSqlOptions): CsvToSqlResult {
	const delimiter = options.delimiter === 'auto' ? detectDelimiter(text) : options.delimiter
	const parsedRows = parseCsv(text, delimiter)
	if (parsedRows.length === 0) throw new Error('O CSV está vazio. Cole ao menos uma linha.')

	const header = options.header ? (parsedRows[0] ?? null) : null
	const dataRows = options.header ? parsedRows.slice(1) : parsedRows
	const columnCount = header ? header.length : Math.max(...dataRows.map((row) => row.length))

	const warnings: string[] = []
	const firstDataLine = options.header ? 2 : 1
	const raggedLines = dataRows
		.map((row, index) => (row.length === columnCount ? 0 : index + firstDataLine))
		.filter(Boolean)
	if (raggedLines.length > 0) warnings.push(raggedRowsWarning(raggedLines, columnCount))

	const names = columnNames(header, columnCount)
	const rows = dataRows.map((row) =>
		Array.from({ length: columnCount }, (_, index) => row[index] ?? ''),
	)
	const types = names.map((_, column) => inferColumnType(rows.map((row) => row[column] ?? '')))
	const table = (options.tableName.trim() || 'tabela')
		.split('.')
		.map((part) => quoteIdentifier(part, options.dialect))
		.join('.')

	const statements: string[] = []
	if (options.createTable) {
		statements.push(createTableStatement(table, names, types, options.dialect))
	}
	statements.push(...insertStatements(table, names, types, rows, options))
	if (rows.length === 0) warnings.push('Nenhuma linha de dados: só o CREATE TABLE foi gerado.')

	return {
		sql: statements.join('\n\n'),
		delimiter,
		columns: names.map((name, index) => ({
			name,
			type: sqlType(types[index] as ColumnType, options.dialect),
		})),
		rows: rows.length,
		warnings,
	}
}

/* --------------------------------- Data URI ------------------------------- */

export type DataUri = {
	mime: string
	/** Parameters other than base64, e.g. charset=utf-8. */
	params: string[]
	base64: boolean
	bytes: Uint8Array
}

const EXTENSION_BY_MIME: Record<string, string> = {
	'image/png': 'png',
	'image/jpeg': 'jpg',
	'image/gif': 'gif',
	'image/webp': 'webp',
	'image/avif': 'avif',
	'image/svg+xml': 'svg',
	'image/bmp': 'bmp',
	'image/x-icon': 'ico',
	'image/vnd.microsoft.icon': 'ico',
	'image/tiff': 'tiff',
	'application/pdf': 'pdf',
	'application/json': 'json',
	'application/zip': 'zip',
	'text/plain': 'txt',
	'text/html': 'html',
	'text/css': 'css',
	'text/csv': 'csv',
	'text/javascript': 'js',
	'audio/mpeg': 'mp3',
	'audio/wav': 'wav',
	'video/mp4': 'mp4',
	'font/woff2': 'woff2',
	'font/woff': 'woff',
}

/** Known extension for the MIME type, else its subtype cleaned up ("application/x-foo" → "xfoo"). */
export function extensionForMime(mime: string): string {
	const known = EXTENSION_BY_MIME[mime.toLowerCase()]
	if (known) return known
	const subtype = mime
		.split('/')[1]
		?.replace(/[^a-z\d]/gi, '')
		.slice(0, 8)
	return subtype || 'bin'
}

/** Accepts the standard and URL-safe alphabets, with or without padding. */
export function base64ToBytes(base64: string): Uint8Array {
	const normalized = base64.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/')
	if (!/^[A-Za-z\d+/]*={0,2}$/.test(normalized) || normalized.length % 4 === 1) {
		throw new Error(
			'O Base64 do data URI é inválido: só pode ter A–Z, a–z, 0–9, +, / e = no final.',
		)
	}
	const binary = atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '='))
	return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

/** Chunked so String.fromCharCode never gets more arguments than the engine allows. */
const BASE64_CHUNK_SIZE = 0x8000

export function bytesToBase64(bytes: Uint8Array): string {
	let binary = ''
	for (let start = 0; start < bytes.length; start += BASE64_CHUNK_SIZE) {
		binary += String.fromCharCode(...bytes.subarray(start, start + BASE64_CHUNK_SIZE))
	}
	return btoa(binary)
}

function percentDecodeToBytes(data: string): Uint8Array {
	try {
		return new TextEncoder().encode(decodeURIComponent(data))
	} catch {
		throw new Error('Os dados têm um "%" inválido. Codifique o texto com encodeURIComponent.')
	}
}

/** Parses data:[<mime>][;param][;base64],<data>, also when wrapped in CSS url("…"). */
export function parseDataUri(text: string): DataUri {
	const uri = text.trim().replace(/^url\((['"]?)(.*)\1\)$/s, '$2')
	const match = /^data:([^,]*?),(.*)$/is.exec(uri)
	if (!match) {
		throw new Error(
			'Isso não é um data URI. Ele começa com "data:" e tem uma vírgula antes dos dados, ex.: data:image/png;base64,iVBOR…',
		)
	}
	const [, header = '', data = ''] = match
	const params = header.split(';').map((param) => param.trim())
	const isBase64 = params.at(-1)?.toLowerCase() === 'base64'
	if (isBase64) params.pop()
	const mime = (params.shift() || 'text/plain').toLowerCase()
	if (!/^[a-z]+\/[\w.+-]+$/.test(mime)) throw new Error(`Tipo MIME inválido: "${mime}".`)
	const bytes = isBase64 ? base64ToBytes(data) : percentDecodeToBytes(data)
	return { mime, params, base64: isBase64, bytes }
}

const sizeFormat = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 })
const SIZE_UNITS = ['KB', 'MB', 'GB']

/** 1536 → "1,5 KB" (binary units, pt-BR decimals). */
export function formatBytes(size: number): string {
	if (size < 1024) return `${size} ${size === 1 ? 'byte' : 'bytes'}`
	let value = size / 1024
	let unitIndex = 0
	while (value >= 1024 && unitIndex < SIZE_UNITS.length - 1) {
		value /= 1024
		unitIndex++
	}
	return `${sizeFormat.format(value)} ${SIZE_UNITS[unitIndex]}`
}

export function buildDataUri(mime: string, bytes: Uint8Array) {
	return `data:${mime || 'application/octet-stream'};base64,${bytesToBase64(bytes)}`
}

/** Ready-to-paste snippets for a data URI. */
export function dataUriSnippets(uri: string, size?: { width: number; height: number }, alt = '') {
	const sizeAttributes = size ? ` width="${size.width}" height="${size.height}"` : ''
	return {
		uri,
		css: `background-image: url("${uri}");`,
		html: `<img src="${uri}"${sizeAttributes} alt="${alt.replace(/"/g, '&quot;')}">`,
		markdown: `![${alt.replace(/[[\]]/g, '')}](${uri})`,
	}
}
