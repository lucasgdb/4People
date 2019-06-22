function calculateFacorization(number) {
	if (number != 1) {
		let by = 2
		let result = []

		do {
			let count = 0
			if (number % by === 0) {
				number /= by
				count++
			}

			if (count === 0) {
				by++
			} else {
				result.push(by)
			}
		} while (number > 1)

		const noRepeatedResults = [...new Set(result)]

		const amount = []
		for (let i = 0; i < noRepeatedResults.length; i++) {
			amount.push({
				"number": noRepeatedResults[i],
				"toThe": countItems(result, noRepeatedResults[i])
			})
		}

		return {
			result,
			amount
		}
	} else {
		return {
			"result": [1],
			"amount": [{
				"number": [1],
				"toThe": 1
			}]
		}
	}
}

function countItems(array, item) {
	let sum = 0
	for (let i = 0; i < array.length; i++) {
		if (array[i] === item) {
			sum++
		} else if (sum > 0 && array[i] !== item) {
			break
		}
	}

	return sum
}
