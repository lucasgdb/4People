const validateRG = (RG = Array) => {
	if (RG.length === 9) {
		const multipliers = [2, 3, 4, 5, 6, 7, 8, 9]

		let DV = multipliers.map((multiplier, index) => multiplier * RG[index]).reduce((n1, n2) => n1 + n2) % 11

		RG[RG.length - 1] = RG[RG.length - 1] === 'x' ? 'X' : RG[RG.length - 1]

		return {
			isRG: RG[RG.length - 1] == (DV === 0 ? '0' : DV === 1 ? 'X' : 11 - DV),
			RG: fixRG(RG)
		}
	} else {
		return {
			isRG: false,
			RG
		};
	}
}

const fixRG = RG => {
	RG.splice(2, 0, '.')
	RG.splice(6, 0, '.')
	RG.splice(10, 0, '-')

	return RG.join('')
}
