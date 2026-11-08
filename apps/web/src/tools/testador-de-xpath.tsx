'use client'

import { Alert, Badge, Button } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { CircleAlert, CircleX } from 'lucide-react'
import { useDeferredValue, useEffect, useState } from 'react'
import { useAppForm } from '@/components/form/form'
import { formatNumber } from '@/lib/format'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<biblioteca>
  <livro id="1" ano="1899">
    <titulo>Dom Casmurro</titulo>
    <autor>Machado de Assis</autor>
    <preco>29.90</preco>
  </livro>
  <livro id="2" ano="1977">
    <titulo>A Hora da Estrela</titulo>
    <autor>Clarice Lispector</autor>
    <preco>34.50</preco>
  </livro>
</biblioteca>`

const EXAMPLES = [
	{ expression: '//livro/titulo', label: 'Todos os títulos' },
	{ expression: '//livro[@ano > 1900]/autor/text()', label: 'Autores de livros após 1900' },
	{ expression: '//livro/@id', label: 'Atributo id de cada livro' },
	{ expression: 'count(//livro)', label: 'Quantos livros' },
	{ expression: 'sum(//preco)', label: 'Soma dos preços' },
	{ expression: "boolean(//livro[autor='Machado de Assis'])", label: 'Existe livro do Machado?' },
	{ expression: 'string(//livro[1]/titulo)', label: 'Título do primeiro livro como texto' },
] as const

const MODES = [
	{ value: 'xml', label: 'XML' },
	{ value: 'html', label: 'HTML' },
] as const

const NODE_TYPES: Record<number, string> = {
	1: 'Elemento',
	2: 'Atributo',
	3: 'Texto',
	4: 'CDATA',
	7: 'Instrução',
	8: 'Comentário',
	9: 'Documento',
}

type NodeItem = { type: string; name: string; value: string; markup: string | null }

type Outcome =
	| { ok: true; kind: 'nodes'; nodes: NodeItem[] }
	| { ok: true; kind: 'number' | 'string' | 'boolean'; value: string }
	| { ok: false; error: string }

const MAX_NODES = 500

function evaluate(source: string, expression: string, mode: 'xml' | 'html'): Outcome {
	const doc = new DOMParser().parseFromString(
		source,
		mode === 'xml' ? 'application/xml' : 'text/html',
	)
	if (mode === 'xml') {
		const error = doc.getElementsByTagName('parsererror')[0]
		if (error) {
			const detail = (error.textContent ?? '').replace(/\s+/g, ' ').trim()
			return {
				ok: false,
				error: `XML inválido: ${detail || 'confira se todas as tags foram fechadas.'}`,
			}
		}
	}
	// Prefixes declared on the root element (xmlns:x="…") can be used in the expression.
	const resolver = (prefix: string | null) =>
		doc.documentElement?.lookupNamespaceURI(prefix) ?? null
	let result: XPathResult
	try {
		result = doc.evaluate(expression, doc, resolver, XPathResult.ANY_TYPE, null)
	} catch (error) {
		return {
			ok: false,
			error: `Expressão XPath inválida: ${(error as Error).message.replace(/^.*?: /, '')}. Confira barras, colchetes e aspas.`,
		}
	}
	switch (result.resultType) {
		case XPathResult.NUMBER_TYPE:
			return { ok: true, kind: 'number', value: formatNumber(result.numberValue, 10) }
		case XPathResult.STRING_TYPE:
			return { ok: true, kind: 'string', value: result.stringValue }
		case XPathResult.BOOLEAN_TYPE:
			return {
				ok: true,
				kind: 'boolean',
				value: result.booleanValue ? 'verdadeiro (true)' : 'falso (false)',
			}
		default: {
			const nodes: NodeItem[] = []
			for (
				let node = result.iterateNext();
				node && nodes.length < MAX_NODES;
				node = result.iterateNext()
			) {
				nodes.push({
					type: NODE_TYPES[node.nodeType] ?? 'Nó',
					name: node.nodeName,
					value: (node.nodeType === 2 ? (node as Attr).value : (node.textContent ?? '')).trim(),
					markup: node.nodeType === 1 ? (node as Element).outerHTML : null,
				})
			}
			return { ok: true, kind: 'nodes', nodes }
		}
	}
}

const KIND_LABEL = { number: 'Número', string: 'Texto', boolean: 'Booleano' } as const

/** Evaluates an XPath expression over XML or HTML with the browser's own engine. */
export default function XPathTester() {
	const form = useAppForm({
		defaultValues: { mode: 'xml' as 'xml' | 'html', source: SAMPLE, expression: '//livro/titulo' },
	})
	const values = useDeferredValue(useStore(form.store, (state) => state.values))
	const [outcome, setOutcome] = useState<Outcome | null>(null)

	// DOMParser exists only in the browser: evaluate after mount, never during the server render.
	useEffect(() => {
		if (!values.source.trim() || !values.expression.trim()) {
			setOutcome(null)
			return
		}
		setOutcome(evaluate(values.source, values.expression.trim(), values.mode))
	}, [values])

	const copyText =
		outcome?.ok && outcome.kind === 'nodes'
			? outcome.nodes.map((node) => node.markup ?? node.value).join('\n')
			: outcome?.ok
				? outcome.value
				: undefined

	return (
		<ToolLayout>
			<FormCard
				title="Documento e expressão"
				onSubmit={() => undefined}
				actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
			>
				<form.AppField name="expression">
					{(f) => (
						<f.TextField
							label="Expressão XPath"
							placeholder="Ex.: //livro[@id='1']/titulo"
							inputClassName="font-mono"
						/>
					)}
				</form.AppField>
				<div className="flex flex-col gap-2">
					<p className="text-fg-muted text-[0.8125rem]">Exemplos (clique para usar):</p>
					<ul className="flex flex-wrap gap-2">
						{EXAMPLES.map((example) => (
							<li key={example.expression} className="max-w-full">
								<Button
									variant="secondary"
									size="sm"
									className="h-auto min-h-9 max-w-full py-1.5 text-left whitespace-normal"
									title={example.label}
									aria-label={`${example.label}: ${example.expression}`}
									onClick={() => form.setFieldValue('expression', example.expression)}
								>
									<code translate="no" className="font-mono text-[0.8125rem] break-all">
										{example.expression}
									</code>
								</Button>
							</li>
						))}
					</ul>
				</div>
				<form.AppField name="mode">
					{(f) => <f.RadioField label="Tipo de documento" options={MODES} />}
				</form.AppField>
				<form.AppField name="source">
					{(f) => (
						<f.TextareaField
							label={values.mode === 'xml' ? 'XML' : 'HTML'}
							rows={14}
							placeholder={
								values.mode === 'xml'
									? 'Ex.: <raiz><item>1</item></raiz>'
									: 'Ex.: <ul><li>1</li></ul>'
							}
							description={
								values.mode === 'html'
									? 'No HTML, os nomes das tags são em minúsculas e o documento ganha html, head e body.'
									: 'Com namespace padrão (xmlns="…"), use local-name(), ex.: //*[local-name()="item"].'
							}
						/>
					)}
				</form.AppField>
			</FormCard>
			<ResultCard
				title="Resultado"
				empty={!outcome}
				emptyText="Cole o documento e escreva uma expressão XPath."
				copyText={copyText}
				onClear={() => form.reset({ mode: 'xml', source: '', expression: '' })}
			>
				{outcome?.ok ? (
					outcome.kind === 'nodes' ? (
						outcome.nodes.length === 0 ? (
							<Alert tone="info">
								<CircleAlert />
								Nenhum nó encontrado. Confira os nomes (diferenciam maiúsculas) e o caminho.
							</Alert>
						) : (
							<>
								<p className="text-fg tabular font-semibold">
									{formatNumber(outcome.nodes.length)} {outcome.nodes.length === 1 ? 'nó' : 'nós'}
									{outcome.nodes.length >= MAX_NODES
										? ` (mostrando os primeiros ${MAX_NODES})`
										: ''}
								</p>
								<ol className="flex flex-col gap-3">
									{outcome.nodes.map((node, i) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: result order is the identity
										<li key={i} className="flex flex-col gap-1.5">
											<p className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
												<Badge tone="neutral">{node.type}</Badge>
												<code translate="no" className="text-fg font-mono font-semibold">
													{node.name}
												</code>
												{node.markup === null ? (
													<code translate="no" className="text-fg-muted font-mono break-all">
														= {node.value}
													</code>
												) : null}
											</p>
											{node.markup !== null ? (
												<OutputBlock className="max-h-48">
													<span translate="no">{node.markup}</span>
												</OutputBlock>
											) : null}
										</li>
									))}
								</ol>
							</>
						)
					) : (
						<div className="flex flex-col gap-2">
							<Badge tone="primary" className="w-fit">
								{KIND_LABEL[outcome.kind]}
							</Badge>
							<OutputBlock>
								<span translate="no">{outcome.value}</span>
							</OutputBlock>
						</div>
					)
				) : outcome ? (
					<Alert tone="danger">
						<CircleX />
						{outcome.error}
					</Alert>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
