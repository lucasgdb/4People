// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ValidadorDeRg from '@/tools/validador-de-rg'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/validadores/validador-de-rg')

export default function Page() {
	return <ToolPage id="computacao/validadores/validador-de-rg" component={ValidadorDeRg} />
}
