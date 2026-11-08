'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { type DateUnit, fromISODate, shiftDate, toISODate } from '@/lib/algorithms/dates'
import { formatDate } from '@/lib/format'
import { isoDate, numeric } from '@/lib/schemas'
import { FormCard, OutputValue, ResultCard, ToolLayout } from './tool-layout'

const UNITS = [
	{ value: 'days', label: 'Dias' },
	{ value: 'weeks', label: 'Semanas' },
	{ value: 'months', label: 'Meses' },
	{ value: 'years', label: 'Anos' },
] as const satisfies ReadonlyArray<{ value: DateUnit; label: string }>

const shiftSchema = z.object({
	date: isoDate(),
	amount: numeric({ integer: true, min: 0, max: 100_000 }),
	unit: z.enum(['days', 'weeks', 'months', 'years']),
})

/** Adds (direction 1) or subtracts (direction −1) days, weeks, months or years from a date. */
export function ShiftDate({ direction }: { direction: 1 | -1 }) {
	const [result, setResult] = useState<Date | null>(null)
	const form = useToolForm({
		schema: shiftSchema,
		defaultValues: { date: '', amount: '', unit: 'days' },
		onSubmit: ({ date, amount, unit }) =>
			setResult(shiftDate(fromISODate(date), amount * direction, unit)),
	})

	useEffect(() => {
		// Today depends on the user's clock, so it is filled after hydration.
		form.setFieldValue('date', toISODate(new Date()))
	}, [form])

	const verb = direction === 1 ? 'adicionar' : 'subtrair'

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>{direction === 1 ? 'Somar' : 'Subtrair'}</form.SubmitButton>
					</form.AppForm>
				}
			>
				<form.AppField name="date">{(field) => <field.DateField label="Data" />}</form.AppField>
				<div className="grid grid-cols-2 items-end gap-x-3 gap-y-4 sm:gap-x-4">
					<form.AppField name="amount">
						{(field) => (
							<field.NumberField
								label={`Quantidade a ${verb}`}
								placeholder="Ex: 30"
								integer
								min={0}
								max={100_000}
							/>
						)}
					</form.AppField>
					<form.AppField name="unit">
						{(field) => <field.SelectField label="Unidade" options={UNITS} />}
					</form.AppField>
				</div>
			</FormCard>
			<ResultCard
				empty={!result}
				copyText={result ? formatDate(result) : ''}
				onClear={() => setResult(null)}
			>
				{result ? (
					<div className="flex flex-col gap-2">
						<OutputValue className="text-xl first-letter:uppercase sm:text-2xl">
							{formatDate(result)}
						</OutputValue>
						<p className="text-fg-muted tabular text-sm">{result.toLocaleDateString('pt-BR')}</p>
					</div>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
