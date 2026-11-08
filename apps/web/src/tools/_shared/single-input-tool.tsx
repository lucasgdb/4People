'use client'

import type { NumericOptions } from '@4people/ui'
import { type ReactNode, useMemo, useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { FormCard, ResultCard, ToolLayout } from './tool-layout'

export type SingleInputToolProps<TSchema extends z.ZodType<unknown, string>, TResult> = {
	/** Zod schema of the one field (input: the typed string; output: what `compute` receives). */
	field: TSchema
	label: string
	placeholder: string
	/** A multi-line field, for lists of numbers. */
	multiline?: boolean
	/** Typing filter and arrow-key limits of the number input (match the `field` schema). */
	numeric?: NumericOptions
	submitLabel?: string
	/** Pure computation: input → result data (kept in state as data, never as JSX). */
	compute: (value: z.output<TSchema>) => TResult
	/** How the result is shown. */
	render: (result: TResult) => ReactNode
	/** Plain-text version for "Copiar". */
	toText: (result: TResult) => string
}

/** One field, one button, one result: the shape of most number tools (MDC, primos, Fibonacci…). */
export function SingleInputTool<TSchema extends z.ZodType<unknown, string>, TResult>({
	field,
	label,
	placeholder,
	multiline = false,
	numeric,
	submitLabel = 'Calcular',
	compute,
	render,
	toText,
}: SingleInputToolProps<TSchema, TResult>) {
	const [result, setResult] = useState<TResult | null>(null)
	const schema = useMemo(
		() => z.object({ value: field as z.ZodType<z.output<TSchema>, string> }),
		[field],
	)
	const form = useToolForm({
		schema,
		defaultValues: { value: '' },
		onSubmit: ({ value }) => setResult(compute(value)),
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
				<form.AppField name="value">
					{(formField) =>
						multiline ? (
							<formField.TextareaField label={label} placeholder={placeholder} rows={2} />
						) : (
							<formField.NumberField label={label} placeholder={placeholder} {...numeric} />
						)
					}
				</form.AppField>
			</FormCard>
			<ResultCard
				empty={result === null}
				copyText={result === null ? '' : toText(result)}
				onClear={() => {
					setResult(null)
					form.reset()
				}}
			>
				{result === null ? null : render(result)}
			</ResultCard>
		</ToolLayout>
	)
}
