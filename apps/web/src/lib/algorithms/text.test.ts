import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { generateName, generateNames } from './names.ts'
import { generatePassword } from './password.ts'
import { convertCase, countCharacters } from './text.ts'

describe('text', () => {
	it('counts characters', () => {
		const result = countCharacters('Olá mundo 42\nlinha')
		assert.equal(result.words, 4)
		assert.equal(result.lines, 2)
		assert.equal(result.numbers, 2)
		assert.equal(result.vowels, 6)
	})
	it('converts case, splitting camelCase and dropping accents in identifiers', () => {
		assert.equal(convertCase('Ação de teste', 'snake'), 'acao_de_teste')
		assert.equal(convertCase('getUserID from API', 'kebab'), 'get-user-id-from-api')
		assert.equal(convertCase('nome do usuário', 'camel'), 'nomeDoUsuario')
		assert.equal(convertCase('nome do usuário', 'pascal'), 'NomeDoUsuario')
		assert.equal(convertCase('max retries', 'constant'), 'MAX_RETRIES')
		assert.equal(convertCase('olá mundo. tudo bem?', 'sentence'), 'Olá mundo. Tudo bem?')
		assert.equal(convertCase('JOÃO DA SILVA', 'title'), 'João Da Silva')
	})
	it('generates passwords honoring constraints', () => {
		const password = generatePassword({
			length: 24,
			firstChar: 'upperCase',
			charsets: ['lowerCase', 'number'],
		})
		assert.equal(password.length, 24)
		assert.match(password, /^[A-Z][a-z0-9]+$/)
		assert.doesNotMatch(password, /(.)\1/)
	})
	it('generates names in the requested format', () => {
		assert.equal(generateNames(25, 'first-last', 'any').length, 25)
		for (let i = 0; i < 50; i += 1) {
			const full = generateName('full', 'female').split(' ')
			assert.ok(full.length >= 3, full.join(' '))
			assert.ok(!/^(Sr|Sra|Dr|Dra)\.?$/.test(full[0] ?? ''))
		}
	})
})
