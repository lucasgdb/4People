'use client'

import {
	DataList,
	Table,
	TableBody,
	TableCard,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@4people/ui'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { compoundInterest } from '@/lib/algorithms/calculators'
import { formatCurrency, formatNumber } from '@/lib/format'
import { numeric } from '@/lib/schemas'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const schema = z.object({
	principal: numeric({ min: 0, max: 1_000_000_000 }),
	monthlyDeposit: numeric({ min: 0, max: 100_000_000 }),
	rate: numeric({ min: 0, max: 1000 }),
	ratePeriod: z.enum(['month', 'year']),
	period: numeric({ integer: true, min: 1, max: 1200 }),
	periodUnit: z.enum(['months', 'years']),
})

const RATE_PERIODS = [
	{ value: 'year', label: 'ao ano' },
	{ value: 'month', label: 'ao mês' },
] as const

const PERIOD_UNITS = [
	{ value: 'years', label: 'Anos' },
	{ value: 'months', label: 'Meses' },
] as const

type Result = ReturnType<typeof compoundInterest>

/** One row per year, plus the last month when the period isn't whole years. */
const yearlyMilestones = (rows: Result['rows']) =>
	rows.filter((row, index) => row.month % 12 === 0 || index === rows.length - 1)

const resultToText = ({ invested, interest, balance }: Result) =>
	[
		`Total investido: ${formatCurrency(invested)}`,
		`Juros: ${formatCurrency(interest)}`,
		`Saldo final: ${formatCurrency(balance)}`,
	].join('\n')

/** Month-by-month compound growth with monthly deposits; the table shows one row per year. */
export default function CompoundInterest() {
	const [result, setResult] = useState<Result | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: {
			principal: '1000',
			monthlyDeposit: '200',
			rate: '10',
			ratePeriod: 'year',
			period: '5',
			periodUnit: 'years',
		},
		onSubmit: ({ period, periodUnit, ...input }) => {
			const months = periodUnit === 'years' ? period * 12 : period
			setResult(compoundInterest({ ...input, months }))
		},
	})

	const milestones = result ? yearlyMilestones(result.rows) : []

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>Simular</form.SubmitButton>
					</form.AppForm>
				}
			>
				<div className="grid grid-cols-2 items-end gap-x-3 gap-y-4 sm:gap-x-4">
					<form.AppField name="principal">
						{(field) => (
							<field.NumberField
								label="Valor inicial"
								placeholder="Ex: 1000"
								suffix="R$"
								min={0}
								max={1_000_000_000}
							/>
						)}
					</form.AppField>
					<form.AppField name="monthlyDeposit">
						{(field) => (
							<field.NumberField
								label="Aporte mensal"
								placeholder="Ex: 200"
								suffix="R$"
								min={0}
								max={100_000_000}
							/>
						)}
					</form.AppField>
					<form.AppField name="rate">
						{(field) => (
							<field.NumberField
								label="Taxa de juros"
								placeholder="Ex: 10"
								suffix="%"
								min={0}
								max={1000}
							/>
						)}
					</form.AppField>
					<form.AppField name="ratePeriod">
						{(field) => <field.RadioField label="Taxa" options={RATE_PERIODS} />}
					</form.AppField>
					<form.AppField name="period">
						{(field) => (
							<field.NumberField label="Período" placeholder="Ex: 5" integer min={1} max={1200} />
						)}
					</form.AppField>
					<form.AppField name="periodUnit">
						{(field) => <field.SelectField label="Em" options={PERIOD_UNITS} />}
					</form.AppField>
				</div>
			</FormCard>
			<ResultCard
				empty={!result}
				copyText={result ? resultToText(result) : ''}
				onClear={() => setResult(null)}
			>
				{result ? (
					<div className="flex flex-col gap-4">
						<DataList
							columns={2}
							items={[
								{ label: 'Saldo final', value: formatCurrency(result.balance) },
								{ label: 'Total em juros', value: formatCurrency(result.interest) },
								{ label: 'Total investido', value: formatCurrency(result.invested) },
								{
									label: 'Taxa mensal equivalente',
									value: `${formatNumber(result.monthlyRate, 4)}%`,
								},
							]}
						/>
						<TableCard label="Evolução do saldo, por ano" maxHeight="20rem">
							<Table className="text-[0.875rem]">
								<caption className="sr-only">Evolução do saldo</caption>
								<TableHeader>
									<tr>
										<TableHead>Mês</TableHead>
										<TableHead numeric>Investido</TableHead>
										<TableHead numeric>Juros</TableHead>
										<TableHead numeric>Saldo</TableHead>
									</tr>
								</TableHeader>
								<TableBody>
									{milestones.map((row) => (
										<TableRow key={row.month}>
											<TableCell className="tabular">{row.month}</TableCell>
											<TableCell numeric>{formatCurrency(row.invested)}</TableCell>
											<TableCell numeric>{formatCurrency(row.interest)}</TableCell>
											<TableCell numeric className="font-medium">
												{formatCurrency(row.balance)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableCard>
						<p className="text-fg-muted text-[0.8125rem]">
							Aportes no fim de cada mês. Não considera impostos nem inflação.
						</p>
					</div>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
