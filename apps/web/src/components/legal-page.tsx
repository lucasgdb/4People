import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/shell/site-footer'
import { SiteHeader } from '@/components/shell/site-header'

/** Text page (terms, privacy): readable measure, numbered sections, last-updated date. */
export function LegalPage({
	title,
	intro,
	updated,
	children,
}: {
	title: string
	intro: ReactNode
	updated: string
	children: ReactNode
}) {
	return (
		<div className="bg-bg flex min-h-dvh flex-col">
			<SiteHeader />
			<main
				id="conteudo"
				tabIndex={-1}
				className="mx-auto w-full max-w-[1200px] flex-1 px-4 pt-8 pb-16 outline-none sm:px-6 lg:pt-10"
			>
				<article className="rounded-panel border-border bg-surface mx-auto flex max-w-3xl flex-col gap-8 border p-6 sm:p-10">
					<header className="flex flex-col gap-3">
						<p className="text-fg-muted text-sm">Última atualização: {updated}</p>
						<h1 className="text-fg text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.15] font-extrabold tracking-[-0.025em]">
							{title}
						</h1>
						<div className="text-fg-muted text-[1.0625rem] leading-relaxed">{intro}</div>
					</header>
					<div className="text-fg [&_a]:text-accent-soft-fg [&_h2]:text-fg flex flex-col gap-8 leading-7 [&_a]:font-semibold [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:text-lg [&_h2]:font-bold [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_section]:flex [&_section]:flex-col [&_section]:gap-3 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2">
						{children}
					</div>
				</article>
			</main>
			<SiteFooter />
		</div>
	)
}
