'use client'

import { DataList } from '@4people/ui'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { convertTemperature, type TemperatureUnit } from '@/lib/algorithms/calculators'
import { formatNumber } from '@/lib/format'
import { numeric } from '@/lib/schemas'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const UNITS = [
	{ value: 'C', label: 'Graus Celsius (°C)' },
	{ value: 'F', label: 'Graus Fahrenheit (°F)' },
	{ value: 'K', label: 'Kelvin (K)' },
] as const satisfies ReadonlyArray<{ value: TemperatureUnit; label: string }>

const SYMBOL: Record<TemperatureUnit, string> = { C: '°C', F: '°F', K: 'K' }

const schema = z.object({
	value: numeric({}),
	from: z.enum(['C', 'F', 'K']),
	decimals: z.enum(['0', '1', '2', '3', '4', '6', '10']),
})

export default function TemperatureConverter() {
	const [result, setResult] = useState<{
		input: string
		outputs: { unit: TemperatureUnit; value: string }[]
	} | null>(null)

	const form = useToolForm({
		schema,
		defaultValues: { value: '', from: 'C', decimals: '2' },
		onSubmit: ({ value, from, decimals }) =>
			setResult({
				input: `${formatNumber(value, Number(decimals))} ${SYMBOL[from]}`,
				outputs: UNITS.filter((unit) => unit.value !== from).map(({ value: to }) => ({
					unit: to,
					value: `${formatNumber(convertTemperature(value, from, to), Number(decimals))} ${SYMBOL[to]}`,
				})),
			}),
	})

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>Converter</form.SubmitButton>
					</form.AppForm>
				}
			>
				<div className="grid gap-4 sm:grid-cols-2">
					<form.AppField name="value">
						{(f) => <f.NumberField label="Temperatura" placeholder="Ex: 36,5" />}
					</form.AppField>
					<form.AppField name="from">
						{(f) => <f.SelectField label="Unidade" options={UNITS} />}
					</form.AppField>
				</div>
				<form.AppField name="decimals">
					{(f) => (
						<f.SelectField
							label="Casas decimais"
							options={(['0', '1', '2', '3', '4', '6', '10'] as const).map((value) => ({
								value,
								label: value,
							}))}
						/>
					)}
				</form.AppField>
			</FormCard>
			<ResultCard
				empty={!result}
				copyText={
					result ? `${result.input} = ${result.outputs.map((o) => o.value).join(' = ')}` : ''
				}
				onClear={() => {
					setResult(null)
					form.reset()
				}}
			>
				{result ? (
					<DataList
						items={result.outputs.map((output) => ({
							label: UNITS.find((unit) => unit.value === output.unit)?.label ?? output.unit,
							value: output.value,
						}))}
					/>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
