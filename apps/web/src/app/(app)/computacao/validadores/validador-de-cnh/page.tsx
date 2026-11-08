// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ValidadorDeCnh from '@/tools/validador-de-cnh'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/validadores/validador-de-cnh')

export default function Page() {
	return <ToolPage id="computacao/validadores/validador-de-cnh" component={ValidadorDeCnh} />
}
