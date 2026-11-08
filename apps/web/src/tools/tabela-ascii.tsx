'use client'

import {
	Input,
	Table,
	TableBody,
	TableCard,
	TableCell,
	TableEmpty,
	TableHead,
	TableHeader,
	TableRow,
} from '@4people/ui'
import { useDeferredValue, useMemo, useState } from 'react'
import { ASCII_TABLE, type AsciiRow } from '@/lib/algorithms/ascii'

const COLUMNS = ['Dec', 'Hex', 'Oct', 'Binário', 'Caractere', 'HTML', 'Descrição']
/** Dec, Hex, Oct and Binário are right-aligned. */
const NUMERIC_COLUMN_COUNT = 4

/** Exact code (decimal or hex, with or without 0x) or character, or part of the description. */
function matchesFilter(row: AsciiRow, filter: string): boolean {
	return (
		String(row.code) === filter ||
		row.hex.toLowerCase() === filter.replace(/^0x/, '') ||
		row.char.toLowerCase() === filter ||
		row.description.toLowerCase().includes(filter)
	)
}

/** ASCII 0–127 and Latin-1 128–255 in decimal, hex, octal, binary and HTML, with a filter. */
export default function AsciiTable() {
	const [query, setQuery] = useState('')
	const filter = useDeferredValue(query.trim().toLowerCase())
	const rows = useMemo(
		() => (filter ? ASCII_TABLE.filter((row) => matchesFilter(row, filter)) : ASCII_TABLE),
		[filter],
	)
	return (
		<TableCard
			label="Tabela ASCII"
			maxHeight="40rem"
			toolbar={
				<>
					<Input
						type="search"
						name="filtro"
						autoComplete="off"
						spellCheck={false}
						aria-label="Filtrar por código, caractere ou nome"
						placeholder="Filtrar: 65, 0x41, A, espaço…"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						className="max-w-80"
					/>
					<p aria-live="polite" className="text-fg-muted tabular text-sm">
						{rows.length} de {ASCII_TABLE.length} caracteres
					</p>
				</>
			}
		>
			<Table>
				<TableHeader>
					<tr>
						{COLUMNS.map((column, columnIndex) => (
							<TableHead key={column} numeric={columnIndex < NUMERIC_COLUMN_COUNT}>
								{column}
							</TableHead>
						))}
					</tr>
				</TableHeader>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.code}
							className="[contain-intrinsic-size:auto_2.5rem] [content-visibility:auto]"
						>
							<TableCell numeric>{row.code}</TableCell>
							<TableCell numeric className="font-mono text-sm">
								{row.hex}
							</TableCell>
							<TableCell numeric className="font-mono text-sm">
								{row.octal}
							</TableCell>
							<TableCell numeric className="font-mono text-sm">
								{row.binary}
							</TableCell>
							<TableCell className="text-lg">{row.char}</TableCell>
							<TableCell className="font-mono text-sm">{row.html}</TableCell>
							<TableCell className="text-fg-muted">{row.description}</TableCell>
						</TableRow>
					))}
					{rows.length === 0 ? (
						<TableEmpty colSpan={COLUMNS.length}>Nada encontrado para “{query}”.</TableEmpty>
					) : null}
				</TableBody>
			</Table>
		</TableCard>
	)
}
