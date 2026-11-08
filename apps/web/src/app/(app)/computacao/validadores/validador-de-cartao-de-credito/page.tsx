// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ValidadorDeCartaoDeCredito from '@/tools/validador-de-cartao-de-credito'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/validadores/validador-de-cartao-de-credito')

export default function Page() {
	return <ToolPage id="computacao/validadores/validador-de-cartao-de-credito" component={ValidadorDeCartaoDeCredito} />
}
