import type { MetadataRoute } from 'next'
import { POPULAR_TOOLS, TOOLS } from '@/catalog/catalog'
import { SITE_DESCRIPTION } from '@/lib/site'

const SHORTCUT_ICON = [{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }]

/**
 * Web app manifest, complete enough for the richer install dialog (screenshots for wide and narrow
 * screens) and for packaging as a Trusted Web Activity for the Play Store (id, scope, maskable icons,
 * shortcuts). The Android side also needs /.well-known/assetlinks.json (see that route).
 */
export default function manifest(): MetadataRoute.Manifest {
	return {
		id: '/',
		name: '4People: ferramentas online gratuitas',
		short_name: '4People',
		description: SITE_DESCRIPTION,
		lang: 'pt-BR',
		dir: 'ltr',
		start_url: '/?origem=app',
		scope: '/',
		display: 'standalone',
		display_override: ['standalone', 'minimal-ui'],
		orientation: 'any',
		background_color: '#f3f5fa',
		theme_color: '#ffffff',
		categories: ['utilities', 'productivity', 'education', 'developer tools'],
		prefer_related_applications: false,
		launch_handler: { client_mode: ['navigate-existing', 'auto'] },
		icons: [
			{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
			{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
			{ src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
			{
				src: '/icons/icon-maskable-192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/icons/icon-maskable-512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
		screenshots: [
			{
				src: '/screenshots/wide-home.png',
				sizes: '1280x800',
				type: 'image/png',
				form_factor: 'wide',
				label: `Página inicial com as ${TOOLS.length} ferramentas por assunto`,
			},
			{
				src: '/screenshots/wide-cpf.png',
				sizes: '1280x800',
				type: 'image/png',
				form_factor: 'wide',
				label: 'Gerador de CPF: escolha o formato, o estado e quantos gerar',
			},
			{
				src: '/screenshots/narrow-cpf.png',
				sizes: '1080x1920',
				type: 'image/png',
				form_factor: 'narrow',
				label: 'Gerador de CPF no celular',
			},
			{
				src: '/screenshots/narrow-porcentagem.png',
				sizes: '1080x1920',
				type: 'image/png',
				form_factor: 'narrow',
				label: 'Calculadoras de porcentagem que respondem enquanto você digita',
			},
			{
				src: '/screenshots/narrow-home.png',
				sizes: '1080x1920',
				type: 'image/png',
				form_factor: 'narrow',
				label: 'Página inicial no celular',
			},
		],
		shortcuts: POPULAR_TOOLS.slice(0, 4).map((tool) => ({
			name: tool.name,
			short_name: tool.name.replace(/^(Gerador|Validador) de /, ''),
			description: tool.description,
			url: `${tool.href}?origem=atalho`,
			icons: SHORTCUT_ICON,
		})),
	}
}
