import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { areas } from './areas.ts'
import { bhaskara, compoundInterest, convertTemperature, ruleOfThree } from './calculators.ts'
import { describe as stats } from './statistics.ts'

const close = (a: number, b: number, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} ≈ ${b}`)

describe('calculators', () => {
	it('bhaskara', () => {
		assert.deepEqual(bhaskara(1, -3, 2).roots, [2, 1])
		assert.equal(bhaskara(1, 2, 1).roots.length, 1)
		assert.equal(bhaskara(1, 0, 1).roots.length, 0)
	})
	it('temperature', () => {
		assert.equal(convertTemperature(100, 'C', 'F'), 212)
		close(convertTemperature(0, 'K', 'C'), -273.15)
	})
	it('areas', () => {
		assert.equal(areas.square(4), 16)
		close(areas.hexagon(2), 10.392304845413264)
		close(areas.pentagon(2), 6.881909602355868)
	})
	it('rule of three, direct and inverse', () => {
		assert.equal(ruleOfThree(2, 10, 6, 'direct'), 30) // 2 kg → R$10; 6 kg → R$30
		assert.equal(ruleOfThree(4, 6, 3, 'inverse'), 8) // 4 pedreiros em 6 dias; 3 pedreiros → 8 dias
	})
	it('compound interest', () => {
		const result = compoundInterest({
			principal: 1000,
			monthlyDeposit: 0,
			rate: 1,
			ratePeriod: 'month',
			months: 12,
		})
		close(result.balance, 1000 * 1.01 ** 12)
		const yearly = compoundInterest({
			principal: 1000,
			monthlyDeposit: 0,
			rate: 12,
			ratePeriod: 'year',
			months: 12,
		})
		close(yearly.balance, 1120)
		const deposits = compoundInterest({
			principal: 0,
			monthlyDeposit: 100,
			rate: 0,
			ratePeriod: 'month',
			months: 10,
		})
		assert.equal(deposits.balance, 1000)
		assert.equal(deposits.interest, 0)
	})
	it('statistics', () => {
		const result = stats([2, 4, 4, 4, 5, 5, 7, 9])
		assert.equal(result.mean, 5)
		assert.equal(result.median, 4.5)
		assert.deepEqual(result.modes, [4])
		assert.equal(result.populationStdDev, 2)
		assert.deepEqual(stats([1, 2, 3]).modes, [])
		assert.equal(stats([7, 8, 10], [2, 3, 5]).weightedMean, 8.8) // (7·2 + 8·3 + 10·5) / 10
	})
})
