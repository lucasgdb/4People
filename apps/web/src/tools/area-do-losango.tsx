'use client'

import { areas } from '@/lib/algorithms/areas'
import { areaOf, type FormulaField, FormulaTool, field } from './_shared/formula-tool'

const FIELDS: FormulaField[] = [
	field('d1', 'Diagonal maior (D)'),
	field('d2', 'Diagonal menor (d)', 'Ex: 6'),
]

export default function DiamondArea() {
	return (
		<FormulaTool fields={FIELDS} compute={({ d1 = 0, d2 = 0 }) => areaOf(areas.diamond(d1, d2))} />
	)
}
