import { buttonVariants } from '@4people/ui'
import { ArrowRight, ShieldCheck, Sparkles, Target, Zap } from 'lucide-react'
import type { Metadata, Route } from 'next'
import Link from 'next/link'
import { CATEGORIES, POPULAR_TOOLS, TOOLS } from '@/catalog/catalog'
import { SITE_FAQ } from '@/catalog/content'
import { DocCheck } from '@/components/home/doc-check'
import { LiveCpf } from '@/components/home/live-cpf'
import { Icon } from '@/components/icon'
import { JsonLd } from '@/components/json-ld'
import { ToolTable } from '@/components/screen'
import { SiteFooter } from '@/components/shell/site-footer'
import { SiteHeader } from '@/components/shell/site-header'
import { generateCPF } from '@/lib/algorithms/documents'
import { faqSchema } from '@/lib/structured-data'

/**
 * Rendered per request (not at build time): the CPF in the hero is drawn on the server for each
 * visit, so the page arrives with its own number.
 */
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
	title: { absolute: '4People: ferramentas online gratuitas para pessoas' },
	alternates: { canonical: '/' },
}

const CPF_HREF = '/computacao/geradores/gerador-de-cpf'

function SectionTitle({ id, title, children }: { id: string; title: string; children?: string }) {
	return (
		<div className="flex flex-col gap-2">
			<h2 id={id} className="text-fg text-2xl font-extrabold tracking-[-0.02em] sm:text-[1.75rem]">
				{title}
			</h2>
			{children ? <p className="text-fg-muted text-lg">{children}</p> : null}
		</div>
	)
}

function Hero() {
	return (
		<section
			aria-labelledby="titulo"
			className="grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14"
		>
			<div className="flex flex-col items-start gap-6">
				<ul
					aria-label="Características"
					className="text-fg-muted flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] font-medium sm:gap-2 sm:text-sm"
				>
					{['Grátis', 'Sem cadastro', 'Roda no seu navegador'].map((feature) => (
						<li
							key={feature}
							// Phones: one quiet line ("Grátis · Sem cadastro · …"); from sm up, outlined chips.
							className="sm:border-border sm:bg-surface whitespace-nowrap not-first:before:mr-2 not-first:before:content-['·'] sm:rounded-full sm:border sm:px-3.5 sm:py-1.5 sm:not-first:before:hidden"
						>
							{feature}
						</li>
					))}
				</ul>
				<h1
					id="titulo"
					className="text-fg text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.035em]"
				>
					Ferramentas online grátis para o seu dia a dia
				</h1>
				<p className="text-fg-muted max-w-[36rem] text-lg leading-relaxed sm:text-xl">
					{TOOLS.length} ferramentas para desenvolvimento, estudo e trabalho: gere e valide
					documentos, converta JSON, YAML e XML, teste regex e JWT, calcule sub-redes, datas,
					porcentagens e muito mais. Tudo no navegador, sem cadastro e sem enviar seus dados.
				</p>
				<div className="grid w-full gap-3 sm:flex sm:w-auto sm:flex-wrap">
					<Link href={CPF_HREF as Route} className={buttonVariants({ size: 'lg' })}>
						Gerar um CPF
					</Link>
					<Link
						href={'/computacao' as Route}
						className={buttonVariants({ size: 'lg', variant: 'secondary' })}
					>
						Ver todas as ferramentas
					</Link>
				</div>
			</div>
			<LiveCpf initial={generateCPF()} />
		</section>
	)
}

function Sections() {
	return (
		<section aria-labelledby="secoes" className="flex flex-col gap-6">
			<SectionTitle id="secoes" title="Explore por assunto" />
			{CATEGORIES.map((category) => (
				<div key={category.slug} className="flex flex-col gap-3">
					<h3 className="text-fg-muted flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
						<Icon name={category.icon} className="size-4" />
						{category.name}
					</h3>
					<ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{category.sections.map((section) => (
							<li key={section.slug} className="flex">
								<Link
									href={`/${category.slug}/${section.slug}` as Route}
									className="group border-border bg-surface hover:border-accent/45 hover:ring-accent-soft focus-visible:border-accent focus-visible:ring-ring flex w-full items-start gap-4 rounded-[16px] border p-5 transition-[border-color,box-shadow] duration-(--ds-motion) ease-out outline-none hover:ring-4 focus-visible:ring-4"
								>
									<span
										aria-hidden="true"
										className="bg-accent-soft text-accent group-hover:bg-accent group-hover:text-accent-fg grid size-11 shrink-0 place-items-center rounded-[14px] transition-colors duration-(--ds-motion)"
									>
										<Icon name={section.icon} className="size-[22px]" />
									</span>
									<span className="flex min-w-0 flex-1 flex-col gap-1">
										<span className="text-fg flex items-center justify-between gap-2 font-bold">
											{section.name}
											<span className="bg-surface-sunken text-fg-muted tabular rounded-full px-2.5 py-0.5 text-sm font-semibold">
												{section.tools.length}
											</span>
										</span>
										<span className="text-fg-muted text-[0.9375rem] leading-snug">
											{section.tools
												.slice(0, 3)
												.map((tool) => tool.name)
												.join(', ')}
											{section.tools.length > 3 ? '…' : ''}
										</span>
									</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</section>
	)
}

/** Why use a tool instead of asking an AI: repetitive work done by the browser costs no tokens. */
const AI_POINTS = [
	{
		icon: Zap,
		title: 'Na hora',
		text: 'Sem esperar a resposta de um modelo: o resultado sai enquanto você digita.',
	},
	{
		icon: Target,
		title: 'Exato',
		text: 'Dígitos verificadores, conversões e contas seguem o algoritmo, sem alucinação.',
	},
	{
		icon: ShieldCheck,
		title: 'Privado',
		text: 'Nada do que você digita vai para um servidor, nem para um chat.',
	},
] as const

function SaveTokens() {
	return (
		<section
			aria-labelledby="economize-tokens"
			className="rounded-panel bg-accent-soft grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:p-10"
		>
			<div className="flex flex-col gap-3">
				<span className="text-accent-soft-fg flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
					<Sparkles aria-hidden="true" className="size-4" /> Para quem usa IA
				</span>
				<h2
					id="economize-tokens"
					className="text-fg text-2xl font-extrabold tracking-[-0.02em] text-balance sm:text-[1.75rem]"
				>
					Economize tokens da IA: mande o navegador fazer o trabalho repetitivo
				</h2>
				<p className="text-fg-muted text-lg text-pretty">
					Gerar um CPF de teste, formatar um JSON ou converter um timestamp não precisa de um
					modelo. Deixe a IA para o que só ela faz.
				</p>
			</div>
			<ul className="grid gap-3 sm:grid-cols-3">
				{AI_POINTS.map(({ icon: PointIcon, title, text }) => (
					<li key={title} className="rounded-control bg-surface flex flex-col gap-2 p-5">
						<PointIcon aria-hidden="true" className="text-accent size-5" />
						<span className="text-fg font-bold">{title}</span>
						<span className="text-fg-muted text-[0.9375rem] leading-relaxed">{text}</span>
					</li>
				))}
			</ul>
		</section>
	)
}

function Validate() {
	return (
		<section
			aria-labelledby="validar"
			className="rounded-panel border-border bg-surface grid gap-8 border p-6 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:p-10"
		>
			<div className="flex flex-col gap-3">
				<h2
					id="validar"
					className="text-fg text-2xl font-extrabold tracking-[-0.02em] sm:text-[1.75rem]"
				>
					<label htmlFor="doc" className="cursor-text">
						Cole um CPF ou CNPJ e veja na hora se ele é válido
					</label>
				</h2>
				<p className="text-fg-muted text-lg">
					A conta dos dígitos verificadores acontece aqui mesmo, enquanto você digita.
				</p>
			</div>
			<DocCheck />
		</section>
	)
}

function Questions() {
	return (
		<section id="perguntas" aria-labelledby="perguntas-titulo" className="flex flex-col gap-6">
			<JsonLd data={faqSchema(SITE_FAQ)} />
			<SectionTitle id="perguntas-titulo" title="Perguntas frequentes" />
			<dl className="grid gap-3 md:grid-cols-2">
				{SITE_FAQ.map((item) => (
					<div
						key={item.question}
						className="rounded-panel border-border bg-surface flex flex-col gap-2 border p-6"
					>
						<dt className="text-fg text-lg font-bold">{item.question}</dt>
						<dd className="text-fg-muted leading-relaxed">{item.answer}</dd>
					</div>
				))}
			</dl>
		</section>
	)
}

export default function HomePage() {
	return (
		<div className="bg-bg flex min-h-dvh flex-col">
			<SiteHeader />
			<main
				id="conteudo"
				tabIndex={-1}
				className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-16 px-4 pt-10 pb-20 outline-none sm:px-6 lg:gap-20 lg:pt-16"
			>
				<Hero />
				<section aria-labelledby="populares" className="flex flex-col gap-6">
					<div className="flex flex-wrap items-end justify-between gap-3">
						<SectionTitle id="populares" title="Mais usadas" />
						<Link
							href={'/computacao' as Route}
							className="text-accent-soft-fg flex min-h-11 items-center gap-1 font-semibold hover:underline"
						>
							Ver todas <ArrowRight className="size-4" aria-hidden="true" />
						</Link>
					</div>
					<ToolTable tools={POPULAR_TOOLS} showSection />
				</section>
				<SaveTokens />
				<Sections />
				<Validate />
				<Questions />
			</main>
			<SiteFooter />
		</div>
	)
}
