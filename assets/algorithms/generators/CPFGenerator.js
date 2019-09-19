const generateCPF = (ponctuation = true, state = '-1') => {
	let CPF = []
	let firstSum = 0
	let secondSum = 0
	const firstTimes = [10, 9, 8, 7, 6, 5, 4, 3, 2]
	const secondTimes = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]

	for (let i = 0; i < 9; i += 1) {
		if (i === 8 && state !== '-1') CPF.push(state)
		else CPF.push(Math.floor(Math.random() * 10))
	}

	for (let i = 0; i < firstTimes.length; i += 1) firstSum += CPF[i] * firstTimes[i]

	const rest = firstSum % 11
	CPF.push(rest < 2 ? 0 : 11 - rest)

	for (let i = 0; i < secondTimes.length; i += 1) secondSum += CPF[i] * secondTimes[i]

	const rest2 = secondSum % 11
	CPF.push(rest2 < 2 ? 0 : 11 - rest2)

	if (ponctuation) {
		CPF.splice(3, 0, '.')
		CPF.splice(7, 0, '.')
		CPF.splice(11, 0, '-')
	}

	return CPF.join('')
}
