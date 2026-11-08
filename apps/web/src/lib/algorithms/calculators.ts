/* ------------------------- Quadratic (Bhaskara) ------------------------- */

export function bhaskara(a: number, b: number, c: number) {
	const delta = b ** 2 - 4 * a * c
	if (delta < 0) {
		return {
			delta,
			roots: [] as number[],
			message: 'Delta menor que zero: não existem raízes reais.',
		}
	}
	const sqrtDelta = Math.sqrt(delta)
	const x1 = (-b + sqrtDelta) / (2 * a)
	const x2 = (-b - sqrtDelta) / (2 * a)
	if (delta === 0) {
		return { delta, roots: [x1], message: 'Delta igual a zero: existem duas raízes reais iguais.' }
	}
	return {
		delta,
		roots: [x1, x2],
		message: 'Delta maior que zero: existem duas raízes reais distintas.',
	}
}

/* ----------------------------------- BMI ---------------------------------- */

export type Sex = 'male' | 'female'

/** Each class applies to a BMI below `below`; anything above the last one is class III obesity. */
const BMI_CLASSES: ReadonlyArray<{ below: number; description: string }> = [
	{ below: 17, description: 'Muito abaixo do peso' },
	{ below: 18.5, description: 'Abaixo do peso' },
	{ below: 25, description: 'Peso normal' },
	{ below: 30, description: 'Acima do peso' },
	{ below: 35, description: 'Obesidade grau I' },
	{ below: 40, description: 'Obesidade grau II (severa)' },
]

const classifyBmi = (value: number) =>
	BMI_CLASSES.find(({ below }) => value < below)?.description ?? 'Obesidade grau III (mórbida)'

const idealWeightFor = (heightMeters: number, sex: Sex) =>
	sex === 'male' ? 72.7 * heightMeters - 58 : 62.1 * heightMeters - 44.7

export function bmi(heightMeters: number, weightKg: number, sex: Sex) {
	const value = weightKg / heightMeters ** 2
	return {
		value,
		description: classifyBmi(value),
		idealWeight: idealWeightFor(heightMeters, sex),
	}
}

/* ------------------------- Division and remainder ------------------------- */

/** The remainder keeps the dividend's sign, like `%`. */
export const division = (dividend: number, divisor: number) => ({
	quotient: dividend / divisor,
	integerQuotient: Math.trunc(dividend / divisor),
	remainder: dividend % divisor,
})

/* ------------------------------- Temperature ------------------------------ */

export type TemperatureUnit = 'C' | 'F' | 'K'

const toCelsius: Record<TemperatureUnit, (value: number) => number> = {
	C: (celsius) => celsius,
	F: (fahrenheit) => (fahrenheit - 32) / 1.8,
	K: (kelvin) => kelvin - 273.15,
}

const fromCelsius: Record<TemperatureUnit, (celsius: number) => number> = {
	C: (celsius) => celsius,
	F: (celsius) => celsius * 1.8 + 32,
	K: (celsius) => celsius + 273.15,
}

export const convertTemperature = (value: number, from: TemperatureUnit, to: TemperatureUnit) =>
	fromCelsius[to](toCelsius[from](value))

/* ------------------------------ Rule of three ------------------------------ */

/**
 * a is to b as c is to x. Direct: x = b·c / a. Inverse (inversely proportional quantities, such as
 * speed and time): x = a·b / c.
 */
export function ruleOfThree(a: number, b: number, c: number, kind: 'direct' | 'inverse') {
	return kind === 'direct' ? (b * c) / a : (a * b) / c
}

/* ---------------------------- Compound interest ---------------------------- */

export type CompoundInput = {
	principal: number
	monthlyDeposit: number
	/** Percent per month or per year, according to `ratePeriod`. */
	rate: number
	ratePeriod: 'month' | 'year'
	months: number
}

export type CompoundRow = { month: number; invested: number; interest: number; balance: number }

/** An annual rate becomes its equivalent compound monthly rate, not rate / 12. */
const monthlyRateOf = (rate: number, ratePeriod: CompoundInput['ratePeriod']) =>
	ratePeriod === 'year' ? (1 + rate / 100) ** (1 / 12) - 1 : rate / 100

/** Month-by-month compound growth; deposits are made at the end of each month. */
export function compoundInterest({
	principal,
	monthlyDeposit,
	rate,
	ratePeriod,
	months,
}: CompoundInput) {
	const monthlyRate = monthlyRateOf(rate, ratePeriod)
	const rows: CompoundRow[] = []
	let balance = principal
	let invested = principal
	for (let month = 1; month <= months; month += 1) {
		balance = balance * (1 + monthlyRate) + monthlyDeposit
		invested += monthlyDeposit
		rows.push({ month, invested, interest: balance - invested, balance })
	}
	return { monthlyRate: monthlyRate * 100, invested, interest: balance - invested, balance, rows }
}
