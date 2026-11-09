'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { cleanText } from '@/lib/algorithms/text'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const LINE_BREAK_OPTIONS = [
	{ value: 'keep', label: 'Manter' },
	{ value: 'space', label: 'Trocar por espaço' },
	{ value: 'remove', label: 'Remover' },
] as const

const schema = z.object({
	text: z.string().min(1, 'Cole o texto que você quer limpar.'),
	removeAccents: z.boolean(),
	lineBreaks: z.enum(['keep', 'space', 'remove']),
	collapseSpaces: z.boolean(),
	trimLines: z.boolean(),
	removeEmptyLines: z.boolean(),
})

/** Removes accents, line breaks and extra spaces in one pass. */
export default function CleanText() {
	const [output, setOutput] = useState<string | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: {
			text: '',
			removeAccents: true,
			lineBreaks: 'keep',
			collapseSpaces: true,
			trimLines: true,
			removeEmptyLines: false,
		},
		onSubmit: ({ text, ...options }) => setOutput(cleanText(text, options)),
	})
	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>Limpar texto</form.SubmitButton>
					</form.AppForm>
				}
			>
				<form.AppField name="text">
					{(field) => (
						<field.TextareaField label="Texto" rows={8} placeholder="Cole aqui o texto…" />
					)}
				</form.AppField>
				<form.AppField name="lineBreaks">
					{(field) => <field.RadioField label="Quebras de linha" options={LINE_BREAK_OPTIONS} />}
				</form.AppField>
				<div className="grid gap-4 sm:grid-cols-2">
					<form.AppField name="removeAccents">
						{(field) => <field.CheckboxField label="Remover acentos" description="ação → acao" />}
					</form.AppField>
					<form.AppField name="collapseSpaces">
						{(field) => <field.CheckboxField label="Juntar espaços repetidos" />}
					</form.AppField>
					<form.AppField name="trimLines">
						{(field) => <field.CheckboxField label="Tirar espaços das pontas" />}
					</form.AppField>
					<form.AppField name="removeEmptyLines">
						{(field) => <field.CheckboxField label="Remover linhas vazias" />}
					</form.AppField>
				</div>
			</FormCard>
			<ResultCard
				empty={output === null}
				copyText={output ?? ''}
				downloadName="texto-limpo.txt"
				onClear={() => setOutput(null)}
			>
				<OutputBlock code={false} className="max-h-[36rem]">
					{output}
				</OutputBlock>
			</ResultCard>
		</ToolLayout>
	)
}
