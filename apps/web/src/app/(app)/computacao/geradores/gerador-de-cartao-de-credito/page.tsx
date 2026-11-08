// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeCartaoDeCredito from '@/tools/gerador-de-cartao-de-credito'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/geradores/gerador-de-cartao-de-credito')

export default function Page() {
	return <ToolPage id="computacao/geradores/gerador-de-cartao-de-credito" component={GeradorDeCartaoDeCredito} />
}
