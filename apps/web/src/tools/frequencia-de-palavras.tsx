'use client'

import {
	Table,
	TableBody,
	TableCard,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@4people/ui'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { wordFrequency } from '@/lib/algorithms/text'
import { formatNumber } from '@/lib/format'
import { numeric } from '@/lib/schemas'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const schema = z.object({
	text: z.string().trim().min(1, 'Cole o texto que você quer analisar.'),
	ignoreStopwords: z.boolean(),
	minLength: numeric({ integer: true, min: 1, max: 30 }),
})

const MAX_ROWS = 100

type Result = ReturnType<typeof wordFrequency>

/** Which words repeat the most, with count and share, optionally without "de", "a", "o"… */
export default function WordFrequency() {
	const [result, setResult] = useState<Result | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { text: '', ignoreStopwords: true, minLength: '1' },
		onSubmit: ({ text, ignoreStopwords, minLength }) =>
			setResult(wordFrequency(text, { ignoreStopwords, minLength })),
	})
	const topWords = result?.words.slice(0, MAX_ROWS) ?? []
	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>Contar palavras</form.SubmitButton>
					</form.AppForm>
				}
			>
				<form.AppField name="text">
					{(field) => (
						<field.TextareaField label="Texto" rows={10} placeholder="Cole aqui o seu texto…" />
					)}
				</form.AppField>
				<div className="grid items-start gap-4 sm:grid-cols-2">
					<form.AppField name="minLength">
						{(field) => (
							<field.NumberField
								label="Tamanho mínimo da palavra"
								suffix="letras"
								integer
								min={1}
								max={30}
							/>
						)}
					</form.AppField>
					<form.AppField name="ignoreStopwords">
						{(field) => (
							<field.CheckboxField
								label="Ignorar palavras comuns"
								description="de, a, o, que, e, para…"
							/>
						)}
					</form.AppField>
				</div>
			</FormCard>
			<ResultCard
				empty={!result}
				copyText={topWords.map((row) => `${row.word}\t${row.count}`).join('\n')}
				downloadName="frequencia.txt"
				onClear={() => setResult(null)}
			>
				{result ? (
					<TableCard
						label="Palavras por frequência"
						maxHeight="32rem"
						toolbar={
							<p className="text-fg-muted tabular text-sm">
								{formatNumber(result.total)} palavras, {formatNumber(result.words.length)}{' '}
								diferentes
								{result.words.length > MAX_ROWS
									? ` (mostrando as ${MAX_ROWS} mais frequentes)`
									: ''}
							</p>
						}
					>
						<Table>
							<TableHeader>
								<tr>
									<TableHead>Palavra</TableHead>
									<TableHead numeric>Vezes</TableHead>
									<TableHead numeric>%</TableHead>
								</tr>
							</TableHeader>
							<TableBody>
								{topWords.map((row) => (
									<TableRow key={row.word}>
										<TableCell>{row.word}</TableCell>
										<TableCell numeric>{formatNumber(row.count)}</TableCell>
										<TableCell numeric className="text-fg-muted">
											{formatNumber(row.share * 100, 1)}%
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableCard>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
