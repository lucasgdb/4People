const isPrimeNumber = numbers => {
	const primeNumbers = []

	for (let j = 0; j < numbers.length; j++) {
		let sum = 1

		for (let i = 2; i < numbers[j]; i++) {
			if (numbers[j] % i === 0) sum++

			if (sum > 1) break
		}

		if (sum === 1) primeNumbers.push(numbers[j])
	}

	return primeNumbers
}
