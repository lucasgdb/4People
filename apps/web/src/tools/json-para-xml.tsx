'use client'

import { useAppForm } from '@/components/form/form'
import { jsonToXml, XML_WRITE_DEFAULTS, type XmlWriteOptions } from '@/lib/algorithms/convert'
import { ConversionResult, LiveActions, useLiveConversion } from './_conversores/live-conversion'
import { FormCard, ToolLayout } from './_shared/tool-layout'

const INDENTS = [
	{ value: '2', label: '2 espaços' },
	{ value: '4', label: '4 espaços' },
	{ value: 'tab', label: 'Tab' },
	{ value: '0', label: 'Minificado' },
] as const

const EXAMPLE = `{
  "livro": [
    { "@_id": 1, "titulo": "Dom Casmurro", "autor": "Machado de Assis", "ano": 1899 },
    { "@_id": 2, "titulo": "Vidas Secas", "autor": "Graciliano Ramos", "ano": 1938 }
  ]
}`

type Values = XmlWriteOptions & { input: string }
const DEFAULTS: Values = { input: '', ...XML_WRITE_DEFAULTS, rootName: 'livraria' }
const convert = ({ input, ...options }: Values) => jsonToXml(input, options)

/** JSON → XML as you type: arrays repeat the element, prefixed keys become attributes. */
export default function JsonParaXml() {
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
							label="JSON"
							rows={14}
							placeholder='Ex.: {"pessoa": {"nome": "Ana"}}'
						/>
					)}
				</form.AppField>
				<form.AppField name="rootName">
					{(f) => (
						<f.TextField
							label="Elemento raiz"
							description="Deixe vazio se o JSON já for um objeto com uma única chave."
							placeholder="Ex.: root"
						/>
					)}
				</form.AppField>
				<div className="grid gap-5 sm:grid-cols-2">
					<form.AppField name="attributePrefix">
						{(f) => (
							<f.TextField
								label="Prefixo dos atributos"
								description="Chaves com ele viram atributos. Vazio: nenhum atributo."
								placeholder="Ex.: @_"
							/>
						)}
					</form.AppField>
					<form.AppField name="textNodeName">
						{(f) => (
							<f.TextField
								label="Chave do texto"
								description="Vira o texto do elemento."
								placeholder="Ex.: #text"
							/>
						)}
					</form.AppField>
				</div>
				<form.AppField name="indent">
					{(f) => <f.RadioField label="Indentação" options={INDENTS} />}
				</form.AppField>
				<form.AppField name="declaration">
					{(f) => <f.CheckboxField label='Incluir declaração <?xml version="1.0"?>' />}
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
			title="XML"
			source={values.input}
			result={result}
			downloadName="convertido.xml"
			onClear={onClear}
		/>
	)
}
