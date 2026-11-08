'use client'

import { areas } from '@/lib/algorithms/areas'
import { areaOf, type FormulaField, FormulaTool, field } from './_shared/formula-tool'

const FIELDS: FormulaField[] = [
	field('radius', 'Raio (r)'),
	{
		name: 'angle',
		label: 'Ângulo (θ)',
		placeholder: 'Ex: 90',
		suffix: '°',
		constraints: { positive: true, max: 360 },
	},
]

export default function CircularSectorArea() {
	return (
		<FormulaTool
			fields={FIELDS}
			compute={({ radius = 0, angle = 0 }) => areaOf(areas.circularSector(radius, angle))}
		/>
	)
}
