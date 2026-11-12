import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '../lib/cn.ts'

const alertVariants = cva(
	'rounded-control flex gap-4 p-4 text-[0.9375rem] leading-relaxed [&>svg]:h-[1lh] [&>svg]:w-4 [&>svg]:shrink-0',
	{
		variants: {
			tone: {
				info: 'bg-accent-soft text-accent-soft-fg [&_svg]:text-accent',
				warning: 'bg-warning-soft text-warning-ink',
				success: 'bg-success-soft text-success-ink [&_svg]:text-success',
				danger: 'bg-danger-soft text-danger-ink [&_svg]:text-danger',
			},
		},
		defaultVariants: { tone: 'info' },
	},
)

export type AlertProps = ComponentProps<'div'> & VariantProps<typeof alertVariants>

/**
 * A notice. No live role of its own: inside a result card the card's body already announces it;
 * pass `role="alert"` for a standalone error that must interrupt.
 */
export function Alert({ className, tone, ...props }: AlertProps) {
	return <div className={cn(alertVariants({ tone }), className)} {...props} />
}
