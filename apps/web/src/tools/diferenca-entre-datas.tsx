'use client'

import { DataList } from '@4people/ui'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { dateDifference, fromISODate, shiftDate, toISODate, toTime } from '@/lib/algorithms/dates'
import { formatNumber } from '@/lib/format'
import { isoDate, time } from '@/lib/schemas'
import { FormCard, OutputValue, ResultCard, ToolLayout } from './_shared/tool-layout'

const differenceSchema = z.object({
	startDate: isoDate('Informe a data inicial.'),
	startTime: time(),
	endDate: isoDate('Informe a data final.'),
	endTime: time(),
})

const countWithUnit = (count: number, singular: string, plural: string) =>
	`${formatNumber(count)} ${count === 1 ? singular : plural}`

type Result = ReturnType<typeof dateDifference>

/** "1 ano, 2 meses, 3 dias" */
const calendarSummary = ({ years, months, days }: Result['calendar']) =>
	[
		countWithUnit(years, 'ano', 'anos'),
		countWithUnit(months, 'mês', 'meses'),
		countWithUnit(days, 'dia', 'dias'),
	].join(', ')

/** Interval between two dates and times, in calendar units and in totals. */
export default function DifferenceBetweenDates() {
	const [result, setResult] = useState<Result | null>(null)
	const form = useToolForm({
		schema: differenceSchema,
		defaultValues: { startDate: '', startTime: '', endDate: '', endTime: '' },
		onSubmit: ({ startDate, startTime, endDate, endTime }) =>
			setResult(dateDifference(fromISODate(startDate, startTime), fromISODate(endDate, endTime))),
	})

	// Defaults depend on the user's clock, so they are filled after hydration.
	useEffect(() => {
		const now = new Date()
		form.setFieldValue('startDate', toISODate(now))
		form.setFieldValue('startTime', toTime(now))
		form.setFieldValue('endDate', toISODate(shiftDate(now, 1, 'days')))
		form.setFieldValue('endTime', toTime(now))
	}, [form])

	const summary = result ? calendarSummary(result.calendar) : ''

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>Calcular diferença</form.SubmitButton>
					</form.AppForm>
				}
			>
				<fieldset className="grid grid-cols-[minmax(0,1fr)_7rem] gap-4">
					<legend className="sr-only">Início</legend>
					<form.AppField name="startDate">
						{(field) => <field.DateField label="Data inicial" />}
					</form.AppField>
					<form.AppField name="startTime">
						{(field) => <field.TimeField label="Horário" />}
					</form.AppField>
				</fieldset>
				<fieldset className="grid grid-cols-[minmax(0,1fr)_7rem] gap-4">
					<legend className="sr-only">Fim</legend>
					<form.AppField name="endDate">
						{(field) => <field.DateField label="Data final" />}
					</form.AppField>
					<form.AppField name="endTime">
						{(field) => <field.TimeField label="Horário" />}
					</form.AppField>
				</fieldset>
			</FormCard>
			<ResultCard empty={!result} copyText={summary} onClear={() => setResult(null)}>
				{result ? (
					<div className="flex flex-col gap-4">
						<OutputValue className="text-xl sm:text-2xl">{summary}</OutputValue>
						<DataList
							columns={2}
							items={[
								{ label: 'Anos', value: formatNumber(result.years) },
								{ label: 'Meses', value: formatNumber(result.months) },
								{ label: 'Semanas', value: formatNumber(result.weeks) },
								{ label: 'Dias', value: formatNumber(result.days) },
								{ label: 'Horas', value: formatNumber(result.hours) },
								{ label: 'Minutos', value: formatNumber(result.minutes) },
								{ label: 'Segundos', value: formatNumber(result.seconds) },
								{ label: 'Milissegundos', value: formatNumber(result.milliseconds) },
							]}
						/>
					</div>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
