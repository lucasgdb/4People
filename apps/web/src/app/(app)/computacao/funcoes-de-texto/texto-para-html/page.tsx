// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import TextoParaHtml from '@/tools/texto-para-html'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/funcoes-de-texto/texto-para-html')

export default function Page() {
	return <ToolPage id="computacao/funcoes-de-texto/texto-para-html" component={TextoParaHtml} />
}
