'use client'

import { Alert, Button } from '@4people/ui'
import { CircleAlert, CircleX, FileText, FolderOpen } from 'lucide-react'
import { type ReactNode, useDeferredValue, useEffect, useRef, useState } from 'react'
import type { Conversion } from '@/lib/algorithms/convert'
import { formatNumber } from '@/lib/format'
import { OutputBlock, ResultCard } from '../_shared/tool-layout'

const hasBlankInput = (values: unknown) => {
	const input = (values as { input?: unknown }).input
	return typeof input === 'string' && !input.trim()
}

/**
 * Runs an (async) conversion whenever the form values change, on a deferred copy so typing stays
 * smooth. A stale run never overwrites a newer one. A blank `input` gives null without running, so
 * the parser library isn't loaded until there is something to convert.
 */
export function useLiveConversion<Values, Result>(
	values: Values,
	convert: (values: Values) => Promise<Result> | Result,
): Result | null {
	// Serialized so the effect reruns on content changes, not on every new values object.
	const serializedValues = useDeferredValue(JSON.stringify(values))
	const convertRef = useRef(convert)
	convertRef.current = convert
	const [result, setResult] = useState<Result | null>(null)

	useEffect(() => {
		let isLatestRun = true
		Promise.resolve(JSON.parse(serializedValues) as Values)
			.then((latestValues) =>
				hasBlankInput(latestValues) ? null : convertRef.current(latestValues),
			)
			.then((nextResult) => {
				if (isLatestRun) setResult(nextResult)
			})
		return () => {
			isLatestRun = false
		}
	}, [serializedValues])

	return result
}

/** The line where a parser stopped, with a caret under the column. */
export function ErrorExcerpt({
	source,
	line,
	column,
}: {
	source: string
	line: number
	column?: number
}) {
	const lineText = source.split(/\r?\n/)[line - 1]
	if (lineText === undefined) return null
	const gutter = `${line} | `
	const caretLine = column ? `\n${' '.repeat(gutter.length + Math.max(0, column - 1))}^` : null
	return (
		<OutputBlock className="text-danger-ink">
			<span translate="no">
				{gutter}
				{lineText}
				{caretLine}
			</span>
		</OutputBlock>
	)
}

const byteLength = (text: string) => new TextEncoder().encode(text).length

/** Result card of a text → text converter: output, size, warnings, or the parse error in context. */
export function ConversionResult({
	source,
	result,
	downloadName,
	onClear,
	emptyText = 'Cole o conteúdo e a conversão aparece aqui.',
	title = 'Resultado',
	children,
}: {
	source: string
	result: Conversion | null
	downloadName: string
	onClear: () => void
	emptyText?: string
	title?: string
	/** Extra content under the output (tables, notes). */
	children?: ReactNode
}) {
	const visibleResult = source.trim() ? result : null
	const output = visibleResult?.ok ? visibleResult.output : undefined
	return (
		<ResultCard
			title={title}
			empty={!visibleResult}
			emptyText={emptyText}
			copyText={output}
			downloadName={output === undefined ? undefined : downloadName}
			onClear={onClear}
		>
			{visibleResult?.ok && (
				<>
					<p className="text-fg-muted tabular text-sm">
						{formatNumber(byteLength(source))} → {formatNumber(byteLength(visibleResult.output))}{' '}
						bytes
						{visibleResult.info ? ` · ${visibleResult.info}` : null}
					</p>
					{visibleResult.warnings?.map((warning) => (
						<Alert key={warning} tone="warning">
							<CircleAlert />
							{warning}
						</Alert>
					))}
					<OutputBlock className="max-h-[36rem]">
						<span translate="no">{visibleResult.output}</span>
					</OutputBlock>
					{children}
				</>
			)}
			{visibleResult && !visibleResult.ok && (
				<>
					<Alert tone="danger">
						<CircleX />
						{visibleResult.error}
					</Alert>
					{visibleResult.line ? (
						<ErrorExcerpt source={source} line={visibleResult.line} column={visibleResult.column} />
					) : null}
				</>
			)}
		</ResultCard>
	)
}

/** "Usar exemplo" plus the live hint, for FormCard actions. */
export function LiveActions({ onExample }: { onExample: () => void }) {
	return (
		<>
			<Button variant="secondary" size="sm" onClick={onExample}>
				<FileText /> Usar exemplo
			</Button>
			<p className="text-fg-muted text-[0.8125rem]">Converte enquanto você digita.</p>
		</>
	)
}

/** Opens a local text file (CSV, XML…) into a field. The real input stays focusable. */
export function OpenFileButton({
	accept,
	onText,
}: {
	accept: string
	onText: (text: string) => void
}) {
	return (
		<label className="border-border-strong text-fg hover:bg-surface-muted focus-within:ring-ring inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold focus-within:ring-4 [&_svg]:size-4">
			<FolderOpen aria-hidden="true" /> Abrir arquivo
			<input
				type="file"
				accept={accept}
				className="sr-only"
				onChange={async (event) => {
					const file = event.target.files?.[0]
					if (file) onText(await file.text())
					event.target.value = ''
				}}
			/>
		</label>
	)
}
