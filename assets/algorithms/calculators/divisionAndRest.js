const calculateDivision = (dividend, divider) => {
	return {
		coeficient: dividend / divider,
		integerCoeficient: Math.trunc(dividend / divider),
		rest: dividend % divider
	}
}
