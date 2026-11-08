// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeTituloDeEleitor from '@/tools/gerador-de-titulo-de-eleitor'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/geradores/gerador-de-titulo-de-eleitor')

export default function Page() {
	return <ToolPage id="computacao/geradores/gerador-de-titulo-de-eleitor" component={GeradorDeTituloDeEleitor} />
}
