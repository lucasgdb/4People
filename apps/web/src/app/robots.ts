import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'

/** Everything is public; answer engines are welcome to read and cite the tools (GEO). */
const AI_CRAWLERS = [
	'GPTBot',
	'OAI-SearchBot',
	'ChatGPT-User',
	'ClaudeBot',
	'Claude-SearchBot',
	'Claude-User',
	'PerplexityBot',
	'Perplexity-User',
	'Google-Extended',
	'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{ userAgent: '*', allow: '/' },
			...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
		],
		sitemap: absoluteUrl('/sitemap.xml'),
		host: absoluteUrl('/'),
	}
}
