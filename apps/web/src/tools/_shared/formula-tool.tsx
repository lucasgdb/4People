'use client'

import { cn, DataList, type NumericOptions } from '@4people/ui'
import { useMemo, useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { formatNumber } from '@/lib/format'
import { numeric } from '@/lib/schemas'
import { FormCard, ResultCard, ToolLayout } from './tool-layout'

export type FormulaField = {
	name: string
	label: string
	placeholder?: string
	suffix?: string
	/** Defaults to positive numbers. */
	constraints?: Parameters<typeof numeric>[0]
	/** Arrow-key step and an explicit minus-sign override; limits come from `constraints`. */
	step?: number
	allowNegative?: boolean
}

export type FormulaResult = { label: string; value: number; unit?: string }

/** Shorthand for a positive-number field. Declare fields at module scope so the schema is built once. */
export const field = (name: string, label: string, placeholder = 'Ex: 10'): FormulaField => ({
	name,
	label,
	placeholder,
})

/** The input's typing filter and arrow-key limits, derived from the field's Zod constraints. */
function numericOptions({ constraints = { positive: true }, step, allowNegative }: FormulaField) {
	const { min, max, integer, positive } = constraints
	const options: NumericOptions = { min, max, integer, step, allowNegative }
	if (positive && min === undefined) {
		// "> 0": an integer can start at 1; a decimal can only refuse the minus sign.
		if (integer) options.min = 1
		else options.allowNegative ??= false
	}
	return options
}

/** The single "Área" result of the area calculators. */
export const areaOf = (value: number): FormulaResult[] => [{ label: 'Área', value }]

/**
 * Short numbers sit side by side even on a phone (Base | Altura), so the result comes up a screen
 * sooner; three short labels (a, b, c) share one row, like the formula reads.
 */
function gridColumnsFor(fields: readonly FormulaField[]) {
	const allLabelsShort = fields.every((field) => field.label.length <= 14)
	if (fields.length === 3 && allLabelsShort) return 'grid-cols-3'
	if (fields.length > 1) return 'grid-cols-2'
	return undefined
}

const formatResultValue = (item: FormulaResult) => `${formatNumber(item.value)}${item.unit ?? ''}`

function resultToText(result: FormulaResult[] | string): string {
	if (typeof result === 'string') return result
	return result.map((item) => `${item.label}: ${formatResultValue(item)}`).join('\n')
}

function FormulaOutput({ result }: { result: FormulaResult[] | string }) {
	if (typeof result === 'string') return <p className="text-fg">{result}</p>
	return (
		<DataList
			columns={result.length > 1 ? 2 : 1}
			items={result.map((item) => ({ label: item.label, value: formatResultValue(item) }))}
		/>
	)
}

export type FormulaToolProps = {
	fields: readonly FormulaField[]
	compute: (values: Record<string, number>) => FormulaResult[] | string
	submitLabel?: string
	/** Extra cross-field validation; return an error message to block the result. */
	refine?: (values: Record<string, number>) => string | undefined
}

/**
 * Generic "fill numbers → compute" tool used by area calculators and simple formulas.
 * `fields` and `refine` must be stable (module constants): the Zod schema is memoized on them.
 */
export function FormulaTool({
	fields,
	compute,
	refine,
	submitLabel = 'Calcular',
}: FormulaToolProps) {
	const [result, setResult] = useState<FormulaResult[] | string | null>(null)

	const schema = useMemo(() => {
		const shape = Object.fromEntries(
			fields.map((field) => [field.name, numeric(field.constraints ?? { positive: true })]),
		)
		return z.object(shape).superRefine((values, ctx) => {
			const message = refine?.(values as Record<string, number>)
			if (message) ctx.addIssue({ code: 'custom', message, path: [fields.at(-1)?.name ?? ''] })
		})
	}, [fields, refine])

	const form = useToolForm({
		schema,
		defaultValues: Object.fromEntries(fields.map((field) => [field.name, ''])),
		onSubmit: (values) => setResult(compute(values as Record<string, number>)),
	})

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>{submitLabel}</form.SubmitButton>
					</form.AppForm>
				}
			>
				<div className={cn('grid items-end gap-4', gridColumnsFor(fields))}>
					{fields.map((field) => (
						<form.AppField key={field.name} name={field.name}>
							{(formField) => (
								<formField.NumberField
									label={field.label}
									placeholder={field.placeholder}
									suffix={field.suffix}
									{...numericOptions(field)}
								/>
							)}
						</form.AppField>
					))}
				</div>
			</FormCard>
			<ResultCard
				empty={result === null}
				copyText={result === null ? '' : resultToText(result)}
				onClear={() => {
					setResult(null)
					form.reset()
				}}
			>
				{result === null ? null : <FormulaOutput result={result} />}
			</ResultCard>
		</ToolLayout>
	)
}
