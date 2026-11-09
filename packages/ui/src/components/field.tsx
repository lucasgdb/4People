'use client'

import { Field as BaseField } from '@base-ui/react/field'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../lib/cn.ts'

export type FieldProps = Omit<ComponentProps<typeof BaseField.Root>, 'children'> & {
	label?: ReactNode
	description?: ReactNode
	/** Error message controlled by the consumer (e.g. a form library). */
	error?: ReactNode
	/**
	 * Keeps the label for assistive tech only (inline layouts). The label element itself is
	 * visually hidden, so it takes no row in the column and the control lines up with the text around it.
	 */
	hideLabel?: boolean
	children: ReactNode
}

/**
 * Field wrapper: label + control + description + error.
 * Validation is owned by the consumer (TanStack Form), so the error is always shown when present.
 */
export function Field({
	label,
	description,
	error,
	hideLabel,
	className,
	children,
	...props
}: FieldProps) {
	const hasError = Boolean(error)
	return (
		<BaseField.Root
			invalid={hasError}
			className={cn('flex min-w-0 flex-col gap-2', className as string)}
			{...props}
		>
			{label ? (
				<FieldLabel className={hideLabel ? 'sr-only' : undefined}>{label}</FieldLabel>
			) : null}
			{children}
			{description && !hasError ? <FieldDescription>{description}</FieldDescription> : null}
			<BaseField.Error
				match={hasError}
				className="text-danger flex items-start gap-2 text-[0.8125rem] font-medium"
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-px size-3.5 shrink-0">
					<circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
					<path
						d="M8 4.75v3.75M8 11h.01"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</svg>
				{error}
			</BaseField.Error>
		</BaseField.Root>
	)
}

export function FieldLabel({ className, ...props }: ComponentProps<typeof BaseField.Label>) {
	return (
		<BaseField.Label
			className={cn('text-fg text-sm leading-none font-medium', className as string)}
			{...props}
		/>
	)
}

export function FieldDescription({
	className,
	...props
}: ComponentProps<typeof BaseField.Description>) {
	return (
		<BaseField.Description
			className={cn('text-fg-muted text-[0.8125rem]', className as string)}
			{...props}
		/>
	)
}
