'use client'

import {
	Alert,
	Button,
	CopyButton,
	Input,
	Table,
	TableBody,
	TableCard,
	TableCell,
	TableEmpty,
	TableHead,
	TableHeader,
	TableRow,
	TableSkeleton,
} from '@4people/ui'
import { useQuery } from '@tanstack/react-query'
import { CircleX, RefreshCw, Search } from 'lucide-react'
import { type ReactNode, useDeferredValue, useMemo, useState } from 'react'
import { z } from 'zod'
import { formatNumber } from '@/lib/format'

const BANKS_URL = 'https://brasilapi.com.br/api/banks/v1'
const ONE_DAY_MS = 24 * 60 * 60_000

const bankSchema = z.object({
	ispb: z.string(),
	name: z.string().nullable(),
	code: z.number().nullable(),
	fullName: z.string().nullable(),
})
const banksSchema = z.array(bankSchema)

type Bank = z.infer<typeof bankSchema>

async function fetchBanks(): Promise<Bank[]> {
	const response = await fetch(BANKS_URL)
	if (!response.ok) throw new Error(`Falha ao consultar (${response.status}).`)
	return banksSchema
		.parse(await response.json())
		.filter((bank) => bank.code !== null)
		.sort((first, second) => (first.code ?? 0) - (second.code ?? 0))
}

/** Lowercase without accents, so "itau" finds "Itaú". */
function foldForSearch(text: string): string {
	return text
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
}

/** COMPE codes are shown with three digits: 1 → "001". */
function formatBankCode(code: number | null): string {
	return String(code).padStart(3, '0')
}

/**
 * The commercial names people know and search for, by bank code. BrasilAPI returns the registered
 * names (Nubank is "NU PAGAMENTOS - IP"), so these are shown next to them and are searchable.
 */
const KNOWN_AS: Record<number, string> = {
	1: 'Banco do Brasil',
	33: 'Santander',
	77: 'Inter',
	104: 'Caixa',
	208: 'BTG Pactual',
	212: 'Banco Original',
	237: 'Bradesco',
	260: 'Nubank',
	290: 'PagBank',
	323: 'Mercado Pago',
	336: 'C6 Bank',
	341: 'Itaú',
	380: 'PicPay',
	403: 'Cora',
	655: 'Neon',
	748: 'Sicredi',
	756: 'Sicoob',
}

/** Copy buttons appear with the row on mouse devices; always visible on touch and on focus. */
const REVEAL_ON_ROW_HOVER =
	'[@media(pointer:fine)]:opacity-0 [@media(pointer:fine)]:group-hover/row:opacity-100 focus-visible:opacity-100 transition-opacity'

/**
 * Marks the first accent- and case-insensitive match of `query` (already folded) in `text`.
 * Folding can change the length of a character, so each folded character remembers which original
 * character it came from.
 */
function highlight(text: string, query: string): ReactNode {
	if (!query) return text
	const originalIndexOf: number[] = []
	let folded = ''
	for (let index = 0; index < text.length; index++) {
		const foldedCharacter = foldForSearch(text[index] ?? '')
		originalIndexOf.push(...Array<number>(foldedCharacter.length).fill(index))
		folded += foldedCharacter
	}
	const matchIndex = folded.indexOf(query)
	if (matchIndex < 0) return text
	const start = originalIndexOf[matchIndex] ?? 0
	const end = (originalIndexOf[matchIndex + query.length - 1] ?? start) + 1
	return (
		<>
			{text.slice(0, start)}
			<mark className="bg-accent-soft text-accent-soft-fg rounded-sm px-0.5">
				{text.slice(start, end)}
			</mark>
			{text.slice(end)}
		</>
	)
}

/** Matches the code ("1", "001"), the start of the ISPB, or any of the bank's names. */
function matchesQuery(bank: Bank, query: string): boolean {
	if (formatBankCode(bank.code).startsWith(query)) return true
	if (String(bank.code) === query) return true
	if (bank.ispb.startsWith(query)) return true
	const knownAs = KNOWN_AS[bank.code ?? -1] ?? ''
	const searchableNames = `${bank.name ?? ''} ${bank.fullName ?? ''} ${knownAs}`
	return foldForSearch(searchableNames).includes(query)
}

/** Bank codes for TED/PIX/boletos (COMPE) and ISPB, fetched once from BrasilAPI and filtered locally. */
export default function BankLookup() {
	const [query, setQuery] = useState('')
	const foldedQuery = useDeferredValue(foldForSearch(query.trim()))
	// The list barely changes, so it is cached for a day.
	const banks = useQuery({ queryKey: ['banks'], queryFn: fetchBanks, staleTime: ONE_DAY_MS })
	const rows = useMemo(() => {
		const allBanks = banks.data ?? []
		if (!foldedQuery) return allBanks
		return allBanks.filter((bank) => matchesQuery(bank, foldedQuery))
	}, [banks.data, foldedQuery])

	if (banks.isError) {
		return (
			<Alert tone="danger">
				<CircleX />
				<div className="flex flex-1 flex-wrap items-center justify-between gap-4">
					Não foi possível carregar a lista de bancos agora.
					<Button size="sm" variant="secondary" onClick={() => banks.refetch()}>
						<RefreshCw /> Tentar de novo
					</Button>
				</div>
			</Alert>
		)
	}

	const total = banks.data?.length ?? 0

	return (
		<TableCard
			label="Lista de bancos"
			busy={banks.isPending}
			maxHeight="40rem"
			toolbar={
				<>
					<div className="relative w-full sm:max-w-sm">
						<Search
							aria-hidden="true"
							className="text-fg-muted pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
						/>
						<Input
							type="search"
							name="banco"
							autoComplete="off"
							spellCheck={false}
							aria-label="Buscar banco por código, nome ou ISPB"
							placeholder="Código, nome ou ISPB…"
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							className="bg-surface-muted pl-12"
						/>
					</div>
					<p aria-live="polite" className="text-fg-muted tabular text-sm">
						{banks.isPending ? (
							'Carregando bancos…'
						) : rows.length === total ? (
							<>
								<strong className="text-fg font-semibold">{formatNumber(total)}</strong> bancos
							</>
						) : (
							<>
								<strong className="text-fg font-semibold">{formatNumber(rows.length)}</strong> de{' '}
								{formatNumber(total)} bancos
							</>
						)}
					</p>
				</>
			}
		>
			<Table>
				<caption className="sr-only">
					Bancos com código COMPE e ISPB. Use a busca para filtrar.
				</caption>
				<TableHeader>
					<tr>
						<TableHead className="w-24 sm:w-32">Código</TableHead>
						<TableHead>Banco</TableHead>
						<TableHead className="hidden w-48 sm:table-cell">ISPB</TableHead>
					</tr>
				</TableHeader>
				<TableBody>
					{banks.isPending ? (
						<TableSkeleton rows={8} columns={3} />
					) : rows.length === 0 ? (
						<TableEmpty colSpan={3}>
							<span className="flex flex-col items-center gap-4">
								Nenhum banco encontrado para “{query.trim()}”.
								<Button variant="secondary" size="sm" onClick={() => setQuery('')}>
									Limpar busca
								</Button>
							</span>
						</TableEmpty>
					) : (
						rows.map((bank) => {
							const code = formatBankCode(bank.code)
							const name = bank.name ?? bank.fullName ?? '—'
							const knownAs = bank.code !== null ? KNOWN_AS[bank.code] : undefined
							return (
								<TableRow
									key={bank.ispb}
									className="[contain-intrinsic-size:auto_3.75rem] [content-visibility:auto]"
								>
									<TableCell>
										<span className="flex items-center gap-1">
											<span
												translate="no"
												className="bg-accent-soft text-accent-soft-fg tabular rounded-chip inline-flex h-8 min-w-12 items-center justify-center px-2 font-mono text-sm font-semibold"
											>
												{code}
											</span>
											<CopyButton
												iconOnly
												variant="ghost"
												value={code}
												label={`Copiar código ${code}`}
												className={REVEAL_ON_ROW_HOVER}
											/>
										</span>
									</TableCell>
									<TableCell>
										<span className="flex flex-wrap items-center gap-x-2 gap-y-1">
											<span className="text-fg font-semibold">{highlight(name, foldedQuery)}</span>
											{knownAs ? (
												<span className="border-border text-fg-muted rounded-full border px-2 py-px text-xs font-medium">
													{highlight(knownAs, foldedQuery)}
												</span>
											) : null}
										</span>
										{bank.fullName && bank.fullName !== bank.name ? (
											<span className="text-fg-muted block text-[0.8125rem]">
												{highlight(bank.fullName, foldedQuery)}
											</span>
										) : null}
										{/* On phones the ISPB column folds in here. */}
										<span className="text-fg-muted mt-1 flex items-center gap-1 text-[0.8125rem] sm:hidden">
											ISPB{' '}
											<span translate="no" className="tabular font-mono">
												{bank.ispb}
											</span>
											<CopyButton
												iconOnly
												variant="ghost"
												value={bank.ispb}
												label={`Copiar ISPB de ${name}`}
											/>
										</span>
									</TableCell>
									<TableCell className="hidden sm:table-cell">
										<span className="inline-flex items-center gap-1">
											<span translate="no" className="text-fg-muted tabular font-mono text-sm">
												{bank.ispb}
											</span>
											<CopyButton
												iconOnly
												variant="ghost"
												value={bank.ispb}
												label={`Copiar ISPB de ${name}`}
												className={REVEAL_ON_ROW_HOVER}
											/>
										</span>
									</TableCell>
								</TableRow>
							)
						})
					)}
				</TableBody>
			</Table>
		</TableCard>
	)
}
