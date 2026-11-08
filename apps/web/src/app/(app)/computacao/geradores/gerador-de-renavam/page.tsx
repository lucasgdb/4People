// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeRenavam from '@/tools/gerador-de-renavam'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/geradores/gerador-de-renavam')

export default function Page() {
	return <ToolPage id="computacao/geradores/gerador-de-renavam" component={GeradorDeRenavam} />
}
