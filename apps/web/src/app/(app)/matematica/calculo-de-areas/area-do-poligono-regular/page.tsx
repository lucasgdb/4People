// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import AreaDoPoligonoRegular from '@/tools/area-do-poligono-regular'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculo-de-areas/area-do-poligono-regular')

export default function Page() {
	return <ToolPage id="matematica/calculo-de-areas/area-do-poligono-regular" component={AreaDoPoligonoRegular} />
}
