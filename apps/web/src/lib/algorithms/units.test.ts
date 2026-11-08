import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
	CATEGORIES,
	type Category,
	categoryById,
	conversionFormula,
	convertUnit,
	formatAmount,
	parseAmount,
	type Unit,
	unitById,
} from './units.ts'

function cat(id: string): Category {
	const category = categoryById(id)
	if (!category) throw new Error(`categoria ${id}`)
	return category
}
function unit(categoryId: string, id: string): Unit {
	const found = unitById(cat(categoryId), id)
	if (!found) throw new Error(`unidade ${id}`)
	return found
}
const convert = (category: string, value: number, from: string, to: string) =>
	convertUnit(value, unit(category, from), unit(category, to))
const close = (actual: number | null, expected: number, digits = 9) =>
	assert.ok(
		actual !== null && Math.abs(actual - expected) <= Math.abs(expected) * 10 ** -digits,
		`${actual} ≠ ${expected}`,
	)

describe('unit converter', () => {
	it('every category has unique units and a valid default pair', () => {
		for (const category of CATEGORIES) {
			const ids = category.units.map((u) => u.id)
			assert.equal(new Set(ids).size, ids.length, category.id)
			for (const id of category.pair) assert.ok(ids.includes(id), `${category.id}: ${id}`)
		}
	})

	it('round-trips every unit through the base', () => {
		for (const category of CATEGORIES) {
			for (const from of category.units) {
				for (const to of category.units) {
					const there = convertUnit(42, from, to)
					assert.ok(there !== null, `${from.id}→${to.id}`)
					close(convertUnit(there, to, from), 42)
				}
			}
		}
	})

	it('uses exact definitions', () => {
		close(convert('comprimento', 1, 'mi', 'km'), 1.609344)
		close(convert('comprimento', 1, 'in', 'cm'), 2.54)
		close(convert('massa', 1, 'lb', 'kg'), 0.45359237)
		close(convert('massa', 1, 'arroba', 'kg'), 15)
		close(convert('volume', 1, 'gal', 'l'), 3.785411784)
		close(convert('velocidade', 100, 'kmh', 'mph'), 62.13711922)
		close(convert('energia', 1, 'kcal', 'kj'), 4.184)
		close(convert('pressao', 1, 'psi', 'kpa'), 6.894757293, 8)
		close(convert('area', 1, 'alq-sp', 'ha'), 2.42)
		close(convert('armazenamento', 1, 'gib', 'mb'), 1073.741824)
		close(convert('transferencia', 100, 'mbps', 'mbs'), 12.5)
		close(convert('angulo', 180, 'deg', 'rad'), Math.PI)
		close(convert('tempo', 1, 'yr', 'd'), 365.2425)
	})

	it('handles temperature offsets', () => {
		close(convert('temperatura', 100, 'c', 'f'), 212)
		close(convert('temperatura', -40, 'f', 'c'), -40)
		close(convert('temperatura', 0, 'k', 'c'), -273.15)
		close(convert('temperatura', 98.6, 'f', 'k'), 310.15)
	})

	it('handles inverse fuel economy and refuses division by zero', () => {
		close(convert('consumo', 10, 'kml', 'l100'), 10)
		close(convert('consumo', 8, 'l100', 'kml'), 12.5)
		close(convert('consumo', 30, 'mpg', 'l100'), 7.840486111, 8)
		assert.equal(convert('consumo', 0, 'kml', 'l100'), null)
	})

	it('writes a Google-style formula', () => {
		const f = (c: string, a: string, b: string) => conversionFormula(cat(c), unit(c, a), unit(c, b))
		assert.equal(f('comprimento', 'km', 'm'), 'multiplique o valor por 1.000')
		assert.equal(f('comprimento', 'm', 'km'), 'divida o valor por 1.000')
		assert.equal(f('comprimento', 'cm', 'in'), 'divida o valor por 2,54')
		assert.equal(f('comprimento', 'in', 'cm'), 'multiplique o valor por 2,54')
		assert.equal(f('comprimento', 'm', 'ft'), 'divida o valor por 0,3048')
		assert.equal(f('temperatura', 'c', 'f'), '(°C × 9/5) + 32 = °F')
		assert.equal(f('consumo', 'kml', 'l100'), 'divida 100 pelo valor')
		assert.equal(f('consumo', 'mpg', 'l100'), 'divida 235,2145833 pelo valor')
		assert.equal(f('consumo', 'kml', 'mpg'), 'multiplique o valor por 2,352145833')
		assert.equal(f('comprimento', 'm', 'm'), null)
	})

	it('reads Brazilian and plain numbers', () => {
		assert.equal(parseAmount('1,5'), 1.5)
		assert.equal(parseAmount('1.5'), 1.5)
		assert.equal(parseAmount('1.234,5'), 1234.5)
		assert.equal(parseAmount('-40'), -40)
		assert.equal(parseAmount('1,2e-7'), 1.2e-7)
		assert.equal(parseAmount(''), null)
		assert.equal(parseAmount('abc'), null)
	})

	it('formats results that can be typed back', () => {
		assert.equal(formatAmount(1609.344), '1609,344')
		assert.equal(formatAmount(0.1 + 0.2), '0,3')
		assert.equal(formatAmount(62.137119223733), '62,13711922')
		assert.equal(formatAmount(1.5e-9), '1,5e-9')
		assert.equal(formatAmount(6.02214076e23), '6,022141e23')
		assert.equal(formatAmount(-40), '-40')
		for (const value of [1609.344, 1.5e-9, -273.15, 6.02214076e23]) {
			close(parseAmount(formatAmount(value)), value, 6)
		}
	})
})
