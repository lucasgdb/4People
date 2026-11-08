'use client'

import { Alert, Button } from '@4people/ui'
import { CircleAlert, CircleX, FileText, FolderOpen } from 'lucide-react'
import { type ReactNode, useDeferredValue, useEffect, useRef, useState } from 'react'
import type { Conversion } from '@/lib/algorithms/convert'
import { formatNumber } from '@/lib/format'
import { OutputBlock, ResultCard } from '../_shared/tool-layout'

/**
 * Runs an (async) conversion whenever the form values change, on a deferred copy so typing stays
 * smooth. Stale results from an older run never overwrite a newer one; an empty `input` gives null.
 */
export function useLiveConversion<V, T>(values: V, run: (values: V) => Promise<T> | T): T | null {
	const key = useDeferredValue(JSON.stringify(values))
	const runRef = useRef(run)
	runRef.current = run
	const [result, setResult] = useState<T | null>(null)
	useEffect(() => {
		let alive = true
		Promise.resolve(JSON.parse(key) as V)
			// An empty `input` skips the run, so the parser library isn't even loaded until needed.
			.then((parsed) => {
				const input = (parsed as { input?: unknown }).input
				return typeof input === 'string' && !input.trim() ? null : runRef.current(parsed)
			})
			.then((next) => {
				if (alive) setResult(next)
			})
		return () => {
			alive = false
		}
	}, [key])
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
	const text = source.split(/\r?\n/)[line - 1]
	if (text === undefined) return null
	const gutter = `${line} | `
	return (
		<OutputBlock className="text-danger-ink">
			<span translate="no">
				{gutter}
				{text}
				{column ? `\n${' '.repeat(gutter.length + Math.max(0, column - 1))}^` : null}
			</span>
		</OutputBlock>
	)
}

const bytes = (text: string) => new TextEncoder().encode(text).length

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
	const empty = !source.trim() || result === null
	return (
		<ResultCard
			title={title}
			empty={empty}
			emptyText={emptyText}
			copyText={!empty && result?.ok ? result.output : undefined}
			downloadName={!empty && result?.ok ? downloadName : undefined}
			onClear={onClear}
		>
			{empty ? null : result?.ok ? (
				<>
					<p className="text-fg-muted tabular text-sm">
						{formatNumber(bytes(source))} → {formatNumber(bytes(result.output))} bytes
						{result.info ? ` · ${result.info}` : null}
					</p>
					{result.warnings?.map((warning) => (
						<Alert key={warning} tone="warning">
							<CircleAlert />
							{warning}
						</Alert>
					))}
					<OutputBlock className="max-h-[36rem]">
						<span translate="no">{result.output}</span>
					</OutputBlock>
					{children}
				</>
			) : result ? (
				<>
					<Alert tone="danger">
						<CircleX />
						{result.error}
					</Alert>
					{result.line ? (
						<ErrorExcerpt source={source} line={result.line} column={result.column} />
					) : null}
				</>
			) : null}
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
