// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import TestadorDeXpath from '@/tools/testador-de-xpath'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/desenvolvimento/testador-de-xpath')

export default function Page() {
	return <ToolPage id="computacao/desenvolvimento/testador-de-xpath" component={TestadorDeXpath} />
}
