'use client'

import { useStore } from '@tanstack/react-form'
import { RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { uuidV4, uuidV7 } from '@/lib/algorithms/crypto'
import { numeric } from '@/lib/schemas'
import { GeneratedResult, useGenerateOnMount } from './_shared/document-generator'
import { FormCard, ToolLayout } from './_shared/tool-layout'

const schema = z.object({
	version: z.enum(['v4', 'v7']),
	amount: numeric({ integer: true, min: 1, max: 1000 }),
	uppercase: z.boolean(),
	hyphens: z.boolean(),
})

const VERSIONS = [
	{ value: 'v4', label: 'v4 · aleatório' },
	{ value: 'v7', label: 'v7 · ordenado por tempo' },
] as const

/**
 * Batches of UUID v4 or v7 from the browser's CSPRNG. Version and amount make a new batch; hyphens
 * and case only restyle the batch on screen (the generated ids are kept in their canonical form).
 */
export default function UuidGenerator() {
	const [uuids, setUuids] = useState<string[] | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { version: 'v4', amount: '5', uppercase: false, hyphens: true },
		onSubmit: ({ version, amount }) => {
			const make = version === 'v4' ? uuidV4 : uuidV7
			setUuids(Array.from({ length: amount }, () => make()))
		},
	})
	useGenerateOnMount(() => form.handleSubmit())

	const hyphens = useStore(form.store, (state) => state.values.hyphens)
	const uppercase = useStore(form.store, (state) => state.values.uppercase)
	const shown =
		uuids?.map((id) => {
			const formatted = hyphens ? id : id.replaceAll('-', '')
			return uppercase ? formatted.toUpperCase() : formatted
		}) ?? null
	const regenerate = { onChange: () => form.handleSubmit() }

	return (
		<ToolLayout>
			<FormCard
				title="Escolha como quer"
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>
							<RefreshCw aria-hidden="true" /> Gerar novos UUIDs
						</form.SubmitButton>
					</form.AppForm>
				}
			>
				<form.AppField name="version" listeners={regenerate}>
					{(f) => <f.RadioField label="Versão" options={VERSIONS} />}
				</form.AppField>
				<form.AppField name="amount" listeners={regenerate}>
					{(f) => (
						<f.NumberField
							label="Quantidade"
							placeholder="Ex.: 5"
							description="De 1 a 1.000."
							integer
							min={1}
							max={1000}
						/>
					)}
				</form.AppField>
				<fieldset className="flex flex-col gap-1">
					<legend className="text-fg mb-1 text-sm font-medium">Formato</legend>
					<form.AppField name="hyphens">
						{(f) => <f.CheckboxField label="Com hífens" />}
					</form.AppField>
					<form.AppField name="uppercase">
						{(f) => <f.CheckboxField label="Letras maiúsculas" />}
					</form.AppField>
				</fieldset>
			</FormCard>
			<GeneratedResult values={shown} plural="UUIDs" filename="uuids.txt" />
		</ToolLayout>
	)
}
