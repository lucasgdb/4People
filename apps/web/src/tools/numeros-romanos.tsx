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

type Outcome = { ok: true; value: string; parts?: RomanPart[] } | { ok: false; error: string }

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
const spoken = (parts: RomanPart[]) =>
	parts
		.map(({ symbols, bars }) =>
			bars === 0
				? symbols
				: `${symbols} com ${bars} ${bars === 1 ? 'barra' : 'barras'} (× ${formatBigInt(1000n ** BigInt(bars))})`,
		)
		.join(', ')

/** Bigger numerals get a smaller face so they still fit and wrap. */
const sizeFor = (length: number) =>
	length > 120 ? 'text-lg' : length > 40 ? 'text-2xl' : length > 14 ? 'text-4xl' : 'text-5xl'

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
				setOutcome({
					ok: true,
					...(direction === 'toRoman'
						? (() => {
								const number = parsePositiveInteger(value)
								return { value: toRoman(number), parts: toRomanParts(number) }
							})()
						: { value: formatBigInt(fromRoman(value)) }),
				})
			} catch (error) {
				setOutcome({ ok: false, error: (error as Error).message })
			}
		},
	})
	// Each direction keeps its own input and result (no binary left in the text field).
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
					{(f) => <f.RadioField label="Converter" options={DIRECTIONS} />}
				</form.AppField>
				<form.Subscribe selector={(state) => state.values.direction}>
					{(direction) => (
						<form.AppField name="value">
							{(f) => (
								<f.TextField
									label={direction === 'toRoman' ? 'Número inteiro positivo' : 'Número romano'}
									placeholder={direction === 'toRoman' ? 'Ex: 2026' : 'Ex: MMXXVI'}
									inputMode={direction === 'toRoman' ? 'numeric' : 'text'}
									enterKeyHint="go"
									description={
										direction === 'toRoman'
											? undefined
											: 'Acima de 3.999, cole o resultado da conversão ou use parênteses: cada par vale uma barra (× 1.000). Ex.: (IV) = 4.000.'
									}
								/>
							)}
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
					<div
						className="flex flex-col gap-2"
						// Selecting the result and copying gives the numeral itself (bars as U+0305), the same
						// text as "Copiar", not the badges or the screen-reader description around it.
						onCopy={(event) => {
							event.preventDefault()
							event.clipboardData.setData('text/plain', outcome.value)
						}}
					>
						<OutputValue
							className={cn(
								'font-extrabold tracking-wide',
								sizeFor(
									outcome.parts
										? outcome.parts.reduce((n, p) => n + p.symbols.length, 0)
										: outcome.value.length,
								),
							)}
						>
							{outcome.parts?.some((part) => part.bars > 0) ? (
								<>
									<span aria-hidden="true" translate="no" className="leading-[1.5] uppercase">
										{outcome.parts.map((part) => (
											<Barred key={`${part.bars}-${part.symbols}`} bars={part.bars}>
												{part.symbols}
											</Barred>
										))}
									</span>
									<span className="sr-only">{spoken(outcome.parts)}</span>
								</>
							) : (
								outcome.value
							)}
						</OutputValue>
						{outcome.parts?.some((part) => part.bars > MAX_STACKED_BARS) ? (
							<p className="text-fg-muted text-[0.8125rem]">
								Um número sobre a barra indica quantas barras ela representa; cada barra multiplica
								por 1.000. O texto copiado traz todas as barras.
							</p>
						) : null}
					</div>
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
