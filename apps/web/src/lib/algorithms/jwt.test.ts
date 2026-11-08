import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
	algorithmFamily,
	base64ToBytes,
	base64UrlEncode,
	decodeJwtParts,
	describeClaims,
	generateKeyPair,
	isJwtAlgorithm,
	JWT_ALGORITHMS,
	parseJsonObject,
	parseKeyText,
	randomSecret,
	signJwt,
	tokenTimeStatus,
	toPem,
	verifyJwt,
} from './jwt.ts'

// The jwt.io example token (HS256, secret "your-256-bit-secret").
const JWT_IO =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

const rejectsWith = (promise: Promise<unknown>, pattern: RegExp) =>
	assert.rejects(promise, (error: Error) => pattern.test(error.message))

describe('jwt: decode', () => {
	it('decodes the three parts', () => {
		const { header, payload, raw } = decodeJwtParts(JWT_IO)
		assert.deepEqual(header, { alg: 'HS256', typ: 'JWT' })
		assert.equal(payload.name, 'John Doe')
		assert.equal(raw[2], 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
	})
	it('ignores surrounding whitespace and line breaks', () => {
		assert.equal(decodeJwtParts(`  ${JWT_IO.replace('.', '.\n')}  `).payload.sub, '1234567890')
	})
	it('rejects malformed tokens', () => {
		assert.throws(() => decodeJwtParts('abc'), /três partes/)
		assert.throws(() => decodeJwtParts('a.b.c'), /header/)
		assert.throws(
			() => decodeJwtParts(`${base64UrlEncode(new TextEncoder().encode('[1]'))}.e30.x`),
			/objeto/,
		)
	})
	it('round-trips base64url', () => {
		const bytes = new Uint8Array([0, 251, 255, 62, 63])
		assert.deepEqual([...base64ToBytes(base64UrlEncode(bytes))], [...bytes])
		assert.throws(() => base64ToBytes('a'), /Base64/)
		assert.throws(() => base64ToBytes('ab$c'), /Base64/)
	})
})

describe('jwt: claims', () => {
	const now = new Date('2026-01-10T00:00:00Z')
	it('explains registered claims in order with dates', () => {
		const claims = describeClaims(
			{
				name: 'x',
				aud: ['a', 'b'],
				exp: now.getTime() / 1000 + 3 * 86400,
				iss: 'me',
				iat: now.getTime() / 1000 - 3600,
			},
			now,
		)
		assert.deepEqual(
			claims.map((c) => c.claim),
			['iss', 'aud', 'exp', 'iat'],
		)
		assert.equal(claims[1]?.value, 'a, b')
		assert.equal(claims[2]?.relative, 'em 3 dias')
		assert.equal(claims[3]?.relative, 'há 1 hora')
		assert.equal(claims[0]?.date, undefined)
	})
	it('time status', () => {
		const t = now.getTime() / 1000
		assert.equal(tokenTimeStatus({ exp: t - 1 }, now).state, 'expired')
		assert.equal(tokenTimeStatus({ exp: t }, now).state, 'expired')
		assert.equal(tokenTimeStatus({ exp: t + 10, nbf: t + 5 }, now).state, 'not-yet')
		assert.equal(tokenTimeStatus({ exp: t + 10 }, now).state, 'valid')
		assert.equal(tokenTimeStatus({ nbf: t - 10 }, now).state, 'valid')
		assert.equal(tokenTimeStatus({ sub: 'x' }, now).state, 'no-time')
	})
})

describe('jwt: algorithms and keys', () => {
	it('lists and classifies algorithms', () => {
		assert.equal(JWT_ALGORITHMS.length, 12)
		assert.ok(isJwtAlgorithm('ES512'))
		assert.ok(!isJwtAlgorithm('none'))
		assert.equal(algorithmFamily('PS384'), 'PS')
	})
	it('parses PEM, JWK and JWKS', () => {
		const pem = toPem(new Uint8Array([1, 2, 3]), 'PUBLIC KEY')
		const parsed = parseKeyText(pem)
		assert.equal(parsed.kind, 'pem')
		if (parsed.kind === 'pem') assert.deepEqual([...parsed.der], [1, 2, 3])
		assert.equal(parseKeyText('{"kty":"oct","k":"AA"}').kind, 'jwk')
		const jwks = parseKeyText('{"keys":[{"kty":"RSA","kid":"a"},{"kty":"EC","kid":"b"}]}', 'b')
		assert.equal(jwks.kind === 'jwk' && jwks.jwk.kty, 'EC')
		assert.throws(() => parseKeyText(''), /Informe/)
		assert.throws(() => parseKeyText('{oops'), /JSON/)
		assert.throws(() => parseKeyText('{"a":1}'), /kty/)
		assert.throws(() => parseKeyText('{"keys":[]}'), /nenhuma/)
		assert.throws(() => parseKeyText('chave'), /não reconhecido/)
	})
	it('wraps PEM lines at 64 characters', () => {
		const pem = toPem(new Uint8Array(100), 'PRIVATE KEY')
		const lines = pem.split('\n')
		assert.equal(lines[0], '-----BEGIN PRIVATE KEY-----')
		assert.equal(lines[1]?.length, 64)
		assert.equal(lines.at(-1), '-----END PRIVATE KEY-----')
	})
	it('parses JSON objects with a position', () => {
		assert.deepEqual(parseJsonObject('{"a":1}', 'payload'), { a: 1 })
		assert.throws(() => parseJsonObject('{\n"a":}', 'payload'), /payload/)
		assert.throws(() => parseJsonObject('[1]', 'header'), /objeto/)
	})
	it('random secrets have the hash length', () => {
		assert.equal(base64ToBytes(randomSecret('HS384')).length, 48)
	})
})

describe('jwt: verify and sign', () => {
	it('verifies the jwt.io example', async () => {
		assert.equal((await verifyJwt(JWT_IO, { key: 'your-256-bit-secret' })).status, 'valid')
		assert.equal((await verifyJwt(JWT_IO, { key: 'wrong' })).status, 'invalid')
	})
	it('supports Base64 secrets', async () => {
		const secret = 'segredo-binário'
		const base64 = Buffer.from(secret).toString('base64')
		const token = await signJwt({ typ: 'JWT' }, { a: 1 }, 'HS512', { key: secret })
		assert.equal((await verifyJwt(token, { key: base64, base64Secret: true })).status, 'valid')
		await rejectsWith(verifyJwt(token, { key: '***', base64Secret: true }), /Base64/)
		await rejectsWith(verifyJwt(token, { key: '' }), /segredo/)
	})
	it('rejects alg none and unknown algorithms', async () => {
		const none = `${base64UrlEncode(new TextEncoder().encode('{"alg":"none"}'))}.e30.`
		await rejectsWith(verifyJwt(none, { key: 'x' }), /none/)
		const weird = `${base64UrlEncode(new TextEncoder().encode('{"alg":"XY1"}'))}.e30.x`
		await rejectsWith(verifyJwt(weird, { key: 'x' }), /não suportado/)
	})
	it('keeps header alg in sync when signing', async () => {
		const token = await signJwt({ alg: 'RS256', typ: 'JWT' }, { sub: '1' }, 'HS256', { key: 's' })
		assert.equal(decodeJwtParts(token).header.alg, 'HS256')
	})

	for (const alg of ['RS256', 'PS384', 'ES256', 'ES384', 'ES512'] as const) {
		it(`signs and verifies ${alg} with a generated PEM pair`, async () => {
			const { privateKey, publicKey } = await generateKeyPair(alg)
			assert.match(privateKey, /BEGIN PRIVATE KEY/)
			assert.match(publicKey, /BEGIN PUBLIC KEY/)
			const token = await signJwt({ typ: 'JWT' }, { sub: 'ana' }, alg, { key: privateKey })
			assert.equal((await verifyJwt(token, { key: publicKey })).status, 'valid')
			const tampered = token.replace(
				/\.[^.]+\./,
				`.${base64UrlEncode(new TextEncoder().encode('{"sub":"eva"}'))}.`,
			)
			assert.equal((await verifyJwt(tampered, { key: publicKey })).status, 'invalid')
		})
	}

	it('verifies with a JWK (even a private one) and signs with a private JWK', async () => {
		const pair = (await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, [
			'sign',
			'verify',
		])) as CryptoKeyPair
		const privateJwk = await crypto.subtle.exportKey('jwk', pair.privateKey)
		const publicJwk = await crypto.subtle.exportKey('jwk', pair.publicKey)
		const token = await signJwt({}, { a: 1 }, 'ES256', {
			key: JSON.stringify({ ...privateJwk, alg: 'ES256' }),
		})
		assert.equal((await verifyJwt(token, { key: JSON.stringify(publicJwk) })).status, 'valid')
		assert.equal((await verifyJwt(token, { key: JSON.stringify(privateJwk) })).status, 'valid')
		await rejectsWith(signJwt({}, {}, 'ES256', { key: JSON.stringify(publicJwk) }), /público/)
		await rejectsWith(signJwt({}, {}, 'RS256', { key: JSON.stringify(privateJwk) }), /RSA/)
	})

	it('explains wrong key formats', async () => {
		const { privateKey, publicKey } = await generateKeyPair('RS256')
		const token = await signJwt({}, {}, 'RS256', { key: privateKey })
		await rejectsWith(verifyJwt(token, { key: privateKey }), /chave pública/)
		await rejectsWith(signJwt({}, {}, 'RS256', { key: publicKey }), /chave privada/)
		await rejectsWith(
			verifyJwt(token, { key: publicKey.replace(/PUBLIC KEY/g, 'RSA PUBLIC KEY') }),
			/PKCS#1/,
		)
		const ec = await generateKeyPair('ES256')
		await rejectsWith(verifyJwt(token, { key: ec.publicKey }), /RSA válida/)
		await assert.rejects(generateKeyPair('HS256'), /segredo/)
	})
})
