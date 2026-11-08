import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { STATE_TO_CPF_REGION, validateCPF, validateRG } from './documents.ts'
import { generatePeople } from './people.ts'

describe('people', () => {
	it('every field is consistent with the others', () => {
		for (const person of generatePeople(50, { minAge: 20, maxAge: 30 })) {
			assert.equal(validateCPF(person.cpf).valid, true)
			assert.equal(Number(person.cpf.replace(/\D/g, '')[8]), STATE_TO_CPF_REGION[person.estado])
			assert.equal(validateRG(person.rg).valid, true)
			assert.ok(person.idade >= 20 && person.idade <= 30, `${person.idade}`)
			assert.match(person.email, /^[a-z.]+\d+@/)
			assert.match(person.cep, /^\d{5}-\d{3}$/)
			assert.match(person.celular, /^\(\d{2}\) 9\d{4}-\d{4}$/)
		}
	})
})
