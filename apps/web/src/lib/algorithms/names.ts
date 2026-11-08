// Locale-specific entry point: bundles only pt_BR data instead of every locale.
import { faker } from '@faker-js/faker/locale/pt_BR'

export type NameFormat = 'first' | 'first-last' | 'full'
export type NameSex = 'male' | 'female' | 'any'

export function generateName(format: NameFormat, sex: NameSex): string {
	const firstName = faker.person.firstName(sex === 'any' ? undefined : sex)
	if (format === 'first') return firstName

	const lastName = faker.person.lastName()
	if (format === 'first-last') return `${firstName} ${lastName}`

	let middleName = faker.person.lastName()
	while (middleName === lastName) middleName = faker.person.lastName()
	return `${firstName} ${middleName} ${lastName}`
}

export function generateNames(amount: number, format: NameFormat, sex: NameSex): string[] {
	return Array.from({ length: amount }, () => generateName(format, sex))
}
