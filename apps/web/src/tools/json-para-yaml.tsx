'use client'

import { useAppForm } from '@/components/form/form'
import { jsonToYaml } from '@/lib/algorithms/convert'
import { ConversionResult, LiveActions, useLiveConversion } from './_conversores/live-conversion'
import { FormCard, ToolLayout } from './_shared/tool-layout'

const INDENTS = [
	{ value: '2', label: '2 espaços' },
	{ value: '4', label: '4 espaços' },
] as const

const EXAMPLE = `{
  "nome": "4People",
  "versao": 2,
  "ativo": true,
  "tags": ["ferramentas", "online"],
  "autor": { "nome": "Ana", "email": null }
}`

type Values = { input: string; indent: '2' | '4' }
const DEFAULTS: Values = { input: '', indent: '2' }
const convertJsonToYaml = ({ input, indent }: Values) => jsonToYaml(input, indent === '4' ? 4 : 2)

/** JSON → YAML as you type, with the line and column of syntax errors. */
export default function JsonParaYaml() {
	const form = useAppForm({ defaultValues: DEFAULTS })
	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => undefined}
				actions={<LiveActions onExample={() => form.setFieldValue('input', EXAMPLE)} />}
			>
				<form.AppField name="input">
					{(field) => (
						<field.TextareaField
							label="JSON"
							rows={14}
							placeholder='Ex.: {"nome": "Ana", "idade": 30}'
						/>
					)}
				</form.AppField>
				<form.AppField name="indent">
					{(field) => <field.RadioField label="Indentação do YAML" options={INDENTS} />}
				</form.AppField>
			</FormCard>
			<form.Subscribe selector={(state) => state.values}>
				{(values) => <YamlResult values={values} onClear={() => form.reset(DEFAULTS)} />}
			</form.Subscribe>
		</ToolLayout>
	)
}

function YamlResult({ values, onClear }: { values: Values; onClear: () => void }) {
	const result = useLiveConversion(values, convertJsonToYaml)
	return (
		<ConversionResult
			title="YAML"
			source={values.input}
			result={result}
			downloadName="convertido.yaml"
			onClear={onClear}
		/>
	)
}
