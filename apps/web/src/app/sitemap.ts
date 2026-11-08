import type { MetadataRoute } from 'next'
import { CATEGORIES, TOOLS } from '@/catalog/catalog'
import { TOOL_CONTENT } from '@/catalog/content'
import { absoluteUrl } from '@/lib/site'

type Entry = MetadataRoute.Sitemap[number]

/**
 * lastmod is the date the content really changed (each tool's `updatedAt`); a listing takes its
 * newest tool. No changefreq/priority: search engines ignore them.
 */
const updatedAt = (slug: string) => TOOL_CONTENT[slug]?.updatedAt

function newest(dates: (string | undefined)[]) {
	const known = dates.filter((date): date is string => Boolean(date)).sort()
	return known.at(-1)
}

function entry(path: string, lastModified: string | undefined): Entry {
	return lastModified ? { url: absoluteUrl(path), lastModified } : { url: absoluteUrl(path) }
}

export default function sitemap(): MetadataRoute.Sitemap {
	const siteUpdatedAt = newest(TOOLS.map((tool) => updatedAt(tool.slug)))

	return [
		entry('/', siteUpdatedAt),
		entry('/ferramentas', siteUpdatedAt),
		entry('/sobre', siteUpdatedAt),
		...CATEGORIES.flatMap((category) => {
			const areaTools = TOOLS.filter((tool) => tool.category.slug === category.slug)
			return [
				entry(`/${category.slug}`, newest(areaTools.map((tool) => updatedAt(tool.slug)))),
				...category.sections.map((section) => {
					const topicTools = areaTools.filter((tool) => tool.section.slug === section.slug)
					return entry(
						`/${category.slug}/${section.slug}`,
						newest(topicTools.map((tool) => updatedAt(tool.slug))),
					)
				}),
			]
		}),
		...TOOLS.map((tool) => entry(tool.href, updatedAt(tool.slug))),
	]
}
