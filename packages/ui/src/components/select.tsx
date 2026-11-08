'use client'

import { Select as BaseSelect } from '@base-ui/react/select'
import type { ComponentProps, Ref } from 'react'
import { cn } from '../lib/cn.ts'
import { controlClass } from '../lib/control.ts'

export type SelectOption<T extends string = string> = { value: T; label: string }

export type SelectProps<T extends string> = Omit<
	ComponentProps<typeof BaseSelect.Root<T>>,
	'items' | 'children' | 'onValueChange'
> & {
	options: ReadonlyArray<SelectOption<T>>
	placeholder?: string
	className?: string
	onValueChange?: (value: T) => void
	onBlur?: () => void
	/** Ref to the trigger, the element that takes focus (e.g. when the field is invalid). */
	triggerRef?: Ref<HTMLButtonElement>
}

export function Select<T extends string>({
	options,
	placeholder,
	className,
	onValueChange,
	onBlur,
	triggerRef,
	...props
}: SelectProps<T>) {
	return (
		<BaseSelect.Root<T>
			items={options as SelectOption<T>[]}
			onValueChange={(value) => {
				if (value !== null) onValueChange?.(value as T)
			}}
			{...props}
		>
			<BaseSelect.Trigger
				ref={triggerRef}
				onBlur={onBlur}
				className={cn(
					controlClass,
					'data-popup-open:border-accent flex h-12 cursor-pointer items-center justify-between gap-2 text-left',
					className,
				)}
			>
				<BaseSelect.Value
					placeholder={placeholder}
					className="data-placeholder:text-fg-subtle truncate"
				/>
				<BaseSelect.Icon className="text-fg-subtle">
					<svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden="true">
						<path
							d="m4.5 6.5 3.5 3.5 3.5-3.5"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</BaseSelect.Icon>
			</BaseSelect.Trigger>
			<BaseSelect.Portal>
				<BaseSelect.Positioner
					className="z-50 outline-none"
					sideOffset={6}
					alignItemWithTrigger={false}
				>
					<BaseSelect.Popup className="rounded-control border-border bg-surface text-fg shadow-float min-w-(--anchor-width) origin-(--transform-origin) border p-1 transition-[scale,opacity] duration-(--ds-motion-fast) outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
						<BaseSelect.List className="max-h-(--available-height) overflow-y-auto">
							{options.map((option) => (
								<BaseSelect.Item
									key={option.value}
									value={option.value}
									className="data-highlighted:bg-surface-sunken grid cursor-pointer grid-cols-[1rem_1fr] items-center gap-2 rounded-md py-2 pr-4 pl-2 text-sm outline-none select-none data-selected:font-semibold"
								>
									<BaseSelect.ItemIndicator className="text-fg col-start-1">
										<svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden="true">
											<path
												d="M3.5 8.5 6.5 11.5 12.5 4.5"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</BaseSelect.ItemIndicator>
									<BaseSelect.ItemText className="col-start-2">{option.label}</BaseSelect.ItemText>
								</BaseSelect.Item>
							))}
						</BaseSelect.List>
					</BaseSelect.Popup>
				</BaseSelect.Positioner>
			</BaseSelect.Portal>
		</BaseSelect.Root>
	)
}
