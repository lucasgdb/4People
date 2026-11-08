'use client'

import { CopyButton, cn } from '@4people/ui'

export type CopyRow = { label: string; value: string }

/**
 * Several results of one input (hashes, cases, formats), each with its own copy button. A plain list
 * (not a <dl>): each row holds a label, a value and a control, which a description list can't contain.
 */
export function CopyRows({ rows, code = false }: { rows: readonly CopyRow[]; code?: boolean }) {
	return (
		<ul className="flex flex-col gap-2">
			{rows.map((row) => (
				<li
					key={row.label}
					className="rounded-control bg-surface-muted flex items-center gap-3 py-2.5 pr-2.5 pl-4 sm:pl-5"
				>
					<div className="flex min-w-0 flex-1 flex-col gap-0.5">
						<span className="text-fg-muted text-[0.8125rem]">{row.label}</span>
						<span
							className={cn(
								'text-fg [overflow-wrap:anywhere] select-all',
								code ? 'font-mono text-[0.9375rem]' : 'text-base font-semibold',
							)}
						>
							{row.value || <span className="text-fg-subtle">—</span>}
						</span>
					</div>
					<CopyButton
						value={row.value}
						variant="primary"
						label="Copiar"
						iconOnly="mobile"
						aria-label={`Copiar ${row.label}`}
					/>
				</li>
			))}
		</ul>
	)
}
