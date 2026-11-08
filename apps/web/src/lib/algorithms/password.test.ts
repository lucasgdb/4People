import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
	formatCrackTime,
	generatePassphrase,
	generatePin,
	isObviousPin,
	passphraseBits,
	pinBits,
	randomPasswordBits,
	strengthFromBits,
} from './password.ts'

describe('password: easy to remember', () => {
	it('makes pronounceable words with the chosen separator', () => {
		const phrase = generatePassphrase({
			words: 4,
			separator: 'hyphen',
			capitalize: false,
			number: false,
		})
		const words = phrase.split('-')
		assert.equal(words.length, 4)
		for (const word of words) assert.match(word, /^([bcdfghjlmnprstvz][aeiou]){3}$/)
	})
	it('capitalizes and adds a 2-digit number to one word', () => {
		const phrase = generatePassphrase({
			words: 3,
			separator: 'dot',
			capitalize: true,
			number: true,
		})
		const words = phrase.split('.')
		for (const word of words) assert.match(word, /^[A-Z][a-z]{5}(\d\d)?$/)
		assert.equal(words.filter((word) => /\d\d$/.test(word)).length, 1)
		assert.equal(
			generatePassphrase({ words: 5, separator: 'none', capitalize: false, number: false }).length,
			30,
		)
		assert.equal(
			generatePassphrase({ words: 2, separator: 'space', capitalize: false, number: false }).split(
				' ',
			).length,
			2,
		)
	})
})

describe('password: PIN', () => {
	it('flags obvious PINs', () => {
		for (const pin of ['0000', '1234', '9876', '123456', '1212', '12121', '4444444'])
			assert.ok(isObviousPin(pin), pin)
		for (const pin of ['2580', '7391', '1203', '9081']) assert.ok(!isObviousPin(pin), pin)
	})
	it('generates digits only, avoiding obvious ones when asked', () => {
		for (let i = 0; i < 300; i += 1) {
			const pin = generatePin(4, true)
			assert.match(pin, /^\d{4}$/)
			assert.ok(!isObviousPin(pin), pin)
		}
		assert.match(generatePin(12, false), /^\d{12}$/)
	})
})

describe('password: entropy and strength', () => {
	it('computes bits', () => {
		assert.equal(
			Math.round(randomPasswordBits(16, 26, 62)),
			Math.round(Math.log2(26) + 15 * Math.log2(62)),
		)
		assert.equal(Math.round(pinBits(4) * 100) / 100, 13.29)
		assert.ok(Math.abs(passphraseBits({ words: 4, number: false }) - 4 * 3 * Math.log2(80)) < 1e-9)
		assert.ok(
			passphraseBits({ words: 4, number: true }) > passphraseBits({ words: 4, number: false }),
		)
	})
	it('labels by bits', () => {
		assert.equal(strengthFromBits(13).label, 'Muito fraca')
		assert.equal(strengthFromBits(30).label, 'Fraca')
		assert.equal(strengthFromBits(50).label, 'Razoável')
		assert.equal(strengthFromBits(80).label, 'Forte')
		assert.equal(strengthFromBits(128).label, 'Muito forte')
	})
	it('formats crack time', () => {
		assert.equal(formatCrackTime(0.2), 'instantâneo')
		assert.equal(formatCrackTime(1), '1 segundo')
		assert.equal(formatCrackTime(3 * 3600), '3 horas')
		assert.equal(formatCrackTime(200 * 365.25 * 86400), '200 anos')
		assert.equal(formatCrackTime(1e40), 'mais que a idade do universo')
		assert.equal(formatCrackTime(strengthFromBits(13).crackSeconds), 'instantâneo')
	})
})
