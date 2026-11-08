/**
 * Number-input behaviour shared by the design system's numeric fields: what can be typed, and the
 * spinbutton keys (APG "spinbutton" pattern). Values stay strings while typing (the form's Zod
 * schema converts them); a comma is the decimal separator people type in pt-BR, a dot is accepted.
 */

export type NumericOptions = {
	min?: number
	max?: number
	/** Arrow-key step (default 1). Shift multiplies by 10, PageUp/PageDown too. */
	step?: number
	/** Whole numbers only: no decimal separator. */
	integer?: boolean
	/** Allow a leading minus. Default: only when `min` is undefined or below zero. */
	allowNegative?: boolean
}

const allowsNegative = ({ min, allowNegative }: NumericOptions) =>
	allowNegative ?? (min === undefined || min < 0)

/** Keeps only what a number can contain: digits, one decimal separator, a leading minus. */
export function sanitizeNumeric(raw: string, options: NumericOptions = {}): string {
	const negative = allowsNegative(options) && raw.trimStart().startsWith('-')
	let seenSeparator = false
	let out = ''
	for (const char of raw) {
		if (char >= '0' && char <= '9') out += char
		else if ((char === ',' || char === '.') && !options.integer && !seenSeparator) {
			seenSeparator = true
			out += char
		}
	}
	return negative ? `-${out}` : out
}

/** "1,5" or "1.5" → 1.5; empty, "-" or "," → null. */
export function readNumeric(text: string): number | null {
	if (!/\d/.test(text)) return null
	const value = Number(text.replace(',', '.'))
	return Number.isFinite(value) ? value : null
}

const clamp = (value: number, { min, max }: NumericOptions) =>
	Math.min(max ?? Number.POSITIVE_INFINITY, Math.max(min ?? Number.NEGATIVE_INFINITY, value))

/** Formats like the user typed: the same separator, and no float noise (0.1 + 0.2). */
function formatLike(value: number, previous: string, step: number): string {
	const decimals = Math.max(
		(String(step).split('.')[1] ?? '').length,
		(previous.split(/[.,]/)[1] ?? '').length,
	)
	const text = decimals > 0 ? value.toFixed(Math.min(decimals, 10)) : String(Math.round(value))
	return previous.includes(',') ? text.replace('.', ',') : text
}

/**
 * The new text for a spinbutton key, or null when the key is not one (let it through):
 * ↑/↓ = ±step (Shift: ×10), PageUp/PageDown = ±10 steps, Home/End = min/max when defined.
 * An empty field starts from the minimum (or 0) going up.
 */
export function stepNumeric(
	text: string,
	key: string,
	shiftKey: boolean,
	options: NumericOptions = {},
): string | null {
	const step = options.step ?? 1
	const current = readNumeric(text)
	let next: number
	if (key === 'Home' && options.min !== undefined) next = options.min
	else if (key === 'End' && options.max !== undefined) next = options.max
	else {
		const amount =
			key === 'ArrowUp'
				? step
				: key === 'ArrowDown'
					? -step
					: key === 'PageUp'
						? step * 10
						: key === 'PageDown'
							? -step * 10
							: 0
		if (amount === 0) return null
		const base = current ?? (amount > 0 ? (options.min ?? 0) - amount : (options.max ?? 0) - amount)
		next = base + (shiftKey && (key === 'ArrowUp' || key === 'ArrowDown') ? amount * 10 : amount)
	}
	return formatLike(clamp(next, options), text, step)
}
