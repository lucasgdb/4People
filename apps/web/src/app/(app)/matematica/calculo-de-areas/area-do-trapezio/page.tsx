// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import AreaDoTrapezio from '@/tools/area-do-trapezio'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculo-de-areas/area-do-trapezio')

export default function Page() {
	return <ToolPage id="matematica/calculo-de-areas/area-do-trapezio" component={AreaDoTrapezio} />
}
