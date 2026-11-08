import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { ASCII_TABLE } from './ascii.ts'
import { contrastRatio, formatColor, parseColor } from './color.ts'
import { crc32, md5 } from './crypto.ts'
import { fancyText } from './fancy.ts'
import { generateLorem } from './lorem.ts'
import { randomIntegers } from './random.ts'
import { charInfo, cleanText, htmlToText, sortLines, textToHtml, wordFrequency } from './text.ts'

const sortDefaults = {
	order: 'asc' as const,
	ignoreCase: true,
	natural: true,
	unique: false,
	removeEmpty: true,
	trim: true,
}

describe('text tools', () => {
	it('sorts like a Brazilian dictionary, naturally', () => {
		assert.deepEqual(sortLines('banana\nÁrvore\nabacate\n\nitem 10\nitem 2', sortDefaults), [
			'abacate',
			'Árvore',
			'banana',
			'item 2',
			'item 10',
		])
		assert.deepEqual(sortLines('b\na\nB', { ...sortDefaults, unique: true }), ['a', 'b'])
		assert.deepEqual(sortLines('a\nb', { ...sortDefaults, order: 'desc' }), ['b', 'a'])
	})
	it('counts word frequency, optionally without stopwords', () => {
		const { total, words } = wordFrequency('O gato e o rato. O gato fugiu!', {
			ignoreStopwords: true,
		})
		assert.equal(total, 4)
		assert.deepEqual(words[0], { word: 'gato', count: 2, share: 0.5 })
	})
	it('text ⇄ HTML', () => {
		assert.equal(textToHtml('a < b\nc\n\nnovo'), '<p>a &lt; b<br>\nc</p>\n<p>novo</p>')
		assert.equal(
			textToHtml('veja https://4people.dev.', { links: true, paragraphs: false }),
			'veja <a href="https://4people.dev">https://4people.dev</a>.',
		)
		assert.equal(htmlToText('<p>Ol&aacute; &amp; adeus<br>fim</p>'), 'Olá & adeus\nfim')
		assert.equal(htmlToText('&#x1F600;&#65;'), '😀A')
	})
	it('character info', () => {
		const [a, emoji] = charInfo('é😀')
		assert.equal(a?.codePoint, 'U+00E9')
		assert.equal(a?.utf8, 'C3 A9')
		assert.equal(emoji?.js, '\\u{1F600}')
		assert.equal(emoji?.utf16, 'D83D DE00')
		assert.equal(emoji?.kind, 'Emoji')
	})
	it('cleans text', () => {
		const options = {
			removeAccents: true,
			lineBreaks: 'space' as const,
			collapseSpaces: true,
			trimLines: true,
			removeEmptyLines: true,
		}
		assert.equal(cleanText('  Ação   rápida\n\n  ok  ', options), 'Acao rapida ok')
	})
	it('lorem ipsum', () => {
		assert.ok(generateLorem(3, 'paragraphs').startsWith('Lorem ipsum dolor sit amet'))
		assert.equal(generateLorem(3, 'paragraphs').split('\n\n').length, 3)
		assert.equal(generateLorem(12, 'words').split(' ').length, 12)
	})
	it('fancy letters', () => {
		assert.equal(fancyText('Ab1', 'bold'), '𝐀𝐛𝟏')
		assert.equal(fancyText('Hi', 'script'), 'ℋ𝒾')
		// Accents survive as combining marks on the styled letter (NFD: c + cedilla, a + tilde).
		assert.equal(fancyText('ação', 'bold'), '𝐚𝐜\u0327𝐚\u0303𝐨')
		assert.equal(fancyText('É', 'script'), 'ℰ\u0301')
		assert.equal(fancyText('pão', 'upsideDown'), 'oɐ\u0303d') // the tilde stays on its letter (the a)
		assert.equal(fancyText('Ç', 'circled'), 'Ⓒ\u0327')
		assert.equal(fancyText('ñ', 'monospace'), '𝚗\u0303')
		assert.equal(fancyText('ok', 'upsideDown'), 'ʞo')
	})
	it('md5 and crc32 test vectors', () => {
		assert.equal(md5(''), 'd41d8cd98f00b204e9800998ecf8427e')
		assert.equal(md5('abc'), '900150983cd24fb0d6963f7d28e17f72')
		assert.equal(
			md5('The quick brown fox jumps over the lazy dog'),
			'9e107d9d372bb6826bd81d3542a419d6',
		)
		assert.equal(md5('a'.repeat(1000)), 'cabe45dcc9ae5b66ba86600cca6b8ba8')
		assert.equal(crc32('123456789'), 'cbf43926')
		assert.equal(crc32('abc'), '352441c2')
	})
	it('colors', () => {
		const red = parseColor('#a62023')
		assert.deepEqual(red, { r: 166, g: 32, b: 35, alpha: 1 })
		assert.deepEqual(parseColor('rgb(166, 32, 35)'), red)
		const formats = formatColor(parseColor('#ff0000'))
		assert.equal(formats.hsl, 'hsl(0 100% 50%)')
		assert.equal(formats.oklch, 'oklch(62.8% 0.258 29.2)')
		assert.equal(formatColor(parseColor('hsl(120 100% 25%)')).hex, '#008000')
		assert.equal(Math.round(contrastRatio(parseColor('#000'), parseColor('#fff')) * 10) / 10, 21)
		assert.throws(() => parseColor('vermelho'))
	})
	it('random draw without repetition', () => {
		const draw = randomIntegers(1, 60, 6, true)
		assert.equal(new Set(draw).size, 6)
		assert.ok(draw.every((n) => n >= 1 && n <= 60))
		assert.throws(() => randomIntegers(1, 5, 6, true))
		assert.equal(new Set(randomIntegers(1, 10, 10, true)).size, 10)
	})
	it('ascii table', () => {
		assert.equal(ASCII_TABLE.length, 256)
		assert.equal(ASCII_TABLE[65]?.char, 'A')
		assert.equal(ASCII_TABLE[10]?.char, 'LF')
		assert.equal(ASCII_TABLE[231]?.char, 'ç')
	})
})
