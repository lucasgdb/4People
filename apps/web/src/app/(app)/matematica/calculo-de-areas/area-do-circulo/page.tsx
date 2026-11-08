// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import AreaDoCirculo from '@/tools/area-do-circulo'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculo-de-areas/area-do-circulo')

export default function Page() {
	return <ToolPage id="matematica/calculo-de-areas/area-do-circulo" component={AreaDoCirculo} />
}
