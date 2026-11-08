// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ValidadorDeTituloDeEleitor from '@/tools/validador-de-titulo-de-eleitor'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/validadores/validador-de-titulo-de-eleitor')

export default function Page() {
	return <ToolPage id="computacao/validadores/validador-de-titulo-de-eleitor" component={ValidadorDeTituloDeEleitor} />
}
