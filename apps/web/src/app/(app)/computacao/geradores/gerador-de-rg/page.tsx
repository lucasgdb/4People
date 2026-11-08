// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeRg from '@/tools/gerador-de-rg'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/geradores/gerador-de-rg')

export default function Page() {
	return <ToolPage id="computacao/geradores/gerador-de-rg" component={GeradorDeRg} />
}
