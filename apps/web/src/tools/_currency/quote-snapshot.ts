import {
	parseQuotes,
	QUOTES_URL,
	type QuoteSnapshot,
	snapshotFromQuotes,
} from '@/lib/algorithms/currency'

/** How long a rendered page keeps its rates before the server fetches new ones. */
export const QUOTE_REVALIDATE_SECONDS = 300

/**
 * Server-side quotes for the HTML (search engines and the first paint see real numbers). Returns
 * null when the API fails, and the page then loads the rates in the browser as before.
 */
export async function fetchQuoteSnapshot(): Promise<QuoteSnapshot | null> {
	try {
		const response = await fetch(QUOTES_URL, {
			headers: { Accept: 'application/json' },
			next: { revalidate: QUOTE_REVALIDATE_SECONDS },
		})
		if (!response.ok) return null
		return snapshotFromQuotes(parseQuotes(await response.json()), Date.now())
	} catch {
		return null
	}
}
