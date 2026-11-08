/**
 * "Letras diferentes": the same text in Unicode alphabets (Mathematical Alphanumeric Symbols and
 * friends). These alphabets have no accented letters, so accented text is decomposed (NFD): the
 * base letter is converted and its accent is kept as a combining mark on top of it ("ã" → 𝐚 + ◌̃,
 * "ç" → 𝐜 + ◌̧). Characters without a counterpart (punctuation) are kept as typed.
 */

type Alphabet = {
	/** First code point of A–Z, a–z and 0–9 in the target alphabet. */
	upper: number
	lower: number
	digit?: number
	/** Letters that live outside the contiguous block (Unicode reused older symbols for them). */
	exceptions?: Record<string, string>
	space?: string
}

const MATH_ALPHABETS: Record<string, Alphabet> = {
	bold: { upper: 0x1d400, lower: 0x1d41a, digit: 0x1d7ce },
	italic: { upper: 0x1d434, lower: 0x1d44e, exceptions: { h: 'ℎ' } },
	boldItalic: { upper: 0x1d468, lower: 0x1d482 },
	script: {
		upper: 0x1d49c,
		lower: 0x1d4b6,
		exceptions: {
			B: 'ℬ',
			E: 'ℰ',
			F: 'ℱ',
			H: 'ℋ',
			I: 'ℐ',
			L: 'ℒ',
			M: 'ℳ',
			R: 'ℛ',
			e: 'ℯ',
			g: 'ℊ',
			o: 'ℴ',
		},
	},
	boldScript: { upper: 0x1d4d0, lower: 0x1d4ea },
	fraktur: {
		upper: 0x1d504,
		lower: 0x1d51e,
		exceptions: { C: 'ℭ', H: 'ℌ', I: 'ℑ', R: 'ℜ', Z: 'ℨ' },
	},
	doubleStruck: {
		upper: 0x1d538,
		lower: 0x1d552,
		digit: 0x1d7d8,
		exceptions: { C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ' },
	},
	sans: { upper: 0x1d5a0, lower: 0x1d5ba, digit: 0x1d7e2 },
	sansBold: { upper: 0x1d5d4, lower: 0x1d5ee, digit: 0x1d7ec },
	sansItalic: { upper: 0x1d608, lower: 0x1d622 },
	monospace: { upper: 0x1d670, lower: 0x1d68a, digit: 0x1d7f6 },
	fullwidth: { upper: 0xff21, lower: 0xff41, digit: 0xff10, space: '\u3000' },
}

const CIRCLED_ALPHABET: Alphabet = { upper: 0x24b6, lower: 0x24d0 }
const SMALL_CAPS = 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ'
const COMBINING_LONG_STROKE = '\u0336'
const COMBINING_LOW_LINE = '\u0332'

export const FANCY_STYLES = {
	bold: 'Negrito',
	italic: 'Itálico',
	boldItalic: 'Negrito itálico',
	script: 'Cursiva',
	boldScript: 'Cursiva negrito',
	fraktur: 'Gótica',
	doubleStruck: 'Contorno',
	sans: 'Sem serifa',
	sansBold: 'Sem serifa negrito',
	sansItalic: 'Sem serifa itálico',
	monospace: 'Máquina de escrever',
	fullwidth: 'Largura total',
	circled: 'Em círculos',
	smallCaps: 'Versalete',
	strike: 'Riscado',
	underline: 'Sublinhado',
	upsideDown: 'De cabeça para baixo',
} as const

export type FancyStyle = keyof typeof FANCY_STYLES

const offsetFrom = (char: string, first: string) => char.charCodeAt(0) - first.charCodeAt(0)

function mapCharacter(char: string, alphabet: Alphabet): string {
	const exception = alphabet.exceptions?.[char]
	if (exception) return exception
	if (char >= 'A' && char <= 'Z')
		return String.fromCodePoint(alphabet.upper + offsetFrom(char, 'A'))
	if (char >= 'a' && char <= 'z')
		return String.fromCodePoint(alphabet.lower + offsetFrom(char, 'a'))
	if (alphabet.digit !== undefined && char >= '0' && char <= '9') {
		return String.fromCodePoint(alphabet.digit + offsetFrom(char, '0'))
	}
	if (alphabet.space && char === ' ') return alphabet.space
	return char
}

const mapAlphabet = (text: string, alphabet: Alphabet) =>
	[...text].map((char) => mapCharacter(char, alphabet)).join('')

const toSmallCaps = (text: string) =>
	[...text]
		.map((char) => {
			if (!/[a-z]/i.test(char)) return char
			return SMALL_CAPS[offsetFrom(char.toLowerCase(), 'a')] ?? char
		})
		.join('')

const addMarkAfterEach = (text: string, mark: string) =>
	[...text].map((char) => char + mark).join('')

const UPSIDE_DOWN: Record<string, string> = {
	a: 'ɐ',
	b: 'q',
	c: 'ɔ',
	d: 'p',
	e: 'ǝ',
	f: 'ɟ',
	g: 'ƃ',
	h: 'ɥ',
	i: 'ᴉ',
	j: 'ɾ',
	k: 'ʞ',
	l: 'l',
	m: 'ɯ',
	n: 'u',
	o: 'o',
	p: 'd',
	q: 'b',
	r: 'ɹ',
	s: 's',
	t: 'ʇ',
	u: 'n',
	v: 'ʌ',
	w: 'ʍ',
	x: 'x',
	y: 'ʎ',
	z: 'z',
	'.': '˙',
	',': "'",
	'?': '¿',
	'!': '¡',
	'(': ')',
	')': '(',
	'1': 'Ɩ',
	'3': 'Ɛ',
	'6': '9',
	'9': '6',
	'7': 'ㄥ',
}

/** Splits into base characters with their combining marks attached ("ã" → ["a\u0303"]). */
const graphemeClusters = (text: string) => text.match(/\P{M}\p{M}*|\p{M}+/gu) ?? []

/** Reverses whole clusters, so each accent stays on its own letter. */
const toUpsideDown = (text: string) =>
	graphemeClusters(text.toLowerCase())
		.map((cluster) => {
			const base = cluster[0] ?? ''
			return (UPSIDE_DOWN[base] ?? base) + cluster.slice(1)
		})
		.reverse()
		.join('')

export function fancyText(text: string, style: FancyStyle): string {
	const decomposed = text.normalize('NFD')
	switch (style) {
		case 'circled':
			return mapAlphabet(decomposed, CIRCLED_ALPHABET)
		case 'smallCaps':
			return toSmallCaps(decomposed)
		case 'strike':
			return addMarkAfterEach(text, COMBINING_LONG_STROKE)
		case 'underline':
			return addMarkAfterEach(text, COMBINING_LOW_LINE)
		case 'upsideDown':
			return toUpsideDown(decomposed)
		default:
			return mapAlphabet(decomposed, MATH_ALPHABETS[style] as Alphabet)
	}
}
