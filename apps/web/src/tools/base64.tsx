'use client'

import { Alert } from '@4people/ui'
import { CircleX } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { base64Decode, base64Encode } from '@/lib/algorithms/encoding'
import { useModeMemory } from './_shared/mode-memory'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const DIRECTIONS = [
	{ value: 'encode', label: 'Codificar' },
	{ value: 'decode', label: 'Decodificar' },
] as const

const schema = z.object({
	direction: z.enum(['encode', 'decode']),
	text: z.string().min(1, 'Digite algo para converter.'),
	urlSafe: z.boolean(),
})

type Values = z.infer<typeof schema>
type Outcome = { ok: true; value: string } | { ok: false; error: string }

function convert({ direction, text, urlSafe }: Values): Outcome {
	try {
		const value = direction === 'encode' ? base64Encode(text, { urlSafe }) : base64Decode(text)
		return { ok: true, value }
	} catch (error) {
		return { ok: false, error: (error as Error).message }
	}
}

/** UTF-8 text ⇄ Base64, with the URL-safe alphabet as an option. */
export default function Base64() {
	const [outcome, setOutcome] = useState<Outcome | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { direction: 'encode', text: '', urlSafe: false },
		onSubmit: (values) => setOutcome(convert(values)),
	})
	const switchDirection = useModeMemory(form, 'text', 'encode', outcome, setOutcome)

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
					listeners={{ onChange: ({ value }) => switchDirection(String(value)) }}
				>
					{(field) => <field.RadioField label="Operação" options={DIRECTIONS} />}
				</form.AppField>
				<form.Subscribe selector={(state) => state.values.direction}>
					{(direction) => {
						const encoding = direction === 'encode'
						return (
							<>
								<form.AppField name="text">
									{(field) => (
										<field.TextareaField
											label={encoding ? 'Texto' : 'Base64'}
											rows={6}
											placeholder={encoding ? 'Ex: Olá, mundo!' : 'Ex: T2zDoSwgbXVuZG8h'}
										/>
									)}
								</form.AppField>
								{encoding && (
									<form.AppField name="urlSafe">
										{(field) => (
											<field.CheckboxField
												label="Seguro para URL (Base64URL)"
												description="Troca + e / por - e _, sem =."
											/>
										)}
									</form.AppField>
								)}
							</>
						)
					}}
				</form.Subscribe>
			</FormCard>
			<ResultCard
				empty={!outcome}
				copyText={outcome?.ok ? outcome.value : undefined}
				onClear={() => setOutcome(null)}
			>
				{outcome?.ok && <OutputBlock>{outcome.value}</OutputBlock>}
				{outcome && !outcome.ok && (
					<Alert tone="danger">
						<CircleX />
						{outcome.error}
					</Alert>
				)}
			</ResultCard>
		</ToolLayout>
	)
}
