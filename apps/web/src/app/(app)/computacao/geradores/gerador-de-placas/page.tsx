// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDePlacas from '@/tools/gerador-de-placas'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/geradores/gerador-de-placas')

export default function Page() {
	return <ToolPage id="computacao/geradores/gerador-de-placas" component={GeradorDePlacas} />
}
