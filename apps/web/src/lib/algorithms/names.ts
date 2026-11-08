// Locale-specific entry point: bundles only pt_BR data instead of every locale.
import { faker } from '@faker-js/faker/locale/pt_BR'

export type NameFormat = 'first' | 'first-last' | 'full'
export type NameSex = 'male' | 'female' | 'any'

export function generateName(format: NameFormat, sex: NameSex): string {
	const first = faker.person.firstName(sex === 'any' ? undefined : sex)
	if (format === 'first') return first

	const last = faker.person.lastName()
	if (format === 'first-last') return `${first} ${last}`

	let middle = faker.person.lastName()
	while (middle === last) middle = faker.person.lastName()
	return `${first} ${middle} ${last}`
}

export function generateNames(amount: number, format: NameFormat, sex: NameSex): string[] {
	return Array.from({ length: amount }, () => generateName(format, sex))
}
