'use client'

import { Alert, cn } from '@4people/ui'
import { CircleX } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import {
	fromRoman,
	parsePositiveInteger,
	type RomanPart,
	toRoman,
	toRomanParts,
} from '@/lib/algorithms/number-theory'
import { formatBigInt } from '@/lib/format'
import { useModeMemory } from './_shared/mode-memory'
import { FormCard, OutputValue, ResultCard, ToolLayout } from './_shared/tool-layout'

const schema = z.object({
	direction: z.enum(['toRoman', 'fromRoman']),
	value: z.string().trim().min(1, 'Informe o valor.'),
})

const DIRECTIONS = [
	{ value: 'toRoman', label: 'Número → romano' },
	{ value: 'fromRoman', label: 'Romano → número' },
] as const

type Direction = (typeof DIRECTIONS)[number]['value']

const VALUE_FIELD = {
	toRoman: {
		label: 'Número inteiro positivo',
		placeholder: 'Ex: 2026',
		inputMode: 'numeric',
		description: undefined,
	},
	fromRoman: {
		label: 'Número romano',
		placeholder: 'Ex: MMXXVI',
		inputMode: 'text',
		description:
			'Acima de 3.999, cole o resultado da conversão ou use parênteses: cada par vale uma barra (× 1.000). Ex.: (IV) = 4.000.',
	},
} as const satisfies Record<Direction, object>

type Conversion = { value: string; parts?: RomanPart[] }

type Outcome = ({ ok: true } & Conversion) | { ok: false; error: string }

/** Up to this many bars are drawn as stacked lines; more would be an unreadable wall of lines. */
const MAX_STACKED_BARS = 3

/**
 * Draws the bars over a run of symbols: one line per level, stacked (outermost = highest level), up
 * to MAX_STACKED_BARS; above that, a single line with a small badge at its right end saying how
 * many bars it stands for (kept off the line and out of the next symbols' way).
 */
function Barred({ bars, children }: { bars: number; children: ReactNode }) {
	// inline-block: lines wrap between groups, never inside one (no "CMXCI / X").
	if (bars === 0) return <span className="inline-block">{children}</span>
	if (bars > MAX_STACKED_BARS)
		return (
			<span className="relative mr-[1.1em] inline-block border-t-[0.06em] border-current pt-[0.08em]">
				<span className="bg-accent-soft text-accent-soft-fg pointer-events-none absolute top-0 left-full ml-[0.12em] -translate-y-1/2 rounded-full px-[0.45em] py-[0.15em] text-[max(0.28em,0.6875rem)] leading-none font-bold tracking-normal whitespace-nowrap select-none">
					{bars}
				</span>
				{children}
			</span>
		)
	return (
		<span className="inline-block border-t-[0.06em] border-current pt-[0.08em]">
			<Barred bars={bars - 1}>{children}</Barred>
		</span>
	)
}

/** How a screen reader should say the numeral: the bars are visual only. */
const spokenNumeral = (parts: readonly RomanPart[]) =>
	parts
		.map(({ symbols, bars }) => {
			if (bars === 0) return symbols
			const barWord = bars === 1 ? 'barra' : 'barras'
			return `${symbols} com ${bars} ${barWord} (× ${formatBigInt(1000n ** BigInt(bars))})`
		})
		.join(', ')

/** Font size by symbol count: bigger numerals get a smaller face so they still fit and wrap. */
const SIZE_BY_LENGTH: ReadonlyArray<{ above: number; className: string }> = [
	{ above: 120, className: 'text-lg' },
	{ above: 40, className: 'text-2xl' },
	{ above: 14, className: 'text-4xl' },
]

const sizeFor = (symbolCount: number) =>
	SIZE_BY_LENGTH.find(({ above }) => symbolCount > above)?.className ?? 'text-5xl'

const symbolCountOf = ({ value, parts }: Conversion) =>
	parts ? parts.reduce((count, part) => count + part.symbols.length, 0) : value.length

function convert(direction: Direction, input: string): Conversion {
	if (direction === 'fromRoman') return { value: formatBigInt(fromRoman(input)) }
	const number = parsePositiveInteger(input)
	return { value: toRoman(number), parts: toRomanParts(number) }
}

function NumeralOutput({ value, parts }: Conversion) {
	const hasBars = parts?.some((part) => part.bars > 0) ?? false
	const hasCountBadge = parts?.some((part) => part.bars > MAX_STACKED_BARS) ?? false
	return (
		<div
			className="flex flex-col gap-2"
			// Copying a selection gives the numeral text (bars as U+0305), like "Copiar", not the
			// badges or the screen-reader description.
			onCopy={(event) => {
				event.preventDefault()
				event.clipboardData.setData('text/plain', value)
			}}
		>
			<OutputValue
				className={cn('font-extrabold tracking-wide', sizeFor(symbolCountOf({ value, parts })))}
			>
				{parts && hasBars ? (
					<>
						<span aria-hidden="true" translate="no" className="leading-[1.5] uppercase">
							{parts.map((part) => (
								<Barred key={`${part.bars}-${part.symbols}`} bars={part.bars}>
									{part.symbols}
								</Barred>
							))}
						</span>
						<span className="sr-only">{spokenNumeral(parts)}</span>
					</>
				) : (
					value
				)}
			</OutputValue>
			{hasCountBadge ? (
				<p className="text-fg-muted text-[0.8125rem]">
					Um número sobre a barra indica quantas barras ela representa; cada barra multiplica por
					1.000. O texto copiado traz todas as barras.
				</p>
			) : null}
		</div>
	)
}

/**
 * Positive integers ⇄ Roman numerals, with no upper limit: above 3.999 it uses the vinculum (bars
 * that multiply by 1.000, see toRomanParts in lib/algorithms/number-theory.ts for the convention).
 * Malformed numerals like IIII are rejected.
 */
export default function RomanNumerals() {
	const [outcome, setOutcome] = useState<Outcome | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { direction: 'toRoman', value: '' },
		onSubmit: ({ direction, value }) => {
			try {
				setOutcome({ ok: true, ...convert(direction, value) })
			} catch (error) {
				setOutcome({ ok: false, error: (error as Error).message })
			}
		},
	})
	// Each direction keeps its own input and result.
	const switchMode = useModeMemory(form, 'value', 'toRoman', outcome, setOutcome)

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>Converter</form.SubmitButton>
					</form.AppForm>
				}
			>
				<form.AppField
					name="direction"
					listeners={{ onChange: ({ value }) => switchMode(String(value)) }}
				>
					{(field) => <field.RadioField label="Converter" options={DIRECTIONS} />}
				</form.AppField>
				<form.Subscribe selector={(state) => state.values.direction}>
					{(direction) => (
						<form.AppField name="value">
							{(field) => <field.TextField {...VALUE_FIELD[direction]} enterKeyHint="go" />}
						</form.AppField>
					)}
				</form.Subscribe>
			</FormCard>
			<ResultCard
				empty={!outcome}
				copyText={outcome?.ok ? outcome.value : undefined}
				onClear={() => setOutcome(null)}
			>
				{outcome?.ok ? (
					<NumeralOutput value={outcome.value} parts={outcome.parts} />
				) : outcome ? (
					<Alert tone="danger">
						<CircleX />
						{outcome.error}
					</Alert>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
