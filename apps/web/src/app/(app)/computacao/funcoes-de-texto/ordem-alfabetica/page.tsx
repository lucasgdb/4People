// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import OrdemAlfabetica from '@/tools/ordem-alfabetica'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/funcoes-de-texto/ordem-alfabetica')

export default function Page() {
	return <ToolPage id="computacao/funcoes-de-texto/ordem-alfabetica" component={OrdemAlfabetica} />
}
