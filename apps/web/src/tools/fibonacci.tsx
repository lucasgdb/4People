'use client'

import { DataList } from '@4people/ui'
import { fibonacci } from '@/lib/algorithms/number-theory'
import { numeric } from '@/lib/schemas'
import { SingleInputTool } from './_shared/single-input-tool'
import { OutputBlock } from './_shared/tool-layout'

const LIMITS = { integer: true, min: 1, max: 5000 }
const field = numeric(LIMITS)

/** The first n Fibonacci terms, exact (BigInt) at any size. */
export default function Fibonacci() {
	return (
		<SingleInputTool
			field={field}
			numeric={LIMITS}
			label="Quantidade de termos"
			placeholder="Ex: 20"
			submitLabel="Gerar sequência"
			compute={(amount) => {
				const terms = fibonacci(amount)
				return { amount, sequence: terms.join(', '), lastTerm: terms.at(-1) }
			}}
			toText={({ sequence }) => sequence}
			render={({ amount, sequence, lastTerm }) => (
				<div className="flex flex-col gap-4">
					<DataList
						columns={1}
						items={[
							{
								label: `${amount}º termo`,
								value: <span className="break-all">{String(lastTerm)}</span>,
							},
						]}
					/>
					<OutputBlock code={false} className="tabular">
						{sequence}
					</OutputBlock>
				</div>
			)}
		/>
	)
}
