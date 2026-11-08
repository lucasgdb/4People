import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { caretAfterFormat, formatMoneyInput, formatMoneyValue, parseMoneyInput } from './money.ts'

describe('money input', () => {
	it('groups thousands and keeps the cents as typed', () => {
		assert.equal(formatMoneyInput('1234', 2), '1.234')
		assert.equal(formatMoneyInput('1234,5', 2), '1.234,5')
		assert.equal(formatMoneyInput('1.234.567,891', 2), '1.234.567,89')
		assert.equal(formatMoneyInput('12.34', 2), '1.234')
		assert.equal(formatMoneyInput('0001', 2), '1')
		assert.equal(formatMoneyInput(',5', 2), '0,5')
		assert.equal(formatMoneyInput('10,', 2), '10,')
		assert.equal(formatMoneyInput('abc', 2), '')
		assert.equal(formatMoneyInput('', 2), '')
	})

	it('respects currencies without cents and crypto precision', () => {
		assert.equal(formatMoneyInput('1500,75', 0), '1.500')
		assert.equal(formatMoneyInput('0,123456789', 8), '0,12345678')
	})

	it('parses back to a number', () => {
		assert.equal(parseMoneyInput('1.234,56'), 1234.56)
		assert.equal(parseMoneyInput('10,'), 10)
		assert.equal(parseMoneyInput(''), null)
	})

	it('formats computed amounts', () => {
		assert.equal(formatMoneyValue(1234.5, 2), '1.234,50')
		assert.equal(formatMoneyValue(5503.456, 2), '5.503,46')
		assert.equal(formatMoneyValue(1500.4, 0), '1.500')
		assert.equal(formatMoneyValue(0.0023445, 8), '0,0023445')
		assert.equal(formatMoneyValue(2, 8), '2,00')
		assert.equal(formatMoneyValue(Number.NaN, 2), '')
	})

	it('keeps the caret after the same digit', () => {
		// "1234|" typed at the end → "1.234|"
		assert.equal(caretAfterFormat('1234', 4, '1.234'), 5)
		// "12|34" (caret after 2) → "1.2|34"
		assert.equal(caretAfterFormat('1234', 2, '1.234'), 3)
		// "1.2345|" → "12.345|"
		assert.equal(caretAfterFormat('1.2345', 6, '12.345'), 6)
		assert.equal(caretAfterFormat('', 0, ''), 0)
	})
})
