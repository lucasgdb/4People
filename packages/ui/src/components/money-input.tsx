'use client'

import { type ComponentProps, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '../lib/cn.ts'
import { caretAfterFormat, formatMoneyInput, parseMoneyInput } from '../lib/money.ts'
import { Input } from './input.tsx'

export type MoneyInputProps = Omit<
	ComponentProps<typeof Input>,
	'value' | 'onChange' | 'type' | 'inputMode' | 'prefix'
> & {
	/** Formatted text, as this input gives it back ("1.234,5"). */
	value: string
	onValueChange: (text: string, amount: number | null) => void
	/** Digits after the comma: 2 for most currencies, 0 for iene, 8 for bitcoin. */
	decimals?: number
	/** Currency shown inside the field, before the amount: "R$", "US$", "BTC". */
	prefix?: string
}

/**
 * Amount of money that formats itself while typing: thousands get their dots, the comma starts the
 * cents (the "." key also types it, for number pads), and the caret stays where the person is typing.
 */
export function MoneyInput({
	value,
	onValueChange,
	decimals = 2,
	prefix,
	className,
	onKeyDown,
	...props
}: MoneyInputProps) {
	const inputRef = useRef<HTMLInputElement>(null)
	const prefixRef = useRef<HTMLSpanElement>(null)
	const pendingCaret = useRef<number | null>(null)
	const [prefixWidth, setPrefixWidth] = useState(0)

	// The amount starts right after the currency, however wide it is ("R$" or "CHF").
	useLayoutEffect(() => {
		setPrefixWidth(prefix ? (prefixRef.current?.offsetWidth ?? 0) : 0)
	}, [prefix])

	useLayoutEffect(() => {
		const input = inputRef.current
		if (pendingCaret.current === null || !input || document.activeElement !== input) return
		input.setSelectionRange(pendingCaret.current, pendingCaret.current)
		pendingCaret.current = null
	})

	const update = (raw: string, caret: number) => {
		const formatted = formatMoneyInput(raw, decimals)
		pendingCaret.current = caretAfterFormat(raw, caret, formatted)
		onValueChange(formatted, parseMoneyInput(formatted))
	}

	const handleKeyDown = (event: Parameters<NonNullable<MoneyInputProps['onKeyDown']>>[0]) => {
		onKeyDown?.(event)
		if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return
		// A currency without cents (iene) or a second comma: the key does nothing.
		if (event.key === ',' && (decimals === 0 || event.currentTarget.value.includes(','))) {
			event.preventDefault()
			return
		}
		// Number pads and US keyboards type "." for decimals: here it starts the cents.
		if (event.key === '.' || event.key === 'Decimal') {
			event.preventDefault()
			const input = event.currentTarget
			if (decimals === 0 || input.value.includes(',')) return
			const start = input.selectionStart ?? input.value.length
			const end = input.selectionEnd ?? start
			update(`${input.value.slice(0, start)},${input.value.slice(end)}`, start + 1)
		}
	}

	return (
		<div className="relative min-w-0">
			{prefix ? (
				<span
					ref={prefixRef}
					aria-hidden="true"
					className="text-fg-muted pointer-events-none absolute inset-y-0 left-4 flex items-center text-[0.9375rem] font-medium"
				>
					{prefix}
				</span>
			) : null}
			<Input
				ref={inputRef}
				type="text"
				inputMode="decimal"
				autoComplete="off"
				spellCheck={false}
				value={value}
				onChange={(event) =>
					update(event.target.value, event.target.selectionStart ?? event.target.value.length)
				}
				onKeyDown={handleKeyDown}
				style={prefixWidth ? { paddingLeft: `calc(1rem + ${prefixWidth}px + 0.5rem)` } : undefined}
				className={cn('tabular', className as string)}
				{...props}
			/>
		</div>
	)
}
