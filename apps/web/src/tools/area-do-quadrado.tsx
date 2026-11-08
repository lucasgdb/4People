'use client'

import { areas } from '@/lib/algorithms/areas'
import { areaOf, type FormulaField, FormulaTool, field } from './_shared/formula-tool'

const FIELDS: FormulaField[] = [field('side', 'Lado (L)')]

export default function SquareArea() {
	return <FormulaTool fields={FIELDS} compute={({ side = 0 }) => areaOf(areas.square(side))} />
}
