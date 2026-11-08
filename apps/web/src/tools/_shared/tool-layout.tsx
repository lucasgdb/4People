'use client'

import { Button, CopyButton, cn } from '@4people/ui'
import { Download, Eraser } from 'lucide-react'
import { type FormEvent, type ReactNode, useId } from 'react'
import { downloadText } from '@/lib/format'

/** Matches the `xl` breakpoint, where the form and the result stop being side by side. */
const SINGLE_COLUMN_QUERY = '(max-width: 79.99rem)'

type ToolLayoutProps = {
	children: ReactNode
	className?: string
	/**
	 * Below xl, show the second card (the result) before the form: generators already have a result
	 * when the page opens, and on a phone it would otherwise sit below the fold.
	 */
	resultFirst?: boolean
}

/** Two cards side by side on wide screens, stacked below. Every direct child gets the card style. */
export function ToolLayout({ children, className, resultFirst = false }: ToolLayoutProps) {
	return (
		<div
			className={cn(
				'[&>*]:rounded-panel [&>*]:border-border [&>*]:bg-surface grid items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0 [&>*]:border',
				resultFirst && 'max-xl:[&>*:nth-child(2)]:order-first',
				className,
			)}
		>
			{children}
		</div>
	)
}

type StepTitleProps = {
	step: number | null
	id?: string
	children: ReactNode
}

function StepTitle({ step, id, children }: StepTitleProps) {
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

function prefersReducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * On a single column, scrolls the result card into view after a submit, unless the submit left an
 * invalid field (that field gets focus instead) or the result is already visible. Waits two frames
 * so the new result has rendered.
 */
function scrollToResult(form: HTMLFormElement) {
	if (!window.matchMedia(SINGLE_COLUMN_QUERY).matches) return

	requestAnimationFrame(() =>
		requestAnimationFrame(() => {
			if (form.querySelector('[aria-invalid="true"]')) return

			const resultCard = form.nextElementSibling
			if (!(resultCard instanceof HTMLElement)) return

			const alreadyVisible = resultCard.getBoundingClientRect().top < window.innerHeight * 0.7
			if (alreadyVisible) return

			resultCard.scrollIntoView({
				behavior: prefersReducedMotion() ? 'auto' : 'smooth',
				block: 'start',
			})
		}),
	)
}

type FormCardProps = {
	title?: string
	onSubmit: () => void
	actions: ReactNode
	children: ReactNode
	className?: string
}

export function FormCard({
	title = 'Comece aqui',
	onSubmit,
	actions,
	children,
	className,
}: FormCardProps) {
	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		event.stopPropagation()
		onSubmit()
		scrollToResult(event.currentTarget)
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

type ResultCardProps = {
	title?: string
	/** `null` when the result is the only card on the page. */
	step?: number | null
	/** Shown next to the title, e.g. "Copiar todos". */
	action?: ReactNode
	/** Short notice below the result, e.g. "use only for tests". */
	note?: ReactNode
	empty?: boolean
	emptyText?: string
	copyText?: string
	downloadName?: string
	onClear?: () => void
	children?: ReactNode
	className?: string
}

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
}: ResultCardProps) {
	const titleId = useId()
	const canCopy = copyText !== undefined
	const canDownload = Boolean(downloadName && copyText)
	const showActions = !empty && (canCopy || canDownload || onClear)

	return (
		<section aria-labelledby={titleId} className={cn('flex flex-col gap-5 p-5 sm:p-7', className)}>
			<div className="flex min-h-11 flex-wrap items-center justify-between gap-3">
				<StepTitle step={step} id={titleId}>
					{title}
				</StepTitle>
				{!empty && action ? action : null}
			</div>

			{/* Only the result is live, so titles and buttons aren't re-announced on every change. */}
			<div aria-live="polite" className="flex flex-1 flex-col">
				{empty ? (
					<p className="rounded-control border-border-strong bg-surface-muted text-fg-muted flex min-h-20 flex-1 items-center justify-center border border-dashed px-5 py-5 text-center text-[0.9375rem] sm:min-h-40 sm:px-6 sm:py-8">
						{emptyText}
					</p>
				) : (
					<div className="flex flex-1 flex-col gap-4">{children}</div>
				)}
			</div>

			{showActions ? (
				<div className="flex flex-wrap items-center gap-2">
					{canCopy ? <CopyButton value={copyText} variant="primary" /> : null}
					{canDownload && downloadName && copyText ? (
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

type OutputProps = {
	children: ReactNode
	className?: string
	/** Monospace, so look-alike characters (l/1, O/0) read apart. */
	code?: boolean
}

/** The main result, large on a soft background. */
export function OutputValue({ children, className, code = false }: OutputProps) {
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

/** Multi-line output (code, lists, generated text). */
export function OutputBlock({ children, className, code = true }: OutputProps) {
	return (
		<pre
			// biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable block must be reachable by keyboard
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
