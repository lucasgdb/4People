'use client'

import { Alert } from '@4people/ui'
import { CircleX } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { formatJson, type JsonResult } from '@/lib/algorithms/encoding'
import { formatNumber } from '@/lib/format'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const schema = z.object({
	json: z.string().trim().min(1, 'Cole o JSON que você quer formatar.'),
	indent: z.enum(['2', '4', '0']),
})

const INDENTS = [
	{ value: '2', label: '2 espaços' },
	{ value: '4', label: '4 espaços' },
	{ value: '0', label: 'Minificar' },
] as const

const bytes = (text: string) => new TextEncoder().encode(text).length

/** Validates, pretty-prints or minifies JSON, pointing at the line of a syntax error. */
export default function JsonFormatter() {
	const [result, setResult] = useState<(JsonResult & { inputBytes: number }) | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { json: '', indent: '2' },
		onSubmit: ({ json, indent }) =>
			setResult({ ...formatJson(json, Number(indent)), inputBytes: bytes(json) }),
	})

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>Formatar</form.SubmitButton>
					</form.AppForm>
				}
			>
				<form.AppField name="json">
					{(f) => (
						<f.TextareaField label="JSON" rows={12} placeholder='Ex: {"nome":"Ana","idade":30}' />
					)}
				</form.AppField>
				<form.AppField name="indent">
					{(f) => <f.RadioField label="Saída" options={INDENTS} />}
				</form.AppField>
			</FormCard>
			<ResultCard
				empty={!result}
				copyText={result?.ok ? result.output : undefined}
				downloadName={result?.ok ? 'formatado.json' : undefined}
				onClear={() => setResult(null)}
			>
				{result?.ok ? (
					<>
						<p className="text-fg-muted tabular text-sm">
							JSON válido · {formatNumber(result.inputBytes)} → {formatNumber(bytes(result.output))}{' '}
							bytes
						</p>
						<OutputBlock className="max-h-[36rem]">{result.output}</OutputBlock>
					</>
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
