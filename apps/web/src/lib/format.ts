const cache = new Map<number, Intl.NumberFormat>()

/** pt-BR number formatting with up to `maxFractionDigits` decimals. */
export function formatNumber(value: number, maxFractionDigits = 6): string {
	if (!Number.isFinite(value)) return value > 0 ? '∞' : value < 0 ? '−∞' : 'Indefinido'
	let formatter = cache.get(maxFractionDigits)
	if (!formatter) {
		formatter = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: maxFractionDigits })
		cache.set(maxFractionDigits, formatter)
	}
	return formatter.format(value)
}

export const formatDate = (date: Date) =>
	new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(date)

export function downloadText(filename: string, text: string) {
	const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
	const anchor = Object.assign(document.createElement('a'), { href: url, download: filename })
	anchor.click()
	URL.revokeObjectURL(url)
}

/** Exact thousands separators for BigInt results (factorials, combinations, base conversions). */
export const formatBigInt = (value: bigint) => new Intl.NumberFormat('pt-BR').format(value)

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
export const formatCurrency = (value: number) => currency.format(value)
