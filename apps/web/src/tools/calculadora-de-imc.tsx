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

const SEX_OPTIONS = [
	{ value: 'male', label: 'Masculino' },
	{ value: 'female', label: 'Feminino' },
] as const

type Result = ReturnType<typeof bmi>

const formatBmi = (value: number) => formatNumber(value, 2)
const formatIdealWeight = (kilograms: number) => `${formatNumber(kilograms, 1)} kg`

const resultToText = ({ value, description, idealWeight }: Result) =>
	`IMC: ${formatBmi(value)} (${description})\nPeso ideal: ${formatIdealWeight(idealWeight)}`

/** Body mass index, its class and the ideal weight for the height and sex. */
export default function Bmi() {
	const [result, setResult] = useState<Result | null>(null)
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
					{(field) => <field.RadioField label="Sexo" options={SEX_OPTIONS} />}
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
				copyText={result ? resultToText(result) : ''}
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
								{ label: 'IMC', value: formatBmi(result.value) },
								{ label: 'Peso ideal', value: formatIdealWeight(result.idealWeight) },
							]}
						/>
					</div>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
