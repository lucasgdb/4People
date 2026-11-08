/** Uniform random integer in [0, max) using the Web Crypto API. */
export function randomInt(max: number): number {
	const buffer = new Uint32Array(1)
	const limit = Math.floor(0x1_0000_0000 / max) * max
	let value: number
	do {
		crypto.getRandomValues(buffer)
		value = buffer[0] ?? 0
	} while (value >= limit)
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

/**
 * `count` integers in [min, max] from the CSPRNG. With `unique`, a partial Fisher–Yates draw, so a
 * raffle never repeats a number and every number has the same chance.
 */
export function randomIntegers(min: number, max: number, count: number, unique: boolean): number[] {
	const size = max - min + 1
	if (unique && count > size) throw new Error(`Só há ${size} números entre ${min} e ${max}.`)
	if (!unique) return Array.from({ length: count }, () => min + randomInt(size))
	if (size <= 100_000) {
		const pool = Array.from({ length: size }, (_, i) => min + i)
		for (let i = 0; i < count; i += 1) {
			const j = i + randomInt(size - i)
			;[pool[i], pool[j]] = [pool[j] as number, pool[i] as number]
		}
		return pool.slice(0, count)
	}
	const picked = new Set<number>()
	while (picked.size < count) picked.add(min + randomInt(size))
	return [...picked]
}
