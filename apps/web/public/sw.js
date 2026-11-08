/*
 * 4People service worker. Makes the app installable and usable offline:
 *  - pages: network first, so content is always fresh online; the last copy (or /offline) offline.
 *  - /_next/static: cache first (file names carry a content hash, so they never change).
 *  - icons, fonts, images: stale-while-revalidate.
 * Third-party APIs (CEP, IP, banks) are never intercepted: they need the network anyway.
 */
const VERSION = 'v2'
const PAGES = `pages-${VERSION}`
const STATIC = `static-${VERSION}`
const ASSETS = `assets-${VERSION}`
const OFFLINE_URL = '/offline'
const PRECACHE = [OFFLINE_URL, '/', '/icon.svg', '/icons/icon-192.png', '/manifest.webmanifest']

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(PAGES)
			.then((cache) => cache.addAll(PRECACHE))
			.then(() => self.skipWaiting()),
	)
})

self.addEventListener('activate', (event) => {
	const keep = new Set([PAGES, STATIC, ASSETS])
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(keys.filter((key) => !keep.has(key)).map((key) => caches.delete(key))),
			)
			.then(() => self.clients.claim())
			.then(cacheOpenPages),
	)
})

/**
 * The page that installed the worker loaded before the worker existed, so it never went through it.
 * Save the pages open right now (and the files they use), so the first visit already works offline.
 */
async function cacheOpenPages() {
	const windows = await self.clients.matchAll({ type: 'window' })
	const pages = await caches.open(PAGES)
	await Promise.all(
		windows.map(async (client) => {
			const url = new URL(client.url)
			if (url.origin !== self.location.origin) return
			try {
				const response = await fetch(url.href, { credentials: 'same-origin' })
				if (!response.ok) return
				await pages.put(url.href, response.clone())
				// The page's own scripts and styles, so it also runs offline, not just shows up.
				const html = await response.text()
				const files = [...html.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+)"/g)].map(
					(m) => m[1],
				)
				const statics = await caches.open(STATIC)
				await Promise.all(
					[...new Set(files)].map((file) =>
						statics.match(file).then((hit) => hit || statics.add(file).catch(() => undefined)),
					),
				)
			} catch {
				// Offline already, or the page went away: nothing to save.
			}
		}),
	)
}

async function networkFirst(request) {
	const cache = await caches.open(PAGES)
	try {
		const response = await fetch(request)
		if (response.ok) cache.put(request, response.clone())
		return response
	} catch {
		return (
			(await cache.match(request, { ignoreSearch: true })) ||
			(await cache.match(OFFLINE_URL)) ||
			Response.error()
		)
	}
}

async function cacheFirst(request) {
	const cache = await caches.open(STATIC)
	const cached = await cache.match(request)
	if (cached) return cached
	const response = await fetch(request)
	if (response.ok) cache.put(request, response.clone())
	return response
}

async function staleWhileRevalidate(request) {
	const cache = await caches.open(ASSETS)
	const cached = await cache.match(request)
	const update = fetch(request)
		.then((response) => {
			if (response.ok) cache.put(request, response.clone())
			return response
		})
		.catch(() => cached)
	return cached || update
}

self.addEventListener('fetch', (event) => {
	const { request } = event
	if (request.method !== 'GET') return
	const url = new URL(request.url)
	if (url.origin !== self.location.origin) return

	if (request.mode === 'navigate') {
		event.respondWith(networkFirst(request))
	} else if (url.pathname.startsWith('/_next/static/')) {
		event.respondWith(cacheFirst(request))
	} else if (/\.(png|svg|ico|webp|woff2?|webmanifest)$/.test(url.pathname)) {
		event.respondWith(staleWhileRevalidate(request))
	}
})
