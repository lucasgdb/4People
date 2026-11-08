/**
 * Capacity planning math: SLA availability and downtime, error budgets, website bandwidth,
 * download time and data-size / data-rate units.
 */

/* ------------------------------------------- numbers ------------------------------------------ */

/** "1.234,5", "1234.5", "1,5" → number; empty or invalid → null. */
export function parseNumber(raw: string): number | null {
	const text = raw.trim().replace(/%$/, '').replace(/\s/g, '')
	if (!text) return null
	const normalized = /,\d*$/.test(text) ? text.replace(/\./g, '').replace(',', '.') : text
	if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(normalized)) return null
	const value = Number(normalized)
	return Number.isFinite(value) ? value : null
}

const significant = new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 10 })
const scientific = new Intl.NumberFormat('pt-BR', {
	notation: 'scientific',
	maximumSignificantDigits: 6,
})

/** Up to 10 significant digits; scientific notation for very large or very small values. */
export function formatSignificant(value: number): string {
	if (value === 0) return '0'
	const magnitude = Math.abs(value)
	if (magnitude >= 1e18 || magnitude < 1e-9) return scientific.format(value)
	return significant.format(value)
}

/** (100 − pct) / 100 without float noise: 100 − 99.95 is 0.0500000…, not 0.04999999999999716. */
export function unavailability(percent: number): number {
	return Number((100 - percent).toFixed(10)) / 100
}

/* ------------------------------------------ durations ----------------------------------------- */

export const DAY = 86_400
export const YEAR = 365.25 * DAY
export const PERIODS = [
	{ id: 'day', label: 'Dia', seconds: DAY },
	{ id: 'week', label: 'Semana', seconds: 7 * DAY },
	{ id: 'month', label: 'Mês', seconds: YEAR / 12 },
	{ id: 'quarter', label: 'Trimestre', seconds: YEAR / 4 },
	{ id: 'year', label: 'Ano', seconds: YEAR },
] as const
export type PeriodId = (typeof PERIODS)[number]['id']

const decimal1 = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 })

/** 31557.6 → "8h 45min 57,6s"; under one second → milliseconds. Rounded to tenths of a second. */
export function formatDuration(seconds: number): string {
	if (!Number.isFinite(seconds)) return '∞'
	if (seconds <= 0) return '0s'
	if (seconds < 1) return `${decimal1.format(seconds * 1000)}ms`
	const tenths = Math.round(seconds * 10)
	const days = Math.floor(tenths / 864_000)
	const hours = Math.floor((tenths % 864_000) / 36_000)
	const minutes = Math.floor((tenths % 36_000) / 600)
	const rest = (tenths % 600) / 10
	const parts: string[] = []
	if (days) parts.push(`${days.toLocaleString('pt-BR')}d`)
	if (hours) parts.push(`${hours}h`)
	if (minutes) parts.push(`${minutes}min`)
	if (rest) parts.push(`${decimal1.format(rest)}s`)
	return parts.join(' ')
}

/** Clock format "h:mm:ss" (hours keep counting past 24), rounded to the nearest second. */
export function formatHms(seconds: number): string {
	if (!Number.isFinite(seconds)) return '∞'
	const total = Math.max(0, Math.round(seconds))
	const hours = Math.floor(total / 3600)
	const minutes = Math.floor((total % 3600) / 60)
	const secs = total % 60
	return `${hours.toLocaleString('pt-BR')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/* --------------------------------------------- SLA -------------------------------------------- */

function assertPercent(percent: number) {
	if (!Number.isFinite(percent) || percent < 0 || percent > 100)
		throw new Error('A disponibilidade vai de 0% a 100%.')
}

/** Allowed downtime (seconds) in a period for an availability percentage. */
export function downtimeFor(availability: number, periodSeconds: number): number {
	assertPercent(availability)
	return periodSeconds * unavailability(availability)
}

/** Availability (%) that a given downtime in a period corresponds to. */
export function availabilityFor(downtimeSeconds: number, periodSeconds: number): number {
	if (!Number.isFinite(downtimeSeconds) || downtimeSeconds < 0)
		throw new Error('O tempo fora do ar não pode ser negativo.')
	if (downtimeSeconds > periodSeconds)
		throw new Error('O tempo fora do ar não pode ser maior que o período.')
	return 100 * (1 - downtimeSeconds / periodSeconds)
}

/** Allowed downtime for every period at once. */
export function downtimeTable(availability: number): Record<PeriodId, number> {
	return Object.fromEntries(
		PERIODS.map((period) => [period.id, downtimeFor(availability, period.seconds)]),
	) as Record<PeriodId, number>
}

/**
 * Composite availability: in series every component must be up (product); in parallel (redundant)
 * only one must be up (1 − product of the failure probabilities).
 */
export function compositeAvailability(values: readonly number[], mode: 'series' | 'parallel') {
	if (values.length === 0) throw new Error('Informe pelo menos uma disponibilidade.')
	for (const value of values) assertPercent(value)
	if (mode === 'series') return 100 * values.reduce((product, value) => product * (value / 100), 1)
	return 100 * (1 - values.reduce((product, value) => product * unavailability(value), 1))
}

/** "99.9, 99,95; 99.99" → numbers. Decimal comma is only read as such when followed by digits. */
export function parsePercentList(text: string): number[] | null {
	const tokens = text
		.split(/[\s;]+|,(?!\d)/)
		.map((token) => token.trim())
		.filter(Boolean)
	if (tokens.length === 0) return null
	const values = tokens.map(parseNumber)
	return values.every((value): value is number => value !== null && value >= 0 && value <= 100)
		? values
		: null
}

/* -------------------------------------------- units ------------------------------------------- */

export type DataUnit = {
	id: string
	symbol: string
	name: string
	/** Size in bits. */
	bits: number
	system: 'bit' | 'decimal' | 'binary'
}

export const DATA_UNITS: readonly DataUnit[] = [
	{ id: 'b', symbol: 'bit', name: 'bit', bits: 1, system: 'bit' },
	{ id: 'kb', symbol: 'kbit', name: 'quilobit', bits: 1e3, system: 'bit' },
	{ id: 'Mb', symbol: 'Mbit', name: 'megabit', bits: 1e6, system: 'bit' },
	{ id: 'Gb', symbol: 'Gbit', name: 'gigabit', bits: 1e9, system: 'bit' },
	{ id: 'Tb', symbol: 'Tbit', name: 'terabit', bits: 1e12, system: 'bit' },
	{ id: 'B', symbol: 'B', name: 'byte', bits: 8, system: 'decimal' },
	{ id: 'kB', symbol: 'kB', name: 'quilobyte', bits: 8e3, system: 'decimal' },
	{ id: 'MB', symbol: 'MB', name: 'megabyte', bits: 8e6, system: 'decimal' },
	{ id: 'GB', symbol: 'GB', name: 'gigabyte', bits: 8e9, system: 'decimal' },
	{ id: 'TB', symbol: 'TB', name: 'terabyte', bits: 8e12, system: 'decimal' },
	{ id: 'PB', symbol: 'PB', name: 'petabyte', bits: 8e15, system: 'decimal' },
	{ id: 'KiB', symbol: 'KiB', name: 'kibibyte', bits: 8 * 2 ** 10, system: 'binary' },
	{ id: 'MiB', symbol: 'MiB', name: 'mebibyte', bits: 8 * 2 ** 20, system: 'binary' },
	{ id: 'GiB', symbol: 'GiB', name: 'gibibyte', bits: 8 * 2 ** 30, system: 'binary' },
	{ id: 'TiB', symbol: 'TiB', name: 'tebibyte', bits: 8 * 2 ** 40, system: 'binary' },
	{ id: 'PiB', symbol: 'PiB', name: 'pebibyte', bits: 8 * 2 ** 50, system: 'binary' },
]

/** Transfer rates: bits per second (network) and bytes per second (downloads, disks). */
export const RATE_UNITS: readonly DataUnit[] = [
	{ id: 'bps', symbol: 'bps', name: 'bits por segundo', bits: 1, system: 'bit' },
	{ id: 'kbps', symbol: 'kbps', name: 'quilobits por segundo', bits: 1e3, system: 'bit' },
	{ id: 'Mbps', symbol: 'Mbps', name: 'megabits por segundo', bits: 1e6, system: 'bit' },
	{ id: 'Gbps', symbol: 'Gbps', name: 'gigabits por segundo', bits: 1e9, system: 'bit' },
	{ id: 'Tbps', symbol: 'Tbps', name: 'terabits por segundo', bits: 1e12, system: 'bit' },
	{ id: 'Bps', symbol: 'B/s', name: 'bytes por segundo', bits: 8, system: 'decimal' },
	{ id: 'kBps', symbol: 'kB/s', name: 'quilobytes por segundo', bits: 8e3, system: 'decimal' },
	{ id: 'MBps', symbol: 'MB/s', name: 'megabytes por segundo', bits: 8e6, system: 'decimal' },
	{ id: 'GBps', symbol: 'GB/s', name: 'gigabytes por segundo', bits: 8e9, system: 'decimal' },
	{
		id: 'KiBps',
		symbol: 'KiB/s',
		name: 'kibibytes por segundo',
		bits: 8 * 2 ** 10,
		system: 'binary',
	},
	{
		id: 'MiBps',
		symbol: 'MiB/s',
		name: 'mebibytes por segundo',
		bits: 8 * 2 ** 20,
		system: 'binary',
	},
	{
		id: 'GiBps',
		symbol: 'GiB/s',
		name: 'gibibytes por segundo',
		bits: 8 * 2 ** 30,
		system: 'binary',
	},
]

export function findUnit(units: readonly DataUnit[], id: string): DataUnit {
	const unit = units.find((candidate) => candidate.id === id)
	if (!unit) throw new Error(`Unidade desconhecida: ${id}.`)
	return unit
}

/** Converts `value` in unit `from` into every unit of the list. */
export function convertAll(
	value: number,
	from: string,
	units: readonly DataUnit[] = DATA_UNITS,
): Array<{ unit: DataUnit; value: number }> {
	const bits = value * findUnit(units, from).bits
	return units.map((unit) => ({ unit, value: bits / unit.bits }))
}

/** Bytes as the most readable decimal unit ("1,5 GB") or binary unit ("1,4 GiB"). */
export function formatBytes(bytes: number, system: 'decimal' | 'binary' = 'decimal'): string {
	const base = system === 'decimal' ? 1000 : 1024
	const symbols =
		system === 'decimal'
			? ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB']
			: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB']
	let value = bytes
	let index = 0
	while (Math.abs(value) >= base && index < symbols.length - 1) {
		value /= base
		index++
	}
	return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(value)} ${symbols[index]}`
}

/** Bits per second as bps, kbps, Mbps or Gbps. */
export function formatBitrate(bitsPerSecond: number): string {
	const symbols = ['bps', 'kbps', 'Mbps', 'Gbps', 'Tbps']
	let value = bitsPerSecond
	let index = 0
	while (Math.abs(value) >= 1000 && index < symbols.length - 1) {
		value /= 1000
		index++
	}
	return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(value)} ${symbols[index]}`
}

/* -------------------------------------------- download ---------------------------------------- */

/** Seconds to transfer `bytes` at `bitsPerSecond`, losing `overheadPercent` to protocol overhead. */
export function downloadSeconds(bytes: number, bitsPerSecond: number, overheadPercent = 0): number {
	if (bytes < 0) throw new Error('O tamanho não pode ser negativo.')
	if (!(bitsPerSecond > 0)) throw new Error('A velocidade precisa ser maior que zero.')
	if (overheadPercent < 0 || overheadPercent >= 100)
		throw new Error('A perda (overhead) vai de 0% a menos de 100%.')
	return (bytes * 8) / (bitsPerSecond * (1 - overheadPercent / 100))
}
