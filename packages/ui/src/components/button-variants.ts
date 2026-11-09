import { cva } from 'class-variance-authority'

/**
 * Server-safe: can be used to style links (`<Link className={buttonVariants()} />`).
 * Friendly and tactile: 14px corners (fully round when small), a blue primary, generous heights so
 * every target is at least 44px on touch screens (36px only for the compact `sm`).
 */
export const buttonVariants = cva(
	'focus-visible:ring-ring inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-semibold whitespace-nowrap transition-[background-color,color,border-color,transform] duration-(--ds-motion-fast) ease-out outline-none select-none focus-visible:ring-4 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				primary: 'bg-primary text-primary-fg hover:bg-primary-hover',
				accent: 'bg-accent text-accent-fg hover:bg-accent-hover',
				soft: 'bg-accent-soft text-accent-soft-fg hover:bg-accent-soft/70',
				secondary:
					'border-border-strong bg-surface text-fg hover:border-fg-subtle hover:bg-surface-muted border',
				ghost: 'text-fg-muted hover:bg-surface-sunken hover:text-fg',
			},
			size: {
				// Touch screens get a taller hit area (40px) for the small size.
				sm: 'h-10 rounded-full px-4 text-sm pointer-coarse:h-10',
				md: 'rounded-control h-12 px-6 text-[0.9375rem]',
				lg: 'rounded-control h-14 px-8 text-base',
				icon: 'size-12 rounded-full',
				'icon-sm': 'size-10 rounded-full pointer-coarse:size-10',
			},
		},
		defaultVariants: { variant: 'primary', size: 'md' },
	},
)
