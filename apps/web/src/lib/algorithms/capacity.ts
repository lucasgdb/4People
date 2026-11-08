/**
 * Capacity planning math: SLA availability and downtime, error budgets, website bandwidth,
 * download time and data-size / data-rate units.
 */

// Numbers

/** "1.234,5", "1234.5", "1,5" → number; empty or invalid → null. */
export function parseNumber(raw: string): number | null {
	const text = raw.trim().replace(/%$/, '').replace(/\s/g, '')
	if (!text) return null
	const normalized = /,\d*$/.test(text) ? text.replace(/\./g, '').replace(',', '.') : text
	if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(normalized)) return null
	const value = Number(normalized)
	return Number.isFinite(value) ? value : null
}

const significantFormat = new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 10 })
const scientificFormat = new Intl.NumberFormat('pt-BR', {
	notation: 'scientific',
	maximumSignificantDigits: 6,
})

/** Up to 10 significant digits; scientific notation for very large or very small values. */
export function formatSignificant(value: number): string {
	if (value === 0) return '0'
	const magnitude = Math.abs(value)
	if (magnitude >= 1e18 || magnitude < 1e-9) return scientificFormat.format(value)
	return significantFormat.format(value)
}

/** (100 − percent) / 100 without float noise: 100 − 99.95 is 0.0500000…, not 0.04999999999999716. */
export function unavailability(percent: number): number {
	return Number((100 - percent).toFixed(10)) / 100
}

// Durations

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

const oneDecimalFormat = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 })

const TENTHS_PER_MINUTE = 600
const TENTHS_PER_HOUR = 60 * TENTHS_PER_MINUTE
const TENTHS_PER_DAY = 24 * TENTHS_PER_HOUR

/** 31557.6 → "8h 45min 57,6s"; under one second → milliseconds. Rounded to tenths of a second. */
export function formatDuration(seconds: number): string {
	if (!Number.isFinite(seconds)) return '∞'
	if (seconds <= 0) return '0s'
	if (seconds < 1) return `${oneDecimalFormat.format(seconds * 1000)}ms`
	const tenths = Math.round(seconds * 10)
	const days = Math.floor(tenths / TENTHS_PER_DAY)
	const hours = Math.floor((tenths % TENTHS_PER_DAY) / TENTHS_PER_HOUR)
	const minutes = Math.floor((tenths % TENTHS_PER_HOUR) / TENTHS_PER_MINUTE)
	const remainingSeconds = (tenths % TENTHS_PER_MINUTE) / 10
	const parts: string[] = []
	if (days) parts.push(`${days.toLocaleString('pt-BR')}d`)
	if (hours) parts.push(`${hours}h`)
	if (minutes) parts.push(`${minutes}min`)
	if (remainingSeconds) parts.push(`${oneDecimalFormat.format(remainingSeconds)}s`)
	return parts.join(' ')
}

/** Clock format "h:mm:ss" (hours keep counting past 24), rounded to the nearest second. */
export function formatHms(seconds: number): string {
	if (!Number.isFinite(seconds)) return '∞'
	const totalSeconds = Math.max(0, Math.round(seconds))
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const remainingSeconds = totalSeconds % 60
	const twoDigits = (value: number) => String(value).padStart(2, '0')
	return `${hours.toLocaleString('pt-BR')}:${twoDigits(minutes)}:${twoDigits(remainingSeconds)}`
}

// SLA

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
export function compositeAvailability(
	availabilities: readonly number[],
	mode: 'series' | 'parallel',
): number {
	if (availabilities.length === 0) throw new Error('Informe pelo menos uma disponibilidade.')
	for (const availability of availabilities) assertPercent(availability)
	if (mode === 'series') {
		const allUp = availabilities.reduce((product, percent) => product * (percent / 100), 1)
		return 100 * allUp
	}
	const allDown = availabilities.reduce((product, percent) => product * unavailability(percent), 1)
	return 100 * (1 - allDown)
}

/** "99.9, 99,95; 99.99" → numbers. A comma is a decimal separator only when digits follow it. */
export function parsePercentList(text: string): number[] | null {
	const tokens = text
		.split(/[\s;]+|,(?!\d)/)
		.map((token) => token.trim())
		.filter(Boolean)
	if (tokens.length === 0) return null
	const percentages = tokens.map(parseNumber)
	const allValid = percentages.every(
		(percent): percent is number => percent !== null && percent >= 0 && percent <= 100,
	)
	return allValid ? percentages : null
}

// Units

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

const DECIMAL_BYTE_SYMBOLS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB']
const BINARY_BYTE_SYMBOLS = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB']
const BITRATE_SYMBOLS = ['bps', 'kbps', 'Mbps', 'Gbps', 'Tbps']

const twoDecimalsFormat = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 })

/** Divides by `base` while the value is at least one of the next unit: 1500 → "1,5 k…". */
function formatScaled(value: number, base: number, symbols: readonly string[]): string {
	let scaled = value
	let symbolIndex = 0
	while (Math.abs(scaled) >= base && symbolIndex < symbols.length - 1) {
		scaled /= base
		symbolIndex++
	}
	return `${twoDecimalsFormat.format(scaled)} ${symbols[symbolIndex]}`
}

/** Bytes as the most readable decimal unit ("1,5 GB") or binary unit ("1,4 GiB"). */
export function formatBytes(bytes: number, system: 'decimal' | 'binary' = 'decimal'): string {
	if (system === 'binary') return formatScaled(bytes, 1024, BINARY_BYTE_SYMBOLS)
	return formatScaled(bytes, 1000, DECIMAL_BYTE_SYMBOLS)
}

/** Bits per second as bps, kbps, Mbps, Gbps or Tbps. */
export function formatBitrate(bitsPerSecond: number): string {
	return formatScaled(bitsPerSecond, 1000, BITRATE_SYMBOLS)
}

// Download

/** Seconds to transfer `bytes` at `bitsPerSecond`, losing `overheadPercent` to protocol overhead. */
export function downloadSeconds(bytes: number, bitsPerSecond: number, overheadPercent = 0): number {
	if (bytes < 0) throw new Error('O tamanho não pode ser negativo.')
	if (!(bitsPerSecond > 0)) throw new Error('A velocidade precisa ser maior que zero.')
	if (overheadPercent < 0 || overheadPercent >= 100)
		throw new Error('A perda (overhead) vai de 0% a menos de 100%.')
	const effectiveBitsPerSecond = bitsPerSecond * (1 - overheadPercent / 100)
	return (bytes * 8) / effectiveBitsPerSecond
}
