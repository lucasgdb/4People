// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeNomes from '@/tools/gerador-de-nomes'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/geradores/gerador-de-nomes')

export default function Page() {
	return <ToolPage id="computacao/geradores/gerador-de-nomes" component={GeradorDeNomes} />
}
