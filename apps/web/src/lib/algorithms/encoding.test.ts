import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { applyMask, MASKS } from '../masks.ts'
import { hashText, uuidV4, uuidV7 } from './crypto.ts'
import {
	base64Decode,
	base64Encode,
	binaryToText,
	convertBase,
	decodeJwt,
	formatJson,
	textToBinary,
	urlDecode,
	urlEncode,
} from './encoding.ts'

describe('encoding', () => {
	it('base64 round-trips UTF-8 and supports the URL-safe alphabet', () => {
		assert.equal(base64Encode('Olá, mundo!'), 'T2zDoSwgbXVuZG8h')
		assert.equal(base64Decode('T2zDoSwgbXVuZG8h'), 'Olá, mundo!')
		assert.equal(base64Encode('??>', { urlSafe: true }), 'Pz8-')
		assert.equal(base64Decode('Pz8-'), '??>')
		assert.throws(() => base64Decode('não é base64!'))
	})
	it('url encode/decode', () => {
		assert.equal(urlEncode('a b&c=ç', 'component'), 'a%20b%26c%3D%C3%A7')
		assert.equal(urlEncode('https://x.com/a b?q=1', 'full'), 'https://x.com/a%20b?q=1')
		assert.equal(urlDecode('a+b%20%C3%A7'), 'a b ç')
		assert.throws(() => urlDecode('%E0%A4%A'))
	})
	it('decodes a JWT and reads its time claims', () => {
		const header = base64Encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }), { urlSafe: true })
		const payload = base64Encode(JSON.stringify({ sub: '42', name: 'Ana', exp: 1_700_000_000 }), {
			urlSafe: true,
		})
		const jwt = decodeJwt(`${header}.${payload}.sig`, new Date('2030-01-01'))
		assert.equal(jwt.header.alg, 'HS256')
		assert.equal(jwt.payload.name, 'Ana')
		assert.equal(jwt.expired, true)
		assert.throws(() => decodeJwt('abc'))
	})
	it('formats JSON and locates syntax errors', () => {
		assert.deepEqual(formatJson('{"a":1}', 2), { ok: true, output: '{\n  "a": 1\n}' })
		assert.deepEqual(formatJson('{ "a": 1 }', 0), { ok: true, output: '{"a":1}' })
		const bad = formatJson('{\n  "a": 1,\n}', 2)
		assert.equal(bad.ok, false)
		if (!bad.ok) assert.equal(bad.line, 3)
	})
	it('binary and number bases', () => {
		assert.equal(textToBinary('A'), '01000001')
		assert.equal(binaryToText(textToBinary('Olá, 4People!')), 'Olá, 4People!')
		assert.throws(() => binaryToText('0102'))
		assert.equal(convertBase('255', 10, 16), 'ff')
		assert.equal(convertBase('0xFF', 16, 2), '11111111')
		assert.equal(convertBase('0b10', 16, 10), '2832') // hex digits, not a binary prefix
		assert.equal(convertBase('0b101', 2, 10), '5')
		assert.equal(convertBase('-1010', 2, 10), '-10')
		assert.equal(convertBase('ffffffffffffffffffff', 16, 10), '1208925819614629174706175')
		assert.throws(() => convertBase('102', 2, 10))
	})
	it('masks', () => {
		assert.equal(applyMask('52998224725', MASKS.cpf), '529.982.247-25')
		assert.equal(applyMask('01310200', MASKS.cep), '01310-200')
		assert.equal(applyMask('24678131x', MASKS.rg), '24.678.131-X')
	})
})

describe('crypto', () => {
	it('uuid v4 and v7 have the right version, variant and order', () => {
		assert.match(uuidV4(), /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
		const a = uuidV7(1_700_000_000_000)
		const b = uuidV7(1_700_000_000_001)
		assert.match(a, /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
		assert.ok(a < b, 'v7 sorts by time')
		assert.ok(a.startsWith('018bcfe5-6800'))
		// Same millisecond: still strictly increasing (monotonic counter).
		const batch = Array.from({ length: 500 }, () => uuidV7(1_800_000_000_000))
		assert.deepEqual([...batch].sort(), batch)
		assert.equal(new Set(batch).size, batch.length)
	})
	it('hashes with Web Crypto', async () => {
		assert.equal(
			await hashText('abc', 'SHA-256'),
			'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
		)
		assert.equal(await hashText('', 'SHA-1'), 'da39a3ee5e6b4b0d3255bfef95601890afd80709')
	})
})
