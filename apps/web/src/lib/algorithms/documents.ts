import { onlyDigits, pick, randomDigits, randomInt } from './random.ts'

const toDigitArray = (digits: string) => [...digits].map(Number)

const allDigitsEqual = (digits: readonly number[]) => digits.every((digit) => digit === digits[0])

const weightedSum = (digits: readonly number[], weights: readonly number[]) =>
	weights.reduce((sum, weight, index) => sum + weight * (digits[index] ?? 0), 0)

/** The usual Brazilian mod-11 check digit: remainders 0 and 1 give 0. */
const mod11CheckDigit = (sum: number) => {
	const remainder = sum % 11
	return remainder < 2 ? 0 : 11 - remainder
}

/* ---------------------------------- CPF ---------------------------------- */

const CPF_FIRST_CHECK_WEIGHTS = [10, 9, 8, 7, 6, 5, 4, 3, 2]
const CPF_SECOND_CHECK_WEIGHTS = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
const CPF_REGION_DIGIT_INDEX = 8

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
	if (region !== undefined) digits[CPF_REGION_DIGIT_INDEX] = region
	digits.push(mod11CheckDigit(weightedSum(digits, CPF_FIRST_CHECK_WEIGHTS)))
	digits.push(mod11CheckDigit(weightedSum(digits, CPF_SECOND_CHECK_WEIGHTS)))
	const cpf = digits.join('')
	return punctuation ? formatCPF(cpf) : cpf
}

export function validateCPF(input: string) {
	const cpf = onlyDigits(input)
	const digits = toDigitArray(cpf)
	const formatted = cpf.length === 11 ? formatCPF(cpf) : input

	if (digits.length !== 11 || allDigitsEqual(digits)) {
		return { valid: false, formatted, region: null }
	}

	const valid =
		mod11CheckDigit(weightedSum(digits, CPF_FIRST_CHECK_WEIGHTS)) === digits[9] &&
		mod11CheckDigit(weightedSum(digits, CPF_SECOND_CHECK_WEIGHTS)) === digits[10]
	if (!valid) return { valid, formatted, region: null }

	const regionDigit = digits[CPF_REGION_DIGIT_INDEX] ?? -1
	return { valid, formatted, region: CPF_REGIONS[regionDigit] ?? null }
}

/* ---------------------------------- CNPJ --------------------------------- */

const CNPJ_FIRST_CHECK_WEIGHTS = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
const CNPJ_SECOND_CHECK_WEIGHTS = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
/** Branch number of a company's head office. */
const CNPJ_HEAD_OFFICE = [0, 0, 0, 1]

/**
 * Since July 2026 the Receita Federal also issues alphanumeric CNPJs: the 12 first characters can be
 * letters (A–Z) or digits, the 2 check digits stay numeric. Each character is worth its ASCII code
 * minus 48 ("0" = 0 … "9" = 9, "A" = 17 … "Z" = 42), and the module-11 rule is the same as before.
 */
const CNPJ_ALPHANUMERIC_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const CNPJ_PATTERN = /^[0-9A-Z]{12}\d{2}$/

const cnpjCharValue = (char: string) => char.charCodeAt(0) - 48

/** Uppercase letters and digits only: "12.abc.345/01de-35" → "12ABC34501DE35". */
export const normalizeCNPJ = (input: string) => input.toUpperCase().replace(/[^0-9A-Z]/g, '')

export const isAlphanumericCNPJ = (cnpj: string) => /[A-Z]/.test(normalizeCNPJ(cnpj))

export const formatCNPJ = (cnpj: string) =>
	cnpj.replace(/^([0-9A-Z]{2})([0-9A-Z]{3})([0-9A-Z]{3})([0-9A-Z]{4})(\d{2})$/, '$1.$2.$3/$4-$5')

function cnpjCheckDigits(base: string) {
	const values = [...base].map(cnpjCharValue)
	const first = mod11CheckDigit(weightedSum(values, CNPJ_FIRST_CHECK_WEIGHTS))
	const second = mod11CheckDigit(weightedSum([...values, first], CNPJ_SECOND_CHECK_WEIGHTS))
	return `${first}${second}`
}

function randomCNPJRoot(alphanumeric: boolean) {
	if (!alphanumeric) return randomDigits(8).join('')
	return Array.from(
		{ length: 8 },
		() => CNPJ_ALPHANUMERIC_CHARS[randomInt(CNPJ_ALPHANUMERIC_CHARS.length)],
	).join('')
}

export function generateCNPJ({
	punctuation = true,
	alphanumeric = false,
}: {
	punctuation?: boolean
	/** Letters in the root (the new format); a numeric CNPJ otherwise. */
	alphanumeric?: boolean
} = {}) {
	// An alphanumeric draw can come out all digits; draw again so the option always shows letters.
	let root = randomCNPJRoot(alphanumeric)
	while (alphanumeric && !/[A-Z]/.test(root)) root = randomCNPJRoot(true)

	const base = root + CNPJ_HEAD_OFFICE.join('')
	const cnpj = base + cnpjCheckDigits(base)
	return punctuation ? formatCNPJ(cnpj) : cnpj
}

export function validateCNPJ(input: string) {
	const cnpj = normalizeCNPJ(input)
	const formatted = cnpj.length === 14 ? formatCNPJ(cnpj) : input
	const alphanumeric = /[A-Z]/.test(cnpj)

	if (!CNPJ_PATTERN.test(cnpj) || new Set(cnpj).size === 1) {
		return { valid: false, formatted, alphanumeric }
	}

	const valid = cnpjCheckDigits(cnpj.slice(0, 12)) === cnpj.slice(12)
	return { valid, formatted, alphanumeric }
}

/* ----------------------------------- RG ---------------------------------- */
// SSP-SP standard: 8 digits + a check digit (0-9 or X).

const RG_WEIGHTS = [2, 3, 4, 5, 6, 7, 8, 9]

const rgCheckDigit = (digits: readonly number[]) => {
	const remainder = weightedSum(digits, RG_WEIGHTS) % 11
	if (remainder === 0) return '0'
	if (remainder === 1) return 'X'
	return String(11 - remainder)
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

	const baseDigits = toDigitArray(rg.slice(0, 8))
	return { valid: rgCheckDigit(baseDigits) === rg[8], formatted }
}

/* ----------------------------------- CNH --------------------------------- */
// 9 base digits + 2 check digits. When the first check digit overflows (≥ 10) it becomes 0 and the
// second one is discounted by 2.

function cnhCheckDigits(baseDigits: readonly number[]): [number, number] | null {
	const descendingSum = baseDigits.reduce((sum, digit, index) => sum + digit * (9 - index), 0)
	let firstCheckDigit = descendingSum % 11
	let discount = 0
	if (firstCheckDigit >= 10) {
		firstCheckDigit = 0
		discount = 2
	}

	const ascendingSum = baseDigits.reduce((sum, digit, index) => sum + digit * (index + 1), 0)
	const remainder = ascendingSum % 11
	const secondCheckDigit = remainder >= 10 ? 0 : remainder - discount

	// A negative second digit has no valid CNH: those bases are never issued.
	if (secondCheckDigit < 0) return null
	return [firstCheckDigit, secondCheckDigit]
}

export function generateCNH(): string {
	for (;;) {
		const baseDigits = randomDigits(9)
		const checkDigits = cnhCheckDigits(baseDigits)
		if (checkDigits && !allDigitsEqual(baseDigits)) {
			return [...baseDigits, ...checkDigits].join('')
		}
	}
}

export function validateCNH(input: string) {
	const cnh = onlyDigits(input)
	const digits = toDigitArray(cnh)
	if (digits.length !== 11 || allDigitsEqual(digits)) return { valid: false, formatted: input }

	const checkDigits = cnhCheckDigits(digits.slice(0, 9))
	const valid =
		checkDigits !== null && checkDigits[0] === digits[9] && checkDigits[1] === digits[10]
	return { valid, formatted: cnh }
}

/* -------------------------------- PIS/PASEP ------------------------------- */

const PIS_WEIGHTS = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

export const formatPIS = (digits: string) =>
	digits.replace(/^(\d{3})(\d{5})(\d{2})(\d)$/, '$1.$2.$3-$4')

export function generatePIS({ punctuation = true }: { punctuation?: boolean } = {}) {
	const baseDigits = randomDigits(10)
	const checkDigit = mod11CheckDigit(weightedSum(baseDigits, PIS_WEIGHTS))
	const pis = `${baseDigits.join('')}${checkDigit}`
	return punctuation ? formatPIS(pis) : pis
}

export function validatePIS(input: string) {
	const pis = onlyDigits(input)
	const digits = toDigitArray(pis)
	const formatted = pis.length === 11 ? formatPIS(pis) : input
	if (digits.length !== 11 || allDigitsEqual(digits)) return { valid: false, formatted }

	const valid = mod11CheckDigit(weightedSum(digits, PIS_WEIGHTS)) === digits[10]
	return { valid, formatted }
}

/* --------------------------------- RENAVAM -------------------------------- */
// 10 base digits (older 9-digit numbers are left-padded with 0) + 1 check digit.

const RENAVAM_WEIGHTS = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

const renavamCheckDigit = (baseDigits: readonly number[]) => {
	const value = (weightedSum(baseDigits, RENAVAM_WEIGHTS) * 10) % 11
	return value === 10 ? 0 : value
}

export function generateRENAVAM(): string {
	const baseDigits = randomDigits(10)
	return `${baseDigits.join('')}${renavamCheckDigit(baseDigits)}`
}

export function validateRENAVAM(input: string) {
	const typedDigits = onlyDigits(input)
	const renavam = typedDigits.padStart(11, '0')
	const digits = toDigitArray(renavam)
	if (typedDigits.length < 9 || digits.length !== 11 || allDigitsEqual(digits)) {
		return { valid: false, formatted: input }
	}

	const valid = renavamCheckDigit(digits.slice(0, 10)) === digits[10]
	return { valid, formatted: renavam }
}

/* -------------------------------- Voter ID -------------------------------- */
// 8 sequential digits + 2-digit state code + 2 check digits. In SP (01) and MG (02) a remainder of
// 0 gives check digit 1 instead of 0.

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

const VOTER_ABROAD_CODE = '28'
const VOTER_DOMESTIC_CODES = Object.keys(VOTER_UFS).filter((code) => code !== VOTER_ABROAD_CODE)

function voterCheckDigit(remainder: number, isSpOrMg: boolean): number {
	if (remainder === 10) return 0
	if (remainder === 0 && isSpOrMg) return 1
	return remainder
}

function voterCheckDigits(sequence: readonly number[], stateCode: string): [number, number] {
	const isSpOrMg = stateCode === '01' || stateCode === '02'
	const sequenceSum = sequence.reduce((sum, digit, index) => sum + digit * (index + 2), 0)
	const firstCheckDigit = voterCheckDigit(sequenceSum % 11, isSpOrMg)

	const [stateTens = 0, stateUnits = 0] = toDigitArray(stateCode)
	const stateSum = stateTens * 7 + stateUnits * 8 + firstCheckDigit * 9
	const secondCheckDigit = voterCheckDigit(stateSum % 11, isSpOrMg)

	return [firstCheckDigit, secondCheckDigit]
}

export const formatVoterId = (digits: string) =>
	digits.replace(/^(\d{4})(\d{4})(\d{4})$/, '$1 $2 $3')

export function generateVoterId({ uf }: { uf?: string } = {}) {
	const stateCode = uf ?? pick(VOTER_DOMESTIC_CODES)
	const sequence = randomDigits(8)
	const checkDigits = voterCheckDigits(sequence, stateCode).join('')
	return formatVoterId(`${sequence.join('')}${stateCode}${checkDigits}`)
}

export function validateVoterId(input: string) {
	const voterId = onlyDigits(input)
	const digits = toDigitArray(voterId)
	const stateCode = voterId.slice(8, 10)
	if (digits.length !== 12 || !VOTER_UFS[stateCode]) {
		return { valid: false, formatted: input, state: null }
	}

	const [firstCheckDigit, secondCheckDigit] = voterCheckDigits(digits.slice(0, 8), stateCode)
	const valid = firstCheckDigit === digits[10] && secondCheckDigit === digits[11]
	const state = valid ? (VOTER_UFS[stateCode] ?? null) : null
	return { valid, formatted: formatVoterId(voterId), state }
}

/* ------------------------------ Credit cards ------------------------------ */

/** Luhn (mod 10) check digit for a number without its last digit. */
export function luhnDigit(payload: string): number {
	let sum = 0
	for (let positionFromRight = 0; positionFromRight < payload.length; positionFromRight += 1) {
		let digit = Number(payload[payload.length - 1 - positionFromRight])
		const isDoubled = positionFromRight % 2 === 0
		if (isDoubled) {
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

const UNKNOWN_BRAND_LENGTH = 16
const UNKNOWN_BRAND_CVV_LENGTH = 3
const VISA_SHORT_LENGTH = 13

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
	const match = BRAND_PATTERNS.find(([, pattern]) => pattern.test(digits))
	return match ? match[0] : null
}

/** Groups of 4, or 4-6-5 for 15-digit (Amex) numbers. */
export const formatCard = (digits: string) => {
	if (digits.length === 15) return digits.replace(/^(\d{4})(\d{6})(\d{5})$/, '$1 $2 $3')
	return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

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
	if (!brand) return { brand: null, length: UNKNOWN_BRAND_LENGTH, cvv: UNKNOWN_BRAND_CVV_LENGTH }
	return { brand, length: CARD_BRANDS[brand].length, cvv: CARD_BRANDS[brand].cvv }
}

/** Checks a BIN typed by people. Returns the error message, or null when it can be used. */
export function binError(bin: string): string | null {
	const digits = onlyDigits(bin)
	if (!digits) return null
	if (digits !== bin.replace(/\s/g, '')) return 'Use só números no BIN.'

	// One digit is always left for the Luhn check and at least one to vary.
	const maxBinLength = binInfo(digits).length - 2
	if (digits.length > maxBinLength) return `Use no máximo ${maxBinLength} dígitos neste BIN.`
	return null
}

/** Random digits after `prefix` up to `length`, closed by the Luhn check digit. */
function luhnNumber(prefix: string, length: number): string {
	const payload = prefix + randomDigits(length - prefix.length - 1).join('')
	return payload + luhnDigit(payload)
}

function cardNumberFromBin(bin: string) {
	const error = binError(bin)
	if (error) throw new Error(error)
	const info = binInfo(bin)
	return { digits: luhnNumber(bin, info.length), brand: info.brand, cvvLength: info.cvv }
}

/** Retries until the number is detected as `brand` (some prefixes overlap other brands' ranges). */
function cardNumberForBrand(brand: CardBrand) {
	const { prefixes, length, cvv } = CARD_BRANDS[brand]
	let digits: string
	do {
		digits = luhnNumber(pick(prefixes), length)
	} while (detectCardBrand(digits) !== brand)
	return { digits, brand, cvvLength: cvv }
}

function cardExpiry(now: Date, options: CardOptions): { month: number; year: number } {
	if (options.expiry === 'custom' && options.month && options.year) {
		return { month: options.month, year: options.year }
	}
	const currentYear = now.getFullYear()
	const month = randomInt(12) + 1
	if (options.expiry === 'expired') return { month, year: currentYear - 1 - randomInt(3) }
	return { month, year: currentYear + 1 + randomInt(5) }
}

const twoDigits = (value: number) => String(value).padStart(2, '0')

/** Luhn-valid test card. The number belongs to no account and is refused by any real payment. */
export function generateCard(
	brand: CardBrand,
	now = new Date(),
	options: CardOptions = {},
): TestCard {
	const bin = onlyDigits(options.bin ?? '')
	const generated = bin ? cardNumberFromBin(bin) : cardNumberForBrand(brand)
	const { month, year } = cardExpiry(now, options)
	const fixedCvv = onlyDigits(options.cvv ?? '')
	const cvv =
		fixedCvv.length === generated.cvvLength ? fixedCvv : randomDigits(generated.cvvLength).join('')

	return {
		brand: generated.brand,
		digits: generated.digits,
		number: formatCard(generated.digits),
		month: twoDigits(month),
		year: String(year),
		expiry: `${twoDigits(month)}/${twoDigits(year % 100)}`,
		cvv,
	}
}

export type CardExportFormat = 'text' | 'pipe' | 'csv' | 'json'

export type ExportableCard = TestCard & { holder?: string }

const brandName = (card: TestCard) => (card.brand ? CARD_BRANDS[card.brand].name : 'Desconhecida')

const quoteCsvValue = (value: string) =>
	/[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value

function cardsAsPipeList(cards: readonly ExportableCard[]): string {
	const includeHolder = cards.some((card) => card.holder)
	return cards
		.map((card) => {
			const fields = [card.digits, card.month, card.year, card.cvv]
			if (includeHolder) fields.push(card.holder ?? '')
			return fields.join('|')
		})
		.join('\n')
}

function cardsAsCsv(cards: readonly ExportableCard[]): string {
	const includeHolder = cards.some((card) => card.holder)
	const header = ['bandeira', 'numero', 'mes', 'ano', 'cvv']
	if (includeHolder) header.push('titular')
	const rows = cards.map((card) => {
		const fields = [brandName(card), card.digits, card.month, card.year, card.cvv]
		if (includeHolder) fields.push(card.holder ?? '')
		return fields.map(quoteCsvValue).join(',')
	})
	return [header.join(','), ...rows].join('\n')
}

function cardsAsJson(cards: readonly ExportableCard[], displayNumber: (card: TestCard) => string) {
	const entries = cards.map((card) => ({
		bandeira: brandName(card),
		numero: displayNumber(card),
		validade: card.expiry,
		cvv: card.cvv,
		...(card.holder ? { titular: card.holder } : {}),
	}))
	return JSON.stringify(entries, null, 2)
}

function cardsAsText(cards: readonly ExportableCard[], displayNumber: (card: TestCard) => string) {
	return cards
		.map((card) => {
			const fields = [displayNumber(card), card.expiry, card.cvv]
			if (card.holder) fields.push(card.holder)
			return fields.join(' ')
		})
		.join('\n')
}

/**
 * Cards in the formats test tools take: one per line ("número validade cvv"), the pipe list many
 * checkout test suites read ("número|mês|ano|cvv"), CSV with a header, or JSON.
 */
export function exportCards(
	cards: readonly ExportableCard[],
	format: CardExportFormat,
	spaces = true,
): string {
	const displayNumber = (card: TestCard) => (spaces ? card.number : card.digits)
	switch (format) {
		case 'pipe':
			return cardsAsPipeList(cards)
		case 'csv':
			return cardsAsCsv(cards)
		case 'json':
			return cardsAsJson(cards, displayNumber)
		default:
			return cardsAsText(cards, displayNumber)
	}
}

/** "Ana Clara Souza" → "ANA C SOUZA": how names are embossed (uppercase, no accents, middle initial). */
export function embossedName(name: string): string {
	const parts = name.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().split(/\s+/).filter(Boolean)
	if (parts.length <= 2) return parts.join(' ')

	const middleInitials = parts.slice(1, -1).map((part) => part[0])
	return [parts[0], ...middleInitials, parts.at(-1)].join(' ')
}

function hasBrandLength(digits: string, brand: CardBrand | null): boolean {
	if (!brand) return digits.length >= 12
	if (brand === 'visa' && digits.length === VISA_SHORT_LENGTH) return true
	return digits.length === CARD_BRANDS[brand].length
}

export function validateCard(input: string) {
	const digits = onlyDigits(input)
	const brand = detectCardBrand(digits)
	const valid = luhnValid(digits) && hasBrandLength(digits, brand)
	return { valid, brand, formatted: formatCard(digits) }
}

/* ----------------------------- License plates ----------------------------- */

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const randomLetters = (count: number) =>
	Array.from({ length: count }, () => LETTERS[randomInt(LETTERS.length)]).join('')

const normalizePlate = (input: string) => input.toUpperCase().replace(/[^A-Z0-9]/g, '')

export type PlateFormat = 'mercosul' | 'old'

/** Old: ABC-1234. Mercosul: ABC1D23, the 2nd digit written as a letter. */
export function generatePlate(format: PlateFormat): string {
	const letters = randomLetters(3)
	const [first, second = 0, third, fourth] = randomDigits(4)
	if (format === 'old') return `${letters}-${first}${second}${third}${fourth}`
	return `${letters}${first}${LETTERS[second]}${third}${fourth}`
}

/** Detects the format of a plate (with or without hyphen). */
export function plateFormat(input: string): PlateFormat | null {
	const plate = normalizePlate(input)
	if (/^[A-Z]{3}\d{4}$/.test(plate)) return 'old'
	if (/^[A-Z]{3}\d[A-Z]\d{2}$/.test(plate)) return 'mercosul'
	return null
}

/** Old ⇄ Mercosul: the 2nd digit becomes a letter (0→A … 9→J), and back. */
export function convertPlate(input: string): string {
	const plate = normalizePlate(input)
	const format = plateFormat(plate)

	if (format === 'old') {
		const secondDigitAsLetter = LETTERS[Number(plate[4])]
		return `${plate.slice(0, 4)}${secondDigitAsLetter}${plate.slice(5)}`
	}

	if (format === 'mercosul') {
		const secondDigit = LETTERS.indexOf(plate[4] ?? '')
		if (secondDigit > 9) {
			throw new Error(
				'Esta placa Mercosul não tem equivalente no formato antigo (5º caractere além de J).',
			)
		}
		return `${plate.slice(0, 3)}-${plate[3]}${secondDigit}${plate.slice(5)}`
	}

	throw new Error('Use o formato ABC-1234 (antigo) ou ABC1D23 (Mercosul).')
}
