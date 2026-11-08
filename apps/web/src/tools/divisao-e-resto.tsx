'use client'

import { division } from '@/lib/algorithms/calculators'
import { type FormulaField, FormulaTool } from './_shared/formula-tool'

const FIELDS: FormulaField[] = [
	{ name: 'dividend', label: 'Dividendo', placeholder: 'Ex: 17', constraints: {} },
	{ name: 'divisor', label: 'Divisor', placeholder: 'Ex: 5', constraints: {} },
]

const refine = ({ divisor }: Record<string, number>) =>
	divisor === 0 ? 'Não é possível dividir por zero.' : undefined

/** Quotient, integer quotient and remainder (the remainder keeps the dividend's sign). */
export default function DivisionRest() {
	return (
		<FormulaTool
			fields={FIELDS}
			refine={refine}
			compute={({ dividend = 0, divisor = 1 }) => {
				const { quotient, integerQuotient, remainder } = division(dividend, divisor)
				return [
					{ label: 'Quociente', value: quotient },
					{ label: 'Quociente inteiro', value: integerQuotient },
					{ label: 'Resto (módulo)', value: remainder },
				]
			}}
		/>
	)
}
