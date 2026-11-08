'use client'

import { Alert } from '@4people/ui'
import { CircleX } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { binaryToText, textToBinary } from '@/lib/algorithms/encoding'
import { useModeMemory } from './_shared/mode-memory'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const DIRECTIONS = [
	{ value: 'encode', label: 'Texto → Binário' },
	{ value: 'decode', label: 'Binário → Texto' },
] as const

const schema = z.object({
	direction: z.enum(['encode', 'decode']),
	input: z.string().min(1, 'Digite algo para converter.'),
})

type Values = z.infer<typeof schema>
type Outcome = { ok: true; value: string } | { ok: false; error: string }

function convert({ direction, input }: Values): Outcome {
	try {
		const value = direction === 'encode' ? textToBinary(input) : binaryToText(input)
		return { ok: true, value }
	} catch (error) {
		return { ok: false, error: (error as Error).message }
	}
}

/** UTF-8 text ⇄ space-separated 8-bit binary groups. */
export default function BinaryConverter() {
	const [outcome, setOutcome] = useState<Outcome | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { direction: 'encode', input: '' },
		onSubmit: (values) => setOutcome(convert(values)),
	})
	const switchDirection = useModeMemory(form, 'input', 'encode', outcome, setOutcome)

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
					{(field) => <field.RadioField label="Converter" options={DIRECTIONS} />}
				</form.AppField>
				<form.Subscribe selector={(state) => state.values.direction}>
					{(direction) => (
						<form.AppField name="input">
							{(field) => (
								<field.TextareaField
									label={direction === 'encode' ? 'Texto' : 'Código binário'}
									rows={6}
									placeholder={
										direction === 'encode'
											? 'Ex: Olá!'
											: 'Ex: 01001111 01101100 11000011 10100001 00100001'
									}
								/>
							)}
						</form.AppField>
					)}
				</form.Subscribe>
			</FormCard>
			<ResultCard
				empty={!outcome}
				copyText={outcome?.ok ? outcome.value : ''}
				downloadName={outcome?.ok ? 'binario.txt' : undefined}
				onClear={() => {
					setOutcome(null)
					form.reset()
				}}
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
