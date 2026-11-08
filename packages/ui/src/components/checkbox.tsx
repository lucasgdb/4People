'use client'

import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../lib/cn.ts'

export type CheckboxProps = Omit<ComponentProps<typeof BaseCheckbox.Root>, 'children'> & {
	label?: ReactNode
	description?: ReactNode
}

export function Checkbox({ label, description, className, ...props }: CheckboxProps) {
	const control = (
		<BaseCheckbox.Root
			className={cn(
				// taste-skill-ignore: a form control keeps its edge
				'peer border-border-strong bg-surface focus-visible:ring-ring data-checked:border-primary data-checked:bg-primary flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[6px] border-[1.5px] transition-colors outline-none focus-visible:ring-4 data-disabled:opacity-50',
				// With a description the box lines up with the first line of text; alone it is centered.
				description ? 'mt-0.5' : undefined,
				className as string,
			)}
			{...props}
		>
			<BaseCheckbox.Indicator className="text-primary-fg data-unchecked:hidden">
				<svg viewBox="0 0 16 16" fill="none" className="size-3" aria-hidden="true">
					<path
						d="M3.5 8.5 6.5 11.5 12.5 4.5"
						stroke="currentColor"
						strokeWidth="2.25"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</BaseCheckbox.Indicator>
		</BaseCheckbox.Root>
	)

	if (!label) return control

	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: Base UI renders the control inside the label.
		<label
			className={cn(
				'flex min-h-11 cursor-pointer gap-3 py-1 text-[0.9375rem] select-none',
				description ? 'items-start' : 'items-center',
			)}
		>
			{control}
			<span className="flex flex-col gap-0.5">
				<span className="text-fg">{label}</span>
				{description ? <span className="text-fg-muted text-[0.8125rem]">{description}</span> : null}
			</span>
		</label>
	)
}
