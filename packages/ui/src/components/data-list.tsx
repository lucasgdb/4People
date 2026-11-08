import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../lib/cn.ts'

export type DataListItem = { label: ReactNode; value: ReactNode; hint?: ReactNode }

export type DataListProps = ComponentProps<'dl'> & {
	items: ReadonlyArray<DataListItem>
	columns?: 1 | 2 | 3 | 4
}

const columnClass = {
	1: 'grid-cols-1',
	2: 'grid-cols-2',
	3: 'grid-cols-2 sm:grid-cols-3',
	4: 'grid-cols-2 lg:grid-cols-4',
} as const

/**
 * Figures as type, not tiles: one container split by 1px dividers, label above value.
 * An odd count lets the last cell take the full row so no half-row is left empty.
 */
export function DataList({ items, columns = 2, className, ...props }: DataListProps) {
	return (
		<dl
			className={cn(
				'rounded-panel border-border bg-border grid gap-px overflow-hidden border',
				columnClass[columns],
				columns === 2 && items.length % 2 === 1 && '[&>div:last-child]:col-span-full',
				className,
			)}
			{...props}
		>
			{items.map((item, index) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: static, positional list
					key={index}
					className="bg-surface flex min-w-0 flex-col gap-1 px-4 py-3"
				>
					<dt className="text-fg-muted text-[0.8125rem]">{item.label}</dt>
					<dd className="tabular text-fg text-xl leading-tight break-words">{item.value}</dd>
					{item.hint ? <dd className="text-fg-muted text-[0.8125rem]">{item.hint}</dd> : null}
				</div>
			))}
		</dl>
	)
}
