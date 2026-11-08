'use client'

import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn.ts'

export type AccordionItem = { id: string; title: ReactNode; content: ReactNode }

export type AccordionProps = {
	items: readonly AccordionItem[]
	/** Ids open at first. Default: the first item. */
	defaultOpen?: readonly string[]
	/** More than one item open at a time. Default: one (opening another closes the open one). */
	multiple?: boolean
	className?: string
}

/** Panel and chevron share the DS motion token, so the height and the turn end together. */
const MOTION = 'duration-(--ds-motion) ease-(--ease-out) motion-reduce:transition-none'

/**
 * Questions and answers, sections that fold — Base UI Accordion: a heading with a button
 * (`aria-expanded`, arrow keys between items). The panel animates its height through Base UI's
 * `--accordion-panel-height` and the chevron turns with it. Closed panels use
 * `hidden="until-found"`: the answers stay in the HTML, and the browser's find (Ctrl+F) opens them.
 */
export function Accordion({ items, defaultOpen, multiple = false, className }: AccordionProps) {
	return (
		<BaseAccordion.Root
			defaultValue={[...(defaultOpen ?? (items[0] ? [items[0].id] : []))]}
			multiple={multiple}
			hiddenUntilFound
			className={cn('divide-border flex flex-col divide-y', className)}
		>
			{items.map((item) => (
				<BaseAccordion.Item key={item.id} value={item.id}>
					<BaseAccordion.Header className="text-base leading-snug">
						<BaseAccordion.Trigger className="group text-fg hover:text-accent-soft-fg focus-visible:ring-ring flex w-full cursor-pointer items-start justify-between gap-4 rounded-sm py-4 text-left font-semibold outline-none focus-visible:ring-4">
							{item.title}
							<svg
								aria-hidden="true"
								viewBox="0 0 20 20"
								fill="none"
								className={cn(
									'text-fg-subtle mt-0.5 size-5 shrink-0 transition-transform group-data-panel-open:rotate-180',
									MOTION,
								)}
							>
								<path
									d="m5 7.5 5 5 5-5"
									stroke="currentColor"
									strokeWidth="1.75"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</BaseAccordion.Trigger>
					</BaseAccordion.Header>
					<BaseAccordion.Panel
						className={cn(
							'h-(--accordion-panel-height) overflow-hidden transition-[height,opacity] data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0',
							MOTION,
						)}
					>
						<div className="text-fg-muted pr-9 pb-4 leading-7 text-pretty">{item.content}</div>
					</BaseAccordion.Panel>
				</BaseAccordion.Item>
			))}
		</BaseAccordion.Root>
	)
}
