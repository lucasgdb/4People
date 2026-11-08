'use client'

import { useAppForm } from '@/components/form/form'
import { type Indent, yamlToJson } from '@/lib/algorithms/convert'
import { ConversionResult, LiveActions, useLiveConversion } from './_conversores/live-conversion'
import { FormCard, ToolLayout } from './_shared/tool-layout'

const INDENTS = [
	{ value: '2', label: '2 espaços' },
	{ value: '4', label: '4 espaços' },
	{ value: 'tab', label: 'Tab' },
	{ value: '0', label: 'Minificado' },
] as const

const EXAMPLE = `# Configuração de exemplo
nome: 4People
versao: 2
ativo: true
tags:
  - ferramentas
  - online
autor:
  nome: Ana
  email: ~
---
nome: segundo documento
`

type Values = { input: string; indent: Indent }
const DEFAULTS: Values = { input: '', indent: '2' }
const convert = ({ input, indent }: Values) => yamlToJson(input, indent)

/** YAML → JSON as you type; several documents (---) become a JSON array. */
export default function YamlParaJson() {
	const form = useAppForm({ defaultValues: DEFAULTS })
	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => undefined}
				actions={<LiveActions onExample={() => form.setFieldValue('input', EXAMPLE)} />}
			>
				<form.AppField name="input">
					{(f) => (
						<f.TextareaField
							label="YAML"
							description="Vários documentos separados por --- viram uma lista."
							rows={14}
							placeholder={'Ex.: nome: Ana\nidade: 30'}
						/>
					)}
				</form.AppField>
				<form.AppField name="indent">
					{(f) => <f.RadioField label="Indentação do JSON" options={INDENTS} />}
				</form.AppField>
			</FormCard>
			<form.Subscribe selector={(state) => state.values}>
				{(values) => <Result values={values} onClear={() => form.reset(DEFAULTS)} />}
			</form.Subscribe>
		</ToolLayout>
	)
}

function Result({ values, onClear }: { values: Values; onClear: () => void }) {
	const result = useLiveConversion(values, convert)
	return (
		<ConversionResult
			title="JSON"
			source={values.input}
			result={result}
			downloadName="convertido.json"
			onClear={onClear}
		/>
	)
}
