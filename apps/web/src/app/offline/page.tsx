import type { Metadata } from 'next'
import { SiteFooter } from '@/components/shell/site-footer'
import { SiteHeader } from '@/components/shell/site-header'

export const metadata: Metadata = {
	title: 'Sem conexão',
	robots: { index: false, follow: false },
}

/** Shown by the service worker when a page that was never opened is requested offline. */
export default function OfflinePage() {
	return (
		<div className="bg-bg flex min-h-dvh flex-col">
			<SiteHeader />
			<main
				id="conteudo"
				tabIndex={-1}
				className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-4 py-16 outline-none sm:px-6"
			>
				<div className="rounded-panel border-border bg-surface flex max-w-3xl flex-col items-start gap-5 border p-8 sm:p-12">
					<span className="bg-accent-soft text-accent-soft-fg rounded-full px-3.5 py-1.5 text-sm font-bold">
						Sem conexão
					</span>
					<h1 className="text-fg text-[clamp(2rem,5vw,3rem)] leading-[1.1] font-extrabold tracking-[-0.03em]">
						Esta página ainda não foi salva neste aparelho
					</h1>
					<p className="text-fg-muted text-lg">
						Com internet, o 4People baixa todas as ferramentas em segundo plano para funcionarem
						offline. Parece que o download não terminou (ou a economia de dados está ligada).{' '}
						<span className="whitespace-nowrap">Conecte-se</span> por alguns instantes e tente de
						novo.
					</p>
					<a
						href="/"
						className="bg-primary text-primary-fg hover:bg-primary-hover focus-visible:ring-ring rounded-control inline-flex h-13 items-center px-7 font-semibold outline-none focus-visible:ring-4"
					>
						Voltar ao início
					</a>
				</div>
			</main>
			<SiteFooter />
		</div>
	)
}
