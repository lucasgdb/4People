// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import AvaliadorDeJsonpath from '@/tools/avaliador-de-jsonpath'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('computacao/desenvolvimento/avaliador-de-jsonpath')

export default function Page() {
	return <ToolPage id="computacao/desenvolvimento/avaliador-de-jsonpath" component={AvaliadorDeJsonpath} />
}
