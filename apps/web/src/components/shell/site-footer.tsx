import { ArrowUpRight } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { CATEGORIES, TOOLS } from '@/catalog/catalog'
import { Wordmark } from '@/components/brand'
import { GithubIcon } from '@/components/github-icon'
import { AUTHOR, PRIVACY_URL, REPOSITORY_URL, TERMS_URL } from '@/lib/site'

const linkClass =
	'text-fg-muted hover:text-fg focus-visible:ring-ring inline-flex min-h-9 items-center gap-1.5 rounded-sm text-sm underline-offset-4 outline-none hover:underline focus-visible:ring-4'

/** A link to another site: opens in a new tab, so 4People stays where it was, and says so. */
function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
	return (
		<a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
			{children}
			<ArrowUpRight aria-hidden="true" className="size-3.5 opacity-60" />
			<span className="sr-only"> (abre em nova aba)</span>
		</a>
	)
}

function Column({ title, children }: { title: string; children: ReactNode }) {
	return (
		<nav aria-label={title} className="flex flex-col gap-2">
			<h2 className="text-fg text-sm font-bold">{title}</h2>
			<ul className="flex flex-col">{children}</ul>
		</nav>
	)
}

/**
 * Site footer: the brand and the beta notice, the topics of each area, the project links (external
 * ones open in a new tab) and the legal pages, then the license line.
 */
export function SiteFooter() {
	const year = new Date().getFullYear()
	return (
		<footer className="border-border bg-surface border-t">
			<div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 pt-12 pb-8 sm:px-6">
				<div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_repeat(4,minmax(0,1fr))] lg:gap-8">
					<div className="flex flex-col items-start gap-4">
						<Wordmark />
						<p className="text-fg-muted max-w-xs text-sm leading-relaxed">
							{TOOLS.length} ferramentas grátis para desenvolvimento, estudo e trabalho. Tudo roda
							no seu navegador, sem cadastro.
						</p>
						<p className="rounded-control bg-accent-soft text-accent-soft-fg max-w-xs px-3.5 py-2.5 text-[0.8125rem] leading-relaxed">
							<strong className="font-semibold">Versão beta.</strong> O 4People ainda está em
							testes. Achou algo errado?{' '}
							<a
								href={`${REPOSITORY_URL}/issues/new`}
								target="_blank"
								rel="noopener noreferrer"
								className="font-semibold underline underline-offset-2"
							>
								Conte pra gente<span className="sr-only"> (abre em nova aba)</span>
							</a>
							.
						</p>
					</div>
					{CATEGORIES.map((category) => (
						<Column key={category.slug} title={category.name}>
							{category.sections.map((section) => (
								<li key={section.slug}>
									<Link
										prefetch={false}
										href={`/${category.slug}/${section.slug}` as Route}
										className={linkClass}
									>
										{section.name}
									</Link>
								</li>
							))}
						</Column>
					))}
					<Column title="Projeto">
						<li>
							<ExternalLink href={REPOSITORY_URL}>Código no GitHub</ExternalLink>
						</li>
						<li>
							<ExternalLink href={`${REPOSITORY_URL}/issues`}>Sugestões e problemas</ExternalLink>
						</li>
						<li>
							<ExternalLink href={AUTHOR.url}>lucasbittencourt.dev</ExternalLink>
						</li>
					</Column>
					<Column title="Legal">
						<li>
							<ExternalLink href={TERMS_URL}>Termos de uso</ExternalLink>
						</li>
						<li>
							<ExternalLink href={PRIVACY_URL}>Política de privacidade</ExternalLink>
						</li>
					</Column>
				</div>
				<div className="border-border text-fg-muted flex flex-col gap-3 border-t pt-6 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
					<p>
						© {year} <span translate="no">4People</span> · código aberto sob a licença GPL-3.0 ·
						feito por{' '}
						<a
							href={AUTHOR.url}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-fg font-medium underline-offset-4 hover:underline"
						>
							{AUTHOR.name}
							<span className="sr-only"> (abre em nova aba)</span>
						</a>
					</p>
					<a
						href={REPOSITORY_URL}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="4People no GitHub (abre em nova aba)"
						className="hover:text-fg focus-visible:ring-ring grid size-9 place-items-center rounded-full outline-none focus-visible:ring-4"
					>
						<GithubIcon className="size-5" />
					</a>
				</div>
			</div>
		</footer>
	)
}
