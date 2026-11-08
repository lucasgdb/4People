'use client'

import { DataList } from '@4people/ui'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { combinatorics } from '@/lib/algorithms/number-theory'
import { formatBigInt } from '@/lib/format'
import { numeric } from '@/lib/schemas'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const schema = z
	.object({
		n: numeric({ integer: true, min: 0, max: 1000 }),
		k: numeric({ integer: true, min: 0, max: 1000 }),
	})
	.refine(({ n, k }) => k <= n, { message: 'k não pode ser maior que n.', path: ['k'] })

type Result = ReturnType<typeof combinatorics> & { n: number; k: number }

/** Arrangement, combination, permutation and arrangement with repetition, exact with BigInt. */
export default function Combinatorics() {
	const [result, setResult] = useState<Result | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { n: '', k: '' },
		onSubmit: ({ n, k }) => setResult({ n, k, ...combinatorics(n, k) }),
	})
	const big = (value: bigint) => <span className="break-all">{formatBigInt(value)}</span>

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>Calcular</form.SubmitButton>
					</form.AppForm>
				}
			>
				<div className="grid grid-cols-2 items-end gap-x-3 gap-y-4 sm:gap-x-4">
					<form.AppField name="n">
						{(f) => (
							<f.NumberField
								label="Total de elementos (n)"
								placeholder="Ex: 60"
								integer
								min={0}
								max={1000}
							/>
						)}
					</form.AppField>
					<form.AppField name="k">
						{(f) => (
							<f.NumberField
								label="Elementos escolhidos (k)"
								placeholder="Ex: 6"
								integer
								min={0}
								max={1000}
							/>
						)}
					</form.AppField>
				</div>
			</FormCard>
			<ResultCard
				empty={!result}
				copyText={
					result
						? `A(${result.n},${result.k}) = ${result.arrangement}\nC(${result.n},${result.k}) = ${result.combination}`
						: ''
				}
				onClear={() => {
					setResult(null)
					form.reset()
				}}
			>
				{result ? (
					<DataList
						columns={1}
						items={[
							{
								label: `Combinação C(${result.n}, ${result.k}): a ordem não importa`,
								value: big(result.combination),
							},
							{
								label: `Arranjo A(${result.n}, ${result.k}): a ordem importa`,
								value: big(result.arrangement),
							},
							{
								label: `Arranjo com repetição ${result.n}^${result.k}`,
								value: big(result.arrangementWithRepetition),
							},
							{ label: `Permutação ${result.n}!`, value: big(result.permutation) },
						]}
					/>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
