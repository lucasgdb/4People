'use client'

import { Button } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { ArrowLeftRight } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { decodeHtmlEntities, encodeHtmlEntities } from '@/lib/algorithms/web'
import { useModeMemory } from './_shared/mode-memory'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const DIRECTIONS = [
	{ value: 'encode', label: 'Codificar' },
	{ value: 'decode', label: 'Decodificar' },
] as const

const FORMATS = [
	{ value: 'named', label: 'Nomeadas', hint: '&eacute;' },
	{ value: 'decimal', label: 'Decimais', hint: '&#233;' },
	{ value: 'hex', label: 'Hexadecimais', hint: '&#xE9;' },
] as const

const SCOPES = [
	{ value: 'special', label: 'Só especiais', hint: '& < > " \'' },
	{ value: 'nonAscii', label: 'Tudo fora do ASCII', hint: 'Especiais, acentos e emoji' },
] as const

const schema = z.object({
	direction: z.enum(['encode', 'decode']),
	input: z.string(),
	format: z.enum(['named', 'decimal', 'hex']),
	scope: z.enum(['special', 'nonAscii']),
})

type Result = { ok: true; value: string }

/**
 * HTML entities both ways, live: named, decimal or hex, for the five special characters only or for
 * everything outside ASCII. Unlike "Texto para HTML" it doesn't add tags, it only converts characters.
 */
export default function HtmlEntityEncoder() {
	const [result, setResult] = useState<Result | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { direction: 'encode', input: '', format: 'named', scope: 'special' },
		onSubmit: ({ direction, input, format, scope }) =>
			setResult(
				input
					? {
							ok: true,
							value:
								direction === 'encode'
									? encodeHtmlEntities(input, { format, scope })
									: decodeHtmlEntities(input),
						}
					: null,
			),
	})
	const switchMode = useModeMemory(form, 'input', 'encode', result, setResult)
	const direction = useStore(form.store, (state) => state.values.direction)
	const recompute = { onChange: () => form.handleSubmit() }

	function swap() {
		if (!result) return
		const next = direction === 'encode' ? 'decode' : 'encode'
		const output = result.value
		switchMode(next)
		form.setFieldValue('direction', next)
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
						<Button variant="secondary" onClick={swap} disabled={!result}>
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
					{(f) => <f.RadioField label="Operação" options={DIRECTIONS} />}
				</form.AppField>
				<form.AppField name="input" listeners={recompute}>
					{(f) => (
						<f.TextareaField
							label={direction === 'encode' ? 'Texto ou HTML' : 'Texto com entidades'}
							rows={8}
							placeholder={
								direction === 'encode'
									? 'Ex.: <p>Preço < R$ 10 & frete grátis</p>'
									: 'Ex.: &lt;p&gt;Pre&ccedil;o &amp; frete&lt;/p&gt;'
							}
						/>
					)}
				</form.AppField>
				{direction === 'encode' ? (
					<>
						<form.AppField name="scope" listeners={recompute}>
							{(f) => <f.RadioField label="O que codificar" options={SCOPES} />}
						</form.AppField>
						<form.AppField name="format" listeners={recompute}>
							{(f) => (
								<f.RadioField
									label="Formato das entidades"
									description="Caracteres sem nome conhecido usam a forma decimal."
									options={FORMATS}
								/>
							)}
						</form.AppField>
					</>
				) : (
					<p className="text-fg-muted text-[0.8125rem]">
						Reconhece entidades nomeadas (HTML 4), decimais (&amp;#233;) e hexadecimais
						(&amp;#xE9;). As desconhecidas ficam como estão.
					</p>
				)}
			</FormCard>
			<ResultCard
				empty={!result}
				emptyText="Digite um texto e o resultado aparece aqui."
				copyText={result?.value ?? ''}
				onClear={() => {
					setResult(null)
					form.setFieldValue('input', '')
				}}
			>
				<OutputBlock className="max-h-[36rem]">
					<span translate="no">{result?.value}</span>
				</OutputBlock>
			</ResultCard>
		</ToolLayout>
	)
}
