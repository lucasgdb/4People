import type { ComponentProps } from 'react'
import { cn } from '../lib/cn.ts'

/** A flat panel: one tone step and a 1px edge, never a resting shadow. */
export function Card({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div className={cn('rounded-panel border-border bg-surface border', className)} {...props} />
	)
}

export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
	return <div className={cn('flex flex-col gap-1 px-6 pt-6', className)} {...props} />
}

export function CardTitle({ className, ...props }: ComponentProps<'h2'>) {
	return <h2 className={cn('text-fg text-base font-semibold', className)} {...props} />
}

export function CardDescription({ className, ...props }: ComponentProps<'p'>) {
	return <p className={cn('text-fg-muted text-sm', className)} {...props} />
}

export function CardContent({ className, ...props }: ComponentProps<'div'>) {
	return <div className={cn('p-6', className)} {...props} />
}

export function CardFooter({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'border-border flex flex-wrap items-center gap-2 border-t px-6 py-4',
				className,
			)}
			{...props}
		/>
	)
}
