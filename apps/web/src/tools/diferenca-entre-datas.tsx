'use client'

import { DataList } from '@4people/ui'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { dateDifference, fromISODate, shiftDate, toISODate, toTime } from '@/lib/algorithms/dates'
import { formatNumber } from '@/lib/format'
import { isoDate, time } from '@/lib/schemas'
import { FormCard, OutputValue, ResultCard, ToolLayout } from './_shared/tool-layout'

const plural = (n: number, one: string, many: string) =>
	`${formatNumber(n)} ${n === 1 ? one : many}`

const differenceSchema = z.object({
	startDate: isoDate('Informe a data inicial.'),
	startTime: time(),
	endDate: isoDate('Informe a data final.'),
	endTime: time(),
})

/** Interval between two dates and times, in calendar units and in totals. */
export default function DifferenceBetweenDates() {
	const [result, setResult] = useState<ReturnType<typeof dateDifference> | null>(null)
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

	const summary = result
		? [
				plural(result.calendar.years, 'ano', 'anos'),
				plural(result.calendar.months, 'mês', 'meses'),
				plural(result.calendar.days, 'dia', 'dias'),
			].join(', ')
		: ''

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
				<fieldset className="grid grid-cols-[minmax(0,1fr)_7rem] gap-3">
					<legend className="sr-only">Início</legend>
					<form.AppField name="startDate">
						{(f) => <f.DateField label="Data inicial" />}
					</form.AppField>
					<form.AppField name="startTime">{(f) => <f.TimeField label="Horário" />}</form.AppField>
				</fieldset>
				<fieldset className="grid grid-cols-[minmax(0,1fr)_7rem] gap-3">
					<legend className="sr-only">Fim</legend>
					<form.AppField name="endDate">{(f) => <f.DateField label="Data final" />}</form.AppField>
					<form.AppField name="endTime">{(f) => <f.TimeField label="Horário" />}</form.AppField>
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
