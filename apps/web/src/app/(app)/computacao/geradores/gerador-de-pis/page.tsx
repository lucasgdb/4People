// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDePis from '@/tools/gerador-de-pis'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/geradores/gerador-de-pis')

export default function Page() {
	return <ToolPage id="computacao/geradores/gerador-de-pis" component={GeradorDePis} />
}
