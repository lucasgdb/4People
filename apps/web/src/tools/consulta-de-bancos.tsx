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

const banksSchema = z.array(
	z.object({
		ispb: z.string(),
		name: z.string().nullable(),
		code: z.number().nullable(),
		fullName: z.string().nullable(),
	}),
)

async function fetchBanks() {
	const response = await fetch('https://brasilapi.com.br/api/banks/v1')
	if (!response.ok) throw new Error(`Falha ao consultar (${response.status}).`)
	return banksSchema
		.parse(await response.json())
		.filter((bank) => bank.code !== null)
		.sort((a, b) => (a.code ?? 0) - (b.code ?? 0))
}

const normalize = (text: string) =>
	text
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()

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
const REVEAL =
	'[@media(pointer:fine)]:opacity-0 [@media(pointer:fine)]:group-hover/row:opacity-100 focus-visible:opacity-100 transition-opacity'

/** Marks the first accent- and case-insensitive match of `query` (already normalized) in `text`. */
function highlight(text: string, query: string): ReactNode {
	if (!query) return text
	const owner: number[] = []
	let folded = ''
	for (let i = 0; i < text.length; i++) {
		const piece = normalize(text[i] ?? '')
		for (let k = 0; k < piece.length; k++) owner.push(i)
		folded += piece
	}
	const at = folded.indexOf(query)
	if (at < 0) return text
	const start = owner[at] ?? 0
	const end = (owner[at + query.length - 1] ?? start) + 1
	return (
		<>
			{text.slice(0, start)}
			<mark className="bg-accent-soft text-accent-soft-fg rounded-[4px] px-0.5">
				{text.slice(start, end)}
			</mark>
			{text.slice(end)}
		</>
	)
}

/** Bank codes for TED/PIX/boletos (COMPE) and ISPB, fetched once from BrasilAPI and filtered locally. */
export default function BankLookup() {
	const [query, setQuery] = useState('')
	const deferred = useDeferredValue(normalize(query.trim()))
	// The list barely changes: cache it for a day.
	const banks = useQuery({ queryKey: ['banks'], queryFn: fetchBanks, staleTime: 24 * 60 * 60_000 })
	const rows = useMemo(() => {
		const list = banks.data ?? []
		if (!deferred) return list
		return list.filter(
			(bank) =>
				String(bank.code)
					.padStart(3, '0')
					.startsWith(deferred.padStart(Math.min(3, deferred.length), '0')) ||
				String(bank.code) === deferred ||
				bank.ispb.startsWith(deferred) ||
				normalize(
					`${bank.name ?? ''} ${bank.fullName ?? ''} ${KNOWN_AS[bank.code ?? -1] ?? ''}`,
				).includes(deferred),
		)
	}, [banks.data, deferred])

	if (banks.isError) {
		return (
			<Alert tone="danger">
				<CircleX />
				<div className="flex flex-1 flex-wrap items-center justify-between gap-3">
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
							className="bg-surface-muted pl-11"
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
							<span className="flex flex-col items-center gap-3">
								Nenhum banco encontrado para “{query.trim()}”.
								<Button variant="secondary" size="sm" onClick={() => setQuery('')}>
									Limpar busca
								</Button>
							</span>
						</TableEmpty>
					) : (
						rows.map((bank) => {
							const code = String(bank.code).padStart(3, '0')
							const name = bank.name ?? bank.fullName ?? '—'
							return (
								<TableRow
									key={bank.ispb}
									className="[contain-intrinsic-size:auto_3.75rem] [content-visibility:auto]"
								>
									<TableCell>
										<span className="flex items-center gap-1">
											<span
												translate="no"
												className="bg-accent-soft text-accent-soft-fg tabular rounded-chip inline-flex h-7 min-w-12 items-center justify-center px-2 font-mono text-sm font-semibold"
											>
												{code}
											</span>
											<CopyButton
												iconOnly
												variant="ghost"
												value={code}
												label={`Copiar código ${code}`}
												className={REVEAL}
											/>
										</span>
									</TableCell>
									<TableCell>
										<span className="flex flex-wrap items-center gap-x-2 gap-y-1">
											<span className="text-fg font-semibold">{highlight(name, deferred)}</span>
											{bank.code !== null && KNOWN_AS[bank.code] ? (
												<span className="border-border text-fg-muted rounded-full border px-2 py-px text-xs font-medium">
													{highlight(KNOWN_AS[bank.code] ?? '', deferred)}
												</span>
											) : null}
										</span>
										{bank.fullName && bank.fullName !== bank.name ? (
											<span className="text-fg-muted block text-[0.8125rem]">
												{highlight(bank.fullName, deferred)}
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
												className={REVEAL}
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
