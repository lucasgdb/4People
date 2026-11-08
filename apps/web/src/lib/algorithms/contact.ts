import { pick, randomInt } from './random.ts'

/**
 * Correios CEP ranges per state, as 5-digit prefixes [first, last]. AM, DF and GO are split in two
 * because RR and the GO/DF border cities sit inside their ranges.
 */
export const CEP_RANGES: Record<string, ReadonlyArray<readonly [number, number]>> = {
	SP: [[1000, 19999]],
	RJ: [[20000, 28999]],
	ES: [[29000, 29999]],
	MG: [[30000, 39999]],
	BA: [[40000, 48999]],
	SE: [[49000, 49999]],
	PE: [[50000, 56999]],
	AL: [[57000, 57999]],
	PB: [[58000, 58999]],
	RN: [[59000, 59999]],
	CE: [[60000, 63999]],
	PI: [[64000, 64999]],
	MA: [[65000, 65999]],
	PA: [[66000, 68899]],
	AP: [[68900, 68999]],
	AM: [
		[69000, 69299],
		[69400, 69899],
	],
	RR: [[69300, 69399]],
	AC: [[69900, 69999]],
	DF: [
		[70000, 72799],
		[73000, 73699],
	],
	GO: [
		[72800, 72999],
		[73700, 76799],
	],
	RO: [[76800, 76999]],
	TO: [[77000, 77999]],
	MT: [[78000, 78899]],
	MS: [[79000, 79999]],
	PR: [[80000, 87999]],
	SC: [[88000, 89999]],
	RS: [[90000, 99999]],
}

/** Anatel area codes (DDD) per state. */
export const AREA_CODES: Record<string, readonly string[]> = {
	AC: ['68'],
	AL: ['82'],
	AM: ['92', '97'],
	AP: ['96'],
	BA: ['71', '73', '74', '75', '77'],
	CE: ['85', '88'],
	DF: ['61'],
	ES: ['27', '28'],
	GO: ['62', '64'],
	MA: ['98', '99'],
	MG: ['31', '32', '33', '34', '35', '37', '38'],
	MS: ['67'],
	MT: ['65', '66'],
	PA: ['91', '93', '94'],
	PB: ['83'],
	PE: ['81', '87'],
	PI: ['86', '89'],
	PR: ['41', '42', '43', '44', '45', '46'],
	RJ: ['21', '22', '24'],
	RN: ['84'],
	RO: ['69'],
	RR: ['95'],
	RS: ['51', '53', '54', '55'],
	SC: ['47', '48', '49'],
	SE: ['79'],
	SP: ['11', '12', '13', '14', '15', '16', '17', '18', '19'],
	TO: ['63'],
}

const STATES = Object.keys(CEP_RANGES)

const randomBetween = (min: number, max: number) => min + randomInt(max - min + 1)
const randomDigitString = (length: number) => Array.from({ length }, () => randomInt(10)).join('')

/**
 * A CEP inside the state's Correios range (any state when omitted), as 00000-000. The suffix stays
 * at 000–899, the part used for streets; higher suffixes are reserved for PO boxes and big clients.
 */
export function generateCEP({ state }: { state?: string } = {}): string {
	const ranges = CEP_RANGES[state ?? pick(STATES)] ?? CEP_RANGES.SP ?? []
	// Weigh each range by its size so every prefix is equally likely.
	const sizes = ranges.map(([first, last]) => last - first + 1)
	let offset = randomInt(sizes.reduce((total, size) => total + size, 0))
	let prefix = 0
	for (const [index, [first]] of ranges.entries()) {
		const size = sizes[index] ?? 0
		if (offset < size) {
			prefix = first + offset
			break
		}
		offset -= size
	}
	const suffix = randomBetween(0, 899)
	return `${String(prefix).padStart(5, '0')}-${String(suffix).padStart(3, '0')}`
}

export type PhoneType = 'mobile' | 'landline'

/**
 * A phone number with a real DDD of the state (any state when omitted). Mobile: 9 + 8 digits, the
 * second one 6–9 as Anatel assigns them, e.g. (11) 98765-4321. Landline: 8 digits starting with 2–5,
 * e.g. (11) 3456-7890.
 */
export function generatePhone({
	state,
	type = 'mobile',
}: {
	state?: string
	type?: PhoneType
} = {}): string {
	const areaCode = pick(AREA_CODES[state ?? pick(STATES)] ?? ['11'])
	if (type === 'mobile') {
		const number = `9${randomBetween(6, 9)}${randomDigitString(7)}`
		return `(${areaCode}) ${number.slice(0, 5)}-${number.slice(5)}`
	}
	const number = `${randomBetween(2, 5)}${randomDigitString(7)}`
	return `(${areaCode}) ${number.slice(0, 4)}-${number.slice(4)}`
}
