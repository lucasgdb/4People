'use client'

import { cn, NavigationMenu } from '@4people/ui'
import { ArrowRight, ChevronDown } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CATEGORIES } from '@/catalog/catalog'
import { Icon } from '../icon'

/**
 * "Computação" and "Matemática" in the top bar. A click opens a panel with its topics (Geradores,
 * Validadores…) as columns and the first tools of each topic, with "Ver todas as N" for the rest. While a panel is open, hovering the other
 * item switches to it. The area page (/computacao, /matematica) is the "Ver tudo" link at the top of
 * the panel. Any link closes the panel and navigates.
 */
/**
 * In an area with many topics (Computação) each topic lists its first few tools and links to the
 * rest, so the panel fits on screen. Smaller areas (Matemática) list every tool.
 */
const TOOLS_PER_TOPIC = 5
const LIMIT_FROM_TOPICS = 5
const toolLimit = (topics: number) =>
	topics >= LIMIT_FROM_TOPICS ? TOOLS_PER_TOPIC : Number.POSITIVE_INFINITY

/** Larger than any real hover, so hover alone never changes the menu. */
const HOVER_NEVER = 24 * 60 * 60 * 1000

export function PrimaryNav({ className }: { className?: string }) {
	const pathname = usePathname()
	const [open, setOpen] = useState<string | null>(null)

	// A client-side navigation keeps the header mounted, so close the panel on every route change.
	// biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not a value read inside
	useEffect(() => setOpen(null), [pathname])

	return (
		<NavigationMenu.Root
			aria-label="Ferramentas por área"
			className={className}
			value={open}
			onValueChange={(value, details) => {
				// Hover only switches between panels while one is open. Right after a click closes the
				// menu, Base UI still treats it as open during the closing animation and would open the
				// item under the pointer: with nothing open here, a hover never opens anything.
				if (details.reason === 'trigger-hover' && value && open === null) return
				setOpen(value)
			}}
			// Hover never opens or closes the menu (only a click does): the delays are effectively
			// infinite. Once open, moving to the other item switches panels right away.
			delay={HOVER_NEVER}
			closeDelay={HOVER_NEVER}
		>
			<NavigationMenu.List className="flex items-center gap-1">
				{CATEGORIES.map((category) => {
					const base = `/${category.slug}`
					const active = pathname === base || pathname.startsWith(`${base}/`)
					return (
						<NavigationMenu.Item key={category.slug} value={category.slug}>
							<NavigationMenu.Trigger
								onClick={(event) => {
									// A click on the open item always closes it, even right after hover switched to it
									// (Base UI would keep a panel opened by hover open on that click).
									if (open !== category.slug) return
									event.preventBaseUIHandler()
									setOpen(null)
								}}
								className={cn(
									'group focus-visible:ring-ring data-popup-open:bg-surface-sunken flex h-10 items-center gap-1.5 rounded-full px-4 text-[0.9375rem] transition-colors outline-none focus-visible:ring-4',
									active
										? 'bg-accent-soft text-accent-soft-fg font-semibold'
										: 'text-fg-muted hover:bg-surface-sunken hover:text-fg font-medium',
								)}
							>
								{category.name}
								<NavigationMenu.Icon className="transition-transform duration-(--ds-motion) group-data-popup-open:rotate-180">
									<ChevronDown aria-hidden="true" className="size-4" />
								</NavigationMenu.Icon>
							</NavigationMenu.Trigger>
							<NavigationMenu.Content className="max-h-[calc(100dvh-6rem)] w-max max-w-[calc(100vw-3rem)] overflow-y-auto overscroll-contain px-6 py-5">
								<p className="text-fg-muted mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem]">
									{category.description}
									<NavigationMenu.Link
										closeOnClick
										render={<Link prefetch={false} href={base as Route} />}
										className="text-accent-soft-fg focus-visible:ring-ring -my-1 inline-flex items-center gap-1 rounded-full px-1.5 py-1 font-semibold outline-none hover:underline focus-visible:ring-4"
									>
										Ver tudo em {category.name}
										<ArrowRight aria-hidden="true" className="size-3.5" />
									</NavigationMenu.Link>
								</p>
								{/* As wide as its topics (up to 4 columns), so a short area doesn't leave an empty band. */}
								<div
									className="grid gap-x-6 gap-y-5"
									style={{
										gridTemplateColumns: `repeat(${Math.min(category.sections.length, 4)}, minmax(0, 15rem))`,
									}}
								>
									{category.sections.map((section) => {
										const sectionHref = `${base}/${section.slug}`
										return (
											<div key={section.slug} className="flex flex-col gap-1">
												<NavigationMenu.Link
													closeOnClick
													render={<Link prefetch={false} href={sectionHref as Route} />}
													className="text-fg focus-visible:ring-ring hover:bg-surface-sunken -mx-2 flex items-center gap-2 rounded-[10px] px-2 py-1.5 text-[0.9375rem] font-bold outline-none focus-visible:ring-4"
												>
													<span
														aria-hidden="true"
														className="bg-accent-soft text-accent grid size-7 place-items-center rounded-[8px]"
													>
														<Icon name={section.icon} className="size-4" />
													</span>
													{section.name}
												</NavigationMenu.Link>
												<ul className="flex flex-col">
													{section.tools
														.slice(0, toolLimit(category.sections.length))
														.map((tool) => {
															const href = `${sectionHref}/${tool.slug}`
															return (
																<li key={tool.slug}>
																	<NavigationMenu.Link
																		closeOnClick
																		render={<Link prefetch={false} href={href as Route} />}
																		aria-current={pathname === href ? 'page' : undefined}
																		className="text-fg-muted hover:bg-surface-sunken hover:text-fg focus-visible:ring-ring aria-[current=page]:text-accent-soft-fg -mx-2 block rounded-[10px] px-2 py-1 text-sm outline-none focus-visible:ring-4 aria-[current=page]:font-semibold"
																	>
																		{tool.name}
																	</NavigationMenu.Link>
																</li>
															)
														})}
													{section.tools.length > toolLimit(category.sections.length) ? (
														<li>
															<NavigationMenu.Link
																closeOnClick
																render={<Link prefetch={false} href={sectionHref as Route} />}
																className="text-accent-soft-fg focus-visible:ring-ring -mx-2 inline-flex items-center gap-1 rounded-[10px] px-2 py-1 text-sm font-semibold outline-none hover:underline focus-visible:ring-4"
															>
																Ver todas as {section.tools.length}
																<span className="sr-only"> de {section.name}</span>
																<ArrowRight aria-hidden="true" className="size-3.5" />
															</NavigationMenu.Link>
														</li>
													) : null}
												</ul>
											</div>
										)
									})}
								</div>
							</NavigationMenu.Content>
						</NavigationMenu.Item>
					)
				})}
			</NavigationMenu.List>
			<NavigationMenu.Portal>
				<NavigationMenu.Positioner
					sideOffset={10}
					collisionPadding={16}
					className="z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-(--ds-motion) ease-out data-instant:transition-none"
				>
					<NavigationMenu.Popup className="rounded-panel border-border bg-surface shadow-float relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) overflow-hidden border transition-[opacity,scale,width,height] duration-(--ds-motion) ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
						{/* Scrolling lives in each panel (Content), not here: while the popup animates between sizes the
						    viewport is briefly smaller than the incoming panel and would flash a scrollbar. */}
						<NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
					</NavigationMenu.Popup>
				</NavigationMenu.Positioner>
			</NavigationMenu.Portal>
		</NavigationMenu.Root>
	)
}
