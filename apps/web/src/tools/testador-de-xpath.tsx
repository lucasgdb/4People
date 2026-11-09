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

type DocumentMode = (typeof MODES)[number]['value']

// Node.nodeType values, spelled out because the Node global doesn't exist during the server render.
const ELEMENT_NODE = 1
const ATTRIBUTE_NODE = 2

const NODE_TYPE_NAMES: Record<number, string> = {
	[ELEMENT_NODE]: 'Elemento',
	[ATTRIBUTE_NODE]: 'Atributo',
	3: 'Texto',
	4: 'CDATA',
	7: 'Instrução',
	8: 'Comentário',
	9: 'Documento',
}

type NodeItem = { type: string; name: string; value: string; markup: string | null }
type ScalarKind = 'number' | 'string' | 'boolean'

type Outcome =
	| { ok: true; kind: 'nodes'; nodes: NodeItem[] }
	| { ok: true; kind: ScalarKind; value: string }
	| { ok: false; error: string }

const MAX_NODES = 500

const SCALAR_KIND_LABELS: Record<ScalarKind, string> = {
	number: 'Número',
	string: 'Texto',
	boolean: 'Booleano',
}

/** The parsed document, or the XML parser's own error message. */
function parseDocument(source: string, mode: DocumentMode): Document | { error: string } {
	const doc = new DOMParser().parseFromString(
		source,
		mode === 'xml' ? 'application/xml' : 'text/html',
	)
	// HTML parsing never fails; XML parsing reports errors as a <parsererror> element.
	const parserError = mode === 'xml' ? doc.getElementsByTagName('parsererror')[0] : undefined
	if (!parserError) return doc
	const detail = (parserError.textContent ?? '').replace(/\s+/g, ' ').trim()
	return { error: `XML inválido: ${detail || 'confira se todas as tags foram fechadas.'}` }
}

function toNodeItem(node: Node): NodeItem {
	const isAttribute = node.nodeType === ATTRIBUTE_NODE
	const isElement = node.nodeType === ELEMENT_NODE
	return {
		type: NODE_TYPE_NAMES[node.nodeType] ?? 'Nó',
		name: node.nodeName,
		value: (isAttribute ? (node as Attr).value : (node.textContent ?? '')).trim(),
		markup: isElement ? (node as Element).outerHTML : null,
	}
}

function collectNodes(result: XPathResult): NodeItem[] {
	const nodes: NodeItem[] = []
	let node = result.iterateNext()
	while (node && nodes.length < MAX_NODES) {
		nodes.push(toNodeItem(node))
		node = result.iterateNext()
	}
	return nodes
}

function toOutcome(result: XPathResult): Outcome {
	switch (result.resultType) {
		case XPathResult.NUMBER_TYPE:
			return { ok: true, kind: 'number', value: formatNumber(result.numberValue, 10) }
		case XPathResult.STRING_TYPE:
			return { ok: true, kind: 'string', value: result.stringValue }
		case XPathResult.BOOLEAN_TYPE: {
			const value = result.booleanValue ? 'verdadeiro (true)' : 'falso (false)'
			return { ok: true, kind: 'boolean', value }
		}
		default:
			return { ok: true, kind: 'nodes', nodes: collectNodes(result) }
	}
}

function evaluate(source: string, expression: string, mode: DocumentMode): Outcome {
	const doc = parseDocument(source, mode)
	if ('error' in doc) return { ok: false, error: doc.error }
	// Prefixes declared on the root element (xmlns:x="…") can be used in the expression.
	const resolveNamespace = (prefix: string | null) =>
		doc.documentElement?.lookupNamespaceURI(prefix) ?? null
	try {
		return toOutcome(doc.evaluate(expression, doc, resolveNamespace, XPathResult.ANY_TYPE, null))
	} catch (error) {
		// Drops the engine's "Failed to execute 'evaluate'…: " prefix.
		const reason = (error as Error).message.replace(/^.*?: /, '')
		return {
			ok: false,
			error: `Expressão XPath inválida: ${reason}. Confira barras, colchetes e aspas.`,
		}
	}
}

function outcomeCopyText(outcome: Outcome | null): string | undefined {
	if (!outcome?.ok) return undefined
	if (outcome.kind !== 'nodes') return outcome.value
	return outcome.nodes.map((node) => node.markup ?? node.value).join('\n')
}

function NodeList({ nodes }: { nodes: NodeItem[] }) {
	if (nodes.length === 0) {
		return (
			<Alert tone="info">
				<CircleAlert />
				Nenhum nó encontrado. Confira os nomes (diferenciam maiúsculas) e o caminho.
			</Alert>
		)
	}
	return (
		<>
			<p className="text-fg tabular font-semibold">
				{formatNumber(nodes.length)} {nodes.length === 1 ? 'nó' : 'nós'}
				{nodes.length >= MAX_NODES ? ` (mostrando os primeiros ${MAX_NODES})` : ''}
			</p>
			<ol className="flex flex-col gap-4">
				{nodes.map((node, position) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: result order is the identity
					<li key={position} className="flex flex-col gap-2">
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
}

function ScalarResult({ kind, value }: { kind: ScalarKind; value: string }) {
	return (
		<div className="flex flex-col gap-2">
			<Badge tone="primary" className="w-fit">
				{SCALAR_KIND_LABELS[kind]}
			</Badge>
			<OutputBlock>
				<span translate="no">{value}</span>
			</OutputBlock>
		</div>
	)
}

/** Evaluates an XPath expression over XML or HTML with the browser's own engine. */
export default function XPathTester() {
	const form = useAppForm({
		defaultValues: { mode: 'xml' as DocumentMode, source: SAMPLE, expression: '//livro/titulo' },
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

	const isXml = values.mode === 'xml'

	return (
		<ToolLayout>
			<FormCard
				title="Documento e expressão"
				onSubmit={() => undefined}
				actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
			>
				<form.AppField name="expression">
					{(field) => (
						<field.TextField
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
									className="h-auto min-h-10 max-w-full py-2 text-left whitespace-normal"
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
					{(field) => <field.RadioField label="Tipo de documento" options={MODES} />}
				</form.AppField>
				<form.AppField name="source">
					{(field) => (
						<field.TextareaField
							label={isXml ? 'XML' : 'HTML'}
							rows={14}
							placeholder={isXml ? 'Ex.: <raiz><item>1</item></raiz>' : 'Ex.: <ul><li>1</li></ul>'}
							description={
								isXml
									? 'Com namespace padrão (xmlns="…"), use local-name(), ex.: //*[local-name()="item"].'
									: 'No HTML, os nomes das tags são em minúsculas e o documento ganha html, head e body.'
							}
						/>
					)}
				</form.AppField>
			</FormCard>
			<ResultCard
				title="Resultado"
				empty={!outcome}
				emptyText="Cole o documento e escreva uma expressão XPath."
				copyText={outcomeCopyText(outcome)}
				onClear={() => form.reset({ mode: 'xml', source: '', expression: '' })}
			>
				{outcome?.ok === true && outcome.kind === 'nodes' && <NodeList nodes={outcome.nodes} />}
				{outcome?.ok === true && outcome.kind !== 'nodes' && (
					<ScalarResult kind={outcome.kind} value={outcome.value} />
				)}
				{outcome?.ok === false && (
					<Alert tone="danger">
						<CircleX />
						{outcome.error}
					</Alert>
				)}
			</ResultCard>
		</ToolLayout>
	)
}
