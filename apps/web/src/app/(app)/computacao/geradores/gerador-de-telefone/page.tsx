// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeTelefone from '@/tools/gerador-de-telefone'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/geradores/gerador-de-telefone')

export default function Page() {
	return <ToolPage id="computacao/geradores/gerador-de-telefone" component={GeradorDeTelefone} />
}
