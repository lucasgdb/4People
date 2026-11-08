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
import { ASCII_TABLE } from '@/lib/algorithms/ascii'

/** ASCII 0–127 and Latin-1 128–255 in decimal, hex, octal, binary and HTML, with a filter. */
export default function AsciiTable() {
	const [query, setQuery] = useState('')
	const deferred = useDeferredValue(query.trim().toLowerCase())
	const rows = useMemo(
		() =>
			deferred
				? ASCII_TABLE.filter(
						(row) =>
							String(row.code) === deferred ||
							row.hex.toLowerCase() === deferred.replace(/^0x/, '') ||
							row.char.toLowerCase() === deferred ||
							row.description.toLowerCase().includes(deferred),
					)
				: ASCII_TABLE,
		[deferred],
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
						{['Dec', 'Hex', 'Oct', 'Binário', 'Caractere', 'HTML', 'Descrição'].map((h, i) => (
							<TableHead key={h} numeric={i < 4}>
								{h}
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
						<TableEmpty colSpan={7}>Nada encontrado para “{query}”.</TableEmpty>
					) : null}
				</TableBody>
			</Table>
		</TableCard>
	)
}
