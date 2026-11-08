import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { CATEGORIES, TOOLS } from '@/catalog/catalog'

/**
 * The service worker, built once per deploy: the worker code (worker.js) with the build's version,
 * every page and every static file. A new deploy changes VERSION, so browsers install the new
 * worker by themselves and download the updated site in the background.
 */
export const dynamic = 'force-static'

// Build-time only: tell Turbopack not to trace the project for these reads.
const fromWeb = (...parts: string[]) => join(/* turbopackIgnore: true */ process.cwd(), ...parts)

function staticFiles(): string[] {
	try {
		return readdirSync(fromWeb('.next', 'static'), { recursive: true, withFileTypes: true })
			.filter((entry) => entry.isFile() && !entry.name.endsWith('.map'))
			.map(
				(entry) =>
					`/_next/static/${join(entry.parentPath, entry.name).split(`${join('.next', 'static')}/`)[1]}`,
			)
			.filter((path) => !path.includes('undefined'))
	} catch {
		return []
	}
}

const pages = [
	'/',
	'/offline',
	'/ferramentas',
	'/sobre',
	...CATEGORIES.flatMap((category) => [
		`/${category.slug}`,
		...category.sections.map((section) => `/${category.slug}/${section.slug}`),
	]),
	...TOOLS.map((tool) => tool.href),
]

export function GET() {
	const worker = readFileSync(fromWeb('src', 'app', 'sw.js', 'worker.js'), 'utf8')
	const header = [
		`const VERSION = ${JSON.stringify(Date.now().toString(36))}`,
		`const PAGES = ${JSON.stringify(pages)}`,
		`const FILES = ${JSON.stringify(staticFiles())}`,
	].join('\n')
	return new Response(`${header}\n${worker}`, {
		headers: {
			'Content-Type': 'text/javascript; charset=utf-8',
			// The browser must always ask for a new worker; the worker itself caches the site.
			'Cache-Control': 'no-cache',
		},
	})
}
