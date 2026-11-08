'use client'

import { useEffect, useState } from 'react'
import { cn } from '../lib/cn.ts'
import { Kbd } from './kbd.tsx'

/** Ctrl+Enter (⌘+Enter on Apple keyboards), without Alt/Shift and not mid-composition (IME). */
export function isSubmitShortcut(
	event: Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey' | 'isComposing'>,
) {
	return (
		event.key === 'Enter' &&
		(event.ctrlKey || event.metaKey) &&
		!event.altKey &&
		!event.shiftKey &&
		!event.isComposing
	)
}

/**
 * Design-system rule: in any form, Ctrl+Enter / ⌘+Enter submits it, from any field, including
 * textareas (where plain Enter is a new line). Mount once near the root. It calls the form's native
 * `requestSubmit()`, so the submit goes through the same handler as the button: with TanStack Form
 * that is `form.handleSubmit()`, which runs the Zod validation and focuses the first invalid field.
 * A form whose submit button is disabled (e.g. while submitting) is left alone.
 */
export function SubmitShortcut() {
	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (!isSubmitShortcut(event) || event.defaultPrevented) return
			const target = event.target
			if (!(target instanceof Element)) return
			const form = target.closest('form')
			if (!form) return
			const submit = form.querySelector<HTMLButtonElement>(
				'button[type="submit"], input[type="submit"]',
			)
			if (submit?.disabled) return
			event.preventDefault()
			form.requestSubmit(submit ?? undefined)
		}
		document.addEventListener('keydown', onKeyDown)
		return () => document.removeEventListener('keydown', onKeyDown)
	}, [])
	return null
}

/** Value for `aria-keyshortcuts` on submit buttons. */
export const SUBMIT_SHORTCUT_ARIA = 'Control+Enter Meta+Enter'

/**
 * The shortcut drawn as keycaps next to a submit label. Shown only where it helps: in a form that
 * has a text field (you can submit without leaving the keyboard) and on devices with a precise
 * pointer (a keyboard is likely). "Text field" = textarea or an input that isn't a checkbox, radio,
 * slider, file, color, button or the hidden inputs widgets render. A form made only of choices (options, selects, sliders) never
 * shows it; the shortcut still works there. Hidden from assistive tech, which reads
 * `aria-keyshortcuts`. Starts as "Ctrl" (same HTML on server and client), "⌘" on Apple devices.
 */
export function SubmitShortcutHint({ className }: { className?: string }) {
	const [apple, setApple] = useState(false)
	useEffect(() => {
		setApple(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent))
	}, [])
	return (
		<span
			aria-hidden="true"
			className={cn(
				// Only with a real keyboard and room for it: never on phones (narrow or touch).
				'hidden items-center gap-0.5 max-sm:!hidden [@media(pointer:fine)]:[form:has(:is(textarea,input:not([type=checkbox],[type=radio],[type=range],[type=hidden],[type=file],[type=color],[type=submit],[type=button],[aria-hidden=true],[tabindex="-1"])))_&]:inline-flex',
				className,
			)}
		>
			<Kbd className="h-5 min-w-5 border-current/30 bg-transparent px-1 text-[0.6875rem] text-current">
				{apple ? '⌘' : 'Ctrl'}
			</Kbd>
			<Kbd className="h-5 min-w-5 border-current/30 bg-transparent px-1 text-[0.6875rem] text-current">
				↵
			</Kbd>
		</span>
	)
}
