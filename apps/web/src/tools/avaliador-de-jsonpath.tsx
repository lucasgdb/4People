'use client'

import { Alert, Button, CopyButton } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { CircleAlert, CircleX } from 'lucide-react'
import { useDeferredValue, useEffect, useState } from 'react'
import { useAppForm } from '@/components/form/form'
import { parseJson } from '@/lib/algorithms/dev'
import { formatNumber } from '@/lib/format'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const SAMPLE = JSON.stringify(
	{
		loja: {
			livros: [
				{ categoria: 'romance', autor: 'Machado de Assis', titulo: 'Dom Casmurro', preco: 29.9 },
				{
					categoria: 'romance',
					autor: 'Clarice Lispector',
					titulo: 'A Hora da Estrela',
					preco: 34.5,
				},
				{
					categoria: 'poesia',
					autor: 'Cecília Meireles',
					titulo: 'Romanceiro da Inconfidência',
					preco: 42,
					isbn: '978-85-209-2',
				},
			],
			bicicleta: { cor: 'vermelha', preco: 899 },
		},
	},
	null,
	2,
)

const EXAMPLES = [
	{ path: '$.loja.livros[*].autor', label: 'Autores de todos os livros' },
	{ path: '$..preco', label: 'Todos os preços, em qualquer nível' },
	{ path: '$.loja.livros[0]', label: 'O primeiro livro' },
	{ path: '$.loja.livros[-1:]', label: 'O último livro' },
	{ path: '$.loja.livros[?(@.preco < 35)].titulo', label: 'Títulos com preço abaixo de 35' },
	{ path: '$.loja.livros[?(@.isbn)]', label: 'Livros que têm ISBN' },
	{ path: '$.loja.*', label: 'Tudo dentro de loja' },
	{ path: '$..livros.length', label: 'Quantidade de livros' },
] as const

type Outcome =
	| { ok: true; items: { path: string; value: unknown }[] }
	| { ok: false; error: string; tone: 'danger' | 'info' }

/** Runs a JSONPath expression over a JSON document and lists each match with its path. */
export default function JsonPathEvaluator() {
	const form = useAppForm({ defaultValues: { json: SAMPLE, path: '$.loja.livros[*].autor' } })
	const values = useDeferredValue(useStore(form.store, (state) => state.values))
	const [outcome, setOutcome] = useState<Outcome | null>(null)

	// jsonpath-plus is loaded on demand, so evaluation is async and happens only in the browser.
	useEffect(() => {
		let cancelled = false
		const path = values.path.trim()
		if (!values.json.trim() || !path) {
			setOutcome(null)
			return
		}
		const parsed = parseJson(values.json)
		if (!parsed.ok) {
			setOutcome({ ok: false, error: parsed.error, tone: 'danger' })
			return
		}
		import('jsonpath-plus')
			.then(({ JSONPath }) => {
				const found = JSONPath({
					path,
					json: parsed.value as object,
					resultType: 'all',
					eval: 'safe',
					wrap: true,
				}) as {
					path: string
					value: unknown
				}[]
				if (!cancelled)
					setOutcome({ ok: true, items: found.map(({ path, value }) => ({ path, value })) })
			})
			.catch((error: Error) => {
				if (!cancelled)
					setOutcome({
						ok: false,
						tone: 'danger',
						error: `Expressão inválida: ${error.message}. Comece com $ e confira colchetes e filtros ?().`,
					})
			})
		return () => {
			cancelled = true
		}
	}, [values])

	const allValues = outcome?.ok
		? JSON.stringify(
				outcome.items.map((item) => item.value),
				null,
				2,
			)
		: undefined

	return (
		<ToolLayout>
			<FormCard
				title="JSON e expressão"
				onSubmit={() => undefined}
				actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
			>
				<form.AppField name="path">
					{(f) => (
						<f.TextField
							label="Expressão JSONPath"
							placeholder="Ex.: $.loja.livros[*].titulo"
							inputClassName="font-mono"
						/>
					)}
				</form.AppField>
				<div className="flex flex-col gap-2">
					<p className="text-fg-muted text-[0.8125rem]">Exemplos (clique para usar):</p>
					<ul className="flex flex-wrap gap-2">
						{EXAMPLES.map((example) => (
							<li key={example.path}>
								<Button
									variant="secondary"
									size="sm"
									title={example.label}
									aria-label={`${example.label}: ${example.path}`}
									onClick={() => form.setFieldValue('path', example.path)}
								>
									<code translate="no" className="font-mono text-[0.8125rem]">
										{example.path}
									</code>
								</Button>
							</li>
						))}
					</ul>
				</div>
				<form.AppField name="json">
					{(f) => (
						<f.TextareaField
							label="JSON"
							rows={14}
							placeholder='Ex.: { "loja": { "livros": [] } }'
						/>
					)}
				</form.AppField>
			</FormCard>
			<ResultCard
				title="Resultados"
				empty={!outcome}
				emptyText="Cole um JSON e escreva uma expressão para ver os resultados."
				copyText={allValues}
				onClear={() => form.reset({ json: '', path: '' })}
			>
				{outcome?.ok ? (
					outcome.items.length === 0 ? (
						<Alert tone="info">
							<CircleAlert />
							Nenhum resultado. Confira os nomes das chaves (diferenciam maiúsculas) e os índices.
						</Alert>
					) : (
						<>
							<p className="text-fg tabular font-semibold">
								{formatNumber(outcome.items.length)}{' '}
								{outcome.items.length === 1 ? 'resultado' : 'resultados'}
							</p>
							<ol className="flex flex-col gap-3">
								{outcome.items.map((item) => {
									const text = JSON.stringify(item.value, null, 2) ?? 'undefined'
									return (
										<li key={item.path} className="flex flex-col gap-1.5">
											<div className="flex items-center justify-between gap-2">
												<code
													translate="no"
													className="text-fg-muted min-w-0 font-mono text-[0.8125rem] break-all"
												>
													{item.path}
												</code>
												<CopyButton value={text} aria-label={`Copiar valor de ${item.path}`} />
											</div>
											<OutputBlock className="max-h-60">
												<span translate="no">{text}</span>
											</OutputBlock>
										</li>
									)
								})}
							</ol>
						</>
					)
				) : outcome ? (
					<Alert tone={outcome.tone}>
						<CircleX />
						{outcome.error}
					</Alert>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
