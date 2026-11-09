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

const resultToText = ({ n, k, arrangement, combination }: Result) =>
	`A(${n},${k}) = ${arrangement}\nC(${n},${k}) = ${combination}`

function BigValue({ value }: { value: bigint }) {
	return <span className="break-all">{formatBigInt(value)}</span>
}

/** Arrangement, combination, permutation and arrangement with repetition, exact with BigInt. */
export default function Combinatorics() {
	const [result, setResult] = useState<Result | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { n: '', k: '' },
		onSubmit: ({ n, k }) => setResult({ n, k, ...combinatorics(n, k) }),
	})

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
				<div className="grid grid-cols-2 items-end gap-4">
					<form.AppField name="n">
						{(field) => (
							<field.NumberField
								label="Total de elementos (n)"
								placeholder="Ex: 60"
								integer
								min={0}
								max={1000}
							/>
						)}
					</form.AppField>
					<form.AppField name="k">
						{(field) => (
							<field.NumberField
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
				copyText={result ? resultToText(result) : ''}
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
								value: <BigValue value={result.combination} />,
							},
							{
								label: `Arranjo A(${result.n}, ${result.k}): a ordem importa`,
								value: <BigValue value={result.arrangement} />,
							},
							{
								label: `Arranjo com repetição ${result.n}^${result.k}`,
								value: <BigValue value={result.arrangementWithRepetition} />,
							},
							{ label: `Permutação ${result.n}!`, value: <BigValue value={result.permutation} /> },
						]}
					/>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
