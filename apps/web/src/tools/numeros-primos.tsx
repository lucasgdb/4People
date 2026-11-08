'use client'

import { Badge } from '@4people/ui'
import { Check } from 'lucide-react'
import { isPrime } from '@/lib/algorithms/number-theory'
import { integerList } from '@/lib/schemas'
import { SingleInputTool } from './_shared/single-input-tool'

const field = integerList({ min: 0, max: 1_000_000_000_000 })

/** Marks which numbers of a list are prime. Each number is tested once. */
export default function PrimeNumbers() {
	return (
		<SingleInputTool
			field={field}
			label="Números (separados por vírgula)"
			placeholder="Ex: 1, 3, 11, 20, 97"
			multiline
			submitLabel="Verificar"
			compute={(numbers) => numbers.map((number) => ({ number, prime: isPrime(number) }))}
			toText={(rows) => {
				const primes = rows.filter((row) => row.prime).map((row) => row.number)
				return primes.length > 0 ? `Primos: ${primes.join(', ')}` : 'Nenhum número primo.'
			}}
			render={(rows) => {
				const count = rows.filter((row) => row.prime).length
				return (
					<div className="flex flex-wrap gap-2">
						{rows.map(({ number, prime }, index) => (
							<Badge
								// biome-ignore lint/suspicious/noArrayIndexKey: the list may repeat numbers
								key={index}
								tone={prime ? 'success' : 'neutral'}
								className="tabular px-3 text-sm"
							>
								{number}
								{prime ? <Check aria-label="primo" /> : null}
							</Badge>
						))}
						<p className="text-fg-muted w-full pt-2 text-sm">
							{count} de {rows.length} {rows.length === 1 ? 'número é primo' : 'números são primos'}
							.
						</p>
					</div>
				)
			}}
		/>
	)
}
