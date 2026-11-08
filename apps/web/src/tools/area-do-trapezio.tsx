'use client'

import { areas } from '@/lib/algorithms/areas'
import { areaOf, type FormulaField, FormulaTool, field } from './_shared/formula-tool'

const FIELDS: FormulaField[] = [
	field('major', 'Base maior (B)'),
	field('minor', 'Base menor (b)', 'Ex: 6'),
	field('height', 'Altura (h)'),
]

export default function TrapezeArea() {
	return (
		<FormulaTool
			fields={FIELDS}
			compute={({ major = 0, minor = 0, height = 0 }) =>
				areaOf(areas.trapezoid(major, minor, height))
			}
		/>
	)
}
