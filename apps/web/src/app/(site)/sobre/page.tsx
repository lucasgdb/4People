import { ArrowUpRight } from 'lucide-react'
import type { Metadata, Route } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { CATEGORIES, TOOLS } from '@/catalog/catalog'
import { JsonLd } from '@/components/json-ld'
import { ScreenHeader } from '@/components/screen'
import { SiteFooter } from '@/components/shell/site-footer'
import { SiteHeader } from '@/components/shell/site-header'
import { AUTHOR, absoluteUrl, FOUNDING_YEAR, REPOSITORY_URL, SITE_URL } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/structured-data'

const title = 'Sobre o 4People'
const description =
	'O que é o 4People, quem faz, como funciona a privacidade e por que todas as ferramentas são grátis, sem cadastro e de código aberto.'

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: '/sobre' },
	openGraph: { title, description, url: '/sobre' },
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="text-accent-soft-fg font-semibold whitespace-nowrap underline-offset-4 hover:underline"
		>
			{children}
			<ArrowUpRight aria-hidden="true" className="ml-0.5 inline-block size-3.5 align-[-0.125em]" />
			<span className="sr-only"> (abre em nova aba)</span>
		</a>
	)
}

function Section({ id, heading, children }: { id: string; heading: string; children: ReactNode }) {
	return (
		<section aria-labelledby={id} className="flex flex-col gap-4">
			<h2 id={id} className="text-fg text-xl font-bold">
				{heading}
			</h2>
			<div className="text-fg-muted flex flex-col gap-4 leading-7 text-pretty">{children}</div>
		</section>
	)
}

export default function AboutPage() {
	const toolsPerArea = CATEGORIES.map((area) => ({
		name: area.name,
		count: TOOLS.filter((tool) => tool.category.slug === area.slug).length,
	}))

	return (
		<div className="bg-bg flex min-h-dvh flex-col">
			<SiteHeader />
			<main
				id="conteudo"
				tabIndex={-1}
				className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-8 px-4 pt-8 pb-16 outline-none sm:px-6 lg:pt-10"
			>
				<JsonLd
					data={[
						breadcrumbSchema([
							{ name: 'Início', path: '/' },
							{ name: title, path: '/sobre' },
						]),
						{
							'@context': 'https://schema.org',
							'@type': 'AboutPage',
							name: title,
							description,
							url: absoluteUrl('/sobre'),
							inLanguage: 'pt-BR',
							mainEntity: { '@id': `${SITE_URL}/#organization` },
						},
					]}
				/>
				<ScreenHeader crumbs={[{ label: 'Início', href: '/' }, { label: 'Sobre' }]} title={title}>
					<p className="text-fg-muted max-w-2xl text-lg">
						{TOOLS.length} ferramentas grátis para desenvolvimento, estudo e trabalho, que rodam no
						seu navegador.
					</p>
				</ScreenHeader>

				<article className="rounded-panel border-border bg-surface flex max-w-3xl flex-col gap-8 border p-6 sm:p-10">
					<Section id="o-que-e" heading="O que é">
						<p>
							O 4People é uma coleção de ferramentas online para tarefas que se repetem no dia a
							dia: gerar e validar CPF e CNPJ para testes, formatar JSON, converter unidades e
							moedas, calcular porcentagens, sub-redes e datas, entre outras. São{' '}
							{toolsPerArea.map((area) => `${area.count} de ${area.name}`).join(' e ')}.
						</p>
						<p>
							Cada ferramenta mostra como faz a conta, com a fórmula e um link para o trecho do
							código que calcula o resultado. A ideia é que você possa conferir, e não só confiar.
						</p>
					</Section>

					<Section id="quem-faz" heading="Quem faz">
						<p>
							O projeto começou em {FOUNDING_YEAR}, como trabalho de escola na Etec de
							Guaratinguetá, feito por {AUTHOR.name} com colegas de turma. Hoje é mantido por{' '}
							{AUTHOR.name}, {AUTHOR.jobTitle.toLowerCase()}. Mais sobre ele em{' '}
							<ExternalLink href={AUTHOR.url}>lucasbittencourt.dev</ExternalLink>.
						</p>
					</Section>

					<Section id="privacidade" heading="Privacidade">
						<p>
							Os cálculos acontecem no seu aparelho: o que você digita não é enviado a nenhum
							servidor do 4People. Não há cadastro, cookies, anúncios nem estatísticas de visitas.
						</p>
						<p>
							Só quatro ferramentas consultam serviços públicos, e elas avisam isso na própria
							página: Buscar CEP e Consulta de Bancos (BrasilAPI), Meu IP (ipify) e Cotação de
							Moedas (AwesomeAPI). O Testador de API REST envia apenas a requisição que você montar.
						</p>
					</Section>

					<Section id="codigo-aberto" heading="Código aberto e gratuito">
						<p>
							Todo o código está no <ExternalLink href={REPOSITORY_URL}>GitHub</ExternalLink>, sob a
							licença GPL-3.0. O 4People é gratuito e não tem plano pago.
						</p>
						<p>
							O site está em versão beta. Encontrou um erro ou quer sugerir uma ferramenta?{' '}
							<ExternalLink href={`${REPOSITORY_URL}/issues/new/choose`}>
								Abra uma issue
							</ExternalLink>
							.
						</p>
					</Section>

					<Link
						href={'/ferramentas' as Route}
						className="bg-primary text-primary-fg hover:bg-primary-hover focus-visible:ring-ring rounded-control inline-flex min-h-12 w-fit items-center px-6 font-semibold outline-none focus-visible:ring-4"
					>
						Ver todas as ferramentas
					</Link>
				</article>
			</main>
			<SiteFooter />
		</div>
	)
}
