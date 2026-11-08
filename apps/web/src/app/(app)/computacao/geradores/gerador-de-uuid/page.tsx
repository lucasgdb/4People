// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeUuid from '@/tools/gerador-de-uuid'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/geradores/gerador-de-uuid')

export default function Page() {
	return <ToolPage id="computacao/geradores/gerador-de-uuid" component={GeradorDeUuid} />
}
