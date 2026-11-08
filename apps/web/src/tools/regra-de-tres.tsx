'use client'

import { DataList } from '@4people/ui'
import { useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import { ruleOfThree } from '@/lib/algorithms/calculators'
import { formatNumber } from '@/lib/format'
import { numeric } from '@/lib/schemas'
import { FormCard, OutputValue, ResultCard, ToolLayout } from './_shared/tool-layout'

const schema = z
	.object({
		a: numeric({}),
		b: numeric({}),
		c: numeric({}),
		kind: z.enum(['direct', 'inverse']),
	})
	.superRefine(({ a, c, kind }, ctx) => {
		if (kind === 'direct' && a === 0)
			ctx.addIssue({ code: 'custom', message: 'Não pode ser zero.', path: ['a'] })
		if (kind === 'inverse' && c === 0)
			ctx.addIssue({ code: 'custom', message: 'Não pode ser zero.', path: ['c'] })
	})

const KINDS = [
	{ value: 'direct', label: 'Direta' },
	{ value: 'inverse', label: 'Inversa' },
] as const

type Result = { x: number; formula: string }

const formatTerm = (value: number) => formatNumber(value, 6)

/** The calculation written out with the user's numbers. */
function formulaText(a: number, b: number, c: number, kind: 'direct' | 'inverse') {
	if (kind === 'direct') return `x = ${formatTerm(b)} × ${formatTerm(c)} ÷ ${formatTerm(a)}`
	return `x = ${formatTerm(a)} × ${formatTerm(b)} ÷ ${formatTerm(c)}`
}

/** a is to b as c is to x, in direct or inverse proportion. */
export default function RuleOfThree() {
	const [result, setResult] = useState<Result | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: { a: '', b: '', c: '', kind: 'direct' },
		onSubmit: ({ a, b, c, kind }) =>
			setResult({ x: ruleOfThree(a, b, c, kind), formula: formulaText(a, b, c, kind) }),
	})

	return (
		<ToolLayout>
			<FormCard
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>Calcular x</form.SubmitButton>
					</form.AppForm>
				}
			>
				<form.AppField name="kind">
					{(field) => (
						<field.RadioField
							label="Proporção"
							description="Direta: as duas grandezas crescem juntas. Inversa: uma cresce e a outra diminui."
							options={KINDS}
						/>
					)}
				</form.AppField>
				{/* Laid out as the proportion is written: a → b, c → x. */}
				<div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-x-3 gap-y-4">
					<form.AppField name="a">
						{(field) => <field.NumberField label="a" placeholder="Ex: 2" />}
					</form.AppField>
					<span aria-hidden="true" className="text-fg-muted pb-2.5">
						→
					</span>
					<form.AppField name="b">
						{(field) => <field.NumberField label="b" placeholder="Ex: 10" />}
					</form.AppField>
					<form.AppField name="c">
						{(field) => <field.NumberField label="c" placeholder="Ex: 6" />}
					</form.AppField>
					<span aria-hidden="true" className="text-fg-muted pb-2.5">
						→
					</span>
					<div className="flex flex-col gap-2">
						<span className="text-fg text-sm leading-none font-medium">x</span>
						<span className="rounded-control bg-surface-sunken text-fg-muted tabular flex h-11 items-center px-3 sm:h-10">
							{result ? formatTerm(result.x) : '?'}
						</span>
					</div>
				</div>
			</FormCard>
			<ResultCard
				empty={!result}
				copyText={result ? formatTerm(result.x) : ''}
				onClear={() => {
					setResult(null)
					form.reset()
				}}
			>
				{result ? (
					<>
						<OutputValue>x = {formatTerm(result.x)}</OutputValue>
						<DataList
							columns={1}
							items={[
								{ label: 'Conta', value: <span className="text-base">{result.formula}</span> },
							]}
						/>
					</>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
