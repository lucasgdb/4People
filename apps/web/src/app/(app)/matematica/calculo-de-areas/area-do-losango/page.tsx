// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import AreaDoLosango from '@/tools/area-do-losango'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculo-de-areas/area-do-losango')

export default function Page() {
	return <ToolPage id="matematica/calculo-de-areas/area-do-losango" component={AreaDoLosango} />
}
