/**
 * Input masks: format as the user types, keeping what they typed when it doesn't fit the pattern.
 * `#` is a digit, `X` is a digit or the letter X (RG check digit), `A` is a digit or any letter
 * (alphanumeric CNPJ); anything else is a literal.
 */
export type Mask = string

export const MASKS = {
	cpf: '###.###.###-##',
	cnpj: 'AA.AAA.AAA/AAAA-##',
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

const SLOT_PATTERNS: Record<string, RegExp> = {
	'#': /\d/,
	X: /[\dXx]/,
	A: /[\dA-Za-z]/,
}

const isSlot = (character: string) => character in SLOT_PATTERNS
const accepts = (slot: string, char: string) => SLOT_PATTERNS[slot]?.test(char) ?? false

export function applyMask(value: string, mask: Mask): string {
	const typeable = mask.includes('A') ? /[\dA-Za-z]/ : /[\dXx]/
	const chars = [...value].filter((char) => typeable.test(char))
	let out = ''
	let index = 0
	for (const slot of mask) {
		if (index >= chars.length) break
		if (isSlot(slot)) {
			const char = chars[index] ?? ''
			if (!accepts(slot, char)) break
			out += slot === '#' ? char : char.toUpperCase()
			index += 1
		} else {
			out += slot
		}
	}
	return out
}
