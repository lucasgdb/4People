'use client'

import {
	Alert,
	Badge,
	Button,
	cn,
	Field,
	formatMoneyInput,
	formatMoneyValue,
	MoneyInput,
	parseMoneyInput,
	Select,
	Table,
	TableBody,
	TableCard,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableSkeleton,
} from '@4people/ui'
import { useQuery } from '@tanstack/react-query'
import {
	ArrowDownRight,
	ArrowLeftRight,
	ArrowRight,
	ArrowUpRight,
	CircleX,
	Equal,
	Minus,
	RefreshCw,
} from 'lucide-react'
import { useState } from 'react'
import {
	CURRENCIES,
	type Currency,
	crossChange,
	crossRate,
	currencyById,
	currencyDecimals,
	currencySymbol,
	dayRange,
	formatChange,
	formatMoney,
	formatRate,
	isMarketClosed,
	lastUpdate,
	parseQuotes,
	QUOTES_URL,
	type Quote,
} from '@/lib/algorithms/currency'
import { FormCard, ResultCard, ToolLayout } from './_shared/tool-layout'

const OPTIONS = CURRENCIES.map((currency) => ({
	value: currency.id,
	label: `${currency.id === 'USDT' ? 'USD' : currency.id} · ${currency.name}`,
}))

type Side = 'from' | 'to'
type State = { fromId: string; toId: string; active: Side; text: string }

/** The API refreshes about every 30 s; once a minute is live enough and gentle on a free service. */
const REFRESH_MS = 60_000

async function fetchQuotes(): Promise<Map<string, Quote>> {
	const response = await fetch(QUOTES_URL, { headers: { Accept: 'application/json' } })
	if (!response.ok) throw new Error(`Falha na requisição (${response.status}).`)
	return parseQuotes(await response.json())
}

const time = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' })
const weekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })
const dayMonth = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' })

/** "hoje às 19:04" or "sexta-feira, 06/11 às 19:04". */
function when(date: Date, now: Date): string {
	const sameDay = date.toDateString() === now.toDateString()
	return sameDay
		? `hoje às ${time.format(date)}`
		: `${weekday.format(date)}, ${dayMonth.format(date)} às ${time.format(date)}`
}

/** Up, down or flat, with the sign in the text too (color is never the only cue). */
function Change({ percent, suffix }: { percent: number; suffix?: string }) {
	const rounded = Math.round(percent * 100) / 100
	const Icon = rounded > 0 ? ArrowUpRight : rounded < 0 ? ArrowDownRight : Minus
	return (
		<Badge
			tone={rounded > 0 ? 'success' : rounded < 0 ? 'danger' : 'neutral'}
			className="tabular gap-1"
		>
			<Icon aria-hidden="true" className="size-3.5" />
			{formatChange(percent)}
			{suffix ? <span className="font-normal">{suffix}</span> : null}
		</Badge>
	)
}

/**
 * Live exchange rates (AwesomeAPI) and a converter between any two of them, crossed through the
 * real. The table lists the main currencies in reais; "Converter" puts one in the converter.
 */
export default function CurrencyQuotes() {
	const quotes = useQuery({
		queryKey: ['currency-quotes'],
		queryFn: fetchQuotes,
		refetchInterval: REFRESH_MS,
		staleTime: 30_000,
	})
	const [state, setState] = useState<State>({
		fromId: 'USD',
		toId: 'BRL',
		active: 'from',
		text: '1',
	})

	const from = currencyById(state.fromId) as Currency
	const to = currencyById(state.toId) as Currency
	const fromQuote = quotes.data?.get(from.id)
	const toQuote = quotes.data?.get(to.id)
	const now = new Date(quotes.dataUpdatedAt || Date.now())

	const ready = fromQuote && toQuote
	const rate = ready ? crossRate(fromQuote, toQuote) : null
	// The side typed last keeps its text; the other side is computed from it.
	const typed = parseMoneyInput(state.text)
	const amount = state.active === 'from' ? typed : typed !== null && rate ? typed / rate : null
	const converted =
		state.active === 'to' ? typed : amount !== null && rate !== null ? amount * rate : null
	const textOf = (side: Side) => {
		if (state.active === side) return state.text
		const value = side === 'from' ? amount : converted
		return value === null
			? ''
			: formatMoneyValue(value, currencyDecimals(side === 'from' ? from : to))
	}

	const type = (side: Side) => (text: string) => setState((s) => ({ ...s, active: side, text }))

	/** A new currency on the typed side keeps the amount, cut to that currency's decimals. */
	const choose = (side: Side, id: string) =>
		setState((s) => {
			const next = { ...s, [side === 'from' ? 'fromId' : 'toId']: id }
			const currency = currencyById(id)
			return s.active === side && currency
				? { ...next, text: formatMoneyInput(s.text, currencyDecimals(currency)) }
				: next
		})

	const swap = () =>
		setState((s) => ({
			...s,
			fromId: s.toId,
			toId: s.fromId,
			active: s.active === 'from' ? 'to' : 'from',
		}))

	const pick = (id: string) => {
		setState((s) => ({
			fromId: id,
			toId: 'BRL',
			active: 'from',
			text: s.text && s.active === 'from' ? s.text : '1',
		}))
		// Focusing the amount also scrolls the converter into view, ready to type.
		document.getElementById('money-from')?.focus()
	}

	const field = (side: Side) => {
		const currency = side === 'from' ? from : to
		return (
			<div className="grid items-end gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
				<Field label={side === 'from' ? 'De' : 'Para'}>
					<MoneyInput
						id={`money-${side}`}
						prefix={currencySymbol(currency)}
						decimals={currencyDecimals(currency)}
						value={textOf(side)}
						onValueChange={type(side)}
						placeholder="0,00"
						enterKeyHint="done"
						className="text-lg font-semibold"
					/>
				</Field>
				<Field label={side === 'from' ? 'Moeda de origem' : 'Moeda de destino'} hideLabel>
					<Select options={OPTIONS} value={currency.id} onValueChange={(id) => choose(side, id)} />
				</Field>
			</div>
		)
	}

	const updated = ready ? lastUpdate(fromQuote, toQuote) : null
	const closed = isMarketClosed(updated, now, Boolean(from.crypto || to.crypto))
	const range = ready ? dayRange(from.id, fromQuote, to.id, toQuote) : null

	return (
		<ToolLayout>
			<FormCard
				title="Converta"
				onSubmit={() => undefined}
				actions={
					<p className="text-fg-muted text-[0.8125rem]">
						Digite em qualquer um dos lados: o outro acompanha, com a cotação mais recente.
					</p>
				}
			>
				<div className="flex flex-col gap-1">
					{field('from')}
					<div className="flex items-center gap-3">
						<span aria-hidden="true" className="bg-border h-px flex-1" />
						<Equal aria-hidden="true" className="text-fg-subtle size-4" />
						<Button variant="ghost" size="icon" aria-label="Inverter as moedas" onClick={swap}>
							<ArrowLeftRight className="rotate-90" />
						</Button>
						<span aria-hidden="true" className="bg-border h-px flex-1" />
					</div>
					{field('to')}
				</div>
			</FormCard>

			<ResultCard
				title="Cotação"
				copyText={converted !== null ? formatMoney(converted, to, converted < 1) : undefined}
				action={
					<Button
						variant="secondary"
						size="sm"
						onClick={() => quotes.refetch()}
						disabled={quotes.isFetching}
					>
						<RefreshCw className={quotes.isFetching ? 'animate-spin' : undefined} />
						{quotes.isFetching ? 'Atualizando…' : 'Atualizar'}
					</Button>
				}
				note="Cotação comercial de referência, da AwesomeAPI. Bancos e casas de câmbio cobram spread e IOF: o valor que você paga é maior. Para dinheiro em espécie, compare com o dólar turismo."
			>
				{quotes.isPending ? (
					<div aria-busy="true" className="flex flex-col gap-3">
						<span className="sr-only">Consultando as cotações…</span>
						<span className="rounded-control bg-surface-sunken block h-[7.5rem] w-full" />
						<span className="bg-surface-sunken block h-4 w-2/3 rounded-full" />
					</div>
				) : quotes.isError && !quotes.data ? (
					<Alert tone="danger">
						<CircleX />
						Não foi possível consultar as cotações. Verifique a conexão e tente “Atualizar”.
					</Alert>
				) : !ready || rate === null ? (
					<Alert tone="danger">
						<CircleX />A cotação de {(fromQuote ? to : from).name} não veio nesta consulta. Tente
						“Atualizar”.
					</Alert>
				) : (
					<div className="flex flex-col gap-4">
						<div className="rounded-control bg-surface-muted flex flex-col gap-2 px-6 py-5">
							<span className="text-fg-muted text-sm">
								{amount !== null ? formatMoney(amount, from) : '—'} em {to.name.toLowerCase()}
							</span>
							<output
								aria-live="polite"
								translate="no"
								className="text-fg tabular text-[clamp(1.75rem,6vw,2.75rem)] leading-none font-extrabold tracking-[-0.02em] break-all"
							>
								{converted !== null ? formatMoney(converted, to, converted < 1) : '—'}
							</output>
							{from.id !== to.id ? (
								<span className="mt-1 flex flex-wrap items-center gap-2">
									<Change
										percent={crossChange(fromQuote, toQuote)}
										suffix={closed ? 'na última sessão' : 'hoje'}
									/>
								</span>
							) : null}
						</div>

						<dl className="text-fg-muted grid gap-x-6 gap-y-3 text-[0.8125rem] sm:grid-cols-2">
							<div className="flex flex-col gap-0.5">
								<dt>1 {from.id === 'USDT' ? 'USD turismo' : from.code} vale</dt>
								<dd className="text-fg tabular text-[0.9375rem] font-semibold">
									{formatRate(rate, to)}
								</dd>
							</div>
							<div className="flex flex-col gap-0.5">
								<dt>1 {to.id === 'USDT' ? 'USD turismo' : to.code} vale</dt>
								<dd className="text-fg tabular text-[0.9375rem] font-semibold">
									{formatRate(1 / rate, from)}
								</dd>
							</div>
							{range ? (
								<div className="flex flex-col gap-0.5 sm:col-span-2">
									<dt>Mínima e máxima do dia</dt>
									<dd className="text-fg tabular text-[0.9375rem] font-semibold">
										{formatRate(range.low, to)} a {formatRate(range.high, to)}
									</dd>
								</div>
							) : null}
						</dl>

						{updated ? (
							<p className="text-fg-muted flex items-start gap-2 text-[0.8125rem]">
								<span
									aria-hidden="true"
									className={cn(
										'mt-1.5 size-2 shrink-0 rounded-full',
										closed ? 'bg-fg-subtle' : 'bg-success animate-pulse motion-reduce:animate-none',
									)}
								/>
								<span>
									{closed ? (
										<>
											<strong className="text-fg font-semibold">Mercado de câmbio fechado.</strong>{' '}
											Última cotação: {when(updated, now)}.
										</>
									) : (
										<>
											<strong className="text-fg font-semibold">Ao vivo.</strong> Cotação de{' '}
											{when(updated, now)}, atualizada a cada minuto.
										</>
									)}
								</span>
							</p>
						) : null}
					</div>
				)}
			</ResultCard>

			<TableCard
				label="Principais moedas em reais"
				busy={quotes.isPending}
				className="xl:col-span-2"
				toolbar={<h2 className="text-fg text-base font-semibold">Principais moedas em reais</h2>}
			>
				<Table>
					<caption className="sr-only">
						Quanto vale uma unidade de cada moeda em reais e a variação do dia.
					</caption>
					<TableHeader>
						<tr>
							<TableHead>Moeda</TableHead>
							<TableHead className="text-right">Em reais</TableHead>
							<TableHead className="text-right">Variação</TableHead>
							<TableHead className="w-12 sm:w-32">
								<span className="sr-only">Ação</span>
							</TableHead>
						</tr>
					</TableHeader>
					<TableBody>
						{quotes.isPending ? (
							<TableSkeleton rows={8} columns={4} />
						) : (
							CURRENCIES.filter((currency) => currency.id !== 'BRL').map((currency) => {
								const quote = quotes.data?.get(currency.id)
								if (!quote) return null
								return (
									<TableRow key={currency.id}>
										<TableCell>
											<span className="flex items-center gap-3">
												<span
													translate="no"
													className="bg-accent-soft text-accent-soft-fg rounded-chip inline-flex h-7 min-w-12 items-center justify-center px-2 font-mono text-sm font-semibold"
												>
													{currency.code}
												</span>
												{/* Phones: the code says it; the name stays for screen readers. */}
												<span className="text-fg font-semibold max-sm:sr-only">
													{currency.name}
												</span>
											</span>
										</TableCell>
										<TableCell className="text-fg tabular text-right font-semibold whitespace-nowrap">
											{formatRate(quote.bid, CURRENCIES[0] as Currency)}
										</TableCell>
										<TableCell className="text-right">
											<Change percent={quote.pctChange} />
										</TableCell>
										<TableCell className="text-right">
											<Button
												variant="ghost"
												size="sm"
												className="max-sm:size-10 max-sm:px-0"
												onClick={() => pick(currency.id)}
											>
												<ArrowRight aria-hidden="true" className="sm:hidden" />
												<span className="max-sm:sr-only">Converter</span>
												<span className="sr-only"> {currency.name}</span>
											</Button>
										</TableCell>
									</TableRow>
								)
							})
						)}
					</TableBody>
				</Table>
			</TableCard>
		</ToolLayout>
	)
}
