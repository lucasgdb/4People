'use client'

import { toast } from '@4people/ui'
import { useEffect } from 'react'

/**
 * Registers /sw.js in production builds only, so development never serves stale code. The worker
 * downloads the whole site for offline use; it tells when that is done the first time, and quietly
 * refreshes it after each deploy (the browser checks for a new version on every visit).
 */
export function ServiceWorker() {
	useEffect(() => {
		if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return
		const onMessage = (event: MessageEvent) => {
			if (event.data?.type === 'offline-ready' && !event.data.updated) {
				toast.show('Pronto para usar offline', {
					description: 'Todas as ferramentas agora abrem sem internet neste aparelho.',
					tone: 'success',
				})
			}
		}
		navigator.serviceWorker.addEventListener('message', onMessage)

		// Registered once the page has loaded and the browser is idle, so the background download of
		// the site never competes with the first visit.
		const register = () =>
			navigator.serviceWorker
				// updateViaCache "none": the browser always asks the server for /sw.js, so a deploy is
				// noticed on the next visit.
				.register('/sw.js', { scope: '/', updateViaCache: 'none' })
				.catch(() => {
					// Installability and offline are an enhancement; the site works without them.
				})
		const whenIdle = () => {
			// Safari has no requestIdleCallback: a short delay after load does the same job there.
			if (typeof window.requestIdleCallback === 'function') {
				window.requestIdleCallback(() => register(), { timeout: 5000 })
			} else {
				setTimeout(register, 2000)
			}
		}
		if (document.readyState === 'complete') whenIdle()
		else window.addEventListener('load', whenIdle, { once: true })

		return () => {
			navigator.serviceWorker.removeEventListener('message', onMessage)
			window.removeEventListener('load', whenIdle)
		}
	}, [])
	return null
}
