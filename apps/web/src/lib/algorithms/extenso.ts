const UNITS = [
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
/** [singular, plural] for each group of three digits above the units. */
const SCALES: [string, string][] = [
	['', ''],
	['mil', 'mil'],
	['milhão', 'milhões'],
	['bilhão', 'bilhões'],
	['trilhão', 'trilhões'],
	['quatrilhão', 'quatrilhões'],
]

/** 0–999 in words ("cento e vinte e três"). */
function hundredsToWords(n: number): string {
	if (n === 100) return 'cem'
	const parts: string[] = []
	const h = Math.floor(n / 100)
	const rest = n % 100
	if (h > 0) parts.push(HUNDREDS[h] ?? '')
	if (rest > 0) {
		if (rest < 20) parts.push(UNITS[rest] ?? '')
		else {
			const t = Math.floor(rest / 10)
			const u = rest % 10
			parts.push(u > 0 ? `${TENS[t]} e ${UNITS[u]}` : (TENS[t] ?? ''))
		}
	}
	return parts.join(' e ')
}

/**
 * Non-negative integer in words, following Brazilian usage: "mil" without "um", and "e" before the
 * last group when it is below 100 or a round hundred ("mil e duzentos", "mil duzentos e cinquenta",
 * "um milhão e cem").
 */
export function integerToWords(value: bigint): string {
	if (value === 0n) return 'zero'
	const groups: number[] = []
	let rest = value
	while (rest > 0n) {
		groups.push(Number(rest % 1000n))
		rest /= 1000n
	}
	if (groups.length > SCALES.length) throw new Error('Número grande demais (até quatrilhões).')

	const words: { text: string; group: number; index: number }[] = []
	for (let index = groups.length - 1; index >= 0; index -= 1) {
		const group = groups[index] ?? 0
		if (group === 0) continue
		const [singular, plural] = SCALES[index] ?? ['', '']
		const number = index === 1 && group === 1 ? '' : hundredsToWords(group)
		const scale = index === 0 ? '' : group === 1 ? singular : plural
		words.push({ text: [number, scale].filter(Boolean).join(' '), group, index })
	}

	return words
		.map((word, i) => {
			if (i === 0) return word.text
			const isLast = i === words.length - 1
			const joinWithE = isLast && (word.group < 100 || word.group % 100 === 0)
			return `${joinWithE ? 'e' : ''} ${word.text}`.trim()
		})
		.join(' ')
		.replace(/ {2,}/g, ' ')
}

export type ExtensoMode = 'number' | 'currency'

/**
 * "1234,56" → "mil duzentos e trinta e quatro vírgula cinquenta e seis" (number) or "mil duzentos e
 * trinta e quatro reais e cinquenta e seis centavos" (currency). Accepts "1.234,56" or "1234.56".
 */
export function numberToWords(input: string, mode: ExtensoMode): string {
	const clean = input.trim().replace(/\s/g, '')
	const negative = clean.startsWith('-')
	// Brazilian format: dots group thousands, the comma is decimal. A lone dot followed by 1–2 digits
	// at the end ("12.5") is read as decimal too.
	const normalized = /,/.test(clean)
		? clean.replace(/^-/, '').replace(/\./g, '').replace(',', '.')
		: /^-?\d+\.\d{1,2}$/.test(clean)
			? clean.replace(/^-/, '')
			: clean.replace(/^-/, '').replace(/\./g, '')
	if (!/^\d+(\.\d+)?$/.test(normalized)) throw new Error('Use apenas números, como 1.234,56.')
	const [intPart = '0', decPart = ''] = normalized.split('.')
	const integer = BigInt(intPart)
	const sign = negative ? 'menos ' : ''

	if (mode === 'currency') {
		const cents = Number(`${decPart}00`.slice(0, 2))
		const reais =
			integer === 0n
				? ''
				: `${integerToWords(integer)}${/(ão|ões)$/.test(integerToWords(integer)) ? ' de' : ''} ${integer === 1n ? 'real' : 'reais'}`
		const centavos =
			cents === 0 ? '' : `${integerToWords(BigInt(cents))} ${cents === 1 ? 'centavo' : 'centavos'}`
		if (!reais && !centavos) return 'zero real'
		return sign + [reais, centavos].filter(Boolean).join(' e ')
	}

	const integerWords = integerToWords(integer)
	if (!decPart || /^0+$/.test(decPart)) return sign + integerWords
	// Decimal part read as a whole number, keeping leading zeros ("1,05" → "um vírgula zero cinco").
	const leadingZeros = decPart.match(/^0+/)?.[0].length ?? 0
	const decimals = [...Array(leadingZeros).fill('zero'), integerToWords(BigInt(decPart))].join(' ')
	return `${sign}${integerWords} vírgula ${decimals}`
}
