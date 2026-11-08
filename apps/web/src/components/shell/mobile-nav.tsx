'use client'

import { Button, Sheet, SheetContent, SheetTrigger } from '@4people/ui'
import { Menu, Search } from 'lucide-react'
import type { Route } from 'next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { TOOLS } from '@/catalog/catalog'
import { SidebarNav } from './sidebar-nav'
import { toolMatches } from './tool-search'

/** Every tool in a sheet, opened from the menu icon on phones and tablets (below 1024px). */
export function AllToolsMenu() {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState('')
	const router = useRouter()
	const count = query.trim() ? TOOLS.filter((tool) => toolMatches(tool.id, query)).length : 0

	return (
		<Sheet
			open={open}
			onOpenChange={(next) => {
				setOpen(next)
				if (!next) setQuery('')
			}}
		>
			<SheetTrigger
				render={
					<Button
						variant="ghost"
						size="icon"
						aria-label="Abrir menu de ferramentas"
						className="-ml-2"
					/>
				}
			>
				<Menu />
			</SheetTrigger>
			<SheetContent title="Ferramentas">
				{/* pt-1: room for the 4px focus ring inside the sheet's scroll area, which clips overflow. */}
				<div className="px-4 pt-1 pb-3">
					{/* The list below is the result: typing filters it in place, no dropdown. Enter opens the
					    first match. */}
					<div className="relative">
						<Search
							aria-hidden="true"
							className="text-fg-muted pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
						/>
						<input
							type="search"
							name="filtro"
							aria-label="Filtrar ferramentas"
							aria-controls="menu-ferramentas"
							enterKeyHint="go"
							spellCheck={false}
							autoComplete="off"
							placeholder="Filtrar: CPF, CEP, JSON…"
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							onKeyDown={(event) => {
								if (event.key !== 'Enter' || !query.trim()) return
								const first = TOOLS.find((tool) => toolMatches(tool.id, query))
								if (!first) return
								event.preventDefault()
								setOpen(false)
								router.push(first.href as Route)
							}}
							className="border-border-strong bg-surface-muted text-fg placeholder:text-fg-subtle hover:border-fg-subtle focus-visible:border-accent focus-visible:bg-surface focus-visible:ring-ring h-11 w-full rounded-full border pr-4 pl-10 text-base transition-[border-color,box-shadow] outline-none focus-visible:ring-4"
						/>
					</div>
				</div>
				<p role="status" className="sr-only">
					{query.trim() ? `${count} ${count === 1 ? 'ferramenta' : 'ferramentas'}` : ''}
				</p>
				<div id="menu-ferramentas">
					<SidebarNav query={query} onNavigate={() => setOpen(false)} />
				</div>
			</SheetContent>
		</Sheet>
	)
}
