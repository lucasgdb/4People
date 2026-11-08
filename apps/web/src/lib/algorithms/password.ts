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
	const firstCharPool =
		firstChar === 'special' ? `${CHARSETS.special}${additionalChars}` : CHARSETS[firstChar]

	let password = firstCharPool[randomInt(firstCharPool.length)] ?? ''
	if (pool.length === 0) return password

	// With 1 or 2 characters to draw from, avoiding neighbours could loop forever.
	const canAvoidNeighbours = pool.length > 2

	while (password.length < length) {
		const previous = password.at(-1) ?? ''
		const next = pool[randomInt(pool.length)] ?? ''
		if (canAvoidNeighbours && excludeEqualChars && next === previous) continue
		if (canAvoidNeighbours && excludeSimilarChars && SIMILAR_PAIRS.has(previous + next)) continue
		password += next
	}

	return password
}

/* -------------------------------- Easy to remember ------------------------------ */

/**
 * Pronounceable "words" made of consonant + vowel syllables (ba, te, ri…). No dictionary to ship,
 * and each 3-syllable word is one of 16³ × 5³ = 512,000, about 19 bits of entropy.
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

const randomChar = (chars: string) => chars[randomInt(chars.length)] ?? ''

function pronounceableWord(): string {
	let word = ''
	for (let syllable = 0; syllable < SYLLABLES_PER_WORD; syllable += 1) {
		word += randomChar(CONSONANTS) + randomChar(VOWELS)
	}
	return word
}

const capitalizeWord = (word: string) => word[0]?.toUpperCase() + word.slice(1)

export function generatePassphrase({ words, separator, capitalize, number }: PassphraseOptions) {
	const wordList = Array.from({ length: words }, () => {
		const word = pronounceableWord()
		return capitalize ? capitalizeWord(word) : word
	})
	if (number) {
		const wordIndex = randomInt(wordList.length)
		wordList[wordIndex] = `${wordList[wordIndex]}${randomInt(10)}${randomInt(10)}`
	}
	return wordList.join(PASSPHRASE_SEPARATORS[separator])
}

/* ------------------------------------- PIN ------------------------------------- */

/** All digits equal (0000), a straight run (1234, 9876) or a repeated pair (1212). */
export function isObviousPin(pin: string): boolean {
	const allEqual = /^(\d)\1+$/.test(pin)
	if (allEqual) return true

	const digits = [...pin].map(Number)
	const steps = digits.slice(1).map((digit, index) => digit - (digits[index] ?? 0))
	const isAscendingRun = steps.every((step) => step === 1)
	const isDescendingRun = steps.every((step) => step === -1)
	if (isAscendingRun || isDescendingRun) return true

	const isRepeatedPair = pin.length >= 4 && /^(\d\d)\1+\d?$/.test(pin)
	return isRepeatedPair
}

export function generatePin(length: number, avoidObvious: boolean): string {
	for (;;) {
		const pin = Array.from({ length }, () => randomInt(10)).join('')
		if (!avoidObvious || !isObviousPin(pin)) return pin
	}
}

/* ----------------------------------- Entropy ----------------------------------- */

/** Bits of entropy of a random password: first character from its own pool, the rest from `pool`. */
export function randomPasswordBits(length: number, firstPoolSize: number, poolSize: number) {
	if (length < 1 || poolSize < 1) return 0
	return Math.log2(Math.max(1, firstPoolSize)) + (length - 1) * Math.log2(poolSize)
}

export function passphraseBits({ words, number }: Pick<PassphraseOptions, 'words' | 'number'>) {
	const bitsPerWord = SYLLABLES_PER_WORD * Math.log2(CONSONANTS.length * VOWELS.length)
	// The number adds its 100 values and the choice of which word carries it.
	const numberBits = number ? Math.log2(100) + Math.log2(words) : 0
	return words * bitsPerWord + numberBits
}

export const pinBits = (length: number) => length * Math.log2(10)

export type PasswordStrength = 'Muito fraca' | 'Fraca' | 'Razoável' | 'Forte' | 'Muito forte'

/** Each label applies below its bit limit; anything above the last one is "Muito forte". */
const STRENGTH_BIT_LIMITS: ReadonlyArray<[bitLimit: number, label: PasswordStrength]> = [
	[28, 'Muito fraca'],
	[36, 'Fraca'],
	[60, 'Razoável'],
	[100, 'Forte'],
]

const GUESSES_PER_SECOND = 1e10

/**
 * Strength from entropy (the generator knows exactly how the password was made). Time to crack:
 * half the space at 10 billion guesses per second, an offline attack on a fast hash.
 */
export function strengthFromBits(bits: number): {
	label: PasswordStrength
	score: number
	crackSeconds: number
} {
	const limit = STRENGTH_BIT_LIMITS.find(([bitLimit]) => bits < bitLimit)
	return {
		label: limit ? limit[1] : 'Muito forte',
		score: Math.max(4, Math.min(100, Math.round(bits))),
		crackSeconds: 2 ** bits / 2 / GUESSES_PER_SECOND,
	}
}

/** "instantâneo", "3 horas", "200 anos", "mais que a idade do universo". */
export function formatCrackTime(seconds: number): string {
	if (seconds < 1) return 'instantâneo'
	// `size` is how many of a unit make the next one; 1.38e10 years is the age of the universe.
	const units: [size: number, singular: string, plural: string][] = [
		[60, 'segundo', 'segundos'],
		[60, 'minuto', 'minutos'],
		[24, 'hora', 'horas'],
		[365.25, 'dia', 'dias'],
		[1.38e10, 'ano', 'anos'],
	]
	let value = seconds
	for (const [size, singular, plural] of units) {
		if (value < size) {
			const rounded = Math.floor(value)
			return `${new Intl.NumberFormat('pt-BR').format(rounded)} ${rounded === 1 ? singular : plural}`
		}
		value /= size
	}
	return 'mais que a idade do universo'
}
