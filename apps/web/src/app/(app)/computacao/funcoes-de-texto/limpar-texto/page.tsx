// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import LimparTexto from '@/tools/limpar-texto'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/funcoes-de-texto/limpar-texto')

export default function Page() {
	return <ToolPage id="computacao/funcoes-de-texto/limpar-texto" component={LimparTexto} />
}
