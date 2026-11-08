'use client'

import { Alert, Button, CopyButton, cn } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { CircleX, KeyRound, LoaderCircle } from 'lucide-react'
import { useDeferredValue, useEffect, useState } from 'react'
import { useAppForm } from '@/components/form/form'
import {
	algorithmFamily,
	type GeneratedKeyPair,
	generateKeyPair,
	JWT_ALGORITHMS,
	type JwtAlgorithm,
	parseJsonObject,
	randomSecret,
	signJwt,
} from '@/lib/algorithms/jwt'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const ALGORITHM_OPTIONS = JWT_ALGORITHMS.map((alg) => ({
	value: alg,
	label: `${alg} · ${
		{ HS: 'HMAC + segredo', RS: 'RSA PKCS#1 v1.5', PS: 'RSA-PSS', ES: 'ECDSA' }[
			algorithmFamily(alg)
		]
	}`,
}))

const DEFAULTS = {
	alg: 'HS256' as JwtAlgorithm,
	header: JSON.stringify({ alg: 'HS256', typ: 'JWT' }, null, 2),
	payload: JSON.stringify({ sub: '1234567890', name: 'Ana Souza', admin: true }, null, 2),
	secret: 'um-segredo-com-pelo-menos-256-bits!',
	base64Secret: false,
	privateKey: '',
}

const PART_STYLES = ['text-danger-ink', 'text-accent-soft-fg', 'text-success-ink'] as const
const PART_LABELS = ['Header', 'Payload', 'Assinatura'] as const

type Outcome = { ok: true; token: string } | { ok: false; error: string } | null

/** Rewrites a JSON object field, keeping the user's text when it doesn't parse. */
function editJson(text: string, edit: (value: Record<string, unknown>) => void): string | null {
	try {
		const value = parseJsonObject(text, 'payload')
		edit(value)
		return JSON.stringify(value, null, 2)
	} catch {
		return null
	}
}

/** Builds and signs a JWT like jwt.io's encoder (HS, RS, PS, ES) with Web Crypto. */
export default function JwtGenerator() {
	const form = useAppForm({ defaultValues: DEFAULTS })
	const values = useStore(form.store, (state) => state.values)
	const deferred = useDeferredValue(values)
	const family = algorithmFamily(values.alg)
	const [pair, setPair] = useState<GeneratedKeyPair | null>(null)
	const [generating, setGenerating] = useState(false)
	const [jsonNotice, setJsonNotice] = useState('')
	const [outcome, setOutcome] = useState<Outcome>(null)

	// Signing is async (Web Crypto) and runs only on the client, so the server renders no token.
	useEffect(() => {
		let cancelled = false
		const run = async () => {
			const header = parseJsonObject(deferred.header, 'header')
			const payload = parseJsonObject(deferred.payload, 'payload')
			const isHs = algorithmFamily(deferred.alg) === 'HS'
			const key = isHs ? deferred.secret : deferred.privateKey
			if (!key.trim()) {
				throw new Error(
					isHs
						? 'Informe o segredo para assinar.'
						: 'Cole a chave privada (PKCS#8 ou JWK) ou clique em "Gerar par de chaves".',
				)
			}
			return signJwt(header, payload, deferred.alg, { key, base64Secret: deferred.base64Secret })
		}
		run()
			.then((token) => !cancelled && setOutcome({ ok: true, token }))
			.catch((error: Error) => !cancelled && setOutcome({ ok: false, error: error.message }))
		return () => {
			cancelled = true
		}
	}, [deferred])

	function setPayloadTime(claim: 'iat' | 'exp', offsetSeconds: number) {
		const now = Math.floor(Date.now() / 1000)
		const next = editJson(form.getFieldValue('payload'), (value) => {
			value[claim] = now + offsetSeconds
		})
		if (next) {
			form.setFieldValue('payload', next)
			setJsonNotice('')
		} else setJsonNotice('Corrija o JSON do payload antes de adicionar a data.')
	}

	async function makePair() {
		setGenerating(true)
		try {
			const generated = await generateKeyPair(values.alg)
			setPair(generated)
			form.setFieldValue('privateKey', generated.privateKey)
		} catch (error) {
			setOutcome({ ok: false, error: (error as Error).message })
		} finally {
			setGenerating(false)
		}
	}

	const parts = outcome?.ok ? outcome.token.split('.') : []
	const showPublic = pair && family !== 'HS' && values.privateKey === pair.privateKey

	return (
		<ToolLayout>
			<FormCard
				title="Monte o token"
				onSubmit={() => undefined}
				actions={
					<p className="text-fg-muted text-[0.8125rem]">
						Assina enquanto você digita. Nada sai do seu navegador.
					</p>
				}
			>
				<form.AppField
					name="alg"
					listeners={{
						// Keep the header's "alg" in sync with the chosen algorithm.
						onChange: ({ value }) => {
							const next = editJson(form.getFieldValue('header'), (header) => {
								header.alg = value
							})
							if (next) form.setFieldValue('header', next)
							// An RSA pair serves RS* and PS*; an EC pair only its own curve.
							if (pair && (algorithmFamily(value) === 'ES' || family === 'ES')) setPair(null)
						},
					}}
				>
					{(f) => <f.SelectField label="Algoritmo" options={ALGORITHM_OPTIONS} />}
				</form.AppField>
				<form.AppField name="header">
					{(f) => (
						<f.TextareaField
							label="Header (JSON)"
							rows={4}
							placeholder='Ex.: { "alg": "HS256", "typ": "JWT" }'
							description="O campo alg segue o algoritmo escolhido."
						/>
					)}
				</form.AppField>
				<div className="flex flex-col gap-2">
					<form.AppField name="payload">
						{(f) => (
							<f.TextareaField
								label="Payload (JSON)"
								rows={8}
								placeholder='Ex.: { "sub": "42", "name": "Ana" }'
							/>
						)}
					</form.AppField>
					<div className="flex flex-wrap gap-2">
						<Button variant="secondary" size="sm" onClick={() => setPayloadTime('iat', 0)}>
							iat = agora
						</Button>
						<Button variant="secondary" size="sm" onClick={() => setPayloadTime('exp', 3600)}>
							exp = daqui a 1 hora
						</Button>
						<Button variant="secondary" size="sm" onClick={() => setPayloadTime('exp', 86400)}>
							exp = daqui a 1 dia
						</Button>
					</div>
					{jsonNotice ? <p className="text-danger-ink text-[0.8125rem]">{jsonNotice}</p> : null}
				</div>
				{family === 'HS' ? (
					<>
						<form.AppField name="secret">
							{(f) => (
								<f.TextField
									label="Segredo"
									placeholder="Ex.: um-segredo-longo-e-aleatorio"
									description={`Use pelo menos ${Number(values.alg.slice(2)) / 8} bytes para ${values.alg}.`}
								/>
							)}
						</form.AppField>
						<div className="flex flex-wrap items-center justify-between gap-3">
							<form.AppField name="base64Secret">
								{(f) => <f.CheckboxField label="Segredo em Base64" />}
							</form.AppField>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => {
									form.setFieldValue('secret', randomSecret(values.alg))
									form.setFieldValue('base64Secret', true)
								}}
							>
								<KeyRound /> Gerar segredo aleatório
							</Button>
						</div>
					</>
				) : (
					<div className="flex flex-col gap-2">
						<form.AppField name="privateKey">
							{(f) => (
								<f.TextareaField
									label="Chave privada"
									rows={6}
									placeholder={
										'Ex.: -----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg…\n-----END PRIVATE KEY-----'
									}
									description="PEM PKCS#8 (BEGIN PRIVATE KEY) ou JWK privado em JSON."
								/>
							)}
						</form.AppField>
						<Button
							variant="secondary"
							size="sm"
							className="self-start"
							disabled={generating}
							onClick={makePair}
						>
							{generating ? <LoaderCircle className="animate-spin" /> : <KeyRound />}
							Gerar par de chaves ({family === 'ES' ? 'curva EC' : 'RSA 2048'})
						</Button>
					</div>
				)}
			</FormCard>
			<ResultCard
				title="Token assinado"
				empty={!outcome}
				emptyText="O token assinado aparece aqui."
			>
				{outcome?.ok ? (
					<>
						{/* Each block owns its copy button, in its own header row. */}
						<div className="flex flex-col gap-2">
							<div className="flex flex-wrap items-center justify-between gap-2">
								<h3 className="text-fg text-sm font-semibold">Token</h3>
								<CopyButton variant="primary" value={outcome.token} label="Copiar token" />
							</div>
							<ul className="text-fg-muted flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem]">
								{PART_LABELS.map((label, i) => (
									<li key={label} className="flex items-center gap-1.5">
										<span aria-hidden="true" className={cn('font-mono font-bold', PART_STYLES[i])}>
											■
										</span>
										{label}
									</li>
								))}
							</ul>
							<OutputBlock className="break-all">
								<span translate="no">
									{parts.map((part, i) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: the three fixed parts of a token
										<span key={i}>
											{i > 0 ? <span className="text-fg">.</span> : null}
											<span className={PART_STYLES[i]}>{part}</span>
										</span>
									))}
								</span>
							</OutputBlock>
						</div>
						{showPublic ? (
							<div className="border-border flex flex-col gap-2 border-t pt-5">
								<div className="flex flex-wrap items-center justify-between gap-2">
									<h3 className="text-fg text-sm font-semibold">Chave pública (para verificar)</h3>
									<CopyButton value={pair.publicKey} label="Copiar chave" />
								</div>
								<OutputBlock>
									<span translate="no">{pair.publicKey}</span>
								</OutputBlock>
								<p className="text-fg-muted text-[0.8125rem]">
									Chaves geradas no navegador, só para testes. Não use em produção.
								</p>
							</div>
						) : null}
					</>
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
