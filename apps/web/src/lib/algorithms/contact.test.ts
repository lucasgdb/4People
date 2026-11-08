import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { AREA_CODES, CEP_RANGES, generateCEP, generatePhone } from './contact.ts'

describe('contact', () => {
	it('generated CEPs stay inside the state range', () => {
		for (const [state, ranges] of Object.entries(CEP_RANGES)) {
			for (let i = 0; i < 50; i += 1) {
				const cep = generateCEP({ state })
				assert.match(cep, /^\d{5}-[0-8]\d{2}$/)
				const prefix = Number(cep.slice(0, 5))
				assert.ok(
					ranges.some(([first, last]) => prefix >= first && prefix <= last),
					`${cep} fora de ${state}`,
				)
			}
		}
		assert.match(generateCEP(), /^\d{5}-\d{3}$/)
	})

	it('generated phones use a DDD of the state and the right shape', () => {
		for (const [state, codes] of Object.entries(AREA_CODES)) {
			for (let i = 0; i < 30; i += 1) {
				const mobile = generatePhone({ state, type: 'mobile' })
				assert.match(mobile, /^\(\d{2}\) 9[6-9]\d{3}-\d{4}$/)
				assert.ok(codes.includes(mobile.slice(1, 3)))
				const landline = generatePhone({ state, type: 'landline' })
				assert.match(landline, /^\(\d{2}\) [2-5]\d{3}-\d{4}$/)
				assert.ok(codes.includes(landline.slice(1, 3)))
			}
		}
	})

	it('every state has both a CEP range and area codes', () => {
		assert.deepEqual(Object.keys(CEP_RANGES).sort(), Object.keys(AREA_CODES).sort())
		assert.equal(Object.keys(CEP_RANGES).length, 27)
	})
})
