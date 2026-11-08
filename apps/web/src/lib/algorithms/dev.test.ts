import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
	type Change,
	captureGroupNames,
	compileRegex,
	cronBreakdown,
	dateTimeToEpoch,
	describeCronField,
	detectTimestampUnit,
	diffStats,
	formatIsoOffset,
	formatRfc2822,
	highlightSegments,
	parseJson,
	parseTimestamp,
	parseUrl,
	rebuildUrl,
	relativeTime,
	runRegex,
	sideBySideRows,
	unifiedLines,
} from './dev.ts'

describe('dev: relative time', () => {
	const now = new Date('2026-11-07T12:00:00Z')
	const at = (seconds: number) => relativeTime(new Date(now.getTime() + seconds * 1000), now)
	it('picks the largest unit', () => {
		assert.equal(at(-3 * 86400), 'há 3 dias')
		assert.equal(at(2 * 3600 + 5), 'em 2 horas')
		assert.equal(at(0), 'agora')
		assert.equal(at(-30), 'há 30 segundos')
		assert.equal(at(-400 * 86400), 'há 1 ano')
		assert.equal(at(45 * 86400), 'em 1 mês')
	})
})

describe('dev: regex', () => {
	it('names capture groups in order, skipping non-capturing ones', () => {
		assert.deepEqual(captureGroupNames('(?<ano>\\d{4})-(\\d{2})(?:x)(?=y)[(]\\(( ?<a>)'), [
			'ano',
			null,
			null,
		])
		assert.deepEqual(captureGroupNames('(?<!a)(?<b>c)'), ['b'])
	})
	it('finds all matches with groups', () => {
		const result = runRegex('(?<ano>\\d{4})-(\\d{2})', 'g', 'de 2024-01 a 2025-12')
		assert.ok(result.ok)
		if (!result.ok) return
		assert.equal(result.matches.length, 2)
		assert.deepEqual(result.matches[1], {
			index: 13,
			end: 20,
			text: '2025-12',
			groups: [
				{ number: 1, name: 'ano', value: '2025' },
				{ number: 2, name: null, value: '12' },
			],
		})
	})
	it('only the first match without g; optional groups are undefined', () => {
		const result = runRegex('a(b)?', '', 'a ab')
		assert.ok(
			result.ok && result.matches.length === 1 && result.matches[0]?.groups[0]?.value === undefined,
		)
	})
	it('caps matches and survives empty matches', () => {
		const result = runRegex('x*', 'g', 'abc', 2)
		assert.ok(result.ok && result.matches.length === 2 && result.truncated)
	})
	it('reports invalid patterns and flags', () => {
		const bad = runRegex('(a', 'g', 'a')
		assert.ok(!bad.ok && /Expressão inválida/.test(bad.error))
		assert.ok(!compileRegex('a', 'gg').ok)
	})
	it('cuts text into highlighted segments', () => {
		const result = runRegex('o', 'g', 'bolo')
		assert.ok(result.ok)
		if (!result.ok) return
		assert.deepEqual(highlightSegments('bolo', result.matches), [
			{ text: 'b', match: null },
			{ text: 'o', match: 0 },
			{ text: 'l', match: null },
			{ text: 'o', match: 1 },
		])
		const empty = runRegex('^', 'gm', 'a\nb')
		assert.ok(empty.ok)
		if (empty.ok)
			assert.deepEqual(highlightSegments('a\nb', empty.matches), [{ text: 'a\nb', match: null }])
	})
})

describe('dev: diff layout', () => {
	const changes: Change[] = [
		{ value: 'a\nb\n' },
		{ value: 'c\nd\n', removed: true },
		{ value: 'C\n', added: true },
		{ value: 'e\n' },
		{ value: 'f\n', added: true },
	]
	it('counts lines, words and chars', () => {
		assert.deepEqual(diffStats(changes, 'lines'), { added: 2, removed: 2, identical: false })
		assert.deepEqual(
			diffStats(
				[
					{ value: 'ola mundo', added: true },
					{ value: ' ', removed: true },
				],
				'words',
			),
			{
				added: 2,
				removed: 0,
				identical: false,
			},
		)
		assert.equal(diffStats([{ value: 'ãé', removed: true }], 'chars').removed, 2)
		assert.ok(diffStats([{ value: 'x' }], 'lines').identical)
	})
	it('unified lines carry both numbers', () => {
		const lines = unifiedLines(changes)
		assert.deepEqual(
			lines.map((l) => `${l.sign}${l.oldNumber ?? '·'}${l.newNumber ?? '·'}${l.text}`),
			[' 11a', ' 22b', '-3·c', '-4·d', '+·3C', ' 54e', '+·5f'],
		)
	})
	it('side by side pairs removed with added', () => {
		const rows = sideBySideRows(changes)
		assert.equal(rows.length, 6)
		assert.deepEqual(rows[2], {
			left: { number: 3, text: 'c', changed: true },
			right: { number: 3, text: 'C', changed: true },
		})
		assert.deepEqual(rows[3], { left: { number: 4, text: 'd', changed: true }, right: null })
		assert.deepEqual(rows[5], { left: null, right: { number: 5, text: 'f', changed: true } })
	})
})

describe('dev: json', () => {
	it('parses or points at the error', () => {
		assert.deepEqual(parseJson('[1]'), { ok: true, value: [1] })
		const bad = parseJson('{\n  "a": 1,\n}')
		assert.ok(!bad.ok && /JSON inválido/.test(bad.error))
	})
})

describe('dev: timestamp', () => {
	it('detects the unit', () => {
		assert.equal(detectTimestampUnit(1_700_000_000), 's')
		assert.equal(detectTimestampUnit(1_700_000_000_000), 'ms')
		assert.equal(detectTimestampUnit(1_700_000_000_000_000), 'us')
		assert.equal(detectTimestampUnit(1.7e18), 'ns')
	})
	it('parses timestamps', () => {
		assert.equal(parseTimestamp('1700000000').date.toISOString(), '2023-11-14T22:13:20.000Z')
		assert.equal(parseTimestamp(' 1700000000123 ').milliseconds, 1_700_000_000_123)
		assert.equal(parseTimestamp('1700000000.5').milliseconds, 1_700_000_000_500)
		assert.equal(parseTimestamp('1_700_000_000').seconds, 1_700_000_000)
		assert.equal(parseTimestamp('-86400').date.toISOString(), '1969-12-31T00:00:00.000Z')
		assert.equal(parseTimestamp('1700000000000', 's').unit, 's')
		assert.throws(() => parseTimestamp('abc'), /só números/)
		assert.throws(() => parseTimestamp('1700000000000000', 's'), /fora do intervalo/)
	})
	it('formats RFC 2822 and ISO with offsets', () => {
		const date = new Date('2026-11-07T12:05:09.004Z')
		assert.equal(formatRfc2822(date), 'Sat, 07 Nov 2026 12:05:09 +0000')
		assert.equal(formatRfc2822(date, -180), 'Sat, 07 Nov 2026 09:05:09 -0300')
		assert.equal(formatIsoOffset(date), '2026-11-07T12:05:09.004Z')
		assert.equal(formatIsoOffset(date, 330), '2026-11-07T17:35:09.004+05:30')
	})
	it('date and time to epoch', () => {
		assert.equal(dateTimeToEpoch('2026-11-07', '09:30', 'utc'), Date.UTC(2026, 10, 7, 9, 30))
		assert.equal(dateTimeToEpoch('2026-11-07', '', 'local'), new Date(2026, 10, 7).getTime())
		assert.throws(() => dateTimeToEpoch('07/11/2026', '09:30', 'utc'), /data válida/)
		assert.throws(() => dateTimeToEpoch('2026-02-30', '09:30', 'utc'), /não existe/)
		assert.throws(() => dateTimeToEpoch('2026-02-10', '25:00', 'utc'), /Horário inválido/)
		assert.throws(() => dateTimeToEpoch('2026-02-10', '9h', 'utc'), /hh:mm/)
	})
})

describe('dev: cron', () => {
	it('describes fields', () => {
		assert.equal(describeCronField('*', 'minute'), 'qualquer minuto')
		assert.equal(describeCronField('*/15', 'minute'), 'a cada 15 minutos')
		assert.equal(describeCronField('1-5', 'dayOfWeek'), 'de segunda a sexta')
		assert.equal(describeCronField('JAN,mar', 'month'), 'janeiro, março')
		assert.equal(describeCronField('5/10', 'second'), 'a cada 10 segundos, a partir de 5')
		assert.equal(describeCronField('0-30/10', 'minute'), 'a cada 10 minutos, de 0 a 30')
		assert.equal(describeCronField('L', 'dayOfMonth'), 'último dia do mês')
		assert.equal(describeCronField('5#2', 'dayOfWeek'), '2ª sexta do mês')
		assert.equal(describeCronField('7', 'dayOfWeek'), 'domingo')
	})
	it('breaks down 5 and 6 fields and macros', () => {
		assert.deepEqual(
			cronBreakdown('30 8 * * 1-5').map((f) => f.kind),
			['minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek'],
		)
		assert.equal(cronBreakdown('0 */5 * * * *')[0]?.kind, 'second')
		assert.equal(cronBreakdown('@daily')[1]?.value, '0')
		assert.throws(() => cronBreakdown('* * *'), /tem 3/)
	})
})

describe('dev: url', () => {
	it('splits every part, decoded', () => {
		const parts = parseUrl(
			'https://ana:s%40nha@exemplo.com.br:8080/a%20b/c?q=caf%C3%A9&x=1&x=2#se%C3%A7%C3%A3o',
		)
		assert.equal(parts.protocol, 'https:')
		assert.equal(parts.username, 'ana')
		assert.equal(parts.password, 's@nha')
		assert.equal(parts.hostname, 'exemplo.com.br')
		assert.equal(parts.port, '8080')
		assert.equal(parts.defaultPort, '443')
		assert.equal(parts.pathname, '/a b/c')
		assert.deepEqual(parts.params, [
			{ key: 'q', value: 'café' },
			{ key: 'x', value: '1' },
			{ key: 'x', value: '2' },
		])
		assert.equal(parts.hash, 'seção')
	})
	it('explains bad URLs', () => {
		assert.throws(() => parseUrl('exemplo.com/a'), /protocolo/)
		assert.throws(() => parseUrl('não é url'), /Ex\.:/)
		assert.throws(() => parseUrl('  '), /Cole/)
	})
	it('rebuilds with new params', () => {
		assert.equal(
			rebuildUrl('https://a.com/p?old=1#h', [
				{ key: 'q', value: 'a b&c' },
				{ key: '', value: 'drop' },
			]),
			'https://a.com/p?q=a+b%26c#h',
		)
		assert.equal(rebuildUrl('https://a.com/p?old=1', []), 'https://a.com/p')
	})
})
