'use client'

import { useDeferredValue, useMemo } from 'react'
import { useAppForm } from '@/components/form/form'
import { FANCY_STYLES, type FancyStyle, fancyText } from '@/lib/algorithms/fancy'
import { CopyRows } from './_shared/copy-rows'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const STYLES = Object.keys(FANCY_STYLES) as FancyStyle[]

function Styles({ text, onClear }: { text: string; onClear: () => void }) {
	const deferred = useDeferredValue(text)
	const rows = useMemo(
		() =>
			STYLES.map((style) => ({
				label: FANCY_STYLES[style],
				value: deferred ? fancyText(deferred, style) : '',
			})),
		[deferred],
	)
	return (
		<ResultCard
			title="Estilos"
			empty={!text}
			emptyText="Digite um texto e copie o estilo que quiser."
			onClear={onClear}
		>
			<CopyRows rows={rows} />
		</ResultCard>
	)
}

/** The same text in Unicode letter styles that paste anywhere (Instagram, WhatsApp, nicks). */
export default function FancyLetters() {
	const form = useAppForm({ defaultValues: { text: '' } })
	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => undefined}
				actions={
					<p className="text-fg-muted text-[0.8125rem]">
						Os estilos são atualizados enquanto você digita.
					</p>
				}
			>
				<form.AppField name="text">
					{(f) => (
						<f.TextareaField
							label="Texto"
							rows={4}
							placeholder="Ex: Lucas Bittencourt"
							description="Acentos e cedilha são mantidos sobre a letra estilizada (ã, é, ç)."
						/>
					)}
				</form.AppField>
			</FormCard>
			<form.Subscribe selector={(state) => state.values.text}>
				{(text) => <Styles text={text} onClear={() => form.reset()} />}
			</form.Subscribe>
		</ToolLayout>
	)
}
