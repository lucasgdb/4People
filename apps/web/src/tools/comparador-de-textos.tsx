'use client'

import {
	Alert,
	Badge,
	cn,
	Table,
	TableBody,
	TableCard,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@4people/ui'
import { useStore } from '@tanstack/react-form'
import { CircleCheck } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { z } from 'zod'
import { useToolForm } from '@/components/form/use-tool-form'
import {
	type Change,
	type DiffUnit,
	diffStats,
	sideBySideRows,
	unifiedLines,
} from '@/lib/algorithms/dev'
import { formatNumber } from '@/lib/format'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const schema = z
	.object({
		original: z.string(),
		changed: z.string(),
		unit: z.enum(['lines', 'words', 'chars']),
		view: z.enum(['split', 'unified']),
		ignoreWhitespace: z.boolean(),
		ignoreCase: z.boolean(),
	})
	.refine((value) => value.original !== '' || value.changed !== '', {
		message: 'Cole ao menos um dos textos.',
		path: ['original'],
	})

const UNITS = [
	{ value: 'lines', label: 'Linhas' },
	{ value: 'words', label: 'Palavras' },
	{ value: 'chars', label: 'Caracteres' },
] as const

const VIEWS = [
	{ value: 'split', label: 'Lado a lado' },
	{ value: 'unified', label: 'Unificado' },
] as const

const UNIT_WORDS: Record<DiffUnit, [string, string]> = {
	lines: ['linha', 'linhas'],
	words: ['palavra', 'palavras'],
	chars: ['caractere', 'caracteres'],
}

type Result = { changes: Change[]; unit: DiffUnit }

const REMOVED = 'bg-danger-soft text-danger-ink'
const ADDED = 'bg-success-soft text-success-ink'

/** A removed/added run inside running text: struck through or underlined, with a spoken label. */
function InlineChange({ change }: { change: Change }) {
	if (change.removed)
		return (
			<del className={cn(REMOVED, 'rounded-[3px] decoration-2')}>
				<span className="sr-only">[removido: </span>
				{change.value}
				<span className="sr-only">]</span>
			</del>
		)
	if (change.added)
		return (
			<ins className={cn(ADDED, 'rounded-[3px] decoration-2 underline-offset-4')}>
				<span className="sr-only">[adicionado: </span>
				{change.value}
				<span className="sr-only">]</span>
			</ins>
		)
	return <span>{change.value}</span>
}

function ScrollTable({ label, children }: { label: string; children: ReactNode }) {
	return (
		<TableCard label={label} maxHeight="36rem">
			<Table className="border-collapse font-mono text-[0.8125rem] leading-relaxed">
				{children}
			</Table>
		</TableCard>
	)
}

// Diff lines are dense code, not data rows: no row rules, tight padding, and a changed row keeps
// its tint on hover.
const diffCell = 'border-t-0 py-0 first:pl-2 last:pr-2'
const numberCell = cn(diffCell, 'text-fg-subtle w-10 px-2 align-top select-none')
const textCell = cn(diffCell, 'px-2 align-top break-all whitespace-pre-wrap')
const REMOVED_ROW = cn(REMOVED, 'hover:bg-danger-soft')
const ADDED_ROW = cn(ADDED, 'hover:bg-success-soft')

function LineDiff({ changes, view }: { changes: Change[]; view: 'split' | 'unified' }) {
	if (view === 'unified') {
		return (
			<ScrollTable label="Diferenças linha a linha">
				<TableBody>
					{unifiedLines(changes).map((line, i) => (
						<TableRow
							// biome-ignore lint/suspicious/noArrayIndexKey: positional lines
							key={i}
							className={
								line.sign === '-' ? REMOVED_ROW : line.sign === '+' ? ADDED_ROW : undefined
							}
						>
							<TableCell numeric className={numberCell}>
								{line.oldNumber ?? ''}
							</TableCell>
							<TableCell numeric className={numberCell}>
								{line.newNumber ?? ''}
							</TableCell>
							<TableCell
								align="center"
								className={cn(diffCell, 'w-5 px-1 align-top font-bold')}
								aria-hidden={line.sign === ' '}
							>
								{line.sign === '-' ? '−' : line.sign === '+' ? '+' : ''}
							</TableCell>
							<TableCell className={textCell}>{line.text || ' '}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</ScrollTable>
		)
	}
	return (
		<ScrollTable label="Diferenças lado a lado">
			<TableHeader className="font-sans">
				<tr>
					<TableHead colSpan={2} className="px-2 first:pl-2">
						Original
					</TableHead>
					<TableHead colSpan={2} className="border-border border-l px-2 last:pr-2">
						Modificado
					</TableHead>
				</tr>
			</TableHeader>
			<TableBody>
				{sideBySideRows(changes).map((row, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: positional rows
					<TableRow key={i}>
						<TableCell numeric className={cn(numberCell, row.left?.changed && REMOVED)}>
							{row.left?.number ?? ''}
						</TableCell>
						<TableCell className={cn(textCell, 'w-1/2', row.left?.changed && REMOVED)}>
							{row.left ? (
								<>
									{row.left.changed ? <span className="font-bold">− </span> : null}
									{row.left.text || ' '}
								</>
							) : null}
						</TableCell>
						<TableCell
							numeric
							className={cn(numberCell, 'border-border border-l', row.right?.changed && ADDED)}
						>
							{row.right?.number ?? ''}
						</TableCell>
						<TableCell className={cn(textCell, 'w-1/2', row.right?.changed && ADDED)}>
							{row.right ? (
								<>
									{row.right.changed ? <span className="font-bold">+ </span> : null}
									{row.right.text || ' '}
								</>
							) : null}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</ScrollTable>
	)
}

function InlineDiff({ changes, view }: { changes: Change[]; view: 'split' | 'unified' }) {
	if (view === 'unified') {
		return (
			<OutputBlock>
				{changes.map((change, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: positional changes
					<InlineChange key={i} change={change} />
				))}
			</OutputBlock>
		)
	}
	return (
		<div className="grid gap-3 lg:grid-cols-2">
			{(['Original', 'Modificado'] as const).map((side) => (
				<div key={side} className="flex min-w-0 flex-col gap-1.5">
					<h3 className="text-fg-muted text-[0.8125rem]">{side}</h3>
					<OutputBlock>
						{changes
							.filter((change) => (side === 'Original' ? !change.added : !change.removed))
							.map((change, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: positional changes
								<InlineChange key={i} change={change} />
							))}
					</OutputBlock>
				</div>
			))}
		</div>
	)
}

/** Compares two texts by line, word or character, side by side or unified. */
export default function TextDiff() {
	const [result, setResult] = useState<Result | null>(null)
	const form = useToolForm({
		schema,
		defaultValues: {
			original: '',
			changed: '',
			unit: 'lines' as DiffUnit,
			view: 'split' as 'split' | 'unified',
			ignoreWhitespace: false,
			ignoreCase: false,
		},
		onSubmit: async ({ original, changed, unit, ignoreWhitespace, ignoreCase }) => {
			const { diffChars, diffLines, diffWords, diffWordsWithSpace } = await import('diff')
			// ignoreCase works for every unit at runtime (jsdiff's base comparator), though lines don't type it.
			const options = { ignoreCase, ignoreWhitespace } as {
				ignoreCase: boolean
				ignoreWhitespace: boolean
			}
			const changes =
				unit === 'lines'
					? diffLines(original, changed, { ...options, newlineIsToken: false })
					: unit === 'words'
						? ignoreWhitespace
							? diffWords(original, changed, { ignoreCase })
							: diffWordsWithSpace(original, changed, { ignoreCase })
						: diffChars(
								ignoreWhitespace ? original.replace(/\s+/g, ' ') : original,
								ignoreWhitespace ? changed.replace(/\s+/g, ' ') : changed,
								{ ignoreCase },
							)
			setResult({ changes, unit })
		},
	})
	const view = useStore(form.store, (state) => state.values.view)
	const stats = result ? diffStats(result.changes, result.unit) : null
	const words = result ? UNIT_WORDS[result.unit] : null
	const plural = (n: number) => (n === 1 ? words?.[0] : words?.[1])
	// "caracteres" is masculine; "linhas" and "palavras" are feminine.
	const participle = (stem: string, n: number) =>
		`${stem}${result?.unit === 'chars' ? 'o' : 'a'}${n === 1 ? '' : 's'}`

	return (
		<ToolLayout className="xl:grid-cols-1">
			<FormCard
				title="Cole os dois textos"
				onSubmit={() => form.handleSubmit()}
				actions={
					<form.AppForm>
						<form.SubmitButton>Comparar</form.SubmitButton>
					</form.AppForm>
				}
			>
				<div className="grid gap-5 lg:grid-cols-2">
					<form.AppField name="original">
						{(f) => (
							<f.TextareaField
								label="Texto original"
								rows={10}
								placeholder="Ex.: a versão antiga"
							/>
						)}
					</form.AppField>
					<form.AppField name="changed">
						{(f) => (
							<f.TextareaField
								label="Texto modificado"
								rows={10}
								placeholder="Ex.: a versão nova"
							/>
						)}
					</form.AppField>
				</div>
				<div className="flex flex-wrap gap-x-8 gap-y-5">
					<form.AppField name="unit" listeners={{ onChange: () => result && form.handleSubmit() }}>
						{(f) => <f.RadioField label="Comparar por" options={UNITS} />}
					</form.AppField>
					<form.AppField name="view">
						{(f) => <f.RadioField label="Visualização" options={VIEWS} />}
					</form.AppField>
				</div>
				<div className="flex flex-wrap gap-x-8">
					<form.AppField
						name="ignoreWhitespace"
						listeners={{ onChange: () => result && form.handleSubmit() }}
					>
						{(f) => (
							<f.CheckboxField
								label="Ignorar espaços"
								description="Espaços extras e no fim das linhas."
							/>
						)}
					</form.AppField>
					<form.AppField
						name="ignoreCase"
						listeners={{ onChange: () => result && form.handleSubmit() }}
					>
						{(f) => <f.CheckboxField label="Ignorar maiúsculas e minúsculas" />}
					</form.AppField>
				</div>
			</FormCard>
			<ResultCard
				title="Diferenças"
				empty={!result}
				emptyText="Cole os dois textos e clique em Comparar."
				onClear={() => {
					setResult(null)
					form.reset()
				}}
			>
				{result && stats ? (
					<>
						{stats.identical ? (
							<Alert tone="success">
								<CircleCheck />
								Os textos são iguais{result.unit === 'lines' ? '' : ' nessa comparação'}.
							</Alert>
						) : (
							<p className="flex flex-wrap items-center gap-2">
								<Badge tone="success" className="tabular">
									+ {formatNumber(stats.added)} {plural(stats.added)}{' '}
									{participle('adicionad', stats.added)}
								</Badge>
								<Badge tone="danger" className="tabular">
									− {formatNumber(stats.removed)} {plural(stats.removed)}{' '}
									{participle('removid', stats.removed)}
								</Badge>
							</p>
						)}
						{result.unit === 'lines' ? (
							<LineDiff changes={result.changes} view={view} />
						) : (
							<InlineDiff changes={result.changes} view={view} />
						)}
						<p className="text-fg-muted text-[0.8125rem]">
							<span className="font-mono font-bold">−</span>{' '}
							{result.unit === 'lines' ? '' : 'riscado: '}só no original ·{' '}
							<span className="font-mono font-bold">+</span>{' '}
							{result.unit === 'lines' ? '' : 'sublinhado: '}só no modificado.
						</p>
					</>
				) : null}
			</ResultCard>
		</ToolLayout>
	)
}
