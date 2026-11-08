'use client'

import { useAppForm } from '@/components/form/form'
import { xmlToJson } from '@/lib/algorithms/convert'
import { ConversionResult, LiveActions, useLiveConversion } from './_conversores/live-conversion'
import { XML_EXAMPLE, XML_READ_FORM, XmlReadFields } from './_conversores/xml-read-fields'
import { FormCard, ToolLayout } from './_shared/tool-layout'

const INDENTS = [
	{ value: '2', label: '2 espaços' },
	{ value: '4', label: '4 espaços' },
	{ value: '0', label: 'Minificado' },
] as const

const DEFAULTS = XML_READ_FORM
type Values = typeof DEFAULTS
const convertXmlToJson = ({ input, indent, ...options }: Values) =>
	xmlToJson(input, options, indent)

/** XML → JSON as you type, keeping attributes with a prefix and pointing at syntax errors. */
export default function XmlParaJson() {
	const form = useAppForm({ defaultValues: DEFAULTS })
	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => undefined}
				actions={<LiveActions onExample={() => form.setFieldValue('input', XML_EXAMPLE)} />}
			>
				<form.AppField name="input">
					{(field) => (
						<field.TextareaField
							label="XML"
							rows={14}
							placeholder="Ex.: <pessoa><nome>Ana</nome></pessoa>"
						/>
					)}
				</form.AppField>
				<XmlReadFields form={form} />
				<form.AppField name="indent">
					{(field) => <field.RadioField label="Indentação do JSON" options={INDENTS} />}
				</form.AppField>
			</FormCard>
			<form.Subscribe selector={(state) => state.values}>
				{(values) => <JsonResult values={values} onClear={() => form.reset(DEFAULTS)} />}
			</form.Subscribe>
		</ToolLayout>
	)
}

function JsonResult({ values, onClear }: { values: Values; onClear: () => void }) {
	const result = useLiveConversion(values, convertXmlToJson)
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
