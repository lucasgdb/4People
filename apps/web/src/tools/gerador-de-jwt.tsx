'use client'

import { Alert, Button, CopyButton, cn } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { CircleX, KeyRound, LoaderCircle } from 'lucide-react'
import { useDeferredValue, useEffect, useState } from 'react'
import { useAppForm } from '@/components/form/form'
import {
	type AlgorithmFamily,
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

const FAMILY_DESCRIPTIONS: Record<AlgorithmFamily, string> = {
	HS: 'HMAC + segredo',
	RS: 'RSA PKCS#1 v1.5',
	PS: 'RSA-PSS',
	ES: 'ECDSA',
}

const ALGORITHM_OPTIONS = JWT_ALGORITHMS.map((alg) => ({
	value: alg,
	label: `${alg} · ${FAMILY_DESCRIPTIONS[algorithmFamily(alg)]}`,
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

type FormValues = typeof DEFAULTS
type Outcome = { ok: true; token: string } | { ok: false; error: string } | null

/** Applies `edit` to a JSON object text; null when the text doesn't parse, so it stays as typed. */
function rewriteJsonObject(
	text: string,
	edit: (value: Record<string, unknown>) => void,
): string | null {
	try {
		const value = parseJsonObject(text, 'payload')
		edit(value)
		return JSON.stringify(value, null, 2)
	} catch {
		return null
	}
}

/** Signs the token described by the form. Throws in Portuguese on invalid JSON or a missing key. */
function signFromForm(values: FormValues): Promise<string> {
	const header = parseJsonObject(values.header, 'header')
	const payload = parseJsonObject(values.payload, 'payload')
	const usesSecret = algorithmFamily(values.alg) === 'HS'
	const key = usesSecret ? values.secret : values.privateKey
	if (!key.trim()) {
		throw new Error(
			usesSecret
				? 'Informe o segredo para assinar.'
				: 'Cole a chave privada (PKCS#8 ou JWK) ou clique em "Gerar par de chaves".',
		)
	}
	return signJwt(header, payload, values.alg, { key, base64Secret: values.base64Secret })
}

/** RFC 7518 §3.2: an HMAC key should be at least as long as the hash output. */
const minimumSecretBytes = (alg: JwtAlgorithm) => Number(alg.slice(2)) / 8

function ColoredToken({ token }: { token: string }) {
	const parts = token.split('.')
	return (
		<>
			<ul className="text-fg-muted flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem]">
				{PART_LABELS.map((label, partIndex) => (
					<li key={label} className="flex items-center gap-1.5">
						<span aria-hidden="true" className={cn('font-mono font-bold', PART_STYLES[partIndex])}>
							■
						</span>
						{label}
					</li>
				))}
			</ul>
			<OutputBlock className="break-all">
				<span translate="no">
					{parts.map((part, partIndex) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: the three fixed parts of a token
						<span key={partIndex}>
							{partIndex > 0 ? <span className="text-fg">.</span> : null}
							<span className={PART_STYLES[partIndex]}>{part}</span>
						</span>
					))}
				</span>
			</OutputBlock>
		</>
	)
}

/** Builds and signs a JWT like jwt.io's encoder (HS, RS, PS, ES) with Web Crypto. */
export default function JwtGenerator() {
	const form = useAppForm({ defaultValues: DEFAULTS })
	const values = useStore(form.store, (state) => state.values)
	const deferredValues = useDeferredValue(values)
	const family = algorithmFamily(values.alg)
	const [pair, setPair] = useState<GeneratedKeyPair | null>(null)
	const [generating, setGenerating] = useState(false)
	const [jsonNotice, setJsonNotice] = useState('')
	const [outcome, setOutcome] = useState<Outcome>(null)

	// Signing is async (Web Crypto) and runs only on the client, so the server renders no token.
	useEffect(() => {
		let cancelled = false
		// async so that signFromForm's synchronous throws become rejections.
		const sign = async () => signFromForm(deferredValues)
		sign()
			.then((token) => !cancelled && setOutcome({ ok: true, token }))
			.catch((error: Error) => !cancelled && setOutcome({ ok: false, error: error.message }))
		return () => {
			cancelled = true
		}
	}, [deferredValues])

	function setPayloadTime(claim: 'iat' | 'exp', offsetSeconds: number) {
		const nowSeconds = Math.floor(Date.now() / 1000)
		const rewritten = rewriteJsonObject(form.getFieldValue('payload'), (payload) => {
			payload[claim] = nowSeconds + offsetSeconds
		})
		if (!rewritten) {
			setJsonNotice('Corrija o JSON do payload antes de adicionar a data.')
			return
		}
		form.setFieldValue('payload', rewritten)
		setJsonNotice('')
	}

	function fillRandomSecret() {
		form.setFieldValue('secret', randomSecret(values.alg))
		form.setFieldValue('base64Secret', true)
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

	const showPublicKey = pair && family !== 'HS' && values.privateKey === pair.privateKey

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
							const rewritten = rewriteJsonObject(form.getFieldValue('header'), (header) => {
								header.alg = value
							})
							if (rewritten) form.setFieldValue('header', rewritten)
							// An RSA pair serves RS* and PS*; an EC pair only its own curve.
							if (pair && (algorithmFamily(value) === 'ES' || family === 'ES')) setPair(null)
						},
					}}
				>
					{(field) => <field.SelectField label="Algoritmo" options={ALGORITHM_OPTIONS} />}
				</form.AppField>
				<form.AppField name="header">
					{(field) => (
						<field.TextareaField
							label="Header (JSON)"
							rows={4}
							placeholder='Ex.: { "alg": "HS256", "typ": "JWT" }'
							description="O campo alg segue o algoritmo escolhido."
						/>
					)}
				</form.AppField>
				<div className="flex flex-col gap-2">
					<form.AppField name="payload">
						{(field) => (
							<field.TextareaField
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
							{(field) => (
								<field.TextField
									label="Segredo"
									placeholder="Ex.: um-segredo-longo-e-aleatorio"
									description={`Use pelo menos ${minimumSecretBytes(values.alg)} bytes para ${values.alg}.`}
								/>
							)}
						</form.AppField>
						<div className="flex flex-wrap items-center justify-between gap-3">
							<form.AppField name="base64Secret">
								{(field) => <field.CheckboxField label="Segredo em Base64" />}
							</form.AppField>
							<Button variant="ghost" size="sm" onClick={fillRandomSecret}>
								<KeyRound /> Gerar segredo aleatório
							</Button>
						</div>
					</>
				) : (
					<div className="flex flex-col gap-2">
						<form.AppField name="privateKey">
							{(field) => (
								<field.TextareaField
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
				{outcome?.ok === true && (
					<>
						<div className="flex flex-col gap-2">
							<div className="flex flex-wrap items-center justify-between gap-2">
								<h3 className="text-fg text-sm font-semibold">Token</h3>
								<CopyButton variant="primary" value={outcome.token} label="Copiar token" />
							</div>
							<ColoredToken token={outcome.token} />
						</div>
						{showPublicKey ? (
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
