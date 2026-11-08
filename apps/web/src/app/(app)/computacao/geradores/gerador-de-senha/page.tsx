// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeSenha from '@/tools/gerador-de-senha'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/geradores/gerador-de-senha')

export default function Page() {
	return <ToolPage id="computacao/geradores/gerador-de-senha" component={GeradorDeSenha} />
}
