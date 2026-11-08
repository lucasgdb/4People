'use client'

import { Button, CopyButton, cn } from '@4people/ui'
import { Download, Eraser } from 'lucide-react'
import { type FormEvent, type ReactNode, useId } from 'react'
import { downloadText } from '@/lib/format'

/**
 * The work area: two white cards side by side on wide screens (stacked below 1280px), the form
 * first and the result second. Any direct child gets the card look, so custom panels match.
 */
export function ToolLayout({ children, className }: { children: ReactNode; className?: string }) {
	return (
		<div
			className={cn(
				'[&>*]:rounded-panel [&>*]:border-border [&>*]:bg-surface grid items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0 [&>*]:border',
				className,
			)}
		>
			{children}
		</div>
	)
}

/** Numbered step heading ("1 Comece aqui", "2 Resultado"): tells people where to look next. */
function StepTitle({
	step,
	id,
	children,
}: {
	step: number | null
	id?: string
	children: ReactNode
}) {
	return (
		<h2 id={id} className="text-fg flex items-center gap-3 text-lg font-bold">
			{step !== null ? (
				<span
					aria-hidden="true"
					className="bg-primary text-primary-fg grid size-8 shrink-0 place-items-center rounded-full text-[0.9375rem]"
				>
					{step}
				</span>
			) : null}
			{children}
		</h2>
	)
}

/** The form card (step 1). */
/**
 * One column (phones, tablets): after a submit, bring the result card into view when it is below
 * the fold, so "Calcular" visibly does something. Skipped when the submit left an invalid field (the
 * form focuses it instead) or the result is already on screen. Waits two frames for the result to
 * render; honours reduced motion.
 */
function revealResult(form: HTMLFormElement) {
	if (!window.matchMedia('(max-width: 79.99rem)').matches) return
	requestAnimationFrame(() =>
		requestAnimationFrame(() => {
			if (form.querySelector('[aria-invalid="true"]')) return
			const result = form.nextElementSibling
			if (!(result instanceof HTMLElement)) return
			if (result.getBoundingClientRect().top < window.innerHeight * 0.7) return
			const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
			result.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
		}),
	)
}

export function FormCard({
	title = 'Comece aqui',
	onSubmit,
	actions,
	children,
	className,
}: {
	title?: string
	onSubmit: () => void
	actions: ReactNode
	children: ReactNode
	className?: string
}) {
	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		event.stopPropagation()
		const form = event.currentTarget
		onSubmit()
		revealResult(form)
	}

	return (
		<form
			noValidate
			onSubmit={handleSubmit}
			className={cn('flex flex-col gap-6 p-6 sm:p-7', className)}
		>
			<StepTitle step={1}>{title}</StepTitle>
			<div className="flex flex-1 flex-col gap-5">{children}</div>
			<div className="flex flex-wrap items-center gap-3 [&>button[type=submit]]:w-full">
				{actions}
			</div>
		</form>
	)
}

/** The result card (step 2). */
export function ResultCard({
	title = 'Resultado',
	step = 2,
	empty,
	emptyText = 'Preencha os campos e o resultado aparece aqui.',
	copyText,
	downloadName,
	onClear,
	action,
	note,
	children,
	className,
}: {
	title?: string
	/** The step badge; `null` when the result is the only card (nothing comes before it). */
	step?: number | null
	/** Shown at the right of the title, e.g. "Copiar todos". */
	action?: ReactNode
	/** A short notice under the result, such as "use only for tests". */
	note?: ReactNode
	empty?: boolean
	emptyText?: string
	copyText?: string
	downloadName?: string
	onClear?: () => void
	children?: ReactNode
	className?: string
}) {
	const hasActions = !empty && (copyText !== undefined || downloadName || onClear)
	const titleId = useId()

	return (
		<section aria-labelledby={titleId} className={cn('flex flex-col gap-5 p-5 sm:p-7', className)}>
			<div className="flex min-h-11 flex-wrap items-center justify-between gap-3">
				<StepTitle step={step} id={titleId}>
					{title}
				</StepTitle>
				{!empty && action ? action : null}
			</div>
			{/* Only the result itself is live: titles and buttons aren't re-read on every change. */}
			<div aria-live="polite" className="flex flex-1 flex-col">
				{empty ? (
					<p className="rounded-control border-border-strong bg-surface-muted text-fg-muted flex min-h-20 flex-1 items-center justify-center border border-dashed px-5 py-5 text-center text-[0.9375rem] sm:min-h-40 sm:px-6 sm:py-8">
						{emptyText}
					</p>
				) : (
					<div className="flex flex-1 flex-col gap-4">{children}</div>
				)}
			</div>
			{hasActions ? (
				<div className="flex flex-wrap items-center gap-2">
					{copyText !== undefined ? <CopyButton value={copyText} variant="primary" /> : null}
					{downloadName && copyText ? (
						<Button
							variant="secondary"
							size="sm"
							onClick={() => downloadText(downloadName, copyText)}
						>
							<Download /> Salvar .txt
						</Button>
					) : null}
					{onClear ? (
						<Button variant="ghost" size="sm" onClick={onClear} className="ml-auto">
							<Eraser /> Limpar
						</Button>
					) : null}
				</div>
			) : null}
			{note ? (
				<p className="rounded-control bg-warning-soft text-warning-ink px-4 py-3 text-sm leading-relaxed">
					{note}
				</p>
			) : null}
		</section>
	)
}

/**
 * The main result, large on a soft ground. Codes (passwords, binary) take the
 * monospace so look-alike characters read apart; other values stay in the text face.
 */
export function OutputValue({
	children,
	className,
	code = false,
}: {
	children: ReactNode
	className?: string
	code?: boolean
}) {
	return (
		<output
			className={cn(
				'rounded-control bg-surface-muted text-fg tabular block px-5 py-5 text-2xl leading-tight font-bold break-all select-all sm:text-[1.75rem]',
				code && 'font-mono text-xl sm:text-2xl',
				className,
			)}
		>
			{children}
		</output>
	)
}

/** Multi-line code output (meta tags, binary, lists). */
export function OutputBlock({
	children,
	className,
	code = true,
}: {
	children: ReactNode
	className?: string
	code?: boolean
}) {
	return (
		<pre
			// biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable block must be reachable by keyboard to scroll it
			tabIndex={0}
			className={cn(
				'rounded-control bg-surface-muted text-fg focus-visible:ring-ring max-h-[28rem] overflow-auto px-5 py-4 text-[0.9375rem] leading-relaxed break-words whitespace-pre-wrap outline-none focus-visible:ring-4',
				code ? 'font-mono text-[0.875rem]' : 'font-sans',
				className,
			)}
		>
			{children}
		</pre>
	)
}
