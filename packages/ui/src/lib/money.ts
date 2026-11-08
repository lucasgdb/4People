/**
 * Money typed the Brazilian way: "." groups thousands, "," starts the cents. The text is reformatted
 * on every keystroke ("1234,5" → "1.234,5"), so people see the amount as they will read it.
 */

const group = (digits: string) => digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

/**
 * Formats what was typed. Dots are grouping only (they are rebuilt), the first comma starts the
 * fraction, which keeps at most `decimals` digits. "" stays "" so the field can be emptied.
 */
export function formatMoneyInput(text: string, decimals: number): string {
	const comma = text.indexOf(',')
	const hasFraction = comma !== -1 && decimals > 0
	const whole = (comma === -1 ? text : text.slice(0, comma)).replace(/\D/g, '')
	const fraction = hasFraction
		? text
				.slice(comma + 1)
				.replace(/\D/g, '')
				.slice(0, decimals)
		: ''
	if (!whole && !hasFraction) return ''
	const integer = whole.replace(/^0+(?=\d)/, '') || '0'
	return group(integer) + (hasFraction ? `,${fraction}` : '')
}

/** "1.234,56" → 1234.56; empty or digit-less → null. */
export function parseMoneyInput(text: string): number | null {
	if (!/\d/.test(text)) return null
	const value = Number(text.replace(/\./g, '').replace(',', '.'))
	return Number.isFinite(value) ? value : null
}

/** A computed amount in the same format, without trailing zeros past the cents: 1234.5 → "1.234,50". */
export function formatMoneyValue(value: number, decimals: number): string {
	if (!Number.isFinite(value)) return ''
	const fixed = Math.abs(value).toFixed(decimals)
	const [integer = '0', fraction = ''] = fixed.split('.')
	// Crypto-sized fractions (8 digits) drop the zeros nobody reads, but keep at least two.
	const trimmed = decimals > 2 ? fraction.replace(/0+$/, '').padEnd(2, '0') : fraction
	return `${value < 0 ? '-' : ''}${group(integer)}${trimmed ? `,${trimmed}` : ''}`
}

/**
 * Where the caret goes after reformatting: right after the same number of digits and commas that
 * were before it, so typing in the middle doesn't jump to the end.
 */
export function caretAfterFormat(raw: string, caret: number, formatted: string): number {
	const meaningful = (char: string) => /[\d,]/.test(char)
	let wanted = 0
	for (const char of raw.slice(0, caret)) if (meaningful(char)) wanted++
	if (wanted === 0) return 0
	let seen = 0
	for (let i = 0; i < formatted.length; i++) {
		if (meaningful(formatted[i] ?? '')) seen++
		if (seen === wanted) return i + 1
	}
	return formatted.length
}
