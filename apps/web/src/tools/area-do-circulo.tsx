'use client'

import { RadioGroup } from '@4people/ui'
import { useState } from 'react'
import { areas } from '@/lib/algorithms/areas'
import { areaOf, type FormulaField, FormulaTool, field } from './_shared/formula-tool'

const BY_RADIUS: FormulaField[] = [field('radius', 'Raio (r)')]
const BY_DIAMETER: FormulaField[] = [field('diameter', 'Diâmetro (d)')]
const MODES = [
	{ value: 'radius', label: 'Pelo raio' },
	{ value: 'diameter', label: 'Pelo diâmetro' },
] as const

/** Area of a circle from its radius or its diameter. */
export default function CircleArea() {
	const [mode, setMode] = useState<'radius' | 'diameter'>('radius')
	return (
		<div className="flex flex-col gap-4">
			<RadioGroup
				aria-label="Calcular a partir de"
				value={mode}
				onValueChange={setMode}
				options={MODES}
			/>
			{mode === 'radius' ? (
				<FormulaTool
					key="radius"
					fields={BY_RADIUS}
					compute={({ radius = 0 }) => areaOf(areas.circleByRadius(radius))}
				/>
			) : (
				<FormulaTool
					key="diameter"
					fields={BY_DIAMETER}
					compute={({ diameter = 0 }) => areaOf(areas.circleByDiameter(diameter))}
				/>
			)}
		</div>
	)
}
