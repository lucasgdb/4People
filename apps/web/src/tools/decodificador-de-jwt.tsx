'use client'

import { Alert, Badge, Button, cn } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { CircleAlert, CircleCheck, CircleX, ShieldQuestion } from 'lucide-react'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { useAppForm } from '@/components/form/form'
import {
	algorithmFamily,
	decodeJwtParts,
	describeClaims,
	isJwtAlgorithm,
	tokenTimeStatus,
	verifyJwt,
} from '@/lib/algorithms/jwt'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

// The jwt.io example: HS256 signed with this secret.
const EXAMPLE = {
	token:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
	secret: 'your-256-bit-secret',
}

const dateTime = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeStyle: 'medium' })

/** Header, payload and signature in three ink colours, each also named in the legend. */
const PART_STYLES = [
	{ label: 'Header', className: 'text-danger-ink' },
	{ label: 'Payload', className: 'text-accent-soft-fg' },
	{ label: 'Assinatura', className: 'text-success-ink' },
] as const

function ColoredToken({ parts }: { parts: readonly string[] }) {
	return (
		<div className="flex flex-col gap-2">
			<ul className="text-fg-muted flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem]">
				{PART_STYLES.map((part) => (
					<li key={part.label} className="flex items-center gap-1.5">
						<span aria-hidden="true" className={cn('font-mono font-bold', part.className)}>
							■
						</span>
						{part.label}
					</li>
				))}
			</ul>
			<OutputBlock className="break-all">
				<span translate="no">
					{parts.map((part, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: the three fixed parts of a token
						<span key={i}>
							{i > 0 ? <span className="text-fg">.</span> : null}
							<span className={PART_STYLES[i]?.className}>{part}</span>
						</span>
					))}
				</span>
			</OutputBlock>
		</div>
	)
}

type Verification =
	| { status: 'idle'; reason: string }
	| { status: 'checking' }
	| { status: 'valid' | 'invalid' }
	| { status: 'error'; message: string }

function SignatureBadge({ verification }: { verification: Verification }) {
	if (verification.status === 'valid')
		return (
			<Badge tone="success">
				<CircleCheck aria-hidden="true" /> Assinatura válida
			</Badge>
		)
	if (verification.status === 'invalid')
		return (
			<Badge tone="danger">
				<CircleX aria-hidden="true" /> Assinatura inválida
			</Badge>
		)
	return (
		<Badge tone="neutral">
			<ShieldQuestion aria-hidden="true" />
			{verification.status === 'checking' ? 'Verificando…' : 'Assinatura não verificada'}
		</Badge>
	)
}

/** Decodes a JWT like jwt.io and verifies its signature (HS, RS, PS, ES) with Web Crypto. */
export default function JwtDecoder() {
	const form = useAppForm({
		defaultValues: { token: '', secret: '', base64Secret: false, publicKey: '' },
	})
	const values = useStore(form.store, (state) => state.values)
	const token = useDeferredValue(values.token.trim())

	const decoded = useMemo(() => {
		if (!token) return null
		try {
			const parts = decodeJwtParts(token)
			// Only computed on the client, after the user typed: no server/client clock mismatch.
			const now = new Date()
			return {
				ok: true as const,
				...parts,
				claims: describeClaims(parts.payload, now),
				time: tokenTimeStatus(parts.payload, now),
			}
		} catch (error) {
			return { ok: false as const, error: (error as Error).message }
		}
	}, [token])

	const alg = decoded?.ok ? decoded.header.alg : undefined
	const family = isJwtAlgorithm(alg) ? algorithmFamily(alg) : null
	const key = useDeferredValue(family === 'HS' ? values.secret : values.publicKey)
	const base64Secret = values.base64Secret

	const [verification, setVerification] = useState<Verification>({ status: 'idle', reason: '' })
	useEffect(() => {
		if (!decoded?.ok) return
		if (!family) {
			setVerification({
				status: 'idle',
				reason:
					alg === 'none'
						? 'O token usa "alg": "none": não há assinatura para verificar.'
						: `Algoritmo não suportado: ${String(alg)}.`,
			})
			return
		}
		if (!key.trim()) {
			setVerification({
				status: 'idle',
				reason:
					family === 'HS'
						? 'Informe o segredo para verificar a assinatura.'
						: 'Informe a chave pública para verificar a assinatura.',
			})
			return
		}
		let cancelled = false
		setVerification({ status: 'checking' })
		verifyJwt(token, { key, base64Secret })
			.then((result) => {
				if (!cancelled) setVerification({ status: result.status })
			})
			.catch((error: Error) => {
				if (!cancelled) setVerification({ status: 'error', message: error.message })
			})
		return () => {
			cancelled = true
		}
	}, [decoded, family, alg, key, base64Secret, token])

	const payloadJson = decoded?.ok ? JSON.stringify(decoded.payload, null, 2) : ''

	return (
		<ToolLayout>
			<FormCard
				title="Cole o token"
				onSubmit={() => undefined}
				actions={
					<>
						<Button
							variant="secondary"
							size="sm"
							onClick={() => {
								form.setFieldValue('token', EXAMPLE.token)
								form.setFieldValue('secret', EXAMPLE.secret)
								form.setFieldValue('base64Secret', false)
							}}
						>
							Usar exemplo
						</Button>
						<p className="text-fg-muted text-[0.8125rem]">
							Atualiza enquanto você digita. Nada sai do seu navegador.
						</p>
					</>
				}
			>
				<form.AppField name="token">
					{(f) => (
						<f.TextareaField
							label="Token JWT"
							rows={7}
							placeholder="Ex.: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MiJ9.assinatura"
						/>
					)}
				</form.AppField>
				<fieldset className="border-border flex flex-col gap-4 border-t pt-5">
					<legend className="text-fg pr-2 text-base font-semibold">Verificar assinatura</legend>
					{family === 'HS' ? (
						<>
							<form.AppField name="secret">
								{(f) => (
									<f.TextField
										label={`Segredo (${String(alg)})`}
										placeholder="Ex.: your-256-bit-secret"
										description="O mesmo segredo usado para assinar o token."
									/>
								)}
							</form.AppField>
							<form.AppField name="base64Secret">
								{(f) => (
									<f.CheckboxField
										label="Segredo em Base64"
										description="Marque se o segredo foi gerado como bytes e escrito em Base64."
									/>
								)}
							</form.AppField>
						</>
					) : family ? (
						<form.AppField name="publicKey">
							{(f) => (
								<f.TextareaField
									label={`Chave pública (${String(alg)})`}
									rows={6}
									placeholder={
										'Ex.: -----BEGIN PUBLIC KEY-----\nMIIBIjANBg…\n-----END PUBLIC KEY-----'
									}
									description="PEM (SPKI, BEGIN PUBLIC KEY) ou JWK em JSON. Um JWKS também serve: usamos a chave com o mesmo kid."
								/>
							)}
						</form.AppField>
					) : (
						<p className="text-fg-muted text-[0.9375rem]">
							Cole um token: o campo da chave aparece conforme o algoritmo do header (HS, RS, PS ou
							ES).
						</p>
					)}
				</fieldset>
			</FormCard>
			<ResultCard
				title="Token decodificado"
				empty={!decoded}
				emptyText="Cole um JWT e ele é decodificado aqui."
				copyText={decoded?.ok ? payloadJson : undefined}
				onClear={() => form.reset()}
			>
				{decoded?.ok ? (
					<>
						<div className="flex flex-wrap items-center gap-2">
							<SignatureBadge verification={verification} />
							{decoded.time.state === 'expired' ? (
								<Badge tone="danger">Expirado</Badge>
							) : decoded.time.state === 'not-yet' ? (
								<Badge tone="danger">Ainda não válido</Badge>
							) : decoded.time.state === 'valid' ? (
								<Badge tone="success">Válido (dentro do prazo)</Badge>
							) : (
								<Badge tone="neutral">Sem data de expiração</Badge>
							)}
						</div>
						{verification.status === 'error' ? (
							<Alert tone="danger">
								<CircleX />
								{verification.message}
							</Alert>
						) : verification.status === 'invalid' ? (
							<Alert tone="danger">
								<CircleX />A assinatura não confere: o token foi alterado ou a chave/segredo não é o
								usado para assinar.
							</Alert>
						) : verification.status === 'idle' && verification.reason ? (
							<Alert tone="info">
								<CircleAlert />
								{verification.reason}
							</Alert>
						) : null}
						<ColoredToken parts={decoded.raw} />
						<h3 className="text-fg text-sm font-semibold">Header</h3>
						<OutputBlock className="text-danger-ink">
							<span translate="no">{JSON.stringify(decoded.header, null, 2)}</span>
						</OutputBlock>
						<h3 className="text-fg text-sm font-semibold">Payload</h3>
						<OutputBlock className="text-accent-soft-fg">
							<span translate="no">{payloadJson}</span>
						</OutputBlock>
						{decoded.claims.length > 0 ? (
							<>
								<h3 className="text-fg text-sm font-semibold">Claims registradas</h3>
								<ul className="border-border rounded-panel divide-border divide-y border">
									{decoded.claims.map((claim) => (
										<li key={claim.claim} className="flex flex-col gap-1 px-4 py-3">
											<span className="flex flex-wrap items-baseline gap-2">
												<span className="text-fg font-semibold">{claim.name}</span>
												<code translate="no" className="text-fg-muted font-mono text-[0.8125rem]">
													{claim.claim}
												</code>
											</span>
											<span className="text-fg break-all" translate={claim.date ? undefined : 'no'}>
												{claim.date
													? `${dateTime.format(claim.date)} (${claim.relative})`
													: claim.value}
											</span>
											{claim.date ? (
												<span className="text-fg-muted tabular font-mono text-[0.8125rem]">
													{claim.value}
												</span>
											) : null}
											<span className="text-fg-muted text-[0.8125rem]">{claim.description}</span>
										</li>
									))}
								</ul>
							</>
						) : null}
					</>
				) : decoded ? (
					<Alert tone="danger">
						<CircleX />
						{decoded.error}
					</Alert>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
