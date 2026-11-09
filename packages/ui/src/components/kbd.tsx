import type { ComponentProps } from 'react'
import { cn } from '../lib/cn.ts'

export function Kbd({ className, ...props }: ComponentProps<'kbd'>) {
	return (
		<kbd
			className={cn(
				// taste-skill-ignore: a keycap is drawn as a key, its edge is the object itself
				'rounded-chip border-border-strong bg-surface text-fg inline-flex h-6 min-w-6 items-center justify-center border border-b-2 px-2 font-sans text-xs font-medium',
				className,
			)}
			{...props}
		/>
	)
}
