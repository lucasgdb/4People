'use client'

import { areas } from '@/lib/algorithms/areas'
import { areaOf, type FormulaField, FormulaTool, field } from './_shared/formula-tool'

const FIELDS: FormulaField[] = [
	field('outer', 'Raio maior (R)'),
	field('inner', 'Raio menor (r)', 'Ex: 6'),
]

const refine = ({ outer = 0, inner = 0 }: Record<string, number>) =>
	inner >= outer ? 'O raio menor deve ser menor que o raio maior.' : undefined

export default function CircularCrownArea() {
	return (
		<FormulaTool
			fields={FIELDS}
			refine={refine}
			compute={({ outer = 0, inner = 0 }) => areaOf(areas.circularCrown(outer, inner))}
		/>
	)
}
