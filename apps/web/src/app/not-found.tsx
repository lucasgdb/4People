import { buttonVariants } from '@4people/ui'
import type { Route } from 'next'
import Link from 'next/link'
import { TOOLS } from '@/catalog/catalog'
import { SiteFooter } from '@/components/shell/site-footer'
import { SiteHeader } from '@/components/shell/site-header'

export default function NotFound() {
	return (
		<div className="bg-bg flex min-h-dvh flex-col">
			<SiteHeader />
			<main
				id="conteudo"
				tabIndex={-1}
				className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-4 py-16 outline-none sm:px-6"
			>
				<div className="rounded-panel border-border bg-surface flex max-w-3xl flex-col items-start gap-6 border p-8 sm:p-12">
					<span className="bg-accent-soft text-accent-soft-fg rounded-full px-3.5 py-1.5 text-sm font-bold">
						Erro 404
					</span>
					<h1 className="text-fg text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.035em]">
						Página não encontrada
					</h1>
					<p className="text-fg-muted text-lg">
						O endereço não existe ou a ferramenta mudou de lugar. As {TOOLS.length} ferramentas
						continuam a um clique.
					</p>
					<div className="flex flex-wrap gap-3">
						<Link href={'/ferramentas' as Route} className={buttonVariants({ size: 'lg' })}>
							Ver todas as ferramentas
						</Link>
						<Link
							href={'/' as Route}
							className={buttonVariants({ variant: 'secondary', size: 'lg' })}
						>
							Página inicial
						</Link>
					</div>
				</div>
			</main>
			<SiteFooter />
		</div>
	)
}
