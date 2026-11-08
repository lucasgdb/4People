/** Mean, weighted mean, median, mode(s), range and standard deviation of a list of numbers. */
export function describe(values: readonly number[], weights?: readonly number[]) {
	if (values.length === 0) throw new Error('Informe pelo menos um número.')
	if (weights && weights.length !== values.length)
		throw new Error('Informe um peso para cada valor.')
	const n = values.length
	const sum = values.reduce((acc, value) => acc + value, 0)
	const mean = sum / n

	const weightTotal = weights?.reduce((acc, weight) => acc + weight, 0) ?? 0
	const weightedMean =
		weights && weightTotal !== 0
			? values.reduce((acc, value, i) => acc + value * (weights[i] ?? 0), 0) / weightTotal
			: null

	const sorted = [...values].sort((a, b) => a - b)
	const middle = Math.floor(n / 2)
	const median =
		n % 2 === 1 ? (sorted[middle] ?? 0) : ((sorted[middle - 1] ?? 0) + (sorted[middle] ?? 0)) / 2

	const counts = new Map<number, number>()
	for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1)
	const top = Math.max(...counts.values())
	// No mode when every value appears the same number of times ("amodal").
	const modes =
		top > 1
			? [...counts]
					.filter(([, count]) => count === top)
					.map(([value]) => value)
					.sort((a, b) => a - b)
			: []

	const variance = values.reduce((acc, value) => acc + (value - mean) ** 2, 0) / n
	const sampleVariance =
		n > 1 ? values.reduce((acc, value) => acc + (value - mean) ** 2, 0) / (n - 1) : 0

	return {
		count: n,
		sum,
		mean,
		weightedMean,
		median,
		modes,
		min: sorted[0] ?? 0,
		max: sorted.at(-1) ?? 0,
		range: (sorted.at(-1) ?? 0) - (sorted[0] ?? 0),
		populationStdDev: Math.sqrt(variance),
		sampleStdDev: Math.sqrt(sampleVariance),
	}
}
