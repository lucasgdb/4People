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
type ConverterState = {
	categoryId: string
	fromId: string
	toId: string
	/** The side typed last: it keeps its text and the other side is computed from it. */
	activeSide: Side
	text: string
}

const DEFAULT_CATEGORY = CATEGORIES[0] as Category

function initialStateFor(category: Category): ConverterState {
	return {
		categoryId: category.id,
		fromId: category.pair[0],
		toId: category.pair[1],
		activeSide: 'from',
		text: '1',
	}
}

/**
 * Keeps only characters a number can have. A minus sign stays after an exponent (1e-7) and, where
 * negatives mean something (temperature, angle), at the start.
 */
function keepNumericCharacters(text: string, allowNegative: boolean): string {
	return text.replace(/[^\d,.eE+-]/g, '').replace(/-/g, (minus, index: number, whole: string) => {
		const isLeadingSign = index === 0 && allowNegative
		const isExponentSign = /[eE]/.test(whole[index - 1] ?? '')
		return isLeadingSign || isExponentSign ? minus : ''
	})
}

function unitLabel(unit: Unit): string {
	return `${unit.name} (${unit.symbol})`
}

/** "—" when the conversion has no finite result (e.g. 0 km/L in L/100 km). */
function formatConverted(value: number | null): string {
	return value === null ? '—' : formatAmount(value)
}

/**
 * Converter like Google's: pick what to measure, type on either side and the other follows. Below,
 * the same value in every unit of that kind.
 */
export default function UnitConverter() {
	const [state, setState] = useState<ConverterState>(() => initialStateFor(DEFAULT_CATEGORY))
	const category = categoryById(state.categoryId) ?? DEFAULT_CATEGORY
	const from = unitById(category, state.fromId) ?? (category.units[0] as Unit)
	const to = unitById(category, state.toId) ?? (category.units[1] as Unit)

	const typedAmount = parseAmount(state.text)
	const isTypingFrom = state.activeSide === 'from'
	const [typedUnit, otherUnit] = isTypingFrom ? [from, to] : [to, from]
	const otherAmount = typedAmount === null ? null : convertUnit(typedAmount, typedUnit, otherUnit)
	const otherText = typedAmount === null ? '' : formatConverted(otherAmount)
	const fromText = isTypingFrom ? state.text : otherText
	const toText = isTypingFrom ? otherText : state.text
	/** The list of every unit converts from the "De" side. */
	const fromAmount = isTypingFrom ? typedAmount : otherAmount

	const formula = conversionFormula(category, from, to)
	const unitOptions = category.units.map((unit) => ({ value: unit.id, label: unitLabel(unit) }))

	function typeInto(side: Side, text: string) {
		const cleanText = keepNumericCharacters(text, Boolean(category.allowNegative))
		setState((current) => ({ ...current, activeSide: side, text: cleanText }))
	}

	function chooseUnit(side: Side, id: string) {
		setState((current) => (side === 'from' ? { ...current, fromId: id } : { ...current, toId: id }))
	}

	function chooseCategory(id: string) {
		const nextCategory = categoryById(id)
		if (nextCategory) setState(initialStateFor(nextCategory))
	}

	function swapUnits() {
		setState((current) => ({
			...current,
			fromId: current.toId,
			toId: current.fromId,
			activeSide: current.activeSide === 'from' ? 'to' : 'from',
		}))
	}

	function renderSide(side: Side) {
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
						onChange={(event) => typeInto(side, event.target.value)}
						onFocus={(event) => event.target.select()}
						className="tabular text-lg font-semibold"
					/>
				</Field>
				<Field label={side === 'from' ? 'Unidade de origem' : 'Unidade de destino'} hideLabel>
					<Select
						options={unitOptions}
						value={unit.id}
						onValueChange={(id) => chooseUnit(side, id)}
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
					<Select options={CATEGORY_OPTIONS} value={category.id} onValueChange={chooseCategory} />
				</Field>
				<div className="flex flex-col gap-1">
					{renderSide('from')}
					<div className="flex items-center gap-3">
						<span aria-hidden="true" className="bg-border h-px flex-1" />
						<Equal aria-hidden="true" className="text-fg-subtle size-4" />
						<Button
							variant="ghost"
							size="icon"
							aria-label="Inverter as unidades"
							onClick={swapUnits}
						>
							<ArrowLeftRight className="rotate-90" />
						</Button>
						<span aria-hidden="true" className="bg-border h-px flex-1" />
					</div>
					{renderSide('to')}
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
				empty={fromAmount === null}
				emptyText="Digite um valor para ver em todas as unidades."
			>
				<p className="text-fg-muted text-sm">
					<span className="text-fg tabular font-semibold">
						{fromAmount === null ? '' : formatAmount(fromAmount)} {from.symbol}
					</span>{' '}
					equivale a:
				</p>
				<ul className="divide-border -my-1 flex flex-col divide-y">
					{category.units.map((unit) => {
						const amount = fromAmount === null ? null : convertUnit(fromAmount, from, unit)
						const text = formatConverted(amount)
						const isSource = unit.id === from.id
						return (
							<li
								key={unit.id}
								className={cn(
									'flex items-center justify-between gap-3 py-2',
									isSource && 'opacity-60',
								)}
							>
								<button
									type="button"
									disabled={isSource}
									aria-pressed={unit.id === to.id}
									onClick={() => chooseUnit('to', unit.id)}
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
									disabled={amount === null}
								/>
							</li>
						)
					})}
				</ul>
			</ResultCard>
		</ToolLayout>
	)
}
