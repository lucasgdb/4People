// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import InformacoesDeCaractere from '@/tools/informacoes-de-caractere'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/funcoes-de-texto/informacoes-de-caractere')

export default function Page() {
	return <ToolPage id="computacao/funcoes-de-texto/informacoes-de-caractere" component={InformacoesDeCaractere} />
}
