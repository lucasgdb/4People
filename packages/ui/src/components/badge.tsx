import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '../lib/cn.ts'

/** Status pill: a pale tint with dark text of the same hue. Inside rows and beside values only. */
export const badgeVariants = cva(
	'inline-flex h-6 flex-none items-center gap-1 rounded-full px-2.5 text-xs font-medium whitespace-nowrap [&_svg]:size-3.5',
	{
		variants: {
			tone: {
				neutral: 'bg-surface-sunken text-fg',
				primary: 'bg-accent-soft text-accent-soft-fg',
				success: 'bg-success-soft text-success-ink',
				danger: 'bg-danger-soft text-danger-ink',
			},
		},
		defaultVariants: { tone: 'neutral' },
	},
)

export type BadgeProps = ComponentProps<'span'> & VariantProps<typeof badgeVariants>

export function Badge({ className, tone, ...props }: BadgeProps) {
	return <span className={cn(badgeVariants({ tone }), className)} {...props} />
}
