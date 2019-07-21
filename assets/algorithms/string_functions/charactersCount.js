const countCharacters = (text) => {
	return {
		totalCharacters: text.length, // returns the string length
		charWithoutSpaces: text.replace(/[ \n]/g, '').length, // returns the string length without spaces
		words: text.replace(/\n/g, '').split(' ').filter(word => word !== '').length, // returns the total words
		spaces: text.split('').filter(word => word === ' ').length, // returns the total spaces
		vowels: text.split('').filter(letter => 'aeiou'.includes(letter)).length, // returns the total vowelss
		consonant: text.split('').filter(letter => 'bcdfghjklmnpqrstvwxyz'.includes(letter)).length, // returns the total consonants
		numbers: text.split('').filter(letter => Number.isInteger(parseInt(letter))).length, // returns the total numbers
		lines: text.split('').filter(letter => letter === '\n').length + (text.length > 0 ? 1 : 0) // returns the total lines
	}
}
