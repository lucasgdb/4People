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
import { useDeferredValue, useMemo } from 'react'
import { useAppForm } from '@/components/form/form'
import { charInfo } from '@/lib/algorithms/text'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const MAX_CHARACTERS = 200

const COLUMNS = ['', 'Código', 'Tipo', 'UTF-8', 'HTML', 'JavaScript']

function CharacterTable({ text, onClear }: { text: string; onClear: () => void }) {
	const deferredText = useDeferredValue(text)
	const rows = useMemo(() => charInfo(deferredText, MAX_CHARACTERS), [deferredText])
	return (
		<ResultCard
			title="Caracteres"
			empty={!text}
			emptyText="Digite ou cole caracteres para ver o código de cada um."
			onClear={onClear}
		>
			<TableCard label="Detalhes de cada caractere" maxHeight="32rem">
				<Table className="text-[0.875rem]">
					<TableHeader>
						<tr>
							{COLUMNS.map((column) => (
								<TableHead key={column}>
									{column || <span className="sr-only">Caractere</span>}
								</TableHead>
							))}
						</tr>
					</TableHeader>
					<TableBody>
						{rows.map((row, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: the text may repeat characters
							<TableRow key={index}>
								<TableCell align="center" className="text-xl">
									{row.char === ' ' ? '␠' : row.char}
								</TableCell>
								<TableCell className="font-mono text-[0.8125rem] whitespace-nowrap">
									{row.codePoint}
								</TableCell>
								<TableCell className="text-fg-muted whitespace-nowrap">{row.kind}</TableCell>
								<TableCell className="font-mono text-[0.8125rem] whitespace-nowrap">
									{row.utf8}
								</TableCell>
								<TableCell className="font-mono text-[0.8125rem] whitespace-nowrap">
									{row.html}
								</TableCell>
								<TableCell className="font-mono text-[0.8125rem] whitespace-nowrap">
									{row.js}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableCard>
			{[...deferredText].length > MAX_CHARACTERS ? (
				<p className="text-fg-muted text-[0.8125rem]">
					Mostrando os primeiros {MAX_CHARACTERS} caracteres.
				</p>
			) : null}
		</ResultCard>
	)
}

/** Code point, UTF-8 bytes and escapes (HTML, JS) of every character, as you type. */
export default function CharacterInfo() {
	const form = useAppForm({ defaultValues: { text: '' } })
	return (
		<ToolLayout className="xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
			<FormCard
				onSubmit={() => undefined}
				actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
			>
				<form.AppField name="text">
					{(field) => (
						<field.TextareaField label="Caracteres" rows={4} placeholder="Ex: ç, é, 😀, ™" />
					)}
				</form.AppField>
			</FormCard>
			<form.Subscribe selector={(state) => state.values.text}>
				{(text) => <CharacterTable text={text} onClear={() => form.reset()} />}
			</form.Subscribe>
		</ToolLayout>
	)
}
