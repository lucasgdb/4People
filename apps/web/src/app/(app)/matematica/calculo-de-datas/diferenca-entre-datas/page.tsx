// Gerado por `pnpm gen:routes` a partir do catálogo. Não edite à mão.
import DiferencaEntreDatas from '@/tools/diferenca-entre-datas'
import { ToolPage, toolMetadata } from '@/tools/_shared/tool-page'

export const metadata = toolMetadata('matematica/calculo-de-datas/diferenca-entre-datas')

export default function Page() {
	return <ToolPage id="matematica/calculo-de-datas/diferenca-entre-datas" component={DiferencaEntreDatas} />
}
