'use client'

import { Button, CopyButton } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { Download, RefreshCw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { downloadText } from '@/lib/format'
import { FormCard, ResultCard, ToolLayout } from './tool-layout'

/** Generated values, one per row, each with its own copy button. */
export function ValueList({ values, label }: { values: readonly string[]; label: string }) {
	return (
		<ul aria-label={`${label} gerados`} className="flex flex-col gap-2">
			{values.map((value, index) => (
				<li
					// biome-ignore lint/suspicious/noArrayIndexKey: two random values can repeat; the position is the identity
					key={index}
					className="rounded-control bg-surface-muted flex min-w-0 items-center gap-3 py-2 pr-2 pl-4 sm:pl-5"
				>
					<span
						translate="no"
						className="text-fg tabular min-w-0 flex-1 font-mono text-[1.0625rem] [overflow-wrap:anywhere] select-all"
					>
						{value}
					</span>
					<CopyButton
						value={value}
						variant="primary"
						iconOnly="mobile"
						aria-label={`Copiar ${value}`}
					/>
				</li>
			))}
		</ul>
	)
}

/**
 * Generators: make the first batch as soon as the page opens. On the client (server and client HTML
 * match), and only once even when React runs effects twice (Strict Mode in development).
 */
export function useGenerateOnMount(generate: () => void) {
	const hasGenerated = useRef(false)
	const latestGenerate = useRef(generate)
	latestGenerate.current = generate
	useEffect(() => {
		if (hasGenerated.current) return
		hasGenerated.current = true
		latestGenerate.current()
	}, [])
}

/**
 * The result card every generator shares ("2 Copie e use"): the values one per row, each with its
 * own copy button, and "Salvar .txt" / "Copiar todos" in the card header.
 */
export function GeneratedResult({
	values,
	plural,
	filename,
	note,
	title = 'Copie e use',
}: {
	values: readonly string[] | null
	plural: string
	filename: string
	note?: string
	title?: string
}) {
	const allValuesText = (values ?? []).join('\n')
	const count = values?.length ?? 0
	const hasMany = count > 1
	return (
		<ResultCard
			title={title}
			empty={!values}
			emptyText={`Gerando ${plural}…`}
			note={note}
			action={
				<div className="flex gap-2">
					<Button
						variant="secondary"
						size="sm"
						onClick={() => downloadText(filename, allValuesText)}
					>
						<Download /> Salvar .txt
					</Button>
					<CopyButton
						value={allValuesText}
						label={hasMany ? 'Copiar todos' : 'Copiar'}
						aria-label={hasMany ? `Copiar todos os ${count} ${plural}` : undefined}
					/>
				</div>
			}
		>
			<ValueList values={values ?? []} label={plural} />
		</ResultCard>
	)
}

/** Everything but the characters of the value itself: dots, dashes, slashes, spaces, parentheses. */
const PUNCTUATION = /[^0-9A-Z]/gi

const DEFAULT_NOTE =
	'Use só para testes. Esses números são válidos na conta, mas não pertencem a ninguém de propósito.'

const schema = z.object({
	format: z.enum(['punctuated', 'digits']),
	state: z.string(),
	variant: z.string(),
	amount: z.number().int().min(1).max(20),
})

/** A choice between kinds of the same document (numeric or alphanumeric CNPJ). */
export type VariantOptions = {
	label: string
	options: ReadonlyArray<{ value: string; label: string; hint?: string }>
}

export type StateOptions = {
	label: string
	description: string
	options: ReadonlyArray<{ value: string; label: string }>
}

/**
 * The document generators (CPF, CNPJ, RG, PIS, CNH, RENAVAM, título, CEP, telefone): pick the format, the state
 * when the number encodes one and how many; the list is ready on arrival and follows every change.
 * `examples` turns on the format choice; without it the document only exists as digits.
 */
export function DocumentGenerator({
	label,
	plural,
	filename,
	generate,
	examples,
	states,
	variants,
	note = DEFAULT_NOTE,
}: {
	label: string
	plural: string
	filename: string
	/** Returns one value, punctuated when the document has punctuation. */
	generate: (options: { state?: string; variant?: string }) => string
	/**
	 * Format patterns, e.g. `000.000.000-00` and `00000000000`; `separators` names the first option
	 * and `plain` the second (default "Só números").
	 */
	examples?: { punctuated: string; digits: string; separators?: string; plain?: string }
	states?: StateOptions
	variants?: VariantOptions
	note?: string
}) {
	const [values, setValues] = useState<string[] | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: {
			format: 'punctuated',
			state: 'any',
			variant: variants?.options[0]?.value ?? '',
			amount: 4,
		},
		onSubmit: ({ state, variant, amount }) => {
			const chosenState = state === 'any' ? undefined : state
			setValues(Array.from({ length: amount }, () => generate({ state: chosenState, variant })))
		},
	})
	const format = useStore(form.store, (state) => state.values.format)

	useGenerateOnMount(() => form.handleSubmit())

	const showDigitsOnly = examples !== undefined && format === 'digits'
	const displayedValues =
		values?.map((value) => (showDigitsOnly ? value.replace(PUNCTUATION, '') : value)) ?? null
	const regenerate = { onChange: () => form.handleSubmit() }

	return (
		<ToolLayout resultFirst>
			<FormCard
				title="Escolha como quer"
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>
							<RefreshCw aria-hidden="true" /> Gerar novos {plural}
						</form.SubmitButton>
					</form.AppForm>
				}
			>
				{examples ? (
					<form.AppField name="format">
						{(field) => (
							<field.RadioField
								label="Formato"
								options={[
									{
										value: 'punctuated',
										label: examples.separators ?? 'Com pontos',
										hint: examples.punctuated,
									},
									{
										value: 'digits',
										label: examples.plain ?? 'Só números',
										hint: examples.digits,
									},
								]}
							/>
						)}
					</form.AppField>
				) : (
					<p className="rounded-control bg-surface-muted text-fg-muted px-4 py-3 text-[0.9375rem]">
						O {label} é escrito só com números, sem pontuação.
					</p>
				)}
				{variants ? (
					<form.AppField name="variant" listeners={regenerate}>
						{(field) => <field.RadioField label={variants.label} options={variants.options} />}
					</form.AppField>
				) : null}
				{states ? (
					<form.AppField name="state" listeners={regenerate}>
						{(field) => (
							<field.SelectField
								label={states.label}
								description={states.description}
								options={states.options}
							/>
						)}
					</form.AppField>
				) : null}
				<form.AppField name="amount" listeners={regenerate}>
					{(field) => <field.SliderField label={`Quantos ${plural}?`} min={1} max={20} />}
				</form.AppField>
			</FormCard>
			<GeneratedResult values={displayedValues} plural={plural} filename={filename} note={note} />
		</ToolLayout>
	)
}
