'use client'

import { Alert, Badge, Button, CopyButton, DataList, Input } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { CircleCheck, CircleX, Info, Plus, TriangleAlert, X } from 'lucide-react'
import { type ClipboardEvent, useId, useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import {
	type BodyType,
	type BuiltRequest,
	buildRequest,
	byteLength,
	explainFetchError,
	formatBytes,
	HTTP_METHODS,
	type KeyValue,
	parseCurl,
	prettyBody,
	statusClass,
	toCurl,
} from '@/lib/algorithms/web'
import { formatNumber } from '@/lib/format'
import { JsonCode } from './_shared/json-code'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const METHOD_OPTIONS = HTTP_METHODS.map((method) => ({ value: method, label: method }))

const BODY_TYPES = [
	{ value: 'none', label: 'Sem corpo' },
	{ value: 'json', label: 'JSON' },
	{ value: 'text', label: 'Texto' },
	{ value: 'form', label: 'Formulário' },
] as const

/** Label and placeholder of the body field for each body type. */
const BODY_FIELD: Record<Exclude<BodyType, 'none'>, { label: string; placeholder: string }> = {
	json: { label: 'JSON', placeholder: 'Ex.: {"title":"Comprar pão","done":false}' },
	form: { label: 'Campos (um por linha, chave=valor)', placeholder: 'Ex.: nome=Ana\nidade=30' },
	text: { label: 'Texto', placeholder: 'Ex.: olá' },
}

const schema = z.object({
	method: z.enum(HTTP_METHODS),
	url: z.string().trim().min(1, 'Informe a URL da API, como https://api.exemplo.com/usuarios.'),
	bodyType: z.enum(['none', 'json', 'text', 'form']),
	body: z.string(),
})

type Values = z.infer<typeof schema>
type HeaderRow = KeyValue & { id: number }

type RequestOutcome =
	| {
			ok: true
			status: number
			statusText: string
			durationMs: number
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

/** Binary responses are measured, not printed. */
const isBinary = (contentType: string) =>
	/^(image|audio|video|font)\//.test(contentType) ||
	/octet-stream|pdf|zip|protobuf|wasm/.test(contentType)

function statusTone(status: number): 'success' | 'neutral' | 'danger' {
	const statusFamily = statusClass(status)
	if (statusFamily === '2xx') return 'success'
	if (statusFamily === '3xx') return 'neutral'
	return 'danger'
}

/** Reads the body as text, or only measures it when it is binary. */
async function readBody(response: Response, binary: boolean) {
	if (binary) return { text: '', bytes: (await response.blob()).size }
	const text = await response.text()
	return { text, bytes: byteLength(text) }
}

/** Never throws: invalid input, network and CORS errors become a readable outcome. */
async function sendRequest(values: Values, headers: readonly KeyValue[]): Promise<RequestOutcome> {
	let request: BuiltRequest
	try {
		request = buildRequest({ ...values, headers })
	} catch (error) {
		return { ok: false, error: (error as Error).message, cors: false, ignoredHeaders: [] }
	}
	const curl = toCurl(request)
	const startedAt = performance.now()
	try {
		const response = await fetch(request.url, {
			method: request.method,
			headers: request.headers,
			body: request.body,
			signal: AbortSignal.timeout(TIMEOUT_MS),
		})
		const contentType = response.headers.get('content-type') ?? ''
		const binary = isBinary(contentType)
		const { text, bytes } = await readBody(response, binary)
		const durationMs = performance.now() - startedAt
		const pretty = prettyBody(text, contentType)
		return {
			ok: true,
			status: response.status,
			statusText: response.statusText,
			durationMs,
			bytes,
			headers: [...response.headers.entries()],
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
			// fetch() rejects with a TypeError when CORS blocks the response.
			cors: (error as Error)?.name === 'TypeError',
			curl,
			ignoredHeaders: request.ignoredHeaders,
		}
	}
}

function ResponseBody({ outcome }: { outcome: Extract<RequestOutcome, { ok: true }> }) {
	if (outcome.binary) {
		return (
			<p className="text-fg-muted text-[0.9375rem]">
				Corpo binário ({outcome.contentType}), não exibido.
			</p>
		)
	}
	if (!outcome.body) return <p className="text-fg-muted text-[0.9375rem]">Resposta sem corpo.</p>
	if (outcome.json) return <JsonCode json={outcome.body} className="max-h-[32rem]" />
	return (
		<OutputBlock className="max-h-[32rem]">
			<span translate="no">{outcome.body}</span>
		</OutputBlock>
	)
}

/** Sends a request with fetch() from this page and shows status, time, size, headers and body. */
export default function RestApiTester() {
	const [headers, setHeaders] = useState<HeaderRow[]>([
		{ id: 0, key: 'Accept', value: 'application/json' },
	])
	const headersId = useId()
	const [curlNote, setCurlNote] = useState<{ ok: boolean; text: string } | null>(null)

	// React Query tracks the request in flight and keeps the last outcome.
	const send = useMutation({
		mutationKey: ['rest-request'],
		mutationFn: (values: Values) => sendRequest(values, headers),
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
	const removeHeader = (id: number) => setHeaders((rows) => rows.filter((row) => row.id !== id))
	/** Like Postman: a curl command pasted into the URL fills the method, URL, headers and body. */
	function importCurl(event: ClipboardEvent<HTMLInputElement>) {
		const text = event.clipboardData.getData('text')
		let parsed: ReturnType<typeof parseCurl>
		try {
			parsed = parseCurl(text)
		} catch (error) {
			event.preventDefault()
			setCurlNote({ ok: false, text: (error as Error).message })
			return
		}
		if (!parsed) return
		event.preventDefault()
		form.setFieldValue('method', parsed.method)
		form.setFieldValue('url', parsed.url)
		form.setFieldValue('bodyType', parsed.bodyType)
		form.setFieldValue('body', parsed.body)
		setHeaders(parsed.headers.map((header, id) => ({ id, ...header })))
		const headerCount = parsed.headers.length
		const bodyLabel = BODY_TYPES.find((type) => type.value === parsed.bodyType)?.label
		const parts = [
			parsed.method,
			headerCount === 1 ? '1 cabeçalho' : `${headerCount} cabeçalhos`,
			parsed.bodyType === 'none' ? 'sem corpo' : `corpo em ${bodyLabel}`,
		]
		setCurlNote({ ok: true, text: `Comando curl importado: ${parts.join(', ')}.` })
	}
	const addHeader = () =>
		setHeaders((rows) => {
			const nextId = Math.max(0, ...rows.map((row) => row.id)) + 1
			return [...rows, { id: nextId, key: '', value: '' }]
		})

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
						{(field) => <field.SelectField label="Método" options={METHOD_OPTIONS} />}
					</form.AppField>
					<form.AppField name="url">
						{(field) => (
							<field.TextField
								label="URL"
								type="url"
								inputMode="url"
								enterKeyHint="send"
								placeholder="Ex.: https://jsonplaceholder.typicode.com/todos/1"
								description="Ou cole um comando curl: método, cabeçalhos e corpo são preenchidos."
								onPaste={importCurl}
							/>
						)}
					</form.AppField>
				</div>
				{curlNote ? (
					<Alert tone={curlNote.ok ? 'success' : 'danger'} role="status">
						{curlNote.ok ? <CircleCheck /> : <CircleX />}
						<span>{curlNote.text}</span>
					</Alert>
				) : null}
				<fieldset className="flex flex-col gap-2" aria-describedby={`${headersId}-desc`}>
					<legend className="text-fg mb-1 text-sm font-medium">Cabeçalhos</legend>
					{headers.map((row, position) => (
						// Phones: name over value, the remove button beside both; from sm up, one row.
						<div
							key={row.id}
							className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:flex"
						>
							<Input
								aria-label={`Nome do cabeçalho ${position + 1}`}
								placeholder="Ex.: Authorization"
								value={row.key}
								autoComplete="off"
								spellCheck={false}
								onChange={(event) => updateHeader(row.id, { key: event.target.value })}
								className="min-w-0 sm:flex-[2]"
							/>
							<Input
								aria-label={`Valor do cabeçalho ${position + 1}`}
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
								aria-label={`Remover cabeçalho ${position + 1}`}
								onClick={() => removeHeader(row.id)}
							>
								<X />
							</Button>
						</div>
					))}
					<div>
						<Button variant="soft" size="sm" onClick={addHeader}>
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
							{(field) => <field.RadioField label="Corpo" options={BODY_TYPES} />}
						</form.AppField>
						{bodyType === 'json' ? (
							<form.AppField name="body">
								{(field) => (
									<field.JsonField
										label="JSON"
										rows={8}
										placeholder={BODY_FIELD.json.placeholder}
									/>
								)}
							</form.AppField>
						) : bodyType !== 'none' ? (
							<form.AppField name="body">
								{(field) => (
									<field.TextareaField
										label={BODY_FIELD[bodyType].label}
										rows={7}
										placeholder={BODY_FIELD[bodyType].placeholder}
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
				{response?.ok === true && (
					<>
						<DataList
							columns={3}
							items={[
								{
									label: 'Status',
									value: (
										<span className="flex flex-wrap items-center gap-2">
											{response.status}
											<Badge tone={statusTone(response.status)}>
												{response.statusText || statusClass(response.status)}
											</Badge>
										</span>
									),
								},
								{ label: 'Tempo', value: `${formatNumber(Math.round(response.durationMs))} ms` },
								{ label: 'Tamanho', value: formatBytes(response.bytes) },
							]}
						/>
						<details className="rounded-control bg-surface-muted p-4">
							<summary className="text-fg cursor-pointer text-sm font-semibold">
								Cabeçalhos da resposta ({response.headers.length})
							</summary>
							<dl className="mt-4 flex flex-col font-mono text-[0.8125rem]" translate="no">
								{response.headers.map(([name, value]) => (
									<div
										key={name}
										className="border-rule grid gap-1 border-t py-2 first:border-t-0 first:pt-0 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-4"
									>
										<dt className="text-accent-soft-fg font-medium [overflow-wrap:anywhere]">
											{name}
										</dt>
										<dd className="text-fg [overflow-wrap:anywhere]">{value}</dd>
									</div>
								))}
							</dl>
							<p className="text-fg-muted mt-4 text-[0.8125rem]">
								O navegador só mostra os cabeçalhos que a API libera em
								Access-Control-Expose-Headers.
							</p>
						</details>
						<ResponseBody outcome={response} />
					</>
				)}
				{response?.ok === false && (
					<Alert tone="danger">
						<CircleX />
						<span>
							{response.error}
							{response.cors ? (
								<> Use o botão “Copiar como curl” para testar no terminal, onde não há CORS.</>
							) : null}
						</span>
					</Alert>
				)}
			</ResultCard>
		</ToolLayout>
	)
}
