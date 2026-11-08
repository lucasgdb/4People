import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
	generateCNPJ,
	generateCPF,
	generateRG,
	validateCNPJ,
	validateCPF,
	validateRG,
} from './documents.ts'

describe('documents', () => {
	it('validates known CPFs', () => {
		assert.equal(validateCPF('529.982.247-25').valid, true)
		assert.equal(validateCPF('529.982.247-24').valid, false)
		assert.equal(validateCPF('111.111.111-11').valid, false)
	})
	it('generated CPF/CNPJ/RG are valid', () => {
		for (let i = 0; i < 200; i += 1) {
			assert.equal(validateCPF(generateCPF()).valid, true)
			assert.equal(validateCNPJ(generateCNPJ({ punctuation: false })).valid, true)
			assert.equal(validateRG(generateRG()).valid, true)
		}
	})
	it('respects CPF state region', () => {
		const cpf = generateCPF({ punctuation: false, state: 'SP' })
		assert.equal(cpf[8], '8')
		assert.equal(validateCPF(cpf).region, 'São Paulo')
	})
	it('validates alphanumeric CNPJs (Receita Federal format since July 2026)', () => {
		// Example published by the Receita Federal.
		assert.equal(validateCNPJ('12.ABC.345/01DE-35').valid, true)
		assert.equal(validateCNPJ('12ABC34501DE35').valid, true)
		assert.equal(validateCNPJ('12.abc.345/01de-35').valid, true)
		assert.equal(validateCNPJ('12.ABC.345/01DE-35').alphanumeric, true)
		assert.equal(validateCNPJ('12.ABC.345/01DE-35').formatted, '12.ABC.345/01DE-35')
		assert.equal(validateCNPJ('12.ABC.345/01DE-36').valid, false)
		// Letters are not allowed in the check digits.
		assert.equal(validateCNPJ('12.ABC.345/01DE-3A').valid, false)
		assert.equal(validateCNPJ('AA.AAA.AAA/AAAA-00').valid, false)
		for (let attempt = 0; attempt < 200; attempt += 1) {
			const generated = generateCNPJ({ alphanumeric: true })
			assert.match(generated, /^[0-9A-Z]{2}\.[0-9A-Z]{3}\.[0-9A-Z]{3}\/0001-\d{2}$/)
			assert.match(generated, /[A-Z]/)
			assert.equal(validateCNPJ(generated).valid, true, generated)
		}
	})

	it('validates known CNPJ', () => {
		assert.equal(validateCNPJ('11.222.333/0001-81').valid, true)
		assert.equal(validateCNPJ('11.222.333/0001-80').valid, false)
	})
})
