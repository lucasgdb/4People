import { ArrowRight } from 'lucide-react'
import type { Metadata, Route } from 'next'
import Link from 'next/link'
import { getCategory, getSection, toolsIn } from '@/catalog/catalog'
import { Icon } from '@/components/icon'
import { JsonLd } from '@/components/json-ld'
import { ScreenHeader, ToolTable } from '@/components/screen'
import { breadcrumbSchema, itemListSchema } from '@/lib/structured-data'

function requireCategory(slug: string) {
	const category = getCategory(slug)
	if (!category) throw new Error(`Categoria inexistente: ${slug}`)
	return category
}

/** Metadata of a category listing (e.g. /computacao). */
export function categoryMetadata(slug: string): Metadata {
	const category = requireCategory(slug)
	const tools = toolsIn(category.slug)
	const title = `Ferramentas de ${category.name}`
	const description = `${tools.length} ferramentas de ${category.name.toLowerCase()} online e gratuitas: ${tools
		.slice(0, 6)
		.map((tool) => tool.name)
		.join(', ')} e mais.`
	return {
		title,
		description,
		alternates: { canonical: `/${category.slug}` },
		openGraph: { title, description, url: `/${category.slug}` },
	}
}

/** Category listing. Each category has its own static route file (see scripts/gen-routes.ts). */
export function CategoryPage({ slug }: { slug: string }) {
	const category = requireCategory(slug)
	const tools = toolsIn(category.slug)
	return (
		<div className="flex flex-col gap-10">
			<JsonLd
				data={[
					breadcrumbSchema([
						{ name: 'Início', path: '/' },
						{ name: category.name, path: `/${category.slug}` },
					]),
					itemListSchema(
						`Ferramentas de ${category.name}`,
						tools.map((tool) => ({ name: tool.name, path: tool.href })),
					),
				]}
			/>
			<ScreenHeader
				crumbs={[{ label: 'Início', href: '/' }, { label: category.name }]}
				title={category.name}
				icon={<Icon name={category.icon} className="size-7 sm:size-9" />}
			>
				<p className="text-fg-muted max-w-2xl text-lg">
					{tools.length} ferramentas em {category.sections.length} seções. {category.description}
				</p>
			</ScreenHeader>
			{category.sections.map((section) => {
				const href = `/${category.slug}/${section.slug}`
				return (
					<section
						key={section.slug}
						aria-labelledby={`topico-${section.slug}`}
						className="flex flex-col gap-4"
					>
						<div className="flex flex-wrap items-center justify-between gap-3">
							<h2
								id={`topico-${section.slug}`}
								className="text-fg flex items-center gap-3 text-xl font-extrabold tracking-[-0.015em]"
							>
								<span
									aria-hidden="true"
									className="bg-accent-soft text-accent grid size-9 place-items-center rounded-[12px]"
								>
									<Icon name={section.icon} className="size-5" />
								</span>
								{section.name}
								<span className="bg-surface-sunken text-fg-muted tabular inline-flex h-6 items-center rounded-full px-2.5 text-sm leading-none font-semibold">
									{section.tools.length}
								</span>
							</h2>
							<Link
								prefetch={false}
								href={href as Route}
								className="text-accent-soft-fg focus-visible:ring-ring flex min-h-11 items-center gap-1 rounded-full px-2 text-[0.9375rem] font-semibold outline-none hover:underline focus-visible:ring-4"
							>
								Abrir {section.name}
								<ArrowRight aria-hidden="true" className="size-4" />
							</Link>
						</div>
						<ToolTable tools={toolsIn(category.slug, section.slug)} />
					</section>
				)
			})}
		</div>
	)
}

function requireSection(categorySlug: string, sectionSlug: string) {
	const category = getCategory(categorySlug)
	const section = getSection(categorySlug, sectionSlug)
	if (!category || !section) throw new Error(`Seção inexistente: ${categorySlug}/${sectionSlug}`)
	return {
		category,
		section,
		tools: toolsIn(category.slug, section.slug),
		path: `/${category.slug}/${section.slug}`,
	}
}

/** Metadata of a section listing (e.g. /computacao/geradores). */
export function sectionMetadata(categorySlug: string, sectionSlug: string): Metadata {
	const { section, tools, path } = requireSection(categorySlug, sectionSlug)
	const description = `${section.name} online e grátis: ${tools.map((tool) => tool.name).join(', ')}. Sem cadastro, direto no navegador.`
	return {
		title: section.name,
		description,
		alternates: { canonical: path },
		openGraph: { title: section.name, description, url: path },
	}
}

/** Section listing. */
export function SectionPage({
	category: categorySlug,
	section: sectionSlug,
}: {
	category: string
	section: string
}) {
	const { category, section, tools, path } = requireSection(categorySlug, sectionSlug)
	return (
		<div className="flex flex-col gap-10">
			<JsonLd
				data={[
					breadcrumbSchema([
						{ name: 'Início', path: '/' },
						{ name: category.name, path: `/${category.slug}` },
						{ name: section.name, path },
					]),
					itemListSchema(
						section.name,
						tools.map((tool) => ({ name: tool.name, path: tool.href })),
					),
				]}
			/>
			<ScreenHeader
				crumbs={[
					{ label: 'Início', href: '/' },
					{ label: category.name, href: `/${category.slug}` },
					{ label: section.name },
				]}
				title={section.name}
				icon={<Icon name={section.icon} className="size-7 sm:size-9" />}
			>
				<p className="text-fg-muted max-w-2xl text-lg">
					{tools.length === 1 ? '1 ferramenta' : `${tools.length} ferramentas`} de{' '}
					{section.name.toLowerCase()}, gratuitas e sem cadastro.
				</p>
			</ScreenHeader>
			<ToolTable tools={tools} />
			<nav aria-labelledby="outros-topicos" className="flex flex-col gap-3 pt-4">
				<h2 id="outros-topicos" className="text-fg text-lg font-bold">
					Outros tópicos de {category.name}
				</h2>
				<ul className="flex flex-wrap gap-2">
					{category.sections
						.filter((other) => other.slug !== section.slug)
						.map((other) => (
							<li key={other.slug}>
								<Link
									prefetch={false}
									href={`/${category.slug}/${other.slug}` as Route}
									className="border-border bg-surface text-fg hover:border-accent/45 hover:ring-accent-soft focus-visible:ring-ring flex h-11 items-center gap-2 rounded-full border px-4 text-[0.9375rem] font-medium transition-[border-color,box-shadow] duration-(--ds-motion) outline-none hover:ring-4 focus-visible:ring-4"
								>
									<Icon name={other.icon} className="text-accent size-4" />
									{other.name}
									<span className="text-fg-muted tabular text-sm">{other.tools.length}</span>
								</Link>
							</li>
						))}
				</ul>
			</nav>
		</div>
	)
}
