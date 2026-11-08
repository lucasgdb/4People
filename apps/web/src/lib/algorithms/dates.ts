export type DateUnit = 'days' | 'weeks' | 'months' | 'years'

export function shiftDate(date: Date, amount: number, unit: DateUnit): Date {
	const result = new Date(date)
	switch (unit) {
		case 'days':
			result.setDate(result.getDate() + amount)
			break
		case 'weeks':
			result.setDate(result.getDate() + amount * 7)
			break
		case 'months':
			result.setMonth(result.getMonth() + amount)
			break
		case 'years':
			result.setFullYear(result.getFullYear() + amount)
			break
	}
	return result
}

const MS = {
	second: 1_000,
	minute: 60_000,
	hour: 3_600_000,
	day: 86_400_000,
	month: 2_629_800_000, // 30,4375 dias
	year: 31_557_600_000, // 365,25 dias
} as const

/** Same wall-clock instant expressed in UTC, so DST transitions don't skew day counts. */
const wallClock = (d: Date) =>
	Date.UTC(
		d.getFullYear(),
		d.getMonth(),
		d.getDate(),
		d.getHours(),
		d.getMinutes(),
		d.getSeconds(),
		d.getMilliseconds(),
	)

/** Adds months clamping the day to the target month's last day (31/jan + 1 mês = 28 ou 29/fev). */
function addMonthsClamped(date: Date, months: number): Date {
	const target = new Date(date)
	target.setDate(1)
	target.setMonth(target.getMonth() + months)
	const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
	target.setDate(Math.min(date.getDate(), lastDay))
	return target
}

/** Calendar-aware difference in years, months and days (replaces the old PHP `DateTime::diff`). */
export function calendarDifference(a: Date, b: Date) {
	const [start, end] = a <= b ? [a, b] : [b, a]
	let totalMonths =
		(end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth()
	let anchor = addMonthsClamped(start, totalMonths)
	while (totalMonths > 0 && wallClock(anchor) > wallClock(end)) {
		totalMonths -= 1
		anchor = addMonthsClamped(start, totalMonths)
	}
	return {
		years: Math.trunc(totalMonths / 12),
		months: totalMonths % 12,
		days: Math.floor((wallClock(end) - wallClock(anchor)) / MS.day),
	}
}

export function dateDifference(a: Date, b: Date) {
	const ms = Math.abs(b.getTime() - a.getTime())
	return {
		calendar: calendarDifference(a, b),
		milliseconds: ms,
		seconds: Math.trunc(ms / MS.second),
		minutes: Math.trunc(ms / MS.minute),
		hours: Math.trunc(ms / MS.hour),
		days: Math.trunc(ms / MS.day),
		weeks: Math.trunc(ms / (MS.day * 7)),
		months: Math.trunc(ms / MS.month),
		years: Math.trunc(ms / MS.year),
	}
}

/* ------------------------------- Date helpers ------------------------------- */

const pad = (n: number) => String(n).padStart(2, '0')

/** Local calendar date as ISO ("2026-11-07"), the format DateField stores. */
export const toISODate = (date: Date) =>
	`${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

/** Local "hh:mm", the format TimeField stores. */
export const toTime = (date: Date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`

/** ISO date (+ optional hh:mm) as a local Date; `new Date("2026-11-07")` would read it as UTC. */
export function fromISODate(iso: string, time = '00:00'): Date {
	const [y = 0, m = 1, d = 1] = iso.split('-').map(Number)
	const [h = 0, min = 0] = time.split(':').map(Number)
	return new Date(y, m - 1, d, h, min)
}
