/* --------------------------------- Bhaskara ------------------------------- */

export function bhaskara(a: number, b: number, c: number) {
	const delta = b ** 2 - 4 * a * c
	if (delta < 0) {
		return {
			delta,
			roots: [] as number[],
			message: 'Delta menor que zero: não existem raízes reais.',
		}
	}
	const sqrt = Math.sqrt(delta)
	const x1 = (-b + sqrt) / (2 * a)
	const x2 = (-b - sqrt) / (2 * a)
	return delta === 0
		? { delta, roots: [x1], message: 'Delta igual a zero: existem duas raízes reais iguais.' }
		: {
				delta,
				roots: [x1, x2],
				message: 'Delta maior que zero: existem duas raízes reais distintas.',
			}
}

/* ----------------------------------- IMC ---------------------------------- */

export type Sex = 'male' | 'female'

export function bmi(heightMeters: number, weightKg: number, sex: Sex) {
	const value = weightKg / heightMeters ** 2
	const description =
		value < 17
			? 'Muito abaixo do peso'
			: value < 18.5
				? 'Abaixo do peso'
				: value < 25
					? 'Peso normal'
					: value < 30
						? 'Acima do peso'
						: value < 35
							? 'Obesidade grau I'
							: value < 40
								? 'Obesidade grau II (severa)'
								: 'Obesidade grau III (mórbida)'
	const idealWeight = sex === 'male' ? 72.7 * heightMeters - 58 : 62.1 * heightMeters - 44.7
	return { value, description, idealWeight }
}

/* ------------------------------ Divisão e resto --------------------------- */

export const division = (dividend: number, divisor: number) => ({
	quotient: dividend / divisor,
	integerQuotient: Math.trunc(dividend / divisor),
	rest: dividend % divisor,
})

/* -------------------------------- Temperatura ----------------------------- */

export type TemperatureUnit = 'C' | 'F' | 'K'

const toCelsius: Record<TemperatureUnit, (v: number) => number> = {
	C: (v) => v,
	F: (v) => (v - 32) / 1.8,
	K: (v) => v - 273.15,
}

const fromCelsius: Record<TemperatureUnit, (v: number) => number> = {
	C: (v) => v,
	F: (v) => v * 1.8 + 32,
	K: (v) => v + 273.15,
}

export const convertTemperature = (value: number, from: TemperatureUnit, to: TemperatureUnit) =>
	fromCelsius[to](toCelsius[from](value))

/* ------------------------------- Regra de três ------------------------------ */

/**
 * a está para b assim como c está para x. Direta: x = b·c / a. Inversa (grandezas inversamente
 * proporcionais, como velocidade e tempo): x = a·b / c.
 */
export function ruleOfThree(a: number, b: number, c: number, kind: 'direct' | 'inverse') {
	return kind === 'direct' ? (b * c) / a : (a * b) / c
}

/* ------------------------------ Juros compostos ----------------------------- */

export type CompoundInput = {
	principal: number
	monthlyDeposit: number
	/** Taxa em % ao mês ou ao ano. */
	rate: number
	ratePeriod: 'month' | 'year'
	months: number
}

export type CompoundRow = { month: number; invested: number; interest: number; balance: number }

/** Month-by-month compound growth; an annual rate becomes its equivalent monthly rate. */
export function compoundInterest({
	principal,
	monthlyDeposit,
	rate,
	ratePeriod,
	months,
}: CompoundInput) {
	const monthly = ratePeriod === 'year' ? (1 + rate / 100) ** (1 / 12) - 1 : rate / 100
	const rows: CompoundRow[] = []
	let balance = principal
	let invested = principal
	for (let month = 1; month <= months; month += 1) {
		balance = balance * (1 + monthly) + monthlyDeposit
		invested += monthlyDeposit
		rows.push({ month, invested, interest: balance - invested, balance })
	}
	return { monthlyRate: monthly * 100, invested, interest: balance - invested, balance, rows }
}
