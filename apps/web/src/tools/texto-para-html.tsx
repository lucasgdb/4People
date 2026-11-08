'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { htmlToText, textToHtml } from '@/lib/algorithms/text'
import { useModeMemory } from './_shared/mode-memory'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const DIRECTIONS = [
	{ value: 'toHtml', label: 'Texto → HTML' },
	{ value: 'toText', label: 'HTML → texto' },
] as const

const TEXT_FIELD = {
	toHtml: { label: 'Texto', placeholder: 'Ex: Preço < R$ 10 & frete grátis' },
	toText: { label: 'HTML', placeholder: 'Ex: Pre&ccedil;o &lt; R$ 10' },
} as const

const schema = z.object({
	direction: z.enum(['toHtml', 'toText']),
	text: z.string().min(1, 'Digite algo para converter.'),
	paragraphs: z.boolean(),
	links: z.boolean(),
})

/** Escapes text into safe HTML (paragraphs, <br>, links) and decodes HTML entities back to text. */
export default function TextToHtml() {
	const [output, setOutput] = useState<string | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { direction: 'toHtml', text: '', paragraphs: true, links: false },
		onSubmit: ({ direction, text, paragraphs, links }) => {
			const converted =
				direction === 'toHtml' ? textToHtml(text, { paragraphs, links }) : htmlToText(text)
			setOutput(converted)
		},
	})
	// Each direction keeps its own input and result.
	const switchMode = useModeMemory(form, 'text', 'toHtml', output, setOutput)
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
						<>
							<form.AppField name="text">
								{(field) => <field.TextareaField {...TEXT_FIELD[direction]} rows={8} />}
							</form.AppField>
							{direction === 'toHtml' ? (
								<div className="flex flex-col gap-3">
									<form.AppField name="paragraphs">
										{(field) => (
											<field.CheckboxField
												label="Parágrafos"
												description="Linha em branco vira <p>; quebra simples vira <br>."
											/>
										)}
									</form.AppField>
									<form.AppField name="links">
										{(field) => <field.CheckboxField label="Transformar URLs em links" />}
									</form.AppField>
								</div>
							) : null}
						</>
					)}
				</form.Subscribe>
			</FormCard>
			<ResultCard empty={output === null} copyText={output ?? ''} onClear={() => setOutput(null)}>
				<OutputBlock className="max-h-[36rem]">{output}</OutputBlock>
			</ResultCard>
		</ToolLayout>
	)
}
