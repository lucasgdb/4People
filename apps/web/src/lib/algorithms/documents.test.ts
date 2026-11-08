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
	it('validates known CNPJ', () => {
		assert.equal(validateCNPJ('11.222.333/0001-81').valid, true)
		assert.equal(validateCNPJ('11.222.333/0001-80').valid, false)
	})
})
