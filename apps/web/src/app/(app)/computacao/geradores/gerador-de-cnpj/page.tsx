// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDeCnpj from '@/tools/gerador-de-cnpj'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/geradores/gerador-de-cnpj')

export default function Page() {
	return <ToolPage id="computacao/geradores/gerador-de-cnpj" component={GeradorDeCnpj} />
}
