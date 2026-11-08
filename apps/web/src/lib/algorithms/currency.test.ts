import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
	CURRENCIES,
	type Currency,
	crossChange,
	crossRate,
	currencyById,
	currencyDecimals,
	currencySymbol,
	dayRange,
	formatChange,
	formatMoney,
	formatRate,
	isMarketClosed,
	lastUpdate,
	parseQuotes,
	QUOTES_URL,
	type Quote,
} from './currency.ts'

// Trimmed from a real AwesomeAPI response (numbers as strings, timestamp in seconds).
const RESPONSE = {
	USDBRL: {
		bid: '5.503',
		high: '5.5235',
		low: '5.4835',
		pctChange: '-0.014534',
		timestamp: '1794002689',
	},
	EURBRL: {
		bid: '6.1303',
		high: '6.1819',
		low: '6.1154',
		pctChange: '-0.786544',
		timestamp: '1794003270',
	},
	BTCBRL: {
		bid: '426549',
		high: '428625',
		low: '420641',
		pctChange: '1.394',
		timestamp: '1794111337',
	},
	ARSBRL: {
		bid: '0.00356553',
		high: '0.0036',
		low: '0.0035',
		pctChange: '0',
		timestamp: '1794002650',
	},
	JPYBRL: { bid: 'abc', high: '1', low: '1', pctChange: '0', timestamp: '1' },
}

/** Test lookups that fail loudly instead of asserting non-null. */
function at(quotes: Map<string, Quote>, id: string): Quote {
	const quote = quotes.get(id)
	if (!quote) throw new Error(`sem cotação de ${id}`)
	return quote
}
function byId(id: string): Currency {
	const currency = currencyById(id)
	if (!currency) throw new Error(`moeda ${id} não existe`)
	return currency
}

const usd = byId('USD')
const brl = byId('BRL')
const btc = byId('BTC')
const ars = byId('ARS')

describe('currency quotes', () => {
	it('asks every pair against the real in one request', () => {
		assert.ok(QUOTES_URL.startsWith('https://economia.awesomeapi.com.br/json/last/USD-BRL,'))
		assert.equal(QUOTES_URL.split(',').length, CURRENCIES.length - 1)
		assert.ok(QUOTES_URL.includes('USD-BRLT'))
	})

	it('parses quotes, adds the real and skips broken ones', () => {
		const quotes = parseQuotes(RESPONSE)
		assert.equal(quotes.get('BRL')?.bid, 1)
		assert.equal(quotes.get('USD')?.bid, 5.503)
		assert.equal(quotes.get('USD')?.updatedAt.toISOString(), '2026-11-06T22:04:49.000Z')
		assert.equal(quotes.has('JPY'), false)
		assert.equal(quotes.has('GBP'), false)
	})

	it('fails when nothing usable came back', () => {
		assert.throws(() => parseQuotes({}), /nenhuma cotação/)
		assert.throws(() => parseQuotes('erro'))
	})

	it('crosses rates and daily change through the real', () => {
		const q = parseQuotes(RESPONSE)
		assert.equal(crossRate(at(q, 'USD'), at(q, 'BRL')), 5.503)
		assert.ok(Math.abs(crossRate(at(q, 'BRL'), at(q, 'USD')) - 0.18172) < 1e-5)
		assert.ok(Math.abs(crossRate(at(q, 'EUR'), at(q, 'USD')) - 1.11399) < 1e-5)
		assert.ok(Math.abs(crossChange(at(q, 'USD'), at(q, 'BRL')) - -0.014534) < 1e-9)
		// Real against dollar moves the other way: 1 / (1 − 0,0145%) − 1.
		assert.ok(Math.abs(crossChange(at(q, 'BRL'), at(q, 'USD')) - 0.0145361) < 1e-6)
	})

	it('gives a day range only when one side is the real', () => {
		const q = parseQuotes(RESPONSE)
		assert.deepEqual(dayRange('USD', at(q, 'USD'), 'BRL', at(q, 'BRL')), {
			low: 5.4835,
			high: 5.5235,
		})
		const inverse = dayRange('BRL', at(q, 'BRL'), 'USD', at(q, 'USD'))
		assert.ok(inverse && Math.abs(inverse.low - 1 / 5.5235) < 1e-12 && inverse.high === 1 / 5.4835)
		assert.equal(dayRange('USD', at(q, 'USD'), 'EUR', at(q, 'EUR')), null)
		assert.equal(dayRange('BRL', at(q, 'BRL'), 'BRL', at(q, 'BRL')), null)
	})

	it('takes the newest update and ignores the real', () => {
		const q = parseQuotes(RESPONSE)
		assert.equal(lastUpdate(at(q, 'BRL')), null)
		assert.equal(lastUpdate(at(q, 'USD'), at(q, 'EUR'))?.getTime(), 1794003270000)
	})

	it('tells a closed forex market apart from live crypto', () => {
		const at = new Date('2026-11-06T22:04:49Z')
		assert.equal(isMarketClosed(at, new Date('2026-11-06T22:30:00Z'), false), false)
		assert.equal(isMarketClosed(at, new Date('2026-11-08T04:00:00Z'), false), true)
		assert.equal(isMarketClosed(at, new Date('2026-11-08T04:00:00Z'), true), false)
		assert.equal(isMarketClosed(null, new Date(), false), false)
	})

	it('formats money the Brazilian way', () => {
		assert.equal(formatMoney(550.35, brl), 'R$ 550,35')
		assert.equal(formatMoney(1234.5, usd), 'US$ 1.234,50')
		assert.equal(formatMoney(0.00234567, btc), '0,00234567 BTC')
		assert.equal(formatMoney(426549, btc), '426.549,00 BTC')
	})

	it('keeps small rates readable', () => {
		assert.equal(formatRate(5.503, brl), 'R$ 5,503')
		assert.equal(formatRate(0.18172, usd), 'US$ 0,1817')
		assert.equal(formatRate(0.00356553, brl), 'R$ 0,003566')
		assert.equal(formatRate(280.46, ars), 'ARS 280,46')
		assert.equal(formatRate(0.0000023444, btc), '0,00000234 BTC')
	})

	it('formats the daily change with a sign', () => {
		assert.equal(formatChange(0.807735), '+0,81%')
		assert.equal(formatChange(-0.014534), '−0,01%')
		assert.equal(formatChange(0.001), '0,00%')
	})

	it('gives the symbol and the decimals for the money field', () => {
		assert.equal(currencySymbol(byId('BRL')), 'R$')
		assert.equal(currencySymbol(byId('USD')), 'US$')
		assert.equal(currencySymbol(byId('EUR')), '€')
		assert.equal(currencySymbol(byId('BTC')), 'BTC')
		assert.equal(currencyDecimals(byId('BRL')), 2)
		assert.equal(currencyDecimals(byId('JPY')), 0)
		assert.equal(currencyDecimals(byId('PYG')), 0)
		assert.equal(currencyDecimals(byId('BTC')), 8)
	})
})
