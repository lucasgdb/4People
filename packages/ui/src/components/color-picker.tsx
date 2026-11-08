'use client'

import { Popover } from '@base-ui/react/popover'
import type { Ref } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { cn } from '../lib/cn.ts'
import { controlClass } from '../lib/control.ts'

/** A palette that works for print and screens; the first row are safe dark tones for QR modules. */
export const COLOR_PRESETS = [
	'#000000',
	'#172033',
	'#2747c4',
	'#0f766e',
	'#15803d',
	'#a62023',
	'#b4440e',
	'#7e22ce',
	'#ffffff',
	'#f3f5fa',
	'#fef3c7',
	'#dcfce7',
	'#e0f2fe',
	'#fce7f3',
] as const

export type ColorPickerProps = {
	/** Hex, "#rrggbb". */
	value: string
	onValueChange: (hex: string) => void
	/** Names the trigger (the visible label of the field). */
	'aria-labelledby'?: string
	id?: string
	triggerRef?: Ref<HTMLButtonElement>
	onBlur?: () => void
	presets?: readonly string[]
	className?: string
}

/**
 * A colour field: a button with the swatch and the hex code opens a panel with a saturation area,
 * a hue slider (both keyboard-operable, from react-colorful), a hex input and preset swatches.
 */
export function ColorPicker({
	value,
	onValueChange,
	id,
	triggerRef,
	onBlur,
	presets = COLOR_PRESETS,
	className,
	...aria
}: ColorPickerProps) {
	return (
		<Popover.Root>
			<Popover.Trigger
				ref={triggerRef}
				id={id}
				onBlur={onBlur}
				{...aria}
				className={cn(
					controlClass,
					'data-popup-open:border-accent flex h-12 cursor-pointer items-center gap-3 text-left',
					className,
				)}
			>
				<span
					aria-hidden="true"
					className="border-border-strong size-7 shrink-0 rounded-[8px] border"
					style={{ background: value }}
				/>
				<span translate="no" className="text-fg tabular font-mono text-[0.9375rem] uppercase">
					{value}
				</span>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Positioner sideOffset={8} className="z-50">
					<Popover.Popup
						aria-label="Escolher cor"
						className="rounded-panel border-border bg-surface shadow-float flex w-64 origin-(--transform-origin) flex-col gap-3 border p-3 transition-[opacity,scale] duration-(--ds-motion-fast) outline-none data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-starting-style:scale-[0.97] data-starting-style:opacity-0"
					>
						<HexColorPicker color={value} onChange={onValueChange} className="ds-color-picker" />
						<div className="flex items-center gap-2 text-sm">
							<span aria-hidden="true" className="text-fg-muted w-10">
								Hex
							</span>
							<HexColorInput
								color={value}
								onChange={onValueChange}
								prefixed
								aria-label="Código hexadecimal"
								className={cn(controlClass, 'h-10 flex-1 font-mono text-sm uppercase')}
							/>
						</div>
						<fieldset className="grid grid-cols-7 gap-1.5" aria-label="Cores prontas">
							{presets.map((preset) => (
								<button
									key={preset}
									type="button"
									aria-label={preset}
									aria-pressed={value.toLowerCase() === preset.toLowerCase()}
									onClick={() => onValueChange(preset)}
									className="border-border-strong focus-visible:ring-ring aria-pressed:ring-accent size-7 cursor-pointer rounded-[8px] border outline-none focus-visible:ring-4 aria-pressed:ring-2 aria-pressed:ring-offset-2"
									style={{ background: preset }}
								/>
							))}
						</fieldset>
					</Popover.Popup>
				</Popover.Positioner>
			</Popover.Portal>
		</Popover.Root>
	)
}

export type ColorAreaProps = {
	/** Hex, "#rrggbb". */
	value: string
	onValueChange: (hex: string) => void
	presets?: readonly string[]
	className?: string
}

/**
 * The picker without the popover, for screens where choosing a colour is the main task (a colour
 * converter): a large saturation area, the hue slider and the preset swatches, always visible.
 */
export function ColorArea({
	value,
	onValueChange,
	presets = COLOR_PRESETS,
	className,
}: ColorAreaProps) {
	return (
		<div className={cn('flex flex-col gap-4', className)}>
			<HexColorPicker
				color={value}
				onChange={onValueChange}
				className="ds-color-picker ds-color-picker-lg"
			/>
			<fieldset
				className="grid grid-cols-7 gap-2 sm:grid-cols-14 sm:gap-1.5"
				aria-label="Cores prontas"
			>
				{presets.map((preset) => (
					<button
						key={preset}
						type="button"
						aria-label={preset}
						aria-pressed={value.toLowerCase() === preset.toLowerCase()}
						onClick={() => onValueChange(preset)}
						className="border-border-strong focus-visible:ring-ring aria-pressed:ring-accent aspect-square w-full cursor-pointer rounded-[10px] border outline-none focus-visible:ring-4 aria-pressed:ring-2 aria-pressed:ring-offset-2"
						style={{ background: preset }}
					/>
				))}
			</fieldset>
		</div>
	)
}
