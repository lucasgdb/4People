import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Finds where a tool's calculation lives, for the "Ver o código" link. Runs at build time: reads the
 * tool's screen, takes the first function it imports from `src/lib/algorithms/`, and finds the line
 * where that function is declared. Tools without an algorithm of their own link to their screen.
 */

const WEB_ROOT = 'apps/web'

type AlgorithmImport = { module: string; functionName: string }

/** Screens that reach their algorithm through a shared component instead of a direct import. */
const IMPORTED_THROUGH_SHARED_SCREEN: Record<string, AlgorithmImport> = {
	'somar-em-data': { module: 'dates', functionName: 'shiftDate' },
	'subtrair-em-data': { module: 'dates', functionName: 'shiftDate' },
}

const LAZY_IMPORT = /\{([^{}]*)\}\s*=\s*await\s+import\(\s*'@\/lib\/algorithms\/([\w-]+)'/
const STATIC_IMPORT = /import\s*\{([^}]*)\}\s*from\s*'@\/lib\/algorithms\/([\w-]+)'/

export type ToolSource = { path: string; line?: number; file: string }

function readProjectFile(path: string) {
	// turbopackIgnore: a build-time read, so Turbopack shouldn't trace the whole project.
	return readFileSync(join(/* turbopackIgnore: true */ process.cwd(), path), 'utf8')
}

function firstImportedFunction(importList: string) {
	return (
		importList
			.split(',')
			.map((name) => name.trim())
			.filter((name) => name && !name.startsWith('type '))
			.map((name) => name.split(/\s+as\s+/)[0] ?? name)[0] ?? ''
	)
}

function findAlgorithmImport(slug: string, screenCode: string): AlgorithmImport | undefined {
	const viaSharedScreen = IMPORTED_THROUGH_SHARED_SCREEN[slug]
	if (viaSharedScreen) return viaSharedScreen

	// A lazy import is the tool's main (heavy) algorithm, so it wins over static imports.
	const match = screenCode.match(LAZY_IMPORT) ?? screenCode.match(STATIC_IMPORT)
	const [, importList = '', module] = match ?? []
	if (!module) return undefined
	return { module, functionName: firstImportedFunction(importList) }
}

/** Line index of the declaration, or of the object member the screen uses (`areas.circle`). */
function findDeclarationIndex(lines: string[], functionName: string, screenCode: string) {
	if (!functionName) return -1

	const declaration = new RegExp(
		`^export\\s+(?:async\\s+)?(?:function\\*?|const|let)\\s+${functionName}\\b`,
	)
	const declarationIndex = lines.findIndex((line) => declaration.test(line))
	if (declarationIndex < 0) return -1

	const usedMember = screenCode.match(new RegExp(`\\b${functionName}\\.(\\w+)`))?.[1]
	if (!usedMember) return declarationIndex

	const memberIndex = lines.findIndex(
		(line, index) => index > declarationIndex && new RegExp(`^\\s+${usedMember}:`).test(line),
	)
	return memberIndex >= 0 ? memberIndex : declarationIndex
}

export function toolSource(slug: string): ToolSource {
	const screenPath = `src/tools/${slug}.tsx`
	const screenCode = readProjectFile(screenPath)

	const algorithm = findAlgorithmImport(slug, screenCode)
	if (!algorithm) return { path: `${WEB_ROOT}/${screenPath}`, file: `${slug}.tsx` }

	const algorithmPath = `src/lib/algorithms/${algorithm.module}.ts`
	const lines = readProjectFile(algorithmPath).split('\n')
	const index = findDeclarationIndex(lines, algorithm.functionName, screenCode)

	return {
		path: `${WEB_ROOT}/${algorithmPath}`,
		line: index >= 0 ? index + 1 : undefined,
		file: `${algorithm.module}.ts`,
	}
}
