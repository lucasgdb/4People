// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeCnh from '@/tools/gerador-de-cnh'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/geradores/gerador-de-cnh')

export default function Page() {
	return <ToolPage id="computacao/geradores/gerador-de-cnh" component={GeradorDeCnh} />
}
