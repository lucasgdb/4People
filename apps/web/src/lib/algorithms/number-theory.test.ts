import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
	areFriendly,
	combinatorics,
	factorize,
	fibonacci,
	fromRoman,
	gcd,
	isPrime,
	lcm,
	parsePositiveInteger,
	ROMAN_BAR,
	toRoman,
	toRomanParts,
} from './number-theory.ts'

describe('number theory', () => {
	it('gcd / lcm', () => {
		assert.equal(gcd([12, 18, 24]), 6)
		assert.equal(lcm([4, 6, 10]), 60)
	})
	it('factorize', () => {
		assert.deepEqual(factorize(360).powers, [
			{ base: 2, exponent: 3 },
			{ base: 3, exponent: 2 },
			{ base: 5, exponent: 1 },
		])
		assert.deepEqual(factorize(97).factors, [97])
	})
	it('primes, friendly numbers, fibonacci', () => {
		assert.deepEqual([1, 2, 3, 4, 17, 21].filter(isPrime), [2, 3, 17])
		assert.equal(areFriendly(220, 284).friendly, true)
		assert.equal(areFriendly(220, 285).friendly, false)
		assert.deepEqual(fibonacci(8), [0n, 1n, 1n, 2n, 3n, 5n, 8n, 13n])
	})
	it('roman numerals round-trip and reject malformed input', () => {
		assert.equal(toRoman(1994), 'MCMXCIV')
		assert.equal(toRoman(3999), 'MMMCMXCIX')
		assert.equal(fromRoman('mcmxciv'), 1994n)
		assert.throws(() => fromRoman('IIII'))
		assert.throws(() => fromRoman('IC'))
		assert.throws(() => toRoman(0))
	})
	it('combinatorics is exact', () => {
		const { arrangement, combination, permutation, arrangementWithRepetition } = combinatorics(
			10,
			3,
		)
		assert.equal(arrangement, 720n)
		assert.equal(combination, 120n)
		assert.equal(permutation, 3628800n)
		assert.equal(arrangementWithRepetition, 1000n)
		assert.equal(combinatorics(60, 6).combination, 50063860n) // Mega-Sena
		assert.throws(() => combinatorics(3, 5))
	})
})

/** Bars in text form: each symbol followed by U+0305 per level. */
const bar = (symbols: string, levels = 1) =>
	[...symbols].map((symbol) => symbol + ROMAN_BAR.repeat(levels)).join('')

/** Reference implementation of the standard numeral, used as the oracle for 1–3.999. */
function legacyRoman(value: number): string {
	const table: [number, string][] = [
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
	let rest = value
	let out = ''
	for (const [amount, symbol] of table)
		while (rest >= amount) {
			out += symbol
			rest -= amount
		}
	return out
}

describe('roman numerals above 3.999 (vinculum)', () => {
	it('1–3.999 is exactly what it was before, both ways', () => {
		for (let n = 1; n <= 3999; n += 1) {
			assert.equal(toRoman(n), legacyRoman(n))
			assert.equal(fromRoman(legacyRoman(n)), BigInt(n))
		}
	})

	it('the old limit and the transition to 4.000', () => {
		assert.equal(toRoman(3999), 'MMMCMXCIX')
		assert.equal(toRoman(4000), bar('IV'))
		assert.equal(toRoman(4001), `${bar('IV')}I`)
		assert.equal(toRoman(3999n), 'MMMCMXCIX')
		assert.deepEqual(toRomanParts(4000), [{ symbols: 'IV', bars: 1 }])
	})

	it('the documented examples', () => {
		assert.equal(toRoman(5000), bar('V'))
		assert.equal(toRoman(10_000), bar('X'))
		assert.equal(toRoman(100_000), bar('C'))
		assert.equal(toRoman(1_000_000), bar('M'))
		assert.equal(toRoman(4_500_000), `${bar('IV', 2)}${bar('D')}`)
		assert.equal(toRoman(1_003_500), `${bar('MIII')}D`)
		assert.equal(toRoman(2026_000), `${bar('MMXXVI')}`)
	})

	it('millions and billions, with several bar levels', () => {
		assert.equal(toRoman(1_000_000_000n), bar('M', 2))
		assert.equal(toRoman(1_000_000_000_000n), bar('M', 3))
		assert.deepEqual(toRomanParts(3_999_999_999n), [
			{ symbols: 'MMMCMXCIX', bars: 2 },
			{ symbols: 'CMXCIX', bars: 1 },
			{ symbols: 'CMXCIX', bars: 0 },
		])
		assert.deepEqual(toRomanParts(7_000_000_005n), [
			{ symbols: 'VII', bars: 3 },
			{ symbols: 'V', bars: 0 },
		])
		assert.equal(fromRoman(toRoman(123_456_789n)), 123_456_789n)
	})

	it('numbers with dozens and hundreds of digits stay exact (no overflow)', () => {
		const huge = [
			10n ** 30n,
			2n ** 64n,
			2n ** 64n + 1n,
			BigInt(Number.MAX_SAFE_INTEGER) + 2n,
			BigInt(`9${'0'.repeat(99)}7`),
			BigInt('123456789'.repeat(23)),
			10n ** 300n - 1n,
		]
		for (const n of huge) assert.equal(fromRoman(toRoman(n)), n)
		// 10^300 − 1 has 300 nines: 100 levels of CMXCIX, the top one with 99 bars.
		const parts = toRomanParts(10n ** 300n - 1n)
		assert.equal(parts.length, 100)
		assert.deepEqual(parts[0], { symbols: 'CMXCIX', bars: 99 })
		assert.deepEqual(parts.at(-1), { symbols: 'CMXCIX', bars: 0 })
		// Above MAX_SAFE_INTEGER the low digits still survive (a Number would round them away).
		assert.equal(toRomanParts(9_007_199_254_740_993n).at(-1)?.symbols, 'CMXCIII')
	})

	it('random values round-trip', () => {
		let seed = 7n
		for (let i = 0; i < 300; i += 1) {
			seed = (seed * 6364136223846793005n + 1442695040888963407n) % 2n ** 64n
			const n = (seed % 10n ** BigInt(1 + (i % 40))) + 1n
			assert.equal(fromRoman(toRoman(n)), n)
		}
	})

	it('reads bars as U+0305, U+0304 (macron) or U+033F (double), and rejects non-canonical forms', () => {
		assert.equal(fromRoman('I\u0304V\u0304'), 4000n)
		assert.equal(fromRoman('M\u033F'), 1_000_000_000n)
		assert.equal(fromRoman(` ${bar('iv')} `), 4000n)
		assert.throws(() => fromRoman(`${bar('M')}M`), /bem formado/) // 1.001.000 is M̅I
		assert.throws(() => fromRoman(bar('MMMM')), /bem formado/) // 4.000.000 is I̅̅V̅̅
		assert.throws(() => fromRoman(`I${bar('V')}`), /bem formado/) // bars only decrease
		assert.throws(() => fromRoman(bar('I')), /bem formado/) // 1.000 is M
		assert.throws(() => fromRoman('\u0305V'), /depois de um símbolo/)
		assert.throws(() => fromRoman('ABC'), /Use apenas/)
	})

	it('reads bars typed as parentheses (one bar per pair) and the spoken form', () => {
		assert.equal(fromRoman('(IV)'), 4000n)
		assert.equal(fromRoman('((M))'), 1_000_000_000n)
		assert.equal(fromRoman('((IV))(D)'), 4_500_000n)
		assert.equal(fromRoman('(MIII)D'), 1_003_500n)
		assert.equal(fromRoman('(mcmxciv)'), 1_994_000n)
		assert.equal(fromRoman('IV com 1 barra (× 1.000)'), 4000n)
		assert.equal(fromRoman('IV com 2 barras (× 1.000.000), D com 1 barra (× 1.000)'), 4_500_000n)
		assert.equal(fromRoman('M com 11 barras'), 10n ** 36n)
		// Every form gives the same value as the canonical text.
		for (const n of [4000n, 4_500_000n, 10n ** 36n + 7n]) assert.equal(fromRoman(toRoman(n)), n)
		assert.throws(() => fromRoman('(IV'), /Falta fechar/)
		assert.throws(() => fromRoman('IV)'), /sem "\(" correspondente/)
		assert.throws(() => fromRoman('(I)'), /bem formado/) // 1.000 is M
		assert.throws(() => fromRoman('12MM com 12 barras (× 1.000)'), /Não entendi/)
		assert.throws(() => fromRoman('()'), /Informe/)
	})

	it('validates the number field', () => {
		assert.equal(parsePositiveInteger('2026'), 2026n)
		assert.equal(parsePositiveInteger(' 1.000.000 '), 1_000_000n)
		assert.equal(parsePositiveInteger('1 234 567'), 1_234_567n)
		assert.equal(parsePositiveInteger('9'.repeat(200)), 10n ** 200n - 1n)
		assert.throws(() => parsePositiveInteger('0'), /maior que zero/)
		assert.throws(() => parsePositiveInteger('000'), /maior que zero/)
		assert.throws(() => parsePositiveInteger('-5'), /negativos/)
		assert.throws(() => parsePositiveInteger('1,5'), /inteiro/)
		assert.throws(() => parsePositiveInteger('2.5'), /inteiro/)
		assert.throws(() => parsePositiveInteger('1.00.0'), /algarismos/)
		assert.throws(() => parsePositiveInteger('12a'), /algarismos/)
		assert.throws(() => parsePositiveInteger('1e9'), /algarismos/)
		assert.throws(() => parsePositiveInteger(''), /Informe/)
	})
})
