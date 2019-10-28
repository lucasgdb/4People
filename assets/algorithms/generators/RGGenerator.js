const generateRG = (ponctuation = true) => {
	const RG = []

	for (let i = 0; i < 8; i++) {
		RG.push(Math.floor(Math.random() * 10))
	}

	const resto = RG.map((number, index) => number * (index + 2)).reduce((n1, n2) => n1 + n2) % 11

	RG.push(resto === 0 ? '0' : resto === 1 ? 'X' : 11 - resto)

	if (ponctuation) {
		RG.splice(2, 0, '.')
		RG.splice(6, 0, '.')
		RG.splice(10, 0, '-')
	}

	return RG.join('')
}
