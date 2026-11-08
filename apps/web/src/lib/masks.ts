/**
 * Input masks: format as the user types, keeping what they typed when it doesn't fit the pattern.
 * `#` is a digit, `X` is a digit or the letter X (RG check digit); anything else is a literal.
 */
export type Mask = string

export const MASKS = {
	cpf: '###.###.###-##',
	cnpj: '##.###.###/####-##',
	rg: '##.###.###-X',
	cep: '#####-###',
	cnh: '###########',
	pis: '###.#####.##-#',
	renavam: '###########',
	voterId: '#### #### ####',
	card: '#### #### #### #### ###',
	date: '##/##/####',
	time: '##:##',
} as const satisfies Record<string, Mask>

const accepts = (slot: string, char: string) =>
	slot === '#' ? /\d/.test(char) : slot === 'X' ? /[\dXx]/.test(char) : false

export function applyMask(value: string, mask: Mask): string {
	const chars = [...value].filter((char) => /[\dXx]/.test(char))
	let out = ''
	let index = 0
	for (const slot of mask) {
		if (index >= chars.length) break
		if (slot === '#' || slot === 'X') {
			const char = chars[index] ?? ''
			if (!accepts(slot, char)) break
			out += slot === 'X' ? char.toUpperCase() : char
			index += 1
		} else {
			out += slot
		}
	}
	return out
}
