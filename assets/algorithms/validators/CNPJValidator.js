const validateCNPJ = (CNPJ = Array) => {
	if (CNPJ.length === 14) {
		if (CNPJ.filter(number => number === CNPJ[0]).length === 14) {
			return {
				isCNPJ: false,
				CNPJ: fixCNPJ(CNPJ)
			}
		}

		const multipliers1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
		const multipliers2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

		let DV1 = multipliers1.map((multiplier, index) => multiplier * CNPJ[index]).reduce((n1, n2) => n1 + n2) % 11;

		DV1 = DV1 < 2 ? 0 : 11 - DV1

		let DV2 = multipliers2.map((multiplier, index) => multiplier * CNPJ[index]).reduce((n1, n2) => n1 + n2) % 11;

		DV2 = DV2 < 2 ? 0 : 11 - DV2

		return {
			isCNPJ: CNPJ[CNPJ.length - 2] == DV1 && CNPJ[CNPJ.length - 1] == DV2,
			CNPJ: fixCNPJ(CNPJ)
		}
	} else {
		return {
			isCNPJ: false,
			CNPJ
		};
	}
}

const fixCNPJ = CNPJ => {
	CNPJ.splice(2, 0, '.')
	CNPJ.splice(6, 0, '.')
	CNPJ.splice(10, 0, '/')
	CNPJ.splice(15, 0, '-')

	return CNPJ.join('')
}
