'use client'

import {
	Alert,
	Button,
	CopyButton,
	Input,
	Table,
	TableBody,
	TableCard,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { CircleX, Plus, Trash2 } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import { useAppForm } from '@/components/form/form'
import { parseUrl, rebuildUrl, type UrlParam, type UrlParts } from '@/lib/algorithms/dev'
import { CopyRows } from './_shared/copy-rows'
import { FormCard, OutputValue, ResultCard, ToolLayout } from './_shared/tool-layout'

const SAMPLE =
	'https://ana:segredo@www.exemplo.com.br:8080/produtos/cafe%20especial?categoria=gr%C3%A3os&ordem=preco&pagina=2#avaliacoes'

type ParsedUrl = { ok: true; parts: UrlParts } | { ok: false; error: string }
type ParamRow = UrlParam & { id: number }
/** Parameter rows edited by the user, tied to the URL they were edited for. */
type EditedParams = { sourceUrl: string; rows: ParamRow[] }

function tryParseUrl(url: string): ParsedUrl | null {
	if (!url.trim()) return null
	try {
		return { ok: true, parts: parseUrl(url) }
	} catch (error) {
		return { ok: false, error: (error as Error).message }
	}
}

/** "Porta" when written; otherwise says the shown value is the scheme default (or that there is none). */
function portLabel(parts: UrlParts): string {
	if (parts.port) return 'Porta'
	return `Porta (padrão${parts.defaultPort ? '' : ': nenhuma'})`
}

function urlPartRows(parts: UrlParts) {
	return [
		{ label: 'Protocolo', value: parts.protocol.replace(/:$/, '') },
		{ label: 'Usuário', value: parts.username },
		{ label: 'Senha', value: parts.password },
		{ label: 'Host', value: parts.hostname },
		{ label: portLabel(parts), value: parts.port || parts.defaultPort },
		{ label: 'Caminho', value: parts.pathname },
		{ label: 'Fragmento (#)', value: parts.hash },
		// Opaque origins (file:, data:…) serialize as the string "null".
		{ label: 'Origem', value: parts.origin === 'null' ? '' : parts.origin },
	]
}

/** Splits a URL into its parts, with an editable table of query parameters that rebuilds the URL. */
export default function UrlSplitter() {
	const form = useAppForm({ defaultValues: { url: SAMPLE } })
	const url = useDeferredValue(useStore(form.store, (state) => state.values.url))
	const parsed = useMemo(() => tryParseUrl(url), [url])

	// The table starts from the URL's parameters; edits are kept only while the URL stays the same.
	const [edited, setEdited] = useState<EditedParams | null>(null)
	let params: ParamRow[] = []
	if (edited?.sourceUrl === url) params = edited.rows
	else if (parsed?.ok) params = parsed.parts.params.map((param, id) => ({ ...param, id }))

	const setParams = (change: (rows: ParamRow[]) => ParamRow[]) =>
		setEdited({ sourceUrl: url, rows: change(params) })
	const nextId = () => Math.max(-1, ...params.map((param) => param.id)) + 1
	const addParam = () => setParams((rows) => [...rows, { id: nextId(), key: '', value: '' }])
	const updateParam = (id: number, patch: Partial<UrlParam>) =>
		setParams((rows) => rows.map((param) => (param.id === id ? { ...param, ...patch } : param)))
	const removeParam = (id: number) => setParams((rows) => rows.filter((param) => param.id !== id))

	const rebuilt = parsed?.ok ? rebuildUrl(url, params) : ''

	return (
		<ToolLayout>
			<FormCard
				title="Cole a URL"
				onSubmit={() => undefined}
				actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
			>
				<form.AppField name="url">
					{(field) => (
						<field.TextareaField
							label="URL"
							rows={4}
							placeholder="Ex.: https://exemplo.com/busca?q=café#topo"
						/>
					)}
				</form.AppField>
			</FormCard>
			<ResultCard
				title="Partes da URL"
				empty={!parsed}
				emptyText="Cole uma URL completa, com https://."
				onClear={() => form.reset({ url: '' })}
			>
				{parsed?.ok === true && (
					<>
						<CopyRows code rows={urlPartRows(parsed.parts)} />
						<div className="flex flex-col gap-4">
							<div className="flex flex-wrap items-center justify-between gap-2">
								<h3 className="text-fg text-base font-semibold">Parâmetros da query</h3>
								<Button variant="secondary" size="sm" onClick={addParam}>
									<Plus /> Adicionar parâmetro
								</Button>
							</div>
							{params.length === 0 ? (
								<p className="text-fg-muted text-[0.9375rem]">Esta URL não tem parâmetros.</p>
							) : (
								<TableCard label="Parâmetros da query, editáveis">
									<Table>
										<TableHeader>
											<tr>
												<TableHead>Nome</TableHead>
												<TableHead>Valor (decodificado)</TableHead>
												<TableHead className="w-14">
													<span className="sr-only">Remover</span>
												</TableHead>
											</tr>
										</TableHeader>
										<TableBody>
											{params.map((param, position) => (
												<TableRow key={param.id}>
													<TableCell className="p-2 first:pl-4">
														<Input
															aria-label={`Nome do parâmetro ${position + 1}`}
															value={param.key}
															spellCheck={false}
															autoComplete="off"
															translate="no"
															className="min-w-28 font-mono"
															onChange={(event) =>
																updateParam(param.id, { key: event.target.value })
															}
														/>
													</TableCell>
													<TableCell className="p-2">
														<Input
															aria-label={`Valor do parâmetro ${param.key || position + 1}`}
															value={param.value}
															spellCheck={false}
															autoComplete="off"
															translate="no"
															className="min-w-36 font-mono"
															onChange={(event) =>
																updateParam(param.id, { value: event.target.value })
															}
														/>
													</TableCell>
													<TableCell align="center" className="p-2 last:pr-4">
														<Button
															variant="ghost"
															size="icon"
															aria-label={`Remover parâmetro ${param.key || position + 1}`}
															onClick={() => removeParam(param.id)}
														>
															<Trash2 />
														</Button>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableCard>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<h3 className="text-fg text-base font-semibold">URL montada</h3>
							<OutputValue code className="text-base sm:text-lg">
								<span translate="no">{rebuilt}</span>
							</OutputValue>
							<div className="flex flex-wrap gap-2">
								<CopyButton value={rebuilt} variant="primary" aria-label="Copiar URL montada" />
								<Button
									variant="secondary"
									size="sm"
									disabled={rebuilt === url.trim()}
									onClick={() => form.setFieldValue('url', rebuilt)}
								>
									Usar no campo URL
								</Button>
							</div>
						</div>
					</>
				)}
				{parsed?.ok === false && (
					<Alert tone="danger">
						<CircleX />
						{parsed.error}
					</Alert>
				)}
			</ResultCard>
		</ToolLayout>
	)
}
