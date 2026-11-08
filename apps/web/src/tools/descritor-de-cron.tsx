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

/** Describes a cron expression in Portuguese and lists its next runs in the user's time zone. */
export default function CronDescriber() {
	const form = useAppForm({ defaultValues: { expression: '30 8 * * 1-5' } })
	const expression = useDeferredValue(
		useStore(form.store, (state) => state.values.expression),
	).trim()
	const [outcome, setOutcome] = useState<Outcome | null>(null)

	// cronstrue and cron-parser load on demand; the next runs depend on the clock and the user's
	// time zone, so everything is computed in the browser after mount.
	useEffect(() => {
		if (!expression) {
			setOutcome(null)
			return
		}
		let cancelled = false
		const run = async () => {
			const fields = cronBreakdown(expression)
			const expanded = CRON_MACROS[expression.toLowerCase()] ?? expression
			const [{ default: cronstrue }, { CronExpressionParser }] = await Promise.all([
				import('cronstrue/i18n'),
				import('cron-parser'),
			])
			const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
			let description: string
			let runs: Date[]
			try {
				description = cronstrue.toString(expanded, { locale: 'pt_BR', use24HourTimeFormat: true })
				runs = CronExpressionParser.parse(expanded, { tz: timeZone, currentDate: new Date() })
					.take(RUN_COUNT)
					.map((date) => date.toDate())
			} catch (error) {
				const message = String((error as Error)?.message ?? error)
				throw new Error(
					`Expressão inválida: ${message}. Formato: minuto hora dia-do-mês mês dia-da-semana (ex.: 0 9 * * 1-5).`,
				)
			}
			return { ok: true as const, description, fields, runs, timeZone }
		}
		run()
			.then((result) => !cancelled && setOutcome(result))
			.catch((error: Error) => !cancelled && setOutcome({ ok: false, error: error.message }))
		return () => {
			cancelled = true
		}
	}, [expression])

	const runFormat = new Intl.DateTimeFormat('pt-BR', {
		weekday: 'short',
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: outcome?.ok && outcome.fields.length === 6 ? '2-digit' : undefined,
	})

	return (
		<ToolLayout>
			<FormCard
				title="Expressão cron"
				onSubmit={() => undefined}
				actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
			>
				<form.AppField name="expression">
					{(f) => (
						<f.TextField
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
				{outcome?.ok ? (
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
									{outcome.fields.map((field) => (
										<TableRow key={field.kind}>
											<TableHead
												scope="row"
												className="border-rule text-fg h-auto border-t border-b-0 py-3 align-top text-sm font-medium tracking-normal normal-case group-first/row:border-t-0"
											>
												{field.name}
												<span className="text-fg-muted block text-[0.75rem] font-normal">
													{field.range}
												</span>
											</TableHead>
											<TableCell className="align-top">
												<code translate="no" className="font-mono font-semibold">
													{field.value}
												</code>
											</TableCell>
											<TableCell className="align-top">{field.description}</TableCell>
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
								{outcome.runs.map((date, i) => (
									<li key={date.getTime()} className="flex items-center gap-3 px-4 py-2">
										<span className="text-fg-subtle tabular w-6 text-right text-[0.8125rem]">
											{i + 1}
										</span>
										<time dateTime={date.toISOString()} className="tabular first-letter:uppercase">
											{runFormat.format(date)}
										</time>
									</li>
								))}
							</ol>
						</div>
					</>
				) : outcome ? (
					<Alert tone="danger">
						<CircleX />
						{outcome.error}
					</Alert>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
