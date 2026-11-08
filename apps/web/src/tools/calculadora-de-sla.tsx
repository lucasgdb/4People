'use client'

import {
	Alert,
	CopyButton,
	DataList,
	Table,
	TableBody,
	TableCard,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { CircleX } from 'lucide-react'
import { useId } from 'react'
import { useAppForm } from '@/components/form/form'
import {
	availabilityFor,
	compositeAvailability,
	downtimeTable,
	formatDuration,
	PERIODS,
	type PeriodId,
	parseNumber,
	parsePercentList,
} from '@/lib/algorithms/capacity'
import { formatNumber } from '@/lib/format'
import { FormCard, OutputValue, ResultCard, ToolLayout } from './_shared/tool-layout'

type Direction = 'availability' | 'downtime'
type TimeUnit = 's' | 'min' | 'h'

const DIRECTIONS = [
	{ value: 'availability', label: 'Sei a disponibilidade', hint: 'Ex.: 99,95% → tempo fora do ar' },
	{ value: 'downtime', label: 'Sei o tempo fora do ar', hint: 'Ex.: 4h por mês → disponibilidade' },
] as const

const TIME_UNITS = [
	{ value: 's', label: 'segundos' },
	{ value: 'min', label: 'minutos' },
	{ value: 'h', label: 'horas' },
] as const satisfies ReadonlyArray<{ value: TimeUnit; label: string }>

const UNIT_SECONDS: Record<TimeUnit, number> = { s: 1, min: 60, h: 3600 }

const PERIOD_OPTIONS = PERIODS.map((period) => ({ value: period.id, label: period.label }))
const PERIOD_LOWER: Record<PeriodId, string> = {
	day: 'por dia',
	week: 'por semana',
	month: 'por mês',
	quarter: 'por trimestre',
	year: 'por ano',
}

const COMMON_SLAS = [
	{ value: 99, nines: 'Dois noves' },
	{ value: 99.5, nines: '' },
	{ value: 99.9, nines: 'Três noves' },
	{ value: 99.95, nines: '' },
	{ value: 99.99, nines: 'Quatro noves' },
	{ value: 99.999, nines: 'Cinco noves' },
].map((sla) => ({ ...sla, table: downtimeTable(sla.value) }))

const COMPOSITE_MODES = [
	{ value: 'series', label: 'Em série', hint: 'Todos precisam funcionar (ex.: app → banco)' },
	{ value: 'parallel', label: 'Em paralelo', hint: 'Basta um funcionar (réplicas redundantes)' },
] as const

const pct = (value: number) => `${formatNumber(value, 6)}%`

const DEFAULTS = {
	direction: 'availability' as Direction,
	availability: '99,95',
	downtime: '4',
	unit: 'h' as TimeUnit,
	period: 'month' as PeriodId,
}

type Outcome = { error: string } | { availability: number; table: Record<PeriodId, number> } | null

function calculate(values: typeof DEFAULTS): Outcome {
	if (values.direction === 'availability') {
		const availability = parseNumber(values.availability)
		if (availability === null)
			return values.availability.trim() ? { error: 'Digite um número, como 99,95.' } : null
		if (availability < 0 || availability > 100)
			return { error: 'A disponibilidade vai de 0% a 100%.' }
		return { availability, table: downtimeTable(availability) }
	}
	const amount = parseNumber(values.downtime)
	if (amount === null)
		return values.downtime.trim() ? { error: 'Digite um número, como 4 ou 1,5.' } : null
	const period = PERIODS.find((candidate) => candidate.id === values.period) ?? PERIODS[2]
	try {
		const availability = availabilityFor(amount * UNIT_SECONDS[values.unit], period.seconds)
		return { availability, table: downtimeTable(availability) }
	} catch (error) {
		return { error: (error as Error).message }
	}
}

/** Availability ↔ allowed downtime for each period, common SLAs and composite SLAs. */
export default function CalculadoraDeSla() {
	const form = useAppForm({ defaultValues: DEFAULTS })
	const values = useStore(form.store, (state) => state.values)
	const outcome = calculate(values)
	const ok = outcome && 'availability' in outcome ? outcome : null

	return (
		<div className="flex flex-col gap-5">
			<ToolLayout>
				<FormCard
					onSubmit={() => undefined}
					actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
				>
					<form.AppField name="direction">
						{(field) => <field.RadioField label="O que você tem?" options={DIRECTIONS} />}
					</form.AppField>
					{values.direction === 'availability' ? (
						<form.AppField name="availability">
							{(field) => (
								<field.NumberField
									label="Disponibilidade (SLA)"
									placeholder="Ex.: 99,95"
									suffix="%"
									min={0}
									max={100}
								/>
							)}
						</form.AppField>
					) : (
						<div className="grid gap-4 sm:grid-cols-3">
							<form.AppField name="downtime">
								{(field) => (
									<field.NumberField label="Tempo fora do ar" placeholder="Ex.: 4" min={0} />
								)}
							</form.AppField>
							<form.AppField name="unit">
								{(field) => <field.SelectField label="Unidade" options={TIME_UNITS} />}
							</form.AppField>
							<form.AppField name="period">
								{(field) => <field.SelectField label="Por" options={PERIOD_OPTIONS} />}
							</form.AppField>
						</div>
					)}
				</FormCard>
				<ResultCard
					empty={!outcome}
					emptyText="Informe a disponibilidade ou o tempo fora do ar."
					copyText={
						ok
							? [
									`Disponibilidade: ${pct(ok.availability)}`,
									...PERIODS.map((p) => `${p.label}: ${formatDuration(ok.table[p.id])}`),
								].join('\n')
							: undefined
					}
				>
					{outcome && 'error' in outcome ? (
						<Alert tone="danger">
							<CircleX />
							{outcome.error}
						</Alert>
					) : ok ? (
						<>
							<div className="flex flex-col gap-1">
								<span className="text-fg-muted text-[0.8125rem]">Disponibilidade</span>
								<OutputValue>{pct(ok.availability)}</OutputValue>
							</div>
							<h3 className="text-fg text-sm font-semibold">Tempo fora do ar permitido</h3>
							<DataList
								items={PERIODS.map((period) => ({
									label: PERIOD_LOWER[period.id],
									value: formatDuration(ok.table[period.id]),
								}))}
							/>
							<p className="text-fg-muted text-[0.8125rem]">
								Ano de 365,25 dias; mês = ano ÷ 12 (30,44 dias); trimestre = ano ÷ 4.
							</p>
						</>
					) : null}
				</ResultCard>
			</ToolLayout>
			<div className="grid items-start gap-5 xl:grid-cols-2">
				<CommonSlas />
				<CompositeSla />
			</div>
		</div>
	)
}

function CommonSlas() {
	const titleId = useId()
	return (
		<section
			aria-labelledby={titleId}
			className="rounded-panel border-border bg-surface flex min-w-0 flex-col gap-4 border p-6 sm:p-7"
		>
			<h2 id={titleId} className="text-fg text-lg font-bold">
				SLAs comuns
			</h2>
			<TableCard label="Tempo fora do ar por SLA">
				<Table className="text-[0.875rem]">
					<TableHeader>
						<tr>
							<TableHead>SLA</TableHead>
							{(['day', 'month', 'year'] as const).map((id) => (
								<TableHead key={id} numeric>
									{PERIOD_LOWER[id]}
								</TableHead>
							))}
						</tr>
					</TableHeader>
					<TableBody>
						{COMMON_SLAS.map((sla) => (
							<TableRow key={sla.value}>
								<TableHead
									scope="row"
									className="border-rule text-fg h-auto border-t border-b-0 py-3 text-sm font-semibold tracking-normal normal-case group-first/row:border-t-0"
								>
									<span className="tabular">{pct(sla.value)}</span>
									{sla.nines ? (
										<span className="text-fg-muted block text-[0.75rem] font-normal">
											{sla.nines}
										</span>
									) : null}
								</TableHead>
								{(['day', 'month', 'year'] as const).map((id) => (
									<TableCell key={id} numeric className="whitespace-nowrap">
										{formatDuration(sla.table[id])}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableCard>
		</section>
	)
}

function CompositeSla() {
	const titleId = useId()
	const form = useAppForm({
		defaultValues: { list: '99,95 99,99 99,9', mode: 'series' as 'series' | 'parallel' },
	})
	const values = useStore(form.store, (state) => state.values)
	const parsed = values.list.trim() ? parsePercentList(values.list) : null
	const total = parsed ? compositeAvailability(parsed, values.mode) : null

	return (
		<section
			aria-labelledby={titleId}
			className="rounded-panel border-border bg-surface flex min-w-0 flex-col gap-5 border p-6 sm:p-7"
		>
			<h2 id={titleId} className="text-fg text-lg font-bold">
				SLA composto
			</h2>
			<form noValidate onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-5">
				<form.AppField name="list">
					{(field) => (
						<field.TextField
							id="sla-composite-list"
							label="Disponibilidade de cada serviço (%)"
							description="Separe com espaço ou ponto e vírgula."
							placeholder="Ex.: 99,95 99,99 99,9"
						/>
					)}
				</form.AppField>
				<form.AppField name="mode">
					{(field) => <field.RadioField label="Como estão ligados" options={COMPOSITE_MODES} />}
				</form.AppField>
			</form>
			<div aria-live="polite">
				{total !== null && parsed ? (
					<div className="rounded-control bg-surface-muted flex flex-col gap-1 px-5 py-4">
						<span className="text-fg-muted text-[0.8125rem]">SLA composto</span>
						<span className="flex items-center justify-between gap-3">
							<span className="text-fg tabular text-2xl font-bold">{pct(total)}</span>
							<CopyButton value={pct(total)} variant="ghost" aria-label="Copiar SLA composto" />
						</span>
						<span className="text-fg-muted tabular text-[0.8125rem]">
							{values.mode === 'series'
								? parsed.map((value) => formatNumber(value / 100, 8)).join(' × ')
								: `1 − (${parsed.map((value) => formatNumber(1 - value / 100, 8)).join(' × ')})`}
							{' · '}
							{formatDuration(downtimeTable(total).month)} fora do ar por mês
						</span>
					</div>
				) : values.list.trim() ? (
					<p className="text-danger text-sm">
						Use porcentagens de 0 a 100 separadas por espaço, como 99,95 99,9.
					</p>
				) : null}
			</div>
		</section>
	)
}
