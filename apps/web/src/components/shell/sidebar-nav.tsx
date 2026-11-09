'use client'

import { cn } from '@4people/ui'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORIES } from '@/catalog/catalog'
import { Icon } from '../icon'
import { ToolIcon } from '../tool-icons'
import { toolMatches } from './tool-search'

const rowClass =
	'flex min-h-10 items-center gap-2 rounded-control px-4 text-[0.9375rem] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring'

/**
 * Every tool, grouped by category and section: 40px rows, a soft blue fill on the active item.
 * With a `query`, only the matching tools stay (and the sections and areas that still have some).
 */
export function SidebarNav({
	onNavigate,
	query = '',
}: {
	onNavigate?: () => void
	query?: string
}) {
	const pathname = usePathname()
	const filtering = query.trim() !== ''
	const categories = CATEGORIES.map((category) => ({
		...category,
		sections: category.sections
			.map((section) => ({
				...section,
				tools: filtering
					? section.tools.filter((tool) =>
							toolMatches(`${category.slug}/${section.slug}/${tool.slug}`, query),
						)
					: section.tools,
			}))
			.filter((section) => section.tools.length > 0),
	})).filter((category) => category.sections.length > 0)

	if (categories.length === 0) {
		return (
			<p className="text-fg-muted px-8 py-6 text-[0.9375rem]">
				Nenhuma ferramenta encontrada para “{query.trim()}”.
			</p>
		)
	}

	return (
		<nav aria-label="Ferramentas" className="flex flex-col gap-6 px-4 pt-2 pb-8">
			{categories.map((category) => {
				const categoryHref = `/${category.slug}`
				return (
					<div key={category.slug} className="flex flex-col gap-1">
						<Link
							prefetch={false}
							href={categoryHref as Route}
							onClick={onNavigate}
							aria-current={pathname === categoryHref ? 'page' : undefined}
							className={cn(
								rowClass,
								'text-fg font-semibold',
								pathname === categoryHref ? 'bg-accent-soft' : 'hover:bg-surface-sunken',
							)}
						>
							<Icon name={category.icon} className="text-fg-muted size-4" />
							{category.name}
						</Link>
						{category.sections.map((section) => {
							const sectionHref = `${categoryHref}/${section.slug}`
							return (
								<div key={section.slug} className="mt-4 flex flex-col gap-1">
									<Link
										prefetch={false}
										href={sectionHref as Route}
										onClick={onNavigate}
										aria-current={pathname === sectionHref ? 'page' : undefined}
										// Sticky while its tools scroll by, on the sheet's own background, so the
										// list always says which topic it is in.
										className={cn(
											'bg-bg rounded-control hover:text-fg focus-visible:ring-ring sticky top-0 z-10 px-4 py-2 text-[0.8125rem] font-semibold tracking-wide uppercase outline-none focus-visible:ring-2 focus-visible:ring-inset',
											pathname === sectionHref ? 'text-fg font-semibold' : 'text-fg-muted',
										)}
									>
										{section.name}
									</Link>
									<ul className="flex flex-col gap-1">
										{section.tools.map((tool) => {
											const href = `${sectionHref}/${tool.slug}`
											const active = pathname === href
											return (
												<li key={tool.slug}>
													<Link
														prefetch={false}
														href={href as Route}
														onClick={onNavigate}
														aria-current={active ? 'page' : undefined}
														className={cn(
															rowClass,
															active
																? 'bg-accent-soft text-accent-soft-fg font-semibold'
																: 'text-fg-muted hover:bg-surface-sunken hover:text-fg',
														)}
													>
														<ToolIcon
															slug={tool.slug}
															size={16}
															className={active ? 'text-accent' : 'text-fg-muted'}
														/>
														<span className="truncate" title={tool.name}>
															{tool.name}
														</span>
													</Link>
												</li>
											)
										})}
									</ul>
								</div>
							)
						})}
					</div>
				)
			})}
		</nav>
	)
}
