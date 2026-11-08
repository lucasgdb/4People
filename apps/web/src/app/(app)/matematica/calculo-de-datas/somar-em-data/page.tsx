// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import SomarEmData from '@/tools/somar-em-data'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculo-de-datas/somar-em-data')

export default function Page() {
	return <ToolPage id="matematica/calculo-de-datas/somar-em-data" component={SomarEmData} />
}
