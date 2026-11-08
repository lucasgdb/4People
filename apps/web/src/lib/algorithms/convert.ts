/**
 * Format converters (JSON, YAML, XML, INI, CSV → SQL, data URIs).
 * Heavy libraries (js-yaml, fast-xml-parser) are imported lazily inside the async functions,
 * so they only load when a converter actually runs.
 */

/* --------------------------------- Shared --------------------------------- */

export type Conversion =
	| { ok: true; output: string; info?: string; warnings?: string[] }
	| { ok: false; error: string; line?: number; column?: number }

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

const where = (line?: number, column?: number) =>
	line ? ` (linha ${line}${column ? `, coluna ${column}` : ''})` : ''

/** Turns any thrown error into a failed Conversion, keeping line/column when known. */
function failure(error: unknown): Conversion {
	if (error instanceof SourceError) {
		return { ok: false, error: error.message, line: error.line, column: error.column }
	}
	return { ok: false, error: (error as Error).message || String(error) }
}

/**
 * Offset of the first JSON syntax error, or -1 when the text is valid. Browsers word (and sometimes
 * omit) the position differently, so this small scanner finds it the same way everywhere.
 */
export function jsonErrorOffset(text: string): number {
	let i = 0
	const space = () => {
		while (i < text.length && ' \t\n\r'.includes(text.charAt(i))) i++
	}
	const fail = (): never => {
		throw i
	}
	const string = () => {
		i++
		while (i < text.length && text[i] !== '"') {
			if (text.charAt(i) < ' ') fail()
			if (text[i] === '\\') {
				i++
				if (text[i] === 'u') {
					if (!/^[\da-fA-F]{4}$/.test(text.slice(i + 1, i + 5))) fail()
					i += 4
				} else if (!'"\\/bfnrt'.includes(text[i] ?? 'x')) fail()
			}
			i++
		}
		if (i >= text.length) fail()
		i++
	}
	const value = (): void => {
		space()
		const char = text[i]
		if (char === '{') {
			i++
			space()
			if (text[i] === '}') {
				i++
				return
			}
			for (;;) {
				space()
				if (text[i] !== '"') fail()
				string()
				space()
				if (text[i] !== ':') fail()
				i++
				value()
				space()
				if (text[i] === ',') i++
				else if (text[i] === '}') {
					i++
					return
				} else fail()
			}
		}
		if (char === '[') {
			i++
			space()
			if (text[i] === ']') {
				i++
				return
			}
			for (;;) {
				value()
				space()
				if (text[i] === ',') i++
				else if (text[i] === ']') {
					i++
					return
				} else fail()
			}
		}
		if (char === '"') {
			string()
			return
		}
		const literal = /^(true|false|null|-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?)/.exec(text.slice(i))
		if (!literal) fail()
		i += literal?.[0].length ?? 0
	}
	try {
		value()
		space()
		return i < text.length ? i : -1
	} catch (offset) {
		return offset as number
	}
}

/** Runs a synchronous converter, turning a thrown error into a failed Conversion. */
export function attempt(
	run: () => string | { output: string; info?: string; warnings?: string[] },
): Conversion {
	try {
		const result = run()
		return typeof result === 'string' ? { ok: true, output: result } : { ok: true, ...result }
	} catch (error) {
		return failure(error)
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
			`JSON inválido${where(line, column)}. Confira aspas duplas, vírgulas e chaves.`,
			line,
			column,
		)
	}
}

export type Indent = '2' | '4' | 'tab' | '0'
const indentString = (indent: Indent) => (indent === 'tab' ? '\t' : ' '.repeat(Number(indent)))
const jsonText = (value: unknown, indent: Indent) =>
	JSON.stringify(value, null, indent === '0' ? undefined : indentString(indent)) ?? 'null'

/* ---------------------------------- YAML ---------------------------------- */

async function yamlDump(value: unknown, indent: number) {
	const yaml = await import('js-yaml')
	// lineWidth -1 keeps long strings on one line; noRefs repeats shared objects instead of anchors.
	return yaml.dump(value, { indent, lineWidth: -1, noRefs: true })
}

/** js-yaml errors carry a 0-based mark; the reason is the first line of the message. */
function yamlError(error: unknown): SourceError {
	const err = error as Error & { mark?: { line: number; column: number }; reason?: string }
	const line = err.mark ? err.mark.line + 1 : undefined
	const column = err.mark ? err.mark.column + 1 : undefined
	const reason = (err.reason ?? err.message.split('\n')[0] ?? '').replace(/\s*\(\d+:\d+\)$/, '')
	return new SourceError(`YAML inválido${where(line, column)}: ${reason}.`, line, column)
}

export async function jsonToYaml(input: string, indent: 2 | 4 = 2): Promise<Conversion> {
	try {
		return { ok: true, output: await yamlDump(parseJson(input), indent) }
	} catch (error) {
		return failure(error)
	}
}

/** Parses YAML; several documents (separated by ---) become an array. */
export async function parseYaml(input: string): Promise<{ value: unknown; documents: number }> {
	const yaml = await import('js-yaml')
	let docs: unknown[]
	try {
		docs = yaml.loadAll(input)
	} catch (error) {
		throw yamlError(error)
	}
	return { value: docs.length === 1 ? docs[0] : docs, documents: docs.length }
}

export async function yamlToJson(input: string, indent: Indent = '2'): Promise<Conversion> {
	try {
		const { value, documents } = await parseYaml(input)
		return {
			ok: true,
			output: jsonText(value ?? null, indent),
			info: documents > 1 ? `${documents} documentos YAML viraram uma lista.` : undefined,
		}
	} catch (error) {
		return failure(error)
	}
}

/* ----------------------------------- XML ---------------------------------- */

export type XmlReadOptions = {
	/** Keep attributes, with this prefix in the key (e.g. "@_"). Empty string drops attributes. */
	attributePrefix: string
	keepAttributes: boolean
	textNodeName: string
	/** Turn "42" and "true" into numbers and booleans. */
	parseValues: boolean
}

export const XML_READ_DEFAULTS: XmlReadOptions = {
	attributePrefix: '@_',
	keepAttributes: true,
	textNodeName: '#text',
	parseValues: true,
}

export async function parseXml(input: string, options: XmlReadOptions = XML_READ_DEFAULTS) {
	const { XMLParser, XMLValidator } = await import('fast-xml-parser')
	const valid = XMLValidator.validate(input)
	if (valid !== true) {
		const { msg, line, col } = valid.err
		throw new SourceError(`XML inválido${where(line, col)}: ${msg}`, line, col)
	}
	const parser = new XMLParser({
		ignoreAttributes: !options.keepAttributes,
		attributeNamePrefix: options.attributePrefix,
		textNodeName: options.textNodeName || '#text',
		parseTagValue: options.parseValues,
		parseAttributeValue: options.parseValues,
		ignoreDeclaration: true,
		ignorePiTags: true,
		trimValues: true,
	})
	return parser.parse(input) as unknown
}

export async function xmlToJson(
	input: string,
	options: XmlReadOptions,
	indent: Indent = '2',
): Promise<Conversion> {
	try {
		return { ok: true, output: jsonText(await parseXml(input, options), indent) }
	} catch (error) {
		return failure(error)
	}
}

export type XmlWriteOptions = {
	rootName: string
	attributePrefix: string
	textNodeName: string
	indent: Indent
	declaration: boolean
}

export const XML_WRITE_DEFAULTS: XmlWriteOptions = {
	rootName: 'root',
	attributePrefix: '@_',
	textNodeName: '#text',
	indent: '2',
	declaration: true,
}

const XML_NAME = /^[A-Za-z_][\w.-]*$/

/** Makes a JSON key a valid XML element name: invalid characters become "_", digits get a "_" prefix. */
export function xmlName(key: string): string {
	let name = key.replace(/[^\w.-]/g, '_')
	if (!/^[A-Za-z_]/.test(name)) name = `_${name}`
	if (/^xml/i.test(name)) name = `_${name}`
	return name
}

/** Renames keys so they are valid XML names, leaving attribute and text keys alone. */
function sanitizeForXml(value: unknown, prefix: string, textName: string): unknown {
	if (Array.isArray(value)) return value.map((item) => sanitizeForXml(item, prefix, textName))
	if (value && typeof value === 'object') {
		const out: Record<string, unknown> = {}
		for (const [key, child] of Object.entries(value)) {
			const keep = key === textName || (prefix !== '' && key.startsWith(prefix))
			out[keep ? key : xmlName(key)] = sanitizeForXml(child, prefix, textName)
		}
		return out
	}
	return value
}

/** Builds XML from a JS value (arrays repeat the element; nested arrays become <item>). */
export async function buildXml(value: unknown, options: XmlWriteOptions): Promise<string> {
	const { XMLBuilder } = await import('fast-xml-parser')
	const root = options.rootName.trim()
	if (root && !XML_NAME.test(root)) {
		throw new Error(
			'Nome do elemento raiz inválido: use letras, números, "_", "-" ou "." e comece com letra.',
		)
	}
	let tree: unknown
	if (root) {
		tree = { [root]: Array.isArray(value) ? { item: value } : value }
	} else if (
		value &&
		typeof value === 'object' &&
		!Array.isArray(value) &&
		Object.keys(value).length === 1 &&
		!Array.isArray(Object.values(value)[0])
	) {
		tree = value
	} else {
		throw new Error(
			'Sem elemento raiz o JSON precisa ser um objeto com uma única chave. Informe um nome de raiz.',
		)
	}
	tree = sanitizeForXml(tree, options.attributePrefix, options.textNodeName || '#text')
	const builder = new XMLBuilder({
		ignoreAttributes: options.attributePrefix === '',
		attributeNamePrefix: options.attributePrefix,
		textNodeName: options.textNodeName || '#text',
		format: options.indent !== '0',
		indentBy: indentString(options.indent),
		suppressEmptyNode: true,
	})
	const xml = (builder.build(tree) as string).trim()
	const separator = options.indent === '0' ? '' : '\n'
	return options.declaration ? `<?xml version="1.0" encoding="UTF-8"?>${separator}${xml}` : xml
}

export async function jsonToXml(input: string, options: XmlWriteOptions): Promise<Conversion> {
	try {
		return { ok: true, output: await buildXml(parseJson(input), options) }
	} catch (error) {
		return failure(error)
	}
}

/* ----------------------------------- INI ---------------------------------- */

export type IniValue = string | number | boolean | null | IniValue[] | { [key: string]: IniValue }
export type IniObject = { [key: string]: IniValue }

/** "true" → true, "42" → 42, "null" → null; anything else stays text. */
export function inferScalar(text: string): string | number | boolean | null {
	const lower = text.toLowerCase()
	if (lower === 'true' || lower === 'yes' || lower === 'on') return true
	if (lower === 'false' || lower === 'no' || lower === 'off') return false
	if (lower === 'null') return null
	if (/^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/.test(text)) {
		const number = Number(text)
		if (Number.isSafeInteger(number) || !Number.isInteger(number)) return number
	}
	return text
}

function unquote(raw: string, line: number): string {
	const quote = raw.charAt(0)
	const end = raw.lastIndexOf(quote)
	if (end <= 0) throw new SourceError(`Aspas sem fechamento${where(line)}.`, line)
	const rest = raw.slice(end + 1).trim()
	if (rest && !/^[;#]/.test(rest)) {
		throw new SourceError(`Texto depois das aspas${where(line)}: "${rest}".`, line)
	}
	const body = raw.slice(1, end)
	if (quote === "'") return body
	return body.replace(/\\(.)/g, (_, char: string) =>
		char === 'n' ? '\n' : char === 't' ? '\t' : char === 'r' ? '\r' : char,
	)
}

/** Value part of a line: quoted (escapes in "…"), or bare with a trailing " ; comment" removed. */
function iniValue(raw: string, line: number, infer: boolean): IniValue {
	const text = raw.trim()
	if (text.startsWith('"') || text.startsWith("'")) return unquote(text, line)
	const bare = text.replace(/\s+[;#].*$/, '').trim()
	return infer ? inferScalar(bare) : bare
}

const isPlainObject = (value: unknown): value is IniObject =>
	typeof value === 'object' && value !== null && !Array.isArray(value)

function assign(target: IniObject, key: string, value: IniValue, line: number, asArray: boolean) {
	const current = target[key]
	if (isPlainObject(current)) {
		throw new SourceError(`A chave "${key}" já é uma seção${where(line)}.`, line)
	}
	if (asArray) {
		target[key] = Array.isArray(current)
			? [...current, value]
			: current === undefined
				? [value]
				: [current, value]
	} else if (current === undefined) target[key] = value
	// A repeated key collects every value in an array instead of silently keeping the last one.
	else target[key] = Array.isArray(current) ? [...current, value] : [current, value]
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
	for (let index = 0; index < lines.length; index++) {
		const lineNo = index + 1
		const line = (lines[index] ?? '').trim()
		if (!line || line.startsWith(';') || line.startsWith('#')) continue
		if (line.startsWith('[')) {
			const match = /^\[([^\]]*)\]\s*([;#].*)?$/.exec(line)
			if (!match) throw new SourceError(`Seção sem "]" de fechamento${where(lineNo)}.`, lineNo)
			const path = (match[1] ?? '')
				.split('.')
				.map((part) => part.trim().replace(/^(["'])(.*)\1$/, '$2'))
			if (path.some((part) => part === '')) {
				throw new SourceError(`Nome de seção vazio${where(lineNo)}.`, lineNo)
			}
			section = root
			for (const part of path) {
				const next = section[part]
				if (next === undefined) section[part] = {}
				else if (!isPlainObject(next)) {
					throw new SourceError(
						`A seção "${part}" já foi usada como chave${where(lineNo)}.`,
						lineNo,
					)
				}
				section = section[part] as IniObject
			}
			continue
		}
		const eq = line.indexOf('=')
		const colon = line.indexOf(':')
		const at = eq === -1 ? colon : colon === -1 ? eq : Math.min(eq, colon)
		if (at === -1) {
			const key = line.replace(/\s+[;#].*$/, '')
			if (/\s/.test(key)) {
				throw new SourceError(`Linha sem "=" ou ":"${where(lineNo)}. Use chave = valor.`, lineNo)
			}
			assign(section, key, true, lineNo, false)
			continue
		}
		let key = line.slice(0, at).trim()
		if (!key) throw new SourceError(`Chave vazia antes do "${line[at]}"${where(lineNo)}.`, lineNo)
		const asArray = key.endsWith('[]')
		if (asArray) key = key.slice(0, -2).trim()
		key = key.replace(/^(["'])(.*)\1$/, '$2')
		assign(section, key, iniValue(line.slice(at + 1), lineNo, inferTypes), lineNo, asArray)
	}
	return root
}

export async function iniTo(
	input: string,
	format: 'json' | 'yaml',
	options: { inferTypes: boolean; indent: Indent },
): Promise<Conversion> {
	try {
		const value = parseIni(input, { inferTypes: options.inferTypes })
		if (format === 'json') return { ok: true, output: jsonText(value, options.indent) }
		return { ok: true, output: await yamlDump(value, options.indent === '4' ? 4 : 2) }
	} catch (error) {
		return failure(error)
	}
}

/* -------------------------------- CSV → SQL ------------------------------- */

export const CSV_DELIMITERS = [',', ';', '\t', '|'] as const
export type CsvDelimiter = (typeof CSV_DELIMITERS)[number]

/** RFC 4180 parser: quoted fields with "" escapes and line breaks inside quotes. */
export function parseCsv(text: string, delimiter: string): string[][] {
	const rows: string[][] = []
	let row: string[] = []
	let field = ''
	let quoted = false
	let index = 0
	const source = text.replace(/^﻿/, '')
	while (index < source.length) {
		const char = source[index]
		if (quoted) {
			if (char === '"') {
				if (source[index + 1] === '"') {
					field += '"'
					index++
				} else quoted = false
			} else field += char
		} else if (char === '"' && field === '') {
			quoted = true
		} else if (char === delimiter) {
			row.push(field)
			field = ''
		} else if (char === '\n' || char === '\r') {
			if (char === '\r' && source[index + 1] === '\n') index++
			row.push(field)
			rows.push(row)
			row = []
			field = ''
		} else field += char
		index++
	}
	if (quoted) {
		const { line } = lineColumn(source, source.length)
		throw new SourceError(`Aspas sem fechamento no CSV (até a linha ${line}).`, line)
	}
	if (field !== '' || row.length > 0) {
		row.push(field)
		rows.push(row)
	}
	// Blank lines are not rows.
	return rows.filter((cells) => !(cells.length === 1 && (cells[0] ?? '').trim() === ''))
}

/** Picks the delimiter that splits the first lines into the same (largest) number of columns. */
export function detectDelimiter(text: string): CsvDelimiter {
	const sample = text.split(/\r?\n/).filter(Boolean).slice(0, 10).join('\n')
	let best: CsvDelimiter = ','
	let bestScore = 0
	for (const delimiter of CSV_DELIMITERS) {
		let rows: string[][]
		try {
			rows = parseCsv(sample, delimiter)
		} catch {
			continue
		}
		if (rows.length === 0) continue
		const counts = rows.map((row) => row.length)
		const first = counts[0] ?? 0
		if (first < 2) continue
		const consistent = counts.filter((count) => count === first).length / counts.length
		const score = first * consistent
		if (score > bestScore) {
			bestScore = score
			best = delimiter
		}
	}
	return best
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

const INT = /^[+-]?\d+$/
const DEC = /^[+-]?(\d+\.\d*|\.\d+|\d+)$/
const BOOL = /^(true|false)$/i
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const BR_DATE = /^(\d{2})\/(\d{2})\/(\d{4})$/
const DATETIME = /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/

function validDate(text: string) {
	const br = BR_DATE.exec(text)
	const iso = br ? `${br[3]}-${br[2]}-${br[1]}` : text
	const date = new Date(`${iso.slice(0, 10)}T00:00:00Z`)
	return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === iso.slice(0, 10)
}

/** Infers the narrowest SQL type that fits every non-empty value of a column. */
export function inferColumnType(values: readonly string[]): ColumnType {
	const filled = values.map((value) => value.trim()).filter((value) => value !== '')
	const nullable = filled.length < values.length
	const length = Math.max(1, ...values.map((value) => [...value].length))
	const base = { length, precision: 0, scale: 0, nullable }
	if (filled.length === 0) return { ...base, kind: 'text' }
	if (filled.every((value) => INT.test(value))) {
		const big = filled.some((value) => Math.abs(Number(value)) > 2147483647)
		return { ...base, kind: big ? 'bigint' : 'integer' }
	}
	if (filled.every((value) => DEC.test(value))) {
		let integer = 1
		let scale = 0
		for (const value of filled) {
			const [int = '', frac = ''] = value.replace(/^[+-]/, '').split('.')
			integer = Math.max(integer, int.replace(/^0+(?=\d)/, '').length)
			scale = Math.max(scale, frac.length)
		}
		return { ...base, kind: 'decimal', precision: Math.min(38, integer + scale), scale }
	}
	if (filled.every((value) => BOOL.test(value))) return { ...base, kind: 'boolean' }
	if (filled.every((value) => (ISO_DATE.test(value) || BR_DATE.test(value)) && validDate(value))) {
		return { ...base, kind: 'date' }
	}
	if (filled.every((value) => DATETIME.test(value) && validDate(value))) {
		return { ...base, kind: 'datetime' }
	}
	return { ...base, kind: 'text' }
}

export function quoteIdentifier(name: string, dialect: SqlDialect) {
	if (dialect === 'mysql') return `\`${name.replace(/`/g, '``')}\``
	if (dialect === 'sqlserver') return `[${name.replace(/]/g, ']]')}]`
	return `"${name.replace(/"/g, '""')}"`
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
			return dialect === 'sqlserver' ? 'BIT' : dialect === 'sqlite' ? 'INTEGER' : 'BOOLEAN'
		case 'date':
			return dialect === 'sqlite' ? 'TEXT' : 'DATE'
		case 'datetime':
			return dialect === 'postgresql'
				? 'TIMESTAMP'
				: dialect === 'sqlserver'
					? 'DATETIME2'
					: dialect === 'sqlite'
						? 'TEXT'
						: 'DATETIME'
		default:
			if (dialect === 'sqlite') return 'TEXT'
			if (type.length > 4000) return dialect === 'sqlserver' ? 'NVARCHAR(MAX)' : 'TEXT'
			return dialect === 'sqlserver' ? `NVARCHAR(${type.length})` : `VARCHAR(${type.length})`
	}
}

/** One value as an SQL literal of its column's type. */
export function sqlLiteral(raw: string, type: ColumnType, dialect: SqlDialect): string {
	const value = raw.trim()
	if (value === '' && type.kind !== 'text') return 'NULL'
	if (raw === '') return 'NULL'
	switch (type.kind) {
		case 'integer':
		case 'bigint':
			return String(BigInt(value))
		case 'decimal':
			return value.replace(/^\+/, '').replace(/^(-?)\./, '$10.')
		case 'boolean': {
			const truthy = value.toLowerCase() === 'true'
			return dialect === 'sqlserver' || dialect === 'sqlite'
				? truthy
					? '1'
					: '0'
				: truthy
					? 'TRUE'
					: 'FALSE'
		}
		case 'date': {
			const br = BR_DATE.exec(value)
			return `'${br ? `${br[3]}-${br[2]}-${br[1]}` : value}'`
		}
		case 'datetime':
			return `'${value.replace('T', ' ')}'`
		default: {
			let text = raw.replace(/'/g, "''")
			if (dialect === 'mysql') text = text.replace(/\\/g, '\\\\')
			return `${dialect === 'sqlserver' ? 'N' : ''}'${text}'`
		}
	}
}

/** Column names from the header: trimmed, unique, never empty. */
export function columnNames(header: readonly string[] | null, count: number): string[] {
	const seen = new Map<string, number>()
	return Array.from({ length: count }, (_, index) => {
		let name = (header?.[index] ?? '').trim() || `coluna_${index + 1}`
		const key = name.toLowerCase()
		const times = seen.get(key) ?? 0
		seen.set(key, times + 1)
		if (times > 0) name = `${name}_${times + 1}`
		return name
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

export function csvToSql(text: string, options: CsvToSqlOptions): CsvToSqlResult {
	const delimiter = options.delimiter === 'auto' ? detectDelimiter(text) : options.delimiter
	const all = parseCsv(text, delimiter)
	if (all.length === 0) throw new Error('O CSV está vazio. Cole ao menos uma linha.')
	const header = options.header ? (all[0] ?? null) : null
	const rows = options.header ? all.slice(1) : all
	const count = header ? header.length : Math.max(...rows.map((row) => row.length))
	const warnings: string[] = []
	const offset = options.header ? 2 : 1
	const wrong = rows
		.map((row, index) => (row.length === count ? 0 : index + offset))
		.filter(Boolean)
	if (wrong.length) {
		warnings.push(
			`${wrong.length === 1 ? 'A linha' : 'As linhas'} ${wrong.slice(0, 5).join(', ')}${wrong.length > 5 ? '…' : ''} ${wrong.length === 1 ? 'tem' : 'têm'} um número diferente de colunas (${count}); faltas viram NULL e sobras foram ignoradas.`,
		)
	}
	const names = columnNames(header, count)
	const cells = rows.map((row) => Array.from({ length: count }, (_, index) => row[index] ?? ''))
	const types: ColumnType[] = names.map((_, column) =>
		inferColumnType(cells.map((row) => row[column] ?? '')),
	)
	const table = options.tableName.trim() || 'tabela'
	const quotedTable = table
		.split('.')
		.map((part) => quoteIdentifier(part, options.dialect))
		.join('.')
	const columnList = names.map((name) => quoteIdentifier(name, options.dialect)).join(', ')
	const parts: string[] = []
	if (options.createTable) {
		const width = Math.max(...names.map((name) => quoteIdentifier(name, options.dialect).length))
		const definitions = names.map((name, index) => {
			const type = types[index] as ColumnType
			return `  ${quoteIdentifier(name, options.dialect).padEnd(width)} ${sqlType(type, options.dialect)}${type.nullable ? '' : ' NOT NULL'}`
		})
		parts.push(`CREATE TABLE ${quotedTable} (\n${definitions.join(',\n')}\n);`)
	}
	// SQL Server rejects more than 1000 rows in one VALUES list.
	const limit = options.dialect === 'sqlserver' ? 1000 : Number.POSITIVE_INFINITY
	const batch = Math.max(1, Math.min(Math.floor(options.batchSize) || 1, limit))
	for (let start = 0; start < cells.length; start += batch) {
		const values = cells
			.slice(start, start + batch)
			.map(
				(row) =>
					`  (${row.map((value, index) => sqlLiteral(value, types[index] as ColumnType, options.dialect)).join(', ')})`,
			)
		parts.push(`INSERT INTO ${quotedTable} (${columnList}) VALUES\n${values.join(',\n')};`)
	}
	if (cells.length === 0) warnings.push('Nenhuma linha de dados: só o CREATE TABLE foi gerado.')
	return {
		sql: parts.join('\n\n'),
		delimiter,
		columns: names.map((name, index) => ({
			name,
			type: sqlType(types[index] as ColumnType, options.dialect),
		})),
		rows: cells.length,
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

const EXTENSIONS: Record<string, string> = {
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

export const extensionForMime = (mime: string) =>
	EXTENSIONS[mime.toLowerCase()] ??
	(mime
		.split('/')[1]
		?.replace(/[^a-z\d]/gi, '')
		.slice(0, 8) ||
		'bin')

export function base64ToBytes(base64: string): Uint8Array {
	const clean = base64.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/')
	if (!/^[A-Za-z\d+/]*={0,2}$/.test(clean) || clean.length % 4 === 1) {
		throw new Error(
			'O Base64 do data URI é inválido: só pode ter A–Z, a–z, 0–9, +, / e = no final.',
		)
	}
	const binary = atob(clean.padEnd(Math.ceil(clean.length / 4) * 4, '='))
	return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

export function bytesToBase64(bytes: Uint8Array): string {
	let binary = ''
	for (let i = 0; i < bytes.length; i += 0x8000) {
		binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
	}
	return btoa(binary)
}

/** Parses data:[<mime>][;param][;base64],<data>. */
export function parseDataUri(text: string): DataUri {
	const trimmed = text.trim().replace(/^url\((['"]?)(.*)\1\)$/s, '$2')
	const match = /^data:([^,]*?),(.*)$/is.exec(trimmed)
	if (!match) {
		throw new Error(
			'Isso não é um data URI. Ele começa com "data:" e tem uma vírgula antes dos dados, ex.: data:image/png;base64,iVBOR…',
		)
	}
	const parts = (match[1] ?? '').split(';').map((part) => part.trim())
	const base64 = parts.at(-1)?.toLowerCase() === 'base64'
	if (base64) parts.pop()
	const mime = (parts.shift() || 'text/plain').toLowerCase()
	if (!/^[a-z]+\/[\w.+-]+$/.test(mime)) throw new Error(`Tipo MIME inválido: "${mime}".`)
	const data = match[2] ?? ''
	let bytes: Uint8Array
	if (base64) bytes = base64ToBytes(data)
	else {
		try {
			bytes = new TextEncoder().encode(decodeURIComponent(data))
		} catch {
			throw new Error('Os dados têm um "%" inválido. Codifique o texto com encodeURIComponent.')
		}
	}
	return { mime, params: parts, base64, bytes }
}

const sizeFormat = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 })

/** 1536 → "1,5 KB" (binary units, pt-BR decimals). */
export function formatBytes(size: number): string {
	if (size < 1024) return `${size} ${size === 1 ? 'byte' : 'bytes'}`
	const units = ['KB', 'MB', 'GB']
	let value = size / 1024
	let unit = 0
	while (value >= 1024 && unit < units.length - 1) {
		value /= 1024
		unit++
	}
	return `${sizeFormat.format(value)} ${units[unit]}`
}

export function buildDataUri(mime: string, bytes: Uint8Array) {
	return `data:${mime || 'application/octet-stream'};base64,${bytesToBase64(bytes)}`
}

/** Ready-to-paste snippets for a data URI. */
export function dataUriSnippets(uri: string, size?: { width: number; height: number }, alt = '') {
	const dims = size ? ` width="${size.width}" height="${size.height}"` : ''
	return {
		uri,
		css: `background-image: url("${uri}");`,
		html: `<img src="${uri}"${dims} alt="${alt.replace(/"/g, '&quot;')}">`,
		markdown: `![${alt.replace(/[[\]]/g, '')}](${uri})`,
	}
}
