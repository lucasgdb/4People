// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import TestadorDeRegex from '@/tools/testador-de-regex'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/desenvolvimento/testador-de-regex')

export default function Page() {
	return <ToolPage id="computacao/desenvolvimento/testador-de-regex" component={TestadorDeRegex} />
}
