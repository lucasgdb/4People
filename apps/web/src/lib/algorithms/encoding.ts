import { lineColumn } from './convert.ts'

/* ---------------------------------- Base64 --------------------------------- */
// UTF-8 aware: btoa/atob alone break on characters like "ã".

const toUrlSafeBase64 = (base64: string) =>
	base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

export function base64Encode(text: string, { urlSafe = false } = {}): string {
	const bytes = new TextEncoder().encode(text)
	let binary = ''
	for (const byte of bytes) binary += String.fromCharCode(byte)
	const encoded = btoa(binary)
	return urlSafe ? toUrlSafeBase64(encoded) : encoded
}

/** Decodes standard or URL-safe Base64, with or without padding. */
export function base64Decode(input: string): string {
	const normalized = input.trim().replace(/\s/g, '').replace(/-/g, '+').replace(/_/g, '/')
	if (!/^[A-Za-z0-9+/]*={0,2}$/.test(normalized)) throw new Error('O texto não é Base64 válido.')
	const missingPadding = (4 - (normalized.length % 4)) % 4
	const binary = atob(normalized + '='.repeat(missingPadding))
	const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
	return new TextDecoder('utf-8', { fatal: true }).decode(bytes)
}

/* ----------------------------------- URL ----------------------------------- */

/** `component` escapes everything reserved (a query value); `full` keeps a whole URL navigable. */
export type UrlMode = 'component' | 'full'

export const urlEncode = (text: string, mode: UrlMode) =>
	mode === 'component' ? encodeURIComponent(text) : encodeURI(text)

/** Decodes percent-encoding, reading "+" as a space like form-encoded query strings do. */
export function urlDecode(text: string): string {
	try {
		return decodeURIComponent(text.replace(/\+/g, ' '))
	} catch {
		throw new Error('Há uma sequência % inválida no texto.')
	}
}

/* ----------------------------------- JWT ----------------------------------- */

const TIME_CLAIMS = ['exp', 'iat', 'nbf'] as const

export type DecodedJwt = {
	header: Record<string, unknown>
	payload: Record<string, unknown>
	signature: string
	/** Registered time claims (exp, iat, nbf) as dates, when present. */
	times: { claim: (typeof TIME_CLAIMS)[number]; date: Date }[]
	expired: boolean | null
}

function parseJwtPart(part: string, partName: string): Record<string, unknown> {
	try {
		return JSON.parse(base64Decode(part)) as Record<string, unknown>
	} catch {
		throw new Error(`O ${partName} do token não é um JSON em Base64URL válido.`)
	}
}

/** Decodes (does not verify) a JWT. Verifying needs the secret or public key. */
export function decodeJwt(token: string, now = new Date()): DecodedJwt {
	const parts = token.trim().split('.')
	if (parts.length !== 3) {
		throw new Error('Um JWT tem três partes separadas por ponto: header.payload.assinatura.')
	}
	const [encodedHeader = '', encodedPayload = '', signature = ''] = parts
	const header = parseJwtPart(encodedHeader, 'header')
	const payload = parseJwtPart(encodedPayload, 'payload')
	// JWT times are seconds since the epoch.
	const times = TIME_CLAIMS.filter((claim) => typeof payload[claim] === 'number').map((claim) => ({
		claim,
		date: new Date((payload[claim] as number) * 1000),
	}))
	const expiry = times.find((time) => time.claim === 'exp')
	return { header, payload, signature, times, expired: expiry ? expiry.date < now : null }
}

/* ----------------------------------- JSON ---------------------------------- */

export type JsonResult =
	| { ok: true; output: string }
	| { ok: false; error: string; line?: number; column?: number }

/** Pretty-prints (indent > 0) or minifies (indent = 0) JSON, pointing at the line of a syntax error. */
export function formatJson(input: string, indent: number): JsonResult {
	try {
		return { ok: true, output: JSON.stringify(JSON.parse(input), null, indent || undefined) }
	} catch (error) {
		const message = (error as Error).message
		const position = Number(/position (\d+)/.exec(message)?.[1])
		if (Number.isNaN(position)) return { ok: false, error: message }
		const { line, column } = lineColumn(input, position)
		return { ok: false, error: `JSON inválido na linha ${line}, coluna ${column}.`, line, column }
	}
}

/* ---------------------------------- Binary --------------------------------- */

/** UTF-8 bytes of the text as space-separated 8-bit groups. */
export const textToBinary = (text: string) =>
	[...new TextEncoder().encode(text)].map((byte) => byte.toString(2).padStart(8, '0')).join(' ')

export function binaryToText(binary: string) {
	const groups = binary.trim().split(/\s+/).filter(Boolean)
	if (groups.some((group) => !/^[01]{1,8}$/.test(group))) {
		throw new Error(
			'O código binário deve conter apenas grupos de 0 e 1 (até 8 bits) separados por espaço.',
		)
	}
	const bytes = new Uint8Array(groups.map((group) => Number.parseInt(group, 2)))
	return new TextDecoder().decode(bytes)
}

/* ------------------------------- Number bases ------------------------------ */

const DIGITS = '0123456789abcdefghijklmnopqrstuvwxyz'
const PREFIX_BY_BASE: Record<number, string> = { 2: 'b', 8: 'o', 16: 'x' }

/** Converts an integer between bases 2–36 with BigInt, so long hex or binary values stay exact. */
export function convertBase(value: string, fromBase: number, toBase: number): string {
	let normalized = value.trim().toLowerCase().replace(/[\s_]/g, '')
	// A prefix only counts in its own base: in hex, "0b10" is the number 0xB10, not binary.
	const prefix = PREFIX_BY_BASE[fromBase]
	if (prefix) normalized = normalized.replace(new RegExp(`^([+-]?)0${prefix}`), '$1')
	const negative = normalized.startsWith('-')
	const digits = normalized.replace(/^[+-]/, '')
	if (!digits) throw new Error('Informe um número.')

	let total = 0n
	for (const char of digits) {
		const digit = DIGITS.indexOf(char)
		if (digit < 0 || digit >= fromBase) {
			throw new Error(`"${char}" não é um dígito válido na base ${fromBase}.`)
		}
		total = total * BigInt(fromBase) + BigInt(digit)
	}
	const converted = total.toString(toBase)
	return negative && total !== 0n ? `-${converted}` : converted
}
