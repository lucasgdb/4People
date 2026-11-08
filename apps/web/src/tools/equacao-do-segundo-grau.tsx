'use client'

import { bhaskara } from '@/lib/algorithms/calculators'
import { formatNumber } from '@/lib/format'
import { type FormulaField, FormulaTool } from './_shared/formula-tool'

const FIELDS: FormulaField[] = [
	{ name: 'a', label: 'Coeficiente a', placeholder: 'Ex: 1', constraints: {} },
	{ name: 'b', label: 'Coeficiente b', placeholder: 'Ex: -3', constraints: {} },
	{ name: 'c', label: 'Coeficiente c', placeholder: 'Ex: 2', constraints: {} },
]

const refine = ({ a }: Record<string, number>) =>
	a === 0 ? 'O coeficiente "a" não pode ser zero.' : undefined

/** ax² + bx + c = 0 by Bhaskara's formula. */
export default function Bhaskara() {
	return (
		<FormulaTool
			fields={FIELDS}
			refine={refine}
			compute={({ a = 1, b = 0, c = 0 }) => {
				const { delta, roots, message } = bhaskara(a, b, c)
				if (roots.length === 0) return `Δ = ${formatNumber(delta)}. ${message}`
				const rootLabels = roots.length === 1 ? ['x₁ = x₂'] : ['x₁', 'x₂']
				return [
					{ label: 'Delta (Δ)', value: delta },
					...roots.map((value, index) => ({ label: rootLabels[index] ?? '', value })),
				]
			}}
		/>
	)
}
