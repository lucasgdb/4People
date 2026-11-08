import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Where a tool's calculation lives, for the "ver o código" link. Runs only at build time (the tool
 * pages are static), reading the tool's screen to find the algorithm it imports from
 * `src/lib/algorithms/`, and the line where the first imported function is declared.
 * Tools with no algorithm of their own (API lookups, keyboard events) link to their screen.
 */

const WEB_ROOT = 'apps/web'

/** Tools whose algorithm comes in through a shared screen instead of a direct import. */
const VIA_SHARED: Record<string, { module: string; name: string }> = {
	'somar-em-data': { module: 'dates', name: 'shiftDate' },
	'subtrair-em-data': { module: 'dates', name: 'shiftDate' },
}

/** `const { a } = await import('@/lib/algorithms/x')`: lazy-loaded, so it is the tool's main algorithm. */
const LAZY_IMPORT = /\{([^{}]*)\}\s*=\s*await\s+import\(\s*'@\/lib\/algorithms\/([\w-]+)'/
const IMPORT = /import\s*\{([^}]*)\}\s*from\s*'@\/lib\/algorithms\/([\w-]+)'/

export type ToolSource = { path: string; line?: number; file: string }

export function toolSource(slug: string): ToolSource {
	const screen = `src/tools/${slug}.tsx`
	// Build-time only (static pages): tell Turbopack not to trace the whole project for this read.
	const read = (path: string) =>
		readFileSync(join(/* turbopackIgnore: true */ process.cwd(), path), 'utf8')

	const code = read(screen)
	let found = VIA_SHARED[slug]
	if (!found) {
		const match = code.match(LAZY_IMPORT) ?? code.match(IMPORT)
		if (match?.[2]) {
			const names = (match[1] ?? '')
				.split(',')
				.map((name) => name.trim())
				.filter((name) => name && !name.startsWith('type '))
				.map((name) => name.split(/\s+as\s+/)[0] ?? name)
			found = { module: match[2], name: names[0] ?? '' }
		}
	}
	if (!found) return { path: `${WEB_ROOT}/${screen}`, file: `${slug}.tsx` }

	const algorithm = `src/lib/algorithms/${found.module}.ts`
	const declaration = new RegExp(
		`^export\\s+(?:async\\s+)?(?:function\\*?|const|let)\\s+${found.name}\\b`,
	)
	const lines = read(algorithm).split('\n')
	let index = found.name ? lines.findIndex((line) => declaration.test(line)) : -1
	// An object of formulas (`areas.circleByRadius(…)`): point at the member the screen uses.
	const member = found.name ? code.match(new RegExp(`\\b${found.name}\\.(\\w+)`))?.[1] : undefined
	if (member && index >= 0) {
		const memberLine = lines.findIndex(
			(line, i) => i > index && new RegExp(`^\\s+${member}:`).test(line),
		)
		if (memberLine >= 0) index = memberLine
	}
	return {
		path: `${WEB_ROOT}/${algorithm}`,
		line: index >= 0 ? index + 1 : undefined,
		file: `${found.module}.ts`,
	}
}
