// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeHash from '@/tools/gerador-de-hash'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/geradores/gerador-de-hash')

export default function Page() {
	return <ToolPage id="computacao/geradores/gerador-de-hash" component={GeradorDeHash} />
}
