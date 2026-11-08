import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
	availabilityFor,
	compositeAvailability,
	convertAll,
	DATA_UNITS,
	DAY,
	downloadSeconds,
	downtimeFor,
	downtimeTable,
	findUnit,
	formatBitrate,
	formatBytes,
	formatDuration,
	formatHms,
	formatSignificant,
	parseNumber,
	parsePercentList,
	RATE_UNITS,
	unavailability,
	YEAR,
} from './capacity.ts'

const close = (a: number, b: number, eps = 1e-9) =>
	assert.ok(Math.abs(a - b) <= eps * Math.max(1, Math.abs(b)), `${a} ≈ ${b}`)

describe('numbers', () => {
	it('parses pt-BR and plain numbers', () => {
		assert.equal(parseNumber('1.234,5'), 1234.5)
		assert.equal(parseNumber('1234.5'), 1234.5)
		assert.equal(parseNumber('99,95%'), 99.95)
		assert.equal(parseNumber(' 10 '), 10)
		assert.equal(parseNumber('1e3'), 1000)
		assert.equal(parseNumber(''), null)
		assert.equal(parseNumber('abc'), null)
		assert.equal(parseNumber('1,2,3'), null)
		assert.equal(parseNumber('12abc'), null)
	})
	it('formats significant digits', () => {
		assert.equal(formatSignificant(0), '0')
		assert.equal(formatSignificant(1234.5), '1.234,5')
		assert.equal(formatSignificant(0.001), '0,001')
		assert.match(formatSignificant(1e-12), /E/)
		assert.match(formatSignificant(8e21), /E/)
	})
	it('unavailability has no float noise', () => {
		assert.equal(unavailability(99.95), 0.0005)
		assert.equal(unavailability(99.9), 0.001)
		assert.equal(unavailability(100), 0)
		assert.equal(unavailability(0), 1)
	})
})

describe('durations', () => {
	it('formatDuration', () => {
		assert.equal(formatDuration(0), '0s')
		assert.equal(formatDuration(0.8643), '864,3ms')
		assert.equal(formatDuration(43.2), '43,2s')
		assert.equal(formatDuration(31557.6), '8h 45min 57,6s')
		assert.equal(formatDuration(3600), '1h')
		assert.equal(formatDuration(59.96), '1min')
		assert.equal(formatDuration(3 * DAY + 61), '3d 1min 1s')
		assert.equal(formatDuration(Number.POSITIVE_INFINITY), '∞')
	})
	it('formatHms', () => {
		assert.equal(formatHms(0), '0:00:00')
		assert.equal(formatHms(59.6), '0:01:00')
		assert.equal(formatHms(3661), '1:01:01')
		assert.equal(formatHms(26 * 3600 + 5), '26:00:05')
		assert.equal(formatHms(Number.POSITIVE_INFINITY), '∞')
	})
})

describe('SLA', () => {
	it('downtime for availability', () => {
		close(downtimeFor(99.9, DAY), 86.4)
		close(downtimeFor(99.95, DAY), 43.2)
		close(downtimeFor(99.99, YEAR), 3155.76)
		close(downtimeFor(99.999, YEAR), 315.576)
		assert.equal(downtimeFor(100, YEAR), 0)
		assert.throws(() => downtimeFor(101, DAY))
		assert.throws(() => downtimeFor(-1, DAY))
		const table = downtimeTable(99)
		close(table.day, 864)
		close(table.week, 6048)
		close(table.month, 26298)
		close(table.quarter, 78894)
		close(table.year, 315576)
	})
	it('availability for downtime', () => {
		close(availabilityFor(43.2, DAY), 99.95)
		assert.equal(availabilityFor(0, DAY), 100)
		assert.equal(availabilityFor(DAY, DAY), 0)
		assert.throws(() => availabilityFor(DAY + 1, DAY))
		assert.throws(() => availabilityFor(-1, DAY))
	})
	it('composite', () => {
		close(compositeAvailability([99.9, 99.9], 'series'), 99.8001)
		close(compositeAvailability([99, 99], 'parallel'), 99.99)
		close(compositeAvailability([99.95], 'series'), 99.95)
		close(compositeAvailability([90, 90, 90], 'parallel'), 99.9)
		assert.throws(() => compositeAvailability([], 'series'))
		assert.throws(() => compositeAvailability([120], 'series'))
	})
	it('parses percent lists', () => {
		assert.deepEqual(parsePercentList('99.9, 99,95; 99.99'), [99.9, 99.95, 99.99])
		assert.deepEqual(parsePercentList('99,9 99,9'), [99.9, 99.9])
		assert.equal(parsePercentList(''), null)
		assert.equal(parsePercentList('99, abc'), null)
		assert.equal(parsePercentList('150'), null)
	})
})

describe('units', () => {
	it('converts data sizes', () => {
		const all = Object.fromEntries(convertAll(1, 'GiB').map(({ unit, value }) => [unit.id, value]))
		assert.equal(all.B, 1073741824)
		assert.equal(all.MiB, 1024)
		assert.equal(all.b, 8589934592)
		close(all.GB ?? 0, 1.073741824)
		const kb = Object.fromEntries(convertAll(1, 'kB').map(({ unit, value }) => [unit.id, value]))
		assert.equal(kb.B, 1000)
		close(kb.KiB ?? 0, 0.9765625)
		assert.equal(DATA_UNITS.length, new Set(DATA_UNITS.map((u) => u.id)).size)
	})
	it('converts rates', () => {
		const rates = Object.fromEntries(
			convertAll(100, 'Mbps', RATE_UNITS).map(({ unit, value }) => [unit.id, value]),
		)
		assert.equal(rates.MBps, 12.5)
		assert.equal(rates.kbps, 100_000)
		close(rates.MiBps ?? 0, 11.920928955078125)
		assert.throws(() => findUnit(RATE_UNITS, 'xyz'))
	})
	it('formats', () => {
		assert.equal(formatBytes(1500), '1,5 kB')
		assert.equal(formatBytes(1536, 'binary'), '1,5 KiB')
		assert.equal(formatBytes(999), '999 B')
		assert.equal(formatBytes(2.5e12), '2,5 TB')
		assert.equal(formatBitrate(1_500_000), '1,5 Mbps')
		assert.equal(formatBitrate(800), '800 bps')
	})
})

describe('download time', () => {
	it('computes seconds', () => {
		assert.equal(downloadSeconds(1e9, 100e6), 80)
		assert.equal(downloadSeconds(1e9, 100e6, 20), 100)
		assert.equal(downloadSeconds(0, 1), 0)
		assert.throws(() => downloadSeconds(1, 0))
		assert.throws(() => downloadSeconds(1, 1, 100))
		assert.throws(() => downloadSeconds(-1, 1))
	})
})
