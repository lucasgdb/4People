// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import AreaDoTriangulo from '@/tools/area-do-triangulo'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculo-de-areas/area-do-triangulo')

export default function Page() {
	return <ToolPage id="matematica/calculo-de-areas/area-do-triangulo" component={AreaDoTriangulo} />
}
