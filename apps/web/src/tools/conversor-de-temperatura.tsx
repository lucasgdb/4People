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

const DECIMAL_PLACES = ['0', '1', '2', '3', '4', '6', '10'] as const
const DECIMAL_OPTIONS = DECIMAL_PLACES.map((places) => ({ value: places, label: places }))

const schema = z.object({
	value: numeric({}),
	from: z.enum(['C', 'F', 'K']),
	decimals: z.enum(DECIMAL_PLACES),
})

type Result = {
	input: string
	outputs: { unit: TemperatureUnit; value: string }[]
}

const unitLabel = (unit: TemperatureUnit) =>
	UNITS.find((option) => option.value === unit)?.label ?? unit

function convertToOtherUnits(value: number, from: TemperatureUnit, decimals: number): Result {
	const withSymbol = (temperature: number, unit: TemperatureUnit) =>
		`${formatNumber(temperature, decimals)} ${SYMBOL[unit]}`
	const otherUnits = UNITS.filter((unit) => unit.value !== from).map((unit) => unit.value)
	return {
		input: withSymbol(value, from),
		outputs: otherUnits.map((to) => ({
			unit: to,
			value: withSymbol(convertTemperature(value, from, to), to),
		})),
	}
}

const resultToText = ({ input, outputs }: Result) =>
	[input, ...outputs.map((output) => output.value)].join(' = ')

/** A temperature in the other two scales. */
export default function TemperatureConverter() {
	const [result, setResult] = useState<Result | null>(null)

	const form = useToolForm({
		schema,
		defaultValues: { value: '', from: 'C', decimals: '2' },
		onSubmit: ({ value, from, decimals }) =>
			setResult(convertToOtherUnits(value, from, Number(decimals))),
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
						{(field) => <field.NumberField label="Temperatura" placeholder="Ex: 36,5" />}
					</form.AppField>
					<form.AppField name="from">
						{(field) => <field.SelectField label="Unidade" options={UNITS} />}
					</form.AppField>
				</div>
				<form.AppField name="decimals">
					{(field) => <field.SelectField label="Casas decimais" options={DECIMAL_OPTIONS} />}
				</form.AppField>
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
						items={result.outputs.map((output) => ({
							label: unitLabel(output.unit),
							value: output.value,
						}))}
					/>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
