import type { MetadataRoute } from 'next'
import { CATEGORIES, TOOLS } from '@/catalog/catalog'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date()
	return [
		{ url: absoluteUrl('/'), lastModified, changeFrequency: 'monthly', priority: 1 },
		{ url: absoluteUrl('/ferramentas'), lastModified, changeFrequency: 'monthly', priority: 0.9 },
		...CATEGORIES.flatMap((category) => [
			{
				url: absoluteUrl(`/${category.slug}`),
				lastModified,
				changeFrequency: 'monthly' as const,
				priority: 0.8,
			},
			...category.sections.map((section) => ({
				url: absoluteUrl(`/${category.slug}/${section.slug}`),
				lastModified,
				changeFrequency: 'monthly' as const,
				priority: 0.6,
			})),
		]),
		...TOOLS.map((tool) => ({
			url: absoluteUrl(tool.href),
			lastModified,
			changeFrequency: 'monthly' as const,
			priority: 0.9,
		})),
	]
}
