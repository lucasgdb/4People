'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/**
 * Every new page starts at the top. Next.js only scrolls when the new segment's top is off screen,
 * which the persistent shell (sidebar + top bar) often prevents. Back/forward keep the browser's
 * restored position, and in-page anchors (#perguntas) don't change the pathname.
 */
export function ScrollToTop() {
	const pathname = usePathname()
	const previous = useRef(pathname)
	const fromHistory = useRef(false)

	useEffect(() => {
		const onPopState = () => {
			fromHistory.current = true
		}
		window.addEventListener('popstate', onPopState)
		return () => window.removeEventListener('popstate', onPopState)
	}, [])

	useEffect(() => {
		if (previous.current === pathname) return
		previous.current = pathname
		if (fromHistory.current) {
			fromHistory.current = false
			return
		}
		window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
		// Hand focus to the new page so keyboard and screen reader users start at its content.
		document.getElementById('conteudo')?.focus({ preventScroll: true })
	}, [pathname])

	return null
}
