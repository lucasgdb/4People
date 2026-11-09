import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { cn } from '../lib/cn.ts'

type Align = 'left' | 'center' | 'right'
const ALIGN: Record<Align, string> = {
	left: 'text-left',
	center: 'text-center',
	right: 'text-right',
}

/**
 * The card a table lives in. It scrolls on its own (both axes) and is a focusable region, so
 * keyboard users can scroll it (WCAG 2.1.1); `label` names it for screen readers. `toolbar` sits
 * above the table inside the same card (search, filters, counts). `maxHeight` caps tall tables
 * (the header stays visible while the body scrolls).
 */
export function TableCard({
	label,
	toolbar,
	footer,
	maxHeight,
	busy,
	className,
	children,
}: {
	label: string
	toolbar?: ReactNode
	footer?: ReactNode
	maxHeight?: string
	busy?: boolean
	className?: string
	children: ReactNode
}) {
	return (
		<div
			className={cn(
				'rounded-panel border-border bg-surface flex min-w-0 flex-col overflow-hidden border',
				className,
			)}
		>
			{toolbar ? (
				<div className="border-border flex flex-wrap items-center justify-between gap-4 border-b p-4 sm:px-6">
					{toolbar}
				</div>
			) : null}
			<section
				// biome-ignore lint/a11y/noNoninteractiveTabindex: a scroll container must be focusable (WCAG 2.1.1)
				tabIndex={0}
				aria-label={label}
				aria-busy={busy || undefined}
				style={maxHeight ? ({ '--table-max-h': maxHeight } as CSSProperties) : undefined}
				// Never trap the page: a vertical swipe or wheel over the table always reaches the page
				// (only sideways overscroll is contained, so it doesn't trigger "back"). The height cap, an
				// inner vertical scroll, applies from sm up only: on a phone the page itself scrolls the rows.
				// relative: absolutely positioned bits inside (sr-only labels) stay clipped by this scroll area
				// instead of widening the page on narrow screens.
				className={cn(
					'ds-scroll-shadow-x focus-visible:ring-ring relative min-w-0 overflow-auto overscroll-x-contain outline-none focus-visible:ring-4 focus-visible:ring-inset',
					maxHeight && 'sm:max-h-(--table-max-h)',
				)}
			>
				{children}
			</section>
			{footer ? (
				<div className="border-border text-fg-muted border-t p-4 text-sm sm:px-6">{footer}</div>
			) : null}
		</div>
	)
}

export function Table({ className, ...props }: ComponentProps<'table'>) {
	return (
		<table
			className={cn('w-full border-separate border-spacing-0 text-[0.9375rem]', className)}
			{...props}
		/>
	)
}

/** Header row group: stays on top while the body scrolls, on a tinted ground. */
export function TableHeader({ className, ...props }: ComponentProps<'thead'>) {
	return <thead className={cn('bg-surface-muted sticky top-0 z-10', className)} {...props} />
}

export function TableBody(props: ComponentProps<'tbody'>) {
	return <tbody {...props} />
}

/** A body row; hover tints it so the eye can follow a line across wide tables. */
export function TableRow({ className, ...props }: ComponentProps<'tr'>) {
	return (
		<tr
			className={cn(
				'group/row hover:bg-surface-muted/70 transition-colors duration-(--ds-motion-fast)',
				className,
			)}
			{...props}
		/>
	)
}

/** Column header. `numeric` right-aligns and uses tabular figures, like its cells. */
export function TableHead({
	align,
	numeric,
	className,
	scope = 'col',
	...props
}: ComponentProps<'th'> & { align?: Align; numeric?: boolean }) {
	return (
		<th
			scope={scope}
			className={cn(
				'border-border text-fg-muted h-12 border-b px-4 text-xs font-semibold tracking-wide whitespace-nowrap uppercase first:pl-6 last:pr-6',
				ALIGN[align ?? (numeric ? 'right' : 'left')],
				className,
			)}
			{...props}
		/>
	)
}

/** Body cell, with a hairline between rows (none above the first). */
export function TableCell({
	align,
	numeric,
	className,
	...props
}: ComponentProps<'td'> & { align?: Align; numeric?: boolean }) {
	return (
		<td
			className={cn(
				'border-rule border-t p-4 align-middle group-first/row:border-t-0 first:pl-6 last:pr-6',
				ALIGN[align ?? (numeric ? 'right' : 'left')],
				numeric && 'tabular',
				className,
			)}
			{...props}
		/>
	)
}

/** Placeholder rows at the real row height while data loads (no shimmer). */
export function TableSkeleton({ rows = 6, columns }: { rows?: number; columns: number }) {
	return (
		<>
			{Array.from({ length: rows }, (_, row) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: static placeholder rows
				<tr key={row}>
					{Array.from({ length: columns }, (_, column) => (
						<td
							// biome-ignore lint/suspicious/noArrayIndexKey: static placeholder cells
							key={column}
							className="border-rule border-t p-4 first:pl-6 last:pr-6"
						>
							<span
								className={cn(
									'bg-surface-sunken block h-3.5 rounded-full',
									column === 0 ? 'w-10' : column === columns - 1 ? 'ml-auto w-20' : 'w-2/3',
								)}
							/>
						</td>
					))}
				</tr>
			))}
		</>
	)
}

/** A single full-width row for "no results", with an optional action. */
export function TableEmpty({ colSpan, children }: { colSpan: number; children: ReactNode }) {
	return (
		<tr>
			<td colSpan={colSpan} className="text-fg-muted px-6 py-10 text-center text-[0.9375rem]">
				{children}
			</td>
		</tr>
	)
}
