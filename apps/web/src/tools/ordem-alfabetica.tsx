'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { sortLines } from '@/lib/algorithms/text'
import { formatNumber } from '@/lib/format'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const ORDERS = [
	{ value: 'asc', label: 'A → Z' },
	{ value: 'desc', label: 'Z → A' },
	{ value: 'length', label: 'Tamanho' },
	{ value: 'shuffle', label: 'Embaralhar' },
] as const

const schema = z.object({
	text: z.string().trim().min(1, 'Cole as linhas que você quer ordenar.'),
	order: z.enum(['asc', 'desc', 'length', 'shuffle']),
	ignoreCase: z.boolean(),
	natural: z.boolean(),
	unique: z.boolean(),
	removeEmpty: z.boolean(),
	trim: z.boolean(),
})

/** Alphabetical order the Brazilian way (accents, natural numbers), plus dedupe and shuffle. */
export default function SortLines() {
	const [lines, setLines] = useState<string[] | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: {
			text: '',
			order: 'asc',
			ignoreCase: true,
			natural: true,
			unique: false,
			removeEmpty: true,
			trim: true,
		},
		onSubmit: ({ text, ...options }) => setLines(sortLines(text, options)),
	})
	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>Ordenar</form.SubmitButton>
					</form.AppForm>
				}
			>
				<form.AppField name="text">
					{(field) => (
						<field.TextareaField
							label="Uma linha por item"
							rows={10}
							placeholder={'banana\nÁrvore\nabacate\nitem 10\nitem 2'}
						/>
					)}
				</form.AppField>
				<form.AppField name="order">
					{(field) => <field.RadioField label="Ordem" options={ORDERS} />}
				</form.AppField>
				<div className="grid gap-4 sm:grid-cols-2">
					<form.AppField name="ignoreCase">
						{(field) => <field.CheckboxField label="Ignorar maiúsculas e acentos" />}
					</form.AppField>
					<form.AppField name="natural">
						{(field) => <field.CheckboxField label="Ordem natural (2 antes de 10)" />}
					</form.AppField>
					<form.AppField name="unique">
						{(field) => <field.CheckboxField label="Remover duplicadas" />}
					</form.AppField>
					<form.AppField name="removeEmpty">
						{(field) => <field.CheckboxField label="Remover linhas vazias" />}
					</form.AppField>
					<form.AppField name="trim">
						{(field) => <field.CheckboxField label="Tirar espaços das pontas" />}
					</form.AppField>
				</div>
			</FormCard>
			<ResultCard
				empty={!lines}
				copyText={lines?.join('\n') ?? ''}
				downloadName="linhas-ordenadas.txt"
				onClear={() => setLines(null)}
			>
				{lines ? (
					<>
						<p className="text-fg-muted tabular text-sm">{formatNumber(lines.length)} linhas</p>
						<OutputBlock code={false} className="max-h-[36rem]">
							{lines.join('\n')}
						</OutputBlock>
					</>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
