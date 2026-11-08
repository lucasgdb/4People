export type Faq = { question: string; answer: string }

export type HowTo = {
	/** Section heading, e.g. "Como calcular a porcentagem de um valor". */
	title: string
	steps: string[]
	/** A worked example with real numbers. */
	example?: string
	/** Official source of the rule (Receita Federal, OMS, Banco Central, RFC…). */
	source?: { label: string; url: string }
}

export type ToolContent = {
	/** Direct answer: what the tool does and how it computes. */
	answer: string
	faq: Faq[]
	/** <title> without the site name; defaults to "<name> online e grátis". */
	title?: string
	/** Meta description (120–155 characters); defaults to the catalog description. */
	metaDescription?: string
	howTo?: HowTo
	/** ISO date (yyyy-mm-dd) of the last content or behaviour change. */
	updatedAt?: string
}

export type SectionContent = {
	/** Introduction of the topic page, one string per paragraph. */
	intro: string[]
	tools: Record<string, ToolContent>
}
