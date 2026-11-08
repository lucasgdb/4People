'use client'

import { gcd } from '@/lib/algorithms/number-theory'
import { formatNumber } from '@/lib/format'
import { integerList } from '@/lib/schemas'
import { SingleInputTool } from './_shared/single-input-tool'
import { OutputValue } from './_shared/tool-layout'

const field = integerList({ minItems: 2 })

/** Greatest common divisor (MDC) of any amount of numbers, by Euclid's algorithm. */
export default function Gcd() {
	return (
		<SingleInputTool
			field={field}
			label="Números (separados por vírgula)"
			placeholder="Ex: 12, 18, 24"
			multiline
			compute={(numbers) => ({ numbers, result: gcd(numbers) })}
			toText={({ numbers, result }) => `MDC(${numbers.join(', ')}) = ${result}`}
			render={({ numbers, result }) => (
				<OutputValue>
					MDC({numbers.join(', ')}) = {formatNumber(result)}
				</OutputValue>
			)}
		/>
	)
}
