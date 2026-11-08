/**
 * Contas de porcentagem. Todas recebem e devolvem números "humanos": 15 quer dizer 15%, não 0,15.
 * Divisões por zero devolvem `NaN`/`Infinity`; quem chama valida antes (veja a tela da ferramenta).
 */

/** Quanto é `percent`% de `value`? 15% de 200 = 30. */
export const percentOf = (percent: number, value: number) => (percent / 100) * value

/** `part` é quantos % de `whole`? 30 de 200 = 15%. */
export const percentOfWhole = (part: number, whole: number) => (part / whole) * 100

/** `part` é `percent`% de qual valor? 30 é 15% de 200. */
export const wholeFromPart = (part: number, percent: number) => part / (percent / 100)

/** Variação percentual de `from` para `to`: positiva é aumento, negativa é queda. 50 → 75 = +50%. */
export const percentChange = (from: number, to: number) => ((to - from) / Math.abs(from)) * 100

/** `value` com acréscimo de `percent`%. 200 + 10% = 220. */
export const addPercent = (value: number, percent: number) => value * (1 + percent / 100)

/** `value` com desconto de `percent`%. 200 − 10% = 180. */
export const subtractPercent = (value: number, percent: number) => value * (1 - percent / 100)

/**
 * Valor antes de uma variação: `final` já com `percent`% aplicado (negativo para desconto).
 * 220 depois de +10% era 200; 180 depois de −10% era 200.
 */
export const valueBeforeChange = (final: number, percent: number) => final / (1 + percent / 100)

/**
 * Variações aplicadas uma depois da outra (+10%, −20%…) e a variação única equivalente.
 * +10% e depois −10% não volta ao valor inicial: o total é −1%.
 */
export function chainChanges(changes: readonly number[]) {
	const factor = changes.reduce((acc, change) => acc * (1 + change / 100), 1)
	return { factor, total: (factor - 1) * 100 }
}

/**
 * Margem e markup a partir do custo e do preço de venda.
 * Margem: lucro sobre o preço de venda. Markup: lucro sobre o custo.
 * Custo 80, venda 100: lucro 20, margem 20%, markup 25%.
 */
export function marginAndMarkup(cost: number, price: number) {
	const profit = price - cost
	return { profit, margin: (profit / price) * 100, markup: (profit / cost) * 100 }
}

/**
 * Diferença entre duas taxas: em pontos percentuais (subtração) e em variação relativa.
 * De 10% para 12%: +2 p.p., que é um aumento de 20% na taxa.
 */
export function rateDifference(fromRate: number, toRate: number) {
	return { points: toRate - fromRate, relative: percentChange(fromRate, toRate) }
}

/** Lê uma lista como "+10, -5; 2,5%" (vírgula seguida de número é decimal) e devolve os números, ou `null` se algum item não for número. */
export function parseChanges(input: string): number[] | null {
	const items = input
		.split(/[;\s]+|,(?=[\s+-])/)
		.map((item) => item.trim().replace(/%$/, '').replace(/\s/g, '').replace(',', '.'))
		.filter(Boolean)
	const numbers = items.map(Number)
	return numbers.length > 0 && numbers.every(Number.isFinite) ? numbers : null
}
