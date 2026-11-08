'use client'

import type { AnyFormApi } from '@tanstack/react-form'
import { useCallback, useRef } from 'react'

/**
 * For tools with a direction switch (Texto → Binário / Binário → Texto, codificar / decodificar):
 * each direction keeps its own input and its own result, so switching never leaves binary in the
 * "Texto" field (or text in the "Binário" one). Switching saves what is on screen under the old
 * direction and brings back the new direction's input and result; a direction not used yet starts
 * empty, without validation errors.
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
	const mode = useRef(initialMode)
	const saved = useRef(new Map<string, { input: string; result: TResult | null }>())
	// The listener closes over the latest result without re-creating the callback.
	const latestResult = useRef(result)
	latestResult.current = result

	return useCallback(
		(next: string) => {
			if (next === mode.current) return
			saved.current.set(mode.current, {
				input: String(form.getFieldValue(inputField) ?? ''),
				result: latestResult.current,
			})
			mode.current = next
			const restored = saved.current.get(next) ?? { input: '', result: null }
			form.setFieldValue(inputField, restored.input, { dontValidate: true })
			// No stale "Digite algo…" from the other direction. After a submit, TanStack revalidates the
			// whole form when the direction changes, which runs after this listener; clear once it has.
			const clearErrors = () => form.setFieldMeta(inputField, (meta) => ({ ...meta, errorMap: {} }))
			clearErrors()
			queueMicrotask(clearErrors)
			setResult(restored.result)
		},
		[form, inputField, setResult],
	)
}
