const generateCNPJ = (ponctuation = true) => {
	const CNPJ = []
	const multipliers1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
	const multipliers2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

	for (let i = 0; i < 8; i++) {
		CNPJ.push(Math.floor(Math.random() * 10))
	}

	CNPJ.push(0, 0, 0, 1)

	const DV1 = multipliers1.map((multiplier, index) => multiplier * CNPJ[index]).reduce((n1, n2) => n1 + n2) % 11;
	CNPJ.push(DV1 < 2 ? 0 : 11 - DV1)

	const DV2 = multipliers2.map((multiplier, index) => multiplier * CNPJ[index]).reduce((n1, n2) => n1 + n2) % 11;
	CNPJ.push(DV2 < 2 ? 0 : 11 - DV2)

	if (ponctuation) {
		CNPJ.splice(2, 0, '.')
		CNPJ.splice(6, 0, '.')
		CNPJ.splice(10, 0, '/')
		CNPJ.splice(15, 0, '-')
	}

	return CNPJ.join('');
}
