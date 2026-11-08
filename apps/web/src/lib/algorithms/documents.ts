import { onlyDigits, randomDigits, randomInt } from './random.ts'

const weightedSum = (digits: readonly number[], weights: readonly number[]) =>
	weights.reduce((sum, weight, index) => sum + weight * (digits[index] ?? 0), 0)

const mod11Digit = (sum: number) => {
	const rest = sum % 11
	return rest < 2 ? 0 : 11 - rest
}

/* ---------------------------------- CPF ---------------------------------- */

const CPF_W1 = [10, 9, 8, 7, 6, 5, 4, 3, 2]
const CPF_W2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]

/** Fiscal region (9th digit) → states. */
export const CPF_REGIONS: Record<number, string> = {
	0: 'Rio Grande do Sul',
	1: 'Distrito Federal, Goiás, Mato Grosso, Mato Grosso do Sul ou Tocantins',
	2: 'Pará, Amazonas, Acre, Amapá, Rondônia ou Roraima',
	3: 'Ceará, Maranhão ou Piauí',
	4: 'Pernambuco, Rio Grande do Norte, Paraíba ou Alagoas',
	5: 'Bahia ou Sergipe',
	6: 'Minas Gerais',
	7: 'Rio de Janeiro ou Espírito Santo',
	8: 'São Paulo',
	9: 'Paraná ou Santa Catarina',
}

export const STATE_TO_CPF_REGION: Record<string, number> = {
	AC: 2,
	AL: 4,
	AM: 2,
	AP: 2,
	BA: 5,
	CE: 3,
	DF: 1,
	ES: 7,
	GO: 1,
	MA: 3,
	MG: 6,
	MS: 1,
	MT: 1,
	PA: 2,
	PB: 4,
	PE: 4,
	PI: 3,
	PR: 9,
	RJ: 7,
	RN: 4,
	RO: 2,
	RR: 2,
	RS: 0,
	SC: 9,
	SE: 5,
	SP: 8,
	TO: 1,
}

export const formatCPF = (digits: string) =>
	digits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')

export function generateCPF({
	punctuation = true,
	state,
}: {
	punctuation?: boolean
	state?: string
} = {}) {
	const digits = randomDigits(9)
	const region = state ? STATE_TO_CPF_REGION[state] : undefined
	if (region !== undefined) digits[8] = region
	digits.push(mod11Digit(weightedSum(digits, CPF_W1)))
	digits.push(mod11Digit(weightedSum(digits, CPF_W2)))
	const cpf = digits.join('')
	return punctuation ? formatCPF(cpf) : cpf
}

export function validateCPF(input: string) {
	const cpf = onlyDigits(input)
	const digits = [...cpf].map(Number)
	const formatted = cpf.length === 11 ? formatCPF(cpf) : input

	if (digits.length !== 11 || digits.every((d) => d === digits[0])) {
		return { valid: false, formatted, region: null }
	}

	const valid =
		mod11Digit(weightedSum(digits, CPF_W1)) === digits[9] &&
		mod11Digit(weightedSum(digits, CPF_W2)) === digits[10]

	return { valid, formatted, region: valid ? (CPF_REGIONS[digits[8] ?? -1] ?? null) : null }
}

/* ---------------------------------- CNPJ --------------------------------- */

const CNPJ_W1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
const CNPJ_W2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

export const formatCNPJ = (digits: string) =>
	digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')

export function generateCNPJ({ punctuation = true }: { punctuation?: boolean } = {}) {
	const digits = [...randomDigits(8), 0, 0, 0, 1]
	digits.push(mod11Digit(weightedSum(digits, CNPJ_W1)))
	digits.push(mod11Digit(weightedSum(digits, CNPJ_W2)))
	const cnpj = digits.join('')
	return punctuation ? formatCNPJ(cnpj) : cnpj
}

export function validateCNPJ(input: string) {
	const cnpj = onlyDigits(input)
	const digits = [...cnpj].map(Number)
	const formatted = cnpj.length === 14 ? formatCNPJ(cnpj) : input

	if (digits.length !== 14 || digits.every((d) => d === digits[0])) {
		return { valid: false, formatted }
	}

	const valid =
		mod11Digit(weightedSum(digits, CNPJ_W1)) === digits[12] &&
		mod11Digit(weightedSum(digits, CNPJ_W2)) === digits[13]

	return { valid, formatted }
}

/* ----------------------------------- RG ---------------------------------- */
// Padrão SSP-SP: 8 dígitos + dígito verificador (0-9 ou X).

const RG_WEIGHTS = [2, 3, 4, 5, 6, 7, 8, 9]

const rgCheckDigit = (digits: readonly number[]) => {
	const rest = weightedSum(digits, RG_WEIGHTS) % 11
	if (rest === 0) return '0'
	if (rest === 1) return 'X'
	return String(11 - rest)
}

export const formatRG = (rg: string) => rg.replace(/^(\d{2})(\d{3})(\d{3})([\dX])$/, '$1.$2.$3-$4')

export function generateRG({ punctuation = true }: { punctuation?: boolean } = {}) {
	const digits = randomDigits(8)
	const rg = `${digits.join('')}${rgCheckDigit(digits)}`
	return punctuation ? formatRG(rg) : rg
}

export function validateRG(input: string) {
	const rg = input.toUpperCase().replace(/[^\dX]/g, '')
	const formatted = rg.length === 9 ? formatRG(rg) : input

	if (!/^\d{8}[\dX]$/.test(rg)) return { valid: false, formatted }

	const digits = [...rg.slice(0, 8)].map(Number)
	return { valid: rgCheckDigit(digits) === rg[8], formatted }
}

/* ----------------------------------- CNH --------------------------------- */
// 9 base digits + 2 check digits. The first DV feeds a discount ("dsc") into the second.

function cnhCheckDigits(base: readonly number[]): [number, number] | null {
	let sum = base.reduce((acc, digit, i) => acc + digit * (9 - i), 0)
	let dv1 = sum % 11
	let discount = 0
	if (dv1 >= 10) {
		dv1 = 0
		discount = 2
	}
	sum = base.reduce((acc, digit, i) => acc + digit * (i + 1), 0)
	const rest = sum % 11
	const dv2 = rest >= 10 ? 0 : rest - discount
	// A negative second digit has no valid CNH: those bases are never issued.
	return dv2 < 0 ? null : [dv1, dv2]
}

export function generateCNH(): string {
	for (;;) {
		const base = randomDigits(9)
		const dvs = cnhCheckDigits(base)
		if (dvs && !base.every((d) => d === base[0])) return [...base, ...dvs].join('')
	}
}

export function validateCNH(input: string) {
	const cnh = onlyDigits(input)
	const digits = [...cnh].map(Number)
	if (digits.length !== 11 || digits.every((d) => d === digits[0]))
		return { valid: false, formatted: input }
	const dvs = cnhCheckDigits(digits.slice(0, 9))
	return { valid: dvs !== null && dvs[0] === digits[9] && dvs[1] === digits[10], formatted: cnh }
}

/* -------------------------------- PIS/PASEP ------------------------------- */

const PIS_WEIGHTS = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

export const formatPIS = (digits: string) =>
	digits.replace(/^(\d{3})(\d{5})(\d{2})(\d)$/, '$1.$2.$3-$4')

export function generatePIS({ punctuation = true }: { punctuation?: boolean } = {}) {
	const base = randomDigits(10)
	const pis = `${base.join('')}${mod11Digit(weightedSum(base, PIS_WEIGHTS))}`
	return punctuation ? formatPIS(pis) : pis
}

export function validatePIS(input: string) {
	const pis = onlyDigits(input)
	const digits = [...pis].map(Number)
	const formatted = pis.length === 11 ? formatPIS(pis) : input
	if (digits.length !== 11 || digits.every((d) => d === digits[0]))
		return { valid: false, formatted }
	return { valid: mod11Digit(weightedSum(digits, PIS_WEIGHTS)) === digits[10], formatted }
}

/* --------------------------------- RENAVAM -------------------------------- */
// 10 base digits (older 9-digit numbers are left-padded with 0) + 1 check digit.

const RENAVAM_WEIGHTS = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

const renavamDigit = (base: readonly number[]) => {
	const value = (weightedSum(base, RENAVAM_WEIGHTS) * 10) % 11
	return value === 10 ? 0 : value
}

export function generateRENAVAM(): string {
	const base = randomDigits(10)
	return `${base.join('')}${renavamDigit(base)}`
}

export function validateRENAVAM(input: string) {
	const renavam = onlyDigits(input).padStart(11, '0')
	const digits = [...renavam].map(Number)
	if (
		onlyDigits(input).length < 9 ||
		digits.length !== 11 ||
		digits.every((d) => d === digits[0])
	) {
		return { valid: false, formatted: input }
	}
	return { valid: renavamDigit(digits.slice(0, 10)) === digits[10], formatted: renavam }
}

/* ----------------------------- Título de eleitor ------------------------------ */
// 8 sequential digits + 2-digit UF code + 2 check digits. In SP (01) and MG (02) a remainder of 0
// gives check digit 1 instead of 0.

export const VOTER_UFS: Record<string, string> = {
	'01': 'SP',
	'02': 'MG',
	'03': 'RJ',
	'04': 'RS',
	'05': 'BA',
	'06': 'PR',
	'07': 'CE',
	'08': 'PE',
	'09': 'SC',
	'10': 'GO',
	'11': 'MA',
	'12': 'PB',
	'13': 'PA',
	'14': 'ES',
	'15': 'PI',
	'16': 'RN',
	'17': 'AL',
	'18': 'MT',
	'19': 'MS',
	'20': 'DF',
	'21': 'SE',
	'22': 'AM',
	'23': 'RO',
	'24': 'AC',
	'25': 'AP',
	'26': 'RR',
	'27': 'TO',
	'28': 'Exterior (ZZ)',
}

function voterCheckDigits(sequence: readonly number[], uf: string): [number, number] {
	const special = uf === '01' || uf === '02'
	const digit = (rest: number) => (rest === 10 ? 0 : rest === 0 && special ? 1 : rest)
	const dv1 = digit(sequence.reduce((acc, d, i) => acc + d * (i + 2), 0) % 11)
	const [u1 = 0, u2 = 0] = [...uf].map(Number)
	const dv2 = digit((u1 * 7 + u2 * 8 + dv1 * 9) % 11)
	return [dv1, dv2]
}

export const formatVoterId = (digits: string) =>
	digits.replace(/^(\d{4})(\d{4})(\d{4})$/, '$1 $2 $3')

export function generateVoterId({ uf }: { uf?: string } = {}) {
	const code = uf ?? Object.keys(VOTER_UFS)[randomInt(27)] ?? '01'
	const sequence = randomDigits(8)
	return formatVoterId(`${sequence.join('')}${code}${voterCheckDigits(sequence, code).join('')}`)
}

export function validateVoterId(input: string) {
	const id = onlyDigits(input)
	const digits = [...id].map(Number)
	const uf = id.slice(8, 10)
	if (digits.length !== 12 || !VOTER_UFS[uf]) return { valid: false, formatted: input, state: null }
	const [dv1, dv2] = voterCheckDigits(digits.slice(0, 8), uf)
	const valid = dv1 === digits[10] && dv2 === digits[11]
	return { valid, formatted: formatVoterId(id), state: valid ? (VOTER_UFS[uf] ?? null) : null }
}

/* ---------------------------- Cartão de crédito ----------------------------- */

/** Luhn (mod 10) check digit for a number without its last digit. */
export function luhnDigit(payload: string): number {
	let sum = 0
	for (let i = 0; i < payload.length; i += 1) {
		let digit = Number(payload[payload.length - 1 - i])
		if (i % 2 === 0) {
			digit *= 2
			if (digit > 9) digit -= 9
		}
		sum += digit
	}
	return (10 - (sum % 10)) % 10
}

export const luhnValid = (number: string) =>
	/^\d{12,19}$/.test(number) && luhnDigit(number.slice(0, -1)) === Number(number.at(-1))

export const CARD_BRANDS = {
	visa: { name: 'Visa', prefixes: ['4'], length: 16, cvv: 3 },
	mastercard: {
		name: 'Mastercard',
		prefixes: ['51', '52', '53', '54', '55', '2221', '2720'],
		length: 16,
		cvv: 3,
	},
	elo: {
		name: 'Elo',
		prefixes: ['636368', '438935', '504175', '451416', '636297', '401178', '506707', '457631'],
		length: 16,
		cvv: 3,
	},
	amex: { name: 'American Express', prefixes: ['34', '37'], length: 15, cvv: 4 },
	hipercard: { name: 'Hipercard', prefixes: ['606282', '3841'], length: 16, cvv: 3 },
	diners: { name: 'Diners Club', prefixes: ['36', '38', '300', '305'], length: 14, cvv: 3 },
	discover: { name: 'Discover', prefixes: ['6011', '65'], length: 16, cvv: 3 },
	jcb: { name: 'JCB', prefixes: ['3528', '3589'], length: 16, cvv: 3 },
} as const

export type CardBrand = keyof typeof CARD_BRANDS

/** Most specific match first, so Elo's "4011…" isn't read as Visa. */
const BRAND_PATTERNS: [CardBrand, RegExp][] = [
	[
		'elo',
		/^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(4|5|9)|6516|6550)/,
	],
	['hipercard', /^(606282|3841)/],
	['amex', /^3[47]/],
	['diners', /^3(0[0-5]|[68])/],
	['jcb', /^35(2[89]|[3-8])/],
	['discover', /^(6011|65|64[4-9])/],
	['mastercard', /^(5[1-5]|2(2[2-9]|[3-6]|7[01]|720))/],
	['visa', /^4/],
]

export function detectCardBrand(number: string): CardBrand | null {
	const digits = onlyDigits(number)
	return BRAND_PATTERNS.find(([, pattern]) => pattern.test(digits))?.[0] ?? null
}

export const formatCard = (digits: string) =>
	digits.length === 15
		? digits.replace(/^(\d{4})(\d{6})(\d{5})$/, '$1 $2 $3')
		: digits.replace(/(\d{4})(?=\d)/g, '$1 ')

export type TestCard = {
	/** Null when a custom BIN matches no known brand. */
	brand: CardBrand | null
	/** Only the digits ("4588149994825963"). */
	digits: string
	/** Grouped as printed on the card ("4588 1499 9482 5963", Amex 4-6-5). */
	number: string
	/** "09" */
	month: string
	/** "2027" */
	year: string
	/** "09/27" */
	expiry: string
	cvv: string
}

/** future: valid for 1–5 years; expired: ended 1–3 years ago (to test refusals); custom: given. */
export type ExpiryMode = 'future' | 'expired' | 'custom'

export type CardOptions = {
	/** Digits the number must start with (BIN/IIN). Overrides the brand's own prefixes. */
	bin?: string
	expiry?: ExpiryMode
	/** 1–12, with `expiry: 'custom'`. */
	month?: number
	/** Four digits, with `expiry: 'custom'`. */
	year?: number
	/** Fixed CVV; must have the brand's length (3, or 4 for Amex). Random when empty. */
	cvv?: string
}

/** What a BIN says about the card: its brand (when known), number length and CVV length. */
export function binInfo(bin: string): { brand: CardBrand | null; length: number; cvv: number } {
	const brand = detectCardBrand(bin)
	if (!brand) return { brand: null, length: 16, cvv: 3 }
	return { brand, length: CARD_BRANDS[brand].length, cvv: CARD_BRANDS[brand].cvv }
}

/** Checks a BIN typed by people. Returns the error message, or null when it can be used. */
export function binError(bin: string): string | null {
	const digits = onlyDigits(bin)
	if (!digits) return null
	if (digits !== bin.replace(/\s/g, '')) return 'Use só números no BIN.'
	const { length } = binInfo(digits)
	// One digit is always left for the Luhn check and at least one to vary.
	if (digits.length > length - 2) return `Use no máximo ${length - 2} dígitos neste BIN.`
	return null
}

const pad2 = (n: number) => String(n).padStart(2, '0')

/** Luhn-valid test card. The number belongs to no account and is refused by any real payment. */
export function generateCard(
	brand: CardBrand,
	now = new Date(),
	options: CardOptions = {},
): TestCard {
	const bin = onlyDigits(options.bin ?? '')
	let digits: string
	let cardBrand: CardBrand | null = brand
	let cvvLength: number = CARD_BRANDS[brand].cvv
	if (bin) {
		const info = binInfo(bin)
		const error = binError(bin)
		if (error) throw new Error(error)
		cardBrand = info.brand
		cvvLength = info.cvv
		const payload = bin + randomDigits(info.length - bin.length - 1).join('')
		digits = payload + luhnDigit(payload)
	} else {
		const { prefixes, length } = CARD_BRANDS[brand]
		do {
			const prefix = prefixes[randomInt(prefixes.length)] ?? ''
			const payload = prefix + randomDigits(length - prefix.length - 1).join('')
			digits = payload + luhnDigit(payload)
		} while (detectCardBrand(digits) !== brand)
	}

	const thisYear = now.getFullYear()
	let month: number
	let year: number
	if (options.expiry === 'custom' && options.month && options.year) {
		month = options.month
		year = options.year
	} else if (options.expiry === 'expired') {
		year = thisYear - 1 - randomInt(3)
		month = randomInt(12) + 1
	} else {
		year = thisYear + 1 + randomInt(5)
		month = randomInt(12) + 1
	}

	const fixedCvv = onlyDigits(options.cvv ?? '')
	return {
		brand: cardBrand,
		digits,
		number: formatCard(digits),
		month: pad2(month),
		year: String(year),
		expiry: `${pad2(month)}/${pad2(year % 100)}`,
		cvv: fixedCvv.length === cvvLength ? fixedCvv : randomDigits(cvvLength).join(''),
	}
}

export type CardExportFormat = 'text' | 'pipe' | 'csv' | 'json'

export type ExportableCard = TestCard & { holder?: string }

const brandName = (card: TestCard) => (card.brand ? CARD_BRANDS[card.brand].name : 'Desconhecida')

/**
 * Cards in the formats test tools take: one per line ("número validade cvv"), the pipe list many
 * checkout test suites read ("número|mês|ano|cvv"), CSV with a header, or JSON.
 */
export function exportCards(
	cards: readonly ExportableCard[],
	format: CardExportFormat,
	spaces = true,
): string {
	const num = (card: TestCard) => (spaces ? card.number : card.digits)
	const withHolder = cards.some((card) => card.holder)
	switch (format) {
		case 'pipe':
			return cards
				.map((c) =>
					[c.digits, c.month, c.year, c.cvv, ...(withHolder ? [c.holder ?? ''] : [])].join('|'),
				)
				.join('\n')
		case 'csv': {
			const quote = (value: string) =>
				/[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value
			const header = ['bandeira', 'numero', 'mes', 'ano', 'cvv', ...(withHolder ? ['titular'] : [])]
			const rows = cards.map((c) =>
				[brandName(c), c.digits, c.month, c.year, c.cvv, ...(withHolder ? [c.holder ?? ''] : [])]
					.map(quote)
					.join(','),
			)
			return [header.join(','), ...rows].join('\n')
		}
		case 'json':
			return JSON.stringify(
				cards.map((c) => ({
					bandeira: brandName(c),
					numero: num(c),
					validade: c.expiry,
					cvv: c.cvv,
					...(c.holder ? { titular: c.holder } : {}),
				})),
				null,
				2,
			)
		default:
			return cards
				.map((c) => [num(c), c.expiry, c.cvv, ...(c.holder ? [c.holder] : [])].join(' '))
				.join('\n')
	}
}

/** "Ana Clara Souza" → "ANA C SOUZA": how names are embossed (uppercase, no accents, middle initial). */
export function embossedName(name: string): string {
	const parts = name
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toUpperCase()
		.split(/\s+/)
		.filter(Boolean)
	if (parts.length <= 2) return parts.join(' ')
	return [parts[0], ...parts.slice(1, -1).map((part) => part[0]), parts.at(-1)].join(' ')
}

export function validateCard(input: string) {
	const digits = onlyDigits(input)
	const brand = detectCardBrand(digits)
	const lengthOk = brand
		? digits.length === CARD_BRANDS[brand].length || (brand === 'visa' && digits.length === 13)
		: digits.length >= 12
	return { valid: luhnValid(digits) && lengthOk, brand, formatted: formatCard(digits) }
}

/* ---------------------------------- Placas ---------------------------------- */

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const randomLetters = (n: number) =>
	Array.from({ length: n }, () => LETTERS[randomInt(26)]).join('')

export type PlateFormat = 'mercosul' | 'old'

export function generatePlate(format: PlateFormat): string {
	const letters = randomLetters(3)
	const d = randomDigits(4)
	return format === 'old'
		? `${letters}-${d.join('')}`
		: `${letters}${d[0]}${LETTERS[d[1] ?? 0]}${d[2]}${d[3]}`
}

/** Detects the format of a plate (with or without hyphen). */
export function plateFormat(input: string): PlateFormat | null {
	const plate = input.toUpperCase().replace(/[^A-Z0-9]/g, '')
	if (/^[A-Z]{3}\d{4}$/.test(plate)) return 'old'
	if (/^[A-Z]{3}\d[A-Z]\d{2}$/.test(plate)) return 'mercosul'
	return null
}

/** Old ⇄ Mercosul: the 2nd digit becomes a letter (0→A … 9→J), and back. */
export function convertPlate(input: string): string {
	const plate = input.toUpperCase().replace(/[^A-Z0-9]/g, '')
	const format = plateFormat(plate)
	if (format === 'old') return `${plate.slice(0, 4)}${LETTERS[Number(plate[4])]}${plate.slice(5)}`
	if (format === 'mercosul') {
		const digit = LETTERS.indexOf(plate[4] ?? '')
		if (digit > 9)
			throw new Error(
				'Esta placa Mercosul não tem equivalente no formato antigo (5º caractere além de J).',
			)
		return `${plate.slice(0, 3)}-${plate[3]}${digit}${plate.slice(5)}`
	}
	throw new Error('Use o formato ABC-1234 (antigo) ou ABC1D23 (Mercosul).')
}
