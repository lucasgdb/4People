// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import GeradorDePessoas from '@/tools/gerador-de-pessoas'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/geradores/gerador-de-pessoas')

export default function Page() {
	return <ToolPage id="computacao/geradores/gerador-de-pessoas" component={GeradorDePessoas} />
}
