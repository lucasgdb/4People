/**
 * Percentage math. Every function takes and returns "human" percentages: 15 means 15%, not 0.15.
 * Divisions by zero return `NaN`/`Infinity`; callers validate first.
 */

/** `percent`% of `value`: 15% of 200 = 30. */
export const percentOf = (percent: number, value: number) => (percent / 100) * value

/** What percent `part` is of `whole`: 30 of 200 = 15%. */
export const percentOfWhole = (part: number, whole: number) => (part / whole) * 100

/** The whole that `part` is `percent`% of: 30 is 15% of 200. */
export const wholeFromPart = (part: number, percent: number) => part / (percent / 100)

/** Percent change from `from` to `to`, negative for a drop: 50 → 75 = +50%. */
export const percentChange = (from: number, to: number) => ((to - from) / Math.abs(from)) * 100

/** `value` increased by `percent`%: 200 + 10% = 220. */
export const addPercent = (value: number, percent: number) => value * (1 + percent / 100)

/** `value` discounted by `percent`%: 200 − 10% = 180. */
export const subtractPercent = (value: number, percent: number) => value * (1 - percent / 100)

/**
 * The value before a change of `percent`% (negative for a discount) that resulted in `final`:
 * 220 after +10% was 200; 180 after −10% was 200.
 */
export const valueBeforeChange = (final: number, percent: number) => final / (1 + percent / 100)

/**
 * Changes applied one after another (+10%, −20%…) and the single equivalent change.
 * +10% then −10% does not return to the start: the total is −1%.
 */
export function chainChanges(changes: readonly number[]) {
	const factor = changes.reduce((product, change) => product * (1 + change / 100), 1)
	return { factor, total: (factor - 1) * 100 }
}

/**
 * Margin is profit over the selling price; markup is profit over the cost.
 * Cost 80, price 100: profit 20, margin 20%, markup 25%.
 */
export function marginAndMarkup(cost: number, price: number) {
	const profit = price - cost
	return { profit, margin: (profit / price) * 100, markup: (profit / cost) * 100 }
}

/**
 * Difference between two rates, in percentage points and as a relative change.
 * From 10% to 12%: +2 p.p., which is a 20% increase in the rate.
 */
export function rateDifference(fromRate: number, toRate: number) {
	return { points: toRate - fromRate, relative: percentChange(fromRate, toRate) }
}

/**
 * Parses a list such as "+10, -5; 2,5%" (a comma followed by a digit is a decimal separator).
 * Returns null if any item is not a number.
 */
export function parseChanges(input: string): number[] | null {
	const items = input
		.split(/[;\s]+|,(?=[\s+-])/)
		.map((item) => item.trim().replace(/%$/, '').replace(/\s/g, '').replace(',', '.'))
		.filter(Boolean)
	const numbers = items.map(Number)
	return numbers.length > 0 && numbers.every(Number.isFinite) ? numbers : null
}
