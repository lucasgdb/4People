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

const TOURIST_DOLLAR_ID = 'USDT'

const CURRENCY_OPTIONS = CURRENCIES.map((currency) => ({
	value: currency.id,
	label: `${currency.id === TOURIST_DOLLAR_ID ? 'USD' : currency.id} · ${currency.name}`,
}))

const REAL = CURRENCIES[0] as Currency

type Side = 'from' | 'to'
type ConverterState = {
	fromId: string
	toId: string
	/** The side typed last: it keeps its text and the other side is computed from it. */
	activeSide: Side
	text: string
}

const INITIAL_STATE: ConverterState = { fromId: 'USD', toId: 'BRL', activeSide: 'from', text: '1' }

/** The API refreshes about every 30 s; once a minute is live enough and gentle on a free service. */
const REFRESH_MS = 60_000

async function fetchQuotes(): Promise<Map<string, Quote>> {
	const response = await fetch(QUOTES_URL, { headers: { Accept: 'application/json' } })
	if (!response.ok) throw new Error(`Falha na requisição (${response.status}).`)
	return parseQuotes(await response.json())
}

const timeFormat = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' })
const weekdayFormat = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })
const dayMonthFormat = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' })

/** "hoje às 19:04" or "sexta-feira, 06/11 às 19:04". */
function describeUpdateTime(date: Date, now: Date): string {
	const time = timeFormat.format(date)
	if (date.toDateString() === now.toDateString()) return `hoje às ${time}`
	return `${weekdayFormat.format(date)}, ${dayMonthFormat.format(date)} às ${time}`
}

/** "1 USD vale", with the tourist dollar spelled out. */
function oneUnitLabel(currency: Currency): string {
	return currency.id === TOURIST_DOLLAR_ID ? 'USD turismo' : currency.code
}

const TREND_STYLES = {
	up: { Icon: ArrowUpRight, tone: 'success' },
	down: { Icon: ArrowDownRight, tone: 'danger' },
	flat: { Icon: Minus, tone: 'neutral' },
} as const

function trendOf(percent: number): keyof typeof TREND_STYLES {
	const rounded = Math.round(percent * 100) / 100
	if (rounded > 0) return 'up'
	if (rounded < 0) return 'down'
	return 'flat'
}

/** Up, down or flat, with the sign in the text too (color is never the only cue). */
function Change({ percent, suffix }: { percent: number; suffix?: string }) {
	const { Icon, tone } = TREND_STYLES[trendOf(percent)]
	return (
		<Badge tone={tone} className="tabular gap-1">
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
	const [state, setState] = useState<ConverterState>(INITIAL_STATE)

	const from = currencyById(state.fromId) as Currency
	const to = currencyById(state.toId) as Currency
	const fromQuote = quotes.data?.get(from.id)
	const toQuote = quotes.data?.get(to.id)
	const now = new Date(quotes.dataUpdatedAt || Date.now())

	const hasBothQuotes = fromQuote && toQuote
	const rate = hasBothQuotes ? crossRate(fromQuote, toQuote) : null
	const typedAmount = parseMoneyInput(state.text)
	const fromAmount = computeFromAmount(state.activeSide, typedAmount, rate)
	const toAmount = computeToAmount(state.activeSide, typedAmount, fromAmount, rate)

	function displayedText(side: Side): string {
		if (state.activeSide === side) return state.text
		const amount = side === 'from' ? fromAmount : toAmount
		if (amount === null) return ''
		return formatMoneyValue(amount, currencyDecimals(side === 'from' ? from : to))
	}

	function typeInto(side: Side, text: string) {
		setState((current) => ({ ...current, activeSide: side, text }))
	}

	/** A new currency on the typed side keeps the amount, cut to that currency's decimals. */
	function chooseCurrency(side: Side, id: string) {
		setState((current) => {
			const next = { ...current, [side === 'from' ? 'fromId' : 'toId']: id }
			const currency = currencyById(id)
			if (current.activeSide !== side || !currency) return next
			return { ...next, text: formatMoneyInput(current.text, currencyDecimals(currency)) }
		})
	}

	function swapCurrencies() {
		setState((current) => ({
			...current,
			fromId: current.toId,
			toId: current.fromId,
			activeSide: current.activeSide === 'from' ? 'to' : 'from',
		}))
	}

	function convertFromTable(id: string) {
		setState((current) => ({
			fromId: id,
			toId: 'BRL',
			activeSide: 'from',
			text: current.text && current.activeSide === 'from' ? current.text : '1',
		}))
		// Focusing the amount also scrolls the converter into view, ready to type.
		document.getElementById('money-from')?.focus()
	}

	function renderSide(side: Side) {
		const currency = side === 'from' ? from : to
		return (
			<div className="grid items-end gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
				<Field label={side === 'from' ? 'De' : 'Para'}>
					<MoneyInput
						id={`money-${side}`}
						prefix={currencySymbol(currency)}
						decimals={currencyDecimals(currency)}
						value={displayedText(side)}
						onValueChange={(text) => typeInto(side, text)}
						placeholder="0,00"
						enterKeyHint="done"
						className="text-lg font-semibold"
					/>
				</Field>
				<Field label={side === 'from' ? 'Moeda de origem' : 'Moeda de destino'} hideLabel>
					<Select
						options={CURRENCY_OPTIONS}
						value={currency.id}
						onValueChange={(id) => chooseCurrency(side, id)}
					/>
				</Field>
			</div>
		)
	}

	const updatedAt = hasBothQuotes ? lastUpdate(fromQuote, toQuote) : null
	const isClosed = isMarketClosed(updatedAt, now, Boolean(from.crypto || to.crypto))
	const range = hasBothQuotes ? dayRange(from.id, fromQuote, to.id, toQuote) : null
	const formattedToAmount = toAmount !== null ? formatMoney(toAmount, to, toAmount < 1) : null

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
					{renderSide('from')}
					<div className="flex items-center gap-3">
						<span aria-hidden="true" className="bg-border h-px flex-1" />
						<Equal aria-hidden="true" className="text-fg-subtle size-4" />
						<Button
							variant="ghost"
							size="icon"
							aria-label="Inverter as moedas"
							onClick={swapCurrencies}
						>
							<ArrowLeftRight className="rotate-90" />
						</Button>
						<span aria-hidden="true" className="bg-border h-px flex-1" />
					</div>
					{renderSide('to')}
				</div>
			</FormCard>

			<ResultCard
				title="Cotação"
				copyText={formattedToAmount ?? undefined}
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
				) : !hasBothQuotes || rate === null ? (
					<Alert tone="danger">
						<CircleX />A cotação de {(fromQuote ? to : from).name} não veio nesta consulta. Tente
						“Atualizar”.
					</Alert>
				) : (
					<div className="flex flex-col gap-4">
						<div className="rounded-control bg-surface-muted flex flex-col gap-2 px-6 py-5">
							<span className="text-fg-muted text-sm">
								{fromAmount !== null ? formatMoney(fromAmount, from) : '—'} em{' '}
								{to.name.toLowerCase()}
							</span>
							<output
								aria-live="polite"
								translate="no"
								className="text-fg tabular text-[clamp(1.75rem,6vw,2.75rem)] leading-none font-extrabold tracking-[-0.02em] break-all"
							>
								{formattedToAmount ?? '—'}
							</output>
							{from.id !== to.id ? (
								<span className="mt-1 flex flex-wrap items-center gap-2">
									<Change
										percent={crossChange(fromQuote, toQuote)}
										suffix={isClosed ? 'na última sessão' : 'hoje'}
									/>
								</span>
							) : null}
						</div>

						<dl className="text-fg-muted grid gap-x-6 gap-y-3 text-[0.8125rem] sm:grid-cols-2">
							<div className="flex flex-col gap-0.5">
								<dt>1 {oneUnitLabel(from)} vale</dt>
								<dd className="text-fg tabular text-[0.9375rem] font-semibold">
									{formatRate(rate, to)}
								</dd>
							</div>
							<div className="flex flex-col gap-0.5">
								<dt>1 {oneUnitLabel(to)} vale</dt>
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

						{updatedAt ? (
							<MarketStatus updatedAt={updatedAt} now={now} isClosed={isClosed} />
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
											{formatRate(quote.bid, REAL)}
										</TableCell>
										<TableCell className="text-right">
											<Change percent={quote.pctChange} />
										</TableCell>
										<TableCell className="text-right">
											<Button
												variant="ghost"
												size="sm"
												className="max-sm:size-10 max-sm:px-0"
												onClick={() => convertFromTable(currency.id)}
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

function computeFromAmount(
	activeSide: Side,
	typedAmount: number | null,
	rate: number | null,
): number | null {
	if (activeSide === 'from') return typedAmount
	if (typedAmount === null || !rate) return null
	return typedAmount / rate
}

function computeToAmount(
	activeSide: Side,
	typedAmount: number | null,
	fromAmount: number | null,
	rate: number | null,
): number | null {
	if (activeSide === 'to') return typedAmount
	if (fromAmount === null || rate === null) return null
	return fromAmount * rate
}

function MarketStatus({
	updatedAt,
	now,
	isClosed,
}: {
	updatedAt: Date
	now: Date
	isClosed: boolean
}) {
	const updateTime = describeUpdateTime(updatedAt, now)
	return (
		<p className="text-fg-muted flex items-start gap-2 text-[0.8125rem]">
			<span
				aria-hidden="true"
				className={cn(
					'mt-1.5 size-2 shrink-0 rounded-full',
					isClosed ? 'bg-fg-subtle' : 'bg-success animate-pulse motion-reduce:animate-none',
				)}
			/>
			<span>
				{isClosed ? (
					<>
						<strong className="text-fg font-semibold">Mercado de câmbio fechado.</strong> Última
						cotação: {updateTime}.
					</>
				) : (
					<>
						<strong className="text-fg font-semibold">Ao vivo.</strong> Cotação de {updateTime},
						atualizada a cada minuto.
					</>
				)}
			</span>
		</p>
	)
}
