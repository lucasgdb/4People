'use client'

import { Button, toast } from '@4people/ui'
import { Share2 } from 'lucide-react'

/**
 * Shares the current page with the device's own share sheet (phones, Safari, Edge…). Where the
 * browser has none, it copies the link and a toast says so. The label is the same everywhere, so
 * the server HTML and the page after load never disagree.
 */
export function ShareButton({ title, text }: { title: string; text: string }) {
	async function share() {
		const url = window.location.href
		if (typeof navigator.share === 'function') {
			try {
				await navigator.share({ title, text, url })
				return
			} catch (error) {
				// Closing the share sheet is not an error; anything else falls back to copying.
				if ((error as Error).name === 'AbortError') return
			}
		}
		try {
			await navigator.clipboard.writeText(url)
			toast.success('Link copiado. É só colar onde quiser.')
		} catch {
			toast.error('Não foi possível copiar o link.')
		}
	}

	return (
		<Button variant="secondary" size="sm" onClick={share}>
			<Share2 /> Compartilhar
		</Button>
	)
}
