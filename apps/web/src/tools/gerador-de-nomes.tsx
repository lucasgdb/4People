'use client'

import { RefreshCw } from 'lucide-react'
import { useRef, useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { numeric } from '@/lib/schemas'
import { GeneratedResult, useGenerateOnMount } from './_shared/document-generator'
import { FormCard, ToolLayout } from './_shared/tool-layout'

const NAME_FORMATS = [
	{ value: 'first', label: 'Apenas o nome' },
	{ value: 'first-last', label: 'Nome + sobrenome' },
	{ value: 'full', label: 'Nome + dois sobrenomes' },
] as const

const SEXES = [
	{ value: 'any', label: 'Ambos' },
	{ value: 'male', label: 'Masculino' },
	{ value: 'female', label: 'Feminino' },
] as const

const schema = z.object({
	format: z.enum(['first', 'first-last', 'full']),
	sex: z.enum(['male', 'female', 'any']),
	amount: numeric({ integer: true, min: 1, max: 500 }),
})

/** Brazilian names (faker pt_BR). Every option changes the names, so each change makes a new list. */
export default function NameGenerator() {
	const [names, setNames] = useState<string[] | null>(null)
	// Quick changes can overlap while faker loads: only the latest request may show its list.
	const latestRequestId = useRef(0)
	const form = useToolForm({
		schema,
		defaultValues: { format: 'first-last', sex: 'any', amount: '10' },
		// faker's pt_BR data is ~450KB: loaded when the first list is made, never with the page.
		onSubmit: async ({ amount, format, sex }) => {
			latestRequestId.current += 1
			const requestId = latestRequestId.current
			const { generateNames } = await import('@/lib/algorithms/names')
			if (requestId !== latestRequestId.current) return
			setNames(generateNames(amount, format, sex))
		},
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
							<RefreshCw aria-hidden="true" /> Gerar novos nomes
						</form.SubmitButton>
					</form.AppForm>
				}
			>
				<form.AppField name="format" listeners={regenerate}>
					{(field) => <field.SelectField label="Tipo de nome" options={NAME_FORMATS} />}
				</form.AppField>
				<form.AppField name="sex" listeners={regenerate}>
					{(field) => <field.RadioField label="Sexo" options={SEXES} />}
				</form.AppField>
				<form.AppField name="amount" listeners={regenerate}>
					{(field) => (
						<field.NumberField
							label="Quantidade"
							placeholder="Ex: 10"
							description="De 1 a 500."
							integer
							min={1}
							max={500}
						/>
					)}
				</form.AppField>
			</FormCard>
			<GeneratedResult values={names} plural="nomes" filename="nomes.txt" />
		</ToolLayout>
	)
}
