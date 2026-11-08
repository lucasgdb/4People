import { CATEGORIES, toolsIn } from '@/catalog/catalog'
import { SITE_FAQ, TOOL_CONTENT } from '@/catalog/content'
import { absoluteUrl, REPOSITORY_URL, SITE_DESCRIPTION } from './site'

/** llms.txt (https://llmstxt.org): a Markdown map of the site for language models. */
export function llmsTxt({ full }: { full: boolean }) {
	const lines = [
		'# 4People',
		'',
		`> ${SITE_DESCRIPTION}`,
		'',
		'Todas as ferramentas são gratuitas, não exigem cadastro e calculam no navegador do usuário; documentos gerados (CPF, CNPJ, RG) são válidos apenas matematicamente e servem para testes de software. Idioma: português do Brasil.',
		'',
	]

	for (const category of CATEGORIES) {
		for (const section of category.sections) {
			lines.push(`## ${category.name}: ${section.name}`, '')
			for (const tool of toolsIn(category.slug, section.slug)) {
				lines.push(`- [${tool.name}](${absoluteUrl(tool.href)}): ${tool.description}`)
				const content = TOOL_CONTENT[tool.slug]
				if (full && content) {
					lines.push('', `  ${content.answer}`)
					if ('formula' in tool && tool.formula) lines.push(`  Fórmula: ${tool.formula}`)
					for (const item of content.faq) lines.push(`  - P: ${item.question} R: ${item.answer}`)
					lines.push('')
				}
			}
			lines.push('')
		}
	}

	lines.push('## Perguntas frequentes', '')
	for (const item of SITE_FAQ) lines.push(`- ${item.question} ${item.answer}`)
	lines.push('', '## Opcional', '', `- [Código-fonte (GPL-3.0)](${REPOSITORY_URL})`)
	if (!full)
		lines.push(
			`- [Versão completa com explicações e perguntas de cada ferramenta](${absoluteUrl('/llms-full.txt')})`,
		)

	return `${lines.join('\n')}\n`
}

export const textResponse = (body: string) =>
	new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } })
