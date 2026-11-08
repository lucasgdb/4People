'use client'

import { Alert } from '@4people/ui'
import { CircleX } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { numberToWords } from '@/lib/algorithms/extenso'
import { FormCard, OutputValue, ResultCard, ToolLayout } from './_shared/tool-layout'

const MODES = [
	{ value: 'currency', label: 'Em reais' },
	{ value: 'number', label: 'Número' },
] as const

const schema = z.object({
	value: z.string().trim().min(1, 'Informe o número.'),
	mode: z.enum(['currency', 'number']),
})

type Outcome = { ok: true; text: string } | { ok: false; error: string }

/** Numbers in words the Brazilian way, for cheques, contracts and receipts. */
export default function NumberToWords() {
	const [outcome, setOutcome] = useState<Outcome | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { value: '', mode: 'currency' },
		onSubmit: ({ value, mode }) => {
			try {
				setOutcome({ ok: true, text: numberToWords(value, mode) })
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
						<form.SubmitButton>Escrever por extenso</form.SubmitButton>
					</form.AppForm>
				}
			>
				<form.AppField name="mode">
					{(field) => <field.RadioField label="Escrever como" options={MODES} />}
				</form.AppField>
				<form.AppField name="value">
					{(field) => (
						<field.TextField
							label="Número"
							placeholder="Ex: 1.234,56"
							inputMode="decimal"
							enterKeyHint="go"
							description="Até quatrilhões, com centavos ou casas decimais."
						/>
					)}
				</form.AppField>
			</FormCard>
			<ResultCard
				empty={!outcome}
				copyText={outcome?.ok ? outcome.text : undefined}
				onClear={() => setOutcome(null)}
			>
				{outcome?.ok ? (
					<OutputValue className="text-xl first-letter:uppercase sm:text-2xl">
						{outcome.text}
					</OutputValue>
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
