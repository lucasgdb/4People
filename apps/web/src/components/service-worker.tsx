'use client'

import { useEffect } from 'react'

/** Registers /sw.js in production builds only, so development never serves stale code. */
export function ServiceWorker() {
	useEffect(() => {
		if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return
		navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
			// Installability and offline are an enhancement; the site works without them.
		})
	}, [])
	return null
}
