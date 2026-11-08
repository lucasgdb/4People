import { randomInt } from './random.ts'

const WORDS =
	'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum curabitur pretium tincidunt lacus nulla gravida orci a odio nullam varius turpis et commodo pharetra eros bibendum elit nec luctus magna felis sollicitudin mauris integer dignissim'.split(
		' ',
	)

const OPENING = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

const pick = () => WORDS[randomInt(WORDS.length)] ?? 'lorem'
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

function sentence(): string {
	const words = Array.from({ length: 6 + randomInt(10) }, pick)
	// A comma in longer sentences, like real Latin prose.
	if (words.length > 9) words[3 + randomInt(4)] += ','
	return `${capitalize(words.join(' '))}.`
}

function paragraph(startWithLorem: boolean): string {
	const sentences = Array.from({ length: 4 + randomInt(4) }, sentence)
	if (startWithLorem) sentences[0] = `${OPENING}. ${sentences[0]}`
	return sentences.join(' ')
}

export type LoremUnit = 'paragraphs' | 'sentences' | 'words'

export function generateLorem(amount: number, unit: LoremUnit, startWithLorem = true): string {
	if (unit === 'paragraphs')
		return Array.from({ length: amount }, (_, i) => paragraph(startWithLorem && i === 0)).join(
			'\n\n',
		)
	if (unit === 'sentences') {
		const sentences = Array.from({ length: amount }, sentence)
		if (startWithLorem) sentences[0] = `${OPENING}.`
		return sentences.join(' ')
	}
	const words = Array.from({ length: amount }, pick)
	if (startWithLorem)
		words.splice(
			0,
			Math.min(5, amount),
			...'lorem ipsum dolor sit amet'.split(' ').slice(0, Math.min(5, amount)),
		)
	return capitalize(words.join(' '))
}
