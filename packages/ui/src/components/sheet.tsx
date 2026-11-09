'use client'

import { Dialog } from '@base-ui/react/dialog'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../lib/cn.ts'

export const Sheet = Dialog.Root
export const SheetTrigger = Dialog.Trigger
export const SheetClose = Dialog.Close

export type SheetContentProps = ComponentProps<typeof Dialog.Popup> & {
	title: ReactNode
	side?: 'left' | 'right'
}

/** Side panel built on Base UI Dialog (used for mobile navigation). */
export function SheetContent({
	title,
	side = 'left',
	className,
	children,
	...props
}: SheetContentProps) {
	return (
		<Dialog.Portal>
			<Dialog.Backdrop className="fixed inset-0 z-50 bg-black/45 transition-opacity duration-(--ds-motion) data-ending-style:opacity-0 data-starting-style:opacity-0" />
			<Dialog.Popup
				className={cn(
					'bg-bg shadow-float fixed inset-y-0 z-50 flex w-[min(22rem,88vw)] flex-col transition-transform duration-250 ease-out outline-none',
					side === 'left'
						? 'left-0 data-ending-style:-translate-x-full data-starting-style:-translate-x-full'
						: 'right-0 data-ending-style:translate-x-full data-starting-style:translate-x-full',
					className as string,
				)}
				{...props}
			>
				<div className="flex h-16 items-center justify-between px-4">
					<Dialog.Title className="text-base font-semibold">{title}</Dialog.Title>
					<Dialog.Close
						aria-label="Fechar"
						className="text-fg-muted hover:bg-surface-sunken hover:text-fg focus-visible:ring-ring flex size-12 cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-4"
					>
						<svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden="true">
							<path
								d="m4 4 8 8M12 4l-8 8"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
					</Dialog.Close>
				</div>
				<div className="flex-1 overflow-y-auto overscroll-contain">{children as ReactNode}</div>
			</Dialog.Popup>
		</Dialog.Portal>
	)
}
