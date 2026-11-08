'use client'

import { Alert, Button } from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { CircleX, Clock } from 'lucide-react'
import { type ReactNode, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { useAppForm } from '@/components/form/form'
import {
	dateTimeToEpoch,
	formatIsoOffset,
	formatRfc2822,
	parseTimestamp,
	relativeTime,
	TIMESTAMP_UNIT_NAMES,
	type TimestampUnit,
} from '@/lib/algorithms/dev'
import { CopyRows } from './_shared/copy-rows'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const UNITS = [
	{ value: 'auto', label: 'Detectar' },
	{ value: 's', label: 'Segundos' },
	{ value: 'ms', label: 'Milissegundos' },
] as const

/** Each direction keeps its own fields; only the active one shows, on both sides. */
const DIRECTIONS = [
	{ value: 'toDate', label: 'Timestamp → data' },
	{ value: 'toTimestamp', label: 'Data → timestamp' },
] as const
type Direction = (typeof DIRECTIONS)[number]['value']

const pad = (n: number) => String(n).padStart(2, '0')
/** "2026-11-18" and "10:00" for the date and time fields, in local time. */
const localDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const localTime = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`

const ZONES = [
	{ value: 'local', label: 'Meu fuso horário' },
	{ value: 'utc', label: 'UTC' },
] as const

const utcFormat = new Intl.DateTimeFormat('pt-BR', {
	dateStyle: 'full',
	timeStyle: 'long',
	timeZone: 'UTC',
})
const localFormat = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'long' })

function Section({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section className="flex flex-col gap-3">
			<h3 className="text-fg text-base font-semibold">{title}</h3>
			{children}
		</section>
	)
}

/** Unix timestamp ↔ date: UTC, local time, ISO 8601, RFC 2822 and relative time. */
export default function TimestampConverter() {
	const form = useAppForm({
		defaultValues: {
			direction: 'toDate' as Direction,
			timestamp: '',
			unit: 'auto' as TimestampUnit | 'auto',
			date: '',
			time: '',
			zone: 'local' as 'local' | 'utc',
		},
	})
	const values = useDeferredValue(useStore(form.store, (state) => state.values))
	const [now, setNow] = useState<Date | null>(null)

	// The clock is read only on the client: prefill "now" once after mount, never on the server.
	const filled = useRef(false)
	useEffect(() => {
		if (filled.current) return
		filled.current = true
		const current = new Date()
		setNow(current)
		form.setFieldValue('timestamp', String(Math.floor(current.getTime() / 1000)))
		form.setFieldValue('date', localDate(current))
		form.setFieldValue('time', localTime(current))
	}, [form])
	const direction = values.direction

	const fromTimestamp = useMemo(() => {
		if (!values.timestamp.trim() || !now) return null
		try {
			const parsed = parseTimestamp(values.timestamp, values.unit)
			const offset = -parsed.date.getTimezoneOffset()
			return {
				ok: true as const,
				unit: parsed.unit,
				rows: [
					{ label: 'UTC', value: utcFormat.format(parsed.date) },
					{ label: 'Seu horário local', value: localFormat.format(parsed.date) },
					{ label: 'ISO 8601 (UTC)', value: parsed.date.toISOString() },
					{ label: 'ISO 8601 (local)', value: formatIsoOffset(parsed.date, offset) },
					{ label: 'RFC 2822', value: formatRfc2822(parsed.date) },
					{ label: 'Relativo', value: relativeTime(parsed.date, now) },
					{ label: 'Em segundos', value: String(parsed.seconds) },
					{ label: 'Em milissegundos', value: String(parsed.milliseconds) },
				],
			}
		} catch (error) {
			return { ok: false as const, error: (error as Error).message }
		}
	}, [values.timestamp, values.unit, now])

	const fromDate = useMemo(() => {
		if (!values.date) return null
		try {
			const epoch = dateTimeToEpoch(values.date, values.time, values.zone)
			return {
				ok: true as const,
				rows: [
					{ label: 'Timestamp em segundos', value: String(Math.floor(epoch / 1000)) },
					{ label: 'Timestamp em milissegundos', value: String(epoch) },
					{ label: 'ISO 8601 (UTC)', value: new Date(epoch).toISOString() },
				],
			}
		} catch (error) {
			return { ok: false as const, error: (error as Error).message }
		}
	}, [values.date, values.time, values.zone])

	const timeZone = now ? Intl.DateTimeFormat().resolvedOptions().timeZone : ''

	return (
		<ToolLayout>
			<FormCard
				title="Converta"
				onSubmit={() => undefined}
				actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
			>
				<form.AppField name="direction">
					{(f) => <f.RadioField label="Direção" options={DIRECTIONS} />}
				</form.AppField>
				{direction === 'toDate' ? (
					<div className="flex flex-col gap-4">
						<div className="flex items-end gap-3">
							<form.AppField name="timestamp">
								{(f) => (
									<f.TextField
										label="Timestamp Unix"
										placeholder="Ex.: 1700000000"
										inputMode="numeric"
										inputClassName="tabular font-mono"
										className="flex-1"
									/>
								)}
							</form.AppField>
							<Button
								variant="secondary"
								onClick={() => {
									const current = new Date()
									setNow(current)
									form.setFieldValue('timestamp', String(Math.floor(current.getTime() / 1000)))
								}}
							>
								<Clock /> Agora
							</Button>
						</div>
						<form.AppField name="unit">
							{(f) => (
								<f.RadioField
									label="Unidade"
									options={UNITS}
									description="Detectar: até 11 dígitos são segundos; 13 dígitos, milissegundos."
								/>
							)}
						</form.AppField>
					</div>
				) : (
					<div className="flex flex-col gap-4">
						<div className="grid grid-cols-[minmax(0,1fr)_7.5rem] items-start gap-3 sm:grid-cols-[1fr_9rem]">
							<form.AppField name="date">{(f) => <f.DateField label="Data" />}</form.AppField>
							<form.AppField name="time">{(f) => <f.TimeField label="Horário" />}</form.AppField>
						</div>
						<form.AppField name="zone">
							{(f) => <f.RadioField label="A data está em" options={ZONES} />}
						</form.AppField>
					</div>
				)}
			</FormCard>
			<ResultCard
				title={direction === 'toDate' ? 'Data e hora' : 'Timestamp'}
				empty={direction === 'toDate' ? !fromTimestamp : !fromDate}
				emptyText={
					direction === 'toDate' ? 'Digite um timestamp Unix.' : 'Escolha uma data e um horário.'
				}
				onClear={() => {
					if (direction === 'toDate') form.setFieldValue('timestamp', '')
					else {
						form.setFieldValue('date', '')
						form.setFieldValue('time', '')
					}
				}}
			>
				{direction === 'toDate' && fromTimestamp ? (
					<Section
						title={
							fromTimestamp.ok
								? `Timestamp em ${TIMESTAMP_UNIT_NAMES[fromTimestamp.unit]}`
								: 'Timestamp → data'
						}
					>
						{fromTimestamp.ok ? (
							<>
								<CopyRows rows={fromTimestamp.rows} code />
								{timeZone ? (
									<p className="text-fg-muted text-[0.8125rem]">Seu fuso horário: {timeZone}.</p>
								) : null}
							</>
						) : (
							<Alert tone="danger">
								<CircleX />
								{fromTimestamp.error}
							</Alert>
						)}
					</Section>
				) : null}
				{direction === 'toTimestamp' && fromDate ? (
					fromDate.ok ? (
						<CopyRows rows={fromDate.rows} code />
					) : (
						<Alert tone="danger">
							<CircleX />
							{fromDate.error}
						</Alert>
					)
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
