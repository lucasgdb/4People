import { Badge } from '@4people/ui'
import {
	currencyById,
	formatChange,
	formatRate,
	isMarketClosed,
	type Quote,
	quotesFromSnapshot,
} from '@/lib/algorithms/currency'
import { CurrencyQuotes } from './_currency/currency-quotes'
import { fetchQuoteSnapshot, QUOTE_REVALIDATE_SECONDS } from './_currency/quote-snapshot'

const REAL = currencyById('BRL')
const brasiliaTime = new Intl.DateTimeFormat('pt-BR', {
	day: '2-digit',
	month: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
	timeZone: 'America/Sao_Paulo',
})

function trendTone(percent: number) {
	if (percent > 0) return 'success'
	if (percent < 0) return 'danger'
	return 'neutral'
}

function DollarRate({ label, quote }: { label: string; quote: Quote }) {
	if (!REAL) return null
	return (
		<div className="flex flex-col gap-1">
			<span className="text-fg-muted text-sm font-medium">{label}</span>
			<span className="text-fg tabular text-[clamp(2rem,6vw,2.75rem)] leading-none font-extrabold tracking-[-0.02em]">
				{formatRate(quote.bid, REAL)}
			</span>
			<span className="flex flex-wrap items-center gap-2 text-sm">
				<Badge tone={trendTone(quote.pctChange)} className="tabular">
					{formatChange(quote.pctChange)}
				</Badge>
				<span className="text-fg-muted tabular">
					mín. {formatRate(quote.low, REAL)} · máx. {formatRate(quote.high, REAL)}
				</span>
			</span>
		</div>
	)
}

/** Today's dollar in reais, rendered on the server (refreshed every few minutes), then the converter. */
export default async function DollarToday() {
	const snapshot = await fetchQuoteSnapshot()
	const quotes = snapshot ? quotesFromSnapshot(snapshot) : null
	const commercial = quotes?.get('USD')
	const tourist = quotes?.get('USDT')
	const marketClosed = commercial
		? isMarketClosed(commercial.updatedAt, new Date(snapshot?.fetchedAt ?? Date.now()), false)
		: false

	return (
		<div className="flex flex-col gap-6">
			<section
				aria-labelledby="dolar-agora"
				className="rounded-panel border-border bg-surface flex flex-col gap-6 border p-6 sm:p-8"
			>
				<h2 id="dolar-agora" className="text-fg text-lg font-bold">
					Dólar agora, em reais
				</h2>
				{commercial ? (
					<>
						<div className="grid gap-6 sm:grid-cols-2">
							<DollarRate label="Dólar comercial" quote={commercial} />
							{tourist ? <DollarRate label="Dólar turismo" quote={tourist} /> : null}
						</div>
						<p className="text-fg-muted text-sm">
							{marketClosed ? 'Mercado de câmbio fechado. Última cotação: ' : 'Cotação de '}
							<time dateTime={commercial.updatedAt.toISOString()}>
								{brasiliaTime.format(commercial.updatedAt)}
							</time>{' '}
							(horário de Brasília). Fonte: AwesomeAPI, renovada nesta página a cada{' '}
							{QUOTE_REVALIDATE_SECONDS / 60} minutos.
						</p>
					</>
				) : (
					<p className="text-fg-muted">
						A cotação não carregou no servidor agora. O conversor abaixo busca a mais recente.
					</p>
				)}
			</section>
			<CurrencyQuotes snapshot={snapshot} />
		</div>
	)
}
