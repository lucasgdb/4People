/**
 * JSON Web Tokens (RFC 7519) and JWS signatures (RFC 7515/7518) with the Web Crypto API only:
 * decode, explain the registered claims, verify and sign HS*, RS*, PS* and ES*. Nothing leaves
 * the browser.
 */
import { relativeTime } from './dev.ts'

/* --------------------------------- bytes ---------------------------------- */

type Bytes = Uint8Array<ArrayBuffer>

const encoder = new TextEncoder()
const utf8 = (text: string): Bytes => {
	const encoded = encoder.encode(text)
	const bytes = new Uint8Array(encoded.length)
	bytes.set(encoded)
	return bytes
}

function bytesToBase64(bytes: Uint8Array): string {
	let binary = ''
	for (const byte of bytes) binary += String.fromCharCode(byte)
	return btoa(binary)
}

export const base64UrlEncode = (bytes: Uint8Array) =>
	bytesToBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

/** Decodes standard or URL-safe Base64 (padding optional, whitespace ignored). */
export function base64ToBytes(input: string): Bytes {
	const normalized = input.replace(/\s/g, '').replace(/-/g, '+').replace(/_/g, '/')
	if (!/^[A-Za-z0-9+/]*={0,2}$/.test(normalized) || normalized.length % 4 === 1) {
		throw new Error('O texto não é Base64 válido.')
	}
	const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=')
	const binary = atob(padded)
	const bytes = new Uint8Array(binary.length)
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
	return bytes
}

const base64UrlJson = (value: unknown) => base64UrlEncode(utf8(JSON.stringify(value)))

/* --------------------------------- decode --------------------------------- */

export type JwtParts = {
	/** The three Base64URL segments as written in the token. */
	raw: [header: string, payload: string, signature: string]
	header: Record<string, unknown>
	payload: Record<string, unknown>
}

const isObject = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value)

/** Splits and decodes a compact JWS (header.payload.signature). Throws a message in Portuguese. */
export function decodeJwtParts(token: string): JwtParts {
	const parts = token.trim().replace(/\s/g, '').split('.')
	if (parts.length !== 3) {
		throw new Error(
			`Um JWT tem três partes separadas por ponto (header.payload.assinatura); este tem ${parts.length}.`,
		)
	}
	const [rawHeader = '', rawPayload = '', signature = ''] = parts
	const parse = (part: string, name: string) => {
		let value: unknown
		try {
			value = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(base64ToBytes(part)))
		} catch {
			throw new Error(
				`O ${name} do token não é um JSON em Base64URL válido. Confira se copiou o token inteiro.`,
			)
		}
		if (!isObject(value)) throw new Error(`O ${name} do token precisa ser um objeto JSON.`)
		return value
	}
	return {
		raw: [rawHeader, rawPayload, signature],
		header: parse(rawHeader, 'header'),
		payload: parse(rawPayload, 'payload'),
	}
}

/* --------------------------------- claims --------------------------------- */

export const CLAIM_NAMES: Record<string, { name: string; description: string }> = {
	iss: { name: 'Emissor', description: 'Quem emitiu o token (issuer).' },
	sub: {
		name: 'Assunto',
		description: 'A quem o token se refere, em geral o ID do usuário (subject).',
	},
	aud: {
		name: 'Público',
		description: 'Para quem o token foi emitido: o serviço que deve aceitá-lo (audience).',
	},
	exp: {
		name: 'Expira em',
		description: 'Depois deste momento o token não deve mais ser aceito (expiration).',
	},
	nbf: {
		name: 'Válido a partir de',
		description: 'Antes deste momento o token não deve ser aceito (not before).',
	},
	iat: { name: 'Emitido em', description: 'Quando o token foi criado (issued at).' },
	jti: {
		name: 'ID do token',
		description: 'Identificador único, usado para evitar reutilização (JWT ID).',
	},
}

const TIME_CLAIMS = new Set(['exp', 'nbf', 'iat'])

export type ClaimInfo = {
	claim: string
	name: string
	description: string
	/** The value as text (arrays joined, objects as JSON). */
	value: string
	/** For exp/nbf/iat with a numeric value. */
	date?: Date
	/** "há 3 dias", "em 2 horas". */
	relative?: string
}

const asText = (value: unknown) =>
	typeof value === 'string'
		? value
		: Array.isArray(value) && value.every((item) => typeof item === 'string')
			? value.join(', ')
			: JSON.stringify(value)

/** The registered claims present in the payload, in a fixed order, explained in Portuguese. */
export function describeClaims(payload: Record<string, unknown>, now: Date): ClaimInfo[] {
	return Object.keys(CLAIM_NAMES)
		.filter((claim) => payload[claim] !== undefined)
		.map((claim) => {
			const meta = CLAIM_NAMES[claim] as { name: string; description: string }
			const raw = payload[claim]
			const info: ClaimInfo = { claim, ...meta, value: asText(raw) }
			if (TIME_CLAIMS.has(claim) && typeof raw === 'number' && Number.isFinite(raw)) {
				info.date = new Date(raw * 1000)
				info.relative = relativeTime(info.date, now)
			}
			return info
		})
}

export type TokenTimeStatus =
	| { state: 'expired'; since: Date }
	| { state: 'not-yet'; from: Date }
	| { state: 'valid'; until: Date | null }
	| { state: 'no-time' }

/** Validity by time alone (exp and nbf); the signature is a separate question. */
export function tokenTimeStatus(payload: Record<string, unknown>, now: Date): TokenTimeStatus {
	const exp = typeof payload.exp === 'number' ? new Date(payload.exp * 1000) : null
	const nbf = typeof payload.nbf === 'number' ? new Date(payload.nbf * 1000) : null
	if (exp && exp.getTime() <= now.getTime()) return { state: 'expired', since: exp }
	if (nbf && nbf.getTime() > now.getTime()) return { state: 'not-yet', from: nbf }
	if (!exp && !nbf) return { state: 'no-time' }
	return { state: 'valid', until: exp }
}

/* ------------------------------- algorithms ------------------------------- */

export const JWT_ALGORITHMS = [
	'HS256',
	'HS384',
	'HS512',
	'RS256',
	'RS384',
	'RS512',
	'PS256',
	'PS384',
	'PS512',
	'ES256',
	'ES384',
	'ES512',
] as const

export type JwtAlgorithm = (typeof JWT_ALGORITHMS)[number]
export type AlgorithmFamily = 'HS' | 'RS' | 'PS' | 'ES'

export const isJwtAlgorithm = (alg: unknown): alg is JwtAlgorithm =>
	typeof alg === 'string' && (JWT_ALGORITHMS as readonly string[]).includes(alg)

export const algorithmFamily = (alg: JwtAlgorithm) => alg.slice(0, 2) as AlgorithmFamily

const bitsOf = (alg: JwtAlgorithm) => Number(alg.slice(2)) as 256 | 384 | 512
const hashOf = (alg: JwtAlgorithm) => `SHA-${bitsOf(alg)}`
const CURVES = { 256: 'P-256', 384: 'P-384', 512: 'P-521' } as const

function importParams(
	alg: JwtAlgorithm,
): RsaHashedImportParams | EcKeyImportParams | HmacImportParams {
	const hash = hashOf(alg)
	switch (algorithmFamily(alg)) {
		case 'HS':
			return { name: 'HMAC', hash }
		case 'RS':
			return { name: 'RSASSA-PKCS1-v1_5', hash }
		case 'PS':
			return { name: 'RSA-PSS', hash }
		case 'ES':
			return { name: 'ECDSA', namedCurve: CURVES[bitsOf(alg)] }
	}
}

function signParams(alg: JwtAlgorithm): AlgorithmIdentifier | RsaPssParams | EcdsaParams {
	switch (algorithmFamily(alg)) {
		case 'HS':
			return 'HMAC'
		case 'RS':
			return 'RSASSA-PKCS1-v1_5'
		case 'PS':
			// RFC 7518 §3.5: the salt is as long as the hash output.
			return { name: 'RSA-PSS', saltLength: bitsOf(alg) / 8 }
		case 'ES':
			// Web Crypto's ECDSA output is r‖s (IEEE P1363), which is exactly the JWS format.
			return { name: 'ECDSA', hash: hashOf(alg) }
	}
}

/* ---------------------------------- keys ---------------------------------- */

type ParsedKey = { kind: 'pem'; label: string; der: Bytes } | { kind: 'jwk'; jwk: JsonWebKey }

/** Reads a PEM block or a JWK (or a JWKS, picking `kid` or the first key). */
export function parseKeyText(text: string, kid?: unknown): ParsedKey {
	const trimmed = text.trim()
	if (!trimmed) throw new Error('Informe a chave.')
	if (trimmed.startsWith('{')) {
		let json: unknown
		try {
			json = JSON.parse(trimmed)
		} catch {
			throw new Error('A chave parece um JWK, mas o JSON é inválido. Confira aspas e vírgulas.')
		}
		if (isObject(json) && Array.isArray(json.keys)) {
			const keys = json.keys.filter(isObject)
			const match = keys.find((key) => kid !== undefined && key.kid === kid) ?? keys[0]
			if (!match) throw new Error('O JWKS não tem nenhuma chave em "keys".')
			return { kind: 'jwk', jwk: match as JsonWebKey }
		}
		if (!isObject(json) || typeof json.kty !== 'string') {
			throw new Error('Um JWK precisa do campo "kty" (RSA, EC ou oct).')
		}
		return { kind: 'jwk', jwk: json as JsonWebKey }
	}
	const match = /-----BEGIN ([A-Z0-9 ]+)-----([\s\S]*?)-----END \1-----/.exec(trimmed)
	if (!match) {
		throw new Error(
			'Formato de chave não reconhecido. Cole um PEM (-----BEGIN PUBLIC KEY----- …) ou um JWK em JSON.',
		)
	}
	const label = match[1] as string
	let der: Bytes
	try {
		der = base64ToBytes(match[2] as string)
	} catch {
		throw new Error('O conteúdo do PEM não é Base64 válido.')
	}
	return { kind: 'pem', label, der }
}

/** DER bytes → PEM text with 64-character lines. */
export function toPem(der: ArrayBuffer | Uint8Array, label: string): string {
	const base64 = bytesToBase64(der instanceof Uint8Array ? der : new Uint8Array(der))
	const lines = base64.match(/.{1,64}/g) ?? []
	return `-----BEGIN ${label}-----\n${lines.join('\n')}\n-----END ${label}-----`
}

const PKCS1_HINT: Record<string, string> = {
	'RSA PUBLIC KEY':
		'Esta é uma chave PKCS#1 (BEGIN RSA PUBLIC KEY). Use o formato SPKI (BEGIN PUBLIC KEY): openssl rsa -RSAPublicKey_in -in chave.pem -pubout.',
	'RSA PRIVATE KEY':
		'Esta é uma chave PKCS#1 (BEGIN RSA PRIVATE KEY). Converta para PKCS#8: openssl pkcs8 -topk8 -nocrypt -in chave.pem.',
	'EC PRIVATE KEY':
		'Esta é uma chave SEC1 (BEGIN EC PRIVATE KEY). Converta para PKCS#8: openssl pkcs8 -topk8 -nocrypt -in chave.pem.',
	CERTIFICATE:
		'Isto é um certificado. Extraia a chave pública: openssl x509 -pubkey -noout -in certificado.pem.',
}

const PRIVATE_JWK_FIELDS = ['d', 'p', 'q', 'dp', 'dq', 'qi', 'oth'] as const

/** Leaves only what Web Crypto needs, so a key tagged with another `alg` or `key_ops` still imports. */
function cleanJwk(jwk: JsonWebKey, usage: 'sign' | 'verify'): JsonWebKey {
	const copy: Record<string, unknown> = { ...jwk }
	for (const field of ['alg', 'key_ops', 'use', 'ext', 'kid', 'x5c', 'x5t', 'x5u'])
		delete copy[field]
	if (usage === 'verify' && jwk.kty !== 'oct') {
		for (const field of PRIVATE_JWK_FIELDS) delete copy[field]
	}
	return copy as JsonWebKey
}

const FAMILY_KTY: Record<AlgorithmFamily, string> = { HS: 'oct', RS: 'RSA', PS: 'RSA', ES: 'EC' }

/** A message about the key itself, worded for the user; anything else is a Web Crypto failure. */
class KeyError extends Error {}

async function importAsymmetric(
	alg: JwtAlgorithm,
	keyText: string,
	usage: 'sign' | 'verify',
	kid?: unknown,
) {
	const parsed = parseKeyText(keyText, kid)
	const params = importParams(alg)
	const family = algorithmFamily(alg)
	try {
		if (parsed.kind === 'jwk') {
			if (parsed.jwk.kty !== FAMILY_KTY[family]) {
				throw new KeyError(
					`${alg} precisa de uma chave ${FAMILY_KTY[family]}; este JWK é ${parsed.jwk.kty}.`,
				)
			}
			if (usage === 'sign' && !parsed.jwk.d) {
				throw new KeyError(
					'Este JWK é público. Para assinar, use a chave privada (com o campo "d").',
				)
			}
			return await crypto.subtle.importKey('jwk', cleanJwk(parsed.jwk, usage), params, false, [
				usage,
			])
		}
		const hint = PKCS1_HINT[parsed.label]
		if (hint) throw new KeyError(hint)
		const expected = usage === 'verify' ? 'PUBLIC KEY' : 'PRIVATE KEY'
		if (parsed.label !== expected) {
			throw new KeyError(
				usage === 'verify'
					? 'Para verificar, use a chave pública (-----BEGIN PUBLIC KEY-----).'
					: 'Para assinar, use a chave privada em PKCS#8 (-----BEGIN PRIVATE KEY-----).',
			)
		}
		return await crypto.subtle.importKey(
			usage === 'verify' ? 'spki' : 'pkcs8',
			parsed.der,
			params,
			false,
			[usage],
		)
	} catch (error) {
		if (error instanceof KeyError) throw error
		throw new Error(
			family === 'ES'
				? `A chave não é uma chave EC válida para ${alg} (curva ${CURVES[bitsOf(alg)]}).`
				: `A chave não é uma chave RSA válida para ${alg}.`,
		)
	}
}

async function importSecret(
	alg: JwtAlgorithm,
	secret: string,
	base64: boolean,
	usage: 'sign' | 'verify',
) {
	if (!secret) throw new Error('Informe o segredo.')
	let bytes: Bytes
	if (base64) {
		try {
			bytes = base64ToBytes(secret.trim())
		} catch {
			throw new Error(
				'O segredo não é Base64 válido. Desmarque "Segredo em Base64" se ele for texto puro.',
			)
		}
		if (bytes.length === 0) throw new Error('O segredo em Base64 está vazio.')
	} else {
		bytes = utf8(secret)
	}
	return crypto.subtle.importKey('raw', bytes, importParams(alg), false, [usage])
}

export type KeyInput = {
	/** HS*: the shared secret. RS/PS/ES: a PEM (SPKI to verify, PKCS#8 to sign) or a JWK. */
	key: string
	/** HS* only: the secret is written in Base64. */
	base64Secret?: boolean
}

/* ------------------------------ verify / sign ------------------------------ */

export type VerifyResult =
	| { status: 'valid'; alg: JwtAlgorithm }
	| { status: 'invalid'; alg: JwtAlgorithm }

/** Verifies the signature with the algorithm named in the header. Throws for bad input. */
export async function verifyJwt(
	token: string,
	{ key, base64Secret = false }: KeyInput,
): Promise<VerifyResult> {
	const { raw, header } = decodeJwtParts(token)
	const alg = header.alg
	if (alg === 'none')
		throw new Error('O token usa "alg": "none" e não tem assinatura para verificar.')
	if (!isJwtAlgorithm(alg)) {
		throw new Error(
			`Algoritmo não suportado: ${String(alg)}. Suportados: ${JWT_ALGORITHMS.join(', ')}.`,
		)
	}
	const cryptoKey =
		algorithmFamily(alg) === 'HS'
			? await importSecret(alg, key, base64Secret, 'verify')
			: await importAsymmetric(alg, key, 'verify', header.kid)
	let signature: Bytes
	try {
		signature = base64ToBytes(raw[2])
	} catch {
		return { status: 'invalid', alg }
	}
	const ok = await crypto.subtle.verify(
		signParams(alg),
		cryptoKey,
		signature,
		utf8(`${raw[0]}.${raw[1]}`),
	)
	return { status: ok ? 'valid' : 'invalid', alg }
}

/** Parses JSON text that must be an object, with a message that says where it broke. */
export function parseJsonObject(text: string, name: string): Record<string, unknown> {
	let value: unknown
	try {
		value = JSON.parse(text)
	} catch (error) {
		const position = Number(/position (\d+)/.exec((error as Error).message)?.[1])
		if (Number.isNaN(position))
			throw new Error(`O JSON do ${name} é inválido. Confira aspas e vírgulas.`)
		const before = text.slice(0, position)
		const line = before.split('\n').length
		const column = position - before.lastIndexOf('\n')
		throw new Error(`O JSON do ${name} é inválido na linha ${line}, coluna ${column}.`)
	}
	if (!isObject(value)) throw new Error(`O ${name} precisa ser um objeto JSON ({ … }).`)
	return value
}

/** Builds and signs a JWT. The header's `alg` is always set to `alg`. */
export async function signJwt(
	header: Record<string, unknown>,
	payload: Record<string, unknown>,
	alg: JwtAlgorithm,
	{ key, base64Secret = false }: KeyInput,
): Promise<string> {
	const fullHeader = { ...header, alg }
	const cryptoKey =
		algorithmFamily(alg) === 'HS'
			? await importSecret(alg, key, base64Secret, 'sign')
			: await importAsymmetric(alg, key, 'sign')
	const input = `${base64UrlJson(fullHeader)}.${base64UrlJson(payload)}`
	const signature = await crypto.subtle.sign(signParams(alg), cryptoKey, utf8(input))
	return `${input}.${base64UrlEncode(new Uint8Array(signature))}`
}

export type GeneratedKeyPair = { privateKey: string; publicKey: string }

/** A fresh key pair for RS/PS (RSA 2048) or ES (matching curve), as PKCS#8 and SPKI PEM. */
export async function generateKeyPair(alg: JwtAlgorithm): Promise<GeneratedKeyPair> {
	const family = algorithmFamily(alg)
	if (family === 'HS') throw new Error('HS* usa um segredo compartilhado, não um par de chaves.')
	const params =
		family === 'ES'
			? { name: 'ECDSA', namedCurve: CURVES[bitsOf(alg)] }
			: {
					...(importParams(alg) as RsaHashedImportParams),
					modulusLength: 2048,
					publicExponent: new Uint8Array([1, 0, 1]),
				}
	const pair = (await crypto.subtle.generateKey(params, true, ['sign', 'verify'])) as CryptoKeyPair
	const [pkcs8, spki] = await Promise.all([
		crypto.subtle.exportKey('pkcs8', pair.privateKey),
		crypto.subtle.exportKey('spki', pair.publicKey),
	])
	return { privateKey: toPem(pkcs8, 'PRIVATE KEY'), publicKey: toPem(spki, 'PUBLIC KEY') }
}

/** A random secret for HS*, as long as the hash output, in Base64URL. */
export function randomSecret(alg: JwtAlgorithm): string {
	const bytes = new Uint8Array(bitsOf(alg) / 8)
	crypto.getRandomValues(bytes)
	return base64UrlEncode(bytes)
}
