'use client'

import { Slider as BaseSlider } from '@base-ui/react/slider'
import type { Ref } from 'react'
import { cn } from '../lib/cn.ts'

export type SliderProps = {
	value: number
	onValueChange: (value: number) => void
	min?: number
	max?: number
	step?: number
	/** Step for PageUp/PageDown and Shift+arrows (default: 10 steps). */
	largeStep?: number
	/** Names the thumb for assistive tech (or use `aria-labelledby`). */
	'aria-label'?: string
	'aria-labelledby'?: string
	'aria-describedby'?: string
	name?: string
	onBlur?: () => void
	thumbRef?: Ref<HTMLInputElement>
	className?: string
}

/**
 * A range on a soft track: the chosen part filled in the primary blue, a white thumb with a blue
 * ring that grows on hover and press. Base UI handles pointer, touch and keys (arrows, PageUp/Down,
 * Home/End) and the slider semantics.
 */
export function Slider({
	value,
	onValueChange,
	min = 0,
	max = 100,
	step = 1,
	largeStep,
	thumbRef,
	className,
	onBlur,
	name,
	...aria
}: SliderProps) {
	return (
		<BaseSlider.Root
			value={value}
			onValueChange={(next) => onValueChange(next as number)}
			min={min}
			max={max}
			step={step}
			largeStep={largeStep ?? step * 10}
			name={name}
			className={cn('w-full touch-none select-none', className)}
		>
			<BaseSlider.Control className="flex h-8 w-full cursor-pointer items-center">
				<BaseSlider.Track className="bg-surface-sunken relative h-2 w-full rounded-full">
					<BaseSlider.Indicator className="bg-primary rounded-full" />
					<BaseSlider.Thumb
						inputRef={thumbRef}
						onBlur={onBlur}
						{...aria}
						className="border-primary bg-surface has-focus-visible:ring-ring size-5 cursor-grab rounded-full border-[3px] shadow-[0_1px_3px_rgb(23_32_51/0.25)] transition-[scale,box-shadow] duration-(--ds-motion-fast) outline-none hover:scale-110 active:cursor-grabbing has-focus-visible:ring-4 data-dragging:scale-115"
					/>
				</BaseSlider.Track>
			</BaseSlider.Control>
		</BaseSlider.Root>
	)
}
