/**
 * Writes one static route file per category, section and tool from the catalog, so each tool is its
 * own Next.js page (own HTML, metadata and JS bundle) without hand-maintaining 55 near-identical files.
 *
 *   pnpm gen:routes          write/update the files
 *   pnpm gen:routes --check  exit 1 if any file is missing or stale (run by `pnpm test`)
 */
import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	rmdirSync,
	rmSync,
	writeFileSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { CATEGORIES, TOOLS } from '../src/catalog/catalog.ts'

const APP = join(import.meta.dirname, '../src/app/(app)')
const TOOLS_DIR = join(import.meta.dirname, '../src/tools')
/** gerador-de-cpf → GeradorDeCpf */
const componentName = (slug: string) =>
	slug.replace(/(^|-)(\w)/g, (_, __, char: string) => char.toUpperCase())
const HEADER = '// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.\n'
const check = process.argv.includes('--check')

const files = new Map<string, string>()

for (const category of CATEGORIES) {
	files.set(
		join(APP, category.slug, 'page.tsx'),
		`${HEADER}import { CategoryPage, categoryMetadata } from '@/catalog/listing-pages'

export const metadata = categoryMetadata('${category.slug}')

export default function Page() {
	return <CategoryPage slug="${category.slug}" />
}
`,
	)
	for (const section of category.sections) {
		files.set(
			join(APP, category.slug, section.slug, 'page.tsx'),
			`${HEADER}import { SectionPage, sectionMetadata } from '@/catalog/listing-pages'

export const metadata = sectionMetadata('${category.slug}', '${section.slug}')

export default function Page() {
	return <SectionPage category="${category.slug}" section="${section.slug}" />
}
`,
		)
	}
}

for (const tool of TOOLS) {
	// Convention: each tool lives in src/tools/<slug>.tsx with a default export.
	if (!existsSync(join(TOOLS_DIR, `${tool.slug}.tsx`))) {
		throw new Error(`Ferramenta sem componente: crie src/tools/${tool.slug}.tsx (${tool.id})`)
	}
	const name = componentName(tool.slug)
	files.set(
		join(APP, tool.category.slug, tool.section.slug, tool.slug, 'page.tsx'),
		`${HEADER}import ${name} from '@/tools/${tool.slug}'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('${tool.id}')

export default function Page() {
	return <ToolPage id="${tool.id}" component={${name}} />
}
`,
	)
}

const stale: string[] = []
for (const [file, content] of files) {
	const current = existsSync(file) ? readFileSync(file, 'utf8') : null
	if (current === content) continue
	stale.push(file.slice(APP.length + 1))
	if (!check) {
		mkdirSync(dirname(file), { recursive: true })
		writeFileSync(file, content)
	}
}

// Generated routes whose tool, section or category left the catalog. Only files carrying HEADER are
// touched, so a hand-written page in the same tree is never deleted.
const orphans = readdirSync(APP, { recursive: true, encoding: 'utf8' })
	.filter((file) => file.endsWith('page.tsx'))
	.map((file) => join(APP, file))
	.filter((file) => !files.has(file) && readFileSync(file, 'utf8').startsWith(HEADER))
for (const file of orphans) {
	stale.push(`${file.slice(APP.length + 1)} (órfã)`)
	if (check) continue
	rmSync(file)
	// Remove now-empty folders up to the route group.
	for (let dir = dirname(file); dir !== APP && readdirSync(dir).length === 0; dir = dirname(dir))
		rmdirSync(dir)
}

if (check && stale.length > 0) {
	console.error(
		`Rotas desatualizadas (rode pnpm gen:routes):\n${stale.map((f) => `  - ${f}`).join('\n')}`,
	)
	process.exit(1)
}
console.log(
	check ? `${files.size} rotas em dia.` : `${stale.length} de ${files.size} rotas escritas.`,
)
