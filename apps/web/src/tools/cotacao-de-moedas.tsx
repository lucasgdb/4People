import { CurrencyQuotes } from './_currency/currency-quotes'
import { fetchQuoteSnapshot } from './_currency/quote-snapshot'

export default async function CurrencyQuotesTool() {
	return <CurrencyQuotes snapshot={await fetchQuoteSnapshot()} />
}
