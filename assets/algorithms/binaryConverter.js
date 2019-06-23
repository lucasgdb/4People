const binaryToText = binaryCode => {
	return binaryCode
		.split(' ') // splits the text into an array
		.map(binary => parseInt(binary, 2)) // converts each binary code to an equivalent number
		.map(number => String.fromCharCode(number)) // converts each number to an equivalent char (ascii)
		.join('') // transforms the array in a text again
}

const textToBinary = text => {
	return text
		.split('') // splits the text into an array
		.map(char => char.charCodeAt(0)) // converts each char to an equivalent number (ascii)
		.map(number => number.toString(2)) // converts each number to an equivalent binary code
		.join(' ') // transforms the array in a text again
}
