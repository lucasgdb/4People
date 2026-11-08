import { ArrowRight } from 'lucide-react'
import type { Metadata, Route } from 'next'
import Link from 'next/link'
import { CATEGORIES, TOOLS, toolsIn } from '@/catalog/catalog'
import { Icon } from '@/components/icon'
import { JsonLd } from '@/components/json-ld'
import { ScreenHeader, ToolTable } from '@/components/screen'
import { SiteFooter } from '@/components/shell/site-footer'
import { SiteHeader } from '@/components/shell/site-header'
import { breadcrumbSchema, itemListSchema } from '@/lib/structured-data'

const title = 'Todas as ferramentas'
const description = `As ${TOOLS.length} ferramentas do 4People, de Computação e de Matemática, agrupadas por tópico. Grátis, sem cadastro e no navegador.`

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: '/ferramentas' },
	openGraph: { title, description, url: '/ferramentas' },
}

/**
 * Every tool, both areas with the same weight: jump links to each area (with their counts), then
 * each area with its topics. What "Ver todas as ferramentas" opens.
 */
export default function AllToolsPage() {
	return (
		<div className="bg-bg flex min-h-dvh flex-col">
			<SiteHeader />
			<main
				id="conteudo"
				tabIndex={-1}
				className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-12 px-4 pt-8 pb-16 outline-none sm:px-6 lg:pt-10"
			>
				<JsonLd
					data={[
						breadcrumbSchema([
							{ name: 'Início', path: '/' },
							{ name: title, path: '/ferramentas' },
						]),
						itemListSchema(
							title,
							TOOLS.map((tool) => ({ name: tool.name, path: tool.href })),
						),
					]}
				/>
				<ScreenHeader crumbs={[{ label: 'Início', href: '/' }, { label: title }]} title={title}>
					<p className="text-fg-muted max-w-2xl text-lg">
						{TOOLS.length} ferramentas grátis, agrupadas por área e tópico. Escolha uma área ou role
						a lista.
					</p>
				</ScreenHeader>

				<nav aria-label="Áreas" className="grid gap-3 sm:grid-cols-2">
					{CATEGORIES.map((category) => (
						<a
							key={category.slug}
							href={`#area-${category.slug}`}
							className="rounded-panel border-border bg-surface hover:border-border-strong focus-visible:ring-ring group flex items-center gap-4 border p-5 outline-none focus-visible:ring-4"
						>
							<span
								aria-hidden="true"
								className="bg-accent-soft text-accent grid size-12 shrink-0 place-items-center rounded-[14px]"
							>
								<Icon name={category.icon} className="size-6" />
							</span>
							<span className="flex min-w-0 flex-1 flex-col gap-0.5">
								<span className="text-fg text-lg font-bold">{category.name}</span>
								<span className="text-fg-muted text-sm">
									{toolsIn(category.slug).length} ferramentas · {category.sections.length} tópicos
								</span>
							</span>
							<ArrowRight
								aria-hidden="true"
								className="text-fg-subtle size-5 rotate-90 transition-transform duration-(--ds-motion) group-hover:translate-y-0.5"
							/>
						</a>
					))}
				</nav>

				{CATEGORIES.map((category) => (
					<section
						key={category.slug}
						id={`area-${category.slug}`}
						aria-labelledby={`titulo-${category.slug}`}
						className="flex scroll-mt-24 flex-col gap-8"
					>
						<div className="border-border flex flex-wrap items-end justify-between gap-3 border-b pb-4">
							<div className="flex flex-col gap-1">
								<h2
									id={`titulo-${category.slug}`}
									className="text-fg text-2xl font-extrabold tracking-[-0.02em] sm:text-[1.75rem]"
								>
									{category.name}
								</h2>
								<p className="text-fg-muted">{category.description}</p>
							</div>
							<Link
								prefetch={false}
								href={`/${category.slug}` as Route}
								className="text-accent-soft-fg focus-visible:ring-ring flex min-h-11 items-center gap-1 rounded-full px-2 text-[0.9375rem] font-semibold outline-none hover:underline focus-visible:ring-4"
							>
								Abrir {category.name}
								<ArrowRight aria-hidden="true" className="size-4" />
							</Link>
						</div>
						{category.sections.map((section) => (
							<section
								key={section.slug}
								aria-labelledby={`topico-${category.slug}-${section.slug}`}
								className="flex flex-col gap-4"
							>
								<h3
									id={`topico-${category.slug}-${section.slug}`}
									className="text-fg flex items-center gap-3 text-lg font-bold"
								>
									<span
										aria-hidden="true"
										className="bg-accent-soft text-accent grid size-8 place-items-center rounded-[10px]"
									>
										<Icon name={section.icon} className="size-4" />
									</span>
									<Link
										prefetch={false}
										href={`/${category.slug}/${section.slug}` as Route}
										className="hover:underline"
									>
										{section.name}
									</Link>
									<span className="bg-surface-sunken text-fg-muted tabular inline-flex h-6 items-center rounded-full px-2.5 text-sm leading-none font-semibold">
										{section.tools.length}
									</span>
								</h3>
								<ToolTable tools={toolsIn(category.slug, section.slug)} />
							</section>
						))}
					</section>
				))}
			</main>
			<SiteFooter />
		</div>
	)
}
