'use client'

import { Badge, DataList } from '@4people/ui'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { areFriendly } from '@/lib/algorithms/number-theory'
import { formatNumber } from '@/lib/format'
import { numeric } from '@/lib/schemas'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const MAX = 1_000_000_000_000

const friendlySchema = z.object({
	a: numeric({ integer: true, min: 1, max: MAX }),
	b: numeric({ integer: true, min: 1, max: MAX }),
})

type Result = ReturnType<typeof areFriendly> & { a: number; b: number }

const resultToText = ({ a, b, friendly }: Result) =>
	`${a} e ${b} ${friendly ? 'são' : 'não são'} números amigáveis.`

/** Two numbers are friendly when each is the sum of the other's proper divisors (220 and 284). */
export default function FriendlyNumbers() {
	const [result, setResult] = useState<Result | null>(null)
	const form = useToolForm({
		schema: friendlySchema,
		defaultValues: { a: '', b: '' },
		onSubmit: ({ a, b }) => setResult({ a, b, ...areFriendly(a, b) }),
	})

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>Verificar</form.SubmitButton>
					</form.AppForm>
				}
			>
				<div className="grid grid-cols-2 items-end gap-x-3 gap-y-4 sm:gap-x-4">
					<form.AppField name="a">
						{(field) => (
							<field.NumberField
								label="Primeiro número"
								placeholder="Ex: 220"
								integer
								min={1}
								max={MAX}
							/>
						)}
					</form.AppField>
					<form.AppField name="b">
						{(field) => (
							<field.NumberField
								label="Segundo número"
								placeholder="Ex: 284"
								integer
								min={1}
								max={MAX}
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
					<div className="flex flex-col gap-4">
						<Badge tone={result.friendly ? 'success' : 'danger'} className="w-fit text-sm">
							{result.friendly ? 'São números amigáveis' : 'Não são números amigáveis'}
						</Badge>
						<DataList
							items={[
								{
									label: `Soma dos divisores de ${formatNumber(result.a)}`,
									value: formatNumber(result.sumA),
								},
								{
									label: `Soma dos divisores de ${formatNumber(result.b)}`,
									value: formatNumber(result.sumB),
								},
							]}
						/>
					</div>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
