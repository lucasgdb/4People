import { z } from 'zod'

const parseDecimal = (value: string) => Number(value.trim().replace(/\s/g, '').replace(',', '.'))

type NumberOptions = {
	min?: number
	max?: number
	/** Rejects zero and negatives. */
	positive?: boolean
	integer?: boolean
	required?: string
}

/** A text field that must contain a number (accepts `1,5` and `1.5`). Output: `number`. */
export function numeric({
	min,
	max,
	positive,
	integer,
	required = 'Informe um valor.',
}: NumberOptions = {}) {
	let schema = z.number({ error: 'Digite um número válido.' })
	if (integer) schema = schema.int('Digite um número inteiro.')
	if (positive) schema = schema.positive('O valor deve ser maior que zero.')
	if (min !== undefined) schema = schema.min(min, `O valor mínimo é ${min}.`)
	if (max !== undefined)
		schema = schema.max(max, `O valor máximo é ${max.toLocaleString('pt-BR')}.`)

	return z.string().trim().min(1, required).transform(parseDecimal).pipe(schema)
}

/** Comma/space separated list of positive integers. Output: `number[]`. */
export function integerList({ min = 1, minItems = 1, max = 1_000_000_000 } = {}) {
	return z
		.string()
		.trim()
		.min(1, 'Informe pelo menos um número.')
		.transform((value) =>
			value
				.split(/[\s,;]+/)
				.filter(Boolean)
				.map(Number),
		)
		.pipe(
			z
				.array(
					z
						.number({ error: 'Use apenas números separados por vírgula.' })
						.int('Use apenas números inteiros.')
						.min(min, `Os números devem ser maiores ou iguais a ${min}.`)
						.max(max, `Os números devem ser menores que ${max.toLocaleString('pt-BR')}.`),
				)
				.min(minItems, `Informe pelo menos ${minItems} números.`),
		)
}

/** An ISO date from DateField ("2026-11-07"). While typing, the field holds the masked text. */
export const isoDate = (message = 'Informe a data.') =>
	z
		.string()
		.min(1, message)
		.refine(
			(value) => /^\d{4}-\d{2}-\d{2}$/.test(value),
			'Data incompleta ou inválida. Use dd/mm/aaaa.',
		)

/** A 24h time from TimeField ("09:30"). */
export const time = (message = 'Informe o horário.') =>
	z
		.string()
		.min(1, message)
		.refine(
			(value) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value),
			'Horário inválido. Use hh:mm, de 00:00 a 23:59.',
		)
