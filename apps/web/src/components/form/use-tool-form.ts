'use client'

import { revalidateLogic } from '@tanstack/react-form'
import type { z } from 'zod'
import { focusFirstInvalid, useAppForm } from './form'

/**
 * Standard form wiring for tools: validates with Zod on submit, then revalidates on every change,
 * hands the parsed (transformed) output to `onSubmit`, and when a submit fails, moves focus to the
 * first invalid field (TanStack Form's `onSubmitInvalid`), so keyboard and screen reader users land
 * on the error instead of staying on the button.
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
		// Errors are mapped onto the fields during this tick; focus after React has rendered them.
		onSubmitInvalid: ({ formApi }) => requestAnimationFrame(() => focusFirstInvalid(formApi)),
	})
}
