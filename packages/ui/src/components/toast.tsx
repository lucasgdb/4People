'use client'

import { Toast } from '@base-ui/react/toast'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn.ts'

/** Global toast manager — lets non-React code (and any component) enqueue toasts. */
export const toastManager = Toast.createToastManager()

type ToastTone = 'success' | 'danger' | 'info'

export const toast = {
	show: (title: string, options?: { description?: string; tone?: ToastTone }) =>
		toastManager.add({
			title,
			description: options?.description,
			type: options?.tone ?? 'info',
		}),
	success: (title: string, description?: string) =>
		toastManager.add({ title, description, type: 'success' }),
	error: (title: string, description?: string) =>
		toastManager.add({ title, description, type: 'danger' }),
}

export function ToastProvider({ children }: { children: ReactNode }) {
	return (
		<Toast.Provider toastManager={toastManager} timeout={3500} limit={3}>
			{children}
			<Toast.Portal>
				<Toast.Viewport className="fixed right-4 bottom-4 z-[100] mx-auto flex w-[calc(100vw-2rem)] sm:right-6 sm:bottom-6 sm:w-90">
					<ToastList />
				</Toast.Viewport>
			</Toast.Portal>
		</Toast.Provider>
	)
}

const toneDot: Record<string, string> = {
	success: 'bg-success',
	danger: 'bg-danger',
	info: 'bg-fg-subtle',
}

function ToastList() {
	const { toasts } = Toast.useToastManager()
	return toasts.map((item) => (
		<Toast.Root
			key={item.id}
			toast={item}
			className={cn(
				'[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]',
				'rounded-control border-border bg-surface text-fg shadow-float absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] h-(--height) w-full origin-bottom border select-none',
				'[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]',
				'[transition:transform_0.45s_cubic-bezier(0.22,1,0.36,1),opacity_0.45s,height_0.15s] after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[""]',
				'data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]',
				'data-ending-style:opacity-0 data-limited:opacity-0 data-starting-style:[transform:translateY(150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]',
				'data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
			)}
		>
			<Toast.Content className="flex min-h-14 items-center gap-4 overflow-hidden py-4 pr-4 pl-6 transition-opacity duration-(--ds-motion) data-behind:opacity-0 data-expanded:opacity-100">
				<span
					aria-hidden="true"
					className={cn('size-2 shrink-0 rounded-full', toneDot[item.type ?? 'info'])}
				/>
				<div className="flex min-w-0 flex-1 flex-col gap-1">
					<Toast.Title className="text-[0.9375rem] font-medium" />
					<Toast.Description className="text-fg-muted text-[0.8125rem]" />
				</div>
				<Toast.Close
					aria-label="Fechar"
					className="text-fg-subtle hover:bg-surface-sunken hover:text-fg focus-visible:ring-ring grid size-10 shrink-0 cursor-pointer place-items-center rounded-full outline-none focus-visible:ring-4"
				>
					<svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden="true">
						<path
							d="m4 4 8 8M12 4l-8 8"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
						/>
					</svg>
				</Toast.Close>
			</Toast.Content>
		</Toast.Root>
	))
}
