const toHex = (bytes: Uint8Array) =>
	[...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('')

/** Random UUID v4 (122 random bits) from the browser's CSPRNG. */
export const uuidV4 = () => crypto.randomUUID()

const MAX_V7_SEQUENCE = 0xfff

/** Monotonic state for v7: the last timestamp used and its 12-bit sequence (RFC 9562, method 1). */
let lastTimestampMs = -1
let sequence = 0

function nextV7Timestamp(nowMs: number): number {
	let timestampMs = Math.max(nowMs, lastTimestampMs)
	if (timestampMs === lastTimestampMs) {
		sequence += 1
		if (sequence > MAX_V7_SEQUENCE) {
			timestampMs += 1
			sequence = 0
		}
	} else {
		// A random start keeps IDs from different tabs unlikely to collide.
		sequence = (crypto.getRandomValues(new Uint16Array(1))[0] ?? 0) & 0x7ff
	}
	lastTimestampMs = timestampMs
	return timestampMs
}

/**
 * UUID v7 (RFC 9562): 48-bit Unix timestamp in ms, then a 12-bit counter, then random bits. Sorts by
 * creation time, which keeps database indexes compact; IDs made in the same millisecond still sort
 * in creation order because the counter increments (and borrows the next millisecond if it wraps).
 */
export function uuidV7(now = Date.now()): string {
	const timestampMs = nextV7Timestamp(now)
	const bytes = crypto.getRandomValues(new Uint8Array(16))

	let remainingTime = BigInt(timestampMs)
	for (let index = 5; index >= 0; index -= 1) {
		bytes[index] = Number(remainingTime & 0xffn)
		remainingTime >>= 8n
	}
	bytes[6] = 0x70 | (sequence >> 8) // version 7 + high 4 bits of the counter
	bytes[7] = sequence & 0xff
	bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80 // RFC variant

	const hex = toHex(bytes)
	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

export const HASH_ALGORITHMS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const
export type HashAlgorithm = (typeof HASH_ALGORITHMS)[number]

/** Hex digest of the UTF-8 text with the Web Crypto API. */
export async function hashText(text: string, algorithm: HashAlgorithm): Promise<string> {
	const digest = await crypto.subtle.digest(algorithm, new TextEncoder().encode(text))
	return toHex(new Uint8Array(digest))
}

/* -------------------------------- MD5 and CRC32 -------------------------------- */
// Not in the Web Crypto API (MD5 is broken for security), but still asked for to compare checksums.

const MD5_SHIFTS = [
	7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14,
	20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6,
	10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
]
const MD5_CONSTANTS = Array.from(
	{ length: 64 },
	(_, index) => Math.floor(Math.abs(Math.sin(index + 1)) * 2 ** 32) >>> 0,
)
const MD5_BLOCK_BYTES = 64

/** Message + 0x80 + zero padding + 64-bit little-endian bit length, in whole 64-byte blocks. */
function md5PaddedMessage(input: Uint8Array): DataView {
	const paddedLength = ((input.length + 8) >>> 6) * MD5_BLOCK_BYTES + MD5_BLOCK_BYTES
	const bytes = new Uint8Array(paddedLength)
	bytes.set(input)
	bytes[input.length] = 0x80
	const view = new DataView(bytes.buffer)
	view.setUint32(paddedLength - 8, (input.length * 8) >>> 0, true)
	view.setUint32(paddedLength - 4, Math.floor(input.length / 0x20000000), true)
	return view
}

/** MD5 (RFC 1321) of the UTF-8 text, as hex. Variable names follow the RFC. */
export function md5(text: string): string {
	const message = md5PaddedMessage(new TextEncoder().encode(text))

	let [a0, b0, c0, d0] = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]
	for (let block = 0; block < message.byteLength; block += MD5_BLOCK_BYTES) {
		let [a, b, c, d] = [a0, b0, c0, d0]
		for (let round = 0; round < 64; round += 1) {
			let f: number
			let wordIndex: number
			if (round < 16) [f, wordIndex] = [(b & c) | (~b & d), round]
			else if (round < 32) [f, wordIndex] = [(d & b) | (~d & c), (5 * round + 1) % 16]
			else if (round < 48) [f, wordIndex] = [b ^ c ^ d, (3 * round + 5) % 16]
			else [f, wordIndex] = [c ^ (b | ~d), (7 * round) % 16]
			const word = message.getUint32(block + wordIndex * 4, true)
			const sum = (a + f + (MD5_CONSTANTS[round] ?? 0) + word) >>> 0
			const shift = MD5_SHIFTS[round] ?? 0
			;[a, d, c] = [d, c, b]
			b = (b + ((sum << shift) | (sum >>> (32 - shift)))) >>> 0
		}
		;[a0, b0, c0, d0] = [(a0 + a) >>> 0, (b0 + b) >>> 0, (c0 + c) >>> 0, (d0 + d) >>> 0]
	}

	const digest = new DataView(new ArrayBuffer(16))
	for (const [index, word] of [a0, b0, c0, d0].entries()) digest.setUint32(index * 4, word, true)
	return toHex(new Uint8Array(digest.buffer))
}

const CRC32_POLYNOMIAL = 0xedb88320

const CRC32_TABLE = Array.from({ length: 256 }, (_, byte) => {
	let crc = byte
	for (let bit = 0; bit < 8; bit += 1) {
		crc = crc & 1 ? CRC32_POLYNOMIAL ^ (crc >>> 1) : crc >>> 1
	}
	return crc >>> 0
})

/** CRC-32 (IEEE 802.3, the zip/PNG one) of the UTF-8 text, as 8 hex digits. */
export function crc32(text: string): string {
	let crc = 0xffffffff
	for (const byte of new TextEncoder().encode(text)) {
		crc = (CRC32_TABLE[(crc ^ byte) & 0xff] ?? 0) ^ (crc >>> 8)
	}
	return ((crc ^ 0xffffffff) >>> 0).toString(16).padStart(8, '0')
}
