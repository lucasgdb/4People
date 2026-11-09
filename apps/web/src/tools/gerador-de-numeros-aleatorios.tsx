'use client'

import { Badge, Button, CopyButton } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { Download, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { randomIntegers } from '@/lib/algorithms/random'
import { downloadText, formatNumber } from '@/lib/format'
import { numeric } from '@/lib/schemas'
import { useGenerateOnMount } from './_shared/document-generator'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const VALUE_LIMIT = 1_000_000_000
const MAX_COUNT = 10_000
/** Above this, the numbers are shown as one block of text instead of badges. */
const MAX_BADGES = 50

const schema = z
	.object({
		min: numeric({ integer: true, min: -VALUE_LIMIT, max: VALUE_LIMIT }),
		max: numeric({ integer: true, min: -VALUE_LIMIT, max: VALUE_LIMIT }),
		count: numeric({ integer: true, min: 1, max: MAX_COUNT }),
		unique: z.boolean(),
		sorted: z.boolean(),
	})
	.superRefine(({ min, max, count, unique }, ctx) => {
		if (min > max) {
			ctx.addIssue({
				code: 'custom',
				path: ['max'],
				message: 'O máximo deve ser maior que o mínimo.',
			})
			return
		}
		const rangeSize = max - min + 1
		if (unique && count > rangeSize) {
			ctx.addIssue({
				code: 'custom',
				path: ['count'],
				message: `Sem repetir, cabem no máximo ${formatNumber(rangeSize)} números.`,
			})
		}
	})

function DrawnNumbers({
	numbers,
	numbersText,
}: {
	numbers: readonly number[]
	numbersText: string
}) {
	if (numbers.length > MAX_BADGES) {
		return (
			<OutputBlock code={false} className="tabular">
				{numbersText}
			</OutputBlock>
		)
	}
	return (
		<div className="flex flex-wrap gap-2">
			{numbers.map((number, position) => (
				<Badge
					// biome-ignore lint/suspicious/noArrayIndexKey: draws may repeat a number, so the position is the identity
					key={position}
					tone="neutral"
					className="tabular h-10 min-w-10 justify-center px-4 text-lg"
				>
					{number}
				</Badge>
			))}
		</div>
	)
}

/**
 * Random integers / raffle from the browser's CSPRNG, with or without repetition. Range, amount and
 * repetition make a new draw; the order only rearranges the draw on screen (kept in draw order).
 */
export default function RandomNumbers() {
	const [drawn, setDrawn] = useState<number[] | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { min: '1', max: '60', count: '6', unique: true, sorted: true },
		onSubmit: ({ min, max, count, unique }) => setDrawn(randomIntegers(min, max, count, unique)),
	})
	useGenerateOnMount(() => form.handleSubmit())

	const sorted = useStore(form.store, (state) => state.values.sorted)
	const numbers = drawn && sorted ? [...drawn].sort((a, b) => a - b) : drawn
	const numbersText = numbers?.join(', ') ?? ''
	const hasMany = numbers !== null && numbers.length > 1
	// Validated here first: typing a "De" above "Até" shows the error on "Até" without moving focus.
	const regenerate = {
		onChange: () => {
			if (schema.safeParse(form.state.values).success) form.handleSubmit()
		},
	}

	return (
		<ToolLayout resultFirst>
			<FormCard
				title="Escolha como quer"
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>
							<RefreshCw aria-hidden="true" /> Sortear novos números
						</form.SubmitButton>
					</form.AppForm>
				}
			>
				<div className="grid grid-cols-2 items-end gap-4 sm:grid-cols-3">
					<form.AppField name="min" listeners={regenerate}>
						{(field) => (
							<field.NumberField label="De" integer min={-VALUE_LIMIT} max={VALUE_LIMIT} />
						)}
					</form.AppField>
					<form.AppField name="max" listeners={regenerate}>
						{(field) => (
							<field.NumberField label="Até" integer min={-VALUE_LIMIT} max={VALUE_LIMIT} />
						)}
					</form.AppField>
					<form.AppField name="count" listeners={regenerate}>
						{(field) => <field.NumberField label="Quantidade" integer min={1} max={MAX_COUNT} />}
					</form.AppField>
				</div>
				<div className="flex flex-col gap-4">
					<form.AppField name="unique" listeners={regenerate}>
						{(field) => <field.CheckboxField label="Sem repetir números" />}
					</form.AppField>
					<form.AppField name="sorted">
						{(field) => <field.CheckboxField label="Em ordem crescente" />}
					</form.AppField>
				</div>
			</FormCard>
			<ResultCard
				title="Números sorteados"
				empty={!numbers}
				emptyText="Sorteando…"
				action={
					<div className="flex gap-2">
						<Button
							variant="secondary"
							size="sm"
							onClick={() => downloadText('numeros.txt', numbersText)}
						>
							<Download /> Salvar .txt
						</Button>
						<CopyButton
							value={numbersText}
							label={hasMany ? 'Copiar todos' : 'Copiar'}
							aria-label={hasMany ? `Copiar todos os ${numbers.length} números` : undefined}
						/>
					</div>
				}
			>
				{numbers ? <DrawnNumbers numbers={numbers} numbersText={numbersText} /> : null}
			</ResultCard>
		</ToolLayout>
	)
}
