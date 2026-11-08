'use client'

import {
	Alert,
	Button,
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
import { useDeferredValue, useEffect, useState } from 'react'
import { useAppForm } from '@/components/form/form'
import { CRON_MACROS, CRON_PRESETS, type CronField, cronBreakdown } from '@/lib/algorithms/dev'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

type Outcome =
	| { ok: true; description: string; fields: CronField[]; runs: Date[]; timeZone: string }
	| { ok: false; error: string }

const RUN_COUNT = 10

/** Loads cronstrue and cron-parser on demand and describes the expression. Throws in Portuguese. */
async function describeCron(expression: string): Promise<Outcome> {
	const fields = cronBreakdown(expression)
	const expanded = CRON_MACROS[expression.toLowerCase()] ?? expression
	const [{ default: cronstrue }, { CronExpressionParser }] = await Promise.all([
		import('cronstrue/i18n'),
		import('cron-parser'),
	])
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
	try {
		const description = cronstrue.toString(expanded, {
			locale: 'pt_BR',
			use24HourTimeFormat: true,
		})
		const runs = CronExpressionParser.parse(expanded, { tz: timeZone, currentDate: new Date() })
			.take(RUN_COUNT)
			.map((date) => date.toDate())
		return { ok: true, description, fields, runs, timeZone }
	} catch (error) {
		const reason = String((error as Error)?.message ?? error)
		throw new Error(
			`Expressão inválida: ${reason}. Formato: minuto hora dia-do-mês mês dia-da-semana (ex.: 0 9 * * 1-5).`,
		)
	}
}

/** Describes a cron expression in Portuguese and lists its next runs in the user's time zone. */
export default function CronDescriber() {
	const form = useAppForm({ defaultValues: { expression: '30 8 * * 1-5' } })
	const expression = useDeferredValue(
		useStore(form.store, (state) => state.values.expression),
	).trim()
	const [outcome, setOutcome] = useState<Outcome | null>(null)

	// The next runs depend on the clock and the user's time zone, so they are computed after mount.
	useEffect(() => {
		if (!expression) {
			setOutcome(null)
			return
		}
		let cancelled = false
		describeCron(expression)
			.then((result) => !cancelled && setOutcome(result))
			.catch((error: Error) => !cancelled && setOutcome({ ok: false, error: error.message }))
		return () => {
			cancelled = true
		}
	}, [expression])

	const hasSeconds = outcome?.ok && outcome.fields.length === 6
	const runDateFormat = new Intl.DateTimeFormat('pt-BR', {
		weekday: 'short',
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: hasSeconds ? '2-digit' : undefined,
	})

	return (
		<ToolLayout>
			<FormCard
				title="Expressão cron"
				onSubmit={() => undefined}
				actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
			>
				<form.AppField name="expression">
					{(field) => (
						<field.TextField
							label="Expressão"
							placeholder="Ex.: */15 * * * *"
							inputClassName="font-mono text-lg"
							description="5 campos: minuto, hora, dia do mês, mês e dia da semana. Com 6, o primeiro são os segundos. Atalhos como @daily também valem."
						/>
					)}
				</form.AppField>
				<div className="flex flex-col gap-2">
					<p className="text-fg-muted text-[0.8125rem]">Modelos prontos:</p>
					<ul className="flex flex-wrap gap-2">
						{CRON_PRESETS.map((preset) => (
							<li key={preset.expression}>
								<Button
									variant="secondary"
									size="sm"
									onClick={() => form.setFieldValue('expression', preset.expression)}
								>
									{preset.label}
								</Button>
							</li>
						))}
					</ul>
				</div>
			</FormCard>
			<ResultCard
				title="O que ela significa"
				empty={!outcome}
				emptyText="Digite uma expressão cron para ver a descrição e as próximas execuções."
				copyText={outcome?.ok ? outcome.description : undefined}
				onClear={() => form.reset({ expression: '' })}
			>
				{outcome?.ok === true && (
					<>
						<p className="rounded-control bg-surface-muted text-fg px-5 py-4 text-xl leading-snug font-bold">
							{outcome.description}
						</p>
						<TableCard label="Campos da expressão">
							<Table>
								<TableHeader>
									<tr>
										<TableHead>Campo</TableHead>
										<TableHead>Valor</TableHead>
										<TableHead>Significado</TableHead>
									</tr>
								</TableHeader>
								<TableBody>
									{outcome.fields.map((cronField) => (
										<TableRow key={cronField.kind}>
											<TableHead
												scope="row"
												className="border-rule text-fg h-auto border-t border-b-0 py-3 align-top text-sm font-medium tracking-normal normal-case group-first/row:border-t-0"
											>
												{cronField.name}
												<span className="text-fg-muted block text-[0.75rem] font-normal">
													{cronField.range}
												</span>
											</TableHead>
											<TableCell className="align-top">
												<code translate="no" className="font-mono font-semibold">
													{cronField.value}
												</code>
											</TableCell>
											<TableCell className="align-top">{cronField.description}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableCard>
						<div className="flex flex-col gap-2">
							<h3 className="text-fg text-sm font-semibold">
								Próximas {outcome.runs.length} execuções ({outcome.timeZone})
							</h3>
							<ol className="rounded-panel border-border divide-rule divide-y border">
								{outcome.runs.map((date, position) => (
									<li key={date.getTime()} className="flex items-center gap-3 px-4 py-2">
										<span className="text-fg-subtle tabular w-6 text-right text-[0.8125rem]">
											{position + 1}
										</span>
										<time dateTime={date.toISOString()} className="tabular first-letter:uppercase">
											{runDateFormat.format(date)}
										</time>
									</li>
								))}
							</ol>
						</div>
					</>
				)}
				{outcome?.ok === false && (
					<Alert tone="danger">
						<CircleX />
						{outcome.error}
					</Alert>
				)}
			</ResultCard>
		</ToolLayout>
	)
}
