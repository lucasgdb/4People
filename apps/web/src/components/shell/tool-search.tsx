'use client'

import { Autocomplete, cn, Kbd } from '@4people/ui'
import { Search } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { POPULAR_TOOLS, TOOLS, type ToolEntry } from '@/catalog/catalog'
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

/** Shown as soon as the search opens, before anything is typed. */
const SUGGESTED = POPULAR_TOOLS.slice(0, 8)

/** Whether the tool with this id (`area/topic/slug`) matches every word of the query. */
export function toolMatches(id: string, query: string) {
	const terms = normalize(query).split(/\s+/).filter(Boolean)
	const text = haystack.get(id as ToolEntry['id']) ?? ''
	return terms.every((term) => text.includes(term))
}

function matches(tool: ToolEntry, query: string) {
	const terms = normalize(query).split(/\s+/).filter(Boolean)
	const text = haystack.get(tool.id) ?? ''
	return terms.every((term) => text.includes(term))
}

export function ToolSearch({
	className,
	suggestions = true,
}: {
	className?: string
	/** Show the most used tools as soon as the field is clicked (off in the menu, which lists them all). */
	suggestions?: boolean
}) {
	const inputRef = useRef<HTMLInputElement>(null)
	const [query, setQuery] = useState('')
	const browsing = query.trim() === ''
	const showSuggestions = suggestions && browsing

	// "/" or Ctrl/Cmd+K focuses the search from anywhere, unless the user is typing in a field.
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
				inputRef.current?.focus()
			}
		}
		window.addEventListener('keydown', onKeyDown)
		return () => window.removeEventListener('keydown', onKeyDown)
	}, [])

	return (
		<Autocomplete.Root
			items={browsing ? (suggestions ? SUGGESTED : []) : TOOLS}
			value={query}
			onValueChange={setQuery}
			itemToStringValue={(tool: ToolEntry) => tool.name}
			filter={(tool: ToolEntry, text: string) => text.trim() === '' || matches(tool, text)}
			limit={8}
			openOnInputClick={suggestions}
			autoHighlight
		>
			<div className={cn('relative', className)}>
				<Search
					aria-hidden="true"
					className="text-fg-muted pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
				/>
				<Autocomplete.Input
					ref={inputRef}
					aria-label="Buscar ferramenta"
					name="busca"
					type="search"
					enterKeyHint="go"
					spellCheck={false}
					autoComplete="off"
					placeholder="O que você precisa? Ex.: CPF, CEP…"
					className="border-border-strong bg-surface-muted text-fg placeholder:text-fg-subtle hover:border-accent/55 hover:ring-accent/10 focus-visible:border-accent focus-visible:bg-surface focus-visible:ring-ring h-11 w-full rounded-full border pr-11 pl-10 text-[0.9375rem] transition-[border-color,box-shadow,background-color] duration-(--ds-motion) ease-(--ease-out) outline-none hover:ring-[3px] focus-visible:ring-4 focus-visible:outline-none"
				/>
				<Kbd className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 sm:inline-flex">
					/
				</Kbd>
			</div>
			<Autocomplete.Portal>
				<Autocomplete.Positioner className="z-50 outline-none" sideOffset={6}>
					<Autocomplete.Popup className="rounded-panel border-border bg-surface text-fg shadow-float w-(--anchor-width) max-w-(--available-width) min-w-[min(22rem,var(--available-width))] origin-(--transform-origin) border p-1.5 transition-[scale,opacity] duration-(--ds-motion-fast) outline-none data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
						<Autocomplete.Empty className="text-fg-muted px-3 py-3 text-sm empty:hidden">
							{browsing ? null : 'Nenhuma ferramenta encontrada.'}
						</Autocomplete.Empty>
						{showSuggestions ? (
							<p className="text-fg-subtle px-3 pt-1.5 pb-1 text-xs font-medium tracking-wide uppercase">
								Mais usadas
							</p>
						) : null}
						<Autocomplete.List className="max-h-[min(26rem,var(--available-height))] overflow-y-auto overscroll-contain outline-none">
							{(tool: ToolEntry) => (
								<Autocomplete.Item
									key={tool.id}
									value={tool}
									render={<Link prefetch={false} href={tool.href as Route} />}
									className="rounded-control data-highlighted:bg-accent-soft flex cursor-pointer items-center gap-3 px-3 py-2.5 outline-none select-none"
								>
									<span
										aria-hidden="true"
										className="bg-accent-soft text-accent grid size-9 shrink-0 place-items-center rounded-[10px]"
									>
										<ToolIcon slug={tool.slug} size={18} />
									</span>
									<span className="flex min-w-0 flex-col">
										<span className="truncate text-sm font-medium">{tool.name}</span>
										<span className="text-fg-muted truncate text-[0.8125rem]">
											{tool.section.name}
										</span>
									</span>
								</Autocomplete.Item>
							)}
						</Autocomplete.List>
					</Autocomplete.Popup>
				</Autocomplete.Positioner>
			</Autocomplete.Portal>
		</Autocomplete.Root>
	)
}
