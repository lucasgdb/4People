import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { integerToWords, numberToWords } from './extenso.ts'

const w = (n: number | bigint) => integerToWords(BigInt(n))

describe('número por extenso', () => {
	it('units, tens and hundreds', () => {
		assert.equal(w(0), 'zero')
		assert.equal(w(15), 'quinze')
		assert.equal(w(21), 'vinte e um')
		assert.equal(w(100), 'cem')
		assert.equal(w(101), 'cento e um')
		assert.equal(w(999), 'novecentos e noventa e nove')
	})
	it('thousands and the "e" between groups', () => {
		assert.equal(w(1000), 'mil')
		assert.equal(w(1001), 'mil e um')
		assert.equal(w(1200), 'mil e duzentos')
		assert.equal(w(1250), 'mil duzentos e cinquenta')
		assert.equal(w(2026), 'dois mil e vinte e seis')
		assert.equal(w(21_000), 'vinte e um mil')
		assert.equal(w(100_000), 'cem mil')
		assert.equal(w(101_101), 'cento e um mil cento e um')
	})
	it('millions and beyond', () => {
		assert.equal(w(1_000_000), 'um milhão')
		assert.equal(w(1_000_100), 'um milhão e cem')
		assert.equal(w(2_500_000), 'dois milhões e quinhentos mil')
		assert.equal(w(1_001_000), 'um milhão e mil')
		assert.equal(w(3_000_000_000n), 'três bilhões')
	})
	it('currency', () => {
		assert.equal(
			numberToWords('1.234,56', 'currency'),
			'mil duzentos e trinta e quatro reais e cinquenta e seis centavos',
		)
		assert.equal(numberToWords('1', 'currency'), 'um real')
		assert.equal(numberToWords('0,01', 'currency'), 'um centavo')
		assert.equal(numberToWords('1000000', 'currency'), 'um milhão de reais')
		assert.equal(
			numberToWords('2.000.000,50', 'currency'),
			'dois milhões de reais e cinquenta centavos',
		)
		assert.equal(numberToWords('0', 'currency'), 'zero real')
	})
	it('decimals and negatives', () => {
		assert.equal(numberToWords('3,14', 'number'), 'três vírgula quatorze')
		assert.equal(numberToWords('1,05', 'number'), 'um vírgula zero cinco')
		assert.equal(numberToWords('-42', 'number'), 'menos quarenta e dois')
		assert.equal(numberToWords('12.5', 'number'), 'doze vírgula cinco')
		assert.throws(() => numberToWords('abc', 'number'))
	})
})
