'use client'

import { revalidateLogic } from '@tanstack/react-form'
import type { z } from 'zod'
import { focusFirstInvalid, useAppForm } from './form'

/**
 * Standard form wiring for tools: Zod validation on submit, then on every change. `onSubmit`
 * receives the parsed output; a failed submit moves focus to the first invalid field.
 */
export function useToolForm<
	TSchema extends z.ZodType<Record<string, unknown>, Record<string, unknown>>,
>({
	schema,
	defaultValues,
	onSubmit,
}: {
	schema: TSchema
	defaultValues: z.input<TSchema>
	onSubmit: (data: z.output<TSchema>) => void | Promise<void>
}) {
	return useAppForm({
		defaultValues,
		validationLogic: revalidateLogic(),
		validators: { onDynamic: schema as unknown as z.ZodType<unknown, z.input<TSchema>> },
		onSubmit: ({ value }) => onSubmit(schema.parse(value)),
		// Errors reach the fields during this tick; focus once React has rendered them.
		onSubmitInvalid: ({ formApi }) => requestAnimationFrame(() => focusFirstInvalid(formApi)),
	})
}
