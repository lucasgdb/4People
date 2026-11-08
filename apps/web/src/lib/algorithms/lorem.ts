import { randomInt } from './random.ts'

const WORDS =
	'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum curabitur pretium tincidunt lacus nulla gravida orci a odio nullam varius turpis et commodo pharetra eros bibendum elit nec luctus magna felis sollicitudin mauris integer dignissim'.split(
		' ',
	)

const OPENING_SENTENCE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
const OPENING_WORDS = ['lorem', 'ipsum', 'dolor', 'sit', 'amet']

const randomWord = () => WORDS[randomInt(WORDS.length)] ?? 'lorem'
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

/** 6 to 15 words; longer ones get a comma, like real Latin prose. */
function randomSentence(): string {
	const words = Array.from({ length: 6 + randomInt(10) }, randomWord)
	if (words.length > 9) words[3 + randomInt(4)] += ','
	return `${capitalize(words.join(' '))}.`
}

/** 4 to 7 sentences. */
function randomParagraph(startWithLorem: boolean): string {
	const sentences = Array.from({ length: 4 + randomInt(4) }, randomSentence)
	if (startWithLorem) sentences[0] = `${OPENING_SENTENCE}. ${sentences[0]}`
	return sentences.join(' ')
}

function paragraphs(amount: number, startWithLorem: boolean): string {
	return Array.from({ length: amount }, (_, index) =>
		randomParagraph(startWithLorem && index === 0),
	).join('\n\n')
}

function sentences(amount: number, startWithLorem: boolean): string {
	const sentenceList = Array.from({ length: amount }, randomSentence)
	if (startWithLorem) sentenceList[0] = `${OPENING_SENTENCE}.`
	return sentenceList.join(' ')
}

function words(amount: number, startWithLorem: boolean): string {
	const wordList = Array.from({ length: amount }, randomWord)
	if (startWithLorem) wordList.splice(0, OPENING_WORDS.length, ...OPENING_WORDS.slice(0, amount))
	return capitalize(wordList.join(' '))
}

export type LoremUnit = 'paragraphs' | 'sentences' | 'words'

export function generateLorem(amount: number, unit: LoremUnit, startWithLorem = true): string {
	if (unit === 'paragraphs') return paragraphs(amount, startWithLorem)
	if (unit === 'sentences') return sentences(amount, startWithLorem)
	return words(amount, startWithLorem)
}
