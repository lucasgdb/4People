// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import FrequenciaDePalavras from '@/tools/frequencia-de-palavras'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/funcoes-de-texto/frequencia-de-palavras')

export default function Page() {
	return <ToolPage id="computacao/funcoes-de-texto/frequencia-de-palavras" component={FrequenciaDePalavras} />
}
