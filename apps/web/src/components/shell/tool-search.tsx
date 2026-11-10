'use client'

import { Autocomplete, cn, Dialog, Kbd } from '@4people/ui'
import { CornerDownLeft, Search, Star } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { CATEGORIES, POPULAR_TOOLS, TOOLS, type ToolEntry } from '@/catalog/catalog'
import { Icon, type IconName } from '@/components/icon'
import { ToolIcon } from '../tool-icons'

/** Case- and accent-insensitive, so "calculo" finds "Cálculo" and "imc" finds "Índice…". */
const normalize = (value: string) =>
	value
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()

const ALIASES: Record<string, string> = {
	bmi: 'imc',
	gcd: 'mdc',
	lcm: 'mmc',
	'gerador-de-nomes': 'faker',
	'gerador-de-senha': 'password',
}

const haystack = new Map(
	TOOLS.map((tool) => [
		tool.id,
		normalize(`${tool.name} ${tool.section.name} ${tool.description} ${ALIASES[tool.slug] ?? ''}`),
	]),
)

/** Whether the tool with this id (`area/topic/slug`) matches every word of the query. */
function toolMatches(id: string, query: string) {
	const terms = normalize(query).split(/\s+/).filter(Boolean)
	const text = haystack.get(id as ToolEntry['id']) ?? ''
	return terms.every((term) => text.includes(term))
}

/** A row of the palette. A tool can sit in two groups (Mais usadas and its topic), hence the key. */
type PaletteItem = { key: string; tool: ToolEntry }
type PaletteGroup = {
	value: string
	label: string
	/** The area the topic belongs to, beside its name ("Computação"). */
	area?: string
	icon?: IconName
	items: PaletteItem[]
}

const POPULAR_GROUP: PaletteGroup = {
	value: 'populares',
	label: 'Mais usadas',
	items: POPULAR_TOOLS.slice(0, 6).map((tool) => ({ key: `popular:${tool.id}`, tool })),
}

/** Every tool, grouped by topic in the catalog's order. */
const TOPIC_GROUPS: PaletteGroup[] = CATEGORIES.flatMap((category) =>
	category.sections.map((section) => ({
		value: `${category.slug}/${section.slug}`,
		label: section.name,
		area: category.name,
		icon: section.icon,
		items: TOOLS.filter(
			(tool) => tool.category.slug === category.slug && tool.section.slug === section.slug,
		).map((tool) => ({ key: tool.id, tool })),
	})),
)

const BROWSE_GROUPS = [POPULAR_GROUP, ...TOPIC_GROUPS]

/**
 * The search, Spotlight style: a field-like button in the header (an icon on phones) opens a panel
 * in the middle of the screen with the input focused and every tool grouped by topic, the most used
 * first. Typing filters the groups; arrows move, Enter opens, Esc closes. "/" or Ctrl/Cmd+K opens
 * it from anywhere.
 */
export function ToolSearch({ className }: { className?: string }) {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)
	const browsing = query.trim() === ''

	// "/" or Ctrl/Cmd+K opens the search from anywhere, unless the user is typing in a field.
	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			const target = event.target as HTMLElement
			const typing = target.isContentEditable || /^(input|textarea|select)$/i.test(target.tagName)
			// A page that reads every key (Eventos de teclado) keeps "/" for itself.
			const pageReadsKeys = document.querySelector('[data-captures-keys]') !== null
			if (
				(event.key === '/' && !typing && !pageReadsKeys) ||
				(event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey))
			) {
				event.preventDefault()
				setOpen(true)
			}
		}
		window.addEventListener('keydown', onKeyDown)
		return () => window.removeEventListener('keydown', onKeyDown)
	}, [])

	function changeOpen(next: boolean) {
		setOpen(next)
		if (!next) setQuery('')
	}

	return (
		<Dialog.Root open={open} onOpenChange={changeOpen}>
			<div className={cn('flex', className)}>
				{/* From md up: looks like the field it opens. */}
				<Dialog.Trigger className="border-border-strong bg-surface-muted text-fg-subtle hover:border-accent/55 hover:ring-accent/10 focus-visible:border-accent focus-visible:ring-ring hidden h-12 w-full cursor-pointer items-center gap-2 rounded-full border pr-4 pl-4 text-left text-[0.9375rem] transition-[border-color,box-shadow] duration-(--ds-motion) ease-(--ease-out) outline-none hover:ring-[3px] focus-visible:ring-4 md:flex">
					<Search aria-hidden="true" className="text-fg-muted size-4 shrink-0" />
					<span className="flex-1 truncate">O que você precisa? Ex.: CPF, CEP…</span>
					<Kbd aria-hidden="true">/</Kbd>
				</Dialog.Trigger>
				{/* Phones and small tablets: an icon beside the GitHub link. */}
				<Dialog.Trigger
					aria-label="Buscar ferramenta"
					className="text-fg-muted hover:bg-surface-sunken hover:text-fg focus-visible:ring-ring grid size-12 cursor-pointer place-items-center rounded-full transition-colors duration-(--ds-motion-fast) outline-none focus-visible:ring-4 md:hidden"
				>
					<Search aria-hidden="true" className="size-5" />
				</Dialog.Trigger>
			</div>
			<Dialog.Portal>
				<Dialog.Backdrop className="bg-fg/25 fixed inset-0 z-50 backdrop-blur-[3px] transition-opacity duration-(--ds-motion) data-ending-style:opacity-0 data-starting-style:opacity-0" />
				<Dialog.Popup
					initialFocus={inputRef}
					className="bg-surface/95 border-border shadow-float rounded-panel fixed top-[max(1rem,12dvh)] left-1/2 z-50 flex max-h-[min(36rem,calc(100dvh-2rem))] w-[min(40rem,calc(100vw-2rem))] -translate-x-1/2 flex-col overflow-hidden border backdrop-blur-xl backdrop-saturate-150 transition-[scale,opacity,translate] duration-(--ds-motion) ease-(--ease-out) outline-none data-ending-style:-translate-y-1 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:-translate-y-1 data-starting-style:scale-[0.98] data-starting-style:opacity-0"
				>
					<Dialog.Title className="sr-only">Buscar ferramenta</Dialog.Title>
					<Autocomplete.Root
						inline
						open
						items={browsing ? BROWSE_GROUPS : TOPIC_GROUPS}
						value={query}
						onValueChange={setQuery}
						itemToStringValue={(item: PaletteItem) => item.tool.name}
						filter={(item: PaletteItem, text: string) =>
							text.trim() === '' || toolMatches(item.tool.id, text)
						}
						autoHighlight="always"
					>
						<div className="border-border flex items-center gap-4 border-b px-6">
							<Search aria-hidden="true" className="text-accent size-5 shrink-0" />
							<Autocomplete.Input
								ref={inputRef}
								aria-label="Buscar ferramenta"
								name="busca"
								type="search"
								enterKeyHint="go"
								spellCheck={false}
								autoComplete="off"
								placeholder="Buscar: CPF, CEP, JSON…"
								className="text-fg placeholder:text-fg-subtle h-16 min-w-0 flex-1 bg-transparent text-lg outline-none [&::-webkit-search-cancel-button]:hidden"
							/>
							<Dialog.Close
								aria-label="Fechar busca"
								className="focus-visible:ring-ring hidden cursor-pointer rounded-lg outline-none focus-visible:ring-4 sm:block"
							>
								<Kbd aria-hidden="true">esc</Kbd>
							</Dialog.Close>
						</div>
						<Autocomplete.List className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pt-1 pb-2 outline-none">
							{(group: PaletteGroup) => (
								<Autocomplete.Group
									key={group.value}
									items={group.items}
									className="flex flex-col not-first:mt-2"
								>
									{/* A quiet divider, not a sticky bar: nothing covers the rows while the arrows scroll. */}
									<Autocomplete.GroupLabel className="flex items-center gap-2 px-4 pt-4 pb-2">
										<span
											aria-hidden="true"
											className="bg-accent-soft text-accent grid size-5 shrink-0 place-items-center rounded-lg"
										>
											{group.icon ? (
												<Icon name={group.icon} className="size-3" />
											) : (
												<Star className="size-3" />
											)}
										</span>
										<span className="text-fg-muted text-[0.6875rem] font-bold tracking-[0.08em] uppercase">
											{group.label}
										</span>
										{group.area ? (
											<span className="text-fg-subtle text-xs">{group.area}</span>
										) : null}
										<span aria-hidden="true" className="bg-rule ml-1 h-px flex-1" />
									</Autocomplete.GroupLabel>
									<Autocomplete.Collection>
										{(item: PaletteItem, index: number) => (
											<Autocomplete.Item
												key={item.key}
												value={item}
												onClick={() => changeOpen(false)}
												render={<Link prefetch={false} href={item.tool.href as Route} />}
												className={cn(
													'group/item rounded-control data-highlighted:bg-accent-soft flex cursor-pointer items-center gap-4 px-4 py-2 outline-none select-none',
													// Scrolling up to a group's first row brings its title into view too.
													index === 0 && 'scroll-mt-10',
												)}
											>
												<span
													aria-hidden="true"
													className="bg-accent-soft text-accent group-data-highlighted/item:bg-accent group-data-highlighted/item:text-accent-fg rounded-chip grid size-10 shrink-0 place-items-center transition-colors duration-(--ds-motion-fast)"
												>
													<ToolIcon slug={item.tool.slug} size={18} />
												</span>
												<span className="flex min-w-0 flex-1 flex-col">
													<span className="text-fg truncate text-[0.9375rem] font-medium">
														{item.tool.name}
													</span>
													<span className="text-fg-muted truncate text-[0.8125rem]">
														{item.tool.description}
													</span>
												</span>
												<CornerDownLeft
													aria-hidden="true"
													className="text-accent-soft-fg hidden size-4 shrink-0 group-data-highlighted/item:block"
												/>
											</Autocomplete.Item>
										)}
									</Autocomplete.Collection>
								</Autocomplete.Group>
							)}
						</Autocomplete.List>
						<Autocomplete.Empty className="text-fg-muted px-6 py-10 text-center empty:hidden">
							{browsing ? null : `Nenhuma ferramenta para “${query.trim()}”.`}
						</Autocomplete.Empty>
					</Autocomplete.Root>
					<div className="border-border text-fg-subtle flex items-center gap-4 border-t px-6 py-2 text-xs pointer-coarse:hidden">
						<span className="flex items-center gap-2">
							<Kbd>↑</Kbd>
							<Kbd>↓</Kbd> navegar
						</span>
						<span className="flex items-center gap-2">
							<Kbd>↵</Kbd> abrir
						</span>
						<span className="flex items-center gap-2">
							<Kbd>esc</Kbd> fechar
						</span>
						<span className="ml-auto">{TOOLS.length} ferramentas</span>
					</div>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
