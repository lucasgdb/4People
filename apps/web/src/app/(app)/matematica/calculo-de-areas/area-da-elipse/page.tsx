// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import AreaDaElipse from '@/tools/area-da-elipse'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculo-de-areas/area-da-elipse')

export default function Page() {
	return <ToolPage id="matematica/calculo-de-areas/area-da-elipse" component={AreaDaElipse} />
}
