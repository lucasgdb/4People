'use client'

import { Badge, DataList } from '@4people/ui'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { areFriendly } from '@/lib/algorithms/number-theory'
import { formatNumber } from '@/lib/format'
import { numeric } from '@/lib/schemas'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const friendlySchema = z.object({
	a: numeric({ integer: true, min: 1, max: 1_000_000_000_000 }),
	b: numeric({ integer: true, min: 1, max: 1_000_000_000_000 }),
})

/** Two numbers are friendly when each is the sum of the other's proper divisors (220 and 284). */
export default function FriendlyNumbers() {
	const [result, setResult] = useState<
		(ReturnType<typeof areFriendly> & { a: number; b: number }) | null
	>(null)
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
						{(f) => (
							<f.NumberField
								label="Primeiro número"
								placeholder="Ex: 220"
								integer
								min={1}
								max={1_000_000_000_000}
							/>
						)}
					</form.AppField>
					<form.AppField name="b">
						{(f) => (
							<f.NumberField
								label="Segundo número"
								placeholder="Ex: 284"
								integer
								min={1}
								max={1_000_000_000_000}
							/>
						)}
					</form.AppField>
				</div>
			</FormCard>
			<ResultCard
				empty={!result}
				copyText={
					result
						? `${result.a} e ${result.b} ${result.friendly ? 'são' : 'não são'} números amigáveis.`
						: ''
				}
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
