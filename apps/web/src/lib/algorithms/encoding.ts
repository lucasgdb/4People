/* ---------------------------------- Base64 --------------------------------- */
// UTF-8 aware (btoa/atob alone break on "ã"), with the URL-safe alphabet as an option.

export function base64Encode(text: string, { urlSafe = false } = {}): string {
	const bytes = new TextEncoder().encode(text)
	let binary = ''
	for (const byte of bytes) binary += String.fromCharCode(byte)
	const encoded = btoa(binary)
	return urlSafe ? encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') : encoded
}

export function base64Decode(input: string): string {
	const normalized = input.trim().replace(/\s/g, '').replace(/-/g, '+').replace(/_/g, '/')
	if (!/^[A-Za-z0-9+/]*={0,2}$/.test(normalized)) throw new Error('O texto não é Base64 válido.')
	const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=')
	const binary = atob(padded)
	const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
	return new TextDecoder('utf-8', { fatal: true }).decode(bytes)
}

/* ----------------------------------- URL ----------------------------------- */

/** `component` escapes everything reserved (a query value); `full` keeps a whole URL navigable. */
export type UrlMode = 'component' | 'full'

export const urlEncode = (text: string, mode: UrlMode) =>
	mode === 'component' ? encodeURIComponent(text) : encodeURI(text)

export function urlDecode(text: string): string {
	try {
		return decodeURIComponent(text.replace(/\+/g, ' '))
	} catch {
		throw new Error('Há uma sequência % inválida no texto.')
	}
}

/* ----------------------------------- JWT ----------------------------------- */

export type DecodedJwt = {
	header: Record<string, unknown>
	payload: Record<string, unknown>
	signature: string
	/** Registered time claims (exp, iat, nbf) as dates, when present. */
	times: { claim: 'exp' | 'iat' | 'nbf'; date: Date }[]
	expired: boolean | null
}

/** Decodes (does not verify) a JWT. Verifying needs the secret or public key, which never leaves the server. */
export function decodeJwt(token: string, now = new Date()): DecodedJwt {
	const parts = token.trim().split('.')
	if (parts.length !== 3)
		throw new Error('Um JWT tem três partes separadas por ponto: header.payload.assinatura.')
	const [rawHeader = '', rawPayload = '', signature = ''] = parts
	const parse = (part: string, name: string) => {
		try {
			return JSON.parse(base64Decode(part)) as Record<string, unknown>
		} catch {
			throw new Error(`O ${name} do token não é um JSON em Base64URL válido.`)
		}
	}
	const header = parse(rawHeader, 'header')
	const payload = parse(rawPayload, 'payload')
	const times = (['exp', 'iat', 'nbf'] as const)
		.filter((claim) => typeof payload[claim] === 'number')
		.map((claim) => ({ claim, date: new Date((payload[claim] as number) * 1000) }))
	const exp = times.find((time) => time.claim === 'exp')
	return { header, payload, signature, times, expired: exp ? exp.date < now : null }
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
		const before = input.slice(0, position)
		const line = before.split('\n').length
		const column = position - before.lastIndexOf('\n')
		return { ok: false, error: `JSON inválido na linha ${line}, coluna ${column}.`, line, column }
	}
}

/* ---------------------------------- Binário --------------------------------- */

export const textToBinary = (text: string) =>
	[...new TextEncoder().encode(text)].map((byte) => byte.toString(2).padStart(8, '0')).join(' ')

export function binaryToText(binary: string) {
	const groups = binary.trim().split(/\s+/).filter(Boolean)
	if (groups.some((group) => !/^[01]{1,8}$/.test(group))) {
		throw new Error(
			'O código binário deve conter apenas grupos de 0 e 1 (até 8 bits) separados por espaço.',
		)
	}
	return new TextDecoder().decode(new Uint8Array(groups.map((group) => Number.parseInt(group, 2))))
}

/* ------------------------------ Bases numéricas ----------------------------- */

const DIGITS = '0123456789abcdefghijklmnopqrstuvwxyz'

/** Converts an integer between bases 2–36 with BigInt, so long hex or binary values stay exact. */
export function convertBase(value: string, from: number, to: number): string {
	// A prefix only counts in its own base: in hex, "0b10" is the number 0xB10, not binary.
	const prefix = ({ 2: 'b', 8: 'o', 16: 'x' } as Record<number, string>)[from]
	let clean = value.trim().toLowerCase().replace(/[\s_]/g, '')
	if (prefix) clean = clean.replace(new RegExp(`^([+-]?)0${prefix}`), '$1')
	const negative = clean.startsWith('-')
	const digits = clean.replace(/^[+-]/, '')
	if (!digits) throw new Error('Informe um número.')
	let total = 0n
	for (const char of digits) {
		const digit = DIGITS.indexOf(char)
		if (digit < 0 || digit >= from)
			throw new Error(`"${char}" não é um dígito válido na base ${from}.`)
		total = total * BigInt(from) + BigInt(digit)
	}
	const out = total.toString(to)
	return negative && total !== 0n ? `-${out}` : out
}
