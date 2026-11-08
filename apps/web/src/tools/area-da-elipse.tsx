'use client'

import { areas } from '@/lib/algorithms/areas'
import { areaOf, type FormulaField, FormulaTool, field } from './_shared/formula-tool'

const FIELDS: FormulaField[] = [
	field('major', 'Semieixo maior (a)'),
	field('minor', 'Semieixo menor (b)', 'Ex: 6'),
]

export default function EllipseArea() {
	return (
		<FormulaTool
			fields={FIELDS}
			compute={({ major = 0, minor = 0 }) => areaOf(areas.ellipse(major, minor))}
		/>
	)
}
