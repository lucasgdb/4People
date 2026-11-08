'use client'

import { Button, toast } from '@4people/ui'
import { Link2, Share2 } from 'lucide-react'
import { useEffect, useState } from 'react'

/**
 * Shares the current page with the device's own share sheet (phones, Safari, Edge…). Where the
 * browser has none, it copies the link instead, and the label says so.
 */
export function ShareButton({ title, text }: { title: string; text: string }) {
	// Decided after mount: the server HTML can't know the device, and both labels fit the layout.
	const [native, setNative] = useState(false)
	useEffect(() => {
		setNative(typeof navigator.share === 'function')
	}, [])

	async function share() {
		const url = window.location.href
		if (native) {
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
			{native ? <Share2 /> : <Link2 />}
			{native ? 'Compartilhar' : 'Copiar link'}
		</Button>
	)
}
