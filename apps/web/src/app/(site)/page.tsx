import { Accordion, buttonVariants, cn } from '@4people/ui'
import {
	AppWindow,
	ArrowRight,
	ArrowUpRight,
	CircleHelp,
	Gift,
	ShieldCheck,
	Sparkles,
	Target,
	UserRoundX,
	Zap,
} from 'lucide-react'
import type { Metadata, Route } from 'next'
import Link from 'next/link'
import { CATEGORIES, POPULAR_TOOLS, TOOLS } from '@/catalog/catalog'
import { SITE_FAQ } from '@/catalog/content'
import { DocCheck } from '@/components/home/doc-check'
import { LiveCpf } from '@/components/home/live-cpf'
import { Icon } from '@/components/icon'
import { JsonLd } from '@/components/json-ld'
import { LINK_CARD, LINK_CARD_ICON, LinkCardArrow, ToolTable } from '@/components/screen'
import { SiteFooter } from '@/components/shell/site-footer'
import { SiteHeader } from '@/components/shell/site-header'
import { generateCPF } from '@/lib/algorithms/documents'
import { REPOSITORY_URL } from '@/lib/site'
import { faqSchema } from '@/lib/structured-data'

/**
 * Rendered per request (not at build time): the CPF in the hero is drawn on the server for each
 * visit, so the page arrives with its own number.
 */
export const dynamic = 'force-dynamic'
/** Rendered next to the Brazilian audience instead of the default US region. */
export const preferredRegion = 'gru1'

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

/** The three promises above the hero title, each with its icon. */
const HERO_FEATURES = [
	{ icon: Gift, label: 'Grátis' },
	{ icon: UserRoundX, label: 'Sem cadastro' },
	{ icon: AppWindow, label: 'Roda no seu navegador' },
] as const

function Hero() {
	return (
		<section
			aria-labelledby="titulo"
			className="grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14"
		>
			<div className="flex flex-col items-start gap-6">
				<ul
					aria-label="Características"
					className="text-fg-muted flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.8125rem] font-medium sm:gap-2 sm:text-sm"
				>
					{HERO_FEATURES.map(({ icon: FeatureIcon, label }) => (
						<li
							key={label}
							// Phones: a quiet line of icon + word; from sm up, soft white chips.
							className="sm:border-border sm:bg-surface/80 flex items-center gap-1.5 whitespace-nowrap sm:rounded-full sm:border sm:py-1.5 sm:pr-3.5 sm:pl-2 sm:shadow-[0_1px_2px_rgb(23_32_51/0.05)]"
						>
							<span
								aria-hidden="true"
								className="sm:bg-accent-soft text-accent grid place-items-center sm:size-6 sm:rounded-full"
							>
								<FeatureIcon className="size-3.5" />
							</span>
							{label}
						</li>
					))}
				</ul>
				<h1
					id="titulo"
					className="text-fg text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.035em]"
				>
					Ferramentas online <span className="text-accent">grátis</span> para o seu{' '}
					{/* A soft marker under the last words: the promise, read at a glance. */}
					<span className="bg-[linear-gradient(transparent_62%,var(--color-accent-soft)_62%)] box-decoration-clone">
						dia a dia
					</span>
				</h1>
				<p className="text-fg-muted max-w-[36rem] text-lg leading-relaxed sm:text-xl">
					<strong className="text-fg font-semibold">{TOOLS.length} ferramentas</strong> para
					desenvolvimento, estudo e trabalho: gere e valide documentos, converta JSON, YAML e XML,
					teste regex e JWT, calcule sub-redes, datas, porcentagens e muito mais. Tudo{' '}
					<strong className="text-fg font-semibold">no navegador</strong>, sem cadastro e sem enviar
					seus dados.
				</p>
				<div className="grid w-full gap-3 sm:flex sm:w-auto sm:flex-wrap">
					<Link href={CPF_HREF as Route} className={buttonVariants({ size: 'lg' })}>
						Gerar um CPF
					</Link>
					<Link
						href={'/ferramentas' as Route}
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
					<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{category.sections.map((section) => (
							<li key={section.slug} className="flex">
								<Link
									href={`/${category.slug}/${section.slug}` as Route}
									className={cn(LINK_CARD, 'flex-col gap-4')}
								>
									<span className="flex items-center gap-3 pr-6">
										<span aria-hidden="true" className={LINK_CARD_ICON}>
											<Icon name={section.icon} className="size-[22px]" />
										</span>
										<span className="text-fg font-bold">{section.name}</span>
									</span>
									{/* The first tools as chips: what the section holds, at a glance. */}
									<span className="flex flex-wrap gap-1.5">
										{section.tools.slice(0, 3).map((tool) => (
											<span
												key={tool.slug}
												className="bg-surface-muted text-fg-muted border-rule rounded-chip border px-2 py-0.5 text-[0.8125rem]"
											>
												{tool.name}
											</span>
										))}
									</span>
									<span className="text-accent-soft-fg mt-auto text-sm font-semibold">
										<span className="tabular">{section.tools.length}</span> ferramentas
									</span>
									<LinkCardArrow />
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
			className="rounded-panel border-accent/15 relative isolate grid gap-8 overflow-hidden border bg-[linear-gradient(135deg,var(--color-accent-soft),color-mix(in_oklab,var(--color-accent-soft)_40%,var(--color-surface)))] p-6 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-12 lg:p-12"
		>
			{/* Two soft glows: white behind the points, blue in the far corner. */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-32 -right-24 -z-10 size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.7),transparent)]"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -bottom-40 -left-32 -z-10 size-[26rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-accent)_14%,transparent),transparent)]"
			/>
			<div className="flex flex-col items-start gap-4">
				<span className="text-accent-soft-fg bg-surface/70 border-accent/15 flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-wider uppercase">
					<Sparkles aria-hidden="true" className="size-3.5" /> Para quem usa IA
				</span>
				<h2
					id="economize-tokens"
					className="text-fg text-2xl font-extrabold tracking-[-0.02em] text-balance sm:text-[2rem] sm:leading-tight"
				>
					Economize tokens da IA: mande o <span className="text-accent">navegador</span> fazer o
					trabalho repetitivo
				</h2>
				<p className="text-fg-muted text-lg text-pretty">
					Gerar um CPF de teste, formatar um JSON ou converter um timestamp não precisa de um
					modelo. Deixe a IA para o que só ela faz.
				</p>
				{/* The point in one number. */}
				<p className="bg-surface border-border mt-1 flex items-center gap-3 rounded-[16px] border py-2.5 pr-5 pl-2.5 shadow-[0_1px_2px_rgb(23_32_51/0.05)]">
					<span className="bg-accent text-accent-fg tabular grid h-10 min-w-10 place-items-center rounded-[12px] px-2 text-xl leading-none font-extrabold">
						0
					</span>
					<span className="flex flex-col leading-tight">
						<span className="text-fg font-bold">tokens gastos</span>
						<span className="text-fg-muted text-sm">em qualquer ferramenta daqui</span>
					</span>
				</p>
			</div>
			<ul className="flex flex-col gap-3">
				{AI_POINTS.map(({ icon: PointIcon, title, text }) => (
					<li
						key={title}
						className="rounded-control bg-surface/90 border-border flex items-start gap-4 border p-5 shadow-[0_1px_2px_rgb(23_32_51/0.04)] backdrop-blur-sm"
					>
						<span
							aria-hidden="true"
							className="bg-accent-soft text-accent ring-accent/10 grid size-11 shrink-0 place-items-center rounded-[12px] ring-1 ring-inset"
						>
							<PointIcon className="size-5" />
						</span>
						<span className="flex flex-col gap-1">
							<span className="text-fg font-bold">{title}</span>
							<span className="text-fg-muted text-[0.9375rem] leading-relaxed text-pretty">
								{text}
							</span>
						</span>
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
		<section
			id="perguntas"
			aria-labelledby="perguntas-titulo"
			className="grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10"
		>
			<JsonLd data={faqSchema(SITE_FAQ)} />
			<div className="flex flex-col gap-4 lg:sticky lg:top-24">
				<span className="text-accent-soft-fg flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
					<CircleHelp aria-hidden="true" className="size-4" /> Dúvidas
				</span>
				<h2
					id="perguntas-titulo"
					className="text-fg text-2xl font-extrabold tracking-[-0.02em] sm:text-[1.75rem]"
				>
					Perguntas frequentes
				</h2>
				<p className="text-fg-muted text-lg text-pretty">
					O essencial sobre privacidade, custo e como as ferramentas funcionam.
				</p>
				<div className="rounded-panel bg-accent-soft mt-2 flex flex-col gap-2 p-5">
					<span className="text-fg font-bold">Não achou sua resposta?</span>
					<p className="text-fg-muted text-[0.9375rem]">
						Pergunte ou sugira uma ferramenta: o projeto é aberto e cada ideia é lida.
					</p>
					<a
						href={`${REPOSITORY_URL}/issues/new`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-accent-soft-fg focus-visible:ring-ring inline-flex w-fit items-center gap-1 rounded-sm font-semibold outline-none hover:underline focus-visible:ring-4"
					>
						Perguntar no GitHub
						<ArrowUpRight aria-hidden="true" className="size-4" />
						<span className="sr-only"> (abre em nova aba)</span>
					</a>
				</div>
			</div>
			<div className="rounded-panel border-border bg-surface border px-5 py-1 sm:px-7 sm:py-2">
				<Accordion
					items={SITE_FAQ.map((item, index) => ({
						id: `faq-${index}`,
						title: item.question,
						content: item.answer,
					}))}
				/>
			</div>
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
							href={'/ferramentas' as Route}
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
