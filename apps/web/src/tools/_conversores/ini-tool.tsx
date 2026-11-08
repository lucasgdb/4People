'use client'

import { useAppForm } from '@/components/form/form'
import { type Indent, iniTo } from '@/lib/algorithms/convert'
import { FormCard, ToolLayout } from '../_shared/tool-layout'
import { ConversionResult, LiveActions, useLiveConversion } from './live-conversion'

const EXAMPLE = `; Configuração da aplicação
nome = 4People
debug = false

[banco]
host = localhost
porta = 5432
senha = "s3nh@;forte" ; aspas protegem o ;

[banco.replica]
host: replica.local

[servidores]
ip = 10.0.0.1
ip = 10.0.0.2
`

const INDENTS = {
	json: [
		{ value: '2', label: '2 espaços' },
		{ value: '4', label: '4 espaços' },
		{ value: '0', label: 'Minificado' },
	],
	yaml: [
		{ value: '2', label: '2 espaços' },
		{ value: '4', label: '4 espaços' },
	],
} as const

const NAMES = { json: 'JSON', yaml: 'YAML' } as const

type Format = 'json' | 'yaml'
type Values = { input: string; inferTypes: boolean; indent: Indent }
const DEFAULTS: Values = { input: '', inferTypes: true, indent: '2' }

/** INI → JSON or YAML as you type (sections, nested a.b sections, comments, repeated keys). */
export function IniTool({ format }: { format: Format }) {
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
							label="INI"
							description="Seções [nome] e [pai.filho], chave = valor ou chave: valor, comentários com ; ou #."
							rows={14}
							placeholder={'Ex.: [banco]\nhost = localhost'}
						/>
					)}
				</form.AppField>
				<form.AppField name="inferTypes">
					{(f) => (
						<f.CheckboxField
							label="Converter números e booleanos"
							description='"5432" vira 5432 e "true", "yes" ou "on" viram true.'
						/>
					)}
				</form.AppField>
				<form.AppField name="indent">
					{(f) => (
						<f.RadioField label={`Indentação do ${NAMES[format]}`} options={INDENTS[format]} />
					)}
				</form.AppField>
			</FormCard>
			<form.Subscribe selector={(state) => state.values}>
				{(values) => (
					<IniResult format={format} values={values} onClear={() => form.reset(DEFAULTS)} />
				)}
			</form.Subscribe>
		</ToolLayout>
	)
}

function IniResult({
	format,
	values,
	onClear,
}: {
	format: Format
	values: Values
	onClear: () => void
}) {
	const result = useLiveConversion(values, ({ input, ...options }: Values) =>
		iniTo(input, format, options),
	)
	return (
		<ConversionResult
			title={NAMES[format]}
			source={values.input}
			result={result}
			downloadName={`convertido.${format}`}
			onClear={onClear}
		/>
	)
}
