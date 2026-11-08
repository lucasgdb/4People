'use client'

import { Button, CopyButton } from '@4people/ui'
import { Download, RefreshCw } from 'lucide-react'
import { useRef, useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { STATE_TO_CPF_REGION } from '@/lib/algorithms/documents'
import type { Person } from '@/lib/algorithms/people'
import { downloadText } from '@/lib/format'
import { numeric } from '@/lib/schemas'
import { CopyRows } from './_shared/copy-rows'
import { useGenerateOnMount } from './_shared/document-generator'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const STATES = [
	{ value: 'any', label: 'Qualquer estado' },
	...Object.keys(STATE_TO_CPF_REGION)
		.sort()
		.map((uf) => ({ value: uf, label: uf })),
]

const schema = z
	.object({
		amount: numeric({ integer: true, min: 1, max: 100 }),
		minAge: numeric({ integer: true, min: 0, max: 110 }),
		maxAge: numeric({ integer: true, min: 0, max: 110 }),
		state: z.string(),
	})
	.refine(({ minAge, maxAge }) => minAge <= maxAge, {
		message: 'A idade máxima deve ser maior que a mínima.',
		path: ['maxAge'],
	})

const FIELD_LABELS: Record<keyof Person, string> = {
	nome: 'Nome',
	sexo: 'Sexo',
	nascimento: 'Nascimento',
	idade: 'Idade',
	cpf: 'CPF',
	rg: 'RG',
	email: 'E-mail',
	celular: 'Celular',
	cep: 'CEP',
	endereco: 'Endereço',
	numero: 'Número',
	bairro: 'Bairro',
	cidade: 'Cidade',
	estado: 'Estado',
	mae: 'Mãe',
	pai: 'Pai',
}

const PERSON_FIELDS = Object.keys(FIELD_LABELS) as (keyof Person)[]

const quoteCsvCell = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`

function peopleToCsv(people: readonly Person[]): string {
	const header = PERSON_FIELDS.map((field) => quoteCsvCell(FIELD_LABELS[field])).join(',')
	const rows = people.map((person) =>
		PERSON_FIELDS.map((field) => quoteCsvCell(person[field])).join(','),
	)
	return [header, ...rows].join('\n')
}

function PersonRows({ person }: { person: Person }) {
	const rows = PERSON_FIELDS.map((field) => ({
		label: FIELD_LABELS[field],
		value: String(person[field]),
	}))
	return <CopyRows rows={rows} />
}

/**
 * Consistent fake people for test data: CPF matches the state, e-mail matches the name. Ready on
 * arrival; every option changes who is generated, so each change makes new people right away.
 */
export default function PeopleGenerator() {
	const [people, setPeople] = useState<Person[] | null>(null)
	// Quick changes can overlap while faker loads: only the latest request may show its people.
	const latestRequestId = useRef(0)
	const form = useToolForm({
		schema,
		defaultValues: { amount: '1', minAge: '18', maxAge: '60', state: 'any' },
		onSubmit: async ({ amount, minAge, maxAge, state }) => {
			latestRequestId.current += 1
			const requestId = latestRequestId.current
			// faker's pt_BR data is large: loaded when the first people are made, never with the page.
			const { generatePeople } = await import('@/lib/algorithms/people')
			if (requestId !== latestRequestId.current) return
			const chosenState = state === 'any' ? undefined : state
			setPeople(generatePeople(amount, { minAge, maxAge, state: chosenState }))
		},
	})
	useGenerateOnMount(() => form.handleSubmit())

	// Validated here first: an age range that doesn't close shows its error without moving focus.
	const regenerate = {
		onChange: () => {
			if (schema.safeParse(form.state.values).success) form.handleSubmit()
		},
	}
	const singlePerson = people?.length === 1 ? people[0] : undefined
	const json = people ? JSON.stringify(singlePerson ?? people, null, 2) : ''

	return (
		<ToolLayout>
			<FormCard
				title="Escolha como quer"
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>
							<RefreshCw aria-hidden="true" /> Gerar novas pessoas
						</form.SubmitButton>
					</form.AppForm>
				}
			>
				<div className="grid grid-cols-2 items-end gap-x-3 gap-y-4 sm:gap-x-4">
					<form.AppField name="amount" listeners={regenerate}>
						{(field) => (
							<field.NumberField
								label="Quantidade"
								placeholder="Ex: 10"
								integer
								min={1}
								max={100}
							/>
						)}
					</form.AppField>
					<form.AppField name="state" listeners={regenerate}>
						{(field) => <field.SelectField label="Estado" options={STATES} />}
					</form.AppField>
					<form.AppField name="minAge" listeners={regenerate}>
						{(field) => (
							<field.NumberField label="Idade mínima" suffix="anos" integer min={0} max={110} />
						)}
					</form.AppField>
					<form.AppField name="maxAge" listeners={regenerate}>
						{(field) => (
							<field.NumberField label="Idade máxima" suffix="anos" integer min={0} max={110} />
						)}
					</form.AppField>
				</div>
			</FormCard>
			<ResultCard
				title="Copie e use"
				empty={!people}
				emptyText="Gerando pessoas…"
				action={
					people ? (
						<div className="flex flex-wrap gap-2">
							<Button
								variant="secondary"
								size="sm"
								onClick={() => downloadText('pessoas.csv', peopleToCsv(people))}
							>
								<Download /> Baixar CSV
							</Button>
							<Button
								variant="secondary"
								size="sm"
								onClick={() => downloadText('pessoas.json', json)}
							>
								<Download /> Salvar .json
							</Button>
							<CopyButton value={json} label="Copiar JSON" />
						</div>
					) : null
				}
			>
				{singlePerson ? <PersonRows person={singlePerson} /> : null}
				{people && !singlePerson ? (
					<OutputBlock className="max-h-[36rem]">{json}</OutputBlock>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
