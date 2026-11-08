'use client'

import { DataList } from '@4people/ui'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { describe } from '@/lib/algorithms/statistics'
import { formatNumber } from '@/lib/format'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

/**
 * Numbers separated by commas, spaces, semicolons or lines. With ";" or line breaks as separators,
 * a comma is a decimal separator ("1,5").
 */
const numberList = (required: boolean) =>
	z
		.string()
		.trim()
		.refine((value) => !required || value.length > 0, 'Informe pelo menos um número.')
		.transform((value) => {
			if (!value) return []
			const separator = value.includes(';') || /\n/.test(value) ? /[;\n]+/ : /[\s,]+/
			return value
				.split(separator)
				.map((item) => item.trim())
				.filter(Boolean)
				.map((item) => Number(item.replace(',', '.')))
		})
		.refine(
			(values) => values.every(Number.isFinite),
			'Use apenas números. Para decimais com vírgula, separe os valores com ponto e vírgula.',
		)

const schema = z
	.object({ values: numberList(true), weights: numberList(false) })
	.superRefine(({ values, weights }, ctx) => {
		if (weights.length > 0 && weights.length !== values.length) {
			ctx.addIssue({
				code: 'custom',
				path: ['weights'],
				message: `Informe ${values.length} pesos, um para cada valor.`,
			})
		}
	})

type Result = ReturnType<typeof describe>

const formatStat = (value: number) => formatNumber(value, 4)

const formatModes = (modes: readonly number[]) => modes.map(formatStat).join(', ')

const resultToText = ({ mean, median, modes }: Result) =>
	[
		`Média: ${formatStat(mean)}`,
		`Mediana: ${formatStat(median)}`,
		`Moda: ${formatModes(modes) || 'sem moda'}`,
	].join('\n')

function resultItems(result: Result) {
	const weightedMean =
		result.weightedMean === null
			? []
			: [{ label: 'Média ponderada', value: formatStat(result.weightedMean) }]
	return [
		{ label: 'Média', value: formatStat(result.mean) },
		...weightedMean,
		{ label: 'Mediana', value: formatStat(result.median) },
		{
			label: result.modes.length > 1 ? 'Modas' : 'Moda',
			value: formatModes(result.modes) || 'Sem moda',
		},
		{ label: 'Mínimo e máximo', value: `${formatStat(result.min)} e ${formatStat(result.max)}` },
		{ label: 'Amplitude', value: formatStat(result.range) },
		{ label: 'Desvio padrão (população)', value: formatStat(result.populationStdDev) },
		{ label: 'Desvio padrão (amostra)', value: formatStat(result.sampleStdDev) },
		{ label: 'Quantidade', value: result.count, hint: `Soma: ${formatStat(result.sum)}` },
	]
}

/** Mean, weighted mean, median, mode(s), range and standard deviation of a list. */
export default function Statistics() {
	const [result, setResult] = useState<Result | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { values: '', weights: '' },
		onSubmit: ({ values, weights }) =>
			setResult(describe(values, weights.length > 0 ? weights : undefined)),
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
				<form.AppField name="values">
					{(field) => (
						<field.TextareaField label="Valores" rows={2} placeholder="Ex: 7, 8, 10, 6.5, 9" />
					)}
				</form.AppField>
				<form.AppField name="weights">
					{(field) => (
						<field.TextareaField
							label="Pesos (opcional)"
							rows={2}
							placeholder="Ex: 2, 3, 5, 1, 1"
							description="Para a média ponderada, um peso para cada valor, na mesma ordem."
						/>
					)}
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
				{result ? <DataList columns={2} items={resultItems(result)} /> : null}
			</ResultCard>
		</ToolLayout>
	)
}
