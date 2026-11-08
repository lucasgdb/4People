'use client'

import { useDeferredValue, useMemo } from 'react'
import { useAppForm } from '@/components/form/form'
import { CASES, type CaseKind, convertCase } from '@/lib/algorithms/text'
import { CopyRows } from './_shared/copy-rows'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const KINDS = Object.keys(CASES) as CaseKind[]

function CaseConversions({ text, onClear }: { text: string; onClear: () => void }) {
	const deferredText = useDeferredValue(text)
	const rows = useMemo(
		() =>
			KINDS.map((kind) => ({
				label: CASES[kind],
				value: deferredText ? convertCase(deferredText, kind) : '',
			})),
		[deferredText],
	)
	return (
		<ResultCard
			title="Conversões"
			empty={!text}
			emptyText="Digite um texto e veja todas as conversões."
			onClear={onClear}
		>
			<CopyRows rows={rows} />
		</ResultCard>
	)
}

/** Every case at once, updated while typing. */
export default function CaseConverter() {
	const form = useAppForm({ defaultValues: { text: '' } })
	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => undefined}
				actions={
					<p className="text-fg-muted text-[0.8125rem]">
						As conversões são atualizadas enquanto você digita.
					</p>
				}
			>
				<form.AppField name="text">
					{(field) => (
						<field.TextareaField label="Texto" rows={6} placeholder="Ex: nome do usuário" />
					)}
				</form.AppField>
			</FormCard>
			<form.Subscribe selector={(state) => state.values.text}>
				{(text) => <CaseConversions text={text} onClear={() => form.reset()} />}
			</form.Subscribe>
		</ToolLayout>
	)
}
