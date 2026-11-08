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

const MS_PER = {
	second: 1_000,
	minute: 60_000,
	hour: 3_600_000,
	day: 86_400_000,
	week: 604_800_000,
	month: 2_629_800_000, // average month: 30.4375 days
	year: 31_557_600_000, // average year: 365.25 days
} as const

/** Same wall-clock instant expressed in UTC, so DST transitions don't skew day counts. */
const wallClock = (date: Date) =>
	Date.UTC(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds(),
	)

/** Adds months clamping the day to the target month's last day (Jan 31 + 1 month = Feb 28 or 29). */
function addMonthsClamped(date: Date, months: number): Date {
	const target = new Date(date)
	target.setDate(1)
	target.setMonth(target.getMonth() + months)
	const lastDayOfMonth = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
	target.setDate(Math.min(date.getDate(), lastDayOfMonth))
	return target
}

/** Calendar-aware difference in years, months and days, regardless of argument order. */
export function calendarDifference(first: Date, second: Date) {
	const [start, end] = first <= second ? [first, second] : [second, first]
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
		days: Math.floor((wallClock(end) - wallClock(anchor)) / MS_PER.day),
	}
}

export function dateDifference(first: Date, second: Date) {
	const elapsedMs = Math.abs(second.getTime() - first.getTime())
	return {
		calendar: calendarDifference(first, second),
		milliseconds: elapsedMs,
		seconds: Math.trunc(elapsedMs / MS_PER.second),
		minutes: Math.trunc(elapsedMs / MS_PER.minute),
		hours: Math.trunc(elapsedMs / MS_PER.hour),
		days: Math.trunc(elapsedMs / MS_PER.day),
		weeks: Math.trunc(elapsedMs / MS_PER.week),
		months: Math.trunc(elapsedMs / MS_PER.month),
		years: Math.trunc(elapsedMs / MS_PER.year),
	}
}

/* ------------------------------ Date helpers ------------------------------ */

const twoDigits = (value: number) => String(value).padStart(2, '0')

/** Local calendar date as ISO ("2026-11-07"), the format DateField stores. */
export const toISODate = (date: Date) =>
	`${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}`

/** Local "hh:mm", the format TimeField stores. */
export const toTime = (date: Date) =>
	`${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}`

/** ISO date (+ optional hh:mm) as a local Date; `new Date("2026-11-07")` would read it as UTC. */
export function fromISODate(iso: string, time = '00:00'): Date {
	const [year = 0, month = 1, day = 1] = iso.split('-').map(Number)
	const [hours = 0, minutes = 0] = time.split(':').map(Number)
	return new Date(year, month - 1, day, hours, minutes)
}
