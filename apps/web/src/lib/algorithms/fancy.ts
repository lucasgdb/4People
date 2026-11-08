/**
 * "Letras diferentes": the same text in Unicode alphabets (Mathematical Alphanumeric Symbols and
 * friends). These alphabets have no accented letters, so accented text is decomposed (NFD): the
 * base letter is converted and its accent is kept as a combining mark on top of it ("ã" → 𝐚 + ◌̃,
 * "ç" → 𝐜 + ◌̧). Characters without a counterpart (punctuation) are kept as typed.
 */

type Alphabet = {
	upper: number
	lower: number
	digit?: number
	exceptions?: Record<string, string>
}

const MATH: Record<string, Alphabet> = {
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
	fullwidth: { upper: 0xff21, lower: 0xff41, digit: 0xff10 },
}

const CIRCLED: Alphabet = { upper: 0x24b6, lower: 0x24d0 }
const SMALL_CAPS = 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ'

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

function mapAlphabet(text: string, alphabet: Alphabet): string {
	return [...text]
		.map((char) => {
			const exception = alphabet.exceptions?.[char]
			if (exception) return exception
			const code = char.charCodeAt(0)
			if (char >= 'A' && char <= 'Z') return String.fromCodePoint(alphabet.upper + code - 65)
			if (char >= 'a' && char <= 'z') return String.fromCodePoint(alphabet.lower + code - 97)
			if (alphabet.digit !== undefined && char >= '0' && char <= '9')
				return String.fromCodePoint(alphabet.digit + code - 48)
			if (alphabet === MATH.fullwidth && char === ' ') return '　'
			return char
		})
		.join('')
}

const UPSIDE: Record<string, string> = {
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
const clusters = (text: string) => text.match(/\P{M}\p{M}*|\p{M}+/gu) ?? []

export function fancyText(text: string, style: FancyStyle): string {
	// Decomposed: the alphabets map the base letter and pass the accent mark through unchanged.
	const base = text.normalize('NFD')
	switch (style) {
		case 'circled':
			return mapAlphabet(base, CIRCLED)
		case 'smallCaps':
			return [...base]
				.map((c) => (/[a-z]/i.test(c) ? (SMALL_CAPS[c.toLowerCase().charCodeAt(0) - 97] ?? c) : c))
				.join('')
		case 'strike':
			return [...text].map((c) => `${c}̶`).join('')
		case 'underline':
			return [...text].map((c) => `${c}̲`).join('')
		case 'upsideDown':
			// Reverse whole clusters so each accent stays on its own letter.
			return clusters(base.toLowerCase())
				.map((cluster) => (UPSIDE[cluster[0] ?? ''] ?? cluster[0] ?? '') + cluster.slice(1))
				.reverse()
				.join('')
		default:
			return mapAlphabet(base, MATH[style] as Alphabet)
	}
}
