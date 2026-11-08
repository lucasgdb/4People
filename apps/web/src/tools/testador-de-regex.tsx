'use client'

import {
	Alert,
	Badge,
	CopyButton,
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
import { useDeferredValue, useMemo } from 'react'
import { useAppForm } from '@/components/form/form'
import {
	highlightSegments,
	REGEX_FLAGS,
	type RegexMatch,
	runRegex,
	type Segment,
} from '@/lib/algorithms/dev'
import { formatNumber } from '@/lib/format'
import { FormCard, OutputBlock, ResultCard, ToolLayout } from './_shared/tool-layout'

const DEFAULTS = {
	pattern: '(?<dia>\\d{2})/(?<mes>\\d{2})/(?<ano>\\d{4})',
	g: true,
	i: false,
	m: false,
	s: false,
	u: false,
	y: false,
	text: 'Pedido feito em 05/03/2025 e entregue em 12/03/2025.\nPróxima revisão: 01/04/2025.',
	replacement: '$<ano>-$<mes>-$<dia>',
}

const MATCH_LIMIT = 1000
/** Two alternating tints so adjacent matches read apart; the list below names each one. */
const MATCH_TINTS = [
	'bg-accent-soft text-accent-soft-fg',
	'bg-warning-soft text-warning-ink',
] as const

function matchCountText(count: number, truncated: boolean): string {
	const total =
		count === 0
			? 'Nenhuma correspondência.'
			: `${formatNumber(count)} ${count === 1 ? 'correspondência' : 'correspondências'}`
	return truncated ? `${total} (mostrando as primeiras ${formatNumber(MATCH_LIMIT)})` : total
}

function HighlightedText({ segments }: { segments: Segment[] }) {
	return (
		<OutputBlock>
			{segments.map((segment, position) =>
				segment.match === null ? (
					// biome-ignore lint/suspicious/noArrayIndexKey: positional segments of one text
					<span key={position}>{segment.text}</span>
				) : (
					<mark
						// biome-ignore lint/suspicious/noArrayIndexKey: positional segments of one text
						key={position}
						title={`Correspondência ${segment.match + 1}`}
						className={`rounded-[4px] underline decoration-1 underline-offset-4 ${MATCH_TINTS[segment.match % 2]}`}
					>
						{segment.text}
					</mark>
				),
			)}
		</OutputBlock>
	)
}

function GroupList({ groups }: { groups: RegexMatch['groups'] }) {
	return (
		<ul className="mt-1 flex flex-col gap-0.5 text-[0.8125rem]">
			{groups.map((group) => (
				<li key={group.number} className="flex flex-wrap gap-2">
					<Badge tone="neutral">
						{group.name ? `${group.number} · ${group.name}` : `Grupo ${group.number}`}
					</Badge>
					<code translate="no" className="font-mono break-all">
						{group.value === undefined ? (
							<span className="text-fg-subtle">não participou</span>
						) : (
							group.value
						)}
					</code>
				</li>
			))}
		</ul>
	)
}

function MatchTable({ matches }: { matches: RegexMatch[] }) {
	return (
		<TableCard label="Lista de correspondências" maxHeight="28rem">
			<Table>
				<TableHeader>
					<tr>
						<TableHead numeric className="w-10">
							#
						</TableHead>
						<TableHead numeric className="w-20">
							Posição
						</TableHead>
						<TableHead>Trecho e grupos</TableHead>
					</tr>
				</TableHeader>
				<TableBody>
					{matches.map((match, position) => (
						<TableRow key={match.index}>
							<TableCell numeric className="text-fg-muted align-top">
								{position + 1}
							</TableCell>
							<TableCell numeric className="align-top whitespace-nowrap">
								{match.index}–{match.end}
							</TableCell>
							<TableCell className="align-top">
								<code translate="no" className="font-mono break-all whitespace-pre-wrap">
									{match.text || <span className="text-fg-subtle">(vazio)</span>}
								</code>
								{match.groups.length > 0 ? <GroupList groups={match.groups} /> : null}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableCard>
	)
}

/** Tests a JavaScript regular expression: highlighted matches, groups and a replace preview. */
export default function RegexTester() {
	const form = useAppForm({ defaultValues: DEFAULTS })
	const values = useDeferredValue(useStore(form.store, (state) => state.values))
	const flags = REGEX_FLAGS.map(({ flag }) => (values[flag] ? flag : '')).join('')

	const result = useMemo(() => {
		if (!values.pattern) return null
		const outcome = runRegex(values.pattern, flags, values.text, MATCH_LIMIT)
		if (!outcome.ok) return outcome
		// A fresh RegExp: the matched one has a moved lastIndex, which a sticky replace would honor.
		const regex = new RegExp(values.pattern, flags)
		return {
			...outcome,
			segments: highlightSegments(values.text, outcome.matches),
			replaced: values.text.replace(regex, values.replacement),
		}
	}, [values.pattern, values.text, values.replacement, flags])

	return (
		<ToolLayout>
			<FormCard
				title="Expressão e texto"
				onSubmit={() => undefined}
				actions={<p className="text-fg-muted text-[0.8125rem]">Atualiza enquanto você digita.</p>}
			>
				<form.AppField name="pattern">
					{(field) => (
						<field.TextField
							label="Expressão regular"
							placeholder="Ex.: \d{3}\.\d{3}\.\d{3}-\d{2}"
							inputClassName="font-mono"
							description="Sem as barras: escreva só o padrão. Sintaxe do JavaScript."
						/>
					)}
				</form.AppField>
				<fieldset className="flex flex-col gap-1">
					<legend className="text-fg mb-1 text-sm font-medium">
						Flags <code className="text-fg-muted font-mono">/{flags}</code>
					</legend>
					<div className="grid gap-x-4 sm:grid-cols-2">
						{REGEX_FLAGS.map(({ flag, label, hint }) => (
							<form.AppField key={flag} name={flag}>
								{(field) => <field.CheckboxField label={label} description={hint} />}
							</form.AppField>
						))}
					</div>
				</fieldset>
				<form.AppField name="text">
					{(field) => (
						<field.TextareaField
							label="Texto de teste"
							rows={7}
							placeholder="Ex.: cole aqui o texto"
						/>
					)}
				</form.AppField>
				<form.AppField name="replacement">
					{(field) => (
						<field.TextField
							label="Substituir por (opcional)"
							placeholder="Ex.: $1, $<nome> ou $&"
							inputClassName="font-mono"
							description="$& é o trecho encontrado, $1 o grupo 1 e $<nome> um grupo nomeado."
						/>
					)}
				</form.AppField>
			</FormCard>
			<ResultCard
				title="Correspondências"
				empty={!result}
				emptyText="Digite uma expressão regular para ver as correspondências."
				onClear={() => form.reset({ ...DEFAULTS, pattern: '', text: '', replacement: '' })}
			>
				{result?.ok === true && (
					<>
						<p className="text-fg tabular font-semibold">
							{matchCountText(result.matches.length, result.truncated)}
						</p>
						{values.text ? <HighlightedText segments={result.segments} /> : null}
						{result.matches.length > 0 ? <MatchTable matches={result.matches} /> : null}
						{values.replacement ? (
							<div className="flex flex-col gap-2">
								<div className="flex flex-wrap items-center justify-between gap-2">
									<h3 className="text-fg text-sm font-semibold">Texto após substituir</h3>
									<CopyButton value={result.replaced} aria-label="Copiar texto substituído" />
								</div>
								<OutputBlock>{result.replaced}</OutputBlock>
								{!flags.includes('g') ? (
									<p className="text-fg-muted text-[0.8125rem]">
										Sem a flag g, só a primeira ocorrência é substituída.
									</p>
								) : null}
							</div>
						) : null}
					</>
				)}
				{result?.ok === false && (
					<Alert tone="danger">
						<CircleX />
						{result.error}
					</Alert>
				)}
			</ResultCard>
		</ToolLayout>
	)
}
