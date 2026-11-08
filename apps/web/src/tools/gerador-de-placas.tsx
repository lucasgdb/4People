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

type Conversion = { ok: true; plate: string } | { ok: false; error: string }

function ConversionResult({ conversion }: { conversion: Conversion }) {
	if (conversion.ok) return <OutputValue>{conversion.plate}</OutputValue>
	return (
		<Alert tone="danger">
			<CircleX />
			{conversion.error}
		</Alert>
	)
}

function Converter() {
	const [conversion, setConversion] = useState<Conversion | null>(null)
	const form = useToolForm({
		schema: convertSchema,
		defaultValues: { plate: '' },
		onSubmit: ({ plate }) => {
			try {
				setConversion({ ok: true, plate: convertPlate(plate) })
			} catch (error) {
				setConversion({ ok: false, error: (error as Error).message })
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
					{(field) => (
						<field.TextField
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
				empty={!conversion}
				copyText={conversion?.ok ? conversion.plate : undefined}
				onClear={() => setConversion(null)}
			>
				{conversion ? <ConversionResult conversion={conversion} /> : null}
			</ResultCard>
		</ToolLayout>
	)
}

/**
 * Random plates in the old or Mercosul format, plus conversion between the two. A plate is ready on
 * arrival and changing the format makes a new one right away.
 */
export default function PlateGenerator() {
	const [plate, setPlate] = useState<string | null>(null)
	const form = useToolForm({
		schema: generateSchema,
		defaultValues: { format: 'mercosul' },
		onSubmit: ({ format }) => setPlate(generatePlate(format)),
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
						{(field) => <field.RadioField label="Formato" options={FORMATS} />}
					</form.AppField>
				</FormCard>
				<GeneratedResult values={plate ? [plate] : null} plural="placas" filename="placa.txt" />
			</ToolLayout>
			<Converter />
		</div>
	)
}
