'use client'

import { Switch as BaseSwitch } from '@base-ui/react/switch'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../lib/cn.ts'

export type SwitchProps = Omit<ComponentProps<typeof BaseSwitch.Root>, 'children'> & {
	label: ReactNode
	description?: ReactNode
}

/** An on/off option that applies right away (a checkbox is for choices confirmed by a submit). */
export function Switch({ label, description, className, ...props }: SwitchProps) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: Base UI renders the control inside the label.
		<label
			className={cn(
				'flex min-h-11 cursor-pointer gap-3 py-1 text-[0.9375rem] select-none',
				description ? 'items-start' : 'items-center',
				className as string,
			)}
		>
			<BaseSwitch.Root
				className={cn(
					'bg-border-strong focus-visible:ring-ring data-checked:bg-primary relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-(--ds-motion-fast) outline-none focus-visible:ring-4 data-disabled:opacity-50',
					description && 'mt-0.5',
				)}
				{...props}
			>
				<BaseSwitch.Thumb className="bg-surface size-5 rounded-full shadow-[0_1px_2px_rgb(23_32_51/0.25)] transition-transform duration-(--ds-motion-fast) data-checked:translate-x-4" />
			</BaseSwitch.Root>
			<span className="flex flex-col gap-0.5">
				<span className="text-fg">{label}</span>
				{description ? <span className="text-fg-muted text-[0.8125rem]">{description}</span> : null}
			</span>
		</label>
	)
}
