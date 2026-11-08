/**
 * Site-wide constants. Keep this module free of `'use client'`: Server Components that import a
 * value from a client module receive a client reference (a function), not the value itself.
 */
import { TOOLS } from '@/catalog/catalog'

export const SITE_NAME = '4People'
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
	/\/$/,
	'',
)
export const SITE_DESCRIPTION = `${TOOLS.length} ferramentas online gratuitas para desenvolvimento, estudo e trabalho: gerador e validador de CPF e CNPJ, senhas, UUID, JWT, regex, conversores de JSON, YAML e XML, calculadora de sub-rede, porcentagem, datas, Bhaskara e muito mais. Tudo roda no navegador, sem cadastro.`
export const REPOSITORY_URL = 'https://github.com/lucasgdb/4People'
export const AUTHOR_URL = 'https://lucasbittencourt.dev'
export const AUTHOR = {
	name: 'Lucas Bittencourt',
	url: AUTHOR_URL,
	github: 'https://github.com/lucasgdb',
} as const

export const absoluteUrl = (path = '/') => `${SITE_URL}${path === '/' ? '' : path}`
