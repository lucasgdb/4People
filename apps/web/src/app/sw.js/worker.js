/*
 * 4People service worker. The build prepends three constants (see route.ts next to this file):
 *   VERSION   unique per build, so every deploy is a new worker the browser picks up on its own;
 *   PAGES     every page of the site;
 *   FILES     every file under /_next/static (scripts, styles, fonts).
 *
 * Install: downloads the whole site in the background (files an older version already has are
 * copied from its cache, not downloaded again), then takes over. With Save-Data on, only the
 * essentials. So after one visit online, every tool opens offline, and each deploy refreshes it.
 * Online, everything comes from the server (never the saved copy); offline, the saved copy (or
 * /offline for a page that was never saved).
 * Third-party APIs (CEP, IP, banks, quotes) are never intercepted: they need the network anyway.
 */
const CACHE = `site-${VERSION}`
const OFFLINE_URL = '/offline'
const ESSENTIALS = [OFFLINE_URL, '/', '/manifest.webmanifest', '/icon.svg', '/icons/icon-192.png']

/** Copy from an older version's cache when it has the same URL (hashed files never change). */
async function save(cache, url, { reuse }) {
	if (reuse) {
		const old = await caches.match(url)
		if (old) return cache.put(url, old)
	}
	const response = await fetch(url, { credentials: 'same-origin', cache: 'no-cache' })
	if (response.ok) await cache.put(url, response)
}

/** A few downloads at a time, so the site stays responsive while it's saved. */
async function saveAll(cache, urls, reuse) {
	const queue = [...urls]
	const worker = async () => {
		for (let url = queue.shift(); url; url = queue.shift()) {
			await save(cache, url, { reuse }).catch(() => undefined)
		}
	}
	await Promise.all(Array.from({ length: 6 }, worker))
}

self.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE)
			await cache.addAll(ESSENTIALS)
			const saveData = self.navigator.connection?.saveData === true
			if (!saveData) {
				// Hashed files are the same across versions: reuse them. Pages are rebuilt every deploy.
				await saveAll(cache, FILES, true)
				await saveAll(cache, PAGES, false)
			}
			await self.skipWaiting()
		})(),
	)
})

self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const keys = await caches.keys()
			const hadOlder = keys.some((key) => key !== CACHE)
			await Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
			await self.clients.claim()
			const windows = await self.clients.matchAll({ type: 'window' })
			for (const client of windows) client.postMessage({ type: 'offline-ready', updated: hadOlder })
		})(),
	)
})

/**
 * Online, always the server's response (pages, scripts, icons): the saved copy is never shown while
 * there is a connection, so nobody gets stuck on an old version. Each response refreshes the saved
 * copy. Only when the network fails does the saved copy answer; a page never saved gets /offline.
 */
async function networkFirst(request, { page }) {
	const cache = await caches.open(CACHE)
	try {
		const response = await fetch(request)
		if (response.ok) cache.put(request, response.clone())
		return response
	} catch {
		const saved = await cache.match(request, { ignoreSearch: page })
		if (saved) return saved
		return (page && (await cache.match(OFFLINE_URL))) || Response.error()
	}
}

self.addEventListener('fetch', (event) => {
	const { request } = event
	if (request.method !== 'GET') return
	const url = new URL(request.url)
	if (url.origin !== self.location.origin) return

	if (request.mode === 'navigate') {
		event.respondWith(networkFirst(request, { page: true }))
	} else if (
		url.pathname.startsWith('/_next/static/') ||
		/\.(png|svg|ico|webp|woff2?|webmanifest)$/.test(url.pathname)
	) {
		event.respondWith(networkFirst(request, { page: false }))
	}
})
