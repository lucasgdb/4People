// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import AreaDoQuadrado from '@/tools/area-do-quadrado'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculo-de-areas/area-do-quadrado')

export default function Page() {
	return <ToolPage id="matematica/calculo-de-areas/area-do-quadrado" component={AreaDoQuadrado} />
}
