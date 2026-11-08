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
import { parseUrl, rebuildUrl, type UrlParam } from '@/lib/algorithms/dev'
import { CopyRows } from './_shared/copy-rows'
import { FormCard, OutputValue, ResultCard, ToolLayout } from './_shared/tool-layout'

const SAMPLE =
	'https://ana:segredo@www.exemplo.com.br:8080/produtos/cafe%20especial?categoria=gr%C3%A3os&ordem=preco&pagina=2#avaliacoes'

/** Splits a URL into its parts, with an editable table of query parameters that rebuilds the URL. */
export default function UrlSplitter() {
	const form = useAppForm({ defaultValues: { url: SAMPLE } })
	const url = useDeferredValue(useStore(form.store, (state) => state.values.url))

	const parsed = useMemo(() => {
		if (!url.trim()) return null
		try {
			return { ok: true as const, parts: parseUrl(url) }
		} catch (error) {
			return { ok: false as const, error: (error as Error).message }
		}
	}, [url])

	// The parameter table starts from the URL; edits are kept only while the URL stays the same.
	type Row = UrlParam & { id: number }
	const [edited, setEdited] = useState<{ source: string; list: Row[] } | null>(null)
	const params: Row[] =
		edited?.source === url
			? edited.list
			: parsed?.ok
				? parsed.parts.params.map((param, id) => ({ ...param, id }))
				: []
	const setParams = (change: (list: Row[]) => Row[]) =>
		setEdited({ source: url, list: change(params) })

	const rebuilt = parsed?.ok ? rebuildUrl(url, params) : ''
	const nextId = () => Math.max(-1, ...params.map((param) => param.id)) + 1
	const update = (id: number, patch: Partial<UrlParam>) =>
		setParams((list) => list.map((param) => (param.id === id ? { ...param, ...patch } : param)))

	return (
		<ToolLayout>
			<FormCard
				title="Cole a URL"
				onSubmit={() => undefined}
				actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
			>
				<form.AppField name="url">
					{(f) => (
						<f.TextareaField
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
				{parsed?.ok ? (
					<>
						<CopyRows
							code
							rows={[
								{ label: 'Protocolo', value: parsed.parts.protocol.replace(/:$/, '') },
								{ label: 'Usuário', value: parsed.parts.username },
								{ label: 'Senha', value: parsed.parts.password },
								{ label: 'Host', value: parsed.parts.hostname },
								{
									label: parsed.parts.port
										? 'Porta'
										: `Porta (padrão${parsed.parts.defaultPort ? '' : ': nenhuma'})`,
									value: parsed.parts.port || parsed.parts.defaultPort,
								},
								{ label: 'Caminho', value: parsed.parts.pathname },
								{ label: 'Fragmento (#)', value: parsed.parts.hash },
								{
									label: 'Origem',
									value: parsed.parts.origin === 'null' ? '' : parsed.parts.origin,
								},
							]}
						/>
						<div className="flex flex-col gap-3">
							<div className="flex flex-wrap items-center justify-between gap-2">
								<h3 className="text-fg text-base font-semibold">Parâmetros da query</h3>
								<Button
									variant="secondary"
									size="sm"
									onClick={() =>
										setParams((list) => [...list, { id: nextId(), key: '', value: '' }])
									}
								>
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
											{params.map((param, i) => (
												<TableRow key={param.id}>
													<TableCell className="px-2 py-1.5 first:pl-3">
														<Input
															aria-label={`Nome do parâmetro ${i + 1}`}
															value={param.key}
															spellCheck={false}
															autoComplete="off"
															translate="no"
															className="min-w-28 font-mono"
															onChange={(event) => update(param.id, { key: event.target.value })}
														/>
													</TableCell>
													<TableCell className="px-2 py-1.5">
														<Input
															aria-label={`Valor do parâmetro ${param.key || i + 1}`}
															value={param.value}
															spellCheck={false}
															autoComplete="off"
															translate="no"
															className="min-w-36 font-mono"
															onChange={(event) => update(param.id, { value: event.target.value })}
														/>
													</TableCell>
													<TableCell align="center" className="px-2 py-1.5 last:pr-3">
														<Button
															variant="ghost"
															size="icon"
															aria-label={`Remover parâmetro ${param.key || i + 1}`}
															onClick={() =>
																setParams((list) => list.filter((item) => item.id !== param.id))
															}
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
				) : parsed ? (
					<Alert tone="danger">
						<CircleX />
						{parsed.error}
					</Alert>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
