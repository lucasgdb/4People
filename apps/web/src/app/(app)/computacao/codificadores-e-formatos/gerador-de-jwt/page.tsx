// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeJwt from '@/tools/gerador-de-jwt'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/codificadores-e-formatos/gerador-de-jwt')

export default function Page() {
	return <ToolPage id="computacao/codificadores-e-formatos/gerador-de-jwt" component={GeradorDeJwt} />
}
