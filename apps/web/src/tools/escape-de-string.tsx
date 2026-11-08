'use client'

import { Alert, Button } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { ArrowLeftRight, CircleX } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { type EscapeLanguage, escapeString, unescapeString } from '@/lib/algorithms/web'
import { useModeMemory } from './_shared/mode-memory'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const DIRECTIONS = [
	{ value: 'escape', label: 'Escapar' },
	{ value: 'unescape', label: 'Desfazer escape' },
] as const

const LANGUAGES = [
	{ value: 'js', label: 'JavaScript / TypeScript' },
	{ value: 'json', label: 'JSON' },
	{ value: 'java', label: 'Java / C#' },
	{ value: 'python', label: 'Python' },
	{ value: 'sql', label: 'SQL (aspas simples)' },
	{ value: 'shell', label: 'Shell POSIX (aspas simples)' },
	{ value: 'regex', label: 'Expressão regular' },
] as const

/** What each language does, shown under the select. */
const LANGUAGE_HINTS: Record<EscapeLanguage, string> = {
	js: 'Escapa \\ \' " e quebras de linha; controles viram \\xHH. Cole entre aspas simples ou duplas.',
	json: 'Igual ao JSON.stringify: \\" \\\\ \\n e controles como \\u0001. Cole entre aspas duplas.',
	java: 'Escapa \\ \' " \\n \\t; controles viram \\uXXXX. Vale para Java e C#.',
	python:
		'Escapa \\ \' " \\n \\t; controles viram \\xHH. Ao desfazer, aceita \\x, \\u, \\U e octal.',
	sql: "Dobra as aspas simples (O'Brien → O''Brien), o padrão SQL. Cole entre aspas simples.",
	shell:
		"Gera a palavra inteira entre aspas simples, com ' virando '\\''. Ao desfazer, lê aspas simples, duplas e barras.",
	regex: 'Escapa . * + ? ^ $ { } ( ) | [ ] \\ / para casar o texto literalmente.',
}

const schema = z.object({
	direction: z.enum(['escape', 'unescape']),
	language: z.enum(['js', 'json', 'java', 'python', 'sql', 'shell', 'regex']),
	input: z.string(),
})

type Result = { ok: true; value: string } | { ok: false; error: string }
type Values = z.infer<typeof schema>

function convert({ direction, language, input }: Values): Result {
	try {
		const value =
			direction === 'escape' ? escapeString(input, language) : unescapeString(input, language)
		return { ok: true, value }
	} catch (error) {
		return { ok: false, error: (error as Error).message }
	}
}

/** Escapes and unescapes string literals for seven languages, live, both directions. */
export default function StringEscape() {
	const [result, setResult] = useState<Result | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { direction: 'escape', language: 'js', input: '' },
		onSubmit: (values) => setResult(values.input ? convert(values) : null),
	})
	const switchMode = useModeMemory(form, 'input', 'escape', result, setResult)
	const direction = useStore(form.store, (state) => state.values.direction)
	const language = useStore(form.store, (state) => state.values.language)
	const recompute = { onChange: () => form.handleSubmit() }

	function swap() {
		if (!result?.ok) return
		const oppositeDirection = direction === 'escape' ? 'unescape' : 'escape'
		const output = result.value
		switchMode(oppositeDirection)
		form.setFieldValue('direction', oppositeDirection)
		form.setFieldValue('input', output)
		form.handleSubmit()
	}

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<>
						<p className="text-fg-muted flex-1 text-[0.8125rem]">Atualiza enquanto você digita.</p>
						<Button variant="secondary" onClick={swap} disabled={!result?.ok}>
							<ArrowLeftRight /> Inverter
						</Button>
					</>
				}
			>
				<form.AppField
					name="direction"
					listeners={{
						onChange: ({ value }) => {
							switchMode(String(value))
							form.handleSubmit()
						},
					}}
				>
					{(field) => <field.RadioField label="Operação" options={DIRECTIONS} />}
				</form.AppField>
				<form.AppField name="language" listeners={recompute}>
					{(field) => (
						<field.SelectField
							label="Linguagem"
							options={LANGUAGES}
							description={LANGUAGE_HINTS[language]}
						/>
					)}
				</form.AppField>
				<form.AppField name="input" listeners={recompute}>
					{(field) => (
						<field.TextareaField
							label={direction === 'escape' ? 'Texto original' : 'Texto escapado'}
							rows={8}
							placeholder={
								direction === 'escape'
									? 'Ex.: Ele disse "olá"\ne foi embora'
									: 'Ex.: Ele disse \\"olá\\"\\ne foi embora'
							}
						/>
					)}
				</form.AppField>
			</FormCard>
			<ResultCard
				empty={!result}
				emptyText="Digite um texto e o resultado aparece aqui."
				copyText={result?.ok ? result.value : undefined}
				onClear={() => {
					setResult(null)
					form.setFieldValue('input', '')
				}}
			>
				{result?.ok === true && (
					<OutputBlock className="max-h-[36rem]">
						<span translate="no">{result.value}</span>
					</OutputBlock>
				)}
				{result?.ok === false && (
					<Alert tone="danger">
						<CircleX />
						{result.error}
					</Alert>
				)}
			</ResultCard>
		</ToolLayout>
	)
}
