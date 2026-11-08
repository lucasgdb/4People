// Loaded on demand (faker's pt_BR data is ~450KB): import this module inside an event handler.
import { faker } from '@faker-js/faker/locale/pt_BR'
import { generateCPF, generateRG, STATE_TO_CPF_REGION } from './documents.ts'

export type Person = {
	nome: string
	sexo: 'Masculino' | 'Feminino'
	nascimento: string
	idade: number
	cpf: string
	rg: string
	email: string
	celular: string
	cep: string
	endereco: string
	numero: string
	bairro: string
	cidade: string
	estado: string
	mae: string
	pai: string
}

const STATES = Object.keys(STATE_TO_CPF_REGION)
/** Neighbourhood names found in most Brazilian cities (faker's pt_BR has none). */
const NEIGHBORHOODS = [
	'Centro',
	'Jardim América',
	'Vila Nova',
	'Santa Cruz',
	'São José',
	'Boa Vista',
	'Jardim das Flores',
	'Vila Maria',
	'Santo Antônio',
	'Bela Vista',
	'Jardim Primavera',
	'Cidade Nova',
	'Parque Industrial',
	'Vila Rica',
	'Nova Esperança',
	'Jardim Paulista',
	'São Francisco',
	'Vila Operária',
	'Alto da Boa Vista',
	'Liberdade',
]
/** Area code of each state's capital. */
const AREA_CODE_BY_STATE: Record<string, string> = {
	SP: '11',
	RJ: '21',
	MG: '31',
	RS: '51',
	PR: '41',
	SC: '48',
	BA: '71',
	PE: '81',
	CE: '85',
	DF: '61',
	GO: '62',
	PA: '91',
	AM: '92',
	ES: '27',
	MA: '98',
	PB: '83',
	RN: '84',
	AL: '82',
	PI: '86',
	SE: '79',
	MT: '65',
	MS: '67',
	TO: '63',
	RO: '69',
	AC: '68',
	AP: '96',
	RR: '95',
}

const EMAIL_DOMAINS = ['gmail.com', 'outlook.com', 'yahoo.com.br', 'uol.com.br']

/** "João Vítor" → "joao.vitor": lowercase ASCII letters joined by dots. */
const emailSlug = (text: string) =>
	text
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.replace(/[^a-z]+/g, '.')
		.replace(/^\.|\.$/g, '')

function ageOn(today: Date, birthDate: Date): number {
	const birthdayThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
	const hadBirthdayThisYear = today >= birthdayThisYear
	return today.getFullYear() - birthDate.getFullYear() - (hadBirthdayThisYear ? 0 : 1)
}

function randomEmail(firstName: string, lastName: string): string {
	const suffix = faker.number.int({ min: 1, max: 99 })
	const domain = faker.helpers.arrayElement(EMAIL_DOMAINS)
	return `${emailSlug(firstName)}.${emailSlug(lastName)}${suffix}@${domain}`
}

function randomCellPhone(state: string): string {
	const areaCode = AREA_CODE_BY_STATE[state] ?? '11'
	return `(${areaCode}) 9${faker.string.numeric(4)}-${faker.string.numeric(4)}`
}

/** A consistent fake person: the CPF matches the state, the e-mail matches the name, age matches the birth date. */
export function generatePerson({
	minAge = 18,
	maxAge = 80,
	state,
}: {
	minAge?: number
	maxAge?: number
	state?: string
} = {}): Person {
	const sex = faker.helpers.arrayElement(['male', 'female'] as const)
	const firstName = faker.person.firstName(sex)
	const familyName = faker.person.lastName()
	const personState = state ?? faker.helpers.arrayElement(STATES)
	const birthDate = faker.date.birthdate({ mode: 'age', min: minAge, max: maxAge })

	return {
		nome: `${firstName} ${faker.person.lastName()} ${familyName}`,
		sexo: sex === 'male' ? 'Masculino' : 'Feminino',
		nascimento: birthDate.toLocaleDateString('pt-BR'),
		idade: ageOn(new Date(), birthDate),
		cpf: generateCPF({ state: personState }),
		rg: generateRG(),
		email: randomEmail(firstName, familyName),
		celular: randomCellPhone(personState),
		cep: faker.location.zipCode('#####-###'),
		endereco: faker.location.street(),
		numero: String(faker.number.int({ min: 1, max: 3000 })),
		bairro: faker.helpers.arrayElement(NEIGHBORHOODS),
		cidade: faker.location.city(),
		estado: personState,
		mae: `${faker.person.firstName('female')} ${faker.person.lastName()} ${familyName}`,
		pai: `${faker.person.firstName('male')} ${familyName}`,
	}
}

export const generatePeople = (amount: number, options?: Parameters<typeof generatePerson>[0]) =>
	Array.from({ length: amount }, () => generatePerson(options))
