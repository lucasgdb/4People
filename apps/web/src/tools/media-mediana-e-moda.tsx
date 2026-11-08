'use client'

import { DataList } from '@4people/ui'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { describe } from '@/lib/algorithms/statistics'
import { formatNumber } from '@/lib/format'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

/** Comma, semicolon, space or line separated numbers; "1,5" is read as one and a half when ";" separates. */
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

/** Mean, weighted mean, median, mode(s), range and standard deviation of a list. */
export default function Statistics() {
	const [result, setResult] = useState<Result | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { values: '', weights: '' },
		onSubmit: ({ values, weights }) =>
			setResult(describe(values, weights.length > 0 ? weights : undefined)),
	})
	const n = (value: number) => formatNumber(value, 4)

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
					{(f) => <f.TextareaField label="Valores" rows={2} placeholder="Ex: 7, 8, 10, 6.5, 9" />}
				</form.AppField>
				<form.AppField name="weights">
					{(f) => (
						<f.TextareaField
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
				copyText={
					result
						? `Média: ${n(result.mean)}\nMediana: ${n(result.median)}\nModa: ${result.modes.map(n).join(', ') || 'sem moda'}`
						: ''
				}
				onClear={() => {
					setResult(null)
					form.reset()
				}}
			>
				{result ? (
					<DataList
						columns={2}
						items={[
							{ label: 'Média', value: n(result.mean) },
							...(result.weightedMean !== null
								? [{ label: 'Média ponderada', value: n(result.weightedMean) }]
								: []),
							{ label: 'Mediana', value: n(result.median) },
							{
								label: result.modes.length > 1 ? 'Modas' : 'Moda',
								value: result.modes.map(n).join(', ') || 'Sem moda',
							},
							{ label: 'Mínimo e máximo', value: `${n(result.min)} e ${n(result.max)}` },
							{ label: 'Amplitude', value: n(result.range) },
							{ label: 'Desvio padrão (população)', value: n(result.populationStdDev) },
							{ label: 'Desvio padrão (amostra)', value: n(result.sampleStdDev) },
							{ label: 'Quantidade', value: result.count, hint: `Soma: ${n(result.sum)}` },
						]}
					/>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
