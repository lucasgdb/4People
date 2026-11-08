// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ValidadorDePis from '@/tools/validador-de-pis'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/validadores/validador-de-pis')

export default function Page() {
	return <ToolPage id="computacao/validadores/validador-de-pis" component={ValidadorDePis} />
}
