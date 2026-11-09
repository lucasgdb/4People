'use client'

import { Field } from '@base-ui/react/field'
import type { ComponentProps } from 'react'
import { cn } from '../lib/cn.ts'
import { controlClass } from '../lib/control.ts'

export type TextareaProps = ComponentProps<'textarea'>

/**
 * Multi-line control. When rendered inside `<Field>`, it is wired to the field's label/validity.
 * It grows with its content in height only: long unbroken lines (base64, PEM keys, tokens) wrap
 * anywhere instead of widening the field and its card.
 */
export function Textarea({ className, rows, style, ...props }: TextareaProps) {
	return (
		<Field.Control
			render={<textarea />}
			className={cn(
				controlClass,
				'[field-sizing:content] max-h-[24rem] max-w-full min-w-0 resize-y py-2 leading-relaxed [overflow-wrap:anywhere]',
				className,
			)}
			// Content sizing ignores `rows`, so the starting height comes from it here: `rows` lines plus the
			// vertical padding and border (3 lines when not given, at most 6 so an empty field stays short
			// on a phone). Every field still grows as people type.
			{...({
				...props,
				rows,
				style: { minHeight: `calc(${Math.min(rows ?? 3, 6)}lh + 1.25rem + 2px)`, ...style },
			} as ComponentProps<typeof Field.Control>)}
		/>
	)
}
