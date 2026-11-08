'use client'

import { Button, CopyButton } from '@4people/ui'
import { Download, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { generateLorem } from '@/lib/algorithms/lorem'
import { downloadText } from '@/lib/format'
import { numeric } from '@/lib/schemas'
import { useGenerateOnMount } from './_shared/document-generator'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const UNITS = [
	{ value: 'paragraphs', label: 'Parágrafos' },
	{ value: 'sentences', label: 'Frases' },
	{ value: 'words', label: 'Palavras' },
] as const

const schema = z.object({
	amount: numeric({ integer: true, min: 1, max: 1000 }),
	unit: z.enum(['paragraphs', 'sentences', 'words']),
	startWithLorem: z.boolean(),
})

/** Placeholder text in paragraphs, sentences or words; every option makes a new text right away. */
export default function LoremIpsum() {
	const [text, setText] = useState<string | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { amount: '3', unit: 'paragraphs', startWithLorem: true },
		onSubmit: ({ amount, unit, startWithLorem }) =>
			setText(generateLorem(amount, unit, startWithLorem)),
	})
	useGenerateOnMount(() => form.handleSubmit())
	const regenerate = { onChange: () => form.handleSubmit() }

	return (
		<ToolLayout>
			<FormCard
				title="Escolha como quer"
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>
							<RefreshCw aria-hidden="true" /> Gerar novo texto
						</form.SubmitButton>
					</form.AppForm>
				}
			>
				<div className="grid gap-4 sm:grid-cols-2">
					<form.AppField name="amount" listeners={regenerate}>
						{(field) => (
							<field.NumberField
								label="Quantidade"
								description="De 1 a 1.000."
								integer
								min={1}
								max={1000}
							/>
						)}
					</form.AppField>
					<form.AppField name="unit" listeners={regenerate}>
						{(field) => <field.SelectField label="De" options={UNITS} />}
					</form.AppField>
				</div>
				<form.AppField name="startWithLorem" listeners={regenerate}>
					{(field) => <field.CheckboxField label="Começar com “Lorem ipsum dolor sit amet”" />}
				</form.AppField>
			</FormCard>
			<ResultCard
				title="Copie e use"
				empty={!text}
				emptyText="Gerando texto…"
				action={
					<div className="flex gap-2">
						<Button
							variant="secondary"
							size="sm"
							onClick={() => downloadText('lorem-ipsum.txt', text ?? '')}
						>
							<Download /> Salvar .txt
						</Button>
						<CopyButton value={text ?? ''} label="Copiar texto" />
					</div>
				}
			>
				<OutputBlock code={false} className="max-h-[36rem]">
					{text}
				</OutputBlock>
			</ResultCard>
		</ToolLayout>
	)
}
