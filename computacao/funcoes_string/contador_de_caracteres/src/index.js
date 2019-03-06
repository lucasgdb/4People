const txtText = document.querySelector('#text')
const chars = document.querySelector('#chars')
const charsWSpaces = document.querySelector('#charsWSpaces')
const words = document.querySelector('#words')
const spaces = document.querySelector('#spaces')
const vowels = document.querySelector('#vowels')
const consonants = document.querySelector('#consonants')
const numbers = document.querySelector('#numbers')
const lines = document.querySelector('#lines')

function countChars() {
    const result = countCharacters(txtText.value)

    chars.textContent = result.totalCharacters
    charsWSpaces.textContent = result.charWithoutSpaces
    words.textContent = result.words
    spaces.textContent = result.spaces
    vowels.textContent = result.vowels
    consonants.textContent = result.consonant
    numbers.textContent = result.numbers
    lines.textContent = result.lines
}