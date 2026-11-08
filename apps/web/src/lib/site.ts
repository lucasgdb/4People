/**
 * Site-wide constants. Keep this module free of `'use client'`: Server Components that import a
 * value from a client module receive a client reference (a function), not the value itself.
 */
import { TOOLS } from '@/catalog/catalog'

export const SITE_NAME = '4People'
export { INDEXNOW_KEY, PRODUCTION_URL } from './urls.ts'

import { PRODUCTION_URL } from './urls.ts'
// A build without NEXT_PUBLIC_SITE_URL is the production one: never fall back to localhost there.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL).replace(/\/$/, '')
export const SITE_DESCRIPTION = `${TOOLS.length} ferramentas online gratuitas para desenvolvimento, estudo e trabalho: gerador e validador de CPF e CNPJ, senhas, UUID, JWT, regex, conversores de JSON, YAML e XML, calculadora de sub-rede, porcentagem, datas, Bhaskara e muito mais. Tudo roda no navegador, sem cadastro.`
export const REPOSITORY_URL = 'https://github.com/lucasgdb/4People'
export const AUTHOR_URL = 'https://lucasbittencourt.dev'
/** 4People's legal documents live with the author's other tools, on lucasbittencourt.dev. */
export const PRIVACY_URL = `${AUTHOR_URL}/pt-br/tool/4people/privacy`
export const TERMS_URL = `${AUTHOR_URL}/pt-br/tool/4people/eula`
export const AUTHOR = {
	name: 'Lucas Bittencourt',
	alternateName: 'lucasgdb',
	jobTitle: 'Engenheiro de Software de IA',
	url: AUTHOR_URL,
	github: 'https://github.com/lucasgdb',
	linkedin: 'https://www.linkedin.com/in/lucas-bittencourt',
} as const

/** The project's first version, a school project at Etec de Guaratinguetá. */
export const FOUNDING_YEAR = '2019'
export const LICENSE_URL = 'https://www.gnu.org/licenses/gpl-3.0.html'

export const absoluteUrl = (path = '/') => `${SITE_URL}${path === '/' ? '' : path}`
