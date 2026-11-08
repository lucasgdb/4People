'use client'

import { Badge, DataList } from '@4people/ui'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { bmi } from '@/lib/algorithms/calculators'
import { formatNumber } from '@/lib/format'
import { numeric } from '@/lib/schemas'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const schema = z.object({
	sex: z.enum(['male', 'female']),
	weight: numeric({ positive: true, max: 700 }),
	height: numeric({ positive: true, max: 3 }),
})

export default function Bmi() {
	const [result, setResult] = useState<ReturnType<typeof bmi> | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { sex: 'male', weight: '', height: '' },
		onSubmit: ({ height, weight, sex }) => setResult(bmi(height, weight, sex)),
	})

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>Calcular IMC</form.SubmitButton>
					</form.AppForm>
				}
			>
				<form.AppField name="sex">
					{(field) => (
						<field.RadioField
							label="Sexo"
							options={[
								{ value: 'male', label: 'Masculino' },
								{ value: 'female', label: 'Feminino' },
							]}
						/>
					)}
				</form.AppField>
				<div className="grid grid-cols-2 items-end gap-x-3 gap-y-4 sm:gap-x-4">
					<form.AppField name="weight">
						{(field) => (
							<field.NumberField
								label="Peso"
								placeholder="Ex: 70"
								suffix="kg"
								allowNegative={false}
								max={700}
							/>
						)}
					</form.AppField>
					<form.AppField name="height">
						{(field) => (
							<field.NumberField
								label="Altura"
								placeholder="Ex: 1,75"
								suffix="m"
								allowNegative={false}
								max={3}
							/>
						)}
					</form.AppField>
				</div>
			</FormCard>
			<ResultCard
				empty={!result}
				copyText={
					result
						? `IMC: ${formatNumber(result.value, 2)} (${result.description})\nPeso ideal: ${formatNumber(result.idealWeight, 1)} kg`
						: ''
				}
				onClear={() => {
					setResult(null)
					form.reset()
				}}
			>
				{result ? (
					<div className="flex flex-col gap-4">
						<Badge
							tone={result.description === 'Peso normal' ? 'success' : 'primary'}
							className="w-fit"
						>
							{result.description}
						</Badge>
						<DataList
							items={[
								{ label: 'IMC', value: formatNumber(result.value, 2) },
								{ label: 'Peso ideal', value: `${formatNumber(result.idealWeight, 1)} kg` },
							]}
						/>
					</div>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
