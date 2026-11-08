// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import AreaDaCoroaCircular from '@/tools/area-da-coroa-circular'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculo-de-areas/area-da-coroa-circular')

export default function Page() {
	return <ToolPage id="matematica/calculo-de-areas/area-da-coroa-circular" component={AreaDaCoroaCircular} />
}
