// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeCep from '@/tools/gerador-de-cep'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/geradores/gerador-de-cep')

export default function Page() {
	return <ToolPage id="computacao/geradores/gerador-de-cep" component={GeradorDeCep} />
}
