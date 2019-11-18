const calculateArrangement = (n, p) => {
	// Anp = n! / (n - p)!
	let nFactorial = 1

	for (let i = n; i > n - p; i--) nFactorial *= i

	const formatter = Intl.NumberFormat('pt-BR')
	return formatter.format(nFactorial)
}
