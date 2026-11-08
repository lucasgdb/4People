'use client'

import { Alert } from '@4people/ui'
import { CircleX, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { convertPlate, generatePlate, plateFormat } from '@/lib/algorithms/documents'
import { GeneratedResult, useGenerateOnMount } from './_shared/document-generator'
import { FormCard, OutputValue, ResultCard, ToolLayout } from './_shared/tool-layout'

const FORMATS = [
	{ value: 'mercosul', label: 'Mercosul (ABC1D23)' },
	{ value: 'old', label: 'Antiga (ABC-1234)' },
] as const

const generateSchema = z.object({ format: z.enum(['mercosul', 'old']) })
const convertSchema = z.object({
	plate: z
		.string()
		.trim()
		.min(1, 'Informe a placa.')
		.refine((value) => plateFormat(value) !== null, 'Use o formato ABC-1234 ou ABC1D23.'),
})

function Converter() {
	const [result, setResult] = useState<
		{ ok: true; from: string; to: string } | { ok: false; error: string } | null
	>(null)
	const form = useToolForm({
		schema: convertSchema,
		defaultValues: { plate: '' },
		onSubmit: ({ plate }) => {
			try {
				setResult({ ok: true, from: plate.toUpperCase(), to: convertPlate(plate) })
			} catch (error) {
				setResult({ ok: false, error: (error as Error).message })
			}
		},
	})
	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton variant="secondary">Converter placa</form.SubmitButton>
					</form.AppForm>
				}
			>
				<form.AppField name="plate">
					{(f) => (
						<f.TextField
							label="Placa para converter"
							placeholder="Ex: ABC-1234 ou ABC1C34"
							description="Antiga ⇄ Mercosul: o 2º número vira letra (0 = A … 9 = J)."
							enterKeyHint="go"
						/>
					)}
				</form.AppField>
			</FormCard>
			<ResultCard
				title="Placa convertida"
				empty={!result}
				copyText={result?.ok ? result.to : undefined}
				onClear={() => setResult(null)}
			>
				{result?.ok ? (
					<OutputValue>{result.to}</OutputValue>
				) : result ? (
					<Alert tone="danger">
						<CircleX />
						{result.error}
					</Alert>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}

/**
 * Random plates in the old or Mercosul format, plus conversion between the two. A plate is ready on
 * arrival and changing the format makes a new one right away.
 */
export default function PlateGenerator() {
	const [value, setValue] = useState<string | null>(null)
	const form = useToolForm({
		schema: generateSchema,
		defaultValues: { format: 'mercosul' },
		onSubmit: ({ format }) => setValue(generatePlate(format)),
	})
	useGenerateOnMount(() => form.handleSubmit())

	return (
		<div className="flex flex-col gap-6">
			<ToolLayout>
				<FormCard
					title="Escolha como quer"
					onSubmit={() => form.handleSubmit()}
					actions={
						<form.AppForm>
							<form.SubmitButton>
								<RefreshCw aria-hidden="true" /> Gerar nova placa
							</form.SubmitButton>
						</form.AppForm>
					}
				>
					<form.AppField name="format" listeners={{ onChange: () => form.handleSubmit() }}>
						{(f) => <f.RadioField label="Formato" options={FORMATS} />}
					</form.AppField>
				</FormCard>
				<GeneratedResult values={value ? [value] : null} plural="placas" filename="placa.txt" />
			</ToolLayout>
			<Converter />
		</div>
	)
}
