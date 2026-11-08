// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import AreaDoRetangulo from '@/tools/area-do-retangulo'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculo-de-areas/area-do-retangulo')

export default function Page() {
	return <ToolPage id="matematica/calculo-de-areas/area-do-retangulo" component={AreaDoRetangulo} />
}
