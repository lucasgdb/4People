// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ValidadorDeRenavam from '@/tools/validador-de-renavam'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/validadores/validador-de-renavam')

export default function Page() {
	return <ToolPage id="computacao/validadores/validador-de-renavam" component={ValidadorDeRenavam} />
}
