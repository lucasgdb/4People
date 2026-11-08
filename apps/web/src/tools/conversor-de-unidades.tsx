'use client'

import { Button, CopyButton, cn, Field, Input, Select } from '@4people/ui'
import { ArrowLeftRight, Equal } from 'lucide-react'
import { useState } from 'react'
import {
	CATEGORIES,
	type Category,
	categoryById,
	conversionFormula,
	convertUnit,
	formatAmount,
	parseAmount,
	type Unit,
	unitById,
} from '@/lib/algorithms/units'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const CATEGORY_OPTIONS = CATEGORIES.map((category) => ({
	value: category.id,
	label: category.name,
}))

type Side = 'from' | 'to'
type State = {
	categoryId: string
	fromId: string
	toId: string
	/** The side the person typed in last: its text is kept, the other side is computed from it. */
	active: Side
	text: string
}

const first = CATEGORIES[0] as Category
const INITIAL: State = {
	categoryId: first.id,
	fromId: first.pair[0],
	toId: first.pair[1],
	active: 'from',
	text: '1',
}

/**
 * Keeps what a number can be made of. A minus sign stays after an exponent (1e-7) and, where
 * negatives mean something (temperature, angle), at the start.
 */
function sanitize(text: string, allowNegative: boolean): string {
	return text
		.replace(/[^\d,.eE+-]/g, '')
		.replace(/-/g, (sign, index: number, all: string) =>
			(index === 0 && allowNegative) || /[eE]/.test(all[index - 1] ?? '') ? sign : '',
		)
}

const unitLabel = (unit: Unit) => `${unit.name} (${unit.symbol})`

/**
 * Converter like Google's: pick what to measure, type on either side and the other follows. Below,
 * the same value in every unit of that kind.
 */
export default function UnitConverter() {
	const [state, setState] = useState<State>(INITIAL)
	const category = categoryById(state.categoryId) ?? first
	const from = unitById(category, state.fromId) ?? (category.units[0] as Unit)
	const to = unitById(category, state.toId) ?? (category.units[1] as Unit)

	const typed = parseAmount(state.text)
	const [source, target] = state.active === 'from' ? [from, to] : [to, from]
	const computed = typed === null ? null : convertUnit(typed, source, target)
	const computedText = typed === null ? '' : computed === null ? '—' : formatAmount(computed)
	const fromText = state.active === 'from' ? state.text : computedText
	const toText = state.active === 'to' ? state.text : computedText
	/** The value on the "De" side, which the full list below converts from. */
	const fromValue = state.active === 'from' ? typed : computed

	const formula = conversionFormula(category, from, to)
	const options = category.units.map((unit) => ({ value: unit.id, label: unitLabel(unit) }))

	const type = (side: Side) => (text: string) =>
		setState((s) => ({ ...s, active: side, text: sanitize(text, Boolean(category.allowNegative)) }))

	const pickCategory = (id: string) => {
		const next = categoryById(id)
		if (!next) return
		setState({
			categoryId: id,
			fromId: next.pair[0],
			toId: next.pair[1],
			active: 'from',
			text: '1',
		})
	}

	const swap = () =>
		setState((s) => ({
			...s,
			fromId: s.toId,
			toId: s.fromId,
			active: s.active === 'from' ? 'to' : 'from',
		}))

	const field = (side: Side) => {
		const unit = side === 'from' ? from : to
		const text = side === 'from' ? fromText : toText
		return (
			<div className="grid items-end gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
				<Field label={side === 'from' ? 'De' : 'Para'}>
					<Input
						id={`unit-${side}`}
						type="text"
						inputMode="decimal"
						autoComplete="off"
						spellCheck={false}
						enterKeyHint="done"
						value={text}
						onChange={(event) => type(side)(event.target.value)}
						onFocus={(event) => event.target.select()}
						className="tabular text-lg font-semibold"
					/>
				</Field>
				<Field label={side === 'from' ? 'Unidade de origem' : 'Unidade de destino'} hideLabel>
					<Select
						options={options}
						value={unit.id}
						onValueChange={(id) =>
							setState((s) => (side === 'from' ? { ...s, fromId: id } : { ...s, toId: id }))
						}
					/>
				</Field>
			</div>
		)
	}

	return (
		<ToolLayout>
			<FormCard
				title="Converta"
				onSubmit={() => undefined}
				actions={
					<p className="text-fg-muted text-[0.8125rem]">
						Digite em qualquer um dos lados: o outro acompanha.
					</p>
				}
			>
				<Field label="Grandeza">
					<Select options={CATEGORY_OPTIONS} value={category.id} onValueChange={pickCategory} />
				</Field>
				<div className="flex flex-col gap-1">
					{field('from')}
					<div className="flex items-center gap-3">
						<span aria-hidden="true" className="bg-border h-px flex-1" />
						<Equal aria-hidden="true" className="text-fg-subtle size-4" />
						<Button variant="ghost" size="icon" aria-label="Inverter as unidades" onClick={swap}>
							<ArrowLeftRight className="rotate-90" />
						</Button>
						<span aria-hidden="true" className="bg-border h-px flex-1" />
					</div>
					{field('to')}
				</div>
				{formula ? (
					<p className="rounded-control bg-surface-muted text-fg-muted px-4 py-3 text-sm">
						<strong className="text-fg font-semibold">Fórmula:</strong>{' '}
						<span translate="no">{formula}</span>
					</p>
				) : null}
			</FormCard>

			<ResultCard
				title={`${category.name} em todas as unidades`}
				empty={fromValue === null}
				emptyText="Digite um valor para ver em todas as unidades."
			>
				<p className="text-fg-muted text-sm">
					<span className="text-fg tabular font-semibold">
						{fromValue === null ? '' : formatAmount(fromValue)} {from.symbol}
					</span>{' '}
					equivale a:
				</p>
				<ul className="divide-border -my-1 flex flex-col divide-y">
					{category.units.map((unit) => {
						const value = fromValue === null ? null : convertUnit(fromValue, from, unit)
						const text = value === null ? '—' : formatAmount(value)
						const current = unit.id === to.id
						return (
							<li
								key={unit.id}
								className={cn(
									'flex items-center justify-between gap-3 py-2',
									unit.id === from.id && 'opacity-60',
								)}
							>
								<button
									type="button"
									disabled={unit.id === from.id}
									aria-pressed={current}
									onClick={() => setState((s) => ({ ...s, toId: unit.id }))}
									className="text-fg-muted hover:text-fg focus-visible:ring-ring aria-pressed:text-accent-soft-fg -mx-2 flex min-w-0 flex-1 cursor-pointer items-baseline justify-between gap-3 rounded-[10px] px-2 py-1 text-left text-sm outline-none focus-visible:ring-4 disabled:cursor-default aria-pressed:font-semibold"
								>
									<span className="min-w-0 truncate">{unit.name}</span>
									<span translate="no" className="text-fg tabular shrink-0 font-semibold">
										{text} <span className="text-fg-muted font-normal">{unit.symbol}</span>
									</span>
								</button>
								<CopyButton
									iconOnly
									variant="ghost"
									value={text}
									label={`Copiar ${unit.name.toLowerCase()}`}
									disabled={value === null}
								/>
							</li>
						)
					})}
				</ul>
			</ResultCard>
		</ToolLayout>
	)
}
