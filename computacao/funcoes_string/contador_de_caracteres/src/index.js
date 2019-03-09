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

    const formatter = Intl.NumberFormat('pt-BR')

    chars.textContent = formatter.format(result.totalCharacters)
    charsWSpaces.textContent = formatter.format(result.charWithoutSpaces)
    words.textContent = formatter.format(result.words)
    spaces.textContent = formatter.format(result.spaces)
    vowels.textContent = formatter.format(result.vowels)
    consonants.textContent = formatter.format(result.consonant)
    numbers.textContent = formatter.format(result.numbers)
    lines.textContent = formatter.format(result.lines)
}