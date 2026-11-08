// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import VisualizadorDeSvg from '@/tools/visualizador-de-svg'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/desenvolvimento/visualizador-de-svg')

export default function Page() {
	return <ToolPage id="computacao/desenvolvimento/visualizador-de-svg" component={VisualizadorDeSvg} />
}
