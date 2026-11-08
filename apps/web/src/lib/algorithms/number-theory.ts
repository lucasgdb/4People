/* ------------------------------- GCD and LCM ------------------------------- */

const gcdOfPair = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcdOfPair(b, a % b))

export const gcd = (numbers: readonly number[]) => numbers.reduce(gcdOfPair)

export const lcm = (numbers: readonly number[]) =>
	numbers.reduce(
		(accumulated, number) => Math.abs(accumulated * number) / gcdOfPair(accumulated, number),
	)

/* ------------------------------ Factorization ------------------------------ */

export type Factor = { base: number; exponent: number }

function primeFactors(input: number): number[] {
	const factors: number[] = []
	let remaining = input
	for (let divisor = 2; divisor * divisor <= remaining; divisor += 1) {
		while (remaining % divisor === 0) {
			factors.push(divisor)
			remaining /= divisor
		}
	}
	if (remaining > 1) factors.push(remaining)
	return factors
}

/** Groups repeated factors into powers: [2, 2, 3] → 2² × 3. Expects the factors sorted. */
function groupIntoPowers(factors: readonly number[]): Factor[] {
	const powers: Factor[] = []
	for (const base of factors) {
		const previous = powers.at(-1)
		if (previous?.base === base) previous.exponent += 1
		else powers.push({ base, exponent: 1 })
	}
	return powers
}

export function factorize(input: number): { factors: number[]; powers: Factor[] } {
	if (input === 1) return { factors: [1], powers: [{ base: 1, exponent: 1 }] }
	const factors = primeFactors(input)
	return { factors, powers: groupIntoPowers(factors) }
}

/* --------------------------------- Primes --------------------------------- */

export function isPrime(number: number): boolean {
	if (!Number.isInteger(number) || number < 2) return false
	if (number % 2 === 0) return number === 2
	for (let divisor = 3; divisor * divisor <= number; divisor += 2) {
		if (number % divisor === 0) return false
	}
	return true
}

/* ---------------------------- Amicable numbers ---------------------------- */

export function sumOfProperDivisors(number: number): number {
	if (number < 2) return 0
	let sum = 1
	for (let divisor = 2; divisor * divisor <= number; divisor += 1) {
		if (number % divisor !== 0) continue
		sum += divisor
		const pairedDivisor = number / divisor
		if (pairedDivisor !== divisor) sum += pairedDivisor
	}
	return sum
}

export function areFriendly(a: number, b: number) {
	const sumA = sumOfProperDivisors(a)
	const sumB = sumOfProperDivisors(b)
	return { friendly: a !== b && sumA === b && sumB === a, sumA, sumB }
}

/* -------------------------------- Fibonacci ------------------------------- */

export function fibonacci(amount: number): bigint[] {
	const sequence: bigint[] = []
	let current = 0n
	let next = 1n
	for (let index = 0; index < amount; index += 1) {
		sequence.push(current)
		;[current, next] = [next, current + next]
	}
	return sequence
}

/* ----------------------------- Roman numerals ----------------------------- */

const ROMAN_NUMERALS: [number, string][] = [
	[1000, 'M'],
	[900, 'CM'],
	[500, 'D'],
	[400, 'CD'],
	[100, 'C'],
	[90, 'XC'],
	[50, 'L'],
	[40, 'XL'],
	[10, 'X'],
	[9, 'IX'],
	[5, 'V'],
	[4, 'IV'],
	[1, 'I'],
]

/*
 * Convention above 3.999 (vinculum, "barra superior"). Classic Roman numerals stop at MMMCMXCIX;
 * there is no single historical standard beyond it, so this is the convention used here:
 *
 *   1. Up to 3.999 the numeral is the standard one, with M repeated up to three times.
 *   2. From 4.000 up, n = q × 1000 + r (r = n mod 1000): q is written with ONE more bar over each of
 *      its symbols (multiplying it by 1.000), followed by r written normally. q itself follows the
 *      same rule, so it may carry bars of its own: each bar level multiplies by another 1.000.
 *
 *   4.000 = I̅V̅ · 5.000 = V̅ · 1.000.000 = M̅ (1.000 × 1.000) · 4.000.000 = I̅̅V̅̅ · 10⁹ = M̅̅
 *
 * Symbols with b bars are worth value × 1000^b. Bar levels only decrease from left to right, and
 * every group of symbols that share a level is a standard numeral (≤ 3.999 for the leftmost, < 1.000
 * for the others), so each number has exactly one form. All arithmetic is BigInt: no upper limit.
 *
 * In text (copy, search) a bar is the combining overline U+0305 after the symbol, repeated once
 * per level. Fonts stack repeated combining marks unreliably, so the tool draws the bars with CSS
 * from the structured form (`toRomanParts`) and keeps the U+0305 text for copying.
 */

/** Combining overline: one per bar level after each symbol in the text form. */
export const ROMAN_BAR = '̅'

/** A run of symbols that share a bar level (0 = no bar, 1 bar = ×1.000, 2 = ×1.000.000…). */
export type RomanPart = { symbols: string; bars: number }

type BarredSymbol = { symbol: string; bars: number }

const SYMBOL_VALUES: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }

/** Combining marks accepted as bars, and how many bars each one adds. */
const OVERLINE_BARS: Record<string, number> = { '̅': 1, '̄': 1, '̿': 2 }

/** How to write bars, repeated in every error that is about them. */
const BAR_HELP =
	'Para milhares, use barras (I̅V̅), parênteses — cada par vale uma barra: (IV) = 4.000, ((M)) = 1.000.000.000 — ou cole o resultado da conversão.'

/** 1–3.999 as a standard numeral (no bars). */
function standardRoman(value: number): string {
	let remaining = value
	let numeral = ''
	for (const [amount, symbol] of ROMAN_NUMERALS) {
		while (remaining >= amount) {
			numeral += symbol
			remaining -= amount
		}
	}
	return numeral
}

/** A standard numeral (no bars) to its value, without validation. */
function parseStandardRoman(symbols: string): number {
	let total = 0
	for (let index = 0; index < symbols.length; index += 1) {
		const current = SYMBOL_VALUES[symbols[index] ?? ''] ?? 0
		const next = SYMBOL_VALUES[symbols[index + 1] ?? ''] ?? 0
		total += current < next ? -current : current
	}
	return total
}

const withBars = (symbol: string, bars: number) => symbol + ROMAN_BAR.repeat(bars)

/** Accepts a positive integer as number (safe integer) or bigint. */
function toPositiveBigInt(value: number | bigint): bigint {
	if (typeof value === 'number' && !Number.isSafeInteger(value)) {
		throw new Error('Use um número inteiro positivo.')
	}
	const integer = BigInt(value)
	if (integer < 1n) throw new Error('Use um número inteiro positivo (maior que zero).')
	return integer
}

/** The numeral as runs of symbols by bar level, highest level first. */
export function toRomanParts(value: number | bigint): RomanPart[] {
	let remaining = toPositiveBigInt(value)
	// Index = bar level. Iterative, so there is no recursion depth limit.
	const numeralsByLevel: string[] = []
	while (remaining >= 4000n) {
		numeralsByLevel.push(standardRoman(Number(remaining % 1000n)))
		remaining /= 1000n
	}
	numeralsByLevel.push(standardRoman(Number(remaining)))

	const parts: RomanPart[] = []
	for (let bars = numeralsByLevel.length - 1; bars >= 0; bars -= 1) {
		const symbols = numeralsByLevel[bars] ?? ''
		if (symbols) parts.push({ symbols, bars })
	}
	return parts
}

/** Text form: each symbol followed by one U+0305 per bar level. 1–3.999 is the standard numeral. */
export function toRoman(value: number | bigint): string {
	return toRomanParts(value)
		.map(({ symbols, bars }) => [...symbols].map((symbol) => withBars(symbol, bars)).join(''))
		.join('')
}

/**
 * The spoken form the tool gives screen readers, accepted as input too:
 * "IV com 2 barras (× 1.000.000), D com 1 barra (× 1.000), X". Returns null if it isn't one.
 */
function parseSpokenRoman(text: string): BarredSymbol[] | null {
	const segments = text.split(',').map((segment) => segment.trim())
	const symbols: BarredSymbol[] = []
	for (const segment of segments) {
		const match = /^([MDCLXVI]+)(?:\s+COM\s+(\d+)\s+BARRAS?(?:\s*\(\s*×\s*[\d.\s]+\))?)?$/i.exec(
			segment,
		)
		if (!match) return null
		const bars = Number(match[2] ?? 0)
		for (const symbol of (match[1] ?? '').toUpperCase()) symbols.push({ symbol, bars })
	}
	return symbols
}

/** Symbols written with overlines and/or parentheses (each enclosing pair adds one bar). */
function parseWrittenRoman(text: string): BarredSymbol[] {
	const symbols: BarredSymbol[] = []
	let parenthesesDepth = 0
	for (const char of text) {
		if (SYMBOL_VALUES[char] !== undefined) {
			symbols.push({ symbol: char, bars: parenthesesDepth })
		} else if (char === '(') {
			parenthesesDepth += 1
		} else if (char === ')') {
			parenthesesDepth -= 1
			if (parenthesesDepth < 0) throw new Error(`Há um ")" sem "(" correspondente. ${BAR_HELP}`)
		} else if (OVERLINE_BARS[char] !== undefined) {
			const previous = symbols.at(-1)
			if (!previous) throw new Error('A barra precisa vir depois de um símbolo.')
			previous.bars += OVERLINE_BARS[char]
		} else {
			throw new Error(`Use apenas I, V, X, L, C, D e M. ${BAR_HELP}`)
		}
	}
	if (parenthesesDepth === 1) throw new Error('Falta fechar um parêntese.')
	if (parenthesesDepth > 1) throw new Error(`Falta fechar ${parenthesesDepth} parênteses.`)
	return symbols
}

/** Sums each run of symbols that share a bar level, times 1000 per bar. */
function valueOfBarredSymbols(symbols: readonly BarredSymbol[]): bigint {
	let total = 0n
	let runStart = 0
	while (runStart < symbols.length) {
		const bars = symbols[runStart]?.bars ?? 0
		let runEnd = runStart
		while (runEnd < symbols.length && symbols[runEnd]?.bars === bars) runEnd += 1
		const run = symbols
			.slice(runStart, runEnd)
			.map((item) => item.symbol)
			.join('')
		total += BigInt(parseStandardRoman(run)) * 1000n ** BigInt(bars)
		runStart = runEnd
	}
	return total
}

/**
 * Strict parse of a numeral, with or without bars. Bars can be written as:
 *   - combining overlines after each symbol: U+0305 (one bar), U+0304 macron (one), U+033F (two);
 *   - parentheses, each enclosing pair adding one bar: (IV) = 4.000, ((IV))(D) = 4.500.000;
 *   - the spoken form: "IV com 2 barras, D com 1 barra".
 * Rejects anything that is not the single canonical form of its value, e.g. "IIII", "IC" or "M̅M"
 * written for 1.001.000 instead of "M̅I".
 */
export function fromRoman(input: string): bigint {
	const compact = input.normalize('NFD').replace(/\s+/g, '').toUpperCase()
	if (!compact) throw new Error('Informe o número romano.')

	let symbols: BarredSymbol[]
	if (/COM/i.test(input)) {
		const spoken = parseSpokenRoman(input.normalize('NFD').trim())
		if (!spoken) throw new Error(`Não entendi "${input.trim()}". ${BAR_HELP}`)
		symbols = spoken
	} else {
		symbols = parseWrittenRoman(compact)
	}
	if (symbols.length === 0) throw new Error(`Informe o número romano. ${BAR_HELP}`)

	const total = valueOfBarredSymbols(symbols)
	const canonical = total >= 1n ? toRoman(total) : ''
	const written = symbols.map(({ symbol, bars }) => withBars(symbol, bars)).join('')
	if (canonical !== written) {
		throw new Error(`"${input.trim()}" não é um número romano bem formado.`)
	}
	return total
}

/**
 * The number field: a positive integer, digits only or grouped by dots or spaces in threes
 * ("1.000.000"). Rejects zero, negatives, decimals ("1,5") and anything else.
 */
export function parsePositiveInteger(input: string): bigint {
	const text = input.trim()
	if (!text) throw new Error('Informe o número.')
	if (text.startsWith('-')) {
		throw new Error('Use um número positivo: negativos não existem em romanos.')
	}
	if (text.includes(',') || /^\d+\.\d{1,2}$/.test(text)) {
		throw new Error('Use um número inteiro: romanos não têm casas decimais.')
	}
	if (!/^(\d+|\d{1,3}([. ]\d{3})+)$/.test(text)) {
		throw new Error('Use apenas algarismos, como 2026 ou 1.000.000.')
	}
	const value = BigInt(text.replace(/[. ]/g, ''))
	if (value < 1n) throw new Error('Use um número maior que zero: os romanos não têm zero.')
	return value
}

/* ------------------------------ Combinatorics ------------------------------ */

/** n! / (n − k)! as BigInt, exact for any size. */
function fallingFactorial(n: number, k: number): bigint {
	let result = 1n
	for (let index = 0; index < k; index += 1) result *= BigInt(n - index)
	return result
}

const factorial = (n: number) => fallingFactorial(n, n)

export function combinatorics(n: number, k: number) {
	if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0) {
		throw new Error('Use inteiros não negativos.')
	}
	if (k > n) throw new Error('k não pode ser maior que n.')
	const arrangement = fallingFactorial(n, k)
	return {
		/** A(n, k) = n! / (n − k)!: order matters. */
		arrangement,
		/** C(n, k) = n! / (k! (n − k)!): order does not matter. */
		combination: arrangement / factorial(k),
		/** n! */
		permutation: factorial(n),
		/** nᵏ */
		arrangementWithRepetition: BigInt(n) ** BigInt(k),
	}
}
