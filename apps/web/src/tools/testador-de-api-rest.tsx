'use client'

import { Alert, Badge, Button, CopyButton, DataList, Input } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { CircleX, Info, Plus, TriangleAlert, X } from 'lucide-react'
import { useId, useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import {
	buildRequest,
	explainFetchError,
	formatBytes,
	HTTP_METHODS,
	type KeyValue,
	prettyBody,
	statusClass,
	toCurl,
} from '@/lib/algorithms/web'
import { formatNumber } from '@/lib/format'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const METHOD_OPTIONS = HTTP_METHODS.map((method) => ({ value: method, label: method }))

const BODY_TYPES = [
	{ value: 'none', label: 'Sem corpo' },
	{ value: 'json', label: 'JSON' },
	{ value: 'text', label: 'Texto' },
	{ value: 'form', label: 'Formulário' },
] as const

const schema = z.object({
	method: z.enum(HTTP_METHODS),
	url: z.string().trim().min(1, 'Informe a URL da API, como https://api.exemplo.com/usuarios.'),
	bodyType: z.enum(['none', 'json', 'text', 'form']),
	body: z.string(),
})

/** Binary responses are measured, not printed. */
const isBinary = (type: string) =>
	/^(image|audio|video|font)\//.test(type) || /octet-stream|pdf|zip|protobuf|wasm/.test(type)

type Response =
	| {
			ok: true
			status: number
			statusText: string
			ms: number
			bytes: number
			headers: [string, string][]
			body: string
			json: boolean
			binary: boolean
			contentType: string
			curl: string
			ignoredHeaders: string[]
	  }
	| { ok: false; error: string; cors: boolean; curl?: string; ignoredHeaders: string[] }

const TIMEOUT_MS = 30_000

/** Sends a request with fetch() from this page and shows status, time, size, headers and body. */
export default function RestApiTester() {
	const [headers, setHeaders] = useState<(KeyValue & { id: number })[]>([
		{ id: 0, key: 'Accept', value: 'application/json' },
	])
	const headersId = useId()

	// One request per submit, through React Query: it tracks the request in flight and keeps the last
	// result. The function never throws: network and CORS errors become a readable result.
	const send = useMutation({
		mutationKey: ['rest-request'],
		mutationFn: async ({
			method,
			url,
			bodyType,
			body,
		}: z.infer<typeof schema>): Promise<Response> => {
			let request: ReturnType<typeof buildRequest>
			try {
				request = buildRequest({ method, url, headers, bodyType, body })
			} catch (error) {
				return {
					ok: false,
					error: (error as Error).message,
					cors: false,
					ignoredHeaders: [],
				}
			}
			const curl = toCurl(request)
			const started = performance.now()
			try {
				const res = await fetch(request.url, {
					method: request.method,
					headers: request.headers,
					body: request.body,
					signal: AbortSignal.timeout(TIMEOUT_MS),
				})
				const contentType = res.headers.get('content-type') ?? ''
				const binary = isBinary(contentType)
				let text = ''
				let bytes = 0
				if (binary) bytes = (await res.blob()).size
				else {
					text = await res.text()
					bytes = new TextEncoder().encode(text).length
				}
				const ms = performance.now() - started
				const pretty = prettyBody(text, contentType)
				return {
					ok: true,
					status: res.status,
					statusText: res.statusText,
					ms,
					bytes,
					headers: [...res.headers.entries()],
					body: pretty.text,
					json: pretty.json,
					binary,
					contentType,
					curl,
					ignoredHeaders: request.ignoredHeaders,
				}
			} catch (error) {
				return {
					ok: false,
					error: explainFetchError(error, request.url, window.location.protocol),
					cors: (error as Error)?.name === 'TypeError',
					curl,
					ignoredHeaders: request.ignoredHeaders,
				}
			}
		},
	})
	const response = send.data ?? null

	const form = useToolForm({
		schema,
		defaultValues: { method: 'GET', url: '', bodyType: 'none', body: '' },
		onSubmit: (values) => send.mutateAsync(values).then(() => undefined),
	})
	const method = useStore(form.store, (state) => state.values.method)
	const bodyType = useStore(form.store, (state) => state.values.bodyType)
	const acceptsBody = method !== 'GET' && method !== 'HEAD'

	const updateHeader = (id: number, patch: Partial<KeyValue>) =>
		setHeaders((rows) => rows.map((row) => (row.id === id ? { ...row, ...patch } : row)))

	return (
		<ToolLayout>
			<FormCard
				title="Monte a requisição"
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>Enviar requisição</form.SubmitButton>
					</form.AppForm>
				}
			>
				<div className="grid gap-4 sm:grid-cols-[9rem_1fr]">
					<form.AppField name="method">
						{(f) => <f.SelectField label="Método" options={METHOD_OPTIONS} />}
					</form.AppField>
					<form.AppField name="url">
						{(f) => (
							<f.TextField
								label="URL"
								type="url"
								inputMode="url"
								enterKeyHint="send"
								placeholder="Ex.: https://jsonplaceholder.typicode.com/todos/1"
							/>
						)}
					</form.AppField>
				</div>
				<fieldset className="flex flex-col gap-2" aria-describedby={`${headersId}-desc`}>
					<legend className="text-fg mb-1 text-sm font-medium">Cabeçalhos</legend>
					{headers.map((row, i) => (
						// Phones: name over value, the remove button beside both; from sm up, one row.
						<div
							key={row.id}
							className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:flex"
						>
							<Input
								aria-label={`Nome do cabeçalho ${i + 1}`}
								placeholder="Ex.: Authorization"
								value={row.key}
								autoComplete="off"
								spellCheck={false}
								onChange={(event) => updateHeader(row.id, { key: event.target.value })}
								className="min-w-0 sm:flex-[2]"
							/>
							<Input
								aria-label={`Valor do cabeçalho ${i + 1}`}
								placeholder="Ex.: Bearer eyJhbGci…"
								value={row.value}
								autoComplete="off"
								spellCheck={false}
								onChange={(event) => updateHeader(row.id, { value: event.target.value })}
								className="col-start-1 row-start-2 min-w-0 sm:flex-[3]"
							/>
							<Button
								variant="ghost"
								size="icon"
								className="col-start-2 row-span-2 row-start-1"
								aria-label={`Remover cabeçalho ${i + 1}`}
								onClick={() => setHeaders((rows) => rows.filter((r) => r.id !== row.id))}
							>
								<X />
							</Button>
						</div>
					))}
					<div>
						<Button
							variant="soft"
							size="sm"
							onClick={() =>
								setHeaders((rows) => [
									...rows,
									{ id: Math.max(0, ...rows.map((r) => r.id)) + 1, key: '', value: '' },
								])
							}
						>
							<Plus /> Adicionar cabeçalho
						</Button>
					</div>
					<p id={`${headersId}-desc`} className="text-fg-muted text-[0.8125rem]">
						Linhas sem nome são ignoradas. O navegador não deixa definir Cookie, Host, Origin e
						afins.
					</p>
				</fieldset>
				{acceptsBody ? (
					<>
						<form.AppField name="bodyType">
							{(f) => <f.RadioField label="Corpo" options={BODY_TYPES} />}
						</form.AppField>
						{bodyType !== 'none' ? (
							<form.AppField name="body">
								{(f) => (
									<f.TextareaField
										label={
											bodyType === 'json'
												? 'JSON'
												: bodyType === 'form'
													? 'Campos (um por linha, chave=valor)'
													: 'Texto'
										}
										rows={7}
										placeholder={
											bodyType === 'json'
												? 'Ex.: {"title":"Comprar pão","done":false}'
												: bodyType === 'form'
													? 'Ex.: nome=Ana\nidade=30'
													: 'Ex.: olá'
										}
									/>
								)}
							</form.AppField>
						) : null}
					</>
				) : null}
				<Alert tone="info">
					<Info />
					<span>
						A requisição sai do seu navegador, direto para a API. Por segurança (CORS), o navegador
						só mostra a resposta se a API permitir chamadas de outros sites. APIs públicas costumam
						permitir; muitas APIs internas não.
					</span>
				</Alert>
			</FormCard>
			<ResultCard
				title="Resposta"
				empty={!response}
				emptyText="Preencha a URL e clique em “Enviar requisição”."
				copyText={response?.ok && !response.binary ? response.body : undefined}
				onClear={() => send.reset()}
				action={
					response?.curl ? (
						<CopyButton value={response.curl} label="Copiar como curl" variant="secondary" />
					) : undefined
				}
			>
				{response?.ignoredHeaders.length ? (
					<Alert tone="warning">
						<TriangleAlert />O navegador não envia {response.ignoredHeaders.join(', ')}: foram
						ignorados.
					</Alert>
				) : null}
				{response?.ok ? (
					<>
						<DataList
							columns={3}
							items={[
								{
									label: 'Status',
									value: (
										<span className="flex flex-wrap items-center gap-2">
											{response.status}
											<Badge
												tone={
													statusClass(response.status) === '2xx'
														? 'success'
														: statusClass(response.status) === '3xx'
															? 'neutral'
															: 'danger'
												}
											>
												{response.statusText || statusClass(response.status)}
											</Badge>
										</span>
									),
								},
								{ label: 'Tempo', value: `${formatNumber(Math.round(response.ms))} ms` },
								{ label: 'Tamanho', value: formatBytes(response.bytes) },
							]}
						/>
						<details className="rounded-control bg-surface-muted px-4 py-3">
							<summary className="text-fg cursor-pointer text-sm font-semibold">
								Cabeçalhos da resposta ({response.headers.length})
							</summary>
							<dl className="mt-3 flex flex-col gap-1.5 font-mono text-[0.8125rem]">
								{response.headers.map(([name, value]) => (
									<div key={name} className="break-all" translate="no">
										<dt className="text-fg-muted inline">{name}: </dt>
										<dd className="text-fg inline">{value}</dd>
									</div>
								))}
							</dl>
							<p className="text-fg-muted mt-3 text-[0.8125rem]">
								O navegador só mostra os cabeçalhos que a API libera em
								Access-Control-Expose-Headers.
							</p>
						</details>
						{response.binary ? (
							<p className="text-fg-muted text-[0.9375rem]">
								Corpo binário ({response.contentType}), não exibido.
							</p>
						) : response.body ? (
							<OutputBlock className="max-h-[32rem]">
								<span translate="no">{response.body}</span>
							</OutputBlock>
						) : (
							<p className="text-fg-muted text-[0.9375rem]">Resposta sem corpo.</p>
						)}
					</>
				) : response ? (
					<Alert tone="danger">
						<CircleX />
						<span>
							{response.error}
							{response.cors ? (
								<> Use o botão “Copiar como curl” para testar no terminal, onde não há CORS.</>
							) : null}
						</span>
					</Alert>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
