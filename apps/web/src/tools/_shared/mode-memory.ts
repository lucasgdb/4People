'use client'

import type { AnyFormApi } from '@tanstack/react-form'
import { useCallback, useRef } from 'react'

/**
 * For tools with a direction switch (encode/decode, text → binary/binary → text): each direction
 * keeps its own input and result, so switching never leaves the other direction's text in the field.
 *
 *   const switchMode = useModeMemory(form, 'input', 'encode', outcome, setOutcome)
 *   <form.AppField name="direction" listeners={{ onChange: ({ value }) => switchMode(String(value)) }}>
 */
export function useModeMemory<TResult>(
	form: AnyFormApi,
	inputField: string,
	initialMode: string,
	result: TResult | null,
	setResult: (result: TResult | null) => void,
) {
	const currentMode = useRef(initialMode)
	const savedByMode = useRef(new Map<string, { input: string; result: TResult | null }>())
	const latestResult = useRef(result)
	latestResult.current = result

	return useCallback(
		(nextMode: string) => {
			if (nextMode === currentMode.current) return
			savedByMode.current.set(currentMode.current, {
				input: String(form.getFieldValue(inputField) ?? ''),
				result: latestResult.current,
			})
			currentMode.current = nextMode

			const restored = savedByMode.current.get(nextMode) ?? { input: '', result: null }
			form.setFieldValue(inputField, restored.input, { dontValidate: true })
			// After a submit, TanStack revalidates the whole form when the direction changes, which runs
			// after this listener; clear the errors now and again once that has happened.
			const clearErrors = () => form.setFieldMeta(inputField, (meta) => ({ ...meta, errorMap: {} }))
			clearErrors()
			queueMicrotask(clearErrors)
			setResult(restored.result)
		},
		[form, inputField, setResult],
	)
}
