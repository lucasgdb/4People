// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import CodificadorDeHtml from '@/tools/codificador-de-html'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/desenvolvimento/codificador-de-html')

export default function Page() {
	return <ToolPage id="computacao/desenvolvimento/codificador-de-html" component={CodificadorDeHtml} />
}
