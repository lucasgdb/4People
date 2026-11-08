'use client'

import { Alert } from '@4people/ui'
import { CircleX } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { binaryToText, textToBinary } from '@/lib/algorithms/encoding'
import { useModeMemory } from './_shared/mode-memory'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const schema = z.object({
	direction: z.enum(['encode', 'decode']),
	input: z.string().min(1, 'Digite algo para converter.'),
})

export default function BinaryConverter() {
	const [result, setResult] = useState<
		{ ok: true; value: string } | { ok: false; error: string } | null
	>(null)

	const form = useToolForm({
		schema,
		defaultValues: { direction: 'encode', input: '' },
		onSubmit: ({ direction, input }) => {
			try {
				setResult({
					ok: true,
					value: direction === 'encode' ? textToBinary(input) : binaryToText(input),
				})
			} catch (error) {
				setResult({ ok: false, error: (error as Error).message })
			}
		},
	})
	// Each direction keeps its own input and result (no binary left in the text field).
	const switchMode = useModeMemory(form, 'input', 'encode', result, setResult)

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
					{(f) => (
						<f.RadioField
							label="Converter"
							options={[
								{ value: 'encode', label: 'Texto → Binário' },
								{ value: 'decode', label: 'Binário → Texto' },
							]}
						/>
					)}
				</form.AppField>
				<form.Subscribe selector={(state) => state.values.direction}>
					{(direction) => (
						<form.AppField name="input">
							{(f) => (
								<f.TextareaField
									label={direction === 'encode' ? 'Texto' : 'Código binário'}
									rows={6}
									placeholder={
										direction === 'encode'
											? 'Ex: Olá!'
											: 'Ex: 01001111 01101100 11000011 10100001 00100001'
									}
								/>
							)}
						</form.AppField>
					)}
				</form.Subscribe>
			</FormCard>
			<ResultCard
				empty={!result}
				copyText={result?.ok ? result.value : ''}
				downloadName={result?.ok ? 'binario.txt' : undefined}
				onClear={() => {
					setResult(null)
					form.reset()
				}}
			>
				{result?.ok ? (
					<OutputBlock>{result.value}</OutputBlock>
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
