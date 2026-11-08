'use client'

import { CopyButton } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { useAppForm } from '@/components/form/form'
import {
	addPercent,
	chainChanges,
	marginAndMarkup,
	parseChanges,
	percentChange,
	percentOf,
	percentOfWhole,
	rateDifference,
	subtractPercent,
	valueBeforeChange,
	wholeFromPart,
} from '@/lib/algorithms/percentage'
import { formatNumber } from '@/lib/format'

/* --------------------------------- helpers --------------------------------- */

/** "1.234,5" or "1234.5" → 1234.5; empty or invalid → null. */
function toNumber(raw: string): number | null {
	const text = raw.trim().replace(/%$/, '').replace(/\s/g, '')
	if (!text) return null
	const normalized = /,\d*$/.test(text) ? text.replace(/\./g, '').replace(',', '.') : text
	const value = Number(normalized)
	return Number.isFinite(value) ? value : null
}

/** Both inputs as numbers, or null while one is still empty. */
function parseBoth(rawA: string, rawB: string) {
	const a = toNumber(rawA)
	const b = toNumber(rawB)
	if (a === null || b === null) return null
	return [a, b] as const
}

const formatValue = (value: number) => formatNumber(value, 4)
const formatPercent = (value: number) => `${formatNumber(value, 2)}%`

function signOf(value: number) {
	if (value > 0) return '+'
	if (value < 0) return '−'
	return ''
}

const formatSigned = (value: number, unit = '%') =>
	`${signOf(value)}${formatNumber(Math.abs(value), 2)}${unit}`

/** Multiplier for a change, e.g. +10% → "1,1" and −10% → "0,9". */
const multiplierOf = (percent: number) => formatValue(1 + percent / 100)

function changeTag(change: number) {
	if (change > 0) return 'Aumento'
	if (change < 0) return 'Queda'
	return 'Sem variação'
}

/* --------------------------------- model ---------------------------------- */

type CalculatorInput = {
	name: 'a' | 'b'
	label: string
	placeholder: string
	suffix?: string
	/** A free-text list instead of one number. */
	list?: boolean
}

type Outcome =
	| { error: string }
	| {
			value: string
			/** How it was calculated, written out with the user's numbers. */
			steps: string
			/** A word that frames the result, such as "Aumento". */
			tag?: string
			extra?: ReadonlyArray<{ label: string; value: string }>
	  }

type Calculator = {
	id: string
	title: string
	/** The sentence, split around the inputs: text, input, text, input, text. */
	parts: readonly string[]
	inputs: readonly CalculatorInput[]
	compute: (a: string, b: string) => Outcome | null
}

const PERCENT_SUFFIX: Pick<CalculatorInput, 'suffix'> = { suffix: '%' }

const GROUPS: ReadonlyArray<{ title: string; calculators: readonly Calculator[] }> = [
	{
		title: 'O básico',
		calculators: [
			{
				id: 'percent-of',
				title: 'X% de um valor',
				parts: ['Quanto é', 'de', '?'],
				inputs: [
					{ name: 'a', label: 'Porcentagem', placeholder: '15', ...PERCENT_SUFFIX },
					{ name: 'b', label: 'Valor', placeholder: '200' },
				],
				compute: (a, b) => {
					const numbers = parseBoth(a, b)
					if (!numbers) return null
					const [percent, value] = numbers
					const result = percentOf(percent, value)
					return {
						value: formatValue(result),
						steps: `${formatValue(percent)} ÷ 100 × ${formatValue(value)} = ${formatValue(result)}`,
					}
				},
			},
			{
				id: 'percent-of-whole',
				title: 'Que porcentagem um valor é de outro',
				parts: ['', 'é quantos % de', '?'],
				inputs: [
					{ name: 'a', label: 'Parte', placeholder: '30' },
					{ name: 'b', label: 'Total', placeholder: '200' },
				],
				compute: (a, b) => {
					const numbers = parseBoth(a, b)
					if (!numbers) return null
					const [part, whole] = numbers
					if (whole === 0) return { error: 'O total não pode ser zero.' }
					const result = percentOfWhole(part, whole)
					return {
						value: formatPercent(result),
						steps: `${formatValue(part)} ÷ ${formatValue(whole)} × 100 = ${formatPercent(result)}`,
					}
				},
			},
			{
				id: 'whole-from-part',
				title: 'O total a partir de uma parte',
				parts: ['', 'é', 'de qual valor?'],
				inputs: [
					{ name: 'a', label: 'Parte', placeholder: '30' },
					{ name: 'b', label: 'Porcentagem', placeholder: '15', ...PERCENT_SUFFIX },
				],
				compute: (a, b) => {
					const numbers = parseBoth(a, b)
					if (!numbers) return null
					const [part, percent] = numbers
					if (percent === 0) return { error: 'A porcentagem não pode ser zero.' }
					const result = wholeFromPart(part, percent)
					return {
						value: formatValue(result),
						steps: `${formatValue(part)} ÷ (${formatValue(percent)} ÷ 100) = ${formatValue(result)}`,
					}
				},
			},
		],
	},
	{
		title: 'Aumentos e descontos',
		calculators: [
			{
				id: 'change',
				title: 'Variação percentual',
				parts: ['De', 'para', ''],
				inputs: [
					{ name: 'a', label: 'Valor inicial', placeholder: '50' },
					{ name: 'b', label: 'Valor final', placeholder: '75' },
				],
				compute: (a, b) => {
					const numbers = parseBoth(a, b)
					if (!numbers) return null
					const [from, to] = numbers
					if (from === 0) return { error: 'O valor inicial não pode ser zero.' }
					const result = percentChange(from, to)
					return {
						value: formatSigned(result),
						tag: changeTag(result),
						steps: `(${formatValue(to)} − ${formatValue(from)}) ÷ ${formatValue(Math.abs(from))} × 100 = ${formatSigned(result)}`,
					}
				},
			},
			{
				id: 'add',
				title: 'Acréscimo',
				parts: ['', 'com acréscimo de', ''],
				inputs: [
					{ name: 'a', label: 'Valor', placeholder: '200' },
					{ name: 'b', label: 'Porcentagem de acréscimo', placeholder: '10', ...PERCENT_SUFFIX },
				],
				compute: (a, b) => {
					const numbers = parseBoth(a, b)
					if (!numbers) return null
					const [value, percent] = numbers
					const result = addPercent(value, percent)
					return {
						value: formatValue(result),
						steps: `${formatValue(value)} × ${multiplierOf(percent)} = ${formatValue(result)}`,
						extra: [{ label: 'Acréscimo', value: formatValue(result - value) }],
					}
				},
			},
			{
				id: 'discount',
				title: 'Desconto',
				parts: ['', 'com desconto de', ''],
				inputs: [
					{ name: 'a', label: 'Valor', placeholder: '200' },
					{ name: 'b', label: 'Porcentagem de desconto', placeholder: '10', ...PERCENT_SUFFIX },
				],
				compute: (a, b) => {
					const numbers = parseBoth(a, b)
					if (!numbers) return null
					const [value, percent] = numbers
					const result = subtractPercent(value, percent)
					return {
						value: formatValue(result),
						steps: `${formatValue(value)} × ${multiplierOf(-percent)} = ${formatValue(result)}`,
						extra: [{ label: 'Economia', value: formatValue(value - result) }],
					}
				},
			},
			{
				id: 'before-change',
				title: 'Valor antes do aumento ou desconto',
				parts: ['Ficou', 'depois de variar', '. Quanto era?'],
				inputs: [
					{ name: 'a', label: 'Valor final', placeholder: '220' },
					{
						name: 'b',
						label: 'Variação (negativa para desconto)',
						placeholder: '10',
						...PERCENT_SUFFIX,
					},
				],
				compute: (a, b) => {
					const numbers = parseBoth(a, b)
					if (!numbers) return null
					const [final, percent] = numbers
					if (percent === -100) return { error: 'Um desconto de 100% zera qualquer valor.' }
					const result = valueBeforeChange(final, percent)
					return {
						value: formatValue(result),
						steps: `${formatValue(final)} ÷ ${multiplierOf(percent)} = ${formatValue(result)}`,
					}
				},
			},
			{
				id: 'chain',
				title: 'Variações sucessivas',
				parts: ['Aplicar', 'uma depois da outra'],
				inputs: [
					{
						name: 'a',
						label: 'Variações em %, separadas por vírgula',
						placeholder: '+10, -20, +5',
						list: true,
					},
				],
				compute: (a) => {
					if (!a.trim()) return null
					const changes = parseChanges(a)
					if (!changes) return { error: 'Use números separados por vírgula, como +10, -20, +5.' }
					const { factor: totalFactor, total: totalPercent } = chainChanges(changes)
					const simpleSum = changes.reduce((sum, change) => sum + change, 0)
					return {
						value: formatSigned(totalPercent),
						tag: 'Variação total',
						steps: `${changes.map(multiplierOf).join(' × ')} = ${formatValue(totalFactor)}`,
						extra: [{ label: 'Soma simples (errada)', value: formatSigned(simpleSum) }],
					}
				},
			},
		],
	},
	{
		title: 'Negócios e finanças',
		calculators: [
			{
				id: 'margin',
				title: 'Margem e markup',
				parts: ['Custo de', ', vendido por', ''],
				inputs: [
					{ name: 'a', label: 'Custo', placeholder: '80' },
					{ name: 'b', label: 'Preço de venda', placeholder: '100' },
				],
				compute: (a, b) => {
					const numbers = parseBoth(a, b)
					if (!numbers) return null
					const [cost, price] = numbers
					if (cost === 0 || price === 0)
						return { error: 'Custo e preço precisam ser diferentes de zero.' }
					const { profit, margin, markup } = marginAndMarkup(cost, price)
					return {
						value: formatPercent(margin),
						tag: 'Margem',
						steps: `(${formatValue(price)} − ${formatValue(cost)}) ÷ ${formatValue(price)} × 100 = ${formatPercent(margin)}`,
						extra: [
							{ label: 'Markup (sobre o custo)', value: formatPercent(markup) },
							{ label: profit < 0 ? 'Prejuízo' : 'Lucro', value: formatValue(Math.abs(profit)) },
						],
					}
				},
			},
			{
				id: 'points',
				title: 'Pontos percentuais',
				parts: ['A taxa foi de', 'para', ''],
				inputs: [
					{ name: 'a', label: 'Taxa inicial', placeholder: '10', ...PERCENT_SUFFIX },
					{ name: 'b', label: 'Taxa final', placeholder: '12', ...PERCENT_SUFFIX },
				],
				compute: (a, b) => {
					const numbers = parseBoth(a, b)
					if (!numbers) return null
					const [from, to] = numbers
					const { points, relative } = rateDifference(from, to)
					return {
						value: formatSigned(points, ' p.p.'),
						tag: 'Diferença',
						steps: `${formatValue(to)}% − ${formatValue(from)}% = ${formatSigned(points, ' p.p.')}`,
						extra:
							from === 0
								? []
								: [{ label: 'Variação relativa da taxa', value: formatSigned(relative) }],
					}
				},
			},
		],
	},
]

/* --------------------------------- screen --------------------------------- */

/**
 * Splits the words after the last input. A leading mark (". Quanto era?") and short words ("?") stay
 * glued to the input; longer words may wrap to the next line.
 */
function splitTrailingWords(text: string) {
	const [, mark = '', words = text] = /^([.,;:!?]*)\s*(.*)$/.exec(text) ?? []
	if (words.length <= 3) return { glued: `${mark}${words}`, loose: '' }
	return { glued: mark, loose: words }
}

function CalculatorOutcome({ outcome }: { outcome: Outcome | null }) {
	if (outcome === null) {
		return (
			<span className="text-fg-subtle text-sm">
				Preencha os valores e o resultado aparece aqui.
			</span>
		)
	}
	if ('error' in outcome) return <span className="text-danger text-sm">{outcome.error}</span>
	return (
		<>
			<span className="flex items-center justify-between gap-3">
				<span className="flex min-w-0 items-baseline gap-2">
					{outcome.tag ? <span className="text-fg-muted text-sm">{outcome.tag}</span> : null}
					<span className="text-fg tabular truncate text-2xl font-semibold">{outcome.value}</span>
				</span>
				<CopyButton value={outcome.value} variant="ghost" aria-label={`Copiar ${outcome.value}`} />
			</span>
			<span className="text-fg-muted tabular text-[0.8125rem]">{outcome.steps}</span>
			{outcome.extra?.length ? (
				<span className="text-fg-muted flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem]">
					{outcome.extra.map((item) => (
						<span key={item.label}>
							{item.label}: <span className="text-fg tabular font-medium">{item.value}</span>
						</span>
					))}
				</span>
			) : null}
		</>
	)
}

function CalculatorCard({ calculator }: { calculator: Calculator }) {
	const form = useAppForm({ defaultValues: { a: '', b: '' } })
	const values = useStore(form.store, (state) => state.values)
	const outcome = calculator.compute(values.a, values.b)
	const titleId = `calc-${calculator.id}`
	const [firstInput, secondInput] = calculator.inputs
	const [beforeFirst, beforeSecond, trailing = ''] = calculator.parts
	const { glued, loose } = splitTrailingWords(trailing)

	const renderInput = (input: CalculatorInput | undefined) => {
		if (!input) return null
		const id = `${calculator.id}-${input.name}`
		return (
			<form.AppField name={input.name}>
				{(field) =>
					input.list ? (
						<field.TextField
							id={id}
							label={input.label}
							hideLabel
							placeholder={input.placeholder}
							inputMode="text"
							inputClassName="w-48"
						/>
					) : (
						<field.NumberField
							id={id}
							label={input.label}
							hideLabel
							placeholder={input.placeholder}
							suffix={input.suffix}
							inputClassName="w-28"
						/>
					)
				}
			</form.AppField>
		)
	}

	return (
		<section
			aria-labelledby={titleId}
			className="rounded-panel border-border bg-surface flex flex-col overflow-hidden border"
		>
			<div className="flex flex-1 flex-col gap-3 p-5">
				<h3 id={titleId} className="text-fg text-base font-semibold">
					{calculator.title}
				</h3>
				<div className="text-fg flex flex-wrap items-center gap-x-2 gap-y-2 text-[0.9375rem]">
					{/* Each input is glued to the words before it, so a narrow screen breaks the sentence
					    between phrases, never leaving an input or a lone "?" on a line of its own. */}
					<span className="flex items-center gap-2">
						{beforeFirst ? <span>{beforeFirst}</span> : null}
						{renderInput(firstInput)}
					</span>
					<span className="flex items-center gap-2">
						{beforeSecond ? <span>{beforeSecond}</span> : null}
						{renderInput(secondInput)}
						{glued ? <span className="-ml-0.5">{glued}</span> : null}
					</span>
					{loose ? <span>{loose}</span> : null}
				</div>
			</div>
			<output
				aria-live="polite"
				aria-labelledby={titleId}
				className="bg-surface-muted border-border flex min-h-16 flex-col justify-center gap-1 border-t px-5 py-3 sm:min-h-24"
			>
				<CalculatorOutcome outcome={outcome} />
			</output>
		</section>
	)
}

/** Ten percentage calculators, each a sentence with blanks; results update as you type. */
export default function Percentage() {
	return (
		<div className="flex flex-col gap-8">
			{GROUPS.map((group) => (
				<div key={group.title} className="flex flex-col gap-3">
					<h2 className="text-fg-muted text-sm font-medium tracking-wide uppercase">
						{group.title}
					</h2>
					<div className="grid gap-4 lg:grid-cols-2">
						{group.calculators.map((calculator) => (
							<CalculatorCard key={calculator.id} calculator={calculator} />
						))}
					</div>
				</div>
			))}
		</div>
	)
}
