'use client'

import { DataList } from '@4people/ui'
import { useDeferredValue, useMemo } from 'react'
import { useAppForm } from '@/components/form/form'
import { countCharacters } from '@/lib/algorithms/text'
import { formatNumber } from '@/lib/format'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

type Counts = ReturnType<typeof countCharacters>

const LABELS: Record<keyof Counts, string> = {
	characters: 'Caracteres',
	withoutSpaces: 'Sem espaços',
	words: 'Palavras',
	lines: 'Linhas',
	spaces: 'Espaços',
	vowels: 'Vogais',
	consonants: 'Consoantes',
	numbers: 'Números',
}

/** Counts a deferred copy of the text, so typing stays instant on long pastes. */
function CountResult({ text, onClear }: { text: string; onClear: () => void }) {
	const deferredText = useDeferredValue(text)
	const counts = useMemo(() => countCharacters(deferredText), [deferredText])
	const entries = Object.entries(counts) as [keyof Counts, number][]

	return (
		<ResultCard
			title="Contagem"
			copyText={entries.map(([key, value]) => `${LABELS[key]}: ${value}`).join('\n')}
			onClear={onClear}
		>
			<DataList
				columns={2}
				items={entries.map(([key, value]) => ({ label: LABELS[key], value: formatNumber(value) }))}
			/>
		</ResultCard>
	)
}

/** Live count of characters, words, lines, vowels, consonants and digits. */
export default function CharactersCount() {
	const form = useAppForm({ defaultValues: { text: '' } })

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => undefined}
				actions={
					<p className="text-fg-muted text-[0.8125rem]">
						A contagem é atualizada enquanto você digita.
					</p>
				}
			>
				<form.AppField name="text">
					{(field) => (
						<field.TextareaField
							label="Texto"
							rows={10}
							placeholder="Digite ou cole seu texto aqui…"
						/>
					)}
				</form.AppField>
			</FormCard>
			<form.Subscribe selector={(state) => state.values.text}>
				{(text) => <CountResult text={text} onClear={() => form.reset()} />}
			</form.Subscribe>
		</ToolLayout>
	)
}
