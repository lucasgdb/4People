// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import EscapeDeString from '@/tools/escape-de-string'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/desenvolvimento/escape-de-string')

export default function Page() {
	return <ToolPage id="computacao/desenvolvimento/escape-de-string" component={EscapeDeString} />
}
