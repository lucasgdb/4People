/** Random UUID v4 (122 random bits) from the browser's CSPRNG. */
export const uuidV4 = () => crypto.randomUUID()

/** Monotonic state for v7: the last timestamp used and its 12-bit sequence (RFC 9562, method 1). */
let lastMs = -1
let sequence = 0

/**
 * UUID v7 (RFC 9562): 48-bit Unix timestamp in ms, then a 12-bit counter, then random bits. Sorts by
 * creation time, which keeps database indexes compact; IDs made in the same millisecond still sort
 * in creation order because the counter increments (and borrows the next millisecond if it wraps).
 */
export function uuidV7(now = Date.now()): string {
	let ms = Math.max(now, lastMs)
	if (ms === lastMs) {
		sequence += 1
		if (sequence > 0xfff) {
			ms += 1
			sequence = 0
		}
	} else {
		// A random start keeps IDs from different tabs unlikely to collide.
		sequence = (crypto.getRandomValues(new Uint16Array(1))[0] ?? 0) & 0x7ff
	}
	lastMs = ms

	const bytes = crypto.getRandomValues(new Uint8Array(16))
	let time = BigInt(ms)
	for (let i = 5; i >= 0; i -= 1) {
		bytes[i] = Number(time & 0xffn)
		time >>= 8n
	}
	bytes[6] = 0x70 | (sequence >> 8) // version 7 + high 4 bits of the counter
	bytes[7] = sequence & 0xff
	bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80 // RFC variant
	const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('')
	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

export const HASH_ALGORITHMS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const
export type HashAlgorithm = (typeof HASH_ALGORITHMS)[number]

/** Hex digest of the UTF-8 text with the Web Crypto API. */
export async function hashText(text: string, algorithm: HashAlgorithm): Promise<string> {
	const digest = await crypto.subtle.digest(algorithm, new TextEncoder().encode(text))
	return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

/* --------------------------------- MD5 e CRC32 --------------------------------- */
// Not in the Web Crypto API (MD5 is broken for security), but still asked for to compare checksums.

const MD5_SHIFTS = [
	7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14,
	20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6,
	10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
]
const MD5_K = Array.from(
	{ length: 64 },
	(_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32) >>> 0,
)

/** MD5 (RFC 1321) of the UTF-8 text, as hex. */
export function md5(text: string): string {
	const input = new TextEncoder().encode(text)
	const length = ((input.length + 8) >>> 6) * 64 + 64
	const bytes = new Uint8Array(length)
	bytes.set(input)
	bytes[input.length] = 0x80
	const view = new DataView(bytes.buffer)
	view.setUint32(length - 8, (input.length * 8) >>> 0, true)
	view.setUint32(length - 4, Math.floor(input.length / 0x20000000), true)

	let [a0, b0, c0, d0] = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]
	for (let chunk = 0; chunk < length; chunk += 64) {
		let [a, b, c, d] = [a0, b0, c0, d0]
		for (let i = 0; i < 64; i += 1) {
			let f: number
			let g: number
			if (i < 16) [f, g] = [(b & c) | (~b & d), i]
			else if (i < 32) [f, g] = [(d & b) | (~d & c), (5 * i + 1) % 16]
			else if (i < 48) [f, g] = [b ^ c ^ d, (3 * i + 5) % 16]
			else [f, g] = [c ^ (b | ~d), (7 * i) % 16]
			const sum = (a + f + (MD5_K[i] ?? 0) + view.getUint32(chunk + g * 4, true)) >>> 0
			const shift = MD5_SHIFTS[i] ?? 0
			;[a, d, c] = [d, c, b]
			b = (b + ((sum << shift) | (sum >>> (32 - shift)))) >>> 0
		}
		;[a0, b0, c0, d0] = [(a0 + a) >>> 0, (b0 + b) >>> 0, (c0 + c) >>> 0, (d0 + d) >>> 0]
	}
	const out = new DataView(new ArrayBuffer(16))
	for (const [i, word] of [a0, b0, c0, d0].entries()) out.setUint32(i * 4, word, true)
	return [...new Uint8Array(out.buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
	let c = n
	for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
	return c >>> 0
})

/** CRC-32 (IEEE 802.3, the zip/PNG one) of the UTF-8 text, as 8 hex digits. */
export function crc32(text: string): string {
	let crc = 0xffffffff
	for (const byte of new TextEncoder().encode(text))
		crc = (CRC_TABLE[(crc ^ byte) & 0xff] ?? 0) ^ (crc >>> 8)
	return ((crc ^ 0xffffffff) >>> 0).toString(16).padStart(8, '0')
}
