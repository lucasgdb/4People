/**
 * Currency quotes from AwesomeAPI (economia.awesomeapi.com.br): public, no key, CORS open, updated
 * about every 30 seconds while the forex market is open (crypto trades around the clock).
 *
 * Every currency is fetched against the real (X-BRL) in one request, and any other pair is crossed
 * through the real: USD → EUR = (USD em R$) ÷ (EUR em R$). That keeps one request for every pair
 * and matches the direct quote to a fraction of a cent.
 */

import { z } from 'zod'

export type Currency = {
	/** Our id, also the select value. */
	id: string
	/** ISO 4217 code for Intl (crypto has none, so it is formatted by hand). */
	code: string
	name: string
	/** Key in the API response (`USDBRL`), or null for the real itself. */
	key: string | null
	/** Pair in the request URL (`USD-BRL`). */
	pair: string | null
	crypto?: boolean
}

export const CURRENCIES: readonly Currency[] = [
	{ id: 'BRL', code: 'BRL', name: 'Real brasileiro', key: null, pair: null },
	{ id: 'USD', code: 'USD', name: 'Dólar americano', key: 'USDBRL', pair: 'USD-BRL' },
	{ id: 'USDT', code: 'USD', name: 'Dólar turismo', key: 'USDBRLT', pair: 'USD-BRLT' },
	{ id: 'EUR', code: 'EUR', name: 'Euro', key: 'EURBRL', pair: 'EUR-BRL' },
	{ id: 'GBP', code: 'GBP', name: 'Libra esterlina', key: 'GBPBRL', pair: 'GBP-BRL' },
	{ id: 'ARS', code: 'ARS', name: 'Peso argentino', key: 'ARSBRL', pair: 'ARS-BRL' },
	{ id: 'CAD', code: 'CAD', name: 'Dólar canadense', key: 'CADBRL', pair: 'CAD-BRL' },
	{ id: 'AUD', code: 'AUD', name: 'Dólar australiano', key: 'AUDBRL', pair: 'AUD-BRL' },
	{ id: 'JPY', code: 'JPY', name: 'Iene japonês', key: 'JPYBRL', pair: 'JPY-BRL' },
	{ id: 'CHF', code: 'CHF', name: 'Franco suíço', key: 'CHFBRL', pair: 'CHF-BRL' },
	{ id: 'CNY', code: 'CNY', name: 'Yuan chinês', key: 'CNYBRL', pair: 'CNY-BRL' },
	{ id: 'CLP', code: 'CLP', name: 'Peso chileno', key: 'CLPBRL', pair: 'CLP-BRL' },
	{ id: 'MXN', code: 'MXN', name: 'Peso mexicano', key: 'MXNBRL', pair: 'MXN-BRL' },
	{ id: 'UYU', code: 'UYU', name: 'Peso uruguaio', key: 'UYUBRL', pair: 'UYU-BRL' },
	{ id: 'PYG', code: 'PYG', name: 'Guarani paraguaio', key: 'PYGBRL', pair: 'PYG-BRL' },
	{ id: 'BTC', code: 'BTC', name: 'Bitcoin', key: 'BTCBRL', pair: 'BTC-BRL', crypto: true },
	{ id: 'ETH', code: 'ETH', name: 'Ethereum', key: 'ETHBRL', pair: 'ETH-BRL', crypto: true },
]

export const currencyById = (id: string): Currency | undefined =>
	CURRENCIES.find((currency) => currency.id === id)

export const QUOTES_URL = `https://economia.awesomeapi.com.br/json/last/${CURRENCIES.flatMap(
	(currency) => (currency.pair ? [currency.pair] : []),
).join(',')}`

/** How the API sends a quote: every number as a string. */
const decimal = z.coerce.number().refine(Number.isFinite)
const apiQuote = z.object({
	bid: decimal.refine((value) => value > 0, 'cotação zerada'),
	high: decimal,
	low: decimal,
	pctChange: decimal,
	timestamp: decimal,
})

export type Quote = {
	/** Price of one unit in reais (commercial buy price, the reference most sites show). */
	bid: number
	high: number
	low: number
	/** Change since the previous close, in percent (0.8 = +0,8%). */
	pctChange: number
	updatedAt: Date
}

const REAL: Quote = { bid: 1, high: 1, low: 1, pctChange: 0, updatedAt: new Date(0) }

/**
 * Reads the API response into quotes by currency id. A currency missing from the response (the API
 * sometimes drops one) is left out instead of failing the whole table.
 */
export function parseQuotes(json: unknown): Map<string, Quote> {
	const body = z.record(z.string(), z.unknown()).parse(json)
	const quotes = new Map<string, Quote>([['BRL', REAL]])
	for (const currency of CURRENCIES) {
		if (!currency.key) continue
		const parsed = apiQuote.safeParse(body[currency.key])
		if (!parsed.success) continue
		const { bid, high, low, pctChange, timestamp } = parsed.data
		quotes.set(currency.id, { bid, high, low, pctChange, updatedAt: new Date(timestamp * 1000) })
	}
	if (quotes.size === 1) throw new Error('A resposta não trouxe nenhuma cotação.')
	return quotes
}

/** How many units of `to` one unit of `from` buys, crossed through the real. */
export function crossRate(from: Quote, to: Quote): number {
	return from.bid / to.bid
}

/** Today's change of the crossed pair, in percent: (1 + a) ÷ (1 + b) − 1. */
export function crossChange(from: Quote, to: Quote): number {
	return ((1 + from.pctChange / 100) / (1 + to.pctChange / 100) - 1) * 100
}

/**
 * Day range of the pair. Only exact when one side is the real; a crossed pair has no day range of
 * its own (the highs of each side happened at different times), so it returns null.
 */
export function dayRange(
	fromId: string,
	from: Quote,
	toId: string,
	to: Quote,
): { low: number; high: number } | null {
	if (fromId === toId) return null
	if (toId === 'BRL') return { low: from.low, high: from.high }
	if (fromId === 'BRL') return { low: 1 / to.high, high: 1 / to.low }
	return null
}

/** The newest update among the quotes that took part (the real has no date of its own). */
export function lastUpdate(...quotes: Quote[]): Date | null {
	const times = quotes.map((quote) => quote.updatedAt.getTime()).filter((time) => time > 0)
	return times.length ? new Date(Math.max(...times)) : null
}

/**
 * Forex trades on weekdays: a fiat quote older than this is the last price before the market closed,
 * not a live one. Crypto never stops, so it is never "closed".
 */
export const STALE_AFTER_MS = 60 * 60 * 1000

export function isMarketClosed(updatedAt: Date | null, now: Date, crypto: boolean): boolean {
	if (!updatedAt || crypto) return false
	return now.getTime() - updatedAt.getTime() > STALE_AFTER_MS
}

/** Digits that keep small rates readable: 0,00356 ARS, 5,5035 USD, 426.516 BTC. */
function fractionDigits(value: number, crypto: boolean): { min: number; max: number } {
	const size = Math.abs(value)
	if (crypto) return size >= 1000 ? { min: 2, max: 2 } : { min: 2, max: 8 }
	if (size === 0 || size >= 100) return { min: 2, max: 2 }
	if (size >= 1) return { min: 2, max: 4 }
	// Below 1, keep four significant digits: 0,1817 · 0,003566 · 0,0008535.
	const leadingZeros = Math.max(0, -Math.floor(Math.log10(size)) - 1)
	return { min: 2, max: Math.min(10, leadingZeros + 4) }
}

/** An amount in a currency, in Brazilian notation: "R$ 5,50", "US$ 0,1817", "0,00234 BTC". */
export function formatMoney(value: number, currency: Currency, precise = false): string {
	const digits = precise
		? fractionDigits(value, Boolean(currency.crypto))
		: { min: 2, max: currency.crypto ? 8 : 2 }
	const options = { minimumFractionDigits: digits.min, maximumFractionDigits: digits.max }
	if (currency.crypto) {
		return `${new Intl.NumberFormat('pt-BR', options).format(value)} ${currency.code}`
	}
	return new Intl.NumberFormat('pt-BR', { ...options, style: 'currency', currency: currency.code })
		.format(value)
		.replace(/ /g, ' ')
}

/** A rate for "1 USD = R$ 5,5035": enough digits to compare, even for tiny values. */
export const formatRate = (value: number, currency: Currency) => formatMoney(value, currency, true)

/** "+0,81%", "−0,01%", "0,00%". */
export function formatChange(percent: number): string {
	const rounded = Math.round(percent * 100) / 100
	const text = new Intl.NumberFormat('pt-BR', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(Math.abs(rounded))
	return rounded > 0 ? `+${text}%` : rounded < 0 ? `−${text}%` : `${text}%`
}

/** Symbol shown inside the money field: "R$", "US$", "€", "BTC". */
export function currencySymbol(currency: Currency): string {
	if (currency.crypto) return currency.code
	const parts = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: currency.code,
	}).formatToParts(1)
	return parts.find((part) => part.type === 'currency')?.value ?? currency.code
}

/** Digits after the comma for amounts: 2 for most, 0 for iene/peso chileno/guarani, 8 for crypto. */
export function currencyDecimals(currency: Currency): number {
	if (currency.crypto) return 8
	return (
		new Intl.NumberFormat('pt-BR', { style: 'currency', currency: currency.code }).resolvedOptions()
			.maximumFractionDigits ?? 2
	)
}
