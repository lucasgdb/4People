'use client'

import { Alert } from '@4people/ui'
import { CircleX } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { convertBase } from '@/lib/algorithms/encoding'
import { numeric } from '@/lib/schemas'
import { type CopyRow, CopyRows } from './_shared/copy-rows'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const BASES = [
	{ value: '2', label: 'Binário (2)' },
	{ value: '8', label: 'Octal (8)' },
	{ value: '10', label: 'Decimal (10)' },
	{ value: '16', label: 'Hexadecimal (16)' },
] as const

const schema = z.object({
	value: z.string().trim().min(1, 'Informe o número.'),
	from: z.enum(['2', '8', '10', '16']),
	custom: numeric({ integer: true, min: 2, max: 36 }),
})

type Outcome = { ok: true; rows: CopyRow[] } | { ok: false; error: string }

/** An integer in every common base at once (exact with BigInt), plus any base from 2 to 36. */
export default function NumberBaseConverter() {
	const [outcome, setOutcome] = useState<Outcome | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { value: '', from: '10', custom: '36' },
		onSubmit: ({ value, from, custom }) => {
			try {
				const rows = [
					...BASES.map((base) => ({ label: base.label, base: Number(base.value) })),
					{ label: `Base ${custom}`, base: custom },
				]
					.filter((row, index, all) => all.findIndex((other) => other.base === row.base) === index)
					.map(({ label, base }) => ({
						label,
						value: convertBase(value, Number(from), base).toUpperCase(),
					}))
				setOutcome({ ok: true, rows })
			} catch (error) {
				setOutcome({ ok: false, error: (error as Error).message })
			}
		},
	})

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
				<form.AppField name="value">
					{(f) => (
						<f.TextField
							label="Número"
							placeholder="Ex: 255, FF ou 11111111"
							inputMode="text"
							enterKeyHint="go"
						/>
					)}
				</form.AppField>
				<div className="grid gap-4 sm:grid-cols-2">
					<form.AppField name="from">
						{(f) => <f.SelectField label="Está na base" options={BASES} />}
					</form.AppField>
					<form.AppField name="custom">
						{(f) => (
							<f.NumberField
								label="Converter também para a base"
								description="De 2 a 36."
								placeholder="Ex: 36"
								integer
								min={2}
								max={36}
							/>
						)}
					</form.AppField>
				</div>
			</FormCard>
			<ResultCard empty={!outcome} onClear={() => setOutcome(null)}>
				{outcome?.ok ? (
					<CopyRows rows={outcome.rows} code />
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
