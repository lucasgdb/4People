import { getTool, TOOLS } from '@/catalog/catalog'
import { ToolIcon } from '@/components/tool-icons'
import { renderOg } from '@/lib/og'

/** Open Graph image of each tool, prerendered at build time: /og/<categoria>/<seção>/<ferramenta>. */
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
	return TOOLS.map((tool) => ({
		category: tool.category.slug,
		section: tool.section.slug,
		tool: tool.slug,
	}))
}

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ category: string; section: string; tool: string }> },
) {
	const { category, section, tool: slug } = await params
	const tool = getTool(category, section, slug)
	if (!tool) return new Response('Not found', { status: 404 })
	return renderOg({
		title: tool.name,
		subtitle: tool.description,
		icon: <ToolIcon slug={tool.slug} size={120} />,
	})
}
