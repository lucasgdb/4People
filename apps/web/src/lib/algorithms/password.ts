import { randomInt } from './random.ts'

export const CHARSETS = {
	number: '0123456789',
	upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	lowerCase: 'abcdefghijklmnopqrstuvwxyz',
	special: '!@#$%&*()=[]{}',
} as const

export type CharsetKey = keyof typeof CHARSETS

const SIMILAR_PAIRS = new Set([
	'il',
	'li',
	'oO',
	'Oo',
	'0O',
	'O0',
	'0o',
	'o0',
	'Ii',
	'iI',
	'lL',
	'Ll',
	'ji',
	'ij',
	'lj',
	'jl',
	'l1',
	'1l',
	'gq',
	'qg',
])

export type PasswordOptions = {
	length: number
	firstChar: CharsetKey
	charsets: readonly CharsetKey[]
	additionalChars?: string
	excludeEqualChars?: boolean
	excludeSimilarChars?: boolean
}

export function generatePassword({
	length,
	firstChar,
	charsets,
	additionalChars = '',
	excludeEqualChars = true,
	excludeSimilarChars = true,
}: PasswordOptions): string {
	const pool = [...new Set([...charsets.map((key) => CHARSETS[key]).join(''), ...additionalChars])]
	const firstPool =
		firstChar === 'special' ? `${CHARSETS.special}${additionalChars}` : CHARSETS[firstChar]

	let password = firstPool[randomInt(firstPool.length)] ?? ''
	if (pool.length === 0) return password

	// Guard against impossible constraints (e.g. pool with a single char).
	const canAvoid = pool.length > 2

	while (password.length < length) {
		const previous = password.at(-1) ?? ''
		const char = pool[randomInt(pool.length)] ?? ''
		if (canAvoid && excludeEqualChars && char === previous) continue
		if (canAvoid && excludeSimilarChars && SIMILAR_PAIRS.has(previous + char)) continue
		password += char
	}

	return password
}

/* -------------------------------- Fácil de lembrar ------------------------------ */

/**
 * Pronounceable "words" made of consonant + vowel syllables (ba, te, ri…). No dictionary to ship,
 * and each 3-syllable word is one of 16³ × 5³ = 512.000, about 19 bits of entropy.
 */
const CONSONANTS = 'bcdfghjlmnprstvz'
const VOWELS = 'aeiou'
const SYLLABLES_PER_WORD = 3

export const PASSPHRASE_SEPARATORS = {
	hyphen: '-',
	dot: '.',
	underscore: '_',
	space: ' ',
	none: '',
} as const
export type PassphraseSeparator = keyof typeof PASSPHRASE_SEPARATORS

export type PassphraseOptions = {
	words: number
	separator: PassphraseSeparator
	capitalize: boolean
	/** Appends two random digits to one random word. */
	number: boolean
}

function pronounceableWord(): string {
	let word = ''
	for (let i = 0; i < SYLLABLES_PER_WORD; i += 1)
		word +=
			(CONSONANTS[randomInt(CONSONANTS.length)] ?? '') + (VOWELS[randomInt(VOWELS.length)] ?? '')
	return word
}

export function generatePassphrase({ words, separator, capitalize, number }: PassphraseOptions) {
	const list = Array.from({ length: words }, () => {
		const word = pronounceableWord()
		return capitalize ? word[0]?.toUpperCase() + word.slice(1) : word
	})
	if (number) {
		const at = randomInt(list.length)
		list[at] = `${list[at]}${randomInt(10)}${randomInt(10)}`
	}
	return list.join(PASSPHRASE_SEPARATORS[separator])
}

/* ------------------------------------- PIN ------------------------------------- */

/** All digits equal (0000), a straight run (1234, 9876) or a repeated pair (1212). */
export function isObviousPin(pin: string): boolean {
	if (/^(\d)\1+$/.test(pin)) return true
	const digits = [...pin].map(Number)
	const steps = digits.slice(1).map((digit, i) => digit - (digits[i] ?? 0))
	if (steps.every((step) => step === 1) || steps.every((step) => step === -1)) return true
	return pin.length >= 4 && /^(\d\d)\1+\d?$/.test(pin)
}

export function generatePin(length: number, avoidObvious: boolean): string {
	for (;;) {
		const pin = Array.from({ length }, () => randomInt(10)).join('')
		if (!avoidObvious || !isObviousPin(pin)) return pin
	}
}

/* ---------------------------------- Entropia ---------------------------------- */

/** Bits of entropy of a random password: first character from its own pool, the rest from `pool`. */
export function randomPasswordBits(length: number, firstPoolSize: number, poolSize: number) {
	if (length < 1 || poolSize < 1) return 0
	return Math.log2(Math.max(1, firstPoolSize)) + (length - 1) * Math.log2(poolSize)
}

export function passphraseBits({ words, number }: Pick<PassphraseOptions, 'words' | 'number'>) {
	const perWord = SYLLABLES_PER_WORD * Math.log2(CONSONANTS.length * VOWELS.length)
	return words * perWord + (number ? Math.log2(100) + Math.log2(words) : 0)
}

export const pinBits = (length: number) => length * Math.log2(10)

export type PasswordStrength = 'Muito fraca' | 'Fraca' | 'Razoável' | 'Forte' | 'Muito forte'

/**
 * Strength from entropy (the generator knows exactly how the password was made). Time to crack:
 * half the space at 10 billion guesses per second, an offline attack on a fast hash.
 */
export function strengthFromBits(bits: number): {
	label: PasswordStrength
	score: number
	crackSeconds: number
} {
	const label: PasswordStrength =
		bits < 28
			? 'Muito fraca'
			: bits < 36
				? 'Fraca'
				: bits < 60
					? 'Razoável'
					: bits < 100
						? 'Forte'
						: 'Muito forte'
	return {
		label,
		score: Math.max(4, Math.min(100, Math.round(bits))),
		crackSeconds: 2 ** bits / 2 / 1e10,
	}
}

/** "instantâneo", "3 horas", "200 anos", "mais que a idade do universo". */
export function formatCrackTime(seconds: number): string {
	if (seconds < 1) return 'instantâneo'
	const units: [number, string, string][] = [
		[60, 'segundo', 'segundos'],
		[60, 'minuto', 'minutos'],
		[24, 'hora', 'horas'],
		[365.25, 'dia', 'dias'],
		[1.38e10, 'ano', 'anos'],
	]
	let value = seconds
	for (const [size, one, many] of units) {
		if (value < size) {
			const rounded = Math.floor(value)
			return `${new Intl.NumberFormat('pt-BR').format(rounded)} ${rounded === 1 ? one : many}`
		}
		value /= size
	}
	return 'mais que a idade do universo'
}
