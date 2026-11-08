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

const n = (value: number) => formatNumber(value, 4)
const pct = (value: number) => `${formatNumber(value, 2)}%`
const signed = (value: number, unit = '%') =>
	`${value > 0 ? '+' : value < 0 ? '−' : ''}${formatNumber(Math.abs(value), 2)}${unit}`
/** Multiplier for a change, e.g. +10% → "1,1" and −10% → "0,9". */
const factor = (percent: number) => n(1 + percent / 100)

/* --------------------------------- model ---------------------------------- */

type Input = {
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

type Calc = {
	id: string
	title: string
	/** The sentence, split around the inputs: text, input, text, input, text. */
	parts: readonly string[]
	inputs: readonly Input[]
	compute: (a: string, b: string) => Outcome | null
}

const PERCENT: Pick<Input, 'suffix'> = { suffix: '%' }

/** Both inputs as numbers, or null while one is still empty. */
function both(a: string, b: string) {
	const x = toNumber(a)
	const y = toNumber(b)
	return x === null || y === null ? null : ([x, y] as const)
}

const GROUPS: ReadonlyArray<{ title: string; calcs: readonly Calc[] }> = [
	{
		title: 'O básico',
		calcs: [
			{
				id: 'percent-of',
				title: 'X% de um valor',
				parts: ['Quanto é', 'de', '?'],
				inputs: [
					{ name: 'a', label: 'Porcentagem', placeholder: '15', ...PERCENT },
					{ name: 'b', label: 'Valor', placeholder: '200' },
				],
				compute: (a, b) => {
					const v = both(a, b)
					if (!v) return null
					const [p, value] = v
					const result = percentOf(p, value)
					return { value: n(result), steps: `${n(p)} ÷ 100 × ${n(value)} = ${n(result)}` }
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
					const v = both(a, b)
					if (!v) return null
					const [part, whole] = v
					if (whole === 0) return { error: 'O total não pode ser zero.' }
					const result = percentOfWhole(part, whole)
					return { value: pct(result), steps: `${n(part)} ÷ ${n(whole)} × 100 = ${pct(result)}` }
				},
			},
			{
				id: 'whole-from-part',
				title: 'O total a partir de uma parte',
				parts: ['', 'é', 'de qual valor?'],
				inputs: [
					{ name: 'a', label: 'Parte', placeholder: '30' },
					{ name: 'b', label: 'Porcentagem', placeholder: '15', ...PERCENT },
				],
				compute: (a, b) => {
					const v = both(a, b)
					if (!v) return null
					const [part, p] = v
					if (p === 0) return { error: 'A porcentagem não pode ser zero.' }
					const result = wholeFromPart(part, p)
					return { value: n(result), steps: `${n(part)} ÷ (${n(p)} ÷ 100) = ${n(result)}` }
				},
			},
		],
	},
	{
		title: 'Aumentos e descontos',
		calcs: [
			{
				id: 'change',
				title: 'Variação percentual',
				parts: ['De', 'para', ''],
				inputs: [
					{ name: 'a', label: 'Valor inicial', placeholder: '50' },
					{ name: 'b', label: 'Valor final', placeholder: '75' },
				],
				compute: (a, b) => {
					const v = both(a, b)
					if (!v) return null
					const [from, to] = v
					if (from === 0) return { error: 'O valor inicial não pode ser zero.' }
					const result = percentChange(from, to)
					return {
						value: signed(result),
						tag: result > 0 ? 'Aumento' : result < 0 ? 'Queda' : 'Sem variação',
						steps: `(${n(to)} − ${n(from)}) ÷ ${n(Math.abs(from))} × 100 = ${signed(result)}`,
					}
				},
			},
			{
				id: 'add',
				title: 'Acréscimo',
				parts: ['', 'com acréscimo de', ''],
				inputs: [
					{ name: 'a', label: 'Valor', placeholder: '200' },
					{ name: 'b', label: 'Porcentagem de acréscimo', placeholder: '10', ...PERCENT },
				],
				compute: (a, b) => {
					const v = both(a, b)
					if (!v) return null
					const [value, p] = v
					const result = addPercent(value, p)
					return {
						value: n(result),
						steps: `${n(value)} × ${factor(p)} = ${n(result)}`,
						extra: [{ label: 'Acréscimo', value: n(result - value) }],
					}
				},
			},
			{
				id: 'discount',
				title: 'Desconto',
				parts: ['', 'com desconto de', ''],
				inputs: [
					{ name: 'a', label: 'Valor', placeholder: '200' },
					{ name: 'b', label: 'Porcentagem de desconto', placeholder: '10', ...PERCENT },
				],
				compute: (a, b) => {
					const v = both(a, b)
					if (!v) return null
					const [value, p] = v
					const result = subtractPercent(value, p)
					return {
						value: n(result),
						steps: `${n(value)} × ${factor(-p)} = ${n(result)}`,
						extra: [{ label: 'Economia', value: n(value - result) }],
					}
				},
			},
			{
				id: 'before-change',
				title: 'Valor antes do aumento ou desconto',
				parts: ['Ficou', 'depois de variar', '. Quanto era?'],
				inputs: [
					{ name: 'a', label: 'Valor final', placeholder: '220' },
					{ name: 'b', label: 'Variação (negativa para desconto)', placeholder: '10', ...PERCENT },
				],
				compute: (a, b) => {
					const v = both(a, b)
					if (!v) return null
					const [final, p] = v
					if (p === -100) return { error: 'Um desconto de 100% zera qualquer valor.' }
					const result = valueBeforeChange(final, p)
					return { value: n(result), steps: `${n(final)} ÷ ${factor(p)} = ${n(result)}` }
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
					const { factor: total, total: percent } = chainChanges(changes)
					return {
						value: signed(percent),
						tag: 'Variação total',
						steps: `${changes.map((change) => factor(change)).join(' × ')} = ${n(total)}`,
						extra: [
							{ label: 'Soma simples (errada)', value: signed(changes.reduce((s, c) => s + c, 0)) },
						],
					}
				},
			},
		],
	},
	{
		title: 'Negócios e finanças',
		calcs: [
			{
				id: 'margin',
				title: 'Margem e markup',
				parts: ['Custo de', ', vendido por', ''],
				inputs: [
					{ name: 'a', label: 'Custo', placeholder: '80' },
					{ name: 'b', label: 'Preço de venda', placeholder: '100' },
				],
				compute: (a, b) => {
					const v = both(a, b)
					if (!v) return null
					const [cost, price] = v
					if (cost === 0 || price === 0)
						return { error: 'Custo e preço precisam ser diferentes de zero.' }
					const { profit, margin, markup } = marginAndMarkup(cost, price)
					return {
						value: pct(margin),
						tag: 'Margem',
						steps: `(${n(price)} − ${n(cost)}) ÷ ${n(price)} × 100 = ${pct(margin)}`,
						extra: [
							{ label: 'Markup (sobre o custo)', value: pct(markup) },
							{ label: profit < 0 ? 'Prejuízo' : 'Lucro', value: n(Math.abs(profit)) },
						],
					}
				},
			},
			{
				id: 'points',
				title: 'Pontos percentuais',
				parts: ['A taxa foi de', 'para', ''],
				inputs: [
					{ name: 'a', label: 'Taxa inicial', placeholder: '10', ...PERCENT },
					{ name: 'b', label: 'Taxa final', placeholder: '12', ...PERCENT },
				],
				compute: (a, b) => {
					const v = both(a, b)
					if (!v) return null
					const [from, to] = v
					const { points, relative } = rateDifference(from, to)
					return {
						value: signed(points, ' p.p.'),
						tag: 'Diferença',
						steps: `${n(to)}% − ${n(from)}% = ${signed(points, ' p.p.')}`,
						extra:
							from === 0 ? [] : [{ label: 'Variação relativa da taxa', value: signed(relative) }],
					}
				},
			},
		],
	},
]

/* --------------------------------- screen --------------------------------- */

function CalcCard({ calc }: { calc: Calc }) {
	const form = useAppForm({ defaultValues: { a: '', b: '' } })
	const values = useStore(form.store, (state) => state.values)
	const outcome = calc.compute(values.a, values.b)
	const titleId = `calc-${calc.id}`
	const [first, second] = calc.inputs
	// Trailing words: short ones ("?") stay glued to the last input; a leading mark (". Quanto era?")
	// also stays glued, and the words after it may wrap.
	const [, mark = '', rest = calc.parts[2] ?? ''] =
		/^([.,;:!?]*)\s*(.*)$/.exec(calc.parts[2] ?? '') ?? []
	const glued = rest.length <= 3 ? `${mark}${rest}` : mark
	const loose = rest.length <= 3 ? '' : rest

	const renderInput = (input: Input | undefined) =>
		input ? (
			<form.AppField name={input.name}>
				{(field) =>
					input.list ? (
						<field.TextField
							id={`${calc.id}-${input.name}`}
							label={input.label}
							hideLabel
							placeholder={input.placeholder}
							inputMode="text"
							inputClassName="w-48"
						/>
					) : (
						<field.NumberField
							id={`${calc.id}-${input.name}`}
							label={input.label}
							hideLabel
							placeholder={input.placeholder}
							suffix={input.suffix}
							inputClassName="w-28"
						/>
					)
				}
			</form.AppField>
		) : null

	return (
		<section
			aria-labelledby={titleId}
			className="rounded-panel border-border bg-surface flex flex-col overflow-hidden border"
		>
			<div className="flex flex-1 flex-col gap-3 p-5">
				<h3 id={titleId} className="text-fg text-base font-semibold">
					{calc.title}
				</h3>
				<div className="text-fg flex flex-wrap items-center gap-x-2 gap-y-2 text-[0.9375rem]">
					{/* Each input stays glued to the words before it, so a narrow screen breaks the
					    sentence between phrases ("Quanto é [15 %]" / "de [200] ?"), never leaving an
					    input or a lone "?" on a line of its own. */}
					<span className="flex items-center gap-2">
						{calc.parts[0] ? <span>{calc.parts[0]}</span> : null}
						{renderInput(first)}
					</span>
					<span className="flex items-center gap-2">
						{calc.parts[1] ? <span>{calc.parts[1]}</span> : null}
						{renderInput(second)}
						{glued ? <span className="-ml-1.5">{glued}</span> : null}
					</span>
					{loose ? <span>{loose}</span> : null}
				</div>
			</div>
			<output
				aria-live="polite"
				aria-labelledby={titleId}
				className="bg-surface-muted border-border flex min-h-16 flex-col justify-center gap-1 border-t px-5 py-3 sm:min-h-24"
			>
				{outcome === null ? (
					<span className="text-fg-subtle text-sm">
						Preencha os valores e o resultado aparece aqui.
					</span>
				) : 'error' in outcome ? (
					<span className="text-danger text-sm">{outcome.error}</span>
				) : (
					<>
						<span className="flex items-center justify-between gap-3">
							<span className="flex min-w-0 items-baseline gap-2">
								{outcome.tag ? <span className="text-fg-muted text-sm">{outcome.tag}</span> : null}
								<span className="text-fg tabular truncate text-2xl font-semibold">
									{outcome.value}
								</span>
							</span>
							<CopyButton
								value={outcome.value}
								variant="ghost"
								aria-label={`Copiar ${outcome.value}`}
							/>
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
				)}
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
						{group.calcs.map((calc) => (
							<CalcCard key={calc.id} calc={calc} />
						))}
					</div>
				</div>
			))}
		</div>
	)
}
