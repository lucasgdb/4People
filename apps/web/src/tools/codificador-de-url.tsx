'use client'

import { Alert } from '@4people/ui'
import { CircleX } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { urlDecode, urlEncode } from '@/lib/algorithms/encoding'
import { useModeMemory } from './_shared/mode-memory'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const DIRECTIONS = [
	{ value: 'encode', label: 'Codificar' },
	{ value: 'decode', label: 'Decodificar' },
] as const

const MODES = [
	{ value: 'component', label: 'Parte da URL' },
	{ value: 'full', label: 'URL completa' },
] as const

const schema = z.object({
	direction: z.enum(['encode', 'decode']),
	mode: z.enum(['component', 'full']),
	text: z.string().min(1, 'Digite algo para converter.'),
})

type Values = z.infer<typeof schema>
type Outcome = { ok: true; value: string } | { ok: false; error: string }

function convert({ direction, mode, text }: Values): Outcome {
	try {
		const value = direction === 'encode' ? urlEncode(text, mode) : urlDecode(text)
		return { ok: true, value }
	} catch (error) {
		return { ok: false, error: (error as Error).message }
	}
}

/** Percent-encoding: encodeURIComponent for a parameter, encodeURI for a whole address. */
export default function UrlEncoder() {
	const [outcome, setOutcome] = useState<Outcome | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { direction: 'encode', mode: 'component', text: '' },
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
					{(direction) =>
						direction === 'encode' && (
							<form.AppField name="mode">
								{(field) => (
									<field.RadioField
										label="O que você vai codificar"
										description="“Parte da URL” codifica também & = ? /; “URL completa” os mantém."
										options={MODES}
									/>
								)}
							</form.AppField>
						)
					}
				</form.Subscribe>
				<form.AppField name="text">
					{(field) => (
						<field.TextareaField label="Texto" rows={5} placeholder="Ex: busca por ação & reação" />
					)}
				</form.AppField>
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
