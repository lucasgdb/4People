/* -------------------------------- MDC / MMC ------------------------------- */

const gcd2 = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd2(b, a % b))

export const gcd = (numbers: readonly number[]) => numbers.reduce((acc, n) => gcd2(acc, n))
export const lcm = (numbers: readonly number[]) =>
	numbers.reduce((acc, n) => Math.abs(acc * n) / gcd2(acc, n))

/* -------------------------------- Fatoração ------------------------------- */

export type Factor = { base: number; exponent: number }

export function factorize(input: number): { factors: number[]; powers: Factor[] } {
	if (input === 1) return { factors: [1], powers: [{ base: 1, exponent: 1 }] }

	const factors: number[] = []
	let n = input
	for (let divisor = 2; divisor * divisor <= n; divisor += 1) {
		while (n % divisor === 0) {
			factors.push(divisor)
			n /= divisor
		}
	}
	if (n > 1) factors.push(n)

	const powers: Factor[] = []
	for (const base of factors) {
		const last = powers.at(-1)
		if (last?.base === base) last.exponent += 1
		else powers.push({ base, exponent: 1 })
	}
	return { factors, powers }
}

/* ---------------------------------- Primos -------------------------------- */

export function isPrime(n: number): boolean {
	if (!Number.isInteger(n) || n < 2) return false
	if (n % 2 === 0) return n === 2
	for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false
	return true
}

/* ---------------------------- Números amigáveis --------------------------- */

export function sumOfProperDivisors(n: number): number {
	if (n < 2) return 0
	let sum = 1
	for (let i = 2; i * i <= n; i += 1) {
		if (n % i === 0) {
			sum += i
			const pair = n / i
			if (pair !== i) sum += pair
		}
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
	let [a, b] = [0n, 1n]
	for (let i = 0; i < amount; i += 1) {
		sequence.push(a)
		;[a, b] = [b, a + b]
	}
	return sequence
}

/* ----------------------------- Números romanos ----------------------------- */

const ROMAN: [number, string][] = [
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
export const ROMAN_BAR = '\u0305'

/** A run of symbols that share a bar level (0 = no bar, worth 1, 1 bar = ×1.000, 2 = ×1.000.000…). */
export type RomanPart = { symbols: string; bars: number }

function standardRoman(value: number): string {
	let rest = value
	let out = ''
	for (const [amount, symbol] of ROMAN) {
		while (rest >= amount) {
			out += symbol
			rest -= amount
		}
	}
	return out
}

/** Accepts a positive integer as number (safe integer) or bigint. */
function toPositiveBigInt(value: number | bigint): bigint {
	if (typeof value === 'number') {
		if (!Number.isSafeInteger(value)) throw new Error('Use um número inteiro positivo.')
		value = BigInt(value)
	}
	if (value < 1n) throw new Error('Use um número inteiro positivo (maior que zero).')
	return value
}

/** The numeral as runs of symbols by bar level, highest level first. */
export function toRomanParts(value: number | bigint): RomanPart[] {
	let rest = toPositiveBigInt(value)
	// Peel off the plain remainder of each level (iteration, not recursion: no depth limit).
	const levels: string[] = []
	while (rest >= 4000n) {
		levels.push(standardRoman(Number(rest % 1000n)))
		rest /= 1000n
	}
	levels.push(standardRoman(Number(rest)))
	const parts: RomanPart[] = []
	for (let bars = levels.length - 1; bars >= 0; bars -= 1) {
		const symbols = levels[bars] ?? ''
		if (symbols) parts.push({ symbols, bars })
	}
	return parts
}

/** Text form: each symbol followed by one U+0305 per bar level. 1–3.999 is the standard numeral. */
export function toRoman(value: number | bigint): string {
	return toRomanParts(value)
		.map(({ symbols, bars }) =>
			bars === 0 ? symbols : [...symbols].map((symbol) => symbol + ROMAN_BAR.repeat(bars)).join(''),
		)
		.join('')
}

const SYMBOL_VALUES: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }

/** A standard numeral (no bars) to its value, without validation. */
function parseStandard(symbols: string): number {
	let total = 0
	for (let i = 0; i < symbols.length; i += 1) {
		const current = SYMBOL_VALUES[symbols[i] ?? ''] ?? 0
		const next = SYMBOL_VALUES[symbols[i + 1] ?? ''] ?? 0
		total += current < next ? -current : current
	}
	return total
}

/** How to write bars, repeated in every error that is about them. */
const BAR_HELP =
	'Para milhares, use barras (I̅V̅), parênteses — cada par vale uma barra: (IV) = 4.000, ((M)) = 1.000.000.000 — ou cole o resultado da conversão.'

/**
 * The spoken form the tool gives screen readers, accepted as input too:
 * "IV com 2 barras (× 1.000.000), D com 1 barra (× 1.000), X". Returns null if it isn't one.
 */
function fromSpoken(text: string): { symbol: string; bars: number }[] | null {
	const segments = text.split(',').map((segment) => segment.trim())
	const out: { symbol: string; bars: number }[] = []
	for (const segment of segments) {
		const match = /^([MDCLXVI]+)(?:\s+COM\s+(\d+)\s+BARRAS?(?:\s*\(\s*×\s*[\d.\s]+\))?)?$/i.exec(
			segment,
		)
		if (!match) return null
		const bars = Number(match[2] ?? 0)
		for (const symbol of (match[1] ?? '').toUpperCase()) out.push({ symbol, bars })
	}
	return out
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
	const text = input.normalize('NFD').replace(/\s+/g, '').toUpperCase()
	if (!text) throw new Error('Informe o número romano.')
	const symbols: { symbol: string; bars: number }[] = /COM/i.test(input)
		? (fromSpoken(input.normalize('NFD').trim()) ??
			(() => {
				throw new Error(`Não entendi "${input.trim()}". ${BAR_HELP}`)
			})())
		: []
	let depth = 0
	if (symbols.length === 0)
		for (const char of text) {
			if (SYMBOL_VALUES[char] !== undefined) symbols.push({ symbol: char, bars: depth })
			else if (char === '(') depth += 1
			else if (char === ')') {
				depth -= 1
				if (depth < 0) throw new Error(`Há um ")" sem "(" correspondente. ${BAR_HELP}`)
			} else if (char === '\u0305' || char === '\u0304' || char === '\u033F') {
				const last = symbols.at(-1)
				if (!last) throw new Error('A barra precisa vir depois de um símbolo.')
				last.bars += char === '\u033F' ? 2 : 1
			} else throw new Error(`Use apenas I, V, X, L, C, D e M. ${BAR_HELP}`)
		}
	if (depth > 0)
		throw new Error(`Falta fechar ${depth === 1 ? 'um parêntese' : `${depth} parênteses`}.`)
	if (symbols.length === 0) throw new Error(`Informe o número romano. ${BAR_HELP}`)
	let total = 0n
	let start = 0
	while (start < symbols.length) {
		const bars = symbols[start]?.bars ?? 0
		let end = start
		while (end < symbols.length && symbols[end]?.bars === bars) end += 1
		const run = symbols
			.slice(start, end)
			.map((item) => item.symbol)
			.join('')
		total += BigInt(parseStandard(run)) * 1000n ** BigInt(bars)
		start = end
	}
	const canonical = total >= 1n ? toRoman(total) : ''
	const written = symbols.map(({ symbol, bars }) => symbol + ROMAN_BAR.repeat(bars)).join('')
	if (canonical !== written)
		throw new Error(`"${input.trim()}" não é um número romano bem formado.`)
	return total
}

/**
 * The number field: a positive integer, digits only or grouped by dots or spaces in threes
 * ("1.000.000"). Rejects zero, negatives, decimals ("1,5") and anything else.
 */
export function parsePositiveInteger(input: string): bigint {
	const text = input.trim()
	if (!text) throw new Error('Informe o número.')
	if (/^-/.test(text)) throw new Error('Use um número positivo: negativos não existem em romanos.')
	if (/[,]/.test(text) || /^\d+\.\d{1,2}$/.test(text))
		throw new Error('Use um número inteiro: romanos não têm casas decimais.')
	if (!/^(\d+|\d{1,3}([. ]\d{3})+)$/.test(text))
		throw new Error('Use apenas algarismos, como 2026 ou 1.000.000.')
	const value = BigInt(text.replace(/[. ]/g, ''))
	if (value < 1n) throw new Error('Use um número maior que zero: os romanos não têm zero.')
	return value
}

/* ------------------------------- Combinatória ------------------------------- */

/** n! / (n − k)! as BigInt, exact for any size. */
function fallingFactorial(n: number, k: number): bigint {
	let result = 1n
	for (let i = 0; i < k; i += 1) result *= BigInt(n - i)
	return result
}

export function combinatorics(n: number, k: number) {
	if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0)
		throw new Error('Use inteiros não negativos.')
	if (k > n) throw new Error('k não pode ser maior que n.')
	const arrangement = fallingFactorial(n, k)
	const combination = arrangement / fallingFactorial(k, k)
	return {
		/** Arranjo simples: A(n, k) = n! / (n − k)! — a ordem importa. */
		arrangement,
		/** Combinação simples: C(n, k) = n! / (k! (n − k)!) — a ordem não importa. */
		combination,
		/** Permutação de n: n! */
		permutation: fallingFactorial(n, n),
		/** Arranjo com repetição: nᵏ. */
		arrangementWithRepetition: BigInt(n) ** BigInt(k),
	}
}
