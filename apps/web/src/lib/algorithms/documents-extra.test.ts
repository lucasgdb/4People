import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
	binError,
	binInfo,
	CARD_BRANDS,
	type CardBrand,
	convertPlate,
	detectCardBrand,
	embossedName,
	exportCards,
	generateCard,
	generateCNH,
	generatePIS,
	generatePlate,
	generateRENAVAM,
	generateVoterId,
	luhnValid,
	plateFormat,
	VOTER_UFS,
	validateCard,
	validateCNH,
	validatePIS,
	validateRENAVAM,
	validateVoterId,
} from './documents.ts'

describe('more documents', () => {
	it('generated CNH, PIS, RENAVAM and voter IDs validate', () => {
		for (let i = 0; i < 300; i += 1) {
			assert.equal(validateCNH(generateCNH()).valid, true)
			assert.equal(validatePIS(generatePIS()).valid, true)
			assert.equal(validateRENAVAM(generateRENAVAM()).valid, true)
			assert.equal(validateVoterId(generateVoterId()).valid, true)
		}
	})
	it('rejects a changed digit and repeated sequences', () => {
		const flip = (doc: string) => doc.slice(0, -1) + ((Number(doc.at(-1)) + 1) % 10)
		assert.equal(validateCNH(flip(generateCNH())).valid, false)
		assert.equal(validatePIS(flip(generatePIS({ punctuation: false }))).valid, false)
		assert.equal(validateRENAVAM(flip(generateRENAVAM())).valid, false)
		assert.equal(validateCNH('11111111111').valid, false)
		assert.equal(validatePIS('000.00000.00-0').valid, false)
	})
	it('known valid numbers from public examples', () => {
		assert.equal(validatePIS('120.5481.209-6').valid, false) // wrong DV
		assert.equal(validatePIS('12054812091').valid, false)
		// Voter ID: SP (01) with the SP/MG rule, and the state is reported.
		const sp = generateVoterId({ uf: '01' })
		assert.equal(validateVoterId(sp).state, 'SP')
		assert.equal(validateVoterId(generateVoterId({ uf: '28' })).state, 'Exterior (ZZ)')
		assert.equal(Object.keys(VOTER_UFS).length, 28)
	})
	it('cards: Luhn, brand detection, generation per brand', () => {
		assert.equal(luhnValid('4111111111111111'), true)
		assert.equal(luhnValid('4111111111111112'), false)
		assert.equal(detectCardBrand('4111111111111111'), 'visa')
		assert.equal(detectCardBrand('5555555555554444'), 'mastercard')
		assert.equal(detectCardBrand('378282246310005'), 'amex')
		assert.equal(detectCardBrand('6362970000457013'), 'elo')
		assert.equal(validateCard('3782 822463 10005').valid, true)
		for (const brand of Object.keys(CARD_BRANDS) as CardBrand[]) {
			for (let i = 0; i < 20; i += 1) {
				const card = generateCard(brand)
				const check = validateCard(card.number)
				assert.equal(check.valid, true, `${brand} ${card.number}`)
				assert.equal(check.brand, brand)
				assert.equal(card.cvv.length, CARD_BRANDS[brand].cvv)
			}
		}
	})
	it('cards: custom BIN, expiry modes, fixed CVV', () => {
		const now = new Date('2026-11-08T12:00:00Z')
		const fromBin = generateCard('visa', now, { bin: '516292' })
		assert.ok(fromBin.digits.startsWith('516292'))
		assert.equal(fromBin.brand, 'mastercard')
		assert.equal(validateCard(fromBin.digits).valid, true)
		const amex = generateCard('visa', now, { bin: '37', cvv: '1234' })
		assert.equal(amex.digits.length, 15)
		assert.equal(amex.cvv, '1234')
		// A CVV of the wrong length is ignored: the brand's length wins.
		assert.equal(generateCard('visa', now, { cvv: '12' }).cvv.length, 3)
		assert.equal(binInfo('9999').brand, null)
		assert.equal(generateCard('visa', now, { bin: '9999' }).digits.length, 16)
		assert.equal(binError('12a4'), 'Use só números no BIN.')
		assert.equal(binError('4'.repeat(15)), 'Use no máximo 14 dígitos neste BIN.')
		assert.equal(binError(''), null)
		for (let i = 0; i < 30; i += 1) {
			const future = generateCard('visa', now)
			assert.ok(Number(future.year) >= 2027 && Number(future.year) <= 2031)
			const expired = generateCard('visa', now, { expiry: 'expired' })
			assert.ok(Number(expired.year) >= 2023 && Number(expired.year) <= 2025)
		}
		const custom = generateCard('visa', now, { expiry: 'custom', month: 3, year: 2030 })
		assert.equal(custom.expiry, '03/30')
		assert.equal(custom.month, '03')
		assert.equal(custom.year, '2030')
	})
	it('cards: export formats and embossed names', () => {
		const card = {
			brand: 'visa' as const,
			digits: '4111111111111111',
			number: '4111 1111 1111 1111',
			month: '09',
			year: '2027',
			expiry: '09/27',
			cvv: '123',
		}
		assert.equal(exportCards([card], 'text'), '4111 1111 1111 1111 09/27 123')
		assert.equal(exportCards([card], 'text', false), '4111111111111111 09/27 123')
		assert.equal(exportCards([card], 'pipe'), '4111111111111111|09|2027|123')
		assert.equal(
			exportCards([card], 'csv'),
			'bandeira,numero,mes,ano,cvv\nVisa,4111111111111111,09,2027,123',
		)
		const withHolder = [{ ...card, holder: 'ANA C SOUZA' }]
		assert.equal(exportCards(withHolder, 'pipe'), '4111111111111111|09|2027|123|ANA C SOUZA')
		assert.deepEqual(JSON.parse(exportCards(withHolder, 'json')), [
			{
				bandeira: 'Visa',
				numero: '4111 1111 1111 1111',
				validade: '09/27',
				cvv: '123',
				titular: 'ANA C SOUZA',
			},
		])
		assert.equal(embossedName('Ana Clara de Souza'), 'ANA C D SOUZA')
		assert.equal(embossedName('João Silva'), 'JOAO SILVA')
	})
	it('plates: generate, detect and convert both ways', () => {
		assert.equal(plateFormat(generatePlate('old')), 'old')
		assert.equal(plateFormat(generatePlate('mercosul')), 'mercosul')
		assert.equal(convertPlate('ABC-1234'), 'ABC1C34')
		assert.equal(convertPlate('abc1c34'), 'ABC-1234')
		assert.throws(() => convertPlate('ABC1K34'))
		assert.throws(() => convertPlate('12345'))
	})
})
