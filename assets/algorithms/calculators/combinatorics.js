const calculateCombination = (n, p) => {
	// Cnp = n! / p! * (n - p)!
	let nFactorial = 1
	let pFactorial = 1

	for (let i = n; i > n - p; i--) nFactorial *= i

	for (let i = p; i > 0; i--) pFactorial *= i

	const formatter = Intl.NumberFormat('pt-BR')
	return formatter.format(nFactorial / pFactorial)
}
