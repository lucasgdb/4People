import type { Faq } from '@/catalog/content'
import {
	AUTHOR,
	absoluteUrl,
	FOUNDING_YEAR,
	LICENSE_URL,
	REPOSITORY_URL,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL,
} from './site'

/** The same @id lucasbittencourt.dev uses, so both sites describe one person. */
const PERSON_ID = `${AUTHOR.url}/#person`
const ORGANIZATION_ID = `${SITE_URL}/#organization`
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
			publisher: { '@id': ORGANIZATION_ID },
		},
		{
			'@type': 'Organization',
			'@id': ORGANIZATION_ID,
			name: SITE_NAME,
			url: absoluteUrl('/'),
			logo: absoluteUrl('/icons/icon-512.png'),
			description: SITE_DESCRIPTION,
			foundingDate: FOUNDING_YEAR,
			founder: { '@id': PERSON_ID },
			sameAs: [REPOSITORY_URL],
		},
		{
			'@type': 'Person',
			'@id': PERSON_ID,
			name: AUTHOR.name,
			alternateName: AUTHOR.alternateName,
			jobTitle: AUTHOR.jobTitle,
			url: AUTHOR.url,
			sameAs: [AUTHOR.github, AUTHOR.linkedin],
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

export type ApplicationCategory =
	| 'DeveloperApplication'
	| 'EducationalApplication'
	| 'FinanceApplication'
	| 'HealthApplication'
	| 'UtilitiesApplication'

export const toolSchema = (tool: {
	name: string
	description: string
	path: string
	answer: string
	image: string
	category: ApplicationCategory
	dateModified?: string
}) => ({
	'@context': 'https://schema.org',
	'@type': 'WebApplication',
	name: tool.name,
	url: absoluteUrl(tool.path),
	description: tool.answer,
	abstract: tool.description,
	image: absoluteUrl(tool.image),
	applicationCategory: tool.category,
	operatingSystem: 'Qualquer navegador moderno',
	browserRequirements: 'Requer JavaScript.',
	inLanguage: 'pt-BR',
	isAccessibleForFree: true,
	license: LICENSE_URL,
	offers: {
		'@type': 'Offer',
		price: '0',
		priceCurrency: 'BRL',
		availability: 'https://schema.org/InStock',
	},
	...(tool.dateModified ? { dateModified: tool.dateModified } : {}),
	isPartOf: { '@id': WEBSITE_ID },
	author: { '@id': PERSON_ID },
	publisher: { '@id': ORGANIZATION_ID },
})

const itemList = (name: string, items: { name: string; path: string }[]) => ({
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

/** A listing page (all tools, an area, a topic) with its tools as the main entity. */
export const collectionPageSchema = (page: {
	name: string
	description: string
	path: string
	items: { name: string; path: string }[]
}) => ({
	'@context': 'https://schema.org',
	'@type': 'CollectionPage',
	name: page.name,
	description: page.description,
	url: absoluteUrl(page.path),
	inLanguage: 'pt-BR',
	isPartOf: { '@id': WEBSITE_ID },
	mainEntity: itemList(page.name, page.items),
})
