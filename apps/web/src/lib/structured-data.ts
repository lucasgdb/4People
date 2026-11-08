import type { Faq } from '@/catalog/content'
import { AUTHOR, absoluteUrl, REPOSITORY_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './site'

const PUBLISHER_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

export const websiteSchema = () => ({
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'WebSite',
			'@id': WEBSITE_ID,
			url: absoluteUrl('/'),
			name: SITE_NAME,
			description: SITE_DESCRIPTION,
			inLanguage: 'pt-BR',
			publisher: { '@id': PUBLISHER_ID },
		},
		{
			'@type': 'Person',
			'@id': PUBLISHER_ID,
			name: AUTHOR.name,
			url: AUTHOR.url,
			sameAs: [AUTHOR.github, REPOSITORY_URL],
		},
	],
})

export type Crumb = { name: string; path: string }

export const breadcrumbSchema = (crumbs: Crumb[]) => ({
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	itemListElement: crumbs.map((crumb, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		name: crumb.name,
		item: absoluteUrl(crumb.path),
	})),
})

export const faqSchema = (faq: Faq[]) => ({
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: faq.map((item) => ({
		'@type': 'Question',
		name: item.question,
		acceptedAnswer: { '@type': 'Answer', text: item.answer },
	})),
})

export const toolSchema = (tool: {
	name: string
	description: string
	path: string
	answer: string
}) => ({
	'@context': 'https://schema.org',
	'@type': 'WebApplication',
	name: tool.name,
	url: absoluteUrl(tool.path),
	description: tool.answer,
	abstract: tool.description,
	applicationCategory: 'UtilitiesApplication',
	operatingSystem: 'Qualquer navegador moderno',
	browserRequirements: 'Requer JavaScript.',
	inLanguage: 'pt-BR',
	isAccessibleForFree: true,
	offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
	isPartOf: { '@id': WEBSITE_ID },
	author: { '@id': PUBLISHER_ID },
})

export const itemListSchema = (name: string, items: { name: string; path: string }[]) => ({
	'@context': 'https://schema.org',
	'@type': 'ItemList',
	name,
	numberOfItems: items.length,
	itemListElement: items.map((item, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		name: item.name,
		url: absoluteUrl(item.path),
	})),
})
