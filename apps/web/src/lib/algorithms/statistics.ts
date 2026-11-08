const sumOf = (values: readonly number[]) => values.reduce((total, value) => total + value, 0)

function weightedMeanOf(values: readonly number[], weights: readonly number[]): number | null {
	const weightTotal = sumOf(weights)
	if (weightTotal === 0) return null
	const weightedSum = values.reduce(
		(total, value, index) => total + value * (weights[index] ?? 0),
		0,
	)
	return weightedSum / weightTotal
}

function medianOf(sorted: readonly number[]): number {
	const middle = Math.floor(sorted.length / 2)
	if (sorted.length % 2 === 1) return sorted[middle] ?? 0
	return ((sorted[middle - 1] ?? 0) + (sorted[middle] ?? 0)) / 2
}

/** The most frequent values, ascending; none when no value repeats. */
function modesOf(values: readonly number[]): number[] {
	const counts = new Map<number, number>()
	for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1)
	const highestCount = Math.max(...counts.values())
	if (highestCount <= 1) return []
	return [...counts]
		.filter(([, count]) => count === highestCount)
		.map(([value]) => value)
		.sort((a, b) => a - b)
}

/** Mean, weighted mean, median, mode(s), range and standard deviation of a list of numbers. */
export function describe(values: readonly number[], weights?: readonly number[]) {
	if (values.length === 0) throw new Error('Informe pelo menos um número.')
	if (weights && weights.length !== values.length) {
		throw new Error('Informe um peso para cada valor.')
	}
	const count = values.length
	const sum = sumOf(values)
	const mean = sum / count
	const sorted = [...values].sort((a, b) => a - b)
	const min = sorted[0] ?? 0
	const max = sorted.at(-1) ?? 0

	const squaredDeviations = values.reduce((total, value) => total + (value - mean) ** 2, 0)
	const populationVariance = squaredDeviations / count
	const sampleVariance = count > 1 ? squaredDeviations / (count - 1) : 0

	return {
		count,
		sum,
		mean,
		weightedMean: weights ? weightedMeanOf(values, weights) : null,
		median: medianOf(sorted),
		modes: modesOf(values),
		min,
		max,
		range: max - min,
		populationStdDev: Math.sqrt(populationVariance),
		sampleStdDev: Math.sqrt(sampleVariance),
	}
}
