'use client'

import { Alert, Button, CopyButton, Input, Select } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { CircleX, Download, Plus, RefreshCw, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import {
	BASE_GENERATORS,
	FIELD_TYPES,
	type FieldType,
	generateJson,
	PLACEHOLDERS,
	templateFromFields,
} from '@/lib/algorithms/web'
import { numeric } from '@/lib/schemas'
import { useGenerateOnMount } from './_shared/document-generator'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const MODES = [
	{ value: 'template', label: 'Modelo JSON' },
	{ value: 'fields', label: 'Lista de campos' },
] as const

const SAMPLE = `{
  "id": "{{uuid}}",
  "nome": "{{nome}}",
  "email": "{{email}}",
  "cpf": "{{cpf}}",
  "idade": "{{inteiro(18, 80)}}",
  "ativo": "{{booleano}}",
  "cadastro": "{{data}}",
  "bio": "{{lorem(8)}}",
  "pedidos": [
    "{{repetir(2)}}",
    { "numero": "{{indice}}", "valor": "{{decimal(10, 500, 2)}}" }
  ]
}`

const schema = z.object({
	mode: z.enum(['template', 'fields']),
	template: z.string(),
	amount: numeric({ integer: true, min: 1, max: 100, required: 'Informe quantos itens gerar.' }),
})

type TemplateField = { id: number; name: string; type: FieldType }

const DEFAULT_FIELDS: TemplateField[] = [
	{ id: 1, name: 'id', type: 'uuid' },
	{ id: 2, name: 'nome', type: 'nome' },
	{ id: 3, name: 'email', type: 'email' },
]

type Outcome = { ok: true; json: string } | { ok: false; error: string }

/** faker's pt_BR data is large: it loads with the first result, never with the page. */
async function loadGenerators() {
	const [{ faker }, { fakerGenerators }] = await Promise.all([
		import('@faker-js/faker/locale/pt_BR'),
		import('@/lib/algorithms/web'),
	])
	return { ...BASE_GENERATORS, ...fakerGenerators(faker) }
}

function downloadJson(json: string) {
	const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }))
	Object.assign(document.createElement('a'), { href: url, download: 'dados.json' }).click()
	URL.revokeObjectURL(url)
}

/**
 * Fake JSON from a template with {{placeholders}} or a field list, using faker (pt_BR) on demand.
 * Ready on arrival from the sample template; the source and the amount make new data right away,
 * while edits to the template or the field list apply on "Gerar novos dados" (a half-typed template
 * isn't valid JSON yet).
 */
export default function JsonGenerator() {
	const [fields, setFields] = useState<TemplateField[]>(DEFAULT_FIELDS)
	const [outcome, setOutcome] = useState<Outcome | null>(null)
	// Quick changes can overlap while faker loads: only the latest request may show its result.
	const latestRequestId = useRef(0)
	const form = useToolForm({
		schema,
		defaultValues: { mode: 'template', template: SAMPLE, amount: '3' },
		onSubmit: async ({ mode, template, amount }) => {
			const requestId = ++latestRequestId.current
			const showIfLatest = (next: Outcome) => {
				if (requestId === latestRequestId.current) setOutcome(next)
			}
			try {
				const templateText = mode === 'fields' ? templateFromFields(fields) : template
				if (!templateText.trim()) {
					throw new Error('Escreva um modelo JSON ou use a lista de campos.')
				}
				const generators = await loadGenerators()
				showIfLatest({ ok: true, json: generateJson(templateText, amount, generators) })
			} catch (error) {
				showIfLatest({ ok: false, error: (error as Error).message })
			}
		},
	})
	useGenerateOnMount(() => form.handleSubmit())
	const mode = useStore(form.store, (state) => state.values.mode)
	const regenerate = { onChange: () => form.handleSubmit() }

	const updateField = (id: number, patch: Partial<TemplateField>) =>
		setFields((current) =>
			current.map((templateField) =>
				templateField.id === id ? { ...templateField, ...patch } : templateField,
			),
		)
	const removeField = (id: number) =>
		setFields((current) => current.filter((templateField) => templateField.id !== id))
	const addField = () =>
		setFields((current) => {
			const nextId = Math.max(0, ...current.map((templateField) => templateField.id)) + 1
			return [...current, { id: nextId, name: '', type: 'nome' }]
		})

	return (
		<ToolLayout>
			<FormCard
				title="Escolha como quer"
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>
							<RefreshCw aria-hidden="true" /> Gerar novos dados
						</form.SubmitButton>
					</form.AppForm>
				}
			>
				<form.AppField name="mode" listeners={regenerate}>
					{(field) => <field.RadioField label="Montar a partir de" options={MODES} />}
				</form.AppField>
				{mode === 'template' ? (
					<form.AppField name="template">
						{(field) => (
							<field.TextareaField
								label="Modelo JSON"
								rows={14}
								description="Troque os valores por marcadores, como {{nome}}. A lista completa está abaixo."
								placeholder='Ex.: {"nome": "{{nome}}", "idade": "{{inteiro(18, 80)}}"}'
							/>
						)}
					</form.AppField>
				) : (
					<fieldset className="flex flex-col gap-2">
						<legend className="text-fg mb-1 text-sm font-medium">Campos</legend>
						{fields.map((templateField, position) => (
							<div key={templateField.id} className="flex items-center gap-2">
								<Input
									aria-label={`Nome do campo ${position + 1}`}
									placeholder="Ex.: nome"
									value={templateField.name}
									autoComplete="off"
									spellCheck={false}
									onChange={(event) => updateField(templateField.id, { name: event.target.value })}
									className="min-w-0 flex-1"
								/>
								<div className="min-w-0 flex-1">
									<Select<FieldType>
										aria-label={`Tipo do campo ${position + 1}`}
										options={FIELD_TYPES}
										value={templateField.type}
										onValueChange={(type) => updateField(templateField.id, { type })}
									/>
								</div>
								<Button
									variant="ghost"
									size="icon"
									aria-label={`Remover campo ${position + 1}`}
									onClick={() => removeField(templateField.id)}
								>
									<X />
								</Button>
							</div>
						))}
						<div>
							<Button variant="soft" size="sm" onClick={addField}>
								<Plus /> Adicionar campo
							</Button>
						</div>
					</fieldset>
				)}
				<form.AppField name="amount" listeners={regenerate}>
					{(field) => (
						<field.NumberField
							label="Quantidade"
							placeholder="Ex.: 10"
							description="De 1 a 100. Com 1, sai um objeto; com mais, uma lista."
							integer
							min={1}
							max={100}
						/>
					)}
				</form.AppField>
				<details className="rounded-control bg-surface-muted p-4">
					<summary className="text-fg cursor-pointer text-sm font-semibold">
						Marcadores disponíveis
					</summary>
					<p className="text-fg-muted mt-4 text-[0.8125rem]">
						Um marcador sozinho no valor gera o tipo certo (número, true/false); dentro de um texto,
						vira texto: <code className="font-mono">"pedido-{'{{inteiro(1, 999)}}'}"</code>.
					</p>
					<dl className="mt-4 flex flex-col gap-2 text-sm">
						{PLACEHOLDERS.map((placeholder) => (
							<div key={placeholder.syntax} className="flex flex-col gap-1">
								<dt className="text-fg font-mono text-[0.8125rem] font-semibold" translate="no">
									{placeholder.syntax}
								</dt>
								<dd className="text-fg-muted">
									{placeholder.description}. Ex.:{' '}
									<span className="font-mono">{placeholder.example}</span>
								</dd>
							</div>
						))}
					</dl>
				</details>
			</FormCard>
			<ResultCard
				title="Copie e use"
				empty={!outcome}
				emptyText="Gerando JSON…"
				action={
					outcome?.ok ? (
						<div className="flex gap-2">
							<Button variant="secondary" size="sm" onClick={() => downloadJson(outcome.json)}>
								<Download /> Baixar .json
							</Button>
							<CopyButton value={outcome.json} label="Copiar JSON" />
						</div>
					) : null
				}
				note={outcome?.ok ? 'Dados fictícios, só para testes.' : undefined}
			>
				{outcome?.ok === true && (
					<OutputBlock className="max-h-[36rem]">
						<span translate="no">{outcome.json}</span>
					</OutputBlock>
				)}
				{outcome?.ok === false && (
					<Alert tone="danger">
						<CircleX />
						{outcome.error}
					</Alert>
				)}
			</ResultCard>
		</ToolLayout>
	)
}
