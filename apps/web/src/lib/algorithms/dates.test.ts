import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { calendarDifference, fromISODate, shiftDate, toISODate } from './dates.ts'

describe('dates', () => {
	it('calendar difference', () => {
		assert.deepEqual(calendarDifference(new Date(2020, 0, 31), new Date(2021, 2, 1)), {
			years: 1,
			months: 1,
			days: 1,
		})
		assert.deepEqual(calendarDifference(new Date(2024, 0, 15), new Date(2024, 2, 10)), {
			years: 0,
			months: 1,
			days: 24,
		})
		assert.deepEqual(calendarDifference(new Date(2025, 5, 10), new Date(2020, 5, 10)), {
			years: 5,
			months: 0,
			days: 0,
		})
	})
	it('shifts and round-trips local dates', () => {
		assert.deepEqual(shiftDate(new Date(2024, 0, 31), 1, 'weeks'), new Date(2024, 1, 7))
		assert.equal(toISODate(fromISODate('2026-11-07')), '2026-11-07')
		assert.equal(fromISODate('2026-11-07', '09:30').getHours(), 9)
	})
})
