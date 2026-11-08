import { llmsTxt, textResponse } from '@/lib/llms'

export const dynamic = 'force-static'

export function GET() {
	return textResponse(llmsTxt({ full: false }))
}
