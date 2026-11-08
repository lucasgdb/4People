'use client'

import { areas } from '@/lib/algorithms/areas'
import { areaOf, type FormulaField, FormulaTool, field } from './_shared/formula-tool'

const FIELDS: FormulaField[] = [field('base', 'Base (b)'), field('height', 'Altura (h)')]

export default function TriangleArea() {
	return (
		<FormulaTool
			fields={FIELDS}
			compute={({ base = 0, height = 0 }) => areaOf(areas.triangle(base, height))}
		/>
	)
}
