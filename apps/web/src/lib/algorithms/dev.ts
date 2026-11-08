/**
 * Pure helpers for the developer tools: relative time, regex, text diff layout, JSON parsing,
 * timestamps, cron fields and URLs. No DOM, no network.
 */

/* ------------------------------ relative time ------------------------------ */

const relativeFormat = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'always' })

const SECONDS_PER_UNIT: ReadonlyArray<[Intl.RelativeTimeFormatUnit, number]> = [
	['year', 365 * 24 * 3600],
	['month', 30 * 24 * 3600],
	['day', 24 * 3600],
	['hour', 3600],
	['minute', 60],
	['second', 1],
]

/** "há 3 dias", "em 2 horas", "agora": the largest unit that fits, rounded toward zero. */
export function relativeTime(date: Date, now: Date): string {
	const secondsFromNow = (date.getTime() - now.getTime()) / 1000
	const distance = Math.abs(secondsFromNow)
	const [unit, unitSeconds] = SECONDS_PER_UNIT.find(
		([candidate, candidateSeconds]) => distance >= candidateSeconds || candidate === 'second',
	) as [Intl.RelativeTimeFormatUnit, number]
	const amount = Math.trunc(secondsFromNow / unitSeconds)
	return amount === 0 ? 'agora' : relativeFormat.format(amount, unit)
}

/* ---------------------------------- regex ---------------------------------- */

export const REGEX_FLAGS = [
	{ flag: 'g', label: 'g — global', hint: 'Todas as ocorrências, não só a primeira.' },
	{ flag: 'i', label: 'i — ignorar maiúsculas', hint: 'A e a contam como iguais.' },
	{ flag: 'm', label: 'm — multilinha', hint: '^ e $ valem para cada linha.' },
	{ flag: 's', label: 's — dotAll', hint: 'O ponto também casa quebra de linha.' },
	{ flag: 'u', label: 'u — Unicode', hint: 'Emojis e \\p{…} contam como um caractere.' },
	{ flag: 'y', label: 'y — sticky', hint: 'Só casa exatamente a partir da última posição.' },
] as const

export type RegexFlag = (typeof REGEX_FLAGS)[number]['flag']

/**
 * Names of the capturing groups in order (null for unnamed ones), so group N can be shown with
 * its name. Skips escapes, character classes and non-capturing/lookaround groups.
 */
export function captureGroupNames(pattern: string): (string | null)[] {
	const names: (string | null)[] = []
	let insideCharacterClass = false
	for (let i = 0; i < pattern.length; i++) {
		const char = pattern[i]
		if (char === '\\') {
			i++
			continue
		}
		if (insideCharacterClass) {
			if (char === ']') insideCharacterClass = false
			continue
		}
		if (char === '[') {
			insideCharacterClass = true
			continue
		}
		if (char !== '(') continue
		if (pattern[i + 1] !== '?') {
			names.push(null)
			continue
		}
		const namedGroup = /^\?<([A-Za-z_$][\w$]*)>/.exec(pattern.slice(i + 1))
		if (namedGroup) names.push(namedGroup[1] as string)
	}
	return names
}

export type RegexGroup = { number: number; name: string | null; value: string | undefined }
export type RegexMatch = { index: number; end: number; text: string; groups: RegexGroup[] }

export type RegexOutcome =
	| { ok: true; regex: RegExp; matches: RegexMatch[]; truncated: boolean }
	| { ok: false; error: string }

/** Builds the RegExp, with the engine's message turned into something actionable. */
export function compileRegex(
	pattern: string,
	flags: string,
): { ok: true; regex: RegExp } | { ok: false; error: string } {
	try {
		return { ok: true, regex: new RegExp(pattern, flags) }
	} catch (error) {
		const engineReason = (error as Error).message.replace(
			/^Invalid regular expression: \/.*\/[a-z]*: /s,
			'',
		)
		return {
			ok: false,
			error: `Expressão inválida: ${engineReason}. Confira parênteses, colchetes e barras invertidas.`,
		}
	}
}

/** All matches (or the first one without the g flag), capped at `limit`. */
export function runRegex(pattern: string, flags: string, text: string, limit = 1000): RegexOutcome {
	const compiled = compileRegex(pattern, flags)
	if (!compiled.ok) return compiled
	const { regex } = compiled
	const groupNames = captureGroupNames(pattern)
	const toMatch = (match: RegExpExecArray): RegexMatch => ({
		index: match.index,
		end: match.index + match[0].length,
		text: match[0],
		groups: match.slice(1).map((value, groupIndex) => ({
			number: groupIndex + 1,
			name: groupNames[groupIndex] ?? null,
			value,
		})),
	})
	const matches: RegexMatch[] = []
	let truncated = false
	if (regex.global) {
		for (const match of text.matchAll(regex)) {
			if (matches.length >= limit) {
				truncated = true
				break
			}
			matches.push(toMatch(match as RegExpExecArray))
		}
	} else {
		regex.lastIndex = 0
		const match = regex.exec(text)
		if (match) matches.push(toMatch(match))
	}
	return { ok: true, regex, matches, truncated }
}

export type Segment = { text: string; match: number | null }

/** The text cut into plain and matched runs (match = its index in `matches`); empty matches are skipped. */
export function highlightSegments(text: string, matches: readonly RegexMatch[]): Segment[] {
	const segments: Segment[] = []
	let cursor = 0
	matches.forEach((match, matchIndex) => {
		const isEmpty = match.end === match.index
		if (isEmpty || match.index < cursor) return
		if (match.index > cursor) segments.push({ text: text.slice(cursor, match.index), match: null })
		segments.push({ text: text.slice(match.index, match.end), match: matchIndex })
		cursor = match.end
	})
	if (cursor < text.length) segments.push({ text: text.slice(cursor), match: null })
	return segments
}

/* ---------------------------------- diff ----------------------------------- */

/** The shape `diff` returns (kept structural so this module doesn't import the library). */
export type Change = { value: string; added?: boolean; removed?: boolean }

export type DiffUnit = 'lines' | 'words' | 'chars'

const splitLines = (value: string) => {
	const lines = value.split('\n')
	if (lines.at(-1) === '') lines.pop()
	return lines
}

function countUnits(value: string, unit: DiffUnit): number {
	switch (unit) {
		case 'lines':
			return splitLines(value).length
		case 'words':
			return (value.match(/\S+/g) ?? []).length
		case 'chars':
			return [...value].length
	}
}

/** How many lines, words or characters were added and removed. */
export function diffStats(changes: readonly Change[], unit: DiffUnit) {
	let added = 0
	let removed = 0
	for (const change of changes) {
		if (change.added) added += countUnits(change.value, unit)
		else if (change.removed) removed += countUnits(change.value, unit)
	}
	return { added, removed, identical: added === 0 && removed === 0 }
}

export type UnifiedLine = {
	sign: ' ' | '-' | '+'
	oldNumber: number | null
	newNumber: number | null
	text: string
}

/** Line diff as a unified listing with both line numbers. */
export function unifiedLines(changes: readonly Change[]): UnifiedLine[] {
	const lines: UnifiedLine[] = []
	let oldNumber = 1
	let newNumber = 1
	for (const change of changes) {
		for (const text of splitLines(change.value)) {
			if (change.added) lines.push({ sign: '+', oldNumber: null, newNumber: newNumber++, text })
			else if (change.removed)
				lines.push({ sign: '-', oldNumber: oldNumber++, newNumber: null, text })
			else lines.push({ sign: ' ', oldNumber: oldNumber++, newNumber: newNumber++, text })
		}
	}
	return lines
}

export type SideCell = { number: number; text: string; changed: boolean }
export type SideRow = { left: SideCell | null; right: SideCell | null }

/** Line diff side by side: a removed block is paired line by line with the added block after it. */
export function sideBySideRows(changes: readonly Change[]): SideRow[] {
	const rows: SideRow[] = []
	let oldNumber = 1
	let newNumber = 1
	for (let i = 0; i < changes.length; i++) {
		const change = changes[i] as Change
		if (!change.added && !change.removed) {
			for (const text of splitLines(change.value)) {
				rows.push({
					left: { number: oldNumber++, text, changed: false },
					right: { number: newNumber++, text, changed: false },
				})
			}
			continue
		}
		const removedLines = change.removed ? splitLines(change.value) : []
		let addedLines: string[] = []
		if (change.added) {
			addedLines = splitLines(change.value)
		} else if (changes[i + 1]?.added) {
			addedLines = splitLines((changes[i + 1] as Change).value)
			i++
		}
		const rowCount = Math.max(removedLines.length, addedLines.length)
		for (let row = 0; row < rowCount; row++) {
			const removedLine = removedLines[row]
			const addedLine = addedLines[row]
			rows.push({
				left:
					removedLine === undefined
						? null
						: { number: oldNumber++, text: removedLine, changed: true },
				right:
					addedLine === undefined ? null : { number: newNumber++, text: addedLine, changed: true },
			})
		}
	}
	return rows
}

/* ---------------------------------- JSON ----------------------------------- */

export type JsonParse = { ok: true; value: unknown } | { ok: false; error: string }

/** JSON.parse with the line and column of a syntax error. */
export function parseJson(text: string): JsonParse {
	try {
		return { ok: true, value: JSON.parse(text) }
	} catch (error) {
		const position = Number(/position (\d+)/.exec((error as Error).message)?.[1])
		if (Number.isNaN(position))
			return { ok: false, error: 'JSON inválido. Confira aspas, vírgulas e chaves.' }
		const before = text.slice(0, position)
		const line = before.split('\n').length
		const column = position - before.lastIndexOf('\n')
		return { ok: false, error: `JSON inválido na linha ${line}, coluna ${column}.` }
	}
}

/* -------------------------------- timestamp -------------------------------- */

export type TimestampUnit = 's' | 'ms' | 'us' | 'ns'

export const TIMESTAMP_UNIT_NAMES: Record<TimestampUnit, string> = {
	s: 'segundos',
	ms: 'milissegundos',
	us: 'microssegundos',
	ns: 'nanossegundos',
}

const UNITS_PER_MILLISECOND: Record<TimestampUnit, number> = {
	s: 0.001,
	ms: 1,
	us: 1000,
	ns: 1_000_000,
}

/** Guesses the unit by size: up to 11 digits are seconds (until year 5138), then ms, µs, ns. */
export function detectTimestampUnit(value: number): TimestampUnit {
	const magnitude = Math.abs(value)
	if (magnitude < 1e11) return 's'
	if (magnitude < 1e14) return 'ms'
	if (magnitude < 1e17) return 'us'
	return 'ns'
}

export type ParsedTimestamp = {
	date: Date
	unit: TimestampUnit
	seconds: number
	milliseconds: number
}

/** "1700000000", "1700000000123" or "1700000000.5" → a date. Throws a message in Portuguese. */
export function parseTimestamp(
	input: string,
	unit: TimestampUnit | 'auto' = 'auto',
): ParsedTimestamp {
	const digits = input.trim().replace(/[\s_]/g, '')
	if (!/^-?\d+(\.\d+)?$/.test(digits)) {
		throw new Error(
			'Digite só números, como 1700000000 (segundos) ou 1700000000000 (milissegundos).',
		)
	}
	const value = Number(digits)
	const resolvedUnit = unit === 'auto' ? detectTimestampUnit(value) : unit
	const milliseconds = value / UNITS_PER_MILLISECOND[resolvedUnit]
	const date = new Date(milliseconds)
	if (Number.isNaN(date.getTime())) {
		throw new Error('Esse timestamp está fora do intervalo de datas suportado.')
	}
	return {
		date,
		unit: resolvedUnit,
		seconds: Math.floor(milliseconds / 1000),
		milliseconds: Math.round(milliseconds),
	}
}

const pad = (value: number, size = 2) => String(Math.abs(value)).padStart(size, '0')
const ENGLISH_WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const ENGLISH_MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
]

/** "+0300" or "-03:00". */
function formatOffset(offsetMinutes: number, withColon: boolean): string {
	const sign = offsetMinutes < 0 ? '-' : '+'
	const hours = pad(Math.trunc(offsetMinutes / 60))
	const minutes = pad(offsetMinutes % 60)
	return `${sign}${hours}${withColon ? ':' : ''}${minutes}`
}

/** The wall-clock parts of `date` at a fixed UTC offset (in minutes). */
function wallClockAt(date: Date, offsetMinutes: number) {
	const shifted = new Date(date.getTime() + offsetMinutes * 60_000)
	return {
		year: shifted.getUTCFullYear(),
		month: shifted.getUTCMonth(),
		day: shifted.getUTCDate(),
		weekday: shifted.getUTCDay(),
		hours: shifted.getUTCHours(),
		minutes: shifted.getUTCMinutes(),
		seconds: shifted.getUTCSeconds(),
		milliseconds: shifted.getUTCMilliseconds(),
	}
}

/** RFC 2822 (e-mail, HTTP): "Sat, 07 Nov 2026 12:00:00 +0000". */
export function formatRfc2822(date: Date, offsetMinutes = 0): string {
	const clock = wallClockAt(date, offsetMinutes)
	const day = `${ENGLISH_WEEKDAYS[clock.weekday]}, ${pad(clock.day)} ${ENGLISH_MONTHS[clock.month]} ${clock.year}`
	const time = `${pad(clock.hours)}:${pad(clock.minutes)}:${pad(clock.seconds)}`
	return `${day} ${time} ${formatOffset(offsetMinutes, false)}`
}

/** ISO 8601 with an explicit offset: "2026-11-07T09:00:00.000-03:00" (Z at offset 0). */
export function formatIsoOffset(date: Date, offsetMinutes = 0): string {
	if (offsetMinutes === 0) return date.toISOString()
	const clock = wallClockAt(date, offsetMinutes)
	const day = `${String(clock.year).padStart(4, '0')}-${pad(clock.month + 1)}-${pad(clock.day)}`
	const time = `${pad(clock.hours)}:${pad(clock.minutes)}:${pad(clock.seconds)}.${pad(clock.milliseconds, 3)}`
	return `${day}T${time}${formatOffset(offsetMinutes, true)}`
}

/** "2026-11-07" + "09:30" → epoch milliseconds, read as local time or UTC. */
export function dateTimeToEpoch(isoDate: string, time: string, zone: 'local' | 'utc'): number {
	const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate)
	if (!dateMatch) throw new Error('Escolha uma data válida (dd/mm/aaaa).')
	const timeMatch = /^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(time || '00:00')
	if (!timeMatch) throw new Error('Digite o horário como hh:mm.')
	const [, year, month, day] = dateMatch.map(Number) as [number, number, number, number]
	const [, hours, minutes, seconds = 0] = timeMatch.map((part) => Number(part ?? 0)) as [
		number,
		number,
		number,
		number,
	]
	if (hours > 23 || minutes > 59 || seconds > 59) {
		throw new Error('Horário inválido: use de 00:00 a 23:59.')
	}
	const monthIndex = month - 1
	const epoch =
		zone === 'utc'
			? Date.UTC(year, monthIndex, day, hours, minutes, seconds)
			: new Date(year, monthIndex, day, hours, minutes, seconds).getTime()
	// Date rolls 31/02 over to March, so a different day means the date does not exist.
	const result = new Date(epoch)
	const resultDay = zone === 'utc' ? result.getUTCDate() : result.getDate()
	if (resultDay !== day) throw new Error('Essa data não existe no calendário.')
	return epoch
}

/* ---------------------------------- cron ----------------------------------- */

export const CRON_PRESETS = [
	{ label: 'A cada minuto', expression: '* * * * *' },
	{ label: 'A cada 5 minutos', expression: '*/5 * * * *' },
	{ label: 'A cada 15 minutos', expression: '*/15 * * * *' },
	{ label: 'A cada hora', expression: '0 * * * *' },
	{ label: 'Diário à meia-noite', expression: '0 0 * * *' },
	{ label: 'Diário às 9h', expression: '0 9 * * *' },
	{ label: 'Dias úteis às 8h30', expression: '30 8 * * 1-5' },
	{ label: 'Domingo à meia-noite', expression: '0 0 * * 0' },
	{ label: 'Todo dia 1º às 6h', expression: '0 6 1 * *' },
	{ label: '1º de janeiro', expression: '0 0 1 1 *' },
] as const

export const CRON_MACROS: Record<string, string> = {
	'@yearly': '0 0 1 1 *',
	'@annually': '0 0 1 1 *',
	'@monthly': '0 0 1 * *',
	'@weekly': '0 0 * * 0',
	'@daily': '0 0 * * *',
	'@midnight': '0 0 * * *',
	'@hourly': '0 * * * *',
}

export type CronFieldKind = 'second' | 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek'

type CronFieldInfo = { name: string; range: string; unit: [singular: string, plural: string] }

const FIELD_INFO: Record<CronFieldKind, CronFieldInfo> = {
	second: { name: 'Segundo', range: '0–59', unit: ['segundo', 'segundos'] },
	minute: { name: 'Minuto', range: '0–59', unit: ['minuto', 'minutos'] },
	hour: { name: 'Hora', range: '0–23', unit: ['hora', 'horas'] },
	dayOfMonth: { name: 'Dia do mês', range: '1–31', unit: ['dia', 'dias'] },
	month: { name: 'Mês', range: '1–12 ou JAN–DEC', unit: ['mês', 'meses'] },
	dayOfWeek: {
		name: 'Dia da semana',
		range: '0–7 ou SUN–SAT (0 e 7 = domingo)',
		unit: ['dia', 'dias'],
	},
}

const MONTH_NAMES = [
	'janeiro',
	'fevereiro',
	'março',
	'abril',
	'maio',
	'junho',
	'julho',
	'agosto',
	'setembro',
	'outubro',
	'novembro',
	'dezembro',
]
const WEEKDAY_NAMES = [
	'domingo',
	'segunda',
	'terça',
	'quarta',
	'quinta',
	'sexta',
	'sábado',
	'domingo',
]
const MONTH_ALIASES = [
	'JAN',
	'FEB',
	'MAR',
	'APR',
	'MAY',
	'JUN',
	'JUL',
	'AUG',
	'SEP',
	'OCT',
	'NOV',
	'DEC',
]
const WEEKDAY_ALIASES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

/** One value of a field in words: 3 → "março" (month), 1 → "segunda" (weekday), 7 → "7". */
function valueName(value: string, kind: CronFieldKind): string {
	const uppercase = value.toUpperCase()
	if (kind === 'month') {
		const aliasIndex = MONTH_ALIASES.indexOf(uppercase)
		const monthIndex = aliasIndex >= 0 ? aliasIndex : Number(value) - 1
		return MONTH_NAMES[monthIndex] ?? value
	}
	if (kind === 'dayOfWeek') {
		const aliasIndex = WEEKDAY_ALIASES.indexOf(uppercase)
		const weekdayIndex = aliasIndex >= 0 ? aliasIndex : Number(value)
		return WEEKDAY_NAMES[weekdayIndex] ?? value
	}
	return value
}

/** "5/10" → "a cada 10 minutos, a partir de 5"; "1-5/2" also names the range. */
function describeStep(base: string, interval: number, kind: CronFieldKind): string {
	const [singular, plural] = FIELD_INFO[kind].unit
	const every = `a cada ${interval} ${interval === 1 ? singular : plural}`
	if (base === '*') return every
	if (base.includes('-')) return `${every}, ${describeListItem(base, kind)}`
	return `${every}, a partir de ${valueName(base, kind)}`
}

/** One comma-separated item of a field. */
function describeListItem(item: string, kind: CronFieldKind): string {
	if (item === '*' || item === '?') return `qualquer ${FIELD_INFO[kind].unit[0]}`
	if (kind === 'dayOfMonth' && item.toUpperCase() === 'L') return 'último dia do mês'
	if (kind === 'dayOfWeek' && /^\w+#\d$/.test(item)) {
		const [weekday = '', occurrence = ''] = item.split('#')
		return `${occurrence}ª ${valueName(weekday, kind)} do mês`
	}
	if (kind === 'dayOfWeek' && /^\w+L$/i.test(item)) {
		return `última ${valueName(item.slice(0, -1), kind)} do mês`
	}
	const step = /^(.+)\/(\d+)$/.exec(item)
	if (step) return describeStep(step[1] ?? '', Number(step[2]), kind)
	const range = /^([^-]+)-([^-]+)$/.exec(item)
	if (range) {
		return `de ${valueName(range[1] as string, kind)} a ${valueName(range[2] as string, kind)}`
	}
	return valueName(item, kind)
}

/** One cron field in Portuguese: "*" → "qualquer minuto", "*\/15" → "a cada 15 minutos". */
export function describeCronField(value: string, kind: CronFieldKind): string {
	return value
		.split(',')
		.map((item) => describeListItem(item, kind))
		.join(', ')
}

export type CronField = {
	kind: CronFieldKind
	name: string
	range: string
	value: string
	description: string
}

/** Splits a 5-field (or 6-field, with seconds first) expression and explains each field. */
export function cronBreakdown(expression: string): CronField[] {
	const trimmed = expression.trim()
	const expanded = CRON_MACROS[trimmed.toLowerCase()] ?? trimmed
	const fields = expanded.split(/\s+/).filter(Boolean)
	if (fields.length !== 5 && fields.length !== 6) {
		throw new Error(
			`Uma expressão cron tem 5 campos (minuto hora dia mês dia-da-semana) ou 6 com segundos; esta tem ${fields.length}.`,
		)
	}
	const kinds: CronFieldKind[] = ['minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek']
	if (fields.length === 6) kinds.unshift('second')
	return fields.map((value, position) => {
		const kind = kinds[position] as CronFieldKind
		const info = FIELD_INFO[kind]
		return {
			kind,
			name: info.name,
			range: info.range,
			value,
			description: describeCronField(value, kind),
		}
	})
}

/* ----------------------------------- URL ----------------------------------- */

export type UrlParam = { key: string; value: string }

export type UrlParts = {
	protocol: string
	username: string
	password: string
	hostname: string
	port: string
	/** The port the scheme uses when none is written (443 for https). */
	defaultPort: string
	pathname: string
	params: UrlParam[]
	hash: string
	origin: string
}

const DEFAULT_PORTS: Record<string, string> = {
	'http:': '80',
	'https:': '443',
	'ws:': '80',
	'wss:': '443',
	'ftp:': '21',
}

/** decodeURIComponent that keeps malformed sequences (a lone %) as typed. */
function safeDecode(text: string): string {
	try {
		return decodeURIComponent(text)
	} catch {
		return text
	}
}

/** Splits a URL into its parts, with everything percent-decoded. Throws a message in Portuguese. */
export function parseUrl(input: string): UrlParts {
	const text = input.trim()
	if (!text) throw new Error('Cole uma URL.')
	let url: URL
	try {
		url = new URL(text)
	} catch {
		const looksLikeDomain = /^[\w.-]+\.[a-z]{2,}/i.test(text)
		throw new Error(
			looksLikeDomain
				? 'Inclua o protocolo no começo, por exemplo https://'
				: 'Não parece uma URL válida. Ex.: https://exemplo.com/caminho?a=1#topo',
		)
	}
	return {
		protocol: url.protocol,
		username: safeDecode(url.username),
		password: safeDecode(url.password),
		hostname: url.hostname,
		port: url.port,
		defaultPort: DEFAULT_PORTS[url.protocol] ?? '',
		pathname: safeDecode(url.pathname),
		params: [...url.searchParams].map(([key, value]) => ({ key, value })),
		hash: safeDecode(url.hash.replace(/^#/, '')),
		origin: url.origin,
	}
}

/** Rebuilds a URL from `base` with a new list of query parameters (empty keys are dropped). */
export function rebuildUrl(base: string, params: readonly UrlParam[]): string {
	const url = new URL(base.trim())
	const search = new URLSearchParams()
	for (const { key, value } of params) {
		if (key) search.append(key, value)
	}
	url.search = search.toString()
	return url.toString()
}
