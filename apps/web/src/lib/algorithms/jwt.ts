/**
 * JSON Web Tokens (RFC 7519) and JWS signatures (RFC 7515/7518) with the Web Crypto API only:
 * decode, explain the registered claims, verify and sign HS*, RS*, PS* and ES*. Nothing leaves
 * the browser.
 */
import { relativeTime } from './dev.ts'

/* --------------------------------- bytes ---------------------------------- */

type Bytes = Uint8Array<ArrayBuffer>

const encoder = new TextEncoder()

/** UTF-8 bytes backed by a plain ArrayBuffer, the type Web Crypto expects. */
function utf8(text: string): Bytes {
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
	const paddingLength = (4 - (normalized.length % 4)) % 4
	const binary = atob(normalized + '='.repeat(paddingLength))
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

/** Decodes a Base64URL segment holding a JSON object. `name` is "header" or "payload". */
function decodeJsonSegment(segment: string, name: string): Record<string, unknown> {
	let value: unknown
	try {
		const json = new TextDecoder('utf-8', { fatal: true }).decode(base64ToBytes(segment))
		value = JSON.parse(json)
	} catch {
		throw new Error(
			`O ${name} do token não é um JSON em Base64URL válido. Confira se copiou o token inteiro.`,
		)
	}
	if (!isObject(value)) throw new Error(`O ${name} do token precisa ser um objeto JSON.`)
	return value
}

/** Splits and decodes a compact JWS (header.payload.signature). Throws a message in Portuguese. */
export function decodeJwtParts(token: string): JwtParts {
	const segments = token.trim().replace(/\s/g, '').split('.')
	if (segments.length !== 3) {
		throw new Error(
			`Um JWT tem três partes separadas por ponto (header.payload.assinatura); este tem ${segments.length}.`,
		)
	}
	const [header = '', payload = '', signature = ''] = segments
	return {
		raw: [header, payload, signature],
		header: decodeJsonSegment(header, 'header'),
		payload: decodeJsonSegment(payload, 'payload'),
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

function claimValueAsText(value: unknown): string {
	if (typeof value === 'string') return value
	const isStringList = Array.isArray(value) && value.every((item) => typeof item === 'string')
	if (isStringList) return value.join(', ')
	return JSON.stringify(value)
}

/** The registered claims present in the payload, in a fixed order, explained in Portuguese. */
export function describeClaims(payload: Record<string, unknown>, now: Date): ClaimInfo[] {
	return Object.keys(CLAIM_NAMES)
		.filter((claim) => payload[claim] !== undefined)
		.map((claim) => {
			const label = CLAIM_NAMES[claim] as { name: string; description: string }
			const value = payload[claim]
			const info: ClaimInfo = { claim, ...label, value: claimValueAsText(value) }
			if (TIME_CLAIMS.has(claim) && typeof value === 'number' && Number.isFinite(value)) {
				info.date = new Date(value * 1000)
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
	const expiresAt = typeof payload.exp === 'number' ? new Date(payload.exp * 1000) : null
	const notBefore = typeof payload.nbf === 'number' ? new Date(payload.nbf * 1000) : null
	if (expiresAt && expiresAt.getTime() <= now.getTime())
		return { state: 'expired', since: expiresAt }
	if (notBefore && notBefore.getTime() > now.getTime()) return { state: 'not-yet', from: notBefore }
	if (!expiresAt && !notBefore) return { state: 'no-time' }
	return { state: 'valid', until: expiresAt }
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

/** 256, 384 or 512: the hash size in the algorithm name. */
const hashBits = (alg: JwtAlgorithm) => Number(alg.slice(2)) as 256 | 384 | 512
const hashName = (alg: JwtAlgorithm) => `SHA-${hashBits(alg)}`
/** ES512 uses P-521, not a typo. */
const CURVE_BY_HASH_BITS = { 256: 'P-256', 384: 'P-384', 512: 'P-521' } as const
const curveOf = (alg: JwtAlgorithm) => CURVE_BY_HASH_BITS[hashBits(alg)]

function importParams(
	alg: JwtAlgorithm,
): RsaHashedImportParams | EcKeyImportParams | HmacImportParams {
	const hash = hashName(alg)
	switch (algorithmFamily(alg)) {
		case 'HS':
			return { name: 'HMAC', hash }
		case 'RS':
			return { name: 'RSASSA-PKCS1-v1_5', hash }
		case 'PS':
			return { name: 'RSA-PSS', hash }
		case 'ES':
			return { name: 'ECDSA', namedCurve: curveOf(alg) }
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
			return { name: 'RSA-PSS', saltLength: hashBits(alg) / 8 }
		case 'ES':
			// Web Crypto's ECDSA output is r‖s (IEEE P1363), which is exactly the JWS format.
			return { name: 'ECDSA', hash: hashName(alg) }
	}
}

/* ---------------------------------- keys ---------------------------------- */

type ParsedKey = { kind: 'pem'; label: string; der: Bytes } | { kind: 'jwk'; jwk: JsonWebKey }

/** Reads a PEM block or a JWK (or a JWKS, picking `kid` or the first key). */
export function parseKeyText(text: string, kid?: unknown): ParsedKey {
	const trimmed = text.trim()
	if (!trimmed) throw new Error('Informe a chave.')
	return trimmed.startsWith('{') ? parseJwkText(trimmed, kid) : parsePemText(trimmed)
}

function parseJwkText(text: string, kid: unknown): ParsedKey {
	let json: unknown
	try {
		json = JSON.parse(text)
	} catch {
		throw new Error('A chave parece um JWK, mas o JSON é inválido. Confira aspas e vírgulas.')
	}
	if (isObject(json) && Array.isArray(json.keys)) {
		const keys = json.keys.filter(isObject)
		const chosen = keys.find((key) => kid !== undefined && key.kid === kid) ?? keys[0]
		if (!chosen) throw new Error('O JWKS não tem nenhuma chave em "keys".')
		return { kind: 'jwk', jwk: chosen as JsonWebKey }
	}
	if (!isObject(json) || typeof json.kty !== 'string') {
		throw new Error('Um JWK precisa do campo "kty" (RSA, EC ou oct).')
	}
	return { kind: 'jwk', jwk: json as JsonWebKey }
}

function parsePemText(text: string): ParsedKey {
	const match = /-----BEGIN ([A-Z0-9 ]+)-----([\s\S]*?)-----END \1-----/.exec(text)
	if (!match) {
		throw new Error(
			'Formato de chave não reconhecido. Cole um PEM (-----BEGIN PUBLIC KEY----- …) ou um JWK em JSON.',
		)
	}
	const [, label = '', base64Body = ''] = match
	let der: Bytes
	try {
		der = base64ToBytes(base64Body)
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

/** PEM labels Web Crypto can't import, with the openssl command that converts them. */
const UNSUPPORTED_PEM_HINTS: Record<string, string> = {
	'RSA PUBLIC KEY':
		'Esta é uma chave PKCS#1 (BEGIN RSA PUBLIC KEY). Use o formato SPKI (BEGIN PUBLIC KEY): openssl rsa -RSAPublicKey_in -in chave.pem -pubout.',
	'RSA PRIVATE KEY':
		'Esta é uma chave PKCS#1 (BEGIN RSA PRIVATE KEY). Converta para PKCS#8: openssl pkcs8 -topk8 -nocrypt -in chave.pem.',
	'EC PRIVATE KEY':
		'Esta é uma chave SEC1 (BEGIN EC PRIVATE KEY). Converta para PKCS#8: openssl pkcs8 -topk8 -nocrypt -in chave.pem.',
	CERTIFICATE:
		'Isto é um certificado. Extraia a chave pública: openssl x509 -pubkey -noout -in certificado.pem.',
}

export type KeyInput = {
	/** HS*: the shared secret. RS/PS/ES: a PEM (SPKI to verify, PKCS#8 to sign) or a JWK. */
	key: string
	/** HS* only: the secret is written in Base64. */
	base64Secret?: boolean
}

type KeyUsage = 'sign' | 'verify'

const PRIVATE_JWK_FIELDS = ['d', 'p', 'q', 'dp', 'dq', 'qi', 'oth'] as const
const METADATA_JWK_FIELDS = ['alg', 'key_ops', 'use', 'ext', 'kid', 'x5c', 'x5t', 'x5u'] as const

/** Leaves only what Web Crypto needs, so a key tagged with another `alg` or `key_ops` still imports. */
function cleanJwk(jwk: JsonWebKey, usage: KeyUsage): JsonWebKey {
	const copy: Record<string, unknown> = { ...jwk }
	for (const field of METADATA_JWK_FIELDS) delete copy[field]
	if (usage === 'verify' && jwk.kty !== 'oct') {
		for (const field of PRIVATE_JWK_FIELDS) delete copy[field]
	}
	return copy as JsonWebKey
}

const KEY_TYPE_BY_FAMILY: Record<AlgorithmFamily, string> = {
	HS: 'oct',
	RS: 'RSA',
	PS: 'RSA',
	ES: 'EC',
}

/** A message about the key itself, worded for the user; anything else is a Web Crypto failure. */
class KeyError extends Error {}

function importJwk(alg: JwtAlgorithm, jwk: JsonWebKey, usage: KeyUsage) {
	const expectedKeyType = KEY_TYPE_BY_FAMILY[algorithmFamily(alg)]
	if (jwk.kty !== expectedKeyType) {
		throw new KeyError(`${alg} precisa de uma chave ${expectedKeyType}; este JWK é ${jwk.kty}.`)
	}
	if (usage === 'sign' && !jwk.d) {
		throw new KeyError('Este JWK é público. Para assinar, use a chave privada (com o campo "d").')
	}
	return crypto.subtle.importKey('jwk', cleanJwk(jwk, usage), importParams(alg), false, [usage])
}

/** Verifying takes an SPKI public key; signing a PKCS#8 private key. */
function importPem(alg: JwtAlgorithm, label: string, der: Bytes, usage: KeyUsage) {
	const hint = UNSUPPORTED_PEM_HINTS[label]
	if (hint) throw new KeyError(hint)
	if (usage === 'verify' && label !== 'PUBLIC KEY') {
		throw new KeyError('Para verificar, use a chave pública (-----BEGIN PUBLIC KEY-----).')
	}
	if (usage === 'sign' && label !== 'PRIVATE KEY') {
		throw new KeyError('Para assinar, use a chave privada em PKCS#8 (-----BEGIN PRIVATE KEY-----).')
	}
	const format = usage === 'verify' ? 'spki' : 'pkcs8'
	return crypto.subtle.importKey(format, der, importParams(alg), false, [usage])
}

async function importAsymmetric(
	alg: JwtAlgorithm,
	keyText: string,
	usage: KeyUsage,
	kid?: unknown,
) {
	const parsed = parseKeyText(keyText, kid)
	try {
		if (parsed.kind === 'jwk') return await importJwk(alg, parsed.jwk, usage)
		return await importPem(alg, parsed.label, parsed.der, usage)
	} catch (error) {
		if (error instanceof KeyError) throw error
		throw new Error(
			algorithmFamily(alg) === 'ES'
				? `A chave não é uma chave EC válida para ${alg} (curva ${curveOf(alg)}).`
				: `A chave não é uma chave RSA válida para ${alg}.`,
		)
	}
}

function decodeBase64Secret(secret: string): Bytes {
	let bytes: Bytes
	try {
		bytes = base64ToBytes(secret.trim())
	} catch {
		throw new Error(
			'O segredo não é Base64 válido. Desmarque "Segredo em Base64" se ele for texto puro.',
		)
	}
	if (bytes.length === 0) throw new Error('O segredo em Base64 está vazio.')
	return bytes
}

async function importSecret(alg: JwtAlgorithm, secret: string, isBase64: boolean, usage: KeyUsage) {
	if (!secret) throw new Error('Informe o segredo.')
	const bytes = isBase64 ? decodeBase64Secret(secret) : utf8(secret)
	return crypto.subtle.importKey('raw', bytes, importParams(alg), false, [usage])
}

function importKeyFor(
	alg: JwtAlgorithm,
	{ key, base64Secret = false }: KeyInput,
	usage: KeyUsage,
	kid?: unknown,
) {
	if (algorithmFamily(alg) === 'HS') return importSecret(alg, key, base64Secret, usage)
	return importAsymmetric(alg, key, usage, kid)
}

/* ------------------------------ verify / sign ------------------------------ */

export type VerifyResult =
	| { status: 'valid'; alg: JwtAlgorithm }
	| { status: 'invalid'; alg: JwtAlgorithm }

/** Verifies the signature with the algorithm named in the header. Throws for bad input. */
export async function verifyJwt(token: string, keyInput: KeyInput): Promise<VerifyResult> {
	const { raw, header } = decodeJwtParts(token)
	const alg = header.alg
	if (alg === 'none') {
		throw new Error('O token usa "alg": "none" e não tem assinatura para verificar.')
	}
	if (!isJwtAlgorithm(alg)) {
		throw new Error(
			`Algoritmo não suportado: ${String(alg)}. Suportados: ${JWT_ALGORITHMS.join(', ')}.`,
		)
	}
	const cryptoKey = await importKeyFor(alg, keyInput, 'verify', header.kid)
	const [encodedHeader, encodedPayload, encodedSignature] = raw
	let signature: Bytes
	try {
		signature = base64ToBytes(encodedSignature)
	} catch {
		return { status: 'invalid', alg }
	}
	const signingInput = utf8(`${encodedHeader}.${encodedPayload}`)
	const isValid = await crypto.subtle.verify(signParams(alg), cryptoKey, signature, signingInput)
	return { status: isValid ? 'valid' : 'invalid', alg }
}

/** Parses JSON text that must be an object, with a message that says where it broke. */
export function parseJsonObject(text: string, name: string): Record<string, unknown> {
	let value: unknown
	try {
		value = JSON.parse(text)
	} catch (error) {
		const position = Number(/position (\d+)/.exec((error as Error).message)?.[1])
		if (Number.isNaN(position)) {
			throw new Error(`O JSON do ${name} é inválido. Confira aspas e vírgulas.`)
		}
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
	keyInput: KeyInput,
): Promise<string> {
	const cryptoKey = await importKeyFor(alg, keyInput, 'sign')
	const signingInput = `${base64UrlJson({ ...header, alg })}.${base64UrlJson(payload)}`
	const signature = await crypto.subtle.sign(signParams(alg), cryptoKey, utf8(signingInput))
	return `${signingInput}.${base64UrlEncode(new Uint8Array(signature))}`
}

export type GeneratedKeyPair = { privateKey: string; publicKey: string }

/** A fresh key pair for RS/PS (RSA 2048) or ES (matching curve), as PKCS#8 and SPKI PEM. */
export async function generateKeyPair(alg: JwtAlgorithm): Promise<GeneratedKeyPair> {
	const family = algorithmFamily(alg)
	if (family === 'HS') throw new Error('HS* usa um segredo compartilhado, não um par de chaves.')
	const params =
		family === 'ES'
			? { name: 'ECDSA', namedCurve: curveOf(alg) }
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
	const bytes = new Uint8Array(hashBits(alg) / 8)
	crypto.getRandomValues(bytes)
	return base64UrlEncode(bytes)
}
