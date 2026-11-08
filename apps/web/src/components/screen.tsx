import { cn } from '@4people/ui'
import { ChevronRight } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { ToolEntry } from '@/catalog/catalog'
import { ToolIcon } from './tool-icons'

export type Crumb = { label: string; href?: string }

/**
 * Title row of an app screen: breadcrumb, then an icon tile beside the h1 (a noun) and one sentence
 * (`children`), with optional tags (`aside`) at the right on wide screens.
 */
export function ScreenHeader({
	crumbs,
	title,
	icon,
	aside,
	children,
}: {
	crumbs: Crumb[]
	title: string
	icon?: ReactNode
	aside?: ReactNode
	children?: ReactNode
}) {
	return (
		<header className="flex flex-col gap-3">
			<nav aria-label="Trilha de navegação">
				<ol className="text-fg-muted flex flex-wrap items-center gap-1 text-sm">
					{crumbs.map((crumb, index) => (
						<li key={crumb.label} className="flex items-center gap-1">
							{index > 0 ? (
								<ChevronRight aria-hidden="true" className="text-fg-subtle size-3.5" />
							) : null}
							{crumb.href ? (
								<Link
									prefetch={false}
									href={crumb.href as Route}
									className="hover:text-fg -my-2 inline-flex items-center rounded-sm py-2 hover:underline hover:underline-offset-4"
								>
									{crumb.label}
								</Link>
							) : (
								<span aria-current="page">{crumb.label}</span>
							)}
						</li>
					))}
				</ol>
			</nav>
			<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
				{/* Phones: a small icon beside the title and the sentence below, full width. From sm up, a
				    large icon tile beside both. */}
				<div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 sm:items-start sm:gap-x-5 sm:gap-y-1.5">
					{icon ? (
						<span
							aria-hidden="true"
							className="bg-accent-soft text-accent grid size-11 shrink-0 place-items-center rounded-[14px] sm:row-span-2 sm:size-16 sm:rounded-[20px] [&_svg]:max-sm:size-6"
						>
							{icon}
						</span>
					) : null}
					<h1
						className={cn(
							'text-fg text-[1.625rem] leading-[1.15] font-extrabold tracking-[-0.025em] text-pretty sm:pt-0.5 sm:text-[2.125rem] sm:text-balance',
							!icon && 'col-span-2',
						)}
					>
						{title}
					</h1>
					{children ? (
						<div className={cn('col-span-2 min-w-0', icon && 'sm:col-span-1 sm:col-start-2')}>
							{children}
						</div>
					) : null}
				</div>
				{aside ? <div className="shrink-0 lg:pt-1">{aside}</div> : null}
			</div>
		</header>
	)
}

/**
 * Tools as a grid of cards: an icon tile, the name and one line about what it does. The whole card
 * is the link, so the target is large on touch screens.
 */
export function ToolTable({
	tools,
	showSection = false,
}: {
	tools: readonly ToolEntry[]
	showSection?: boolean
}) {
	return (
		<ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{tools.map((tool) => (
				<li key={tool.id} className="flex">
					<Link
						prefetch={false}
						href={tool.href as Route}
						className="group border-border bg-surface hover:border-accent/45 hover:ring-accent-soft focus-visible:border-accent focus-visible:ring-ring flex w-full items-start gap-4 rounded-[16px] border p-5 transition-[border-color,box-shadow] duration-(--ds-motion) ease-out outline-none hover:ring-4 focus-visible:ring-4"
					>
						<span
							aria-hidden="true"
							className="bg-accent-soft text-accent group-hover:bg-accent group-hover:text-accent-fg grid size-11 shrink-0 place-items-center rounded-[14px] transition-colors duration-(--ds-motion)"
						>
							<ToolIcon slug={tool.slug} size={22} />
						</span>
						<span className="flex min-w-0 flex-1 flex-col gap-1">
							<span className="text-fg font-bold">{tool.name}</span>
							{showSection ? (
								<span className="text-accent-soft-fg text-[0.8125rem] font-semibold">
									{tool.section.name}
								</span>
							) : null}
							<span className="text-fg-muted text-[0.9375rem] leading-snug">
								{tool.description}
							</span>
						</span>
					</Link>
				</li>
			))}
		</ul>
	)
}
