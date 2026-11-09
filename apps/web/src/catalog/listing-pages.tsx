import { ArrowRight } from 'lucide-react'
import type { Metadata, Route } from 'next'
import Link from 'next/link'
import { getCategory, getSection, toolsIn } from '@/catalog/catalog'
import { sectionIntro } from '@/catalog/content'
import { Icon, type IconName } from '@/components/icon'
import { JsonLd } from '@/components/json-ld'
import { ScreenHeader, ToolTable } from '@/components/screen'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/structured-data'

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
					collectionPageSchema({
						name: `Ferramentas de ${category.name}`,
						description: category.description,
						path: `/${category.slug}`,
						items: tools.map((tool) => ({ name: tool.name, path: tool.href })),
					}),
				]}
			/>
			<ScreenHeader
				crumbs={[{ label: 'Início', href: '/' }, { label: category.name }]}
				title={category.name}
				icon={<Icon name={category.icon} className="size-8 sm:size-10" />}
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
						<div className="flex flex-wrap items-center justify-between gap-4">
							<h2
								id={`topico-${section.slug}`}
								className="text-fg flex items-center gap-4 text-xl font-extrabold tracking-[-0.015em]"
							>
								<span
									aria-hidden="true"
									className="bg-accent-soft text-accent rounded-control grid size-10 place-items-center"
								>
									<Icon name={section.icon} className="size-5" />
								</span>
								{section.name}
								<span className="bg-surface-sunken text-fg-muted tabular inline-flex h-6 items-center rounded-full px-2 text-sm leading-none font-semibold">
									{section.tools.length}
								</span>
							</h2>
							<Link
								prefetch={false}
								href={href as Route}
								className="text-accent-soft-fg focus-visible:ring-ring flex min-h-12 items-center gap-1 rounded-full px-2 text-[0.9375rem] font-semibold outline-none hover:underline focus-visible:ring-4"
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

const META_DESCRIPTION_LIMIT = 155

const countLabel = (count: number) => (count === 1 ? '1 ferramenta' : `${count} ferramentas`)

/** "<n> ferramentas de geradores grátis: Gerador de CPF, Gerador de CNPJ… e mais.", up to 155 chars. */
function topicDescription(topicName: string, tools: { name: string }[]) {
	const lead = `${countLabel(tools.length)} de ${topicName.toLowerCase()} grátis e sem cadastro: `
	let names = ''
	for (const tool of tools) {
		const next = names ? `${names}, ${tool.name}` : tool.name
		if (`${lead}${next} e mais.`.length > META_DESCRIPTION_LIMIT) break
		names = next
	}
	const ending = names.split(', ').length < tools.length ? ' e mais.' : '.'
	return `${lead}${names}${ending}`
}

/**
 * The topic's intro, as wide as the tool grid: a soft accent side with the section's icon, title and
 * count, and the text on the other side, where lines keep a readable length. The first paragraph
 * leads a little larger. Stacks on phones.
 */
function TopicIntro({
	name,
	icon,
	count,
	paragraphs,
}: {
	name: string
	icon: IconName
	count: number
	paragraphs: string[]
}) {
	if (paragraphs.length === 0) return null
	return (
		<section
			aria-labelledby="sobre-o-topico"
			className="rounded-panel border-border bg-surface grid overflow-hidden border lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]"
		>
			<div className="border-border flex flex-col gap-4 border-b bg-[linear-gradient(160deg,var(--color-accent-soft),color-mix(in_oklab,var(--color-accent-soft)_35%,var(--color-surface)))] p-6 sm:p-8 lg:border-r lg:border-b-0">
				<span
					aria-hidden="true"
					className="bg-accent text-accent-fg rounded-control grid size-12 place-items-center shadow-[0_6px_16px_-6px_var(--color-accent)]"
				>
					<Icon name={icon} className="size-6" />
				</span>
				<div className="flex flex-col gap-2">
					<span className="text-accent-soft-fg text-xs font-bold tracking-wider uppercase">
						Sobre o tópico
					</span>
					<h2
						id="sobre-o-topico"
						className="text-fg text-2xl font-extrabold tracking-[-0.02em] text-balance"
					>
						{name}
					</h2>
				</div>
				<p className="text-fg-muted text-[0.9375rem]">
					<span className="text-fg tabular font-semibold">{count}</span>{' '}
					{count === 1 ? 'ferramenta' : 'ferramentas'}, todas grátis e no seu navegador.
				</p>
			</div>
			<div className="flex flex-col gap-4 p-6 sm:p-8">
				{paragraphs.map((paragraph, index) => (
					<p
						key={paragraph.slice(0, 40)}
						className={
							index === 0
								? 'text-fg text-[1.0625rem] leading-7 text-pretty'
								: 'text-fg-muted leading-7 text-pretty'
						}
					>
						{paragraph}
					</p>
				))}
			</div>
		</section>
	)
}

/** Metadata of a section listing (e.g. /computacao/geradores). */
export function sectionMetadata(categorySlug: string, sectionSlug: string): Metadata {
	const { section, tools, path } = requireSection(categorySlug, sectionSlug)
	const description = topicDescription(section.name, tools)
	const title = `${section.name} grátis: ${countLabel(tools.length)} online`
	return {
		title,
		description,
		alternates: { canonical: path },
		openGraph: { title, description, url: path },
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
					collectionPageSchema({
						name: section.name,
						description: topicDescription(section.name, tools),
						path,
						items: tools.map((tool) => ({ name: tool.name, path: tool.href })),
					}),
				]}
			/>
			<ScreenHeader
				crumbs={[
					{ label: 'Início', href: '/' },
					{ label: category.name, href: `/${category.slug}` },
					{ label: section.name },
				]}
				title={section.name}
				icon={<Icon name={section.icon} className="size-8 sm:size-10" />}
			>
				<p className="text-fg-muted max-w-2xl text-lg">
					{tools.length === 1 ? '1 ferramenta' : `${tools.length} ferramentas`} de{' '}
					{section.name.toLowerCase()}, gratuitas e sem cadastro.
				</p>
			</ScreenHeader>
			<ToolTable tools={tools} />
			<TopicIntro
				name={section.name}
				icon={section.icon}
				count={tools.length}
				paragraphs={sectionIntro(category.slug, section.slug)}
			/>
			<nav aria-labelledby="outros-topicos" className="flex flex-col gap-4 pt-4">
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
									className="border-border bg-surface text-fg hover:border-accent/45 hover:ring-accent-soft focus-visible:ring-ring flex h-12 items-center gap-2 rounded-full border px-4 text-[0.9375rem] font-medium transition-[border-color,box-shadow] duration-(--ds-motion) outline-none hover:ring-4 focus-visible:ring-4"
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
