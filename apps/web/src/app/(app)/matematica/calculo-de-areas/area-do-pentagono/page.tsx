// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import AreaDoPentagono from '@/tools/area-do-pentagono'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculo-de-areas/area-do-pentagono')

export default function Page() {
	return <ToolPage id="matematica/calculo-de-areas/area-do-pentagono" component={AreaDoPentagono} />
}
