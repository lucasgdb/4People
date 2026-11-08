const UINT32_RANGE = 0x1_0000_0000
/** Above this range size, unique draws use a Set instead of building the whole pool. */
const MAX_SHUFFLE_POOL_SIZE = 100_000

/** Uniform random integer in [0, max) using the Web Crypto API. */
export function randomInt(max: number): number {
	const buffer = new Uint32Array(1)
	// Values at or above the largest multiple of `max` are rejected, so every result is equally likely.
	const unbiasedLimit = Math.floor(UINT32_RANGE / max) * max
	let value: number
	do {
		crypto.getRandomValues(buffer)
		value = buffer[0] ?? 0
	} while (value >= unbiasedLimit)
	return value % max
}

export function randomDigits(length: number): number[] {
	return Array.from({ length }, () => randomInt(10))
}

export function pick<T>(items: readonly T[]): T {
	return items[randomInt(items.length)] as T
}

export function onlyDigits(value: string): string {
	return value.replace(/\D/g, '')
}

/** Partial Fisher–Yates shuffle: the first `count` items of the shuffled range. */
function shuffledSample(min: number, rangeSize: number, count: number): number[] {
	const pool = Array.from({ length: rangeSize }, (_, offset) => min + offset)
	for (let index = 0; index < count; index += 1) {
		const swapIndex = index + randomInt(rangeSize - index)
		;[pool[index], pool[swapIndex]] = [pool[swapIndex] as number, pool[index] as number]
	}
	return pool.slice(0, count)
}

function rejectionSample(min: number, rangeSize: number, count: number): number[] {
	const picked = new Set<number>()
	while (picked.size < count) picked.add(min + randomInt(rangeSize))
	return [...picked]
}

/**
 * `count` integers in [min, max] from the CSPRNG. With `unique`, no number repeats and every number
 * still has the same chance.
 */
export function randomIntegers(min: number, max: number, count: number, unique: boolean): number[] {
	const rangeSize = max - min + 1
	if (unique && count > rangeSize) {
		throw new Error(`Só há ${rangeSize} números entre ${min} e ${max}.`)
	}
	if (!unique) return Array.from({ length: count }, () => min + randomInt(rangeSize))
	if (rangeSize <= MAX_SHUFFLE_POOL_SIZE) return shuffledSample(min, rangeSize, count)
	return rejectionSample(min, rangeSize, count)
}
