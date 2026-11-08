import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import type { ReactNode } from 'react'
import { JsonLd } from '@/components/json-ld'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'
import { websiteSchema } from '@/lib/structured-data'
import { Providers } from './providers'
import './globals.css'

// Self-hosted at build time by next/font: no request to Google at runtime.
const jakarta = Plus_Jakarta_Sans({
	subsets: ['latin'],
	variable: '--font-jakarta',
	display: 'swap',
})
// One job: generated codes (passwords, binary, HTML) where l/I/1 and O/0 must read apart.
const mono = JetBrains_Mono({
	subsets: ['latin'],
	weight: '500',
	variable: '--font-jetbrains-mono',
	display: 'swap',
	preload: false,
})

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: { default: `${SITE_NAME}: ferramentas online gratuitas`, template: `%s | ${SITE_NAME}` },
	description: SITE_DESCRIPTION,
	applicationName: SITE_NAME,
	authors: [{ name: 'Lucas Bittencourt', url: 'https://lucasbittencourt.dev' }],
	creator: 'Lucas Bittencourt',
	keywords: [
		'gerador de cpf',
		'validador de cpf',
		'gerador de cnpj',
		'buscar cep',
		'calculadora de porcentagem',
		'bhaskara',
		'mmc',
		'mdc',
		'ferramentas online',
		'4devs',
	],
	alternates: { canonical: '/' },
	openGraph: { type: 'website', siteName: SITE_NAME, locale: 'pt_BR', url: '/' },
	twitter: { card: 'summary_large_image' },
	robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
	formatDetection: { telephone: false, email: false, address: false },
	appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: 'default' },
}

export const viewport: Viewport = {
	themeColor: '#ffffff',
	colorScheme: 'light',
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="pt-BR" className={`${jakarta.variable} ${mono.variable}`}>
			<body className="min-h-dvh">
				<a
					href="#conteudo"
					className="rounded-control bg-primary text-primary-fg fixed top-2 left-2 z-[200] -translate-y-20 px-4 py-2.5 text-sm font-semibold transition-transform focus-visible:translate-y-0"
				>
					Pular para o conteúdo
				</a>
				<JsonLd data={websiteSchema()} />
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
