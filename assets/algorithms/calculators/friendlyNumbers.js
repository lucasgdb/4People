const areFriendlyNumber = (firstNumber, secondNumber) => {
	let firstSum = 1
	let secondSum = 1
	const firstNumBy2 = firstNumber / 2
	const secondNumBy2 = secondNumber / 2

	for (let i = 2; i <= firstNumBy2; i += 1) {
		if (firstNumber % i === 0) firstSum += i

		if (firstSum > secondNumber) return false
	}

	for (let i = 2; i <= secondNumBy2; i += 1) {
		if (secondNumber % i === 0) secondSum += i

		if (secondSum > firstNumber) return false
	}

	if (firstSum === secondNumber && secondSum === firstNumber) return true
	else return false
}
