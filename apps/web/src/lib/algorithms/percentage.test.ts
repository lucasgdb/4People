import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
	addPercent,
	chainChanges,
	marginAndMarkup,
	parseChanges,
	percentChange,
	percentOf,
	percentOfWhole,
	rateDifference,
	subtractPercent,
	valueBeforeChange,
	wholeFromPart,
} from './percentage.ts'

const close = (a: number, b: number, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} ≈ ${b}`)

describe('percentage', () => {
	it('basic', () => {
		assert.equal(percentOf(15, 200), 30)
		assert.equal(percentOfWhole(30, 200), 15)
		assert.equal(wholeFromPart(30, 15), 200)
	})
	it('change, increase and discount', () => {
		assert.equal(percentChange(50, 75), 50)
		assert.equal(percentChange(100, 75), -25)
		assert.equal(percentChange(-50, -25), 50) // from a negative base, going up is still an increase
		close(addPercent(200, 10), 220)
		assert.equal(subtractPercent(200, 10), 180)
		close(valueBeforeChange(220, 10), 200)
		close(valueBeforeChange(180, -10), 200)
	})
	it('chained changes are not additive', () => {
		close(chainChanges([10, -10]).total, -1)
		close(chainChanges([10, 10]).total, 21)
	})
	it('margin, markup and percentage points', () => {
		assert.deepEqual(marginAndMarkup(80, 100), { profit: 20, margin: 20, markup: 25 })
		const rate = rateDifference(10, 12)
		assert.equal(rate.points, 2)
		close(rate.relative, 20)
	})
	it('parses lists of changes', () => {
		assert.deepEqual(parseChanges('+10, -5; 20%'), [10, -5, 20])
		assert.deepEqual(parseChanges('2,5 -1,5'), [2.5, -1.5])
		assert.deepEqual(parseChanges('10,-5'), [10, -5])
		assert.equal(parseChanges('10, abc'), null)
		assert.equal(parseChanges('   '), null)
	})
})
