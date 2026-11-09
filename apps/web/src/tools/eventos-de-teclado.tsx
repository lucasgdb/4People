'use client'

import { DataList, Input, Kbd } from '@4people/ui'
import { useEffect, useState } from 'react'

/** KeyboardEvent.location values. */
const KEY_LOCATIONS: Record<number, string> = {
	0: 'Tecla padrão',
	1: 'Modificador à esquerda',
	2: 'Modificador à direita',
	3: 'Teclado numérico',
}

type KeyInfo = { key: string; code: string; keyCode: number; location: number; modifiers: string[] }

function isFormField(element: HTMLElement): boolean {
	return /^(input|textarea|select)$/i.test(element.tagName) || element.isContentEditable
}

function pressedModifiers(event: KeyboardEvent): string[] {
	const modifiers: string[] = []
	if (event.ctrlKey) modifiers.push('Ctrl')
	if (event.altKey) modifiers.push('Alt')
	if (event.shiftKey) modifiers.push('Shift')
	return modifiers
}

/** Shows key, code, keyCode and location of the last key pressed. */
export default function KeycodeEvent() {
	const [info, setInfo] = useState<KeyInfo | null>(null)

	useEffect(() => {
		// Listens without preventDefault, so Tab, scrolling and browser shortcuts keep working.
		function onKeyDown(event: KeyboardEvent) {
			const target = event.target as HTMLElement
			const isProbeField = target.hasAttribute('data-key-probe')
			if (!isProbeField && isFormField(target)) return
			setInfo({
				key: event.key === ' ' ? 'Espaço' : event.key,
				code: event.code,
				keyCode: event.keyCode,
				location: event.location,
				modifiers: pressedModifiers(event),
			})
		}
		window.addEventListener('keydown', onKeyDown)
		return () => window.removeEventListener('keydown', onKeyDown)
	}, [])

	return (
		<section
			data-captures-keys
			aria-live="polite"
			aria-label="Última tecla pressionada"
			className="rounded-panel border-border bg-surface-muted flex flex-col gap-6 border p-6 sm:p-8"
		>
			{info ? (
				<>
					<div className="flex flex-wrap items-end gap-x-6 gap-y-2">
						<span className="text-fg tabular text-[6rem] leading-[0.9] font-extrabold tracking-[-0.03em]">
							{info.keyCode}
						</span>
						<span className="text-fg-muted pb-2">
							event.keyCode da tecla <Kbd>{info.key}</Kbd>
							{info.modifiers.length > 0 ? (
								<>
									{' '}
									com{' '}
									{info.modifiers.map((modifier) => (
										<Kbd key={modifier} className="ml-1">
											{modifier}
										</Kbd>
									))}
								</>
							) : null}
						</span>
					</div>
					<DataList
						columns={4}
						items={[
							{ label: 'event.key', value: info.key },
							{ label: 'event.code', value: info.code || '—' },
							{ label: 'event.which', value: info.keyCode },
							{ label: 'event.location', value: info.location, hint: KEY_LOCATIONS[info.location] },
						]}
					/>
				</>
			) : (
				<p className="text-fg flex min-h-24 items-center text-lg leading-loose sm:min-h-40">
					<span>
						Pressione qualquer tecla, por exemplo <Kbd>A</Kbd>, <Kbd>Enter</Kbd> ou <Kbd>F5</Kbd>.
					</span>
				</p>
			)}
			{/* Touch screens show no keyboard until a field has focus. Virtual keyboards often report
			    keyCode 229 ("Unidentified") for letters, and that is what this shows. */}
			<div className="hidden flex-col gap-2 pointer-coarse:flex">
				<label htmlFor="key-probe" className="text-sm font-medium">
					Sem teclado físico? Toque aqui e digite:
				</label>
				<Input
					id="key-probe"
					data-key-probe
					autoComplete="off"
					autoCapitalize="off"
					spellCheck={false}
					placeholder="Toque para abrir o teclado"
					onChange={(event) => {
						event.currentTarget.value = ''
					}}
				/>
			</div>
		</section>
	)
}
