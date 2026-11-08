'use client'

import { Radio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { type ComponentProps, type ReactNode, useId } from 'react'
import { cn } from '../lib/cn.ts'

export type RadioOption<T extends string = string> = {
	value: T
	label: ReactNode
	/** A second line under the label, such as an example of the format ("529.982.247-25"). */
	hint?: ReactNode
}

export type RadioGroupProps<T extends string> = Omit<
	ComponentProps<typeof BaseRadioGroup>,
	'onValueChange' | 'value' | 'defaultValue'
> & {
	options: ReadonlyArray<RadioOption<T>>
	value?: T
	defaultValue?: T
	onValueChange?: (value: T) => void
}

/**
 * Segmented track: a white raised option on a soft sunken track. As wide as its options, or, when an
 * option has a `hint`, a full-width grid of equal cards with the hint as a second line.
 */
export function RadioGroup<T extends string>({
	options,
	className,
	onValueChange,
	...props
}: RadioGroupProps<T>) {
	// Each option is named by its own text. Inside a Field, Base UI would otherwise point every radio
	// at the field's label, and a screen reader would read "Operação, Operação" for all options.
	const idPrefix = useId()
	const cards = options.some((option) => option.hint !== undefined)
	// Cards with long text side by side on a phone become narrow towers of 4–5 lines: stack them.
	const textLength = (node: unknown) => (typeof node === 'string' ? node.length : 0)
	const longCards = options.some(
		(option) => textLength(option.label) + textLength(option.hint) > 24,
	)
	// Auto-fit would leave an orphan card (3 + 1), so even counts get balanced rows instead.
	const cardColumns =
		options.length === 4
			? 'grid-cols-2 sm:grid-cols-4'
			: options.length === 6
				? 'grid-cols-2 sm:grid-cols-3'
				: longCards
					? 'grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]'
					: 'grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]'
	// Pills: on a phone, one full-width row of equal segments (two rows of two from 4 options), so the
	// last option never drops alone onto a new line; from sm up, compact pills that hug their text.
	const pillLayout = cn(
		'grid w-full sm:inline-flex sm:w-auto sm:flex-wrap sm:self-start',
		options.length >= 4 ? 'grid-cols-2' : 'auto-cols-fr grid-flow-col',
		// Three segments share ~100px each on a phone: a step smaller text keeps icon + word inside.
		options.length === 3 && '[&>label]:max-sm:px-2 [&>label]:max-sm:text-sm',
	)
	return (
		<BaseRadioGroup
			className={cn(
				'bg-surface-sunken max-w-full gap-1 rounded-[18px] p-1',
				cards ? cn('grid w-full', cardColumns) : pillLayout,
				className as string,
			)}
			onValueChange={(value) => onValueChange?.(value as T)}
			{...props}
		>
			{options.map((option) => {
				const id = `${idPrefix}-${option.value}`
				return (
					// biome-ignore lint/a11y/noLabelWithoutControl: Base UI renders the radio inside the label.
					<label
						key={option.value}
						className={cn(
							'text-fg-muted hover:text-fg has-data-checked:bg-surface has-data-checked:text-fg has-focus-visible:ring-ring relative flex cursor-pointer rounded-[14px] px-4 text-[0.9375rem] font-semibold transition-[color,background-color,box-shadow] duration-(--ds-motion-fast) select-none has-focus-visible:ring-4 has-data-checked:shadow-[0_1px_2px_rgb(23_32_51/0.08),0_0_0_1px_var(--color-border-strong)]',
							cards
								? 'min-h-16 flex-col justify-center gap-0.5 py-2.5'
								: 'min-h-11 items-center justify-center px-3 py-2 text-center leading-tight sm:h-11 sm:px-4 sm:py-0',
						)}
					>
						<Radio.Root
							value={option.value}
							aria-labelledby={id}
							aria-describedby={option.hint !== undefined ? `${id}-hint` : undefined}
							className="absolute inset-0 cursor-pointer opacity-0"
						/>
						<span id={id}>{option.label}</span>
						{option.hint !== undefined ? (
							<span
								id={`${id}-hint`}
								translate="no"
								className="text-fg-muted tabular font-mono text-[0.8125rem] font-normal"
							>
								{option.hint}
							</span>
						) : null}
					</label>
				)
			})}
		</BaseRadioGroup>
	)
}
