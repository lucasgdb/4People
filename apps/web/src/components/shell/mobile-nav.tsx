'use client'

import { Button, Sheet, SheetContent, SheetTrigger } from '@4people/ui'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { SidebarNav } from './sidebar-nav'
import { ToolSearch } from './tool-search'

/** Every tool in a sheet, opened from the menu icon on phones and tablets (below 1024px). */
export function AllToolsMenu() {
	const [open, setOpen] = useState(false)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
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
					<ToolSearch suggestions={false} />
				</div>
				<SidebarNav onNavigate={() => setOpen(false)} />
			</SheetContent>
		</Sheet>
	)
}
