const generatePassword = (
	length = 12, // integer
	firstChar = 'number', // string 'number', 'upperCase', 'lowerCase', 'special'
	number = false, // boolean
	upperCase = false, // boolean
	lowerCase = true, // boolean
	special = false, // boolean
	additionalChars = '', // string
	excludeEqualChars = true, // boolean
	excludeSimilarChars = true,
	verifyPasswordStrength = true // boolean
) => {
	let characters = ''
	let password = ''
	const numbers = '01234567890'
	const upperCases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const lowerCases = 'abcdefghijklmnopqrstuvwxyz'
	const specials = `!@#$%&*()=[]{}${additionalChars}`

	if (number) characters += numbers
	if (upperCase) characters += upperCases
	if (lowerCase) characters += lowerCases
	if (special) characters += specials

	if (firstChar === 'number') password += numbers[Math.floor(Math.random() * numbers.length)]
	else if (firstChar === 'upperCase') password += upperCases[Math.floor(Math.random() * upperCases.length)]
	else if (firstChar === 'lowerCase') password += lowerCases[Math.floor(Math.random() * lowerCases.length)]
	else password += specials[Math.floor(Math.random() * specials.length)]

	for (let i = 1; i < length; i++) {
		let char = characters[Math.floor(Math.random() * characters.length)]

		do {
			const passChar = password[i - 1]
			if (excludeEqualChars) {
				while (passChar === char) char = characters[Math.floor(Math.random() * characters.length)]
			}

			if (excludeSimilarChars) {
				while (
					passChar === 'i' && char === 'l' ||
					passChar === 'l' && char === 'i' ||
					passChar === 'o' && char === 'O' ||
					passChar === 'O' && char === 'o' ||
					passChar === '0' && char === 'O' ||
					passChar === 'O' && char === '0' ||
					passChar === '0' && char === 'o' ||
					passChar === 'o' && char === '0' ||
					passChar === 'I' && char === 'i' ||
					passChar === 'i' && char === 'I' ||
					passChar === 'l' && char === 'L' ||
					passChar === 'L' && char === 'l' ||
					passChar === 'j' && char === 'i' ||
					passChar === 'i' && char === 'j' ||
					passChar === 'l' && char === 'j' ||
					passChar === 'j' && char === 'l' ||
					passChar === 'l' && char === '1' ||
					passChar === '1' && char === 'l' ||
					passChar === 'g' && char === 'q' ||
					passChar === 'q' && char === 'g'
				) {
					char = characters[Math.floor(Math.random() * characters.length)]
				}

			}
		} while (excludeEqualChars && password[i - 1] === char)

		password += char
	}

	return {
		password,
		strength: verifyPasswordStrength ? checkStrength(password) : null
	}
}

const checkStrength = password => {
	let length = 0

	length += Math.min(6, password.length) * 10
	length += Math.min(2, password.length - password.replace(/[A-Z]/g, '').length) * 5
	length += Math.min(2, password.length - password.replace(/[a-z]/g, '').length) * 5
	length += Math.min(2, password.length - password.replace(/[0-9]/g, '').length) * 5
	length += Math.min(2, password.replace(/[a-zA-Z0-9]/g, '').length) * 5

	for (let i = 1; i < password.length; i++) {
		if (password[i - 1] === password[i]) {
			length -= 30
			break
		}
	}

	if (length < 50) return 'Inaceitável'
	else if (length < 60) return 'Baixo'
	else if (length < 80) return 'Mediana'
	else if (length < 100) return 'Boa'
	else return 'Forte'
}
