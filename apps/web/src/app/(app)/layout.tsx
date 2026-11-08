import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/shell/site-footer'
import { SiteHeader } from '@/components/shell/site-header'

/** Acolhedor shell: white top bar over a light blue-grey page, content in a centred 1200px column. */
export default function AppLayout({ children }: { children: ReactNode }) {
	return (
		<div className="bg-bg flex min-h-dvh flex-col">
			<SiteHeader />
			<main
				id="conteudo"
				tabIndex={-1}
				className="mx-auto w-full max-w-[1200px] flex-1 px-4 pt-8 pb-16 outline-none sm:px-6 lg:pt-10"
			>
				{children}
			</main>
			<SiteFooter />
		</div>
	)
}
