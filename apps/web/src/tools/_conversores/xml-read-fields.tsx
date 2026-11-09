'use client'

import { withForm } from '@/components/form/form'
import { type Indent, XML_READ_DEFAULTS } from '@/lib/algorithms/convert'

export const XML_EXAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<livraria cidade="São Paulo">
  <livro id="1" disponivel="true">
    <titulo>Dom Casmurro</titulo>
    <autor>Machado de Assis</autor>
    <ano>1899</ano>
  </livro>
  <livro id="2" disponivel="false">
    <titulo lang="pt">Vidas Secas</titulo>
    <autor>Graciliano Ramos</autor>
    <ano>1938</ano>
  </livro>
</livraria>`

/** Default values shared by the XML → JSON and XML → YAML forms. */
export const XML_READ_FORM = { input: '', ...XML_READ_DEFAULTS, indent: '2' as Indent }

/** Attribute, text node and value-typing options for reading XML. */
export const XmlReadFields = withForm({
	defaultValues: XML_READ_FORM,
	render: function Render({ form }) {
		return (
			<>
				<form.AppField name="keepAttributes">
					{(field) => (
						<field.CheckboxField
							label="Manter atributos"
							description='Ex.: id="1" vira a chave "@_id" ao lado dos elementos filhos.'
						/>
					)}
				</form.AppField>
				<form.Subscribe selector={(state) => state.values.keepAttributes}>
					{(keepAttributes) => (
						<div className="grid gap-6 sm:grid-cols-2">
							{keepAttributes ? (
								<form.AppField name="attributePrefix">
									{(field) => (
										<field.TextField label="Prefixo dos atributos" placeholder="Ex.: @_" />
									)}
								</form.AppField>
							) : null}
							<form.AppField name="textNodeName">
								{(field) => (
									<field.TextField
										label="Nome do nó de texto"
										description="Usado quando um elemento tem texto e atributos."
										placeholder="Ex.: #text"
									/>
								)}
							</form.AppField>
						</div>
					)}
				</form.Subscribe>
				<form.AppField name="parseValues">
					{(field) => (
						<field.CheckboxField
							label="Converter números e booleanos"
							description='"1938" vira 1938 e "true" vira true. Desmarque para manter tudo como texto.'
						/>
					)}
				</form.AppField>
			</>
		)
	},
})
