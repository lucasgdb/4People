'use client'

import { Alert } from '@4people/ui'
import { CircleX } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { base64Decode, base64Encode } from '@/lib/algorithms/encoding'
import { useModeMemory } from './_shared/mode-memory'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const schema = z.object({
	direction: z.enum(['encode', 'decode']),
	text: z.string().min(1, 'Digite algo para converter.'),
	urlSafe: z.boolean(),
})

const DIRECTIONS = [
	{ value: 'encode', label: 'Codificar' },
	{ value: 'decode', label: 'Decodificar' },
] as const

type Outcome = { ok: true; value: string } | { ok: false; error: string }

/** UTF-8 text ⇄ Base64, with the URL-safe alphabet as an option. */
export default function Base64() {
	const [outcome, setOutcome] = useState<Outcome | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { direction: 'encode', text: '', urlSafe: false },
		onSubmit: ({ direction, text, urlSafe }) => {
			try {
				setOutcome({
					ok: true,
					value: direction === 'encode' ? base64Encode(text, { urlSafe }) : base64Decode(text),
				})
			} catch (error) {
				setOutcome({ ok: false, error: (error as Error).message })
			}
		},
	})
	// Each direction keeps its own input and result (no binary left in the text field).
	const switchMode = useModeMemory(form, 'text', 'encode', outcome, setOutcome)

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
					{(f) => <f.RadioField label="Operação" options={DIRECTIONS} />}
				</form.AppField>
				<form.Subscribe selector={(state) => state.values.direction}>
					{(direction) => (
						<>
							<form.AppField name="text">
								{(f) => (
									<f.TextareaField
										label={direction === 'encode' ? 'Texto' : 'Base64'}
										rows={6}
										placeholder={
											direction === 'encode' ? 'Ex: Olá, mundo!' : 'Ex: T2zDoSwgbXVuZG8h'
										}
									/>
								)}
							</form.AppField>
							{direction === 'encode' ? (
								<form.AppField name="urlSafe">
									{(f) => (
										<f.CheckboxField
											label="Seguro para URL (Base64URL)"
											description="Troca + e / por - e _, sem =."
										/>
									)}
								</form.AppField>
							) : null}
						</>
					)}
				</form.Subscribe>
			</FormCard>
			<ResultCard
				empty={!outcome}
				copyText={outcome?.ok ? outcome.value : undefined}
				onClear={() => setOutcome(null)}
			>
				{outcome?.ok ? (
					<OutputBlock>{outcome.value}</OutputBlock>
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
