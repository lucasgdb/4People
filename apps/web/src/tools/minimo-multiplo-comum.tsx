'use client'

import { lcm } from '@/lib/algorithms/number-theory'
import { formatNumber } from '@/lib/format'
import { integerList } from '@/lib/schemas'
import { SingleInputTool } from './_shared/single-input-tool'
import { OutputValue } from './_shared/tool-layout'

// Capped so the running product stays an exact (safe) integer.
const field = integerList({ minItems: 2, max: 1_000_000 })

/** Least common multiple (MMC) of any amount of numbers. */
export default function Lcm() {
	return (
		<SingleInputTool
			field={field}
			label="Números (separados por vírgula)"
			placeholder="Ex: 4, 6, 10"
			multiline
			compute={(numbers) => ({ numbers, result: lcm(numbers) })}
			toText={({ numbers, result }) => `MMC(${numbers.join(', ')}) = ${result}`}
			render={({ numbers, result }) => (
				<OutputValue>
					MMC({numbers.join(', ')}) = {formatNumber(result)}
				</OutputValue>
			)}
		/>
	)
}
