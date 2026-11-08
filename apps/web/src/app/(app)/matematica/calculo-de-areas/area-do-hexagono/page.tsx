// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import AreaDoHexagono from '@/tools/area-do-hexagono'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculo-de-areas/area-do-hexagono')

export default function Page() {
	return <ToolPage id="matematica/calculo-de-areas/area-do-hexagono" component={AreaDoHexagono} />
}
