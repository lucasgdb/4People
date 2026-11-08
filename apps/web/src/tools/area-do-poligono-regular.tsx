'use client'

import { areas } from '@/lib/algorithms/areas'
import { areaOf, type FormulaField, FormulaTool, field } from './_shared/formula-tool'

const FIELDS: FormulaField[] = [
	{
		name: 'sides',
		label: 'Quantidade de lados (n)',
		placeholder: 'Ex: 8',
		constraints: { integer: true, min: 3, max: 1000 },
	},
	field('side', 'Medida do lado (L)'),
]

export default function RegularPolygonArea() {
	return (
		<FormulaTool
			fields={FIELDS}
			compute={({ sides = 3, side = 0 }) => areaOf(areas.regularPolygon(sides, side))}
		/>
	)
}
