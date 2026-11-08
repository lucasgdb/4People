// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import ComparadorDeTextos from '@/tools/comparador-de-textos'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/desenvolvimento/comparador-de-textos')

export default function Page() {
	return <ToolPage id="computacao/desenvolvimento/comparador-de-textos" component={ComparadorDeTextos} />
}
