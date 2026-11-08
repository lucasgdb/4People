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
		onSubmit: ({ direction, text, paragraphs, links }) =>
			setOutput(
				direction === 'toHtml' ? textToHtml(text, { paragraphs, links }) : htmlToText(text),
			),
	})
	// Each direction keeps its own input and result (no binary left in the text field).
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
					{(f) => <f.RadioField label="Converter" options={DIRECTIONS} />}
				</form.AppField>
				<form.Subscribe selector={(state) => state.values.direction}>
					{(direction) => (
						<>
							<form.AppField name="text">
								{(f) => (
									<f.TextareaField
										label={direction === 'toHtml' ? 'Texto' : 'HTML'}
										rows={8}
										placeholder={
											direction === 'toHtml'
												? 'Ex: Preço < R$ 10 & frete grátis'
												: 'Ex: Pre&ccedil;o &lt; R$ 10'
										}
									/>
								)}
							</form.AppField>
							{direction === 'toHtml' ? (
								<div className="flex flex-col gap-3">
									<form.AppField name="paragraphs">
										{(f) => (
											<f.CheckboxField
												label="Parágrafos"
												description="Linha em branco vira <p>; quebra simples vira <br>."
											/>
										)}
									</form.AppField>
									<form.AppField name="links">
										{(f) => <f.CheckboxField label="Transformar URLs em links" />}
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
