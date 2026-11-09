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
const PER_PERIOD_LABEL: Record<PeriodId, string> = {
	day: 'por dia',
	week: 'por semana',
	month: 'por mês',
	quarter: 'por trimestre',
	year: 'por ano',
}

const COMMON_SLAS = [
	{ value: 99, ninesName: 'Dois noves' },
	{ value: 99.5, ninesName: '' },
	{ value: 99.9, ninesName: 'Três noves' },
	{ value: 99.95, ninesName: '' },
	{ value: 99.99, ninesName: 'Quatro noves' },
	{ value: 99.999, ninesName: 'Cinco noves' },
].map((sla) => ({ ...sla, downtime: downtimeTable(sla.value) }))

const COMMON_SLA_PERIODS = ['day', 'month', 'year'] as const satisfies readonly PeriodId[]

const COMPOSITE_MODES = [
	{ value: 'series', label: 'Em série', hint: 'Todos precisam funcionar (ex.: app → banco)' },
	{ value: 'parallel', label: 'Em paralelo', hint: 'Basta um funcionar (réplicas redundantes)' },
] as const

const DEFAULTS = {
	direction: 'availability' as Direction,
	availability: '99,95',
	downtime: '4',
	unit: 'h' as TimeUnit,
	period: 'month' as PeriodId,
}

type FormValues = typeof DEFAULTS
type SlaResult = { availability: number; downtime: Record<PeriodId, number> }
type Outcome = { error: string } | SlaResult | null

function formatPercent(value: number): string {
	return `${formatNumber(value, 6)}%`
}

function resultFromAvailability(availability: number): SlaResult {
	return { availability, downtime: downtimeTable(availability) }
}

function calculateFromAvailability(text: string): Outcome {
	const availability = parseNumber(text)
	if (availability === null) return text.trim() ? { error: 'Digite um número, como 99,95.' } : null
	if (availability < 0 || availability > 100)
		return { error: 'A disponibilidade vai de 0% a 100%.' }
	return resultFromAvailability(availability)
}

function calculateFromDowntime(values: FormValues): Outcome {
	const downtime = parseNumber(values.downtime)
	if (downtime === null)
		return values.downtime.trim() ? { error: 'Digite um número, como 4 ou 1,5.' } : null
	const period = PERIODS.find((candidate) => candidate.id === values.period) ?? PERIODS[2]
	try {
		const downtimeSeconds = downtime * UNIT_SECONDS[values.unit]
		return resultFromAvailability(availabilityFor(downtimeSeconds, period.seconds))
	} catch (error) {
		return { error: (error as Error).message }
	}
}

function calculate(values: FormValues): Outcome {
	if (values.direction === 'availability') return calculateFromAvailability(values.availability)
	return calculateFromDowntime(values)
}

function summaryText(result: SlaResult): string {
	return [
		`Disponibilidade: ${formatPercent(result.availability)}`,
		...PERIODS.map((period) => `${period.label}: ${formatDuration(result.downtime[period.id])}`),
	].join('\n')
}

/** Availability ↔ allowed downtime for each period, common SLAs and composite SLAs. */
export default function CalculadoraDeSla() {
	const form = useAppForm({ defaultValues: DEFAULTS })
	const values = useStore(form.store, (state) => state.values)
	const outcome = calculate(values)
	const result = outcome && 'availability' in outcome ? outcome : null

	return (
		<div className="flex flex-col gap-6">
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
					copyText={result ? summaryText(result) : undefined}
				>
					{outcome && 'error' in outcome ? (
						<Alert tone="danger">
							<CircleX />
							{outcome.error}
						</Alert>
					) : null}
					{result ? <SlaResultView result={result} /> : null}
				</ResultCard>
			</ToolLayout>
			<div className="grid items-start gap-6 xl:grid-cols-2">
				<CommonSlas />
				<CompositeSla />
			</div>
		</div>
	)
}

function SlaResultView({ result }: { result: SlaResult }) {
	return (
		<>
			<div className="flex flex-col gap-1">
				<span className="text-fg-muted text-[0.8125rem]">Disponibilidade</span>
				<OutputValue>{formatPercent(result.availability)}</OutputValue>
			</div>
			<h3 className="text-fg text-sm font-semibold">Tempo fora do ar permitido</h3>
			<DataList
				items={PERIODS.map((period) => ({
					label: PER_PERIOD_LABEL[period.id],
					value: formatDuration(result.downtime[period.id]),
				}))}
			/>
			<p className="text-fg-muted text-[0.8125rem]">
				Ano de 365,25 dias; mês = ano ÷ 12 (30,44 dias); trimestre = ano ÷ 4.
			</p>
		</>
	)
}

function CommonSlas() {
	const titleId = useId()
	return (
		<section
			aria-labelledby={titleId}
			className="rounded-panel border-border bg-surface flex min-w-0 flex-col gap-4 border p-6 sm:p-8"
		>
			<h2 id={titleId} className="text-fg text-lg font-bold">
				SLAs comuns
			</h2>
			<TableCard label="Tempo fora do ar por SLA">
				<Table className="text-[0.875rem]">
					<TableHeader>
						<tr>
							<TableHead>SLA</TableHead>
							{COMMON_SLA_PERIODS.map((periodId) => (
								<TableHead key={periodId} numeric>
									{PER_PERIOD_LABEL[periodId]}
								</TableHead>
							))}
						</tr>
					</TableHeader>
					<TableBody>
						{COMMON_SLAS.map((sla) => (
							<TableRow key={sla.value}>
								<TableHead
									scope="row"
									className="border-rule text-fg h-auto border-t border-b-0 py-4 text-sm font-semibold tracking-normal normal-case group-first/row:border-t-0"
								>
									<span className="tabular">{formatPercent(sla.value)}</span>
									{sla.ninesName ? (
										<span className="text-fg-muted block text-[0.75rem] font-normal">
											{sla.ninesName}
										</span>
									) : null}
								</TableHead>
								{COMMON_SLA_PERIODS.map((periodId) => (
									<TableCell key={periodId} numeric className="whitespace-nowrap">
										{formatDuration(sla.downtime[periodId])}
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

type CompositeMode = 'series' | 'parallel'

/** The product shown under the composite SLA, e.g. "0,9995 × 0,9999" or "1 − (0,0005 × 0,0001)". */
function compositeFormula(availabilities: number[], mode: CompositeMode): string {
	if (mode === 'series')
		return availabilities.map((percent) => formatNumber(percent / 100, 8)).join(' × ')
	const failureProbabilities = availabilities.map((percent) => formatNumber(1 - percent / 100, 8))
	return `1 − (${failureProbabilities.join(' × ')})`
}

function CompositeSla() {
	const titleId = useId()
	const form = useAppForm({
		defaultValues: { list: '99,95 99,99 99,9', mode: 'series' as CompositeMode },
	})
	const values = useStore(form.store, (state) => state.values)
	const hasList = values.list.trim() !== ''
	const availabilities = hasList ? parsePercentList(values.list) : null
	const total = availabilities ? compositeAvailability(availabilities, values.mode) : null

	return (
		<section
			aria-labelledby={titleId}
			className="rounded-panel border-border bg-surface flex min-w-0 flex-col gap-6 border p-6 sm:p-8"
		>
			<h2 id={titleId} className="text-fg text-lg font-bold">
				SLA composto
			</h2>
			<form noValidate onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-6">
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
				{total !== null && availabilities ? (
					<div className="rounded-control bg-surface-muted flex flex-col gap-1 px-6 py-4">
						<span className="text-fg-muted text-[0.8125rem]">SLA composto</span>
						<span className="flex items-center justify-between gap-4">
							<span className="text-fg tabular text-2xl font-bold">{formatPercent(total)}</span>
							<CopyButton
								value={formatPercent(total)}
								variant="ghost"
								aria-label="Copiar SLA composto"
							/>
						</span>
						<span className="text-fg-muted tabular text-[0.8125rem]">
							{compositeFormula(availabilities, values.mode)}
							{' · '}
							{formatDuration(downtimeTable(total).month)} fora do ar por mês
						</span>
					</div>
				) : hasList ? (
					<p className="text-danger text-sm">
						Use porcentagens de 0 a 100 separadas por espaço, como 99,95 99,9.
					</p>
				) : null}
			</div>
		</section>
	)
}
