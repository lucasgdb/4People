// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import AreaDoParalelogramo from '@/tools/area-do-paralelogramo'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculo-de-areas/area-do-paralelogramo')

export default function Page() {
	return <ToolPage id="matematica/calculo-de-areas/area-do-paralelogramo" component={AreaDoParalelogramo} />
}
