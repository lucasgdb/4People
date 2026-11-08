import { Accordion } from '@4people/ui'
import { BookOpen, CircleHelp, Globe, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'
import type { ComponentType, ReactNode } from 'react'
import { TOOLS, toolsIn } from '@/catalog/catalog'
import { TOOL_CONTENT, type ToolContent } from '@/catalog/content'
import { GithubIcon } from '@/components/github-icon'
import { JsonLd } from '@/components/json-ld'
import { ScreenHeader, ToolTable } from '@/components/screen'
import { ShareButton } from '@/components/share-button'
import { ToolIcon } from '@/components/tool-icons'
import { REPOSITORY_URL } from '@/lib/site'
import { breadcrumbSchema, faqSchema, toolSchema } from '@/lib/structured-data'
import { type ToolSource, toolSource } from './source'

/** Tools that call a public API; every other tool runs entirely in the browser. */
const USES_NETWORK = new Set([
	'meu-ip',
	'buscar-cep',
	'consulta-de-bancos',
	'cotacao-de-moedas',
	'testador-de-api-rest',
])

/** Catalog id: "<area>/<topic>/<tool>". */
export type ToolId = `${string}/${string}/${string}`

type Tool = (typeof TOOLS)[number]

function requireTool(id: ToolId) {
	const tool = TOOLS.find((entry) => entry.id === id)
	const content = tool ? TOOL_CONTENT[tool.slug] : undefined
	if (!tool || !content) throw new Error(`Tool missing from the catalog or content: ${id}`)
	return { tool, content }
}

function sourceUrl(source: ToolSource) {
	const lineAnchor = source.line ? `#L${source.line}` : ''
	return `${REPOSITORY_URL}/blob/main/${source.path}${lineAnchor}`
}

export function toolMetadata(id: ToolId): Metadata {
	const { tool } = requireTool(id)
	const title = `${tool.name} online e grátis`
	const ogImage = { url: `/og/${id}`, width: 1200, height: 630, alt: tool.name }
	return {
		title,
		description: tool.description,
		alternates: { canonical: tool.href },
		openGraph: {
			title,
			description: tool.description,
			url: tool.href,
			type: 'website',
			images: [ogImage],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description: tool.description,
			images: [ogImage.url],
		},
	}
}

type SectionTitleProps = {
	id: string
	icon: ReactNode
	aside?: ReactNode
	children: ReactNode
}

function SectionTitle({ id, icon, aside, children }: SectionTitleProps) {
	return (
		// The icon is centred on the whole text block: title alone, or title over the note on phones.
		<div className="flex items-center gap-3">
			<span
				aria-hidden="true"
				className="bg-accent-soft text-accent grid size-9 shrink-0 place-items-center rounded-[12px] [&_svg]:size-[1.125rem]"
			>
				{icon}
			</span>
			<div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
				<h2 id={id} className="text-fg text-xl font-bold">
					{children}
				</h2>
				{aside}
			</div>
		</div>
	)
}

function FeatureList({ usesNetwork }: { usesNetwork: boolean }) {
	const features = [
		'Grátis',
		'Sem cadastro',
		usesNetwork ? 'Consulta uma API pública' : 'Roda no seu navegador',
	]
	return (
		<ul
			aria-label="Características"
			className="text-fg-muted flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] font-medium sm:gap-2 lg:justify-end"
		>
			{features.map((feature) => (
				<li
					key={feature}
					// Plain words separated by dots on phones; outlined chips from sm up.
					className="sm:border-border sm:bg-surface whitespace-nowrap not-first:before:mr-2 not-first:before:content-['·'] sm:rounded-full sm:border sm:px-3 sm:py-1 sm:not-first:before:hidden"
				>
					{feature}
				</li>
			))}
		</ul>
	)
}

type HowItWorksProps = {
	answer: string
	formula?: string
	usesNetwork: boolean
	source: ToolSource
}

function HowItWorks({ answer, formula, usesNetwork, source }: HowItWorksProps) {
	const sourceLabel = source.file.endsWith('.ts')
		? 'Ver o código do cálculo'
		: 'Ver o código desta ferramenta'

	return (
		<div className="rounded-panel border-border bg-surface flex flex-col gap-5 border p-5 sm:p-7">
			<SectionTitle id="como-funciona" icon={<BookOpen />}>
				Como funciona
			</SectionTitle>
			<p className="text-fg text-base leading-7 text-pretty">{answer}</p>

			{formula ? (
				<div className="rounded-control bg-accent-soft flex flex-col gap-1 px-4 py-3">
					<span className="text-accent-soft-fg text-xs font-semibold tracking-wider uppercase">
						Fórmula
					</span>
					<span
						translate="no"
						className="text-accent-soft-fg tabular text-[1.0625rem] font-semibold"
					>
						{formula}
					</span>
				</div>
			) : null}

			<div className="border-border flex flex-col gap-2 border-t pt-4">
				<p className="text-fg-muted flex items-start gap-2 text-sm">
					{usesNetwork ? (
						<>
							<Globe aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
							Consulta um serviço público direto do seu navegador; nada passa por servidores do
							4People.
						</>
					) : (
						<>
							<ShieldCheck aria-hidden="true" className="text-success-ink mt-0.5 size-4 shrink-0" />
							Tudo é calculado no seu navegador: o que você digita não é enviado a lugar nenhum.
						</>
					)}
				</p>
				<a
					href={sourceUrl(source)}
					target="_blank"
					rel="noopener noreferrer"
					className="text-fg-muted hover:text-fg inline-flex min-h-10 w-fit items-center gap-2 text-sm underline-offset-4 hover:underline"
				>
					<GithubIcon className="size-4" />
					<span>
						{sourceLabel}{' '}
						<code translate="no" className="text-fg font-mono text-[0.8125rem]">
							{source.file}
						</code>
						<span className="sr-only"> (abre em nova aba)</span>
					</span>
				</a>
			</div>
		</div>
	)
}

function FrequentQuestions({ faq }: { faq: ToolContent['faq'] }) {
	const countLabel = `${faq.length} ${faq.length === 1 ? 'pergunta' : 'perguntas'}`
	return (
		<div className="rounded-panel border-border bg-surface flex flex-col gap-3 border p-5 sm:p-7">
			<SectionTitle
				id="perguntas-frequentes"
				icon={<CircleHelp />}
				aside={<span className="text-fg-muted text-sm">{countLabel}</span>}
			>
				Perguntas frequentes
			</SectionTitle>
			<Accordion
				items={faq.map((item, index) => ({
					id: `faq-${index}`,
					title: item.question,
					content: item.answer,
				}))}
			/>
		</div>
	)
}

function toolStructuredData(tool: Tool, content: ToolContent) {
	const areaPath = `/${tool.category.slug}`
	const topicPath = `${areaPath}/${tool.section.slug}`
	return [
		breadcrumbSchema([
			{ name: 'Início', path: '/' },
			{ name: tool.category.name, path: areaPath },
			{ name: tool.section.name, path: topicPath },
			{ name: tool.name, path: tool.href },
		]),
		toolSchema({
			name: tool.name,
			description: tool.description,
			path: tool.href,
			answer: content.answer,
		}),
		faqSchema(content.faq),
	]
}

/**
 * One tool's page. Each tool has its own generated route file (see scripts/gen-routes.ts) that
 * imports only its component, so every page ships its own bundle, HTML and metadata.
 */
export function ToolPage({
	id,
	component: ToolComponent,
}: {
	id: ToolId
	component: ComponentType
}) {
	const { tool, content } = requireTool(id)
	const areaPath = `/${tool.category.slug}`
	const topicPath = `${areaPath}/${tool.section.slug}`
	const usesNetwork = USES_NETWORK.has(tool.slug)
	const formula = 'formula' in tool ? tool.formula : undefined
	const relatedTools = toolsIn(tool.category.slug, tool.section.slug).filter(
		(other) => other.id !== tool.id,
	)

	return (
		<div className="flex flex-col gap-10">
			<JsonLd data={toolStructuredData(tool, content)} />

			<div className="flex flex-col gap-8">
				<ScreenHeader
					crumbs={[
						{ label: 'Início', href: '/' },
						{ label: tool.category.name, href: areaPath },
						{ label: tool.section.name, href: topicPath },
					]}
					title={tool.name}
					icon={<ToolIcon slug={tool.slug} size={32} className="size-7 sm:size-8" />}
					aside={
						<div className="flex flex-wrap items-center gap-x-4 gap-y-3 lg:flex-col lg:items-end">
							<FeatureList usesNetwork={usesNetwork} />
							<ShareButton title={`${tool.name} · 4People`} text={tool.description} />
						</div>
					}
				>
					<p className="text-fg-muted max-w-2xl text-[1.0625rem] text-pretty">{tool.description}</p>
				</ScreenHeader>
				<ToolComponent />
			</div>

			<section
				aria-labelledby="como-funciona"
				className="grid items-start gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
			>
				<HowItWorks
					answer={content.answer}
					formula={formula}
					usesNetwork={usesNetwork}
					source={toolSource(tool.slug)}
				/>
				<FrequentQuestions faq={content.faq} />
			</section>

			{relatedTools.length > 0 ? (
				<section aria-labelledby="mais-ferramentas" className="flex flex-col gap-4">
					<h2 id="mais-ferramentas" className="text-fg text-xl font-bold">
						Mais em {tool.section.name}
					</h2>
					<ToolTable tools={relatedTools} />
				</section>
			) : null}
		</div>
	)
}
