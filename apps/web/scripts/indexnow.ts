// Tells IndexNow search engines (Bing, Yandex, Naver, Seznam…) which URLs changed, so they recrawl
// them without waiting. Run after a deploy:
//
//   pnpm indexnow                                  # every URL in the live sitemap
//   pnpm indexnow /computacao/geradores/gerador-de-cpf

import { INDEXNOW_KEY, PRODUCTION_URL } from '../src/lib/urls.ts'

async function sitemapUrls() {
	const response = await fetch(`${PRODUCTION_URL}/sitemap.xml`)
	if (!response.ok) throw new Error(`sitemap.xml: HTTP ${response.status}`)
	const xml = await response.text()
	return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
}

const paths = process.argv.slice(2)
const urlList = paths.length
	? paths.map((path) => new URL(path, PRODUCTION_URL).href)
	: await sitemapUrls()

const response = await fetch('https://api.indexnow.org/indexnow', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json; charset=utf-8' },
	body: JSON.stringify({
		host: new URL(PRODUCTION_URL).host,
		key: INDEXNOW_KEY,
		keyLocation: `${PRODUCTION_URL}/${INDEXNOW_KEY}.txt`,
		urlList,
	}),
})

// 200 and 202 are both accepted (202: the key is still being validated).
console.log(`IndexNow: HTTP ${response.status} for ${urlList.length} URLs`)
if (!response.ok) {
	console.error(await response.text())
	process.exitCode = 1
}
