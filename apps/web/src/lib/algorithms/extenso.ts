const BELOW_TWENTY = [
	'zero',
	'um',
	'dois',
	'três',
	'quatro',
	'cinco',
	'seis',
	'sete',
	'oito',
	'nove',
	'dez',
	'onze',
	'doze',
	'treze',
	'quatorze',
	'quinze',
	'dezesseis',
	'dezessete',
	'dezoito',
	'dezenove',
]
const TENS = [
	'',
	'',
	'vinte',
	'trinta',
	'quarenta',
	'cinquenta',
	'sessenta',
	'setenta',
	'oitenta',
	'noventa',
]
const HUNDREDS = [
	'',
	'cento',
	'duzentos',
	'trezentos',
	'quatrocentos',
	'quinhentos',
	'seiscentos',
	'setecentos',
	'oitocentos',
	'novecentos',
]
/** [singular, plural] for each group of three digits, from the units up. */
const SCALES: [string, string][] = [
	['', ''],
	['mil', 'mil'],
	['milhão', 'milhões'],
	['bilhão', 'bilhões'],
	['trilhão', 'trilhões'],
	['quatrilhão', 'quatrilhões'],
]

function belowHundredToWords(value: number): string {
	if (value < 20) return BELOW_TWENTY[value] ?? ''
	const tens = TENS[Math.floor(value / 10)] ?? ''
	const ones = value % 10
	return ones > 0 ? `${tens} e ${BELOW_TWENTY[ones]}` : tens
}

/** 0–999 in words ("cento e vinte e três"). */
function belowThousandToWords(value: number): string {
	if (value === 100) return 'cem'
	const parts: string[] = []
	const hundreds = Math.floor(value / 100)
	const rest = value % 100
	if (hundreds > 0) parts.push(HUNDREDS[hundreds] ?? '')
	if (rest > 0) parts.push(belowHundredToWords(rest))
	return parts.join(' e ')
}

/** Splits into groups of three digits, units group first: 1234567 → [567, 234, 1]. */
function thousandGroups(value: bigint): number[] {
	const groups: number[] = []
	let remaining = value
	while (remaining > 0n) {
		groups.push(Number(remaining % 1000n))
		remaining /= 1000n
	}
	return groups
}

/**
 * Non-negative integer in words, following Brazilian usage: "mil" without "um", and "e" before the
 * last group when it is below 100 or a round hundred ("mil e duzentos", "mil duzentos e cinquenta",
 * "um milhão e cem").
 */
export function integerToWords(value: bigint): string {
	if (value === 0n) return 'zero'
	const groups = thousandGroups(value)
	if (groups.length > SCALES.length) throw new Error('Número grande demais (até quatrilhões).')

	const spokenGroups: { text: string; group: number }[] = []
	for (let scaleIndex = groups.length - 1; scaleIndex >= 0; scaleIndex -= 1) {
		const group = groups[scaleIndex] ?? 0
		if (group === 0) continue
		const [singular, plural] = SCALES[scaleIndex] ?? ['', '']
		const isBareThousand = scaleIndex === 1 && group === 1
		const groupWords = isBareThousand ? '' : belowThousandToWords(group)
		const scaleWord = group === 1 ? singular : plural
		spokenGroups.push({ text: [groupWords, scaleWord].filter(Boolean).join(' '), group })
	}

	const lastIndex = spokenGroups.length - 1
	return spokenGroups
		.map(({ text, group }, index) => {
			const joinWithE = index > 0 && index === lastIndex && (group < 100 || group % 100 === 0)
			return joinWithE ? `e ${text}` : text
		})
		.join(' ')
		.replace(/ {2,}/g, ' ')
}

export type ExtensoMode = 'number' | 'currency'

/**
 * Brazilian format: dots group thousands and the comma is the decimal separator. Without a comma, a
 * single dot followed by 1–2 digits at the end ("12.5") is read as decimal too. Returns the number
 * unsigned, with "." as decimal separator.
 */
function normalizeUnsignedNumber(clean: string): string {
	const unsigned = clean.replace(/^-/, '')
	if (clean.includes(',')) return unsigned.replace(/\./g, '').replace(',', '.')
	if (/^-?\d+\.\d{1,2}$/.test(clean)) return unsigned
	return unsigned.replace(/\./g, '')
}

function currencyToWords(integer: bigint, decimalDigits: string, sign: string): string {
	const cents = Number(`${decimalDigits}00`.slice(0, 2))
	let reais = ''
	if (integer > 0n) {
		const integerWords = integerToWords(integer)
		// "um milhão de reais", but "mil reais".
		const preposition = /(ão|ões)$/.test(integerWords) ? ' de' : ''
		reais = `${integerWords}${preposition} ${integer === 1n ? 'real' : 'reais'}`
	}
	const centavos =
		cents === 0 ? '' : `${integerToWords(BigInt(cents))} ${cents === 1 ? 'centavo' : 'centavos'}`
	if (!reais && !centavos) return 'zero real'
	return sign + [reais, centavos].filter(Boolean).join(' e ')
}

/** Reads the decimal part as a whole number, keeping leading zeros ("1,05" → "zero cinco"). */
function decimalsToWords(decimalDigits: string): string {
	const leadingZeros = decimalDigits.match(/^0+/)?.[0].length ?? 0
	return [...Array(leadingZeros).fill('zero'), integerToWords(BigInt(decimalDigits))].join(' ')
}

/**
 * "1234,56" → "mil duzentos e trinta e quatro vírgula cinquenta e seis" (number) or "mil duzentos e
 * trinta e quatro reais e cinquenta e seis centavos" (currency). Accepts "1.234,56" or "1234.56".
 */
export function numberToWords(input: string, mode: ExtensoMode): string {
	const clean = input.trim().replace(/\s/g, '')
	const sign = clean.startsWith('-') ? 'menos ' : ''
	const normalized = normalizeUnsignedNumber(clean)
	if (!/^\d+(\.\d+)?$/.test(normalized)) throw new Error('Use apenas números, como 1.234,56.')
	const [integerDigits = '0', decimalDigits = ''] = normalized.split('.')
	const integer = BigInt(integerDigits)

	if (mode === 'currency') return currencyToWords(integer, decimalDigits, sign)

	const integerWords = integerToWords(integer)
	if (!decimalDigits || /^0+$/.test(decimalDigits)) return sign + integerWords
	return `${sign}${integerWords} vírgula ${decimalsToWords(decimalDigits)}`
}
