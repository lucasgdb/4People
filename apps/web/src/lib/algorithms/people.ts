// Loaded on demand (faker's pt_BR data is ~450KB): import this module inside an event handler.
import { faker } from '@faker-js/faker/locale/pt_BR'
import { formatCPF, generateCPF, generateRG, STATE_TO_CPF_REGION } from './documents.ts'

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
const DDD: Record<string, string> = {
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

const slug = (text: string) =>
	text
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.replace(/[^a-z]+/g, '.')
		.replace(/^\.|\.$/g, '')

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
	const first = faker.person.firstName(sex)
	const last = faker.person.lastName()
	const nome = `${first} ${faker.person.lastName()} ${last}`
	const uf = state ?? faker.helpers.arrayElement(STATES)
	const birth = faker.date.birthdate({ mode: 'age', min: minAge, max: maxAge })
	const now = new Date()
	const idade =
		now.getFullYear() -
		birth.getFullYear() -
		(now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0)
	const cpf = formatCPF(generateCPF({ punctuation: false, state: uf }))
	return {
		nome,
		sexo: sex === 'male' ? 'Masculino' : 'Feminino',
		nascimento: birth.toLocaleDateString('pt-BR'),
		idade,
		cpf,
		rg: generateRG(),
		email: `${slug(first)}.${slug(last)}${faker.number.int({ min: 1, max: 99 })}@${faker.helpers.arrayElement(['gmail.com', 'outlook.com', 'yahoo.com.br', 'uol.com.br'])}`,
		celular: `(${DDD[uf] ?? '11'}) 9${faker.string.numeric(4)}-${faker.string.numeric(4)}`,
		cep: faker.location.zipCode('#####-###'),
		endereco: faker.location.street(),
		numero: String(faker.number.int({ min: 1, max: 3000 })),
		bairro: faker.helpers.arrayElement(NEIGHBORHOODS),
		cidade: faker.location.city(),
		estado: uf,
		mae: `${faker.person.firstName('female')} ${faker.person.lastName()} ${last}`,
		pai: `${faker.person.firstName('male')} ${last}`,
	}
}

export const generatePeople = (amount: number, options?: Parameters<typeof generatePerson>[0]) =>
	Array.from({ length: amount }, () => generatePerson(options))
